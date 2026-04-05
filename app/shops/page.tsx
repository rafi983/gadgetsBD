import { UserNav } from "@/components/auth/UserNav";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingCart,
  Star,
  StarHalf,
} from "lucide-react";

const shopCards = [
  {
    name: "Tech Hub BD",
    location: "Dhaka, Bangladesh",
    ratings: "3,240 ratings",
    desc: "Leading retailer of laptops, computers, and accessories. Official partner of Apple, Dell, and HP with 10+ years of experience.",
    spec: "Laptops & PCs",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600",
    stars: "5",
    gradient: "from-blue-50 to-blue-100",
  },
  {
    name: "Mobile World",
    location: "Chittagong, Bangladesh",
    ratings: "2,856 ratings",
    desc: "Authorized dealer of Samsung, Apple, and Xiaomi smartphones. Offering genuine products with official warranty and after-sales service.",
    spec: "Smartphones",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600",
    stars: "4.5",
    gradient: "from-purple-50 to-purple-100",
  },
  {
    name: "Gaming Zone BD",
    location: "Dhaka, Bangladesh",
    ratings: "4,105 ratings",
    desc: "Premium gaming peripherals and accessories. Exclusive partner of Razer, Logitech G, and Corsair with expert gaming setup consultation.",
    spec: "Gaming Gear",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600",
    stars: "5",
    gradient: "from-red-50 to-red-100",
  },
  {
    name: "Audio Haven",
    location: "Sylhet, Bangladesh",
    ratings: "1,567 ratings",
    desc: "Specialist in premium audio equipment. Authorized retailer of Sony, Bose, and JBL with professional audio consultation services.",
    spec: "Audio & Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    stars: "4",
    gradient: "from-green-50 to-green-100",
  },
  {
    name: "Camera Corner",
    location: "Rajshahi, Bangladesh",
    ratings: "987 ratings",
    desc: "Professional photography equipment and accessories. Canon, Nikon, and Sony authorized dealer with expert photography guidance.",
    spec: "Cameras & Lenses",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600",
    stars: "4.5",
    gradient: "from-yellow-50 to-yellow-100",
  },
  {
    name: "Smart Watch Pro",
    location: "Dhaka, Bangladesh",
    ratings: "2,345 ratings",
    desc: "Leading retailer of smartwatches and wearables. Official partner of Apple Watch, Samsung Galaxy Watch, and Fitbit with health tracking expertise.",
    spec: "Wearables",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600",
    stars: "5",
    gradient: "from-indigo-50 to-indigo-100",
  },
];

function Rating({ value }: { value: string }) {
  if (value === "4.5") {
    return (
      <div className="flex text-amazon-secondary">
        {[1, 2, 3, 4].map((s) => (
          <Star key={s} className="w-4 h-4 fill-current" />
        ))}
        <StarHalf className="w-4 h-4 fill-current" />
      </div>
    );
  }

  return (
    <div className="flex text-amazon-secondary">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className="w-4 h-4 fill-current" />
      ))}
    </div>
  );
}

export default function ShopsPage() {
  return (
    <div id="top" className="bg-amazon-background text-amazon-text flex min-h-screen flex-col">
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
            <input type="text" placeholder="Search Shops..." className="flex-1 px-3 text-black outline-none" />
            <button className="bg-amazon-secondary hover:bg-[#fa8900] px-4 flex items-center justify-center"><Search className="text-black w-5 h-5" /></button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer"><div className="font-bold text-sm">EN</div></div>
            <UserNav />
            <Link href="/cart" className="flex items-end hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer relative"><ShoppingCart className="w-8 h-8" /><span className="font-bold text-amazon-secondary absolute top-0 left-1/2 -translate-x-1/2 text-sm">0</span><span className="font-bold text-sm hidden md:block">Cart</span></Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[1500px] mx-auto w-full p-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Featured Shops &amp; Storefronts</h1>
          <p className="text-sm text-gray-600">Discover trusted tech shops delivering premium gadgets across Bangladesh.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {shopCards.map((shop) => (
            <div key={shop.name} className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className={`h-48 overflow-hidden bg-gradient-to-br ${shop.gradient}`}>
                <img src={shop.image} className="w-full h-full object-cover" alt="Shop" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-amazon-blue hover:text-amazon-orange hover:underline cursor-pointer">{shop.name}</h3>
                    <p className="text-sm text-gray-500">{shop.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2"><Rating value={shop.stars} /><span className="text-xs text-amazon-blue">{shop.ratings}</span></div>

                <p className="text-sm line-clamp-3 mb-4 text-gray-700">{shop.desc}</p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs"><span className="text-gray-500">Specializes in:</span> <span className="font-bold">{shop.spec}</span></div>
                  <Link href="/products" className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-4 py-1.5 rounded-full text-xs font-bold shadow-sm transition-colors">Visit Shop</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled><ChevronLeft className="w-4 h-4" /></button>
          <button className="px-4 py-2 bg-amazon-yellow border border-amazon-secondary rounded-md text-sm font-bold">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">3</button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">4</button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </main>

      <footer className="bg-amazon-light text-white mt-12">
        <a href="#top" className="bg-[#37475A] py-4 text-center hover:bg-[#485769] transition cursor-pointer block"><span className="text-sm font-medium">Back to top</span></a>
        <div className="max-w-[1000px] mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-300">
          <div><h3 className="font-bold mb-4 text-white">Get to Know Us</h3><ul className="space-y-2"><li><a href="#" className="hover:underline">About Gadgets BD</a></li><li><a href="#" className="hover:underline">Careers</a></li></ul></div>
          <div><h3 className="font-bold mb-4 text-white">Make Money with Us</h3><ul className="space-y-2"><li><Link href="/register" className="hover:underline">Sell on Gadgets BD</Link></li><li><Link href="/create" className="hover:underline">Become a Vendor</Link></li></ul></div>
          <div><h3 className="font-bold mb-4 text-white">Payment Products</h3><ul className="space-y-2"><li><a href="#" className="hover:underline">Gadgets BD Card</a></li></ul></div>
          <div><h3 className="font-bold mb-4 text-white">Let Us Help You</h3><ul className="space-y-2"><li><a href="#" className="hover:underline">Your Account</a></li><li><Link href="/bookings" className="hover:underline">Your Orders</Link></li><li><a href="#" className="hover:underline">Help Center</a></li></ul></div>
        </div>
        <div className="border-t border-gray-700 text-center py-8"><p className="text-xs text-gray-400">&copy; 2025 Gadgets BD - Premium Tech Marketplace. All rights reserved by LWS.</p></div>
      </footer>
    </div>
  );
}

