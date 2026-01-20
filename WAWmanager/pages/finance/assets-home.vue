<template>
  <view class="container">
    <!-- 顶部渐变区域 -->
    <view class="header-section">
      <!-- 资产余额区域 -->
      <view class="balance-area">
        <view class="balance-header">
          <view class="balance-title">
            <text class="title-text">资产余额</text>
            <text class="title-unit">（元）</text>
          </view>
          <view class="transfer-btn" @tap="goTransfer">
            <image class="transfer-icon" src="/static/icons/arrow-right@3x.png" mode="aspectFit"></image>
            <text class="transfer-text">转出余额</text>
          </view>
        </view>

        <view class="balance-amount">
          <text class="amount-value">{{ formatMoney(totalAssets) }}</text>
        </view>

        <view class="total-assets">
          <text class="total-label">总资产：</text>
          <text class="total-value">{{ formatMoney(totalAssets) }} 元</text>
        </view>
      </view>
    </view>

    <!-- 账户分类卡片 -->
    <view class="account-card">
      <view class="account-grid">
        <view class="account-item" @tap="goToBalance">
          <text class="account-label">余额</text>
          <text class="account-value">{{ formatMoney(accountData.balance) }}</text>
        </view>
        <view class="account-item" @tap="goToOrderIncome">
          <text class="account-label">订单收入</text>
          <text class="account-value">{{ formatMoney(accountData.orderIncome) }}</text>
        </view>
      </view>

      <view class="account-grid">
        <view class="account-item" @tap="goToCommission">
          <text class="account-label">推广佣金</text>
          <text class="account-value">{{ formatMoney(accountData.commission) }}</text>
        </view>
      </view>
    </view>

    <!-- 结算信息 -->
    <view class="settlement-card">
      <view class="settlement-title">结算信息</view>
      <view class="settlement-item" @tap="goToBankCard">
        <text class="item-label">银行卡</text>
        <view class="item-right">
          <text class="item-value">{{ bankCardStatus }}</text>
          <text class="arrow-icon">›</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getAssets, getBankCards } from '@/api'

// 总资产
const totalAssets = ref(0)

// 各账户数据
const accountData = ref({
  balance: 0,
  orderIncome: 0,
  commission: 0
})

// 银行卡绑定状态
const bankCardStatus = ref('未绑定')

// 页面加载
onLoad(() => {
  loadAssetData()
  loadBankCardStatus()
})

// 页面显示时刷新数据
onShow(() => {
  loadAssetData()
})

// 加载资产数据
const loadAssetData = async () => {
  try {
    const res = await getAssets()
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      totalAssets.value = data.totalAssets || data.total || 0
      accountData.value = {
        balance: data.balance || 0,
        orderIncome: data.orderIncome || data.income || 0,
        commission: data.commission || data.promotionIncome || 0
      }
    }
  } catch (error) {
    console.error('加载资产数据失败:', error)
  }
}

// 加载银行卡绑定状态
const loadBankCardStatus = async () => {
  try {
    const res = await getBankCards()
    if (res.code === 200 || res.code === 0) {
      const cards = res.data?.list || res.data || []
      bankCardStatus.value = cards.length > 0 ? '已绑定' : '未绑定'
    }
  } catch (error) {
    console.error('加载银行卡状态失败:', error)
    bankCardStatus.value = '未绑定'
  }
}

// 格式化金额
const formatMoney = (num) => {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 转出余额
const goTransfer = () => {
  uni.navigateTo({ url: '/pages/finance/balance' })
}

// 跳转到余额页面
const goToBalance = () => {
  uni.navigateTo({ url: '/pages/finance/balance' })
}

// 跳转到订单收入
const goToOrderIncome = () => {
  uni.navigateTo({ url: '/pages/finance/order-income' })
}

// 跳转到推广佣金
const goToCommission = () => {
  uni.navigateTo({ url: '/pages/finance/promotion-income' })
}

// 跳转到银行卡管理
const goToBankCard = () => {
  uni.navigateTo({ url: '/pages/finance/bank-card' })
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

/* 资产余额区域 */
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

.transfer-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.transfer-icon {
  width: 32rpx;
  height: 32rpx;
}

.transfer-text {
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

.total-assets {
  display: flex;
  align-items: center;
}

.total-label {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

.total-value {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
}

/* 账户分类卡片 */
.account-card {
  margin: -30rpx 24rpx 24rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.account-grid {
  display: flex;
  margin-bottom: 32rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.account-item {
  width: 260rpx;
  height: 110rpx;
  padding: 24rpx;
  background-color: #F8F9FC;
  border-radius: 16rpx;
  margin-right: 24rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  &:last-child {
    margin-right: 0;
  }

  &:active {
    background-color: #F0F1F5;
  }
}

.account-label {
  display: block;
  font-size: 26rpx;
  color: #666;
  margin-bottom: 16rpx;
}

.account-value {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
}

/* 结算信息卡片 */
.settlement-card {
  width: 638rpx;
  margin: 0 24rpx 24rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
}

.settlement-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.settlement-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  padding-bottom: 0;

  &:active {
    opacity: 0.7;
  }
}

.item-label {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.item-right {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.item-value {
  font-size: 28rpx;
  color: #999;
}

.arrow-icon {
  font-size: 32rpx;
  color: #ccc;
}
</style>
