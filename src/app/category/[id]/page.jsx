
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

async function getCategory(slug) {
  const res = await fetch(`${API_URL}/categories/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();

  // API সরাসরি category অথবা { data: category } দিতে পারে
  return data?.data ?? data;
}

async function getCategoryProducts(slug) {
  const res = await fetch(
    `${API_URL}/products?category=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const data = await res.json();

  // API সরাসরি array অথবা { data: [...] } দিতে পারে
  const products = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  return products;
}

function CategoryLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600">
            ক্যাটাগরি ও পণ্যের তথ্য লোড হচ্ছে...
          </p>
        </div>
      </div>
    </main>
  );
}

async function CategoryContent({ params }) {
  const { id: slug } = await params;

  const category = await getCategory(slug);

  if (!category || !category.nameBn) {
    notFound();
  }

  const products = await getCategoryProducts(slug);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Category Header */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <Link
            href="/"
            className="text-sm text-green-700 hover:underline"
          >
            ← হোম পেজ
          </Link>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl">
              {category.icon}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                এই ক্যাটাগরির আজকের বাজারদর
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm text-gray-600">
            মোট {products.length}টি পণ্য পাওয়া গেছে।
          </p>
        </div>

        {/* Product Cards */}
        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-gray-600">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const direction = product.change?.dir;
              const isUp = direction === "up";
              const isDown = direction === "down";

              return (
                <article
                  key={product.id}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-3xl">
                      {product.image || category.icon}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isUp
                          ? "bg-red-50 text-red-600"
                          : isDown
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                      {Math.abs(product.change?.pct ?? 0).toFixed(1)}%
                    </span>
                  </div>

                  <h2 className="mt-5 text-lg font-bold text-gray-900">
                    {product.nameBn}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                  </p>

                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-500">
                      আজকের দাম
                    </p>

                    <p className="mt-1 text-2xl font-bold text-green-700">
                      {product.today} টাকা
                    </p>
                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    আগের দাম: {product.yesterday} টাকা
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
