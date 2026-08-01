import { Link } from "react-router-dom";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Mac", to: "/category/mac" },
      { label: "iPad", to: "/category/ipad" },
      { label: "iPhone", to: "/category/iphone" },
      { label: "Watch", to: "/category/watch" },
      { label: "Accessories", to: "/category/accessories" },
      { label: "Shop All", to: "/store" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Your Bag", to: "/cart" },
      { label: "Checkout", to: "/checkout" },
    ],
  },
  {
    title: "iStore Support",
    links: [
      { label: "Support Home", to: "/support" },
      { label: "Order Status", to: "/support" },
      { label: "Shipping & Returns", to: "/support" },
      { label: "AppleCare+", to: "/support" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-divider bg-surface-secondary">
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-10 min-[600px]:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-[13px] font-semibold text-text">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[13px] text-text-secondary no-underline transition-colors duration-200 hover:text-link hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-4 text-[13px] font-semibold text-text">
              About iStore
            </h3>
            <p className="text-[13px] leading-relaxed text-text-secondary">
              A concept Apple Store built as a portfolio project. Not
              affiliated with Apple Inc.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-divider pt-6 text-center min-[600px]:flex-row min-[600px]:justify-between min-[600px]:text-left">
          <p className="text-xs text-text-secondary">
            © 2023 iStore by{" "}
            <a
              href="#"
              className="text-text-secondary no-underline hover:underline"
            >
              Luca Vitorino
            </a>
            . See code{" "}
            <a
              href="#"
              className="text-text-secondary no-underline hover:underline"
            >
              here
            </a>
            .
          </p>
          <div className="flex gap-4 text-xs text-text-secondary">
            <a href="#" className="no-underline hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="no-underline hover:underline">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
