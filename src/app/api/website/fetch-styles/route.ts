import { connectToDB } from "@/lib/connectDB";
import Website from "@/models/website.model";
import { NextRequest, NextResponse } from "next/server";
import { CORS } from "@/lib/cors";

export async function OPTIONS() {
  return CORS(NextResponse.json({}, { status: 200 }));
}

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const websiteId = req.nextUrl.searchParams.get("websiteId");

    if (!websiteId) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Website ID missing" },
          { status: 400 }
        )
      );
    }

    const website = await Website.findById(websiteId).lean();

    if (!website) {
      return CORS(
        NextResponse.json(
          { success: false, message: "Website not found" },
          { status: 404 }
        )
      );
    }

    return CORS(
      NextResponse.json({
        success: true,
        message: "Styles fetched successfully",
        formStyles: website.formStyles || null,
      })
    );
  } catch (err) {
    console.error("Error fetching styles:", err);
    return CORS(
      NextResponse.json(
        { success: false, message: "Internal server error" },
        { status: 500 }
      )
    );
  }
}
