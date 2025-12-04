import { ChevronLeftIcon, CircleIcon, MoreHorizontalIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";

const steps = [
  { label: "门店认证", active: false },
  { label: "执照认证", active: false },
  { label: "合作协议", active: true },
  { label: "结算信息", active: false },
];

export const DivWrapper = () => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="145:9969"
    >
      <header className="bg-white">
        <nav className="flex items-center justify-between px-4 pt-11 pb-3">
          <button
            className="w-4 h-4 flex items-center justify-center"
            aria-label="返回"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] tracking-[0] leading-[normal]">
            实体门店入驻
          </h1>

          <div className="flex items-center gap-3">
            <button
              className="w-4 h-4 flex items-center justify-center"
              aria-label="更多选项"
            >
              <MoreHorizontalIcon className="w-4 h-4" />
            </button>
            <button
              className="w-4 h-4 flex items-center justify-center"
              aria-label="帮助"
            >
              <CircleIcon className="w-4 h-4" />
            </button>
          </div>
        </nav>

        <div className="px-4 pb-3">
          <img
            className="w-[292px] h-[23px]"
            alt="进度条"
            src="https://c.animaapp.com/miiir0w9dY5rhA/img/frame-2387.svg"
          />
        </div>

        <nav
          className="flex items-center justify-center gap-[38px] pb-3"
          aria-label="步骤导航"
        >
          {steps.map((step, index) => (
            <button
              key={index}
              className={`[font-family:'PingFang_SC-${step.active ? "Semibold" : "Regular"}',Helvetica] font-normal text-[13px] tracking-[0] leading-[normal] ${
                step.active ? "text-black" : "text-[#a6a6a6]"
              } ${step.active ? "text-center" : ""}`}
            >
              {step.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 px-1.5 pt-2 pb-[83px] overflow-y-auto">
        <Card className="bg-white rounded-md shadow-none border-0 opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
          <CardContent className="p-3 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
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

      <footer className="bg-white shadow-[0px_-1px_0px_#0000000a]">
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

        <div className="flex items-end justify-center px-[120px] py-2 h-[34px]">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>

      <div className="absolute top-0 left-0 w-full h-11 flex items-center justify-between px-4 pointer-events-none">
        <time className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
          9:41
        </time>

        <div className="flex items-center gap-[5px]">
          <img
            className="w-[17.42px] h-[11.67px]"
            alt="信号"
            src="https://c.animaapp.com/miiir0w9dY5rhA/img/cellular-connection.svg"
          />
          <img
            className="w-[15.64px] h-[11.67px]"
            alt="WiFi"
            src="https://c.animaapp.com/miiir0w9dY5rhA/img/wifi.svg"
          />
          <img
            className="w-[24.42px] h-[11.67px]"
            alt="电池"
            src="https://c.animaapp.com/miiir0w9dY5rhA/img/battery.png"
          />
        </div>
      </div>
    </div>
  );
};
