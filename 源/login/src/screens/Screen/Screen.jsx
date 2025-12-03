import { ChevronLeftIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";

export const Screen = () => {
  return (
    <main
      className="bg-white overflow-hidden w-full min-w-[375px] h-[812px] relative"
      data-model-id="1:1445"
    >
      <div className="w-full h-[104.13%] top-[-4.13%] absolute left-0">
        <div className="top-[34px] h-[812px] bg-white absolute left-0 w-[375px]" />

        <div className="absolute w-full h-[41.75%] top-[31.11%] left-0">
          <div className="left-6 w-[174px] h-[174px] bg-[#0088ff] rounded-[87px] opacity-50 absolute top-0" />

          <div className="left-[232px] w-[143px] h-[143px] bg-[#b638ff] rounded-[71.5px] opacity-35 absolute top-0" />

          <div className="top-7 h-[325px] backdrop-blur-[87.85px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(87.85px)_brightness(100%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_100%)] absolute left-0 w-[375px]" />
        </div>

        <div className="absolute w-full h-[41.75%] top-0 left-0">
          <div className="left-6 w-[174px] h-[174px] bg-[#0088ff] rounded-[87px] opacity-50 absolute top-0" />

          <div className="left-[232px] w-[143px] h-[143px] bg-[#b638ff] rounded-[71.5px] opacity-35 absolute top-0" />

          <div className="top-7 h-[325px] backdrop-blur-[87.85px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(87.85px)_brightness(100%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_100%)] absolute left-0 w-[375px]" />
        </div>

        <img
          className="top-[34px] w-[375px] h-[812px] absolute left-0"
          alt="Beijing"
          src="https://c.animaapp.com/miffhglfzysTe0/img/beijing.png"
        />
      </div>

      <img
        className="absolute w-[22.93%] h-[3.45%] top-[3.68%] left-[65.84%]"
        alt="Group"
        src="https://c.animaapp.com/miffhglfzysTe0/img/group-7.png"
      />

      <header className="absolute w-[102.45%] h-[5.42%] top-0 left-[-3.69%] flex">
        <div className="flex-1 w-[384.17px] flex">
          <div className="flex-1 w-[384.17px] relative bg-[100%_100%]">
            <img
              className="absolute w-[6.35%] h-[23.48%] top-[39.39%] left-[89.60%]"
              alt="Battery"
              src="https://c.animaapp.com/miffhglfzysTe0/img/battery.png"
            />

            <img
              className="absolute w-[4.07%] h-[24.92%] top-[39.39%] left-[84.18%]"
              alt="Wifi"
              src="https://c.animaapp.com/miffhglfzysTe0/img/wifi.svg"
            />

            <img
              className="absolute w-[4.53%] h-[24.24%] top-[40.15%] left-[78.31%]"
              alt="Cellular connection"
              src="https://c.animaapp.com/miffhglfzysTe0/img/cellular-connection.svg"
            />

            <time className="absolute w-[7.99%] h-[38.64%] top-[35.23%] left-[9.11%] flex">
              <span className="flex-1 w-[28.69px] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
                9:41
              </span>
            </time>
          </div>
        </div>
      </header>

      <div className="inline-flex items-end gap-[5px] absolute top-[754px] left-[calc(50.00%_-_127px)] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
        <Checkbox id="terms" className="relative w-4 h-4" />

        <label
          htmlFor="terms"
          className="relative w-fit [font-family:'Inter',Helvetica] font-medium text-transparent text-xs tracking-[0] leading-[normal] cursor-pointer"
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

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-[58px] left-[15px] w-4 h-4 p-0 h-auto translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>

      <div className="flex flex-col w-[146px] items-start gap-2.5 absolute top-[117px] left-5 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <h1 className="relative self-stretch mt-[-1.00px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-[23px] tracking-[0] leading-[normal]">
          帐号密码登录
        </h1>

        <p className="relative self-stretch [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#acb5bd] text-base tracking-[0] leading-[normal]">
          欢迎来到WAW style
        </p>
      </div>

      <section className="flex flex-col w-[344px] items-start gap-2.5 px-[17px] py-[30px] absolute top-[201px] left-5 bg-[#ffffff99] rounded-[22px] border border-solid border-white translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <form className="flex flex-col w-[303px] items-center gap-3 relative flex-[0_0_auto]">
          <div className="flex h-[50px] items-center gap-5 px-5 py-3 relative self-stretch w-full bg-white rounded-[34px]">
            <span className="relative w-fit mt-[-1.50px] [font-family:'Inter',Helvetica] font-semibold text-black text-base tracking-[0] leading-[27px] whitespace-nowrap">
              +86
            </span>

            <Input
              type="tel"
              placeholder="请输入手机号码"
              className="relative w-fit mt-[-1.50px] [font-family:'Inter',Helvetica] font-normal text-[#a6a6a6] text-sm tracking-[0] leading-[27px] whitespace-nowrap border-0 bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex h-[50px] items-center gap-5 px-5 py-3 relative self-stretch w-full bg-white rounded-[34px]">
            <Input
              type="password"
              placeholder="请输入密码"
              className="relative w-fit mt-[-1.50px] [font-family:'Inter',Helvetica] font-normal text-[#a6a6a6] text-sm tracking-[0] leading-[27px] whitespace-nowrap border-0 bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <nav className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
            <Button
              variant="link"
              className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#6d58f1] text-sm tracking-[0] leading-[27px] whitespace-nowrap p-0 h-auto"
            >
              注册帐号
            </Button>

            <Button
              variant="link"
              className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#a6a6a6] text-sm tracking-[0] leading-[27px] whitespace-nowrap p-0 h-auto"
            >
              忘记密码
            </Button>
          </nav>

          <Button className="flex h-[50px] items-center justify-center gap-2.5 px-[119px] py-[9px] relative self-stretch w-full bg-[#6d58f1] rounded-[34px] hover:bg-[#5d48e1] transition-colors">
            <span className="relative w-fit [font-family:'Inter',Helvetica] font-semibold text-white text-sm tracking-[0] leading-[27px] whitespace-nowrap">
              登录
            </span>
          </Button>
        </form>
      </section>
    </main>
  );
};
