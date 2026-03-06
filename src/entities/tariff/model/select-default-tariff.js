export function selectDefaultTariff(tariffs) {
  if (!Array.isArray(tariffs) || tariffs.length === 0) {
    return null;
  }

  const bestTariff = tariffs.find((tariff) => tariff.isBest);

  return bestTariff ?? tariffs[0];
}
