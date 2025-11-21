import React from "react";
import { DashboardSection } from "./sections/DashboardSection";
import { MenuSection } from "./sections/MenuSection";
import { ProfileSection } from "./sections/ProfileSection";
import { UserInfoSection } from "./sections/UserInfoSection";

export const Screen = (): JSX.Element => {
  return (
    <main
      className="bg-[#f2f2f2] overflow-hidden w-full min-w-[375px] min-h-screen relative flex flex-col"
      data-model-id="15:2200"
    >
      <div className="w-full bg-[#f6f6f6] flex-1 flex flex-col" />

      <img
        className="absolute top-0 left-0 h-[300px] w-full object-cover"
        alt="Profile background"
        src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/rectangle-186.png"
      />

      <div className="absolute top-[290px] left-0 right-0 mx-auto w-full bg-[#f3f3f3] rounded-t-lg flex-1" />

      <header className="absolute w-full top-0 left-0 flex items-center justify-between px-4 h-11 z-10">
        <div className="flex items-center justify-between w-full">
          <time className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm">
            9:41
          </time>

          <div className="flex items-center gap-1">
            <img
              className="w-[15.56px] h-[10.67px]"
              alt="Cellular connection"
              src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/cellular-connection.svg"
            />
            <img
              className="w-[15.27px] h-[11px]"
              alt="Wifi"
              src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/wifi.svg"
            />
            <img
              className="w-[24.33px] h-[11.33px]"
              alt="Battery"
              src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/battery.png"
            />
          </div>
        </div>
      </header>

      <img
        className="absolute top-[31px] left-[247px] w-32 h-[72px] z-10"
        alt="Decorative group"
        src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/group-7.png"
      />

      <nav className="absolute top-[51px] left-[15px] z-10">
        <img
          className="w-[69px] h-[30px]"
          alt="Navigation frame"
          src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-1881.svg"
        />
      </nav>

      <img
        className="absolute top-[260px] left-2.5 w-[355px] h-56 z-10"
        alt="Decorative subtract"
        src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/subtract-1.svg"
      />

      <div className="relative z-20 flex flex-col items-center pt-[120px] pb-[83px] gap-3">
        <UserInfoSection />
        <MenuSection />
        <ProfileSection />
      </div>

      <DashboardSection />
    </main>
  );
};
