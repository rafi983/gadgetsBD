"use client";

import { useState } from "react";
import { Star, CheckCircle } from "lucide-react";
import Link from "next/link";

interface ProductTabsProps {
  product: any;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-12">
      <div className="border-b border-gray-300 mb-6">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 px-1 text-sm font-medium ${
              activeTab === "description"
                ? "border-b-2 border-amazon-orange text-amazon-orange"
                : "text-gray-600 hover:text-amazon-orange"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-2 px-1 text-sm font-medium ${
              activeTab === "reviews"
                ? "border-b-2 border-amazon-orange text-amazon-orange"
                : "text-gray-600 hover:text-amazon-orange"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab("shop")}
            className={`pb-2 px-1 text-sm font-medium ${
              activeTab === "shop"
                ? "border-b-2 border-amazon-orange text-amazon-orange"
                : "text-gray-600 hover:text-amazon-orange"
            }`}
          >
            Shop Info
          </button>
        </div>
      </div>

      {activeTab === "description" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <div className="max-w-none text-sm">
            <p className="mb-4">
              {product.description ||
                "Outstanding tech gadget built to deliver premium performance. Shop securely with Gadgets BD for 100% authentic devices with robust local warranty and comprehensive support."}
            </p>

            {product.about && (
              <>
                <h3 className="font-bold mt-6 mb-2">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(product.about).map(([k, v]) => (
                    <li key={k}>
                      <span className="font-semibold capitalize">
                        {k.replace(/([A-Z])/g, " $1").trim()}:
                      </span>{" "}
                      {v as React.ReactNode}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Customer Reviews</h2>
            <Link
              href={`/review-modal?productId=${product._id}`}
              className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-4 py-2 rounded-md text-sm font-medium border border-amazon-secondary"
            >
              Write a Review
            </Link>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex text-amazon-secondary">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-5 h-5 ${
                      s <= (product.rating || 5) ? "fill-current" : ""
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-bold">
                {product.rating || 4.8} out of 5
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {product.reviewsCount || 1245} global ratings
            </span>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
                  JD
                </div>
                <div>
                  <p className="font-bold text-sm">John Doe</p>
                  <div className="flex text-amazon-secondary">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <h4 className="font-bold text-sm mb-1">Best purchase ever</h4>
              <p className="text-xs text-gray-500 mb-2">
                Reviewed in Bangladesh recently
              </p>
              <p className="text-sm">
                Amazing product, works perfectly for my daily needs! Highly
                recommended to anyone looking for reliable hardware.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "shop" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Shop Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">{product.vendor}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Official and authorized seller providing genuine products with
                official warranty.
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-bold">Rating:</span> 4.9/5 (2,450 reviews)
                </p>
                <p>
                  <span className="font-bold">Products:</span> 156 items
                </p>
                <p>
                  <span className="font-bold">Joined:</span> January 2020
                </p>
                <p>
                  <span className="font-bold">Response Time:</span> Within 2
                  hours
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">Policies</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />
                  14-day return policy
                </p>
                <p>
                  <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />
                  1-year official warranty
                </p>
                <p>
                  <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />
                  Free shipping on orders over ৳50,000
                </p>
                <p>
                  <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />
                  Secure payment options
                </p>
              </div>
              <Link
                href="/shops"
                className="inline-block mt-4 text-amazon-blue hover:underline text-sm"
              >
                Visit Shop Page →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
