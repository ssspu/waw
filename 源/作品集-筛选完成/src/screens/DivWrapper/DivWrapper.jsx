import { ChevronLeftIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const portfolioImages = [
  {
    src: "https://c.animaapp.com/mimxnb7pa9Z2TF/img/---176.svg",
    alt: "Portfolio image 1",
    className: "top-[210px] left-1.5",
  },
  {
    src: "https://c.animaapp.com/mimxnb7pa9Z2TF/img/---177.svg",
    alt: "Portfolio image 2",
    className: "top-[210px] left-[190px]",
  },
  {
    src: "https://c.animaapp.com/mimxnb7pa9Z2TF/img/---178.svg",
    alt: "Portfolio image 3",
    className: "top-[454px] left-1.5",
  },
  {
    src: "https://c.animaapp.com/mimxnb7pa9Z2TF/img/---179.svg",
    alt: "Portfolio image 4",
    className: "top-[454px] left-[190px]",
  },
  {
    src: "https://c.animaapp.com/mimxnb7pa9Z2TF/img/---180.svg",
    alt: "Portfolio image 5",
    className: "top-[699px] left-1.5",
  },
  {
    src: "https://c.animaapp.com/mimxnb7pa9Z2TF/img/---181.svg",
    alt: "Portfolio image 6",
    className: "top-[699px] left-[190px]",
  },
];

const filterOptions = [
  {
    icon: "https://c.animaapp.com/mimxnb7pa9Z2TF/img/---207.svg",
    label: "综合",
    hasDropdown: true,
  },
  {
    src: "https://c.animaapp.com/mimxnb7pa9Z2TF/img/---200.svg",
    alt: "Filter option 2",
  },
  {
    src: "https://c.animaapp.com/mimxnb7pa9Z2TF/img/---201.svg",
    alt: "Filter option 3",
  },
];

const categories = [
  { id: "women", label: "女士", active: true },
  { id: "men", label: "男士", active: false },
  { id: "children", label: "儿童", active: false },
  { id: "nails", label: "美甲", active: false },
];

export const DivWrapper = () => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-[899px] relative"
      data-model-id="0:263"
    >
      <header className="absolute top-0 left-0 w-[375px] h-[166px] bg-white translate-y-[-1rem] animate-fade-in opacity-0">
        <nav className="flex items-center justify-between px-[15px] pt-[58px]">
          <Button variant="ghost" size="icon" className="h-auto w-4 p-0">
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>

          <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-base leading-[22.4px] tracking-[0]">
            作品集
          </h1>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-auto w-7 p-0">
              <img
                className="w-[86px] h-7"
                alt="Group"
                src="https://c.animaapp.com/mimxnb7pa9Z2TF/img/group-8.svg"
              />
            </Button>
          </div>
        </nav>

        <div className="px-[15px] mt-[11px] flex flex-col gap-2.5">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#a6a6a6]" />
            <Input
              placeholder="请输入关键词搜索"
              className="w-full h-[30px] bg-[#f6f6f6] border-0 rounded-[99px] pl-10 pr-4 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] leading-[15.4px] placeholder:text-[#a6a6a6]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-[47.2px]">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`flex flex-col items-center gap-[8.5px] ${
                    category.id === "nails" ? "opacity-0" : ""
                  }`}
                >
                  <span
                    className={`h-5 text-sm text-center leading-[19.6px] tracking-[0] whitespace-nowrap ${
                      category.active
                        ? "[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black"
                        : "[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6]"
                    }`}
                  >
                    {category.label}
                  </span>
                  {category.active && (
                    <img
                      className="w-2.5 h-[2.5px]"
                      alt="Active indicator"
                      src="https://c.animaapp.com/mimxnb7pa9Z2TF/img/vector-15.svg"
                    />
                  )}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-1">
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-4 tracking-[0] whitespace-nowrap">
                筛选
              </span>
              <img
                className="w-4 h-4"
                alt="Arrow drop down"
                src="https://c.animaapp.com/mimxnb7pa9Z2TF/img/arrow-drop-down-line-1.svg"
              />
            </button>
          </div>
        </div>
      </header>

      <div className="absolute top-0 -left-3.5 w-96 h-11 flex">
        <div className="w-[384.17px] flex overflow-hidden">
          <div className="w-[384.17px] h-11 relative overflow-hidden bg-[100%_100%]">
            <img
              className="absolute top-[17px] left-[344px] w-[25px] h-[11px]"
              alt="Battery"
              src="https://c.animaapp.com/mimxnb7pa9Z2TF/img/battery.png"
            />

            <div className="absolute top-[15px] left-[35px] w-[31px] h-[17px] flex">
              <div className="w-[30.69px] h-[17px] -ml-px [font-family:'Inter',Helvetica] font-normal text-black text-sm leading-[19.6px] tracking-[0] whitespace-nowrap">
                9:41
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="absolute top-44 left-1.5 w-[268px] h-6 flex gap-1.5 overflow-hidden translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div className="w-20 h-6 flex bg-white rounded overflow-hidden bg-[100%_100%]">
          <div className="mt-2 w-2 h-2 relative ml-16 bg-[url(https://c.animaapp.com/mimxnb7pa9Z2TF/img/arrow-drop-down-line.png)] bg-[100%_100%]">
            <img
              className="absolute w-[70.71%] h-[47.14%] top-[27.86%] left-[14.64%]"
              alt="Dropdown arrow"
              src="https://c.animaapp.com/mimxnb7pa9Z2TF/img/--.svg"
            />
          </div>

          <img
            className="mt-[6.3px] w-[22.8px] h-[10.93px] ml-[-64.5px]"
            alt="Filter label"
            src="https://c.animaapp.com/mimxnb7pa9Z2TF/img/---1.svg"
          />

          <img
            className="mt-1 w-4 h-4 ml-[9.7px]"
            alt="Filter icon"
            src="https://c.animaapp.com/mimxnb7pa9Z2TF/img/---207.svg"
          />
        </div>

        <img
          className="w-[88px] h-6"
          alt="Filter option"
          src="https://c.animaapp.com/mimxnb7pa9Z2TF/img/---200.svg"
        />

        <img
          className="w-[88px] h-6"
          alt="Filter option"
          src="https://c.animaapp.com/mimxnb7pa9Z2TF/img/---201.svg"
        />
      </section>

      <main className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        {portfolioImages.map((image, index) => (
          <img
            key={index}
            className={`absolute w-[179px] ${
              index === 4 || index === 5 ? "h-[200px]" : "h-[239px]"
            } ${image.className}`}
            alt={image.alt}
            src={image.src}
          />
        ))}
      </main>

      <footer className="absolute left-[calc(50.00%_-_188px)] bottom-0 w-[375px] h-[34px] flex">
        <div className="mt-[21px] w-[134px] h-[5px] ml-[120.5px] bg-black rounded-[100px]" />
      </footer>
    </div>
  );
};
