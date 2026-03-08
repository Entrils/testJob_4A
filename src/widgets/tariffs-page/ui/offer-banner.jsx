"use client";

import { useEffect, useState } from "react";

const OFFER_TITLE = "Успейте открыть пробную неделю";
const STAR = "✦";

export function OfferBanner({ formattedTime, isExpired, isAlert }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const timerColor = isExpired ? "#FFFFFF" : isAlert ? "#FF4E4E" : "#FFBB00";
  const [minutes = "00", seconds = "00"] = formattedTime.split(":");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-0 z-[70] flex h-[85px] w-full max-w-[375px] -translate-x-1/2 flex-col items-center justify-center gap-[4px] bg-[#1D5B43] px-[16px] py-[8px] max-[320px]:h-[74px] max-[320px]:max-w-[320px] max-[320px]:px-[16px] md:h-[103px] md:max-w-[1920px] md:gap-[4px] md:bg-[#1D5B43] md:py-[8px] ${isScrolled ? "md:rounded-none" : "md:rounded-t-[60px]"}`}
    >
      <p
        className="h-[23px] w-[336px] text-center text-[18px] font-semibold leading-[130%] text-white max-[320px]:h-[18px] max-[320px]:w-[261px] max-[320px]:text-[14px] md:h-[31px] md:w-[447px] md:text-[24px]"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {OFFER_TITLE}
      </p>

      <div
        className="grid h-[42px] w-[136px] grid-cols-[14px_92px_14px] items-center justify-center gap-[8px] max-[320px]:h-[36px] max-[320px]:w-[126px] max-[320px]:grid-cols-[14px_82px_14px] max-[320px]:gap-[8px] md:h-[52px] md:w-[157px] md:grid-cols-[14px_113px_14px] md:gap-[8px]"
        style={{
          animation: isAlert ? "offerTimerBlink 1s steps(1, end) infinite" : undefined
        }}
      >
        <span
          className="inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[0.71px] text-[14px] leading-none md:h-[14px] md:w-[14px] md:text-[14px]"
          style={{ color: timerColor }}
        >
          {STAR}
        </span>

        <div
          className="flex h-[42px] w-[92px] items-center justify-between gap-0 text-[32px] font-bold leading-[110%] tracking-[0] max-[320px]:h-[36px] max-[320px]:w-[82px] max-[320px]:text-[28px] md:h-[52px] md:w-[113px] md:text-[40px]"
          style={{
            color: timerColor,
            fontFamily: "var(--font-raleway)",
            fontVariantNumeric: "lining-nums tabular-nums"
          }}
        >
          <span className="inline-flex w-[36px] justify-center max-[320px]:w-[32px] md:w-[44px]">
            {minutes}
          </span>
          <span className="inline-flex w-[8px] justify-center max-[320px]:w-[6px] md:w-[13px]">:</span>
          <span className="inline-flex w-[36px] justify-center max-[320px]:w-[32px] md:w-[44px]">
            {seconds}
          </span>
        </div>

        <span
          className="inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[0.71px] text-[14px] leading-none md:h-[14px] md:w-[14px] md:text-[14px]"
          style={{ color: timerColor }}
        >
          {STAR}
        </span>
      </div>
    </header>
  );
}
