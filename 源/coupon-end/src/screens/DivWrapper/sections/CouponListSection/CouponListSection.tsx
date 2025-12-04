import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

const tabItems = [
  { value: "coupons", label: "优惠券" },
  { value: "product-vouchers", label: "商品券" },
  { value: "ended", label: "已结束" },
];

export const CouponListSection = (): JSX.Element => {
  return (
    <nav className="w-full px-4 py-6">
      <Tabs defaultValue="ended" className="w-full">
        <TabsList className="w-full h-auto bg-transparent p-0 grid grid-cols-3 gap-0">
          {tabItems.map((item, index) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={`
                h-auto py-0 px-0 
                [font-family:'PingFang_SC-Medium',Helvetica] 
                font-medium 
                text-sm 
                text-center 
                tracking-[0] 
                leading-normal
                data-[state=inactive]:text-[#a6a6a6]
                data-[state=active]:text-black
                data-[state=active]:[font-family:'PingFang_SC-Semibold',Helvetica]
                data-[state=active]:font-normal
                data-[state=inactive]:bg-transparent
                data-[state=active]:bg-transparent
                data-[state=inactive]:shadow-none
                data-[state=active]:shadow-none
                relative
                flex
                flex-col
                items-center
                gap-2.5
                transition-colors
              `}
            >
              <span className="mt-[-1px]">{item.label}</span>
              {item.value === "ended" && (
                <img
                  className="w-2.5 h-[3px] mb-[-0.5px]"
                  alt="Active indicator"
                  src="https://c.animaapp.com/mi5mjnswM14oP7/img/vector-15.svg"
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
};
