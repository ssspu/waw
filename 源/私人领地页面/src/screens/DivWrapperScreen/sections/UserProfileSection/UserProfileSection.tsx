import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const headerInfo = [
  { text: "2025-05-05" },
  { text: "｜" },
  { text: "洗剪吹" },
  { text: "｜" },
  { text: "欧莱雅生化烫" },
];

const userBadges = [
  { text: "美发师", bgColor: "bg-[#f6f6f6]", textColor: "text-[#666666]" },
  { text: "高级", bgColor: "bg-[#dacbb1]", textColor: "text-[#645e57]" },
];

const skillTags = [
  { text: "女士造型" },
  { text: "烫发设计" },
  { text: "短发造型" },
];

const actionButtons = [
  {
    text: "推广",
    variant: "secondary" as const,
    bgColor: "bg-[#f6f6f6]",
    textColor: "text-[#666666]",
  },
  {
    text: "再次预约",
    variant: "default" as const,
    bgColor: "bg-[#333333]",
    textColor: "text-white",
  },
];

export const UserProfileSection = (): JSX.Element => {
  return (
    <Card className="w-full bg-white rounded-md border-0 shadow-none">
      <CardContent className="flex flex-col gap-2.5 p-3">
        <div className="flex flex-col gap-[9px]">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-0.5">
              {headerInfo.map((item, index) => (
                <div
                  key={index}
                  className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px] leading-normal"
                >
                  {item.text}
                </div>
              ))}
            </div>

            <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px] leading-normal">
              ¥888.00
            </div>
          </div>

          <Separator className="bg-[#e5e5e5] h-px" />
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <div className="relative w-20 h-20 flex-shrink-0">
              <div className="absolute top-0 left-px w-20 h-[79px] rounded-[46px_46px_2px_46px] bg-[linear-gradient(180deg,rgba(244,244,244,1)_0%)]" />
              <img
                className="absolute top-px left-0 w-20 h-[79px] object-cover"
                alt="李天天"
                src="https://c.animaapp.com/mi5ng54v4eM3X6/img/rectangle-153-3.png"
              />
            </div>

            <div className="flex flex-col gap-[3px] flex-1">
              <div className="flex items-center gap-1">
                <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm leading-normal">
                  李天天
                </div>

                {userBadges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`${badge.bgColor} ${badge.textColor} [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[10px] leading-normal px-1 py-px h-auto rounded-sm border-0`}
                  >
                    {badge.text}
                  </Badge>
                ))}
              </div>

              <div className="inline-flex items-center gap-1.5">
                <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] leading-normal">
                  店长｜从业12年
                </div>
              </div>

              <div className="inline-flex items-center gap-[3px]">
                <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-normal">
                  擅长:
                </div>

                {skillTags.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#f6f6f6] text-[#a6a6a6] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[10px] leading-normal px-1 py-px h-auto rounded-sm border-0"
                  >
                    {skill.text}
                  </Badge>
                ))}
              </div>

              <div className="inline-flex items-center gap-2">
                <div className="inline-flex items-center gap-[3px]">
                  <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs leading-normal">
                    4.8
                  </div>

                  <div className="inline-flex items-center gap-0.5 p-px bg-[#333333] rounded-sm">
                    <div className="relative w-2 h-2 rounded-[14px]">
                      <img
                        className="absolute w-full h-full top-[7.21%] left-[9.00%]"
                        alt="Star"
                        src="https://c.animaapp.com/mi5ng54v4eM3X6/img/star-1.svg"
                      />
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-0.5">
                  <div className="inline-flex items-end gap-0.5">
                    <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-normal">
                      服务
                    </div>
                    <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs leading-normal">
                      287
                    </div>
                  </div>

                  <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-normal">
                    ｜
                  </div>

                  <div className="inline-flex items-end gap-0.5">
                    <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-normal">
                      作品
                    </div>
                    <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs leading-normal">
                      123
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-9 items-center justify-between">
            <button className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-normal bg-transparent border-0 p-0 cursor-pointer">
              更多
            </button>

            <div className="inline-flex items-center gap-1.5">
              {actionButtons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant}
                  className={`w-[74px] h-[30px] ${button.bgColor} ${button.textColor} [font-family:'PingFang_SC-${index === 0 ? "Medium" : "Semibold"}',Helvetica] ${index === 0 ? "font-medium" : "font-normal"} text-[11px] leading-normal px-[15px] py-2 rounded-sm border-0 hover:opacity-90 transition-opacity`}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
