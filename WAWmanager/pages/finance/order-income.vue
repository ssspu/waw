<template>
  <view class="container">
    <!-- 顶部渐变区域 -->
    <view class="header-section">
      <!-- 订单余额区域 -->
      <view class="balance-area">
        <view class="balance-header">
          <view class="balance-title">
            <text class="title-text">订单余额</text>
            <text class="title-unit">（元）</text>
          </view>
          <view class="transfer-btn" @tap="goTransfer">
            <image class="transfer-icon" src="/static/icons/arrow-right@3x.png" mode="aspectFit"></image>
            <text class="transfer-text">转出订单余额</text>
          </view>
        </view>

        <view class="balance-amount">
          <text class="amount-value">{{ formatMoney(orderBalance) }}</text>
        </view>

        <view class="stats-row">
          <view class="stat-item">
            <text class="stat-label">订单总收入：</text>
            <text class="stat-value">{{ formatMoney(totalIncome) }} 元</text>
          </view>
          <view class="stat-item">
            <text class="stat-label">订单总数：</text>
            <text class="stat-value">{{ totalOrders }} 单</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 月度统计卡片 -->
    <view class="stats-card">
      <view class="stats-grid">
        <view class="stats-item">
          <text class="stats-label">本月订单</text>
          <text class="stats-value">¥{{ formatMoney(monthlyData.orderAmount) }}</text>
        </view>
        <view class="stats-item">
          <text class="stats-label">分销金额</text>
          <text class="stats-value">¥{{ formatMoney(monthlyData.distributionAmount) }}</text>
        </view>
        <view class="stats-item">
          <text class="stats-label">分销单数</text>
          <text class="stats-value">{{ monthlyData.distributionCount }}单</text>
        </view>
      </view>
    </view>

    <!-- 筛选栏 -->
    <view class="filter-bar">
      <view class="month-selector" @tap="showMonthPicker">
        <text class="month-text">{{ currentMonth }}</text>
        <image class="dropdown-icon" src="/static/icons/xiala.png" mode="aspectFit"></image>
      </view>
      <view class="summary-info">
        <text class="summary-text">收入：¥{{ filterSummary.income }}</text>
        <text class="summary-text">订单数：{{ filterSummary.count }}</text>
      </view>
    </view>

    <!-- 订单列表 -->
    <scroll-view
      class="order-list"
      scroll-y
      @scrolltolower="loadMore"
    >
      <view v-if="orderList.length > 0">
        <view
          v-for="order in orderList"
          :key="order.id"
          class="order-card"
          @tap="goToOrderDetail(order.id)"
        >
          <!-- 服务信息头部 -->
          <view class="service-header">
            <view class="service-info">
              <text class="service-name">{{ order.serviceName }}</text>
              <text class="service-type">{{ order.serviceType }}</text>
            </view>
            <text class="service-price">+{{ order.amount.toFixed(2) }}</text>
          </view>

          <!-- 分割线 -->
          <view class="divider"></view>

          <!-- 用户信息 -->
          <view class="customer-info">
            <view class="avatar-wrapper">
              <image class="avatar" :src="order.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'" mode="aspectFill"></image>
            </view>
            <view class="customer-details">
              <view class="name-row">
                <text class="customer-name">{{ order.userName }}</text>
                <image class="svip-badge" v-if="order.vipLevel === 'SVIP'" src="/static/icons/svip-badge@3x.png" mode="aspectFit"></image>
              </view>
              <text class="order-time">{{ order.time }}</text>
            </view>
            <view class="order-stats">
              <text class="order-count">{{ order.orderCount }}单</text>
              <text class="distribution-amount" v-if="order.distributionAmount">分销-{{ order.distributionAmount.toFixed(2) }}</text>
            </view>
          </view>
        </view>
      </view>

      <view v-else class="empty-state">
        <text class="empty-text">暂无订单记录</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getIncomeDetail, getAssets } from '@/api'

// 订单余额
const orderBalance = ref(0)
const totalIncome = ref(0)
const totalOrders = ref(0)

// 月度数据
const monthlyData = ref({
  orderAmount: 0,
  distributionAmount: 0,
  distributionCount: 0
})

// 筛选相关
const currentMonth = ref('本月')
const filterSummary = ref({
  income: '0',
  count: 0
})

// 分页
const page = ref(1)
const pageSize = ref(10)
const hasMore = ref(true)

// 订单列表
const orderList = ref([])

// 页面加载
onLoad(() => {
  loadData()
})

// 页面显示
onShow(() => {
  loadData()
})

// 加载数据
const loadData = async () => {
  await loadAssetData()
  await loadOrderList()
}

// 加载资产数据
const loadAssetData = async () => {
  try {
    const res = await getAssets()
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      orderBalance.value = data.orderIncome || data.income || 0
      totalIncome.value = data.totalOrderIncome || data.totalIncome || 0
      totalOrders.value = data.totalOrders || data.orderCount || 0
      monthlyData.value = {
        orderAmount: data.monthlyOrderAmount || 0,
        distributionAmount: data.monthlyDistribution || 0,
        distributionCount: data.monthlyDistributionCount || 0
      }
    }
  } catch (error) {
    console.error('加载资产数据失败:', error)
  }
}

