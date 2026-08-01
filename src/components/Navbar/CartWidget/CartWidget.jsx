import bag from "../../../assets/bag.svg";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

export const CartWidget = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const goCart = () => {
    navigate("/cart");
  };
  const totalQuantity = cart
    .map((item) => item.quantity)
    .reduce((total, quantity) => total + quantity, 0);
  return (
    <button
      onClick={goCart}
      className="relative flex cursor-pointer items-center justify-center border-none bg-none"
    >
      <img src={bag} alt="" />
      {totalQuantity == 0 ? (
        ""
      ) : (
        <span className="absolute -bottom-[7px] -right-[5px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-white text-[0.6rem]">
          {totalQuantity}
        </span>
      )}
    </button>
  );
};
