<template>
  <view class="container">
    <!-- 营销运营标题 -->
    <view class="section-title">营销运营</view>

    <!-- 功能模块网格 -->
    <view class="function-grid">
      <!-- 优惠券模块 -->
      <image class="function-card" src="/pages/marketing/static/容器 153@3x.png" mode="widthFix" @tap="onCouponTap"></image>

      <!-- 分销模块 -->
      <image class="function-card" src="/pages/marketing/static/容器 154@3x.png" mode="widthFix" @tap="onDistributionTap"></image>

      <!-- 会员模块 -->
      <view class="card-wrapper" @tap="onMemberTap">
        <image class="function-card gray-card" src="/pages/marketing/static/容器 149@3x.png" mode="widthFix"></image>
        <text class="overlay-text">建设中</text>
      </view>

      <!-- 建设中模块 -->
      <image class="function-card" src="/pages/marketing/static/容器 155@3x.png" mode="widthFix" @tap="onConstructionTap"></image>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'

// 页面加载
onLoad(() => {
  console.log('营销管理页面加载')
})

// 会员功能
const onMemberTap = () => {
  uni.navigateTo({ url: '/pages/marketing/member-sync' })
}

// 优惠券功能
const onCouponTap = () => {
  uni.navigateTo({ url: '/pages/marketing/coupon/list' })
}

// 分销功能
const onDistributionTap = () => {
  uni.navigateTo({ url: '/pages/marketing/distribution/index' })
}

// 建设中功能
const onConstructionTap = () => {
  uni.showToast({
    title: '功能建设中，敬请期待',
    icon: 'none',
    duration: 2000
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding: 24rpx;
  box-sizing: border-box;
}

.section-title {
margin-right: 555rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
}

.function-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.function-card {
  width: 344rpx;
  height: 200rpx;
  border-radius: 20rpx;
  margin-bottom: 20rpx;

  &:active {
    opacity: 0.9;
  }
}

.gray-card {
  filter: grayscale(100%);
  opacity: 0.6;
}

.card-wrapper {
  position: relative;
  width: 344rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
}

.overlay-text {
  position: absolute;
  left: 24rpx;
  top: 120rpx;
  font-size: 24rpx;
  color: #999;
}
</style>
