import React from "react";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { DetailsSection } from "./sections/DetailsSection";
import { ImageGallerySection } from "./sections/ImageGallerySection";
import { ProfileSection } from "./sections/ProfileSection";

export const DivWrapper = () => {
  const statusBarIcons = [
    {
      className: "w-[6.35%] h-[23.48%] top-[39.39%] left-[89.60%]",
      alt: "Battery",
      src: "https://c.animaapp.com/mifnbli6udxphC/img/battery.png",
    },
    {
      className: "w-[4.07%] h-[24.92%] top-[39.39%] left-[84.18%]",
      alt: "Wifi",
      src: "https://c.animaapp.com/mifnbli6udxphC/img/wifi.svg",
    },
    {
      className: "w-[4.53%] h-[24.24%] top-[40.15%] left-[78.31%]",
      alt: "Cellular connection",
      src: "https://c.animaapp.com/mifnbli6udxphC/img/cellular-connection.svg",
    },
  ];

  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] relative flex flex-col"
      data-model-id="53:4836"
    >
      <header className="relative w-full h-[331px] flex-shrink-0">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Rectangle"
          src="https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png"
        />

        <nav className="absolute w-[102.45%] h-0 top-0 left-[-3.69%] flex">
          <div className="flex-1 w-[384.17px] flex">
            <div className="flex-1 w-[384.17px] relative bg-[100%_100%]">
              {statusBarIcons.map((icon, index) => (
                <img
                  key={`status-icon-${index}`}
                  className={`absolute ${icon.className}`}
                  alt={icon.alt}
                  src={icon.src}
                />
              ))}

              <time className="absolute w-[7.99%] h-[38.64%] top-[35.23%] left-[9.11%] flex">
                <span className="flex-1 w-[28.69px] [font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-[normal]">
                  9:41
                </span>
              </time>
            </div>
          </div>
        </nav>

        <Avatar className="absolute top-[31px] left-[247px] w-32 h-[72px] rounded-none">
          <AvatarImage
            src="https://c.animaapp.com/mifnbli6udxphC/img/group-7.png"
            alt="Profile"
          />
        </Avatar>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-[51px] left-[15px] w-[30px] h-[30px] p-0 hover:bg-transparent opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]"
        >
          <img
            className="w-full h-full"
            alt="Back"
            src="https://c.animaapp.com/mifnbli6udxphC/img/frame-1877.svg"
          />
        </Button>

        <h1 className="absolute top-14 left-[57px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-[15px] tracking-[0] leading-[normal] opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
          洗剪吹
        </h1>

        <section className="absolute top-[7px] right-0 w-[35%] opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]">
          <DetailsSection />
        </section>
      </header>

      <main className="relative w-full flex flex-col">
        <section className="w-full relative opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:600ms]">
          <ProfileSection />
        </section>

        <section className="w-full relative opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:800ms]">
          <ImageGallerySection />
        </section>
      </main>
    </div>
  );
};
