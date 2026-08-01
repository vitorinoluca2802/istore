import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";

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
        <Loader />
      ) : (
        <div className="flex h-[90vh] items-center justify-center">
          <div className="mx-auto max-w-[400px] rounded-[18px] bg-surface px-8 py-10 text-center">
            <h2 className="mb-2.5 text-2xl font-semibold">
              Order Confirmation
            </h2>
            <p className="mb-5 text-lg text-text-secondary">
              Your order with ID:{" "}
              <span className="font-semibold text-text">{orderId}</span> has
              been successfully placed.
            </p>
            <p className="text-lg text-text-secondary">
              Thank you for your purchase!
            </p>
          </div>
        </div>
      )}
    </>
  );
};
