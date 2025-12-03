import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const serviceCategories = [
  {
    icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2006.svg",
    title: "首席创意",
    subtitle: "新潮时尚引领",
  },
  {
    icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2005-1.svg",
    title: "总监店长",
    subtitle: "资深技术大咖",
  },
  {
    icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2005.svg",
    title: "网红名师",
    subtitle: "人气霸榜标杆",
  },
  {
    icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2006-1.svg",
    title: "国际导师",
    subtitle: "海内外多语种",
  },
];

const bookingOptions = [
  {
    title: "预约到店",
    subtitle: "线下固定门店",
    icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2278.svg",
  },
  {
    title: "预约上门",
    subtitle: "约定服务地点",
    icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2287.svg",
  },
];

const rankingTabs = [
  { label: "新秀榜", active: true },
  { label: "专业榜", active: false },
  { label: "服务榜", active: false, hasNew: true },
];

const rankingStylists = [
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    rating: "4.8",
  },
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-1.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    rating: "4.8",
  },
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-2.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    rating: "4.8",
  },
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-3.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    rating: "4.8",
  },
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-4.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    rating: "4.8",
  },
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    rating: "4.8",
  },
];

const nearbyStylistsData = [
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    specialties: ["女士造型", "烫发设计", "短发造型"],
    rating: "4.8",
    services: "287",
    works: "123",
    tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
    distance: "7.5km",
  },
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    specialties: ["女士造型", "烫发设计", "短发造型"],
    rating: "4.8",
    services: "287",
    works: "123",
    tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
    distance: "7.5km",
  },
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    specialties: ["女士造型", "烫发设计", "短发造型"],
    rating: "4.8",
    services: "287",
    works: "123",
    tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
    distance: "7.5km",
  },
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    specialties: ["女士造型", "烫发设计", "短发造型"],
    rating: "4.8",
    services: "287",
    works: "123",
    tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
    distance: "7.5km",
  },
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    specialties: ["女士造型", "烫发设计", "短发造型"],
    rating: "4.8",
    services: "287",
    works: "123",
    tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
    distance: "7.5km",
  },
  {
    image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png",
    name: "李天天",
    level: "高级",
    role: "店长｜从业12年",
    specialties: ["女士造型", "烫发设计", "短发造型"],
    rating: "4.8",
    services: "287",
    works: "123",
    tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
    distance: "7.5km",
  },
];

