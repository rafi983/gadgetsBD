"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      // Close the modal cleanly if loaded within a route context, if direct it will bounce to previous origin
      router.back();
      // Ensure the frontend revalidates its session to hydrate the navbar
      setTimeout(() => {
        router.refresh();
      }, 100);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="bg-white text-gray-900 flex min-h-screen flex-col items-center pt-8">
      <div className="mb-4">
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-bold tracking-tighter text-black">
            gadgets<span className="italic text-yellow-500">BD</span>
          </span>
        </Link>
      </div>

      <div className="mb-6 w-full max-w-[350px] rounded-[4px] border border-[#ddd] p-6">
        <h1 className="mb-4 text-2xl font-normal">Sign in</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-sm border border-gray-400 px-2 py-1.5 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between">
              <label htmlFor="password" className="text-sm font-bold">
                Password
              </label>
              <a
                href="/forget-password"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/forget-password";
                }}
                className="text-blue-600 hover:text-orange-500 text-sm hover:underline cursor-pointer"
              >
                Forgot your password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-sm border border-gray-400 px-2 py-1.5 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-sm px-3 py-1.5 text-sm font-medium cursor-pointer"
            style={{
              background: "linear-gradient(to bottom, #f7dfa5, #f0c14b)",
              border: "1px solid #a88734",
            }}
          >
            Sign in
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full rounded-sm border border-gray-400 py-1.5 flex justify-center items-center text-sm font-medium hover:bg-gray-50"
          >
            Continue with Google
          </button>
        </div>

        <div className="mt-4 text-xs">
          <p>
            By continuing, you agree to Gadgets BD&apos;s{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
            >
              Conditions of Use
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mb-4 w-full max-w-[350px]">
        <div className="relative flex justify-center text-xs border-t border-gray-300">
          <span className="-mt-2 bg-white px-2 text-gray-500">
            New to Gadgets BD?
          </span>
        </div>
      </div>

      <div className="mb-8 w-full max-w-[350px]">
        <Link
          replace
          href="/register"
          className="block w-full rounded-sm border border-gray-400 py-1.5 text-center text-sm transition-colors hover:bg-gray-50"
        >
          Create your Gadgets BD account
        </Link>
      </div>
    </div>
  );
}
