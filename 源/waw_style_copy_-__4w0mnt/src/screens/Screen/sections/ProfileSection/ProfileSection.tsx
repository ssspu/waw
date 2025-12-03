import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { ChevronRightIcon, XIcon, MapPinIcon, StarIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../components/ui/avatar";

const quickActions = [
  {
    icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2284.svg",
    title: "设计师",
    subtitle: "发现宝藏设计师",
  },
  {
    icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2280.svg",
    title: "优服务",
    subtitle: "甄选特色服务",
  },
  {
    icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2278.svg",
    title: "品牌馆",
    subtitle: "优质线下门店",
  },
];

const bottomActions = [
  {
    icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2005.svg",
    title: "预约单",
    subtitle: "你的预约订单",
  },
  {
    icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2006.svg",
    title: "优惠券",
    subtitle: "更多折扣等你",
  },
  {
    icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2007.svg",
    title: "会员",
    subtitle: "VIP平台特权",
  },
  {
    icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2008.svg",
    title: "入驻中",
    subtitle: "诚邀全球设计师",
  },
];

const portfolioItems = [
  {
    image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-175.png",
    overlay: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-177-1.svg",
    gradient: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-179.svg",
    label: "WOMAN",
    count: "12,349+",
    align: "left",
  },
  {
    image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-176.png",
    overlay: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-178.svg",
    gradient: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-180.svg",
    label: "MAN",
    count: "12,349+",
    align: "right",
  },
];

const designerTabs = ["首席创意", "总监店长", "网红名师", "国际导师"];

const designers = [
  {
    image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
    name: "李天天",
    role: "美发师",
    level: "高级",
    title: "总监｜从业十年",
    rating: "4.8",
    reviews: "234",
    distance: "6.7km",
  },
  {
    image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
    name: "李天天",
    role: "美发师",
    level: "高级",
    title: "总监｜从业十年",
    rating: "4.8",
    reviews: "234",
    distance: "6.7km",
  },
];

const brandTabs = ["专业店", "品牌店", "工作室", "综合店"];

const brands = [
  {
    image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
    name: "成都意念美发造型沙龙",
    rating: "4.8",
    reviews: "768",
    address: "成都青羊区草堂路12号...",
    distance: "7.5km",
    width: "w-[210px]",
  },
  {
    image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-3.png",
    name: "成都意念美发造",
    rating: "4.8",
    reviews: "768",
    address: "成都青羊区草堂路",
    distance: "",
    width: "w-[120px]",
    hasOverlay: true,
  },
];

const serviceTabs = ["全部", "洗吹", "剪发", "烫发", "染发", "护发", "头皮", "接发"];

const services = [
  {
    image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    designerName: "李天天",
    designerRole: "美发师",
    rating: "4.8",
    reviews: "768",
    distance: "6.7km",
    avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
  },
  {
    image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    designerName: "李天天",
    designerRole: "美发师",
    rating: "4.8",
    reviews: "768",
    distance: "6.7km",
    avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
  },
  {
    image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    designerName: "李天天",
    designerRole: "美发师",
    rating: "4.8",
    reviews: "768",
    distance: "6.7km",
    avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
  },
  {
    image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    designerName: "李天天",
    designerRole: "美发师",
    rating: "4.8",
    reviews: "768",
    distance: "6.7km",
    avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
  },
];

const paginationDots = [
  { active: false, width: "w-[5px]" },
  { active: false, width: "w-[5px]" },
  { active: true, width: "w-3.5" },
  { active: false, width: "w-[5px]" },
];

export const ProfileSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-2 px-1.5">
<Card className="w-full bg-[#303136] border-0 rounded translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
<CardContent className="flex items-center justify-between p-2.5">
<div className="inline-flex items-center gap-2">
<Avatar className="w-[30px] h-[30px]">
<AvatarImage src="https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-71.svg" />
<AvatarFallback>U</AvatarFallback>
</Avatar>
<p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#dacbb1] text-[11px]">
hey,快去看看你周边设计师吧！
            </p>
</div>
<Button variant="ghost" size="icon" className="h-7 w-7 p-0">
<img
              className="w-7 h-7"
              alt="Close"
              src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-6.svg"
            />
</Button>
</CardContent>
</Card>
<Card className="w-full border-0 rounded-md translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:100ms]">
<CardContent className="p-0">
<div className="flex items-center gap-1.5">
{quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex-1 h-[120px] flex-col gap-[7px] px-4 py-[15px] hover:bg-accent/50 transition-colors"
              >
<img className="w-11 h-11" alt={action.title} src={action.icon} />
<div className="flex flex-col items-center gap-0.5">
<span className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black text-[13px]">
{action.title}
                  </span>
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] text-center">
{action.subtitle}
                  </span>
</div>
</Button>
))}
          </div>
