import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { categoryFallbackImage } from "../../data/products";
import "./Cart.css";

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  let cartPrice = 0;

  cart.forEach((product) => {
    cartPrice += product.price * product.quantity;
  });

  const removeFromCart = (title, color) => {
    const updatedCart = cart.filter(
      (product) => !(product.title === title && product.color === color)
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h1 className="empty-title">Your Bag is empty</h1>
          <Link to="/store" className="empty-link">
            Go to Store
          </Link>
        </div>
      ) : (
        <div className="bag-container">
          <div className="bag-checkout">
            <h1 className="bag-title">Your bag total is ${cartPrice}.00</h1>
            <p className="bag-subtitle">Free delivery and free returns.</p>
            <Link to="/store" className="bag-continue">
              Continue Shopping
            </Link>
            <button onClick={() => navigate("/checkout")} className="bag-buy">
              Checkout
            </button>
          </div>
          <div className="bag-products">
            {cart.map((product) => (
              <div
                key={`${product.title}-${product.color}`}
                className="bag-product"
              >
                <img
                  className="bag-image"
                  src={product.image}
                  alt=""
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      categoryFallbackImage[product.category];
                  }}
                />
                <div className="bag-info">
                  <div className="bag-info-title-group">
                    <strong className="bag-info-title">{product.title}</strong>
                    {product.color ? (
                      <span className="bag-info-color">{product.color}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <span>{product.quantity}x</span>
                  <div className="price-remove">
                    <strong>${product.price * product.quantity}</strong>
                    <button
                      className="remove"
                      onClick={() => removeFromCart(product.title, product.color)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
