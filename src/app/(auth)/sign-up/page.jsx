
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (password.length < 8) {
      setMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setMessage(error.message || "সাইন আপ ব্যর্থ হয়েছে");
        return;
      }

      // সফল হলে সব ইনপুট খালি হবে
      form.reset();

      // এরপর সাইন ইন পেজে যাবে
      window.location.assign("/sign-in");
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
          নতুন অ্যাকাউন্ট
        </h1>

        <p className="mb-6 text-center text-gray-500">
          বাজার দর ব্যবহার করতে সাইন আপ করো
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block font-semibold">
              তোমার নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="সম্পূর্ণ নাম"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

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
              autoComplete="new-password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              minLength={8}
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
            className="w-full cursor-pointer rounded-lg bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/sign-in" className="font-bold text-green-700">
            সাইন ইন করো
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
