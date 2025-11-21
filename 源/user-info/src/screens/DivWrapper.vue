<template>
  <div class="div-wrapper" data-model-id="15:4883">
    <div class="rectangle" />
    <div class="text-wrapper-2">个人信息</div>
    <div class="img-wrapper">
      <img class="vector-2" alt="Vector" src="/img/vector-1.svg" />
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
            <div class="text-wrapper-3">9:41</div>
          </div>
        </div>
      </div>
    </div>
    <div class="group">
      <img class="vector-3" alt="Vector" src="/img/vector-13.svg" />
      <div class="ellipse" />
      <div class="ellipse-2" />
      <div class="ellipse-3" />
      <div class="ellipse-4" />
      <div class="ellipse-5" />
    </div>
    <div class="frame-2">
      <div class="frame-wrapper">
        <div class="frame-3">
          <div class="text-wrapper-4">头像</div>
          <div class="frame-4">
            <div class="rectangle-2" />
            <div class="frame-5">
              <img class="vector-4" alt="Vector" src="/img/vector.svg" />
            </div>
          </div>
        </div>
      </div>
      <div class="frame-6">
        <Frame class="frame-2212" />
        <Frame class="frame-2212" text="性别" text1="女" />
        <div class="frame-7">
          <div class="frame-3">
            <div class="text-wrapper-4">二维码名片</div>
            <div class="frame-8">
              <div class="frame-9">
                <img class="vector-5" alt="Vector" src="/img/vector-5.svg" />
              </div>
              <div class="frame-5">
                <img class="vector-4" alt="Vector" src="/img/vector.svg" />
              </div>
            </div>
          </div>
          <img class="vector-6" alt="Vector" src="/img/vector-16.svg" />
        </div>
        <Frame class="frame-2212" text="职业" text1="美发师" />
        <Frame class="frame-2212" text="地区" text1="四川-成都" />
        <div class="frame-7">
          <div class="frame-3">
            <div class="text-wrapper-5">简介</div>
            <div class="frame-4">
              <div class="yangqixiaonv-2">输入1-30字简介</div>
              <div class="frame-5">
                <img class="vector-4" alt="Vector" src="/img/vector.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-indicator-wrapper">
      <div class="home-indicator" />
    </div>
  </div>
</template>

<script>
import Frame from "../components/Frame.vue";

export default {
  name: "DivWrapper",
  components: {
    Frame
  }
};
</script>

