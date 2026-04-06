import { UserNav } from "@/components/auth/UserNav";
import Link from "next/link";
import {
  ChevronRight,
  Package,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import dbConnect from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";
import { notFound } from "next/navigation";
import { SearchForm } from "@/components/ui/search-form";
import { CartBadge } from "@/components/ui/cart-badge";
import { BuyBox } from "@/components/ui/buy-box";
import { ProductTabs } from "@/components/ui/product-tabs";

export const dynamic = "force-dynamic";

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

export default async function DetailsPage({ params }: { params: any }) {
  await dbConnect();
  
  const resolvedParams = await params;
  const { id } = resolvedParams;
  let product: any = null;
  let relatedProducts: any[] = [];
  
  try {
    const data = await Product.findById(id).lean();
    if (data) {
      product = JSON.parse(JSON.stringify(data));
      // Fetch dynamic related products from the exact same category
      const related = await Product.find({ 
        category: product.category, 
        _id: { $ne: product._id } 
      }).limit(6).lean();
      relatedProducts = JSON.parse(JSON.stringify(related));
    }
  } catch (error) {
    // Invalid ID format or other error
  }

  if (!product) {
    notFound();
  }

  return (
    <div id="top" className="bg-white text-amazon-text flex min-h-screen flex-col">
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

      <main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/products?category=${product.category}`} className="hover:underline">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-amazon-text font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 flex gap-4">
            <div className="flex flex-col gap-2">
              <button className="w-10 h-10 border border-amazon-secondary rounded overflow-hidden hover:shadow-md">
                <img src={product.image} className="w-full h-full object-cover" alt="Preview" />
              </button>
            </div>
            <div className="flex-1 border border-gray-200 rounded p-4 bg-gray-50 flex items-center justify-center">
              <img src={product.image} className="w-full h-auto object-contain max-h-[500px]" alt={product.name} />
            </div>
          </div>

          <div className="lg:col-span-4">
            <h1 className="text-2xl font-normal mb-2">{product.name}</h1>
            <p className="text-sm text-gray-600 mb-3">
              Visit the <Link href="/shops" className="text-amazon-blue hover:underline">{product.vendor}</Link>
            </p>

            <div className="flex items-center gap-2 mb-4">
              <StarRow size={16} />
              <span className="text-sm text-amazon-blue hover:underline cursor-pointer">{product.reviewsCount || 1245} ratings</span>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-sm">Price:</span>
                <span className="text-3xl text-amazon-orange">৳{product.price}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">Inclusive of all taxes</p>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <h3 className="font-bold text-base mb-2">About this item</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                {product.features && product.features.length > 0 ? (
                  product.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))
                ) : (
                  <>
                    <li>High performance processor for exceptional speeds</li>
                    <li>Premium build quality and elegant design</li>
                    <li>Extended battery life for all-day usage</li>
                    <li>Comprehensive warranty and authentic local support</li>
                  </>
                )}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm mb-2"><span className="font-bold">Category:</span> {product.category}</p>
              <p className="text-sm mb-2"><span className="font-bold">Vendor:</span> {product.vendor}</p>
              <p className="text-sm"><span className="font-bold">Stock:</span> <span className="text-green-600 font-semibold">{product.stock || 0} units available</span></p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <BuyBox product={product} />
          </div>
        </div>

        <ProductTabs product={product} />

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedProducts.map((rp: any) => (
              <Link href={`/details/${rp._id}`} key={rp._id} className="border border-gray-200 rounded p-4 hover:shadow-md transition">
                <div className="h-32 flex items-center justify-center mb-4">
                  <img src={rp.image} className="max-h-full object-contain" alt={rp.name} />
                </div>
                <h3 className="text-sm font-medium line-clamp-2 mb-2 text-amazon-blue hover:text-amazon-orange">{rp.name}</h3>
                <StarRow size={12} />
                <p className="text-lg text-amazon-orange font-bold mt-1">৳{rp.price.toLocaleString()}</p>
              </Link>
            ))}
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