<div className="flex items-center justify-between px-[15px] py-2.5 border-t">
{bottomActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex-col h-auto gap-[3px] p-0 hover:bg-accent/50 transition-colors"
              >
<img className="w-11 h-11" alt={action.title} src={action.icon} />
<div className="flex flex-col items-center">
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-xs text-center">
{action.title}
                  </span>
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[9px] text-center">
{action.subtitle}
                  </span>
</div>
</Button>
))}
          </div>
</CardContent>
</Card>
<Card className="w-full border-0 rounded-md translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
<CardContent className="p-2.5 flex flex-col gap-[7px]">
<div className="flex items-end justify-between">
<h2 className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black text-sm">
作品集
            </h2>
<Button variant="ghost" size="icon" className="h-[22px] w-[22px] p-0">
<img
                className="w-[22px] h-[22px]"
                alt="More"
                src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-7.svg"
              />
</Button>
</div>
<div className="relative w-full h-[108px]">
{portfolioItems.map((item, index) => (
              <div
                key={index}
                className={`absolute top-0 ${index === 0 ? "left-0" : "left-[157px]"} w-[186px] h-[108px]`}
              >
<img
                  className={`absolute top-0 ${index === 0 ? "left-0" : "left-px"} w-[185px] h-[108px]`}
                  alt={item.label}
                  src={item.image}
                />
<img
                  className={`absolute top-0 ${index === 0 ? "left-0" : "left-px"} w-[186px] h-[108px]`}
                  alt="Overlay"
                  src={item.overlay}
                />
<img
                  className={`absolute top-[84px] ${index === 0 ? "left-0" : "left-[29px]"} ${index === 0 ? "w-[186px]" : "w-[157px]"} h-6`}
                  alt="Gradient"
                  src={item.gradient}
                />
<div
                  className={`flex items-center gap-1 absolute top-[87px] ${item.align === "left" ? "left-2.5" : "left-[100px]"}`}
                >
{item.align === "left" ? (
                    <>
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs">
{item.label}
                      </span>
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffff99] text-xs">
{item.count}
                      </span>
</>
) : (
                    <>
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffff99] text-xs">
{item.count}
                      </span>
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs">
{item.label}
                      </span>
</>
)}
                </div>
</div>
))}
          </div>
</CardContent>
</Card>
<Card className="w-full border-0 rounded-md translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:300ms]">
<CardContent className="p-2.5 flex flex-col gap-2">
<div className="flex items-end justify-between">
<h2 className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black text-sm">
设计师
            </h2>
<Button variant="ghost" size="icon" className="h-[22px] w-[22px] p-0">
<img
                className="w-[22px] h-[22px]"
                alt="More"
                src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-7.svg"
              />
