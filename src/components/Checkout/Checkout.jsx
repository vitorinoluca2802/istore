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
  const [bought, setBought] = useState(false);
  useEffect(() => {
    let totalPrice = 0;
    cart.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    setCartPrice(totalPrice);
  }, [cart]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

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
    return <Order name={name} phone={phone} email={email} />;
  }
  return (
    <>
      <div className="checkout-header">
        <h2>Checkout</h2>
        <p>Order Summary: ${cartPrice}</p>
      </div>
      <h1 className="checkout-title">Now fill out your pickup information.</h1>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-input-group">
            <input
              required
              type="text"
              value={name}
              onChange={handleNameChange}
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
              type="text"
              value={phone}
              onChange={handlePhoneChange}
            />
            <label>Phone Number</label>
          </div>
          <button className="btn-add-cart">Finish Payment</button>
        </form>
      </div>
    </>
  );
};
