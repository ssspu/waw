import { ChevronLeftIcon, CircleIcon, MoreHorizontalIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { ItemDetailsSection } from "./sections/ItemDetailsSection";
import { OrderSummarySection } from "./sections/OrderSummarySection";
import { PaymentDetailsSection } from "./sections/PaymentDetailsSection";

export const DivWrapperScreen = () => {
  return (
    <main
      className="bg-[#f2f2f2] w-full min-w-[375px] min-h-[812px] flex flex-col relative"
      data-model-id="29:603"
    >
      <header className="w-full bg-white relative z-10">
        <div className="w-full h-11 flex items-center justify-between px-4 -ml-3.5">
          <div className="w-full flex items-center justify-center">
            <div className="h-11 w-full max-w-[384.17px] relative flex items-center justify-between">
              <time className="ml-[34px] [font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[19.6px]">
                9:41
              </time>

              <div className="flex items-center gap-1.5 mr-4">
                <img
                  className="w-[17px] h-[11px]"
                  alt="Cellular connection"
                  src="https://c.animaapp.com/mioaih5maExP45/img/cellular-connection.svg"
                />
                <img
                  className="w-[15px] h-[11px]"
                  alt="Wifi"
                  src="https://c.animaapp.com/mioaih5maExP45/img/wifi.svg"
                />
                <img
                  className="w-[25px] h-[11px]"
                  alt="Battery"
                  src="https://c.animaapp.com/mioaih5maExP45/img/battery.png"
                />
              </div>
            </div>
          </div>
        </div>

        <nav className="w-full h-[100px] flex items-center justify-between px-4 relative">
          <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
            <ChevronLeftIcon className="w-4 h-4 text-black" />
          </Button>

          <h1 className="absolute left-[38px] top-[42px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] tracking-[0] leading-[21px]">
            订单详情
          </h1>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
              <MoreHorizontalIcon className="w-6 h-6 text-black" />
            </Button>
            <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
              <CircleIcon className="w-6 h-6 text-black" />
            </Button>
          </div>
        </nav>
      </header>

      <div className="flex-1 flex flex-col w-full">
        <PaymentDetailsSection />
        <ItemDetailsSection />
      </div>

      <OrderSummarySection />
    </main>
  );
};
