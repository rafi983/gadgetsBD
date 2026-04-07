import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";
import { User } from "@/lib/models/User";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).type !== "ShopOwner") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById((session.user as any).id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = await req.json();

    // Add shop info
    data.vendor = user.shopDetails?.shopName || user.name;
    data.shop = {
      id: user._id.toString(),
      name: user.shopDetails?.shopName || user.name,
      description: user.shopDetails?.description || "",
      address: user.shopDetails?.address || "",
    };

    const newProduct = await Product.create(data);

    // Clear caches
    revalidatePath("/manage-list");
    revalidatePath("/products");
    revalidatePath("/");

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get("shopId");

    let query = {};
    if (shopId) {
      query = { "shop.id": shopId };
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
