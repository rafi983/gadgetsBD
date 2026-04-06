import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const text = await req.text();


    if (!text) {
      return NextResponse.json({ message: "Empty request body" }, { status: 400 });
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      // If it's x-www-form-urlencoded
      const params = new URLSearchParams(text);
      parsed = Object.fromEntries(params.entries());
    }

    const name = parsed.name || parsed.firstName || "User";
    const email = parsed.email;
    const password = parsed.password || parsed.pass;
    const type = parsed.type || parsed.userType || parsed.role || "Customer";

    if (!email || !password) {

      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {

      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userRole = type === "ShopOwner" ? "ShopOwner" : "Customer";
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      type: userRole
    });

    return NextResponse.json({ 
      message: "User registered successfully", 
      user: { id: user._id, name: user.name, email: user.email, type: user.type } 
    }, { status: 201 });
  } catch (error) {

    return NextResponse.json({ message: "Error registering user" }, { status: 500 });
  }
}
