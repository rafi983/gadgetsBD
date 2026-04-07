import Link from "next/link";
import { Search, User } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";
import ManageListClient from "./ManageListClient";

export const dynamic = "force-dynamic";

export default async function ManageListPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).type !== "ShopOwner") {
    redirect("/");
  }

  await connectToDatabase();
  const products = await Product.find({ "shop.id": (session.user as any).id }).lean();
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return (
    <div className="bg-amazon-background text-amazon-text flex min-h-screen flex-col">
      <nav className="bg-amazon p-3 text-white shadow-md">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-tighter">
                gadgets<span className="italic text-amazon-secondary">BD</span>
                <span className="text-sm font-normal ml-2 rounded bg-gray-700 px-2 py-0.5">seller central</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/manage-list" className="underline decoration-amazon-secondary decoration-2 underline-offset-4">
              Catalog
            </Link>
            <Link href="/bookings" className="hover:underline">Orders</Link>
            <div className="h-4 w-px bg-gray-600" />
            <div className="flex cursor-pointer items-center gap-1">
              <User className="h-4 w-4" />
              <span>Shop Owner</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full p-6">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-normal">Manage Inventory</h1>
            <Link href="/create" className="bg-amazon-yellow hover:bg-amazon-yellow_hover rounded-md border border-amazon-secondary px-6 py-2 text-sm font-bold shadow-sm transition-colors">
              Add a Product
            </Link>
          </div>

          <div className="bg-white border border-gray-300 rounded shadow-sm p-4 mb-6 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold">Status:</span>
              <select className="rounded border border-gray-300 px-2 py-1 outline-none focus:ring-1 focus:ring-amazon-blue">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
              <span className="font-bold">Category:</span>
              <select className="rounded border border-gray-300 px-2 py-1 outline-none focus:ring-1 focus:ring-amazon-blue">
                <option>All Categories</option>
                <option>Laptops & Computers</option>
                <option>Smartphones & Tablets</option>
                <option>Audio & Headphones</option>
                <option>Gaming Accessories</option>
                <option>Cameras & Photography</option>
                <option>Wearables & Smartwatches</option>
              </select>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
              <span className="font-bold">Brand:</span>
              <select className="rounded border border-gray-300 px-2 py-1 outline-none focus:ring-1 focus:ring-amazon-blue">
                <option>All Brands</option>
                <option>Apple</option>
                <option>Samsung</option>
                <option>Dell</option>
                <option>HP</option>
                <option>Lenovo</option>
                <option>Sony</option>
                <option>Razer</option>
              </select>
            </div>
            <div className="flex flex-1 items-center gap-2 border-l border-gray-300 pl-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by SKU or Name"
                  className="w-full rounded border border-gray-300 py-1 pl-8 pr-2 outline-none focus:ring-1 focus:ring-amazon-blue"
                />
              </div>
            </div>
          </div>

          <ManageListClient initialProducts={serializedProducts} />

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <div>Showing 1-{serializedProducts.length} of {serializedProducts.length} products</div>
            <div className="flex gap-2">
              <button className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
              <button className="rounded border border-gray-300 bg-amazon-yellow px-3 py-1 font-bold">1</button>
              <button className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-gray-300 bg-white py-6">
        <div className="max-w-[1500px] mx-auto text-center text-xs text-gray-500">
          <p>&copy; 2025 Gadgets BD Seller Central. All rights reserved by LWS.</p>
        </div>
      </footer>
    </div>
  );
}

