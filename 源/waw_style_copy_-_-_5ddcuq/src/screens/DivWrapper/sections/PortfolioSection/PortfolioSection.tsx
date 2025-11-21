import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const serviceInfoData = [
  { label: "职位", value: "店长" },
  { label: "职称", value: "国家高级美发师" },
  { label: "擅长", value: "男士油头造型、细软烫发" },
  { label: "工作时间", value: "周二 - 周日", extra: "10:00-21:00" },
  { label: "从业时间", value: "12年" },
  { label: "预约时间", value: "提前3小时" },
];

const reviewTags = [
  { text: "技术很好", count: "232", active: true },
  { text: "效果满意", count: "321", active: false },
  { text: "服务态度", count: "321", active: false },
];

const questions = [
  "只烫不染的短发多少钱？头发比较干，不知道能不能做？",
  "刘海发际线太高怎么办？",
];

export const PortfolioSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center gap-2 px-1.5">
      <Card className="w-full bg-white rounded-md border-0 shadow-none">
        <CardContent className="flex flex-col items-start justify-center gap-2.5 p-2.5">
          <div className="flex items-center justify-between w-full">
            <nav className="inline-flex items-center gap-[15px]">
              <button className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center leading-normal tracking-[0]">
                服务须知
              </button>
              <button className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm text-center leading-normal tracking-[0]">
                服务特色
              </button>
              <button className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm text-center leading-normal tracking-[0]">
                环境设施
              </button>
            </nav>
            <ChevronRightIcon className="w-3.5 h-3.5 text-[#666666]" />
          </div>

          <div className="flex flex-col items-start gap-2.5 w-full">
            {serviceInfoData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-2.5 w-full"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="w-12 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-normal tracking-[0]">
                    {item.label}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-normal tracking-[0]">
                      {item.value}
                    </div>
                    {item.extra && (
                      <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-normal tracking-[0]">
                        {item.extra}
                      </div>
                    )}
                  </div>
                </div>
                <Separator className="w-full h-px bg-[#e5e5e5]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-md border-0 shadow-none">
        <CardContent className="flex flex-col items-start justify-center gap-3 p-2.5">
          <div className="flex items-center justify-between w-full">
            <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center leading-normal tracking-[0]">
              顾客点评
            </h2>
            <button className="inline-flex items-center gap-1.5">
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-normal tracking-[0]">
                123条点评
              </span>
              <ChevronRightIcon className="w-3.5 h-3.5 text-[#a6a6a6]" />
            </button>
          </div>

          <div className="flex flex-wrap items-start gap-[6px] w-full">
            {reviewTags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-sm ${
                  tag.active ? "bg-[#333333]" : "bg-[#f6f6f6]"
                }`}
              >
                <span
                  className={`[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[11px] leading-normal tracking-[0] ${
                    tag.active ? "text-white" : "text-[#a6a6a6]"
                  }`}
                >
                  {tag.text}
                </span>
                <span
                  className={`[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[10px] leading-normal tracking-[0] ${
                    tag.active ? "text-white" : "text-[#a6a6a6]"
                  }`}
                >
                  {tag.count}
                </span>
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-auto">
            <article className="inline-flex items-start gap-2 flex-shrink-0">
              <img
                className="w-[100px] h-[100px] object-cover"
                alt="Review image"
                src="https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
              />
              <div className="flex flex-col w-[194px] items-start gap-px">
                <h3 className="w-full [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[18px] tracking-[0] truncate">
                  环境特别好
                </h3>
                <div className="inline-flex items-center gap-0.5">
                  <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs leading-normal tracking-[0]">
                    5.0
                  </span>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative w-2.5 h-2.5">
                      <img
                        className="absolute w-full h-full"
                        alt="Star"
                        src="https://c.animaapp.com/mi5d4lp0csJxnR/img/star-1.svg"
                      />
                    </div>
                  ))}
                </div>
                <p className="w-full [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[11px] leading-[18px] tracking-[0]">
                  环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境...
                </p>
                <div className="flex items-center gap-1.5 w-full">
                  <div className="w-[26px] h-[26px] bg-[#a6a6a6] rounded-full bg-[url(https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg)] bg-cover bg-center" />
                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-normal tracking-[0]">
                    加菲猫
                  </span>
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[10px] leading-normal tracking-[0]">
                    2019-12-25
                  </span>
                </div>
              </div>
            </article>

            <div className="inline-flex items-start gap-2 flex-shrink-0 relative">
              <img
                className="w-[39px] h-[100px] object-cover"
                alt="Review image"
                src="https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187-1.png"
              />
              <div className="absolute -top-3 left-6 w-[15px] h-[125px] bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_61%,rgba(255,255,255,0)_100%)]" />
            </div>

            <div className="w-[22px] h-[125px] flex-shrink-0 bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0)_100%)]" />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-md border-0 shadow-none">
        <CardContent className="flex flex-col items-center justify-center gap-2.5 p-2.5">
          <div className="flex items-center justify-between w-full">
            <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center leading-normal tracking-[0]">
              问TA
            </h2>
            <button className="inline-flex items-center gap-1.5">
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-normal tracking-[0]">
                12条回答
              </span>
              <ChevronRightIcon className="w-3.5 h-3.5 text-[#a6a6a6]" />
            </button>
          </div>

          {questions.map((question, index) => (
            <button key={index} className="flex items-center gap-2 w-full">
              <div className="flex flex-col w-5 h-5 items-center justify-center px-1 py-0.5 bg-[#fcf0e2] rounded">
                <span className="[font-family:'DIN_Black-Regular',Helvetica] font-normal text-[#ff9763] text-xs leading-normal tracking-[0]">
                  问
                </span>
              </div>
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-normal tracking-[0] text-left">
                {question}
              </span>
            </button>
          ))}
        </CardContent>
      </Card>

      <button className="flex w-full h-[42px] items-center justify-center gap-1 px-[15px] py-2 bg-white rounded-sm">
        <span className="bg-[linear-gradient(90deg,rgba(253,145,255,1)_0%,rgba(83,64,254,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-xs leading-normal tracking-[0]">
          <span className="text-black">设计师/商家</span>
          <span className="text-black"> 立即入驻 </span>
          <span className="text-black">展示你的项目</span>
        </span>
      </button>

      <p className="w-full [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-normal tracking-[0]">
        *本页面内信息有门店/设计师发布并对信息的真实性及合法性负责，如您对信息真实性及合法性有质疑，请向**反馈
      </p>
    </section>
  );
};
