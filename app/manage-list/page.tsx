import Link from "next/link";
import { Eye, EyeOff, Pencil, Search, Trash2, User } from "lucide-react";

export default function ManageListPage() {
  const items = [
    {
      status: "In Stock",
      statusClass: "bg-green-100 text-green-700",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100",
      name: 'Apple MacBook Pro 16" M2 Max',
      sku: "MBP-M2-16-1TB",
      category: "Laptops & Computers",
      brand: "Apple",
      price: "3,45,000",
      available: "24",
      availableClass: "text-green-600",
      visible: false,
    },
    {
      status: "In Stock",
      statusClass: "bg-green-100 text-green-700",
      image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=100",
      name: "iPhone 15 Pro Max - Blue Titanium",
      sku: "IP15PM-BT-256",
      category: "Smartphones & Tablets",
      brand: "Apple",
      price: "1,45,000",
      available: "15",
      availableClass: "text-green-600",
      visible: false,
    },
    {
      status: "Low Stock",
      statusClass: "bg-yellow-100 text-yellow-700",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
      name: "Sony WH-1000XM5 Headphones",
      sku: "SONY-WH1000XM5",
      category: "Audio & Headphones",
      brand: "Sony",
      price: "38,500",
      available: "3",
      availableClass: "text-yellow-600",
      visible: false,
    },
    {
      status: "In Stock",
      statusClass: "bg-green-100 text-green-700",
      image: "https://images.unsplash.com/photo-1527690710675-4ae7d334803b?w=100",
      name: "Razer BlackWidow V4 Pro Keyboard",
      sku: "RZR-BW-V4-PRO",
      category: "Gaming Accessories",
      brand: "Razer",
      price: "18,500",
      available: "12",
      availableClass: "text-green-600",
      visible: false,
    },
    {
      status: "Out of Stock",
      statusClass: "bg-red-100 text-red-700",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100",
      name: "Logitech G502 Hero Gaming Mouse",
      sku: "LOG-G502-HERO",
      category: "Gaming Accessories",
      brand: "Logitech",
      price: "8,500",
      available: "0",
      availableClass: "text-red-600",
      visible: true,
    },
  ] as const;

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

          <div className="bg-white border border-gray-300 rounded shadow-sm overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-gray-100 border-b border-gray-300 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                <tr>
                  <th className="w-12 p-3 text-center"><input type="checkbox" /></th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Price (৳)</th>
                  <th className="p-3">Available</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.sku} className="hover:bg-gray-50">
                    <td className="p-3 text-center"><input type="checkbox" /></td>
                    <td className="p-3">
                      <span className={`inline-block rounded px-2 py-1 text-xs font-bold ${item.statusClass}`}>{item.status}</span>
                    </td>
                    <td className="p-3">
                      <img src={item.image} className="h-12 w-12 rounded border border-gray-200 object-cover" alt={item.name} />
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                    </td>
                    <td className="p-3 text-gray-600">{item.category}</td>
                    <td className="p-3 text-gray-600">{item.brand}</td>
                    <td className="p-3 font-bold">{item.price}</td>
                    <td className="p-3"><span className={`font-bold ${item.availableClass}`}>{item.available}</span></td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded p-1.5 hover:bg-gray-100" title="Edit">
                          <Pencil className="h-4 w-4 text-amazon-blue" />
                        </button>
                        <button className="rounded p-1.5 hover:bg-gray-100" title={item.visible ? "Publish" : "Unpublish"}>
                          {item.visible ? <Eye className="h-4 w-4 text-gray-600" /> : <EyeOff className="h-4 w-4 text-gray-600" />}
                        </button>
                        <button className="rounded p-1.5 hover:bg-gray-100" title="Delete">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <div>Showing 1-5 of 5 products</div>
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

