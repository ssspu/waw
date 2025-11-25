<template>
  <div :class="['frame', className]">
    <div class="div">
      <img
        class="rectangle"
        alt="Rectangle"
        src="/img/rectangle-169.png"
      />
      <div class="div-2">
        <div class="div-3">
          <div class="text-wrapper">成都美发沙龙</div>
          <div class="text-wrapper-2">洗剪吹</div>
          <div class="text-wrapper-2">今天 10:50</div>
        </div>
        <div class="text-wrapper-3">+100</div>
      </div>
    </div>
    <img class="vector" alt="Vector" src="/img/vector-20.svg" />
  </div>
</template>

<script>
export default {
  name: "Frame",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.frame {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 15px;
  left: 10px;
  position: relative;
  top: 15px;
}

.frame .div {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
  justify-content: center;
  position: relative;
  width: 100%;
}

.frame .rectangle {
  aspect-ratio: 1;
  height: 66px;
  position: relative;
  width: 66px;
}

.frame .div-2 {
  align-items: center;
  display: flex;
  flex: 1;
  flex-grow: 1;
  justify-content: space-between;
  position: relative;
}

.frame .div-3 {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 3px;
  position: relative;
}

.frame .text-wrapper {
  color: #666666;
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  width: fit-content;
}

.frame .text-wrapper-2 {
  color: var(--variable-collection-a7a7a7);
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.frame .text-wrapper-3 {
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

.frame .vector {
  align-self: stretch;
  height: 1px;
  margin-bottom: -0.50px;
  object-fit: cover;
  position: relative;
  width: 100%;
}
</style>