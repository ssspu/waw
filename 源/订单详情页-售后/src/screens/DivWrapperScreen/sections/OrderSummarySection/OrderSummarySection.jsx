import React from "react";
import { Button } from "../../../../components/ui/button";

export const OrderSummarySection = () => {
  return (
    <section className="w-full flex flex-col justify-between items-center bg-white shadow-[0px_-1px_0px_#0000000a]">
      <div className="h-[49px] w-full flex justify-between items-center px-2.5 gap-2.5">
        <Button
          variant="outline"
          className="h-[42px] flex-1 [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[16.8px] border-[#e7e7e7] hover:bg-gray-50 transition-colors"
        >
          删除订单
        </Button>

        <Button className="h-[42px] flex-1 bg-[#333333] hover:bg-[#4d4d4d] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs tracking-[0] leading-[16.8px] transition-colors">
          联系商家
        </Button>
      </div>

      <div className="h-[34px] w-full flex items-end justify-center bg-white pb-2">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    </section>
  );
};
