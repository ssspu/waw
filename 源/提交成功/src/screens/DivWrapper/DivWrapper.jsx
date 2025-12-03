import { ChevronLeftIcon, CircleIcon, MoreHorizontalIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";

export const DivWrapper = () => {
  return (
    <div
      className="bg-white overflow-hidden w-full min-w-[375px] h-[812px] relative"
      data-model-id="145:9728"
    >
      <header className="flex items-center justify-between px-4 pt-11 pb-3 bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
            <ChevronLeftIcon className="w-4 h-4 text-black" />
          </Button>
          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] tracking-[0] leading-[normal]">
            实体门店入驻
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
            <MoreHorizontalIcon className="w-5 h-5 text-black" />
          </Button>
          <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
            <CircleIcon className="w-5 h-5 text-black" />
          </Button>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center px-8 pt-16">
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <img
            className="w-[119px] h-[102px]"
            alt="Success icon"
            src="https://c.animaapp.com/miiix8hm2uCXlb/img/group-196.png"
          />
        </div>

        <div className="flex flex-col items-center gap-2.5 mt-8 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <h1 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-xl text-center tracking-[0] leading-[normal]">
            资料提交成功
          </h1>

          <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[15px] text-center tracking-[0] leading-6 max-w-[312px]">
            我们正在努力审核您的入驻申请，1-3工作日即可完成审核，审核结果会通过平台发送通知，请注意接收!
          </p>

          <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[15px] text-center tracking-[0] leading-6 max-w-[312px]">
            若审核不通过，请重新上传资料审核。审核通过后，即可免费试用;
          </p>
        </div>

        <div className="mt-32 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#999999] text-[15px] text-center tracking-[0] leading-6">
            10s后即将返回
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center absolute bottom-0 left-0 right-0 h-[34px] px-[120px] py-2">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>

      <div className="flex items-center justify-between px-4 absolute top-0 left-0 right-0 h-11">
        <time className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
          9:41
        </time>
        <div className="flex items-center gap-1.5">
          <img
            className="w-[17px] h-[11px]"
            alt="Cellular connection"
            src="https://c.animaapp.com/miiix8hm2uCXlb/img/cellular-connection.svg"
          />
          <img
            className="w-[15px] h-[11px]"
            alt="Wifi"
            src="https://c.animaapp.com/miiix8hm2uCXlb/img/wifi.svg"
          />
          <img
            className="w-[24px] h-[11px]"
            alt="Battery"
            src="https://c.animaapp.com/miiix8hm2uCXlb/img/battery.png"
          />
        </div>
      </div>
    </div>
  );
};
