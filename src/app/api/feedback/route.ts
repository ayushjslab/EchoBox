import Feedback from "@/models/feedback.model";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";
import axios from "axios";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const data = await req.json();
    const { name, email, text, rating, siteId } = data;

    if (!name || !email || !text || !rating || !siteId) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const existFeedback = await Feedback.findOne({
      email,
      website: siteId,
    });

    if (existFeedback) {
      return NextResponse.json(
        { success: false, message: "You already give the feedback" },
        { status: 400, headers: corsHeaders }
      );
    }

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_WEBSITE_URI}/api/send-email`,
      {
        to: email,
        subject: "ThankYou ! For Valuable Feedback",
        message: `<body style="margin:0; padding:20px; background:#f0fdf4; font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';">
  <div style="max-width:560px; margin:auto; background:white; padding:32px; border-radius:16px; 
    /* ENHANCEMENT 1: Stronger, more elegant shadow and a subtle border */
    box-shadow:0 8px 30px rgba(0,0,0,0.12); border: 1px solid #d1fae5;">

    <div style="text-align:center; margin-bottom:24px;">
      <div style="font-size:24px; margin-bottom:12px; display:inline-block; background:#d1fae5; padding:6px 14px; border-radius:8px;">
        <span style="line-height:1; display:block;">
          💚 Feedback
        </span>
      </div>
      
      <h2 style="color:#047857; margin:0; font-size:30px; font-weight:700; letter-spacing: -0.5px;">
        Thank You for Your Feedback
      </h2>
      <div style="height:4px; width:80px; background:#34d399; margin:14px auto 0; border-radius:2px;"></div>
    </div>

    <p style="color:#064e3b; font-size:16px; line-height:1.6; margin-bottom: 20px;">
      We sincerely appreciate the time you invested in sharing your feedback with us.
      Your insights are **invaluable** and help us continuously improve and deliver a better experience.
    </p>

    <div style="background:#ecfdf5; border-left: 4px solid #059669; padding: 16px; border-radius: 6px;">
        <p style="color:#065f46; font-size:16px; line-height:1.6; margin:0;">
          If you have more suggestions or thoughts, please feel free to **reply to this email anytime**.
          We’re always here to listen and help.
        </p>
    </div>

    <div style="margin-top:36px; border-top:1px solid #a7f3d0; padding-top:16px; text-align:center;">
      <p style="font-size:14px; color:#374151; margin:0;">
        Built with care by 
        <a href="https://echomark.vercel.app" target="_blank" style="color:#059669; text-decoration:none; font-weight:700; border-bottom: 1px solid #059669;">
          EchoMark
        </a>
      </p>
      <p style="font-size:13px; color:#9ca3af; margin-top:8px;">
        © 2025 EchoMark. All rights reserved.
      </p>
    </div>

  </div>
</body>`,
      }
    );

    if(!res.data.success) {
       return NextResponse.json(
         { success: false, message: "Failed to send mail" },
         { status: 400, headers: corsHeaders }
       );
    }

    const newFeedback = await Feedback.create({
      name,
      email,
      description: text,
      rating,
      website: siteId,
    });

    console.log("Feedback received:", newFeedback);

    return NextResponse.json(
      {
        success: true,
        data: newFeedback,
        message: "Feedback submitted successfully",
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
