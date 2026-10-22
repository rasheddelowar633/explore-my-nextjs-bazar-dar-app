
"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getYearSnapshot() {
  return String(new Date().getFullYear());
}

function getServerSnapshot() {
  return "2026";
}

export default function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    getYearSnapshot,
    getServerSnapshot
  );

  return <>{year}</>;
}
