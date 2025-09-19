import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, query } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !query) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "ERETZ Contact Form <updates@eretzdevelopers.com>", // Replace with your verified domain
      to: ["namanrai309@gmail.com"], // Replace with your actual email
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 500px; margin: 0 auto;">
            
            <div style="border-bottom: 1px solid #e5e5e5; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: 600;">
                ERETZ Team
              </h1>
            </div>
            
            <div>
              <h2 style="color: #000000; margin: 0 0 16px 0; font-size: 18px; font-weight: 500;">
                New Contact Form Submission
              </h2>
              <p style="color: #666666; font-size: 14px; line-height: 1.5; margin: 0 0 20px 0;">
                A new contact form has been submitted.
              </p>
              
              <div style="background-color: #f8f9fa; padding: 16px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0 0 8px 0; color: #000000; font-size: 14px; font-weight: 500;">
                  Contact Details:
                </p>
                <p style="margin: 0 0 4px 0; color: #666666; font-size: 14px;">
                  <strong>Name:</strong> ${name}
                </p>
                <p style="margin: 0 0 4px 0; color: #666666; font-size: 14px;">
                  <strong>Email:</strong> ${email}
                </p>
                <p style="margin: 0; color: #666666; font-size: 14px;">
                  <strong>Phone:</strong> ${phone}
                </p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 16px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0 0 8px 0; color: #000000; font-size: 14px; font-weight: 500;">
                  Message:
                </p>
                <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                  ${query.replace(/\n/g, "<br>")}
                </p>
              </div>
              
              <p style="color: #999999; font-size: 12px; line-height: 1.4; margin: 30px 0 0 0;">
                Form submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
