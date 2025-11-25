<template>
  <div class="frame-subsection">
    <div class="frame">
      <div class="text-wrapper">李天天</div>

      <div class="div-wrapper">
        <div class="div">美发师</div>
      </div>

      <div class="vector-wrapper">
        <img class="vector" alt="Vector" src="/img/vector-1.svg" />
      </div>
    </div>

    <div class="frame-2">
      <img
        class="rectangle"
        alt="Rectangle"
        src="/img/rectangle-169.png"
      />

      <div class="frame-3">
        <div class="frame-4">
          <div class="text-wrapper-2">欧莱雅植物洗护套装一套</div>

          <div class="text-wrapper-3">洗护</div>

          <div class="text-wrapper-3">1小时</div>
        </div>

        <div class="frame-5">
          <div class="frame-6">
            <div class="text-wrapper-4">¥</div>

            <div class="text-wrapper-5">799</div>
          </div>

          <div class="text-wrapper-3">*1</div>
        </div>
      </div>
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
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  left: calc(50.00% - 182px);
  padding: 12px 10px;
  position: absolute;
  top: 89px;
  width: 363px;
}

.frame-subsection .frame {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 4px;
  position: relative;
  width: 100%;
}

.frame-subsection .text-wrapper {
  color: #000000;
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  width: fit-content;
}

.frame-subsection .div-wrapper {
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 2px;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  justify-content: center;
  padding: 1px 4px;
  position: relative;
}

.frame-subsection .div {
  color: #666666;
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  width: fit-content;
}

.frame-subsection .vector-wrapper {
  height: 14px;
  position: relative;
  transform: rotate(-90.00deg);
  width: 14px;
}

.frame-subsection .vector {
  height: 50.93%;
  left: 25.72%;
  position: absolute;
  top: 5.23%;
  transform: rotate(90.00deg);
  width: 83.33%;
}

.frame-subsection .frame-2 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
  justify-content: center;
  position: relative;
  width: 100%;
}

.frame-subsection .rectangle {
  aspect-ratio: 1;
  height: 66px;
  object-fit: cover;
  position: relative;
  width: 66px;
}

.frame-subsection .frame-3 {
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-grow: 1;
  justify-content: space-between;
  position: relative;
}

.frame-subsection .frame-4 {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 3px;
  position: relative;
}

.frame-subsection .text-wrapper-2 {
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

.frame-subsection .text-wrapper-3 {
  color: var(--variable-collection-a7a7a7);
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.frame-subsection .frame-5 {
  align-items: flex-end;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.frame-subsection .frame-6 {
  align-items: flex-end;
  display: inline-flex;
  flex: 0 0 auto;
  position: relative;
}

.frame-subsection .text-wrapper-4 {
  color: #333333;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.frame-subsection .text-wrapper-5 {
  color: #333333;
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  width: fit-content;
}
</style>