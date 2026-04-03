import Link from "next/link";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

const relatedProducts = [
  ["Apple MacBook Air M2", "৳1,35,000", "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200"],
  ["Dell XPS 15 Laptop", "৳1,85,000", "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=200"],
  ["Magic Keyboard", "৳12,500", "https://images.unsplash.com/photo-1527690710675-4ae7d334803b?w=200"],
  ["Magic Mouse", "৳8,500", "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200"],
  ["AirPods Pro", "৳28,500", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"],
  ["Apple Watch Series 9", "৳45,000", "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200"],
] as const;

function StarRow({ size = 16 }: { size?: number }) {
  return (
    <div className="flex text-amazon-secondary">
      <Star className="fill-current" size={size} />
      <Star className="fill-current" size={size} />
      <Star className="fill-current" size={size} />
      <Star className="fill-current" size={size} />
      <Star className="fill-current" size={size} />
    </div>
  );
}

export default function DetailsPage() {
  return (
    <div id="top" className="bg-white text-amazon-text flex min-h-screen flex-col">
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
            <input type="text" placeholder="Search Gadgets, Laptops, Phones..." className="flex-1 px-3 text-black outline-none" />
            <button className="bg-amazon-secondary hover:bg-[#fa8900] px-4 flex items-center justify-center">
              <Search className="text-black w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer">
              <div className="font-bold text-sm">EN</div>
            </div>

            <Link href="/login" className="hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer">
              <div className="text-xs leading-none text-gray-300">Hello, Sign in</div>
              <div className="font-bold text-sm">Account &amp; Lists</div>
            </Link>

            <Link href="/cart" className="flex items-end hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer relative">
              <ShoppingCart className="w-8 h-8" />
              <span className="font-bold text-amazon-secondary absolute top-0 left-1/2 -translate-x-1/2 text-sm">3</span>
              <span className="font-bold text-sm hidden md:block">Cart</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:underline">Electronics</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:underline">Laptops &amp; Computers</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-amazon-text font-bold">MacBook Pro</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 flex gap-4">
            <div className="flex flex-col gap-2">
              <button className="w-10 h-10 border border-amazon-secondary rounded overflow-hidden hover:shadow-md">
                <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=100" className="w-full h-full object-cover" alt="Preview" />
              </button>
              <button className="w-10 h-10 border border-gray-300 rounded overflow-hidden hover:shadow-md">
                <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100" className="w-full h-full object-cover" alt="Preview" />
              </button>
              <button className="w-10 h-10 border border-gray-300 rounded overflow-hidden hover:shadow-md">
                <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=100" className="w-full h-full object-cover" alt="Preview" />
              </button>
            </div>
            <div className="flex-1 border border-gray-200 rounded p-4 bg-gray-50">
              <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600" className="w-full h-auto object-cover" alt="Product" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <h1 className="text-2xl font-normal mb-2">Apple MacBook Pro 16&quot; M2 Max - 32GB RAM, 1TB SSD, Space Gray</h1>
            <p className="text-sm text-gray-600 mb-3">
              Visit the <Link href="/shops" className="text-amazon-blue hover:underline">Apple Store</Link>
            </p>

            <div className="flex items-center gap-2 mb-4">
              <StarRow size={16} />
              <span className="text-sm text-amazon-blue hover:underline cursor-pointer">1,245 ratings</span>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-sm">Price:</span>
                <span className="text-3xl text-amazon-orange">৳3,45,000</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">Inclusive of all taxes</p>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <h3 className="font-bold text-base mb-2">About this item</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Apple M2 Max chip for exceptional performance</li>
                <li>16-inch Liquid Retina XDR display</li>
                <li>32GB unified memory, 1TB SSD storage</li>
                <li>1080p FaceTime HD camera</li>
                <li>Six-speaker sound system with force-cancelling woofers</li>
                <li>Up to 21 hours battery life</li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm mb-2"><span className="font-bold">Category:</span> Laptops &amp; Computers</p>
              <p className="text-sm mb-2"><span className="font-bold">Brand:</span> Apple</p>
              <p className="text-sm"><span className="font-bold">Stock:</span> <span className="text-green-600 font-semibold">24 units available</span></p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="border border-gray-200 rounded p-4">
              <div className="text-3xl text-amazon-orange mb-2">৳3,45,000</div>
              <p className="text-sm mb-3"><span className="font-bold">FREE delivery</span> <strong>Tomorrow</strong></p>
              <p className="text-green-600 font-bold text-sm mb-4">In Stock</p>

              <div className="mb-4">
                <label className="text-sm font-bold block mb-2">Quantity:</label>
                <select className="w-20 border border-gray-300 rounded px-3 py-1 text-sm">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>

              <button className="w-full bg-amazon-yellow hover:bg-amazon-yellow_hover py-2 rounded-md shadow-sm mb-2 text-sm font-medium border border-amazon-secondary">Add to Cart</button>
              <button className="w-full bg-amazon-secondary hover:bg-amazon-secondary_hover py-2 rounded-md shadow-sm text-sm font-medium text-white">Buy Now</button>

              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
                <p className="mb-1"><ShieldCheck className="w-4 h-4 inline mr-1" /> Secure transaction</p>
                <p className="mb-1"><Truck className="w-4 h-4 inline mr-1" /> Ships from Gadgets BD</p>
                <p><Package className="w-4 h-4 inline mr-1" /> Sold by Official Apple Store</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="border-b border-gray-300 mb-6">
            <div className="flex gap-8">
              <button className="pb-2 px-1 text-sm font-medium border-b-2 border-amazon-orange text-amazon-orange">Description</button>
              <button className="pb-2 px-1 text-sm font-medium text-gray-600 hover:text-amazon-orange">Reviews</button>
              <button className="pb-2 px-1 text-sm font-medium text-gray-600 hover:text-amazon-orange">Shop Info</button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Product Description</h2>
            <div className="max-w-none text-sm">
              <p className="mb-4">The Apple MacBook Pro 16&quot; with M2 Max chip delivers groundbreaking performance and amazing battery life. Whether you&apos;re compiling code, editing 8K video, or working with massive 3D models, the M2 Max chip handles it all with ease.</p>
              <p className="mb-4">The stunning 16-inch Liquid Retina XDR display features Extreme Dynamic Range, over 1000 nits of brightness for HDR content, and pro reference modes. The advanced thermal system sustains pro-level performance, and the six-speaker sound system with force-cancelling woofers creates an immersive audio experience.</p>
              <h3 className="font-bold mt-6 mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Apple M2 Max chip with 12-core CPU and 38-core GPU</li>
                <li>32GB unified memory for seamless multitasking</li>
                <li>1TB SSD storage</li>
                <li>16-inch Liquid Retina XDR display (3456 x 2234)</li>
                <li>1080p FaceTime HD camera</li>
                <li>Three Thunderbolt 4 ports, HDMI port, SDXC card slot</li>
                <li>MagSafe 3 charging port</li>
                <li>Backlit Magic Keyboard with Touch ID</li>
              </ul>
            </div>
          </div>

          <div className="hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Customer Reviews</h2>
              <Link href="/review-modal" className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-4 py-2 rounded-md text-sm font-medium border border-amazon-secondary">Write a Review</Link>
            </div>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <StarRow size={20} />
                <span className="text-lg font-bold">4.8 out of 5</span>
              </div>
              <span className="text-sm text-gray-600">1,245 global ratings</span>
            </div>
            <button className="mt-6 px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">Load More Reviews</button>
          </div>

          <div className="hidden">
            <h2 className="text-xl font-bold mb-4">Shop Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">Official Apple Store</h3>
                <p className="text-sm text-gray-600 mb-4">Authorized Apple reseller providing genuine products with official warranty.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Policies</h3>
                <div className="space-y-2 text-sm">
                  <p><CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />14-day return policy</p>
                  <p><CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />1-year official warranty</p>
                  <p><CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />Free shipping on orders over ৳50,000</p>
                  <p><CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />Secure payment options</p>
                </div>
                <Link href="/shops" className="inline-block mt-4 text-amazon-blue hover:underline text-sm">Visit Shop Page -&gt;</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedProducts.map(([name, price, image]) => (
              <Link key={name} href="/details" className="border border-gray-200 rounded p-3 hover:shadow-md transition">
                <div className="bg-gray-50 h-32 flex items-center justify-center mb-2">
                  <img src={image} className="h-full object-cover" alt={name} />
                </div>
                <p className="text-sm text-amazon-blue hover:text-amazon-orange line-clamp-2 mb-1">{name}</p>
                <p className="text-sm font-bold">{price}</p>
              </Link>
            ))}
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
              <li><a href="#" className="hover:underline">About Gadgets BD</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><Link href="/shops" className="hover:underline">Our Top Brands</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/register" className="hover:underline">Sell on Gadgets BD</Link></li>
              <li><Link href="/create" className="hover:underline">Supply to Gadgets BD</Link></li>
              <li><Link href="/manage-list" className="hover:underline">Become an Affiliate</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Payment Products</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:underline">Gadgets BD Business Card</a></li>
              <li><a href="#" className="hover:underline">Shop with Points</a></li>
              <li><a href="#" className="hover:underline">Reload Your Balance</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:underline">Your Account</a></li>
              <li><Link href="/bookings" className="hover:underline">Your Orders</Link></li>
              <li><a href="#" className="hover:underline">Shipping Rates &amp; Policies</a></li>
              <li><a href="#" className="hover:underline">Returns &amp; Replacements</a></li>
              <li><Link href="/forget-password" className="hover:underline">Manage Your Content and Devices</Link></li>
              <li><a href="#" className="hover:underline">Help</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 text-center py-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-2xl font-bold tracking-tighter">gadgets<span className="italic text-gray-400">BD</span></span>
          </div>
          <p className="text-xs text-gray-400">&copy; 2025 Gadgets BD - Premium Tech Marketplace. All rights reserved by LWS.</p>
        </div>
      </footer>
    </div>
  );
}
