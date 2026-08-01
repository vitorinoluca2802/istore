import { products, deviceImageUrl, categoryFallbackImage } from "../../../data/products";
import { Reveal } from "../../Reveal/Reveal";
import { Button } from "../../Button/Button";

const iMac = products.find((product) => product.title === "iMac 8-Core GPU");
const imageSrc = deviceImageUrl(iMac.imageKey, iMac.colors[0].name);
const slug = iMac.title.replace(/\s+/g, "-").toLowerCase();

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center bg-surface px-6 pb-0 pt-32 text-center md:pt-40">
      <Reveal className="mx-auto flex max-w-[800px] flex-col items-center justify-center gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
          iMac
        </p>
        <h1 className="text-5xl font-semibold tracking-[-0.02em] text-text md:text-6xl">
          Say hello to the new iMac.
        </h1>
        <p className="max-w-[520px] text-xl text-text-secondary">
          Experience the power and beauty of the all-new iMac.
        </p>
        <div className="mt-2 flex items-center gap-6">
          <Button to={`/shop/buy-${iMac.category}/${slug}`} variant="filled">
            Buy
          </Button>
          <Button to={`/shop/buy-${iMac.category}/${slug}`} variant="text" chevron>
            Learn more
          </Button>
        </div>
      </Reveal>
      <Reveal delay={150} className="mt-10 w-full">
        <img
          src={imageSrc}
          alt={iMac.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = categoryFallbackImage[iMac.category];
          }}
          className="mx-auto max-h-[560px] w-full max-w-[900px] object-contain"
        />
      </Reveal>
    </section>
  );
};

export default Hero;
