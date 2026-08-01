import { useProducts } from "../../Hooks/useProducts";
import { ProductCard } from "../../ProductCard/ProductCard";
import { Loader } from "../../Loader/Loader";
import { Reveal } from "../../Reveal/Reveal";

export const Products = () => {
  const { products, loading } = useProducts();
  return (
    <>
      {loading ? (
        <div className="relative min-h-[50vh]">
          <Loader />
        </div>
      ) : (
        <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-8">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Store
            </p>
            <h2 className="mb-14 mt-2 text-4xl font-semibold tracking-[-0.02em] text-text md:text-5xl">
              The best way to buy the products you love.
            </h2>
          </Reveal>
          <div className="mx-auto grid max-w-[340px] grid-cols-1 items-start gap-5 min-[600px]:max-w-[1000px] min-[600px]:grid-cols-2 min-[900px]:max-w-none min-[900px]:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.title} delay={(index % 3) * 80}>
                <ProductCard product={product} info={false} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
