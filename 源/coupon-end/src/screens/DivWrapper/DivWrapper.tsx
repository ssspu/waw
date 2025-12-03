import { ChevronLeftIcon, CircleIcon, MoreVerticalIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { CouponDetailsSection } from "./sections/CouponDetailsSection";
import { CouponListSection } from "./sections/CouponListSection";

export const DivWrapper = (): JSX.Element => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="15:5201"
    >
      <header className="relative w-full bg-white">
        <div className="relative w-full h-[126px]">
          <div className="absolute top-0 left-0 w-full h-full flex flex-col">
            <div className="relative w-full h-[44px] flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                  9:41
                </span>
              </div>
              <div className="flex items-center gap-1">
                <img
                  className="w-[17px] h-[11px]"
                  alt="Cellular connection"
                  src="https://c.animaapp.com/mi5mjnswM14oP7/img/cellular-connection.svg"
                />
                <img
                  className="w-[16px] h-[11px]"
                  alt="Wifi"
                  src="https://c.animaapp.com/mi5mjnswM14oP7/img/wifi.svg"
                />
                <img
                  className="w-[24px] h-[11px]"
                  alt="Battery"
                  src="https://c.animaapp.com/mi5mjnswM14oP7/img/battery.png"
                />
              </div>
            </div>

            <div className="relative w-full h-[82px] flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-[15px] top-1/2 -translate-y-1/2 h-auto w-auto p-0"
              >
                <ChevronLeftIcon className="w-4 h-4 text-[#333333]" />
              </Button>

              <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-base text-center tracking-[0] leading-[normal]">
                优惠券
              </h1>

              <div className="absolute right-[15px] top-1/2 -translate-y-1/2 flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-auto w-auto p-0"
                >
                  <MoreVerticalIcon className="w-5 h-5 text-[#333333]" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-auto w-auto p-0"
                >
                  <CircleIcon className="w-5 h-5 text-[#333333]" />
                </Button>
              </div>

              <img
                className="absolute top-[10px] right-[15px] w-32 h-[72px]"
                alt="Group"
                src="https://c.animaapp.com/mi5mjnswM14oP7/img/group-8.png"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex-1 w-full">
        <CouponDetailsSection />
        <CouponListSection />
      </main>

      <footer className="relative w-full h-[34px] flex items-center justify-center px-[120px] py-2">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </footer>
    </div>
  );
};
