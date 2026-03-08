export function PlanHint({ infoText }) {
  return (
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
        {infoText}
      </p>
    </div>
  );
}
