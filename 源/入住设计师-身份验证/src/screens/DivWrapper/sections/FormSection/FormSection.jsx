import { ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group";
import { Separator } from "../../../../components/ui/separator";

const formFields = [
  {
    id: "name",
    label: "姓名",
    placeholder: "请输入本人姓名",
  },
  {
    id: "idNumber",
    label: "身份证号",
    placeholder: "请再次身份证号码",
  },
  {
    id: "email",
    label: "邮箱",
    placeholder: "请输入邮箱",
  },
  {
    id: "verificationCode",
    label: "验证码",
    placeholder: "请输入验证码",
  },
];

export const FormSection = () => {
  const [gender, setGender] = useState("male");

  return (
    <section className="flex flex-col w-full max-w-[363px] items-start gap-2">
      <Card className="w-full">
        <CardContent className="flex flex-col items-start justify-center gap-2 p-3">
          <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-sm text-center">
            <span className="text-black">个人身份证</span>
            <span className="text-[#999999]">(或其他有效身份证件)</span>
          </p>

          <div className="flex w-full items-center justify-between gap-2">
            <button className="flex flex-col w-[167px] h-[98px] items-center justify-center gap-2.5 px-[5px] py-1.5 bg-[#f8f8f8] transition-opacity hover:opacity-80">
              <div className="relative w-[149.14px] h-[81.28px] bg-[url(https://c.animaapp.com/miiepnx8EBw0nf/img/vector.svg)] bg-[100%_100%]">
                <div className="flex flex-col w-[87px] items-center justify-center gap-[7px] absolute top-1.5 left-[31px]">
                  <img
                    className="w-full h-[52.32px]"
                    alt="Upload portrait"
                    src="https://c.animaapp.com/miiepnx8EBw0nf/img/frame-2396.svg"
                  />
                  <p className="w-full [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#d9d9d9] text-[11px] text-center">
                    上传人像页
                  </p>
                </div>
              </div>
            </button>

            <button className="flex flex-col w-[167px] h-[98px] items-center justify-center gap-2.5 px-[5px] py-1.5 bg-[#f8f8f8] transition-opacity hover:opacity-80">
              <div className="relative w-[149.14px] h-[81.28px] bg-[url(https://c.animaapp.com/miiepnx8EBw0nf/img/vector.svg)] bg-[100%_100%]">
                <div className="flex flex-col w-[87px] items-center justify-center gap-[7px] absolute top-1.5 left-[31px]">
                  <img
                    className="w-[86.69px] h-[52.32px]"
                    alt="Upload emblem"
                    src="https://c.animaapp.com/miiepnx8EBw0nf/img/frame-2397.svg"
                  />
                  <p className="w-full [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#d9d9d9] text-[11px] text-center">
                    上传国徽页
                  </p>
                </div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="flex flex-col items-start justify-center gap-5 p-[15px]">
          <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-semibold text-black text-sm">
            实名信息
          </h2>

          <div className="flex flex-col items-start gap-[15px] w-full">
            <div className="flex items-center gap-[15px] w-full">
              <Label className="w-14 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm">
                姓名
              </Label>
              <Input
                placeholder="请输入本人姓名"
                className="flex-1 border-0 shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm focus-visible:ring-0"
              />
            </div>
            <Separator className="w-full" />
          </div>

          <div className="flex flex-col items-start gap-[15px] w-full">
            <div className="flex items-center gap-[25px] w-full">
              <div className="flex items-center gap-[15px] flex-1">
                <Label className="w-14 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm">
                  性别
                </Label>
                <RadioGroup
                  value={gender}
                  onValueChange={setGender}
                  className="flex items-center gap-[15px]"
                >
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="male"
                      className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#333333] text-sm cursor-pointer"
                    >
                      男
                    </Label>
                    <RadioGroupItem value="male" id="male" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="female"
                      className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm cursor-pointer"
                    >
                      女
                    </Label>
                    <RadioGroupItem value="female" id="female" />
                  </div>
                </RadioGroup>
              </div>
            </div>
            <Separator className="w-full" />
          </div>

          <div className="flex flex-col items-start gap-[15px] w-full">
            <div className="flex items-center gap-[15px] w-full">
              <Label className="w-14 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm text-center">
                身份证号
              </Label>
              <Input
                placeholder="请再次身份证号码"
                className="flex-1 border-0 shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm focus-visible:ring-0"
              />
            </div>
            <Separator className="w-full" />
          </div>

          <div className="flex flex-col items-start gap-[15px] w-full">
            <div className="flex items-center gap-[15px] w-full">
              <Label className="w-14 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm">
                邮箱
              </Label>
              <Input
                placeholder="请输入邮箱"
                className="flex-1 border-0 shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm focus-visible:ring-0"
              />
            </div>
            <Separator className="w-full" />
          </div>

          <div className="flex flex-col items-start gap-[15px] w-full">
            <div className="flex items-center gap-[15px] w-full">
              <Label className="w-14 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm">
                手机号
              </Label>
              <div className="flex items-center justify-between flex-1">
                <Input
                  placeholder="请输入手机号码"
                  className="border-0 shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm focus-visible:ring-0"
                />
                <Button
                  variant="link"
                  className="h-auto p-0 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#0088ff] text-sm"
                >
                  获取验证码
                </Button>
              </div>
            </div>
            <Separator className="w-full" />
          </div>

          <div className="flex flex-col items-start gap-[15px] w-full">
            <div className="flex items-center gap-[15px] w-full">
              <Label className="w-14 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm">
                验证码
              </Label>
              <Input
                placeholder="请输入验证码"
                className="flex-1 border-0 shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-sm focus-visible:ring-0"
              />
            </div>
            <Separator className="w-full" />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="flex flex-col items-start justify-center gap-5 p-[15px]">
          <div className="flex flex-col items-start gap-[15px] w-full">
            <div className="flex items-center justify-between w-full">
              <Label className="w-14 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-sm">
                人脸验证
              </Label>
              <Button
                variant="link"
                className="h-auto p-0 flex items-center gap-1.5"
              >
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs">
                  去验证
                </span>
                <ChevronRightIcon className="w-3.5 h-3.5 text-[#a6a6a6]" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
