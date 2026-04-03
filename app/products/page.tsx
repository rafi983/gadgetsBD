import Link from "next/link";
import { ChevronDown, Search, ShoppingCart, Star } from "lucide-react";

const productRows = [
  {
    name: 'Apple MacBook Pro 16" M2 Max - 32GB RAM, 1TB SSD, Space Gray',
    rating: "1,245",
    price: "৳3,45,000",
    image: "https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=300",
    desc: "Apple M2 Max chip | 16-inch Liquid Retina XDR display | 1080p FaceTime HD camera",
    stars: 5,
  },
  {
    name: "iPhone 15 Pro Max 256GB - Blue Titanium",
    rating: "2,891",
    price: "৳1,65,000",
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=300",
    desc: "A17 Pro chip | Titanium design | 48MP Main camera | Action button",
    stars: 5,
  },
  {
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones - Black",
    rating: "5,432",
    price: "৳38,500",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
    desc: "Industry-leading noise canceling | 30-hour battery life | Multipoint connection",
    stars: 4,
  },
  {
    name: "Dell XPS 15 Laptop - Intel i7 13th Gen, 16GB RAM, 512GB SSD",
    rating: "892",
    price: "৳1,85,000",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300",
    desc: "15.6\" FHD+ Display | NVIDIA GeForce RTX 4050 | Windows 11 Pro",
    stars: 4,
  },
  {
    name: "Samsung Galaxy Watch 6 Classic - 47mm, Black",
    rating: "1,567",
    price: "৳42,000",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300",
    desc: "Advanced health monitoring | Sleep tracking | GPS | Water resistant",
    stars: 4,
  },
  {
    name: "Razer BlackWidow V4 Pro Mechanical Gaming Keyboard - RGB",
    rating: "3,241",
    price: "৳18,500",
    image: "https://images.unsplash.com/photo-1527690710675-4ae7d334803b?w=300",
    desc: "Razer Green Mechanical Switches | Chroma RGB | Programmable keys",
    stars: 5,
  },
];

