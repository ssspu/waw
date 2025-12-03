import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../../components/ui/tabs";
import { Separator } from "../../../../components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../components/ui/avatar";
import { ChevronRightIcon } from "lucide-react";

const categoryTabs = [
  { id: "hairstylist", label: "发型师" },
  { id: "chief", label: "首席" },
  { id: "senior", label: "资深" },
  { id: "director", label: "总监" },
  { id: "manager", label: "店长" },
];

const stylistData = [
  {
    id: 1,
    name: "李天天",
    image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
    role: "美发师",
    level: "高级",
    position: "店长｜从业12年",
    specialties: ["短发裁剪", "染发设计"],
    rating: 4.8,
    serviceCount: 287,
    worksCount: 123,
    tags: ["提前预约", "上门服务", "技术专业"],
    price: 799,
    discount: "预约优惠10%",
    soldCount: 1234,
  },
  {
    id: 2,
    name: "李天天",
    image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
    role: "美发师",
    level: "高级",
    position: "店长｜从业12年",
    specialties: ["短发裁剪", "染发设计"],
    rating: 4.8,
    serviceCount: 287,
    worksCount: 123,
    tags: ["提前预约", "上门服务", "技术专业"],
    price: 799,
    discount: "预约优惠10%",
    soldCount: 1234,
  },
  {
    id: 3,
    name: "李天天",
    image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
    role: "美发师",
    level: "高级",
    position: "店长｜从业12年",
    specialties: ["短发裁剪", "染发设计"],
    rating: 4.8,
    serviceCount: 287,
    worksCount: 123,
    tags: ["提前预约", "上门服务", "技术专业"],
    price: 799,
    discount: "预约优惠10%",
    soldCount: 1234,
  },
  {
    id: 4,
    name: "李天天",
    image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
    role: "美发师",
    level: "高级",
    position: "店长｜从业12年",
    specialties: ["短发裁剪", "染发设计"],
    rating: 4.8,
    serviceCount: 287,
    worksCount: 123,
    tags: ["提前预约", "上门服务", "技术专业"],
    price: 799,
    discount: "预约优惠10%",
    soldCount: 1234,
  },
];

const serviceInfoData = [
  { label: "营业时间", value: ["周二 - 周日", "10:00-21:00"] },
  { label: "预约时间", value: ["提前3小时"] },
  { label: "美发师", value: ["15人"] },
  { label: "工位", value: ["15个"] },
  { label: "成立", value: ["2017-11-20"] },
  { label: "面积", value: ["160m"] },
];

const reviewTags = [
  { label: "技术很好", count: 232, active: true },
  { label: "效果满意", count: 321, active: false },
  { label: "服务态度", count: 321, active: false },
];

const questions = [
  "只烫不染的短发多少钱？头发比较干，不知道能不能做？",
  "刘海发际线太高怎么办？",
];

const serviceTabs = [
  { id: "notice", label: "服务须知" },
  { id: "features", label: "服务特色" },
  { id: "facilities", label: "环境设施" },
];

export const ProfileSection = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState("hairstylist");
  const [selectedServiceTab, setSelectedServiceTab] = useState("notice");

  return (
    <section className="flex flex-col w-full items-start gap-1.5 relative">
<nav className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
{categoryTabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => setSelectedCategory(tab.id)}
            className={`h-auto inline-flex items-center justify-center gap-2.5 px-2.5 py-1 relative flex-[0_0_auto] rounded-sm transition-colors ${
              selectedCategory === tab.id
                ? "bg-[#333333] text-white hover:bg-[#333333] hover:text-white"
                : "bg-white text-[#a6a6a6] hover:bg-white/80 hover:text-[#a6a6a6]"
            }`}
          >
<span className="relative w-fit mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[13px] tracking-[0] leading-[normal]">
{tab.label}
            </span>
</Button>
))}
      </nav>
