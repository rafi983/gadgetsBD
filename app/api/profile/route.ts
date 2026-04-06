import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Record<string, unknown> | null;

    if (!session || !session.user || (session.user as Record<string, unknown>).type !== "ShopOwner") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updates = await req.json();
    const userId = (session.user as Record<string, unknown>).id;

    await connectToDatabase();
    
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Initialize if it doesn't exist
    if (!user.shopDetails) {
      user.shopDetails = {};
    }

    // Update fields
    if (updates.shopName) user.shopDetails.shopName = updates.shopName;
    if (updates.description) user.shopDetails.description = updates.description;
    if (updates.address) user.shopDetails.address = updates.address;
    
    // Can also update user's actual name
    if (updates.ownerName) user.name = updates.ownerName;

    await user.save();

    return NextResponse.json({ message: "Profile updated successfully", shopDetails: user.shopDetails });
  } catch (error) {

    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Record<string, unknown> | null;

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as Record<string, unknown>).id;

    await connectToDatabase();
    
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      type: user.type,
      shopDetails: user.shopDetails || {}
    });
  } catch (error) {

    return NextResponse.json({ message: "Error fetching profile" }, { status: 500 });
  }
}
