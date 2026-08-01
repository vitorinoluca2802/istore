import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { Loader } from "../Loader/Loader";
import { Reveal } from "../Reveal/Reveal";
import { useProducts } from "../Hooks/useProducts";
import { categoryDescription } from "../../data/products";

const categories = ["Mac", "iPad", "iPhone", "Watch", "accessories"];

export const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const filteredCategory = categories.find(
    (category) => category.toLowerCase() === categoryId
  );

  const { products, loading } = useProducts();

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === filteredCategory
    );
    setFilteredProducts(filtered);
  }, [filteredCategory, products]);

  const generateTitle = (category) => {
    if (["Mac", "iPad", "iPhone"].includes(category)) {
      return `Which ${category} is right for you?`;
    } else if (category === "accessories") {
      return `Find the ${category} you're looking for.`;
    } else {
      return `Which Apple ${category} is right for you?`;
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-16 md:px-8">
      <Reveal>
        <h1 className="pb-2 pt-32 text-center text-5xl font-semibold tracking-[-0.02em] text-text max-md:pb-6 md:pt-40 md:text-6xl">
          {generateTitle(filteredCategory)}
        </h1>
        {categoryDescription[filteredCategory] ? (
          <p className="mx-auto mb-16 max-w-[600px] px-4 text-center text-xl text-text-secondary">
            {categoryDescription[filteredCategory]}
          </p>
        ) : (
          ""
        )}
      </Reveal>
      <div className="mx-auto grid w-full max-w-[340px] grid-cols-1 gap-5 min-[600px]:max-w-none min-[600px]:grid-cols-2 min-[900px]:grid-cols-3">
        {loading ? (
          <Loader />
        ) : filteredProducts.length === 0 ? (
          <p className="p-4 font-medium">
            No products found in this category yet.
          </p>
        ) : (
          filteredProducts.map((product, index) => (
            <Reveal key={product.title} delay={(index % 3) * 80}>
              <ProductCard product={product} info={true} />
            </Reveal>
          ))
        )}
      </div>
    </div>
  );
};
