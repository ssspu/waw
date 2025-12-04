import React from "react";
import { PortfolioSection } from "./sections/PortfolioSection";
import { ProfileSection } from "./sections/ProfileSection";
import { ReviewsSection } from "./sections/ReviewsSection";

export const DivWrapper = (): JSX.Element => {
  const statusBarIcons = [
    {
      className: "absolute w-[6.35%] h-[23.48%] top-[39.39%] left-[89.60%]",
      alt: "Battery",
      src: "https://c.animaapp.com/mi5d4lp0csJxnR/img/battery.png",
    },
    {
      className: "absolute w-[4.07%] h-[24.92%] top-[39.39%] left-[84.19%]",
      alt: "Wifi",
      src: "https://c.animaapp.com/mi5d4lp0csJxnR/img/wifi.svg",
    },
    {
      className: "absolute w-[4.53%] h-[24.24%] top-[40.15%] left-[78.31%]",
      alt: "Cellular connection",
      src: "https://c.animaapp.com/mi5d4lp0csJxnR/img/cellular-connection.svg",
    },
  ];

  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="15:2391"
    >
      <header className="relative w-full h-[331px] flex-shrink-0">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Rectangle"
          src="https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-186.png"
        />

        <div className="absolute w-[102.45%] h-[44px] top-0 left-[-3.69%] flex translate-y-[-1rem] animate-fade-in opacity-0">
          <div className="flex-1 w-[384.17px] flex">
            <div className="flex-1 w-[384.17px] relative bg-[100%_100%]">
              {statusBarIcons.map((icon, index) => (
                <img
                  key={`status-icon-${index}`}
                  className={icon.className}
                  alt={icon.alt}
                  src={icon.src}
                />
              ))}

              <div className="absolute w-[7.99%] h-[38.64%] top-[35.23%] left-[9.11%] flex">
                <div className="flex-1 w-[28.69px] [font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-[normal]">
                  9:41
                </div>
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-[31px] left-[247px] w-32 h-[72px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]"
          alt="Group"
          src="https://c.animaapp.com/mi5d4lp0csJxnR/img/group-7.png"
        />

        <img
          className="absolute top-[51px] left-[15px] w-[30px] h-[30px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]"
          alt="Frame"
          src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1877.svg"
        />
      </header>

      <main className="relative w-full flex-1 flex flex-col">
        <ReviewsSection />
        <ProfileSection />
        <PortfolioSection />
      </main>

      <footer className="flex flex-col w-full h-[34px] items-center justify-end gap-2.5 px-[120px] py-2 flex-shrink-0">
        <div className="relative w-[134px] h-[5px] bg-black rounded-[100px]" />
      </footer>
    </div>
  );
};
