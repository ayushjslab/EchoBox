import Feedback from "@/models/feedback.model";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: cors });
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { name, email, text, rating, siteId } = await req.json();

    if (!name || !email || !text || !rating || !siteId) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400, headers: cors }
      );
    }

    const newFeedback = await Feedback.create({
      name,
      email,
      description: text,
      rating,
      website: siteId,
    });

    return NextResponse.json(
      { success: true, data: newFeedback },
      { status: 201, headers: cors }
    );
  } catch (error) {
    console.error("Feedback Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500, headers: cors }
    );
  }
}
