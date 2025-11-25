<template>
  <div class="div-wrapper-screen" data-model-id="53:5485">
    <div class="rectangle-2" />
    <div class="img-wrapper">
      <img class="vector-6" alt="Vector" src="/img/vector.svg" />
    </div>
    <div class="element">
      <div class="iphone-x-status-bars-wrapper">
        <div class="iphone-x-status-bars">
          <div class="battery">
            <img class="border" alt="Border" src="/img/border.svg" />
            <img class="cap" alt="Cap" src="/img/cap.svg" />
            <img class="capacity" alt="Capacity" src="/img/capacity.svg" />
          </div>
          <img class="wifi" alt="Wifi" src="/img/wifi.svg" />
          <img class="cellular-connection" alt="Cellular connection" src="/img/cellular-connection.svg" />
          <div class="time-style">
            <div class="text-wrapper-15">9:41</div>
          </div>
        </div>
      </div>
    </div>
    <div class="group">
      <img class="vector-7" alt="Vector" src="/img/vector-13.svg" />
      <div class="ellipse" />
      <div class="ellipse-2" />
      <div class="ellipse-3" />
      <div class="ellipse-4" />
      <div class="ellipse-5" />
    </div>
    <FrameSubsection />
    <FrameWrapperSubsection />
    <DivWrapperSubsection />
    <div class="home-indicator-wrapper">
      <div class="home-indicator" />
    </div>
    <div class="text-wrapper-16">服务点评</div>
    <div class="frame-21">
      <div class="frame-wrapper">
        <div class="frame-22">
          <div class="text-wrapper-17">发布</div>
        </div>
      </div>
      <div class="frame-23">
        <div class="home-indicator" />
      </div>
    </div>
    <DivSubsection />
  </div>
</template>

<script>
import DivSubsection from "./DivWrapperScreen/sections/DivSubsection.vue";
import DivWrapperSubsection from "./DivWrapperScreen/sections/DivWrapperSubsection.vue";
import FrameSubsection from "./DivWrapperScreen/sections/FrameSubsection.vue";
import FrameWrapperSubsection from "./DivWrapperScreen/sections/FrameWrapperSubsection.vue";

export default {
  name: "DivWrapperScreen",
  components: {
    DivSubsection,
    DivWrapperSubsection,
    FrameSubsection,
    FrameWrapperSubsection,
  },
};
</script>

