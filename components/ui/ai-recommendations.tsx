"use client";

import { useCartStore } from "@/lib/store";
import { Info, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Recommendation = {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  vendor: string;
  reason: string;
};

export function AIRecommendations({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Recommendation[]>([]);
  const [error, setError] = useState("");
  const cartItems = useCartStore((state) => state.items);

  const requestPayload = useMemo(
    () => ({
      productId,
      cartItems: cartItems.map((item) => ({
        productId: item.product?._id,
        category: item.product?.category,
        price: item.product?.price,
      })),
    }),
    [cartItems, productId]
  );

  useEffect(() => {
    let active = true;

    const loadRecommendations = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/ai/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestPayload),
        });

        if (!res.ok) {
          if (active) setError("Could not load recommendations right now.");
          return;
        }

        const data = await res.json();
        if (active) {
          setItems(Array.isArray(data.recommendations) ? data.recommendations : []);
        }
      } catch {
        if (active) setError("Could not load recommendations right now.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadRecommendations();

    return () => {
      active = false;
    };
  }, [requestPayload]);

  if (loading) {
    return (
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <Sparkles className="h-5 w-5 text-amazon-blue" /> Picked for you
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin" /> Finding the best matches for you...
        </div>
      </div>
    );
  }

  if (error || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
        <Sparkles className="h-5 w-5 text-amazon-blue" /> Picked for you
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => (
          <Link
            href={`/details/${item._id}`}
            key={item._id}
            className="rounded border border-gray-200 p-3 transition hover:shadow-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-full bg-[#e7f2ff] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amazon-blue">
                AI Match
              </span>
              <span
                title={item.reason}
                className="inline-flex items-center gap-1 text-[11px] text-gray-500"
                aria-label={`Why recommended: ${item.reason}`}
              >
                <Info className="h-3.5 w-3.5" /> Why this?
              </span>
            </div>
            <div className="mb-3 flex h-28 items-center justify-center">
              <img src={item.image} className="max-h-full object-contain" alt={item.name} />
            </div>
            <h3 className="mb-1 line-clamp-2 text-sm font-medium text-amazon-blue hover:text-amazon-orange">
              {item.name}
            </h3>
            <p className="mb-1 text-base font-bold text-amazon-orange">৳{item.price.toLocaleString()}</p>
            <p className="line-clamp-2 text-xs text-gray-600">{item.reason}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
