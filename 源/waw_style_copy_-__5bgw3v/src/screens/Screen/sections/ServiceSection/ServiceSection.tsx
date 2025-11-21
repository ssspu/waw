import { StarIcon } from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";

export const ServiceSection = (): JSX.Element => {
  const serviceData = {
    image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    stylist: {
      avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg",
      name: "李天天",
      role: "美发师",
      rating: "4.8",
      reviews: "768",
    },
    distance: "6.7km",
  };

  return (
    <Card className="w-[179px] bg-white rounded overflow-hidden opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
      <CardContent className="p-0">
        <article className="flex flex-col w-full">
          <img
            className="h-[179px] w-full object-cover rounded-t"
            alt={serviceData.title}
            src={serviceData.image}
          />

          <section className="flex flex-col gap-1.5 px-2 py-2">
            <div className="flex flex-col gap-[3px]">
              <header className="flex items-center gap-[3px]">
                <h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base tracking-[0] leading-[normal]">
                  {serviceData.title}
                </h3>
              </header>

              <div className="flex flex-col gap-[3px]">
                <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                  {serviceData.description}
                </p>

                <div className="inline-flex items-center gap-[3px]">
                  <div className="inline-flex items-center">
                    <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
                      ¥
                    </span>
                    <span className="[font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal] whitespace-nowrap">
                      {serviceData.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <footer className="flex items-end justify-between">
              <div className="inline-flex items-center gap-1.5">
                <Avatar className="w-[26px] h-[26px]">
                  <AvatarImage
                    src={serviceData.stylist.avatar}
                    alt={serviceData.stylist.name}
                  />
                  <AvatarFallback className="bg-[#a6a6a6]">
                    {serviceData.stylist.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="inline-flex flex-col gap-0.5">
                  <div className="inline-flex items-start gap-1">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      {serviceData.stylist.name}
                    </span>
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      {serviceData.stylist.role}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-0.5">
                    <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-[normal]">
                      {serviceData.stylist.rating}
                    </span>
                    <StarIcon className="w-2.5 h-2.5 fill-current text-yellow-400" />
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs tracking-[0] leading-[normal]">
                      ({serviceData.stylist.reviews})
                    </span>
                  </div>
                </div>
              </div>

              <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                {serviceData.distance}
              </span>
            </footer>
          </section>
        </article>
      </CardContent>
    </Card>
  );
};
