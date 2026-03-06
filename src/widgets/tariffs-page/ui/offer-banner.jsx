"use client";

const OFFER_TITLE = "Успейте открыть пробную неделю";
const STAR = "✦";

export function OfferBanner({ formattedTime, isExpired, isAlert }) {
  const timerColor = isExpired ? "#FFFFFF" : isAlert ? "#FF4E4E" : "#FFBB00";
  const [minutes = "00", seconds = "00"] = formattedTime.split(":");

  return (
    <header className="flex h-[74px] w-full flex-col items-center justify-center gap-[3px] bg-[#1D6B4F] px-2 max-[320px]:h-[68px] md:h-[103px] md:gap-[4px] md:bg-[#1D5B43] md:py-[8px]">
      <p
        className="text-center text-[11px] font-semibold leading-[130%] text-white max-[320px]:text-[10px] md:h-[31px] md:w-[447px] md:text-[24px]"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {OFFER_TITLE}
      </p>

      <div
        className="flex items-center gap-[6px] md:grid md:h-[52px] md:w-[157px] md:grid-cols-[14px_113px_14px] md:items-center md:justify-center md:gap-[8px]"
        style={{
          animation: isAlert ? "offerTimerBlink 1s steps(1, end) infinite" : undefined
        }}
      >
        <span
          className="inline-flex h-[11px] w-[11px] shrink-0 items-center justify-center text-[11px] leading-none md:h-[14px] md:w-[14px] md:text-[14px]"
          style={{ color: timerColor }}
        >
          {STAR}
        </span>

        <div
          className="flex items-center justify-center gap-[4px] text-[39px] font-bold leading-[110%] tracking-[0] max-[320px]:text-[34px] md:h-[52px] md:w-[113px] md:gap-[6px] md:text-[40px]"
          style={{
            color: timerColor,
            fontFamily: "var(--font-raleway)",
            fontVariantNumeric: "lining-nums proportional-nums"
          }}
        >
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </div>

        <span
          className="inline-flex h-[11px] w-[11px] shrink-0 items-center justify-center text-[11px] leading-none md:h-[14px] md:w-[14px] md:text-[14px]"
          style={{ color: timerColor }}
        >
          {STAR}
        </span>
      </div>
    </header>
  );
}
