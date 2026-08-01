import { useEffect, useState } from "react";
import "./Order.css";
import loader from "../../assets/loader.gif";

export const Order = () => {
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOrderId(crypto.randomUUID());
    }, 800);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {orderId == null ? (
        <div className="loader-container">
          <img className="loader" src={loader} alt="" />
        </div>
      ) : (
        <div className="order-container">
          <div className="order-content">
            <h2 className="order-title">Order Confirmation</h2>
            <p className="order-info">
              Your order with ID: <span className="order-id">{orderId}</span>{" "}
              has been successfully placed.
            </p>
            <p className="order-message">Thank you for your purchase!</p>
          </div>
        </div>
      )}
    </>
  );
};
