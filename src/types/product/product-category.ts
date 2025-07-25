export type ProductCategory =
  | "filosofia"
  | "ironia"
  | "amor"
  | "supervivencia"
  | "existencial";

export const productCategoryLabels: Record<ProductCategory, string> = {
  filosofia: "🧠 Filosofía de estar tirado",
  ironia: "😏 Ironía moderna",
  amor: "💔 Amor, ligues y cinismo",
  supervivencia: "🛟 Supervivencia diaria",
  existencial: "🌀 Existencialismo cotidiano"
};
