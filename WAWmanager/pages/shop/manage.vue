<template>
  <view class="container">
    <!-- 主内容区域 -->
    <view class="main-content">
      <!-- 店铺信息卡片 -->
      <view class="shop-info-card">
        <!-- 上半部分：Logo和店铺信息 -->
        <view class="shop-top">
          <!-- 添加Logo -->
          <view class="logo-upload" @tap="uploadLogo">
            <view class="logo-placeholder" v-if="!shopLogo">
              <text class="logo-add">+</text>
              <text class="logo-text">添加logo</text>
            </view>
            <image v-else class="logo-image" :src="shopLogo" mode="aspectFill"></image>
          </view>

          <!-- 店铺名称和身份选择 -->
          <view class="shop-details">
            <view class="shop-name-row">
              <text class="label">店铺名称</text>
              <input
                class="shop-name-input"
                placeholder="自定义个人商铺名称"
                placeholder-class="placeholder-text"
                :value="shopName"
                @input="onShopNameInput"
              />
            </view>
            <view class="identity-row">
              <text class="label">选择身份</text>
              <view class="identity-buttons">
                <view
                  class="identity-btn"
                  :class="{ active: selectedIdentity === 'company' }"
                  @tap="selectIdentity('company')"
                >
                  <text>公司</text>
                </view>
                <view
                  class="identity-btn"
                  :class="{ active: selectedIdentity === 'individual' }"
                  @tap="selectIdentity('individual')"
                >
                  <text>个人</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 商城服务条 -->
        <view class="mall-service-bar" @tap="onServiceStatus">
          <view class="service-left">
            <image class="service-icon" src="/pages/shop/static/容器 144@3x.png" mode="aspectFit"></image>
          </view>
          <view class="service-right">
            <text class="service-status">未开通</text>
            <image class="arrow-icon" src="/pages/shop/static/arrow-square-right@2x.png" mode="aspectFit"></image>
          </view>
        </view>
      </view>

      <!-- 功能按钮组 -->
      <view class="function-buttons">
        <view class="function-btn" @tap="onShopRepair">
          <view class="btn-icon">
            <image src="/pages/shop/static/brush@2x.png" mode="aspectFit"></image>
          </view>
          <text class="btn-text">店铺装修</text>
        </view>
        <view class="function-btn" @tap="onShopLink">
          <view class="btn-icon">
            <image src="/pages/shop/static/shop-add@2x.png" mode="aspectFit"></image>
          </view>
          <text class="btn-text">关联店铺</text>
        </view>
        <view class="function-btn" @tap="onPortfolioUpload">
          <view class="btn-icon">
            <image src="/pages/shop/static/gallery-export@2x.png" mode="aspectFit"></image>
          </view>
          <text class="btn-text">作品上传</text>
        </view>
        <view class="function-btn" @tap="onEnterShop">
          <view class="btn-icon">
            <image src="/pages/shop/static/shop@2x.png" mode="aspectFit"></image>
          </view>
          <text class="btn-text">进入店铺</text>
        </view>
      </view>

      <!-- 管理选项列表 -->
      <view class="management-list">
        <view class="management-item" @tap="onMainAuth">
          <text class="item-label">主体认证</text>
          <view class="item-right">
            <text class="item-status">{{ mainAuthStatusText }}</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>

        <view class="management-item" @tap="onPaymentSetup">
          <text class="item-label">支付结算</text>
          <view class="item-right">
            <text class="item-status">{{ paymentStatusText }}</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>

        <view class="management-item" @tap="onLevelAuth">
          <text class="item-label">等级认证</text>
          <view class="item-right">
            <text class="item-status">{{ levelStatusText }}</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>

        <view class="management-item" @tap="onStaffManage">
          <text class="item-label">员工管理</text>
          <view class="item-right">
            <text class="item-status">去添加</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>

      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getShopInfo, uploadShopLogo } from '@/api'

// 响应式数据
const shopName = ref('')
const shopLogo = ref('')
const selectedIdentity = ref('individual')
const certStatus = ref('pending')
const mainAuthStatusText = ref('未认证')
const paymentStatusText = ref('去完善')
const levelStatusText = ref('去完善')
const currentVersion = ref('merchant')

