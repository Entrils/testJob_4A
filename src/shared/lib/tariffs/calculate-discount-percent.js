export function calculateDiscountPercent(price, fullPrice) {
  if (
    typeof price !== "number" ||
    typeof fullPrice !== "number" ||
    fullPrice <= 0 ||
    price >= fullPrice
  ) {
    return 0;
  }

  return Math.round(((fullPrice - price) / fullPrice) * 100);
}
