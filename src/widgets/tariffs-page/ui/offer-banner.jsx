"use client";

import { useOfferTimer } from "@/features/offer-timer/model/use-offer-timer";

const OFFER_TITLE =
  "Успейте открыть пробную неделю";

export function OfferBanner() {
  const { formattedTime, isExpired } = useOfferTimer();

  return (
    <header className="flex h-[103px] w-full items-center justify-center bg-[#1D6B4F] px-4">
      <div className="flex flex-col items-center">
        <p className="text-[14px] leading-[1.05] tracking-[0.01em] text-[#E6EFEA] sm:text-[22px]">
          {OFFER_TITLE}
        </p>
        <p
          className={[
            "mt-[6px] text-[30px] font-bold leading-none tracking-[0.08em] sm:text-[39px]",
            isExpired ? "text-[#E7EFEA]" : "text-[#FF5A65]"
          ].join(" ")}
        >
          <span className="text-[12px] align-middle sm:text-[15px]">*</span>{" "}
          {formattedTime}{" "}
          <span className="text-[12px] align-middle sm:text-[15px]">*</span>
        </p>
      </div>
    </header>
  );
}
