import { NextResponse } from "next/server";
import Website from "@/models/website.model";
import { connectToDB } from "@/lib/connectDB";

export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;

  await connectToDB();

  const websites = await Website.find({ addedBy: userId });

  return NextResponse.json({ success: true, data: websites });
}
