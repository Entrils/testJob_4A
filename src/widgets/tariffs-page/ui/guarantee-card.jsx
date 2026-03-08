export function GuaranteeCard({ title, text }) {
  return (
    <section data-intro className="mt-[24px] flex h-[186px] w-[343px] flex-col gap-[10px] rounded-[20px] border border-[#484D4E] bg-[#202930] p-[12px] max-[320px]:h-[194px] max-[320px]:w-[288px] max-[320px]:rounded-[20px] max-[320px]:p-[12px] md:absolute md:left-[352px] md:top-[1240px] md:flex md:h-[231px] md:w-[1216px] md:flex-col md:gap-[30px] md:rounded-[30px] md:border md:border-[#484D4E] md:bg-[#202930] md:p-[20px]">
      <div className="flex h-[44px] w-[294px] items-start gap-[10px] rounded-[30px] border border-[#81FE95] bg-[#2D3233] pb-[12px] pl-[18px] pr-[18px] pt-[10px] text-[#81FE95] max-[320px]:h-[41px] max-[320px]:w-[265px] md:flex md:h-[68px] md:w-[461px] md:items-start md:gap-[10px] md:rounded-[30px] md:border md:border-[#81FE95] md:bg-[#2D3233] md:pb-[18px] md:pl-[30px] md:pr-[30px] md:pt-[16px] md:text-[#81FE95]">
        <span className="h-[22px] w-[258px] whitespace-nowrap text-[18px] font-medium leading-[120%] text-[#81FE95] max-[320px]:h-[19px] max-[320px]:w-[229px] max-[320px]:text-[16px] md:block md:h-[34px] md:w-[401px] md:whitespace-nowrap md:text-[28px] md:leading-[120%]">
          {title}
        </span>
      </div>
      <p className="h-[108px] w-[319px] text-[14px] font-normal leading-[130%] text-[#DCDCDC] max-[320px]:h-[119px] max-[320px]:w-[264px] max-[320px]:text-[13px] md:mt-0 md:h-[93px] md:w-[1176px] md:text-[24px] md:font-normal md:leading-[130%] md:text-[#DCDCDC]">
        {text}
      </p>
    </section>
  );
}
