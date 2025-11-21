<template>
  <div :class="['frame', className]">
    <div class="div">
      <div class="text-wrapper">{{ text }}</div>
      <div class="div-2">
        <div class="yangqixiaonv">{{ text1 }}</div>
        <div class="vector-wrapper">
          <img class="vector" alt="Vector" src="/img/vector.svg" />
        </div>
      </div>
    </div>
    <img class="img" alt="Vector" src="/img/vector-16.svg" />
  </div>
</template>

<script>
export default {
  name: "Frame",
  props: {
    text: {
      type: String,
      default: "昵称",
    },
    text1: {
      type: String,
      default: "yangqixiaonv",
    },
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
  left: 15px;
  position: relative;
  top: 15px;
}

.frame .div {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.frame .text-wrapper {
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

.frame .div-2 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  position: relative;
}

.frame .yangqixiaonv {
  color: #666666;
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

.frame .vector-wrapper {
  height: 14px;
  position: relative;
  transform: rotate(-90.00deg);
  width: 14px;
}

.frame .vector {
  height: 50.93%;
  left: 25.72%;
  position: absolute;
  top: 5.23%;
  transform: rotate(90.00deg);
  width: 83.33%;
}

.frame .img {
  align-self: stretch;
  height: 1px;
  margin-bottom: -0.50px;
  object-fit: cover;
  position: relative;
  width: 100%;
}
</style>