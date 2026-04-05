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
        <div className="text-sm font-bold">Account &amp; Lists</div>
      </div>
    );
  }

  if (session && session.user) {
    return (
      <div className="group relative cursor-pointer rounded-sm p-1 hover:outline hover:outline-1 hover:outline-white">
        <div className="text-xs leading-none text-gray-300">Hello, {session.user.name}</div>
        <div className="text-sm font-bold">Account &amp; Lists</div>
        
        {/* Dropdown Menu */}
        <div className="absolute right-0 top-full hidden w-48 pt-2 group-hover:block z-50">
          <div className="rounded-md border border-gray-200 bg-white p-2 shadow-lg text-black">
            <div className="mb-2 border-b pb-2 px-2">
              <p className="text-sm font-bold truncate">{session.user.name}</p>
              <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
            </div>
            <Link href="/profile" className="block rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100">
              Your Profile
            </Link>
            <Link href="/bookings" className="block rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100">
              Your Orders
            </Link>
            <button
              onClick={handleSignOut}
              className="mt-1 block w-full text-left rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-gray-100 font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href="/login" className="cursor-pointer rounded-sm p-1 hover:outline hover:outline-1 hover:outline-white block">
      <div className="text-xs leading-none text-gray-300">Hello, Sign in</div>
      <div className="text-sm font-bold">Account &amp; Lists</div>
    </Link>
  );
}
