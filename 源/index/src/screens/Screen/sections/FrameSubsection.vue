<template>
  <div class="frame-subsection">
    <div class="frame">
      <div class="div">
        <div class="text-wrapper">VIP会员专享</div>
        <img class="subtract" alt="Subtract" src="/img/subtract.svg" />
      </div>
      <div class="text-wrapper-2">超值补贴优惠专享</div>
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
  align-items: flex-end;
  background: linear-gradient(
    180deg,
    rgba(208, 193, 167, 1) 0%,
    rgba(136, 125, 107, 1) 100%
  );
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: 67px;
  left: 224px;
  padding: 5px 6px;
  position: absolute;
  top: 263px;
  width: 137px;
}

.frame-subsection .frame {
  align-items: flex-start;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 88px;
}

.frame-subsection .div {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 4px;
  justify-content: flex-end;
  position: relative;
}

.frame-subsection .text-wrapper {
  color: #ffffff;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
  width: fit-content;
}

.frame-subsection .subtract {
  height: 16px;
  position: relative;
  width: 16px;
}

.frame-subsection .text-wrapper-2 {
  color: #ffffff99;
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}
</style>