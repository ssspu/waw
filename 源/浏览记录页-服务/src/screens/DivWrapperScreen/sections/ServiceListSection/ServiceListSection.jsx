import { MapPinIcon, StarIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const ServiceListSection = () => {
  const serviceData = {
    image: null,
    name: "洗剪吹",
    description: "洗发+修剪+造型",
    duration: "1小时",
    sold: "1234",
    price: "68",
    discount: "预约优惠10%",
    stylist: {
      name: "马菲菲",
      title: "总监",
      rating: "4.8",
      reviews: "23",
      avatar: null,
      location: "成都青羊区草堂路12号...",
      distance: "7.5km",
    },
  };

  return (
    <Card className="w-full max-w-[363px] mx-auto bg-white rounded-md overflow-hidden opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
      <CardContent className="p-2.5">
        <div className="flex gap-2.5">
          <div className="w-20 h-20 bg-[#d9d9d9] rounded-sm flex-shrink-0" />

          <div className="flex-1 flex flex-col gap-2.5">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base leading-[22.4px] tracking-[0]">
                  {serviceData.name}
                </h3>

                <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[16.8px] tracking-[0] mt-[3px]">
                  {serviceData.description}
                </p>

                <div className="flex items-center gap-1 mt-2">
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[16.8px] tracking-[0]">
                    预计时间:
                  </span>
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[16.8px] tracking-[0]">
                    {serviceData.duration}
                  </span>
                </div>

                <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[16.8px] tracking-[0] mt-1">
                  已售{serviceData.sold}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2.5">
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline">
                    <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[19.6px]">
                      ¥
                    </span>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-lg tracking-[0] leading-[25.2px]">
                      {serviceData.price}
                    </span>
                  </div>

                  <Badge
                    variant="outline"
                    className="h-auto px-1 py-0 bg-white border-0 rounded-sm"
                  >
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffa77b] text-[10px] leading-[14px] tracking-[0]">
                      {serviceData.discount}
                    </span>
                  </Badge>
                </div>

                <Button className="h-[30px] px-3 bg-[#333333] hover:bg-[#333333]/90 rounded-sm transition-colors">
                  <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#ffa77b] text-[11px] leading-[15.4px] tracking-[0]">
                    快速预约
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-2.5 bg-[#f2f2f2]" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Avatar className="w-8 h-8 bg-[#a6a6a6]">
              <AvatarFallback className="bg-[#a6a6a6]" />
            </Avatar>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[16.8px] tracking-[0]">
                  {serviceData.stylist.name}
                </span>
                <Badge
                  variant="secondary"
                  className="h-4 px-1 py-0 bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm"
                >
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] leading-[14px] tracking-[0]">
                    {serviceData.stylist.title}
                  </span>
                </Badge>
              </div>

              <div className="flex items-center gap-1">
                <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-[13px] leading-[18.2px] tracking-[0]">
                  {serviceData.stylist.rating}
                </span>
                <StarIcon className="w-2.5 h-2.5 fill-current text-[#333333]" />
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[16.8px] tracking-[0]">
                  ({serviceData.stylist.reviews})
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-3.5 h-3.5 text-[#666666]" />
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] leading-[15.4px] tracking-[0]">
                {serviceData.stylist.location}
              </span>
            </div>
            <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] tracking-[0] leading-[15.4px]">
              {serviceData.stylist.distance}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
