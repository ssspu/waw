import React from "react";
import { Button } from "../../../../components/ui/button";

const navigationItems = [
  {
    icon: "https://c.animaapp.com/mifnbli6udxphC/img/frame-2.svg",
    label: "客服",
    alt: "Customer Service",
  },
  {
    icon: "https://c.animaapp.com/mifnbli6udxphC/img/frame-4.svg",
    label: "店铺",
    alt: "Shop",
  },
  {
    icon: "https://c.animaapp.com/mifnbli6udxphC/img/frame-6.svg",
    label: "收藏",
    alt: "Favorite",
  },
];

export const ImageGallerySection = () => {
  return (
    <footer className="flex flex-col w-full items-start bg-white shadow-[0px_-1px_0px_#0000000a]">
      <nav className="flex w-full h-[49px] items-center justify-center gap-1.5 px-2.5 py-0">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col w-[30.47px] items-center justify-center gap-0.5 transition-opacity hover:opacity-70"
            aria-label={item.alt}
          >
            <img className="w-5 h-5" alt={item.alt} src={item.icon} />
            <span className="w-fit [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-xs leading-[normal] tracking-[0]">
              {item.label}
            </span>
          </button>
        ))}

        <Button className="h-[42px] flex-1 bg-[#333333] hover:bg-[#4d4d4d] items-center justify-center gap-1 px-[15px] py-2 rounded-sm transition-colors">
          <span className="w-fit [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs leading-[normal] tracking-[0]">
            立即预定
          </span>
        </Button>
      </nav>

      <div className="flex flex-col w-full h-[34px] items-center justify-end gap-2.5 px-[120px] py-2 bg-white">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    </footer>
  );
};
