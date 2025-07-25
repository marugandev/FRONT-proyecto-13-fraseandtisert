export type ProductColor = "white" | "black" | "gray";

export const productColorVar: Record<ProductColor, string> = {
  white: "var(--fat-color-white)",
  black: "var(--fat-color-black)",
  gray: "var(--fat-color-gray-muted)"
};

export const productColorLabel: Record<ProductColor, string> = {
  white: "Blanco",
  black: "Negro",
  gray: "Gris"
};
