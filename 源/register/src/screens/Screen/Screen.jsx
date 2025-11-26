import { ChevronLeftIcon, CircleIcon, MoreHorizontalIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";

export const Screen = () => {
  const formFields = [
    { id: "phone", prefix: "+86", placeholder: "请输入手机号码" },
    { id: "code", placeholder: "请输入验证码", action: "获取验证码" },
    { id: "password", placeholder: "请设置密码" },
    { id: "confirmPassword", placeholder: "请在此确认密码" },
  ];

  return (
    <main
      className="bg-white overflow-hidden w-full min-w-[375px] h-[812px] relative"
      data-model-id="1:1504"
    >
      <div className="absolute w-full h-[104.13%] top-[-6.28%] left-0">
        <div className="top-[34px] h-[812px] bg-white absolute left-0 w-[375px]" />

        <div className="absolute w-full h-[41.75%] top-[31.11%] left-0">
          <div className="left-6 w-[174px] h-[174px] bg-[#0088ff] rounded-[87px] opacity-50 absolute top-0" />

          <div className="left-[232px] w-[143px] h-[143px] bg-[#b638ff] rounded-[71.5px] opacity-35 absolute top-0" />

          <div className="top-7 h-[325px] backdrop-blur-[87.85px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(87.85px)_brightness(100%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_100%)] absolute left-0 w-[375px]" />
        </div>

        <img
          className="absolute w-full h-full top-[6.03%] left-0"
          alt="Group"
          src="https://c.animaapp.com/miffi26qHuGRlf/img/group-18.png"
        />

        <img
          className="absolute top-[51px] left-0.5 w-[373px] h-[795px]"
          alt="Beijing"
          src="https://c.animaapp.com/miffi26qHuGRlf/img/beijing.png"
        />
      </div>

      <img
        className="absolute w-[22.93%] h-[3.45%] top-[3.68%] left-[65.84%]"
        alt="Group"
        src="https://c.animaapp.com/miffi26qHuGRlf/img/group-7.png"
      />

      <header className="absolute w-[102.45%] h-[5.42%] top-0 left-[-3.69%] flex">
        <div className="flex-1 w-[384.17px] flex">
          <div className="flex-1 w-[384.17px] relative bg-[100%_100%]">
            <img
              className="absolute w-[6.35%] h-[23.48%] top-[39.39%] left-[89.60%]"
              alt="Battery"
              src="https://c.animaapp.com/miffi26qHuGRlf/img/battery.png"
            />

            <img
              className="absolute w-[4.07%] h-[24.92%] top-[39.39%] left-[84.18%]"
              alt="Wifi"
              src="https://c.animaapp.com/miffi26qHuGRlf/img/wifi.svg"
            />

            <img
              className="absolute w-[4.53%] h-[24.24%] top-[40.15%] left-[78.31%]"
              alt="Cellular connection"
              src="https://c.animaapp.com/miffi26qHuGRlf/img/cellular-connection.svg"
            />

            <div className="absolute w-[7.99%] h-[38.64%] top-[35.23%] left-[9.11%] flex">
              <time className="flex-1 w-[28.69px] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
                9:41
              </time>
            </div>
          </div>
        </div>
      </header>

      <nav className="flex items-center justify-between absolute top-[58px] left-[15px] right-[15px]">
        <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
          <ChevronLeftIcon className="w-4 h-4 text-[#333333]" />
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
            <MoreHorizontalIcon className="w-4 h-4 text-[#333333]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
            <CircleIcon className="w-4 h-4 text-[#333333]" />
          </Button>
        </div>
      </nav>

      <section className="flex flex-col w-[146px] items-start gap-2.5 absolute top-[117px] left-5 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <h1 className="relative self-stretch mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-[23px] tracking-[0] leading-[normal]">
          帐号注册
        </h1>

        <p className="relative self-stretch [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#acb5bd] text-base tracking-[0] leading-[normal]">
          欢迎来到WAW style
        </p>
      </section>

      <section className="flex flex-col w-[344px] items-start gap-2.5 px-[17px] py-[30px] absolute top-[201px] left-5 bg-[#ffffff99] rounded-[22px] border border-solid border-white translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <div className="flex flex-col w-[303px] items-center gap-3 relative flex-[0_0_auto]">
          {formFields.map((field, index) => (
            <div
              key={field.id}
              className={`flex h-[50px] items-center ${
                field.action ? "justify-between" : "gap-5"
              } px-5 py-3 relative self-stretch w-full bg-white rounded-[34px]`}
            >
              {field.prefix && (
                <span className="relative w-fit mt-[-1.50px] [font-family:'Inter',Helvetica] font-semibold text-black text-base tracking-[0] leading-[27px] whitespace-nowrap">
                  {field.prefix}
                </span>
              )}

              <Input
                type={field.id.includes("password") ? "password" : "text"}
                placeholder={field.placeholder}
                className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 [font-family:'Inter',Helvetica] font-normal text-[#a6a6a6] text-sm tracking-[0] leading-[27px] placeholder:text-[#a6a6a6]"
              />

              {field.action && (
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent [font-family:'Inter',Helvetica] font-normal text-[#6d58f1] text-sm tracking-[0] leading-[27px] whitespace-nowrap"
                >
                  {field.action}
                </Button>
              )}
            </div>
          ))}

          <Button className="flex h-[50px] items-center justify-center gap-2.5 px-[119px] py-[9px] relative self-stretch w-full bg-[#6d58f1] rounded-[34px] hover:bg-[#5d48e1] transition-colors">
            <span className="relative w-fit [font-family:'Inter',Helvetica] font-semibold text-white text-sm tracking-[0] leading-[27px] whitespace-nowrap">
              注册
            </span>
          </Button>

          <div className="flex items-center justify-center gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
            <span className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#a6a6a6] text-sm tracking-[0] leading-[27px] whitespace-nowrap">
              已有帐号
            </span>

            <Button
              variant="link"
              className="h-auto p-0 [font-family:'Inter',Helvetica] font-normal text-[#6d58f1] text-sm tracking-[0] leading-[27px] whitespace-nowrap"
            >
              立即登录
            </Button>
          </div>
        </div>
      </section>

      <div className="inline-flex items-end gap-[5px] absolute top-[754px] left-[calc(50.00%_-_127px)] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
        <Checkbox
          id="terms"
          className="w-4 h-4 rounded-sm border-[#999999] data-[state=checked]:bg-[#6d58f1] data-[state=checked]:border-[#6d58f1]"
        />

        <label
          htmlFor="terms"
          className="relative w-fit [font-family:'Inter',Helvetica] font-medium text-xs tracking-[0] leading-[normal] cursor-pointer"
        >
          <span className="text-[#999999]">我已阅读并同意</span>
          <span className="text-[#6d58f1]">《用户协议》《隐私协议》</span>
        </label>
      </div>

      <footer className="flex flex-col w-[375px] items-start absolute left-[calc(50.00%_-_188px)] bottom-0 shadow-[0px_-1px_0px_#0000000a]">
        <div className="flex flex-col w-[375px] h-[34px] items-center justify-end gap-2.5 px-[120px] py-2 relative">
          <div className="relative w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>
    </main>
  );
};
