import { useProducts } from "../../Hooks/useProducts";
import { ProductCard } from "../../ProductCard/ProductCard";
import loader from "../../../assets/loader.gif";

export const Products = () => {
  const { products } = useProducts();
  return (
    <>
      {products.length == 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <img className="w-[50px]" src={loader} alt="" />
        </div>
      ) : (
        <div className="mx-auto my-40 max-w-[1000px]">
          <h2 className="mb-20 ml-20 text-5xl">
            Store.{" "}
            <span className="font-semibold text-text-secondary">
              The best way to buy the products you love.
            </span>
          </h2>
          <div className="mx-auto grid max-w-[320px] grid-cols-1 items-start gap-5 min-[600px]:max-w-[1000px] min-[600px]:grid-cols-2 min-[900px]:grid-cols-3">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product.title}
                  product={product}
                  info={false}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
