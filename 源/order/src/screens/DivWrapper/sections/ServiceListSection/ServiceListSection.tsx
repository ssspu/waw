import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const serviceOrders = [
  {
    orderNumber: "CDD83290895",
    status: "已确认",
    statusColor: "#ffa77b",
    serviceName: "洗剪吹",
    serviceDetails: "洗护+修剪+造型",
    duration: "预计1小时",
    time: "今天11:00",
    provider: {
      name: "李天天",
      badge: "美发师",
      avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34.svg",
      rating: "4.8",
      reviews: "23",
    },
    price: "799",
    quantity: "x1",
    hasIcon: true,
    primaryButton: "订单完成",
  },
  {
    orderNumber: "CDD83290895",
    status: "已确认",
    statusColor: "#ffa77b",
    serviceName: "洗剪吹",
    serviceDetails: "洗护+修剪+造型",
    duration: "预计1小时",
    time: "今天11:00",
    provider: {
      name: "造型美发沙龙",
      badge: null,
      avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34-1.svg",
      rating: "4.8",
      reviews: "23",
    },
    price: "799",
    quantity: "x1",
    hasIcon: false,
    primaryButton: "正在确认",
  },
  {
    orderNumber: "CDD83290895",
    status: "已确认",
    statusColor: "#ffa77b",
    serviceName: "洗剪吹",
    serviceDetails: "洗护+修剪+造型",
    duration: "预计1小时",
    time: "今天11:00",
    provider: {
      name: "李天天",
      badge: "美发师",
      avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34.svg",
      rating: "4.8",
      reviews: "23",
    },
    price: "799",
    quantity: "x1",
    hasIcon: false,
    primaryButton: "订单完成",
  },
  {
    orderNumber: "CDD83290895",
    status: "已确认",
    statusColor: "#ffa77b",
    serviceName: "洗剪吹",
    serviceDetails: "洗护+修剪+造型",
    duration: "预计1小时",
    time: "今天11:00",
    provider: {
      name: "李天天",
      badge: "美发师",
      avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34.svg",
      rating: "4.8",
      reviews: "23",
    },
    price: "799",
    quantity: "x1",
    hasIcon: false,
    primaryButton: "立即评价",
  },
];

export const ServiceListSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-1.5 px-1.5">
      {serviceOrders.map((order, index) => (
        <Card
          key={`order-${index}`}
          className="w-full bg-white rounded-md border-0 shadow-none translate-y-[-1rem] animate-fade-in opacity-0"
          style={
            { "--animation-delay": `${index * 100}ms` } as React.CSSProperties
          }
        >
          <CardContent className="flex flex-col items-start gap-2.5 p-2.5">
            <header className="flex flex-col items-start gap-[9px] w-full">
              <div className="flex items-center justify-between w-full">
                <div className="inline-flex items-center gap-2">
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px] tracking-[0] leading-[normal]">
                    订单编号:
                  </span>
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[13px] tracking-[0] leading-[normal]">
                    {order.orderNumber}
                  </span>
                </div>
                <span
                  className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[13px] tracking-[0] leading-[normal]"
                  style={{ color: order.statusColor }}
                >
                  {order.status}
                </span>
              </div>
              <Separator className="w-full" />
            </header>

            <div className="flex flex-col items-start gap-2 w-full">
              <div className="flex flex-col w-full items-start gap-1">
                <h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base tracking-[0] leading-[normal]">
                  {order.serviceName}
                </h3>
                <div className="flex items-center gap-1.5 w-full">
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                    服务:
                  </span>
                  <div className="inline-flex items-center gap-1">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                      {order.serviceDetails}
                    </span>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                      ｜
                    </span>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                      {order.duration}
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                    时间:
                  </span>
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                    {order.time}
                  </span>
                </div>
              </div>

              <div className="flex h-9 items-center justify-between w-full">
                <div className="inline-flex items-center gap-1.5">
                  <Avatar className="w-8 h-8 rounded-2xl">
                    <AvatarImage
                      src={order.provider.avatar}
                      alt={order.provider.name}
                    />
                    <AvatarFallback className="bg-[#a6a6a6]">
                      {order.provider.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="inline-flex flex-col items-start gap-px">
                    <div className="inline-flex items-center justify-center gap-1">
                      <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal]">
                        {order.provider.name}
                      </span>
                      {order.provider.badge && (
                        <Badge
                          variant="secondary"
                          className="px-1 py-px bg-[#f6f6f6] rounded-sm h-auto"
                        >
                          <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] tracking-[0] leading-[normal]">
                            {order.provider.badge}
                          </span>
                        </Badge>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-0.5">
                      <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal]">
                        {order.provider.rating}
                      </span>
                      <div className="inline-flex items-center gap-0.5">
                        <div className="relative w-2.5 h-2.5">
                          <img
                            className="absolute w-full h-full top-[5.77%] left-[7.69%]"
                            alt="Star"
                            src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/star-1.svg"
                          />
                        </div>
                      </div>
                      <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs tracking-[0] leading-[normal]">
                        ({order.provider.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex flex-col items-end justify-center gap-[3px]">
                  <div className="inline-flex items-end">
                    <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-[#333333] text-sm text-right tracking-[0] leading-[normal]">
                      ¥
                    </span>
                    <span className="[font-family:'FZChaoCuHei-M10T-Regular',Helvetica] font-normal text-[#333333] text-lg text-right tracking-[0] leading-[normal] whitespace-nowrap">
                      {order.price}
                    </span>
                  </div>
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-[15px] tracking-[0] leading-[normal]">
                    {order.quantity}
                  </span>
                </div>
              </div>

              <footer className="flex items-center justify-between w-full">
                <button className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[normal] transition-colors hover:text-[#666666]">
                  更多
                </button>
                <div className="inline-flex items-center gap-1.5">
                  {order.hasIcon && (
                    <img
                      className="w-[30px] h-[30px]"
                      alt="Frame"
                      src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/frame-2142.svg"
                    />
                  )}
                  <Button
                    variant="secondary"
                    className="w-[74px] h-[30px] px-[15px] py-2 bg-[#f6f6f6] rounded-sm hover:bg-[#e6e6e6] transition-colors"
                  >
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[11px] tracking-[0] leading-[normal]">
                      详情
                    </span>
                  </Button>
                  <Button className="w-[74px] h-[30px] px-[15px] py-2 bg-[#333333] rounded-sm hover:bg-[#1a1a1a] transition-colors">
                    <span className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-[11px] tracking-[0] leading-[normal]">
                      {order.primaryButton}
                    </span>
                  </Button>
                </div>
              </footer>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
