import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { Reveal } from "../components/Reveal/Reveal";
import { useProducts } from "../components/Hooks/useProducts";

export const Search = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { productName } = useParams();
  const { products } = useProducts();

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((product) => {
        return product.title.toLowerCase().includes(productName.toLowerCase());
      });
      setFilteredProducts(filtered);
    }
  }, [productName, products]);

  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-32 text-center md:px-8 md:pt-40">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
          Search
        </p>
        <h1 className="mb-14 mt-2 text-4xl font-semibold tracking-[-0.02em] text-text md:text-5xl">
          Results for “{productName}”
        </h1>
      </Reveal>
      <div className="mx-auto grid w-full max-w-[340px] grid-cols-1 gap-5 min-[600px]:max-w-none min-[600px]:grid-cols-2 min-[900px]:grid-cols-3">
        {filteredProducts.length === 0 ? (
          <p className="text-text-secondary">
            Sorry, no matches were found. Try a new search or use our
            suggestions.
          </p>
        ) : (
          filteredProducts.map((product, index) => (
            <Reveal key={product.title} delay={(index % 3) * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))
        )}
      </div>
    </section>
  );
};
