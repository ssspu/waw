import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleIcon,
  MoreVerticalIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

const progressSteps = [
  { label: "身份认证", active: false },
  { label: "职业认证", active: false },
  { label: "合作协议", active: false },
  { label: "结算信息", active: true },
];

const settlementFields = [
  { label: "开户名称", placeholder: "请输入开户姓名", hasArrow: false },
  { label: "开户银行", placeholder: "选择开户银行", hasArrow: true },
  { label: "开户银行全称", placeholder: "选择开户支行", hasArrow: true },
  { label: "开户银行帐号", placeholder: "请输入你的银行卡号", hasArrow: false },
];

export const DivWrapper = () => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen flex flex-col relative"
      data-model-id="145:9513"
    >
      <header className="w-full bg-white">
        <div className="flex items-center justify-between px-4 pt-11 pb-3">
          <button className="w-4 h-4 flex items-center justify-center">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] tracking-[0] leading-[normal]">
            设计师入驻
          </h1>

          <div className="flex items-center gap-3">
            <button className="w-4 h-4 flex items-center justify-center">
              <MoreVerticalIcon className="w-4 h-4" />
            </button>
            <button className="w-4 h-4 flex items-center justify-center">
              <CircleIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <nav className="flex items-center justify-center gap-[38px] px-4 pb-4">
          {progressSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${step.active ? "bg-black" : "bg-[#ffa07a]"}`}
              />
              <span
                className={`[font-family:'PingFang_SC-${step.active ? "Semibold" : "Regular"}',Helvetica] font-normal ${step.active ? "text-black" : "text-[#a6a6a6]"} text-[13px] tracking-[0] leading-[normal] whitespace-nowrap`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </nav>

        <div className="w-full h-px bg-[#e7e7e7]" />
      </header>

      <main className="flex-1 px-1.5 pt-2 pb-[100px] overflow-y-auto">
        <div className="flex flex-col gap-2 translate-y-[-1rem] animate-fade-in opacity-0">
          <Card className="rounded-md border-0 shadow-none">
            <CardContent className="p-[15px] flex flex-col gap-5">
              <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                结算方式
              </h2>

              <div className="flex flex-col gap-[15px]">
                <div className="flex items-center justify-between">
                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                    结算方式
                  </span>

                  <div className="flex items-center gap-2.5">
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-sm text-center tracking-[0] leading-[normal]">
                      银行卡
                    </span>
                    <ChevronRightIcon className="w-3.5 h-3.5 text-[#666666]" />
                  </div>
                </div>

                <div className="w-full h-px bg-[#e7e7e7]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-md border-0 shadow-none">
            <CardContent className="p-[15px] flex flex-col gap-5">
              <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                结算信息
              </h2>

              {settlementFields.map((field, index) => (
                <div key={index} className="flex flex-col gap-[15px]">
                  <div className="flex items-center gap-[15px]">
                    <label className="w-[84px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                      {field.label}
                    </label>

                    <div className="flex items-center justify-between flex-1">
                      <Input
                        placeholder={field.placeholder}
                        className="border-0 shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm placeholder:text-[#a6a6a6] focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      {field.hasArrow && (
                        <ChevronRightIcon className="w-3.5 h-3.5 text-[#666666] flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  <div className="w-full h-px bg-[#e7e7e7]" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="w-full bg-white shadow-[0px_-1px_0px_#0000000a] fixed bottom-0 left-0">
        <div className="flex items-center justify-center gap-1.5 px-2.5 py-[3.5px]">
          <Button
            variant="outline"
            className="h-[42px] flex-1 rounded border border-solid border-[#e7e7e7] bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[normal]">
              上一步
            </span>
          </Button>

          <Button className="h-[42px] flex-1 bg-[#333333] hover:bg-[#1a1a1a] rounded-sm transition-colors">
            <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs tracking-[0] leading-[normal]">
              提交审核资料
            </span>
          </Button>
        </div>

        <div className="flex items-center justify-center px-[120px] py-2 bg-white">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>
    </div>
  );
};
