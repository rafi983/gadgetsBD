import Link from "next/link";
import { ArrowLeft, Plus, Upload, User } from "lucide-react";

export default function CreatePage() {
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

        <form className="space-y-6">
          <div className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
            <div className="border-b border-gray-300 bg-gray-50 px-6 py-3">
              <h2 className="text-xs font-bold tracking-wider text-gray-700 uppercase">Step 1: Product Identity</h2>
            </div>
            <div className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold">Product Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Apple MacBook Pro M2 - 16GB RAM"
                    className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold">Category</label>
                  <select className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue">
                    <option>Laptops &amp; Computers</option>
                    <option>Smartphones &amp; Tablets</option>
                    <option>Audio &amp; Headphones</option>
                    <option>Gaming Accessories</option>
                    <option>Cameras &amp; Photography</option>
                    <option>Wearables &amp; Smartwatches</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold">Brand</label>
                  <select className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue">
                    <option>Apple</option>
                    <option>Samsung</option>
                    <option>Dell</option>
                    <option>HP</option>
                    <option>Lenovo</option>
                    <option>Sony</option>
                    <option>Razer</option>
                    <option>Logitech</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold">Condition</label>
                  <select className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue">
                    <option>New</option>
                    <option>Renewed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your product features, specifications, and benefits..."
                  className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue"
                />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
            <div className="border-b border-gray-300 bg-gray-50 px-6 py-3">
              <h2 className="text-xs font-bold tracking-wider text-gray-700 uppercase">Step 2: Pricing &amp; Inventory</h2>
            </div>
            <div className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-bold">Price (৳)</label>
                  <input type="number" placeholder="0.00" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold">Stock Quantity</label>
                  <input type="number" placeholder="0" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold">SKU (Optional)</label>
                  <input type="text" placeholder="e.g., MBP-M2-16-1TB" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold">Availability</label>
                  <select className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue">
                    <option>In Stock</option>
                    <option>Pre-Order</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold">Warranty Period</label>
                  <select className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue">
                    <option>No Warranty</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                    <option>2 Years</option>
                    <option>3 Years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
            <div className="border-b border-gray-300 bg-gray-50 px-6 py-3">
              <h2 className="text-xs font-bold tracking-wider text-gray-700 uppercase">Step 3: Product Images</h2>
            </div>
            <div className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-bold">Main Product Image</label>
                <div className="cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-amazon-blue">
                  <Upload className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                  <p className="mb-1 text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Additional Images (Optional)</label>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[1, 2, 3, 4].map((slot) => (
                    <div key={slot} className="aspect-square cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-amazon-blue flex items-center justify-center">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
            <div className="border-b border-gray-300 bg-gray-50 px-6 py-3">
              <h2 className="text-xs font-bold tracking-wider text-gray-700 uppercase">Step 4: Technical Specifications (Optional)</h2>
            </div>
            <div className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold">Processor/Chipset</label>
                  <input type="text" placeholder="e.g., Apple M2 Max" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold">RAM/Memory</label>
                  <input type="text" placeholder="e.g., 32GB" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold">Storage</label>
                  <input type="text" placeholder="e.g., 1TB SSD" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold">Display Size</label>
                  <input type="text" placeholder="e.g., 16 inch" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Other Specifications</label>
                <textarea
                  rows={3}
                  placeholder="Add any other technical details (Battery life, Connectivity, Ports, etc.)"
                  className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-4 pt-4 sm:flex-row">
            <Link href="/manage-list" className="rounded-md border border-gray-400 px-6 py-2 text-sm font-medium transition-colors hover:bg-gray-50 text-center">
              Cancel
            </Link>

            <button type="button" className="rounded-md border border-amazon-secondary bg-amazon-yellow px-6 py-2 text-sm font-bold shadow-sm transition-colors hover:bg-amazon-yellow_hover">
              Publish Product
            </button>
          </div>
        </form>
      </main>

      <footer className="mt-auto border-t border-gray-300 bg-white py-6">
        <div className="max-w-[1000px] mx-auto text-center text-xs text-gray-500">
          <p>&copy; 2025 Gadgets BD Seller Central. All rights reserved by LWS.</p>
        </div>
      </footer>
    </div>
  );
}

