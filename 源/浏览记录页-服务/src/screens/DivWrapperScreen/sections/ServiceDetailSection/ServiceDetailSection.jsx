import React from "react";

export const ServiceDetailSection = () => {
  const tabs = [
    {
      id: "service",
      label: "服务浏览",
      active: true,
    },
    {
      id: "brand",
      label: "品牌馆浏览",
      active: false,
    },
    {
      id: "children",
      label: "儿童",
      active: false,
      hidden: true,
    },
    {
      id: "nail",
      label: "美甲",
      active: false,
      hidden: true,
    },
  ];

  return (
    <nav className="w-full flex items-center justify-center py-6">
      <div className="flex items-center gap-[46px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex flex-col items-center gap-2 ${
              tab.hidden ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <span
              className={`text-sm tracking-[0] leading-[19.6px] whitespace-nowrap ${
                tab.active
                  ? "[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black"
                  : "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6]"
              }`}
            >
              {tab.label}
            </span>
            {tab.active && (
              <img
                className="h-[2.5px] w-2.5"
                alt="Active indicator"
                src="https://c.animaapp.com/mioajbhy6jLOdi/img/vector-15.svg"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
