import React from "react";
import { Button } from "../../../../components/ui/button";

const navigationItems = [
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-4.svg",
    label: "服务",
    fontClass: "[font-family:'PingFang_SC-Regular',Helvetica]",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-15.svg",
    label: "消息",
    fontClass: "[font-family:'PingFang_SC-Regular',Helvetica]",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-14.svg",
    label: "我的",
    fontClass: "[font-family:'PingFang_SC-Semibold',Helvetica]",
  },
];

export const DashboardSection = (): JSX.Element => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex flex-col w-full items-start bg-white shadow-[0px_-1px_0px_#0000000a] z-30">
      <div className="flex flex-col w-full h-[49px] items-center justify-end px-[15px] py-0">
        <div className="flex h-[49px] items-end justify-around w-full">
          <div className="flex items-end justify-between w-full h-[49px]">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex flex-col w-11 h-auto items-center justify-end gap-[3px] p-0 hover:bg-transparent"
              >
                <img
                  className="w-[25px] h-[25px]"
                  alt={item.label}
                  src={item.icon}
                />
                <span
                  className={`${item.fontClass} font-normal text-[#333333] text-[11px] text-center tracking-[0] leading-[normal]`}
                >
                  {item.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-[34px] items-center justify-end gap-2.5 px-[120px] py-2 bg-white">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    </nav>
  );
};
