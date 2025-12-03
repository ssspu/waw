import { ChevronLeftIcon } from "lucide-react";
import React from "react";
import { FormContainerSection } from "./sections/FormContainerSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";

export const DivWrapper = () => {
  const statusBarIcons = [
    {
      className: "absolute w-[6.35%] h-[23.48%] top-[39.39%] left-[89.60%]",
      alt: "Battery",
      src: "https://c.animaapp.com/miiiqnnnLuYE67/img/battery.png",
    },
    {
      className: "absolute w-[4.07%] h-[24.92%] top-[39.39%] left-[84.18%]",
      alt: "Wifi",
      src: "https://c.animaapp.com/miiiqnnnLuYE67/img/wifi.svg",
    },
    {
      className: "absolute w-[4.53%] h-[24.24%] top-[40.15%] left-[78.31%]",
      alt: "Cellular connection",
      src: "https://c.animaapp.com/miiiqnnnLuYE67/img/cellular-connection.svg",
    },
  ];

  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="145:9242"
    >
      <header className="relative w-full bg-white">
        <nav className="w-[102.45%] h-[44px] -ml-[3.69%] flex relative">
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
                <div className="flex-1 w-[28.69px] [font-family:'Inter',Helvetica] text-black text-sm font-normal tracking-[0] leading-[normal]">
                  9:41
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="relative w-full h-[112px]">
          <button className="absolute top-[27px] left-[15px] w-4 h-4 flex items-center justify-center">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          <img
            className="absolute top-0 left-[247px] w-32 h-[72px]"
            alt="Group"
            src="https://c.animaapp.com/miiiqnnnLuYE67/img/group-8.png"
          />

          <div className="absolute top-[25px] left-[39px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] tracking-[0] leading-[normal]">
            实体门店入驻
          </div>

          <img
            className="absolute top-[69px] left-[41px] w-[292px] h-[23px]"
            alt="Frame"
            src="https://c.animaapp.com/miiiqnnnLuYE67/img/frame-2406.svg"
          />
        </div>
      </header>

      <NavigationBarSection />

      <MainContentSection />

      <FormContainerSection />
    </div>
  );
};
