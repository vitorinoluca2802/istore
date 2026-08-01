import Hero from "../components/Section/Hero/Hero";
import AppleHero from "../components/Section/AppleHero/AppleHero";
import { ShopByCategory } from "../components/Section/ShopByCategory/ShopByCategory";
import { TrustBadges } from "../components/Section/TrustBadges/TrustBadges";
import { Products } from "../components/Section/Products/Products";
import { Testimonials } from "../components/Section/Testimonials/Testimonials";
import { Newsletter } from "../components/Section/Newsletter/Newsletter";

export const Landing = () => {
  return (
    <>
      <Hero />
      <AppleHero />
      <TrustBadges />
      <ShopByCategory />
      <Products />
      <Testimonials />
      <Newsletter />
    </>
  );
};
