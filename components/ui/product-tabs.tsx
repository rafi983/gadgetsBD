"use client";

import { useState } from "react";
import { Star, CheckCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProductTabsProps {
  product: any;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("description");
  const [visibleReviews, setVisibleReviews] = useState(5);

  const handleLoadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  const handleDeleteReview = async (productId: string) => {
    if (!confirm("Are you sure you want to delete your review?")) return;
    try {
      const res = await fetch(`/api/products/${productId}/reviews?action=delete`, {
        method: "DELETE"
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Check if logged-in user already wrote a review
  const userReviewIndex = product.reviews?.findIndex(
    (r: any) => r.reviewerEmail === session?.user?.email
  );
  const hasReviewed = userReviewIndex !== undefined && userReviewIndex >= 0;
  
  // Create sorted reviews list with user's review first
  const sortedReviews = [...(product.reviews || [])];
  if (hasReviewed && userReviewIndex > 0) {
    const userReview = sortedReviews.splice(userReviewIndex, 1)[0];
    sortedReviews.unshift(userReview);
  }

  // Assuming logged-in users have purchased it for now
  const hasPurchased = !!session?.user;

  console.log("Client-side Product Reviews Data:", product.reviews);

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
            {hasPurchased && !hasReviewed && (
              <Link
                href={`/review-modal?productId=${product._id}`}
                className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-4 py-2 rounded-md text-sm font-medium border border-amazon-secondary"
              >
                Write a Review
              </Link>
            )}
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
            {sortedReviews && sortedReviews.length > 0 ? (
              <>
                {sortedReviews
                  .slice(0, visibleReviews)
                    .map((review: any, idx: number) => {
                      const isCurrentUserReview =
                        session?.user?.email === review.reviewerEmail;

                      return (
                      <div key={idx} className="border-b border-gray-200 pb-6">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
                              {review.reviewerInitials}
                            </div>
                            <div>
                              <p className="font-bold text-sm">
                                {review.reviewerName}{" "}
                                {isCurrentUserReview && <span className="text-gray-500 font-normal text-xs ml-1">(You)</span>}
                              </p>
                              <div className="flex text-amazon-secondary">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star
                                    key={s}
                                    className={`w-3 h-3 ${
                                      s <= review.rating ? "fill-current" : ""
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          {isCurrentUserReview && (
                            <div className="flex gap-2">
                              <Link href={`/review-modal?productId=${product._id}`} className="text-gray-500 hover:text-amazon-blue">
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button onClick={() => handleDeleteReview(product._id)} className="text-gray-500 hover:text-red-500">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                        <h4 className="font-bold text-sm mb-1">{review.title}</h4>
                        <p className="text-xs text-gray-500 mb-2">
                          Reviewed in {review.location} on {review.date}
                        </p>
                        <p className="text-sm">{review.comment}</p>
                      </div>
                    );
                  })}

                {visibleReviews < sortedReviews.length && (
                  <button
                    onClick={handleLoadMoreReviews}
                    className="mt-6 px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                  >
                    Load More Reviews
                  </button>
                )}
              </>
            ) : (
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
            )}
          </div>
        </div>
      )}

      {activeTab === "shop" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Shop Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">
                {product.shop?.name || product.vendor}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {product.shop?.description ||
                  "Official and authorized seller providing genuine products with official warranty."}
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-bold">Rating:</span> {product.shop?.rating ||
                  "4.9"}/5 ({product.shop?.reviewsCount?.toLocaleString() ||
                  "2,450"} reviews)
                </p>
                <p>
                  <span className="font-bold">Products:</span> {product.shop?.totalProducts || 156} items
                </p>
                <p>
                  <span className="font-bold">Joined:</span> {product.shop?.joinedDate || "January 2020"}
                </p>
                <p>
                  <span className="font-bold">Response Time:</span> {product.shop?.responseTime || "Within 2 hours"}
                </p>
                {product.shop?.location && (
                  <p>
                    <span className="font-bold">Location:</span> {product.shop.location}
                  </p>
                )}
                {product.shop?.contact && (
                  <p>
                    <span className="font-bold">Contact:</span> {product.shop.contact}
                  </p>
                )}
                {product.shop?.verified && (
                  <p>
                    <span className="font-bold text-green-600">✓ Verified Seller</span>
                  </p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">Policies</h3>
              <div className="space-y-2 text-sm">
                {product.shop?.policies ? (
                  product.shop.policies.map((policy: string, idx: number) => (
                    <p key={idx}>
                      <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />
                      {policy}
                    </p>
                  ))
                ) : (
                  <>
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
                  </>
                )}
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
