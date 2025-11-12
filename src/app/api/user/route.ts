import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/connectDB";

const JWT_SECRET = process.env.JWT_SECRET || "your_strong_secret_here";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { name, email, picture } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { message: "Required fields are missing", success: false },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, picture });
    }

    const payload = { id: user._id, email: user.email, name: user.name };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    const response = NextResponse.json(
      { message: "User authenticated successfully", success: true, data: user },
      { status: 200 }
    );

    response.cookies.set({
      name: "session_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, 
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
