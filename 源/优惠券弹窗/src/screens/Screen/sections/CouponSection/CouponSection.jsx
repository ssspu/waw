import { StarIcon } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";

const filterOptions = [
  { value: "hairstylist", label: "发型师" },
  { value: "chief", label: "首席" },
  { value: "senior", label: "资深" },
  { value: "director", label: "总监" },
  { value: "manager", label: "店长" },
];

const stylistData = {
  name: "李天天",
  role: "美发师",
  level: "高级",
  position: "店长｜从业12年",
  skills: ["短发裁剪", "染发设计"],
  rating: "4.8",
  services: "287",
  works: "123",
  tags: ["提前预约", "上门服务", "技术专业"],
  price: "799",
  discount: "预约优惠10%",
  sold: "已售1234",
  image: "https://c.animaapp.com/mifjz2qhRjR77t/img/rectangle-169.png",
};

export const CouponSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("hairstylist");

  return (
    <section className="flex flex-col w-full items-start gap-1.5">
      <ToggleGroup
        type="single"
        value={selectedFilter}
        onValueChange={(value) => value && setSelectedFilter(value)}
        className="inline-flex items-center gap-1.5 flex-wrap"
      >
        {filterOptions.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            className="h-auto px-2.5 py-1 data-[state=on]:bg-[#333333] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-[#a6a6a6] rounded-sm [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[13px] leading-normal hover:bg-[#333333] hover:text-white transition-colors"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="flex flex-col items-start gap-2 w-full">
        <Card className="w-full bg-white rounded-md border-0 shadow-none">
          <CardContent className="p-2.5">
            <div className="flex items-start justify-center gap-2 w-full">
              <img
                className="w-20 h-[72.03px] rounded-sm object-cover flex-shrink-0"
                alt={stylistData.name}
                src={stylistData.image}
              />

              <div className="flex items-end justify-between flex-1 min-w-0">
                <div className="inline-flex flex-col items-start gap-1.5 flex-shrink min-w-0">
                  <div className="flex flex-col items-start gap-1 w-full">
                    <div className="flex items-center gap-1 flex-wrap">
                      <h3 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm leading-normal">
                        {stylistData.name}
                      </h3>

                      <Badge className="h-auto px-1 py-px bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm border-0">
                        <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] leading-normal">
                          {stylistData.role}
                        </span>
                      </Badge>

                      <Badge className="h-auto px-1 py-px bg-[#dacbb1] hover:bg-[#dacbb1] rounded-sm border-0">
                        <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#645e57] text-[10px] leading-normal">
                          {stylistData.level}
                        </span>
                      </Badge>
                    </div>

                    <div className="inline-flex items-center gap-1.5">
                      <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] leading-normal">
                        {stylistData.position}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-[3px] flex-wrap">
                      <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-normal">
                        擅长:
                      </span>

                      {stylistData.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="h-auto px-1 py-px bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm border-0"
                        >
                          <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] leading-normal">
                            {skill}
                          </span>
                        </Badge>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 flex-wrap">
                      <div className="inline-flex items-center gap-[3px]">
                        <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs leading-normal">
                          {stylistData.rating}
                        </span>

                        <div className="inline-flex items-center gap-0.5 p-px bg-[#333333] rounded-sm">
                          <div className="w-2 h-2 flex items-center justify-center">
                            <StarIcon className="w-full h-full fill-white text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-0.5">
                        <div className="inline-flex items-end gap-0.5">
                          <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-normal">
                            服务
                          </span>
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs leading-normal">
                            {stylistData.services}
                          </span>
                        </div>

                        <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-normal">
                          ｜
                        </span>

                        <div className="inline-flex items-end gap-0.5">
                          <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-normal">
                            作品
                          </span>
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs leading-normal">
                            {stylistData.works}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-[5px] flex-wrap">
                      <div className="inline-flex items-center gap-[3px] flex-wrap">
                        {stylistData.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="h-auto px-1 py-px bg-white hover:bg-white rounded-sm border-[#a6a6a6]"
                          >
                            <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] leading-normal">
                              {tag}
                            </span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between flex-shrink-0 self-stretch">
                  <div className="flex flex-col items-end justify-center gap-0.5">
                    <div className="inline-flex items-end">
                      <span className="text-sm [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] leading-normal">
                        ¥
                      </span>
                      <span className="[font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-lg whitespace-nowrap leading-normal">
                        {stylistData.price}
                      </span>
                    </div>

                    <div className="inline-flex items-center justify-center gap-1 bg-white rounded-sm">
                      <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffa77b] text-[10px] leading-normal">
                        {stylistData.discount}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex flex-col items-end justify-center gap-0.5">
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-normal">
                      {stylistData.sold}
                    </span>

                    <Button className="h-[30px] px-[15px] py-2 bg-[#333333] hover:bg-[#333333]/90 rounded-sm transition-colors">
                      <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#ffa77b] text-[11px] leading-normal">
                        在线预订
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
