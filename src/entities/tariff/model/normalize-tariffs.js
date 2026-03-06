import { calculateDiscountPercent } from "@/shared/lib/tariffs/calculate-discount-percent";

function toNumber(value) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function normalizeTariffs(tariffs) {
  if (!Array.isArray(tariffs)) {
    return [];
  }

  return tariffs.map((tariff) => {
    const price = toNumber(tariff?.price);
    const fullPrice = toNumber(tariff?.full_price);

    return {
      id: String(tariff?.id ?? ""),
      period: String(tariff?.period ?? ""),
      text: String(tariff?.text ?? ""),
      price,
      fullPrice,
      isBest: Boolean(tariff?.is_best),
      discountPercent: calculateDiscountPercent(price, fullPrice)
    };
  });
}
