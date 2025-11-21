import React, { useState } from "react";

const tabItems = [
  { id: "service", label: "服务券" },
  { id: "product", label: "商品券" },
  { id: "ended", label: "已结束" },
];

export const CouponListSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("service");

  return (
    <nav className="flex w-full items-start justify-between px-4 pt-2 pb-0 bg-white">
      {tabItems.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className="inline-flex flex-col items-center gap-1 relative transition-colors pb-2"
        >
          <span
            className={`relative w-fit [font-family:'PingFang_SC-Semibold',Helvetica] text-sm text-center tracking-[0] leading-[normal] ${
              activeTab === tab.id
                ? "font-semibold text-black"
                : "font-medium text-[#a6a6a6]"
            }`}
          >
            {tab.label}
          </span>

          {activeTab === tab.id && (
            <img
              className="absolute bottom-0 w-2.5 h-[3px]"
              alt="Active indicator"
              src="https://c.animaapp.com/mi5m9weyYgJtGL/img/vector-15.svg"
            />
          )}
        </button>
      ))}
    </nav>
  );
};
