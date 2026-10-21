
const PriceUp = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  const data = await res.json();

  const priceUp = data
    .filter((item) => item.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="container mx-auto px-4 py-8 ">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
         <span className="text-red-600">▲</span>
          দাম বেড়েছে
        </h2>

        <p className="text-gray-500 font-bold">
          সবচেয়ে বেশি দাম বেড়েছে এমন ৬টি পণ্য
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-gray-200 p-4">
        {priceUp.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl  bg-white p-5 shadow-sm hover:shadow-lg transition"
          >
            {/* Product */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                {item.categoryIcon}
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  {item.nameBn}
                </h3>

                <p className="text-sm text-gray-500">
                  প্রতি {item.unit}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  আজকের দাম
                </p>

                <p className="text-2xl font-bold">
                  ৳{item.today}
                </p>
              </div>

              {/* Change */}
              <div className="text-right">
                <p className="text-xl font-bold text-red-600">
                  <span className="text-red-600">▲</span> {Math.abs(item.change.pct)}%
                </p>

                <p className="text-sm text-gray-500">
                  বেড়েছে
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PriceUp;