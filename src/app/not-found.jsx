
"use client";
import CurrentYear from "@/Components/CurrentYear";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080B08] px-4 py-10 text-white">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#111711] p-8 text-center shadow-2xl shadow-green-950/30 sm:p-12">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-lime-400/10 blur-3xl" />

        {/* Brand */}
        <div className="relative mb-8">
          <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-sm font-semibold tracking-widest text-lime-400">
            BAZAR DAR
          </span>
        </div>

        {/* 404 */}
        <div className="relative">
          <h1 className="select-none text-8xl font-black tracking-tighter text-lime-400 sm:text-9xl">
            404
          </h1>

          <div className="mx-auto my-5 h-1 w-20 rounded-full bg-lime-400" />

          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            Page Not Found!
          </h2>

          <p className="mx-auto max-w-sm text-sm leading-7 text-gray-400 sm:text-base">
            Oops! তুমি যে পেজটি খুঁজছ, সেটি পাওয়া যায়নি।
            পেজটি সরানো হয়েছে অথবা ঠিকানাটি ভুল হতে পারে।
          </p>
        </div>

        {/* Buttons */}
        <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-6 py-3 font-bold text-black transition duration-300 hover:bg-lime-300 hover:shadow-lg hover:shadow-lime-400/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 10 9-7 9 7" />
              <path d="M9 21V12h6v9" />
            </svg>
            Go Home
          </Link>

         
        </div>

        {/* Footer */}
        <div className="relative mt-10 border-t border-white/10 pt-5">
          <p className="text-xs tracking-wide text-gray-500">
© <CurrentYear /> Bazar Dar. All rights reserved.          </p>
        </div>
      </div>
    </main>
  );
}
