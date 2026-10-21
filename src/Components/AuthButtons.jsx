
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      alert(error.message || "সাইন আউট করা যায়নি");
      return;
    }

    window.location.href = "/sign-in";
  };

  if (isPending) {
    return <div className="ml-auto text-sm">লোড হচ্ছে...</div>;
  }

  if (session?.user) {
    return (
      <div className="ml-auto flex flex-wrap items-center gap-2">
        <Link
          href="/profile"
          className="rounded-lg border border-green-600 px-4 py-2 font-bold text-green-700 hover:bg-green-50"
        >
          👤 {session.user.name || "প্রোফাইল"}
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  return (
    <div className="ml-auto flex gap-2">
      <Link
        href="/sign-in"
        className="rounded-lg border border-green-600 px-4 py-2 font-bold text-green-700 hover:bg-green-50"
      >
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className="rounded-lg bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
