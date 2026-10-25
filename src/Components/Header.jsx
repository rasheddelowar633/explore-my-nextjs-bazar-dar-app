import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import DateDisplay from "./DateDisplay";

export default function Header() {
  return (
    <header className="border-b border-orange-100 bg-white shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center gap-3 p-3 sm:p-4">
        <Link
          href="/"
          className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-xl bg-green-600 sm:h-[60px] sm:w-[60px]"
        >
          <Image
            src="/Assets/logo-icon.png"
            alt="বাজার দর লোগো"
            width={50}
            height={50}
            className="object-contain"
            priority
          />
        </Link>

        <Link href="/" className="min-w-0">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            বাজার দর
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            <DateDisplay />
          </p>
        </Link>

        <AuthButtons />
      </div>

      <Suspense
        fallback={
          <nav className="container mx-auto px-4 py-3">
            <p className="text-sm text-gray-500">
              ক্যাটাগরি লোড হচ্ছে...
            </p>
          </nav>
        }
      >
        <NavLinks />
      </Suspense>
    </header>
  );
}