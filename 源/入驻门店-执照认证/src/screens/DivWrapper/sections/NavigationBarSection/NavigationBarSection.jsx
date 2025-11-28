import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

const navigationItems = [
  { id: "store", label: "门店认证" },
  { id: "license", label: "执照认证" },
  { id: "agreement", label: "合作协议" },
  { id: "settlement", label: "结算信息" },
];

export const NavigationBarSection = () => {
  return (
    <nav className="flex justify-center w-full">
      <Tabs defaultValue="license" className="w-auto">
        <TabsList className="inline-flex items-center gap-[38px] bg-transparent h-auto p-0">
          {navigationItems.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="relative w-fit [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[13px] tracking-[0] leading-[normal] data-[state=active]:[font-family:'PingFang_SC-Semibold',Helvetica] data-[state=active]:text-black data-[state=active]:text-center bg-transparent shadow-none border-none p-0 h-auto transition-colors"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
};