<div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
<div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
{stylistData.map((stylist) => (
            <Card
              key={stylist.id}
              className="flex flex-col items-center gap-[7px] p-2.5 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-md border-0 shadow-none"
            >
<CardContent className="flex items-start justify-center gap-2 relative self-stretch w-full flex-[0_0_auto] p-0">
<img
                  className="relative w-20 h-20 rounded-sm object-cover"
                  alt={stylist.name}
                  src={stylist.image}
                />
<div className="flex items-end justify-between relative flex-1 grow">
<div className="inline-flex flex-col items-start gap-1.5 relative flex-[0_0_auto]">
<div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
<div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
<h3 className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm leading-[normal] relative tracking-[0]">
{stylist.name}
                        </h3>
<Badge
                          variant="secondary"
                          className="inline-flex items-center justify-center gap-2.5 px-1 py-px relative flex-[0_0_auto] bg-[#f6f6f6] rounded-sm border-0 hover:bg-[#f6f6f6]"
                        >
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] leading-[normal] relative tracking-[0]">
{stylist.role}
                          </span>
</Badge>
<Badge
                          variant="secondary"
                          className="inline-flex flex-[0_0_auto] items-center justify-center gap-2.5 px-1 py-px relative bg-[#dacbb1] rounded-sm border-0 hover:bg-[#dacbb1]"
                        >
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#645e57] text-[10px] leading-[normal] relative tracking-[0]">
{stylist.level}
                          </span>
</Badge>
</div>
<div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] leading-[normal] relative tracking-[0]">
{stylist.position}
                        </span>
</div>
<div className="inline-flex items-center gap-[3px] relative flex-[0_0_auto]">
<span className="w-fit mt-[-0.50px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[normal] relative tracking-[0]">
擅长:
                        </span>
{stylist.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="inline-flex items-center justify-center gap-2.5 px-1 py-px relative flex-[0_0_auto] bg-[#f6f6f6] rounded-sm border-0 hover:bg-[#f6f6f6]"
                          >
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] leading-[normal] relative tracking-[0]">
{specialty}
                            </span>
</Badge>
))}
                      </div>
<div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
<div className="inline-flex items-center gap-[3px] relative flex-[0_0_auto]">
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs leading-[normal] relative tracking-[0]">
{stylist.rating}
                          </span>
<div className="inline-flex items-center gap-0.5 p-px relative flex-[0_0_auto] bg-[#333333] rounded-sm">
<div className="relative w-2 h-2 rounded-[14px]">
<img
                                className="absolute w-full h-full"
                                alt="Star"
                                src="https://c.animaapp.com/mi5l377nJk1HHO/img/star-1.svg"
                              />
</div>
</div>
</div>
<div className="inline-flex items-center gap-0.5 relative flex-[0_0_auto]">
<div className="inline-flex items-end gap-0.5 relative flex-[0_0_auto]">
<span className="relative w-fit [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
服务
                            </span>
<span className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs relative w-fit tracking-[0] leading-[normal]">
{stylist.serviceCount}
                            </span>
</div>
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[normal] relative tracking-[0]">
｜
                          </span>
<div className="inline-flex items-end gap-0.5 relative flex-[0_0_auto]">
<span className="w-fit [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[normal] relative tracking-[0]">
作品
                            </span>
<span className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-xs relative w-fit tracking-[0] leading-[normal]">
{stylist.worksCount}
                            </span>
</div>
</div>
</div>
<div className="flex items-center gap-[5px] relative self-stretch w-full flex-[0_0_auto]">
<div className="inline-flex items-center gap-[3px] relative flex-[0_0_auto] mr-[-6.00px]">
{stylist.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="inline-flex items-center justify-center gap-2.5 px-1 py-px relative flex-[0_0_auto] bg-white rounded-sm border border-solid border-[#a6a6a6] hover:bg-white"
                            >
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] leading-[normal] relative tracking-[0]">
{tag}
                              </span>
</Badge>
))}
                        </div>
</div>
</div>
</div>
<div className="flex flex-col items-end justify-between relative flex-1 self-stretch grow">
<div className="flex flex-col items-end justify-center gap-0.5 relative self-stretch w-full flex-[0_0_auto]">
<div className="inline-flex items-end relative flex-[0_0_auto]">
<span className="relative w-fit [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
¥
                        </span>
