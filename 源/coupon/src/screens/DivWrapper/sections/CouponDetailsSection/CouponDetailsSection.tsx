import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const couponsData = [
  {
    id: 1,
    amount: "30",
    requirement: "满300元使用",
    title: "护理优惠券",
    description: "服务类产品均可使用",
    startDate: "2020.05.05",
    endDate: "2020.11.05",
    location: "限成都武侯沙龙美容美发店",
  },
  {
    id: 2,
    amount: "30",
    requirement: "满300元使用",
    title: "护理优惠券",
    description: "服务类产品均可使用",
    startDate: "2020.05.05",
    endDate: "2020.11.05",
    location: "限成都武侯沙龙美容美发店",
  },
  {
    id: 3,
    amount: "30",
    requirement: "满300元使用",
    title: "护理优惠券",
    description: "服务类产品均可使用",
    startDate: "2020.05.05",
    endDate: "2020.11.05",
    location: "限成都武侯沙龙美容美发店",
  },
  {
    id: 4,
    amount: "30",
    requirement: "满300元使用",
    title: "护理优惠券",
    description: "服务类产品均可使用",
    startDate: "2020.05.05",
    endDate: "2020.11.05",
    location: "限成都武侯沙龙美容美发店",
  },
  {
    id: 5,
    amount: "30",
    requirement: "满300元使用",
    title: "护理优惠券",
    description: "服务类产品均可使用",
    startDate: "2020.05.05",
    endDate: "2020.11.05",
    location: "限成都武侯沙龙美容美发店",
  },
  {
    id: 6,
    amount: "30",
    requirement: "满300元使用",
    title: "护理优惠券",
    description: "服务类产品均可使用",
    startDate: "2020.05.05",
    endDate: "2020.11.05",
    location: "限成都武侯沙龙美容美发店",
  },
  {
    id: 7,
    amount: "30",
    requirement: "满300元使用",
    title: "护理优惠券",
    description: "服务类产品均可使用",
    startDate: "2020.05.05",
    endDate: "2020.11.05",
    location: "限成都武侯沙龙美容美发店",
  },
];

export const CouponDetailsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-2.5 px-4 py-2">
      {couponsData.map((coupon, index) => (
        <Card
          key={coupon.id}
          className="relative w-full border-0 shadow-none bg-transparent translate-y-[-1rem] animate-fade-in opacity-0"
          style={
            { "--animation-delay": `${index * 100}ms` } as React.CSSProperties
          }
        >
          <CardContent className="relative p-0 overflow-hidden rounded-lg">
            <img
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
              alt="Coupon background"
              src="https://c.animaapp.com/mi5m9weyYgJtGL/img/subtract.svg"
            />

            <div className="flex items-center justify-between relative z-10 px-[9px] py-2.5">

              <div className="inline-flex items-center gap-[15px]">
                <div className="flex w-[69px] items-center justify-between pl-1 pr-0 py-0 self-stretch">
                  <div className="inline-flex flex-col items-center gap-0.5">
                    <div className="inline-flex items-end">
                      <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-base text-right tracking-[0] leading-[normal]">
                        ¥
                      </span>

                      <span className="mt-[-1.00px] [font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-[21px] text-right tracking-[0] leading-[normal] whitespace-nowrap">
                        {coupon.amount}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 w-full">
                      <span className="mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] tracking-[0] leading-[normal]">
                        {coupon.requirement}
                      </span>
                    </div>
                  </div>

                  <img
                    className="self-stretch w-px mr-[-0.50px]"
                    alt="Vector"
                    src="https://c.animaapp.com/mi5m9weyYgJtGL/img/vector-25.svg"
                  />
                </div>

                <div className="inline-flex flex-col items-start gap-0.5">
                  <div className="flex items-start gap-2 w-full">
                    <h3 className="mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[normal]">
                      {coupon.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 w-full">
                    <p className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      {coupon.description}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5">
                    <time className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      {coupon.startDate}
                    </time>

                    <span className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      -
                    </span>

                    <time className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      {coupon.endDate}
                    </time>
                  </div>

                  <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#d9d9d9] text-[10px] tracking-[0] leading-[normal]">
                    {coupon.location}
                  </p>
                </div>
              </div>

              <div className="inline-flex flex-col items-center justify-center gap-[3px]">
                <Button
                  className="w-[74px] h-[30px] bg-[#333333] hover:bg-[#4d4d4d] rounded-sm transition-colors"
                  size="sm"
                >
                  <span className="mt-[-1.50px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-[11px] tracking-[0] leading-[normal]">
                    去使用
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
