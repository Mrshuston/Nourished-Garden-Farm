import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, phone, date, time } = await request.json()

    // Validate required fields
    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Format the date
    const bookingDate = new Date(date)
    const formattedDate = bookingDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    // Send email using Resend or another email service
    // For now, we'll use a simple fetch to a webhook or email service
    // You can integrate with Resend, SendGrid, or another email provider

    const emailContent = `
New Health Strategy Call Booking

Name: ${name}
Email: ${email}
Phone: ${phone}

Scheduled Date: ${formattedDate}
Scheduled Time: ${time} EST

---
This booking was submitted from The Nourished Garden & Farm website.
    `.trim()

    // Option 1: Using Resend (recommended - add RESEND_API_KEY env var)
    if (process.env.RESEND_API_KEY) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "The Nourished Garden <onboarding@resend.dev>",
          to: "thenourishedgardens@gmail.com",
          subject: `New Booking: ${name} - ${formattedDate} at ${time} EST`,
          text: emailContent,
          reply_to: email,
        }),
      })

      if (!resendResponse.ok) {
        console.error("Resend error:", await resendResponse.text())
        throw new Error("Failed to send email")
      }
    } else {
      // Log the booking for testing when no email service is configured
      console.log("=== NEW BOOKING ===")
      console.log(emailContent)
      console.log("===================")
      console.log("Note: Add RESEND_API_KEY to enable email notifications")
    }

    return NextResponse.json({ 
      success: true,
      message: "Booking confirmed" 
    })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    )
  }
}
