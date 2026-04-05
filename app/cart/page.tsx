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

const cartItems = [
  {
    name: 'Apple MacBook Pro 16" M2 Max - 32GB RAM, 1TB SSD',
    image: "https://images.unsplash.com/photo-1517336712461-481140081023?w=300",
    seller: "Official Apple Store",
    price: "৳3,45,000",
  },
  {
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
    seller: "Sony Official",
    price: "৳38,500",
  },
  {
    name: "Razer BlackWidow V4 Pro Mechanical Gaming Keyboard",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300",
    seller: "Razer Store",
    price: "৳18,500",
  },
];

export default function CartPage() {
  return (
    <div id="top" className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
      <nav className="bg-amazon text-white">
        <div className="max-w-[1500px] mx-auto flex items-center p-2 gap-4">
          <Link href="/" className="flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1">
            <span className="text-2xl font-bold tracking-tighter">
              gadgets<span className="italic text-amazon-secondary">BD</span>
            </span>
          </Link>

          <div className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-3 focus-within:ring-amazon-secondary">
            <div className="bg-gray-100 flex items-center px-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200">
              <span className="text-xs text-black">Electronics</span>
              <ChevronDown className="w-3 h-3 ml-1 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search Gadgets, Laptops, Phones..."
              className="flex-1 px-3 text-black outline-none"
            />
            <button className="bg-amazon-secondary hover:bg-[#fa8900] px-4 flex items-center justify-center">
              <Search className="text-black w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer">
              <div className="font-bold text-sm">EN</div>
            </div>

            <UserNav />

            <Link href="/cart" className="flex items-end hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer relative">
              <ShoppingCart className="w-8 h-8" />
              <span className="font-bold text-amazon-secondary absolute top-0 left-1/2 -translate-x-1/2 text-sm">3</span>
              <span className="font-bold text-sm hidden md:block">Cart</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[1500px] mx-auto w-full p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="bg-white p-4 mb-4 border-b border-gray-300">
              <h1 className="text-2xl font-normal mb-2">Shopping Cart</h1>
              <div className="text-sm text-gray-600">
                <Link href="/products" className="text-amazon-blue hover:underline">
                  Continue shopping
                </Link>
              </div>
            </div>

            <div className="bg-white">
              {cartItems.map((item) => (
                <div key={item.name} className="p-4 border-b border-gray-300 flex gap-4 hover:bg-gray-50">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover rounded border border-gray-200"
                      alt="Product"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-base mb-1">
                      <Link href="/details" className="text-amazon-blue hover:text-amazon-orange hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-green-700 font-medium">In Stock</p>
                    <p className="text-xs text-gray-600 mt-1">Sold by: {item.seller}</p>
                    <p className="text-xs text-gray-600">Eligible for FREE Shipping</p>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600">Qty:</label>
                        <select className="border border-gray-400 rounded-md px-2 py-1 text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-amazon-blue">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>

                      <span className="text-gray-300">|</span>

                      <button className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline">
                        Delete
                      </button>

                      <span className="text-gray-300">|</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-amazon-orange">{item.price}</p>
                  </div>
                </div>
              ))}

              <div className="p-4 text-right">
                <p className="text-lg">
                  Subtotal (3 items):
                  <span className="font-bold text-amazon-orange">৳4,02,000</span>
                </p>
              </div>
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
                  Subtotal (3 items):
                  <span className="font-bold text-amazon-orange">৳4,02,000</span>
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

