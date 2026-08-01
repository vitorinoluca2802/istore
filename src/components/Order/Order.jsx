import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";

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
        <div className="flex h-[90vh] items-center justify-center px-6">
          <div className="mx-auto max-w-[440px] rounded-3xl border border-divider bg-surface px-8 py-12 text-center shadow-card">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-link/10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="mb-2.5 text-2xl font-semibold tracking-[-0.01em] text-text">
              Order Confirmation
            </h2>
            <p className="mb-1 text-lg text-text-secondary">
              Your order with ID:{" "}
              <span className="font-semibold text-text">{orderId}</span> has
              been successfully placed.
            </p>
            <p className="mb-8 text-lg text-text-secondary">
              Thank you for your purchase!
            </p>
            <Button to="/" variant="filled">
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
