import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Order } from "../Order/Order";
import { categoryFallbackImage } from "../../data/products";

const FormField = ({ label, error, className = "", ...inputProps }) => (
  <div className={`flex min-w-0 flex-1 flex-col-reverse ${className}`}>
    <input
      {...inputProps}
      className={
        "h-[45px] w-full rounded-lg border bg-transparent px-4 text-base transition-colors duration-300 focus:outline-none peer " +
        (error ? "border-red-500" : "border-[#6e6e73] focus:border-link")
      }
    />
    <label className="text-[#6e6e73] peer-focus:text-link">{label}</label>
  </div>
);

export const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const [cartPrice, setCartPrice] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bought, setBought] = useState(false);

  useEffect(() => {
    let totalPrice = 0;
    cart.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    setCartPrice(totalPrice);
  }, [cart]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleConfirmEmailChange = (e) => {
    setConfirmEmail(e.target.value);
    setEmailError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== confirmEmail || email.length === 0) {
      setEmailError(true);
    } else {
      setBought(true);
      setCart([]);
      localStorage.clear();
    }
  };

  if (bought) {
    return <Order />;
  }

  return (
    <>
      <div className="mt-[50px] flex justify-between border-b border-divider px-6 py-6 md:px-8">
        <h2 className="text-2xl font-semibold tracking-[-0.01em] text-text">Checkout</h2>
        <p className="text-text-secondary">Order Summary: ${cartPrice}.00</p>
      </div>
      <h1 className="px-6 pt-12 text-center text-4xl font-semibold tracking-[-0.02em] text-text md:text-5xl">
        Review and place your order.
      </h1>
      <div className="mx-auto flex max-w-[1000px] items-start justify-center gap-16 px-6 pb-16 pt-12 max-[900px]:flex-col-reverse max-[900px]:items-center md:px-8">
        <form
          className="flex w-full max-w-[500px] flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h3 className="mt-4 text-[1.1rem] font-semibold text-text first:mt-0">
            Contact
          </h3>
          <FormField
            label="Full Name"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormField
            label="Email Address"
            required
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <FormField
            label="Confirm Email Address"
            required
            type="email"
            value={confirmEmail}
            onChange={handleConfirmEmailChange}
            error={emailError}
          />
          {emailError && (
            <span className="-mt-5 ml-1 text-red-600">
              Email addresses do not match
            </span>
          )}
          <FormField
            label="Phone Number"
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <h3 className="mt-4 text-[1.1rem] font-semibold text-text first:mt-0">
            Shipping address
          </h3>
          <FormField
            label="Street Address"
            required
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex gap-4">
            <FormField
              label="City"
              required
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <FormField
              label="State"
              required
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <FormField
              label="ZIP Code"
              required
              type="text"
              pattern="[0-9]{4,10}"
              title="ZIP code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>

          <h3 className="mt-4 text-[1.1rem] font-semibold text-text first:mt-0">
            Payment
          </h3>
          <FormField
            label="Name on Card"
            required
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <FormField
            label="Card Number"
            required
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]{16,19}"
            title="16-digit card number"
            maxLength={19}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <div className="flex gap-4">
            <FormField
              label="Expiration"
              required
              type="text"
              inputMode="numeric"
              pattern="(0[1-9]|1[0-2])/[0-9]{2}"
              title="MM/YY"
              placeholder="MM/YY"
              maxLength={5}
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
            />
            <FormField
              label="CVV"
              required
              type="text"
              inputMode="numeric"
              pattern="[0-9]{3,4}"
              title="CVV"
              maxLength={4}
              value={cardCvv}
              onChange={(e) => setCardCvv(e.target.value)}
            />
          </div>

          <button className="h-[48px] cursor-pointer rounded-full border-none bg-text text-base font-medium text-white transition-colors duration-300 hover:bg-[#424245]">
            Place Order — ${cartPrice}.00
          </button>
        </form>

        <div className="mt-8 w-full max-w-[340px] rounded-3xl border border-divider bg-surface p-6 shadow-card max-[900px]:mt-0">
          <h3 className="text-[1.1rem] font-semibold text-text">In your bag</h3>
          <ul className="mb-6 flex flex-col gap-4">
            {cart.map((product) => (
              <li
                key={`${product.title}-${product.color}`}
                className="flex items-center gap-4"
              >
                <img
                  src={product.image}
                  alt=""
                  className="h-12 w-12 rounded-md bg-white object-contain"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      categoryFallbackImage[product.category];
                  }}
                />
                <div className="flex flex-grow flex-col text-[0.85rem] text-text-secondary">
                  <strong className="text-[0.95rem] text-text">
                    {product.title}
                  </strong>
                  {product.color ? <span>{product.color}</span> : ""}
                  <span>Qty {product.quantity}</span>
                </div>
                <strong className="text-[0.95rem]">
                  ${product.price * product.quantity}
                </strong>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 border-t border-divider pt-4">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal</span>
              <span>${cartPrice}.00</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-[1.1rem] font-semibold text-text">
              <span>Total</span>
              <span>${cartPrice}.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
