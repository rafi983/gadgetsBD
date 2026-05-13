import { authOptions } from "@/lib/authOptions";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { User } from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type InputBody = {
  productId?: string;
  cartItems?: Array<{ productId?: string; category?: string; price?: number }>;
};

type ProductShape = {
  _id: Types.ObjectId;
  name?: string;
  image?: string;
  price?: number;
  category?: string;
  vendor?: string;
  description?: string;
  purchases?: number;
};

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

function overlapScore(a: string, b: string) {
  const aSet = new Set(tokenize(a));
  const bSet = new Set(tokenize(b));
  if (!aSet.size || !bSet.size) return 0;

  let matches = 0;
  for (const token of aSet) {
    if (bSet.has(token)) matches += 1;
  }
  return matches / Math.max(aSet.size, bSet.size);
}

function normalizePriceDistance(basePrice: number, candidatePrice: number) {
  const distance = Math.abs(basePrice - candidatePrice);
  return 1 - Math.min(distance / Math.max(basePrice, 1), 1);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    await dbConnect();

    const body = (await req.json()) as InputBody;

    let baseProduct: ProductShape | null = null;
    if (body.productId) {
      baseProduct = await Product.findById(body.productId).lean<ProductShape | null>();
    }

    const cartCategories = (body.cartItems || [])
      .map((item) => item.category)
      .filter(Boolean) as string[];

    const cartAveragePrice =
      (body.cartItems || []).reduce((sum, item) => sum + (item.price || 0), 0) /
      Math.max((body.cartItems || []).length, 1);

    let orderCategoryBoost = new Set<string>();

    if (session?.user?.email) {
      const dbUser = await User.findOne({ email: session.user.email }).lean();
      if (dbUser) {
        const userOrders = await Order.find({ user: dbUser._id })
          .sort({ createdAt: -1 })
          .limit(10)
          .populate("items.product", "category")
          .lean();

        const historyCategories = new Set<string>();
        for (const order of userOrders) {
          for (const item of order.items || []) {
            const category = (item as { product?: { category?: string } })?.product?.category;
            if (category) historyCategories.add(category);
          }
        }
        orderCategoryBoost = historyCategories;
      }
    }

    const excludeIds = [
      body.productId,
      ...(body.cartItems || []).map((i) => i.productId),
    ].filter((id): id is string => Boolean(id));

    const excludeObjectIds = excludeIds
      .filter((id) => Types.ObjectId.isValid(id))
      .map((id) => new Types.ObjectId(id));

    const candidates = await Product.find({
      ...(excludeObjectIds.length ? { _id: { $nin: excludeObjectIds } } : {}),
    })
      .sort({ purchases: -1, createdAt: -1 })
      .limit(120)
      .lean<ProductShape[]>();

    const scored = candidates
      .map((candidate) => {
        let score = 0;

        if (baseProduct?.category && candidate.category === baseProduct.category) score += 0.35;
        if (candidate.category && cartCategories.includes(candidate.category)) score += 0.2;
        if (candidate.category && orderCategoryBoost.has(candidate.category)) score += 0.2;

        if (baseProduct?.price) {
          score += normalizePriceDistance(baseProduct.price, candidate.price || 0) * 0.15;
        } else if (cartAveragePrice > 0) {
          score += normalizePriceDistance(cartAveragePrice, candidate.price || 0) * 0.12;
        }

        const baseText = `${baseProduct?.name || ""} ${baseProduct?.description || ""}`.trim();
        const candidateText = `${candidate.name || ""} ${candidate.description || ""}`.trim();
        score += overlapScore(baseText, candidateText) * 0.1;

        score += Math.min((candidate.purchases || 0) / 300, 0.1);

        let reason = "Recommended based on overall popularity.";
        if (baseProduct?.category && candidate.category === baseProduct.category) {
          reason = `Great match with this ${baseProduct.category.toLowerCase()} product.`;
        } else if (candidate.category && cartCategories.includes(candidate.category)) {
          reason = "Fits the categories currently in your cart.";
        } else if (candidate.category && orderCategoryBoost.has(candidate.category)) {
          reason = "Aligned with categories from your order history.";
        }

        return {
          _id: candidate._id,
          name: candidate.name,
          image: candidate.image,
          price: candidate.price,
          category: candidate.category,
          vendor: candidate.vendor,
          reason,
          score,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    return NextResponse.json({ recommendations: scored }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to build recommendations" }, { status: 500 });
  }
}
