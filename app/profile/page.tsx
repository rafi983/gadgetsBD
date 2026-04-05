"use client";

import Link from "next/link";
import { CheckCircle, Eye, Pencil, Star, Upload, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Profile Data
  const [ownerName, setOwnerName] = useState("");
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setOwnerName(data.name || "");
        setEmail(data.email || "");
        setShopName(data.shopDetails?.shopName || "");
        setDescription(data.shopDetails?.description || "");
        setAddress(data.shopDetails?.address || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const handleSave = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerName, shopName, description, address }),
      });
      if (res.ok) {
        setMessage("Profile updated successfully!");
        setIsEditing(false);
      } else {
        const errData = await res.json();
        setMessage(errData.message || "Failed to update profile.");
      }
    } catch (err) {
      setMessage("An error occurred while saving.");
    }
  };

  if (loading) return <div className="p-8 text-center min-h-screen">Loading Profile...</div>;
  
  // Need to ensure it's a ShopOwner
  if (!session || (session.user as any)?.type !== "ShopOwner") {
    return <div className="p-8 text-center min-h-screen">You do not have access to the Shop Owner Profile.</div>;
  }

  return (
    <div className="bg-gray-100 text-gray-900 flex min-h-screen flex-col">
      <nav className="bg-gray-900 text-white p-3 shadow-md">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-tighter">gadgets<span className="italic text-yellow-500">BD</span><span className="text-sm font-normal ml-2 bg-gray-700 px-2 py-0.5 rounded">seller central</span></span>
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/manage-list" className="hover:underline">Catalog</Link>
            <Link href="/bookings" className="hover:underline">Orders</Link>
            <Link href="/profile" className="underline decoration-yellow-500 decoration-2 underline-offset-4">Shop Profile</Link>
            <div className="h-4 w-px bg-gray-600" />
            <div className="flex items-center gap-1 cursor-pointer"><UserIcon className="w-4 h-4" /><span>Shop Owner</span></div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto w-full p-6">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-normal">Shop Profile</h1>
            <p className="text-sm text-gray-600">Manage your shop information and appearance on Gadgets BD</p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 border border-yellow-600 rounded-md text-sm font-bold transition-colors">
                <Pencil className="w-4 h-4 inline mr-1" />Edit Mode
              </button>
            ) : (
              <>
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 border border-yellow-600 rounded-md text-sm font-bold transition-colors">
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {message && <div className="mb-4 text-center text-sm font-medium text-green-600 bg-green-50 p-2 rounded border border-green-200">{message}</div>}

        <div className="space-y-6">
          <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-300 flex justify-between items-center">
              <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">Shop Information</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Shop Name</label>
                {isEditing ? <input value={shopName} onChange={e=>setShopName(e.target.value)} className="w-full border p-1" /> : <p className="font-medium">{shopName || "Not set"}</p>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Owner Name</label>
                {isEditing ? <input value={ownerName} onChange={e=>setOwnerName(e.target.value)} className="w-full border p-1" /> : <p className="font-medium">{ownerName || "Not set"}</p>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                <p className="font-medium text-gray-400">{email}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Address</label>
                {isEditing ? <input value={address} onChange={e=>setAddress(e.target.value)} className="w-full border p-1" /> : <p className="font-medium">{address || "Not set"}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Shop Description</label>
                {isEditing ? <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full border p-1" rows={3} /> : <p className="font-medium">{description || "Not set"}</p>}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-6 bg-white border-t border-gray-300"><div className="max-w-[1200px] mx-auto text-center text-xs text-gray-500"><p>&copy; {new Date().getFullYear()} Gadgets BD Seller Central. All rights reserved.</p></div></footer>
    </div>
  );
}