// 页面加载
onLoad((options) => {
  const optionVersion = options?.version || ''
  const storedVersion = uni.getStorageSync('currentVersion')
  currentVersion.value = optionVersion || storedVersion || 'merchant'
  loadShopInfo()
})

// 页面显示
onShow(() => {
  syncCertificationStatus()
})

// 加载店铺信息
const loadShopInfo = async () => {
  try {
    const res = await getShopInfo()
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      shopName.value = data.name || data.shopName || ''
      shopLogo.value = data.logo || data.shopLogo || ''
      selectedIdentity.value = data.identity || data.type || 'individual'
      // 同步认证状态
      if (data.certStatus) {
        certStatus.value = data.certStatus
      }
    }
  } catch (error) {
    console.error('加载店铺信息失败:', error)
  }
}

// 上传Logo
const uploadLogo = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      shopLogo.value = res.tempFilePaths[0]
    }
  })
}

// 店铺名称输入
const onShopNameInput = (e) => {
  shopName.value = e.detail.value
}

// 选择身份
const selectIdentity = (type) => {
  selectedIdentity.value = type
}

// 服务状态
const onServiceStatus = () => {
  uni.navigateTo({ url: '/pages/shop/mall-service' })
}

// 店铺装修
const onShopRepair = () => {
  uni.navigateTo({ url: '/pages/shop/decoration' })
}

// 关联店铺
const onShopLink = () => {
  uni.navigateTo({ url: '/pages/shop/store-link' })
}

// 进入店铺
const onEnterShop = () => {
  // 暂时禁用跳转
  // uni.navigateTo({ url: '/pages/shop/center' })
}

// 作品上传
const onPortfolioUpload = () => {
  uni.navigateTo({ url: '/pages/shop/center?tab=works' })
}

// 主体认证
const onMainAuth = () => {
  if (currentVersion.value === 'technician') {
    if (certStatus.value === 'completed') {
      uni.navigateTo({ url: '/pages/apply/stylist-identity' })
    } else {
      uni.navigateTo({ url: '/pages/apply/stylist-register?source=designerManage&role=technician' })
    }
    return
  }

  if (currentVersion.value === 'storeTechnician') {
    if (certStatus.value === 'completed') {
      uni.navigateTo({ url: '/pages/apply/store-license' })
    } else {
      uni.showToast({ title: '请联系商家完善主体认证', icon: 'none' })
    }
    return
  }

  // 商家认证 - 跳转到认证状态查看页面
  if (certStatus.value === 'completed') {
    uni.navigateTo({ url: '/pages/apply/store-license' })
  } else {
    uni.navigateTo({ url: '/pages/apply/store-register?source=shopManage' })
  }
}

// 支付结算
const onPaymentSetup = () => {
  if (currentVersion.value === 'technician') {
    if (certStatus.value === 'completed') {
      uni.navigateTo({ url: '/pages/finance/bank-cards' })
    } else {
      uni.navigateTo({ url: '/pages/apply/stylist-register?source=designerManage&role=technician' })
    }
    return
  }

  if (currentVersion.value === 'storeTechnician') {
    uni.navigateTo({ url: '/pages/finance/bank-cards' })
    return
  }

  // 商家支付结算
  if (certStatus.value === 'completed') {
    uni.navigateTo({ url: '/pages/finance/bank-cards' })
  } else {
    uni.navigateTo({ url: '/pages/apply/store-register?source=shopManage' })
  }
}

// 等级认证
const onLevelAuth = () => {
  if (currentVersion.value === 'technician') {
    if (certStatus.value === 'completed') {
      uni.navigateTo({ url: '/pages/apply/stylist-qualification' })
    } else {
      uni.navigateTo({ url: '/pages/apply/stylist-register?source=designerManage&role=technician' })
    }
    return
  }

  if (currentVersion.value === 'storeTechnician') {
    if (levelStatusText.value === '已完成') {
      uni.navigateTo({ url: '/pages/apply/stylist-qualification' })
    } else {
      uni.navigateTo({ url: '/pages/apply/stylist-register?source=designerManage&role=storeTechnician' })
    }
    return
  }

  uni.navigateTo({ url: '/pages/apply/store-grade' })
}

// 员工管理
const onStaffManage = () => {
  uni.navigateTo({ url: '/pages/staff/list' })
}


