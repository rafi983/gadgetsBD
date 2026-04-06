"use client";

import Link from "next/link";
import { Camera, Star, User } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function ReviewModalContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const router = useRouter();
  const { data: session } = useSession();

  const [product, setProduct] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId && session?.user?.email) {
      fetch(`/api/products/${productId}`)
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          setProduct(data);
          if (data?.reviews) {
            const existingReview = data.reviews.find((r: any) => r.reviewerEmail === session?.user?.email);
            if (existingReview) {
              setRating(existingReview.rating || 0);
              setTitle(existingReview.title || "");
              setComment(existingReview.comment || "");
            }
          }
        })

    }
  }, [productId, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !title || !comment) {
      alert("Please fill all required fields (rating, title, comment).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, title, comment }),
      });

      if (res.ok) {
        router.push(`/details/${productId}`);
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to submit review.");
      }
    } catch (err) {

      alert("Error submitting review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-amazon-text flex min-h-screen flex-col">
      <nav className="bg-amazon p-3 text-white shadow-md">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tighter">
              gadgets<span className="italic text-amazon-secondary">BD</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 cursor-pointer">
            <User className="w-4 h-4" />
            <span className="text-sm">{session?.user?.name || "Customer"}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto w-full p-6">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-normal">Create Review</h1>

          {product && (
            <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
              <img src={product.image} className="w-16 h-16 object-cover border border-gray-200 rounded" alt="Item" />
              <h2 className="font-bold text-sm">{product.name}</h2>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <section className="space-y-4">
              <h3 className="text-xl font-bold">Overall rating</h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className="group transition-transform hover:scale-110"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHoveredRating(n)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        (hoveredRating || rating) >= n ? "text-amazon-yellow fill-current" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </section>

            <hr className="border-gray-200" />

            <section className="space-y-4">
              <h3 className="text-xl font-bold">Add a photo or video</h3>
              <p className="text-sm">Shoppers find images and videos more helpful than text alone.</p>
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-amazon-blue transition-colors gap-2">
                <Camera className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-500">Add media</span>
              </div>
            </section>

            <hr className="border-gray-200" />

            <section className="space-y-4">
              <h3 className="text-xl font-bold">Add a headline</h3>
              <input
                type="text"
                placeholder="What's most important to know?"
                className="w-full border border-gray-300 rounded p-2 outline-none focus:ring-1 focus:ring-amazon-blue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </section>

            <hr className="border-gray-200" />

            <section className="space-y-4">
              <h3 className="text-xl font-bold">Add a written review</h3>
              <textarea
                rows={6}
                placeholder="What did you like or dislike? What did you use this product for?"
                className="w-full border border-gray-300 rounded p-4 outline-none focus:ring-1 focus:ring-amazon-blue"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </section>

            <div className="border-t border-gray-200 pt-8 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-8 py-2 rounded-md shadow-sm border border-amazon-secondary font-bold disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="mt-auto py-8 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-center gap-6 text-xs text-amazon-blue mb-4">
          <Link href="#" className="hover:underline">Conditions of Use</Link>
          <Link href="#" className="hover:underline">Privacy Notice</Link>
          <Link href="#" className="hover:underline">Help</Link>
        </div>
        <p className="text-center text-[10px] text-gray-500">&copy; 1996-2025, GadgetsBD.com, Inc. or its affiliates</p>
      </footer>
    </div>
  );
}

export default function ReviewModalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ReviewModalContent />
    </Suspense>
  );
}

