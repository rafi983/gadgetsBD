import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import { Order } from "@/lib/models/Order";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
  }

  await connectToDatabase();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const order = await Order.findById(orderId).populate("items.product");
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    let page = pdfDoc.addPage([595.28, 841.89]); // A4 page size

    const { width, height } = page.getSize();
    let yOffset = height - 50;

    // Header
    page.drawText("INVOICE", { x: 50, y: yOffset, size: 24, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
    page.drawText("Gadgets BD", { x: width - 150, y: yOffset, size: 14, font: boldFont });
    yOffset -= 20;
    page.drawText("Premium Tech Marketplace", { x: width - 180, y: yOffset, size: 10, font });
    yOffset -= 15;
    page.drawText("Dhaka, Bangladesh", { x: width - 145, y: yOffset, size: 10, font });

    yOffset -= 50;

    // Order Info
    page.drawText(`Order Number: #${order._id.toString().substring(order._id.toString().length - 8).toUpperCase()}`, { x: 50, y: yOffset, size: 10, font: boldFont });
    page.drawText(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, { x: width - 150, y: yOffset, size: 10, font });
    yOffset -= 20;

    // Customer Info
    page.drawText("Billed To:", { x: 50, y: yOffset, size: 12, font: boldFont });
    yOffset -= 15;
    page.drawText(order.shippingAddress.name, { x: 50, y: yOffset, size: 10, font });
    yOffset -= 15;
    page.drawText(order.shippingAddress.street, { x: 50, y: yOffset, size: 10, font });
    yOffset -= 15;
    page.drawText(`${order.shippingAddress.city}, ${order.shippingAddress.country}`, { x: 50, y: yOffset, size: 10, font });
    yOffset -= 15;
    page.drawText(`Phone: ${order.shippingAddress.phone}`, { x: 50, y: yOffset, size: 10, font });

    yOffset -= 40;

    // Table Header
    page.drawText("Item", { x: 50, y: yOffset, size: 10, font: boldFont });
    page.drawText("Qty", { x: 350, y: yOffset, size: 10, font: boldFont });
    page.drawText("Price", { x: 420, y: yOffset, size: 10, font: boldFont });
    page.drawText("Total", { x: 490, y: yOffset, size: 10, font: boldFont });
    yOffset -= 10;
    page.drawLine({ start: { x: 50, y: yOffset }, end: { x: width - 50, y: yOffset }, thickness: 1 });
    yOffset -= 15;

    // Table Context
    for (const item of order.items) {
      if (yOffset < 100) {
        page = pdfDoc.addPage([595.28, 841.89]);
        yOffset = height - 50;
      }

      const productName = item.product?.name || "Unknown Product";
      // Truncate long names slightly if needed
      const truncatedName = productName.length > 50 ? productName.substring(0, 47) + "..." : productName;

      page.drawText(truncatedName, { x: 50, y: yOffset, size: 10, font });
      page.drawText(`${item.quantity}`, { x: 350, y: yOffset, size: 10, font });
      page.drawText(`${item.price.toLocaleString()}`, { x: 420, y: yOffset, size: 10, font });
      page.drawText(`${(item.price * item.quantity).toLocaleString()}`, { x: 490, y: yOffset, size: 10, font });

      yOffset -= 20;
    }

    yOffset -= 10;
    page.drawLine({ start: { x: 50, y: yOffset }, end: { x: width - 50, y: yOffset }, thickness: 1 });
    yOffset -= 20;

    // Totals
    page.drawText(`Subtotal:`, { x: 380, y: yOffset, size: 10, font });
    page.drawText(`${order.itemsPrice.toLocaleString()} BDT`, { x: 480, y: yOffset, size: 10, font });
    yOffset -= 15;
    page.drawText(`Delivery Fee:`, { x: 380, y: yOffset, size: 10, font });
    page.drawText(`${order.deliveryFee.toLocaleString()} BDT`, { x: 480, y: yOffset, size: 10, font });
    yOffset -= 15;
    page.drawText(`Service Fee:`, { x: 380, y: yOffset, size: 10, font });
    page.drawText(`${order.serviceFee.toLocaleString()} BDT`, { x: 480, y: yOffset, size: 10, font });
    yOffset -= 20;
    page.drawText(`Total:`, { x: 380, y: yOffset, size: 12, font: boldFont });
    page.drawText(`${order.totalPrice.toLocaleString()} BDT`, { x: 480, y: yOffset, size: 12, font: boldFont });

    // Footer
    page.drawText("Thank you for your purchase!", { x: 50, y: 50, size: 12, font: boldFont });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Invoice-${order._id.toString().substring(0, 8)}.pdf"`,
      },
    });
  } catch (error) {

    return NextResponse.json({ message: "Error generating invoice" }, { status: 500 });
  }
}
