export function PurchaseConsent({
  isChecked,
  hasError,
  toggleConsent,
  consentPrefix,
  consentOffer,
  consentAnd,
  consentPolicy
}) {
  return (
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
      <span className="inline-block h-[28px] w-[297px] align-bottom text-[12px] font-normal leading-[120%] text-[#CDCDCD] max-[320px]:w-[252px] md:block md:h-[36px] md:w-[605px] md:align-bottom md:text-[16px] md:font-normal md:leading-[110%] md:text-[#CDCDCD] md:subpixel-antialiased">
        {consentPrefix}
        <a
          href="#"
          className="align-bottom text-[12px] leading-[120%] text-[#CDCDCD] underline md:text-[16px] md:leading-[110%] md:text-[#CDCDCD]"
        >
          {consentOffer}
        </a>
        {consentAnd}
        <a
          href="#"
          className="align-bottom text-[12px] leading-[120%] text-[#CDCDCD] underline md:text-[16px] md:leading-[110%] md:text-[#CDCDCD]"
        >
          {consentPolicy}
        </a>
      </span>
    </label>
  );
}
