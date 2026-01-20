<template>
  <view class="container">
    <!-- 顶部渐变区域 -->
    <view class="header-section">
      <!-- 可用余额区域 -->
      <view class="balance-area">
        <view class="balance-header">
          <view class="balance-title">
            <text class="title-text">可用余额</text>
            <text class="title-unit">（元）</text>
          </view>
          <view class="detail-btn" @tap="goToDetail">
            <text class="detail-icon">☰</text>
            <text class="detail-text">余额明细</text>
          </view>
        </view>

        <view class="balance-amount">
          <text class="amount-value">{{ formatMoney(availableBalance) }}</text>
        </view>

        <view class="withdrawn-info">
          <text class="withdrawn-label">已提现：</text>
          <text class="withdrawn-value">{{ formatMoney(withdrawnAmount) }} 元</text>
        </view>
      </view>
    </view>

    <!-- 操作列表 -->
    <view class="action-card">
      <view class="action-item" @tap="goToWithdraw">
        <view class="action-left">
          <view class="action-icon withdraw-icon">
            <image class="icon-img" src="/static/icons/wallet@3x.png" mode="aspectFit"></image>
          </view>
          <text class="action-name">提现</text>
        </view>
        <text class="arrow-icon">›</text>
      </view>

      <view class="divider"></view>

      <view class="action-item" @tap="goToRecharge">
        <view class="action-left">
          <view class="action-icon recharge-icon">
            <image class="icon-img" src="/static/icons/wallet@3x(1).png" mode="aspectFit"></image>
          </view>
          <text class="action-name">充值</text>
        </view>
        <text class="arrow-icon">›</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getBalance } from '@/api'

// 可用余额
const availableBalance = ref(0)

// 已提现金额
const withdrawnAmount = ref(0)

// 页面加载
onLoad(() => {
  loadBalanceData()
})

// 页面显示
onShow(() => {
  loadBalanceData()
})

// 加载余额数据
const loadBalanceData = async () => {
  try {
    const res = await getBalance()
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      availableBalance.value = data.available || data.balance || 0
      withdrawnAmount.value = data.withdrawn || data.withdrawnAmount || 0
    }
  } catch (error) {
    console.error('加载余额数据失败:', error)
  }
}

// 格式化金额
const formatMoney = (num) => {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 跳转到余额明细
const goToDetail = () => {
  uni.navigateTo({ url: '/pages/finance/balance-detail' })
}

// 跳转到提现
const goToWithdraw = () => {
  uni.navigateTo({ url: '/pages/finance/withdraw' })
}

// 跳转到充值
const goToRecharge = () => {
  uni.navigateTo({ url: '/pages/finance/recharge' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #EDF0F4;
}

/* 顶部渐变区域 */
.header-section {
  width: 100%;
  background: linear-gradient(135deg, #7D7CE3 0%, #3CA4FC 100%);
  padding-bottom: 60rpx;
}

/* 可用余额区域 */
.balance-area {
  padding: 40rpx 30rpx;
}

.balance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.balance-title {
  display: flex;
  align-items: baseline;
}

.title-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
}

.title-unit {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-left: 4rpx;
}

.detail-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.detail-icon {
  font-size: 28rpx;
  color: #fff;
}

.detail-text {
  font-size: 26rpx;
  color: #fff;
}

.balance-amount {
  margin-bottom: 20rpx;
}

.amount-value {
  font-size: 72rpx;
  font-weight: 600;
  color: #fff;
  letter-spacing: 2rpx;
}

.withdrawn-info {
  display: flex;
  align-items: center;
}

.withdrawn-label {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

.withdrawn-value {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
}

/* 操作列表卡片 */
.action-card {
  width: 638rpx;
  margin: -30rpx 24rpx 24rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 0 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.action-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;

  &:active {
    opacity: 0.7;
  }
}

.action-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.action-icon {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}


    .icon-img {
      width: 40rpx;
      height: 40rpx;
    }

.action-name {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
}

.arrow-icon {
  font-size: 36rpx;
  color: #ccc;
}

.divider {
  height: 1rpx;
  background-color: #F5F5F5;
}
</style>
