import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const DivWrapper = () => {
  const statusBarIcons = [
    {
      className: "w-[15.00%] h-[57.14%] top-[28.57%] left-[55.00%]",
      src: "https://c.animaapp.com/mipl5b3gx2BfHj/img/empty-bar.svg",
      alt: "Path",
    },
    {
      className: "w-[15.00%] h-[42.86%] top-[42.86%] left-[32.50%]",
      src: "https://c.animaapp.com/mipl5b3gx2BfHj/img/empty-bar.svg",
      alt: "Path",
    },
    {
      className: "w-[15.00%] h-[32.14%] top-[53.57%] left-[10.00%]",
      src: "https://c.animaapp.com/mipl5b3gx2BfHj/img/path-2.svg",
      alt: "Path",
    },
    {
      className: "w-[15.00%] h-[71.43%] top-[14.29%] left-[77.50%]",
      src: "https://c.animaapp.com/mipl5b3gx2BfHj/img/empty-bar.svg",
      alt: "Empty bar",
    },
  ];

  const wifiIcons = [
    {
      className: "w-[27.32%] h-[21.86%] top-[63.85%] left-[37.11%]",
      src: "https://c.animaapp.com/mipl5b3gx2BfHj/img/path-4.svg",
      alt: "Path",
    },
    {
      className: "w-[58.25%] h-[23.67%] top-[39.07%] left-[21.66%]",
      src: "https://c.animaapp.com/mipl5b3gx2BfHj/img/path-1.svg",
      alt: "Path",
    },
    {
      className: "w-[89.06%] h-[30.88%] top-[14.29%] left-[6.25%]",
      src: "https://c.animaapp.com/mipl5b3gx2BfHj/img/path.svg",
      alt: "Path",
    },
  ];

  return (
    <div
      className="bg-[#333333] overflow-hidden w-full min-w-[375px] min-h-[812px] relative"
      data-model-id="61:93"
    >
      <div className="absolute top-[calc(50.00%_-_406px)] left-[calc(50.00%_-_188px)] w-[375px] h-[812px] bg-[linear-gradient(180deg,rgba(41,39,38,1)_0%,rgba(15,13,11,1)_100%)]" />

      <header className="absolute top-0 left-[calc(50.00%_-_188px)] w-[375px] h-[98px] flex flex-col justify-between items-center opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
        <div className="h-11 w-[375px] flex justify-between">
          <img
            className="self-end mb-[11px] w-[54px] h-[21px] ml-[21px]"
            alt="Time light"
            src="https://c.animaapp.com/mipl5b3gx2BfHj/img/time---light.svg"
          />

          <div className="mt-4 w-[69px] h-3.5 relative mr-3.5">
            <div className="absolute top-[calc(50.00%_-_7px)] left-0 w-5 h-3.5">
              {statusBarIcons.map((icon, index) => (
                <img
                  key={`status-${index}`}
                  className={`absolute ${icon.className}`}
                  alt={icon.alt}
                  src={icon.src}
                />
              ))}
              {statusBarIcons.map((icon, index) => (
                <img
                  key={`status-duplicate-${index}`}
                  className={`absolute ${icon.className}`}
                  alt={icon.alt}
                  src={icon.src}
                />
              ))}
            </div>

            <div className="absolute top-[calc(50.00%_-_7px)] left-6 w-4 h-3.5">
              {wifiIcons.map((icon, index) => (
                <img
                  key={`wifi-${index}`}
                  className={`absolute ${icon.className}`}
                  alt={icon.alt}
                  src={icon.src}
                />
              ))}
            </div>

            <div className="absolute top-[calc(50.00%_-_7px)] right-0 w-[25px] h-3.5">
              <img
                className="absolute top-[calc(50.00%_-_2px)] right-0 w-px h-1"
                alt="Rectangle"
                src="https://c.animaapp.com/mipl5b3gx2BfHj/img/rectangle-23.svg"
              />
              <img
                className="absolute top-[calc(50.00%_-_6px)] left-0 w-[23px] h-3"
                alt="Rectangle stroke"
                src="https://c.animaapp.com/mipl5b3gx2BfHj/img/rectangle-21--stroke-.svg"
              />
              <div className="absolute top-[calc(50.00%_-_4px)] left-0.5 w-[19px] h-2 bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        <nav className="h-[54px] w-[375px] relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-[calc(50.00%_-_16px)] left-1.5 w-[87px] h-8 p-0 hover:bg-transparent"
          >
            <img
              className="w-full h-full"
              alt="Back button"
              src="https://c.animaapp.com/mipl5b3gx2BfHj/img/--.svg"
            />
          </Button>

          <h1 className="absolute top-[calc(50.00%_-_26px)] right-[155px] [font-family:'Inter',Helvetica] font-normal text-white text-base text-center tracking-[0] leading-[51.2px] whitespace-nowrap">
            我要推广
          </h1>

          <div className="absolute top-[calc(50.00%_-_16px)] right-1.5 w-[87px] h-8">
            <img
              className="w-full h-full"
              alt="Menu buttons"
              src="https://c.animaapp.com/mipl5b3gx2BfHj/img/frame-2110.svg"
            />
          </div>
        </nav>
      </header>

      <div className="absolute left-[calc(50.00%_-_188px)] bottom-0 w-[375px] h-[34px] flex items-end justify-center">
        <div className="mb-2 w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>

      <div className="absolute left-[calc(50.00%_-_188px)] bottom-0 w-[375px] h-[34px] flex items-center justify-center">
        <div className="h-[34px] w-[375px] flex items-end justify-center">
          <div className="mb-2 w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </div>

      <div className="absolute left-[156px] bottom-[62px] w-[60px] h-[87px] flex flex-col justify-between items-center overflow-hidden opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:600ms]">
        <Button
          variant="ghost"
          size="icon"
          className="h-[60px] w-[60px] flex items-center justify-center bg-[#ffffff33] rounded-[49px] overflow-hidden hover:bg-[#ffffff4d] transition-colors"
        >
          <div className="h-[22px] w-[22px] relative bg-[url(https://c.animaapp.com/mipl5b3gx2BfHj/img/share-circle-fill.png)] bg-[100%_100%]">
            <img
              className="absolute w-[83.33%] h-[83.33%] top-[8.33%] left-[8.33%]"
              alt="Share icon"
              src="https://c.animaapp.com/mipl5b3gx2BfHj/img/---1.svg"
            />
          </div>
        </Button>

        <p className="h-[17px] w-[62px] [font-family:'PingFang_SC-Semibold',Helvetica] text-white text-center font-normal text-xs tracking-[0] leading-[16.8px]">
          分享链接
        </p>
      </div>

      <Card className="absolute left-[calc(50.00%_-_152px)] bottom-[172px] w-[305px] h-[388px] rounded-2xl overflow-hidden border-[none] shadow-[0px_4px_24px_#221f19] bg-[100%_100%] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-2xl before:[background:linear-gradient(180deg,rgba(203,191,163,1)_0%,rgba(203,191,163,0)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]">
        <CardContent className="p-0 relative h-full">
          <img
            className="absolute left-[-1532px] bottom-[2890px] w-[395px] h-[265px]"
            alt="Background image"
          />

          <img
            className="absolute top-0 left-[calc(50.00%_-_152px)] w-[305px] h-[52px]"
            alt="Card header decoration"
            src="https://c.animaapp.com/mipl5b3gx2BfHj/img/---3.svg"
          />

          <img
            className="absolute top-[calc(50.00%_-_179px)] left-[calc(50.00%_-_33px)] w-[62px] h-[15px]"
            alt="Welcome text"
            src="https://c.animaapp.com/mipl5b3gx2BfHj/img/----.svg"
          />

          <img
            className="absolute top-[calc(50.00%_-_121px)] left-[calc(50.00%_-_88px)] w-[174px] h-[19px]"
            alt="IP description"
            src="https://c.animaapp.com/mipl5b3gx2BfHj/img/--------ip.png"
          />

          <img
            className="absolute top-[111px] left-[calc(50.00%_-_104px)] w-52 h-52"
            alt="QR code"
            src="https://c.animaapp.com/mipl5b3gx2BfHj/img/frame-4.svg"
          />

          <p className="absolute right-[93px] bottom-[38px] [font-family:'PingFang_SC-Regular',Helvetica] text-[#968982] whitespace-nowrap font-normal text-xs tracking-[0] leading-[16.8px]">
            扫描二维码，立即入驻
          </p>
        </CardContent>
      </Card>

      <img
        className="absolute top-[127px] left-[33px] w-[285px] h-[99px] opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]"
        alt="WAW TrendHub branding"
        src="https://c.animaapp.com/mipl5b3gx2BfHj/img/--1.png"
      />
    </div>
  );
};
