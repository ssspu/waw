import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

const progressSteps = [
  { label: "身份认证", active: false },
  { label: "职业认证", active: false },
  { label: "合作协议", active: false },
  { label: "结算信息", active: true },
];

const settlementFields = [
  {
    label: "开户类型",
    value: "对公帐户",
    hasChevron: true,
    placeholder: false,
  },
  {
    label: "开户名称",
    value: "请输入对公银行名称",
    hasChevron: false,
    placeholder: true,
  },
  {
    label: "开户银行",
    value: "选择开户银行",
    hasChevron: true,
    placeholder: true,
  },
  {
    label: "开户银行全称",
    value: "选择开户支行",
    hasChevron: true,
    placeholder: true,
  },
  {
    label: "开户银行省市",
    value: "请输入开户城市编码",
    hasChevron: false,
    placeholder: true,
  },
  {
    label: "开户银行帐号",
    value: "请输入你的银行卡号",
    hasChevron: false,
    placeholder: true,
  },
];

export const DivWrapper = () => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen flex flex-col"
      data-model-id="145:9786"
    >
      <header className="bg-white">
        <nav className="flex items-center justify-between px-4 pt-11 pb-3">
          <div className="flex items-center gap-6">
            <button
              className="w-4 h-4 flex items-center justify-center"
              aria-label="Go back"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px]">
              实体门店入驻
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="w-6 h-6 flex items-center justify-center"
              aria-label="More options"
            >
              <MoreHorizontalIcon className="w-5 h-5" />
            </button>
            <button
              className="w-6 h-6 flex items-center justify-center"
              aria-label="Settings"
            >
              <CircleIcon className="w-5 h-5" />
            </button>
          </div>
        </nav>

        <div className="flex items-center justify-center gap-[38px] px-4 pb-[18px]">
          {progressSteps.map((step, index) => (
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
        </div>

        <div className="px-[41px] pb-4">
          <img
            className="w-full h-[23px]"
            alt="Progress indicator"
            src="https://c.animaapp.com/miiitydhwfX6YL/img/frame-2387.svg"
          />
        </div>
      </header>

      <main className="flex-1 px-1.5 pt-2 pb-[83px] overflow-y-auto">
        <div className="flex flex-col gap-2">
          <Card className="bg-white rounded-md border-0 shadow-none">
            <CardContent className="p-[15px] flex flex-col gap-5">
              <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                结算方式
              </h2>

              <div className="flex flex-col gap-[15px]">
                <button className="flex items-center justify-between w-full">
                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                    结算方式
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-sm text-center tracking-[0] leading-[normal]">
                      银行卡
                    </span>
                    <ChevronRightIcon className="w-3.5 h-3.5" />
                  </div>
                </button>
                <Separator className="bg-[#e7e7e7]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-md border-0 shadow-none">
            <CardContent className="p-[15px] flex flex-col gap-5">
              <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                结算信息
              </h2>

              {settlementFields.map((field, index) => (
                <div key={index} className="flex flex-col gap-[15px]">
                  <button className="flex items-center gap-[15px] w-full">
                    <span className="w-[84px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal] text-left">
                      {field.label}
                    </span>
                    <div className="flex items-center justify-between flex-1">
                      <span
                        className={`[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-sm text-center tracking-[0] leading-[normal] ${
                          field.placeholder
                            ? "text-[#a6a6a6]"
                            : "text-[#666666]"
                        }`}
                      >
                        {field.value}
                      </span>
                      {field.hasChevron && (
                        <ChevronRightIcon className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>
                  <Separator className="bg-[#e7e7e7]" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-white shadow-[0px_-1px_0px_#0000000a]">
        <div className="flex items-center justify-center gap-1.5 px-2.5 py-[3.5px]">
          <Button
            variant="outline"
            className="h-[42px] flex-1 rounded border border-solid border-[#e7e7e7] bg-white hover:bg-gray-50"
          >
            <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[normal]">
              上一步
            </span>
          </Button>
          <Button className="h-[42px] flex-1 bg-[#333333] hover:bg-[#1a1a1a] rounded-sm">
            <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs tracking-[0] leading-[normal]">
              提交审核资料
            </span>
          </Button>
        </div>
        <div className="flex items-end justify-center px-[120px] py-2 h-[34px]">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>

      <div className="fixed top-0 left-0 w-full h-11 flex items-center justify-between px-4 pointer-events-none">
        <time className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
          9:41
        </time>
        <div className="flex items-center gap-1.5">
          <img
            className="w-[17px] h-[11px]"
            alt="Cellular connection"
            src="https://c.animaapp.com/miiitydhwfX6YL/img/cellular-connection.svg"
          />
          <img
            className="w-[15px] h-[11px]"
            alt="Wifi"
            src="https://c.animaapp.com/miiitydhwfX6YL/img/wifi.svg"
          />
          <img
            className="w-[24px] h-[11px]"
            alt="Battery"
            src="https://c.animaapp.com/miiitydhwfX6YL/img/battery.png"
          />
        </div>
      </div>

      <div className="fixed top-[31px] right-[8px] pointer-events-none">
        <img
          className="w-32 h-[72px]"
          alt="Logo"
          src="https://c.animaapp.com/miiitydhwfX6YL/img/group-8.png"
        />
      </div>
    </div>
  );
};
