
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [message, setMessage] = useState("");

  // Email and password sign in
  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading || socialLoading) return;

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
        setMessage(error.message || "সাইন ইন ব্যর্থ হয়েছে।");
        return;
      }

      window.location.assign("/");
    } catch {
      setMessage("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google and GitHub OAuth sign in
  const handleSocialSignIn = async (provider) => {
    if (loading || socialLoading) return;

    setSocialLoading(provider);
    setMessage("");

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setMessage(
          error.message ||
            `${provider} দিয়ে সাইন ইন করা যায়নি।`
        );
        setSocialLoading("");
      }
    } catch {
      setMessage(
        `${provider} Login-এ সমস্যা হয়েছে। আবার চেষ্টা করুন।`
      );
      setSocialLoading("");
    }
  };

  const isBusy = loading || Boolean(socialLoading);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="mb-2 text-center text-3xl font-extrabold text-gray-900">
          সাইন ইন
        </h1>

        <p className="mb-6 text-center text-gray-500 ">
          তোমার অ্যাকাউন্টে প্রবেশ করো
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block font-semibold"
            >
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="তোমার ইমেইল"
              required
              disabled={isBusy}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block font-semibold"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="তোমার পাসওয়ার্ড"
              required
              disabled={isBusy}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 disabled:bg-gray-100"
            />
          </div>

          {message && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isBusy}
            className="w-full cursor-pointer rounded-lg bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() => handleSocialSignIn("google")}
          disabled={isBusy}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "google" ? (
            "Google-এ সংযোগ হচ্ছে..."
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.62 5.91c4.45-4.11 7.15-10.16 7.15-17.56Z" />
                <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.84 2.26-8.28 2.26-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
              </svg>
              Google দিয়ে সাইন ইন
            </>
          )}
        </button>

        {/* GitHub Login */}
        <button
          type="button"
          onClick={() => handleSocialSignIn("github")}
          disabled={isBusy}
          className="mt-3 flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "github" ? (
            "GitHub-এ সংযোগ হচ্ছে..."
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.5-.28-5.14-1.25-5.14-5.56 0-1.23.44-2.23 1.17-3.02-.12-.29-.51-1.43.11-2.98 0 0 .96-.31 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.15 3.1-1.15.62 1.55.23 2.69.11 2.98.73.79 1.17 1.79 1.17 3.02 0 4.32-2.64 5.28-5.16 5.56.41.36.77 1.03.77 2.08v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
              </svg>
              GitHub দিয়ে সাইন ইন
            </>
          )}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-bold text-green-700 hover:underline"
          >
            সাইন আপ করো
          </Link>
        </p>

        <Link
          href="/"
          className="mt-4 block cursor-pointer text-center font-semibold text-gray-600 hover:text-green-700"
        >
          ← হোম পেজে ফিরে যাও
        </Link>
      </div>
    </main>
  );
}
