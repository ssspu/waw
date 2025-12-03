import React, { useState } from "react";

const navigationItems = [
  { id: "all", label: "全部" },
  { id: "pending-payment", label: "待付款" },
  { id: "pending-confirm", label: "待确认" },
  { id: "pending-use", label: "待使用" },
  { id: "pending-review", label: "待评价" },
];

export const NavigationBarSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <nav className="flex w-full items-start justify-between px-[15px] py-4">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className="inline-flex flex-col items-center gap-2.5 transition-colors"
        >
          <span
            className={`[font-family:'PingFang_SC-Semibold',Helvetica] text-sm text-center tracking-[0] leading-[normal] ${
              activeTab === item.id
                ? "font-semibold text-black"
                : "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6]"
            }`}
          >
            {item.label}
          </span>

          {activeTab === item.id && (
            <img
              className="w-2.5 h-[3px]"
              alt="Active indicator"
              src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/vector-15.svg"
            />
          )}
        </button>
      ))}
    </nav>
  );
};
