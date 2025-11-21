import { StarIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const bookingData = {
  date: "2025-05-05",
  serviceType: "洗剪吹",
  treatment: "欧莱雅生化烫",
  price: "¥888.00",
};

const stylistData = {
  name: "李天天",
  avatar: "https://c.animaapp.com/mi5ng54v4eM3X6/img/rectangle-153-3.png",
  role: "美发师",
  level: "高级",
  position: "店长",
  experience: "从业12年",
  rating: "4.8",
  serviceCount: "287",
  portfolioCount: "123",
  specialties: ["女士造型", "烫发设计", "短发造型"],
};

export const BookingSection = (): JSX.Element => {
  return (
    <Card className="w-full bg-white rounded-md border-0 shadow-none">
      <CardContent className="flex flex-col gap-2.5 p-3">
        <div className="flex flex-col gap-[9px]">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-0.5">
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px]">
                {bookingData.date}
              </span>
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px]">
                ｜
              </span>
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px]">
                {bookingData.serviceType}
              </span>
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px]">
                ｜
              </span>
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px]">
                {bookingData.treatment}
              </span>
            </div>
            <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px]">
              {bookingData.price}
            </span>
          </div>
          <Separator className="bg-[#e5e5e5]" />
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <div className="relative w-20 h-20 flex-shrink-0">
              <div className="absolute top-0 left-px w-20 h-[79px] rounded-[46px_46px_2px_46px] bg-[linear-gradient(180deg,rgba(244,244,244,1)_0%)]" />
              <Avatar className="absolute top-px left-0 w-20 h-[21px] rounded-none">
                <AvatarImage src={stylistData.avatar} alt={stylistData.name} />
              </Avatar>
            </div>

            <div className="flex flex-col gap-[3px] flex-1">
              <div className="flex items-center gap-1">
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm">
                  {stylistData.name}
                </span>
                <Badge
                  variant="secondary"
                  className="h-auto px-1 py-px bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]"
                >
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px]">
                    {stylistData.role}
                  </span>
                </Badge>
                <Badge
                  variant="secondary"
                  className="h-auto px-1 py-px bg-[#dacbb1] rounded-sm hover:bg-[#dacbb1]"
                >
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#645e57] text-[10px]">
                    {stylistData.level}
                  </span>
                </Badge>
              </div>

              <div className="inline-flex items-center gap-1.5">
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px]">
                  {stylistData.position}｜{stylistData.experience}
                </span>
              </div>

              <div className="inline-flex items-center gap-[3px]">
                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
                  擅长:
                </span>
                {stylistData.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="h-auto px-1 py-px bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]"
                  >
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px]">
                      {specialty}
                    </span>
                  </Badge>
                ))}
              </div>

              <div className="inline-flex items-center gap-2">
                <div className="inline-flex items-center gap-[3px]">
                  <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs">
                    {stylistData.rating}
                  </span>
                  <div className="inline-flex items-center gap-0.5 p-px bg-[#333333] rounded-sm">
                    <StarIcon className="w-2 h-2 fill-white text-white" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-0.5">
                  <div className="inline-flex items-end gap-0.5">
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
                      服务
                    </span>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs">
                      {stylistData.serviceCount}
                    </span>
                  </div>
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs">
                    ｜
                  </span>
                  <div className="inline-flex items-end gap-0.5">
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
                      作品
                    </span>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs">
                      {stylistData.portfolioCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-9 items-center justify-between">
            <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs">
              更多
            </span>

            <div className="inline-flex items-center gap-1.5">
              <Button
                variant="secondary"
                className="h-auto w-[74px] px-[15px] py-2 bg-[#f6f6f6] hover:bg-[#e5e5e5] rounded-sm"
              >
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px]">
                  推广
                </span>
              </Button>
              <Button
                variant="default"
                className="h-auto w-[74px] px-[15px] py-2 bg-[#333333] hover:bg-[#1a1a1a] rounded-sm"
              >
                <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-[11px]">
                  再次预约
                </span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
