export function periodRank(period) {
  const normalized = String(period ?? "").toLowerCase();

  if (normalized.includes("3")) {
    return 0;
  }

  if (normalized.includes("месяц")) {
    return 1;
  }

  if (normalized.includes("недел")) {
    return 2;
  }

  return 3;
}
