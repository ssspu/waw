import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const morningSlots = [
  { time: "10:00", status: "booked", label: "已预约" },
  { time: "11:00", status: "booked", label: "已预约" },
  { time: "12:00", status: "selected", label: null },
];

const afternoonSlots = [
  { time: "13:00", status: "available" },
  { time: "14:00", status: "available" },
  { time: "15:00", status: "available" },
  { time: "16:00", status: "available" },
  { time: "17:00", status: "available" },
  { time: "18:00", status: "available" },
];

export const ProfileSection = (): JSX.Element => {
  return (
    <Card className="w-full max-w-[390px] mx-auto bg-white rounded-md">
      <CardContent className="flex flex-col gap-2.5 p-[15px]">
        <section className="flex flex-col gap-2.5">
          <h3 className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-normal tracking-[0]">
            上午
          </h3>

          <div className="grid grid-cols-3 gap-[5px]">
            {morningSlots.map((slot, index) => (
              <Button
                key={`morning-${index}`}
                variant="outline"
                className={`flex flex-col h-[50px] items-center justify-center px-[42px] py-2 bg-white rounded-sm border ${
                  slot.status === "selected"
                    ? "border-[1.5px] border-[#333333]"
                    : "border border-[#f6f6f6]"
                } hover:bg-white`}
              >
                <span
                  className={`${
                    slot.status === "selected"
                      ? "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333]"
                      : "[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6]"
                  } text-sm leading-normal tracking-[0]`}
                >
                  {slot.time}
                </span>
                {slot.label && (
                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[9px] leading-normal tracking-[0]">
                    {slot.label}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <h3 className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-normal tracking-[0]">
            下午
          </h3>

          <div className="grid grid-cols-3 gap-[5px]">
            {afternoonSlots.map((slot, index) => (
              <Button
                key={`afternoon-${index}`}
                variant="outline"
                className={`flex flex-col h-[50px] items-center justify-center px-[42px] py-2 ${
                  index === 0 ? "bg-[#f6f6f6]" : "bg-[#f6f6f6]"
                } rounded-sm border border-solid hover:bg-[#e6e6e6]`}
              >
                <span
                  className={`[font-family:'PingFang_SC-Medium',Helvetica] font-medium ${
                    index === 0 ? "text-[#333333]" : "text-[#666666]"
                  } text-sm leading-normal tracking-[0]`}
                >
                  {slot.time}
                </span>
              </Button>
            ))}
          </div>
        </section>

        <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-normal tracking-[0]">
          预约当天服务需要提前60分钟
        </p>
      </CardContent>
    </Card>
  );
};
