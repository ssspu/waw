<template>
  <div class="div-wrapper-subsection">
    <div class="frame-12">
      <div class="frame-13">
        <div class="text-wrapper-14">取消订单</div>
      </div>
      <div class="frame-14">
        <div class="text-wrapper-15">立即付款</div>
      </div>
    </div>
    <div class="home-indicator-wrapper">
      <div class="home-indicator" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DivWrapperSubsection",
};
</script>

<style>
.div-wrapper-subsection {
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

.div-wrapper-subsection .frame-12 {
  align-items: center;
  display: flex;
  gap: 6px;
  height: 49px;
  justify-content: center;
  padding: 0px 10px;
  position: relative;
  width: 375px;
}

.div-wrapper-subsection .frame-13 {
  align-items: center;
  border: 1px solid;
  border-color: var(--variable-collection);
  border-radius: 4px;
  display: flex;
  flex: 1;
  flex-grow: 1;
  gap: 4px;
  height: 42px;
  justify-content: center;
  padding: 8px 15px;
  position: relative;
}

.div-wrapper-subsection .text-wrapper-14 {
  color: #666666;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.div-wrapper-subsection .frame-14 {
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

.div-wrapper-subsection .text-wrapper-15 {
  color: #ffa77b;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.div-wrapper-subsection .home-indicator-wrapper {
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

.div-wrapper-subsection .home-indicator {
  background-color: #000000;
  border-radius: 100px;
  height: 5px;
  position: relative;
  width: 134px;
}
</style>