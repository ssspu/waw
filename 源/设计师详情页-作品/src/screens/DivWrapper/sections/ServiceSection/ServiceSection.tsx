import { ChevronRightIcon, NavigationIcon, PhoneIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

const serviceBadges = [
  {
    icon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1891.svg",
    label: "安心服务",
  },
  {
    icon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1891.svg",
    label: "7天无忧",
  },
  {
    icon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1891.svg",
    label: "免费设计",
  },
  {
    icon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1891.svg",
    label: "小吃水果",
  },
  {
    icon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1891.svg",
    label: "预约服务",
  },
];

const statsData = [
  { value: "1244", label: "预约" },
  { value: "2000", label: "粉丝" },
  { value: "18", unit: "年", label: "从业" },
  { value: "4.8", unit: "分", label: "评分" },
];

const dateSchedule = [
  { date: "今天", day: "周一", active: true },
  { date: "明天", day: "周二", active: false },
  { date: "12.05", day: "周三", active: false },
  { date: "12.06", day: "周四", active: false },
  { date: "12.07", day: "周五", active: false },
  { date: "12.08", day: "周六", active: false },
  { date: "12.09", day: "周日", active: false },
];

export const ServiceSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="relative flex flex-col gap-4">
        <header className="relative flex justify-end pt-8 px-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-[30px] w-[30px] rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
          >
            <img
              className="w-[30px] h-[30px]"
              alt="Share"
              src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1879-1.svg"
            />
          </Button>
        </header>

        <div className="relative px-4">
          <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  className="w-full h-auto object-cover"
                  alt="Background"
                  src="https://c.animaapp.com/mi5jretszAhz9Y/img/subtract.svg"
                />

                <div className="absolute top-4 right-4">
                  <Button
                    size="sm"
                    className="h-auto flex flex-col items-end gap-[3px] px-0 py-[5px] rounded-2xl bg-gradient-to-b from-[#878691] to-[#3b3653] hover:from-[#878691]/90 hover:to-[#3b3653]/90 min-w-[137px]"
                  >
                    <div className="flex flex-col w-[88px] items-center justify-center">
                      <div className="inline-flex items-center justify-end gap-px">
                        <img
                          className="w-4 h-4"
                          alt="Follow icon"
                          src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-6.svg"
                        />
                        <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs">
                          关注
                        </span>
                      </div>
                      <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffff99] text-[9px]">
                        你的私人设计师
                      </span>
                    </div>
                  </Button>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-2">
                      <div className="w-[79px] h-[78.5px] bg-[url(https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-153.png)] bg-cover bg-center rounded" />

                      <div className="flex flex-col justify-end gap-0.5 py-1.5 flex-1">
                        <div className="flex items-center gap-1">
                          <h1 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base">
                            朱一龙
                          </h1>
                          <img
                            className="w-4 h-4"
                            alt="Verified"
                            src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-2110.svg"
                          />
                        </div>

                        <div className="flex items-center gap-0.5">
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs">
                            技术总监
                          </span>
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs">
                            ｜
                          </span>
                          <Badge
                            variant="secondary"
                            className="h-[18px] gap-0.5 px-[5px] py-0.5 bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-[3px]"
                          >
                            <img
                              className="w-3 h-3"
                              alt="Certificate"
                              src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-3.svg"
                            />
                            <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[10px]">
                              职业认证
                            </span>
                            <img
                              className="w-[7px] h-[7px]"
                              alt="Arrow"
                              src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-5.svg"
                            />
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <Badge
                          variant="secondary"
                          className="h-[22px] px-1 py-px bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm"
                        >
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px]">
                            专业擅长
                          </span>
                        </Badge>
                        <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs">
                          染发设计、短发造型、女士晚装:
                        </span>
                      </div>

                      <div className="flex items-start gap-1.5 relative">
                        <Badge
                          variant="secondary"
                          className="h-[22px] px-1 py-px bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm"
                        >
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px]">
                            个人简介
                          </span>
                        </Badge>
                        <p className="flex-1 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[21px]">
                          从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长...
                        </p>
                        <button className="absolute top-[21px] right-0 flex items-center gap-px">
                          <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[21px] whitespace-nowrap">
                            更多
                          </span>
                          <ChevronRightIcon className="w-3.5 h-3.5 text-[#666666]" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-[5px]">
                      {serviceBadges.map((badge, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="h-[21px] flex-1 gap-0.5 px-1 py-0.5 bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm"
                        >
                          <img
                            className="w-3 h-3"
                            alt={badge.label}
                            src={badge.icon}
                          />
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px]">
                            {badge.label}
                          </span>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-[5px]">
                      {statsData.map((stat, index) => (
                        <div
                          key={index}
                          className="flex-1 flex flex-col h-[41px] items-center px-0 py-1 rounded bg-gradient-to-b from-[#f1f1f1] to-[#ffffff]"
                        >
                          <div className="flex items-end justify-center">
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

                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-2.5">
                        <Card className="flex-1 border-0 shadow-none bg-transparent">
                          <CardContent className="flex flex-col justify-center gap-[13px] px-2 py-[7px] relative">
                            <div className="absolute inset-0 w-full h-16 rounded-lg bg-[#f6f6f6]" />
                            <div className="flex items-center justify-between relative z-10">
                              <div className="flex flex-col gap-0">
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
                                <button className="flex items-center mt-[3px]">
                                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[17px] whitespace-nowrap">
                                    更多
                                  </span>
                                  <ChevronRightIcon className="w-3.5 h-3.5 text-[#a6a6a6]" />
                                </button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto flex flex-col w-6 items-center gap-0.5 p-0 hover:bg-transparent"
                              >
                                <PhoneIcon className="w-6 h-6 text-[#a6a6a6]" />
                                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[9px]">
                                  电话
                                </span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="flex-1 border-0 shadow-none bg-transparent">
                          <CardContent className="flex flex-col justify-center gap-[13px] px-2 py-[7px] relative">
                            <div className="absolute inset-0 w-full h-16 bg-[#f6f6f6] rounded-lg bg-[url(https://c.animaapp.com/mi5jretszAhz9Y/img/mask-group.png)] bg-cover bg-center" />
                            <div className="flex items-center justify-between relative z-10">
                              <div className="flex flex-col gap-[3px]">
                                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
                                  NICE美发造型沙...
                                </span>
                                <div className="flex flex-col justify-center">
                                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px]">
                                    武侯区天府三家B7栋...
                                  </span>
                                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
                                    距您2.7km
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto flex flex-col w-6 items-center gap-0.5 p-0 hover:bg-transparent"
                              >
                                <NavigationIcon className="w-6 h-6 text-[#a6a6a6]" />
                                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[9px]">
                                  导航
                                </span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="w-full h-px bg-[#e5e5e5]" />

                      <div className="flex items-center gap-2.5">
                        <img
                          className="w-5 h-5"
                          alt="Promotion"
                          src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame.svg"
                        />
                        <div className="flex items-start gap-[3px]">
                          <Badge
                            variant="secondary"
                            className="h-5 px-1.5 py-[3px] bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm"
                          >
                            <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px]">
                              满100-5
                            </span>
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="h-5 px-1.5 py-[3px] bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm"
                          >
                            <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px]">
                              满500-50
                            </span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="absolute top-[172px] right-4 flex items-center gap-[3px] px-3 py-1 bg-[#00000033] rounded-[17px] backdrop-blur-sm">
          <div className="flex items-center gap-[3px]">
            <img
              className="w-[18px] h-[18px]"
              alt="Works"
              src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-4.svg"
            />
            <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs">
              (281)
            </span>
            <img
              className="w-2.5 h-2.5"
              alt="Arrow"
              src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-5.svg"
            />
          </div>
          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#ffffff80] text-xs">
            ｜
          </span>
          <div className="flex items-center gap-[3px]">
            <img
              className="w-[18px] h-[18px]"
              alt="Likes"
              src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1.svg"
            />
            <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs">
              (234)
            </span>
            <img
              className="w-2.5 h-2.5"
              alt="Arrow"
              src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-5.svg"
            />
          </div>
        </div>

        <Card className="mx-4 border-0 shadow-lg bg-white rounded-lg">
          <CardContent className="flex flex-col gap-[15px] p-[15px]">
            <div className="flex flex-col gap-0.5">
              <Tabs defaultValue="works" className="w-full">
                <TabsList className="w-full h-auto p-0 bg-transparent border-b border-[#e5e5e5] rounded-none">
                  <TabsTrigger
                    value="service"
                    className="flex-1 h-auto pb-2 px-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-black"
                  >
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm data-[state=active]:text-black data-[state=active]:[font-family:'PingFang_SC-Semibold',Helvetica]">
                      服务
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="appointment"
                    className="flex-1 h-auto pb-2 px-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-black"
                  >
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm data-[state=active]:text-black data-[state=active]:[font-family:'PingFang_SC-Semibold',Helvetica]">
                      预约
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="works"
                    className="flex-1 h-auto pb-2 px-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-black"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm">
                        作品
                      </span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="flex-1 h-auto pb-2 px-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-black"
                  >
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm data-[state=active]:text-black data-[state=active]:[font-family:'PingFang_SC-Semibold',Helvetica]">
                      点评
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <nav className="flex items-start justify-between pt-0 pb-3">
              {dateSchedule.map((item, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center gap-1.5 ${
                    item.active ? "" : "opacity-60"
                  }`}
                >
                  <span
                    className={`${
                      item.active
                        ? "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333]"
                        : "[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6]"
                    } text-sm text-center`}
                  >
                    {item.date}
                  </span>
                  <span
                    className={`${
                      item.active
                        ? "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black"
                        : "[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6]"
                    } text-xs text-center`}
                  >
                    {item.day}
                  </span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
