"use client";

import { useEffect } from "react";
import { OfferBanner } from "./offer-banner.jsx";

export function TariffsPage({ initialTariffs, initialError }) {
  useEffect(() => {
    if (initialError) {
      console.error("[Tariffs API] Request failed:", initialError);
      return;
    }

    console.info("[Tariffs API] Request succeeded. Items:", initialTariffs.length);
    console.table(
      initialTariffs.map((tariff) => ({
        id: tariff.id,
        period: tariff.period,
        price: tariff.price,
        fullPrice: tariff.fullPrice,
        isBest: tariff.isBest
      }))
    );
  }, [initialError, initialTariffs]);

  return (
    <main>
      <OfferBanner />
    </main>
  );
}
