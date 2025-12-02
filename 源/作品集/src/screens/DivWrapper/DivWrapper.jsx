import {
  ChevronDownIcon,
  ChevronLeftIcon,
  MoreVerticalIcon,
  SearchIcon,
  Share2Icon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const galleryImages = [
  {
    src: "https://c.animaapp.com/mimxn9o1hGbnXQ/img/---176.svg",
    alt: "Portfolio image 1",
  },
  {
    src: "https://c.animaapp.com/mimxn9o1hGbnXQ/img/---177.svg",
    alt: "Portfolio image 2",
  },
  {
    src: "https://c.animaapp.com/mimxn9o1hGbnXQ/img/---178.svg",
    alt: "Portfolio image 3",
  },
  {
    src: "https://c.animaapp.com/mimxn9o1hGbnXQ/img/---179.svg",
    alt: "Portfolio image 4",
  },
  {
    src: "https://c.animaapp.com/mimxn9o1hGbnXQ/img/---180.svg",
    alt: "Portfolio image 5",
  },
  {
    src: "https://c.animaapp.com/mimxn9o1hGbnXQ/img/---181.svg",
    alt: "Portfolio image 6",
  },
];

const filterCategories = [
  { label: "女士", value: "women" },
  { label: "男士", value: "men" },
  { label: "儿童", value: "children" },
];

const filterShapes = [
  { type: "circle-filled", label: "圆形填充" },
  { type: "circle", label: "圆形" },
  { type: "square", label: "方形" },
  { type: "diamond", label: "菱形" },
  { type: "triangle", label: "三角形" },
  { type: "rectangle", label: "矩形" },
];

const filterOptions = [
  { label: "脸型", value: "少", options: ["正常", "多"] },
  { label: "发量", value: "数", options: ["正常", "缓"] },
  { label: "发质", value: "睡", options: ["正常", "粗"] },
];

export const DivWrapper = () => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState("women");

  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-[899px] flex flex-col relative"
      data-model-id="0:91"
    >
      <header className="bg-white w-full flex-shrink-0">
        <div className="h-11 flex items-center justify-between px-4 translate-y-[-1rem] animate-fade-in opacity-0">
          <time className="[font-family:'Inter',Helvetica] font-normal text-black text-sm">
            9:41
          </time>
          <div className="flex items-center gap-1">
            <img
              className="w-[25px] h-[11px]"
              alt="Battery"
              src="https://c.animaapp.com/mimxn9o1hGbnXQ/img/battery.png"
            />
          </div>
        </div>

        <nav className="h-[55px] flex items-center justify-between px-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:100ms]">
          <Button variant="ghost" size="icon" className="h-auto p-0">
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-base">
            作品集
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-auto p-0">
              <MoreVerticalIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-auto p-0">
              <Share2Icon className="w-4 h-4" />
            </Button>
          </div>
        </nav>

        <div className="px-4 pb-4 flex flex-col gap-2.5 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#a6a6a6]" />
            <Input
              placeholder="请输入关键词搜索"
              className="w-full h-[30px] bg-[#f6f6f6] border-0 rounded-[99px] pl-10 [font-family:'PingFang_SC-Regular',Helvetica] text-[11px] text-[#a6a6a6] placeholder:text-[#a6a6a6]"
            />
          </div>

          <div className="flex items-center justify-between">
            <Tabs
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="flex-1"
            >
              <TabsList className="bg-transparent h-auto p-0 gap-[47.2px]">
                {filterCategories.map((category) => (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    className="h-auto p-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none relative"
                  >
                    <div className="flex flex-col items-center gap-[8.5px]">
                      <span
                        className={`[font-family:'PingFang_SC-Semibold',Helvetica] text-sm ${
                          selectedCategory === category.value
                            ? "font-semibold text-black"
                            : "font-medium text-[#a6a6a6]"
                        }`}
                      >
                        {category.label}
                      </span>
                      {selectedCategory === category.value && (
                        <div className="w-2.5 h-[2.5px] bg-black rounded-full" />
                      )}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Button
              variant="ghost"
              className="h-auto p-0 gap-1 hover:bg-transparent"
              onClick={() => setIsFilterOpen(true)}
            >
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs">
                筛选
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-1.5 pt-1.5 grid grid-cols-2 gap-1.5 content-start translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:300ms]">
        {galleryImages.map((image, index) => (
          <img
            key={index}
            className="w-full h-auto object-cover"
            alt={image.alt}
            src={image.src}
          />
        ))}
      </main>

      <div className="h-[34px] flex items-center justify-center flex-shrink-0">
        <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="w-[375px] max-w-[375px] p-0 gap-0 bg-white rounded-t-3xl rounded-b-none bottom-0 top-auto translate-y-0 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom">
          <div className="flex flex-col">
            <div className="px-4 pt-4 pb-3">
              <Tabs defaultValue="women" className="w-full">
                <TabsList className="w-full bg-transparent h-auto p-0 justify-start gap-8">
                  {filterCategories.map((category) => (
                    <TabsTrigger
                      key={category.value}
                      value={category.value}
                      className="h-auto p-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-sm data-[state=active]:text-black text-[#a6a6a6]"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                  <TabsTrigger
                    value="filter"
                    className="h-auto p-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-sm data-[state=active]:text-black text-[#a6a6a6] ml-auto"
                  >
                    筛选
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="px-4 py-3 space-y-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] text-sm text-[#666666] min-w-[40px]">
                    脸型
                  </span>
                  <div className="flex items-center gap-3 flex-1">
                    {filterShapes.map((shape, index) => (
                      <button
                        key={index}
                        className="w-10 h-10 flex items-center justify-center border border-[#e5e5e5] rounded hover:border-black transition-colors"
                      >
                        {shape.type === "circle-filled" && (
                          <div className="w-6 h-6 bg-black rounded-full" />
                        )}
                        {shape.type === "circle" && (
                          <div className="w-6 h-6 border-2 border-black rounded-full" />
                        )}
                        {shape.type === "square" && (
                          <div className="w-6 h-6 border-2 border-black" />
                        )}
                        {shape.type === "diamond" && (
                          <div className="w-6 h-6 border-2 border-black rotate-45" />
                        )}
                        {shape.type === "triangle" && (
                          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-black" />
                        )}
                        {shape.type === "rectangle" && (
                          <div className="w-8 h-5 border-2 border-black" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {filterOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] text-sm text-[#666666] min-w-[40px]">
                      {option.label}
                    </span>
                    <div className="flex items-center gap-3 flex-1">
                      <Button
                        variant="default"
                        className="h-auto px-6 py-2 bg-[#333333] hover:bg-[#333333]/90 text-white [font-family:'PingFang_SC-Regular',Helvetica] text-sm rounded"
                      >
                        {option.value}
                      </Button>
                      {option.options.map((opt, optIndex) => (
                        <Button
                          key={optIndex}
                          variant="ghost"
                          className="h-auto px-6 py-2 hover:bg-[#f5f5f5] text-[#666666] [font-family:'PingFang_SC-Regular',Helvetica] text-sm"
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="px-4 pb-6 pt-4 flex-row gap-3 sm:justify-between">
              <Button
                variant="outline"
                className="flex-1 h-auto py-3 rounded-full border-[#333333] text-[#333333] hover:bg-[#f5f5f5] [font-family:'PingFang_SC-Medium',Helvetica] font-medium"
                onClick={() => setIsFilterOpen(false)}
              >
                重置
              </Button>
              <Button
                className="flex-1 h-auto py-3 rounded-full bg-[#333333] hover:bg-[#333333]/90 text-white [font-family:'PingFang_SC-Medium',Helvetica] font-medium"
                onClick={() => setIsFilterOpen(false)}
              >
                确定
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
