import { Link } from "react-router-dom";
import { categoryDescription, products, deviceImageUrl, categoryFallbackImage } from "../../../data/products";
import { Reveal } from "../../Reveal/Reveal";

const categories = [
  { name: "Mac", url: "mac", productTitle: "iMac 8-Core GPU" },
  { name: "iPad", url: "ipad", productTitle: "iPad Pro" },
  { name: "iPhone", url: "iphone", productTitle: "iPhone 17 Pro" },
  { name: "Watch", url: "watch", productTitle: "Apple Watch Series 11" },
  {
    name: "Accessories",
    key: "accessories",
    url: "accessories",
    productTitle: "AirPods Pro 3",
  },
];

export const ShopByCategory = () => {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8">
      <Reveal>
        <p className="text-center text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
          Shop
        </p>
        <h2 className="mb-12 mt-2 text-center text-4xl font-semibold tracking-[-0.02em] text-text">
          Shop by category
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3">
        {categories.map((category, index) => {
          const product = products.find((p) => p.title === category.productTitle);
          const imageSrc = product
            ? deviceImageUrl(product.imageKey, product.colors?.[0]?.name)
            : null;

          return (
            <Reveal key={category.url} delay={index * 80}>
              <Link
                to={`/category/${category.url}`}
                className="group flex h-[300px] flex-col items-center justify-between rounded-3xl border border-divider bg-surface-secondary p-8 text-center no-underline transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card-hover"
              >
                {product ? (
                  <img
                    src={imageSrc}
                    alt={product.title}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = categoryFallbackImage[product.category];
                    }}
                    className="max-h-[120px] max-w-[140px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-[120px]" />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-text">{category.name}</h3>
                  <p className="mt-1.5 text-sm text-text-secondary">
                    {categoryDescription[category.key || category.name]}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-link">
                    Shop {category.name}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M6 3l5 5-5 5-1-1 4-4-4-4z" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
