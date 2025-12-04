import React from "react";
import { ProfileSection } from "./sections/ProfileSection";
import { ReviewsSection } from "./sections/ReviewsSection";

export const DivWrapper = (): JSX.Element => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="15:6197"
    >
      <header className="relative w-full h-[300px] flex-shrink-0">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Rectangle"
          src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-186.png"
        />

        <div className="absolute w-full h-[44px] top-0 left-0 flex">
          <div className="flex-1 w-full flex">
            <div className="flex-1 w-full relative">
              <img
                className="absolute w-[24.4px] h-[11.5px] top-[17.33px] right-[14.67px]"
                alt="Battery"
                src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/battery.png"
              />

              <img
                className="absolute w-[15.64px] h-[11.5px] top-[17.33px] right-[37.33px]"
                alt="Wifi"
                src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/wifi.svg"
              />

              <img
                className="absolute w-[17.4px] h-[11.5px] top-[17.67px] right-[56.67px]"
                alt="Cellular connection"
                src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/cellular-connection.svg"
              />

              <div className="absolute top-[15.5px] left-[35px] [font-family:'Inter',Helvetica] text-white text-sm font-normal tracking-[0] leading-[normal]">
                9:41
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-[31px] right-[16px] w-32 h-[72px]"
          alt="Group"
          src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/group-7.png"
        />

        <img
          className="absolute top-[51px] left-[15px] w-[30px] h-[30px]"
          alt="Frame"
          src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1877.svg"
        />
      </header>

      <main className="relative w-full flex-1 flex flex-col">
        <ReviewsSection />
        <ProfileSection />
      </main>

      <div className="flex flex-col w-full items-center justify-end gap-2.5 px-[120px] py-2 flex-shrink-0">
        <div className="relative w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    </div>
  );
};
