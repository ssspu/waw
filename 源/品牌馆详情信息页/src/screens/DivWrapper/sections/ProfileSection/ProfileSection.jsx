import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

const tabItems = [
  { id: "brand", label: "品牌介绍" },
  { id: "service", label: "服务特色" },
  { id: "environment", label: "环境设施" },
];

export const ProfileSection = () => {
  return (
    <nav className="w-full px-4 py-6">
      <Tabs defaultValue="brand" className="w-full">
        <TabsList className="w-full h-auto bg-transparent p-0 grid grid-cols-3 gap-0">
          {tabItems.map((item, index) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="relative h-auto pb-2 px-0 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-0 rounded-none"
            >
              <div className="flex flex-col items-center gap-2.5">
                <span
                  className={`text-sm text-center tracking-[0] leading-[normal] ${
                    index === 0
                      ? "[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black"
                      : "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6]"
                  }`}
                >
                  {item.label}
                </span>
                {index === 0 && (
                  <img
                    className="w-2.5 h-[3px]"
                    alt="Active indicator"
                    src="https://c.animaapp.com/mifk10s9DhCORZ/img/vector-15.svg"
                  />
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
};
