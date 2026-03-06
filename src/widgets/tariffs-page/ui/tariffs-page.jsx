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

  if (isBest) {
    return (
      <button
        type="button"
        onClick={() => selectTariff(tariff.id)}
        className={[
          "relative w-full rounded-[24px] border bg-[#2B343B] px-[12px] pb-[10px] pt-[8px] text-left",
          "max-[320px]:rounded-[20px] max-[320px]:px-[10px] max-[320px]:pb-[9px]",
          "md:rounded-[22px] md:px-[14px] md:pb-[12px] md:pt-[10px]",
          isSelected ? "border-[#F2B14F]" : "border-[#F2A948]"
        ].join(" ")}
      >
        <span className="absolute right-[46px] top-[-1px] rounded-b-[7px] bg-[#FF5667] px-[7px] py-[4px] text-[11px] font-semibold leading-none text-white max-[320px]:right-[42px] max-[320px]:text-[10px] md:right-[56px] md:text-[10px]">
          -{tariff.discountPercent}%
        </span>
        <span className="absolute right-[10px] top-[7px] text-[12px] font-semibold leading-none text-[#F2B14F] max-[320px]:text-[11px] md:right-[14px] md:text-[13px]">
          {HIT_LABEL}
        </span>

        <div className="grid grid-cols-[1fr_108px] gap-[8px] max-[320px]:grid-cols-[1fr_95px] max-[320px]:gap-[6px] md:grid-cols-[1fr_122px] md:gap-[12px]">
          <div>
            <p className="text-[25px] font-semibold leading-none text-[#DCE5EA] max-[320px]:text-[22px] md:text-[34px]">
              {tariff.period}
            </p>
            <p className="mt-[6px] text-[44px] font-bold leading-none text-[#F2B14F] max-[320px]:text-[40px] md:text-[52px]">
              {formatPrice(currentPrice)} {RUB}
            </p>
            {previousPrice ? (
              <p className="mt-[2px] text-[17px] font-semibold leading-none text-[#87949D] line-through max-[320px]:text-[15px] md:text-[22px]">
                {formatPrice(previousPrice)} {RUB}
              </p>
            ) : null}
          </div>
          <p className="self-center text-[17px] leading-[1.1] text-[#9BA8B2] max-[320px]:text-[15px] md:text-[13px] md:leading-[1.15]">
            {tariff.text}
          </p>
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
        "md:min-h-[156px] md:rounded-[20px] md:px-[12px] md:pb-[10px] md:pt-[10px]",
        isSelected ? "border-[#F2B14F]" : "border-[#48545D]"
      ].join(" ")}
    >
      <span className="absolute right-[8px] top-[-1px] rounded-b-[7px] bg-[#FF5667] px-[8px] py-[4px] text-[11px] font-semibold leading-none text-white max-[320px]:text-[10px] md:right-[10px] md:text-[10px]">
        -{tariff.discountPercent}%
      </span>

      <div className="grid grid-cols-[1fr_112px] gap-[8px] max-[320px]:grid-cols-[1fr_95px] max-[320px]:gap-[6px] md:grid-cols-1 md:gap-[8px]">
        <div>
          <p className="text-[31px] font-semibold leading-none text-[#DCE5EA] max-[320px]:text-[27px] md:text-[36px]">
            {tariff.period}
          </p>
          <p className="mt-[6px] text-[49px] font-bold leading-none text-[#E9EEF2] max-[320px]:text-[43px] md:text-[50px]">
            {formatPrice(currentPrice)} {RUB}
          </p>
          {previousPrice ? (
            <p className="mt-[2px] text-[17px] font-semibold leading-none text-[#87949D] line-through max-[320px]:text-[15px] md:text-[20px]">
              {formatPrice(previousPrice)} {RUB}
            </p>
          ) : null}
        </div>
        <p className="self-center text-[17px] leading-[1.08] text-[#9BA8B2] max-[320px]:text-[15px] md:self-end md:text-[13px] md:leading-[1.12]">
          {tariff.text}
        </p>
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#243038_0%,#141C22_62%)] text-[#E9EEF2] md:py-[10px]">
      <section className="mx-auto w-full max-w-[375px] overflow-hidden bg-[#1E262D] max-[320px]:max-w-[320px] md:max-w-[912px] md:rounded-[30px] md:border md:border-[#2E3941]">
        <OfferBanner
          formattedTime={formattedTime}
          isExpired={isExpired}
          isAlert={isAlert}
        />

        <div className="px-[10px] pb-[18px] pt-[12px] max-[320px]:px-[8px] max-[320px]:pt-[10px] md:px-[74px] md:pb-[40px] md:pt-[24px]">
          <h1 className="text-[50px] font-semibold leading-[0.95] tracking-[-0.02em] text-[#E9EEF2] max-[320px]:text-[42px] md:text-[50px]">
            {TITLE_TEXT}
            <br />
            <span className="text-[#F2B14F]">{TITLE_ACCENT}</span>
          </h1>

          <div className="mt-[8px] md:mt-[14px] md:grid md:grid-cols-[220px_356px] md:items-start md:justify-center md:gap-[34px]">
            <div className="flex justify-center md:justify-start">
              <img
                src="/assets/man.svg"
                alt="Мужчина"
                className="w-[130px] max-[320px]:w-[112px] md:w-[220px]"
              />
            </div>

            <div>
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

                <div className="space-y-[8px] md:grid md:grid-cols-3 md:gap-[8px] md:space-y-0">
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

              <div className="mt-[8px] rounded-[14px] border border-[#3E4B56] bg-[#2A333A] px-[10px] py-[9px] text-[11px] leading-[1.15] text-[#9BA8B2] max-[320px]:text-[10px] md:mt-[12px] md:text-[10px]">
                <span className="mr-[6px] text-[15px] font-bold text-[#F2B14F]">
                  !
                </span>
                {INFO_TEXT}
              </div>

              <label className="mt-[9px] flex items-start gap-[7px] text-[11px] leading-[1.1] text-[#87949D] max-[320px]:text-[10px] md:mt-[10px] md:text-[10px]">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={toggleConsent}
                  className="sr-only"
                />
                <span
                  className={[
                    "mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[3px] border text-[12px] font-bold leading-none",
                    hasError ? "border-[#FF5667]" : "border-[#67747D]",
                    isChecked ? "bg-[#F2B14F] text-[#1E262D]" : "text-transparent"
                  ].join(" ")}
                >
                  {CHECK}
                </span>
                <span>
                  {CONSENT_PREFIX}
                  <a href="#" className="underline">
                    {CONSENT_OFFER}
                  </a>
                  {CONSENT_AND}
                  <a href="#" className="underline">
                    {CONSENT_POLICY}
                  </a>
                </span>
              </label>

              <button
                type="button"
                onClick={handleBuyClick}
                className="mt-[10px] h-[55px] w-full rounded-[14px] bg-[#F6B64D] text-[38px] font-semibold leading-none text-[#262626] max-[320px]:h-[52px] max-[320px]:text-[34px] md:h-[52px] md:text-[31px]"
              >
                {BUY_LABEL}
              </button>

              {buyMessage ? (
                <p className="mt-[5px] text-[11px] leading-[1.15] text-[#B7C2CA] md:text-[10px]">
                  {buyMessage}
                </p>
              ) : null}

              <p className="mt-[8px] text-[8px] leading-[1.12] text-[#6E7C86] max-[320px]:text-[7px] md:mt-[10px] md:text-[8px]">
                {LEGAL_TEXT}
              </p>
            </div>
          </div>

          <section className="mt-[12px] rounded-[18px] border border-[#344754] bg-[#202930] p-[11px] max-[320px]:rounded-[16px] max-[320px]:p-[10px] md:mx-auto md:mt-[22px] md:max-w-[578px] md:rounded-[20px] md:px-[16px] md:py-[14px]">
            <div className="inline-flex rounded-full border border-[#59D17F] px-[11px] py-[4px] text-[24px] font-semibold leading-none text-[#59D17F] max-[320px]:text-[20px] md:text-[36px]">
              {GUARANTEE_TITLE}
            </div>
            <p className="mt-[9px] text-[11px] leading-[1.12] text-[#A8B5BE] max-[320px]:text-[10px] md:mt-[12px] md:text-[13px]">
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
