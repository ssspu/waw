import React, { useState } from "react";

const navigationItems = [
  { id: 1, label: "身份认证", active: true },
  { id: 2, label: "职业认证", active: false },
  { id: 3, label: "合作协议", active: false },
  { id: 4, label: "结算信息", active: false },
];

export const NavigationSection = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <nav className="flex items-center justify-center gap-[38px] w-full">
      {navigationItems.map((item, index) => (
        <button
          key={item.id}
          onClick={() => setActiveId(item.id)}
          className={`relative w-fit [font-family:'PingFang_SC-${
            activeId === item.id ? "Semibold" : "Regular"
          }',Helvetica] font-normal text-[13px] tracking-[0] leading-[normal] transition-colors ${
            activeId === item.id ? "text-black" : "text-[#a6a6a6]"
          } hover:text-black cursor-pointer translate-y-[-1rem] animate-fade-in opacity-0`}
          style={{ "--animation-delay": `${index * 100}ms` }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};
