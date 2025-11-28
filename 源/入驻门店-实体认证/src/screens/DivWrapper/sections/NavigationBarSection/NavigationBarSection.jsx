import React from "react";

const navigationItems = [
  {
    label: "门店认证",
    isActive: true,
  },
  {
    label: "执照认证",
    isActive: false,
  },
  {
    label: "合作协议",
    isActive: false,
  },
  {
    label: "结算信息",
    isActive: false,
  },
];

export const NavigationBarSection = () => {
  return (
    <nav className="flex items-center justify-center gap-[38px] w-full">
      {navigationItems.map((item, index) => (
        <button
          key={index}
          className={`w-fit [font-family:'PingFang_SC-${item.isActive ? "Semibold" : "Regular"}',Helvetica] font-normal ${item.isActive ? "text-black" : "text-[#a6a6a6]"} text-[13px] tracking-[0] leading-[normal] transition-colors hover:text-black cursor-pointer`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};
