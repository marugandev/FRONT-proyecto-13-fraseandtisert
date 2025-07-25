export const getCartItemPricing = ({
  discount,
  price,
  quantity
}: {
  discount?: number;
  price: number;
  quantity: number;
}) => {
  const discountFactor = 1 - (discount ?? 0) / 100;
  const unitPrice = price * discountFactor;
  const subtotalPrice = unitPrice * quantity;
  return { discountFactor, unitPrice, subtotalPrice };
};
