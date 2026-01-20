<template>
  <view class="container">
    <!-- 顶部背景 -->
    <view class="header-bg">
      <!-- 装饰图形 -->
      <image class="decoration-img" src="/static/pages/shop/qrcode-decoration.png" mode="aspectFit"></image>

      <!-- 导航栏 -->
      <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
        <view class="nav-back" @tap="goBack">
          <text class="back-icon">‹</text>
        </view>
        <text class="nav-title">店铺二维码</text>
        <view class="nav-placeholder"></view>
      </view>
    </view>

    <!-- 推广卡片 -->
    <view class="promo-card">
      <!-- 店铺封面图 -->
      <view class="cover-section">
        <image class="cover-image" :src="storeInfo.coverImage" mode="aspectFill"></image>
        <view class="edit-icon" @tap="editCover">
          <image src="/static/icons/edit-white.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 店铺信息 -->
      <view class="store-info">
        <view class="store-name">{{ storeInfo.name }}</view>
        <view class="store-rating">
          <text class="rating-score">{{ storeInfo.rating }}</text>
          <view class="rating-underline"></view>
          <text class="price-per">¥{{ storeInfo.pricePerPerson }}/人</text>
        </view>
        <view class="store-address">
          <image class="location-icon" src="/static/icons/location-blue.png" mode="aspectFit"></image>
          <text>{{ storeInfo.address }}</text>
        </view>
        <view class="store-phone">
          <image class="phone-icon" src="/static/icons/phone-blue.png" mode="aspectFit"></image>
          <text>{{ storeInfo.phone }}</text>
        </view>
      </view>

      <!-- 分割线 -->
      <view class="divider"></view>

      <!-- 推广语和二维码 -->
      <view class="qrcode-section">
        <view class="promo-text">
          <text class="promo-line">发现一个很Nice的形象设计师</text>
          <text class="promo-line">分享美丽秘密送给好友～</text>
        </view>
        <view class="qrcode-wrapper">
          <image class="qrcode-image" :src="storeInfo.qrcodeUrl" mode="aspectFit"></image>
          <text class="qrcode-hint">长按识别小程序码</text>
        </view>
      </view>

      <!-- 保存按钮 -->
      <view class="save-btn" @tap="saveToPhone">
        <text>保存到手机</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 状态栏高度
const statusBarHeight = ref(44)

// 店铺信息
const storeInfo = ref({
  name: 'CD beautiful 美发沙龙',
  rating: '4.8',
  pricePerPerson: '233',
  address: '高新区天府大道中段500号世豪广场2299',
  phone: '028-8008208820',
  coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
  qrcodeUrl: '/static/images/miniprogram-qrcode.png'
})

// 页面加载
onLoad(() => {
  // 获取状态栏高度
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44

  // 加载店铺信息
  loadStoreInfo()
})

// 加载店铺信息
const loadStoreInfo = () => {
  // 实际项目中从API获取
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 编辑封面
const editCover = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      storeInfo.value.coverImage = res.tempFilePaths[0]
      uni.showToast({ title: '封面已更新', icon: 'success' })
    }
  })
}

// 保存到手机
const saveToPhone = () => {
  uni.showLoading({ title: '正在保存...' })

  // 实际项目中需要先生成海报图片再保存
  setTimeout(() => {
    uni.hideLoading()

    // 检查权限并保存
    uni.saveImageToPhotosAlbum({
      filePath: storeInfo.value.coverImage,
      success: () => {
        uni.showToast({ title: '保存成功', icon: 'success' })
      },
      fail: (err) => {
        if (err.errMsg.includes('auth deny')) {
          uni.showModal({
            title: '提示',
            content: '需要您授权保存图片到相册',
            success: (res) => {
              if (res.confirm) {
                uni.openSetting()
              }
            }
          })
        } else {
          uni.showToast({ title: '保存失败', icon: 'none' })
        }
      }
    })
  }, 500)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #6B9FFF 0%, #4A90E2 100%);
}

// 顶部背景
.header-bg {
  position: relative;
  padding-bottom: 40rpx;
}

.decoration-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 400rpx;
  height: 300rpx;
  opacity: 0.3;
}

// 导航栏
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12rpx 24rpx;
  position: relative;
  z-index: 10;
}

.nav-back {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 56rpx;
  color: #fff;
  font-weight: 300;
}

.nav-title {
  font-size: 34rpx;
  color: #fff;
  font-weight: 500;
}

.nav-placeholder {
  width: 60rpx;
}

// 推广卡片
.promo-card {
  margin: 0 40rpx;
  background-color: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.1);
}

// 封面区域
.cover-section {
  position: relative;
  width: 100%;
  height: 360rpx;
}

.cover-image {
  width: 100%;
  height: 100%;
}

.edit-icon {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 56rpx;
  height: 56rpx;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  image {
    width: 32rpx;
    height: 32rpx;
  }
}

// 店铺信息
.store-info {
  padding: 32rpx;
}

.store-name {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}

.store-rating {
  display: flex;
  align-items: baseline;
  margin-bottom: 20rpx;
}

.rating-score {
  font-size: 40rpx;
  font-weight: 700;
  color: #333;
  position: relative;
}

.rating-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8rpx;
  background-color: #FFD700;
  border-radius: 4rpx;
}

.price-per {
  font-size: 26rpx;
  color: #999;
  margin-left: 16rpx;
}

.store-address,
.store-phone {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;

  image {
    width: 28rpx;
    height: 28rpx;
    margin-right: 12rpx;
  }

  text {
    font-size: 26rpx;
    color: #333;
  }
}

.location-icon,
.phone-icon {
  flex-shrink: 0;
}

// 分割线
.divider {
  height: 1rpx;
  background: repeating-linear-gradient(
    90deg,
    #E8E8E8 0,
    #E8E8E8 8rpx,
    transparent 8rpx,
    transparent 16rpx
  );
  margin: 0 32rpx;
}

// 二维码区域
.qrcode-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
}

.promo-text {
  flex: 1;
}

.promo-line {
  display: block;
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}

.qrcode-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-image {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 8rpx;
}

.qrcode-hint {
  font-size: 20rpx;
  color: #999;
}

// 保存按钮
.save-btn {
  margin: 24rpx 32rpx 40rpx;
  height: 88rpx;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }

  &:active {
    opacity: 0.9;
  }
}
</style>
