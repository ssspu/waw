import React from "react";
import { Button } from "../../components/ui/button";
import { ProfileSection } from "./sections/ProfileSection";
import { ServiceListSection } from "./sections/ServiceListSection";

export const DivWrapper = (): JSX.Element => {
  return (
    <main
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] relative flex flex-col"
      data-model-id="15:2793"
    >
      <header className="relative w-full">
        <img
          className="w-full h-[329px] object-cover"
          alt="Header background"
          src="https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-186.png"
        />

        <div className="absolute w-full top-0 left-0 flex justify-center opacity-0 animate-fade-in [--animation-delay:0ms]">
          <div className="w-full max-w-[375px] relative">
            <div className="absolute w-full h-[44px] top-0 left-0 flex items-center justify-between px-[34px]">
              <img
                className="w-[24.4px] h-[10.36px]"
                alt="Battery"
                src="https://c.animaapp.com/mi5l377nJk1HHO/img/battery.png"
              />

              <img
                className="w-[15.64px] h-[10.97px]"
                alt="Wifi"
                src="https://c.animaapp.com/mi5l377nJk1HHO/img/wifi.svg"
              />

              <img
                className="w-[17.41px] h-[10.67px]"
                alt="Cellular connection"
                src="https://c.animaapp.com/mi5l377nJk1HHO/img/cellular-connection.svg"
              />

              <time className="absolute left-[35px] [font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-[normal]">
                9:41
              </time>
            </div>
          </div>
        </div>

        <img
          className="absolute top-[31px] right-[16px] w-32 h-[72px] opacity-0 animate-fade-in [--animation-delay:200ms]"
          alt="Logo"
          src="https://c.animaapp.com/mi5l377nJk1HHO/img/group-7.png"
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-[51px] left-[15px] w-[30px] h-[30px] p-0 opacity-0 animate-fade-in [--animation-delay:100ms] hover:bg-white/20 transition-colors"
          aria-label="Go back"
        >
          <img
            className="w-full h-full"
            alt="Back"
            src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1877.svg"
          />
        </Button>
      </header>

      <div className="w-full opacity-0 animate-fade-up [--animation-delay:300ms]">
        <ServiceListSection />
      </div>

      <div className="w-full opacity-0 animate-fade-up [--animation-delay:400ms]">
        <ProfileSection />
      </div>

      <nav className="flex w-full items-center justify-center gap-2.5 px-[120px] py-2 mt-auto opacity-0 animate-fade-in [--animation-delay:500ms]">
        <div
          className="w-[134px] h-[5px] bg-black rounded-[100px]"
          aria-label="Home indicator"
        />
      </nav>
    </main>
  );
};
