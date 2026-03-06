const rubleFormatter = new Intl.NumberFormat("ru-RU");

export function formatPrice(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "0";
  }

  return rubleFormatter.format(value);
}
