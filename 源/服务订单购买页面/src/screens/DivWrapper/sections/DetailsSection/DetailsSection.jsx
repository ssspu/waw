import { XIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";

export const DetailsSection = () => {
  return (
    <section className="relative w-full h-full flex flex-col justify-between">
      <div className="flex justify-start p-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-[30px] h-[30px] p-0 hover:bg-transparent"
        >
          <XIcon className="w-[30px] h-[30px] text-white" strokeWidth={2} />
        </Button>
      </div>

      <div className="flex justify-center pb-4">
        <Badge
          variant="secondary"
          className="inline-flex items-center gap-[3px] px-3 py-1 bg-[#00000033] rounded-[17px] border-0 hover:bg-[#00000033]"
        >
          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-normal">
            2
          </span>
          <span className="text-[#ffffffc7] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-xs tracking-[0] leading-normal">
            /6
          </span>
        </Badge>
      </div>
    </section>
  );
};