// 同步认证状态
const syncCertificationStatus = () => {
  const version = currentVersion.value

  if (version === 'technician') {
    const stylistStatus = uni.getStorageSync('stylistCertStatus')
    const normalizedStatus = stylistStatus === 'completed' ? 'completed' : 'pending'
    const isCompleted = normalizedStatus === 'completed'
    certStatus.value = normalizedStatus
    mainAuthStatusText.value = isCompleted ? '已完成' : '去完善'
    paymentStatusText.value = isCompleted ? '已完成' : '去完善'
    levelStatusText.value = isCompleted ? '已完成' : '去完善'
    return
  }

  const merchantStatus = uni.getStorageSync('merchantCertStatus')
  const stylistStatus = uni.getStorageSync('stylistCertStatus')
  const merchantCompleted = merchantStatus === 'completed'
  const stylistCompleted = stylistStatus === 'completed'

  if (version === 'storeTechnician') {
    certStatus.value = merchantCompleted ? 'completed' : 'pending'
    mainAuthStatusText.value = merchantCompleted ? '已完成' : '未认证'
    paymentStatusText.value = merchantCompleted ? '已完成' : '去完善'
    levelStatusText.value = merchantCompleted && stylistCompleted ? '已完成' : '去完善'
    return
  }

  certStatus.value = merchantCompleted ? 'completed' : 'pending'
  mainAuthStatusText.value = merchantCompleted ? '已完成' : '未认证'
  paymentStatusText.value = merchantCompleted ? '已完成' : '去完善'
  levelStatusText.value = merchantCompleted && stylistCompleted ? '已完成' : '去完善'
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #EDF0F4;
}

// 主内容区域
.main-content {
  width: 100%;
}

// 店铺信息卡片
.shop-info-card {
  background-color: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  margin: 24rpx;
}

.shop-top {
  display: flex;
  padding: 32rpx;
  gap: 24rpx;
}

// Logo上传
.logo-upload {
  width: 160rpx;
  height: 160rpx;
  background-color: #F5F7FA;
  border-radius: 16rpx;
  border: 2rpx dashed #D0D5DD;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo-add {
  font-size: 48rpx;
  color: #98A2B3;
  line-height: 1;
  margin-bottom: 8rpx;
}

.logo-text {
  font-size: 22rpx;
  color: #98A2B3;
}

.logo-image {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
}

// 店铺详情
.shop-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 48rpx;
}

.shop-name-row,
.identity-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  font-size: 28rpx;
  color: #333;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.shop-name-input {
  flex: 1;
  font-size: 26rpx;
  color: #4A90E2;
}

.placeholder-text {
  color: #4A90E2;
}

.identity-buttons {
  display: flex;
  gap: 16rpx;
}

.identity-btn {
  text-align: center;
  width: 92rpx;
  height: 48rpx;
  border-radius: 8rpx;
  background-color: #F5F7FA;
  border: 2rpx solid #E8E8E8;

  text {
    font-size: 24rpx;
    color: #666;
  }

  &.active {
    background-color: #4A90E2;
    border-color: #4A90E2;

    text {
      color: #fff;
    }
  }
}

// 商城服务条
.mall-service-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, #7B7B79 0%, #3B3934 100%);
  width: 662rpx;
  height: 64rpx;
  padding: 0 28rpx;
  margin: 0 auto 20rpx;
  border-radius: 16rpx;
  box-sizing: border-box;
}

.service-left {
  display: flex;
  align-items: center;
}

.service-icon {
  width: 180rpx;
  height: 40rpx;
}

.service-right {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.service-status {
  font-size: 26rpx;
  color: #DACBB1 ;
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
}

// 功能按钮组
.function-buttons {
  display: flex;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 32rpx 24rpx;
  margin: 24rpx;
}

.function-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:active {
    opacity: 0.7;
  }
}

.btn-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;

  image {
    width: 44rpx;
    height: 44rpx;
  }
}

.btn-text {
  font-size: 24rpx;
  color: #333;
}

// 管理选项列表
.management-list {
  background-color: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  margin: 24rpx;
}

.management-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 36rpx 32rpx;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f8f8f8;
  }
}

.item-label {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}

.item-right {
  display: flex;
  align-items: center;
}

.item-status {
  font-size: 28rpx;
  color: #4A90E2;
  margin-right: 8rpx;
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
}
</style>
