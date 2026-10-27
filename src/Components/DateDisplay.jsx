
"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getDateSnapshot() {
  return new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

function getServerSnapshot() {
  return "";
}

export default function DateDisplay() {
  const date = useSyncExternalStore(
    subscribe,
    getDateSnapshot,
    getServerSnapshot
  );

  return <span>{date || "তারিখ লোড হচ্ছে..."}</span>;
}