<span className="mt-[-1.00px] [font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-lg whitespace-nowrap relative w-fit tracking-[0] leading-[normal]">
{stylist.price}
                        </span>
</div>
<div className="inline-flex items-center justify-center gap-1 relative flex-[0_0_auto] bg-white rounded-sm">
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffa77b] text-[10px] leading-[normal] relative tracking-[0]">
{stylist.discount}
                        </span>
</div>
</div>
<div className="inline-flex flex-col items-end justify-center gap-0.5 relative flex-[0_0_auto]">
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[normal] relative tracking-[0]">
已售{stylist.soldCount}
                      </span>
<Button className="inline-flex h-[30px] items-center justify-center gap-1 px-[15px] py-2 relative bg-[#333333] rounded-sm hover:bg-[#333333]/90">
<span className="w-fit mt-[-1.50px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#ffa77b] text-[11px] leading-[normal] relative tracking-[0]">
在线预订
                        </span>
</Button>
</div>
</div>
</div>
</CardContent>
</Card>
))}
        </div>
<Card className="flex flex-col items-start justify-center gap-2.5 px-2.5 py-[15px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-md border-0 shadow-none">
<CardContent className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] p-0">
<div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
<div className="inline-flex items-center gap-[15px] relative flex-[0_0_auto]">
{serviceTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedServiceTab(tab.id)}
                    className={`w-fit mt-[-1.00px] text-sm text-center leading-[normal] relative tracking-[0] transition-colors ${
                      selectedServiceTab === tab.id
                        ? "[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black"
                        : "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] hover:text-[#333333]"
                    }`}
                  >
{tab.label}
                  </button>
))}
              </div>
<ChevronRightIcon className="relative w-3.5 h-3.5 text-[#666666]" />
</div>
<div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
{serviceInfoData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]"
                >
<div className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
<span className="w-12 mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[normal] relative tracking-[0]">
{item.label}
                    </span>
<div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
{item.value.map((val, valIndex) => (
                        <span
                          key={valIndex}
                          className="mt-[-1.00px] text-[#333333] text-xs relative w-fit [font-family:'PingFang_SC-Medium',Helvetica] font-medium tracking-[0] leading-[normal]"
                        >
{val}
                        </span>
))}
                    </div>
</div>
{index < serviceInfoData.length - 1 && (
                    <Separator className="relative self-stretch w-full h-px mb-[-0.50px]" />
)}
                </div>
))}
            </div>
</CardContent>
</Card>
<Card className="flex flex-col items-start justify-center gap-3 p-2.5 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-md border-0 shadow-none">
<CardContent className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto] p-0">
<div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
<h3 className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center leading-[normal] relative tracking-[0]">
顾客点评
              </h3>
<button className="inline-flex items-center gap-1.5 relative flex-[0_0_auto] transition-opacity hover:opacity-80">
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[normal] relative tracking-[0]">
123条点评
                </span>
