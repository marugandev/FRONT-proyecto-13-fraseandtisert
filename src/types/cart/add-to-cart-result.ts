export type AddToCartResult =
  | { status: "success"; limited: boolean; addedQuantity: number }
  | { status: "error"; reason: "no-stock" };
