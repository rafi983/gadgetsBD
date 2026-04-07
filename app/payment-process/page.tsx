 "use client";

import Link from "next/link";
import { Lock, Truck, ShieldCheck, Edit3, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PaymentProcessPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, updateQuantity, totalPrice, clearCart } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [address, setAddress] = useState({
    name: "John Doe",
    street: "123 Main St, Apartment 4B",
    city: "Dhaka, 1212",
    country: "Bangladesh",
    phone: "+880 1712-345678"
  });

  const [editAddress, setEditAddress] = useState(address);
  const [tempItems, setTempItems] = useState<{ productId: string; quantity: number }[]>([]);

  useEffect(() => {
    setMounted(true);
    if (session?.user?.name) {
      setAddress(prev => ({ ...prev, name: session.user?.name || "John Doe" }));
      setEditAddress(prev => ({ ...prev, name: session.user?.name || "John Doe" }));
    }
  }, [session]);

  if (!mounted) return null;

  const handleSaveModal = () => {
    setAddress(editAddress);
    tempItems.forEach((temp) => {
      updateQuantity(temp.productId, temp.quantity);
    });
    setIsEditModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setEditAddress(address);
    setTempItems(items.map((item) => ({ productId: item.product._id, quantity: item.quantity })));
    setIsEditModalOpen(true);
  };

  const handleCompletePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          address,
          itemsTotal: totalPrice(),
          deliveryFee: totalPrice() > 50000 ? 0 : 500,
          serviceFee: 500,
          orderTotal: totalPrice() + (totalPrice() > 50000 ? 0 : 500) + 500,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        clearCart();
        router.push(`/success?id=${data.orderId}`);
      } else {
        alert("Failed to place order.");
      }
    } catch (err) {

      alert("Error placing order.");
    }
  };

  const itemsTotal = totalPrice();
  const deliveryFee = itemsTotal > 50000 ? 0 : 500;
  const serviceFee = 500;
  const orderTotal = itemsTotal + deliveryFee + serviceFee;

  return (
    <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
      {/* Minimal Header */}
      <header className="bg-amazon p-4 border-b border-gray-300">
        <div className="max-w-[1100px] mx-auto flex justify-between items-center text-white">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tighter">
              gadgets<span className="italic text-amazon-secondary">BD</span>
            </span>
          </Link>
          <h1 className="text-2xl font-normal hidden md:block">
            Checkout (<span className="text-amazon-secondary">{items.length} items</span>)
          </h1>
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1100px] mx-auto flex-1 py-10 px-4 flex flex-col lg:flex-row gap-8 relative">
        {/* Left Side: Steps */}
        <div className="flex-1 space-y-6">
          {/* 1. Shipping Address Summary */}
          <div className="hover:bg-gray-50 border-b border-gray-300 pb-6 flex justify-between items-start transition-colors">
            <div>
              <span className="text-[20px] font-bold text-[#333] mr-4">1</span>
              <span className="font-bold text-lg">Shipping address</span>
            </div>
            <div className="text-sm flex-1 ml-10">
              <p>{address.name}</p>
              <p>{address.street}</p>
              <p>{address.city}</p>
              <p>{address.country}</p>
              <p className="mt-1 text-gray-600">Phone: {address.phone}</p>
            </div>
            <button
               onClick={handleOpenEditModal}
              className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" /> Edit Order Details
            </button>
          </div>

          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-md p-6 max-w-lg w-full">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h2 className="text-lg font-bold">Edit Order Details</h2>
                  <button onClick={() => setIsEditModalOpen(false)} className="hover:text-red-500">
                    <X className="w-5 h-5"/>
                  </button>
                </div>

                <h3 className="font-bold text-sm mb-2">Shipping Information</h3>
                <div className="space-y-3 mb-6">
                  <input
                    type="text"
                    value={editAddress.name}
                    onChange={(e) => setEditAddress({...editAddress, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="Full Name"
                  />
                  <input
                    type="text"
                    value={editAddress.street}
                    onChange={(e) => setEditAddress({...editAddress, street: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="Street Address"
                  />
                  <input
                    type="text"
                    value={editAddress.city}
                    onChange={(e) => setEditAddress({...editAddress, city: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="City, ZIP"
                  />
                  <input
                    type="text"
                    value={editAddress.phone}
                    onChange={(e) => setEditAddress({...editAddress, phone: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="Phone Number"
                  />
                </div>

                <h3 className="font-bold text-sm mb-2">Adjust Quantities</h3>
                <div className="max-h-40 overflow-y-auto space-y-3 mb-4">
                  {items.map((item) => {
                    const currentTemp = tempItems.find((t) => t.productId === item.product._id);
                    const currentQuantity = currentTemp ? currentTemp.quantity : item.quantity;
                    return (
                    <div key={item.product._id} className="flex justify-between items-center text-sm border-b pb-2">
                      <span className="line-clamp-1 flex-1 pr-2">{item.product.name}</span>
                      <select
                        value={currentQuantity}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value);
                          setTempItems((prev) =>
                            prev.map((t) => (t.productId === item.product._id ? { ...t, quantity: newQty } : t))
                          );
                        }}
                        className="border rounded px-2 py-1"
                      >
                        {[0,1,2,3,4,5,6].map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </div>
                  )})}
                </div>

                <button
                  onClick={handleSaveModal}
                  className="w-full py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover rounded-md text-sm font-medium border border-amazon-secondary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* 2. Selected Products List */}
          <div className="pb-6 border-b border-gray-300">
            <div className="flex items-center mb-4">
              <span className="text-[20px] font-bold text-[#333] mr-4">2</span>
              <span className="font-bold text-lg">Review items</span>
            </div>

            <div className="border border-[#ddd] rounded-md bg-white p-4 space-y-4">
              {items.length === 0 ? (
                 <p className="text-gray-500 text-sm">No items in your cart.</p>
              ) : (
                items.map((item) => (
                  <div key={item.product._id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-24 h-24 bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.product.image}
                        className="max-h-full max-w-full object-contain"
                        alt={item.product.name}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        Sold by: {item.product.vendor || "Gadgets BD"}
                      </p>
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-bold text-amazon-orange">
                          ৳{item.product.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="pb-6">
            <div className="flex items-center mb-6">
              <span className="text-[20px] font-bold text-[#333] mr-4">3</span>
              <span className="font-bold text-lg text-amazon-orange">
                Choose a payment method
              </span>
            </div>

            <form
              onSubmit={handleCompletePayment}
              id="paymentForm"
              className="border border-[#ddd] rounded-md bg-white p-6 space-y-6 shadow-sm"
            >
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-3 border border-amazon-orange rounded-md cursor-pointer hover:bg-amazon-background transition-colors bg-gray-50 ring-1 ring-amazon-orange">
                  <div>
                    <span className="font-bold block text-sm">
                      Credit or Debit Card
                    </span>
                    <div className="flex gap-2 mt-2">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                        className="h-4"
                        alt="Visa"
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                        className="h-4"
                        alt="Mastercard"
                      />
                    </div>
                  </div>
                </label>

                <div id="cardInputs" className="pl-8 space-y-4">
                  <div>
                    <label className="text-xs font-bold block mb-1">
                      Name on card
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full max-w-sm px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
                    />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <label className="text-xs font-bold block mb-1">
                        Card number
                      </label>
                      <input
                        type="text"
                        placeholder="#### #### #### ####"
                        required
                        className="w-full px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-xs font-bold block mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="***"
                        required
                        className="w-full px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold block mb-1">
                      Expiration date
                    </label>
                    <div className="flex gap-2">
                      <select className="bg-gray-100 border border-gray-300 rounded p-1 text-xs">
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i}>{(i + 1).toString().padStart(2, '0')}</option>
                        ))}
                      </select>
                      <select className="bg-gray-100 border border-gray-300 rounded p-1 text-xs">
                        {[2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
                          <option key={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-[300px]">
          <div className="border border-[#ddd] rounded-md bg-white p-4 sticky top-10">
            <button
              form="paymentForm"
              type="submit"
              disabled={items.length === 0}
              className="w-full py-2 mb-4 rounded-md bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] border-t-[#a88734] border-x-[#9c7e31] border-b-[#846a29] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:from-[#f5d78e] hover:to-[#eeb933] text-sm font-normal disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Place your order
            </button>
            <p className="text-[10px] text-gray-500 text-center mb-4 border-b border-gray-300 pb-4 leading-tight">
              By placing your order, you agree to Gadgets BD&apos;s{" "}
              <Link
                href="#"
                className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange"
              >
                privacy notice
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange"
              >
                conditions of use
              </Link>
              .
            </p>

            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items ({items.length}):</span>
                <span>৳{itemsTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span className={deliveryFee === 0 ? "text-green-600 font-bold" : ""}>
                  {deliveryFee === 0 ? "FREE" : `৳${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Service Fee:</span>
                <span>৳{serviceFee}</span>
              </div>
              <div className="flex justify-between text-amazon-orange text-lg font-bold pt-2">
                <span>Order Total:</span>
                <span>৳{orderTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 text-xs">
              <p className="text-green-600 font-bold mb-2">
                <Truck className="w-4 h-4 inline mr-1" />
                FREE Delivery on orders over ৳50,000
              </p>
              <p className="text-gray-600">
                <ShieldCheck className="w-4 h-4 inline mr-1" />
                Secure checkout
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amazon-background py-10 border-t border-gray-300">
        <div className="max-w-[1100px] mx-auto text-center text-[10px] text-gray-500 space-y-2">
          <div className="flex justify-center gap-6 text-amazon-blue text-xs mb-2">
            <Link href="#" className="hover:underline">
              Conditions of Use
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Notice
            </Link>
            <Link href="#" className="hover:underline">
              Help
            </Link>
          </div>
          <p>
            &copy; 2025 Gadgets BD - Premium Tech Marketplace. All rights
            reserved by LWS.
          </p>
        </div>
      </footer>
    </div>
  );
}
