import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";

const comments = [
  {
    id: 1,
    avatar: "https://c.animaapp.com/mimycn40ClpGDL/img/---192-1.png",
    username: "李佳佳",
    time: "10分钟前",
    content: "这个设计师的审美很在线呢",
  },
  {
    id: 2,
    avatar: "https://c.animaapp.com/mimycn40ClpGDL/img/---192-2.png",
    username: "韩善宇",
    time: "8小时前",
    content: "😍😍😍 好喜欢！",
  },
  {
    id: 3,
    avatar: "https://c.animaapp.com/mimycn40ClpGDL/img/---192-3.png",
    username: "马菲菲",
    time: "2025-12-01 12:20:55",
    content: "这个发型我真的太喜欢了！很有高级感。",
  },
  {
    id: 4,
    avatar: "https://c.animaapp.com/mimycn40ClpGDL/img/---192-4.png",
    username: "小仙女",
    time: "2025-12-01 12:20:55",
    content: "这个发型我真的太喜欢了！很有高级感。",
  },
];

export const DivWrapper = () => {
  return (
    <div
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="0:581"
    >
      <header className="w-full bg-white flex flex-col">
        <div className="w-full h-11 flex items-center justify-between px-4 pt-px">
          <time className="[font-family:'Inter',Helvetica] text-black text-sm leading-[19.6px] font-normal tracking-[0]">
            9:41
          </time>
          <div className="flex items-center gap-1">
            <img
              className="w-[25px] h-[11px]"
              alt="Battery"
              src="https://c.animaapp.com/mimycn40ClpGDL/img/battery.png"
            />
          </div>
        </div>

        <nav className="w-full h-[54px] flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-auto p-0 hover:bg-transparent"
          >
            <img
              className="w-4 h-4"
              alt="Back"
              src="https://c.animaapp.com/mimycn40ClpGDL/img/frame.svg"
            />
          </Button>

          <h1 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-base leading-[22.4px] tracking-[0]">
            作品详情
          </h1>

          <img
            className="w-[86px] h-7"
            alt="Actions"
            src="https://c.animaapp.com/mimycn40ClpGDL/img/group-8.svg"
          />
        </nav>
      </header>

      <section className="w-full bg-white">
        <img
          className="w-full h-[68px]"
          alt="Profile section"
          src="https://c.animaapp.com/mimycn40ClpGDL/img/---180.svg"
        />
      </section>

      <section className="w-full">
        <img
          className="w-full h-[500px] object-cover"
          alt="Main content"
          src="https://c.animaapp.com/mimycn40ClpGDL/img/---182.svg"
        />
      </section>

      <section className="w-full bg-white h-16">
        <img
          className="w-full h-16 object-cover"
          alt="Stats background"
          src="https://c.animaapp.com/mimycn40ClpGDL/img/object.png"
        />
        <img
          className="absolute w-full h-16"
          alt="Stats overlay"
          src="https://c.animaapp.com/mimycn40ClpGDL/img/---184.svg"
        />
      </section>

      <section className="w-full bg-white flex flex-col gap-3 px-1.5 py-3">
        <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm text-center leading-[19.6px] tracking-[0] w-[61px]">
          评论·268
        </h2>

        <div className="flex items-start gap-1.5">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src="https://c.animaapp.com/mimycn40ClpGDL/img/---192.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div className="flex-1 bg-[#f6f6f6] rounded-[99px] h-[30px] flex items-center px-[11px]">
            <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-xs leading-4 tracking-[0]">
              请说说你的看法吧……
            </span>
          </div>
        </div>

        {comments.map((comment) => (
          <article key={comment.id} className="flex items-start gap-1.5">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={comment.avatar} />
              <AvatarFallback>{comment.username[0]}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1 overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-xs leading-4 tracking-[0]">
                  {comment.username}
                </span>
                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-[10px] leading-[14px] tracking-[0]">
                  {comment.time}
                </span>
              </div>
              <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-black text-xs leading-4 tracking-[0]">
                {comment.content}
              </p>
            </div>
          </article>
        ))}
      </section>

      <footer className="w-full bg-white flex flex-col mt-auto">
        <div className="w-full h-[49px] flex items-center gap-2.5 px-[15px]">
          <img
            className="w-[280px] h-[31px]"
            alt="Actions"
            src="https://c.animaapp.com/mimycn40ClpGDL/img/---204.svg"
          />
          <img
            className="w-[55px] h-[31px]"
            alt="More actions"
            src="https://c.animaapp.com/mimycn40ClpGDL/img/---205.svg"
          />
        </div>

        <div className="w-full h-[34px] flex items-start justify-center bg-white">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px] mt-[21px]" />
        </div>
      </footer>
    </div>
  );
};
