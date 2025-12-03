import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

const topNavItems = [
  { label: "设计师", active: true },
  { label: "品牌馆", active: false },
];

const tabItems = [
  { value: "hairstylist", label: "美发师" },
  { value: "beautician", label: "美容师" },
  { value: "makeup", label: "化妆师" },
  { value: "nail", label: "美甲师" },
  { value: "body", label: "美体师" },
];

export const HeaderSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-2.5 px-[15px] pt-[95px]">
      <nav className="flex w-full items-center gap-5">
        {topNavItems.map((item, index) => (
          <button
            key={index}
            className={`mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-sm text-center tracking-[0] leading-[normal] transition-colors ${
              item.active ? "text-black" : "text-[#666666]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <Tabs defaultValue="hairstylist" className="w-full">
        <TabsList className="flex items-start justify-between w-full h-auto bg-transparent p-0 gap-0">
          {tabItems.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="inline-flex flex-col h-[31px] items-center gap-2.5 data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent bg-transparent p-0 data-[state=active]:shadow-none transition-colors"
            >
              <span
                className={`mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] text-sm text-center tracking-[0] leading-[normal] data-[state=active]:text-black data-[state=inactive]:text-[#a6a6a6] ${
                  item.value === "hairstylist"
                    ? "font-normal text-black"
                    : "font-medium text-[#a6a6a6]"
                }`}
              >
                {item.label}
              </span>
              {item.value === "hairstylist" && (
                <img
                  className="w-2.5 h-[3px] mb-[-0.50px]"
                  alt="Active indicator"
                  src="https://c.animaapp.com/mi5ng54v4eM3X6/img/vector-15.svg"
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </section>
  );
};
