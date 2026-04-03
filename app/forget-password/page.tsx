import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ForgetPasswordPage() {
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
        <h1 className="mb-2 text-2xl font-normal">Password assistance</h1>
        <p className="mb-4 text-sm">
          Enter the email address or mobile phone number associated with your Gadgets BD account.
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-bold">
              Email or mobile phone number
            </label>
            <input
              type="text"
              id="email"
              required
              className="w-full rounded-sm border border-gray-400 px-2 py-1.5 outline-none focus:border-amazon-secondary focus:ring-1 focus:ring-amazon-secondary"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-sm border border-[#a88734] px-3 py-1.5 text-sm shadow-sm"
            style={{ background: "linear-gradient(to bottom, #f7dfa5, #f0c14b)" }}
          >
            Continue
          </button>
        </form>

        <div className="mt-4 hidden rounded-sm border border-green-200 bg-green-50 p-3 text-xs text-green-800">
          <div className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
            <div>
              <strong>Check your email</strong>
              <p className="mt-1">We&apos;ve sent a password reset link to your email address.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[350px]">
        <h2 className="mb-2 text-lg font-bold">Has your email or mobile number changed?</h2>
        <p className="mb-4 text-sm">
          If you no longer use the e-mail address associated with your Gadgets BD account, you may contact{" "}
          <a href="#" className="text-amazon-blue hover:underline">
            Customer Service
          </a>{" "}
          for help restoring access to your account.
        </p>
      </div>

      <footer className="mt-auto w-full max-w-[1000px] border-t border-gray-200 py-8">
        <div className="mb-2 flex justify-center gap-6 text-xs text-amazon-blue">
          <a href="#" className="hover:underline">Conditions of Use</a>
          <a href="#" className="hover:underline">Privacy Notice</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
        <p className="text-center text-[10px] text-gray-500">&copy; 1996-2025, GadgetsBD.com, Inc. or its affiliates</p>
      </footer>
    </div>
  );
}

