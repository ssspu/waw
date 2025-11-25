<template>
  <div class="frame-subsection">
    <div class="frame">
      <div class="text-wrapper">您有待付款订单</div>
      <div class="div">00:30:00</div>
    </div>
    <div class="frame-2">
      <div class="text-wrapper-2">请在30分钟内付款，超时订单将自动关闭</div>
      <div class="text-wrapper-2">付款倒计时</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FrameSubsection",
};
</script>

<style>
.frame-subsection {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 6px;
  left: 15px;
  position: absolute;
  top: 98px;
  width: 345px;
}

.frame-subsection .frame {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  position: relative;
  width: 345px;
}

.frame-subsection .text-wrapper {
  color: #000000;
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

.frame-subsection .div {
  color: #333333;
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
  width: fit-content;
}

.frame-subsection .frame-2 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.frame-subsection .text-wrapper-2 {
  color: #a6a6a6;
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  width: fit-content;
}
</style>