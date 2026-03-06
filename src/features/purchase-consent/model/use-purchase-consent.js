"use client";

import { useState } from "react";

export function usePurchaseConsent() {
  const [isChecked, setIsChecked] = useState(false);
  const [hasError, setHasError] = useState(false);

  function toggleConsent() {
    setIsChecked((currentValue) => {
      const nextValue = !currentValue;

      if (nextValue) {
        setHasError(false);
      }

      return nextValue;
    });
  }

  function validateConsent() {
    if (isChecked) {
      setHasError(false);
      return true;
    }

    setHasError(true);
    return false;
  }

  return {
    isChecked,
    hasError,
    toggleConsent,
    validateConsent
  };
}
