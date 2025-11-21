import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
  ScanLineIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Switch } from "../../components/ui/switch";

const settingsGroups = [
  {
    items: [{ label: "个人信息", hasChevron: true }],
  },
  {
    items: [
      { label: "账号安全", hasChevron: true },
      { label: "申请认证", hasChevron: true },
      { label: "地址管理", hasChevron: true },
      { label: "支付设置", hasChevron: true },
    ],
  },
  {
    items: [
      { label: "消息通知", hasToggle: true },
      { label: "隐私设置", hasChevron: true },
      { label: "清除缓存", rightText: "365M" },
    ],
  },
  {
    items: [
      { label: "反馈意见", hasChevron: true },
      { label: "关于众美", hasChevron: true },
      { label: "协议与条款", hasChevron: true },
    ],
  },
];

export const DivWrapper = (): JSX.Element => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen flex flex-col relative"
      data-model-id="15:4735"
    >
      <header className="w-full bg-white">
        <nav className="flex items-center justify-between px-4 pt-11 pb-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-auto p-0 hover:bg-transparent"
          >
            <ChevronLeftIcon className="w-4 h-4 text-[#666666]" />
          </Button>

          <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] tracking-[0] leading-[normal]">
            设置
          </h1>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-auto p-0 hover:bg-transparent"
            >
              <MoreHorizontalIcon className="w-5 h-5 text-black" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-auto p-0 hover:bg-transparent"
            >
              <ScanLineIcon className="w-5 h-5 text-black" />
            </Button>
          </div>
        </nav>

        <div className="flex items-center justify-between px-4 pb-2">
          <time className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
            9:41
          </time>

          <div className="flex items-center gap-1.5">
            <img
              className="w-[17.42px] h-[10.67px]"
              alt="Cellular connection"
              src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/cellular-connection.svg"
            />
            <img
              className="w-[15.64px] h-[11.33px]"
              alt="Wifi"
              src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/wifi.svg"
            />
            <img
              className="w-[24.42px] h-[11.33px]"
              alt="Battery"
              src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/battery.png"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 px-1.5 pt-1.5 pb-20">
        <div className="flex flex-col gap-1.5 translate-y-[-1rem] animate-fade-in opacity-0">
          {settingsGroups.map((group, groupIndex) => (
            <Card
              key={groupIndex}
              className="rounded-md border-0 shadow-none translate-y-[-1rem] animate-fade-in opacity-0"
              style={
                {
                  "--animation-delay": `${groupIndex * 100}ms`,
                } as React.CSSProperties
              }
            >
              <CardContent className="p-[15px]">
                {group.items.map((item, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    {itemIndex > 0 && <Separator className="my-[15px]" />}
                    <button className="flex items-center justify-between w-full text-left transition-opacity hover:opacity-70">
                      <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                        {item.label}
                      </span>

                      {item.hasChevron && (
                        <ChevronRightIcon className="w-3.5 h-3.5 text-black flex-shrink-0" />
                      )}

                      {item.hasToggle && (
                        <Switch
                          defaultChecked
                          className="data-[state=checked]:bg-[#927eff]"
                        />
                      )}

                      {item.rightText && (
                        <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm tracking-[0] leading-[normal]">
                          {item.rightText}
                        </span>
                      )}
                    </button>
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          ))}

          <Card
            className="rounded-md border-0 shadow-none translate-y-[-1rem] animate-fade-in opacity-0"
            style={
              {
                "--animation-delay": `${settingsGroups.length * 100}ms`,
              } as React.CSSProperties
            }
          >
            <CardContent className="p-[15px]">
              <button className="w-full text-center [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm tracking-[0] leading-[normal] transition-opacity hover:opacity-70">
                退出登录
              </button>
            </CardContent>
          </Card>
        </div>
      </main>

      <div className="flex items-center justify-center py-2 bg-transparent">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    </div>
  );
};
