import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const serviceBadges = [
  {
    icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg",
    label: "安心服务",
  },
  {
    icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg",
    label: "7天无忧",
  },
  {
    icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg",
    label: "免费设计",
  },
  {
    icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg",
    label: "小吃水果",
  },
  {
    icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg",
    label: "预约服务",
  },
];

const statsData = [
  { value: "1244", label: "预约" },
  { value: "2000", label: "粉丝" },
  { value: "18", unit: "年", label: "从业" },
  { value: "4.8", unit: "分", label: "评分" },
];

const promotions = [{ text: "满100-5" }, { text: "满500-50" }];

const tabs = [
  { label: "服务", active: true },
  { label: "预约", active: false },
  { label: "作品", active: false },
  { label: "点评", active: false },
];

const subTabs = [
  { label: "美发师", active: true },
  { label: "美容师", active: false },
];

export const ReviewsSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="relative w-full">
        <div className="relative w-full pt-[169px]">
          <Button className="absolute top-[10.47%] right-[62.13%] z-10 h-auto flex-col items-end gap-[3px] px-0 py-[5px] rounded-2xl bg-[linear-gradient(180deg,rgba(135,134,145,1)_0%,rgba(59,54,83,1)_100%)] hover:opacity-90 transition-opacity w-[36.53%]">
            <div className="flex flex-col w-[88px] items-center justify-center">
              <div className="inline-flex items-center justify-end gap-px">
                <img
                  className="w-4 h-4"
                  alt="Frame"
                  src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-12.svg"
                />
                <div className="mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs text-center leading-[normal] tracking-[0]">
                  关注
                </div>
              </div>
              <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffff99] text-[9px] leading-[normal] tracking-[0]">
                你的私人设计师
              </div>
            </div>
          </Button>

          <img
            className="w-full h-auto"
            alt="Subtract"
            src="https://c.animaapp.com/mi5d4lp0csJxnR/img/subtract.svg"
          />

          <div className="flex flex-col w-[92.00%] items-start gap-2.5 mx-auto mt-[-346px] relative z-10">
            <div className="flex flex-col items-start gap-2.5 w-full">
              <div className="inline-flex h-[84px] items-start gap-2">
                <div className="w-[79px] h-[78.5px] bg-[url(https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-153.png)] bg-[100%_100%]" />

                <div className="inline-flex flex-col items-start justify-end gap-0.5 px-0 py-1.5 self-stretch">
                  <div className="flex items-center gap-1 w-full">
                    <div className="mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base leading-[normal] tracking-[0]">
                      朱一龙
                    </div>
                    <img
                      className="w-4 h-4"
                      alt="Frame"
                      src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2110.svg"
                    />
                  </div>

                  <div className="inline-flex items-center gap-0.5">
                    <div className="mt-[-0.50px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0] leading-[normal]">
                      技术总监
                    </div>
                    <div className="mt-[-0.50px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0] leading-[normal]">
                      ｜
                    </div>
                    <div className="inline-flex h-[18px] items-center justify-center gap-0.5 px-[5px] py-0.5 bg-[#f6f6f6] rounded-[3px]">
                      <img
                        className="w-3 h-3"
                        alt="Frame"
                        src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2.svg"
                      />
                      <div className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[10px] leading-[normal] tracking-[0]">
                        职业认证
                      </div>
                      <img
                        className="w-[7px] h-[7px]"
                        alt="Frame"
                        src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-1.5 w-full">
                <div className="inline-flex items-center gap-1.5">
                  <Badge className="h-[22px] px-1 py-px bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]">
                    <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px] tracking-[0] leading-[normal]">
                      专业擅长
                    </div>
                  </Badge>
                  <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[normal] tracking-[0]">
                    染发设计、短发造型、女士晚装:
                  </div>
                </div>

                <div className="flex items-start gap-1.5 w-full relative">
                  <Badge className="h-[22px] px-1 py-px bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]">
                    <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px] tracking-[0] leading-[normal]">
                      个人简介
                    </div>
                  </Badge>
                  <div className="flex-1 mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[21px] tracking-[0]">
                    从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长...
                  </div>
                  <button className="inline-flex items-center gap-px absolute top-[21px] left-[304px]">
                    <div className="mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[21px] whitespace-nowrap tracking-[0]">
                      更多
                    </div>
                    <img
                      className="w-3.5 h-3.5"
                      alt="Frame"
                      src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-6.svg"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-[5px] w-full">
              {serviceBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex h-[21px] items-center justify-center gap-0.5 px-1 py-0.5 flex-1 bg-[#f6f6f6] rounded-sm"
                >
                  <img className="w-3 h-3" alt="Frame" src={badge.icon} />
                  <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] leading-[normal] tracking-[0]">
                    {badge.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-[67px] w-full">
              <div className="flex items-center justify-center gap-[5px] flex-1">
                {statsData.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col h-[41px] items-center px-0 py-1 flex-1 rounded bg-[linear-gradient(180deg,rgba(241,241,241,1)_0%,rgba(255,255,255,1)_100%)]"
                  >
                    <div className="inline-flex items-end justify-center">
                      <div className="mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-[15px] tracking-[0] leading-[normal]">
                        {stat.value}
                      </div>
                      {stat.unit && (
                        <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] tracking-[0] leading-[normal]">
                          {stat.unit}
                        </div>
                      )}
                    </div>
                    <div className="mb-[-2.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] tracking-[0] leading-[normal]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
              <div className="flex items-start gap-2.5 w-full">
                <Card className="flex-1 border-0 shadow-none">
                  <CardContent className="flex flex-col items-center justify-center gap-[13px] px-2 py-[7px] relative">
                    <div className="absolute top-0 left-0 w-full h-16 rounded-lg bg-[100%_100%]" />
                    <div className="flex items-center justify-between w-full relative z-10">
                      <div className="inline-flex flex-col items-start">
                        <div className="flex items-center gap-[3px] w-full">
                          <div className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[normal] tracking-[0]">
                            营业中
                          </div>
                          <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] leading-[normal] tracking-[0]">
                            周二休息
                          </div>
                        </div>
                        <div className="text-[#666666] text-[11px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium tracking-[0] leading-[normal]">
                          10:00-21:00
                        </div>
                        <button className="inline-flex items-center absolute top-[35px] left-0">
                          <div className="mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[17px] whitespace-nowrap tracking-[0]">
                            更多
                          </div>
                          <img
                            className="w-3.5 h-3.5"
                            alt="Frame"
                            src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-8.svg"
                          />
                        </button>
                      </div>
                      <div className="flex flex-col w-6 gap-0.5 items-center">
                        <img
                          className="w-full h-6"
                          alt="Frame"
                          src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1879-2.svg"
                        />
                        <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[9px] text-[#a6a6a6] tracking-[0] leading-[normal]">
                          电话
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1 border-0 shadow-none">
                  <CardContent className="flex flex-col items-center justify-center gap-[13px] px-2 py-[7px] relative">
                    <div className="absolute top-0 left-0 w-full h-16 bg-[#f6f6f6] rounded-lg bg-[url(https://c.animaapp.com/mi5d4lp0csJxnR/img/mask-group.png)] bg-[100%_100%]" />
                    <div className="flex items-center justify-between w-full relative z-10">
                      <div className="inline-flex flex-col items-start gap-[3px]">
                        <div className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs tracking-[0] leading-[normal]">
                          NICE美发造型沙...
                        </div>
                        <div className="flex flex-col items-start justify-center w-full">
                          <div className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] tracking-[0] leading-[normal]">
                            武侯区天府三家B7栋...
                          </div>
                          <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                            距您2.7km
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-[9px]">
                        <div className="flex flex-col w-6 gap-0.5 items-center">
                          <img
                            className="w-full h-6"
                            alt="Frame"
                            src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1879.svg"
                          />
                          <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[9px] text-[#a6a6a6] tracking-[0] leading-[normal]">
                            导航
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator className="w-[345px] h-px" />

              <div className="inline-flex items-center gap-2.5">
                <img
                  className="w-5 h-5"
                  alt="Frame"
                  src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-5.svg"
                />
                <div className="inline-flex items-start gap-[3px]">
                  {promotions.map((promo, index) => (
                    <Badge
                      key={index}
                      className="h-5 px-1.5 py-[3px] bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]"
                    >
                      <div className="mt-[-1.50px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[11px] text-[#a6a6a6] tracking-[0] leading-[normal]">
                        {promo.text}
                      </div>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="w-full mt-[9px] bg-white rounded-lg border-0 shadow-none">
          <CardContent className="flex flex-col items-start gap-[15px] px-[15px] py-2.5">
            <div className="flex flex-col items-start gap-2.5 w-full">
              <div className="flex flex-col items-start gap-0.5 w-full">
                <div className="flex w-full items-start justify-between">
                  {tabs.map((tab, index) => (
                    <button
                      key={index}
                      className="inline-flex flex-col items-center justify-center gap-2"
                    >
                      <div
                        className={`mt-[-1.00px] text-sm text-center leading-[normal] tracking-[0] ${
                          tab.active
                            ? "[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black"
                            : "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666]"
                        }`}
                      >
                        {tab.label}
                      </div>
                      {tab.active && (
                        <img
                          className="w-2.5 h-[3px] mb-[-1.50px]"
                          alt="Vector"
                          src="https://c.animaapp.com/mi5d4lp0csJxnR/img/vector-15.svg"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <Separator className="w-full h-px mb-[-0.50px]" />
              </div>

              <div className="flex items-center gap-5 w-full">
                <div className="inline-flex items-start gap-5">
                  {subTabs.map((subTab, index) => (
                    <button
                      key={index}
                      className={`mt-[-1.00px] text-sm text-center leading-[normal] tracking-[0] ${
                        subTab.active
                          ? "[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333]"
                          : "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6]"
                      }`}
                    >
                      {subTab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="absolute top-0 right-0 w-[168px] h-[202px] flex flex-col gap-[142px]">
          <button className="ml-[25px] w-[30px] h-[30px]">
            <img
              className="w-full h-full"
              alt="Frame"
              src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1879-1.svg"
            />
          </button>

          <div className="inline-flex w-[168px] h-[30px] items-center gap-[3px] px-3 py-1 bg-[#00000033] rounded-[17px]">
            <div className="inline-flex items-center gap-[3px]">
              <img
                className="w-[18px] h-[18px]"
                alt="Frame"
                src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1.svg"
              />
              <div className="mt-[-0.50px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[normal]">
                (281)
              </div>
              <img
                className="w-2.5 h-2.5"
                alt="Frame"
                src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg"
              />
            </div>
            <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#ffffff80] text-xs leading-[normal] tracking-[0]">
              ｜
            </div>
            <div className="inline-flex items-center gap-[3px]">
              <img
                className="w-[18px] h-[18px]"
                alt="Frame"
                src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-4.svg"
              />
              <div className="mt-[-0.50px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[normal]">
                (234)
              </div>
              <img
                className="w-2.5 h-2.5"
                alt="Frame"
                src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
