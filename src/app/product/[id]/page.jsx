import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

async function getProducts() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await res.json();

    if (Array.isArray(result)) return result;
    if (Array.isArray(result?.data)) return result.data;
    if (Array.isArray(result?.products)) return result.products;

    return [];
  } catch (error) {
    console.error("Product fetch error:", error);
    return [];
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  // Check whether the user is signed in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Send unsigned users to the sign-in page
  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent(`/product/${id}`)}`
    );
  }

  const products = await getProducts();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    notFound();
  }

  const formatPrice = (price) =>
    price != null
      ? `৳${Number(price).toLocaleString("bn-BD")}`
      : "তথ্য নেই";

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <Link
        href="/product"
        className="mb-6 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
      >
        ← সব প্রোডাক্ট
      </Link>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-md">
        <div className="bg-orange-50 px-6 py-10 text-center">
          <div className="mb-4 text-7xl">
            {product.image || "🛒"}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            {product.nameBn || product.name || "প্রোডাক্ট"}
          </h1>

          <p className="mt-2 text-gray-600">
            {product.categoryNameBn || product.category || ""}
          </p>

          <p className="mt-4 text-3xl font-bold text-orange-600">
            {formatPrice(product.today)}
            {product.unit ? ` / ${product.unit}` : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">আজকের দাম</p>
            <p className="mt-2 text-xl font-bold text-gray-800">
              {formatPrice(product.today)}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">গতকালের দাম</p>
            <p className="mt-2 text-xl font-bold text-gray-800">
              {formatPrice(product.yesterday)}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">গত সপ্তাহের দাম</p>
            <p className="mt-2 text-xl font-bold text-gray-800">
              {formatPrice(product.lastWeek)}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">গত মাসের দাম</p>
            <p className="mt-2 text-xl font-bold text-gray-800">
              {formatPrice(product.lastMonth)}
            </p>
          </div>
        </div>

        {product.change && (
          <div className="px-6 pb-6">
            <div className="rounded-xl border p-4">
              <p className="text-sm text-gray-500">
                দামের পরিবর্তন
              </p>
              <p
                className={`mt-1 text-lg font-bold ${
                  product.change.dir === "up"
                    ? "text-red-600"
                    : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-700"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲ দাম বেড়েছে"
                  : product.change.dir === "down"
                  ? "▼ দাম কমেছে"
                  : "দাম অপরিবর্তিত"}
                {product.change.pct != null
                  ? ` (${product.change.pct}%)`
                  : ""}
              </p>
            </div>
          </div>
        )}

        {Array.isArray(product.markets) &&
          product.markets.length > 0 && (
            <div className="px-6 pb-6">
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                বাজারভিত্তিক দাম
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="border p-3">বাজার</th>
                      <th className="border p-3">বিভাগ</th>
                      <th className="border p-3">সর্বনিম্ন দাম</th>
                      <th className="border p-3">সর্বোচ্চ দাম</th>
                    </tr>
                  </thead>

                  <tbody>
                    {product.markets.map((market, index) => (
                      <tr key={`${market.market}-${index}`}>
                        <td className="border p-3">
                          {market.market || "—"}
                        </td>
                        <td className="border p-3">
                          {market.division || "—"}
                        </td>
                        <td className="border p-3">
                          {formatPrice(market.min)}
                        </td>
                        <td className="border p-3">
                          {formatPrice(market.max)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
    </main>
  );
}