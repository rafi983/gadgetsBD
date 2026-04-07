import Link from "next/link";
import { ArrowLeft, Plus, Upload, User } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import CreateProductFormClient from "./CreateProductFormClient";

export default async function CreatePage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).type !== "ShopOwner") {
    redirect("/");
  }

  return (
    <div className="bg-amazon-background text-amazon-text flex min-h-screen flex-col">
      <nav className="bg-amazon p-3 text-white shadow-md">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-tighter">
                gadgets<span className="italic text-amazon-secondary">BD</span>
                <span className="ml-2 rounded bg-gray-700 px-2 py-0.5 text-sm font-normal">seller central</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/manage-list" className="hover:underline">
              Catalog
            </Link>
            <Link href="/bookings" className="hover:underline">
              Orders
            </Link>
            <div className="h-4 w-px bg-gray-600" />
            <div className="flex cursor-pointer items-center gap-1">
              <User className="h-4 w-4" />
              <span>Shop Owner</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto w-full p-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-normal">Add a Product</h1>
            <p className="text-sm text-gray-600">Create a new listing for your gadget product.</p>
          </div>
          <Link href="/manage-list" className="text-amazon-blue flex items-center gap-1 text-sm hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Manage List
          </Link>
        </div>

        <CreateProductFormClient />
      </main>

      <footer className="mt-auto border-t border-gray-300 bg-white py-6">
        <div className="max-w-[1000px] mx-auto text-center text-xs text-gray-500">
          <p>&copy; 2025 Gadgets BD Seller Central. All rights reserved by LWS.</p>
        </div>
      </footer>
    </div>
  );
}

