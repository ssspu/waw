<template>
  <div class="div-subsection">
    <div class="frame-19">
      <div class="text-wrapper-13">服务热情</div>
    </div>

    <div class="frame-20">
      <div class="text-wrapper-14">环境优雅</div>
    </div>

    <div class="frame-20">
      <div class="text-wrapper-14">无隐形消费</div>
    </div>

    <div class="frame-20">
      <div class="text-wrapper-14">非常好</div>
    </div>

    <div class="frame-20">
      <div class="text-wrapper-14">环境优雅</div>
    </div>

    <div class="frame-20">
      <div class="text-wrapper-14">无隐形消费</div>
    </div>

    <div class="frame-20">
      <div class="text-wrapper-14">非常好</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DivSubsection",
};
</script>

<style>
.div-subsection {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 7px 7px;
  left: 15px;
  position: absolute;
  top: 559px;
  width: 344px;
}

.div-subsection .frame-19 {
  align-items: center;
  background-color: #333333;
  border-radius: 2px;
  display: flex;
  gap: 4px;
  height: 34px;
  justify-content: center;
  padding: 8px 20px;
  position: relative;
  width: 110px;
}

.div-subsection .text-wrapper-13 {
  color: #ffffff;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.div-subsection .frame-20 {
  align-items: center;
  background-color: var(--variable-collection);
  display: flex;
  gap: 10px;
  height: 34px;
  justify-content: center;
  padding: 8px;
  position: relative;
  width: 110px;
}

.div-subsection .text-wrapper-14 {
  color: #666666;
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}
</style>