import { Link } from "react-router-dom";
import { products, deviceImageUrl, categoryFallbackImage } from "../../../data/products";
import { Reveal } from "../../Reveal/Reveal";
import { Button } from "../../Button/Button";

const findProduct = (title) => products.find((product) => product.title === title);

const promos = [
  {
    product: findProduct("iPhone 17 Pro"),
    kicker: "iPhone 17 Pro",
    headline: "A total powerhouse.",
    gradient: "from-[#2b2b2e] to-[#1c1c1e]",
    size: "large",
  },
  {
    product: findProduct("HomePod"),
    kicker: "HomePod",
    headline: "Room-filling sound.",
    gradient: "from-[#274b61] to-[#173142]",
    size: "small",
  },
  {
    product: findProduct("Apple Watch Series 11"),
    kicker: "Apple Watch Series 11",
    headline: "A whole new thin.",
    gradient: "from-[#3a3a3c] to-[#1c1c1e]",
    size: "small",
  },
];

const PromoCard = ({ promo }) => {
  const { product, kicker, headline, gradient, size } = promo;
  if (!product) return null;

  const slug = product.title.replace(/\s+/g, "-").toLowerCase();
  const colorName = product.colors?.[0]?.name;
  const imageSrc = deviceImageUrl(product.imageKey, colorName);

  return (
    <Link
      to={`/shop/buy-${product.category}/${slug}`}
      className={`group relative flex overflow-hidden rounded-[28px] bg-gradient-to-b ${gradient} ${
        size === "large"
          ? "min-h-[420px] flex-col justify-between p-10 md:p-14"
          : "min-h-[340px] flex-col justify-between p-8"
      }`}
    >
      <div className="relative z-[1] text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
          {kicker}
        </p>
        <h3
          className={`mt-2 font-semibold tracking-[-0.02em] ${
            size === "large" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
          }`}
        >
          {headline}
        </h3>
        <div className="mt-4">
          <Button variant="text" chevron className="!text-white mx-auto hover:!text-white/70">
            Learn more
          </Button>
        </div>
      </div>
      <img
        src={imageSrc}
        alt={product.title}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = categoryFallbackImage[product.category];
        }}
        className={`relative z-[1] mx-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:scale-105 ${
          size === "large" ? "max-h-[260px]" : "max-h-[180px]"
        }`}
      />
    </Link>
  );
};

const AppleHero = () => {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-6 md:px-8">
      <Reveal>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="md:row-span-2">
            <PromoCard promo={promos[0]} />
          </div>
          <PromoCard promo={promos[1]} />
          <PromoCard promo={promos[2]} />
        </div>
      </Reveal>
    </section>
  );
};

export default AppleHero;
