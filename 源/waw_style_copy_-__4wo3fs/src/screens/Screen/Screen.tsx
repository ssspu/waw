import React from "react";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { DesignSection } from "./sections/DesignSection";
import { ServiceOptionsSection } from "./sections/ServiceOptionsSection";

const statusBarIcons = [
  {
    src: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/cellular-connection.svg",
    alt: "Cellular connection",
    className: "w-[4.53%] h-[24.24%]",
  },
  {
    src: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/wifi.svg",
    alt: "Wifi",
    className: "w-[4.07%] h-[24.92%]",
  },
  {
    src: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/battery.png",
    alt: "Battery",
    className: "w-[6.35%] h-[23.48%]",
  },
];

const tabItems = [
  { value: "designer", label: "设计师", active: true },
  { value: "service", label: "优服务", active: false },
  { value: "brand", label: "品牌馆", active: false },
];

export const Screen = (): JSX.Element => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="15:6957"
    >
      <img
        className="absolute top-0 left-0 w-[375px] h-[386px] object-cover"
        alt="Rectangle"
        src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-217.png"
      />

      <img
        className="absolute top-[285px] left-0 w-[375px] h-[1118px] object-cover"
        alt="Group"
        src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/group-33.png"
      />

      <header className="relative z-10 w-full">
        <nav className="w-[102.45%] h-[44px] -ml-[3.69%] flex">
          <div className="flex-1 w-[384.17px] relative">
            <div className="absolute top-[35.23%] left-[9.11%] [font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
              9:41
            </div>
            <div className="absolute top-[39.39%] right-[3.85%] flex items-center gap-[15px]">
              {statusBarIcons.map((icon, index) => (
                <img
                  key={index}
                  className={icon.className}
                  alt={icon.alt}
                  src={icon.src}
                />
              ))}
            </div>
          </div>
        </nav>

        <div className="relative mt-[-13px] px-[15px] py-[31px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="w-4 h-4 flex items-center justify-center">
              <img
                className="w-4 h-4"
                alt="Back"
                src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-4.svg"
              />
            </button>
            <div className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[normal]">
              美发
            </div>
          </div>

          <img
            className="w-32 h-[72px]"
            alt="Group"
            src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/group-8.png"
          />
        </div>

        <div className="relative px-[15px] -mt-[21px]">
          <Badge className="bg-[#00000066] hover:bg-[#00000066] text-[#e6e6e6] rounded-[26px] h-[30px] px-2.5 py-1 border-0">
            <img
              className="w-[18px] h-[18px] mr-0.5"
              alt="Frame"
              src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-1.svg"
            />
            <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[11px]">
              设计师
            </span>
          </Badge>
        </div>
      </header>

      <div className="relative z-10 mt-[219px]">
        <Tabs defaultValue="designer" className="w-full">
          <TabsList className="w-full h-auto bg-transparent border-0 rounded-none p-0 grid grid-cols-3 gap-0">
            {tabItems.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="relative data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0 px-0 py-0 h-auto"
              >
                <div className="flex flex-col items-center gap-[3px] py-2">
                  <span
                    className={`${
                      tab.active
                        ? "[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black"
                        : "[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666]"
                    } text-sm tracking-[0] leading-[normal]`}
                  >
                    {tab.label}
                  </span>
                  {tab.active && (
                    <img
                      className="w-[17px] h-[5px]"
                      alt="Active indicator"
                      src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-215.svg"
                    />
                  )}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <main className="relative z-10 flex-1 flex flex-col">
        <DesignSection />
        <ServiceOptionsSection />
      </main>

      <footer className="relative z-10 flex items-center justify-center px-[120px] py-2 h-[34px] mt-auto">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </footer>
    </div>
  );
};
