import React from "react";
import { Button } from "../../../../components/ui/button";

export const FormContainerSection = () => {
  return (
    <footer className="flex flex-col w-full items-start bg-white shadow-[0px_-1px_0px_#0000000a]">
      <nav className="flex w-full items-center justify-center gap-1.5 px-2.5 py-[3.5px]">
        <Button
          variant="outline"
          className="h-[42px] flex-1 gap-1 px-[15px] py-2 rounded border border-solid border-[#e7e7e7] bg-white hover:bg-gray-50 transition-colors"
        >
          <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[normal]">
            上一步
          </span>
        </Button>

        <Button className="h-[42px] flex-1 gap-1 px-[15px] py-2 bg-[#333333] hover:bg-[#4d4d4d] rounded-sm transition-colors">
          <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs tracking-[0] leading-[normal]">
            下一步
          </span>
        </Button>
      </nav>

      <div className="flex flex-col w-full h-[34px] items-center justify-end gap-2.5 px-[120px] py-2 bg-white">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    </footer>
  );
};
