<template>
  <div class="div-wrapper-subsection">
    <div class="frame-6">
      <div class="frame-7">
        <img class="ellipse-2" alt="Ellipse" src="/img/ellipse-77.svg" />
        <div class="frame-8">
          <div class="frame-9">
            <div class="text-wrapper-5">Javen</div>
            <div class="frame-10">
              <div class="vector-wrapper">
                <img class="vector-4" alt="Vector" src="/img/vector-4.svg" />
              </div>
            </div>
          </div>
          <div class="text-wrapper-6">金牌会员</div>
        </div>
      </div>
      <div class="text-wrapper-7">来自星星的盗梦者，一切都要回答火星</div>
    </div>
    <div class="frame-11">
      <div class="frame-12">
        <div class="frame-13">
          <div class="text-wrapper-8">1244</div>
          <div class="text-wrapper-9">关注</div>
        </div>
        <div class="frame-13">
          <div class="text-wrapper-8">234</div>
          <div class="text-wrapper-9">浏览</div>
        </div>
        <div class="frame-13">
          <div class="text-wrapper-8">1245</div>
          <div class="text-wrapper-9">收藏</div>
        </div>
      </div>
    </div>
    <div class="frame-14">
      <div class="frame-15">
        <div class="frame-16">
          <div class="frame-17">
            <div class="text-wrapper-10">领地</div>
            <div class="text-wrapper-11">私人设计师</div>
          </div>
          <div class="frame-18">
            <Ellipse class="ellipse-78" />
            <Ellipse class="ellipse-instance" />
            <Ellipse class="ellipse-instance" />
            <Ellipse class="ellipse-instance" />
            <Ellipse class="ellipse-instance" />
            <Ellipse class="ellipse-instance" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ellipse from "../../../components/Ellipse.vue";

export default {
  name: "DivWrapperSubsection",
  components: {
    Ellipse
  }
};
</script>

<style>
.div-wrapper-subsection {
  align-items: flex-start;
  display: inline-flex;
  flex-direction: column;
  gap: 18px;
  left: 20px;
  position: absolute;
  top: 233px;
}

.div-wrapper-subsection .frame-6 {
  align-items: flex-start;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 10px;
  position: relative;
  width: 204px;
}

.div-wrapper-subsection .frame-7 {
  align-items: flex-end;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 8px;
  position: relative;
}

.div-wrapper-subsection .ellipse-2 {
  height: 84px;
  position: relative;
  width: 84px;
}

.div-wrapper-subsection .frame-8 {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 2px;
  position: relative;
}

.div-wrapper-subsection .frame-9 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 4px;
  position: relative;
  width: 100%;
}

.div-wrapper-subsection .text-wrapper-5 {
  color: #000000;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 19px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  width: fit-content;
}

.div-wrapper-subsection .frame-10 {
  align-items: center;
  aspect-ratio: 1;
  background: linear-gradient(
      0deg,
      rgba(22, 169, 250, 0.1) 0%,
      rgba(22, 169, 250, 0.1) 100%
    ),
    linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  border-radius: 31px;
  display: flex;
  gap: 10px;
  height: 20px;
  justify-content: center;
  padding: 2px;
  position: relative;
  width: 20px;
}

.div-wrapper-subsection .vector-wrapper {
  aspect-ratio: 1;
  height: 12px;
  position: relative;
  width: 12px;
}

.div-wrapper-subsection .vector-4 {
  height: 88.92%;
  left: 5.48%;
  position: absolute;
  top: 5.47%;
  width: 88.98%;
}

.div-wrapper-subsection .text-wrapper-6 {
  color: var(--variable-collection-a7a7a7);
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.div-wrapper-subsection .text-wrapper-7 {
  align-self: stretch;
  color: var(--variable-collection-a7a7a7);
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
}

.div-wrapper-subsection .frame-11 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 67px;
  position: relative;
  width: 100%;
}

.div-wrapper-subsection .frame-12 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 40px;
  justify-content: center;
  position: relative;
}

.div-wrapper-subsection .frame-13 {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
  width: 35px;
}

.div-wrapper-subsection .text-wrapper-8 {
  color: #333333;
  font-family: "PingFang SC-Medium", Helvetica;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  width: fit-content;
}

.div-wrapper-subsection .text-wrapper-9 {
  color: #a6a6a6;
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.div-wrapper-subsection .frame-14 {
  align-items: flex-start;
  background-color: var(--variable-collection);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 56px;
  padding: 9px 10px;
  position: relative;
  width: 335px;
}

.div-wrapper-subsection .frame-15 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 78px;
  position: relative;
  width: 100%;
}

.div-wrapper-subsection .frame-16 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 11px;
  position: relative;
}

.div-wrapper-subsection .frame-17 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
  width: 55px;
}

.div-wrapper-subsection .text-wrapper-10 {
  align-self: stretch;
  color: #000000;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
}

.div-wrapper-subsection .text-wrapper-11 {
  align-self: stretch;
  color: var(--variable-collection-a7a7a7);
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
}

.div-wrapper-subsection .frame-18 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  position: relative;
}

.div-wrapper-subsection .ellipse-78 {
  position: relative !important;
}

.div-wrapper-subsection .ellipse-instance {
  margin-left: -10px !important;
  position: relative !important;
}
</style>