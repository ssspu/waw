import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

export const ProfileSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("designer");

  const tabs = [
    { id: "designer", label: "设计师介绍" },
    { id: "service", label: "服务特色" },
    { id: "environment", label: "环境设施" },
  ];

  return (
    <nav className="w-full px-4 py-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full h-auto bg-transparent p-0 flex items-center justify-between gap-4">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex-1 h-auto bg-transparent p-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none flex flex-col items-center gap-2.5 relative"
            >
              <span
                className={`[font-family:'PingFang_SC-Semibold',Helvetica] text-sm text-center tracking-[0] leading-normal transition-colors ${
                  activeTab === tab.id
                    ? "font-semibold text-black"
                    : "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6]"
                }`}
              >
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <img
                  className="w-2.5 h-[3px]"
                  alt="Active indicator"
                  src="https://c.animaapp.com/mi5eklbiAEaKLJ/img/vector-15.svg"
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
};
