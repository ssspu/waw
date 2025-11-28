import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
  PlusIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const DivWrapper = () => {
  const tabs = [
    { label: "身份认证", active: false },
    { label: "职业认证", active: true },
    { label: "合作协议", active: false },
    { label: "结算信息", active: false },
  ];

  const industryFields = [
    { label: "所属行业", value: "美发", hasValue: true },
    { label: "专业登记", value: "去选择", hasValue: false },
  ];

  const certificateUploads = [
    { text: "上传国家劳动技能证" },
    { text: "上传专业毕业证书" },
  ];

  const certificateFields = [
    { label: "证件姓名", placeholder: "请输入证件人姓名" },
    { label: "取证时间", placeholder: "获得证书时间 2025-10-30" },
    { label: "证书编号", placeholder: "请输入证书编号" },
  ];

  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] h-[812px] flex flex-col relative"
      data-model-id="145:9388"
    >
      <header className="w-full bg-white">
        <div className="flex items-center justify-between h-11 px-4 pt-11">
          <button className="w-4 h-4 flex items-center justify-center">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[15px] tracking-[0] leading-[normal]">
            设计师入驻
          </h1>

          <div className="flex items-center gap-3">
            <button className="w-4 h-4 flex items-center justify-center">
              <MoreHorizontalIcon className="w-4 h-4" />
            </button>
            <button className="w-4 h-4 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-black" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-[38px] h-[26px] mt-[18px]">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`[font-family:'PingFang_SC-${tab.active ? "Semibold" : "Regular"}',Helvetica] font-normal ${
                tab.active ? "text-black" : "text-[#a6a6a6]"
              } text-[13px] text-center tracking-[0] leading-[normal]`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center h-[23px] mt-[7px] px-[41px]">
          <img
            className="w-[292px] h-[23px]"
            alt="Progress indicator"
            src="https://c.animaapp.com/miieq8itcRQNVa/img/frame-2387.svg"
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-1.5 pt-2">
        <div className="flex flex-col gap-2 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <Card className="bg-white rounded-md border-0 shadow-none">
            <CardContent className="p-[15px] flex flex-col gap-5">
              <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                所属行业
              </h2>

              {industryFields.map((field, index) => (
                <div key={index} className="flex flex-col gap-[15px]">
                  <button className="flex items-center justify-between w-full">
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                      {field.label}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`[font-family:'PingFang_SC-Regular',Helvetica] font-normal ${
                          field.hasValue ? "text-[#666666]" : "text-[#a6a6a6]"
                        } text-sm text-center tracking-[0] leading-[normal]`}
                      >
                        {field.value}
                      </span>
                      <ChevronRightIcon className="w-3.5 h-3.5" />
                    </div>
                  </button>
                  <img
                    className="w-full h-px object-cover"
                    alt="Divider"
                    src="https://c.animaapp.com/miieq8itcRQNVa/img/vector-16.svg"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white rounded-md border-0 shadow-none translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <CardContent className="px-2.5 py-3 flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                  职业资格证
                </h2>
                <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#999999] text-xs text-center tracking-[0] leading-[normal]">
                  信息仅用于职业和等级验证，提供你最高级别的职业等级证书
                </p>
              </div>

              <div className="flex items-center justify-between gap-2">
                {certificateUploads.map((upload, index) => (
                  <button
                    key={index}
                    className="flex flex-col w-[167px] h-[98px] items-center justify-center gap-2.5 px-[5px] py-1.5 bg-[#f8f8f8] relative"
                  >
                    <div className="w-[149.14px] h-[81.28px] bg-[url(https://c.animaapp.com/miieq8itcRQNVa/img/vector.svg)] bg-[100%_100%] flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-[7px]">
                        <div className="w-[52px] h-[52px] rounded-full bg-[#1890ff] flex items-center justify-center">
                          <PlusIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#d9d9d9] text-[11px] text-center tracking-[0] leading-[normal]">
                          {upload.text}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-md border-0 shadow-none translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
            <CardContent className="p-[15px] flex flex-col gap-5">
              <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                证书信息
              </h2>

              {certificateFields.map((field, index) => (
                <div key={index} className="flex flex-col gap-[15px]">
                  <div className="flex items-center gap-[15px]">
                    <span className="w-14 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                      {field.label}
                    </span>
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm text-center tracking-[0] leading-[normal]">
                      {field.placeholder}
                    </span>
                  </div>
                  <img
                    className="w-full h-px object-cover"
                    alt="Divider"
                    src="https://c.animaapp.com/miieq8itcRQNVa/img/vector-16.svg"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="w-full bg-white shadow-[0px_-1px_0px_#0000000a]">
        <div className="flex items-center justify-center gap-1.5 px-2.5 py-0 h-[49px]">
          <Button
            variant="outline"
            className="flex-1 h-[42px] gap-1 px-[15px] py-2 rounded border border-solid border-[#e7e7e7] bg-transparent hover:bg-transparent"
          >
            <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[normal]">
              上一步
            </span>
          </Button>

          <Button className="flex-1 h-[42px] gap-1 px-[15px] py-2 bg-[#333333] rounded-sm hover:bg-[#333333]/90">
            <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xs tracking-[0] leading-[normal]">
              下一步
            </span>
          </Button>
        </div>

        <div className="flex items-center justify-center h-[34px] px-[120px] py-2 bg-white">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>

      <div className="absolute top-0 left-0 w-full h-11 flex items-center justify-between px-4">
        <div className="flex-1 flex items-center">
          <span className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
            9:41
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img
            className="w-[17.42px] h-[11.67px]"
            alt="Cellular connection"
            src="https://c.animaapp.com/miieq8itcRQNVa/img/cellular-connection.svg"
          />
          <img
            className="w-[15.64px] h-[12.05px]"
            alt="Wifi"
            src="https://c.animaapp.com/miieq8itcRQNVa/img/wifi.svg"
          />
          <img
            className="w-[24.4px] h-[11.67px]"
            alt="Battery"
            src="https://c.animaapp.com/miieq8itcRQNVa/img/battery.png"
          />
        </div>
      </div>

      <img
        className="absolute top-[31px] left-[247px] w-32 h-[72px]"
        alt="Logo"
        src="https://c.animaapp.com/miieq8itcRQNVa/img/group-8.png"
      />
    </div>
  );
};
