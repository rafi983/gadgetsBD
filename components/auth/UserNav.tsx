"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function UserNav() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  if (status === "loading") {
    return (
      <div className="cursor-pointer rounded-sm p-1 hover:outline hover:outline-1 hover:outline-white">
        <div className="text-xs leading-none text-gray-300">Loading...</div>
        <div className="text-sm font-bold">Account & Lists</div>
      </div>
    );
  }

  if (session && session.user) {
    const userRole = (session.user as any)?.type || "Customer";

    return (
      <div className="group relative cursor-pointer rounded-sm p-1 hover:outline hover:outline-1 hover:outline-white flex items-center gap-2">
        {session.user.image ? (
          <img src={session.user.image} alt={session.user.name || "Profile"} className="w-8 h-8 rounded-full border border-gray-300" />
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold text-xs">{session.user.name?.charAt(0) || "U"}</div>
        )}
        <div>
          <div className="text-xs leading-none text-gray-300">Hello, {session.user.name}</div>
          <div className="text-sm font-bold">Account & Lists</div>
        </div>

        {/* Dropdown Menu */}
        <div className="absolute right-0 top-full hidden w-48 pt-2 group-hover:block z-50">
          <div className="rounded-md border border-gray-200 bg-white p-2 shadow-lg text-black">
            <div className="mb-2 border-b pb-2 px-2">
              <p className="text-sm font-bold truncate">{session.user.name}</p>
              <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
            </div>

            {userRole === "ShopOwner" ? (
              <>
                <Link href="/" className="block rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100">
                  Home
                </Link>
                <Link href="/create" className="block rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100">
                  Add Product
                </Link>
                <Link href="/manage-list" className="block rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100">
                  Manage Products
                </Link>
              </>
            ) : (
              <>
                <Link href="/" className="block rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100">
                  Home
                </Link>
                <Link href="/products" className="block rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100">
                  Products
                </Link>
                <Link href="/shops" className="block rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100">
                  Shops
                </Link>
                <Link href="/bookings" className="block rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100">
                  My Orders
                </Link>
              </>
            )}

            <button
              onClick={handleSignOut}
              className="mt-1 block w-full text-left rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-gray-100 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href="/login" className="cursor-pointer rounded-sm px-4 py-2 bg-amazon-yellow text-black font-bold hover:bg-amazon-yellow_hover block">
      Sign in
    </Link>
  );
}
