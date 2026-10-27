
import Image from "next/image";
import DateDisplay from "./DateDisplay";

const BannerSection = () => {
  return (
    <section className="container mx-auto px-3 py-5 sm:px-4 sm:py-8">
      <div className="relative grid min-h-[400px] items-center gap-8 overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-100 px-5 py-8 shadow-sm sm:px-8 md:grid-cols-2 md:gap-6 md:px-10 md:py-12 lg:px-14">

        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-green-200/30 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />

        {/* Left Content */}
        <div className="relative z-10">
          <p className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-green-200 bg-white/90 px-4 py-2 text-xs font-semibold text-green-700 shadow-sm sm:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />

            <DateDisplay />
          </p>

          <h1 className="mb-5 text-3xl font-extrabold leading-[1.3] tracking-tight text-gray-900 sm:text-4xl md:text-4xl lg:text-5xl">
            আজকের বাজারের দাম
            <br />

            <span className="text-green-700">
              এক নজরে
            </span>
          </h1>

          <p className="mb-7 max-w-xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8 md:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#products"
            className="group inline-flex items-center gap-3 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"
          >
            সব পণ্য দেখুন

            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          {/* Feature Highlights */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-green-200/70 pt-5 text-xs font-medium text-gray-600 sm:text-sm">
            <span className="flex items-center gap-2">
              <span className="text-base text-green-600">✓</span>
              বাজারভিত্তিক দাম
            </span>

            <span className="flex items-center gap-2">
              <span className="text-base text-green-600">✓</span>
              সহজ তুলনা
            </span>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative z-10 flex items-center justify-center md:justify-end">
          <div className="absolute inset-8 rounded-full bg-green-300/20 blur-3xl" />

          <Image
            src="/Assets/bazar-hero.png"
            alt="আজকের বাজারের পণ্য"
            width={600}
            height={400}
            className="relative h-auto w-full max-w-[550px] object-contain drop-shadow-sm transition-transform duration-500 hover:scale-[1.03]"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default BannerSection;
