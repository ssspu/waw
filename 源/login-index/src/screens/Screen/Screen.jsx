import {
  ChevronLeftIcon,
  MoreHorizontalIcon,
  ScanLineIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";

export const Screen = () => {
  return (
    <main
      className="bg-white overflow-hidden w-full min-w-[375px] h-[812px] relative"
      data-model-id="1:1393"
    >
      <div className="absolute w-full h-full top-0 left-0">
        <div className="absolute top-[34px] left-0 w-[375px] h-[812px] bg-white border border-solid border-black" />

        <div className="absolute w-full h-[339px] top-[253px] left-0">
          <div className="left-6 w-[174px] h-[174px] bg-[#0088ff] rounded-[87px] opacity-50 absolute top-0" />

          <div className="left-[232px] w-[143px] h-[143px] bg-[#b638ff] rounded-[71.5px] opacity-35 absolute top-0" />

          <div className="absolute top-7 left-0 w-[375px] h-[325px] backdrop-blur-[87.85px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(87.85px)_brightness(100%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_100%)]" />
        </div>

        <img
          className="absolute w-full h-[339px] top-[32px] left-0"
          alt="Group"
          src="https://c.animaapp.com/mifddcuil9hjK2/img/group-18.png"
        />

        <img
          className="absolute top-[285px] left-[153px] w-[69px] h-[69px]"
          alt="Group"
          src="https://c.animaapp.com/mifddcuil9hjK2/img/group-19.png"
        />

        <img
          className="absolute top-[34px] left-px w-[375px] h-[812px]"
          alt="Beijing"
          src="https://c.animaapp.com/mifddcuil9hjK2/img/beijing.png"
        />
      </div>

      <img
        className="absolute w-[86px] h-[28px] top-[30px] left-[247px]"
        alt="Group"
        src="https://c.animaapp.com/mifddcuil9hjK2/img/group-7.png"
      />

      <header className="absolute w-[384px] h-11 top-0 left-[-14px] flex">
        <div className="flex-1 w-[384.17px] flex">
          <div className="flex-1 w-[384.17px] relative">
            <img
              className="absolute w-full h-full top-[-6840.85%] left-[3.60%]"
              alt="Rectangle"
            />

            <img
              className="absolute w-[24.4px] h-[10.33px] top-[17.33px] left-[344.33px]"
              alt="Battery"
              src="https://c.animaapp.com/mifddcuil9hjK2/img/battery.png"
            />

            <img
              className="absolute w-[15.64px] h-[10.97px] top-[17.33px] left-[323.47px]"
              alt="Wifi"
              src="https://c.animaapp.com/mifddcuil9hjK2/img/wifi.svg"
            />

            <img
              className="absolute w-[17.4px] h-[10.67px] top-[17.67px] left-[301px]"
              alt="Cellular connection"
              src="https://c.animaapp.com/mifddcuil9hjK2/img/cellular-connection.svg"
            />

            <div className="absolute w-[30.69px] h-[17px] top-[15.5px] left-[35px] flex">
              <time className="flex-1 w-[28.69px] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
                9:41
              </time>
            </div>
          </div>
        </div>
      </header>

      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <Button
          className="flex w-[335px] h-[54px] items-center justify-center gap-2.5 px-[119px] py-[9px] absolute top-[582px] left-5 bg-[#efecff] rounded-[34px] hover:bg-[#e5e0ff] transition-colors"
          variant="ghost"
        >
          <span className="relative w-fit [font-family:'Inter',Helvetica] font-semibold text-[#6d58f1] text-sm tracking-[0] leading-[27px] whitespace-nowrap">
            帐号密码登录
          </span>
        </Button>
      </div>

      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:300ms]">
        <Button className="flex w-[335px] h-[54px] items-center justify-center gap-2.5 px-[119px] py-[9px] absolute top-[515px] left-[calc(50.00%_-_168px)] bg-[#6d58f1] rounded-[34px] hover:bg-[#5d48e1] transition-colors">
          <span className="relative w-fit [font-family:'Inter',Helvetica] font-semibold text-white text-sm tracking-[0] leading-[27px] whitespace-nowrap">
            一键登录
          </span>
        </Button>
      </div>

      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:500ms]">
        <div className="inline-flex items-center gap-[5px] absolute top-[754px] left-[calc(50.00%_-_127px)]">
          <Checkbox
            id="agreement"
            className="w-4 h-4 rounded-sm border-[#999999] data-[state=checked]:bg-[#6d58f1] data-[state=checked]:border-[#6d58f1]"
            defaultChecked
          />

          <label
            htmlFor="agreement"
            className="relative w-fit [font-family:'Inter',Helvetica] font-medium text-xs tracking-[0] leading-[normal] cursor-pointer"
          >
            <span className="text-[#999999]">我已阅读并同意</span>
            <span className="text-[#6d58f1]">《用户协议》《隐私协议》</span>
          </label>
        </div>
      </div>

      <footer className="flex flex-col w-[375px] items-start absolute left-[calc(50.00%_-_188px)] bottom-0 shadow-[0px_-1px_0px_#0000000a]">
        <div className="flex flex-col w-[375px] h-[34px] items-center justify-end gap-2.5 px-[120px] py-2 relative">
          <div className="relative w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </footer>

      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-[58px] left-[15px] w-4 h-4 p-0 hover:bg-transparent transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4 text-[#333333]" />
        </Button>
      </div>

      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:100ms]">
        <h1 className="absolute top-[55px] left-[calc(50.00%_-_32px)] [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-base text-center tracking-[0] leading-[normal]">
          账户登录
        </h1>
      </div>

      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        <div className="absolute top-[58px] right-[15px] flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 p-0 hover:bg-transparent transition-colors"
          >
            <MoreHorizontalIcon className="w-4 h-4 text-[#333333]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 p-0 hover:bg-transparent transition-colors"
          >
            <ScanLineIcon className="w-4 h-4 text-[#333333]" />
          </Button>
        </div>
      </div>

      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div className="absolute top-[332px] left-[calc(50.00%_-_41px)] [font-family:'PingFang_SC-Bold',Helvetica] font-bold text-[#333333] text-base text-center tracking-[0] leading-[normal]">
          WAW style
        </div>
      </div>
    </main>
  );
};
