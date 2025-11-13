import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";
import Website from "@/models/website.model";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { websiteName, websiteUrl } = body;

    if (!websiteName || !websiteUrl) {
      return NextResponse.json(
        { success: false, message: "Both name and URL are required" },
        { status: 400 }
      );
    }

    await connectToDB();

    const updatedWebsite = await Website.findByIdAndUpdate(
      id,
      {
        websiteName,
        websiteUrl,
      },
      { new: true }
    );

    if (!updatedWebsite) {
      return NextResponse.json(
        { success: false, message: "Website not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Website updated successfully",
      data: updatedWebsite,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update website" },
      { status: 500 }
    );
  }
}
