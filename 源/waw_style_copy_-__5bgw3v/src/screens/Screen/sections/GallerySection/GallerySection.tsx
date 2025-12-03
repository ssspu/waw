import { StarIcon } from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";

const serviceCards = [
  {
    id: 1,
    image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    stylist: {
      name: "李天天",
      role: "美发师",
      avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg",
    },
    rating: "4.8",
    reviews: "768",
    distance: "6.7km",
    imageHeight: "h-[179px]",
  },
  {
    id: 2,
    image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    stylist: {
      name: "李天天",
      role: "美发师",
      avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg",
    },
    rating: "4.8",
    reviews: "768",
    distance: "6.7km",
    imageHeight: "h-[179px]",
  },
  {
    id: 3,
    image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    stylist: {
      name: "李天天",
      role: "美发师",
      avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg",
    },
    rating: "4.8",
    reviews: "768",
    distance: "6.7km",
    imageHeight: "h-[179px]",
  },
  {
    id: 4,
    image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    stylist: {
      name: "李天天",
      role: "美发师",
      avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg",
    },
    rating: "4.8",
    reviews: "768",
    distance: "6.7km",
    imageHeight: "h-[179px]",
  },
  {
    id: 5,
    image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    stylist: {
      name: "李天天",
      role: "美发师",
      avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg",
    },
    rating: "4.8",
    reviews: "768",
    distance: "6.7km",
    imageHeight: "h-[43px]",
  },
  {
    id: 6,
    image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
    title: "烫发",
    description: "发型提案+染发+造型",
    price: "799",
    stylist: {
      name: "李天天",
      role: "美发师",
      avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg",
    },
    rating: "4.8",
    reviews: "768",
    distance: "6.7km",
    imageHeight: "h-[43px]",
  },
];

export const GallerySection = (): JSX.Element => {
  return (
    <section className="w-full">
      <header className="flex items-center gap-1.5 px-[10px] h-[30px] bg-[url(https://c.animaapp.com/mi5bcgvrGbkedE/img/subtract.svg)] bg-[100%_100%]">
        <img
          className="w-3.5 h-3.5"
          alt="Frame"
          src="https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2.svg"
        />
        <h2 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#dacbb1] text-sm tracking-[0] leading-[normal]">
          优服务
        </h2>
      </header>

      <div className="grid grid-cols-2 gap-[6px] mt-[5px]">
        {serviceCards.map((card, index) => (
          <Card
            key={card.id}
            className="bg-white rounded border-0 shadow-none translate-y-[-1rem] animate-fade-in opacity-0"
            style={
              { "--animation-delay": `${index * 100}ms` } as React.CSSProperties
            }
          >
            <CardContent className="p-0">
              <div className="flex flex-col gap-[7px]">
                <img
                  className={`w-full ${card.imageHeight} rounded object-cover`}
                  alt={card.title}
                  src={card.image}
                />

                <div className="flex flex-col gap-1.5 px-2 pb-2">
                  <div className="flex flex-col gap-[3px]">
                    <h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base tracking-[0] leading-[normal]">
                      {card.title}
                    </h3>

                    <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                      {card.description}
                    </p>

                    <div className="flex items-center gap-[3px]">
                      <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
                        ¥
                      </span>
                      <span className="[font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal] whitespace-nowrap">
                        {card.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex items-center gap-1.5">
                      <Avatar className="w-[26px] h-[26px]">
                        <AvatarImage
                          src={card.stylist.avatar}
                          alt={card.stylist.name}
                        />
                        <AvatarFallback className="bg-[#a6a6a6]" />
                      </Avatar>

                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-start gap-1">
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px] tracking-[0] leading-[normal]">
                            {card.stylist.name}
                          </span>
                          <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                            {card.stylist.role}
                          </span>
                        </div>

                        <div className="flex items-center gap-0.5">
                          <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-[normal]">
                            {card.rating}
                          </span>
                          <StarIcon className="w-2.5 h-2.5 fill-current text-[#333333]" />
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs tracking-[0] leading-[normal]">
                            ({card.reviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                      {card.distance}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
