import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";
import Website from "@/models/website.model";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; 
    await connectToDB();

    const deleted = await Website.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Website not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Website deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete website" },
      { status: 500 }
    );
  }
}
