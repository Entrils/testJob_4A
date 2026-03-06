"use client";

import { useEffect, useMemo, useState } from "react";
import {
  OFFER_DURATION_SECONDS,
  TIMER_ALERT_THRESHOLD_SECONDS
} from "@/shared/config/tariffs";

function formatTimeLeft(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function useOfferTimer(initialSeconds = OFFER_DURATION_SECONDS) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((currentValue) => {
        if (currentValue <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }

        return currentValue - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [timeLeft]);

  return useMemo(() => {
    const isExpired = timeLeft === 0;
    const isAlert = timeLeft > 0 && timeLeft <= TIMER_ALERT_THRESHOLD_SECONDS;

    return {
      timeLeft,
      formattedTime: formatTimeLeft(timeLeft),
      isExpired,
      isAlert
    };
  }, [timeLeft]);
}
