"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      setSuccess("Password updated successfully.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-amazon-text flex min-h-screen flex-col items-center pt-8">
      <div className="mb-4">
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-bold tracking-tighter text-black">
            gadgets<span className="italic text-yellow-500">BD</span>
          </span>
        </Link>
      </div>

      <div className="mb-6 w-full max-w-[350px] rounded-[4px] border border-[#ddd] p-6">
        <h1 className="mb-4 text-2xl font-normal">Create new password</h1>
        <p className="mb-4 text-sm text-gray-600">
          We&apos;ll ask for this password whenever you sign in.
        </p>

        {error && (
          <div className="mb-4 rounded-sm border border-red-200 bg-red-50 p-3 text-xs text-red-800">
            {error}
          </div>
        )}
        
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-bold">New password</label>
            <input
              type="password"
              className="w-full rounded-sm border border-gray-400 px-2 py-1.5 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">Password again</label>
            <input
              type="password"
              className="w-full rounded-sm border border-gray-400 px-2 py-1.5 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm px-3 py-1.5 text-sm font-medium shadow-sm disabled:opacity-50 cursor-pointer"
            style={{
              background: "linear-gradient(to bottom, #f7dfa5, #f0c14b)",
              border: "1px solid #a88734",
            }}
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>

        {success && (
          <div className="mt-4 rounded-sm border border-green-200 bg-green-50 p-3 text-xs text-green-800">
            <div className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 text-green-600 flex-shrink-0" />
              <div>
                <strong>Success</strong>
                <p className="mt-1">{success}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-auto w-full max-w-[1000px] border-t border-gray-200 py-8">
        <div className="mb-2 flex justify-center gap-6 text-xs text-blue-600">
          <a href="#" className="hover:underline">Conditions of Use</a>
          <a href="#" className="hover:underline">Privacy Notice</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
        <p className="text-center text-[10px] text-gray-500">&copy; 1996-2025, GadgetsBD.com, Inc. or its affiliates</p>
      </footer>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen bg-white">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
