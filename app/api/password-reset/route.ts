import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const genericMessage =
  "If an account exists for that email, a password-reset link is on its way.";

export async function POST(request: Request) {
  let email = "";

  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return NextResponse.json({ message: genericMessage });
  }

  if (!email || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ message: genericMessage });
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
  const redirectTo = `${origin}/auth/callback?next=/update-password`;
  const { data, error } = await createAdminClient().auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo },
  });

  // Keep the response identical when an address is not registered.
  if (error || !data.properties?.action_link) {
    return NextResponse.json({ message: genericMessage });
  }

  const fromAddress =
    process.env.PASSWORD_RESET_FROM_EMAIL ||
    process.env.DOWNLOAD_FROM_EMAIL ||
    "downloads@updates.nourished-garden-health.com";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `The Nourished Garden & Farm <${fromAddress}>`,
      to: [email],
      subject: "Reset your Garden Member password",
      html: `
        <div style="background:#f4f1e7;padding:32px 16px;font-family:Arial,sans-serif;color:#284b2b">
          <div style="max-width:560px;margin:auto;background:#fffdf7;border-radius:18px;padding:32px;border:1px solid #d8dccb">
            <p style="font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#a35f3d">The Nourished Garden &amp; Farm</p>
            <h1 style="font-family:Georgia,serif;font-size:30px;margin:12px 0">Choose a new password</h1>
            <p style="font-size:17px;line-height:1.6;color:#4c5548">Use the secure button below to reset your Garden Member password.</p>
            <p style="margin:28px 0"><a href="${data.properties.action_link}" style="display:inline-block;background:#315c31;color:white;text-decoration:none;font-weight:bold;padding:14px 24px;border-radius:999px">Reset my password</a></p>
            <p style="font-size:14px;line-height:1.5;color:#6b7166">If you did not request this email, you can safely ignore it. For your security, the link expires.</p>
          </div>
        </div>`,
    }),
  });

  if (!response.ok) {
    console.error("Resend password-reset delivery failed", response.status, await response.text());
    return NextResponse.json(
      { error: "We could not send the email right now. Please wait a moment and try again." },
      { status: 502 },
     );
  }

  return NextResponse.json({ message: genericMessage });
}
