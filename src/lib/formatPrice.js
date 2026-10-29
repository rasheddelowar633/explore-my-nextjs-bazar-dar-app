const bengaliDigits = "০১২৩৪৫৬৭৮৯";
const englishDigits = "0123456789";

export function parsePrice(value) {
  if (typeof value === "number") return value;

  const normalized = String(value ?? "")
    .replace(/[০-৯]/g, (digit) =>
      String(bengaliDigits.indexOf(digit))
    )
    .replace(/[^\d.-]/g, "");

  const number = Number(normalized);

  return Number.isFinite(number) ? number : 0;
}