export function PurchaseAction({
  buyLabel,
  onBuyClick,
  buyMessage,
  legalText
}) {
  return (
    <>
      <button
        type="button"
        onClick={onBuyClick}
        className="mt-[20px] h-[63px] w-full rounded-[20px] bg-[#FDB056] px-[60px] py-[20px] text-[18px] font-bold leading-[130%] text-[#191E1F] max-[320px]:h-[55px] max-[320px]:w-[288px] max-[320px]:px-[60px] max-[320px]:py-[16px] max-[320px]:text-[18px] md:mt-[16px] md:flex md:h-[66px] md:w-[352px] md:items-center md:justify-center md:gap-[10px] md:rounded-[20px] md:bg-[#FDB056] md:px-[60px] md:py-[20px] md:text-[20px] md:font-bold md:leading-[130%] md:text-[#191E1F]"
        style={{ animation: "buyButtonBlink 1s steps(1, end) infinite" }}
      >
        {buyLabel}
      </button>

      {buyMessage ? (
        <p className="mt-[5px] text-[11px] leading-[1.15] text-[#B7C2CA] md:text-[10px]">
          {buyMessage}
        </p>
      ) : null}

      <p className="mt-[20px] flex h-[72px] w-[345px] items-end text-[10px] font-normal leading-[120%] text-[#9B9B9B] max-[320px]:h-[84px] max-[320px]:w-[288px] max-[320px]:text-[10px] md:mt-[14px] md:flex md:h-[68px] md:w-[748px] md:items-end md:text-[14px] md:font-normal md:leading-[120%] md:text-[#9B9B9B]">
        {legalText}
      </p>
    </>
  );
}