</Button>
</div>
<div className="flex items-center gap-[15px] overflow-x-auto">
{designerTabs.map((tab, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-auto p-0 ${index === 0 ? "[font-family:'PingFang_SC-Semibold',Helvetica] text-[#333333]" : "[font-family:'PingFang_SC-Regular',Helvetica] text-[#a6a6a6]"} font-normal text-[13px] hover:text-[#333333] transition-colors`}
              >
{tab}
              </Button>
))}
          </div>
<div className="flex items-center gap-2.5">
{designers.map((designer, index) => (
              <Card key={index} className="w-[158px] border border-[#f3f3f3] rounded">
<CardContent className="p-0 pb-2">
<div className="flex flex-col items-center gap-1.5">
<div className="relative w-[158px] h-[159px]">
<div className="absolute top-0 left-0 w-[158px] h-[158px] rounded-[4px_4px_0px_0px] bg-[linear-gradient(180deg,rgba(244,244,244,1)_0%)]" />
<img
                        className="absolute top-px left-0 w-[158px] h-[158px]"
                        alt={designer.name}
                        src={designer.image}
                      />
</div>
<div className="flex flex-col items-start gap-[3px] px-[11px] py-1 w-full">
<div className="flex items-center gap-1 w-full">
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-[15px]">
{designer.name}
                        </span>
<Badge
                          variant="secondary"
                          className="bg-[#f6f6f6] text-[#666666] text-[10px] px-1 py-px h-auto [font-family:'PingFang_SC-Medium',Helvetica] font-medium"
                        >
{designer.role}
                        </Badge>
<Badge
                          variant="secondary"
                          className="bg-[#dacbb1] text-[#645e57] text-[10px] px-1 py-px h-auto [font-family:'PingFang_SC-Medium',Helvetica] font-medium"
                        >
{designer.level}
                        </Badge>
</div>
<p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px]">
{designer.title}
                      </p>
<div className="flex items-start justify-between w-full">
<div className="inline-flex items-center gap-[3px]">
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs">
{designer.rating}
                          </span>
<StarIcon className="w-2.5 h-2.5 fill-current text-[#333333]" />
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
({designer.reviews})
                          </span>
</div>
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#333333] text-xs">
{designer.distance}
                        </span>
</div>
</div>
</div>
</CardContent>
</Card>
))}
          </div>
<div className="inline-flex items-center gap-[3px] justify-center">
{paginationDots.map((dot, index) => (
              <div
                key={index}
                className={`${dot.width} h-[5px] ${dot.active ? "bg-[#333333] rounded-[14px]" : "bg-[#d9d9d9] rounded-[2.5px]"}`}
              />
))}
          </div>
</CardContent>
</Card>
<Card className="w-full border-0 rounded-md translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
<CardContent className="p-2.5 flex flex-col gap-2">
<div className="flex items-end justify-between">
<h2 className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black text-sm">
品牌馆
            </h2>
<Button variant="ghost" size="icon" className="h-[22px] w-[22px] p-0">
<img
                className="w-[22px] h-[22px]"
                alt="More"
                src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-7.svg"
              />
</Button>
</div>
<div className="flex items-center gap-[15px] overflow-x-auto">
{brandTabs.map((tab, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-auto p-0 ${index === 0 ? "[font-family:'PingFang_SC-Semibold',Helvetica] text-[#333333]" : "[font-family:'PingFang_SC-Regular',Helvetica] text-[#a6a6a6]"} font-normal text-[13px] hover:text-[#333333] transition-colors`}
              >
{tab}
              </Button>
))}
          </div>
<div className="flex items-center gap-2.5">
{brands.map((brand, index) => (
              <Card
                key={index}
                className={`${brand.width} border border-[#f3f3f3] rounded relative`}
              >
<CardContent className="p-0 pb-2">
<div className="flex flex-col items-center gap-1.5">
<div className={`${brand.width} h-[118px] relative`}>
{!brand.hasOverlay && (
                        <div className="absolute top-0 left-0 w-40 h-[118px] rounded-[4px_4px_0px_0px] bg-[linear-gradient(180deg,rgba(244,244,244,1)_0%)]" />
)}
                      <img
                        className={`${brand.hasOverlay ? "absolute top-0 left-0" : "absolute top-0 left-0"} ${brand.width} h-[118px] ${brand.hasOverlay ? "bg-[100%_100%]" : ""}`}
                        alt={brand.name}
                        src={brand.image}
                      />
</div>
<div className="flex flex-col items-start gap-[3px] px-[11px] py-1 w-full">
<div className="flex items-center gap-1 w-full">
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-[15px]">
{brand.name}
                        </span>
</div>
<div className="inline-flex items-center gap-[3px]">
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs">
{brand.rating}
                        </span>
<div className="inline-flex items-center gap-0.5">
{brand.hasOverlay ? (
                            <>
<StarIcon className="w-2.5 h-2.5 fill-current text-[#333333]" />
<StarIcon className="w-2.5 h-2.5 fill-current text-[#333333]" />
<StarIcon className="w-2.5 h-2.5 fill-current text-[#333333]" />
</>
) : (
                            <StarIcon className="w-2.5 h-2.5 fill-current text-[#333333]" />
)}
                        </div>
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
({brand.reviews})
                        </span>
</div>
<div className={`flex items-center ${brand.distance ? "justify-between w-full" : "gap-0.5"}`}>
<div className="inline-flex items-center gap-0.5">
<MapPinIcon className="w-3.5 h-3.5 text-[#666666]" />
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px]">
{brand.address}
                          </span>
</div>
{brand.distance && (
                          <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px]">
{brand.distance}
                          </span>
)}
                      </div>
</div>
{brand.hasOverlay && (
                      <div className="absolute top-0 left-[101px] w-[27px] h-[201px] bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_61%,rgba(255,255,255,0)_100%)]" />
)}
                  </div>
</CardContent>
</Card>
))}
          </div>
