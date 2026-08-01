import { useNavigate } from "react-router-dom";
import chevronRight from "../../assets/chevron-right.png";
import "./ProductCard.css";
export const ProductCard = ({ product, info }) => {
  const navigate = useNavigate();
  const handleButton = () => {
    navigate(
      `/shop/buy-${product.category}/${product.title
        .replace(/\s+/g, "-")
        .toLocaleLowerCase()}`
    );
  };
  return (
    <>
      <div className="product-card">
        <div className="product-detail">
          <img
            className="product-img"
            src={product.image}
            alt={product.title}
          />
          <strong className="product-title">{product.title}</strong>
          {product.subtitle ? (
            <span className="product-subtitle">{product.subtitle}</span>
          ) : (
            ""
          )}
          <p className="product-price">
            {product.category == "accessories"
              ? `$${product.price}.00`
              : `From $${product.price}*`}
          </p>
          <div className="product-buttons">
            <button onClick={handleButton} className="btn btn-buy">
              Buy
            </button>
            <button onClick={handleButton} className="btn btn-info">
              Learn more
              <img src={chevronRight} alt="arrow right" />
            </button>
          </div>
        </div>
        {info == true ? <div className="line"></div> : ""}

        {product.info && info ? (
          <>
            <div className="product-info">
              <ul>
                {product.info.map((infoItem, index) => {
                  return <li key={index}>{infoItem}</li>;
                })}
              </ul>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
