import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const ratingCategories = [
  { label: "专业", value: 4.6, width: 91 },
  { label: "服务", value: 4.9, width: 97 },
  { label: "效果", value: 4.8, width: 94 },
  { label: "环境", value: 4.8, width: 94 },
];

const filterTags = [
  { label: "全部", count: null },
  { label: "技术很好", count: 232 },
  { label: "效果满意", count: 321 },
  { label: "服务态度", count: 321 },
];

const reviews = [
  {
    id: 1,
    userName: "加菲猫",
    rating: 5.0,
    date: "2019-12-25",
    content:
      "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环",
    images: [
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
    ],
    reply: null,
  },
  {
    id: 2,
    userName: "加菲猫",
    rating: 5.0,
    date: "2019-12-25",
    content:
      "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环",
    images: [
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
    ],
    reply:
      "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环",
  },
  {
    id: 3,
    userName: "加菲猫",
    rating: 5.0,
    date: "2019-12-25",
    content:
      "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环",
    images: [
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
      "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
    ],
    reply: null,
  },
];

export const ProfileSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-2">
      <Card className="w-full bg-white rounded-md">
        <CardContent className="flex items-center justify-center gap-2.5 px-[22px] py-[17px]">
          <div className="flex items-center gap-[34px]">
            <div className="flex flex-col w-[82px] items-center justify-center gap-1">
              <div className="flex items-end justify-center gap-1 w-full">
                <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-[27px] tracking-[0] leading-[normal]">
                  4.8
                </div>
                <div className="flex items-center justify-center px-0 py-[5px]">
                  <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs text-center tracking-[0] leading-[normal]">
                    很棒
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, index) => (
                    <img
                      key={index}
                      className="w-[10.37px] h-[9.91px]"
                      alt="Star"
                      src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/star-1.svg"
                    />
                  ))}
                </div>
                <div className="text-[#a6a6a6] text-xs [font-family:'PingFang_SC-Regular',Helvetica] font-normal tracking-[0] leading-[normal]">
                  2345条评价
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[194px] items-start gap-1">
              {ratingCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-2 w-full">
                  <div className="w-fit [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-[11px] text-center leading-[normal] tracking-[0]">
                    {category.label}
                  </div>
                  <div className="flex flex-col w-[138px] h-1.5 items-start gap-2.5 bg-[#ffa87c1f] rounded-[11px]">
                    <div
                      className="h-1.5 bg-[#ffa77b] rounded-[11px]"
                      style={{ width: `${category.width}%` }}
                    />
                  </div>
                  <div className="w-fit [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#333333] text-xs text-center leading-[normal] tracking-[0]">
                    {category.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-md">
        <CardContent className="flex flex-col items-center justify-center gap-3 p-2.5">
          <div className="flex flex-wrap items-start gap-[6px] w-full">
            {filterTags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center justify-center gap-1 px-2.5 py-1 bg-[#f6f6f6] rounded-sm hover:bg-[#e6e6e6] cursor-pointer transition-colors"
              >
                <span className="[font-family:'PingFang_SC-Regular',Helvetica] text-[#a6a6a6] text-[13px] font-normal tracking-[0] leading-[normal]">
                  {tag.label}
                </span>
                {tag.count && (
                  <span className="[font-family:'PingFang_SC-Regular',Helvetica] text-[#a6a6a6] text-xs font-normal tracking-[0] leading-[normal]">
                    {tag.count}
                  </span>
                )}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col items-start gap-[15px] w-full">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex flex-col items-start gap-2 w-full"
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="w-[30px] h-[30px]">
                      <AvatarImage src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg" />
                      <AvatarFallback className="bg-[#a6a6a6]" />
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <div className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs leading-[normal] tracking-[0]">
                        {review.userName}
                      </div>
                      <div className="flex items-center gap-0.5">
                        <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-xs leading-[normal] tracking-[0]">
                          {review.rating}
                        </div>
                        {[...Array(5)].map((_, index) => (
                          <div key={index} className="w-2.5 h-2.5">
                            <img
                              className="w-full h-full"
                              alt="Star"
                              src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/star-1.svg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <time className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[11px] tracking-[0] leading-[normal]">
                    {review.date}
                  </time>
                </div>

                <p className="w-full [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs leading-[18px] tracking-[0]">
                  {review.content}
                </p>

                <div className="flex items-center gap-1.5">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      className={`w-20 ${review.id === 3 ? "h-[61px]" : "h-20"} rounded-[3px] object-cover`}
                      alt="Review"
                      src={image}
                    />
                  ))}
                </div>

                {review.reply && (
                  <div className="flex items-start gap-0.5 px-2.5 py-1.5 w-full bg-[#f6f6f6] rounded">
                    <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] leading-4 whitespace-nowrap tracking-[0]">
                      回复:
                    </span>
                    <p className="flex-1 [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-[10px] leading-4 tracking-[0]">
                      {review.reply}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
