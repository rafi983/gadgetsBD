import Link from "next/link";
import { CheckCircle, Eye, Pencil, Star, Upload, User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="bg-amazon-background text-amazon-text flex min-h-screen flex-col">
      <nav className="bg-amazon text-white p-3 shadow-md">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-tighter">gadgets<span className="italic text-amazon-secondary">BD</span><span className="text-sm font-normal ml-2 bg-gray-700 px-2 py-0.5 rounded">seller central</span></span>
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/manage-list" className="hover:underline">Catalog</Link>
            <Link href="/bookings" className="hover:underline">Orders</Link>
            <Link href="/profile" className="underline decoration-amazon-secondary decoration-2 underline-offset-4">Shop Profile</Link>
            <div className="h-4 w-px bg-gray-600" />
            <div className="flex items-center gap-1 cursor-pointer"><User className="w-4 h-4" /><span>Shop Owner</span></div>
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
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"><Eye className="w-4 h-4 inline mr-1" />View Mode</button>
            <button className="px-4 py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold transition-colors"><Pencil className="w-4 h-4 inline mr-1" />Edit Mode</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-300 flex justify-between items-center">
              <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">Shop Preview</h2>
              <span className="flex items-center bg-green-50 px-2 py-1 rounded border border-green-200"><CheckCircle className="w-3 h-3 text-green-600 mr-1" /><span className="text-[10px] font-bold text-green-700 uppercase">Verified</span></span>
            </div>
            <div className="p-6">
              <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-sm overflow-hidden shadow-md">
                <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100"><img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600" className="w-full h-full object-cover" alt="Shop Banner" /></div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-amazon-blue mb-1">Tech Hub BD</h3>
                  <p className="text-sm text-gray-500 mb-3">Dhaka, Bangladesh</p>
                  <div className="flex items-center gap-1 mb-3"><div className="flex text-amazon-secondary">{[1,2,3,4,5].map((x)=><Star key={x} className="w-4 h-4 fill-current" />)}</div><span className="text-xs text-amazon-blue">3,240 ratings</span></div>
                  <p className="text-sm text-gray-700 mb-4">Leading retailer of laptops, computers, and accessories. Official partner of Apple, Dell, and HP with 10+ years of experience.</p>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between"><div className="text-xs"><span className="text-gray-500">Specializes in:</span> <span className="font-bold">Laptops &amp; PCs</span></div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-300"><h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">Shop Information</h2></div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div><label className="block text-xs text-gray-500 mb-1">Shop Name</label><p className="font-medium">Tech Hub BD</p></div>
              <div><label className="block text-xs text-gray-500 mb-1">Owner Name</label><p className="font-medium">Kamal Hossain</p></div>
              <div><label className="block text-xs text-gray-500 mb-1">Email</label><p className="font-medium">techhub@gadgetsbd.com</p></div>
              <div><label className="block text-xs text-gray-500 mb-1">Phone Number</label><p className="font-medium">+880 1712-345678</p></div>
              <div><label className="block text-xs text-gray-500 mb-1">Location</label><p className="font-medium">Dhaka, Bangladesh</p></div>
              <div><label className="block text-xs text-gray-500 mb-1">Specialization</label><p className="font-medium">Laptops &amp; PCs</p></div>
              <div className="md:col-span-2"><label className="block text-xs text-gray-500 mb-1">Shop Description</label><p className="font-medium">Leading retailer of laptops, computers, and accessories. Official partner of Apple, Dell, and HP with 10+ years of experience.</p></div>
              <div className="md:col-span-2"><label className="block text-xs text-gray-500 mb-1">Address</label><p className="font-medium">123 Gulshan Avenue, Gulshan-1, Dhaka-1212, Bangladesh</p></div>
            </div>
          </div>
        </div>

        <div className="hidden mt-6 space-y-6">
          <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-300"><h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">Shop Banner Image</h2></div>
            <div className="p-6"><div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-amazon-blue transition-colors cursor-pointer"><Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" /><p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p></div></div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-6 bg-white border-t border-gray-300"><div className="max-w-[1200px] mx-auto text-center text-xs text-gray-500"><p>&copy; 2025 Gadgets BD Seller Central. All rights reserved by LWS.</p></div></footer>
    </div>
  );
}

