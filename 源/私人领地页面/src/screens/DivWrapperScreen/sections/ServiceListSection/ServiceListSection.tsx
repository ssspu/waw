import { StarIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const ServiceListSection = (): JSX.Element => {
  const headerInfo = [
    { text: "2025-05-05" },
    { text: "｜" },
    { text: "洗剪吹" },
    { text: "｜" },
    { text: "欧莱雅生化烫" },
  ];

  const specialties = [
    { label: "女士造型" },
    { label: "烫发设计" },
    { label: "短发造型" },
  ];

  return (
    <Card className="w-full bg-white rounded-md border-0 shadow-none translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      <CardContent className="flex flex-col gap-2.5 p-3">
        <div className="flex flex-col gap-[9px]">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-0.5">
              {headerInfo.map((item, index) => (
                <div
                  key={index}
                  className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px] tracking-[0] leading-[normal]"
                >
                  {item.text}
                </div>
              ))}
            </div>

            <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px] tracking-[0] leading-[normal]">
              ¥888.00
            </div>
          </div>

          <Separator className="bg-[#e5e5e5]" />
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <div className="relative w-20 h-20 flex-shrink-0">
              <div className="absolute top-0 left-px w-20 h-[79px] rounded-[46px_46px_2px_46px] bg-[linear-gradient(180deg,rgba(244,244,244,1)_0%)]" />
              <img
                className="absolute top-px left-0 w-20 h-[79px] object-cover"
                alt="李天天"
                src="https://c.animaapp.com/mi5ng54v4eM3X6/img/rectangle-153-2.png"
              />
            </div>

            <div className="flex flex-col gap-[3px] flex-1">
              <div className="flex items-center gap-1">
                <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm tracking-[0] leading-[normal]">
                  李天天
                </div>

                <Badge
                  variant="secondary"
                  className="bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm px-1 py-px h-auto"
                >
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] tracking-[0] leading-[normal]">
                    美发师
                  </span>
                </Badge>

                <Badge
                  variant="secondary"
                  className="bg-[#dacbb1] hover:bg-[#dacbb1] rounded-sm px-1 py-px h-auto"
                >
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#645e57] text-[10px] tracking-[0] leading-[normal]">
                    高级
                  </span>
                </Badge>
              </div>

              <div className="inline-flex items-center gap-1.5">
                <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                  店长｜从业12年
                </div>
              </div>

              <div className="inline-flex items-center gap-[3px]">
                <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                  擅长:
                </div>

                {specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm px-1 py-px h-auto"
                  >
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] tracking-[0] leading-[normal]">
                      {specialty.label}
                    </span>
                  </Badge>
                ))}
              </div>

              <div className="inline-flex items-center gap-2">
                <div className="inline-flex items-center gap-[3px]">
                  <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-[normal]">
                    4.8
                  </div>

                  <div className="inline-flex items-center gap-0.5 p-px bg-[#333333] rounded-sm">
                    <div className="relative w-2 h-2 rounded-[14px]">
                      <StarIcon
                        className="absolute w-full h-full top-[7.21%] left-[9.00%] fill-white text-white"
                        size={8}
                      />
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-0.5">
                  <div className="inline-flex items-end gap-0.5">
                    <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      服务
                    </div>

                    <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0] leading-[normal]">
                      287
                    </div>
                  </div>

                  <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                    ｜
                  </div>

                  <div className="inline-flex items-end gap-0.5">
                    <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      作品
                    </div>

                    <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0] leading-[normal]">
                      123
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-9 items-center justify-between">
            <Button
              variant="ghost"
              className="h-auto p-0 hover:bg-transparent [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]"
            >
              更多
            </Button>

            <div className="inline-flex items-center gap-1.5">
              <Button
                variant="secondary"
                className="w-[74px] h-[30px] bg-[#f6f6f6] hover:bg-[#e5e5e5] rounded-sm px-[15px] py-2 transition-colors"
              >
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] tracking-[0] leading-[normal]">
                  推广
                </span>
              </Button>

              <Button className="w-[74px] h-[30px] bg-[#333333] hover:bg-[#1a1a1a] rounded-sm px-[15px] py-2 transition-colors">
                <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-[11px] tracking-[0] leading-[normal]">
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
