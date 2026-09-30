import HeroSlider from "./_components/hero/HeroSlider";
import FeatureCards from "./_components/hero/FeatureCards";
import ShopByCategory from "./_components/categories/ShopByCategory";
import PromoCards from "./_components/promocards/PromoCards";
import Products from "./products/page";
import NewsletterSection from "./_components/newsletter/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeatureCards />
      <ShopByCategory />
      <PromoCards />
      <Products />
      <NewsletterSection />
    </>
  );
}