export const DesignSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-[363px] mx-auto items-end gap-[9px]">
      <Card className="w-full bg-white rounded-md border-0 shadow-sm">
        <CardContent className="flex items-center justify-between px-[15px] py-2.5 gap-2">
          {serviceCategories.map((category, index) => (
            <button
              key={index}
              className="flex flex-col w-[54px] items-center gap-[3px] transition-opacity hover:opacity-80"
            >
              <img
                className="w-11 h-11"
                alt={category.title}
                src={category.icon}
              />
              <div className="flex flex-col items-center w-full">
                <div className="text-xs [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-center tracking-[0] leading-[normal]">
                  {category.title}
                </div>
                <div className="text-[9px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-center tracking-[0] leading-[normal]">
                  {category.subtitle}
                </div>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <div className="flex w-full items-center gap-1.5">
        {bookingOptions.map((option, index) => (
          <Card
            key={index}
            className="flex-1 bg-white rounded-md border-0 shadow-sm cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <CardContent className="flex items-center justify-between px-3 py-2 rounded bg-[linear-gradient(180deg,rgba(246,246,246,1)_0%,rgba(255,255,255,1)_100%)]">
              <div className="flex flex-col items-start gap-[5px]">
                <div className="text-sm [font-family:'DIN_Black-Regular',Helvetica] font-normal text-black tracking-[0] leading-[normal]">
                  {option.title}
                </div>
                <div className="text-[11px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] tracking-[0] leading-[normal]">
                  {option.subtitle}
                </div>
              </div>
              <img
                className="w-[38px] h-[38px]"
                alt={option.title}
                src={option.icon}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="w-full bg-white rounded-md border-0 shadow-sm">
        <CardContent className="flex flex-col items-center gap-2 p-2.5">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm [font-family:'DIN_Black-Regular',Helvetica] font-normal text-black tracking-[0] leading-[normal]">
              排行榜
            </div>
            <img
              className="w-[22px] h-[22px]"
              alt="More"
              src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2.svg"
            />
          </div>

          <div className="flex items-center gap-[15px] w-full">
            {rankingTabs.map((tab, index) => (
              <button
                key={index}
                className={`relative text-[13px] [font-family:'PingFang_SC-${
                  tab.active ? "Semibold" : "Regular"
                }',Helvetica] font-normal ${
                  tab.active ? "text-[#333333]" : "text-[#a6a6a6]"
                } tracking-[0] leading-[normal] transition-colors hover:text-[#333333]`}
              >
                {tab.label}
                {tab.hasNew && (
                  <div className="absolute -top-[7px] left-[calc(100%+2px)] w-[25px] h-3">
                    <img
                      className="absolute top-px left-0 w-[23px] h-2.5"
                      alt="New badge"
                      src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-216.svg"
                    />
                    <div className="absolute top-0 left-[3px] w-[18px] text-[7px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white tracking-[0] leading-[normal]">
                      NEW
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-[10px] w-full">
            {rankingStylists.map((stylist, index) => (
              <button
                key={index}
                className="flex w-[166.5px] items-center gap-1.5 bg-white rounded transition-transform hover:scale-[1.02]"
              >
                <div
                  className="w-[56px] h-[55.65px] bg-cover bg-center rounded"
                  style={{ backgroundImage: `url(${stylist.image})` }}
                />
                <div className="flex flex-col items-start gap-[3px] px-0 py-1 flex-1">
                  <div className="flex items-center gap-1 w-full">
                    <div className="text-[13px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black tracking-[0] leading-[normal]">
                      {stylist.name}
                    </div>
                    <Badge className="h-auto px-1 py-px bg-[#dacbb1] text-[#645e57] text-[9px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium rounded-sm hover:bg-[#dacbb1]">
                      {stylist.level}
                    </Badge>
                  </div>
                  <div className="text-[11px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] tracking-[0] leading-[normal]">
                    {stylist.role}
                  </div>
                    <div className="flex items-center gap-[3px] w-full">
                      <div className="flex items-center gap-[3px]">
                        <div className="text-xs [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] tracking-[0] leading-[normal]">
                          {stylist.rating}
                        </div>
                        <img
                          className="w-2.5 h-2.5"
                          alt="Star"
                          src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/star-1.svg"
                        />
                      </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-[3px]">
            <div className="w-[5px] h-[5px] bg-[#d9d9d9] rounded-[2.5px]" />
            <div className="w-[5px] h-[5px] bg-[#d9d9d9] rounded-[2.5px]" />
            <div className="w-3.5 h-[5px] bg-[#333333] rounded-[14px]" />
            <div className="w-[5px] h-[5px] bg-[#d9d9d9] rounded-[2.5px]" />
          </div>
        </CardContent>
      </Card>

      <div className="flex w-full items-center justify-between">
        <div className="text-sm [font-family:'DIN_Black-Regular',Helvetica] font-normal text-black tracking-[0] leading-[normal]">
          附近推荐
        </div>
        <button className="flex items-center gap-0.5 transition-opacity hover:opacity-80">
          <div className="text-sm [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-center tracking-[0] leading-[normal]">
            筛选
          </div>
          <img
            className="w-2.5 h-2.5"
            alt="Filter"
            src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-3.svg"
          />
        </button>
      </div>

      <div className="w-full">
        <div className="w-full h-[30px] flex bg-[url(https://c.animaapp.com/mi4wi1dxPPrFZt/img/subtract.svg)] bg-[100%_100%]">
          <button className="flex mt-1.5 w-[62px] h-[18px] ml-2.5 items-center gap-1.5 transition-opacity hover:opacity-80">
            <img
              className="w-3.5 h-3.5"
              alt="Hairstylist"
              src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame.svg"
            />
            <div className="w-[42px] h-[18px] text-sm [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#dacbb1] tracking-[0] leading-[normal]">
              美发师
            </div>
          </button>
        </div>

        <div className="flex flex-col w-full items-start gap-1.5">
          {nearbyStylistsData.map((stylist, index) => (
            <Card
              key={index}
              className="w-full bg-white rounded-md border-0 shadow-sm cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <CardContent className="flex flex-col items-center gap-[7px] p-2.5">
                <div className="flex items-start gap-2 w-full">
                  <div
                    className="w-[76px] h-[75.52px] bg-cover bg-center rounded flex-shrink-0"
                    style={{ backgroundImage: `url(${stylist.image})` }}
                  />
                  <div className="flex flex-col items-start gap-[3px] flex-1">
                    <div className="flex items-center gap-1 w-full">
                      <div className="text-sm [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black tracking-[0] leading-[normal]">
                        {stylist.name}
                      </div>
                      <Badge className="h-auto px-1 py-px bg-[#dacbb1] text-[#645e57] text-[10px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium rounded-sm hover:bg-[#dacbb1]">
                        {stylist.level}
                      </Badge>
                    </div>

                    <div className="text-[11px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] tracking-[0] leading-[normal]">
                      {stylist.role}
                    </div>

                    <div className="flex items-center gap-[3px] flex-wrap">
                      <div className="text-[11px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] tracking-[0] leading-[normal]">
                        擅长:
                      </div>
                      {stylist.specialties.map((specialty, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="h-auto px-1 py-px bg-[#f6f6f6] text-[#a6a6a6] text-[10px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal rounded-sm hover:bg-[#f6f6f6]"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-[3px]">
                        <div className="text-xs [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] tracking-[0] leading-[normal]">
                          {stylist.rating}
                        </div>
                        <div className="flex items-center gap-0.5 p-px bg-[#333333] rounded-sm">
                          <div className="w-2 h-2 rounded-[14px]">
                            <img
                              className="w-full h-full"
                              alt="Star"
                              src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/star-1.svg"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5">
                        <div className="flex items-end gap-0.5">
                          <div className="text-[11px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] tracking-[0] leading-[normal]">
                            服务
                          </div>
                          <div className="text-xs [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] tracking-[0] leading-[normal]">
                            {stylist.services}
                          </div>
                        </div>
                        <div className="text-xs [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] tracking-[0] leading-[normal]">
                          ｜
                        </div>
                        <div className="flex items-end gap-0.5">
                          <div className="text-[11px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] tracking-[0] leading-[normal]">
                            作品
                          </div>
                          <div className="text-xs [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] tracking-[0] leading-[normal]">
                            {stylist.works}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-[3px] flex-wrap">
                        {stylist.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="h-auto px-1 py-px bg-white text-[#a6a6a6] text-[10px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal rounded-sm border-[#a6a6a6] hover:bg-white"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-[11px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] tracking-[0] leading-[normal] whitespace-nowrap ml-2">
                        {stylist.distance}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
