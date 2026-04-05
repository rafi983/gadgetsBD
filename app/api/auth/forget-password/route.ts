import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev";
    const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: "15m" });

    const resetLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("=========================================");
      console.log("No email credentials found. Reset link is:");
      console.log(resetLink);
      console.log("=========================================");
      return NextResponse.json({ message: "Password reset development link printed to console" }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Gadgets BD" <noreply@gadgetsbd.com>',
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p><p>This link expires in 15 minutes.</p>`,
    });

    return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });
  } catch (error) {
    console.error("Error in forget-password:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

