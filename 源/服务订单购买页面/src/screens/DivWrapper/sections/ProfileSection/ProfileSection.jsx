import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../components/ui/avatar";
import { ChevronRightIcon } from "lucide-react";

const serviceItems = [
  { name: "发型提案", quantity: "*1" },
  { name: "头发清洁", quantity: "*1" },
  { name: "发型修剪", quantity: "*1" },
  { name: "吹风造型", quantity: "*1" },
];

const guaranteeItems = [
  "有效日期2019-12-24至2019-12-30",
  "需您当日一次性体验完所有项目",
  "不予其他优惠同享",
];

const warmTips = [
  "有效日期2019-12-24至2019-12-30",
  "需您当日一次性体验完所有项目",
  "不予其他优惠同享",
];

const serviceNotices = [
  "有效日期2019-12-24至2019-12-30",
  "需您当日一次性体验完所有项目",
  "不予其他优惠同享",
  "有效日期2019-12-24至2019-12-30",
  "需您当日一次性体验完所有项目",
  "不予其他优惠同享",
];

const reviewTags = [
  { label: "技术很好", count: "232", active: true },
  { label: "效果满意", count: "321", active: false },
  { label: "服务态度", count: "321", active: false },
];

const questions = [
  "只烫不染的短发多少钱？头发比较干，不知道能不能做？",
  "刘海发际线太高怎么办？",
];

const recommendedServices = [
  {
    image: "https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    stylistName: "李天天",
    stylistRole: "美发师",
    rating: "4.8",
    reviewCount: "768",
    distance: "6.7km",
    avatar: "https://c.animaapp.com/mifnbli6udxphC/img/ellipse-34-1.svg",
  },
  {
    image: "https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    stylistName: "李天天",
    stylistRole: "美发师",
    rating: "4.8",
    reviewCount: "768",
    distance: "6.7km",
    avatar: "https://c.animaapp.com/mifnbli6udxphC/img/ellipse-34-1.svg",
  },
];

export const ProfileSection = () => {
  return (
    <section className="flex flex-col w-full max-w-[376px] mx-auto items-center gap-1.5 px-4">
<Card className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
<CardContent className="flex flex-col items-start gap-2.5 p-[13px_13px_15px]">
<div className="flex flex-col items-start gap-[9px] w-full">
<div className="flex items-center justify-between w-full">
<div className="inline-flex items-end">
<span className="text-xl [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333]">
¥
                </span>
<span className="[font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-[26px] whitespace-nowrap">
799
                </span>
</div>
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm">
已售1234
              </span>
</div>
<div className="flex items-start justify-between w-full">
<div className="flex flex-col w-[226px] items-start gap-[7px]">
<h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-lg">
洗剪吹 发型提案+裁剪+造型
                </h2>
<div className="inline-flex items-center gap-2.5">
<img
                    className="w-5 h-5"
                    alt="Coupon"
                    src="https://c.animaapp.com/mifnbli6udxphC/img/frame-5.svg"
                  />
<div className="inline-flex items-start gap-[3px]">
<Badge variant="secondary" className="h-5 px-1.5 py-[3px] bg-[#f6f6f6] text-[#a6a6a6] text-[11px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium rounded-sm hover:bg-[#f6f6f6]">
满100-5
                    </Badge>
<Badge variant="secondary" className="h-5 px-1.5 py-[3px] bg-[#f6f6f6] text-[#a6a6a6] text-[11px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium rounded-sm hover:bg-[#f6f6f6]">
满500-50
                    </Badge>
</div>
</div>
</div>
<button className="w-[30px] h-[30px]" aria-label="Add to favorites">
<img
                  className="w-full h-full"
                  alt="Favorite"
                  src="https://c.animaapp.com/mifnbli6udxphC/img/frame-2142.svg"
                />
</button>
</div>
</div>
</CardContent>
</Card>
<Card className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:100ms]">
<CardContent className="flex flex-col items-start gap-2.5 p-[13px_13px_15px]">
<div className="flex flex-col w-full items-center justify-center gap-2.5 px-2.5 py-3 rounded border border-solid border-[#f6f6f6] bg-[linear-gradient(180deg,rgba(246,246,246,1)_0%,rgba(251,251,251,1)_100%)]">
<div className="flex items-center gap-[26px] w-full">
<div className="flex flex-col w-[210px] items-start gap-[7px]">
<div className="flex flex-col items-start gap-[3px] w-full">
<h3 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm">
预约优惠专家
                  </h3>
<p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px]">
即可享受10%以上的项目服务优惠！
                  </p>
</div>
</div>
<Button
                variant="outline"
                className="w-[90px] h-[35px] px-[21px] py-2 bg-white rounded-3xl border-0 hover:bg-white"
              >
<span className="bg-[linear-gradient(90deg,rgba(253,145,255,1)_0%,rgba(83,64,254,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-xs">
查看预约
                </span>
