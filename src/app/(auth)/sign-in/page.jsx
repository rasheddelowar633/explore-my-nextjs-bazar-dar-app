"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading || socialLoading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    // Sign-in সফল বা ব্যর্থ—দুই ক্ষেত্রেই ফর্ম খালি হবে
    form.reset();

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে।");
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে!");

      // যে Product Details দেখতে চেয়েছিল, সেখানে ফিরে যাবে
      const params = new URLSearchParams(window.location.search);
      const callbackURL = params.get("callbackURL") || "/";

      // শুধু নিজের সাইটের relative path গ্রহণ করবে
      const safeCallbackURL =
        callbackURL.startsWith("/") && !callbackURL.startsWith("//")
          ? callbackURL
          : "/";

      window.location.assign(safeCallbackURL);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    if (loading || socialLoading) return;

    setSocialLoading(provider);

    try {
      const params = new URLSearchParams(window.location.search);
      const callbackURL = params.get("callbackURL") || "/";

      const safeCallbackURL =
        callbackURL.startsWith("/") && !callbackURL.startsWith("//")
          ? callbackURL
          : "/";

      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: safeCallbackURL,
      });

      if (error) {
        toast.error(
          error.message ||
            `${provider} দিয়ে সাইন ইন করা যায়নি।`
        );

        setSocialLoading("");
      }
    } catch {
      toast.error(
        `${provider} দিয়ে সাইন ইন করতে সমস্যা হয়েছে।`
      );

      setSocialLoading("");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        {/* Logo / Title */}
        <div className="mb-7 text-center">
          <Link
            href="/"
            className="text-3xl font-extrabold text-green-600"
          >
            Bazar Dar
          </Link>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন
          </p>
        </div>

        {/* Email and Password Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="আপনার ইমেইল লিখুন"
              autoComplete="email"
              required
              disabled={loading || Boolean(socialLoading)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              autoComplete="current-password"
              required
              disabled={loading || Boolean(socialLoading)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading || Boolean(socialLoading)}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">
            অথবা
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={() => handleSocialSignIn("google")}
          disabled={loading || Boolean(socialLoading)}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "google"
            ? "Google দিয়ে সাইন ইন হচ্ছে..."
            : "Google দিয়ে সাইন ইন করুন"}
        </button>

        {/* GitHub Sign In */}
        <button
          type="button"
          onClick={() => handleSocialSignIn("github")}
          disabled={loading || Boolean(socialLoading)}
          className="mt-3 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "github"
            ? "GitHub দিয়ে সাইন ইন হচ্ছে..."
            : "GitHub দিয়ে সাইন ইন করুন"}
        </button>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            সাইন আপ করুন
          </Link>
        </p>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-green-600"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}