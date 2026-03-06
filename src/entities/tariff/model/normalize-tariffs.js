import { calculateDiscountPercent } from "@/shared/lib/tariffs/calculate-discount-percent";

function toNumber(value) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function normalizeTariffs(tariffs) {
  if (!Array.isArray(tariffs)) {
    return [];
  }

  const idCounter = new Map();

  return tariffs.map((tariff) => {
    const price = toNumber(tariff?.price);
    const fullPrice = toNumber(tariff?.full_price);
    const rawId = String(tariff?.id ?? "");
    const seen = idCounter.get(rawId) ?? 0;

    idCounter.set(rawId, seen + 1);

    return {
      id: seen === 0 ? rawId : `${rawId}-${seen + 1}`,
      sourceId: rawId,
      period: String(tariff?.period ?? ""),
      text: String(tariff?.text ?? ""),
      price,
      fullPrice,
      isBest: Boolean(tariff?.is_best),
      discountPercent: calculateDiscountPercent(price, fullPrice)
    };
  });
}
