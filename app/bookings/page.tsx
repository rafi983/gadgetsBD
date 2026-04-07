"use client";

import Link from "next/link";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Download,
  Search,
  ShoppingCart,
  Truck,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SearchForm } from "@/components/ui/search-form";
import { UserNav } from "@/components/auth/UserNav";
import { CartBadge } from "@/components/ui/cart-badge";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function BookingsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {

    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (e) {

    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (e) {}
  };

  const handleReorder = (items: any[]) => {
    if (!items || items.length === 0) return;
    
    // Add every item from the old order back into the active cart state
    items.forEach((item) => {
      if (item.product) {
        addItem(item.product, item.quantity);
      }
    });

    router.push("/cart");
  };

  const handleDownloadInvoice = (orderId: string) => {
    window.open(`/api/invoice?orderId=${orderId}`, "_blank");
  };

  if ((session?.user as any)?.type === "ShopOwner") {
    return (
      <div className="bg-amazon-background text-amazon-text flex min-h-screen flex-col">
        <nav className="bg-amazon p-3 text-white shadow-md">
          <div className="max-w-[1500px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold tracking-tighter">
                  gadgets<span className="italic text-amazon-secondary">BD</span>
                  <span className="text-sm font-normal ml-2 rounded bg-gray-700 px-2 py-0.5">seller central</span>
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <Link href="/manage-list" className="hover:underline">Catalog</Link>
              <Link href="/bookings" className="underline decoration-amazon-secondary decoration-2 underline-offset-4">Orders</Link>
              <div className="h-4 w-px bg-gray-600" />
              <div className="flex cursor-pointer items-center gap-1">
                <Search className="h-4 w-4 hidden" />
                <span>Shop Owner</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="w-full p-6">
          <div className="max-w-[1500px] mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-normal">Manage Orders</h1>
            </div>

            <div className="bg-white border border-gray-300 rounded shadow-sm p-4 mb-6 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold">Status:</span>
                <select className="rounded border border-gray-300 px-2 py-1 outline-none focus:ring-1 focus:ring-amazon-blue">
                  <option>All Orders</option>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>
              <div className="flex flex-1 items-center gap-2 border-l border-gray-300 pl-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search by Order ID or Customer" className="w-full rounded border border-gray-300 py-1 pl-8 pr-2 outline-none focus:ring-1 focus:ring-amazon-blue" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded shadow-sm overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-gray-100 border-b border-gray-300 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  <tr>
                    <th className="p-3">Order ID & Date</th>
                    <th className="p-3">Customer Details</th>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Price (৳)</th>
                    <th className="p-3 text-right">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan={6} className="p-4 text-center">Loading orders...</td></tr>
                  ) : orders.length === 0 ? (
                    <tr><td colSpan={6} className="p-4 text-center text-gray-500">No orders found.</td></tr>
                  ) : (
                    orders.map((order: any) =>
                      order.items.map((item: any, idx: number) => (
                        <tr key={`${order._id}-${idx}`} className="hover:bg-gray-50">
                          <td className="p-3">
                            <div className="font-mono text-xs mb-1">#{order._id.substring(order._id.length - 8).toUpperCase()}</div>
                            <div className="text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString()}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-amazon-blue">{order.shippingAddress?.name || "Customer"}</div>
                            <div className="text-xs text-gray-500">{order.shippingAddress?.city}, {order.shippingAddress?.country}</div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img src={item.product?.image || "https://images.unsplash.com/photo-1675868374786-3edd36dddf04"} className="h-10 w-10 rounded border border-gray-200 object-cover" alt="Product" />
                              <div className="font-medium text-xs max-w-[200px] truncate">{item.product?.name || "Unknown"}</div>
                            </div>
                          </td>
                          <td className="p-3 font-bold">{item.quantity}</td>
                          <td className="p-3 font-bold">{(item.price * item.quantity).toLocaleString()}</td>
                          <td className="p-3 text-right">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              className="border border-gray-300 bg-gray-50 text-gray-700 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-amazon-blue"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </main>

        <footer className="mt-auto border-t border-gray-300 bg-white py-6">
          <div className="max-w-[1500px] mx-auto text-center text-xs text-gray-500">
            <p>&copy; 2025 Gadgets BD Seller Central. All rights reserved by LWS.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div
      id="top"
      className="min-h-screen bg-white text-amazon-text flex flex-col"
    >
      <nav className="bg-amazon text-white">
        <div className="max-w-[1500px] mx-auto flex items-center p-2 gap-4">
          <Link
            href="/"
            className="flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1"
          >
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

      <main className="max-w-[1000px] mx-auto w-full p-4 py-6">
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link
            href="/profile"
            className="text-amazon-blue hover:underline"
          >
            Your Account
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-amazon-orange">Your Orders</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-normal">Your Orders</h1>
        </div>

        <div className="text-sm mb-6 flex items-center gap-1">
          <span className="font-bold">{orders.length} orders</span>
          <span>placed in</span>
          <select className="bg-gray-100 border border-gray-300 rounded shadow-sm px-2 py-1 text-xs outline-none hover:bg-gray-200">
            <option>past 3 months</option>
            <option>2026</option>
            <option>2025</option>
          </select>
        </div>

        <div className="space-y-6">
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order: any) => (
              <div
                key={order._id}
                className="border border-gray-300 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center text-xs text-gray-600 border-b border-gray-300">
                  <div className="flex gap-10">
                    <div>
                      <div className="uppercase tracking-tighter">Order Placed</div>
                      <div className="font-normal text-sm text-gray-900 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="uppercase tracking-tighter">Total</div>
                      <div className="font-normal text-sm text-gray-900 mt-1">
                        ৳{order.totalPrice?.toLocaleString() || 0}
                      </div>
                    </div>
                    <div>
                      <div className="uppercase tracking-tighter">Ship to</div>
                      <div className="font-normal text-sm text-amazon-blue mt-1 hover:underline cursor-pointer">
                        {order.shippingAddress?.name || "Customer"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="uppercase tracking-tighter mb-1">
                      Order # {order._id.substring(order._id.length - 8).toUpperCase()}
                    </div>
                    <Link
                      href={`/success?id=${order._id}`}
                      className="text-amazon-blue hover:underline"
                    >
                      View order details
                    </Link>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {order.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className={`flex gap-4 ${
                        idx > 0 && "pt-6 border-t border-gray-200"
                      }`}
                    >
                      <img
                        src={
                          item.product?.image ||
                          "https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=200"
                        }
                        className="w-32 h-32 object-cover border border-gray-200 rounded"
                        alt="Product"
                      />
                      <div className="flex-1">
                        <Link
                          href={`/details/${item.product?._id}`}
                          className="text-amazon-blue hover:underline font-bold text-sm"
                        >
                          {item.product?.name || "Unknown Product"}
                        </Link>
                        <p className="text-xs text-gray-600 mt-1">
                          Sold by: {item.product?.vendor || "Gadgets BD"}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Quantity: {item.quantity}
                        </p>

                        <div className="mt-2">
                          {(session?.user as any)?.type === "ShopOwner" ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-gray-600">Update Status:</span>
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                className="border border-blue-300 bg-blue-50 text-blue-700 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-amazon-blue"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>
                          ) : (
                            <span
                              className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "Cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {order.status === "Delivered" && (
                                <CheckCircle className="w-3 h-3 inline mr-1" />
                              )}
                              {order.status === "Shipped" && (
                                <Truck className="w-3 h-3 inline mr-1" />
                              )}
                              {order.status === "Cancelled" && (
                                <XCircle className="w-3 h-3 inline mr-1" />
                              )}
                              {order.status}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {(session?.user as any)?.type !== "ShopOwner" && (
                            <>
                              <button
                                onClick={() => handleDownloadInvoice(order._id)}
                                className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50 flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                Download Invoice
                              </button>

                              {order.status === "Delivered" && (
                                <Link
                                  href={`/review-modal?productId=${item.product?._id}`}
                                  className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50 inline-block text-center flex items-center justify-center"
                                >
                                  Write a Review
                                </Link>
                              )}

                              <button
                                onClick={() => handleReorder(order.items)}
                                className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50"
                              >
                                Buy it again
                              </button>

                              {/* Cancel Order capability if Pending */}
                              {order.status === "Pending" && (
                                <button
                                  onClick={() => handleCancelOrder(order._id)}
                                  className="px-4 py-1.5 border border-red-300 bg-red-50 text-red-700 rounded-md text-xs hover:bg-red-100 flex items-center gap-1 mt-2 sm:mt-0"
                                >
                                  <XCircle className="w-3 h-3" />
                                  Cancel Order
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-amazon-light text-white mt-8">
        <a
          href="#top"
          className="bg-[#37475A] py-4 text-center hover:bg-[#485769] transition cursor-pointer block"
        >
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
              <li>
                <Link href="/shops" className="hover:underline">
                  Our Top Brands
                </Link>
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
                  Supply to Gadgets BD
                </Link>
              </li>
              <li>
                <Link href="/manage-list" className="hover:underline">
                  Become an Affiliate
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Payment Products</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:underline">
                  Gadgets BD Business Card
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shop with Points
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Reload Your Balance
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
                  Shipping Rates &amp; Policies
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns &amp; Replacements
                </a>
              </li>
              <li>
                <Link href="/forget-password" className="hover:underline">
                  Manage Your Content and Devices
                </Link>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 text-center py-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-2xl font-bold tracking-tighter">
              gadgets<span className="italic text-gray-400">BD</span>
            </span>
          </div>
          <p className="text-xs text-gray-400">
            &copy; 2025 Gadgets BD - Premium Tech Marketplace. All rights reserved
            by LWS.
          </p>
        </div>
      </footer>
    </div>
  );
}
