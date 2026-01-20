<template>
  <view class="container">
    <!-- 余额顶部区域 -->
    <view class="balance-header">
      <view class="header-content">
        <view class="title-section">
          <view class="title-group">
            <text class="title">可用余额</text>
            <text class="unit">(元)</text>
          </view>
          <view class="detail-btn" @tap="goToBalanceDetail">
            <text>余额明细</text>
          </view>
        </view>

        <view class="amount-section">
          <text class="amount">{{ availableBalance }}</text>
        </view>

        <view class="detail-section">
          <text class="detail-text">已提现：{{ withdrawnAmount }}元</text>
        </view>
      </view>
    </view>

    <!-- 功能按钮列表 -->
    <view class="action-list">
      <view
        v-for="item in actionList"
        :key="item.id"
        class="action-item"
        @tap="onActionClick(item.type)"
      >
        <view class="action-left">
          <view class="action-icon" :style="{ backgroundColor: item.color }">
            <image :src="item.icon" mode="aspectFit"></image>
          </view>
          <text class="action-name">{{ item.name }}</text>
        </view>
        <view class="action-right">
          <image class="arrow-icon" src="/static/icons/arrow.svg"></image>
        </view>
      </view>
    </view>

    <!-- 收入概览 -->
    <view class="income-overview">
      <view class="overview-header">
        <text class="overview-title">收入概览</text>
        <view class="period-tabs">
          <view
            v-for="(tab, index) in periodTabs"
            :key="index"
            class="period-tab"
            :class="{ active: selectedPeriod === index }"
            @tap="selectPeriod(index)"
          >{{ tab }}</view>
        </view>
      </view>

      <view class="overview-content">
        <view class="overview-item">
          <text class="item-label">订单收入</text>
          <text class="item-value">¥{{ orderIncome }}</text>
        </view>
        <view class="overview-item">
          <text class="item-label">分销佣金</text>
          <text class="item-value">¥{{ commissionIncome }}</text>
        </view>
        <view class="overview-item">
          <text class="item-label">推广奖励</text>
          <text class="item-value">¥{{ promotionIncome }}</text>
        </view>
      </view>
    </view>

    <!-- 最近交易 -->
    <view class="transaction-section">
      <view class="section-header">
        <text class="section-title">最近交易</text>
        <view class="view-all" @tap="goToTransactionList">
          <text>查看全部</text>
          <image class="arrow-icon" src="/static/icons/arrow.svg"></image>
        </view>
      </view>

      <view class="transaction-list">
        <view
          v-for="item in transactionList"
          :key="item.id"
          class="transaction-item"
          @tap="goToTransactionDetail(item.id)"
        >
          <view class="transaction-info">
            <text class="transaction-title">{{ item.title }}</text>
            <text class="transaction-time">{{ item.time }}</text>
          </view>
          <text class="transaction-amount" :class="{ income: item.amount > 0 }">
            {{ item.amount > 0 ? '+' : '' }}{{ item.amount.toFixed(2) }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { getBalance, getTransactionDetail, getIncomeDetail } from '@/api'

// 响应式数据
const availableBalance = ref('0.00')
const withdrawnAmount = ref('0.00')

const actionList = ref([
  {
    id: 1,
    name: '提现',
    type: 'withdraw',
    icon: '/static/icons/withdraw.svg',
    color: '#5280FF'
  },
  {
    id: 2,
    name: '充值',
    type: 'recharge',
    icon: '/static/icons/recharge.svg',
    color: '#52c41a'
  }
])

const periodTabs = ref(['今日', '本周', '本月'])
const selectedPeriod = ref(0)
const orderIncome = ref('0.00')
const commissionIncome = ref('0.00')
const promotionIncome = ref('0.00')

const transactionList = ref([])

// 页面加载
onLoad(() => {
  loadAllData()
})

// 页面显示
onShow(() => {
  loadAllData()
})

// 下拉刷新
onPullDownRefresh(() => {
  loadAllData()
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 1000)
})

// 加载所有数据
const loadAllData = () => {
  loadBalanceData()
  loadIncomeData()
  loadTransactionData()
}

// 加载余额数据
const loadBalanceData = async () => {
  try {
    const res = await getBalance()
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      availableBalance.value = (data.available || data.balance || 0).toFixed(2)
      withdrawnAmount.value = (data.withdrawn || data.withdrawnAmount || 0).toFixed(2)
    }
  } catch (error) {
    console.error('加载余额数据失败:', error)
  }
}

