import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorSwatches } from "../ColorSwatches/ColorSwatches";
import { Button } from "../Button/Button";
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
    <div className="group mx-auto flex w-full max-w-[340px] flex-col rounded-3xl border border-divider bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card-hover">
      <div className="flex flex-1 flex-col justify-end">
        <div
          className="relative mx-auto inline-block overflow-hidden rounded-[20px] p-[22px] before:absolute before:inset-0 before:z-0 before:rounded-full before:opacity-[0.55] before:transition-[background] before:duration-[250ms] before:content-[''] before:[background:radial-gradient(circle,var(--color-tint,transparent)_0%,transparent_70%)]"
          style={{ "--color-tint": selectedHex }}
        >
          <img
            className="relative z-[1] mx-auto block max-h-[220px] max-w-[220px] transition-transform duration-300 group-hover:scale-105"
            src={imageSrc}
            alt={product.title}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = categoryFallbackImage[product.category];
            }}
          />
        </div>
        <strong className="mt-4 text-xl font-semibold tracking-[-0.01em] text-text">
          {product.title}
        </strong>
        {product.subtitle ? (
          <span className="mx-auto mt-1 flex justify-center text-sm text-text-secondary">
            {product.subtitle}
          </span>
        ) : (
          ""
        )}
        <p className="my-4 text-sm font-normal tracking-[-0.016em] text-text-secondary">
          {product.category == "accessories"
            ? `$${product.price}.00`
            : `From $${product.price}*`}
        </p>
        {product.colors ? (
          <div className="mx-auto mb-5 max-w-[220px]">
            <ColorSwatches
              colors={product.colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col items-center gap-3">
          <Button onClick={handleButton} variant="filled" className="!px-6 !py-2 !text-xs">
            Buy
          </Button>
          <Button onClick={handleButton} variant="text" chevron>
            Learn more
          </Button>
        </div>
      </div>
      {info == true ? (
        <div className="mx-auto mt-6 w-4/5 border-b border-divider"></div>
      ) : (
        ""
      )}

      {product.info && info ? (
        <ul>
          {product.info.map((infoItem, index) => {
            return (
              <li
                key={index}
                className="my-[26px] text-center text-sm text-text-secondary"
              >
                {infoItem}
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
