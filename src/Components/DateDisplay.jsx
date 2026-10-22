"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getDateSnapshot() {
  return new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });
}

function getServerSnapshot() {
  return "";
}

export default function DateDisplay() {
  const date = useSyncExternalStore(
    subscribe,
    getDateSnapshot,
    getServerSnapshot,
  );

  return <span>{date || "তারিখ লোড হচ্ছে..."}</span>;
}