import { UserNav } from "@/components/auth/UserNav";
import Link from "next/link";
import { CreditCard, Headphones, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { SearchForm } from "@/components/ui/search-form";
import dbConnect from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { CartBadge } from "@/components/ui/cart-badge";

export default async function Home() {
  await dbConnect();
  
  // Find products sorted by purchases descending, limit to 5
  const featuredProductsData = await Product.find({ purchases: { $gt: 0 } })
    .sort({ purchases: -1 })
    .limit(5)
    .lean();

  const featured = JSON.parse(JSON.stringify(featuredProductsData));
  
  // Fetch actual brands from database 
  const dbBrands = await Product.distinct("about.brand");
  const brands = dbBrands.filter(b => b).slice(0, 10);

  return (
    <div id="top" className="bg-amazon-background text-amazon-text flex min-h-screen flex-col">
      <nav className="bg-amazon text-white">
        <div className="mx-auto flex max-w-[1500px] items-center gap-4 p-2">
          <Link href="/" className="flex items-center rounded-sm p-1 hover:outline hover:outline-1 hover:outline-white">
            <span className="text-2xl font-bold tracking-tighter">
              gadgets<span className="italic text-amazon-secondary">BD</span>
            </span>
          </Link>

          <SearchForm />

          <div className="flex items-center gap-4">
            <div className="hidden cursor-pointer items-center rounded-sm p-1 hover:outline hover:outline-1 hover:outline-white md:flex">
              <div className="text-sm font-bold">EN</div>
            </div>

            <UserNav />

            <CartBadge />
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-[1500px] flex-1">
        <div
          className="relative h-64 w-full bg-cover bg-center md:h-80"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2574&auto=format&fit=crop')" }}
        >
          <div className="from-amazon-background absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>

        <div className="relative z-10 -mt-32 px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="z-20 flex flex-col gap-4 bg-white p-4 shadow-sm">
              <h2 className="text-xl font-bold">Laptops &amp; PCs</h2>
              <div className="grid h-full grid-cols-2 gap-2">
                <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300" className="mb-1 h-full w-full object-cover" alt="Laptop" />
                <img src="https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=300" className="mb-1 h-full w-full object-cover" alt="Laptop" />
                <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300" className="mb-1 h-full w-full object-cover" alt="Laptop" />
                <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300" className="mb-1 h-full w-full object-cover" alt="Laptop" />
              </div>
              <Link href="/products?category=Laptops" className="mt-auto text-sm text-amazon-blue hover:text-red-700 hover:underline">
                See all laptops
              </Link>
            </div>

            <div className="z-20 flex flex-col gap-4 bg-white p-4 shadow-sm">
              <h2 className="text-xl font-bold">Smartphones</h2>
              <div className="flex h-full w-full items-center justify-center overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" className="h-full w-full object-cover" alt="Smartphone" />
              </div>
              <Link href="/products?category=Smartphone" className="mt-auto text-sm text-amazon-blue hover:text-red-700 hover:underline">
                Shop smartphones
              </Link>
            </div>

            <div className="z-20 flex flex-col gap-4 bg-white p-4 shadow-sm">
              <h2 className="text-xl font-bold">Audio</h2>
              <div className="flex h-full w-full items-center justify-center overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" className="h-full w-full object-cover" alt="Audio" />
              </div>
              <Link href="/products?category=Audio" className="mt-auto text-sm text-amazon-blue hover:text-red-700 hover:underline">
                Shop audio
              </Link>
            </div>

            <div className="z-20 flex flex-col gap-4 bg-white p-4 shadow-sm">
              <h2 className="text-xl font-bold">Cameras</h2>
              <div className="flex h-full w-full items-center justify-center overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500" className="h-full w-full object-cover" alt="Camera" />
              </div>
              <Link href="/products?category=Camera" className="mt-auto text-sm text-amazon-blue hover:text-red-700 hover:underline">
                Shop cameras
              </Link>
            </div>
          </div>

          {featured.length > 0 && (
            <div className="mt-8 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-xl font-bold">Featured Products</h2>
                <Link href="/products" className="text-sm text-amazon-blue hover:text-red-700 hover:underline">
                  View All
                </Link>
              </div>

              <div className="scrollbar-hide flex gap-6 overflow-x-auto pb-4">
                {featured.map((product: { _id: string; name: string; image: string; vendor: string; price: number }) => (
                  <div key={product._id} className="w-48 flex-none">
                    <Link href={`/details/${product._id}`}>
                      <div className="mb-2 flex h-48 items-center justify-center bg-gray-50 p-2">
                        <img src={product.image} className="h-full object-cover mix-blend-multiply" alt={product.name} />
                      </div>
                      <div className="line-clamp-2 text-sm text-amazon-blue hover:text-amazon-orange">{product.name}</div>
                    </Link>
                    <div className="text-xs text-gray-500">{product.vendor}</div>
                    <div className="mt-1">
                      <span className="text-xs align-top font-bold">৳</span>
                      <span className="text-xl font-bold">{product.price.toLocaleString()}</span>
                    </div>
                    <div className="mb-2 text-xs text-gray-500">Get it by Tomorrow</div>
                    <AddToCartButton product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white py-12">
          <div className="mx-auto max-w-[1500px] px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">Why Shop with Gadgets BD?</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amazon-yellow">
                  <Truck className="text-amazon h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Get your gadgets delivered within 24-48 hours across Bangladesh</p>
              </div>
              <div className="p-4 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amazon-yellow">
                  <ShieldCheck className="text-amazon h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold">100% Authentic</h3>
                <p className="text-sm text-gray-600">All products are genuine with official warranty and certifications</p>
              </div>
              <div className="p-4 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amazon-yellow">
                  <Headphones className="text-amazon h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold">24/7 Support</h3>
                <p className="text-sm text-gray-600">Our customer service team is always ready to help you</p>
              </div>
              <div className="p-4 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amazon-yellow">
                  <CreditCard className="text-amazon h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Secure Payment</h3>
                <p className="text-sm text-gray-600">Multiple payment options with 100% secure transactions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] px-4 py-8">
          <h2 className="mb-6 text-2xl font-bold">Popular Categories</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              ["Laptops & PCs", "Laptops", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200"],
              ["Smartphones", "Smartphone", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200"],
              ["Audio", "Audio", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"],
              ["Cameras", "Camera", "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200"],
              ["Wearables", "Wearables", "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=200"],
              ["All Products", "", "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200"],
            ].map(([label, query, image]) => (
              <Link key={label} href={`/products${query ? `?category=${encodeURIComponent(query)}` : ''}`} className="rounded border border-gray-200 bg-white p-4 text-center transition-shadow hover:shadow-md">
                <div className="mb-2 flex h-32 items-center justify-center">
                  <img src={image} className="h-full object-cover" alt={label} />
                </div>
                <h3 className="text-sm font-medium">{label}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white py-8">
          <div className="mx-auto max-w-[1500px] px-4">
            <h2 className="mb-6 text-2xl font-bold">Shop by Brand</h2>
            <div className="flex flex-wrap gap-4 pb-4">
              {brands.map((brand: any) => (
                <Link href={`/products?brand=${brand}`} key={brand} className="flex h-32 w-32 cursor-pointer items-center justify-center rounded border border-gray-200 bg-gray-50 transition-shadow hover:shadow-md">
                  <span className="text-xl font-bold text-gray-500 text-center px-2">{brand}</span>
                </Link>
              ))}
              {brands.length === 0 && (
                <div className="text-sm text-gray-500">No brands found in database.</div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-8 bg-amazon-light text-white">
        <a href="#top" className="block cursor-pointer bg-[#37475A] py-4 text-center transition hover:bg-[#485769]">
          <span className="text-sm font-medium">Back to top</span>
        </a>

        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-8 px-4 py-12 text-sm md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-bold">Get to Know Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:underline">About Gadgets BD</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><Link href="/shops" className="hover:underline">Our Top Brands</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Make Money with Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/register" className="hover:underline">Sell on Gadgets BD</Link></li>
              <li><Link href="/create" className="hover:underline">Supply to Gadgets BD</Link></li>
              <li><Link href="/manage-list" className="hover:underline">Become an Affiliate</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Payment Products</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:underline">Gadgets BD Business Card</a></li>
              <li><a href="#" className="hover:underline">Shop with Points</a></li>
              <li><a href="#" className="hover:underline">Reload Your Balance</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Let Us Help You</h3>
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

        <div className="border-t border-gray-600 py-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
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
