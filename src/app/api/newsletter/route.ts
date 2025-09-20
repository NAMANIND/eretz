import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send welcome email using Resend
    const { data, error } = await resend.emails.send({
      from: "ERETZ Newsletter <updates@eretzdevelopers.com>",
      to: ["testokie1@gmail.com", "info@eretzdevelopers.com"],
      subject: "New Newsletter Subscription - ${name}",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Newsletter Subscription</title>
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
                New Newsletter Subscription
              </h2>
              <p style="color: #666666; font-size: 14px; line-height: 1.5; margin: 0 0 20px 0;">
                A new subscriber has joined the newsletter.
            </p>     
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 24px 0;">
                <div style="margin-bottom: 16px;">
                  <p style="margin: 0; color: #000000; font-size: 14px; font-weight: 600;">
                    Subscriber Name:
                  </p>
                  <p style="margin: 6px 0 0 0; color: #333333; font-size: 14px;">
                    ${name}
                  </p>
                </div>
                
                <div>
                  <p style="margin: 0; color: #000000; font-size: 14px; font-weight: 600;">
                    Email Address:
                  </p>
                  <p style="margin: 6px 0 0 0; color: #333333; font-size: 14px;">
                    ${email}
                  </p>
                </div>
              </div>
              
              <p style="color: #999999; font-size: 12px; line-height: 1.4; margin: 30px 0 0 0;">
                Subscription received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
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
        { error: "Failed to send welcome email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter", id: data?.id },
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
