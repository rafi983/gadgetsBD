"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";

interface ProductType {
  _id: string;
  name: string;
  image: string;
  price: number;
  vendor: string;
}

export function AddToCartButton({ product }: { product: ProductType }) {
  const [clicked, setClicked] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // Basic Add to Cart Implementation here.
    addItem(product);
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full rounded-md border border-amazon-secondary py-1.5 text-sm font-medium shadow-sm transition-colors ${
        clicked ? "bg-green-500 text-white" : "bg-amazon-yellow hover:bg-amazon-yellow_hover"
      }`}
    >
      {clicked ? "Added!" : "Add to Cart"}
    </button>
  );
}
