"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useOfferTimer } from "@/features/offer-timer/model/use-offer-timer";
import { usePurchaseConsent } from "@/features/purchase-consent/model/use-purchase-consent";
import { useTariffSelection } from "@/features/tariff-selection/model/use-tariff-selection";
import { usePageIntroAnimation } from "../model/use-page-intro-animation";
import { periodRank } from "../model/period-rank";
import {
  BUY_CONSENT_ERROR,
  BUY_LABEL,
  BUY_SELECTED_PREFIX,
  BUY_TARIFF_ERROR,
  CONSENT_AND,
  CONSENT_OFFER,
  CONSENT_POLICY,
  CONSENT_PREFIX,
  GUARANTEE_TEXT,
  GUARANTEE_TITLE,
  INFO_TEXT,
  LEGAL_TEXT,
  LOAD_ERROR_PREFIX,
  TITLE_ACCENT,
  TITLE_TEXT
} from "../config/texts";
import { TariffCard } from "./tariff-card.jsx";
import { PlanHint } from "./plan-hint.jsx";
import { PurchaseConsent } from "./purchase-consent.jsx";
import { PurchaseAction } from "./purchase-action.jsx";
import { GuaranteeCard } from "./guarantee-card.jsx";
import { OfferBanner } from "./offer-banner.jsx";

export function TariffsPage({ initialTariffs, initialError }) {
  const pageRef = useRef(null);
  const { formattedTime, isExpired, isAlert } = useOfferTimer();
  const { selectedTariff, selectedTariffId, selectTariff } =
    useTariffSelection(initialTariffs);
  const { isChecked, hasError, toggleConsent, validateConsent } =
    usePurchaseConsent();
  const [buyMessage, setBuyMessage] = useState("");

  usePageIntroAnimation(pageRef);

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
    <main
      ref={pageRef}
      className="min-h-screen bg-[radial-gradient(circle_at_top,#243038_0%,#141C22_62%)] text-[#E9EEF2] md:flex md:items-start md:justify-center md:bg-none md:bg-white md:py-0"
    >
      <section className="mx-auto w-full max-w-[375px] overflow-x-hidden bg-[#1E262D] max-[320px]:max-w-[320px] md:relative md:h-[1621px] md:w-[1920px] md:max-w-none md:rounded-[60px] md:border md:border-[#2E3941]">
        <OfferBanner
          formattedTime={formattedTime}
          isExpired={isExpired}
          isAlert={isAlert}
        />
        <div className="h-[85px] max-[320px]:h-[74px] md:h-[103px]" aria-hidden />

        <div className="px-[16px] pb-[24px] pt-[20px] max-[320px]:px-[16px] max-[320px]:pt-[20px] md:px-0 md:pb-[40px] md:pt-[50px]">
          <h1 data-intro className="h-[52px] w-[312px] text-[24px] font-bold leading-[110%] tracking-[0.01em] text-[#E9EEF2] max-[320px]:h-[48px] max-[320px]:w-[288px] max-[320px]:text-[22px] max-[320px]:leading-[110%] max-[320px]:tracking-[0.01em] md:absolute md:left-[352px] md:top-[153px] md:h-[44px] md:w-[826px] md:text-[40px] md:font-bold md:leading-[110%] md:tracking-[0.01em] md:whitespace-nowrap">
            {TITLE_TEXT}
            {" "}
            <span className="text-[#FDB056]">{TITLE_ACCENT}</span>
          </h1>

          <div data-intro className="mt-[20px] max-[320px]:mt-[24px] md:absolute md:left-[352px] md:top-[307px] md:grid md:h-[867px] md:w-[1216px] md:grid-cols-[380.7277px_835.2723px] md:items-start">
            <div className="flex justify-center max-[320px]:justify-start max-[320px]:pl-[94px] md:justify-start md:pt-[52px]">
              <Image
                src="/assets/man.svg"
                alt="Мужчина"
                width={381}
                height={767}
                sizes="(max-width: 320px) 99px, (max-width: 375px) 124px, 381px"
                priority
                draggable={false}
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
                    animationIndex={0}
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
                      animationIndex={bestTariff ? periodRank(tariff.period) + 1 : periodRank(tariff.period)}
                    />
                  ))}
                </div>
              </div>

              <PlanHint infoText={INFO_TEXT} />

              <PurchaseConsent
                isChecked={isChecked}
                hasError={hasError}
                toggleConsent={toggleConsent}
                consentPrefix={CONSENT_PREFIX}
                consentOffer={CONSENT_OFFER}
                consentAnd={CONSENT_AND}
                consentPolicy={CONSENT_POLICY}
              />

              <PurchaseAction
                buyLabel={BUY_LABEL}
                onBuyClick={handleBuyClick}
                buyMessage={buyMessage}
                legalText={LEGAL_TEXT}
              />
            </div>
          </div>

          <GuaranteeCard title={GUARANTEE_TITLE} text={GUARANTEE_TEXT} />

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
