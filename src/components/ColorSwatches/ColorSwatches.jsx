import "./ColorSwatches.css";

export const ColorSwatches = ({ colors, selected, onSelect, size = "small" }) => {
  if (!colors || colors.length === 0) return null;

  return (
    <div className={`color-swatches color-swatches--${size}`}>
      {colors.map((color) => (
        <button
          key={color.name}
          type="button"
          className={
            "color-swatch" +
            (selected === color.name ? " color-swatch--selected" : "")
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
