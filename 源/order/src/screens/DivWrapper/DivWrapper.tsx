import { CircleIcon, MoreVerticalIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { NavigationBarSection } from "./sections/NavigationBarSection";
import { ServiceListSection } from "./sections/ServiceListSection";

export const DivWrapper = (): JSX.Element => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] flex flex-col relative"
      data-model-id="15:4634"
    >
      <header className="w-full bg-white relative">
        <div className="flex items-center justify-between px-4 pt-14 pb-4">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
              <img
                className="w-4 h-4"
                alt="Back"
                src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/frame.svg"
              />
            </Button>
            <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] tracking-[0] leading-[normal]">
              服务订单
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
              <MoreVerticalIcon className="w-5 h-5 text-[#666666]" />
            </Button>
            <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
              <CircleIcon className="w-5 h-5 text-[#666666]" />
            </Button>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-4">
          <time className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
            9:41
          </time>
          <div className="flex items-center gap-1.5">
            <img
              className="w-[17.41px] h-[11.67px]"
              alt="Cellular connection"
              src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/cellular-connection.svg"
            />
            <img
              className="w-[15.64px] h-[11.67px]"
              alt="Wifi"
              src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/wifi.svg"
            />
            <img
              className="w-[24.39px] h-[11.67px]"
              alt="Battery"
              src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/battery.png"
            />
          </div>
        </div>

        <img
          className="absolute top-[31px] right-[8px] w-32 h-[72px]"
          alt="Group"
          src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/group-8.png"
        />
      </header>

      <NavigationBarSection />

      <ServiceListSection />

      <div className="flex flex-col w-full items-center justify-end gap-2.5 px-[120px] py-2 mt-auto">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    </div>
  );
};
