export type ProductTag = "recycled" | "organic" | "limited" | "bestseller";

export const productTagLabels: Record<ProductTag, string> = {
  recycled: "♻️ Reciclado",
  organic: "🌱 Orgánico",
  limited: "🔒 Edición limitada",
  bestseller: "🔥 Más vendido"
};
