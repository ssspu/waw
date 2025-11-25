<template>
  <div class="screen" data-model-id="1:3382">
    <div class="rectangle-2" />
    <div class="text-wrapper-7">我的收藏</div>
    <div class="vector-wrapper">
      <img class="vector" alt="Vector" src="/img/vector.svg" />
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
            <div class="text-wrapper-8">9:41</div>
          </div>
        </div>
      </div>
    </div>
    <div class="group">
      <img class="img" alt="Vector" src="/img/vector-13.svg" />
      <div class="ellipse" />
      <div class="ellipse-2" />
      <div class="ellipse-3" />
      <div class="ellipse-4" />
      <div class="ellipse-5" />
    </div>
    <div class="home-indicator-wrapper">
      <div class="home-indicator" />
    </div>
    <div class="frame-2">
      <Frame class="frame-1852" />
      <Frame class="frame-1852" />
      <Frame class="frame-1852" />
      <Frame class="frame-1852" />
    </div>
  </div>
</template>

<script>
import Frame from "../components/Frame.vue";

export default {
  name: "Screen",
  components: {
    Frame
  }
};
</script>

<style>
.screen {
  background-color: #f2f2f2;
  min-height: 812px;
  min-width: 375px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.screen .rectangle-2 {
  background-color: #ffffff;
  height: 88px;
  left: 0;
  position: absolute;
  top: 0;
  width: 375px;
}

.screen .text-wrapper-7 {
  color: #333333;
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 16px;
  font-weight: 500;
  left: calc(50.00% - 32px);
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 55px;
}

.screen .vector-wrapper {
  height: 16px;
  left: 15px;
  position: absolute;
  top: 58px;
  width: 16px;
}

.screen .vector {
  height: 99.77%;
  left: 14.16%;
  position: absolute;
  top: 0;
  width: 56.08%;
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
  top: 30.64%;
  width: 5.57%;
}

.screen .capacity {
  height: 70.97%;
  left: 6.29%;
  position: absolute;
  top: 14.52%;
  width: 75.54%;
}

.screen .wifi {
  height: 24.92%;
  left: 84.19%;
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

.screen .text-wrapper-8 {
  color: #000000;
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

.screen .img {
  height: 18px;
  left: 42px;
  position: absolute;
  top: 6px;
  width: 1px;
}

.screen .ellipse {
  background-color: #000000;
  border-radius: 1.5px;
  height: 3px;
  left: 16px;
  position: absolute;
  top: 13px;
  width: 3px;
}

.screen .ellipse-2 {
  background-color: #000000;
  border-radius: 1.5px;
  height: 3px;
  left: 30px;
  position: absolute;
  top: 13px;
  width: 3px;
}

.screen .ellipse-3 {
  background-color: #000000;
  border-radius: 3px;
  height: 6px;
  left: 22px;
  position: absolute;
  top: 11px;
  width: 6px;
}

.screen .ellipse-4 {
  background-color: #000000;
  border-radius: 3px;
  height: 6px;
  left: 61px;
  position: absolute;
  top: 11px;
  width: 6px;
}

.screen .ellipse-5 {
  border: 1px solid;
  border-color: #000000;
  border-radius: 8px;
  height: 16px;
  left: 56px;
  position: absolute;
  top: 6px;
  width: 16px;
}

.screen .home-indicator-wrapper {
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

.screen .home-indicator {
  background-color: #000000;
  border-radius: 100px;
  height: 5px;
  position: relative;
  width: 134px;
}

.screen .frame-2 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 8px;
  left: 6px;
  position: absolute;
  top: 96px;
  width: 363px;
}

.screen .frame-1852 {
  align-self: stretch !important;
  flex: 0 0 auto !important;
  width: 100% !important;
}
</style>