
import Image from "next/image";
import DateDisplay from "./DateDisplay";

const BannerSection = () => {
  return (
    <section className="container mx-auto overflow-hidden rounded-2xl bg-green-50">
      <div className="grid min-h-[400px] items-center gap-8 px-5 py-10 sm:px-8 md:grid-cols-2 md:gap-10 md:px-10 lg:py-14">

        {/* Left Content */}
        <div className="relative z-10">
          <p className="mb-4 inline-flex rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm md:text-base">
            <DateDisplay />
          </p>

          <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            আজকের বাজারের দাম
            <br />
            <span className="text-green-700">এক নজরে</span>
          </h1>

          <p className="mb-7 max-w-xl text-base leading-7 text-gray-600 md:text-lg md:leading-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <button className="rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg">
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/Assets/bazar-hero.png"
            alt="আজকের বাজারের পণ্য"
            width={600}
            height={400}
            className="h-auto w-full max-w-[550px] object-contain transition-transform duration-500 hover:scale-[1.02]"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default BannerSection;
