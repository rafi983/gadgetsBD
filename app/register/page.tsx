"use client";

import Link from "next/link";
import { Info } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [userType, setUserType] = useState<"Customer" | "ShopOwner">("Customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, type: userType }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to register");
        return;
      }
      
      // Auto-login the user after successful registration
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        setError("Registration successful but failed to log in automatically.");
        setTimeout(() => {
          router.back();
          setTimeout(() => router.push("/login"), 100);
        }, 1500);
        return;
      }

      // Close the modal cleanly
      router.back();
      
      // Navigate based on userType
      setTimeout(() => {
        if (userType === "ShopOwner") {
          // Force a hard navigation to clear modal history state and get a fresh page
          window.location.href = "/profile";
        } else {
          window.location.href = "/";
        }
      }, 100);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
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

      <div className="w-full max-w-[350px] p-6 rounded-[4px] border border-[#ddd] mb-6">
        <h1 className="text-2xl font-normal mb-4">Create account</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-sm">
            <button
              type="button"
              onClick={() => setUserType("Customer")}
              className={`flex-1 py-1 text-xs font-bold rounded-sm ${userType === "Customer" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setUserType("ShopOwner")}
              className={`flex-1 py-1 text-xs font-bold rounded-sm ${userType === "ShopOwner" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              Shop Owner
            </button>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-1">Your name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First and last name"
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            />
            <p className="text-xs text-gray-600 mt-1"><Info className="w-3 h-3 inline mr-1" /> Passwords must be at least 6 characters.</p>
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-bold mb-1">Re-enter password</label>
            <input
              type="password"
              id="passwordConfirm"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-1.5 text-sm font-medium rounded-sm cursor-pointer"
            style={{ background: "linear-gradient(to bottom, #f7dfa5, #f0c14b)", border: "1px solid #a88734" }}
          >
            Create your Gadgets BD account
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full rounded-sm border border-gray-400 py-1.5 flex justify-center items-center text-sm font-medium hover:bg-gray-50"
          >
            Register with Google
          </button>
        </div>

        <div className="mt-4 text-xs">
          <p>By creating an account, you agree to Gadgets BD&apos;s <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Notice</a>.</p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-sm">Already have an account? <Link replace href="/login" className="text-blue-600 hover:text-orange-500 hover:underline">Sign in</Link></p>
        </div>

        {userType === "ShopOwner" && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-sm">
            <div className="flex gap-2">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900">
                <p className="font-bold mb-1">Shop Owner Registration</p>
                <p>After registration, you&apos;ll be redirected to set up your shop profile and add products.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
