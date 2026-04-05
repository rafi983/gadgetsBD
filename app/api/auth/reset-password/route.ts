import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import { User, IUser } from "@/lib/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Token and password are required" }, { status: 400 });
    }

    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev";
    
    let decoded;
    try {
      decoded = jwt.verify(token, secret) as { id: string; email: string };
    } catch (e) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    await connectToDatabase();
    
    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in reset password:", error);
    return NextResponse.json({ message: "Error updating password" }, { status: 500 });
  }
}
