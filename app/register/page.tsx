import Link from "next/link";
import { Info } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="bg-white text-amazon-text flex min-h-screen flex-col items-center pt-8">
      <div className="mb-4">
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-bold tracking-tighter text-black">gadgets<span className="italic text-amazon-secondary">BD</span></span>
        </Link>
      </div>

      <div className="w-full max-w-[350px] p-6 rounded-[4px] border border-[#ddd] mb-6">
        <h1 className="text-2xl font-normal mb-4">Create account</h1>

        <form action="/login" method="get" className="space-y-4">
          <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-sm">
            <button type="button" className="flex-1 py-1 text-xs font-bold bg-white shadow-sm rounded-sm">Customer</button>
            <button type="button" className="flex-1 py-1 text-xs font-bold text-gray-500">Shop Owner</button>
            <input type="hidden" name="userType" value="customer" />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-1">Your name</label>
            <input type="text" id="name" required placeholder="First and last name" className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary" />
          </div>

          <div className="hidden">
            <label htmlFor="shopName" className="block text-sm font-bold mb-1">Shop name</label>
            <input type="text" id="shopName" placeholder="Your shop name" className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary" />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-bold mb-1">Mobile number</label>
            <div className="flex gap-2">
              <select className="px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"><option>BD +880</option></select>
              <input type="tel" id="mobile" required placeholder="Mobile number" className="flex-1 px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-1">Email</label>
            <input type="email" id="email" required className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold mb-1">Password</label>
            <input type="password" id="password" required placeholder="At least 6 characters" className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary" />
            <p className="text-xs text-gray-600 mt-1"><Info className="w-3 h-3 inline mr-1" /> Passwords must be at least 6 characters.</p>
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-bold mb-1">Re-enter password</label>
            <input type="password" id="passwordConfirm" required className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary" />
          </div>

          <button
            type="submit"
            className="w-full py-1.5 text-sm font-medium rounded-sm cursor-pointer"
            style={{ background: "linear-gradient(to bottom, #f7dfa5, #f0c14b)", border: "1px solid #a88734", borderColor: "#a88734 #9c7e31 #846a29" }}
          >
            Create your Gadgets BD account
          </button>
        </form>

        <div className="mt-4 text-xs">
          <p>By creating an account, you agree to Gadgets BD&apos;s <a href="#" className="text-amazon-blue hover:underline">Conditions of Use</a> and <a href="#" className="text-amazon-blue hover:underline">Privacy Notice</a>.</p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-sm">Already have an account? <Link href="/login" className="text-amazon-blue hover:text-amazon-orange hover:underline">Sign in</Link></p>
        </div>

        <div className="hidden mt-4 p-3 bg-blue-50 border border-blue-200 rounded-sm">
          <div className="flex gap-2"><Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" /><div className="text-xs text-blue-900"><p className="font-bold mb-1">Shop Owner Registration</p><p>After registration, you&apos;ll be able to set up your shop profile, add products, and start selling on Gadgets BD marketplace.</p></div></div>
        </div>
      </div>

      <footer className="mt-auto w-full border-t border-gray-300 bg-gray-50">
        <div className="max-w-[1000px] mx-auto py-6 px-4 text-center text-xs text-gray-600">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="text-amazon-blue hover:underline">Conditions of Use</a>
            <a href="#" className="text-amazon-blue hover:underline">Privacy Notice</a>
            <a href="#" className="text-amazon-blue hover:underline">Help</a>
          </div>
          <p className="text-gray-500">&copy; 2025 Gadgets BD - Premium Tech Marketplace. All rights reserved by LWS.</p>
        </div>
      </footer>
    </div>
  );
}

