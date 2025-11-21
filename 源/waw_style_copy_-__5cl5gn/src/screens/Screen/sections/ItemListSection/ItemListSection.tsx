import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";

const serviceData = {
  image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-169.png",
  title: "烫发",
  description: "发型提案+染发+造型",
  price: "799",
  provider: {
    avatar: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/ellipse-34.svg",
    name: "李天天",
    role: "美发师",
    rating: "4.8",
    reviewCount: "768",
  },
  distance: "6.7km",
};

export const ItemListSection = (): JSX.Element => {
  return (
    <Card className="w-[179px] bg-white rounded overflow-hidden translate-y-[-1rem] animate-fade-in opacity-0">
      <CardContent className="p-0">
        <article className="flex flex-col w-full items-center gap-[7px]">
          <img
            className="w-full h-[179px] rounded object-cover"
            alt={serviceData.title}
            src={serviceData.image}
          />

          <div className="flex flex-col items-start gap-1.5 px-2 pb-2 w-full">
            <div className="flex flex-col items-start gap-[3px] w-full">
              <div className="flex items-center gap-[3px] w-full">
                <h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base tracking-[0] leading-[normal]">
                  {serviceData.title}
                </h3>
              </div>

              <div className="flex flex-col items-start gap-[3px] w-full">
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

            <footer className="flex items-end justify-between w-full">
              <div className="inline-flex items-center gap-1.5">
                <Avatar className="w-[26px] h-[26px]">
                  <AvatarImage
                    src={serviceData.provider.avatar}
                    alt={serviceData.provider.name}
                  />
                  <AvatarFallback className="bg-[#a6a6a6]">
                    {serviceData.provider.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="inline-flex flex-col items-start gap-0.5">
                  <div className="inline-flex items-start gap-1">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      {serviceData.provider.name}
                    </span>
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      {serviceData.provider.role}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-0.5">
                    <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-[normal]">
                      {serviceData.provider.rating}
                    </span>
                    <div className="inline-flex items-center gap-0.5">
                      <img
                        className="w-2.5 h-2.5"
                        alt="Star rating"
                        src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/star-1.svg"
                      />
                    </div>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs tracking-[0] leading-[normal]">
                      ({serviceData.provider.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                {serviceData.distance}
              </span>
            </footer>
          </div>
        </article>
      </CardContent>
    </Card>
  );
};
