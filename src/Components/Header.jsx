
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

export default function Header() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="border-b border-orange-100 bg-white shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center gap-3 p-3 sm:p-4">
        <Link
          href="/"
          className="flex h-[55px] w-[55px] items-center justify-center rounded-xl bg-green-600 sm:h-[60px] sm:w-[60px]"
        >
          <Image
            src="/assets/logo-icon.png"
            alt="বাজার দর লোগো"
            width={50}
            height={50}
            priority
          />
        </Link>

        <Link href="/" className="min-w-0">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            বাজার দর
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {date}
          </p>
        </Link>

        <AuthButtons />
      </div>

      <NavLinks />
    </header>
  );
}
