<template>
  <div class="frame-wrapper-subsection">
    <div class="frame-wrapper">
      <div class="div-wrapper">
        <div class="frame-2">
          <div class="frame-3">
            <div class="frame-4">
              <div class="frame-5">
                <img class="vector" alt="Vector" src="/img/vector.svg" />
                <img class="img" alt="Vector" src="/img/vector-1.svg" />
              </div>
              <div class="text-wrapper-3">服务</div>
            </div>
            <div class="frame-4">
              <div class="frame-5">
                <img class="vector-2" alt="Vector" src="/img/vector-2.svg" />
              </div>
              <div class="text-wrapper-3">消息</div>
            </div>
            <div class="frame-4">
              <div class="frame-5">
                <img class="vector-3" alt="Vector" src="/img/vector-3.svg" />
              </div>
              <div class="text-wrapper-4">我的</div>
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
export default {
  name: "FrameWrapperSubsection",
};
</script>

<style>
.frame-wrapper-subsection {
  align-items: flex-start;
  background-color: #ffffff;
  bottom: 0;
  box-shadow: 0px -1px 0px #0000000a;
  display: flex;
  flex-direction: column;
  left: calc(50.00% - 186px);
  position: absolute;
  width: 375px;
}

.frame-wrapper-subsection .frame-wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 49px;
  justify-content: flex-end;
  padding: 0px 15px;
  position: relative;
  width: 375px;
}

.frame-wrapper-subsection .div-wrapper {
  align-items: flex-end;
  align-self: stretch;
  display: flex;
  height: 49px;
  justify-content: space-around;
  position: relative;
  width: 100%;
}

.frame-wrapper-subsection .frame-2 {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 49px;
  justify-content: flex-end;
  margin-left: -15.00px;
  margin-right: -15.00px;
  padding: 0px 15px;
  position: relative;
  width: 375px;
}

.frame-wrapper-subsection .frame-3 {
  align-items: flex-end;
  align-self: stretch;
  display: flex;
  height: 49px;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.frame-wrapper-subsection .frame-4 {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 3px;
  justify-content: flex-end;
  position: relative;
  width: 44px;
}

.frame-wrapper-subsection .frame-5 {
  aspect-ratio: 1;
  height: 25px;
  position: relative;
  width: 25px;
}

.frame-wrapper-subsection .vector {
  height: 80.00%;
  left: 14.00%;
  position: absolute;
  top: 10.56%;
  width: 72.00%;
}

.frame-wrapper-subsection .img {
  height: 24.00%;
  left: 46.00%;
  position: absolute;
  top: 54.56%;
  width: 8.00%;
}

.frame-wrapper-subsection .text-wrapper-3 {
  color: #333333;
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  text-align: center;
  width: fit-content;
}

.frame-wrapper-subsection .vector-2 {
  height: 81.25%;
  left: 9.37%;
  position: absolute;
  top: 9.38%;
  width: 81.25%;
}

.frame-wrapper-subsection .vector-3 {
  height: 80.00%;
  left: 10.00%;
  position: absolute;
  top: 12.00%;
  width: 80.00%;
}

.frame-wrapper-subsection .text-wrapper-4 {
  color: #333333;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  text-align: center;
  width: fit-content;
}

.frame-wrapper-subsection .home-indicator-wrapper {
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

.frame-wrapper-subsection .home-indicator {
  background-color: #000000;
  border-radius: 100px;
  height: 5px;
  position: relative;
  width: 134px;
}
</style>