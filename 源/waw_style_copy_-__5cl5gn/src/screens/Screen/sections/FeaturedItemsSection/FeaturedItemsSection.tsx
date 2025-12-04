import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const categoryItems = [
  {
    icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2006-1.svg",
    title: "专业店",
    subtitle: "专业服务店",
  },
  {
    icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2005.svg",
    title: "品牌店",
    subtitle: "影响力名店",
  },
  {
    icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2005-1.svg",
    title: "工作室",
    subtitle: "独立设计师",
  },
  {
    icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2006.svg",
    title: "综合店",
    subtitle: "多服务模式",
  },
];

const tabItems = [
  { label: "星级店", active: true },
  { label: "人气店", active: false },
  { label: "男士店", active: false, badge: "NEW" },
];

const featuredStores = [
  {
    image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
    overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
    name: "成都NICE造型沙龙",
    type: "专业店｜2012年开业",
    rating: "4.8",
    designers: "8人",
    services: "1236",
    amenities: ["代客泊车", "免费茶点"],
    distance: "7.5km",
    tag: "舒适",
  },
  {
    image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
    overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
    name: "成都NICE造型沙龙",
    type: "专业店｜2012年开业",
    rating: "4.8",
    designers: "8人",
    services: "1236",
    amenities: ["代客泊车", "免费茶点"],
    distance: "7.5km",
    tag: "舒适",
  },
  {
    image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
    overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
    name: "成都NICE造型沙龙",
    type: "专业店｜2012年开业",
    rating: "4.8",
    designers: "8人",
    services: "1236",
    amenities: ["代客泊车", "免费茶点"],
    distance: "7.5km",
    tag: "舒适",
  },
];

const nearbyStores = [
  {
    image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-6.png",
    name: "成都NICE造型沙龙",
    type: "专业店｜2012年开业",
    rating: "4.8",
    designers: "8人",
    services: "1236",
    amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
    distance: "7.5km",
    tag: "舒适",
  },
  {
    image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-1.png",
    name: "成都NICE造型沙龙",
    type: "专业店｜2012年开业",
    rating: "4.8",
    designers: "8人",
    services: "1236",
    amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
    distance: "7.5km",
    tag: "舒适",
  },
  {
    image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-2.png",
    name: "成都NICE造型沙龙",
    type: "专业店｜2012年开业",
    rating: "4.8",
    designers: "8人",
    services: "1236",
    amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
    distance: "7.5km",
    tag: "舒适",
  },
  {
    image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-3.png",
    name: "成都NICE造型沙龙",
    type: "专业店｜2012年开业",
    rating: "4.8",
    designers: "8人",
    services: "1236",
    amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
    distance: "7.5km",
    tag: "舒适",
  },
  {
    image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-4.png",
    name: "成都NICE造型沙龙",
    type: "专业店｜2012年开业",
    rating: "4.8",
    designers: "8人",
    services: "1236",
    amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
    distance: "7.5km",
    tag: "舒适",
  },
  {
    image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-5.png",
    name: "成都NICE造型沙龙",
    type: "专业店｜2012年开业",
    rating: "4.8",
    designers: "8人",
    services: "1236",
    amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
    distance: "7.5km",
    tag: "舒适",
  },
  {
    image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-6.png",
    name: "成都NICE造型沙龙",
    type: "专业店｜2012年开业",
    rating: "4.8",
    designers: "8人",
    services: "1236",
    amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
    distance: "7.5km",
    tag: "舒适",
  },
];

const paginationDots = [
  { active: false },
  { active: false },
  { active: true },
  { active: false },
];

