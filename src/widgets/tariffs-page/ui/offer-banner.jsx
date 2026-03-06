"use client";

const OFFER_TITLE = "Успейте открыть пробную неделю";
const STAR = "✦";

export function OfferBanner({ formattedTime, isExpired, isAlert }) {
  return (
    <header className="flex h-[74px] w-full items-center justify-center bg-[#1D6B4F] px-2 max-[320px]:h-[68px] md:h-[74px]">
      <div className="flex flex-col items-center">
        <p className="text-[11px] leading-none tracking-[0.01em] text-[#E6EFEA] max-[320px]:text-[10px]">
          {OFFER_TITLE}
        </p>
        <p
          className={[
            "mt-[3px] text-[39px] font-bold leading-none tracking-[0.06em] max-[320px]:text-[34px]",
            isExpired ? "text-[#E7EFEA]" : "text-[#F6C94F]",
            isAlert ? "animate-pulse" : ""
          ].join(" ")}
        >
          <span className="text-[11px] align-middle max-[320px]:text-[10px]">
            {STAR}
          </span>{" "}
          {formattedTime}{" "}
          <span className="text-[11px] align-middle max-[320px]:text-[10px]">
            {STAR}
          </span>
        </p>
      </div>
    </header>
  );
}
