import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
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
    <div className="flex min-h-[90svh] flex-col items-center justify-center p-8">
      {cart.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center">
          <h1 className="mb-4 text-3xl font-semibold">Your Bag is empty</h1>
          <Link to="/store" className="text-link-hover no-underline">
            Go to Store
          </Link>
        </div>
      ) : (
        <div className="mb-8 flex w-full max-w-[900px] flex-col items-center p-8">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-semibold">
              Your bag total is ${cartPrice}.00
            </h1>
            <p className="mb-4">Free delivery and free returns.</p>
            <Link
              to="/store"
              className="mb-4 block text-link-hover no-underline"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => navigate("/checkout")}
              className="mb-4 w-full max-w-[250px] cursor-pointer rounded-[10px] border-none bg-link px-4 py-2 text-[17px] font-normal text-white transition-colors duration-200 hover:bg-link-hover"
            >
              Checkout
            </button>
          </div>
          <div className="w-full">
            {cart.map((product) => (
              <div
                key={`${product.title}-${product.color}`}
                className="flex max-w-[900px] items-center justify-between border-b border-divider p-8 max-md:flex-col max-md:gap-4"
              >
                <img
                  className="mr-4 w-[100px] max-md:mx-auto max-md:mr-0"
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
                    <strong className="text-xl font-semibold">
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
                  <span>{product.quantity}x</span>
                  <div className="flex flex-col items-end max-md:mt-4 max-md:items-center max-md:gap-2">
                    <strong>${product.price * product.quantity}</strong>
                    <button
                      className="cursor-pointer border-none bg-none text-base text-link-hover"
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
