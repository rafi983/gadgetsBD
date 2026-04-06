"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShieldCheck, Truck, Package } from "lucide-react";

interface ProductType {
  _id: string;
  name: string;
  image: string;
  price: number;
  vendor: string;
  stock?: number;
}

export function BuyBox({ product }: { product: ProductType }) {
  const [quantity, setQuantity] = useState(1);
  const [clicked, setClicked] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const maxQuantity = product.stock ? Math.min(5, product.stock) : 5;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) setQuantity((q) => q + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/payment-process");
  };

  return (
    <div className="border border-gray-200 rounded p-4">
      <div className="text-3xl text-amazon-orange mb-2">৳{product.price.toLocaleString()}</div>
      <p className="text-sm mb-3">
        <span className="font-bold">FREE delivery</span> <strong>Tomorrow</strong>
      </p>
      <p className="text-green-600 font-bold text-sm mb-4">
        {product.stock && product.stock > 0 ? "In Stock" : "In Stock"}
      </p>

      <div className="mb-6 border-t border-b border-gray-200 py-4">
        <label className="text-sm font-bold block mb-2">Quantity:</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm w-fit">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-1.5 font-bold text-sm min-w-[40px] text-center border-l border-r border-gray-300">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={quantity >= maxQuantity}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {maxQuantity === 5 && quantity === 5 && (
            <span className="text-xs text-amazon-orange">Max 5 allowed per order</span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className={`w-full rounded-md border border-amazon-secondary py-2 text-sm font-medium shadow-sm transition-colors ${
            clicked ? "bg-green-500 text-white border-green-600" : "bg-amazon-yellow hover:bg-amazon-yellow_hover"
          }`}
        >
          {clicked ? "Added to Cart ✓" : "Add to Cart"}
        </button>
        <button
          onClick={handleBuyNow}
          className="w-full text-center bg-amazon-secondary hover:bg-amazon-secondary_hover py-2 rounded-md shadow-sm text-sm font-medium text-white transition-colors"
        >
          Buy Now
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-2">
        <p className="flex items-center"><ShieldCheck className="w-4 h-4 inline mr-2 text-gray-400" /> Secure transaction</p>
        <p className="flex items-center"><Truck className="w-4 h-4 inline mr-2 text-gray-400" /> Ships from Gadgets BD</p>
        <p className="flex items-center"><Package className="w-4 h-4 inline mr-2 text-gray-400" /> Sold by {product.vendor}</p>
      </div>
    </div>
  );
}

