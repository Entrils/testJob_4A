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
  "Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупки дополнительных услуг сервиса в случае желания пользователя.";

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
const CHECK = "✓";

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

  if (isBest) {
    return (
      <button
        type="button"
        onClick={() => selectTariff(tariff.id)}
        className={[
          "relative w-full rounded-[24px] border bg-[#2B343B] px-[12px] pb-[10px] pt-[8px] text-left",
          "max-[320px]:rounded-[20px] max-[320px]:px-[10px] max-[320px]:pb-[9px]",
          "md:h-[190px] md:w-[748px] md:rounded-[34px] md:border-2 md:bg-[#313637] md:px-0 md:pb-0 md:pt-0",
          isSelected
            ? "border-[#FDB056] md:border-[#FDB056]"
            : "border-[#484D4E] md:border-[#484D4E]"
        ].join(" ")}
      >
        <span className="absolute right-[46px] top-[-1px] rounded-b-[7px] bg-[#FF5667] px-[7px] py-[4px] text-[11px] font-semibold leading-none text-white max-[320px]:right-[42px] max-[320px]:text-[10px] md:left-[50px] md:top-0 md:right-auto md:flex md:h-[39px] md:w-[66px] md:items-start md:justify-center md:gap-[10px] md:rounded-b-[8px] md:px-[8px] md:pb-[5px] md:pt-[5px]">
          <span
            className="md:block md:h-[29px] md:w-[50px] md:text-center md:text-[22px] md:font-medium md:leading-[130%] md:tracking-[0]"
            style={{ fontFamily: "Gilroy, var(--font-montserrat), sans-serif" }}
          >
            -{tariff.discountPercent}%
          </span>
        </span>
        <span className="absolute right-[10px] top-[7px] text-[12px] font-semibold leading-none text-[#F2B14F] max-[320px]:text-[11px] md:right-[20px] md:top-[10px] md:flex md:h-[29px] md:w-[46px] md:items-start md:justify-start md:text-[22px] md:font-medium md:leading-[130%] md:tracking-[0.03em] md:text-[#FDB056]">
          {HIT_LABEL}
        </span>

        <div className="grid grid-cols-[1fr_108px] gap-[8px] max-[320px]:grid-cols-[1fr_95px] max-[320px]:gap-[6px] md:absolute md:left-[122px] md:top-[34px] md:h-[126px] md:w-[546px] md:grid-cols-[178px_328px] md:gap-[40px]">
          <div className="md:h-[126px] md:w-[178px] md:space-y-0">
            <p className="text-[25px] font-semibold leading-none text-[#DCE5EA] max-[320px]:text-[22px] md:ml-[25px] md:mr-[25px] md:h-[31px] md:w-[128px] md:text-[26px] md:font-medium md:leading-[120%] md:text-white">
              {tariff.period}
            </p>
            <div className="md:relative md:mt-[16px] md:h-[79px] md:w-[178px]">
            <p className="mt-[6px] whitespace-nowrap text-center text-[44px] font-bold leading-none text-[#F2B14F] max-[320px]:text-[40px] md:mt-0 md:h-[50px] md:w-[178px] md:text-[50px] md:font-semibold md:leading-[100%] md:text-[#FDB056]">
                {formatPrice(currentPrice)}
                {"\u00A0"}
                {RUB}
              </p>
              {previousPrice ? (
                <>
                  <p className="mt-[2px] text-[17px] font-semibold leading-none text-[#87949D] line-through max-[320px]:text-[15px] md:hidden">
                    {formatPrice(previousPrice)} {RUB}
                  </p>
                  <p className="hidden md:absolute md:left-[78px] md:top-[50px] md:block md:h-[29px] md:w-[100px] md:text-[24px] md:font-normal md:leading-[120%] md:text-[#919191]">
                    {formatPrice(previousPrice)} {RUB}
                  </p>
                  <span className="hidden md:absolute md:left-[78px] md:top-[65px] md:block md:h-0 md:w-[95px] md:border-t-2 md:border-[#919191]" />
                </>
              ) : null}
            </div>
          </div>
          <div className="self-center md:h-[62px] md:w-[328px] md:py-[10px]">
            <p className="text-[17px] leading-[1.1] text-[#9BA8B2] max-[320px]:text-[15px] md:h-[42px] md:w-[328px] md:text-[16px] md:font-normal md:leading-[130%] md:text-white">
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
        "relative w-full rounded-[24px] border bg-[#2B343B] px-[12px] pb-[10px] pt-[8px] text-left",
        "max-[320px]:rounded-[20px] max-[320px]:px-[10px] max-[320px]:pb-[9px]",
        "md:h-[335px] md:w-[240px] md:rounded-[40px] md:border-2 md:bg-[#313637] md:pb-[26px] md:pl-[21px] md:pr-[21px] md:pt-[70px]",
        isSelected ? "border-[#F2B14F]" : "border-[#484D4E]"
      ].join(" ")}
    >
      <span className="absolute right-[8px] top-[-1px] rounded-b-[7px] bg-[#FF5667] px-[8px] py-[4px] text-[11px] font-semibold leading-none text-white max-[320px]:text-[10px] md:left-[51px] md:top-[-1px] md:right-auto md:flex md:h-[39px] md:w-[69px] md:items-start md:justify-center md:gap-[10px] md:rounded-b-[8px] md:px-[8px] md:pb-[5px] md:pt-[5px]">
        <span
          className="md:block md:text-[22px] md:font-medium md:leading-[130%] md:tracking-[0]"
          style={{ fontFamily: "Gilroy, var(--font-montserrat), sans-serif" }}
        >
          -{tariff.discountPercent}%
        </span>
      </span>

      <div
        className={[
          "grid grid-cols-[1fr_112px] gap-[8px] max-[320px]:grid-cols-[1fr_95px] max-[320px]:gap-[6px] md:absolute md:left-[21px] md:top-[70px] md:flex md:flex-col md:gap-[40px]",
          regularContentDesktopSizeClass
        ].join(" ")}
      >
        <div className={["md:space-y-0", regularMonthPriceDesktopSizeClass].join(" ")}>
          <p
            className={[
              "text-[31px] font-semibold leading-none text-[#DCE5EA] max-[320px]:text-[27px] md:mx-auto md:h-[31px] md:text-center md:text-[26px] md:font-medium md:leading-[120%] md:text-white",
              regularPeriodDesktopWidthClass
            ].join(" ")}
          >
            {tariff.period}
          </p>
          <div className={["md:relative md:mt-[30px]", regularPriceWrapDesktopSizeClass].join(" ")}>
            <p
              className={[
                "mt-[6px] whitespace-nowrap text-center text-[49px] font-bold leading-none text-[#E9EEF2] max-[320px]:text-[43px] md:mt-0 md:h-[50px] md:text-[50px] md:font-semibold md:leading-[100%] md:text-white",
                regularPriceDesktopWidthClass
              ].join(" ")}
            >
              {formatPrice(currentPrice)}
              {"\u00A0"}
              {RUB}
            </p>
            {previousPrice ? (
              <>
                <p className="mt-[2px] whitespace-nowrap text-[17px] font-semibold leading-none text-[#87949D] line-through max-[320px]:text-[15px] md:hidden">
                  {formatPrice(previousPrice)}
                  {"\u00A0"}
                  {RUB}
                </p>
                <p
                  className={[
                    "hidden md:absolute md:top-[50px] md:block md:h-[29px] md:whitespace-nowrap md:text-[24px] md:font-normal md:leading-[120%] md:text-[#919191]",
                    regularOldPriceDesktopWidthClass,
                    regularOldPriceDesktopPositionClass
                  ].join(" ")}
                >
                  {formatPrice(previousPrice)}
                  {"\u00A0"}
                  {RUB}
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
        <div className={["self-center", regularTextWrapDesktopSizeClass].join(" ")}>
          <p
            className={[
              "text-[17px] leading-[1.08] text-[#9BA8B2] max-[320px]:text-[15px] md:text-[16px] md:font-normal md:leading-[130%] md:text-white",
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

        <div className="px-[10px] pb-[18px] pt-[12px] max-[320px]:px-[8px] max-[320px]:pt-[10px] md:px-0 md:pb-[40px] md:pt-[50px]">
          <h1 className="text-[50px] font-semibold leading-[0.95] tracking-[-0.02em] text-[#E9EEF2] max-[320px]:text-[42px] md:absolute md:left-[352px] md:top-[153px] md:h-[44px] md:w-[826px] md:text-[40px] md:font-bold md:leading-[110%] md:tracking-[0.01em] md:whitespace-nowrap">
            {TITLE_TEXT}
            <span className="md:hidden">
              <br />
            </span>{" "}
            <span className="text-[#FDB056]">{TITLE_ACCENT}</span>
          </h1>

          <div className="mt-[8px] md:absolute md:left-[352px] md:top-[307px] md:grid md:h-[867px] md:w-[1216px] md:grid-cols-[380.7277px_835.2723px] md:items-start">
            <div className="flex justify-center md:justify-start md:pt-[52px]">
              <img
                src="/assets/man.svg"
                alt="Мужчина"
                className="w-[130px] max-[320px]:w-[112px] md:h-[767px] md:w-[380.7277px]"
              />
            </div>

            <div className="md:ml-[87.2723px] md:w-[748px]">
              <div className="mt-[4px] space-y-[8px] md:mt-0">
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

              <div className="mt-[8px] rounded-[14px] border border-[#3E4B56] bg-[#2A333A] px-[10px] py-[9px] text-[11px] leading-[1.15] text-[#9BA8B2] max-[320px]:text-[10px] md:mt-[20px] md:flex md:h-[78px] md:w-[499px] md:items-start md:gap-[8px] md:rounded-[20px] md:border-0 md:bg-[#2D3233] md:px-[20px] md:py-[18px]">
                <span className="mr-[6px] text-[15px] font-bold text-[#F2B14F] md:hidden">
                  !
                </span>
                <span className="hidden md:relative md:block md:h-[26px] md:w-[24px] md:shrink-0">
                  <span className="absolute left-[10.5px] top-[5px] h-[14px] w-[3.005px] bg-[#FDB056]" />
                  <span className="absolute left-[10.5px] top-[22px] h-[3px] w-[3.005px] bg-[#FDB056]" />
                </span>
                <p className="md:h-[42px] md:w-[427px] md:text-[16px] md:font-normal md:leading-[130%] md:text-white">
                  {INFO_TEXT}
                </p>
              </div>

              <label className="mt-[9px] flex items-start gap-[7px] text-[11px] leading-[1.1] text-[#87949D] max-[320px]:text-[10px] md:mt-[30px] md:h-[36px] md:w-[649px] md:items-start md:gap-[12px] md:text-[16px] md:leading-[110%]">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={toggleConsent}
                  className="sr-only"
                />
                <span
                  className={[
                    "mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[3px] border text-[12px] font-bold leading-none md:mt-0 md:relative md:h-[32.0001px] md:w-[32.0001px] md:rounded-[4px] md:bg-transparent",
                    hasError ? "border-[#FF5667] md:border-[#FF5667]" : "border-[#67747D] md:border-[#606566]",
                    isChecked ? "bg-[#F2B14F] text-[#1E262D]" : "text-transparent"
                  ].join(" ")}
                >
                  <span className="md:hidden">{CHECK}</span>
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
                <span className="md:block md:h-[36px] md:w-[605px] md:text-[16px] md:font-normal md:leading-[110%] md:text-[#CDCDCD] md:subpixel-antialiased">
                  {CONSENT_PREFIX}
                  <a href="#" className="underline md:text-[#CDCDCD]">
                    {CONSENT_OFFER}
                  </a>
                  {CONSENT_AND}
                  <a href="#" className="underline md:text-[#CDCDCD]">
                    {CONSENT_POLICY}
                  </a>
                </span>
              </label>

              <button
                type="button"
                onClick={handleBuyClick}
                className="mt-[10px] h-[55px] w-full rounded-[14px] bg-[#F6B64D] text-[38px] font-semibold leading-none text-[#262626] max-[320px]:h-[52px] max-[320px]:text-[34px] md:mt-[16px] md:flex md:h-[66px] md:w-[352px] md:items-center md:justify-center md:gap-[10px] md:rounded-[20px] md:bg-[#FDB056] md:px-[60px] md:py-[20px] md:text-[20px] md:font-bold md:leading-[130%] md:text-[#191E1F]"
              >
                {BUY_LABEL}
              </button>

              {buyMessage ? (
                <p className="mt-[5px] text-[11px] leading-[1.15] text-[#B7C2CA] md:text-[10px]">
                  {buyMessage}
                </p>
              ) : null}

              <p className="mt-[8px] text-[8px] leading-[1.12] text-[#6E7C86] max-[320px]:text-[7px] md:mt-[14px] md:flex md:h-[68px] md:w-[748px] md:items-end md:text-[14px] md:font-normal md:leading-[120%] md:text-[#9B9B9B]">
                {LEGAL_TEXT}
              </p>
            </div>
          </div>

          <section className="mt-[12px] rounded-[18px] border border-[#344754] bg-[#202930] p-[11px] max-[320px]:rounded-[16px] max-[320px]:p-[10px] md:absolute md:left-[352px] md:top-[1240px] md:flex md:h-[231px] md:w-[1216px] md:flex-col md:gap-[30px] md:rounded-[30px] md:border md:border-[#484D4E] md:bg-[#202930] md:p-[20px]">
            <div className="inline-flex rounded-full border border-[#59D17F] px-[11px] py-[4px] text-[24px] font-semibold leading-none text-[#59D17F] max-[320px]:text-[20px] md:flex md:h-[68px] md:w-[461px] md:items-start md:gap-[10px] md:rounded-[30px] md:border md:border-[#81FE95] md:bg-[#2D3233] md:pb-[18px] md:pl-[30px] md:pr-[30px] md:pt-[16px] md:font-medium md:leading-[120%] md:text-[#81FE95]">
              <span className="md:block md:h-[34px] md:w-[401px] md:whitespace-nowrap md:text-[28px] md:leading-[120%]">
                {GUARANTEE_TITLE}
              </span>
            </div>
            <p className="mt-[9px] text-[11px] leading-[1.12] text-[#A8B5BE] max-[320px]:text-[10px] md:mt-0 md:h-[93px] md:w-[1176px] md:text-[24px] md:font-normal md:leading-[130%] md:text-[#DCDCDC]">
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
