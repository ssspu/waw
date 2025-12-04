import React from "react";
import { Button } from "../../components/ui/button";
import { FeaturedServicesSection } from "./sections/FeaturedServicesSection";
import { GallerySection } from "./sections/GallerySection";
import { RecommendationsSection } from "./sections/RecommendationsSection";
import { ServiceSection } from "./sections/ServiceSection";
import { VIPSection } from "./sections/VIPSection";

export const Screen = (): JSX.Element => {
  const categoryTabs = [
    { label: "设计师", active: false },
    { label: "优服务", active: true },
    { label: "品牌馆", active: false },
  ];

  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="15:7188"
    >
      <header className="relative w-full">
        <img
          className="w-full h-[386px] object-cover"
          alt="Rectangle"
          src="https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-217.png"
        />

        <div className="absolute top-0 left-0 w-full h-[44px] flex items-center justify-between px-4 translate-y-[-1rem] animate-fade-in opacity-0">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-4 h-4 p-0 hover:bg-transparent"
            >
              <img
                className="w-4 h-4"
                alt="Back"
                src="https://c.animaapp.com/mi5bcgvrGbkedE/img/frame.svg"
              />
            </Button>
            <div className="inline-flex items-center gap-1.5">
              <div className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-white text-[15px] whitespace-nowrap tracking-[0] leading-[normal]">
                美发
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img
              className="w-32 h-[72px]"
              alt="Group"
              src="https://c.animaapp.com/mi5bcgvrGbkedE/img/group-8.png"
            />
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-[44px] flex items-center justify-between px-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:100ms]">
          <div className="flex-1 flex items-center justify-between">
            <div className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
              9:41
            </div>
            <div className="flex items-center gap-1.5">
              <img
                className="w-[17.43px] h-[11px]"
                alt="Cellular connection"
                src="https://c.animaapp.com/mi5bcgvrGbkedE/img/cellular-connection.svg"
              />
              <img
                className="w-[15.64px] h-[11px]"
                alt="Wifi"
                src="https://c.animaapp.com/mi5bcgvrGbkedE/img/wifi.svg"
              />
              <img
                className="w-[24.41px] h-[11px]"
                alt="Battery"
                src="https://c.animaapp.com/mi5bcgvrGbkedE/img/battery.png"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-24 flex items-center justify-center gap-2.5 px-2.5 py-1 bg-[#00000066] rounded-[26px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <div className="inline-flex items-center gap-0.5">
            <img
              className="w-[18px] h-[18px]"
              alt="Frame"
              src="https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-3.svg"
            />
            <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#e6e6e6] text-[11px] text-center tracking-[0] leading-[normal]">
              设计师
            </div>
          </div>
        </div>
      </header>

      <nav className="relative w-full bg-white translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:300ms]">
        <div className="flex items-center justify-around py-3">
          {categoryTabs.map((tab, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-[3px] min-w-[42px] transition-colors"
            >
              <div
                className={`text-sm text-center tracking-[0] leading-[normal] ${
                  tab.active
                    ? "[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black"
                    : "[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666]"
                }`}
              >
                {tab.label}
              </div>
              {tab.active && (
                <img
                  className="w-[17px] h-[5px]"
                  alt="Active indicator"
                  src="https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-215.svg"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      <ServiceSection />

      <main className="relative w-full flex-1 flex flex-col items-center gap-[9px] px-[6px] pb-[50px]">
        <div className="w-full max-w-[363px] translate-y-[-1rem] animate-fade-up opacity-0 [--animation-delay:400ms]">
          <FeaturedServicesSection />
        </div>
        <div className="w-full max-w-[363px] translate-y-[-1rem] animate-fade-up opacity-0 [--animation-delay:500ms]">
          <RecommendationsSection />
        </div>
        <div className="w-full max-w-[363px] translate-y-[-1rem] animate-fade-up opacity-0 [--animation-delay:600ms]">
          <VIPSection />
        </div>
        <div className="w-full max-w-[363px] translate-y-[-1rem] animate-fade-up opacity-0 [--animation-delay:700ms]">
          <GallerySection />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full flex items-center justify-center py-2 bg-transparent">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </footer>
    </div>
  );
};
