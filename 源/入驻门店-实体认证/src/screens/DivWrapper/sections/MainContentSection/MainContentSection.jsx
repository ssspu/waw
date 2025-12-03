import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const businessInfoFields = [
  {
    label: "店铺名称",
    placeholder: "需与门脸牌匾一致",
    placeholderColor: "text-[#a6a6a6]",
  },
  {
    label: "经营地址",
    placeholder: "请输入经营地址",
    placeholderColor: "text-[#999999]",
  },
  {
    label: "门牌号码",
    placeholder: "详细地址",
    placeholderColor: "text-[#a6a6a6]",
  },
  {
    label: "省市编号",
    placeholder: "请输入所在城市编号",
    placeholderColor: "text-[#a6a6a6]",
  },
  {
    label: "门店电话",
    placeholder: "门店的固话或移动电话",
    placeholderColor: "text-[#a6a6a6]",
  },
];

const storeImages = [
  { label: "内景照" },
  { label: "收银台" },
  { label: "收银台" },
];

export const MainContentSection = () => {
  return (
    <section className="flex flex-col w-full items-start gap-2">
      <Card className="w-full opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
        <CardContent className="flex flex-col items-start justify-center gap-5 p-[15px]">
          <div className="flex flex-col items-start gap-[15px] w-full">
            <button className="flex items-center justify-between w-full transition-colors hover:opacity-80">
              <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
                经营品类
              </div>

              <div className="inline-flex items-center gap-2.5">
                <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#999999] text-sm text-center tracking-[0] leading-[normal]">
                  选择提供的服务项目
                </div>

                <ChevronRightIcon className="w-3.5 h-3.5 text-[#999999]" />
              </div>
            </button>

            <img
              className="w-full h-px object-cover"
              alt="Vector"
              src="https://c.animaapp.com/miiiqb69Sz0ZpJ/img/vector-16.svg"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]">
        <CardContent className="flex flex-col items-start justify-center gap-5 p-[15px]">
          <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
            经营信息
          </div>

          {businessInfoFields.map((field, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-[15px] w-full"
            >
              <div className="flex items-center gap-[15px] w-full">
                <div className="w-14 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                  {field.label}
                </div>

                <div
                  className={`inline-flex items-center gap-2.5 flex-1 ${field.label === "门店电话" ? "" : ""}`}
                >
                  <div
                    className={`[font-family:'PingFang_SC-Regular',Helvetica] font-normal ${field.placeholderColor} text-sm text-center tracking-[0] leading-[normal]`}
                  >
                    {field.placeholder}
                  </div>
                </div>
              </div>

              <img
                className="w-full h-px object-cover"
                alt="Vector"
                src="https://c.animaapp.com/miiiqb69Sz0ZpJ/img/vector-16.svg"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="w-full opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:600ms]">
        <CardContent className="flex flex-col items-start justify-center gap-5 p-[15px]">
          <div className="inline-flex items-center gap-[5px]">
            <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
              门店图片
            </div>

            <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#999999] text-[13px] text-center tracking-[0] leading-[normal]">
              需拍出完整门匾、内部环境、前台
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-[5px] w-full">
            {storeImages.map((image, index) => (
              <button
                key={index}
                className="flex flex-col w-[88px] h-[88px] items-center justify-center gap-[7px] px-[27px] py-3 bg-[#f8f8f8] rounded-sm transition-colors hover:bg-[#efefef]"
              >
                <img
                  className="w-[18px] h-[18px]"
                  alt="Frame"
                  src="https://c.animaapp.com/miiiqb69Sz0ZpJ/img/frame-1.svg"
                />

                <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#d3d3d3] text-[11px] text-center tracking-[0] leading-[normal]">
                  {image.label}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:800ms]">
        <CardContent className="flex flex-col items-start justify-center gap-[15px] p-[15px]">
          <div className="inline-flex items-center gap-[5px]">
            <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[normal]">
              补充信息
            </div>
          </div>

          <button className="flex flex-col w-[88px] h-[88px] items-center justify-center gap-[7px] px-[27px] py-3 bg-[#f8f8f8] rounded-sm transition-colors hover:bg-[#efefef]">
            <img
              className="w-[18px] h-[18px]"
              alt="Frame"
              src="https://c.animaapp.com/miiiqb69Sz0ZpJ/img/frame-1.svg"
            />

            <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#d3d3d3] text-[11px] text-center tracking-[0] leading-[normal]">
              更多
            </div>
          </button>
        </CardContent>
      </Card>
    </section>
  );
};
