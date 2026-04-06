import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import { Order } from "@/lib/models/Order";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const order = await Order.findById(resolvedParams.id).populate("items.product");
    if (!order) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    if (body.shippingAddress && body.items) {
      let itemsPrice = 0;
      body.items.forEach((item: any) => {
        itemsPrice += item.price * item.quantity;
      });

      const deliveryFee = itemsPrice > 50000 ? 0 : 500;
      const serviceFee = 500;
      const totalPrice = itemsPrice + deliveryFee + serviceFee;

      const order = await Order.findByIdAndUpdate(resolvedParams.id, {
        shippingAddress: body.shippingAddress,
        items: body.items,
        itemsPrice,
        deliveryFee,
        serviceFee,
        totalPrice
      }, { new: true }).populate("items.product");

      if (!order) return NextResponse.json({ message: "Not found" }, { status: 404 });
      return NextResponse.json(order, { status: 200 });
    }

    if (body.status) {
      const order = await Order.findByIdAndUpdate(resolvedParams.id, { status: body.status }, { new: true });
      if (!order) return NextResponse.json({ message: "Not found" }, { status: 404 });
      return NextResponse.json({ order }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating order" }, { status: 500 });
  }
}
