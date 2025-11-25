<template>
  <div class="div-subsection">
    <div class="frame-19">
      <div class="frame-20">
        <div class="text-wrapper-12">我的订单</div>
        <div class="frame-21">
          <div class="text-wrapper-13">全部订单</div>
          <div class="img-wrapper">
            <img class="vector-5" alt="Vector" src="/img/vector-5.svg" />
          </div>
        </div>
      </div>
      <div class="frame-22">
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-6" alt="Vector" src="/img/vector-6.svg" />
            <img class="vector-7" alt="Vector" src="/img/vector-7.svg" />
            <img class="vector-8" alt="Vector" src="/img/vector-8.svg" />
          </div>
          <div class="text-wrapper-14">待付款</div>
        </div>
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-9" alt="Vector" src="/img/vector-9.svg" />
            <img class="vector-10" alt="Vector" src="/img/vector-10.svg" />
          </div>
          <div class="text-wrapper-14">待确认</div>
        </div>
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-11" alt="Vector" src="/img/vector-11.svg" />
            <img class="vector-12" alt="Vector" src="/img/vector-12.svg" />
          </div>
          <div class="text-wrapper-14">待使用</div>
        </div>
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-13" alt="Vector" src="/img/vector-14.svg" />
            <img class="vector-14" alt="Vector" src="/img/vector-15.svg" />
          </div>
          <div class="text-wrapper-14">待评价</div>
        </div>
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-15" alt="Vector" src="/img/vector-16.svg" />
          </div>
          <div class="text-wrapper-15">退款/售后</div>
        </div>
      </div>
    </div>
    <div class="frame-19">
      <div class="text-wrapper-16">我的资产</div>
      <div class="frame-22">
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-16" alt="Vector" src="/img/vector-17.svg" />
            <img class="vector-17" alt="Vector" src="/img/vector-18.svg" />
          </div>
          <div class="text-wrapper-14">优惠券</div>
        </div>
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-18" alt="Vector" src="/img/vector-19.svg" />
            <img class="vector-19" alt="Vector" src="/img/vector-20.svg" />
            <img class="vector-20" alt="Vector" src="/img/vector-21.svg" />
            <img class="vector-21" alt="Vector" src="/img/vector-22.svg" />
            <img class="vector-22" alt="Vector" src="/img/vector-23.svg" />
            <img class="vector-23" alt="Vector" src="/img/vector-24.svg" />
          </div>
          <div class="text-wrapper-14">资产</div>
        </div>
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-24" alt="Vector" src="/img/vector-25.svg" />
            <img class="vector-25" alt="Vector" src="/img/vector-26.svg" />
          </div>
          <div class="text-wrapper-14">推广佣金</div>
        </div>
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-26" alt="Vector" src="/img/vector-27.svg" />
            <img class="vector-27" alt="Vector" src="/img/vector-28.svg" />
          </div>
          <div class="text-wrapper-14">美豆</div>
        </div>
      </div>
    </div>
    <div class="frame-19">
      <div class="text-wrapper-16">入驻中心</div>
      <div class="frame-22">
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-28" alt="Vector" src="/img/vector-29.svg" />
          </div>
          <div class="text-wrapper-14">我要入驻</div>
        </div>
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-29" alt="Vector" src="/img/vector-30.svg" />
          </div>
          <div class="text-wrapper-14">我要推广</div>
        </div>
        <div class="frame-23">
          <div class="frame-24">
            <img class="vector-30" alt="Vector" src="/img/vector-31.svg" />
          </div>
          <div class="text-wrapper-14">个人设置</div>
        </div>
      </div>
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
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 8px;
  left: 10px;
  position: absolute;
  top: 492px;
  width: 355px;
}

.div-subsection .frame-19 {
  align-items: flex-start;
  align-self: stretch;
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 10px;
  padding: 12px 10px;
  position: relative;
  width: 100%;
}

.div-subsection .frame-20 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.div-subsection .text-wrapper-12 {
  color: #333333;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.div-subsection .frame-21 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  position: relative;
}

.div-subsection .text-wrapper-13 {
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

.div-subsection .img-wrapper {
  height: 14px;
  position: relative;
  transform: rotate(-90.00deg);
  width: 14px;
}

.div-subsection .vector-5 {
  height: 50.93%;
  left: 25.72%;
  position: absolute;
  top: 5.23%;
  transform: rotate(90.00deg);
  width: 83.33%;
}

.div-subsection .frame-22 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  padding: 0px 5px;
  position: relative;
  width: 100%;
}

.div-subsection .frame-23 {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  width: 44px;
}