// 加载订单列表
const loadOrderList = async (isLoadMore = false) => {
  try {
    const params = {
      page: page.value,
      pageSize: pageSize.value,
      period: currentMonth.value
    }
    const res = await getIncomeDetail(params)
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      if (isLoadMore) {
        orderList.value = [...orderList.value, ...list]
      } else {
        orderList.value = list
      }
      hasMore.value = list.length >= pageSize.value
      // 更新筛选汇总
      if (res.data?.summary) {
        filterSummary.value = {
          income: res.data.summary.income || '0',
          count: res.data.summary.count || 0
        }
      }
    }
  } catch (error) {
    console.error('加载订单列表失败:', error)
  }
}

// 转出余额
const goTransfer = () => {
  uni.navigateTo({
    url: `/pages/finance/order-transfer?amount=${orderBalance.value}`
  })
}

// 格式化金额
const formatMoney = (num) => {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 显示月份选择
const showMonthPicker = () => {
  uni.showActionSheet({
    itemList: ['本月', '上月', '近三月', '近半年', '全部'],
    success: (res) => {
      const options = ['本月', '上月', '近三月', '近半年', '全部']
      currentMonth.value = options[res.tapIndex]
    }
  })
}

// 跳转到订单详情
const goToOrderDetail = (id) => {
  uni.navigateTo({ url: `/pages/finance/order-income-detail?id=${id}` })
}

// 加载更多
const loadMore = () => {
  if (!hasMore.value) return
  page.value++
  loadOrderList(true)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #EDF0F4;
  display: flex;
  flex-direction: column;
}

/* 顶部渐变区域 */
.header-section {
  width: 100%;
  background: linear-gradient(135deg, #7D7CE3 0%, #3CA4FC 100%);
  padding-bottom: 60rpx;
}

/* 订单余额区域 */
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

.stats-row {
  display: flex;
  gap: 48rpx;
}

.stat-item {
  display: flex;
  align-items: center;
}

.stat-label {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

.stat-value {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
}

/* 月度统计卡片 */
.stats-card {
  margin: -30rpx 24rpx 24rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.stats-grid {
  display: flex;
  justify-content: space-between;
}

.stats-item {
  width: 204rpx;
  text-align: center;
  padding: 24rpx 0  ;
  background-color: #F8F9FC;
  border-radius: 12rpx;
  margin-right: 16rpx;

  &:last-child {
    margin-right: 0;
  }
}

.stats-label {
  display: block;
  font-size: 24rpx;
  color: #666;
  margin-bottom: 12rpx;
}

.stats-value {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

/* 筛选栏 */
.filter-bar {
  gap: 180rpx;
  margin: 12rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.month-selector {
  display: flex;
  align-items: center;
  height: 64rpx;
  gap: 44rpx;
  padding: 0rpx 24rpx;
  background-color: #fff;
  border: 1rpx solid #E5E5E5;
  border-radius: 8rpx;

  &:active {
    background-color: #F8F9FC;
  }
}

.month-text {
  font-size: 28rpx;
  color: #5280FF;
  font-weight: 500;
}

.dropdown-icon {
  width: 24rpx;
  height: 24rpx;
}

.summary-info {
  display: flex;
  gap: 32rpx;
}

.summary-text {
  font-size: 26rpx;
  color: #666;
}

/* 订单列表 */
.order-list {
  flex: 1;
  box-sizing: border-box;
}

.order-card {
  background-color: #fff;
  border-radius: 16rpx;
  margin: 24rpx;
  overflow: hidden;

  &:active {
    opacity: 0.9;
  }
}

// 服务头部
.service-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24rpx 24rpx 16rpx;
}

.service-info {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.service-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.service-type {
  font-size: 26rpx;
  color: #999;
}

.service-price {
  font-size: 32rpx;
  color: #5280FF  ;
  font-weight: 600;
}

.divider {
  height: 1rpx;
  background-color: #F5F5F5;
  margin: 0 24rpx;
}

// 用户信息
.customer-info {
  display: flex;
  align-items: center;
  padding: 20rpx 24rpx 24rpx;
}

.avatar-wrapper {
  width: 80rpx;
  height: 80rpx;
  margin-right: 16rpx;
  flex-shrink: 0;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}

.customer-details {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.customer-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-right: 12rpx;
}

.svip-badge {
  width: 68rpx;
  height: 28rpx;
}

.order-time {
  font-size: 24rpx;
  color: #999;
}

.order-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8rpx;
}

.order-count {
  font-size: 26rpx;
  color: #666;
}

.distribution-amount {
  font-size: 24rpx;
  color: #F04438;
}

/* 空状态 */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120rpx 0;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>
