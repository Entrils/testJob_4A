"use client";

import { useEffect, useMemo, useState } from "react";
import { useOfferTimer } from "@/features/offer-timer/model/use-offer-timer";
import { usePurchaseConsent } from "@/features/purchase-consent/model/use-purchase-consent";
import { useTariffSelection } from "@/features/tariff-selection/model/use-tariff-selection";
import { formatPrice } from "@/shared/lib/formatters/format-price";
import { OfferBanner } from "./offer-banner.jsx";

const TITLE_TEXT = "Выбери подходящий для себя";
const TITLE_ACCENT = "тариф";

const INFO_TEXT =
  "Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц.";

const LEGAL_TEXT =
  "Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупки дополнительных услуг сервиса в случае желания пользователя.";

const GUARANTEE_TITLE = "гарантия возврата 30 дней";
const GUARANTEE_TEXT =
  "Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.";

const CONSENT_PREFIX = "Я согласен с ";
const CONSENT_OFFER = "офертой рекуррентных платежей";
const CONSENT_AND = " и ";
const CONSENT_POLICY = "Политикой конфиденциальности";

const HIT_LABEL = "хит!";
const BUY_LABEL = "Купить";
const BUY_CONSENT_ERROR = "Подтвердите согласие с условиями покупки.";
const BUY_TARIFF_ERROR = "Выберите тариф перед покупкой.";
const BUY_SELECTED_PREFIX = "Выбран тариф: ";
const LOAD_ERROR_PREFIX = "Ошибка загрузки тарифов: ";

const RUB = "₽";

function periodRank(period) {
  const normalized = period.toLowerCase();

  if (normalized.includes("3")) {
    return 0;
  }

  if (normalized.includes("месяц")) {
    return 1;
  }

  if (normalized.includes("недел")) {
    return 2;
  }

  return 3;
}

