import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../Hooks/useProducts";
import { Loader } from "../Loader/Loader";
import { CartContext } from "../../context/CartContext";
import { ColorSwatches } from "../ColorSwatches/ColorSwatches";
import { ProductCard } from "../ProductCard/ProductCard";
import { deviceImageUrl, categoryFallbackImage } from "../../data/products";

export const ItemDetailContainer = () => {
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { products } = useProducts();
  const { productName } = useParams();
  const [filteredProduct, setFilteredProduct] = useState(undefined);
  const [selectedColor, setSelectedColor] = useState(undefined);
  const [appleCare, setAppleCare] = useState(false);
  const handleAppleCare = () => {
    setAppleCare(!appleCare);
  };

  useEffect(() => {
    const product = products.find(
      (product) =>
        product.title.toLowerCase().replace(/\s+/g, "-") ===
        productName.toLowerCase()
    );
    setFilteredProduct(product ?? null);
    setSelectedColor(product?.colors?.[0]?.name);
  }, [products, productName]);

  const selectedHex = filteredProduct?.colors?.find(
    (color) => color.name === selectedColor
  )?.hex;
  const imageSrc = filteredProduct
    ? deviceImageUrl(filteredProduct.imageKey, selectedColor)
    : undefined;

  const addItemToCart = (cart, item) => {
    const existingItem = cart.find(
      (cartItem) =>
        cartItem.title === item.title && cartItem.color === item.color
    );
    if (existingItem) {
      return cart.map((cartItem) =>
        cartItem.title === item.title && cartItem.color === item.color
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    return [...cart, { ...item, quantity: 1 }];
  };

  const addCart = () => {
    let updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    updatedCart = addItemToCart(updatedCart, {
      ...filteredProduct,
      color: selectedColor,
      image: imageSrc,
    });

    if (appleCare) {
      updatedCart = addItemToCart(updatedCart, {
        title: `${filteredProduct.title} AppleCare+`,
        category: filteredProduct.category,
        image: imageSrc,
        price: (filteredProduct.price * 10) / 100,
      });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  if (filteredProduct === undefined) {
    return <Loader />;
  }

  if (filteredProduct === null) {
    return (
      <div className="flex h-[90vh] flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-semibold">Product not found</h1>
        <Link to="/store" className="text-link no-underline hover:underline">
          Go to Store
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(
      (product) =>
        product.category === filteredProduct.category &&
        product.title !== filteredProduct.title
    )
    .slice(0, 3);

  return (
    <>
      <div className="mx-auto mt-16 flex min-h-[100svh] max-w-[1440px] max-md:flex-col">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div
            className="relative w-full max-w-[340px] p-10 before:absolute before:inset-0 before:z-0 before:rounded-full before:opacity-60 before:transition-[background] before:duration-[250ms] before:content-[''] before:[background:radial-gradient(circle,var(--color-tint,transparent)_0%,transparent_70%)]"
            style={{ "--color-tint": selectedHex }}
          >
            <img
              src={imageSrc}
              alt={`${filteredProduct.title} in ${selectedColor}`}
              className="relative z-[1] block w-full max-w-[300px] p-4"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  categoryFallbackImage[filteredProduct.category];
              }}
            />
          </div>
          {filteredProduct.colors && filteredProduct.colors.length > 1 ? (
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {filteredProduct.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  className={
                    "cursor-pointer rounded-[10px] border bg-surface p-1.5 transition-colors duration-200 " +
                    (selectedColor === color.name
                      ? "border-2 border-link"
                      : "border-divider hover:border-text-secondary")
                  }
                  onClick={() => setSelectedColor(color.name)}
                >
                  <img
                    src={deviceImageUrl(filteredProduct.imageKey, color.name)}
                    alt={`${filteredProduct.title} in ${color.name}`}
                    className="block h-11 w-11 object-contain"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        categoryFallbackImage[filteredProduct.category];
                    }}
                  />
                </button>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="max-w-[410px] rounded-[10px] bg-surface px-6 py-8">
            <h1 className="text-[40px] font-semibold">
              Buy {filteredProduct.title}
            </h1>
            <h2 className="pt-8 text-[2rem] font-semibold">
              ${filteredProduct.price}.00
            </h2>
            {filteredProduct.colors ? (
              <div className="flex flex-col items-center gap-3 pb-8 pt-6">
                <span className="text-sm font-semibold">
                  Color — {selectedColor}
                </span>
                <ColorSwatches
                  colors={filteredProduct.colors}
                  selected={selectedColor}
                  onSelect={setSelectedColor}
                  size="large"
                />
              </div>
            ) : (
              ""
            )}
            <div className="border-y border-divider py-8">
              <h2 className="text-xl font-semibold">Add AppleCare+</h2>
              <div>
                <div className="my-2.5 flex justify-between">
                  <div className="flex">
                    <svg width="16" height="16" fill="red">
                      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                    </svg>
                    <span className="ml-[15px] max-w-[200px] text-sm font-semibold">
                      AppleCare+ for {filteredProduct.title} $
                      {(filteredProduct.price * 10) / 100}
                    </span>
                  </div>
                  <button
                    onClick={handleAppleCare}
                    className="cursor-pointer border-none bg-none text-[15px] text-link"
                  >
                    {appleCare ? "Remove" : "Add"}
                  </button>
                </div>
                <p className="ml-[30px] max-w-[250px] text-sm font-normal leading-5">
                  Get up to two years of unlimited repairs for accidental
                  damage protection and additional tech support**
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-5 py-8">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <svg width="25px" height="25px">
                      <path fill="none" d="M0 0h25v25H0z"></path>
                      <path
                        d="M23.482 12.847l-2.92-3.209A1.947 1.947 0 0018.985 9H17V6.495a2.5 2.5 0 00-2.5-2.5h-11a2.5 2.5 0 00-2.5 2.5v9.75a2.5 2.5 0 002.5 2.5h.548A2.746 2.746 0 006.75 21.02 2.618 2.618 0 009.422 19h6.681a2.744 2.744 0 005.347-.23h.735A1.656 1.656 0 0024 16.98v-2.808a1.937 1.937 0 00-.518-1.325zM8.426 18.745a1.74 1.74 0 01-3.352 0 1.577 1.577 0 01.015-1 1.738 1.738 0 013.322 0 1.578 1.578 0 01.015 1zM9.447 18a2.726 2.726 0 00-5.394-.255H3.5a1.502 1.502 0 01-1.5-1.5v-9.75a1.502 1.502 0 011.5-1.5h11a1.502 1.502 0 011.5 1.5V18zm10.972.77a1.738 1.738 0 01-3.337 0 1.573 1.573 0 010-1 1.742 1.742 0 113.337 1zM23 16.98c0 .569-.229.79-.815.79h-.735A2.73 2.73 0 0017 16.165V10h1.986a.976.976 0 01.838.314l2.927 3.214a.95.95 0 01.249.644zm-1.324-3.36a.512.512 0 01.174.38h-3.306a.499.499 0 01-.544-.528V11h1.073a.76.76 0 01.594.268z"
                        fill="#1d1d1f"
                      ></path>
                    </svg>
                    <span className="ml-2 text-sm font-semibold">Ships:</span>
                  </div>
                  <p className="ml-8">
                    1 business day <br />
                    Free Shipping
                  </p>
                  <Link className="ml-[15px] mt-[5px] block w-fit cursor-pointer border-none bg-none text-sm text-link no-underline hover:underline">
                    Get delivery dates
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <svg width="25px" height="25px">
                      <path fill="none" d="M0 0h25v25H0z"></path>
                      <path d="M18.5 5h-1.775a4.231 4.231 0 00-8.45 0H6.5A2.5 2.5 0 004 7.5v11A2.5 2.5 0 006.5 21h12a2.5 2.5 0 002.5-2.5v-11A2.5 2.5 0 0018.5 5zm-6-3a3.245 3.245 0 013.225 3h-6.45A3.245 3.245 0 0112.5 2zM20 18.5a1.5 1.5 0 01-1.5 1.5h-12A1.5 1.5 0 015 18.5v-11A1.5 1.5 0 016.5 6h12A1.5 1.5 0 0120 7.5z"></path>
                      <path d="M14.4 12.448a1.592 1.592 0 01.738-1.328 1.607 1.607 0 00-1.37-.687c-.52 0-.941.317-1.22.317s-.663-.3-1.129-.3a1.861 1.861 0 00-1.739 2.068 4.32 4.32 0 00.723 2.3c.346.491.648.883 1.084.883s.617-.287 1.144-.287c.55 0 .663.279 1.137.279s.791-.43 1.084-.853a3.24 3.24 0 00.474-.989 1.516 1.516 0 01-.926-1.403zM12.583 10.357a1.346 1.346 0 00.941-.5 1.594 1.594 0 00.361-.974.731.731 0 00-.008-.136 1.5 1.5 0 00-1.016.528 1.547 1.547 0 00-.384.943c0 .053.008.106.008.128.03.004.06.011.098.011z"></path>
                    </svg>
                    <span className="ml-2 text-sm font-semibold">
                      Pickup:
                    </span>
                  </div>
                  <Link className="ml-[15px] mt-[5px] block w-fit cursor-pointer border-none bg-none text-sm text-link no-underline hover:underline">
                    Check availability
                  </Link>
                </div>
              </div>
              <button
                className="mb-5 w-full cursor-pointer rounded-[10px] border-none bg-link px-[15px] py-[7px] text-[17px] text-white hover:bg-link-hover"
                onClick={addCart}
              >
                Add to Bag
              </button>
            </div>
            <div>
              <span className="text-sm font-semibold">Need a moment?</span>
              <p className="max-w-[330px] text-sm font-normal leading-5">
                Keep all your selections by saving this device to Your Saves,
                then come back anytime and pick up right where you left off.
              </p>
              <button className="ml-[15px] mt-[5px] flex w-fit cursor-pointer items-center gap-1 border-none bg-none text-sm text-link no-underline hover:underline">
                <svg width="21" height="21" className="fill-link">
                  <path fill="none" d="M0 0h21v21H0z"></path>
                  <path d="M12.8 4.25a1.202 1.202 0 011.2 1.2v10.818l-2.738-2.71a1.085 1.085 0 00-1.524 0L7 16.269V5.45a1.202 1.202 0 011.2-1.2h4.6m0-1H8.2A2.2 2.2 0 006 5.45v11.588a.768.768 0 00.166.522.573.573 0 00.455.19.644.644 0 00.38-.128 5.008 5.008 0 00.524-.467l2.916-2.885a.084.084 0 01.118 0l2.916 2.886a6.364 6.364 0 00.52.463.628.628 0 00.384.131.573.573 0 00.456-.19.768.768 0 00.165-.522V5.45a2.2 2.2 0 00-2.2-2.2z"></path>
                </svg>
                Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
      {filteredProduct.info ? (
        <div className="mx-auto mb-24 max-w-[700px] px-8 text-center">
          <h2 className="mb-8 text-[1.75rem] font-semibold">
            {filteredProduct.title} highlights
          </h2>
          <ul className="flex flex-col gap-4">
            {filteredProduct.info.map((item, index) => (
              <li
                key={index}
                className="border-b border-divider pb-4 text-[17px] leading-normal text-text-secondary last:border-b-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
      {relatedProducts.length > 0 ? (
        <div className="mx-auto mb-24 max-w-[1000px] border-t border-divider px-8 pt-16 text-center">
          <h2 className="mb-12 text-[1.75rem] font-semibold">
            You might also like
          </h2>
          <div className="grid grid-cols-1 gap-5 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.title} product={product} info={false} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
