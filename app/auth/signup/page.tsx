"use client"

import Link from "next/link"
import { ChevronRight, Mail, Lock, User, AlertCircle } from "lucide-react"
import { signUp, signInWithGoogle } from "@/lib/actions"
import { useState } from "react"

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const result = await signUp(formData)
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setSuccess(result.success)
      }
    } catch {
      setError("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-6 selection:bg-amber-500/30 selection:text-amber-200">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="fixed inset-0 bg-radial-at-t from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 mb-12 group justify-center">
          <div className="size-8 rounded-lg bg-zinc-50 text-zinc-950 flex items-center justify-center transition-transform group-hover:rotate-12">R</div>
          RHODIUM
        </Link>

        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">Ascension Protocol</h1>
            <p className="text-zinc-500 text-sm font-medium">Join the elite hierarchy.</p>
          </div>

          {!success ? (
            <>
              <form action={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="size-4" />
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                    <input 
                      type="text" 
                      name="username"
                      required
                      placeholder="rhodium_legend"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="name@example.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                    <input 
                      type="password" 
                      name="password"
                      required
                      placeholder="••••••••"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-700"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-zinc-50 text-zinc-950 text-sm font-black rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50"
                >
                  {loading ? "CREATING ACCOUNT..." : "START ASCENSION"}
                  <ChevronRight className="size-4" />
                </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-zinc-800" />
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">OR</span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              <button 
                onClick={() => signInWithGoogle()}
                className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-50 text-sm font-bold rounded-xl transition-all hover:bg-zinc-800 flex items-center justify-center gap-3"
              >
                <svg className="size-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81.38z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <p className="mt-8 text-center text-xs font-medium text-zinc-500">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-amber-400 font-bold hover:underline">Log in</Link>
              </p>
            </>
          ) : (
            <div className="text-center space-y-6 py-4">
              <div className="size-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="size-8 text-amber-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-zinc-50 tracking-tight uppercase">Check your email</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  We&apos;ve sent a verification link to your email. Please click the link to activate your account.
                </p>
              </div>
              <div className="pt-4">
                <Link 
                  href="/auth/login"
                  className="inline-block w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl transition-all duration-300 transform active:scale-[0.98]"
                >
                  GO TO LOGIN
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
