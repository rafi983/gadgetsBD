import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="bg-white text-amazon-text flex min-h-screen flex-col items-center pt-8">
      <div className="mb-4">
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-bold tracking-tighter text-black">
            gadgets<span className="italic text-amazon-secondary">BD</span>
          </span>
        </Link>
      </div>

      <div className="mb-6 w-full max-w-[350px] rounded-[4px] border border-[#ddd] p-6">
        <h1 className="mb-4 text-2xl font-normal">Sign in</h1>

        <form action="/" method="get" className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-bold">
              Email or mobile phone number
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full rounded-sm border border-gray-400 px-2 py-1.5 outline-none focus:border-amazon-secondary focus:ring-1 focus:ring-amazon-secondary"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between">
              <label htmlFor="password" className="text-sm font-bold">
                Password
              </label>
              <Link href="/forget-password" className="text-amazon-blue hover:text-amazon-orange text-sm hover:underline">
                Forgot your password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              required
              className="w-full rounded-sm border border-gray-400 px-2 py-1.5 outline-none focus:border-amazon-secondary focus:ring-1 focus:ring-amazon-secondary"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-sm px-3 py-1.5 text-sm font-medium cursor-pointer"
            style={{
              background: "linear-gradient(to bottom, #f7dfa5, #f0c14b)",
              border: "1px solid #a88734",
              borderColor: "#a88734 #9c7e31 #846a29",
            }}
          >
            Sign in
          </button>
        </form>

        <div className="mt-4 text-xs">
          <p>
            By continuing, you agree to Gadgets BD&apos;s <a href="#" className="text-amazon-blue hover:underline">Conditions of Use</a> and{" "}
            <a href="#" className="text-amazon-blue hover:underline">Privacy Notice</a>.
          </p>
        </div>

        <div className="mt-4">
          <a href="#" className="text-amazon-blue hover:text-amazon-orange flex items-center gap-1 text-sm hover:underline">
            <ChevronRight className="h-3 w-3" />
            Need help?
          </a>
        </div>
      </div>

      <div className="mb-4 w-full max-w-[350px]">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-gray-500">New to Gadgets BD?</span>
          </div>
        </div>
      </div>

      <div className="mb-8 w-full max-w-[350px]">
        <Link href="/register" className="block w-full rounded-sm border border-gray-400 py-1.5 text-center text-sm transition-colors hover:bg-gray-50">
          Create your Gadgets BD account
        </Link>
      </div>

      <footer className="mt-auto w-full border-t border-gray-300 bg-gray-50">
        <div className="max-w-[1000px] mx-auto px-4 py-6 text-center text-xs text-gray-600">
          <div className="mb-4 flex justify-center gap-6">
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