<style>
.div-wrapper {
  background-color: #f2f2f2;
  min-height: 812px;
  min-width: 375px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.div-wrapper .rectangle {
  background-color: #ffffff;
  height: 88px;
  left: 0;
  position: absolute;
  top: 0;
  width: 375px;
}

.div-wrapper .text-wrapper-2 {
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

.div-wrapper .img-wrapper {
  height: 16px;
  left: 15px;
  position: absolute;
  top: 58px;
  width: 16px;
}

.div-wrapper .vector-2 {
  height: 99.77%;
  left: 14.16%;
  position: absolute;
  top: 0;
  width: 56.08%;
}

.div-wrapper .element {
  align-items: flex-start;
  display: flex;
  height: 44px;
  left: -14px;
  min-width: 384px;
  position: absolute;
  top: 1px;
}

.div-wrapper .iphone-x-status-bars-wrapper {
  display: flex;
  height: 44px;
  width: 384px;
}

.div-wrapper .iphone-x-status-bars {
  background-image: url(../../static/img/rectangle.svg);
  background-size: 100% 100%;
  flex: 1;
  position: relative;
  width: 384.17px;
}

.div-wrapper .battery {
  height: 23.48%;
  left: 89.73%;
  position: absolute;
  top: 40.53%;
  width: 6.35%;
}

.div-wrapper .border {
  height: 100%;
  left: -2.05%;
  position: absolute;
  top: -4.84%;
  width: 88.13%;
}

.div-wrapper .cap {
  height: 38.71%;
  left: 94.43%;
  position: absolute;
  top: 30.64%;
  width: 5.57%;
}

.div-wrapper .capacity {
  height: 70.97%;
  left: 6.29%;
  position: absolute;
  top: 14.52%;
  width: 75.54%;
}

.div-wrapper .wifi {
  height: 24.92%;
  left: 84.19%;
  position: absolute;
  top: 39.39%;
  width: 4.07%;
}

.div-wrapper .cellular-connection {
  height: 24.24%;
  left: 78.31%;
  position: absolute;
  top: 40.15%;
  width: 4.53%;
}

.div-wrapper .time-style {
  display: flex;
  height: 38.64%;
  left: 9.11%;
  position: absolute;
  top: 35.23%;
  width: 7.99%;
}

.div-wrapper .text-wrapper-3 {
  color: #000000;
  flex: 1;
  font-family: "Inter", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  width: 28.69px;
}

.div-wrapper .group {
  background-color: #ffffff80;
  border-radius: 17px;
  box-shadow: 0px 0px 22.1px #0000000f;
  height: 28px;
  left: 269px;
  position: absolute;
  top: 53px;
  width: 86px;
}

.div-wrapper .vector-3 {
  height: 18px;
  left: 42px;
  position: absolute;
  top: 6px;
  width: 1px;
}

.div-wrapper .ellipse {
  background-color: #000000;
  border-radius: 1.5px;
  height: 3px;
  left: 16px;
  position: absolute;
  top: 13px;
  width: 3px;
}

.div-wrapper .ellipse-2 {
  background-color: #000000;
  border-radius: 1.5px;
  height: 3px;
  left: 30px;
  position: absolute;
  top: 13px;
  width: 3px;
}

.div-wrapper .ellipse-3 {
  background-color: #000000;
  border-radius: 3px;
  height: 6px;
  left: 22px;
  position: absolute;
  top: 11px;
  width: 6px;
}

.div-wrapper .ellipse-4 {
  background-color: #000000;
  border-radius: 3px;
  height: 6px;
  left: 61px;
  position: absolute;
  top: 11px;
  width: 6px;
}

.div-wrapper .ellipse-5 {
  border: 1px solid;
  border-color: #000000;
  border-radius: 8px;
  height: 16px;
  left: 56px;
  position: absolute;
  top: 6px;
  width: 16px;
}

.div-wrapper .frame-2 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 6px;
  left: 6px;
  position: absolute;
  top: 94px;
  width: 363px;
}

.div-wrapper .frame-wrapper {
  align-items: flex-start;
  align-self: stretch;
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  padding: 15px;
  position: relative;
  width: 100%;
}

.div-wrapper .frame-3 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.div-wrapper .text-wrapper-4 {
  color: #000000;
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  text-align: center;
  width: fit-content;
}

.div-wrapper .frame-4 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  position: relative;
}

.div-wrapper .rectangle-2 {
  aspect-ratio: 1;
  background-color: #d9d9d9;
  border-radius: 29px;
  height: 50px;
  position: relative;
  width: 50px;
}

.div-wrapper .frame-5 {
  height: 14px;
  position: relative;
  transform: rotate(-90.00deg);
  width: 14px;
}

.div-wrapper .vector-4 {
  height: 50.93%;
  left: 25.72%;
  position: absolute;
  top: 5.23%;
  transform: rotate(90.00deg);
  width: 83.33%;
}

.div-wrapper .frame-6 {
  align-items: flex-start;
  align-self: stretch;
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  padding: 15px;
  position: relative;
  width: 100%;
}

.div-wrapper .frame-2212 {
  align-self: stretch !important;
  flex: 0 0 auto !important;
  left: unset !important;
  top: unset !important;
  width: 100% !important;
}

.div-wrapper .frame-7 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 15px;
  position: relative;
  width: 100%;
}

.div-wrapper .frame-8 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 4px;
  position: relative;
}

.div-wrapper .frame-9 {
  aspect-ratio: 1;
  height: 22px;
  position: relative;
  width: 22px;
}

.div-wrapper .vector-5 {
  height: 68.74%;
  left: 15.63%;
  position: absolute;
  top: 15.63%;
  width: 68.74%;
}

.div-wrapper .vector-6 {
  align-self: stretch;
  height: 1px;
  margin-bottom: -0.50px;
  object-fit: cover;
  position: relative;
  width: 100%;
}

.div-wrapper .text-wrapper-5 {
  color: #000000;
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
  width: fit-content;
}

.div-wrapper .yangqixiaonv-2 {
  color: var(--variable-collection-a7a7a7);
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
  width: fit-content;
}

.div-wrapper .home-indicator-wrapper {
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

.div-wrapper .home-indicator {
  background-color: #000000;
  border-radius: 100px;
  height: 5px;
  position: relative;
  width: 134px;
}
</style>