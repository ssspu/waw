<template>
  <div class="screen" data-model-id="1:10883">
    <div class="rectangle" />
    <img class="rectangle-2" alt="Rectangle" src="/img/rectangle-186.png" />
    <div class="rectangle-3" />
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
            <div class="text-wrapper-17">9:41</div>
          </div>
        </div>
      </div>
    </div>
    <div class="group">
      <img class="vector-31" alt="Vector" src="/img/vector-13.svg" />
      <div class="ellipse-3" />
      <div class="ellipse-4" />
      <div class="ellipse-5" />
      <div class="ellipse-6" />
      <div class="ellipse-7" />
    </div>
    <FrameSubsection />
    <FrameWrapperSubsection />
    <img class="frame-25" alt="Frame" src="/img/frame-1881.svg" />
    <img class="subtract-2" alt="Subtract" src="/img/subtract-1.svg" />
    <DivWrapperSubsection />
    <DivSubsection />
  </div>
</template>

<script>
import DivSubsection from "./Screen/sections/DivSubsection.vue";
import DivWrapperSubsection from "./Screen/sections/DivWrapperSubsection.vue";
import FrameSubsection from "./Screen/sections/FrameSubsection.vue";
import FrameWrapperSubsection from "./Screen/sections/FrameWrapperSubsection.vue";

export default {
  name: "Screen",
  components: {
    DivSubsection,
    DivWrapperSubsection,
    FrameSubsection,
    FrameWrapperSubsection,
  },
};
</script>

<style>
.screen {
  background-color: #f2f2f2;
  min-height: 892px;
  min-width: 375px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.screen .rectangle {
  background-color: var(--variable-collection);
  height: 812px;
  left: 0;
  position: absolute;
  top: 0;
  width: 375px;
}

.screen .rectangle-2 {
  height: 300px;
  left: 0;
  position: absolute;
  top: 0;
  width: 375px;
}

.screen .rectangle-3 {
  background-color: #f3f3f3;
  border-radius: 8px 8px 0px 0px;
  height: 522px;
  left: calc(50.00% - 188px);
  position: absolute;
  top: 290px;
  width: 375px;
}

.screen .element {
  align-items: flex-start;
  display: flex;
  height: 44px;
  left: -14px;
  min-width: 384px;
  position: absolute;
  top: 1px;
}

.screen .iphone-x-status-bars-wrapper {
  display: flex;
  height: 44px;
  width: 384px;
}

.screen .iphone-x-status-bars {
  background-image: url(../../static/img/rectangle.svg);
  background-size: 100% 100%;
  flex: 1;
  position: relative;
  width: 384.17px;
}

.screen .battery {
  height: 23.48%;
  left: 89.73%;
  position: absolute;
  top: 40.53%;
  width: 6.35%;
}

.screen .border {
  height: 100%;
  left: -2.05%;
  position: absolute;
  top: -4.84%;
  width: 88.13%;
}

.screen .cap {
  height: 38.71%;
  left: 94.43%;
  position: absolute;
  top: 30.65%;
  width: 5.57%;
}

.screen .capacity {
  height: 70.97%;
  left: 6.30%;
  position: absolute;
  top: 14.52%;
  width: 75.54%;
}

.screen .wifi {
  height: 24.92%;
  left: 84.18%;
  position: absolute;
  top: 39.39%;
  width: 4.07%;
}

.screen .cellular-connection {
  height: 24.24%;
  left: 78.31%;
  position: absolute;
  top: 40.15%;
  width: 4.53%;
}

.screen .time-style {
  display: flex;
  height: 38.64%;
  left: 9.11%;
  position: absolute;
  top: 35.23%;
  width: 7.99%;
}

.screen .text-wrapper-17 {
  color: #333333;
  flex: 1;
  font-family: "Inter", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  width: 28.69px;
}

.screen .group {
  background-color: #ffffff80;
  border-radius: 17px;
  box-shadow: 0px 0px 22.1px #0000000f;
  height: 28px;
  left: 269px;
  position: absolute;
  top: 53px;
  width: 86px;
}

.screen .vector-31 {
  height: 18px;
  left: 42px;
  position: absolute;
  top: 6px;
  width: 1px;
}

.screen .ellipse-3 {
  background-color: #000000;
  border-radius: 1.5px;
  height: 3px;
  left: 16px;
  position: absolute;
  top: 13px;
  width: 3px;
}

.screen .ellipse-4 {
  background-color: #000000;
  border-radius: 1.5px;
  height: 3px;
  left: 30px;
  position: absolute;
  top: 13px;
  width: 3px;
}

.screen .ellipse-5 {
  background-color: #000000;
  border-radius: 3px;
  height: 6px;
  left: 22px;
  position: absolute;
  top: 11px;
  width: 6px;
}

.screen .ellipse-6 {
  background-color: #000000;
  border-radius: 3px;
  height: 6px;
  left: 61px;
  position: absolute;
  top: 11px;
  width: 6px;
}

.screen .ellipse-7 {
  border: 1px solid;
  border-color: #000000;
  border-radius: 8px;
  height: 16px;
  left: 56px;
  position: absolute;
  top: 6px;
  width: 16px;
}

.screen .frame-25 {
  height: 30px;
  left: 15px;
  position: absolute;
  top: 51px;
  width: 69px;
}

.screen .subtract-2 {
  height: 224px;
  left: calc(50.00% - 178px);
  position: absolute;
  top: 260px;
  width: 355px;
}
</style>