<template>
  <view class="container">
    <!-- 背景图 -->
    <image class="bg-image" src="/pages/technician/static/yaoqing-bg.png" mode="aspectFill"></image>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 店铺信息卡片 -->
      <view class="store-card">
        <!-- 店铺头部 -->
        <view class="store-header">
          <image class="store-logo" :src="storeInfo.logo" mode="aspectFill"></image>
          <view class="store-info">
            <text class="store-name">{{ storeInfo.name }}</text>
            <view class="store-rating">
              <view class="rating-left">
                <text class="rating-score">{{ storeInfo.rating }}</text>
                <image class="rating-icon" src="/pages/technician/static/lujin.png" mode="aspectFit"></image>
              </view>
              <text class="rating-price">¥{{ storeInfo.price }}/人</text>
            </view>
          </view>
        </view>

        <!-- 店铺信息 -->
        <view class="store-detail">
          <view class="detail-item">
            <image class="detail-icon" src="/pages/technician/static/location.png" mode="aspectFit"></image>
            <text class="detail-text">{{ storeInfo.address }}</text>
          </view>
          <view class="detail-item">
            <image class="detail-icon" src="/pages/technician/static/phone-fill.png" mode="aspectFit"></image>
            <text class="detail-text">{{ storeInfo.phone }}</text>
          </view>
        </view>

        <!-- 邀请标题 -->
        <view class="invite-title">
          <image class="invite-image" src="/pages/technician/static/jiaru.png" mode="aspectFit"></image>
        </view>

        <!-- 二维码区域 -->
        <view class="qrcode-section">
          <view class="qrcode-box">
            <image class="qrcode-image" :src="storeInfo.qrcode" mode="aspectFit"></image>
          </view>
        </view>

        <!-- 底部按钮 -->
        <view class="scan-btn">
          <text>扫描二维码 立即加入</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 店铺信息
const storeInfo = reactive({
  logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop',
  name: 'CD beautiful 美发沙龙',
  rating: '4.8',
  price: '233',
  qrcode: '/static/images/qrcode-placeholder.png',
  address: '高新区天府大道中段500号世豪广场2299',
  phone: '028-8008208820'
})

// 页面加载
onLoad(() => {
  loadStoreInfo()
})

// 加载店铺信息
const loadStoreInfo = () => {
  // 模拟加载店铺信息
}

// 分享给好友
const shareToFriend = () => {
  uni.showToast({ title: '请点击右上角分享', icon: 'none' })
}

// 保存到手机
const saveToAlbum = () => {
  uni.showLoading({ title: '保存中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '保存成功', icon: 'success' })
  }, 1000)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  padding: 312rpx 24rpx 48rpx;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

// 店铺卡片
.store-card {
width: 580rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.store-header {
  display: flex;
  align-items: center;
}

.store-logo {
  width: 100rpx;
  height: 100rpx;
  border-radius: 16rpx;
  flex-shrink: 0;
  border: 2rpx solid #F0F0F0;
}

.store-info {
  flex: 1;
  margin-left: 24rpx;
}

.store-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  display: block;
}

.store-rating {
  display: flex;
  align-items: center;
  margin-top: 12rpx;
}

.rating-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rating-score {
  font-size: 48rpx;
  font-weight: 700;
  color: #101828;
}

.rating-icon {
  width: 80rpx;
  height: 24rpx;
  margin-top: -15rpx;
}

.rating-price {
  margin-bottom: 12rpx;
  font-size: 26rpx;
  color: #999;
  margin-left: 16rpx;
}

// 店铺详情
.store-detail {
  margin-top: 28rpx;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.detail-icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

.detail-text {
  font-size: 26rpx;
  color: #666;
  margin-left: 12rpx;
}

// 邀请标题
.invite-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40rpx 0 32rpx;
}

.invite-image {
  width: 240rpx;
  height: 48rpx;
}

// 二维码区域
.qrcode-section {
  display: flex;
  justify-content: center;
  padding: 0 40rpx;
}

.qrcode-box {
  width: 360rpx;
  height: 360rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qrcode-image {
  width: 100%;
  height: 100%;
}

// 扫描按钮
.scan-btn {
  margin: 40rpx auto 0;
  height: 48rpx;
  width: 358rpx;
  background-color: #DBE8FF;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 28rpx;
    color: #5280FF;
    font-weight: 500;
  }
}

.action-icon {
  width: 36rpx;
  height: 36rpx;
}
</style>
