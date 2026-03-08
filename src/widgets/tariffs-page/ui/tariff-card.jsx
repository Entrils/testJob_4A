"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/shared/lib/formatters/format-price";
import { HIT_LABEL, RUB } from "../config/texts";

export function TariffCard({
  tariff,
  selectedTariffId,
  selectTariff,
  isExpired,
  isBest = false,
  animationIndex = 0
}) {
  const cardRef = useRef(null);
  const [isPriceSwitching, setIsPriceSwitching] = useState(false);
  const isSelected = selectedTariffId === tariff.id;
  const currentPrice = isExpired ? tariff.fullPrice : tariff.price;
  const oldPriceValue = tariff.fullPrice;
  const shouldRenderOldPrice = !isExpired || isPriceSwitching;
  const shouldRenderDiscount = !isExpired || isPriceSwitching;
  const isOneWeek = /недел/i.test(tariff.period);
  const isMonthCard = /месяц/i.test(tariff.period);
  const isOneMonth = /1\s*месяц/i.test(tariff.period);
  const isMobileUniformCard = isMonthCard || isOneWeek;

  const regularContentDesktopSizeClass = isOneWeek
    ? "md:h-[221px] md:w-[204px]"
    : "md:h-[242px] md:w-[204px]";
  const regularMonthPriceDesktopSizeClass = isOneWeek
    ? "md:mx-auto md:h-[140px] md:w-[149px]"
    : "md:mx-auto md:h-[140px] md:w-[168px]";
  const regularPeriodDesktopWidthClass = isOneWeek ? "md:w-[117px]" : "md:w-[123px]";
  const regularPriceWrapDesktopSizeClass = isOneWeek
    ? "md:h-[79px] md:w-[149px]"
    : "md:h-[79px] md:w-[168px]";
  const regularPriceDesktopWidthClass = isOneWeek ? "md:w-[149px]" : "md:w-[168px]";
  const regularOldPriceDesktopWidthClass = isOneWeek ? "md:w-[70px]" : "md:w-[83px]";
  const regularOldPriceDesktopPositionClass = isOneWeek
    ? "md:right-0"
    : "md:left-[85px]";
  const regularStrikeDesktopWidthClass = isOneWeek ? "md:w-[69px]" : "md:w-[83px]";
  const regularStrikeDesktopPositionClass = isOneWeek
    ? "md:right-0"
    : "md:left-[85px]";
  const regularTextWrapDesktopSizeClass = isOneWeek
    ? "md:h-[41px] md:w-[204px] md:py-[10px]"
    : "md:h-[62px] md:w-[204px] md:py-[10px]";
  const regularTextDesktopSizeClass = isOneWeek
    ? "md:h-[21px] md:w-[204px]"
    : "md:h-[42px] md:w-[204px]";
  const regularContentMobileClass = isMobileUniformCard
    ? "h-[91px] w-[282px] grid-cols-[121px_111px] gap-[50px] max-[320px]:h-[78px] max-[320px]:w-[257px] max-[320px]:grid-cols-[107px_120px] max-[320px]:gap-[30px]"
    : "grid-cols-[1fr_112px] gap-[8px] max-[320px]:grid-cols-[1fr_95px] max-[320px]:gap-[6px]";
  const regularDiscount320Class = isMobileUniformCard
    ? "max-[320px]:left-[217px] max-[320px]:right-auto max-[320px]:top-0 max-[320px]:h-[23px] max-[320px]:w-[44px] max-[320px]:rounded-b-[6px] max-[320px]:px-[6px] max-[320px]:pb-[3px] max-[320px]:pt-[3px]"
    : "";
  const regularDiscountText320Class = isMobileUniformCard ? "max-[320px]:text-[13px]" : "";
  const regularMonthPriceMobileClass = isMobileUniformCard
    ? "h-[91px] w-[121px] space-y-[16px] max-[320px]:h-[78px] max-[320px]:w-[107px] max-[320px]:space-y-[12px]"
    : "";
  const regularPeriodMobileClass = isMobileUniformCard
    ? "h-[22px] w-[85px] text-[18px] font-medium leading-[120%] text-white max-[320px]:h-[19px] max-[320px]:w-[76px] max-[320px]:text-[16px]"
    : "text-[31px] font-semibold leading-none text-[#DCE5EA] max-[320px]:text-[27px]";
  const regularPriceWrapMobileClass = isMobileUniformCard
    ? "relative h-[53px] w-[114px] max-[320px]:h-[47px] max-[320px]:w-[101px]"
    : "";
  const regularPriceMobileClass = isMobileUniformCard
    ? "h-[34px] w-[114px] whitespace-nowrap text-left text-[34px] font-semibold leading-[100%] text-white max-[320px]:h-[30px] max-[320px]:w-[101px] max-[320px]:text-[30px]"
    : "mt-[6px] whitespace-nowrap text-center text-[49px] font-bold leading-none text-[#E9EEF2] max-[320px]:text-[43px]";
  const regularOldPriceMobileClass = isMonthCard
    ? "absolute left-[48.5px] top-[34px] h-[19px] w-[52px] whitespace-nowrap text-right text-[16px] font-normal leading-[120%] text-[#919191] max-[320px]:left-[51.5px] max-[320px]:top-[30px] max-[320px]:h-[17px] max-[320px]:w-[49.5px] max-[320px]:text-[14px]"
    : isOneWeek
    ? "absolute left-[53.5px] top-[34px] h-[19px] w-[47px] whitespace-nowrap text-right text-[16px] font-normal leading-[120%] text-[#919191] max-[320px]:left-[51.5px] max-[320px]:top-[30px] max-[320px]:h-[17px] max-[320px]:w-[49.5px] max-[320px]:text-[14px]"
    : "mt-[2px] whitespace-nowrap text-[17px] font-semibold leading-none text-[#87949D] line-through max-[320px]:text-[15px]";
  const regularOldPriceStrikeMobileClass = isMonthCard
    ? "absolute left-[49px] top-[44px] h-0 w-[52px] border-t border-[#919191] max-[320px]:left-[52px] max-[320px]:top-[40px] max-[320px]:w-[49px]"
    : isOneWeek
    ? "absolute left-[54px] top-[44px] h-0 w-[47px] border-t border-[#919191] max-[320px]:left-[52px] max-[320px]:top-[40px] max-[320px]:w-[49px]"
    : "";
  const regularTextWrapMobileClass = isMobileUniformCard
    ? "h-[56px] w-[111px] self-center py-[10px] max-[320px]:h-[74px] max-[320px]:w-[120px]"
    : "self-center";
  const regularTextMobileClass = isMobileUniformCard
    ? "text-[14px] font-normal leading-[130%] text-white"
    : "text-[17px] leading-[1.08] text-[#9BA8B2] max-[320px]:text-[15px]";
  const regularMobileText = isOneMonth
    ? "Получить первые результаты"
    : tariff.text;

  useEffect(() => {
    if (!isExpired) {
      setIsPriceSwitching(false);
      return undefined;
    }

    setIsPriceSwitching(true);
    const timeoutId = window.setTimeout(() => {
      setIsPriceSwitching(false);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isExpired]);

  useEffect(() => {
    if (!isExpired || !isPriceSwitching || !cardRef.current) {
      return undefined;
    }

    let isMounted = true;
    let ctx = null;

    async function runPriceSwitchAnimation() {
      const { gsap } = await import("gsap");

      if (!isMounted || !cardRef.current) {
        return;
      }

      ctx = gsap.context(() => {
        const oldTargets = cardRef.current.querySelectorAll("[data-old-price]");
        const discountTargets = cardRef.current.querySelectorAll("[data-discount-badge]");
        const currentTargets = cardRef.current.querySelectorAll("[data-current-price]");
        const timeline = gsap.timeline({ delay: animationIndex * 0.11 });

        if (currentTargets.length > 0) {
          gsap.set(currentTargets, {
            autoAlpha: 0,
            y: 12,
            scale: 0.9,
            filter: "blur(4px)"
          });
        }

        if (oldTargets.length > 0) {
          timeline.to(
            oldTargets,
            {
              duration: 0.48,
              autoAlpha: 0,
              y: -18,
              scale: 0.82,
              rotation: -6,
              filter: "blur(4px)",
              ease: "power3.inOut",
              stagger: 0.02
            },
            0
          );
        }

        if (discountTargets.length > 0) {
          timeline.to(
            discountTargets,
            {
              duration: 0.52,
              autoAlpha: 0,
              y: -22,
              scale: 0.7,
              rotation: 14,
              filter: "blur(3px)",
              ease: "power2.inOut"
            },
            0.04
          );
        }

        if (currentTargets.length > 0) {
          timeline.to(
            currentTargets,
            {
              duration: 0.62,
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              ease: "back.out(1.6)",
              stagger: 0.03
            },
            0.18
          );
        }
      }, cardRef);
    }

    runPriceSwitchAnimation();

    return () => {
      isMounted = false;
      ctx?.revert();
    };
  }, [animationIndex, isExpired, isPriceSwitching]);

  if (isBest) {
    return (
      <button
        ref={cardRef}
        type="button"
        onClick={() => selectTariff(tariff.id)}
        className={[
          "relative h-[131px] w-full rounded-[20px] border-2 border-[#484D4E] bg-[#313637] pb-[20px] pl-[30px] pr-[16px] pt-[20px] text-left",
          "max-[320px]:h-[118px] max-[320px]:w-[288px] max-[320px]:rounded-[20px] max-[320px]:pb-[20px] max-[320px]:pl-[20px] max-[320px]:pr-[16px] max-[320px]:pt-[20px]",
          "md:h-[190px] md:w-[748px] md:rounded-[34px] md:border-2 md:bg-[#313637] md:px-0 md:pb-0 md:pt-0",
          isSelected
            ? "border-[#FDB056] md:border-[#FDB056]"
            : "border-[#484D4E] md:border-[#484D4E]"
        ].join(" ")}
      >
        {shouldRenderDiscount ? (
          <span
            data-discount-badge
            className="absolute left-[233px] top-0 flex h-[27px] w-[48px] items-start justify-center gap-[10px] rounded-b-[8px] bg-[#FD5656] px-[6px] pb-[3px] pt-[3px] text-white max-[320px]:left-[196px] max-[320px]:right-auto max-[320px]:h-[23px] max-[320px]:w-[42px] max-[320px]:rounded-b-[6px] max-[320px]:px-[6px] max-[320px]:pb-[3px] max-[320px]:pt-[3px] md:left-[50px] md:top-0 md:h-[39px] md:w-[66px] md:px-[8px] md:pb-[5px] md:pt-[5px]"
          >
            <span
              className="block text-center text-[16px] font-medium leading-[130%] tracking-[0] max-[320px]:text-[13px] md:h-[29px] md:w-[50px] md:text-[22px]"
              style={{ fontFamily: "Gilroy, var(--font-montserrat), sans-serif" }}
            >
              -{tariff.discountPercent}%
            </span>
          </span>
        ) : null}
        <span className="absolute left-[295px] top-[6px] flex h-[29px] w-[46px] items-start justify-start text-[16px] font-medium leading-[130%] tracking-[0.03em] text-[#FDB056] max-[320px]:left-[246px] max-[320px]:right-auto max-[320px]:h-[17px] max-[320px]:w-[28px] max-[320px]:text-[13px] md:left-auto md:right-[20px] md:top-[10px] md:text-[22px]">
          {HIT_LABEL}
        </span>

        <div className="grid h-[91px] w-[291px] grid-cols-[121px_120px] gap-[50px] max-[320px]:h-[78px] max-[320px]:w-[257px] max-[320px]:grid-cols-[107px_120px] max-[320px]:gap-[30px] md:absolute md:left-[122px] md:top-[34px] md:h-[126px] md:w-[546px] md:grid-cols-[178px_328px] md:gap-[40px]">
          <div className="h-[91px] w-[121px] space-y-[16px] max-[320px]:h-[78px] max-[320px]:w-[107px] max-[320px]:space-y-[12px] md:h-[126px] md:w-[178px] md:space-y-0">
            <p className="h-[22px] w-[89px] text-[18px] font-medium leading-[120%] text-white max-[320px]:h-[19px] max-[320px]:w-[79px] max-[320px]:text-[16px] md:ml-[25px] md:mr-[25px] md:h-[31px] md:w-[128px] md:text-[26px] md:leading-[120%]">
              {tariff.period}
            </p>
            <div className="relative h-[53px] w-[121px] max-[320px]:h-[47px] max-[320px]:w-[107px] md:mt-[16px] md:h-[79px] md:w-[178px]">
              <p
                data-current-price
                className="h-[34px] w-[121px] whitespace-nowrap text-left text-[34px] font-semibold leading-[100%] text-[#FDB056] max-[320px]:h-[30px] max-[320px]:w-[107px] max-[320px]:text-[30px] md:mt-0 md:h-[50px] md:w-[178px] md:text-center md:text-[50px]"
              >
                {`${formatPrice(currentPrice)} ${RUB}`}
              </p>
              {shouldRenderOldPrice ? (
                <>
                  <p
                    data-old-price
                    className="absolute left-[53.5px] top-[34px] h-[19px] w-[67.5px] whitespace-nowrap text-[16px] font-normal leading-[120%] text-[#919191] max-[320px]:left-[48.5px] max-[320px]:top-[30px] max-[320px]:h-[17px] max-[320px]:w-[58.5px] max-[320px]:text-[14px] md:hidden"
                  >
                    {`${formatPrice(oldPriceValue)} ${RUB}`}
                  </p>
                  <span
                    data-old-price
                    className="absolute left-[54px] top-[43.5px] h-0 w-[67px] border-t border-[#919191] max-[320px]:left-[49px] max-[320px]:top-[40px] max-[320px]:w-[58px] md:hidden"
                  />
                  <p
                    data-old-price
                    className="hidden md:absolute md:left-[78px] md:top-[50px] md:block md:h-[29px] md:w-[100px] md:text-[24px] md:font-normal md:leading-[120%] md:text-[#919191]"
                  >
                    {formatPrice(oldPriceValue)} {RUB}
                  </p>
                  <span
                    data-old-price
                    className="hidden md:absolute md:left-[78px] md:top-[65px] md:block md:h-0 md:w-[95px] md:border-t-2 md:border-[#919191]"
                  />
                </>
              ) : null}
            </div>
          </div>
          <div className="h-[56px] w-[120px] self-center py-[10px] max-[320px]:w-[120px] md:h-[62px] md:w-[328px] md:py-[10px]">
            <p className="text-[14px] font-normal leading-[130%] text-white md:hidden">
              Всегда
              <br />
              быть в форме
            </p>
            <p className="hidden md:h-[42px] md:w-[328px] md:text-[16px] md:font-normal md:leading-[130%] md:text-white">
              {tariff.text}
            </p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => selectTariff(tariff.id)}
      className={[
        "relative h-[131px] w-full rounded-[20px] border-2 border-[#484D4E] bg-[#313637] pb-[20px] pl-[30px] pr-[16px] pt-[20px] text-left",
        "max-[320px]:h-[118px] max-[320px]:w-[288px] max-[320px]:rounded-[20px] max-[320px]:pb-[20px] max-[320px]:pl-[20px] max-[320px]:pr-[16px] max-[320px]:pt-[20px]",
        "md:h-[335px] md:w-[240px] md:rounded-[40px] md:border-2 md:bg-[#313637] md:pb-[26px] md:pl-[21px] md:pr-[21px] md:pt-[70px]",
        isSelected ? "border-[#FDB056]" : "border-[#484D4E]"
      ].join(" ")}
    >
      {shouldRenderDiscount ? (
        <span
          data-discount-badge
          className={[
            "absolute right-[8px] top-[-1px] rounded-b-[7px] bg-[#FD5656] px-[8px] py-[4px] text-[11px] font-semibold leading-none text-white max-[320px]:text-[10px] md:left-[51px] md:top-[-1px] md:right-auto md:flex md:h-[39px] md:w-[69px] md:items-start md:justify-center md:gap-[10px] md:rounded-b-[8px] md:px-[8px] md:pb-[5px] md:pt-[5px]",
            isMobileUniformCard
              ? "left-[262px] right-auto top-0 h-[27px] w-[51px] rounded-b-[8px] bg-[#FD5656] px-[6px] pb-[3px] pt-[3px]"
              : "",
            regularDiscount320Class
          ].join(" ")}
        >
          <span
            className={[
              "md:block md:text-[22px] md:font-medium md:leading-[130%] md:tracking-[0]",
              isMobileUniformCard
                ? "block text-[16px] font-medium leading-[130%] tracking-[0]"
                : "",
              regularDiscountText320Class
            ].join(" ")}
            style={{ fontFamily: "Gilroy, var(--font-montserrat), sans-serif" }}
          >
            -{tariff.discountPercent}%
          </span>
        </span>
      ) : null}

      <div
        className={[
          "grid md:absolute md:left-[21px] md:top-[70px] md:flex md:flex-col md:gap-[40px]",
          regularContentMobileClass,
          regularContentDesktopSizeClass
        ].join(" ")}
      >
        <div
          className={[
            regularMonthPriceMobileClass,
            "md:space-y-0",
            regularMonthPriceDesktopSizeClass
          ].join(" ")}
        >
          <p
            className={[
              regularPeriodMobileClass,
              "md:mx-auto md:h-[31px] md:text-center md:text-[26px] md:font-medium md:leading-[120%] md:text-white",
              regularPeriodDesktopWidthClass
            ].join(" ")}
          >
            {tariff.period}
          </p>
          <div
            className={[
              regularPriceWrapMobileClass,
              "md:relative md:mt-[30px]",
              regularPriceWrapDesktopSizeClass
            ].join(" ")}
          >
            <p
              className={[
                regularPriceMobileClass,
                "md:mt-0 md:h-[50px] md:text-[50px] md:font-semibold md:leading-[100%] md:text-white",
                regularPriceDesktopWidthClass
              ].join(" ")}
              data-current-price
            >
              {`${formatPrice(currentPrice)} ${RUB}`}
            </p>
            {shouldRenderOldPrice ? (
              <>
                <p
                  className={[
                    regularOldPriceMobileClass,
                    isMobileUniformCard ? "line-through decoration-[#919191] decoration-[1px]" : "",
                    "md:hidden"
                  ].join(" ")}
                  data-old-price
                >
                  {`${formatPrice(oldPriceValue)} ${RUB}`}
                </p>
                {!isMobileUniformCard && regularOldPriceStrikeMobileClass ? (
                  <span
                    className={[regularOldPriceStrikeMobileClass, "md:hidden"].join(" ")}
                    data-old-price
                  />
                ) : null}
                <p
                  className={[
                    "hidden md:absolute md:top-[50px] md:block md:h-[29px] md:whitespace-nowrap md:text-[24px] md:font-normal md:leading-[120%] md:text-[#919191]",
                    regularOldPriceDesktopWidthClass,
                    regularOldPriceDesktopPositionClass
                  ].join(" ")}
                  data-old-price
                >
                  {`${formatPrice(oldPriceValue)} ${RUB}`}
                </p>
                <span
                  className={[
                    "hidden md:absolute md:top-[65px] md:block md:h-0 md:border-t-2 md:border-[#919191]",
                    regularStrikeDesktopWidthClass,
                    regularStrikeDesktopPositionClass
                  ].join(" ")}
                  data-old-price
                />
              </>
            ) : null}
          </div>
        </div>
        <div
          className={[
            regularTextWrapMobileClass,
            regularTextWrapDesktopSizeClass
          ].join(" ")}
        >
          <p
            className={[
              regularTextMobileClass,
              "md:hidden"
            ].join(" ")}
          >
            {regularMobileText}
          </p>
          <p
            className={[
              "hidden md:block md:text-[16px] md:font-normal md:leading-[130%] md:text-white",
              regularTextDesktopSizeClass
            ].join(" ")}
          >
            {tariff.text}
          </p>
        </div>
      </div>
    </button>
  );
}
