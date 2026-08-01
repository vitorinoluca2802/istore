import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import "./Checkout.css";
import { Order } from "../Order/Order";

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
      <div className="checkout-header">
        <h2>Checkout</h2>
        <p>Order Summary: ${cartPrice}.00</p>
      </div>
      <h1 className="checkout-title">Review and place your order.</h1>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3 className="checkout-section-title">Contact</h3>
          <div className="form-input-group">
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Full Name</label>
          </div>
          <div className="form-input-group">
            <input
              required
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <label>Email Address</label>
          </div>
          <div className="form-input-group">
            <input
              required
              type="email"
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
              className={emailError ? "error" : ""}
            />
            <label>Confirm Email Address</label>
          </div>
          {emailError && (
            <span className="error-message">Email addresses do not match</span>
          )}
          <div className="form-input-group">
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Phone Number</label>
          </div>

          <h3 className="checkout-section-title">Shipping address</h3>
          <div className="form-input-group">
            <input
              required
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>Street Address</label>
          </div>
          <div className="form-row">
            <div className="form-input-group">
              <input
                required
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label>City</label>
            </div>
            <div className="form-input-group">
              <input
                required
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <label>State</label>
            </div>
            <div className="form-input-group">
              <input
                required
                type="text"
                pattern="[0-9]{4,10}"
                title="ZIP code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              <label>ZIP Code</label>
            </div>
          </div>

          <h3 className="checkout-section-title">Payment</h3>
          <div className="form-input-group">
            <input
              required
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <label>Name on Card</label>
          </div>
          <div className="form-input-group">
            <input
              required
              type="text"
              inputMode="numeric"
              pattern="[0-9 ]{16,19}"
              title="16-digit card number"
              maxLength={19}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <label>Card Number</label>
          </div>
          <div className="form-row">
            <div className="form-input-group">
              <input
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
              <label>Expiration</label>
            </div>
            <div className="form-input-group">
              <input
                required
                type="text"
                inputMode="numeric"
                pattern="[0-9]{3,4}"
                title="CVV"
                maxLength={4}
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
              />
              <label>CVV</label>
            </div>
          </div>

          <button className="btn-add-cart">Place Order — ${cartPrice}.00</button>
        </form>

        <div className="order-summary">
          <h3 className="checkout-section-title">In your bag</h3>
          <ul className="order-summary-list">
            {cart.map((product) => (
              <li key={`${product.title}-${product.color}`}>
                <img src={product.image} alt="" />
                <div className="order-summary-item-info">
                  <strong>{product.title}</strong>
                  {product.color ? <span>{product.color}</span> : ""}
                  <span>Qty {product.quantity}</span>
                </div>
                <strong className="order-summary-item-price">
                  ${product.price * product.quantity}
                </strong>
              </li>
            ))}
          </ul>
          <div className="order-summary-totals">
            <div>
              <span>Subtotal</span>
              <span>${cartPrice}.00</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="order-summary-total">
              <span>Total</span>
              <span>${cartPrice}.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