function TariffCard({
  tariff,
  selectedTariffId,
  selectTariff,
  isExpired,
  isBest = false
}) {
  const isSelected = selectedTariffId === tariff.id;
  const currentPrice = isExpired ? tariff.fullPrice : tariff.price;
  const previousPrice = isExpired ? null : tariff.fullPrice;
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

  if (isBest) {
    return (
      <button
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
        <span className="absolute left-[233px] top-0 flex h-[27px] w-[48px] items-start justify-center gap-[10px] rounded-b-[8px] bg-[#FD5656] px-[6px] pb-[3px] pt-[3px] text-white max-[320px]:left-[196px] max-[320px]:right-auto max-[320px]:h-[23px] max-[320px]:w-[42px] max-[320px]:rounded-b-[6px] max-[320px]:px-[6px] max-[320px]:pb-[3px] max-[320px]:pt-[3px] md:left-[50px] md:top-0 md:h-[39px] md:w-[66px] md:px-[8px] md:pb-[5px] md:pt-[5px]">
          <span
            className="block text-center text-[16px] font-medium leading-[130%] tracking-[0] max-[320px]:text-[13px] md:h-[29px] md:w-[50px] md:text-[22px]"
            style={{ fontFamily: "Gilroy, var(--font-montserrat), sans-serif" }}
          >
            -{tariff.discountPercent}%
          </span>
        </span>
        <span className="absolute left-[295px] top-[6px] flex h-[29px] w-[46px] items-start justify-start text-[16px] font-medium leading-[130%] tracking-[0.03em] text-[#FDB056] max-[320px]:left-[246px] max-[320px]:right-auto max-[320px]:h-[17px] max-[320px]:w-[28px] max-[320px]:text-[13px] md:left-auto md:right-[20px] md:top-[10px] md:text-[22px]">
          {HIT_LABEL}
        </span>

        <div className="grid h-[91px] w-[291px] grid-cols-[121px_120px] gap-[50px] max-[320px]:h-[78px] max-[320px]:w-[257px] max-[320px]:grid-cols-[107px_120px] max-[320px]:gap-[30px] md:absolute md:left-[122px] md:top-[34px] md:h-[126px] md:w-[546px] md:grid-cols-[178px_328px] md:gap-[40px]">
          <div className="h-[91px] w-[121px] space-y-[16px] max-[320px]:h-[78px] max-[320px]:w-[107px] max-[320px]:space-y-[12px] md:h-[126px] md:w-[178px] md:space-y-0">
            <p className="h-[22px] w-[89px] text-[18px] font-medium leading-[120%] text-white max-[320px]:h-[19px] max-[320px]:w-[79px] max-[320px]:text-[16px] md:ml-[25px] md:mr-[25px] md:h-[31px] md:w-[128px] md:text-[26px] md:leading-[120%]">
              {tariff.period}
            </p>
            <div className="relative h-[53px] w-[121px] max-[320px]:h-[47px] max-[320px]:w-[107px] md:mt-[16px] md:h-[79px] md:w-[178px]">
              <p className="h-[34px] w-[121px] whitespace-nowrap text-left text-[34px] font-semibold leading-[100%] text-[#FDB056] max-[320px]:h-[30px] max-[320px]:w-[107px] max-[320px]:text-[30px] md:mt-0 md:h-[50px] md:w-[178px] md:text-center md:text-[50px]">
                {`${formatPrice(currentPrice)} ${RUB}`}
              </p>
              {previousPrice ? (
                <>
                  <p className="absolute left-[53.5px] top-[34px] h-[19px] w-[67.5px] whitespace-nowrap text-[16px] font-normal leading-[120%] text-[#919191] max-[320px]:left-[48.5px] max-[320px]:top-[30px] max-[320px]:h-[17px] max-[320px]:w-[58.5px] max-[320px]:text-[14px] md:hidden">
                    {`${formatPrice(previousPrice)} ${RUB}`}
                  </p>
                  <span className="absolute left-[54px] top-[43.5px] h-0 w-[67px] border-t border-[#919191] max-[320px]:left-[49px] max-[320px]:top-[40px] max-[320px]:w-[58px] md:hidden" />
                  <p className="hidden md:absolute md:left-[78px] md:top-[50px] md:block md:h-[29px] md:w-[100px] md:text-[24px] md:font-normal md:leading-[120%] md:text-[#919191]">
                    {formatPrice(previousPrice)} {RUB}
                  </p>
                  <span className="hidden md:absolute md:left-[78px] md:top-[65px] md:block md:h-0 md:w-[95px] md:border-t-2 md:border-[#919191]" />
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
      type="button"
      onClick={() => selectTariff(tariff.id)}
      className={[
        "relative h-[131px] w-full rounded-[20px] border-2 border-[#484D4E] bg-[#313637] pb-[20px] pl-[30px] pr-[16px] pt-[20px] text-left",
        "max-[320px]:h-[118px] max-[320px]:w-[288px] max-[320px]:rounded-[20px] max-[320px]:pb-[20px] max-[320px]:pl-[20px] max-[320px]:pr-[16px] max-[320px]:pt-[20px]",
        "md:h-[335px] md:w-[240px] md:rounded-[40px] md:border-2 md:bg-[#313637] md:pb-[26px] md:pl-[21px] md:pr-[21px] md:pt-[70px]",
        isSelected ? "border-[#FDB056]" : "border-[#484D4E]"
      ].join(" ")}
    >
      <span
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
            >
              {`${formatPrice(currentPrice)} ${RUB}`}
            </p>
            {previousPrice ? (
              <>
                <p
                  className={[
                    regularOldPriceMobileClass,
                    isMobileUniformCard ? "line-through decoration-[#919191] decoration-[1px]" : "",
                    "md:hidden"
                  ].join(" ")}
                >
                  {`${formatPrice(previousPrice)} ${RUB}`}
                </p>
                {!isMobileUniformCard && regularOldPriceStrikeMobileClass ? (
                  <span className={[regularOldPriceStrikeMobileClass, "md:hidden"].join(" ")} />
                ) : null}
                <p
                  className={[
                    "hidden md:absolute md:top-[50px] md:block md:h-[29px] md:whitespace-nowrap md:text-[24px] md:font-normal md:leading-[120%] md:text-[#919191]",
                    regularOldPriceDesktopWidthClass,
                    regularOldPriceDesktopPositionClass
                  ].join(" ")}
                >
                  {`${formatPrice(previousPrice)} ${RUB}`}
                </p>
                <span
                  className={[
                    "hidden md:absolute md:top-[65px] md:block md:h-0 md:border-t-2 md:border-[#919191]",
                    regularStrikeDesktopWidthClass,
                    regularStrikeDesktopPositionClass
                  ].join(" ")}
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
              "md:hidden",
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

export function TariffsPage({ initialTariffs, initialError }) {
  const { formattedTime, isExpired, isAlert } = useOfferTimer();
  const { selectedTariff, selectedTariffId, selectTariff } =
    useTariffSelection(initialTariffs);
  const { isChecked, hasError, toggleConsent, validateConsent } =
    usePurchaseConsent();
  const [buyMessage, setBuyMessage] = useState("");

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

  const bestTariff = useMemo(() => {
    return initialTariffs.find((tariff) => tariff.isBest) ?? initialTariffs[0] ?? null;
  }, [initialTariffs]);

  const regularTariffs = useMemo(() => {
    return initialTariffs
      .filter((tariff) => !bestTariff || tariff.id !== bestTariff.id)
      .sort((left, right) => periodRank(left.period) - periodRank(right.period));
  }, [bestTariff, initialTariffs]);

  function handleBuyClick() {
    if (!validateConsent()) {
      setBuyMessage(BUY_CONSENT_ERROR);
      return;
    }

    if (!selectedTariff) {
      setBuyMessage(BUY_TARIFF_ERROR);
      return;
    }

    setBuyMessage(`${BUY_SELECTED_PREFIX}${selectedTariff.period}`);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#243038_0%,#141C22_62%)] text-[#E9EEF2] md:flex md:items-start md:justify-center md:bg-none md:bg-white md:py-0">
      <section className="mx-auto w-full max-w-[375px] overflow-hidden bg-[#1E262D] max-[320px]:max-w-[320px] md:relative md:h-[1621px] md:w-[1920px] md:max-w-none md:rounded-[60px] md:border md:border-[#2E3941]">
        <OfferBanner
          formattedTime={formattedTime}
          isExpired={isExpired}
          isAlert={isAlert}
        />

        <div className="px-[16px] pb-[24px] pt-[20px] max-[320px]:px-[16px] max-[320px]:pt-[20px] md:px-0 md:pb-[40px] md:pt-[50px]">
          <h1 className="h-[52px] w-[312px] text-[24px] font-bold leading-[110%] tracking-[0.01em] text-[#E9EEF2] max-[320px]:h-[48px] max-[320px]:w-[288px] max-[320px]:text-[22px] max-[320px]:leading-[110%] max-[320px]:tracking-[0.01em] md:absolute md:left-[352px] md:top-[153px] md:h-[44px] md:w-[826px] md:text-[40px] md:font-bold md:leading-[110%] md:tracking-[0.01em] md:whitespace-nowrap">
            {TITLE_TEXT}
            {" "}
            <span className="text-[#FDB056]">{TITLE_ACCENT}</span>
          </h1>

          <div className="mt-[20px] max-[320px]:mt-[24px] md:absolute md:left-[352px] md:top-[307px] md:grid md:h-[867px] md:w-[1216px] md:grid-cols-[380.7277px_835.2723px] md:items-start">
            <div className="flex justify-center max-[320px]:justify-start max-[320px]:pl-[94px] md:justify-start md:pt-[52px]">
              <img
                src="/assets/man.svg"
                alt="Мужчина"
                className="h-[250px] w-[124.0964px] max-[320px]:h-[200px] max-[320px]:w-[99.2771px] md:h-[767px] md:w-[380.7277px]"
              />
            </div>

            <div className="md:ml-[87.2723px] md:w-[748px]">
              <div className="-mt-[2px] space-y-[8px] md:mt-0">
                {bestTariff ? (
                  <TariffCard
                    tariff={bestTariff}
                    selectedTariffId={selectedTariffId}
                    selectTariff={selectTariff}
                    isExpired={isExpired}
                    isBest
                  />
                ) : null}

                <div className="space-y-[8px] md:mt-[14px] md:grid md:grid-cols-3 md:gap-[14px] md:space-y-0">
                  {regularTariffs.map((tariff) => (
                    <TariffCard
                      key={tariff.id}
                      tariff={tariff}
                      selectedTariffId={selectedTariffId}
                      selectTariff={selectTariff}
                      isExpired={isExpired}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-[12px] flex h-[76px] w-[343px] items-start gap-[6px] rounded-[20px] border-0 bg-[#2D3233] pb-[14px] pl-[12px] pr-[20px] pt-[14px] max-[320px]:w-[288px] max-[320px]:rounded-[16px] md:mt-[20px] md:flex md:h-[78px] md:w-[499px] md:items-start md:gap-[8px] md:rounded-[20px] md:border-0 md:bg-[#2D3233] md:px-[20px] md:py-[18px]">
                <span className="relative h-[24px] w-[22.1538px] shrink-0 md:hidden">
                  <span className="absolute left-[9.7px] top-[4.62px] h-[11.7692px] w-[2.7739px] bg-[#FDB056]" />
                  <span className="absolute left-[9.7px] top-[18.46px] h-[2.7692px] w-[2.7692px] bg-[#FDB056]" />
                </span>
                <span className="hidden md:relative md:block md:h-[26px] md:w-[24px] md:shrink-0">
                  <span className="absolute left-[10.5px] top-[5px] h-[14px] w-[3.005px] bg-[#FDB056]" />
                  <span className="absolute left-[10.5px] top-[22px] h-[3px] w-[3.005px] bg-[#FDB056]" />
                </span>
                <p className="h-[48px] w-[267px] text-[12px] font-normal leading-[130%] text-white md:h-[42px] md:w-[427px] md:text-[16px] md:font-normal md:leading-[130%] md:text-white">
                  {INFO_TEXT}
                </p>
              </div>

              <label className="mt-[24px] flex h-[30px] w-[339px] items-start gap-[12px] max-[320px]:h-[42px] max-[320px]:w-[292px] max-[320px]:gap-[10px] md:mt-[30px] md:h-[36px] md:w-[649px] md:items-start md:gap-[12px] md:text-[16px] md:leading-[110%]">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={toggleConsent}
                  className="sr-only"
                />
                <span
                  className={[
                    "relative flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[4px] border bg-transparent leading-none md:mt-0 md:h-[32.0001px] md:w-[32.0001px] md:rounded-[4px] md:bg-transparent",
                    hasError ? "border-[#FF5667] md:border-[#FF5667]" : "border-[#606566] md:border-[#606566]"
                  ].join(" ")}
                >
                  {isChecked ? (
                    <svg
                      className="absolute md:hidden"
                      width="19.091121673583984"
                      height="13.636361122131348"
                      viewBox="0 0 19.091121673583984 13.636361122131348"
                      style={{
                        top: "8.18px",
                        left: "5.45px"
                      }}
                      aria-hidden="true"
                    >
                      <path
                        d="M1.1 7.8 L6.8 12.3 L18.0 1.4"
                        fill="none"
                        stroke="#FDB056"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                  {isChecked ? (
                    <svg
                      className="hidden md:block md:absolute md:z-10"
                      width="20.363855361938477"
                      height="14.545445442199707"
                      viewBox="0 0 20.363855361938477 14.545445442199707"
                      style={{
                        position: "absolute",
                        top: "8.73px",
                        left: "5.81px"
                      }}
                      aria-hidden="true"
                    >
                      <path
                        d="M1.3 8.4 L7.2 13.2 L19 1.2"
                        fill="none"
                        stroke="#FDB056"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </span>
                <span className="inline-block h-[28px] w-[297px] align-bottom text-[12px] font-normal leading-[120%] text-[#CDCDCD] max-[320px]:w-[252px] md:block md:h-[36px] md:w-[605px] md:text-[16px] md:font-normal md:leading-[110%] md:text-[#CDCDCD] md:subpixel-antialiased">
                  {CONSENT_PREFIX}
                  <a
                    href="#"
                    className="align-bottom text-[12px] leading-[120%] text-[#CDCDCD] underline md:text-[#CDCDCD]"
                  >
                    {CONSENT_OFFER}
                  </a>
                  {CONSENT_AND}
                  <a
                    href="#"
                    className="align-bottom text-[12px] leading-[120%] text-[#CDCDCD] underline md:text-[#CDCDCD]"
                  >
                    {CONSENT_POLICY}
                  </a>
                </span>
              </label>

              <button
                type="button"
                onClick={handleBuyClick}
                className="mt-[20px] h-[63px] w-full rounded-[20px] bg-[#FDB056] px-[60px] py-[20px] text-[18px] font-bold leading-[130%] text-[#191E1F] max-[320px]:h-[55px] max-[320px]:w-[288px] max-[320px]:px-[60px] max-[320px]:py-[16px] max-[320px]:text-[18px] md:mt-[16px] md:flex md:h-[66px] md:w-[352px] md:items-center md:justify-center md:gap-[10px] md:rounded-[20px] md:bg-[#FDB056] md:px-[60px] md:py-[20px] md:text-[20px] md:font-bold md:leading-[130%] md:text-[#191E1F]"
              >
                {BUY_LABEL}
              </button>

              {buyMessage ? (
                <p className="mt-[5px] text-[11px] leading-[1.15] text-[#B7C2CA] md:text-[10px]">
                  {buyMessage}
                </p>
              ) : null}

              <p className="mt-[20px] flex h-[72px] w-[345px] items-end text-[10px] font-normal leading-[120%] text-[#9B9B9B] max-[320px]:h-[84px] max-[320px]:w-[288px] max-[320px]:text-[10px] md:mt-[14px] md:flex md:h-[68px] md:w-[748px] md:items-end md:text-[14px] md:font-normal md:leading-[120%] md:text-[#9B9B9B]">
                {LEGAL_TEXT}
              </p>
            </div>
          </div>

          <section className="mt-[24px] flex h-[186px] w-[343px] flex-col gap-[10px] rounded-[20px] border border-[#484D4E] bg-[#202930] p-[12px] max-[320px]:h-[194px] max-[320px]:w-[288px] max-[320px]:rounded-[20px] max-[320px]:p-[12px] md:absolute md:left-[352px] md:top-[1240px] md:flex md:h-[231px] md:w-[1216px] md:flex-col md:gap-[30px] md:rounded-[30px] md:border md:border-[#484D4E] md:bg-[#202930] md:p-[20px]">
            <div className="flex h-[44px] w-[294px] items-start gap-[10px] rounded-[30px] border border-[#81FE95] bg-[#2D3233] pb-[12px] pl-[18px] pr-[18px] pt-[10px] text-[#81FE95] max-[320px]:h-[41px] max-[320px]:w-[265px] md:flex md:h-[68px] md:w-[461px] md:items-start md:gap-[10px] md:rounded-[30px] md:border md:border-[#81FE95] md:bg-[#2D3233] md:pb-[18px] md:pl-[30px] md:pr-[30px] md:pt-[16px] md:text-[#81FE95]">
              <span className="h-[22px] w-[258px] whitespace-nowrap text-[18px] font-medium leading-[120%] text-[#81FE95] max-[320px]:h-[19px] max-[320px]:w-[229px] max-[320px]:text-[16px] md:block md:h-[34px] md:w-[401px] md:whitespace-nowrap md:text-[28px] md:leading-[120%]">
                {GUARANTEE_TITLE}
              </span>
            </div>
            <p className="h-[108px] w-[319px] text-[14px] font-normal leading-[130%] text-[#DCDCDC] max-[320px]:h-[119px] max-[320px]:w-[264px] max-[320px]:text-[13px] md:mt-0 md:h-[93px] md:w-[1176px] md:text-[24px] md:font-normal md:leading-[130%] md:text-[#DCDCDC]">
              {GUARANTEE_TEXT}
            </p>
          </section>

          {initialError ? (
            <p className="mt-[8px] text-[11px] text-[#FF8593] md:mx-auto md:max-w-[578px] md:text-[12px]">
              {LOAD_ERROR_PREFIX}
              {initialError}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
