import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard/ProductCard";
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
    <section className="flex min-h-[90vh] flex-col items-center justify-center text-center">
      <h1 className="mt-24 text-4xl">Search results for: {productName}</h1>
      <div className="mx-auto grid w-full max-w-[320px] grid-cols-1 gap-5 min-[600px]:max-w-[1200px] min-[600px]:grid-cols-2 min-[900px]:grid-cols-3">
        {filteredProducts.length === 0 ? (
          <p>
            Sorry, no matches were found. Try a new search or use our
            suggestions.
          </p>
        ) : (
          filteredProducts.map((product) => {
            return <ProductCard key={product.title} product={product} />;
          })
        )}
      </div>
    </section>
  );
};
