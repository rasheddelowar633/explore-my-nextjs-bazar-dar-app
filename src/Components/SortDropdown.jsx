"use client";

import { ChevronDown } from "lucide-react";

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <select
        aria-label="পণ্য সাজান"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="select select-bordered w-full appearance-none
          rounded-xl bg-base-100 pr-10 font-medium
          focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>

      <ChevronDown
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2
          -translate-y-1/2"
      />
    </div>
  );
}