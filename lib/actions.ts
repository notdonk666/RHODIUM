"use server"

import { signIn, auth } from "@/auth"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"

export async function signInWithCredentials(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Pre-check verification status to provide better error messages
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (user && !user.emailVerified) {
    return { error: "Please verify your email before logging in." }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." }
        default:
          return { error: "Something went wrong." }
      }
    }
    throw error
  }
}

import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { XP_VALUES, calculateStreakBonus, getRankByXp, Difficulty } from "./gamification";

export async function signUp(formData: FormData) {
  const username = formData.get("username") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Basic validation (Recommend installing zod for robust validation)
  if (!username || username.length < 3) return { error: "Username must be at least 3 characters." }
  if (!email || !email.includes("@")) return { error: "Invalid email address." }
  if (!password || password.length < 8) return { error: "Password must be at least 8 characters." }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "Email already in use." }
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUsername) {
      return { error: "Username already taken." }
    }

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        rank: "Iron",
        level: 1,
        xp: 0,
      },
    })

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token
    );

    return { success: "Verification email sent!" }

  } catch (error) {
    console.error("[SIGNUP_ERROR]", error)
    return { error: "Failed to create account." }
  }
}

export async function signInWithGoogle() {
  try {
    await signIn("google", { 
      redirectTo: "/dashboard",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      throw error 
    }
    
    if (error && typeof error === "object" && "digest" in error && (error as any).digest.startsWith("NEXT_REDIRECT")) {
      throw error
    }

    console.error("[GOOGLE_SIGNIN_ERROR]", error)
    throw error
  }
}

// SECURE XP AND HABIT COMPLETION
export async function completeHabitAction(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return await prisma.$transaction(async (tx) => {
    const habit = await tx.habit.findUnique({
      where: { id, userId: session.user.id }
    })

    if (!habit || habit.completedToday) return null

    const today = new Date().toDateString()
    const bonus = calculateStreakBonus(habit.streak, habit.difficulty as Difficulty)
    const xpGain = XP_VALUES[habit.difficulty as Difficulty] + bonus

    // Update Habit
    const updatedHabit = await tx.habit.update({
      where: { id },
      data: {
        completedToday: true,
        streak: habit.streak + 1,
        lastCompleted: today
      }
    })

    // Update User XP
    const user = await tx.user.findUnique({ where: { id: session.user.id } })
    if (user) {
      const newXp = user.xp + xpGain
      const newRank = getRankByXp(newXp)

      await tx.user.update({
        where: { id: session.user.id },
        data: { 
          xp: newXp,
          rank: newRank.name
        }
      })
    }

    return updatedHabit
  })
}

// SECURE TASK COMPLETION
export async function completeTaskAction(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return await prisma.$transaction(async (tx) => {
    const task = await tx.task.findUnique({
      where: { id, userId: session.user.id }
    })

    if (!task || task.completed) return null

    const xpGain = XP_VALUES[task.difficulty as Difficulty]

    // Update Task
    const updatedTask = await tx.task.update({
      where: { id },
      data: { completed: true }
    })

    // Update User XP
    const user = await tx.user.findUnique({ where: { id: session.user.id } })
    if (user) {
      const newXp = user.xp + xpGain
      const newRank = getRankByXp(newXp)

      await tx.user.update({
        where: { id: session.user.id },
        data: { 
          xp: newXp,
          rank: newRank.name
        }
      })
    }

    return updatedTask
  })
}

// Midnight Reset Logic (Server Side)
export async function resetDailyHabits() {
  const session = await auth()
  if (!session?.user?.id) return

  const today = new Date().toDateString()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toDateString()

  // This is better done as a CRON job, but for now we'll handle it on user login/access
  const habits = await prisma.habit.findMany({
    where: { userId: session.user.id }
  })

  for (const h of habits) {
    if (h.lastCompleted !== today) {
      const wasCompletedYesterday = h.lastCompleted === yesterdayStr
      await prisma.habit.update({
        where: { id: h.id },
        data: {
          completedToday: false,
          streak: wasCompletedYesterday ? h.streak : 0
        }
      })
    }
  }
}

// Habit Actions
export async function getHabits() {
  const session = await auth()
  if (!session?.user?.id) return []

  return await prisma.habit.findMany({
    where: { userId: session.user.id },
  })
}

export async function createHabit(name: string, difficulty: string) {
  const session = await auth()
  if (!session?.user?.id) return null

  if (!name || name.length > 100) return null

  return await prisma.habit.create({
    data: {
      userId: session.user.id,
      name,
      difficulty,
    },
  })
}

export async function deleteHabitAction(id: string) {
  const session = await auth()
  if (!session?.user?.id) return

  await prisma.habit.delete({
    where: { id, userId: session.user.id },
  })
}

// Task Actions
export async function getTasks() {
  const session = await auth()
  if (!session?.user?.id) return []

  return await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  })
}

export async function createTask(name: string, difficulty: string) {
  const session = await auth()
  if (!session?.user?.id) return null

  if (!name || name.length > 100) return null

  return await prisma.task.create({
    data: {
      userId: session.user.id,
      name,
      difficulty,
    },
  })
}

export async function deleteTaskAction(id: string) {
  const session = await auth()
  if (!session?.user?.id) return

  await prisma.task.delete({
    where: { id, userId: session.user.id },
  })
}

export async function newVerification(token: string) {
  const existingToken = await prisma.verificationToken.findUnique({
    where: { token }
  });

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.identifier }
  });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.identifier,
    }
  });

  await prisma.verificationToken.delete({
    where: { token }
  });

  return { success: "Email verified!" };
}
