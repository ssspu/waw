import { ChevronLeftIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

const refundReasons = [
  { id: "reason1", label: "店铺/商品信息问题" },
  { id: "reason2", label: "价格不划算" },
  { id: "reason3", label: "不需要了" },
  { id: "reason4", label: "重新购买" },
  { id: "reason5", label: "消费结果不满意" },
  { id: "reason6", label: "预约问题" },
  { id: "reason7", label: "商家要求改用其他方式/平台付款" },
  { id: "reason8", label: "商家无法提供服务" },
];

export const DivWrapper = () => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-[921px] flex flex-col"
      data-model-id="42:195"
    >
      <header className="bg-white w-full h-[98px] flex flex-col">
        <div className="w-full h-11 flex items-center justify-between px-[34px]">
          <div className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[19.6px]">
            9:41
          </div>
          <div className="flex items-center gap-1">
            <img
              className="w-[17px] h-[11px]"
              alt="Cellular connection"
              src="https://c.animaapp.com/mipb5np2fFXqAX/img/cellular-connection.svg"
            />
            <img
              className="w-[15px] h-[11px]"
              alt="Wifi"
              src="https://c.animaapp.com/mipb5np2fFXqAX/img/wifi.svg"
            />
            <img
              className="w-[25px] h-[11px]"
              alt="Battery"
              src="https://c.animaapp.com/mipb5np2fFXqAX/img/battery.png"
            />
          </div>
        </div>

        <nav className="flex items-center justify-between px-[15px] h-[54px]">
          <button className="w-4 h-4 flex items-center justify-center">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] leading-[21px] tracking-[0]">
            申请退款
          </h1>
          <div className="flex items-center gap-2">
            <img
              className="w-7 h-7"
              alt="Group"
              src="https://c.animaapp.com/mipb5np2fFXqAX/img/group-8.svg"
            />
          </div>
        </nav>
      </header>

      <main className="flex-1 px-[6px] pt-[89px] pb-[83px] overflow-y-auto">
        <div className="flex flex-col gap-[6px] translate-y-[-1rem] animate-fade-in opacity-0">
          <Card className="w-full bg-white rounded-md border-0 shadow-none">
            <CardContent className="p-3 flex flex-col gap-3">
              <div className="flex items-center gap-[5px]">
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm tracking-[0] leading-[19.6px]">
                  李天天
                </span>
                <Badge className="h-4 bg-[#f6f6f6] text-[#666666] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[10px] leading-[14px] tracking-[0] rounded-sm hover:bg-[#f6f6f6]">
                  美发师
                </Badge>
                <img
                  className="w-3.5 h-3.5"
                  alt="Frame"
                  src="https://c.animaapp.com/mipb5np2fFXqAX/img/frame.svg"
                />
              </div>

              <div className="flex items-center gap-[8px]">
                <div className="w-[66px] h-[66px] bg-[#d9d9d9] rounded-sm flex-shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm leading-[19.6px] tracking-[0]">
                    欧莱雅植物洗护套装一套
                  </p>
                  <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[16.8px] tracking-[0]">
                    洗发水+护发素
                  </p>
                  <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px]">
                    500ml+500ml
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-white rounded-md border-0 shadow-none">
            <CardContent className="p-3 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center leading-[19.6px] tracking-[0]">
                    退款金额
                  </span>
                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-xs text-center leading-[16.8px] tracking-[0]">
                    （实付金额）
                  </span>
                </div>
                <div className="flex items-end">
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[19.6px]">
                    ¥
                  </span>
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-lg tracking-[0] leading-[25.2px]">
                    799
                  </span>
                </div>
              </div>

              <div className="bg-[#f7f7f7] rounded p-3 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#333333] rounded-[3px]" />
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs text-center leading-[16.8px] tracking-[0]">
                      可退项目
                    </span>
                  </div>
                  <div className="flex items-center justify-between pl-2.5">
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs text-center leading-[16.8px] tracking-[0]">
                      在线支付
                    </span>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[16.8px] tracking-[0]">
                      ￥699
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#333333] rounded-[3px]" />
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs text-center leading-[16.8px] tracking-[0]">
                      不可退项目
                    </span>
                  </div>
                  <div className="flex items-center justify-between pl-2.5">
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs text-center leading-[16.8px] tracking-[0]">
                      优惠金额
                    </span>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs leading-[16.8px] tracking-[0]">
                      ￥100
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center leading-[19.6px] tracking-[0]">
                  退回账户
                </span>
                <div className="flex flex-col items-end gap-1">
                  <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center leading-[19.6px] tracking-[0]">
                    原支付账户
                  </span>
                  <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-normal text-xs text-center leading-[16.8px] tracking-[0]">
                    <span className="font-medium text-[#ffa77c]">
                      1-3个工作日{" "}
                    </span>
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] text-[#a6a6a6]">
                      内到账
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-white rounded-md border-0 shadow-none">
            <CardContent className="p-3 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center leading-[19.6px] tracking-[0]">
                  退款原因
                </span>
                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-xs text-center leading-[16.8px] tracking-[0]">
                  （必选）
                </span>
              </div>

              <RadioGroup className="flex flex-col gap-4">
                {refundReasons.map((reason) => (
                  <div
                    key={reason.id}
                    className="flex items-center justify-between"
                  >
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm text-center leading-[19.6px] tracking-[0]">
                      {reason.label}
                    </span>
                    <RadioGroupItem
                      value={reason.id}
                      className="w-3.5 h-3.5 rounded-[7px] border-[#d8d8d8]"
                    />
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-white w-full h-[83px] flex flex-col shadow-[0px_-1px_0px_#0000000a]">
        <div className="flex-1 flex items-center justify-center px-2.5">
          <Button className="w-full h-[42px] bg-[#333333] hover:bg-[#333333]/90 rounded-sm [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs leading-[16.8px] tracking-[0]">
            申请退款
          </Button>
        </div>
        <div className="h-[34px] flex items-end justify-center pb-2">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>
    </div>
  );
};
