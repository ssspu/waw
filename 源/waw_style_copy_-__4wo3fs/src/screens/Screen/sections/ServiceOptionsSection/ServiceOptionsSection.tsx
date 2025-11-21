import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";

const serviceData = {
  image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-169.png",
  title: "烫发",
  description: "发型提案+染发+造型",
  price: "799",
  stylist: {
    avatar: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/ellipse-34.svg",
    name: "李天天",
    title: "美发师",
    rating: "4.8",
    reviews: "768",
  },
  distance: "6.7km",
};

export const ServiceOptionsSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[179px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      <Card className="bg-white rounded overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col w-full">
            <img
              className="w-full h-[179px] object-cover rounded-t"
              alt={serviceData.title}
              src={serviceData.image}
            />

            <div className="flex flex-col gap-1.5 p-2">
              <div className="flex flex-col gap-[3px]">
                <div className="flex items-center gap-[3px]">
                  <h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base tracking-[0] leading-[normal]">
                    {serviceData.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-[3px]">
                  <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                    {serviceData.description}
                  </p>

                  <div className="inline-flex items-center gap-[3px]">
                    <div className="inline-flex items-center">
                      <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
                        ¥
                      </span>
                      <span className="[font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-sm whitespace-nowrap tracking-[0] leading-[normal]">
                        {serviceData.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between">
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
                        {serviceData.stylist.title}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-0.5">
                      <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-[normal]">
                        {serviceData.stylist.rating}
                      </span>
                      <img
                        className="w-2.5 h-2.5"
                        alt="Star"
                        src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/star-1.svg"
                      />
                      <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs tracking-[0] leading-[normal]">
                        ({serviceData.stylist.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                  {serviceData.distance}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
