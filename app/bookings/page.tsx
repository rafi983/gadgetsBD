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

export default function BookingsPage() {
  return (
    <div id="top" className="min-h-screen bg-white text-amazon-text flex flex-col">
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

            <Link href="/login" className="hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer">
              <div className="text-xs leading-none text-gray-300">Hello, John</div>
              <div className="font-bold text-sm">Account &amp; Lists</div>
            </Link>

            <Link href="/cart" className="flex items-end hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer relative">
              <ShoppingCart className="w-8 h-8" />
              <span className="font-bold text-amazon-secondary absolute top-0 left-1/2 -translate-x-1/2 text-sm">0</span>
              <span className="font-bold text-sm hidden md:block">Cart</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto w-full p-4 py-6">
        <div className="flex items-center gap-2 text-sm mb-4">
          <a href="#" className="text-amazon-blue hover:underline">
            Your Account
          </a>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-amazon-orange">Your Orders</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-normal">Your Orders</h1>
        </div>

        <div className="text-sm mb-6 flex items-center gap-1">
          <span className="font-bold">2 orders</span>
          <span>placed in</span>
          <select className="bg-gray-100 border border-gray-300 rounded shadow-sm px-2 py-1 text-xs outline-none hover:bg-gray-200">
            <option>past 3 months</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>

        <div className="space-y-6">
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center text-xs text-gray-600 border-b border-gray-300">
              <div className="flex gap-10">
                <div>
                  <div className="uppercase tracking-tighter">Order Placed</div>
                  <div className="font-normal text-sm text-gray-900 mt-1">January 20, 2025</div>
                </div>
                <div>
                  <div className="uppercase tracking-tighter">Total</div>
                  <div className="font-normal text-sm text-gray-900 mt-1">৳4,02,500</div>
                </div>
                <div>
                  <div className="uppercase tracking-tighter">Ship to</div>
                  <div className="font-normal text-sm text-amazon-blue mt-1 hover:underline cursor-pointer">John Doe</div>
                </div>
              </div>
              <div className="text-right">
                <div className="uppercase tracking-tighter mb-1">Order # GB-2025-001234</div>
                <a href="#" className="text-amazon-blue hover:underline">
                  View order details
                </a>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=200"
                  className="w-32 h-32 object-cover border border-gray-200 rounded"
                  alt="MacBook"
                />
                <div className="flex-1">
                  <Link href="/details" className="text-amazon-blue hover:underline font-bold text-sm">
                    Apple MacBook Pro 16&quot; M2 Max - 32GB RAM, 1TB SSD
                  </Link>
                  <p className="text-xs text-gray-600 mt-1">Sold by: Official Apple Store</p>
                  <p className="text-xs text-gray-600 mt-1">Quantity: 1</p>
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      Delivered
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50 flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      Download Invoice
                    </button>
                    <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50">Write a Review</button>
                    <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50">Buy it again</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
                  className="w-32 h-32 object-cover border border-gray-200 rounded"
                  alt="Headphones"
                />
                <div className="flex-1">
                  <Link href="/details" className="text-amazon-blue hover:underline font-bold text-sm">
                    Sony WH-1000XM5 Wireless Noise Canceling Headphones
                  </Link>
                  <p className="text-xs text-gray-600 mt-1">Sold by: Sony Official</p>
                  <p className="text-xs text-gray-600 mt-1">Quantity: 1</p>
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      Delivered
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50 flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      Download Invoice
                    </button>
                    <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50">Write a Review</button>
                    <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50">Buy it again</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center text-xs text-gray-600 border-b border-gray-300">
              <div className="flex gap-10">
                <div>
                  <div className="uppercase tracking-tighter">Order Placed</div>
                  <div className="font-normal text-sm text-gray-900 mt-1">January 15, 2025</div>
                </div>
                <div>
                  <div className="uppercase tracking-tighter">Total</div>
                  <div className="font-normal text-sm text-gray-900 mt-1">৳18,500</div>
                </div>
                <div>
                  <div className="uppercase tracking-tighter">Ship to</div>
                  <div className="font-normal text-sm text-amazon-blue mt-1 hover:underline cursor-pointer">John Doe</div>
                </div>
              </div>
              <div className="text-right">
                <div className="uppercase tracking-tighter mb-1">Order # GB-2025-001233</div>
                <a href="#" className="text-amazon-blue hover:underline">
                  View order details
                </a>
              </div>
            </div>

            <div className="p-6">
              <div className="flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=200"
                  className="w-32 h-32 object-cover border border-gray-200 rounded"
                  alt="Keyboard"
                />
                <div className="flex-1">
                  <Link href="/details" className="text-amazon-blue hover:underline font-bold text-sm">
                    Razer BlackWidow V4 Pro Mechanical Gaming Keyboard
                  </Link>
                  <p className="text-xs text-gray-600 mt-1">Sold by: Razer Store</p>
                  <p className="text-xs text-gray-600 mt-1">Quantity: 1</p>
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      <Truck className="w-3 h-3 inline mr-1" />
                      Shipped
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50 flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      Download Invoice
                    </button>
                    <button className="px-4 py-1.5 border border-red-300 bg-red-50 text-red-700 rounded-md text-xs hover:bg-red-100 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-amazon-light text-white mt-8">
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
          <p className="text-xs text-gray-400">&copy; 2025 Gadgets BD - Premium Tech Marketplace. All rights reserved by LWS.</p>
        </div>
      </footer>
    </div>
  );
}

