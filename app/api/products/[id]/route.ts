import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;

    const product = await Product.findById(resolvedParams.id).lean();

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {

    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
