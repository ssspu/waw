<template>
  <view class="container">
    <!-- 背景图 -->
    <image class="bg-image" src="/pages/shop/static/bg.png" mode="aspectFill"></image>

    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar-content">
        <view class="back-btn" @tap="goBack">
          <image class="back-icon" src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" mode="aspectFit"></image>
        </view>
        <text class="navbar-title">店铺二维码</text>
        <view class="navbar-placeholder"></view>
      </view>
    </view>

    <!-- 卡片内容 -->
    <view class="card-wrapper" :style="{ marginTop: (statusBarHeight + 88) + 'rpx' }">
      <view class="qrcode-card" id="qrcode-card">
        <!-- 店铺封面图 -->
        <view class="cover-section">
          <image class="cover-image" :src="storeData.coverImage" mode="aspectFill"></image>
          <!-- 编辑按钮 -->
          <view class="edit-btn" @tap="editCover">
            <image class="edit-icon" src="/static/pages/后台管理页面_slices/share-circle-line.png" mode="aspectFit"></image>
          </view>
        </view>

        <!-- 店铺信息 -->
        <view class="store-info">
          <view class="store-name">{{ storeData.name }}</view>

          <view class="rating-row">
            <text class="rating-score">{{ storeData.rating }}</text>
            <image class="rating-underline" src="/static/images/rating-line.png" mode="widthFix"></image>
            <text class="price-per-person">¥{{ storeData.pricePerPerson }}/人</text>
          </view>

          <view class="address-row">
            <image class="location-icon" src="/static/icons/location.png" mode="aspectFit"></image>
            <text class="address-text">{{ storeData.address }}</text>
          </view>

          <view class="phone-row">
            <image class="phone-icon" src="/static/icons/phone.png" mode="aspectFit"></image>
            <text class="phone-text">{{ storeData.phone }}</text>
          </view>
        </view>

        <!-- 分割线 -->
        <view class="divider"></view>

        <!-- 二维码区域 -->
        <view class="qrcode-section">
          <view class="qrcode-left">
            <text class="qrcode-tip1">发现一个很Nice的形象设计师</text>
            <text class="qrcode-tip2">分享美丽秘密送给好友～</text>
          </view>
          <view class="qrcode-right">
            <image class="qrcode-image" :src="storeData.qrcodeUrl" mode="aspectFit"></image>
            <text class="qrcode-hint">长按识别小程序码</text>
          </view>
        </view>

        <!-- 保存按钮 -->
        <view class="save-btn" @tap="saveToPhone">
          <text>保存到手机</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const statusBarHeight = ref(44)

const storeData = ref({
  id: '',
  name: 'CD beautiful 美发沙龙',
  coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
  rating: '4.8',
  pricePerPerson: '233',
  address: '高新区天府大道中段500号世豪广场2299',
  phone: '028-8008208820',
  qrcodeUrl: '/static/images/qrcode-demo.png'
})

onLoad((options) => {
  // 获取状态栏高度
  statusBarHeight.value = uni.getStorageSync('statusBarHeight') || 44

  // 解析传入的店铺信息
  if (options && options.storeInfo) {
    try {
      const info = JSON.parse(decodeURIComponent(options.storeInfo))
      if (info.id) storeData.value.id = info.id
      if (info.name) storeData.value.name = info.name
      if (info.coverImage) storeData.value.coverImage = info.coverImage
    } catch (e) {
      console.error('解析店铺信息失败', e)
    }
  }
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 编辑封面
const editCover = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      storeData.value.coverImage = res.tempFilePaths[0]
      uni.showToast({ title: '封面已更换', icon: 'success' })
    }
  })
}

// 保存到手机
const saveToPhone = () => {
  uni.showLoading({ title: '生成中...' })

  // 模拟保存操作
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '已保存到相册',
      icon: 'success'
    })
  }, 1500)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(180deg, #7B8CFF 0%, #5BA0FC 100%);
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.navbar {
  position: relative;
  z-index: 10;
  width: 100%;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88rpx;
  width: 100%;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 30rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.back-icon {
  width: 32rpx;
  height: 32rpx;
}

.navbar-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #ffffff;
  white-space: nowrap;
}

.navbar-placeholder {
  display: none;
}

.card-wrapper {
  position: relative;
  z-index: 10;
  padding: 0 24rpx;
  margin-top: 40rpx;
}

.qrcode-card {
  width: 630rpx;
  padding: 15rpx;
  background-color: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  padding-bottom: 40rpx;
}

.cover-section {
  position: relative;
  width: 100%;
  height: 400rpx;
}

.cover-image {
  width: 100%;
  height: 100%;
}

.edit-btn {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  width: 64rpx;
  height: 64rpx;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-icon {
  width: 36rpx;
  height: 36rpx;
}

.store-info {
  padding: 32rpx 32rpx 24rpx;
}

.store-name {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
}

.rating-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 20rpx;
}

.rating-score {
  font-size: 48rpx;
  font-weight: 700;
  color: #333;
  margin-right: 8rpx;
}

.rating-underline {
  width: 48rpx;
  height: 8rpx;
  margin-right: 24rpx;
}

.price-per-person {
  font-size: 28rpx;
  color: #999;
}

.address-row,
.phone-row {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.location-icon,
.phone-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 12rpx;
}

.address-text,
.phone-text {
  font-size: 26rpx;
  color: #333;
}

.divider {
  margin: 24rpx 32rpx;
  border-bottom: 2rpx dashed #e5e5e5;
}

.qrcode-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32rpx;
  margin-bottom: 32rpx;
}

.qrcode-left {
  flex: 1;
}

.qrcode-tip1,
.qrcode-tip2 {
  display: block;
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}

.qrcode-right {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-image {
  width: 180rpx;
  height: 180rpx;
  margin-bottom: 8rpx;
}

.qrcode-hint {
  font-size: 20rpx;
  color: #999;
}

.save-btn {
  margin: 0 32rpx;
  height: 88rpx;
  background: linear-gradient(135deg, #7B8CFF 0%, #5BA0FC 100%);
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    font-weight: 500;
    color: #fff;
  }
}
</style>
