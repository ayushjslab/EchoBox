import Feedback from "@/models/feedback.model";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const data = await req.json();
    const { name, email, text, rating, siteId } = data;

    if (!name || !email || !text || !rating || !siteId) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
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
      { success: true, data: newFeedback, message: "Feedback submitted successfully" },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// Handle preflight OPTIONS requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