</Button>
</div>
</div>
</CardContent>
</Card>
<Card className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
<CardContent className="flex flex-col h-20 items-center gap-[7px] p-2.5">
<div className="flex items-start gap-2 w-full">
<Avatar className="w-[60px] h-[59.62px] rounded-sm">
<AvatarImage
                src="https://c.animaapp.com/mifnbli6udxphC/img/rectangle-153.png"
                alt="李天天"
              />
<AvatarFallback>李</AvatarFallback>
</Avatar>
<div className="flex flex-col items-start gap-[3px] flex-1">
<div className="flex items-center gap-1 w-full">
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm">
李天天
                </span>
<Badge className="px-1 py-px bg-[#dacbb1] text-[#645e57] text-[10px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium rounded-sm hover:bg-[#dacbb1]">
高级
                </Badge>
</div>
<div className="inline-flex items-center gap-1.5">
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px]">
店长｜从业12年
                </span>
</div>
<div className="inline-flex items-center gap-2">
<div className="inline-flex items-center gap-[3px]">
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs">
4.8
                  </span>
<div className="inline-flex items-center gap-0.5 p-px bg-[#333333] rounded-sm">
<div className="w-2 h-2 rounded-[14px]">
<img
                        className="w-full h-full"
                        alt="Star"
                        src="https://c.animaapp.com/mifnbli6udxphC/img/star-1.svg"
                      />
</div>
</div>
</div>
<div className="inline-flex items-center gap-0.5">
<div className="inline-flex items-end gap-0.5">
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
服务
                    </span>
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs">
287
                    </span>
</div>
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs">
｜
                  </span>
<div className="inline-flex items-end gap-0.5">
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
作品
                    </span>
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs">
123
                    </span>
</div>
</div>
</div>
</div>
<Button
              variant="outline"
              className="h-[30px] px-[15px] py-2 bg-white border-[#e7e7e7] rounded-sm hover:bg-white"
            >
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#666666] text-[11px]">
进入店铺
              </span>
</Button>
</div>
</CardContent>
</Card>
<div className="flex flex-col w-full items-start gap-1.5 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:300ms]">
<Card className="w-full">
<CardContent className="flex flex-col items-start justify-center gap-2.5 px-2.5 py-[15px]">
<h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center">
服务内容
            </h3>
<div className="flex flex-col items-start gap-2.5 w-full">
{serviceItems.map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-2.5 w-full">
<div className="flex items-center justify-between w-full">
<span className="w-12 text-[#666666] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-xs">
{item.name}
                    </span>
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
{item.quantity}
                    </span>
</div>
{index < serviceItems.length - 1 && (
                    <Separator className="w-full h-px" />
)}
                </div>
))}
            </div>
</CardContent>
</Card>
<Card className="w-full">
<CardContent className="flex flex-col items-start justify-center gap-2.5 px-2.5 py-[15px]">
<h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center">
服务保障
            </h3>
<div className="flex flex-col items-start gap-2.5 w-full">
{guaranteeItems.map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-2.5 w-full">
<p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs">
{item}
                  </p>
</div>
))}
            </div>
</CardContent>
</Card>
<Card className="w-full">
<CardContent className="flex flex-col items-start justify-center gap-2.5 px-2.5 py-[15px]">
<h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center">
温馨提示
            </h3>
<div className="flex flex-col items-start gap-2.5 w-full">
{warmTips.map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-2.5 w-full">
<p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs">
{item}
                  </p>
</div>
))}
            </div>
</CardContent>
</Card>
<Card className="w-full">
<CardContent className="flex flex-col items-start justify-center gap-2.5 pt-[15px] pb-2.5 px-2.5">
<h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center">
图文详情
            </h3>
<img
              className="w-full h-[343px] rounded-sm object-cover"
              alt="Service detail"
              src="https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png"
            />
<img
              className="w-full h-[343px] rounded-sm object-cover"
              alt="Service detail"
              src="https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png"
            />
<button className="flex flex-col items-center gap-2.5 w-full">
<div className="inline-flex items-center justify-center gap-1">
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-xs">
查看更多图文详情
                </span>
<ChevronRightIcon className="w-[19px] h-[18px] text-[#a6a6a6]" />
</div>
</button>
</CardContent>
</Card>
</div>
<div className="flex flex-col items-center gap-2 w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
<Card className="w-full">
<CardContent className="flex flex-col items-start justify-center gap-2.5 px-2.5 py-[15px]">
<h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center">
服务须知
            </h3>
<div className="flex flex-col items-start gap-2.5 w-full">
{serviceNotices.map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-2.5 w-full">
<p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs">
{item}
                  </p>
</div>
))}
            </div>
</CardContent>
</Card>
<Card className="w-full">
<CardContent className="flex flex-col items-start justify-center gap-3 p-2.5">
<div className="flex items-center justify-between w-full">
<h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center">
顾客点评
              </h3>
<button className="inline-flex items-center gap-1.5">
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs">
123条点评
                </span>
