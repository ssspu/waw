import React from "react";
import { Button } from "../../../../components/ui/button";

const navigationItems = [
  {
    icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2.svg",
    label: "服务",
    isActive: true,
  },
  {
    icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame.svg",
    label: "消息",
    isActive: false,
  },
  {
    icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-1.svg",
    label: "我的",
    isActive: false,
  },
];

export const GallerySection = (): JSX.Element => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex flex-col w-full items-start bg-white shadow-[0px_-1px_0px_#0000000a] z-50">
      <div className="flex flex-col w-full items-center justify-end px-[15px] py-0">
        <div className="flex h-[49px] items-end justify-around w-full">
          <div className="flex-col w-full items-center justify-end px-[15px] py-0 ml-[-15.00px] mr-[-15.00px] flex h-[49px]">
            <div className="items-end justify-between w-full flex h-[49px]">
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
                    className={`w-fit text-[11px] text-center ${
                      item.isActive
                        ? "[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333]"
                        : "[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#333333]"
                    }`}
                  >
                    {item.label}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-[34px] items-center justify-end gap-2.5 px-[120px] py-2 bg-white">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    </nav>
  );
};
