"use client";

import { UserNav } from "@/components/auth/UserNav";
import Link from "next/link";
import { Check, ChevronDown, Download, Search, ShoppingCart } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/orders/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((err) => {

          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);


  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!order || order.message) {
    return <div className="min-h-screen flex items-center justify-center">Order not found</div>;
  }

  return (
    <div className="bg-white text-amazon-text flex min-h-screen flex-col">
      <nav className="bg-amazon text-white">
        <div className="max-w-[1500px] mx-auto flex items-center p-2 gap-4">
          <Link href="/" className="flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1">
            <span className="text-2xl font-bold tracking-tighter">gadgets<span className="italic text-amazon-secondary">BD</span></span>
          </Link>

          <div className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-3 focus-within:ring-amazon-secondary">
            <div className="bg-gray-100 flex items-center px-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200">
              <span className="text-xs text-black">Electronics</span>
              <ChevronDown className="w-3 h-3 ml-1 text-gray-500" />
            </div>
            <input type="text" placeholder="Search Gadgets, Laptops, Phones..." className="flex-1 px-3 text-black outline-none" />
            <button className="bg-amazon-secondary hover:bg-[#fa8900] px-4 flex items-center justify-center"><Search className="text-black w-5 h-5" /></button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer"><div className="font-bold text-sm">EN</div></div>
            <UserNav />
            <Link href="/cart" className="flex items-end hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer relative"><ShoppingCart className="w-8 h-8" /><span className="font-bold text-amazon-secondary absolute top-0 left-1/2 -translate-x-1/2 text-sm">0</span><span className="font-bold text-sm hidden md:block">Cart</span></Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[800px] mx-auto w-full p-8 py-12">
        <div className="flex items-start gap-4 p-6 border border-gray-300 rounded shadow-sm">
          <div className="bg-white border border-green-600 rounded-full p-1 self-start mt-1"><Check className="w-6 h-6 text-green-600 stroke-[3]" /></div>
          <div className="space-y-4 flex-1">
            <h1 className="text-xl font-bold text-green-700">Order placed, thank you!</h1>
            <p className="text-sm">Confirmation will be sent to your email.</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex-1 text-sm bg-gray-50 p-4 border border-gray-200 rounded"><span className="font-bold block mb-1">Shipping to {order.shippingAddress?.name || "Customer"}</span><p className="text-gray-600">{order.shippingAddress?.street || "Address unavailable"}<br />{order.shippingAddress?.city || "City unavailable"}, {order.shippingAddress?.country || ""}</p></div>
              <div className="flex-1 text-sm bg-gray-50 p-4 border border-gray-200 rounded"><span className="font-bold block mb-1">Order Number</span><p className="text-gray-600 font-mono">#{order._id?.toString().substring(order._id.toString().length - 8).toUpperCase()}</p><p className="text-xs text-gray-500 mt-2">Placed on {new Date(order.createdAt).toLocaleDateString()}</p></div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-4 items-center">
              <button onClick={() => window.open(`/api/invoice?orderId=${order._id}`, "_blank")} className="w-full sm:w-auto px-8 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 shadow-xs transition-colors text-center flex items-center justify-center gap-2"><Download className="w-4 h-4" />Download Invoice</button>
              <Link href="/bookings" className="w-full sm:w-auto px-8 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 shadow-xs transition-colors text-center">View All Orders</Link>
              <Link href="/" className="w-full sm:w-auto px-8 py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-xs transition-colors text-center">Continue Shopping</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-normal border-b border-gray-200 pb-4">Order Details</h2>

          {order.items?.map((item: any, idx: number) => (
            <div key={idx} className={`flex gap-4 items-start ${idx > 0 ? "pt-4 border-t border-gray-100" : ""}`}>
              <img src={item.product?.image || "https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=200"} className="w-20 h-20 object-cover border border-gray-200 rounded" alt="Item" />
              <div>
                <Link href={`/details/${item.product?._id}`} className="text-amazon-blue hover:underline font-bold text-sm">{item.product?.name}</Link>
                <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
                <p className="text-xs text-amazon-orange font-bold mt-1">৳{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-gray-200">
            <div className="max-w-sm ml-auto space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal:</span><span>৳{order.totalPrice?.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Delivery Fee:</span><span className="text-green-600 font-bold">FREE</span></div>
              <div className="flex justify-between border-b border-gray-200 pb-2"><span>Service Fee:</span><span>৳0</span></div>
              <div className="flex justify-between text-lg font-bold text-amazon-orange"><span>Total:</span><span>৳{order.totalPrice?.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 bg-gray-50 border-t border-gray-300">
        <div className="max-w-[1000px] mx-auto text-center text-[10px] text-gray-500 space-y-2">
          <div className="flex justify-center gap-6 text-amazon-blue text-xs mb-2">
            <a href="#" className="hover:underline">Conditions of Use</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline">Help</a>
          </div>
          <p>&copy; 2025 Gadgets BD - Premium Tech Marketplace. All rights reserved by LWS.</p>
        </div>
      </footer>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}

