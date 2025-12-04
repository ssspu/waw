import { PhoneIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const overviewItems = [
  { label: "职位", value: "店长" },
  { label: "职称", value: "国家高级美发师" },
  { label: "擅长", value: "男士油头造型、细软烫发" },
  { label: "工作时间", value: "周二 - 周日", extra: "10:00-21:00" },
  { label: "从业时间", value: "12年" },
  { label: "预约时间", value: "提前3小时" },
  { label: "联系电话", value: "+86 1891808747", hasPhone: true },
];

const serviceFeatures = [
  "全预约制",
  "免费茶点",
  "头皮检测",
  "免费停车",
  "烫染专业店",
  "免费修眉",
  "一对一服务",
  "免费按摩",
  "没有隐形消费",
  "可上门服务",
];

const otherFeatures = ["不可携带宠物", "服务区不可吸烟"];

const environmentFacilities = [
  "储物柜",
  "免费Wifi",
  "充电宝",
  "可看电视",
  "VIP专区",
  "沙发座",
];

const generalFacilities = [
  "特定吸烟区",
  "电梯",
  "有停车位",
  "空调",
  "先进/刷卡支付",
];

export const ServicesSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center gap-2 relative">
      <img
        className="relative w-full h-[222px] object-cover"
        alt="Profile"
        src="https://c.animaapp.com/mi5eklbiAEaKLJ/img/rectangle-191.svg"
      />

      <Card className="w-full max-w-[363px] bg-white rounded-md">
        <CardContent className="flex flex-col items-start gap-2.5 p-[15px]">
          <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm">
            概况介绍
          </h2>

          <div className="flex flex-col items-start gap-2.5 px-[5px] w-full">
            {overviewItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-2.5 w-full"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="w-12 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs">
                    {item.label}
                  </div>

                  <div className="flex items-center justify-between flex-1 gap-2">
                    <div className="inline-flex items-center gap-2">
                      <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
                        {item.value}
                      </div>
                      {item.extra && (
                        <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
                          {item.extra}
                        </div>
                      )}
                    </div>

                    {item.hasPhone && (
                      <PhoneIcon className="w-4 h-4 text-[#333333]" />
                    )}
                  </div>
                </div>

                <Separator className="w-full" />
              </div>
            ))}

            <div className="inline-flex items-start gap-2 w-full">
              <div className="w-12 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs shrink-0">
                个人介绍
              </div>

              <p className="flex-1 [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[18px]">
                开始觉得得到
                cheer但是吃多了U额低大叔的康师傅挥洒;都付款了;哦身份费十年九旱;说啥呢;到底是但是你垫付
                开始烦恼;空间的少女;都;看到你;dksnfo
                weioewpsafw等级警笛声金额费哦额我听为恶趣味
                还打我的外福利健康;饿了辅导费看见的费费身份卡三色黑色;村往往i日破天婆温柔哦他说，费激发了哈的疯狂好的风景看d
                dlkdfa耳机;费经典风范费i地方艾美奖s从大煞风景可费if金额阿迪说法垫付我的俄炮击说的话i城市的烦恼化成水淀粉收到的机会啊!
                <br />
                胡椒粉还说风凉话的灵魂力度老好人收到v的撒娇。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-[363px] bg-white rounded-md">
        <CardContent className="flex flex-col items-start gap-2.5 p-[15px]">
          <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm">
            服务特色
          </h2>

          <div className="flex flex-wrap items-center gap-[6px] w-full">
            {serviceFeatures.map((feature, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex-[0_0_calc(50%-3px)] h-[35px] flex items-center justify-center bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm px-2 py-2"
              >
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] text-center truncate">
                  {feature}
                </span>
              </Badge>
            ))}
          </div>

          <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs">
            其他
          </div>

          <div className="flex flex-wrap items-center gap-[6px] w-full">
            {otherFeatures.map((feature, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex-[0_0_calc(50%-3px)] h-[35px] flex items-center justify-center bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm px-2 py-2"
              >
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] text-center truncate">
                  {feature}
                </span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-[363px] bg-white rounded-md">
        <CardContent className="flex flex-col items-start gap-2.5 p-[15px]">
          <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm">
            环境设施
          </h2>

          <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs">
            环境设施
          </div>

          <div className="flex flex-wrap items-center gap-[6px] w-full">
            {environmentFacilities.map((facility, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex-[0_0_calc(50%-3px)] h-[35px] flex items-center justify-center bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm px-2 py-2"
              >
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] text-center truncate">
                  {facility}
                </span>
              </Badge>
            ))}
          </div>

          <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs">
            通用设施
          </div>

          <div className="flex flex-wrap items-center gap-[6px] w-full">
            {generalFacilities.map((facility, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex-[0_0_calc(50%-3px)] h-[35px] flex items-center justify-center bg-[#f6f6f6] hover:bg-[#f6f6f6] rounded-sm px-2 py-2"
              >
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] text-center truncate">
                  {facility}
                </span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
