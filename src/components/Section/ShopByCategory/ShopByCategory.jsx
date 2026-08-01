import { Link } from "react-router-dom";
import { categoryDescription } from "../../../data/products";

const categories = [
  {
    name: "Mac",
    url: "mac",
    gradient: "from-[#3a3a3c] to-[#6e6e73]",
  },
  {
    name: "iPad",
    url: "ipad",
    gradient: "from-[#4a5680] to-[#7ba7cc]",
  },
  {
    name: "iPhone",
    url: "iphone",
    gradient: "from-[#2b2b2e] to-[#c1611b]",
  },
  {
    name: "Watch",
    url: "watch",
    gradient: "from-[#161b21] to-[#a1948c]",
  },
  {
    name: "Accessories",
    key: "accessories",
    url: "accessories",
    gradient: "from-[#274b61] to-[#eaa626]",
  },
];

export const ShopByCategory = () => {
  return (
    <section className="mx-auto max-w-[1000px] px-8 py-16">
      <h2 className="mb-10 text-center text-4xl font-semibold text-text">
        Shop by category
      </h2>
      <div className="grid grid-cols-1 gap-5 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.url}
            to={`/category/${category.url}`}
            className={`group flex h-[180px] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white no-underline ${category.gradient}`}
          >
            <h3 className="text-2xl font-semibold">{category.name}</h3>
            <p className="mt-1 text-sm text-white/80">
              {categoryDescription[category.key || category.name]}
            </p>
            <span className="mt-3 flex items-center gap-1 text-sm font-medium group-hover:underline">
              Shop {category.name}
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M6 3l5 5-5 5-1-1 4-4-4-4z" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