<ChevronRightIcon className="relative w-3.5 h-3.5 text-[#a6a6a6]" />
</button>
</div>
<div className="flex flex-wrap items-start gap-[6px_6px] relative self-stretch w-full flex-[0_0_auto]">
{reviewTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant={tag.active ? "default" : "secondary"}
                  className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 relative flex-[0_0_auto] rounded-sm border-0 ${
                    tag.active
                      ? "bg-[#333333] hover:bg-[#333333]/90"
                      : "bg-[#f6f6f6] hover:bg-[#f6f6f6]"
                  }`}
                >
<span
                    className={`w-fit mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[11px] leading-[normal] relative tracking-[0] ${
                      tag.active ? "text-white" : "text-[#a6a6a6]"
                    }`}
                  >
{tag.label}
                  </span>
<span
                    className={`mt-[-0.50px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[10px] relative w-fit tracking-[0] leading-[normal] ${
                      tag.active ? "text-white" : "text-[#a6a6a6]"
                    }`}
                  >
{tag.count}
                  </span>
</Badge>
))}
            </div>
<div className="inline-flex h-[100px] items-center gap-3 relative mr-[-44.00px]">
<div className="inline-flex items-start gap-2 relative flex-[0_0_auto]">
<div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
<img
                    className="relative w-[100px] h-[100px]"
                    alt="Review"
                    src="https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-187.png"
                  />
</div>
<div className="flex flex-col w-[194px] items-start gap-px relative">
<h4 className="w-[255px] h-[18px] mt-[-1.00px] mr-[-61.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[18px] whitespace-nowrap relative tracking-[0]">
环境特别好
                  </h4>
<div className="inline-flex items-center gap-0.5 relative flex-[0_0_auto]">
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs leading-[normal] relative tracking-[0]">
5.0
                    </span>
{[...Array(5)].map((_, index) => (
                      <div key={index} className="relative w-2.5 h-2.5">
<img
                          className="absolute w-full h-full"
                          alt="Star"
                          src="https://c.animaapp.com/mi5l377nJk1HHO/img/star-1.svg"
                        />
</div>
))}
                  </div>
<p className="self-stretch [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] leading-[18px] relative tracking-[0]">
环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境...
                  </p>
<div className="flex items-center relative self-stretch w-full flex-[0_0_auto]">
<div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
<Avatar className="relative w-[26px] h-[26px]">
<AvatarImage src="https://c.animaapp.com/mi5l377nJk1HHO/img/ellipse-34.svg" />
<AvatarFallback className="bg-[#a6a6a6]" />
</Avatar>
<span className="w-fit [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[normal] relative tracking-[0]">
加菲猫
                      </span>
<span className="text-[#a6a6a6] text-[10px] relative w-fit [font-family:'PingFang_SC-Medium',Helvetica] font-medium tracking-[0] leading-[normal]">
2019-12-25
                      </span>
</div>
</div>
</div>
</div>
<div className="inline-flex items-start gap-2 relative flex-[0_0_auto]">
<div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
<img
                    className="relative w-[39px] h-[100px]"
                    alt="Review"
                    src="https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-187-1.png"
                  />
<div className="absolute -top-3 left-6 w-[15px] h-[125px] bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_61%,rgba(255,255,255,0)_100%)]" />
</div>
</div>
<div className="relative w-[22px] h-[125px] mt-[-12.50px] mb-[-12.50px] bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0)_100%)]" />
</div>
</CardContent>
</Card>
<div className="flex flex-col items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
<Card className="flex flex-col items-center justify-center gap-2.5 p-2.5 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-md border-0 shadow-none">
<CardContent className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] p-0">
<div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
<h3 className="relative w-fit mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
问TA
                </h3>
<button className="inline-flex items-center gap-1.5 relative flex-[0_0_auto] transition-opacity hover:opacity-80">
<span className="w-fit mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[normal] relative tracking-[0]">
12条回答
                  </span>
<ChevronRightIcon className="relative w-3.5 h-3.5 text-[#a6a6a6]" />
</button>
</div>
{questions.map((question, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto]"
                >
<div className="flex flex-col w-5 h-5 items-center justify-center gap-2.5 px-1 py-0.5 relative bg-[#fcf0e2] rounded">
<span className="w-fit mt-[-0.50px] [font-family:'DIN_Black-Regular',Helvetica] font-normal text-[#ff9763] text-xs leading-[normal] relative tracking-[0]">
问
                    </span>
</div>
<span className="w-fit [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[normal] relative tracking-[0]">
{question}
                  </span>
</div>
))}
            </CardContent>
</Card>
<Button
            variant="ghost"
            className="flex h-[42px] items-center justify-center gap-1 px-[15px] py-2 relative self-stretch w-full bg-white rounded-sm hover:bg-white/80"
          >
<span className="w-fit bg-[linear-gradient(90deg,rgba(253,145,255,1)_0%,rgba(83,64,254,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-transparent text-xs leading-[normal] relative tracking-[0]">
<span className="text-black">设计师/商家</span>
<span className="text-black"> 立即入驻 </span>
<span className="text-black">展示你的项目</span>
</span>
</Button>
<p className="self-stretch [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[normal] relative tracking-[0]">
*本页面内信息有门店/设计师发布并对信息的真实性及合法性负责，如您对信息真实性及合法性有质疑，请向**反馈
          </p>
</div>
</div>
</section>
);
};
