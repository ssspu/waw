<template>
  <div :class="['frame', className]">
    <img class="rectangle" alt="Rectangle" src="/img/rectangle-169.png" />
    <div class="div">
      <div class="div-2">
        <div class="text-wrapper">洗吹</div>
        <div class="div-wrapper">
          <div class="text-wrapper-2">水洗+按摩+造型</div>
        </div>
        <div class="div-3">
          <div class="text-wrapper-2">预计时间:</div>
          <div class="text-wrapper-2">1小时</div>
        </div>
        <div class="text-wrapper-3">距离1.2km</div>
      </div>
      <div class="div-4">
        <div class="text-wrapper-4">取消收藏</div>
        <div class="frame-wrapper">
          <div class="div-5">
            <div class="text-wrapper-5">¥</div>
            <div class="text-wrapper-6">799</div>
          </div>
        </div>
      </div>
    </div>
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
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  gap: 8px;
  padding: 10px;
  position: relative;
  width: 363px;
}

.frame .rectangle {
  aspect-ratio: 1;
  height: 80px;
  object-fit: cover;
  position: relative;
  width: 80px;
}

.frame .div {
  align-items: flex-end;
  display: flex;
  flex: 1;
  flex-grow: 1;
  justify-content: space-between;
  position: relative;
}

.frame .div-2 {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 3px;
  position: relative;
}

.frame .text-wrapper {
  color: #000000;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  width: fit-content;
}

.frame .div-wrapper {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  position: relative;
}

.frame .text-wrapper-2 {
  color: var(--variable-collection-a7a7a7);
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  width: fit-content;
}

.frame .div-3 {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 3px;
  position: relative;
}

.frame .text-wrapper-3 {
  color: var(--variable-collection-a7a7a7);
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.frame .div-4 {
  align-items: flex-end;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 121px;
}

.frame .text-wrapper-4 {
  color: var(--variable-collection-a7a7a7);
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  width: fit-content;
}

.frame .frame-wrapper {
  align-items: flex-end;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  position: relative;
  width: 100%;
}

.frame .div-5 {
  align-items: flex-end;
  display: inline-flex;
  flex: 0 0 auto;
  position: relative;
}

.frame .text-wrapper-5 {
  color: #333333;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.frame .text-wrapper-6 {
  color: #333333;
  font-family: "FZChaoCuHei-M10T-Regular", Helvetica;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}
</style>