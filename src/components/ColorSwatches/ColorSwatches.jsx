export const ColorSwatches = ({ colors, selected, onSelect, size = "small" }) => {
  if (!colors || colors.length === 0) return null;

  const isLarge = size === "large";
  const dotSize = isLarge ? "h-6 w-6" : "h-3.5 w-3.5";

  return (
    <div className="flex items-center justify-center">
      {colors.map((color) => (
        <button
          key={color.name}
          type="button"
          className={
            "flex cursor-pointer items-center justify-center rounded-full border-none bg-transparent transition-transform duration-150 ease-out hover:scale-[1.12] " +
            (isLarge ? "p-2" : "p-[13px]") +
            (selected === color.name
              ? " ring-2 ring-link ring-offset-2 ring-offset-white"
              : "")
          }
          title={color.name}
          aria-label={color.name}
          aria-pressed={selected === color.name}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onSelect(color.name);
          }}
        >
          <span
            className={`box-border block rounded-full border border-black/10 ${dotSize}`}
            style={{ backgroundColor: color.hex }}
          />
        </button>
      ))}
    </div>
  );
};
