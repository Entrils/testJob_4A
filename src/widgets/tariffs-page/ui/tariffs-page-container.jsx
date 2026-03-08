"use client";

import { useMemo } from "react";
import { normalizeTariffs } from "@/entities/tariff/model/normalize-tariffs";
import { useGetTariffsQuery } from "@/shared/api/tariffs/tariffs-api";
import { TariffsPage } from "./tariffs-page.jsx";

function getTariffsErrorMessage(error) {
  if (!error) {
    return null;
  }

  if ("status" in error) {
    if (typeof error.status === "number") {
      return `Failed to load tariffs: ${error.status}`;
    }

    return "Failed to load tariffs";
  }

  if ("message" in error && typeof error.message === "string") {
    return error.message;
  }

  return "Unknown tariffs loading error";
}

export function TariffsPageContainer({
  initialTariffs = [],
  initialError = null
}) {
  const { data, error, isError, isSuccess } = useGetTariffsQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  const sourceTariffs = isSuccess ? data : initialTariffs;

  const tariffs = useMemo(() => {
    return normalizeTariffs(sourceTariffs);
  }, [sourceTariffs]);

  const errorMessage = isError ? getTariffsErrorMessage(error) : initialError;

  return <TariffsPage initialTariffs={tariffs} initialError={errorMessage} />;
}
