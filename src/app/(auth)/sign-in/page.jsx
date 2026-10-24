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

      const params = new URLSearchParams(window.location.search);
      const callbackURL = params.get("callbackURL") || "/";

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
            className="w-full cursor-pointer rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Sign In with Google Logo */}
        <button
          type="button"
          onClick={() => handleSocialSignIn("google")}
          disabled={loading || Boolean(socialLoading)}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "google" ? (
            "Google দিয়ে সাইন ইন হচ্ছে..."
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.43 37.99 46.98 31.9 46.98 24.55Z"
                  transform="translate(0 -1)"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
                  transform="translate(0 0)"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  transform="translate(0 -4)"
                />
              </svg>

              <span>Google দিয়ে সাইন ইন করুন</span>
            </>
          )}
        </button>

        {/* GitHub Sign In with GitHub Logo */}
        <button
          type="button"
          onClick={() => handleSocialSignIn("github")}
          disabled={loading || Boolean(socialLoading)}
          className="mt-3 flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "github" ? (
            "GitHub দিয়ে সাইন ইন হচ্ছে..."
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 shrink-0 text-gray-900"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.26 2.22 4.09 1.68.1-.73.4-1.22.72-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.14 5.55.4.34.76 1.02.76 2.06v3.06c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z"
                />
              </svg>

              <span>GitHub দিয়ে সাইন ইন করুন</span>
            </>
          )}
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