export default function ProductsPage() {
  return (
    <div id="top" className="bg-white text-amazon-text flex min-h-screen flex-col">
      <nav className="bg-amazon text-white">
        <div className="max-w-[1500px] mx-auto flex items-center p-2 gap-4">
          <Link href="/" className="flex items-center rounded-sm p-1 hover:outline hover:outline-1 hover:outline-white">
            <span className="text-2xl font-bold tracking-tighter">gadgets<span className="italic text-amazon-secondary">BD</span></span>
          </Link>

          <div className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-3 focus-within:ring-amazon-secondary">
            <div className="bg-gray-100 flex items-center px-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200">
              <span className="text-xs text-black">Electronics</span>
              <ChevronDown className="w-3 h-3 ml-1 text-gray-500" />
            </div>
            <input type="text" placeholder="Search Gadgets, Laptops, Phones..." className="flex-1 px-3 text-black outline-none" defaultValue="" />
            <button className="bg-amazon-secondary hover:bg-[#fa8900] px-4 flex items-center justify-center">
              <Search className="text-black w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center rounded-sm p-1 cursor-pointer hover:outline hover:outline-1 hover:outline-white"><div className="font-bold text-sm">EN</div></div>
            <Link href="/login" className="rounded-sm p-1 cursor-pointer hover:outline hover:outline-1 hover:outline-white">
              <div className="text-xs leading-none text-gray-300">Hello, Sign in</div>
              <div className="font-bold text-sm">Account &amp; Lists</div>
            </Link>
            <Link href="/cart" className="flex items-end rounded-sm p-1 cursor-pointer relative hover:outline hover:outline-1 hover:outline-white">
              <ShoppingCart className="w-8 h-8" />
              <span className="font-bold text-amazon-secondary absolute top-0 left-1/2 -translate-x-1/2 text-sm">3</span>
              <span className="font-bold text-sm hidden md:block">Cart</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
        <div className="flex justify-between items-center mb-4 shadow-sm border-b pb-2">
          <div className="text-sm"><span>1-16 of over 500 results for</span> <span className="font-bold text-amazon-orange">&quot;Electronics&quot;</span></div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort by:</span>
            <select className="text-sm bg-gray-100 border border-gray-300 rounded px-2 py-1 shadow-sm focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary">
              <option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Avg. Customer Review</option><option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-64 hidden lg:block flex-shrink-0 border-r pr-4">
            {["Category", "Brand", "Customer Reviews", "Price", "Availability", "Condition"].map((section) => (
              <div key={section} className="mb-6 border-t pt-4 first:border-t-0 first:pt-0">
                <h3 className="font-bold text-base mb-3">{section}</h3>
                <div className="space-y-2 text-sm">
                  {section === "Category" && ["Laptops & Computers", "Smartphones & Tablets", "Audio & Headphones", "Gaming Accessories", "Cameras & Photography", "Wearables & Smartwatches"].map((x) => <label key={x} className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary" /><span>{x}</span></label>)}
                  {section === "Brand" && ["Apple", "Samsung", "Dell", "HP", "Lenovo", "Sony", "Razer"].map((x) => <label key={x} className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary" /><span>{x}</span></label>)}
                  {section === "Customer Reviews" && [4, 3].map((n) => <label key={n} className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary" /><div className="flex items-center gap-1"><div className="flex text-amazon-secondary text-sm">{[1,2,3,4,5].map((s)=><Star key={s} className={s<=n?"w-4 h-4 fill-current":"w-4 h-4"} />)}</div><span>&amp; Up</span></div></label>)}
                  {section === "Price" && ["Under ৳10,000", "৳10,000 - ৳25,000", "৳25,000 - ৳50,000", "৳50,000 - ৳1,00,000", "Over ৳1,00,000"].map((x) => <label key={x} className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary" /><span>{x}</span></label>)}
                  {section === "Availability" && ["In Stock", "Pre-Order"].map((x) => <label key={x} className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary" /><span>{x}</span></label>)}
                  {section === "Condition" && ["New", "Renewed"].map((x, i) => <label key={x} className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"><input defaultChecked={i===0} type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary" /><span>{x}</span></label>)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1">
            <div className="space-y-4">
              {productRows.map((product) => (
                <Link key={product.name} href="/details" className="flex gap-4 p-4 border rounded hover:shadow-md transition">
                  <div className="w-48 h-48 flex-shrink-0 bg-gray-50 flex items-center justify-center">
                    <img src={product.image} className="h-full object-cover mix-blend-multiply" alt={product.name} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-amazon-blue hover:text-amazon-orange font-normal mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-amazon-secondary">
                        {[1,2,3,4,5].map((s) => <Star key={s} className={s <= product.stars ? "w-4 h-4 fill-current" : "w-4 h-4"} />)}
                      </div>
                      <span className="text-sm text-amazon-blue">{product.rating}</span>
                    </div>
                    <div className="mb-2"><span className="text-2xl font-normal">{product.price}</span></div>
                    <p className="text-sm text-gray-600 mb-2">FREE delivery <strong>Tomorrow</strong></p>
                    <p className="text-xs text-gray-500">{product.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-amazon-light text-white mt-8">
        <a href="#top" className="bg-[#37475A] py-4 text-center hover:bg-[#485769] transition cursor-pointer block"><span className="text-sm font-medium">Back to top</span></a>
        <div className="max-w-[1000px] mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div><h3 className="font-bold mb-4">Get to Know Us</h3><ul className="space-y-2 text-gray-300"><li><a href="#" className="hover:underline">About Gadgets BD</a></li><li><a href="#" className="hover:underline">Careers</a></li><li><Link href="/shops" className="hover:underline">Our Top Brands</Link></li></ul></div>
          <div><h3 className="font-bold mb-4">Make Money with Us</h3><ul className="space-y-2 text-gray-300"><li><Link href="/register" className="hover:underline">Sell on Gadgets BD</Link></li><li><Link href="/create" className="hover:underline">Supply to Gadgets BD</Link></li><li><Link href="/manage-list" className="hover:underline">Become an Affiliate</Link></li></ul></div>
          <div><h3 className="font-bold mb-4">Payment Products</h3><ul className="space-y-2 text-gray-300"><li><a href="#" className="hover:underline">Gadgets BD Business Card</a></li><li><a href="#" className="hover:underline">Shop with Points</a></li><li><a href="#" className="hover:underline">Reload Your Balance</a></li></ul></div>
          <div><h3 className="font-bold mb-4">Let Us Help You</h3><ul className="space-y-2 text-gray-300"><li><a href="#" className="hover:underline">Your Account</a></li><li><Link href="/bookings" className="hover:underline">Your Orders</Link></li><li><a href="#" className="hover:underline">Shipping Rates &amp; Policies</a></li><li><a href="#" className="hover:underline">Returns &amp; Replacements</a></li><li><Link href="/forget-password" className="hover:underline">Manage Your Content and Devices</Link></li><li><a href="#" className="hover:underline">Help</a></li></ul></div>
        </div>
        <div className="border-t border-gray-600 text-center py-8"><div className="flex justify-center items-center gap-4 mb-4"><span className="text-2xl font-bold tracking-tighter">gadgets<span className="italic text-gray-400">BD</span></span></div><p className="text-xs text-gray-400">&copy; 2025 Gadgets BD - Premium Tech Marketplace. All rights reserved by LWS.</p></div>
      </footer>
    </div>
  );
}

