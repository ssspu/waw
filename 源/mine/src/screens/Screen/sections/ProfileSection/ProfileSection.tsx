import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const orderItems = [
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-16.svg",
    label: "待付款",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-11.svg",
    label: "待确认",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-8.svg",
    label: "待使用",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-12.svg",
    label: "待评价",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-5.svg",
    label: "退款/售后",
  },
];

const assetItems = [
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-6.svg",
    label: "优惠券",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-10.svg",
    label: "资产",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-9.svg",
    label: "美豆",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-13.svg",
    label: "积分",
  },
];

const settlementItems = [
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame.svg",
    label: "我要入驻",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-2.svg",
    label: "邀请入驻",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-7.svg",
    label: "我要推广",
  },
  {
    icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-1.svg",
    label: "个人设置",
  },
];

export const ProfileSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-[355px] items-start gap-2">
      <Card className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <CardContent className="flex flex-col items-start gap-2.5 p-3">
          <header className="flex items-center justify-between w-full">
            <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-[13px] tracking-[0] leading-[normal]">
              我的订单
            </h2>

            <button className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-70">
              <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-sm text-center tracking-[0] leading-[normal]">
                全部订单
              </span>
              <ChevronRightIcon className="w-3.5 h-3.5 text-[#666666]" />
            </button>
          </header>

          <nav className="flex items-center justify-between px-[5px] w-full">
            {orderItems.map((item, index) => (
              <button
                key={index}
                className="flex flex-col w-11 items-center gap-1.5 transition-opacity hover:opacity-70"
              >
                <img className="w-6 h-6" alt={item.label} src={item.icon} />
                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] text-center tracking-[0] leading-[normal]">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>

      <Card className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <CardContent className="flex flex-col items-start gap-2.5 p-3">
          <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-[13px] tracking-[0] leading-[normal]">
            我的资产
          </h2>

          <nav className="flex items-center justify-between px-[5px] w-full">
            {assetItems.map((item, index) => (
              <button
                key={index}
                className="flex flex-col w-11 items-center gap-1.5 transition-opacity hover:opacity-70"
              >
                <img className="w-6 h-6" alt={item.label} src={item.icon} />
                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] text-center tracking-[0] leading-[normal]">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>

      <Card className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
        <CardContent className="flex flex-col items-start gap-2.5 p-3">
          <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-[13px] tracking-[0] leading-[normal]">
            入驻中心
          </h2>

          <nav className="flex items-center justify-between px-[5px] w-full">
            {settlementItems.map((item, index) => (
              <button
                key={index}
                className="flex flex-col w-11 items-center gap-1.5 transition-opacity hover:opacity-70"
              >
                <img className="w-6 h-6" alt={item.label} src={item.icon} />
                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] text-center tracking-[0] leading-[normal]">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </section>
  );
};
