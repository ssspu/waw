import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../components/ui/badge";
import { GallerySection } from "./sections/GallerySection";
import { ProfileSection } from "./sections/ProfileSection";

export const Screen = (): JSX.Element => {
  return (
    <main
      className="bg-[#f2f2f2] w-full min-w-[375px] min-h-screen relative pb-24"
      data-model-id="15:1887"
    >
      <div className="absolute top-0 left-0 w-full min-h-full bg-[#f6f6f6] -z-10" />

      <header className="absolute top-0 left-[-3.69%] w-[102.45%] h-[44px] flex translate-y-[-1rem] animate-fade-in opacity-0">
        <div className="flex-1 w-[384.17px] flex">
          <div className="flex-1 w-[384.17px] relative">
            <img
              className="absolute w-[6.35%] h-[23.48%] top-[39.39%] left-[89.60%]"
              alt="Battery"
              src="https://c.animaapp.com/mi4v97d2OSuz2g/img/battery.png"
            />

            <img
              className="absolute w-[4.07%] h-[24.92%] top-[39.39%] left-[84.19%]"
              alt="Wifi"
              src="https://c.animaapp.com/mi4v97d2OSuz2g/img/wifi.svg"
            />

            <img
              className="absolute w-[4.53%] h-[24.24%] top-[40.15%] left-[78.31%]"
              alt="Cellular connection"
              src="https://c.animaapp.com/mi4v97d2OSuz2g/img/cellular-connection.svg"
            />

            <time className="absolute w-[7.99%] h-[38.64%] top-[35.23%] left-[9.11%] flex">
              <span className="flex-1 w-[28.69px] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
                9:41
              </span>
            </time>
          </div>
        </div>
      </header>

      <img
        className="absolute top-[31px] left-[247px] w-32 h-[72px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]"
        alt="Group"
        src="https://c.animaapp.com/mi4v97d2OSuz2g/img/group-7.png"
      />

      <Badge className="absolute top-[52px] left-[77px] w-[181px] h-[30px] bg-white rounded-[26px] px-3 py-1 hover:bg-white translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <div className="inline-flex items-center gap-2 w-full">
          <div className="inline-flex items-center gap-[3px]">
            <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#333333] text-[11px] text-center tracking-[0] leading-[normal]">
              成都市
            </span>

            <ChevronDownIcon className="w-[7px] h-[7px] text-[#333333]" />
          </div>

          <img
            className="w-px h-[15px]"
            alt="Divider"
            src="https://c.animaapp.com/mi4v97d2OSuz2g/img/vector-14.svg"
          />

          <div className="inline-flex items-center gap-0.5">
            <img
              className="w-[18px] h-[18px]"
              alt="Designer icon"
              src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-3.svg"
            />

            <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] text-center tracking-[0] leading-[normal]">
              设计师
            </span>
          </div>
        </div>
      </Badge>

      <img
        className="absolute top-[59px] left-[15px] w-[52px] h-[15px] object-cover translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]"
        alt="Logo"
        src="https://c.animaapp.com/mi4v97d2OSuz2g/img/image-23.png"
      />

      <div className="relative w-full flex flex-col">
        <section className="w-full max-w-[375px] mx-auto translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms] mt-[90px]">
          <div className="w-full h-[187px] bg-white rounded-md relative">
            <div className="w-full h-[188px]">
              <h1 className="absolute top-4 left-0 w-full [font-family:'DIN_BlackAlternate-Regular',Helvetica] font-normal text-[#333333] text-[75px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                WAW style
              </h1>

              <img
                className="absolute top-0 left-0 w-full h-[188px]"
                alt="Profile background"
                src="https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-177.png"
              />

              <div className="absolute top-[156px] left-0 w-full h-8 bg-[#ffffff3b] backdrop-blur-[10.55px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10.55px)_brightness(100%)]" />
            </div>
          </div>
        </section>

        <div className="w-full max-w-[375px] mx-auto mt-2">
          <ProfileSection />
        </div>
      </div>
      <GallerySection />
    </main>
  );
};
