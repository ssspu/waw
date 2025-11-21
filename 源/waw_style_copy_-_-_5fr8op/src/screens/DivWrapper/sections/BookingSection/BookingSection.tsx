import { HeartIcon, NavigationIcon, PhoneIcon, StarIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const serviceBadges = [
  {
    icon: "https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1891.svg",
    text: "安心服务",
  },
  {
    icon: "https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1891.svg",
    text: "7天无忧",
  },
  {
    icon: "https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1891.svg",
    text: "免费设计",
  },
  {
    icon: "https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1891.svg",
    text: "小吃水果",
  },
  {
    icon: "https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1891.svg",
    text: "预约服务",
  },
];

const statistics = [
  { value: "1244", label: "预约" },
  { value: "2000", label: "粉丝" },
  { value: "18", unit: "年", label: "从业" },
  { value: "4.8", unit: "分", label: "评分" },
];

const tabs = ["服务", "预约", "作品", "点评"];

const dateOptions = [
  { date: "今天", day: "周一", active: true },
  { date: "明天", day: "周二", active: false },
  { date: "12.05", day: "周三", active: false },
  { date: "12.06", day: "周四", active: false },
  { date: "12.07", day: "周五", active: false },
  { date: "12.08", day: "周六", active: false },
  { date: "12.09", day: "周日", active: false },
];

export const BookingSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="relative w-full">
        <div className="relative w-full pt-[172px]">
          <Button className="absolute top-[10.47%] right-[62.13%] translate-x-full w-[36.53%] h-auto flex-col items-end gap-[3px] px-0 py-[5px] rounded-2xl bg-gradient-to-b from-[#878691] to-[#3b3653] hover:from-[#878691] hover:to-[#3b3653] opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
            <div className="flex flex-col w-[88px] items-center justify-center">
              <div className="inline-flex items-center justify-end gap-px">
                <img
                  className="w-4 h-4"
                  alt="Follow icon"
                  src="https://c.animaapp.com/mi5fl4nsfGephA/img/frame-8.svg"
                />
                <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs text-center leading-[normal] tracking-[0]">
                  关注
                </span>
              </div>
              <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffff99] text-[9px] leading-[normal] tracking-[0]">
                你的私人设计师
              </span>
            </div>
          </Button>

          <img
            className="w-full h-auto"
            alt="Background"
            src="https://c.animaapp.com/mi5fl4nsfGephA/img/subtract.svg"
          />

          <div className="flex flex-col w-[92%] items-start gap-2.5 mx-auto mt-[-346px] opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]">
            <div className="flex flex-col items-start gap-2.5 w-full">
              <div className="inline-flex h-[84px] items-start gap-2">
                <div className="w-[79px] h-[78.5px] bg-[url(https://c.animaapp.com/mi5fl4nsfGephA/img/rectangle-153.png)] bg-[100%_100%] rounded" />

                <div className="inline-flex flex-col items-start justify-end gap-0.5 px-0 py-1.5 flex-1">
                  <div className="flex items-center gap-1 w-full">
                    <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base leading-[normal] tracking-[0]">
                      朱一龙
                    </h2>
                    <img
                      className="w-4 h-4"
                      alt="Verified badge"
                      src="https://c.animaapp.com/mi5fl4nsfGephA/img/frame-2110.svg"
                    />
                  </div>

                  <div className="inline-flex items-center gap-0.5">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0] leading-[normal]">
                      技术总监
                    </span>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0] leading-[normal]">
                      ｜
                    </span>
                    <Badge className="inline-flex h-[18px] items-center justify-center gap-0.5 px-[5px] py-0.5 bg-[#f6f6f6] rounded-[3px] hover:bg-[#f6f6f6]">
                      <img
                        className="w-3 h-3"
                        alt="Certificate icon"
                        src="https://c.animaapp.com/mi5fl4nsfGephA/img/frame-4.svg"
                      />
                      <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[10px] leading-[normal] tracking-[0]">
                        职业认证
                      </span>
                      <img
                        className="w-[7px] h-[7px]"
                        alt="Arrow"
                        src="https://c.animaapp.com/mi5fl4nsfGephA/img/frame.svg"
                      />
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-1.5 w-full">
                <div className="inline-flex items-center gap-1.5">
                  <Badge className="inline-flex h-[22px] items-center justify-center gap-2.5 px-1 py-px bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px] tracking-[0] leading-[normal]">
                      专业擅长
                    </span>
                  </Badge>
                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[normal] tracking-[0]">
                    染发设计、短发造型、女士晚装:
                  </span>
                </div>

                <div className="flex items-start gap-1.5 w-full relative">
                  <Badge className="inline-flex h-[22px] items-center justify-center gap-2.5 px-1 py-px bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px] tracking-[0] leading-[normal]">
                      个人简介
                    </span>
                  </Badge>
                  <p className="flex-1 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[21px] tracking-[0]">
                    从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长...
                  </p>
                  <button className="inline-flex items-center gap-px absolute top-[21px] right-0">
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[21px] whitespace-nowrap tracking-[0]">
                      更多
                    </span>
                    <img
                      className="w-3.5 h-3.5"
                      alt="More arrow"
                      src="https://c.animaapp.com/mi5fl4nsfGephA/img/frame-3.svg"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-[5px] w-full">
              {serviceBadges.map((badge, index) => (
                <Badge
                  key={index}
                  className="flex h-[21px] items-center justify-center gap-0.5 px-1 py-0.5 flex-1 bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]"
                >
                  <img className="w-3 h-3" alt={badge.text} src={badge.icon} />
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] leading-[normal] tracking-[0]">
                    {badge.text}
                  </span>
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-[67px] w-full">
              <div className="flex items-center justify-center gap-[5px] flex-1">
                {statistics.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col h-[41px] items-center px-0 py-1 flex-1 rounded bg-gradient-to-b from-[#f1f1f1] to-[#ffffff]"
                  >
                    <div className="inline-flex items-end justify-center">
                      <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-[15px] tracking-[0] leading-[normal]">
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] tracking-[0] leading-[normal]">
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] tracking-[0] leading-[normal]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
              <div className="flex items-start gap-2.5 w-full">
                <Card className="flex flex-col items-center justify-center gap-[13px] px-2 py-[7px] flex-1 border-0 shadow-none">
                  <CardContent className="p-0 w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="inline-flex flex-col items-start">
                        <div className="flex items-center gap-[3px]">
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[normal] tracking-[0]">
                            营业中
                          </span>
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] leading-[normal] tracking-[0]">
                            周二休息
                          </span>
                        </div>
                        <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] tracking-[0] leading-[normal]">
                          10:00-21:00
                        </span>
                        <button className="inline-flex items-center mt-[3px]">
                          <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[17px] whitespace-nowrap tracking-[0]">
                            更多
                          </span>
                          <img
                            className="w-3.5 h-3.5"
                            alt="More arrow"
                            src="https://c.animaapp.com/mi5fl4nsfGephA/img/frame-7.svg"
                          />
                        </button>
                      </div>
                      <button className="flex flex-col w-6 items-center gap-0.5">
                        <PhoneIcon className="w-6 h-6 text-[#a6a6a6]" />
                        <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[9px] leading-[normal] tracking-[0]">
                          电话
                        </span>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex flex-col items-center justify-center gap-[13px] px-2 py-[7px] flex-1 border-0 shadow-none bg-[#f6f6f6] bg-[url(https://c.animaapp.com/mi5fl4nsfGephA/img/mask-group.png)] bg-[100%_100%] rounded-lg">
                  <CardContent className="p-0 w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="inline-flex flex-col items-start gap-[3px]">
                        <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs tracking-[0] leading-[normal]">
                          NICE美发造型沙...
                        </span>
                        <div className="flex flex-col items-start justify-center w-full">
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] tracking-[0] leading-[normal]">
                            武侯区天府三家B7栋...
                          </span>
                          <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                            距您2.7km
                          </span>
                        </div>
                      </div>
                      <button className="flex flex-col w-6 items-center gap-0.5">
                        <NavigationIcon className="w-6 h-6 text-[#a6a6a6]" />
                        <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[9px] leading-[normal] tracking-[0]">
                          导航
                        </span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator className="w-full" />

              <div className="inline-flex items-center gap-2.5">
                <img
                  className="w-5 h-5"
                  alt="Promotion icon"
                  src="https://c.animaapp.com/mi5fl4nsfGephA/img/frame-9.svg"
                />
                <div className="inline-flex items-start gap-[3px]">
                  <Badge className="inline-flex h-5 items-center justify-center gap-1 px-1.5 py-[3px] bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      满100-5
                    </span>
                  </Badge>
                  <Badge className="inline-flex h-5 items-center justify-center gap-1 px-1.5 py-[3px] bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      满500-50
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="flex flex-col w-full items-start gap-[15px] px-[15px] py-2.5 mt-[34px] bg-white rounded-lg border-0 shadow-none opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:600ms]">
          <CardContent className="p-0 w-full">
            <div className="flex flex-col items-start gap-0.5 w-full">
              <nav className="flex w-full items-start justify-between">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`flex flex-col items-center gap-2 ${
                      tab === "预约" ? "" : ""
                    }`}
                  >
                    <span
                      className={`[font-family:'PingFang_SC-${
                        tab === "预约" ? "Semibold" : "Medium"
                      }',Helvetica] font-${
                        tab === "预约" ? "normal" : "medium"
                      } text-${
                        tab === "预约" ? "black" : "[#666666]"
                      } text-sm text-center leading-[normal] tracking-[0]`}
                    >
                      {tab}
                    </span>
                    {tab === "预约" && (
                      <img
                        className="w-2.5 h-[3px]"
                        alt="Active indicator"
                        src="https://c.animaapp.com/mi5fl4nsfGephA/img/vector-15.svg"
                      />
                    )}
                  </button>
                ))}
              </nav>
              <Separator className="w-full" />
            </div>

            <div className="flex items-start justify-between pt-0 pb-3 px-0 w-full mt-[15px]">
              {dateOptions.map((option, index) => (
                <button
                  key={index}
                  className="inline-flex flex-col items-center gap-1.5"
                >
                  <div className="inline-flex flex-col items-center">
                    <span
                      className={`[font-family:'PingFang_SC-${
                        option.active ? "Medium" : "Regular"
                      }',Helvetica] font-${
                        option.active ? "medium" : "normal"
                      } text-${
                        option.active
                          ? option.date === "今天"
                            ? "[#333333]"
                            : "black"
                          : "[#a6a6a6]"
                      } text-sm text-center leading-[normal] tracking-[0]`}
                    >
                      {option.date}
                    </span>
                    <span
                      className={`[font-family:'PingFang_SC-${
                        option.active ? "Medium" : "Regular"
                      }',Helvetica] font-${
                        option.active ? "medium" : "normal"
                      } text-${
                        option.active ? "black" : "[#a6a6a6]"
                      } text-xs text-center leading-[normal] tracking-[0]`}
                    >
                      {option.day}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-[142px] items-end absolute top-0 right-0 w-[168px] opacity-0 animate-fade-in [--animation-delay:0ms]">
          <button className="mr-[113px] mt-[30px]">
            <img
              className="w-[30px] h-[30px]"
              alt="Share"
              src="https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1879-1.svg"
            />
          </button>

          <div className="inline-flex w-[168px] h-[30px] items-center gap-[3px] px-3 py-1 bg-[#00000033] rounded-[17px]">
            <button className="inline-flex items-center gap-[3px]">
              <StarIcon className="w-[18px] h-[18px] fill-white text-white" />
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[normal]">
                (281)
              </span>
              <img
                className="w-2.5 h-2.5"
                alt="Arrow"
                src="https://c.animaapp.com/mi5fl4nsfGephA/img/frame.svg"
              />
            </button>
            <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#ffffff80] text-xs leading-[normal] tracking-[0]">
              ｜
            </span>
            <button className="inline-flex items-center gap-[3px]">
              <HeartIcon className="w-[18px] h-[18px] fill-white text-white" />
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[normal]">
                (234)
              </span>
              <img
                className="w-2.5 h-2.5"
                alt="Arrow"
                src="https://c.animaapp.com/mi5fl4nsfGephA/img/frame.svg"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
