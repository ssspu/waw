import { ChevronLeftIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { FeaturedItemsSection } from "./sections/FeaturedItemsSection/FeaturedItemsSection";
import { ItemListSection } from "./sections/ItemListSection";

const tabItems = [
  { label: "设计师", active: false },
  { label: "优服务", active: false },
  { label: "品牌馆", active: true },
];

export const Screen = (): JSX.Element => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="15:7357"
    >
      <header className="relative w-full">
        <img
          className="w-full h-[386px] object-cover"
          alt="Header background"
          src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-217.png"
        />

        <nav className="absolute top-0 left-0 right-0 w-full h-[44px] flex items-center justify-between px-4 opacity-0 animate-fade-in [--animation-delay:0ms]">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-4 h-4 p-0 hover:bg-transparent"
            >
              <ChevronLeftIcon className="w-4 h-4 text-white" />
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
              alt="Logo group"
              src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/group-8.png"
            />
          </div>
        </nav>

        <div className="absolute top-0 left-0 right-0 w-full h-[44px] flex items-center justify-between px-4 opacity-0 animate-fade-in [--animation-delay:100ms]">
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <img
              className="w-[24.4px] h-[10.45px]"
              alt="Battery"
              src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/battery.png"
            />
            <img
              className="w-[15.64px] h-[11.08px]"
              alt="Wifi"
              src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/wifi.svg"
            />
            <img
              className="w-[17.41px] h-[10.78px]"
              alt="Cellular connection"
              src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/cellular-connection.svg"
            />
          </div>
          <div className="absolute left-[35px] top-1/2 -translate-y-1/2 [font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
            9:41
          </div>
        </div>

        <div className="absolute top-[52px] left-24 opacity-0 animate-fade-in [--animation-delay:200ms]">
          <div className="flex items-center justify-center gap-2.5 px-2.5 py-1 bg-[#00000066] rounded-[26px] h-[30px]">
            <div className="inline-flex items-center gap-0.5">
              <img
                className="w-[18px] h-[18px]"
                alt="Designer icon"
                src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-4.svg"
              />
              <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#e6e6e6] text-[11px] text-center tracking-[0] leading-[normal]">
                设计师
              </div>
            </div>
          </div>
        </div>

        <nav className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-center gap-[62px] pb-4 opacity-0 animate-fade-in [--animation-delay:300ms]">
          {tabItems.map((tab, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-[3px] w-[42px] transition-colors hover:opacity-80"
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
                  src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-215.svg"
                />
              )}
            </button>
          ))}
        </nav>
      </header>

      <main className="relative w-full flex-1">
        <img
          className="absolute top-0 left-0 w-full h-[1118px] object-cover pointer-events-none"
          alt="Background decoration"
          src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/group-33.png"
        />

        <div className="relative z-10 translate-y-[-1rem] opacity-0 animate-fade-up [--animation-delay:400ms]">
          <FeaturedItemsSection />
        </div>

        <div className="relative z-10 translate-y-[-1rem] opacity-0 animate-fade-up [--animation-delay:500ms]">
          <ItemListSection />
        </div>
      </main>

      <footer className="relative w-full flex flex-col items-center justify-end gap-2.5 px-[120px] py-2 h-[34px]">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </footer>
    </div>
  );
};
