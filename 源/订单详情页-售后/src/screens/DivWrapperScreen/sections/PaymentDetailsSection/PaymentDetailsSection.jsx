import React from "react";

export const PaymentDetailsSection = () => {
  const paymentDetails = {
    title: "退款成功",
    description: "商家同意退款，钱款原路退回",
  };

  return (
    <section className="w-full flex justify-center py-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      <div className="flex flex-col gap-1 items-center">
        <h2 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-black text-base text-center tracking-[0] leading-[22.4px]">
          {paymentDetails.title}
        </h2>
        <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#a6a6a6] text-xs tracking-[0] leading-[16.8px] text-center">
          {paymentDetails.description}
        </p>
      </div>
    </section>
  );
};
