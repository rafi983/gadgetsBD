import Link from "next/link";
import { Lock, Truck, ShieldCheck } from "lucide-react";

export default function PaymentProcessPage() {
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
            Checkout (<span className="text-amazon-secondary">3 items</span>)
          </h1>
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1100px] mx-auto flex-1 py-10 px-4 flex flex-col lg:flex-row gap-8">
        {/* Left Side: Steps */}
        <div className="flex-1 space-y-6">
          {/* 1. Shipping Address Summary */}
          <div className="hover:bg-gray-50 border-b border-gray-300 pb-6 flex justify-between items-start transition-colors cursor-pointer">
            <div>
              <span className="text-[20px] font-bold text-[#333] mr-4">1</span>
              <span className="font-bold text-lg">Shipping address</span>
            </div>
            <div className="text-sm flex-1 ml-10">
              <p>John Doe</p>
              <p>123 Main St, Apartment 4B</p>
              <p>Dhaka, 1212</p>
              <p>Bangladesh</p>
              <p className="mt-1 text-gray-600">Phone: +880 1712-345678</p>
            </div>
            <Link
              href="#"
              className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange"
            >
              Change
            </Link>
          </div>

          {/* 2. Selected Products List */}
          <div className="pb-6 border-b border-gray-300">
            <div className="flex items-center mb-4">
              <span className="text-[20px] font-bold text-[#333] mr-4">2</span>
              <span className="font-bold text-lg">Review items</span>
            </div>

            <div className="border border-[#ddd] rounded-md bg-white p-4 space-y-4">
              {/* Product 1 */}
              <div className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                <div className="w-24 h-24 bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=300"
                    className="h-full object-cover"
                    alt="Laptop"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-1">
                    Apple MacBook Pro 16&quot; M2 Max - 32GB RAM, 1TB SSD
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Sold by: Official Apple Store
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-amazon-orange">
                      ৳3,45,000
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span>Qty:</span>
                      <select className="border border-gray-300 rounded px-2 py-0.5">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                <div className="w-24 h-24 bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
                    className="h-full object-cover"
                    alt="Headphones"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-1">
                    Sony WH-1000XM5 Wireless Noise Canceling Headphones
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Sold by: Sony Official
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-amazon-orange">
                      ৳38,500
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span>Qty:</span>
                      <select className="border border-gray-300 rounded px-2 py-0.5">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                <div className="w-24 h-24 bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300"
                    className="h-full w-full object-cover"
                    alt="Keyboard"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-1">
                    Razer BlackWidow V4 Pro Mechanical Gaming Keyboard
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Sold by: Razer Store
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-amazon-orange">
                      ৳18,500
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span>Qty:</span>
                      <select className="border border-gray-300 rounded px-2 py-0.5">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
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
              action="/success"
              method="POST"
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

                <div className="h-px bg-gray-200"></div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-[300px]">
          <div className="border border-[#ddd] rounded-md bg-white p-4 sticky top-10">
            {/* We can place the submit button outside the form only if form attribute is used. We will leave it as an onClick triggering form submit or switch to button type="submit" form="paymentForm" */}
            <button
              form="paymentForm"
              type="submit"
              className="w-full py-2 mb-4 rounded-md bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] border-t-[#a88734] border-x-[#9c7e31] border-b-[#846a29] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:from-[#f5d78e] hover:to-[#eeb933] text-sm font-normal"
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
                <span>Items (3):</span>
                <span>৳4,02,000</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Service Fee:</span>
                <span>৳500</span>
              </div>
              <div className="flex justify-between text-amazon-orange text-lg font-bold pt-2">
                <span>Order Total:</span>
                <span>৳4,02,500</span>
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



