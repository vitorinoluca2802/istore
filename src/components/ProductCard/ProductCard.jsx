import { useState } from "react";
import { useNavigate } from "react-router-dom";
import chevronRight from "../../assets/chevron-right.png";
import { ColorSwatches } from "../ColorSwatches/ColorSwatches";
import { deviceImageUrl, categoryFallbackImage } from "../../data/products";

export const ProductCard = ({ product, info }) => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const selectedHex = product.colors?.find(
    (color) => color.name === selectedColor
  )?.hex;
  const imageSrc = deviceImageUrl(product.imageKey, selectedColor);

  const handleButton = () => {
    navigate(
      `/shop/buy-${product.category}/${product.title
        .replace(/\s+/g, "-")
        .toLocaleLowerCase()}`
    );
  };

  return (
    <div className="mx-auto flex w-full max-w-[320px] flex-col items-center justify-center">
      <div className="mb-8 flex min-h-[450px] flex-col justify-end text-center">
        <div
          className="relative mx-auto inline-block rounded-[20px] p-[22px] before:absolute before:inset-0 before:z-0 before:rounded-full before:opacity-[0.55] before:transition-[background] before:duration-[250ms] before:content-[''] before:[background:radial-gradient(circle,var(--color-tint,transparent)_0%,transparent_70%)]"
          style={{ "--color-tint": selectedHex }}
        >
          <img
            className="relative z-[1] mx-auto block max-h-[220px] max-w-[220px]"
            src={imageSrc}
            alt={product.title}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = categoryFallbackImage[product.category];
            }}
          />
        </div>
        <strong className="mt-4 text-2xl font-semibold text-text">
          {product.title}
        </strong>
        {product.subtitle ? (
          <span className="mx-auto mt-[7px] flex justify-center">
            {product.subtitle}
          </span>
        ) : (
          ""
        )}
        <p className="my-5 mb-3 text-sm font-normal tracking-[-0.016em] leading-[1.4285914286]">
          {product.category == "accessories"
            ? `$${product.price}.00`
            : `From $${product.price}*`}
        </p>
        {product.colors ? (
          <div className="mx-auto mb-4 max-w-[220px]">
            <ColorSwatches
              colors={product.colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col items-center gap-[15px]">
          <button
            onClick={handleButton}
            className="h-6 w-[45px] cursor-pointer rounded-full border-none bg-link px-[11px] py-1 text-xs text-white hover:bg-link-hover"
          >
            Buy
          </button>
          <button
            onClick={handleButton}
            className="ml-2.5 flex cursor-pointer items-center justify-center gap-[5px] rounded-full border-none bg-transparent px-[11px] py-1 text-sm text-link hover:underline"
          >
            Learn more
            <img src={chevronRight} alt="arrow right" />
          </button>
        </div>
      </div>
      {info == true ? (
        <div className="w-4/5 border-b border-divider"></div>
      ) : (
        ""
      )}

      {product.info && info ? (
        <div>
          <ul>
            {product.info.map((infoItem, index) => {
              return (
                <li
                  key={index}
                  className="my-[30px] text-center text-sm text-text-secondary"
                >
                  {infoItem}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
