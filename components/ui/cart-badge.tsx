"use client";

import { useCartStore } from "@/lib/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" className="relative flex cursor-pointer items-end rounded-sm p-1 hover:outline hover:outline-1 hover:outline-white">
      <ShoppingCart className="h-8 w-8" />
      <span className="text-amazon-secondary absolute top-0 left-1/2 -translate-x-1/2 text-sm font-bold">
        {mounted ? totalItems : 0}
      </span>
      <span className="hidden text-sm font-bold md:block">Cart</span>
    </Link>
  );
}
