import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Order.css";
import loader from "../../assets/loader.gif";

export const Order = ({ name, phone, email }) => {
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    const createOrder = async () => {
      try {
        const order = {
          name,
          phone,
          email,
          createdAt: new Date(),
        };

        const docRef = await addDoc(collection(db, "orders"), order);
        console.log("Order created with ID: ", docRef.id);
        setOrderId(docRef.id);
      } catch (error) {
        console.error("Error creating order: ", error);
      }
    };

    createOrder();
  }, [name, phone, email]);

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
