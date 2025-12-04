import React from "react";
import { Button } from "../../../../components/ui/button";

export const VIPSection = (): JSX.Element => {
  return (
    <header className="flex w-full items-center justify-between">
      <h2 className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-normal">
        附近推荐
      </h2>

      <Button
        variant="ghost"
        className="inline-flex items-center gap-0.5 h-auto p-0 hover:bg-transparent"
      >
        <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm text-center tracking-[0] leading-normal">
          筛选
        </span>

        <img
          className="w-2.5 h-2.5"
          alt="Filter icon"
          src="https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-1.svg"
        />
      </Button>
    </header>
  );
};