.div-subsection .frame-24 {
  aspect-ratio: 1;
  height: 24px;
  position: relative;
  width: 24px;
}

.div-subsection .vector-6 {
  height: 8.33%;
  left: 62.61%;
  position: absolute;
  top: 47.54%;
  width: 8.33%;
}

.div-subsection .vector-7 {
  height: 87.50%;
  left: 0;
  position: absolute;
  top: 5.88%;
  width: 100%;
}

.div-subsection .vector-8 {
  height: 33.33%;
  left: 50.11%;
  position: absolute;
  top: 35.04%;
  width: 50.00%;
}

.div-subsection .text-wrapper-14 {
  align-self: stretch;
  color: #666666;
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  text-align: center;
}

.div-subsection .vector-9 {
  height: 86.67%;
  left: 6.67%;
  position: absolute;
  top: 6.67%;
  width: 86.67%;
}

.div-subsection .vector-10 {
  height: 43.33%;
  left: 46.67%;
  position: absolute;
  top: 23.33%;
  width: 30.00%;
}

.div-subsection .vector-11 {
  height: 73.33%;
  left: 11.67%;
  position: absolute;
  top: 13.33%;
  width: 76.67%;
}

.div-subsection .vector-12 {
  height: 30.00%;
  left: 38.33%;
  position: absolute;
  top: 40.00%;
  width: 46.67%;
}

.div-subsection .vector-13 {
  height: 73.33%;
  left: 13.33%;
  position: absolute;
  top: 13.33%;
  width: 73.33%;
}

.div-subsection .vector-14 {
  height: 10.00%;
  left: 26.67%;
  position: absolute;
  top: 40.00%;
  width: 46.67%;
}

.div-subsection .vector-15 {
  height: 76.67%;
  left: 10.00%;
  position: absolute;
  top: 10.00%;
  width: 83.33%;
}

.div-subsection .text-wrapper-15 {
  color: #666666;
  font-family: "PingFang SC-Regular", Helvetica;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-left: -3.00px;
  margin-right: -3.00px;
  position: relative;
  text-align: center;
  width: fit-content;
}

.div-subsection .text-wrapper-16 {
  align-self: stretch;
  color: #333333;
  font-family: "PingFang SC-Semibold", Helvetica;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
}

.div-subsection .vector-16 {
  height: 69.70%;
  left: 8.35%;
  position: absolute;
  top: 15.15%;
  width: 80.95%;
}

.div-subsection .vector-17 {
  height: 24.73%;
  left: 34.59%;
  position: absolute;
  top: 37.63%;
  width: 28.48%;
}

.div-subsection .vector-18 {
  height: 21.79%;
  left: 2.53%;
  position: absolute;
  top: 16.67%;
  width: 49.87%;
}

.div-subsection .vector-19 {
  height: 17.98%;
  left: 2.53%;
  position: absolute;
  top: 36.14%;
  width: 49.87%;
}

.div-subsection .vector-20 {
  height: 17.92%;
  left: 2.53%;
  position: absolute;
  top: 51.63%;
  width: 49.87%;
}

.div-subsection .vector-21 {
  height: 41.75%;
  left: 2.53%;
  position: absolute;
  top: 43.10%;
  width: 96.96%;
}

.div-subsection .vector-22 {
  height: 13.29%;
  left: 56.64%;
  position: absolute;
  top: 58.08%;
  width: 42.82%;
}

.div-subsection .vector-23 {
  height: 13.23%;
  left: 56.64%;
  position: absolute;
  top: 69.46%;
  width: 42.82%;
}

.div-subsection .vector-24 {
  height: 90.67%;
  left: 4.45%;
  position: absolute;
  top: 4.44%;
  width: 90.67%;
}

.div-subsection .vector-25 {
  height: 34.77%;
  left: 38.69%;
  position: absolute;
  top: 47.82%;
  width: 25.03%;
}

.div-subsection .vector-26 {
  height: 91.00%;
  left: 4.65%;
  position: absolute;
  top: 4.58%;
  width: 91.00%;
}

.div-subsection .vector-27 {
  height: 40.77%;
  left: 29.69%;
  position: absolute;
  top: 29.83%;
  width: 40.79%;
}

.div-subsection .vector-28 {
  height: 97.05%;
  left: 0;
  position: absolute;
  top: 0;
  width: 99.23%;
}

.div-subsection .vector-29 {
  height: 78.20%;
  left: 6.38%;
  position: absolute;
  top: 10.90%;
  width: 87.25%;
}

.div-subsection .vector-30 {
  height: 94.45%;
  left: 0;
  position: absolute;
  top: 2.77%;
  width: 99.95%;
}
</style>