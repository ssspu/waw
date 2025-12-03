import { ChevronLeftIcon, MoreHorizontalIcon, RadioIcon } from "lucide-react";
import React from "react";
import { ServiceBookingSection } from "./sections/ServiceBookingSection";
import { ServiceCardSection } from "./sections/ServiceCardSection";
import { ServiceDetailSection } from "./sections/ServiceDetailSection";
import { ServiceListSection } from "./sections/ServiceListSection";

export const DivWrapperScreen = () => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen flex flex-col relative"
      data-model-id="29:7"
    >
      <header className="w-full bg-white flex flex-col relative z-10">
        <div className="w-full h-11 flex items-center justify-between px-4 opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
          <div className="flex items-center gap-2">
            <span className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[19.6px]">
              9:41
            </span>
          </div>
          <div className="flex items-center gap-1">
            <img
              className="w-[17px] h-[11px]"
              alt="Cellular connection"
              src="https://c.animaapp.com/mioajbhy6jLOdi/img/cellular-connection.svg"
            />
            <img
              className="w-[15px] h-[11px]"
              alt="Wifi"
              src="https://c.animaapp.com/mioajbhy6jLOdi/img/wifi.svg"
            />
            <img
              className="w-[25px] h-[11px]"
              alt="Battery"
              src="https://c.animaapp.com/mioajbhy6jLOdi/img/battery.png"
            />
          </div>
        </div>

        <nav className="w-full h-[70px] flex items-center justify-between px-4 opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:100ms]">
          <button className="w-4 h-4 flex items-center justify-center">
            <ChevronLeftIcon className="w-4 h-4 text-black" />
          </button>

          <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-base text-center tracking-[0] leading-[22.4px]">
            浏览记录
          </h1>

          <div className="flex items-center gap-3">
            <button className="w-7 h-7 flex items-center justify-center">
              <MoreHorizontalIcon className="w-6 h-6 text-black" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center">
              <RadioIcon className="w-6 h-6 text-black" />
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 w-full flex flex-col relative">
        <div className="w-full opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
          <ServiceDetailSection />
        </div>

        <div className="w-full opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:300ms]">
          <ServiceBookingSection />
        </div>

        <div className="w-full opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]">
          <ServiceCardSection />
        </div>

        <div className="w-full opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:500ms]">
          <ServiceListSection />
        </div>
      </main>

      <footer className="w-full h-[34px] flex items-end justify-center pb-2 opacity-0 animate-fade-in [--animation-delay:600ms]">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </footer>
    </div>
  );
};
