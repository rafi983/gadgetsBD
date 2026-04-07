"use client";

import { UserNav } from "@/components/auth/UserNav";
import Link from "next/link";
import {
  CheckCircle,
  ChevronDown,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { CartBadge } from "@/components/ui/cart-badge";
import { SearchForm } from "@/components/ui/search-form";
import { Loader2 } from "lucide-react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div id="top" className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
      <nav className="bg-amazon text-white">
        <div className="max-w-[1500px] mx-auto flex items-center p-2 gap-4">
          <Link href="/" className="flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1">
            <span className="text-2xl font-bold tracking-tighter">
              gadgets<span className="italic text-amazon-secondary">BD</span>
            </span>
          </Link>

          <SearchForm />

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer">
              <div className="font-bold text-sm">EN</div>
            </div>

            <UserNav />

            <CartBadge />
          </div>
        </div>
      </nav>

      <main className="max-w-[1500px] mx-auto w-full p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="bg-white p-4 mb-4 border-b border-gray-300">
              <h1 className="text-2xl font-normal mb-2">Shopping Cart</h1>
              <div className="text-sm text-gray-600">
                {(!mounted || cartItems.length === 0) ? "Your cart is empty. " : ""}
                <Link href="/products" className="text-amazon-blue hover:underline">
                  Continue shopping
                </Link>
              </div>
            </div>

            <div className="bg-white">
              {!mounted ? (
                <div className="flex flex-col items-center justify-center p-16 text-gray-500 space-y-6">
                  <Loader2 className="w-10 h-10 animate-spin text-amazon-orange" />
                  <p className="text-sm font-medium tracking-wide">Loading your cart...</p>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.product._id} className="p-4 border-b border-gray-300 flex gap-4 hover:bg-gray-50">
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={item.product.image}
                          className="w-full h-full object-cover rounded border border-gray-200 mix-blend-multiply"
                          alt={item.product.name}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-base mb-1">
                          <Link href={`/details/${item.product._id}`} className="text-amazon-blue hover:text-amazon-orange hover:underline">
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-green-700 font-medium">In Stock</p>
                        <p className="text-xs text-gray-600 mt-1">Sold by: {item.product.vendor}</p>
                        <p className="text-xs text-gray-600">Eligible for FREE Shipping</p>

                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-gray-600">Qty:</label>
                            <select
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                              className="border border-gray-400 rounded-md px-2 py-1 text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-amazon-blue"
                            >
                              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>

                          <button
                            onClick={() => removeItem(item.product._id)}
                            className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-amazon-orange">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}

                  {cartItems.length > 0 && (
                    <div className="p-4 text-right">
                      <p className="text-lg">
                        Subtotal ({totalItems} items):
                        <span className="font-bold text-amazon-orange ml-2">৳{totalPrice.toLocaleString()}</span>
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="lg:w-80">
            <div className="bg-white p-4 border border-gray-300 rounded">
              <div className="mb-4">
                <p className="text-sm mb-2">
                  <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />
                  <span className="text-green-700 font-medium">Your order qualifies for FREE Shipping!</span>
                </p>
              </div>

              <div className="mb-4">
                <p className="text-lg mb-1">
                  Subtotal ({mounted ? totalItems : 0} items):
                  <span className="font-bold text-amazon-orange ml-2">৳{mounted ? totalPrice.toLocaleString() : 0}</span>
                </p>
                <div className="flex items-start gap-2 text-xs">
                  <input type="checkbox" id="gift" className="mt-0.5" />
                  <label htmlFor="gift" className="text-gray-700">
                    This order contains a gift
                  </label>
                </div>
              </div>

              <Link
                href="/payment-process"
                className="w-full py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors mb-2 block text-center"
              >
                Proceed to Checkout
              </Link>

              <div className="text-xs text-gray-600 mt-4">
                <p className="mb-2">
                  <ShieldCheck className="w-3 h-3 inline mr-1" />
                  Secure transaction
                </p>
                <p>
                  <Truck className="w-3 h-3 inline mr-1" />
                  Ships from Gadgets BD
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-amazon-light text-white mt-12">
        <a href="#top" className="bg-[#37475A] py-4 text-center hover:bg-[#485769] transition cursor-pointer block">
          <span className="text-sm font-medium">Back to top</span>
        </a>

        <div className="max-w-[1000px] mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:underline">
                  About Gadgets BD
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/register" className="hover:underline">
                  Sell on Gadgets BD
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:underline">
                  Become a Vendor
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Payment Products</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:underline">
                  Gadgets BD Card
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:underline">
                  Your Account
                </a>
              </li>
              <li>
                <Link href="/bookings" className="hover:underline">
                  Your Orders
                </Link>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 text-center py-8">
          <p className="text-xs text-gray-400">&copy; 2025 Gadgets BD - Premium Tech Marketplace. All rights reserved by LWS.</p>
        </div>
      </footer>
    </div>
  );
}
