import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";

const statsData = [
  { value: "1244", label: "关注" },
  { value: "123", label: "粉丝" },
  { value: "234", label: "问答" },
  { value: "1245", label: "收藏" },
];

const territoryAvatars = [
  "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
  "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
  "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
  "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
  "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
  "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
];

export const UserInfoSection = (): JSX.Element => {
  return (
    <section className="inline-flex flex-col items-start gap-[18px] px-5 py-0 w-full max-w-[355px] translate-y-[-1rem] animate-fade-in opacity-0">
      <div className="flex flex-col w-full max-w-[204px] items-start gap-2.5">
        <div className="inline-flex items-end gap-2">
          <Avatar className="w-[84px] h-[84px]">
            <AvatarImage
              src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-77.svg"
              alt="Javen"
            />
            <AvatarFallback>JV</AvatarFallback>
          </Avatar>

          <div className="inline-flex flex-col items-start gap-0.5">
            <div className="flex items-center gap-1">
              <h1 className="mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-[19px] tracking-[0] leading-[normal]">
                Javen
              </h1>

              <img
                className="w-5 h-5"
                alt="Verified badge"
                src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-2110.svg"
              />
            </div>

            <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
              金牌会员
            </p>
          </div>
        </div>

        <p className="self-stretch [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
          来自星星的盗梦者，一切都要回答火星
        </p>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-[27px]">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-0.5 min-w-[26px]"
            >
              <div className="mt-[-1.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[15px] tracking-[0] leading-[normal]">
                {stat.value}
              </div>

              <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="h-auto inline-flex items-center justify-center gap-0.5 px-5 py-[7px] bg-white rounded-[25px] border border-solid border-[#666666]"
        >
          <span className="mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-[normal]">
            编辑
          </span>
        </Button>
      </div>

      <div className="flex flex-col w-full items-start gap-2.5 px-2.5 py-[9px] bg-[#f6f6f6] rounded-[5px]">
        <div className="flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-[11px]">
            <div className="flex flex-col items-start gap-0.5">
              <h2 className="mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-[13px] tracking-[0] leading-[normal]">
                领地
              </h2>

              <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                私人设计师
              </p>
            </div>

            <div className="inline-flex items-center">
              {territoryAvatars.map((avatarSrc, index) => (
                <div
                  key={index}
                  className={`w-[30px] h-[30px] rounded-full border border-solid border-white bg-cover bg-[50%_50%] ${
                    index > 0 ? "-ml-2.5" : ""
                  }`}
                  style={{ backgroundImage: `url(${avatarSrc})` }}
                />
              ))}
            </div>
          </div>

          <img
            className="w-9 h-9"
            alt="QR Code"
            src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-2117.svg"
          />
        </div>
      </div>
    </section>
  );
};
