
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  
const onSubmit = async (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  // সাইন ইন চেষ্টা করার আগেই ফর্ম খালি হবে
  form.reset();

  setLoading(true);
  setMessage("");

  try {
    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setMessage(error.message || "সাইন ইন ব্যর্থ হয়েছে");
      return;
    }

    // সফল হলে হোম পেজে যাবে
    window.location.assign("/");
  } catch {
    setMessage("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="mb-2 text-center text-3xl font-extrabold text-gray-900">
          সাইন ইন
        </h1>

        <p className="mb-6 text-center text-gray-500">
          তোমার অ্যাকাউন্টে প্রবেশ করো
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block font-semibold">
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="তোমার ইমেইল"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block font-semibold">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="তোমার পাসওয়ার্ড"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {message && (
            <p role="alert" className="text-sm text-red-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/sign-up" className="font-bold text-green-700">
            সাইন আপ করো
          </Link>
        </p>

        <Link
          href="/"
          className="mt-4 block text-center font-semibold text-gray-600 hover:text-green-700"
        >
          ← হোম পেজে ফিরে যাও
        </Link>
      </div>
    </main>
  );
}
