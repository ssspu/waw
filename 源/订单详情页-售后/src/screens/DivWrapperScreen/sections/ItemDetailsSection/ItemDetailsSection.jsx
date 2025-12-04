import { StarIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const orderData = {
  seller: {
    name: "李天天",
    role: "美发师",
  },
  product: {
    image: "https://c.animaapp.com/mioaih5maExP45/img/frame-1.svg",
    name: "欧莱雅植物洗护套装一套",
    specs: ["洗发水+护发素", "500ml+500ml"],
    price: 799,
    quantity: 1,
  },
  order: {
    productAmount: "CD902847058048906",
    discount: 6,
    totalPayment: 799,
  },
};

const afterSalesData = {
  applicationTime: "2022-04-22 12:04:22",
  refundReason: "不想要了",
  refundAmount: 799,
  completionTime: "2022-04-22 12:04:22",
  refundNumber: "CD902847058048906",
};

export const ItemDetailsSection = () => {
  return (
    <section className="w-full max-w-[363px] mx-auto flex flex-col gap-[6px] opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
      <Card className="bg-white rounded-md overflow-hidden">
        <CardContent className="p-3 flex flex-col gap-3">
          <header className="flex items-center gap-1">
            <h2 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-black text-sm tracking-[0] leading-[19.6px]">
              {orderData.seller.name}
            </h2>
            <Badge
              variant="secondary"
              className="h-4 bg-[#f6f6f6] rounded-sm px-1"
            >
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-[10px] tracking-[0] leading-[14px]">
                {orderData.seller.role}
              </span>
            </Badge>
            <StarIcon className="h-3.5 w-3.5 fill-current text-yellow-400" />
          </header>

          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="h-[66px] w-[66px] bg-[#d9d9d9] rounded-sm flex-shrink-0" />
              <div className="flex-1 flex justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <p className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#666666] text-sm tracking-[0] leading-[19.6px]">
                    {orderData.product.name}
                  </p>
                  {orderData.product.specs.map((spec, index) => (
                    <p
                      key={index}
                      className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px]"
                    >
                      {spec}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div className="flex items-baseline">
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[19.6px]">
                      ¥
                    </span>
                    <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-lg tracking-[0] leading-[25.2px]">
                      {orderData.product.price}
                    </span>
                  </div>
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px]">
                    *{orderData.product.quantity}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#e5e5e5]" />

            <div className="flex flex-col gap-[10px]">
              <div className="flex justify-between items-center">
                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[16.8px]">
                  商品金额
                </span>
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px]">
                  {orderData.order.productAmount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[16.8px]">
                  优惠金额
                </span>
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px]">
                  -￥{orderData.order.discount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs tracking-[0] leading-[16.8px]">
                  合计支付
                </span>
                <div className="flex items-baseline">
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[19.6px]">
                    ¥
                  </span>
                  <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-lg tracking-[0] leading-[25.2px]">
                    {orderData.order.totalPayment}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-md overflow-hidden">
        <CardContent className="p-3 flex flex-col gap-3">
          <h3 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-sm tracking-[0] leading-[19.6px]">
            售后信息
          </h3>

          <div className="flex flex-col gap-[10px]">
            <div className="flex justify-between items-center">
              <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[16.8px]">
                申请时间
              </span>
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px]">
                {afterSalesData.applicationTime}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[16.8px]">
                退款原因
              </span>
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px]">
                {afterSalesData.refundReason}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[16.8px]">
                申请金额
              </span>
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px]">
                ￥{afterSalesData.refundAmount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#666666] text-xs tracking-[0] leading-[16.8px]">
                退款完成
              </span>
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px]">
                {afterSalesData.completionTime}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#333333] text-xs tracking-[0] leading-[16.8px]">
                退款编号
              </span>
              <div className="flex items-center gap-1">
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px]">
                  {afterSalesData.refundNumber}
                </span>
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px]">
                  ｜
                </span>
                <button className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-[16.8px] hover:opacity-70 transition-opacity">
                  复制
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
