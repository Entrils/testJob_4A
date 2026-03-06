"use client";

import { useEffect, useState } from "react";
import { selectDefaultTariff } from "@/entities/tariff/model/select-default-tariff";

export function useTariffSelection(tariffs) {
  const [selectedTariffId, setSelectedTariffId] = useState(() => {
    return selectDefaultTariff(tariffs)?.id ?? null;
  });

  useEffect(() => {
    const defaultTariff = selectDefaultTariff(tariffs);

    setSelectedTariffId((currentTariffId) => {
      if (!defaultTariff) {
        return null;
      }

      const hasCurrentTariff = tariffs.some(
        (tariff) => tariff.id === currentTariffId
      );

      return hasCurrentTariff ? currentTariffId : defaultTariff.id;
    });
  }, [tariffs]);

  const selectedTariff =
    tariffs.find((tariff) => tariff.id === selectedTariffId) ?? null;

  return {
    selectedTariffId,
    selectedTariff,
    selectTariff: setSelectedTariffId
  };
}
