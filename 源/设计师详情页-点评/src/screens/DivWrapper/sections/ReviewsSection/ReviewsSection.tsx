import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

const serviceBadges = [
  {
    icon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1891.svg",
    label: "安心服务",
  },
  {
    icon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1891.svg",
    label: "7天无忧",
  },
  {
    icon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1891.svg",
    label: "免费设计",
  },
  {
    icon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1891.svg",
    label: "小吃水果",
  },
  {
    icon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1891.svg",
    label: "预约服务",
  },
];

const statsData = [
  { value: "1244", label: "预约" },
  { value: "2000", label: "粉丝" },
  { value: "18", suffix: "年", label: "从业" },
  { value: "4.8", suffix: "分", label: "评分" },
];

const promotionBadges = [{ label: "满100-5" }, { label: "满500-50" }];

const reviewFilters = [
  { label: "全部", active: true },
  { label: "有图(71)", active: false },
  { label: "差评(9)", active: false },
];

export const ReviewsSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="relative flex flex-col">
        <div className="relative">
          <img
            className="w-full h-auto"
            alt="Subtract"
            src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/subtract.svg"
          />

          <div className="absolute top-[10.47%] right-[62.13%] translate-x-full flex flex-col items-end gap-[3px] px-0 py-[5px] rounded-2xl bg-[linear-gradient(180deg,rgba(135,134,145,1)_0%,rgba(59,54,83,1)_100%)]">
            <div className="flex flex-col w-[88px] items-center justify-center">
              <div className="inline-flex items-center justify-end gap-px">
                <img
                  className="w-4 h-4"
                  alt="Frame"
                  src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-9.svg"
                />
                <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs text-center leading-[normal] tracking-[0]">
                  关注
                </div>
              </div>
              <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffff99] text-[9px] leading-[normal] tracking-[0]">
                你的私人设计师
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 flex flex-col gap-[142px] w-[168px] h-[202px]">
            <img
              className="ml-[25px] w-[30px] h-[30px]"
              alt="Frame"
              src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1879.svg"
            />
            <div className="inline-flex w-[168px] h-[30px] items-center gap-[3px] px-3 py-1 bg-[#00000033] rounded-[17px]">
              <div className="inline-flex items-center gap-[3px]">
                <img
                  className="w-[18px] h-[18px]"
                  alt="Frame"
                  src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-4.svg"
                />
                <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[normal]">
                  (281)
                </div>
                <img
                  className="w-2.5 h-2.5"
                  alt="Frame"
                  src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1.svg"
                />
              </div>
              <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#ffffff80] text-xs leading-[normal] tracking-[0]">
                ｜
              </div>
              <div className="inline-flex items-center gap-[3px]">
                <img
                  className="w-[18px] h-[18px]"
                  alt="Frame"
                  src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-5.svg"
                />
                <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[normal]">
                  (234)
                </div>
                <img
                  className="w-2.5 h-2.5"
                  alt="Frame"
                  src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1.svg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-[15px] gap-2.5">
          <div className="flex flex-col gap-2.5">
            <div className="inline-flex items-start gap-2">
              <div className="w-[79px] h-[78.5px] bg-[url(https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-153.png)] bg-[100%_100%]" />
              <div className="inline-flex flex-col items-start justify-end gap-0.5 py-1.5">
                <div className="flex items-center gap-1">
                  <h1 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base leading-[normal] tracking-[0]">
                    朱一龙
                  </h1>
                  <img
                    className="w-4 h-4"
                    alt="Frame"
                    src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-2110.svg"
                  />
                </div>
                <div className="inline-flex items-center gap-0.5">
                  <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0] leading-[normal]">
                    技术总监
                  </div>
                  <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0] leading-[normal]">
                    ｜
                  </div>
                  <Badge
                    variant="secondary"
                    className="inline-flex h-[18px] items-center justify-center gap-0.5 px-[5px] py-0.5 bg-[#f6f6f6] rounded-[3px] hover:bg-[#f6f6f6]"
                  >
                    <img
                      className="w-3 h-3"
                      alt="Frame"
                      src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-7.svg"
                    />
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[10px] leading-[normal] tracking-[0]">
                      职业认证
                    </span>
                    <img
                      className="w-[7px] h-[7px]"
                      alt="Frame"
                      src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1.svg"
                    />
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="inline-flex items-center gap-1.5">
                <Badge
                  variant="secondary"
                  className="inline-flex h-[22px] items-center justify-center gap-2.5 px-1 py-px bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]"
                >
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px] tracking-[0] leading-[normal]">
                    专业擅长
                  </span>
                </Badge>
                <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[normal] tracking-[0]">
                  染发设计、短发造型、女士晚装:
                </div>
              </div>

              <div className="flex items-start gap-1.5 relative">
                <Badge
                  variant="secondary"
                  className="inline-flex h-[22px] items-center justify-center gap-2.5 px-1 py-px bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]"
                >
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
                    alt="Frame"
                    src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-6.svg"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-[5px]">
            {serviceBadges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex h-[21px] items-center justify-center gap-0.5 px-1 py-0.5 flex-1 bg-[#f6f6f6] rounded-sm hover:bg-[#f6f6f6]"
              >
                <img className="w-3 h-3" alt="Frame" src={badge.icon} />
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] leading-[normal] tracking-[0]">
                  {badge.label}
                </span>
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-[67px]">
            <div className="flex items-center justify-center gap-[5px] flex-1">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col h-[41px] items-center px-0 py-1 flex-1 rounded bg-[linear-gradient(180deg,rgba(241,241,241,1)_0%,rgba(255,255,255,1)_100%)]"
                >
                  <div className="inline-flex items-end justify-center">
                    <div className="[font-family:'PingFang_SC-Semibold',Helvetica] text-[#333333] text-[15px] font-normal tracking-[0] leading-[normal]">
                      {stat.value}
                    </div>
                    {stat.suffix && (
                      <div className="text-[#666666] text-[11px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal tracking-[0] leading-[normal]">
                        {stat.suffix}
                      </div>
                    )}
                  </div>
                  <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] leading-[normal] tracking-[0]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2.5">
              <Card className="flex flex-col items-center justify-center gap-[13px] px-2 py-[7px] flex-1 border-0 shadow-none">
                <CardContent className="p-0 w-full">
                  <div className="absolute inset-0 rounded-lg bg-[100%_100%]" />
                  <div className="flex items-center justify-between relative">
                    <div className="inline-flex flex-col items-start">
                      <div className="flex items-center gap-[3px]">
                        <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[normal] tracking-[0]">
                          营业中
                        </div>
                        <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] leading-[normal] tracking-[0]">
                          周二休息
                        </div>
                      </div>
                      <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] tracking-[0] leading-[normal]">
                        10:00-21:00
                      </div>
                      <button className="inline-flex items-center absolute top-[35px] left-0">
                        <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[17px] whitespace-nowrap tracking-[0]">
                          更多
                        </span>
                        <img
                          className="w-3.5 h-3.5"
                          alt="Frame"
                          src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-2.svg"
                        />
                      </button>
                    </div>
                    <div className="flex flex-col w-6 gap-0.5 items-center">
                      <img
                        className="w-full h-6"
                        alt="Frame"
                        src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1879-1.svg"
                      />
                      <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[9px] text-[#a6a6a6] tracking-[0] leading-[normal]">
                        电话
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center justify-center gap-[13px] px-2 py-[7px] flex-1 border-0 shadow-none">
                <CardContent className="p-0 w-full">
                  <div className="absolute inset-0 bg-[#f6f6f6] rounded-lg bg-[url(https://c.animaapp.com/mi5kx1ohxTkA7e/img/mask-group.png)] bg-[100%_100%]" />
                  <div className="flex items-center justify-between relative">
                    <div className="inline-flex flex-col items-start gap-[3px]">
                      <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs tracking-[0] leading-[normal]">
                        NICE美发造型沙...
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] tracking-[0] leading-[normal]">
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
                          src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1879-2.svg"
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

            <Separator className="h-px" />

            <div className="inline-flex items-center gap-2.5">
              <img
                className="w-5 h-5"
                alt="Frame"
                src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame.svg"
              />
              <div className="inline-flex items-start gap-[3px]">
                {promotionBadges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="inline-flex h-5 justify-center gap-1 px-1.5 py-[3px] bg-[#f6f6f6] rounded-sm items-center hover:bg-[#f6f6f6]"
                  >
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[11px] text-[#a6a6a6] tracking-[0] leading-[normal]">
                      {badge.label}
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Card className="flex flex-col gap-[15px] px-[15px] py-2.5 bg-white rounded-lg border-0 shadow-none mt-4">
          <CardContent className="flex flex-col gap-[15px] p-0">
            <div className="inline-flex flex-col gap-0.5">
              <Tabs defaultValue="reviews" className="w-full">
                <TabsList className="flex w-full items-start justify-between h-auto bg-transparent p-0 border-b-0">
                  <TabsTrigger
                    value="service"
                    className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm text-center leading-[normal] tracking-[0] data-[state=active]:text-black data-[state=active]:shadow-none bg-transparent"
                  >
                    服务
                  </TabsTrigger>
                  <TabsTrigger
                    value="appointment"
                    className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm text-center leading-[normal] tracking-[0] data-[state=active]:text-black data-[state=active]:shadow-none bg-transparent"
                  >
                    预约
                  </TabsTrigger>
                  <TabsTrigger
                    value="works"
                    className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm text-center leading-[normal] tracking-[0] data-[state=active]:text-black data-[state=active]:shadow-none bg-transparent"
                  >
                    作品
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="inline-flex flex-col items-center justify-center gap-2 [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal] data-[state=active]:shadow-none bg-transparent relative"
                  >
                    点评
                    <img
                      className="w-2.5 h-[3px] absolute bottom-0"
                      alt="Vector"
                      src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/vector-15.svg"
                    />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Separator className="h-px" />
            </div>

            <div className="flex items-start gap-5 pt-0 pb-3 px-0">
              {reviewFilters.map((filter, index) => (
                <button
                  key={index}
                  className="inline-flex flex-col items-center gap-2.5"
                >
                  <div className="inline-flex flex-col items-center">
                    <div
                      className={`[font-family:'${
                        filter.active
                          ? "PingFang_SC-Semibold"
                          : "PingFang_SC-Regular"
                      }',Helvetica] font-normal text-${
                        filter.active ? "black" : "[#a6a6a6]"
                      } text-sm text-center tracking-[0] leading-[normal]`}
                    >
                      {filter.label}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
