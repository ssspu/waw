import { CrownIcon } from "lucide-react";
import React from "react";

export const MenuSection = (): JSX.Element => {
  return (
    <div className="flex flex-col items-end gap-[3px] px-1.5 py-[5px] rounded-2xl bg-gradient-to-b from-[#d0c1a7] to-[#887d6b] w-fit opacity-0 animate-fade-in [--animation-delay:200ms]">
      <div className="flex flex-col items-start justify-center">
        <div className="inline-flex items-center justify-end gap-1">
          <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs text-center tracking-[0] leading-normal">
            VIP会员专享
          </div>

          <CrownIcon className="w-4 h-4 text-white fill-white" />
        </div>

        <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-white/60 text-[9px] tracking-[0] leading-normal whitespace-nowrap">
          超值补贴优惠专享
        </div>
      </div>
    </div>
  );
};
