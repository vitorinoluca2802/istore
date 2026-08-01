import { useProducts } from "../../Hooks/useProducts";
import { ProductCard } from "../../ProductCard/ProductCard";
import loader from "../../../assets/loader.gif";
import "./Products.css";
export const Products = () => {
  const { products } = useProducts();
  return (
    <>
      {products.length == 0 ? (
        <div className="section-products-loader">
          <img className="loader" src={loader} alt="" />
        </div>
      ) : (
        <div className="section-products">
          <h2>
            Store. <span>The best way to buy the products you love.</span>
          </h2>
          <div className="container-list">
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
