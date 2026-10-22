import { Suspense } from "react";

import AllProducts from "@/Components/AllProducts";
import BannerSection from "@/Components/BannerSection";
import Marquee from "@/Components/Marquee";
import PriceDown from "@/Components/PriceDown";
import PriceUp from "@/Components/PriceUp";

export default function Home() {
  return (
    <div>
      <Suspense
        fallback={
          <p className="container mx-auto p-4 text-sm text-gray-500">
            সর্বশেষ পণ্য লোড হচ্ছে...
          </p>
        }
      >
        <Marquee />
      </Suspense>

      <BannerSection />

      <Suspense
        fallback={
          <p className="container mx-auto p-4 text-sm text-gray-500">
            দাম বৃদ্ধির তথ্য লোড হচ্ছে...
          </p>
        }
      >
        <PriceUp />
      </Suspense>

      <Suspense
        fallback={
          <p className="container mx-auto p-4 text-sm text-gray-500">
            দাম কমার তথ্য লোড হচ্ছে...
          </p>
        }
      >
        <PriceDown />
      </Suspense>

      <Suspense
        fallback={
          <p className="container mx-auto p-4 text-sm text-gray-500">
            সব পণ্য লোড হচ্ছে...
          </p>
        }
      >
        <AllProducts />
      </Suspense>
    </div>
  );
}