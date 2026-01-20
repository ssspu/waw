<template>
  <view class="container">
    <!-- 顶部渐变区域 -->
    <view class="header-section">
      <!-- 佣金余额区域 -->
      <view class="balance-area">
        <view class="balance-header">
          <view class="balance-title">
            <text class="title-text">佣金余额</text>
            <text class="title-unit">（元）</text>
          </view>
          <view class="transfer-btn" @tap="goTransfer">
            <image class="transfer-icon" src="/static/icons/arrow-right@3x.png" mode="aspectFit"></image>
            <text class="transfer-text">转出推广余额</text>
          </view>
        </view>

        <view class="balance-amount">
          <text class="amount-value">{{ formatMoney(commissionBalance) }}</text>
        </view>

        <view class="hint-text">推广优秀商户的项目服务，赚取更多服务佣金</view>
      </view>
    </view>

    <!-- 月度统计卡片 -->
    <view class="stats-card">
      <view class="stats-grid">
        <view class="stats-item">
          <text class="stats-label">本月收益</text>
          <text class="stats-value">¥{{ formatMoney(monthlyData.monthIncome) }}</text>
        </view>
        <view class="stats-item">
          <text class="stats-label">总推广收益</text>
          <text class="stats-value">¥{{ formatMoney(monthlyData.totalIncome) }}</text>
        </view>
        <view class="stats-item">
          <text class="stats-label">总推广数量</text>
          <text class="stats-value">{{ monthlyData.totalCount }}次</text>
        </view>
      </view>
    </view>

    <!-- 收入/支出Tab -->
    <view class="tab-bar">
      <view
        class="tab-item"
        :class="{ active: currentTab === 'income' }"
        @tap="switchTab('income')"
      >
        <text class="tab-text">收入</text>
        <text class="tab-amount">¥{{ formatMoney(tabData.income) }}</text>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 'expense' }"
        @tap="switchTab('expense')"
      >
        <text class="tab-text">支出</text>
        <text class="tab-amount">¥{{ formatMoney(tabData.expense) }}</text>
      </view>
    </view>

    <!-- 筛选栏 -->
    <view class="filter-bar">
      <view class="month-selector" @tap="showMonthPicker">
        <text class="month-text">{{ currentMonth }}</text>
        <image class="dropdown-icon" src="/static/icons/xiala.png" mode="aspectFit"></image>
      </view>
      <view class="summary-info">
        <text class="summary-text">推广次数：{{ filterSummary.count }}</text>
      </view>
    </view>

    <!-- 佣金列表 -->
    <scroll-view
      class="commission-list"
      scroll-y
      @scrolltolower="loadMore"
    >
      <view v-if="commissionList.length > 0">
        <view
          v-for="item in commissionList"
          :key="item.id"
          class="commission-card"
          @tap="goToDetail(item.id)"
        >
          <!-- 服务信息头部 -->
          <view class="service-header">
            <view class="service-info">
              <text class="service-name">{{ item.serviceName }}</text>
              <text class="service-type">{{ item.serviceType }}</text>
            </view>
            <text class="service-price" :class="{ expense: currentTab === 'expense' }">
              {{ currentTab === 'income' ? '+' : '-' }}{{ item.amount.toFixed(2) }}
            </text>
          </view>

          <!-- 分割线 -->
          <view class="divider"></view>

          <!-- 用户信息 -->
          <view class="customer-info">
            <view class="avatar-wrapper">
              <image class="avatar" :src="item.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'" mode="aspectFill"></image>
            </view>
            <view class="customer-details">
              <view class="name-row">
                <text class="customer-name">{{ item.userName }}</text>
                <image class="vip-badge" v-if="item.vipLevel === 'SVIP'" src="/static/icons/svip-badge@3x.png" mode="aspectFit"></image>
                <view class="vip-tag" v-else-if="item.vipLevel === 'VIP'">
                  <text class="vip-text">VIP</text>
                </view>
              </view>
              <text class="order-time">{{ item.time }}</text>
            </view>
            <view class="order-stats">
              <text class="pay-amount">支付价：{{ item.payAmount.toFixed(2) }}</text>
              <text class="confirm-status" v-if="currentTab === 'expense'">已确认分佣</text>
            </view>
          </view>
        </view>
      </view>

      <view v-else class="empty-state">
        <text class="empty-text">暂无{{ currentTab === 'income' ? '收入' : '支出' }}记录</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getAssets, getTransactionDetail } from '@/api'

