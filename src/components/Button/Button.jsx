import { Link } from "react-router-dom";

const variants = {
  filled:
    "rounded-full bg-link px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-link-hover",
  ghost:
    "rounded-full border border-link bg-transparent px-5 py-2.5 text-sm font-medium text-link transition-colors duration-200 hover:bg-link hover:text-white",
  text: "inline-flex items-center gap-1 bg-transparent text-sm font-medium text-link transition-colors duration-200 hover:text-link-hover",
};

const Chevron = () => (
  <svg
    width="8"
    height="13"
    viewBox="0 0 8 13"
    fill="none"
    className="transition-transform duration-200 group-hover:translate-x-0.5"
  >
    <path
      d="M1 1L6.5 6.5L1 12"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Button = ({
  children,
  variant = "filled",
  to,
  chevron = false,
  className = "",
  ...props
}) => {
  const classes = `group inline-flex cursor-pointer items-center justify-center border-none ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {chevron ? <Chevron /> : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};
