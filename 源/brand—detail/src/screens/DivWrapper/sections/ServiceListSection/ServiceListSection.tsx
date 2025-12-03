import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const serviceBadges = [
  {
    icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg",
    label: "安心服务",
  },
  {
    icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg",
    label: "7天无忧",
  },
  {
    icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg",
    label: "免费设计",
  },
  {
    icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg",
    label: "小吃水果",
  },
  {
    icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg",
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

const mainTabs = [
  { label: "设计师", active: true },
  { label: "服务", active: false },
  { label: "作品", active: false },
  { label: "点评", active: false },
];

const subTabs = [
  { label: "美发师", active: true },
  { label: "美容师", active: false },
];

export const ServiceListSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="flex flex-col w-full items-start gap-[9px]">
        <Card className="relative w-full border-0 shadow-none">
          <CardContent className="p-0">
            <div className="relative w-full">
              <div className="flex flex-col w-[36.53%] items-end gap-[3px] px-0 py-[5px] absolute top-[9.74%] left-[62.13%] rounded-2xl bg-[linear-gradient(180deg,rgba(135,134,145,1)_0%,rgba(59,54,83,1)_100%)] z-10 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
                <div className="flex flex-col w-[88px] items-center justify-center">
                  <div className="inline-flex items-center justify-end gap-px">
                    <img
                      className="w-4 h-4"
                      alt="Frame"
                      src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-11.svg"
                    />
                    <div className="mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs text-center leading-[normal] tracking-[0]">
                      关注
                    </div>
                  </div>
                  <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffff99] text-[9px] leading-[normal] tracking-[0]">
                    你的优质好店
                  </div>
                </div>
              </div>

              <img
                className="w-full h-auto translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]"
                alt="Subtract"
                src="https://c.animaapp.com/mi5l377nJk1HHO/img/subtract.svg"
              />

              <div className="flex flex-col w-[92.00%] items-start gap-2.5 absolute top-0 left-[4.00%] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:100ms]">
                <div className="flex flex-col items-start gap-2.5 w-full">
                  <div className="inline-flex items-start gap-2">
                    <img
                      className="w-[79px] h-[79px]"
                      alt="Rectangle"
                      src="https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-153.png"
                    />

                    <div className="inline-flex flex-col items-start justify-end gap-0.5 px-0 py-1.5 flex-1">
                      <div className="flex items-center gap-1 w-full">
                        <div className="mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base leading-[normal] tracking-[0]">
                          金龙大好人美发沙龙...
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-0.5">
                        <Badge className="h-[18px] px-1 py-px bg-[#dacbb1] hover:bg-[#dacbb1] rounded-sm">
                          <div className="mt-[-0.50px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#645e57] text-[11px] leading-[normal] tracking-[0]">
                            舒适
                          </div>
                        </Badge>

                        <div className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[13px] leading-[normal] tracking-[0]">
                          ｜
                        </div>

                        <Badge className="h-[18px] gap-0.5 px-[5px] py-0.5 bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-[3px]">
                          <img
                            className="w-3 h-3"
                            alt="Frame"
                            src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-3.svg"
                          />
                          <div className="mt-[-1.50px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                            企业认证
                          </div>
                          <img
                            className="w-[7px] h-[7px]"
                            alt="Frame"
                            src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg"
                          />
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <div className="inline-flex items-center gap-1.5">
                      <Badge className="h-[22px] px-1 py-px bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm">
                        <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px] tracking-[0] leading-[normal]">
                          店铺性质
                        </div>
                      </Badge>

                      <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[normal] tracking-[0]">
                        工作室、专业店
                      </div>
                    </div>

                    <div className="flex items-start gap-1.5 w-full relative">
                      <Badge className="h-[22px] px-1 py-px bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm">
                        <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px] tracking-[0] leading-[normal]">
                          品牌简介
                        </div>
                      </Badge>

                      <div className="flex-1 mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[21px] tracking-[0]">
                        从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长...
                      </div>

                      <button className="inline-flex items-center gap-px absolute top-[21px] right-0 bg-transparent border-0 cursor-pointer">
                        <div className="mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[21px] whitespace-nowrap tracking-[0]">
                          更多
                        </div>
                        <img
                          className="w-3.5 h-3.5"
                          alt="Frame"
                          src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-9.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-[5px] w-full">
                  {serviceBadges.map((badge, index) => (
                    <Badge
                      key={index}
                      className="flex h-[21px] items-center justify-center gap-0.5 px-1 py-0.5 flex-1 bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm"
                    >
                      <img className="w-3 h-3" alt="Frame" src={badge.icon} />
                      <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] tracking-[0] leading-[normal]">
                        {badge.label}
                      </div>
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-[67px] w-full">
                  <div className="flex items-center justify-center gap-[5px] flex-1">
                    {statistics.map((stat, index) => (
                      <div
                        key={index}
                        className="flex flex-col h-[41px] items-center px-0 py-1 flex-1 rounded bg-[linear-gradient(180deg,rgba(241,241,241,1)_0%,rgba(255,255,255,1)_100%)]"
                      >
                        <div className="inline-flex items-end justify-center">
                          <div className="mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-[15px] leading-[normal] tracking-[0]">
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
                    <div className="flex flex-col items-center justify-center gap-[13px] px-2 py-[7px] flex-1 relative">
                      <div className="absolute top-0 left-0 w-full h-16 rounded-lg bg-[100%_100%]" />

                      <div className="flex items-center justify-between w-full z-10">
                        <div className="inline-flex flex-col items-start relative">
                          <div className="flex items-center gap-[3px] w-full">
                            <div className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[normal] tracking-[0]">
                              营业中
                            </div>
                            <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] tracking-[0] leading-[normal]">
                              周二休息
                            </div>
                          </div>

                          <div className="text-[#666666] text-[11px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium tracking-[0] leading-[normal]">
                            10:00-21:00
                          </div>

                          <button className="inline-flex items-center absolute top-[35px] left-0 bg-transparent border-0 cursor-pointer">
                            <div className="mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[17px] whitespace-nowrap tracking-[0]">
                              更多
                            </div>
                            <img
                              className="w-3.5 h-3.5"
                              alt="Frame"
                              src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-5.svg"
                            />
                          </button>
                        </div>

                        <button className="flex flex-col w-6 gap-0.5 items-center bg-transparent border-0 cursor-pointer">
                          <img
                            className="w-full h-6"
                            alt="Frame"
                            src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1879-2.svg"
                          />
                          <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[9px] tracking-[0] leading-[normal]">
                            电话
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-[13px] px-2 py-[7px] flex-1 relative">
                      <div className="absolute top-0 left-0 w-full h-16 bg-[#f6f6f6] rounded-lg bg-[url(https://c.animaapp.com/mi5l377nJk1HHO/img/mask-group.png)] bg-[100%_100%]" />

                      <div className="flex items-center justify-between w-full z-10">
                        <div className="inline-flex flex-col items-start gap-[3px]">
                          <div className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[normal] tracking-[0]">
                            锦江区红星路120号
                          </div>

                          <div className="flex flex-col items-start justify-center w-full">
                            <div className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] tracking-[0] leading-[normal]">
                              IFS国际东门2栋607室
                            </div>
                            <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                              距您2.7km
                            </div>
                          </div>
                        </div>

                        <button className="flex flex-col w-6 gap-0.5 items-center bg-transparent border-0 cursor-pointer">
                          <img
                            className="w-full h-6"
                            alt="Frame"
                            src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1879.svg"
                          />
                          <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[9px] tracking-[0] leading-[normal]">
                            导航
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <Separator className="w-full h-px bg-[#e5e5e5]" />

                  <div className="inline-flex items-center gap-2.5">
                    <img
                      className="w-5 h-5"
                      alt="Frame"
                      src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1.svg"
                    />

                    <div className="inline-flex items-start gap-[3px]">
                      {promotions.map((promo, index) => (
                        <Badge
                          key={index}
                          className="h-5 px-1.5 py-[3px] bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm"
                        >
                          <div className="mt-[-1.50px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                            {promo.label}
                          </div>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full border-0 shadow-none bg-white rounded-lg translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:300ms]">
          <CardContent className="flex flex-col items-start gap-[15px] px-[15px] py-2.5">
            <div className="flex flex-col items-start gap-2.5 w-full">
              <div className="inline-flex flex-col items-start gap-0.5 w-full">
                <div className="flex w-full items-start justify-between">
                  {mainTabs.map((tab, index) => (
                    <button
                      key={index}
                      className="inline-flex flex-col items-center justify-center gap-2 bg-transparent border-0 cursor-pointer"
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
                          src="https://c.animaapp.com/mi5l377nJk1HHO/img/vector-15.svg"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <Separator className="w-full h-px mb-[-0.50px] bg-[#e5e5e5]" />
              </div>

              <div className="flex items-center gap-5 w-full">
                <div className="inline-flex items-start gap-5">
                  {subTabs.map((tab, index) => (
                    <button
                      key={index}
                      className="bg-transparent border-0 cursor-pointer"
                    >
                      <div
                        className={`mt-[-1.00px] text-sm text-center leading-[normal] tracking-[0] ${
                          tab.active
                            ? "[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333]"
                            : "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6]"
                        }`}
                      >
                        {tab.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="absolute top-0 left-[202px] w-[168px] h-[202px] flex flex-col gap-[142px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <button className="ml-[25px] w-[30px] h-[30px] bg-transparent border-0 cursor-pointer">
          <img
            className="w-full h-full"
            alt="Frame"
            src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1879-1.svg"
          />
        </button>

        <div className="inline-flex w-[168px] h-[30px] items-center gap-[3px] px-3 py-1 bg-[#00000033] rounded-[17px]">
          <button className="inline-flex items-center gap-[3px] bg-transparent border-0 cursor-pointer">
            <img
              className="w-[18px] h-[18px]"
              alt="Frame"
              src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-4.svg"
            />
            <div className="mt-[-0.50px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[normal]">
              (281)
            </div>
            <img
              className="w-2.5 h-2.5"
              alt="Frame"
              src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg"
            />
          </button>

          <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#ffffff80] text-xs leading-[normal] tracking-[0]">
            ｜
          </div>

          <button className="inline-flex items-center gap-[3px] bg-transparent border-0 cursor-pointer">
            <img
              className="w-[18px] h-[18px]"
              alt="Frame"
              src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-12.svg"
            />
            <div className="mt-[-0.50px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[normal]">
              (234)
            </div>
            <img
              className="w-2.5 h-2.5"
              alt="Frame"
              src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
