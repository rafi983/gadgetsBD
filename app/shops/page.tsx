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
import dbConnect from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { CartBadge } from "@/components/ui/cart-badge";
import { SearchForm } from "@/components/ui/search-form";

function Rating({ value }: { value: string | number }) {
  if (value === "4.5" || value === 4.5) {
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

export default async function ShopsPage() {
  await dbConnect();

  const shopOwnersData = await User.find({ type: "ShopOwner" }).lean();
  const shopOwners = JSON.parse(JSON.stringify(shopOwnersData));

  return (
    <div id="top" className="bg-amazon-background text-amazon-text flex min-h-screen flex-col">
      <nav className="bg-amazon text-white">
        <div className="max-w-[1500px] mx-auto flex items-center p-2 gap-4">
          <Link href="/" className="flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1">
            <span className="text-2xl font-bold tracking-tighter">gadgets<span className="italic text-amazon-secondary">BD</span></span>
          </Link>

          <SearchForm />

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer"><div className="font-bold text-sm">EN</div></div>
            <UserNav />
            <CartBadge />
          </div>
        </div>
      </nav>

      <main className="max-w-[1500px] mx-auto w-full p-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Featured Shops &amp; Storefronts</h1>
          <p className="text-sm text-gray-600">Discover trusted tech shops delivering premium gadgets across Bangladesh.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {shopOwners.map((owner: any) => {
            const shopName = owner.shopDetails?.shopName || owner.name || "Unknown Shop";
            return (
            <div key={owner._id} className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className={`h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
                {owner.image ? (
                  <img src={owner.image} className="w-full h-full object-cover" alt={shopName} />
                ) : (
                  <span className="text-4xl text-gray-400 font-bold">{shopName.charAt(0)}</span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-amazon-blue hover:text-amazon-orange hover:underline cursor-pointer">{shopName}</h3>
                    <p className="text-sm text-gray-500">{owner.shopDetails?.address || "Bangladesh"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2"><Rating value={5} /><span className="text-xs text-amazon-blue">No ratings yet</span></div>

                <p className="text-sm line-clamp-3 mb-4 text-gray-700">{owner.shopDetails?.description || "Providing the best tech gadgets in town."}</p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs"><span className="text-gray-500">Shop ID:</span> <span className="font-bold">{owner._id.substring(0, 8)}...</span></div>
                  <Link href={`/shops/${owner._id}`} className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-4 py-1.5 rounded-full text-xs font-bold shadow-sm transition-colors">Visit Shop</Link>
                </div>
              </div>
            </div>
            )
          })}
          {shopOwners.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              No registered shops found.
            </div>
          )}
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

