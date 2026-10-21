
import AllProducts from "@/Components/AllProducts";
import BannerSection from "@/Components/BannerSection";
import Marquee from "@/Components/Marquee";
import PriceDown from "@/Components/PriceDown";
import PriceUp from "@/Components/PriceUp";




export default function Home() {
  return (
    <div>
      <Marquee/>
      
      <BannerSection/>
      <PriceUp/>
      <PriceDown/>
      <AllProducts/>
    </div>
  );
}