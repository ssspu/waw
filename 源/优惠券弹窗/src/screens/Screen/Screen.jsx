import React from "react";
import { CouponSection } from "./sections/CouponSection";
import { DiscountSection } from "./sections/DiscountSection";
import { OfferListSection } from "./sections/OfferListSection";

export const Screen = () => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-[812px] relative"
      data-model-id="1:946"
    >
      <div className="relative w-full min-h-[812px]">
        <header className="relative w-full">
          <img
            className="w-full h-[321px] object-cover"
            alt="Rectangle"
            src="https://c.animaapp.com/mifjz2qhRjR77t/img/rectangle-187.png"
          />

          <nav className="absolute top-0 left-0 right-0 w-full h-[44px] flex items-center justify-between px-4 translate-y-[-1rem] animate-fade-in opacity-0">
            <div className="flex-1 flex items-center">
              <div className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                9:41
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <img
                className="w-[17px] h-[11px]"
                alt="Cellular connection"
                src="https://c.animaapp.com/mifjz2qhRjR77t/img/cellular-connection.svg"
              />

              <img
                className="w-[15px] h-[11px]"
                alt="Wifi"
                src="https://c.animaapp.com/mifjz2qhRjR77t/img/wifi.svg"
              />

              <img
                className="w-[24px] h-[11px]"
                alt="Battery"
                src="https://c.animaapp.com/mifjz2qhRjR77t/img/battery.png"
              />
            </div>
          </nav>

          <img
            className="absolute top-[31px] right-[14px] w-32 h-[72px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]"
            alt="Group"
            src="https://c.animaapp.com/mifjz2qhRjR77t/img/group-7.png"
          />

          <img
            className="absolute top-[51px] left-[29px] w-[30px] h-[30px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]"
            alt="Frame"
            src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame-1877.svg"
          />
        </header>

        <main className="relative w-full">
          <div className="translate-y-[-1rem] animate-fade-up opacity-0 [--animation-delay:600ms]">
            <OfferListSection />
          </div>

          <div className="translate-y-[-1rem] animate-fade-up opacity-0 [--animation-delay:800ms]">
            <CouponSection />
          </div>
        </main>

        <footer className="fixed bottom-[38px] left-0 right-0 flex justify-center">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </footer>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] pointer-events-none" />

      <div className="fixed inset-0 flex items-end justify-center pointer-events-auto">
        <DiscountSection />
      </div>
    </div>
  );
};
