export const ColorSwatches = ({ colors, selected, onSelect, size = "small" }) => {
  if (!colors || colors.length === 0) return null;

  const isLarge = size === "large";

  return (
    <div
      className={`flex items-center justify-center ${isLarge ? "gap-3" : "gap-2"}`}
    >
      {colors.map((color) => (
        <button
          key={color.name}
          type="button"
          className={
            "box-border cursor-pointer rounded-full border border-black/10 p-0 transition-transform duration-150 ease-out hover:scale-[1.12] " +
            (isLarge ? "h-6 w-6" : "h-3.5 w-3.5") +
            (selected === color.name
              ? " ring-2 ring-link ring-offset-2 ring-offset-white"
              : "")
          }
          style={{ backgroundColor: color.hex }}
          title={color.name}
          aria-label={color.name}
          aria-pressed={selected === color.name}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onSelect(color.name);
          }}
        />
      ))}
    </div>
  );
};
