import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const formSections = [
  {
    id: "license-type",
    items: [
      {
        label: "营业执照类型",
        value: "个体",
        hasChevron: true,
      },
    ],
  },
];

const uploadItems = [
  {
    id: "license",
    label: "营业执照",
    icon: "https://c.animaapp.com/miiiqnnnLuYE67/img/frame-2.svg",
  },
  {
    id: "other",
    label: "其他证件",
    icon: "https://c.animaapp.com/miiiqnnnLuYE67/img/frame-2.svg",
  },
];

const licenseFields = [
  {
    label: "营业执照名称",
    placeholder: "输入营业执照上的名称",
  },
  {
    label: "营业执照编号",
    placeholder: "输入组织机构代码",
  },
  {
    label: "证件有效期",
    value: "是否永久有效",
    hasCheckbox: true,
  },
  {
    label: "失效期",
    placeholder: "填写证件失效期",
  },
];

const businessFields = [
  {
    label: "经营姓名",
    placeholder: "法人代表/经营者姓名",
  },
  {
    label: "身份证号",
    placeholder: "输入有效身份证号码",
  },
  {
    label: "邮箱",
    placeholder: "请输入邮箱",
  },
  {
    label: "手机号",
    placeholder: "请输入手机号码",
    hasAction: true,
    actionText: "获取验证码",
  },
  {
    label: "验证码",
    placeholder: "请输入验证码",
  },
];

export const MainContentSection = () => {
  return (
    <section className="flex flex-col w-full items-start gap-2 opacity-0 animate-fade-in">
      <Card className="w-full rounded-md">
        <CardContent className="flex flex-col items-start justify-center gap-5 p-[15px]">
          <div className="flex flex-col items-start gap-[15px] w-full">
            <div className="flex items-center justify-between w-full">
              <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                营业执照类型
              </div>
              <button className="inline-flex items-center gap-2.5 bg-transparent border-0 cursor-pointer">
                <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-sm text-center tracking-[0] leading-[normal]">
                  个体
                </div>
                <img
                  className="w-3.5 h-3.5"
                  alt="Frame"
                  src="https://c.animaapp.com/miiiqnnnLuYE67/img/frame-1.svg"
                />
              </button>
            </div>
            <Separator className="w-full" />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full rounded-md">
        <CardContent className="flex flex-col items-start justify-center gap-[15px] p-[15px]">
          <div className="inline-flex items-center gap-[5px]">
            <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
              营业执照
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-[5px] w-full">
            {uploadItems.map((item) => (
              <button
                key={item.id}
                className="flex flex-col w-[88px] h-[88px] items-center justify-center gap-[7px] px-[27px] py-3 bg-[#f8f8f8] rounded-sm border-0 cursor-pointer transition-colors hover:bg-[#f0f0f0]"
              >
                <img
                  className="w-[18px] h-[18px]"
                  alt="Frame"
                  src={item.icon}
                />
                <div className="[font-family:'PingFang_SC-Regular',Helvetica] text-[#d3d3d3] text-[11px] text-center font-normal tracking-[0] leading-[normal]">
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full rounded-md">
        <CardContent className="flex flex-col items-start justify-center gap-5 p-[15px]">
          {licenseFields.map((field, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-[15px] w-full"
            >
              <div className="flex items-center gap-[15px] w-full">
                <div className="w-[84px] [font-family:'PingFang_SC-Regular',Helvetica] text-black text-sm font-normal tracking-[0] leading-[normal]">
                  {field.label}
                </div>
                {field.hasCheckbox ? (
                  <button className="inline-flex items-center gap-2 flex-1 bg-transparent border-0 cursor-pointer">
                    <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#333333] text-sm text-center tracking-[0] leading-[normal]">
                      {field.value}
                    </div>
                    <img
                      className="w-3.5 h-3.5"
                      alt="Frame"
                      src="https://c.animaapp.com/miiiqnnnLuYE67/img/frame-2404.svg"
                    />
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2.5">
                    <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm text-center tracking-[0] leading-[normal]">
                      {field.placeholder}
                    </div>
                  </div>
                )}
              </div>
              <Separator className="w-full" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="w-full rounded-md">
        <CardContent className="flex flex-col items-start justify-center gap-5 p-[15px]">
          <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
            经营基础信息
          </div>
          {businessFields.map((field, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-[15px] w-full"
            >
              <div className="flex items-center gap-[15px] w-full">
                <div className="w-14 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                  {field.label}
                </div>
                {field.hasAction ? (
                  <div className="flex items-center justify-between flex-1">
                    <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm text-center tracking-[0] leading-[normal]">
                      {field.placeholder}
                    </div>
                    <button className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#0088ff] text-sm text-center tracking-[0] leading-[normal] bg-transparent border-0 cursor-pointer transition-opacity hover:opacity-80">
                      {field.actionText}
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2.5">
                    <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm text-center tracking-[0] leading-[normal]">
                      {field.placeholder}
                    </div>
                  </div>
                )}
              </div>
              <Separator className="w-full" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="w-full rounded-md">
        <CardContent className="flex flex-col items-start justify-center gap-5 p-[15px]">
          <div className="flex flex-col items-start gap-[15px] w-full">
            <button className="flex items-center justify-between w-full bg-transparent border-0 cursor-pointer transition-opacity hover:opacity-80">
              <div className="w-14 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                人脸验证
              </div>
              <div className="inline-flex items-center gap-1.5">
                <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                  去验证
                </div>
                <img
                  className="w-3.5 h-3.5"
                  alt="Frame"
                  src="https://c.animaapp.com/miiiqnnnLuYE67/img/frame-1.svg"
                />
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
