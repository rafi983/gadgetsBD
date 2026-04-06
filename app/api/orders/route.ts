import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import { Order } from "@/lib/models/Order";
import { User } from "@/lib/models/User";
import { Product } from "@/lib/models/Product";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    await connectToDatabase();

    const dbUser = await User.findOne({ email: userEmail });
    if (!dbUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const body = await req.json();
    const { items, address, itemsTotal, deliveryFee, serviceFee, orderTotal } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "No items" }, { status: 400 });
    }

    const newOrder = await Order.create({
      user: dbUser._id,
      items: items.map((i: any) => ({
        product: i.product._id,
        quantity: i.quantity,
        price: i.product.price,
      })),
      shippingAddress: address,
      paymentMethod: "Card",
      itemsPrice: itemsTotal,
      deliveryFee,
      serviceFee,
      totalPrice: orderTotal,
      status: "Pending", // initial status
    });

    // Also, update stock & purchase counts
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity, purchases: item.quantity }
      });
    }

    return NextResponse.json({ orderId: newOrder._id }, { status: 201 });
  } catch (error) {

    return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const dbUser = await User.findOne({ email: session.user.email });
  if (!dbUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    // If shop owner - return all orders where their items are present? Or let's return all user orders first.
    // For Shop Owner we can do this in another endpoint or handle by query params.
    const orders = await Order.find({ user: dbUser._id }).populate("items.product").sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

