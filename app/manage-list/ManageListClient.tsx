"use client";

import Link from "next/link";
import { Eye, EyeOff, Pencil, Search, Trash2, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageListClient({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const router = useRouter();

  const togglePublish = async (id: string, active: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ active: !active })
      });
      if (res.ok) {
        setProducts(prev => prev.map(p => p._id === id ? { ...p, active: !active } : p));
        router.refresh();
      }
    } catch(err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
        router.refresh();
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-gray-100 border-b border-gray-300 text-[11px] font-bold uppercase tracking-wider text-gray-600">
          <tr>
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
          {products.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="p-3">
                <span className={`inline-block rounded px-2 py-1 text-xs font-bold ${item.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {item.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </td>
              <td className="p-3">
                <img src={item.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100"} className="h-12 w-12 rounded border border-gray-200 object-cover" alt={item.name} />
              </td>
              <td className="p-3">
                <div className="font-medium">{item.name}</div>
              </td>
              <td className="p-3 text-gray-600">{item.category}</td>
              <td className="p-3 text-gray-600">{item.about?.brand || item.brand || "Unspecified"}</td>
              <td className="p-3 font-bold">{item.price.toLocaleString()}</td>
              <td className="p-3"><span className="font-bold">{item.stock}</span></td>
              <td className="p-3">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => togglePublish(item._id, item.active !== false)} className="rounded p-1.5 hover:bg-gray-100" title={item.active !== false ? "Unpublish" : "Publish"}>
                    {item.active !== false ? <Eye className="h-4 w-4 text-amazon-blue" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
                  </button>
                  <button onClick={() => deleteProduct(item._id)} className="rounded p-1.5 hover:bg-gray-100" title="Delete">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr><td colSpan={8} className="p-4 text-center text-gray-500">No products found. Add a product to get started.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
