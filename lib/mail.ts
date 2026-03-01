import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.warn("[MAIL_WARN] RESEND_API_KEY is not set. Email delivery will fail.");
}

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email - RHODIUM Ascension Protocol",
      html: `
        <div style="background-color: #09090b; color: #fafafa; padding: 40px; font-family: sans-serif; border: 1px solid #27272a; border-radius: 8px;">
          <h1 style="color: #f59e0b; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Ascension Protocol</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa;">The next level of human performance awaits. Verify your identity to begin your ascent.</p>
          <a href="${confirmLink}" style="display: inline-block; background-color: #f59e0b; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px;">VERIFY ACCOUNT</a>
          <p style="font-size: 12px; color: #71717a; margin-top: 40px; border-top: 1px solid #27272a; padding-top: 20px;">If you did not request this, please ignore this email.</p>
        </div>
      `
    });

    if (error) {
      console.error("[MAIL_ERROR] Resend error:", error);
      throw new Error(error.message);
    }

    console.log("[MAIL_DEBUG] Email sent successfully:", data);
  } catch (err) {
    console.error("[MAIL_ERROR] Failed to send email:", err);
    throw err;
  }
};
