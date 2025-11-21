import React from "react";
import { Badge } from "../../../../components/ui/badge";
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
    status: "已过期",
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
    status: "已使用",
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
    status: "已使用",
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
    status: "已使用",
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
    status: "已使用",
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
    status: "已使用",
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
    status: "已使用",
  },
];

export const CouponDetailsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-1.5">
      {couponsData.map((coupon, index) => (
        <Card
          key={coupon.id}
          className="relative w-full border-0 shadow-none translate-y-[-1rem] animate-fade-in opacity-0"
          style={
            { "--animation-delay": `${index * 100}ms` } as React.CSSProperties
          }
        >
          <CardContent className="flex flex-col items-center justify-center gap-2 px-[9px] py-2.5 p-0">
            <img
              className="absolute top-0 left-0 w-full h-[91px]"
              alt="Subtract"
              src="https://c.animaapp.com/mi5mjnswM14oP7/img/subtract.svg"
            />

            <div className="flex items-center justify-between relative w-full">
              <div className="inline-flex items-center gap-[15px]">
                <div className="flex w-[69px] items-center justify-between pl-1 pr-0 py-0 self-stretch">
                  <div className="inline-flex flex-col items-center gap-0.5">
                    <div className="inline-flex items-end">
                      <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#a6a6a6] text-base text-right tracking-[0] leading-[normal]">
                        ¥
                      </span>
                      <span className="mt-[-1.00px] [font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#a6a6a6] text-[21px] text-right tracking-[0] leading-[normal] whitespace-nowrap">
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
                    src="https://c.animaapp.com/mi5mjnswM14oP7/img/vector-25.svg"
                  />
                </div>

                <div className="inline-flex flex-col items-start gap-0.5">
                  <div className="flex items-start gap-2 w-full">
                    <span className="mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#a6a6a6] text-[15px] tracking-[0] leading-[normal]">
                      {coupon.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 w-full">
                    <span className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      {coupon.description}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5">
                    <span className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      {coupon.startDate}
                    </span>
                    <span className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      -
                    </span>
                    <span className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      {coupon.endDate}
                    </span>
                  </div>

                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#d9d9d9] text-[10px] tracking-[0] leading-[normal]">
                    {coupon.location}
                  </span>
                </div>
              </div>

              <div className="inline-flex flex-col items-center justify-center gap-[3px]">
                <Badge className="flex w-[74px] h-[30px] items-center justify-center gap-1 px-[15px] py-2 bg-[#a6a6a6] rounded-sm hover:bg-[#a6a6a6]">
                  <span className="mt-[-1.50px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-[11px] tracking-[0] leading-[normal]">
                    {coupon.status}
                  </span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
