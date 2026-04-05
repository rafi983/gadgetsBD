"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "All") params.set("category", category);
    
    router.push(`/products?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="focus-within:ring-amazon-secondary flex h-10 flex-1 overflow-hidden rounded-md bg-white focus-within:ring-3">
      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="cursor-pointer border-r border-gray-300 bg-white px-2 text-xs text-black hover:bg-gray-100"
      >
        <option value="All">All</option>
        <option value="Laptops & PCs">Laptops</option>
        <option value="Smartphones">Phones</option>
        <option value="Accessories">Accessories</option>
      </select>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Gadgets, Laptops, Phones..." 
        className="flex-1 px-3 text-black outline-none" 
      />
      <button type="submit" className="flex items-center justify-center bg-amazon-secondary px-4 hover:bg-[#fa8900]">
        <Search className="h-5 w-5 text-black" />
      </button>
    </form>
  );
}

