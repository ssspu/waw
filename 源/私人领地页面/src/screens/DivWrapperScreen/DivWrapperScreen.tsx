import { MoreVerticalIcon, RadioIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { BookingSection } from "./sections/BookingSection";
import { HeaderSection } from "./sections/HeaderSection";
import { ServiceCardSection } from "./sections/ServiceCardSection";
import { ServiceListSection } from "./sections/ServiceListSection";
import { UserProfileSection } from "./sections/UserProfileSection";

export const DivWrapperScreen = (): JSX.Element => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] flex flex-col relative"
      data-model-id="15:5244"
    >
      <header className="w-full bg-white flex flex-col relative z-10">
        <div className="w-full h-11 flex items-center justify-between px-4 translate-y-[-1rem] animate-fade-in opacity-0">
          <div className="flex items-center gap-2">
            <span className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
              9:41
            </span>
          </div>
          <div className="flex items-center gap-1">
            <img
              className="w-[17.42px] h-[10.67px]"
              alt="Cellular connection"
              src="https://c.animaapp.com/mi5ng54v4eM3X6/img/cellular-connection.svg"
            />
            <img
              className="w-[15.64px] h-[11px]"
              alt="Wifi"
              src="https://c.animaapp.com/mi5ng54v4eM3X6/img/wifi.svg"
            />
            <img
              className="w-[24.42px] h-[11.33px]"
              alt="Battery"
              src="https://c.animaapp.com/mi5ng54v4eM3X6/img/battery.png"
            />
          </div>
        </div>

        <nav className="w-full h-[68px] flex items-center justify-between px-4 relative translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
            <img
              className="w-4 h-4"
              alt="Back"
              src="https://c.animaapp.com/mi5ng54v4eM3X6/img/frame.svg"
            />
          </Button>

          <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-base text-center tracking-[0] leading-[normal]">
            私人领地
          </h1>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
              <MoreVerticalIcon className="w-4 h-4 text-[#333333]" />
            </Button>
            <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
              <RadioIcon className="w-4 h-4 text-[#333333]" />
            </Button>
          </div>

          <img
            className="absolute top-[-37px] right-0 w-32 h-[72px]"
            alt="Group"
            src="https://c.animaapp.com/mi5ng54v4eM3X6/img/group-8.png"
          />
        </nav>
      </header>

      <main className="flex-1 w-full flex flex-col items-center px-1.5 pt-1.5 gap-1.5 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <HeaderSection />
        <UserProfileSection />
        <ServiceCardSection />
        <ServiceListSection />
        <BookingSection />
      </main>

      <footer className="w-full h-[34px] flex items-center justify-center px-[120px] py-2 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </footer>
    </div>
  );
};
