import Link from "next/link";

const AllProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Products fetch failed");
  }

  const result = await res.json();

  const products = Array.isArray(result)
    ? result
    : Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result?.products)
        ? result.products
        : [];

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          সব পণ্য
        </h1>

        <p className="mt-2 text-gray-600">
          মোট {products.length} টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 bg-gray-200 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Logo + Product Name */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-3xl">
                {product.image}
              </div>

              <h2 className="text-lg font-bold text-gray-900">
                {product.nameBn}
              </h2>
            </div>

            {/* Unit */}
            <p className="mt-3 text-sm text-gray-500">
              প্রতি {product.unit === "kg" ? "কেজি" : "লিটার"}
            </p>

            {/* Today's Price + Percentage */}
            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  আজকের দাম
                </p>

                <p className="mt-1 text-3xl font-bold text-green-600">
                  ৳ {product.today}
                </p>
              </div>

              <div>
                {product.change?.dir === "up" ? (
                  <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                    ▲ {product.change.pct}%
                  </span>
                ) : product.change?.dir === "down" ? (
                  <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
                    ▼ {product.change.pct}%
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                    — {product.change?.pct ?? 0}%
                  </span>
                )}
              </div>
            </div>

            <p className="mt-5 border-t pt-3 text-sm font-semibold text-orange-600">
              বিস্তারিত দেখুন →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;