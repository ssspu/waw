import { ChevronLeftIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { FormSection } from "./sections/FormSection";
import { NavigationSection } from "./sections/NavigationSection";

export const DivWrapper = () => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen flex flex-col relative"
      data-model-id="145:8954"
    >
      <header className="w-full bg-white relative z-10">
        <nav className="flex items-center justify-between w-full h-[44px] px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-auto p-0 hover:bg-transparent"
            >
              <ChevronLeftIcon className="w-4 h-4 text-black" />
            </Button>
            <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] tracking-[0] leading-[normal]">
              设计师入驻
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-auto p-0 hover:bg-transparent"
            >
              <img
                className="w-4 h-4"
                alt="Frame"
                src="https://c.animaapp.com/miiepnx8EBw0nf/img/frame-1.svg"
              />
            </Button>
            <img
              className="w-32 h-[72px]"
              alt="Group"
              src="https://c.animaapp.com/miiepnx8EBw0nf/img/group-8.png"
            />
          </div>
        </nav>

        <div className="flex items-center justify-between px-4 h-[44px]">
          <time className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
            9:41
          </time>

          <div className="flex items-center gap-1.5">
            <img
              className="w-[17.42px] h-[11px]"
              alt="Cellular connection"
              src="https://c.animaapp.com/miiepnx8EBw0nf/img/cellular-connection.svg"
            />
            <img
              className="w-[15.64px] h-[11.33px]"
              alt="Wifi"
              src="https://c.animaapp.com/miiepnx8EBw0nf/img/wifi.svg"
            />
            <img
              className="w-[24.4px] h-[10.67px]"
              alt="Battery"
              src="https://c.animaapp.com/miiepnx8EBw0nf/img/battery.png"
            />
          </div>
        </div>
      </header>

      <div className="w-full px-[41px] py-2 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <img
          className="w-full h-[23px]"
          alt="Frame"
          src="https://c.animaapp.com/miiepnx8EBw0nf/img/frame-2387.svg"
        />
      </div>

      <NavigationSection />

      <main className="flex-1 w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <FormSection />
      </main>

      <footer className="w-full bg-white shadow-[0px_-1px_0px_#0000000a] mt-auto">
        <div className="flex items-center justify-center w-full h-[49px] px-2.5">
          <Button className="flex-1 h-[42px] bg-[#333333] hover:bg-[#444444] rounded-sm">
            <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs tracking-[0] leading-[normal]">
              下一步
            </span>
          </Button>
        </div>

        <div className="flex items-end justify-center w-full h-[34px] px-[120px] py-2 bg-white">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>
    </div>
  );
};
