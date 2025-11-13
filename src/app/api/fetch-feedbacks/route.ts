import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";
import Feedback from "@/models/feedback.model";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const websiteId = searchParams.get("websiteId");

    if (!websiteId) {
      return NextResponse.json(
        { success: false, message: "Missing websiteId parameter" },
        { status: 400 }
      );
    }

    await connectToDB();

    const feedbacks = await Feedback.find({ website: websiteId }).sort({
      createdAt: -1,
    });

    if (!feedbacks || feedbacks.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No feedbacks found for this website.",
        data: [],
      });
    }

    return NextResponse.json({
      success: true,
      message: "Feedbacks fetched successfully",
      data: feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
