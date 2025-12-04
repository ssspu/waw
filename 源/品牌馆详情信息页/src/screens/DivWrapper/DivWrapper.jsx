import { ChevronLeftIcon, MoreHorizontalIcon, Share2Icon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { ProfileSection } from "./sections/ProfileSection";
import { ServicesSection } from "./sections/ServicesSection";

export const DivWrapper = () => {
  const statusBarIcons = [
    {
      className: "absolute w-[6.35%] h-[23.48%] top-[39.39%] left-[89.60%]",
      alt: "Battery",
      src: "https://c.animaapp.com/mifk10s9DhCORZ/img/battery.png",
    },
    {
      className: "absolute w-[4.07%] h-[24.92%] top-[39.39%] left-[84.19%]",
      alt: "Wifi",
      src: "https://c.animaapp.com/mifk10s9DhCORZ/img/wifi.svg",
    },
    {
      className: "absolute w-[4.53%] h-[24.24%] top-[40.15%] left-[78.31%]",
      alt: "Cellular connection",
      src: "https://c.animaapp.com/mifk10s9DhCORZ/img/cellular-connection.svg",
    },
  ];

  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="1:5177"
    >
      <header className="relative w-full bg-white">
        <nav className="relative w-full h-[126px]">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-[58px] left-[15px] w-4 h-4 p-0 hover:bg-transparent"
            aria-label="Go back"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>

          <div className="absolute w-[102.45%] h-[44px] top-0 left-[-3.69%]">
            <div className="flex-1 w-full relative">
              {statusBarIcons.map((icon, index) => (
                <img
                  key={index}
                  className={icon.className}
                  alt={icon.alt}
                  src={icon.src}
                />
              ))}

              <div className="absolute w-[7.99%] h-[38.64%] top-[35.23%] left-[9.11%]">
                <div className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                  9:41
                </div>
              </div>
            </div>
          </div>

          <img
            className="absolute top-[31px] left-[247px] w-32 h-[72px]"
            alt="Group"
            src="https://c.animaapp.com/mifk10s9DhCORZ/img/group-8.png"
          />

          <div className="absolute top-[58px] right-[15px] flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="w-4 h-4 p-0 hover:bg-transparent"
              aria-label="More options"
            >
              <MoreHorizontalIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-4 h-4 p-0 hover:bg-transparent"
              aria-label="Share"
            >
              <Share2Icon className="w-4 h-4" />
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative w-full flex-1 flex flex-col">
        <ProfileSection />
        <ServicesSection />
      </main>

      <footer className="relative w-full h-[34px] flex items-center justify-center px-[120px] py-2">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </footer>
    </div>
  );
};
