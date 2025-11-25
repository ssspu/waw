<template>
  <div class="div-wrapper" data-model-id="32:4790">
    <div class="rectangle" />

    <div class="frame">
      <img class="vector" alt="Vector" src="/img/vector.svg" />
    </div>

    <div class="element">
      <div class="iphone-x-status-bars-wrapper">
        <div class="iphone-x-status-bars">
          <div class="battery">
            <img class="border" alt="Border" src="/img/border.svg" />

            <img class="cap" alt="Cap" src="/img/cap.svg" />

            <img
              class="capacity"
              alt="Capacity"
              src="/img/capacity.svg"
            />
          </div>

          <img class="wifi" alt="Wifi" src="/img/wifi.svg" />

          <img
            class="cellular-connection"
            alt="Cellular connection"
            src="/img/cellular-connection.svg"
          />

          <div class="time-style">
            <div class="text-wrapper">9:41</div>
          </div>
        </div>
      </div>
    </div>

    <div class="group">
      <img class="img" alt="Vector" src="/img/vector-13.svg" />

      <div class="ellipse" />

      <div class="div" />

      <div class="ellipse-2" />

      <div class="ellipse-3" />

      <div class="ellipse-4" />
    </div>

    <div class="frame-wrapper">
      <div class="frame-2">
        <div class="frame-3">
          <div class="frame-4">
            <div class="frame-5">
              <div class="text-wrapper-2">总资产(元)</div>
            </div>

            <div class="frame-6">
              <div class="text-wrapper-3">资金帐户可用总额</div>
            </div>
          </div>

          <div class="vector-wrapper">
            <img class="vector-2" alt="Vector" src="/img/vector-4.svg" />
          </div>
        </div>

        <div class="text-wrapper-4">6666.66</div>
      </div>
    </div>

    <div class="frame-7">
      <div class="frame-8">
        <div class="frame-9">
          <div class="text-wrapper-5">余额(元)</div>

          <div class="text-wrapper-6">1200.00</div>
        </div>

        <div class="frame-10">
          <div class="frame-11">
            <div class="text-wrapper-5">平台奖励</div>

            <div class="text-wrapper-6">2806.00</div>
          </div>

          <div class="frame-11">
            <div class="text-wrapper-5">推广佣金</div>

            <div class="text-wrapper-6">1200.00</div>
          </div>

          <div class="frame-11">
            <div class="text-wrapper-5">美豆</div>

            <div class="text-wrapper-6">1000.00</div>
          </div>
        </div>
      </div>

      <div class="frame-12">
        <div class="text-wrapper-7">结算信息</div>

        <div class="frame-13">
          <div class="frame-10">
            <div class="frame-14">
              <div class="frame-15">
                <img
                  class="vector-3"
                  alt="Vector"
                  src="/img/vector-2.svg"
                />

                <img
                  class="vector-4"
                  alt="Vector"
                  src="/img/vector-3.svg"
                />
              </div>

              <div class="text-wrapper-8">银行卡</div>
            </div>

            <div class="frame-16">
              <div class="text-wrapper-9">已绑定</div>

              <div class="vector-wrapper">
                <img
                  class="vector-2"
                  alt="Vector"
                  src="/img/vector-4.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    <div class="home-indicator-wrapper">
      <div class="home-indicator" />
    </div>

    <div class="frame-17">
      <div class="frame-18">
        <div class="home-indicator" />
      </div>
    </div>

    <div class="text-wrapper-10">资产收入</div>
  </div>
</template>

