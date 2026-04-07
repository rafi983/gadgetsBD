import { UserNav } from "@/components/auth/UserNav";
import { CartBadge } from "@/components/ui/cart-badge";
import { SearchForm } from "@/components/ui/search-form";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { Product } from "@/lib/models/Product";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { Star, StarHalf, MapPin, Package, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ShopDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await dbConnect();

  const shopOwnerData = await User.findById(resolvedParams.id).lean();
  if (!shopOwnerData || shopOwnerData.type !== "ShopOwner") {
    return notFound();
  }

  const productsData = await Product.find({ "shop.id": resolvedParams.id }).lean();

  const shopOwner = JSON.parse(JSON.stringify(shopOwnerData));
  const products = JSON.parse(JSON.stringify(productsData));

  const shopName = shopOwner.shopDetails?.shopName || shopOwner.name;

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

      {/* Shop Banner and Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="h-48 bg-gradient-to-r from-amazon-blue to-blue-900 w-full object-cover flex items-center justify-center">
            {shopOwner.image ? (
                <img src={shopOwner.image} className="w-full h-full object-cover opacity-50" alt="" />
            ) : null}
        </div>

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5 pb-6">
            <div className="flex">
              <div className="h-24 w-24 rounded-full ring-4 ring-white bg-white sm:h-32 sm:w-32 flex items-center justify-center overflow-hidden shadow-md">
                {shopOwner.image ? (
                    <img className="h-full w-full object-cover" src={shopOwner.image} alt={shopName} />
                ) : (
                    <span className="text-4xl font-bold text-gray-400">{shopName.charAt(0)}</span>
                )}
              </div>
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                <h1 className="text-3xl font-bold text-gray-900 truncate">
                  {shopName}
                </h1>
                <div className="flex flex-wrap mt-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {shopOwner.shopDetails?.address || "Bangladesh"}
                    </div>
                    <div className="flex items-center text-amazon-secondary">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        5.0 Seller Rating
                    </div>
                    <div className="flex items-center">
                        <Package className="w-4 h-4 mr-1" />
                        {products.length} Products
                    </div>
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {new Date(shopOwner.createdAt).getFullYear()}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1500px] mx-auto w-full p-4 py-8 flex-1">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-gray-200">
            <h2 className="text-xl font-bold mb-2">About Shop</h2>
            <p className="text-gray-700">{shopOwner.shopDetails?.description || "Providing the best tech gadgets directly to your door."}</p>
        </div>

        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold border-b border-amazon-orange pb-2 inline-block">All Products</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product: any) => (
            <div key={product._id} className="bg-white border text-center flex flex-col items-center justify-between border-gray-200 rounded p-4 hover:shadow-lg transition-shadow">
              <Link href={`/details/${product._id}`} className="w-full flex flex-col items-center flex-1">
                  <div className="w-full h-40 flex items-center justify-center mb-4">
                      <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </div>
                  <h3 className="text-amazon-blue hover:text-amazon-orange hover:underline text-sm line-clamp-2 w-full text-left font-medium">{product.name}</h3>
              </Link>

              <div className="w-full mt-2 text-left">
                  <div className="text-xs text-gray-500">{product.vendor || shopName}</div>
                  <div className="text-lg font-bold text-gray-900 mt-1">৳{product.price.toLocaleString()}</div>
                  <div className="mt-3">
                      <AddToCartButton product={product} />
                  </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded border border-gray-200">
                <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-lg">This shop hasn&apos;t published any products yet.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-amazon-light text-white mt-12">
        <a href="#top" className="bg-[#37475A] py-4 text-center hover:bg-[#485769] transition cursor-pointer block"><span className="text-sm font-medium">Back to top</span></a>
        <div className="border-t border-gray-700 text-center py-8"><p className="text-xs text-gray-400">&copy; 2025 Gadgets BD - Premium Tech Marketplace. All rights reserved by LWS.</p></div>
      </footer>
    </div>
  );
}
