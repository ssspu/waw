import React from "react";
import { Button } from "../../../../components/ui/button";

const services = [
  {
    icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-2.svg",
    label: "造型",
  },
  {
    icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006.svg",
    label: "剪发",
  },
  {
    icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-4.svg",
    label: "烫发",
  },
  {
    icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-6.svg",
    label: "染发",
  },
  {
    icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-3.svg",
    label: "护发",
  },
  {
    icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-5.svg",
    label: "头皮",
  },
  {
    icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-7.svg",
    label: "接发",
  },
  {
    icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-1.svg",
    label: "男士",
  },
];

export const FeaturedServicesSection = (): JSX.Element => {
  return (
    <section className="w-full bg-white rounded-md px-[15px] py-2.5 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      <nav className="grid grid-cols-4 gap-x-[39px] gap-y-[10px]">
        {services.map((service, index) => (
          <Button
            key={index}
            variant="ghost"
            className="flex flex-col items-center gap-[3px] h-auto p-0 hover:bg-transparent transition-opacity"
          >
            <img className="w-11 h-11" alt={service.label} src={service.icon} />
            <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-xs text-center tracking-[0] leading-[normal]">
              {service.label}
            </span>
          </Button>
        ))}
      </nav>
    </section>
  );
};