<ChevronRightIcon className="w-3.5 h-3.5 text-[#a6a6a6]" />
</button>
</div>
<div className="flex flex-wrap items-start gap-[6px] w-full">
{reviewTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant={tag.active ? "default" : "secondary"}
                  className={`px-2.5 py-1 ${
                    tag.active
                      ? "bg-[#333333] text-white hover:bg-[#333333]"
                      : "bg-[#f6f6f6] text-[#a6a6a6] hover:bg-[#f6f6f6]"
                  } rounded-sm`}
                >
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[11px]">
{tag.label}
                  </span>
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[10px]">
{tag.count}
                  </span>
</Badge>
))}
            </div>
<div className="inline-flex h-[100px] items-center gap-3 w-full overflow-hidden">
<div className="inline-flex items-start gap-2">
<img
                  className="w-[100px] h-[100px]"
                  alt="Review"
                  src="https://c.animaapp.com/mifnbli6udxphC/img/rectangle-187.png"
                />
<div className="flex flex-col w-[194px] items-start gap-px">
<h4 className="w-[255px] h-[18px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[18px] whitespace-nowrap">
环境特别好
                  </h4>
<div className="inline-flex items-center gap-0.5">
<span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs">
5.0
                    </span>
{[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2.5 h-2.5">
<img
                          className="w-full h-full"
                          alt="Star"
                          src="https://c.animaapp.com/mifnbli6udxphC/img/star-1.svg"
                        />
</div>
))}
                  </div>
<p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] leading-[18px]">
环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境...
                  </p>
<div className="flex items-center w-full">
<div className="inline-flex items-center gap-1.5">
<Avatar className="w-[26px] h-[26px]">
<AvatarImage src="https://c.animaapp.com/mifnbli6udxphC/img/ellipse-34.svg" />
<AvatarFallback className="bg-[#a6a6a6]">加</AvatarFallback>
</Avatar>
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
加菲猫
                      </span>
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[10px]">
2019-12-25
                      </span>
</div>
</div>
</div>
</div>
<div className="inline-flex items-start gap-2 relative">
<img
                  className="w-[39px] h-[100px]"
                  alt="Review"
                  src="https://c.animaapp.com/mifnbli6udxphC/img/rectangle-187-1.png"
                />
<div className="absolute -top-3 left-6 w-[15px] h-[125px] bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_61%,rgba(255,255,255,0)_100%)]" />
</div>
<div className="w-[22px] h-[125px] bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0)_100%)]" />
</div>
</CardContent>
</Card>
<Card className="w-full">
<CardContent className="flex flex-col items-center justify-center gap-2.5 p-2.5">
<div className="flex items-center justify-between w-full">
<h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center">
问TA
              </h3>
<button className="inline-flex items-center gap-1.5">
<span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs">
12条回答
                </span>
<ChevronRightIcon className="w-3.5 h-3.5 text-[#a6a6a6]" />
</button>
</div>
{questions.map((question, index) => (
              <div key={index} className="flex items-center gap-2 w-full">
<div className="flex flex-col w-5 h-5 items-center justify-center gap-2.5 px-1 py-0.5 bg-[#fcf0e2] rounded">
<span className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-[#ff9763] text-xs">
问
                  </span>
</div>
<p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
{question}
                </p>
</div>
))}
          </CardContent>
</Card>
<div className="flex items-center justify-center gap-2.5 px-1.5 py-0 w-full">
<h3 className="flex-1 [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm">
为您推荐
          </h3>
</div>
<div className="flex flex-wrap w-full items-center justify-between gap-[5px]">
{recommendedServices.map((service, index) => (
            <Card key={index} className="w-[179px] p-0 pb-2 rounded">
<CardContent className="flex flex-col w-full items-center gap-[7px] p-0">
<img
                  className="w-full h-[179px] rounded object-cover"
                  alt={service.title}
                  src={service.image}
                />
<div className="flex flex-col items-start gap-1.5 px-2 py-0 w-full">
<div className="flex flex-col items-start gap-[3px] w-full">
<div className="flex items-center gap-[3px] w-full">
<h4 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base">
{service.title}
                      </h4>
</div>
<div className="flex flex-col items-start gap-[3px] w-full">
<p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs">
{service.description}
                      </p>
<div className="inline-flex items-center gap-[3px]">
<span className="text-sm [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333]">
¥
                        </span>
<span className="[font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-sm whitespace-nowrap">
{service.price}
                        </span>
</div>
</div>
</div>
<div className="flex items-end justify-between w-full">
<div className="inline-flex items-center gap-1.5">
<Avatar className="w-[26px] h-[26px]">
<AvatarImage src={service.avatar} />
<AvatarFallback className="bg-[#a6a6a6]">李</AvatarFallback>
</Avatar>
                <div className="inline-flex flex-col items-start gap-0.5">
                  <div className="inline-flex items-start gap-1">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px]">
                      {service.stylistName}
                    </span>
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
                      {service.stylistRole}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-0.5">
                    <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs">
                      {service.rating}
                    </span>
                    <div className="w-2.5 h-2.5">
                      <img
                        className="w-full h-full"
                        alt="Star"
                        src="https://c.animaapp.com/mifnbli6udxphC/img/star-1.svg"
                      />
                    </div>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
                      ({service.reviewCount})
                    </span>
                  </div>
                </div>
</div>
<span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px]">
{service.distance}
                    </span>
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
