
import React from "react";

const Loading = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-4">
      {/* Background decorations */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

      <main className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        {/* Animated shopping icon */}
        <div className="relative mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-cyan-100 shadow-xl shadow-emerald-100/60">
          <div className="absolute inset-3 rounded-full border border-white/80" />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-20 w-20 animate-bounce text-emerald-600"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>

          <span className="absolute right-5 top-5 h-3 w-3 animate-ping rounded-full bg-emerald-500" />
        </div>

        {/* Loading text */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
          Loading<span className="text-emerald-600">...</span>
        </h1>

        <p className="mt-4 max-w-sm text-base leading-7 text-slate-500 sm:text-lg">
          Please wait, we&apos;re getting things ready for you.
        </p>

        {/* Animated dots */}
        <div
          className="mt-8 flex items-center gap-3"
          role="status"
          aria-label="Loading"
        >
          {[0, 1, 2, 3].map((dot) => (
            <span
              key={dot}
              className="h-3 w-3 animate-bounce rounded-full bg-emerald-500"
              style={{ animationDelay: `${dot * 150}ms` }}
            />
          ))}
        </div>

        {/* Brand */}
        <div className="mt-14 flex flex-col items-center">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-10 bg-emerald-200" />
            <span className="text-2xl text-emerald-600">✦</span>
            <span className="h-px w-10 bg-emerald-200" />
          </div>

          <p className="text-lg font-bold tracking-wide text-emerald-700">
            Bazar Dar
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Your Trusted Online Market
          </p>
        </div>
      </main>
    </div>
  );
};

export default Loading;
