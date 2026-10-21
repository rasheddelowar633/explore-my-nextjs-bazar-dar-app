
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (isPending) return <p className="p-6">লোড হচ্ছে...</p>;

  if (!session?.user) {
    return (
      <div className="p-6">
        <p>প্রোফাইল দেখতে লগইন করো।</p>
        <Link className="text-green-700 underline" href="/sign-in">
          সাইন ইন
        </Link>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("নাম লিখতে হবে।");
      setMessage("");
      return;
    }

    if (trimmedName === session.user.name) {
      setIsEditing(false);
      setError("");
      setMessage("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const { error: updateError } = await authClient.updateUser({
        name: trimmedName,
      });

      if (updateError) {
        setError(updateError.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      await authClient.getSession();

      setMessage("তোমার নাম সফলভাবে আপডেট হয়েছে!");
      setIsEditing(false);
    } catch (err) {
      console.error("Name update error:", err);
      setError("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-lg p-8">
      <h1 className="mb-4 text-2xl font-bold">আমার প্রোফাইল 👤</h1>

      {message && (
        <p className="mb-4 rounded bg-green-100 p-3 text-green-700">
          {message}
        </p>
      )}

      {error && (
        <p className="mb-4 rounded bg-red-100 p-3 text-red-700">
          {error}
        </p>
      )}

      <p>নাম: {session.user.name}</p>
      <p>ইমেইল: {session.user.email}</p>

      {!isEditing ? (
        <button
          type="button"
          onClick={() => {
            setName(session.user.name || "");
            setMessage("");
            setError("");
            setIsEditing(true);
          }}
          className="mt-4 rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Edit Name
        </button>
      ) : (
        <form onSubmit={handleUpdate} className="mt-4 space-y-3">
          <label htmlFor="name" className="block font-medium">
            নতুন নাম
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
            disabled={saving}
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-green-700"
            placeholder="তোমার নাম লিখো"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 disabled:opacity-50"
            >
              {saving ? "আপডেট হচ্ছে..." : "Save Name"}
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setName(session.user.name || "");
                setIsEditing(false);
                setError("");
                setMessage("");
              }}
              className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