<style>
.div-wrapper-screen {
  background-color: #f2f2f2;
  min-height: 812px;
  min-width: 375px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.div-wrapper-screen .rectangle-2 {
  background-color: #ffffff;
  height: 812px;
  left: 0;
  position: absolute;
  top: 0;
  width: 375px;
}

.div-wrapper-screen .img-wrapper {
  height: 16px;
  left: 15px;
  position: absolute;
  top: 58px;
  width: 16px;
}

.div-wrapper-screen .vector-6 {
  height: 99.77%;
  left: 14.16%;
  position: absolute;
  top: 0;
  width: 56.08%;
}

.div-wrapper-screen .element {
  align-items: flex-start;
  display: flex;
  height: 44px;
  left: -14px;
  min-width: 384px;
  position: absolute;
  top: 1px;
}

.div-wrapper-screen .iphone-x-status-bars-wrapper {
  display: flex;
  height: 44px;
  width: 384px;
}

.div-wrapper-screen .iphone-x-status-bars {
  background-image: url(../../static/img/rectangle.svg);
  background-size: 100% 100%;
  flex: 1;
  position: relative;
  width: 384.17px;
}

.div-wrapper-screen .battery {
  height: 23.48%;
  left: 89.73%;
  position: absolute;
  top: 40.53%;
  width: 6.35%;
}

.div-wrapper-screen .border {
  height: 100%;
  left: -2.05%;
  position: absolute;
  top: -4.84%;
  width: 88.13%;
}

.div-wrapper-screen .cap {
  height: 38.71%;
  left: 94.43%;
  position: absolute;
  top: 30.64%;
  width: 5.57%;
}

.div-wrapper-screen .capacity {
  height: 70.97%;
  left: 6.30%;
  position: absolute;
  top: 14.52%;
  width: 75.54%;
}

.div-wrapper-screen .wifi {
  height: 24.92%;
  left: 84.18%;
  position: absolute;
  top: 39.39%;
  width: 4.07%;
}

.div-wrapper-screen .cellular-connection {
  height: 24.24%;
  left: 78.31%;
  position: absolute;
  top: 40.15%;
  width: 4.53%;
}

.div-wrapper-screen .time-style {
  display: flex;
  height: 38.64%;
  left: 9.11%;
  position: absolute;
  top: 35.23%;
  width: 7.99%;
}

.div-wrapper-screen .text-wrapper-15 {
  color: #000000;
  flex: 1;
  font-family: "Inter", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  width: 28.69px;
}

.div-wrapper-screen .group {
  background-color: #ffffff80;
  border-radius: 17px;
  box-shadow: 0px 0px 22.1px #0000000f;
  height: 28px;
  left: 269px;
  position: absolute;
  top: 53px;
  width: 86px;
}

.div-wrapper-screen .vector-7 {
  height: 18px;
  left: 42px;
  position: absolute;
  top: 6px;
  width: 1px;
}

.div-wrapper-screen .ellipse {
  background-color: #000000;
  border-radius: 1.5px;
  height: 3px;
  left: 16px;
  position: absolute;
  top: 13px;
  width: 3px;
}

.div-wrapper-screen .ellipse-2 {
  background-color: #000000;
  border-radius: 1.5px;
  height: 3px;
  left: 30px;
  position: absolute;
  top: 13px;
  width: 3px;
}

.div-wrapper-screen .ellipse-3 {
  background-color: #000000;
  border-radius: 3px;
  height: 6px;
  left: 22px;
  position: absolute;
  top: 11px;
  width: 6px;
}

.div-wrapper-screen .ellipse-4 {
  background-color: #000000;
  border-radius: 3px;
  height: 6px;
  left: 61px;
  position: absolute;
  top: 11px;
  width: 6px;
}

.div-wrapper-screen .ellipse-5 {
  border: 1px solid;
  border-color: #000000;
  border-radius: 8px;
  height: 16px;
  left: 56px;
  position: absolute;
  top: 6px;
  width: 16px;
}

.div-wrapper-screen .home-indicator-wrapper {
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 34px;
  justify-content: flex-end;
  left: calc(50.00% - 188px);
  padding: 8px 120px;
  position: absolute;
  width: 375px;
}

.div-wrapper-screen .home-indicator {
  background-color: #000000;
  border-radius: 100px;
  height: 5px;
  position: relative;
  width: 134px;
}

.div-wrapper-screen .text-wrapper-16 {
  color: #666666;
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 15px;
  font-weight: 500;
  left: 39px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 56px;
}

.div-wrapper-screen .frame-21 {
  align-items: flex-start;
  background-color: #ffffff;
  bottom: 0;
  box-shadow: 0px -1px 0px #0000000a;
  display: flex;
  flex-direction: column;
  left: calc(50.00% - 188px);
  position: absolute;
  width: 375px;
}

.div-wrapper-screen .frame-wrapper {
  align-items: center;
  display: flex;
  gap: 6px;
  height: 49px;
  justify-content: center;
  padding: 0px 10px;
  position: relative;
  width: 375px;
}

.div-wrapper-screen .frame-22 {
  align-items: center;
  background-color: #333333;
  border-radius: 2px;
  display: flex;
  flex: 1;
  flex-grow: 1;
  gap: 4px;
  height: 42px;
  justify-content: center;
  padding: 8px 15px;
  position: relative;
}

.div-wrapper-screen .text-wrapper-17 {
  color: #ffffff;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.div-wrapper-screen .frame-23 {
  align-items: center;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 34px;
  justify-content: flex-end;
  padding: 8px 120px;
  position: relative;
  width: 375px;
}
</style>