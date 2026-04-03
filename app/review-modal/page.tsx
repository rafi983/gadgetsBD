import Link from "next/link";
import { Camera, Star, User } from "lucide-react";

export default function ReviewModalPage() {
  return (
    <div className="bg-white text-amazon-text flex min-h-screen flex-col">
      <nav className="bg-amazon p-3 text-white shadow-md">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tighter">
              gadgets<span className="italic text-amazon-secondary">BD</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 cursor-pointer">
            <User className="w-4 h-4" />
            <span className="text-sm">John Doe</span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto w-full p-6">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-normal">Create Review</h1>

          <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e" className="w-16 h-16 object-cover border border-gray-200 rounded" alt="Item" />
            <h2 className="font-bold text-sm">Apple MacBook Pro M2 - Space Gray, 16GB RAM, 512GB SSD</h2>
          </div>

          <form className="space-y-10">
            <section className="space-y-4">
              <h3 className="text-xl font-bold">Overall rating</h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" className="group transition-transform hover:scale-110">
                    <Star className="w-8 h-8 text-gray-300 fill-current group-hover:text-amazon-yellow" />
                  </button>
                ))}
              </div>
            </section>

            <hr className="border-gray-200" />

            <section className="space-y-4">
              <h3 className="text-xl font-bold">Add a photo or video</h3>
              <p className="text-sm">Shoppers find images and videos more helpful than text alone.</p>
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-amazon-blue transition-colors gap-2">
                <Camera className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-500">Add media</span>
              </div>
            </section>

            <hr className="border-gray-200" />

            <section className="space-y-4">
              <h3 className="text-xl font-bold">Add a headline</h3>
              <input type="text" placeholder="What's most important to know?" className="w-full border border-gray-300 rounded p-2 outline-none focus:ring-1 focus:ring-amazon-blue" />
            </section>

            <hr className="border-gray-200" />

            <section className="space-y-4">
              <h3 className="text-xl font-bold">Add a written review</h3>
              <textarea rows={6} placeholder="What did you like or dislike? What did you use this product for?" className="w-full border border-gray-300 rounded p-4 outline-none focus:ring-1 focus:ring-amazon-blue" />
            </section>

            <div className="border-t border-gray-200 pt-8 flex justify-end">
              <button type="submit" className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-8 py-2 rounded-md shadow-sm border border-amazon-secondary font-bold">Submit</button>
            </div>
          </form>
        </div>
      </main>

      <footer className="mt-auto py-8 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-center gap-6 text-xs text-amazon-blue mb-4">
          <a href="#" className="hover:underline">Conditions of Use</a>
          <a href="#" className="hover:underline">Privacy Notice</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
        <p className="text-center text-[10px] text-gray-500">&copy; 1996-2025, GadgetsBD.com, Inc. or its affiliates</p>
      </footer>
    </div>
  );
}

