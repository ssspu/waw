import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const serviceBadges = [
  {
    icon: "https://c.animaapp.com/mifjz2qhRjR77t/img/frame-1891.svg",
    label: "安心服务",
  },
  {
    icon: "https://c.animaapp.com/mifjz2qhRjR77t/img/frame-1891.svg",
    label: "7天无忧",
  },
  {
    icon: "https://c.animaapp.com/mifjz2qhRjR77t/img/frame-1891.svg",
    label: "免费设计",
  },
  {
    icon: "https://c.animaapp.com/mifjz2qhRjR77t/img/frame-1891.svg",
    label: "小吃水果",
  },
  {
    icon: "https://c.animaapp.com/mifjz2qhRjR77t/img/frame-1891.svg",
    label: "预约服务",
  },
];

const statistics = [
  { value: "1244", label: "预约" },
  { value: "2000", label: "粉丝" },
  { value: "18", unit: "年", label: "从业" },
  { value: "4.8", unit: "分", label: "评分" },
];

const promotions = [{ label: "满100-5" }, { label: "满500-50" }];

export const OfferListSection = () => {
  return (
    <section className="w-full flex flex-col gap-[9px] px-3.5 py-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      <Card className="w-full border-0 shadow-none bg-white rounded-lg overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="relative w-full">
            <img
              className="w-full h-auto object-cover"
              alt="Subtract"
              src="https://c.animaapp.com/mifjz2qhRjR77t/img/subtract.svg"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 w-[30px] h-[30px] rounded-full bg-white/90 hover:bg-white"
            >
              <img
                className="w-5 h-5"
                alt="Share"
                src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame-1879-2.svg"
              />
            </Button>

            <div className="absolute bottom-4 right-4 flex items-center gap-[3px] px-3 py-1 bg-[#00000033] rounded-[17px]">
              <div className="inline-flex items-center gap-[3px]">
                <img
                  className="w-[18px] h-[18px]"
                  alt="Star"
                  src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame-2.svg"
                />
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs">
                  (281)
                </span>
                <img
                  className="w-2.5 h-2.5"
                  alt="Arrow"
                  src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame.svg"
                />
              </div>
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#ffffff80] text-xs">
                ｜
              </span>
              <div className="inline-flex items-center gap-[3px]">
                <img
                  className="w-[18px] h-[18px]"
                  alt="Heart"
                  src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame-7.svg"
                />
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs">
                  (234)
                </span>
                <img
                  className="w-2.5 h-2.5"
                  alt="Arrow"
                  src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame.svg"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              className="absolute top-[37px] right-[50px] h-auto px-0 py-[5px] rounded-2xl bg-[linear-gradient(180deg,rgba(135,134,145,1)_0%,rgba(59,54,83,1)_100%)] hover:opacity-90 transition-opacity"
            >
              <div className="flex flex-col w-[88px] items-center justify-center gap-0">
                <div className="inline-flex items-center justify-end gap-px">
                  <img
                    className="w-4 h-4"
                    alt="Follow icon"
                    src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame-9.svg"
                  />
                  <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs">
                    关注
                  </span>
                </div>
                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffff99] text-[9px]">
                  你的优质好店
                </span>
              </div>
            </Button>
          </div>

          <div className="flex flex-col items-start gap-2.5 p-[15px]">
            <div className="flex items-start gap-2 w-full">
              <img
                className="w-[79px] h-[79px] rounded"
                alt="Salon logo"
                src="https://c.animaapp.com/mifjz2qhRjR77t/img/rectangle-153.png"
              />

              <div className="flex flex-col items-start justify-end gap-0.5 py-1.5 flex-1">
                <div className="flex items-center gap-1 w-full">
                  <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base">
                    金龙大好人美发沙龙...
                  </h2>
                </div>

                <div className="inline-flex items-center gap-0.5">
                  <Badge className="h-[18px] px-1 py-px bg-[#dacbb1] hover:bg-[#dacbb1] rounded-sm border-0">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#645e57] text-[11px]">
                      舒适
                    </span>
                  </Badge>

                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[13px]">
                    ｜
                  </span>

                  <Badge className="h-[18px] px-[5px] py-0.5 bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-[3px] border-0 gap-0.5">
                    <img
                      className="w-3 h-3"
                      alt="Verified"
                      src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame-3.svg"
                    />
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px]">
                      企业认证
                    </span>
                    <img
                      className="w-[7px] h-[7px]"
                      alt="Arrow"
                      src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame.svg"
                    />
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-1.5 w-full">
              <div className="inline-flex items-center gap-1.5">
                <Badge className="h-[22px] px-1 py-px bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm border-0">
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px]">
                    店铺性质
                  </span>
                </Badge>
                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs">
                  工作室、专业店
                </span>
              </div>

              <div className="flex items-start gap-1.5 w-full relative">
                <Badge className="h-[22px] px-1 py-px bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm border-0 flex-shrink-0">
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px]">
                    品牌简介
                  </span>
                </Badge>
                <p className="flex-1 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[21px]">
                  从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长...
                </p>
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent absolute bottom-0 right-0"
                >
                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[21px] whitespace-nowrap">
                    更多
                  </span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-[#666666]" />
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-[5px] w-full">
              {serviceBadges.map((badge, index) => (
                <Badge
                  key={index}
                  className="h-[21px] px-1 py-0.5 bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm border-0 flex-1 gap-0.5 justify-center"
                >
                  <img className="w-3 h-3" alt={badge.label} src={badge.icon} />
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px]">
                    {badge.label}
                  </span>
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-[5px] w-full">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col h-[41px] items-center px-0 py-1 flex-1 rounded bg-[linear-gradient(180deg,rgba(241,241,241,1)_0%,rgba(255,255,255,1)_100%)]"
                >
                  <div className="inline-flex items-end justify-center">
                    <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-[15px]">
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px]">
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2.5 w-full">
              <div className="flex flex-col items-center justify-center gap-[13px] px-2 py-[7px] flex-1 relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 w-full h-full" />
                <div className="flex items-center justify-between w-full relative z-10">
                  <div className="inline-flex flex-col items-start">
                    <div className="flex items-center gap-[3px]">
                      <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
                        营业中
                      </span>
                      <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px]">
                        周二休息
                      </span>
                    </div>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px]">
                      10:00-21:00
                    </span>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 hover:bg-transparent mt-[3px]"
                    >
                      <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[17px] whitespace-nowrap">
                        更多
                      </span>
                      <ChevronRightIcon className="w-3.5 h-3.5 text-[#a6a6a6]" />
                    </Button>
                  </div>
                  <div className="flex flex-col w-6 items-center gap-0.5">
                    <img
                      className="w-6 h-6"
                      alt="Phone"
                      src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame-1879-1.svg"
                    />
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[9px]">
                      电话
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-[13px] px-2 py-[7px] flex-1 relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-[#f6f6f6] bg-[url(https://c.animaapp.com/mifjz2qhRjR77t/img/mask-group.png)] bg-[100%_100%]" />
                <div className="flex items-center justify-between w-full relative z-10">
                  <div className="inline-flex flex-col items-start gap-[3px]">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
                      锦江区红星路120号
                    </span>
                    <div className="flex flex-col items-start justify-center">
                      <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px]">
                        IFS国际东门2栋607室
                      </span>
                      <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
                        距您2.7km
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col w-6 items-center gap-0.5">
                    <img
                      className="w-6 h-6"
                      alt="Navigation"
                      src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame-1879.svg"
                    />
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[9px]">
                      导航
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="w-full h-px bg-[#e5e5e5]" />

            <div className="inline-flex items-center gap-2.5">
              <img
                className="w-5 h-5"
                alt="Promotion"
                src="https://c.animaapp.com/mifjz2qhRjR77t/img/frame-6.svg"
              />
              <div className="inline-flex items-start gap-[3px]">
                {promotions.map((promo, index) => (
                  <Badge
                    key={index}
                    className="h-5 px-1.5 py-[3px] bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm border-0"
                  >
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px]">
                      {promo.label}
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full border-0 shadow-none bg-white rounded-lg">
        <CardContent className="flex flex-col items-start gap-[15px] px-[15px] py-2.5">
          <div className="flex flex-col items-start gap-2.5 w-full">
            <div className="inline-flex flex-col items-start gap-0.5 w-full">
              <div className="flex w-full items-start justify-between">
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent flex flex-col items-center justify-center gap-2"
                >
                  <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center">
                    设计师
                  </span>
                  <img
                    className="w-2.5 h-[3px]"
                    alt="Active indicator"
                    src="https://c.animaapp.com/mifjz2qhRjR77t/img/vector-15.svg"
                  />
                </Button>

                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                >
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm text-center">
                    服务
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                >
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm text-center">
                    作品
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                >
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm text-center">
                    点评
                  </span>
                </Button>
              </div>

              <Separator className="w-full h-px bg-[#e5e5e5]" />
            </div>

            <div className="flex items-center gap-5 w-full">
              <div className="inline-flex items-start gap-5">
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                >
                  <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-sm text-center">
                    美发师
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                >
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-sm text-center">
                    美容师
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
