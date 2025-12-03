import { ChevronLeftIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { ProfileSection } from "./sections/ProfileSection";
import { ServicesSection } from "./sections/ServicesSection";

export const DivWrapper = (): JSX.Element => {
  const statusBarIcons = [
    {
      className: "absolute w-[6.35%] h-[23.48%] top-[39.39%] left-[89.60%]",
      alt: "Battery",
      src: "https://c.animaapp.com/mi5eklbiAEaKLJ/img/battery.png",
    },
    {
      className: "absolute w-[4.07%] h-[24.92%] top-[39.39%] left-[84.18%]",
      alt: "Wifi",
      src: "https://c.animaapp.com/mi5eklbiAEaKLJ/img/wifi.svg",
    },
    {
      className: "absolute w-[4.53%] h-[24.24%] top-[40.15%] left-[78.31%]",
      alt: "Cellular connection",
      src: "https://c.animaapp.com/mi5eklbiAEaKLJ/img/cellular-connection.svg",
    },
  ];

  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] relative flex flex-col"
      data-model-id="15:7551"
    >
      <header className="relative w-full bg-white z-10">
        <nav className="w-full h-[126px] relative">
          <div className="absolute w-[102.45%] h-[44px] top-0 left-[-3.69%] flex">
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
                  <div className="flex-1 w-[28.69px] [font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                    9:41
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-[58px] left-[15px] flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-4 p-0 hover:bg-transparent"
              aria-label="Go back"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
          </div>

          <img
            className="absolute top-[31px] right-[15px] w-32 h-[72px]"
            alt="Logo"
            src="https://c.animaapp.com/mi5eklbiAEaKLJ/img/group-8.png"
          />

          <div className="absolute top-[58px] right-[15px] flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-4 p-0 hover:bg-transparent"
              aria-label="Share"
            >
              <img
                className="w-4 h-4"
                alt="Share"
                src="https://c.animaapp.com/mi5eklbiAEaKLJ/img/frame-1.svg"
              />
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative w-full flex-1 flex flex-col">
        <ProfileSection />
        <ServicesSection />
      </main>

      <footer className="flex flex-col w-full items-center justify-end gap-2.5 px-[120px] py-2 relative">
        <div className="relative w-[134px] h-[5px] bg-black rounded-[100px]" />
      </footer>
    </div>
  );
};
