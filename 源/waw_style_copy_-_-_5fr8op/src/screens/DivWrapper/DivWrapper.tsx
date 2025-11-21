import React from "react";
import { Button } from "../../components/ui/button";
import { BookingSection } from "./sections/BookingSection";
import { ProfileSection } from "./sections/ProfileSection";

export const DivWrapper = (): JSX.Element => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="15:4511"
    >
      <header className="relative w-full h-[300px] flex-shrink-0">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Rectangle"
          src="https://c.animaapp.com/mi5fl4nsfGephA/img/rectangle-186.png"
        />

        <div className="absolute w-full h-[44px] top-0 left-0 flex opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
          <div className="flex-1 w-full flex">
            <div className="flex-1 w-full relative">
              <img
                className="absolute w-[6.35%] h-[23.48%] top-[39.39%] right-[4.05%]"
                alt="Battery"
                src="https://c.animaapp.com/mi5fl4nsfGephA/img/battery.png"
              />

              <img
                className="absolute w-[4.07%] h-[24.92%] top-[39.39%] right-[11.75%]"
                alt="Wifi"
                src="https://c.animaapp.com/mi5fl4nsfGephA/img/wifi.svg"
              />

              <img
                className="absolute w-[4.53%] h-[24.24%] top-[40.15%] right-[17.16%]"
                alt="Cellular connection"
                src="https://c.animaapp.com/mi5fl4nsfGephA/img/cellular-connection.svg"
              />

              <div className="absolute h-[38.64%] top-[35.23%] left-[9.11%] flex">
                <div className="[font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-[normal]">
                  9:41
                </div>
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-[31px] right-[16px] w-32 h-[72px] opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]"
          alt="Group"
          src="https://c.animaapp.com/mi5fl4nsfGephA/img/group-9.png"
        />

        <img
          className="absolute top-[51px] left-[15px] w-[30px] h-[30px] opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]"
          alt="Frame"
          src="https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1877.svg"
        />
      </header>

      <main className="flex-1 w-full relative">
        <BookingSection />
        <ProfileSection />
      </main>

      <footer className="flex flex-col w-full items-start bg-white shadow-[0px_-1px_0px_#0000000a] flex-shrink-0">
        <div className="flex flex-col w-full items-center justify-end px-[15px] py-0">
          <Button className="h-[42px] w-full bg-[#333333] hover:bg-[#444444] rounded-sm px-[15px] py-2 gap-1">
            <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#ffa77b] text-xs tracking-[0] leading-[normal]">
              预约
            </span>
          </Button>
        </div>

        <div className="flex flex-col w-full items-center justify-end gap-2.5 px-[120px] py-2 bg-white">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>
    </div>
  );
};
