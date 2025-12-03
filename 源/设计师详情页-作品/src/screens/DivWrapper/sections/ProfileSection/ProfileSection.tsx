import React, { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";

const hairAttributes = [
  {
    label: "发量",
    options: [
      { value: "less", label: "少" },
      { value: "normal", label: "正常" },
      { value: "more", label: "多" },
    ],
    defaultValue: "less",
  },
  {
    label: "发质",
    options: [
      { value: "soft", label: "软" },
      { value: "normal", label: "正常" },
      { value: "hard", label: "硬" },
    ],
    defaultValue: "soft",
  },
  {
    label: "粗细",
    options: [
      { value: "fine", label: "细" },
      { value: "normal", label: "正常" },
      { value: "thick", label: "粗" },
    ],
    defaultValue: "fine",
  },
];

const galleryImages = [
  {
    src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png",
    className: "w-[179px] h-[179px]",
  },
  {
    src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png",
    className: "w-[179px] h-[179px]",
  },
  {
    src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png",
    className: "w-[179px] h-[179px]",
  },
  {
    src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png",
    className: "w-[179px] h-[179px]",
  },
  {
    src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png",
    className: "w-[179px] h-[87px]",
  },
  {
    src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png",
    className: "w-[179px] h-[87px]",
  },
];

export const ProfileSection = (): JSX.Element => {
  const [hairVolume, setHairVolume] = useState("less");
  const [hairQuality, setHairQuality] = useState("soft");
  const [hairThickness, setHairThickness] = useState("fine");

  return (
    <section className="flex flex-col w-full max-w-[363px] mx-auto items-start gap-2.5">
      <Card className="w-full bg-white rounded-md">
        <CardContent className="flex flex-col items-start gap-[15px] p-2.5 pt-[9px]">
          <div className="flex items-start justify-between w-full">
            <div className="inline-flex items-center justify-center gap-2.5 px-0 py-[7px]">
              <div className="mt-[-1.00px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                脸型
              </div>
            </div>
            <img
              className="w-[308px]"
              alt="Frame"
              src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-2052.svg"
            />
          </div>

          {hairAttributes.map((attribute, index) => (
            <div
              key={attribute.label}
              className="flex items-center justify-between w-full"
            >
              <div className="w-fit [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-xs leading-[normal] tracking-[0]">
                {attribute.label}
              </div>
              <ToggleGroup
                type="single"
                value={
                  index === 0
                    ? hairVolume
                    : index === 1
                      ? hairQuality
                      : hairThickness
                }
                onValueChange={(value) => {
                  if (value) {
                    if (index === 0) setHairVolume(value);
                    else if (index === 1) setHairQuality(value);
                    else setHairThickness(value);
                  }
                }}
                className="inline-flex items-center gap-[7px]"
              >
                {attribute.options.map((option) => (
                  <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    className="flex w-[98px] h-[30px] items-center justify-center gap-1 px-5 py-2 data-[state=on]:bg-[#333333] data-[state=off]:bg-[#f6f6f6] data-[state=on]:rounded-sm data-[state=off]:rounded-none border-0"
                  >
                    <span className="w-fit mt-[-1.50px] [font-family:'PingFang_SC-Semibold',Helvetica] data-[state=on]:font-normal data-[state=off]:[font-family:'PingFang_SC-Regular',Helvetica] data-[state=on]:text-white data-[state=off]:text-[#666666] text-[11px] leading-[normal] tracking-[0]">
                      {option.label}
                    </span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-[5px] w-full">
        {galleryImages.map((image, index) => (
          <img
            key={`gallery-${index}`}
            className={`${image.className} rounded object-cover`}
            alt="Rectangle"
            src={image.src}
          />
        ))}
      </div>
    </section>
  );
};
