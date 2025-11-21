import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const categories = [
  { id: "wash-cut-blow", label: "洗剪吹", active: true },
  { id: "perm", label: "烫发", active: false },
  { id: "dye", label: "染发", active: false },
  { id: "care", label: "护发", active: false },
  { id: "scalp", label: "头皮", active: false },
  { id: "extension", label: "接发", active: false },
];

const services = [
  {
    id: 1,
    title: "烫发",
    description: "发型提案+染发+造型",
    estimatedTime: "1小时",
    salesCount: "1234",
    price: "799",
    discount: "预约优惠10%",
    image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
    hasOptions: false,
  },
  {
    id: 2,
    title: "烫发",
    description: "发型提案+染发+造型",
    estimatedTime: "1小时",
    salesCount: "1234",
    price: "799",
    discount: "预约优惠10%",
    image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
    hasOptions: false,
  },
  {
    id: 3,
    title: "烫发",
    description: "发型提案+染发+造型",
    estimatedTime: "1小时",
    salesCount: "1234",
    price: "799",
    discount: "预约优惠10%",
    image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
    hasOptions: true,
  },
  {
    id: 4,
    title: "烫发",
    description: "发型提案+染发+造型",
    estimatedTime: "1小时",
    salesCount: "1234",
    price: "799",
    discount: "预约优惠10%",
    image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
    hasOptions: false,
  },
];

const hairLengthOptions = [
  { id: "short", label: "短发", active: true },
  { id: "medium", label: "中发", active: false },
  { id: "long", label: "长发", active: false },
];

const brandOptions = [
  {
    id: 1,
    name: "威娜",
    price: "560",
    icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-7.svg",
  },
  {
    id: 2,
    name: "菲灵",
    price: "660",
    icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-3.svg",
  },
  {
    id: 3,
    name: "欧莱雅",
    price: "760",
    icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-3.svg",
  },
  {
    id: 4,
    name: "乔薇尔",
    price: "860",
    icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-3.svg",
  },
];

export const ProfileSection = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState("wash-cut-blow");
  const [selectedHairLength, setSelectedHairLength] = useState("short");

  return (
    <section className="flex flex-col w-full max-w-[363px] mx-auto items-start gap-1.5 opacity-0 animate-fade-in">
      <nav className="inline-flex items-center gap-1.5 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={`h-auto px-2.5 py-1 rounded-sm transition-colors ${
              selectedCategory === category.id
                ? "bg-[#333333] text-white hover:bg-[#333333]/90"
                : "bg-white text-[#a6a6a6] hover:bg-gray-50"
            }`}
          >
            <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[13px] tracking-[0] leading-[normal]">
              {category.label}
            </span>
          </Button>
        ))}
      </nav>

      {services.map((service, index) => (
        <Card
          key={service.id}
          className="w-full bg-white rounded-md border-0 shadow-none"
        >
          <CardContent className={`p-2.5 ${service.hasOptions ? "pb-2" : ""}`}>
            <div className="flex items-start gap-2">
              <img
                className="w-20 h-20 rounded-sm object-cover"
                alt={service.title}
                src={service.image}
              />

              <div className="flex items-end justify-between flex-1">
                <div className="inline-flex flex-col items-start gap-[3px]">
                  <h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base leading-[normal] tracking-[0]">
                    {service.title}
                  </h3>

                  <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[normal] tracking-[0]">
                    {service.description}
                  </p>

                  <div className="inline-flex items-start gap-[3px]">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[normal] tracking-[0]">
                      预计时间:
                    </span>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[normal] tracking-[0]">
                      {service.estimatedTime}
                    </span>
                  </div>

                  <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[normal] tracking-[0]">
                    已售{service.salesCount}
                  </p>
                </div>

                <div
                  className={`flex flex-col items-end justify-between ${
                    service.hasOptions ? "flex-1" : "w-[121px]"
                  } self-stretch`}
                >
                  <div className="flex flex-col items-end justify-center gap-0.5 w-full">
                    <div className="inline-flex items-end">
                      <span className="text-sm [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] tracking-[0] leading-[normal]">
                        ¥
                      </span>
                      <span className="[font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-lg whitespace-nowrap tracking-[0] leading-[normal]">
                        {service.price}
                      </span>
                    </div>

                    <div className="inline-flex items-center justify-center gap-1 bg-white rounded-sm">
                      <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffa77b] text-[10px] leading-[normal] tracking-[0]">
                        {service.discount}
                      </span>
                    </div>
                  </div>

                  {!service.hasOptions ? (
                    <Button
                      size="sm"
                      className="h-[30px] px-[15px] py-2 bg-[#333333] hover:bg-[#333333]/90 rounded-sm transition-colors"
                    >
                      <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#ffa77b] text-[11px] leading-[normal] tracking-[0]">
                        在线预订
                      </span>
                    </Button>
                  ) : (
                    <img
                      className="w-[74px] h-[30px]"
                      alt="Frame"
                      src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1811.svg"
                    />
                  )}
                </div>
              </div>
            </div>

            {service.hasOptions && (
              <div className="flex flex-col items-start gap-[11px] mt-2.5">
                <div className="flex items-center gap-[9px] w-full">
                  {hairLengthOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant="ghost"
                      onClick={() => setSelectedHairLength(option.id)}
                      className={`flex-1 h-[35px] px-[42px] py-2 transition-colors ${
                        selectedHairLength === option.id
                          ? "bg-[#333333] text-white hover:bg-[#333333]/90"
                          : "bg-[#f6f6f6] text-[#333333] hover:bg-[#f6f6f6]/80"
                      }`}
                    >
                      <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[11px] leading-[normal] tracking-[0]">
                        {option.label}
                      </span>
                    </Button>
                  ))}
                </div>

                <div className="flex flex-col items-start gap-[15px] px-2.5 w-full">
                  {brandOptions.map((brand) => (
                    <div
                      key={brand.id}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          className="w-[22px] h-[22px]"
                          alt={brand.name}
                          src={brand.icon}
                        />
                        <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal]">
                          {brand.name}
                        </span>
                      </div>

                      <div className="inline-flex items-center">
                        <span className="text-[13px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] tracking-[0] leading-[normal]">
                          ¥
                        </span>
                        <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[15px] tracking-[0] leading-[normal]">
                          {brand.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="h-[42px] w-full px-[15px] py-2 bg-[#333333] hover:bg-[#333333]/90 rounded-sm transition-colors"
                >
                  <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#ffa77b] text-xs leading-[normal] tracking-[0]">
                    在线预订
                  </span>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
