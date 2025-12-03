import { ChevronLeftIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";

export const DivWrapper = () => {
  const steps = [
    { label: "身份认证", active: false },
    { label: "职业认证", active: false },
    { label: "合作协议", active: true },
    { label: "结算信息", active: false },
  ];

  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen flex flex-col relative"
      data-model-id="145:9901"
    >
      <header className="w-full bg-white">
        <div className="flex items-center justify-between px-4 pt-11 pb-3">
          <button className="w-4 h-4 flex items-center justify-center">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] tracking-[0] leading-[normal]">
            设计师入驻
          </h1>

          <div className="flex items-center gap-2">
            <img
              className="w-32 h-[72px]"
              alt="Group"
              src="https://c.animaapp.com/miieqry098Kjoo/img/group-8.png"
            />
          </div>
        </div>

        <nav className="flex items-center justify-center gap-[38px] pb-3 relative">
          {steps.map((step, index) => (
            <button
              key={index}
              className={`[font-family:'PingFang_SC-${
                step.active ? "Semibold" : "Regular"
              }',Helvetica] font-normal text-[13px] tracking-[0] leading-[normal] ${
                step.active ? "text-black" : "text-[#a6a6a6]"
              }`}
            >
              {step.label}
            </button>
          ))}
        </nav>

        <div className="px-[41px] pb-2">
          <img
            className="w-full h-[23px]"
            alt="Progress"
            src="https://c.animaapp.com/miieqry098Kjoo/img/frame-2387.svg"
          />
        </div>
      </header>

      <main className="flex-1 px-1.5 pt-2 pb-[83px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <Card className="bg-white rounded-md border-0 shadow-none">
          <CardContent className="flex flex-col items-start gap-3 p-3">
            <div className="flex flex-col items-start gap-1">
              <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                入驻平台协议
              </h2>
              <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#999999] text-xs text-center tracking-[0] leading-[normal]">
                请认真阅读本平台入驻协议
              </p>
            </div>

            <div className="w-full h-[447px] bg-[#f8f8f8] rounded" />

            <div className="flex items-end gap-[5px]">
              <Checkbox id="agreement" className="w-4 h-4" />
              <label
                htmlFor="agreement"
                className="[font-family:'Inter',Helvetica] font-medium text-xs tracking-[0] leading-[normal] cursor-pointer"
              >
                <span className="text-[#999999]">我已阅读并同意</span>
                <span className="text-[#6d58f1]">《**入驻申请说明》</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="w-full bg-white shadow-[0px_-1px_0px_#0000000a] fixed bottom-0 left-0">
        <div className="flex items-center justify-center gap-1.5 px-2.5 py-[3.5px]">
          <Button
            variant="outline"
            className="flex-1 h-[42px] rounded border border-solid border-[#e7e7e7] bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[normal]">
              上一步
            </span>
          </Button>

          <Button className="flex-1 h-[42px] bg-[#333333] hover:bg-[#4d4d4d] rounded-sm transition-colors">
            <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs tracking-[0] leading-[normal]">
              下一步
            </span>
          </Button>
        </div>

        <div className="flex items-center justify-center py-2">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>

      <div className="absolute top-0 left-0 w-full h-11 flex items-center justify-between px-4">
        <time className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
          9:41
        </time>

        <div className="flex items-center gap-1.5">
          <img
            className="w-[17px] h-[11px]"
            alt="Cellular connection"
            src="https://c.animaapp.com/miieqry098Kjoo/img/cellular-connection.svg"
          />
          <img
            className="w-[15px] h-[11px]"
            alt="Wifi"
            src="https://c.animaapp.com/miieqry098Kjoo/img/wifi.svg"
          />
          <img
            className="w-[24px] h-[11px]"
            alt="Battery"
            src="https://c.animaapp.com/miieqry098Kjoo/img/battery.png"
          />
        </div>
      </div>
    </div>
  );
};
