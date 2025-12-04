import { ChevronLeftIcon, MoreHorizontalIcon, TargetIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";

export const DivWrapper = () => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="145:9121"
    >
      <header className="relative w-full bg-white">
        <div className="w-full h-11 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <ChevronLeftIcon className="h-4 w-4 text-[#666666]" />
            </Button>
            <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] tracking-[0] leading-[normal]">
              实体门店入驻
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4 text-[#666666]" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <TargetIcon className="h-4 w-4 text-[#666666]" />
            </Button>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-11 pointer-events-none">
          <div className="w-full h-full flex items-center justify-between px-4">
            <time className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
              9:41
            </time>
            <div className="flex items-center gap-1.5">
              <img
                className="w-[17.42px] h-[10.67px]"
                alt="Cellular connection"
                src="https://c.animaapp.com/miiiqb69Sz0ZpJ/img/cellular-connection.svg"
              />
              <img
                className="w-[15.27px] h-[11px]"
                alt="Wifi"
                src="https://c.animaapp.com/miiiqb69Sz0ZpJ/img/wifi.svg"
              />
              <img
                className="w-[24.33px] h-[11.33px]"
                alt="Battery"
                src="https://c.animaapp.com/miiiqb69Sz0ZpJ/img/battery.png"
              />
            </div>
          </div>
        </div>
      </header>

      <NavigationBarSection />

      <main className="flex-1 w-full relative">
        <MainContentSection />
      </main>

      <footer className="w-full bg-white shadow-[0px_-1px_0px_#0000000a]">
        <div className="flex w-full items-center justify-center gap-1.5 px-2.5 py-[3.5px]">
          <Button className="h-[42px] flex-1 bg-[#333333] hover:bg-[#4d4d4d] rounded-sm">
            <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs tracking-[0] leading-[normal]">
              下一步
            </span>
          </Button>
        </div>

        <div className="flex w-full h-[34px] items-center justify-center px-[120px] py-2">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>
    </div>
  );
};