</CardContent>
</Card>
<div className="flex flex-col items-center gap-[5px] w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:500ms]">
<div className="flex flex-col items-start gap-2.5 px-0.5 py-0 w-full">
<div className="flex items-end justify-between w-full">
<h2 className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-black text-base">
优服务
            </h2>
<Button variant="ghost" className="h-auto p-0 gap-0.5">
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm text-center">
筛选
              </span>
<img
                className="w-2.5 h-2.5"
                alt="Filter"
                src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-5.svg"
              />
</Button>
</div>
<div className="flex items-start justify-center gap-5 w-full overflow-x-auto">
{serviceTabs.map((tab, index) => (
              <div key={index} className="inline-flex flex-col items-center gap-2.5 relative">
<Button
                  variant="ghost"
                  className={`h-auto p-0 ${index === 0 ? "[font-family:'PingFang_SC-Semibold',Helvetica] text-black" : "[font-family:'PingFang_SC-Medium',Helvetica] text-[#a6a6a6]"} font-normal text-sm text-center hover:text-black transition-colors`}
                >
{tab}
                </Button>
{index === 0 && (
                  <img
                    className="w-2.5 h-[3px]"
                    alt="Active indicator"
                    src="https://c.animaapp.com/mi4v97d2OSuz2g/img/vector-15.svg"
                  />
)}
              </div>
))}
          </div>
</div>
<div className="flex flex-wrap items-center justify-between gap-[5px] w-full">
{services.map((service, index) => (
            <Card key={index} className="w-[179px] border-0 rounded bg-white">
<CardContent className="p-0 pb-2">
<div className="flex flex-col items-center gap-[7px]">
<img
                    className="w-full h-[179px] rounded object-cover"
                    alt={service.title}
                    src={service.image}
                  />
<div className="flex flex-col items-start gap-1.5 px-2 py-0 w-full">
<div className="flex flex-col items-start gap-[3px] w-full">
<div className="flex items-center gap-[3px] w-full">
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base">
{service.title}
                        </span>
</div>
<div className="flex flex-col items-start gap-[3px] w-full">
                        <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs">
                          {service.description}
                        </p>
<div className="inline-flex items-center gap-[3px]">
<div className="inline-flex items-center">
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-sm">
¥
                            </span>
<span className="[font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-sm whitespace-nowrap">
{service.price}
                            </span>
</div>
</div>
</div>
</div>
<div className="flex items-end justify-between w-full">
<div className="inline-flex items-center gap-1.5">
<Avatar className="w-[26px] h-[26px]">
<AvatarImage src={service.avatar} />
<AvatarFallback className="bg-[#a6a6a6]">D</AvatarFallback>
</Avatar>
<div className="inline-flex flex-col items-start gap-0.5">
<div className="inline-flex items-start gap-1">
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px]">
{service.designerName}
                            </span>
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
{service.designerRole}
                            </span>
</div>
<div className="inline-flex items-center gap-0.5">
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs">
{service.rating}
                            </span>
<StarIcon className="w-2.5 h-2.5 fill-current text-[#333333]" />
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
({service.reviews})
                            </span>
</div>
</div>
</div>
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
{service.distance}
                      </span>
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