<script>
export default {
  name: "DivWrapper",
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

.div-wrapper .frame {
  height: 16px;
  left: 15px;
  position: absolute;
  top: 58px;
  width: 16px;
}

.div-wrapper .vector {
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
  left: 6.30%;
  position: absolute;
  top: 14.52%;
  width: 75.54%;
}

.div-wrapper .wifi {
  height: 24.92%;
  left: 84.18%;
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

.div-wrapper .text-wrapper {
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

.div-wrapper .img {
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

.div-wrapper .div {
  background-color: #000000;
  border-radius: 1.5px;
  height: 3px;
  left: 30px;
  position: absolute;
  top: 13px;
  width: 3px;
}

.div-wrapper .ellipse-2 {
  background-color: #000000;
  border-radius: 3px;
  height: 6px;
  left: 22px;
  position: absolute;
  top: 11px;
  width: 6px;
}

.div-wrapper .ellipse-3 {
  background-color: #000000;
  border-radius: 3px;
  height: 6px;
  left: 61px;
  position: absolute;
  top: 11px;
  width: 6px;
}

.div-wrapper .ellipse-4 {
  border: 1px solid;
  border-color: #000000;
  border-radius: 8px;
  height: 16px;
  left: 56px;
  position: absolute;
  top: 6px;
  width: 16px;
}

.div-wrapper .frame-wrapper {
  align-items: flex-end;
  background: linear-gradient(
    309deg,
    rgba(135, 134, 145, 1) 0%,
    rgba(59, 54, 83, 1) 100%
  );
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 21px;
  height: 120px;
  left: calc(50.00% - 172px);
  padding: 15px 16px;
  position: absolute;
  top: 97px;
  width: 345px;
}

.div-wrapper .frame-2 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 9px;
  position: relative;
  width: 100%;
}

.div-wrapper .frame-3 {
  align-items: center;
  align-self: stretch;
  display: flex;
  height: 41px;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.div-wrapper .frame-4 {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 2px;
  position: relative;
}

.div-wrapper .frame-5 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 20px;
  position: relative;
  width: 100%;
}

.div-wrapper .text-wrapper-2 {
  color: #ffffff;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
  width: fit-content;
}

.div-wrapper .frame-6 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 152px;
  justify-content: space-around;
  position: relative;
  width: 100%;
}

.div-wrapper .text-wrapper-3 {
  color: #ffffff78;
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  width: fit-content;
}

.div-wrapper .vector-wrapper {
  height: 14px;
  position: relative;
  transform: rotate(-90.00deg);
  width: 14px;
}

.div-wrapper .vector-2 {
  height: 50.93%;
  left: 25.72%;
  position: absolute;
  top: 5.23%;
  transform: rotate(90.00deg);
  width: 83.33%;
}

.div-wrapper .text-wrapper-4 {
  align-self: stretch;
  color: #ffffff;
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 26px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
}

.div-wrapper .frame-7 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 6px;
  left: calc(50.00% - 182px);
  position: absolute;
  top: 207px;
  width: 363px;
}

.div-wrapper .frame-8 {
  align-items: flex-start;
  align-self: stretch;
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  padding: 15px 20px;
  position: relative;
  width: 100%;
}

.div-wrapper .frame-9 {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  position: relative;
}

.div-wrapper .text-wrapper-5 {
  color: var(--variable-collection-a7);
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
  width: fit-content;
}

.div-wrapper .text-wrapper-6 {
  color: #333333;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  text-align: center;
  width: fit-content;
}

.div-wrapper .frame-10 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.div-wrapper .frame-11 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  position: relative;
  width: 73px;
}

.div-wrapper .frame-12 {
  align-items: flex-start;
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 15px 10px;
  position: relative;
  width: 363px;
}

.div-wrapper .text-wrapper-7 {
  color: #000000;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
  width: fit-content;
}

.div-wrapper .frame-13 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 15px;
  position: relative;
  width: 100%;
}

.div-wrapper .frame-14 {
  align-items: center;
  display: flex;
  gap: 4px;
  position: relative;
  width: 169.5px;
}

.div-wrapper .frame-15 {
  aspect-ratio: 1;
  height: 20px;
  position: relative;
  width: 20px;
}

.div-wrapper .vector-3 {
  height: 69.33%;
  left: 10.55%;
  position: absolute;
  top: 16.72%;
  width: 78.85%;
}

.div-wrapper .vector-4 {
  height: 6.67%;
  left: 51.47%;
  position: absolute;
  top: 61.67%;
  width: 23.22%;
}

.div-wrapper .text-wrapper-8 {
  color: #333333;
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

.div-wrapper .frame-16 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 6px;
  position: relative;
}

.div-wrapper .text-wrapper-9 {
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

.div-wrapper .frame-17 {
  align-items: flex-start;
  bottom: 0;
  box-shadow: 0px -1px 0px #0000000a;
  display: flex;
  flex-direction: column;
  left: calc(50.00% - 188px);
  position: absolute;
  width: 375px;
}

.div-wrapper .frame-18 {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 34px;
  justify-content: flex-end;
  padding: 8px 120px;
  position: relative;
  width: 375px;
}

.div-wrapper .text-wrapper-10 {
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
</style>