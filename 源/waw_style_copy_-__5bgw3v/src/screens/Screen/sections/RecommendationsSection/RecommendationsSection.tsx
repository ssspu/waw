import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const recommendationCards = [
  {
    id: "vip",
    title: "会员特区",
    subtitle: "VIP精选优服务",
    icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2288-1.svg",
    size: "large",
  },
  {
    id: "package",
    title: "套餐优选",
    subtitle: "套餐项目更实惠",
    icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2288.svg",
    size: "small",
  },
  {
    id: "haircare",
    title: "防脱护理",
    subtitle: "头皮保养和防护",
    icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2288-2.svg",
    size: "small",
  },
];

export const RecommendationsSection = (): JSX.Element => {
  return (
    <section className="flex w-full max-w-[363.5px] items-center gap-1.5 p-2.5 bg-white rounded-md">
      <Card className="flex-1 h-[150px] border-0 shadow-none bg-[linear-gradient(180deg,rgba(246,246,246,1)_0%,rgba(255,255,255,1)_100%)] rounded overflow-hidden opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
        <CardContent className="relative flex flex-col h-full items-start justify-end gap-2.5 p-3">
          <div className="flex flex-col items-start justify-end gap-[5px] w-full z-10">
            <h3 className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
              {recommendationCards[0].title}
            </h3>
            <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] text-center tracking-[0] leading-[normal]">
              {recommendationCards[0].subtitle}
            </p>
          </div>
          <img
            className="absolute top-[7px] left-[38px] w-[88px] h-[88px]"
            alt={recommendationCards[0].title}
            src={recommendationCards[0].icon}
          />
        </CardContent>
      </Card>

      <div className="flex flex-col items-start gap-1.5 flex-1">
        {recommendationCards.slice(1).map((card, index) => (
          <Card
            key={card.id}
            className="w-full h-[72px] border-0 shadow-none bg-[linear-gradient(180deg,rgba(246,246,246,1)_0%,rgba(255,255,255,1)_100%)] rounded opacity-0 translate-y-[-1rem] animate-fade-in"
            style={
              {
                "--animation-delay": `${(index + 1) * 200}ms`,
              } as React.CSSProperties
            }
          >
            <CardContent className="flex h-full items-end justify-center gap-2.5 p-3">
              <div className="inline-flex flex-col items-start gap-[5px]">
                <h3 className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                  {card.title}
                </h3>
                <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] text-center tracking-[0] leading-[normal]">
                  {card.subtitle}
                </p>
              </div>
              <img className="w-11 h-11" alt={card.title} src={card.icon} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