// 佣金余额
const commissionBalance = ref(0)

// 月度数据
const monthlyData = ref({
  monthIncome: 0,
  totalIncome: 0,
  totalCount: 0
})

// 当前Tab
const currentTab = ref('income')

// Tab数据
const tabData = ref({
  income: 0,
  expense: 0
})

// 筛选相关
const currentMonth = ref('本月')
const filterSummary = ref({
  count: 0
})

// 分页
const page = ref(1)
const pageSize = ref(10)
const hasMore = ref(true)

// 佣金列表数据
const incomeList = ref([])
const expenseList = ref([])

// 当前显示的列表
const commissionList = computed(() => {
  return currentTab.value === 'income' ? incomeList.value : expenseList.value
})

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
  await loadCommissionList()
}

// 加载资产数据
const loadAssetData = async () => {
  try {
    const res = await getAssets()
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      commissionBalance.value = data.commission || data.promotionIncome || 0
      monthlyData.value = {
        monthIncome: data.monthlyCommission || 0,
        totalIncome: data.totalCommission || 0,
        totalCount: data.promotionCount || 0
      }
      tabData.value = {
        income: data.commissionIncome || 0,
        expense: data.commissionExpense || 0
      }
    }
  } catch (error) {
    console.error('加载资产数据失败:', error)
  }
}

// 加载佣金列表
const loadCommissionList = async (isLoadMore = false) => {
  try {
    const params = {
      type: currentTab.value,
      page: page.value,
      pageSize: pageSize.value,
      period: currentMonth.value
    }
    const res = await getTransactionDetail(params)
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      if (currentTab.value === 'income') {
        if (isLoadMore) {
          incomeList.value = [...incomeList.value, ...list]
        } else {
          incomeList.value = list
        }
      } else {
        if (isLoadMore) {
          expenseList.value = [...expenseList.value, ...list]
        } else {
          expenseList.value = list
        }
      }
      hasMore.value = list.length >= pageSize.value
      if (res.data?.summary) {
        filterSummary.value = { count: res.data.summary.count || 0 }
      }
    }
  } catch (error) {
    console.error('加载佣金列表失败:', error)
  }
}

// 转出余额
const goTransfer = () => {
  uni.navigateTo({
    url: `/pages/finance/promotion-transfer?amount=${commissionBalance.value}`
  })
}

// 格式化金额
const formatMoney = (num) => {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 切换Tab
const switchTab = (tab) => {
  currentTab.value = tab
  page.value = 1
  loadCommissionList()
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

// 跳转到详情
const goToDetail = (id) => {
  uni.navigateTo({ url: `/pages/finance/promotion-income-detail?id=${id}` })
}

// 加载更多
const loadMore = () => {
  if (!hasMore.value) return
  page.value++
  loadCommissionList(true)
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

/* 佣金余额区域 */
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

.hint-text {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
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
  padding: 24rpx 0;
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

/* 收入/支出Tab */
.tab-bar {
  display: flex;
  margin: 0 24rpx 24rpx;
  border-radius: 12rpx;
  padding: 8rpx;
  gap: 22rpx;
}

.tab-item {
  width: 270rpx;
  flex: 1;
  display: flex;
  background-color: #F8FAFC;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 32rpx;
  border-radius: 8rpx;
  transition: all 0.3s;

  &.active {
    background-color: #F8FAFF;
    border: 2rpx solid #5280FF;
  }

  &:not(.active) {
    border: 2rpx solid transparent;
  }
}

.tab-text {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.tab-amount {
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
}

.tab-item.active .tab-text,
.tab-item.active .tab-amount {
  color: #5280FF;
}

/* 筛选栏 */
.filter-bar {
  width: 698rpx;
  margin: 0 24rpx 12rpx;
  padding: 0 24rpx;
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

/* 佣金列表 */
.commission-list {
  flex: 1;
  box-sizing: border-box;
}

.commission-card {
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
  color: #5280FF;
  font-weight: 600;

  &.expense {
    color: #F04438;
  }
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

.vip-badge {
  width: 68rpx;
  height: 28rpx;
}

.vip-tag {
  padding: 2rpx 12rpx;
  background-color: #F0F0F0;
  border-radius: 6rpx;
}

.vip-text {
  font-size: 20rpx;
  color: #666;
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

.pay-amount {
  font-size: 26rpx;
  color: #666;
}

.confirm-status {
  font-size: 24rpx;
  color: #999;
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
