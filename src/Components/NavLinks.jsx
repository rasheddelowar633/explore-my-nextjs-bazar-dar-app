
import Link from "next/link";

const NavLinks = async () => {
  let categoriesData = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Categories fetch failed: ${res.status}`);
    }

    const data = await res.json();

    categoriesData = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
        ? data.data
        : [];
  } catch (error) {
    console.error("NavLinks error:", error);

    return (
      <nav className="container mx-auto px-4 py-3">
        <p className="text-sm text-red-600">
          ক্যাটাগরি লোড করা যায়নি। পেজটি রিফ্রেশ করো।
        </p>
      </nav>
    );
  }

  return (
    <nav className="container mx-auto flex flex-wrap items-center justify-start gap-2 px-4 py-3">
      {categoriesData.length > 0 ? (
        categoriesData.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="rounded-lg px-4 py-2 text-black transition duration-300 hover:bg-green-600 hover:text-white"
          >
            <span className="mr-1">{category.icon}</span>
            {category.nameBn}
          </Link>
        ))
      ) : (
        <p className="text-sm text-gray-500">
          কোনো ক্যাটাগরি পাওয়া যায়নি।
        </p>
      )}
    </nav>
  );
};

export default NavLinks;
