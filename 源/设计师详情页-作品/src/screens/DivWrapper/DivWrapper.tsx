import React from "react";
import { Button } from "../../components/ui/button";
import { ProfileSection } from "./sections/ProfileSection";
import { ServiceSection } from "./sections/ServiceSection";

export const DivWrapper = (): JSX.Element => {
  const statusBarIcons = [
    {
      src: "https://c.animaapp.com/mi5jretszAhz9Y/img/cellular-connection.svg",
      alt: "Cellular connection",
      className: "w-[4.53%] h-[24.24%]",
    },
    {
      src: "https://c.animaapp.com/mi5jretszAhz9Y/img/wifi.svg",
      alt: "Wifi",
      className: "w-[4.07%] h-[24.92%]",
    },
    {
      src: "https://c.animaapp.com/mi5jretszAhz9Y/img/battery.png",
      alt: "Battery",
      className: "w-[6.35%] h-[23.48%]",
    },
  ];

  return (
    <main
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] relative flex flex-col"
      data-model-id="15:6054"
    >
      <header className="relative w-full">
        <img
          className="w-full h-[300px] object-cover"
          alt="Header background"
          src="https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-186.png"
        />

        <nav className="absolute top-0 left-0 w-full h-[44px] flex items-center justify-between px-4 opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
          <div className="flex items-center gap-4 flex-1">
            <time className="[font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-[normal]">
              9:41
            </time>
          </div>

          <div className="flex items-center gap-1.5">
            {statusBarIcons.map((icon, index) => (
              <img
                key={index}
                className={icon.className}
                alt={icon.alt}
                src={icon.src}
              />
            ))}
          </div>
        </nav>

        <img
          className="absolute top-[31px] right-[15px] w-32 h-[72px] opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]"
          alt="Logo"
          src="https://c.animaapp.com/mi5jretszAhz9Y/img/group-7.png"
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-[51px] left-[15px] w-[30px] h-[30px] p-0 opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:100ms] hover:bg-white/20 transition-colors"
          aria-label="Go back"
        >
          <img
            className="w-full h-full"
            alt="Back"
            src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1877.svg"
          />
        </Button>
      </header>

      <div className="relative w-full opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]">
        <ServiceSection />
      </div>

      <div className="relative w-full opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:600ms]">
        <ProfileSection />
      </div>

      <footer className="flex flex-col w-full items-center justify-end gap-2.5 px-[120px] py-2 mt-auto">
        <div className="relative w-[134px] h-[5px] bg-black rounded-[100px]" />
      </footer>
    </main>
  );
};
