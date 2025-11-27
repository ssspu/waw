import { XIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const coupons = [
  {
    amount: "10",
    minSpend: "满300元使用",
    title: "洗剪吹优惠券",
    description: "服务类产品均可使用",
    startDate: "2020.05.05",
    endDate: "2020.11.05",
    claimed: "0张",
    remaining: "1000张",
  },
  {
    amount: "50",
    minSpend: "满300元使用",
    title: "洗剪吹优惠券",
    description: "服务类产品均可使用",
    startDate: "2020.05.05",
    endDate: "2020.11.05",
    claimed: "0张",
    remaining: "1000张",
  },
  {
    amount: "120",
    minSpend: "满1000元使用",
    title: "洗剪吹优惠券",
    description: "服务类产品均可使用",
    startDate: "2020.05.05",
    endDate: "2020.11.05",
    claimed: "0张",
    remaining: "1000张",
  },
];

export const DiscountSection = () => {
  return (
    <section className="flex flex-col w-full max-w-[375px] mx-auto items-center bg-[#f6f6f6] rounded-lg">
      <div className="flex flex-col items-center justify-center gap-px w-full">
        <header className="flex items-center justify-between pl-[164px] pr-[15px] py-[15px] w-full bg-white rounded-[8px_8px_0px_0px]">
          <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-[17px] text-center leading-[normal] tracking-[0]">
            优惠券
          </h2>
          <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
            <XIcon className="w-[13px] h-[13px]" />
          </Button>
        </header>

        <div className="flex flex-col w-full items-center justify-center gap-2 pt-[15px] pb-[110px] bg-white rounded-[8px_8px_0px_0px]">
          <div className="flex flex-col w-full max-w-[363px] items-start gap-1.5">
            {coupons.map((coupon, index) => (
              <Card
                key={index}
                className="w-full border-0 shadow-none bg-transparent"
              >
                <CardContent className="flex flex-col items-center justify-center gap-2 px-[9px] py-2.5 relative">
                  <img
                    className="absolute top-0 left-0 w-full h-[91px]"
                    alt="Coupon background"
                    src="https://c.animaapp.com/mifjz2qhRjR77t/img/subtract-1.svg"
                  />

                  <div className="flex items-center justify-between w-full relative z-10">
                    <div className="inline-flex items-center gap-[15px]">
                      <div className="flex w-[69px] items-center justify-between pl-1 pr-0 py-0">
                        <div className="inline-flex flex-col items-center gap-0.5">
                          <div className="inline-flex items-end">
                            <span className="text-base text-right [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] tracking-[0] leading-[normal]">
                              ¥
                            </span>
                            <span className="[font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-[21px] text-right whitespace-nowrap tracking-[0] leading-[normal]">
                              {coupon.amount}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 w-full">
                            <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] leading-[normal] tracking-[0]">
                              {coupon.minSpend}
                            </span>
                          </div>
                        </div>
                        <img
                          className="self-stretch w-px mr-[-0.50px]"
                          alt="Divider"
                          src="https://c.animaapp.com/mifjz2qhRjR77t/img/vector-25.svg"
                        />
                      </div>

                      <div className="inline-flex flex-col items-start gap-0.5">
                        <div className="flex items-start gap-2 w-full">
                          <h3 className="text-black text-[15px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal tracking-[0] leading-[normal]">
                            {coupon.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 w-full">
                          <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] leading-[normal] tracking-[0]">
                            {coupon.description}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-1.5">
                          <time className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                            {coupon.startDate}
                          </time>
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] leading-[normal] tracking-[0]">
                            -
                          </span>
                          <time className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                            {coupon.endDate}
                          </time>
                        </div>
                        <div className="inline-flex items-center gap-1.5">
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#d9d9d9] text-[10px] leading-[normal] tracking-[0]">
                            已领取:{coupon.claimed}
                          </span>
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#d9d9d9] text-[10px] leading-[normal] tracking-[0]">
                            剩余:{coupon.remaining}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex flex-col items-center justify-center gap-[3px]">
                      <Button className="w-[74px] h-[30px] bg-[#333333] hover:bg-[#4d4d4d] rounded-sm px-[15px] py-2">
                        <span className="text-white text-[11px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal tracking-[0] leading-[normal]">
                          领取
                        </span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex flex-col items-center justify-center gap-2.5 px-[79px] py-1 w-full bg-white">
              <div className="inline-flex h-[30px] items-center justify-center gap-2.5">
                <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-xs text-center leading-[normal] tracking-[0]">
                  没有更多了...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="inline-flex flex-col items-start">
        <div className="flex flex-col w-full max-w-[375px] h-[34px] items-center justify-end gap-2.5 px-[120px] py-2 bg-white">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>
    </section>
  );
};