// 加载收入数据
const loadIncomeData = async () => {
  try {
    const periodMap = ['today', 'week', 'month']
    const res = await getIncomeDetail({ period: periodMap[selectedPeriod.value] })
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      orderIncome.value = (data.orderIncome || 0).toFixed(2)
      commissionIncome.value = (data.commissionIncome || 0).toFixed(2)
      promotionIncome.value = (data.promotionIncome || 0).toFixed(2)
    }
  } catch (error) {
    console.error('加载收入数据失败:', error)
  }
}

// 加载交易数据
const loadTransactionData = async () => {
  try {
    const res = await getTransactionDetail({ limit: 5 })
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      transactionList.value = list.map(item => ({
        id: item.id,
        title: item.title || item.typeName || '',
        time: item.time || item.createTime || '',
        amount: item.amount || 0
      }))
    }
  } catch (error) {
    console.error('加载交易数据失败:', error)
  }
}

// 选择周期
const selectPeriod = (index) => {
  selectedPeriod.value = index
  loadIncomeData()
}

// 功能按钮点击
const onActionClick = (type) => {
  switch (type) {
    case 'withdraw':
      uni.navigateTo({ url: '/pages/finance/withdraw' })
      break
    case 'recharge':
      uni.navigateTo({ url: '/pages/finance/recharge' })
      break
    default:
      uni.showToast({ title: '功能开发中', icon: 'none' })
  }
}

// 跳转到余额明细
const goToBalanceDetail = () => {
  uni.navigateTo({ url: '/pages/finance/balance-detail' })
}

// 跳转到交易列表
const goToTransactionList = () => {
  uni.navigateTo({ url: '/pages/finance/transaction-list' })
}

// 跳转到交易详情
const goToTransactionDetail = (id) => {
  uni.navigateTo({ url: `/pages/finance/transaction-detail?id=${id}` })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 余额头部 */
.balance-header {
  background: linear-gradient(135deg, #5280FF 0%, #0ea5aa 100%);
  padding: 60rpx 30rpx 80rpx;
}

.header-content {
  color: #fff;
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.title-group {
  display: flex;
  align-items: baseline;
}

.title {
  font-size: 28rpx;
  opacity: 0.9;
}

.unit {
  font-size: 22rpx;
  opacity: 0.7;
  margin-left: 8rpx;
}

.detail-btn {
  font-size: 24rpx;
  opacity: 0.9;
  display: flex;
  align-items: center;
}

.amount-section {
  margin-bottom: 20rpx;
}

.amount {
  font-size: 72rpx;
  font-weight: 600;
}

.detail-section {
  font-size: 24rpx;
  opacity: 0.8;
}

/* 功能列表 */
.action-list {
  background-color: #fff;
  margin: -40rpx 30rpx 30rpx;
  border-radius: 16rpx;
  padding: 0 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.action-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 0;
  border-bottom: 1rpx solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f8f8f8;
  }
}

.action-left {
  display: flex;
  align-items: center;
}

.action-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;

  image {
    width: 40rpx;
    height: 40rpx;
  }
}

.action-name {
  font-size: 30rpx;
  color: #333;
}

.action-right {
  .arrow-icon {
    width: 32rpx;
    height: 32rpx;
    opacity: 0.5;
  }
}

/* 收入概览 */
.income-overview {
  background-color: #fff;
  margin: 0 30rpx 30rpx;
  border-radius: 16rpx;
  padding: 30rpx;
}

.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.overview-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.period-tabs {
  display: flex;
  gap: 16rpx;
}

.period-tab {
  font-size: 24rpx;
  color: #999;
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
  background-color: #f5f5f5;

  &.active {
    background-color: #e6f7f8;
    color: #5280FF;
  }
}

.overview-content {
  display: flex;
  justify-content: space-between;
}

.overview-item {
  flex: 1;
  text-align: center;
}

.item-label {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 12rpx;
}

.item-value {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

/* 交易列表 */
.transaction-section {
  background-color: #fff;
  margin: 0 30rpx 30rpx;
  border-radius: 16rpx;
  padding: 30rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.view-all {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #999;

  .arrow-icon {
    width: 24rpx;
    height: 24rpx;
    margin-left: 8rpx;
    opacity: 0.5;
  }
}

.transaction-list {
  .transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    &:active {
      background-color: #f8f8f8;
    }
  }
}

.transaction-info {
  flex: 1;
}

.transaction-title {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 8rpx;
}

.transaction-time {
  display: block;
  font-size: 24rpx;
  color: #999;
}

.transaction-amount {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;

  &.income {
    color: #52c41a;
  }
}
</style>