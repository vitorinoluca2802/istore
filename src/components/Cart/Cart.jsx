import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { categoryFallbackImage } from "../../data/products";

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
    <div className="flex min-h-[90svh] flex-col items-center justify-center px-6 pt-24 md:px-8">
      {cart.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-3xl font-semibold tracking-[-0.01em] text-text">
            Your Bag is empty
          </h1>
          <Link to="/store" className="text-link no-underline hover:underline">
            Go to Store
          </Link>
        </div>
      ) : (
        <div className="mb-16 flex w-full max-w-[900px] flex-col items-center">
          <div className="text-center">
            <h1 className="mb-3 text-4xl font-semibold tracking-[-0.02em] text-text">
              Your bag total is ${cartPrice}.00
            </h1>
            <p className="mb-5 text-text-secondary">
              Free delivery and free returns.
            </p>
            <div className="mb-6 flex flex-col items-center gap-4">
              <Button onClick={() => navigate("/checkout")} variant="filled" className="!w-full !max-w-[250px]">
                Checkout
              </Button>
              <Link to="/store" className="text-sm text-link no-underline hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
          <div className="w-full divide-y divide-divider rounded-3xl border border-divider bg-white">
            {cart.map((product) => (
              <div
                key={`${product.title}-${product.color}`}
                className="flex items-center justify-between gap-6 p-8 max-md:flex-col max-md:gap-4"
              >
                <img
                  className="w-[100px] max-md:mx-auto drop-shadow-[0_12px_10px_rgba(0,0,0,0.15)]"
                  src={product.image}
                  alt=""
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      categoryFallbackImage[product.category];
                  }}
                />
                <div className="flex flex-grow items-center justify-between max-md:flex-col">
                  <div className="flex w-[200px] flex-col max-md:mb-2 max-md:w-auto max-md:items-center max-md:text-center">
                    <strong className="text-xl font-semibold text-text">
                      {product.title}
                    </strong>
                    {product.color ? (
                      <span className="text-sm text-text-secondary">
                        {product.color}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <span className="text-text-secondary">{product.quantity}x</span>
                  <div className="flex flex-col items-end max-md:mt-4 max-md:items-center max-md:gap-2">
                    <strong className="text-text">${product.price * product.quantity}</strong>
                    <button
                      className="cursor-pointer border-none bg-none text-sm text-link transition-colors duration-200 hover:text-link-hover hover:underline"
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
