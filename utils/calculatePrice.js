export const calculatePrice = (product, goldPrice) => {
  const { popularityScore, weight } = product;
  const price = (popularityScore + 1) * weight * goldPrice;
  return Number(price.toFixed(2));
};
