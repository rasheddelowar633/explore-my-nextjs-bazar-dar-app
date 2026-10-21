
import Image from "next/image";

const BannerSection = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="container mx-auto bg-green-50">
      <div className="grid min-h-[400px] items-center gap-8 px-4 py-10 md:grid-cols-2">

        {/* Left Content */}
        <div>
          <p className="mb-3 text-sm font-medium text-green-700 md:text-base">
            {date}
          </p>

          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            আজকের বাজারের দাম
            <br />
            এক নজরে
          </h1>

          <p className="mb-6 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <button className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-green-700">
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/assets/bazar-hero.png"
            alt="আজকের বাজারের পণ্য"
            width={600}
            height={400}
            className="w-full max-w-[550px] object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default BannerSection;