export const FeaturedItemsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-end gap-[9px] relative">
      <Card className="w-full bg-white rounded-md border-0 shadow-sm">
        <CardContent className="flex items-center justify-between px-[15px] py-2.5 gap-2">
          {categoryItems.map((item, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-[3px] min-w-0 flex-1 transition-opacity hover:opacity-80"
            >
              <img className="w-11 h-11" alt={item.title} src={item.icon} />
              <div className="flex flex-col items-center w-full">
                <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-xs text-center tracking-[0] leading-[normal]">
                  {item.title}
                </div>
                <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[9px] text-center tracking-[0] leading-[normal]">
                  {item.subtitle}
                </div>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-md border-0 shadow-sm">
        <CardContent className="flex flex-col items-center gap-2 p-2.5">
          <div className="flex items-center justify-between w-full">
            <div className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
              精选店
            </div>
            <img
              className="w-[22px] h-[22px]"
              alt="Frame"
              src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-3.svg"
            />
          </div>

          <div className="flex items-center gap-[15px] w-full relative">
            {tabItems.map((tab, index) => (
              <button
                key={index}
                className={`relative [font-family:'PingFang_SC-${tab.active ? "Semibold" : "Regular"}',Helvetica] font-normal text-[13px] text-center tracking-[0] leading-[normal] transition-colors ${
                  tab.active ? "text-[#333333]" : "text-[#a6a6a6]"
                }`}
              >
                {tab.label}
                {tab.badge && (
                  <div className="absolute -top-[7px] left-full ml-1 w-[25px] h-3">
                    <img
                      className="absolute top-px left-0 w-[23px] h-2.5"
                      alt="Rectangle"
                      src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-216.svg"
                    />
                    <div className="absolute top-0 left-[3px] w-[18px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-[7px] tracking-[0] leading-[normal]">
                      {tab.badge}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {featuredStores.map((store, index) => (
            <div key={index} className="relative w-full h-[85px]">
              <div className="absolute w-full h-[90.59%] top-[9.41%] left-0 bg-[#f6f6f6] rounded" />

              <img
                className="absolute w-[44.02%] h-full top-0 left-0 object-cover"
                alt="Store"
                src={store.image}
              />

              <img
                className="absolute w-[44.02%] h-[28.24%] top-[71.76%] left-0"
                alt="Overlay"
                src={store.overlay}
              />

              <div className="flex w-[46.94%] h-[20.00%] items-center gap-2 absolute top-[75.29%] left-0 px-2">
                <div className="inline-flex items-center gap-[3px]">
                  <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-[10px] tracking-[0] leading-[normal]">
                    {store.rating}
                  </div>
                  <div className="inline-flex items-center gap-0.5 p-px bg-white rounded-sm">
                    <div className="relative w-2 h-2 rounded-[14px]">
                      <img
                        className="absolute w-full h-full top-[7.21%] left-[9.00%]"
                        alt="Star"
                        src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/star-1.svg"
                      />
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-0.5">
                  <div className="inline-flex items-end gap-0.5">
                    <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffff99] text-[9px] tracking-[0] leading-[normal]">
                      设计师
                    </div>
                    <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-[10px] tracking-[0] leading-[normal]">
                      {store.designers}
                    </div>
                  </div>
                  <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#ffffff99] text-[10px] tracking-[0] leading-[normal]">
                    ｜
                  </div>
                  <div className="inline-flex items-end gap-0.5">
                    <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffff99] text-[9px] tracking-[0] leading-[normal]">
                      服务
                    </div>
                    <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-[10px] tracking-[0] leading-[normal]">
                      {store.services}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-[51.90%] items-start gap-[3px] absolute h-[67.06%] top-[21.18%] left-[45.19%]">
                <div className="flex items-center gap-1 w-full">
                  <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm tracking-[0] leading-[normal]">
                    {store.name}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5">
                  <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                    {store.type}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="inline-flex items-center gap-[3px]">
                    {store.amenities.map((amenity, amenityIndex) => (
                      <Badge
                        key={amenityIndex}
                        variant="outline"
                        className="h-auto px-1 py-px bg-[#f6f6f6] rounded-sm border-[#a6a6a6] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] tracking-[0] leading-[normal]"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                    {store.distance}
                  </div>
                </div>
              </div>

              <Badge className="h-[21.18%] px-2 py-px absolute top-[9.41%] left-[calc(50.00%_+_136px)] rounded-[0px_4px_0px_8px] bg-[#dacbb1] hover:bg-[#dacbb1] border-0">
                <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#645e57] text-[10px] tracking-[0] leading-[normal]">
                  {store.tag}
                </div>
              </Badge>
            </div>
          ))}

          <div className="inline-flex items-center gap-[3px]">
            {paginationDots.map((dot, index) => (
              <div
                key={index}
                className={`${
                  dot.active
                    ? "w-3.5 h-[5px] bg-[#333333] rounded-[14px]"
                    : "w-[5px] h-[5px] bg-[#d9d9d9] rounded-[2.5px]"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between w-full">
        <div className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
          附近推荐
        </div>
        <button className="inline-flex items-center gap-0.5 transition-opacity hover:opacity-80">
          <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm text-center tracking-[0] leading-[normal]">
            筛选
          </div>
          <img
            className="w-2.5 h-2.5"
            alt="Filter"
            src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2.svg"
          />
        </button>
      </div>

      <div className="relative w-full">
        <div className="flex items-center h-[30px] bg-[url(https://c.animaapp.com/mi5cgxi6ndVkfo/img/subtract.svg)] bg-[100%_100%] px-2.5">
          <button className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80">
            <img
              className="w-3.5 h-3.5"
              alt="Brand"
              src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-1.svg"
            />
            <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#dacbb1] text-sm tracking-[0] leading-[normal]">
              品牌馆
            </div>
          </button>
        </div>

        <div className="flex flex-col items-start gap-1.5 mt-[30px]">
          {nearbyStores.map((store, index) => (
            <Card
              key={index}
              className="w-full bg-white rounded-md border-0 shadow-sm"
            >
              <CardContent className="flex flex-col items-start gap-[7px] p-2.5">
                <div className="flex items-start gap-2 w-full">
                  <div
                    className="w-[76px] h-[75.52px] bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${store.image})` }}
                  />

                  <div className="flex flex-col items-start gap-[3px] flex-1 min-w-0">
                    <div className="flex items-center gap-1 w-full">
                      <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm tracking-[0] leading-[normal] truncate">
                        {store.name}
                      </div>
                      <Badge className="h-auto px-1 py-px bg-[#dacbb1] hover:bg-[#dacbb1] rounded-sm border-0 flex-shrink-0">
                        <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#645e57] text-[10px] tracking-[0] leading-[normal]">
                          {store.tag}
                        </div>
                      </Badge>
                    </div>

                    <div className="inline-flex items-center gap-1.5">
                      <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                        {store.type}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2">
                      <div className="inline-flex items-center gap-[3px]">
                        <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-[normal]">
                          {store.rating}
                        </div>
                        <div className="inline-flex items-center gap-0.5 p-px bg-[#333333] rounded-sm">
                          <div className="relative w-2 h-2 rounded-[14px]">
                            <img
                              className="absolute w-full h-full top-[7.21%] left-[9.00%]"
                              alt="Star"
                              src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/star-1.svg"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-0.5">
                        <div className="inline-flex items-end gap-0.5">
                          <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                            设计师
                          </div>
                          <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0] leading-[normal]">
                            {store.designers}
                          </div>
                        </div>
                        <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                          ｜
                        </div>
                        <div className="inline-flex items-end gap-0.5">
                          <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                            服务
                          </div>
                          <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs tracking-[0] leading-[normal]">
                            {store.services}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full">
                      <div className="inline-flex items-center gap-[3px] flex-wrap">
                        {store.amenities.map((amenity, amenityIndex) => (
                          <Badge
                            key={amenityIndex}
                            variant="outline"
                            className="h-auto px-1 py-px bg-white rounded-sm border-[#a6a6a6] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] tracking-[0] leading-[normal]"
                          >
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal] flex-shrink-0">
                        {store.distance}
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
