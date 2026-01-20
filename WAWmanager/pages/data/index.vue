<template>
  <view class="container">
    <!-- 标签页导航 -->
    <view class="tab-nav">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-item"
        :class="{ active: currentTab === index }"
        @tap="switchTab(index)"
      >
        <text>{{ tab }}</text>
        <view class="tab-indicator" v-if="currentTab === index"></view>
      </view>
    </view>

    <!-- 时间筛选 -->
    <view class="time-filter">
      <view class="time-pills">
        <view
          v-for="(time, index) in timeFilters"
          :key="index"
          class="time-pill"
          :class="{ active: currentTimeFilter === index }"
          @tap="switchTimeFilter(index)"
        >
          <text>{{ time }}</text>
        </view>
      </view>
      <view class="custom-date" @tap="showDatePicker = true">
        <image src="/static/icons/calendar-2-line.png" mode="aspectFit" class="calendar-icon"></image>
        <text>{{ dateRangeText }}</text>
      </view>
    </view>

    <!-- 日期范围选择弹窗 -->
    <view class="date-picker-mask" v-if="showDatePicker" @tap="showDatePicker = false"></view>
    <view class="date-picker-popup" :class="{ show: showDatePicker }">
      <view class="picker-header">
        <text class="picker-cancel" @tap="showDatePicker = false">取消</text>
        <text class="picker-title">选择日期范围</text>
        <text class="picker-confirm" @tap="confirmDateRange">确定</text>
      </view>
      <view class="picker-body">
        <view class="date-type-tabs">
          <view class="date-type-tab" :class="{ active: datePickerType === 'start' }" @tap="datePickerType = 'start'">
            <text>开始: {{ startDate || '请选择' }}</text>
          </view>
          <view class="date-type-tab" :class="{ active: datePickerType === 'end' }" @tap="datePickerType = 'end'">
            <text>结束: {{ endDate || '请选择' }}</text>
          </view>
        </view>
        <picker-view class="date-picker-view" :value="pickerValue" @change="onPickerChange">
          <picker-view-column>
            <view class="picker-item" v-for="year in years" :key="year">{{ year }}年</view>
          </picker-view-column>
          <picker-view-column>
            <view class="picker-item" v-for="month in 12" :key="month">{{ month }}月</view>
          </picker-view-column>
          <picker-view-column>
            <view class="picker-item" v-for="day in 31" :key="day">{{ day }}日</view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>

    <!-- 总览页面 -->
    <scroll-view class="content-scroll" scroll-y v-if="currentTab === 0">
      <!-- 数据统计卡片 -->
      <view class="stats-grid">
        <view class="stats-card">
          <view class="stats-header">
            <image src="/pages/data/static/money-cny-circle-line@3x.png" mode="aspectFit" class="stats-icon"></image>
            <text class="stats-label">总收入</text>
          </view>
          <text class="stats-value">¥{{ overviewData.totalIncome }}</text>
          <view class="stats-compare">
            <text class="compare-label">较上周</text>
            <text class="compare-value" :class="overviewData.incomeChange >= 0 ? 'up' : 'down'">
              {{ overviewData.incomeChange }}%
            </text>
            <image class="compare-arrow" :src="overviewData.incomeChange >= 0 ? '/pages/data/static/up.png' : '/pages/data/static/arrow-up@3x.png'" mode="aspectFit"></image>
          </view>
        </view>

        <view class="stats-card">
          <view class="stats-header">
            <image src="/pages/data/static/file-list-2-line@3x.png" mode="aspectFit" class="stats-icon"></image>
            <text class="stats-label">总订单</text>
          </view>
          <text class="stats-value">{{ overviewData.totalOrders }}</text>
          <view class="stats-compare">
            <text class="compare-label">较上周</text>
            <text class="compare-value" :class="overviewData.ordersChange >= 0 ? 'up' : 'down'">
              {{ Math.abs(overviewData.ordersChange) }}%
            </text>
            <image class="compare-arrow" :src="overviewData.ordersChange >= 0 ? '/pages/data/static/up.png' : '/pages/data/static/arrow-up@3x.png'" mode="aspectFit"></image>
          </view>
        </view>

        <view class="stats-card">
          <view class="stats-header">
            <image src="/pages/data/static/user-add-line@3x.png" mode="aspectFit" class="stats-icon"></image>
            <text class="stats-label">新顾客</text>
          </view>
          <text class="stats-value">{{ overviewData.newCustomers }}</text>
          <view class="stats-compare">
            <text class="compare-label">较上周</text>
            <text class="compare-value" :class="overviewData.customersChange >= 0 ? 'up' : 'down'">
              {{ overviewData.customersChange }}%
            </text>
            <image class="compare-arrow" :src="overviewData.customersChange >= 0 ? '/pages/data/static/up.png' : '/pages/data/static/arrow-up@3x.png'" mode="aspectFit"></image>
          </view>
        </view>

        <view class="stats-card">
          <view class="stats-header">
            <image src="/pages/data/static/refresh-line@3x.png" mode="aspectFit" class="stats-icon"></image>
            <text class="stats-label">复购率</text>
          </view>
          <view class="stats-value-row">
            <text class="stats-value">{{ overviewData.repurchaseRate }}</text>
            <text class="stats-unit">%</text>
          </view>
          <view class="stats-compare">
            <text class="compare-label">较上周</text>
            <text class="compare-value" :class="overviewData.repurchaseChange >= 0 ? 'up' : 'down'">
              {{ overviewData.repurchaseChange }}%
            </text>
            <image class="compare-arrow" :src="overviewData.repurchaseChange >= 0 ? '/pages/data/static/up.png' : '/pages/data/static/arrow-up@3x.png'" mode="aspectFit"></image>
          </view>
        </view>
      </view>

      <!-- 热门服务排行 -->
      <view class="ranking-section">
        <view class="ranking-header">
          <text class="ranking-title">热门服务排行</text>
          <view class="ranking-tabs">
            <view
              class="ranking-tab"
              :class="{ active: rankingType === 'amount' }"
              @tap="rankingType = 'amount'"
            >
              <text>金额排行</text>
            </view>
            <view
              class="ranking-tab"
              :class="{ active: rankingType === 'count' }"
              @tap="rankingType = 'count'"
            >
              <text>次数排行</text>
            </view>
          </view>
        </view>

        <view class="ranking-list">
          <view class="ranking-item" v-for="(item, index) in serviceRanking" :key="item.id">
            <image class="ranking-badge" :src="getRankIcon(index)" mode="aspectFit"></image>
            <view class="ranking-info">
              <text class="ranking-name">{{ item.name }}</text>
              <text class="ranking-count">{{ item.count }}次</text>
            </view>
            <text class="ranking-amount">¥{{ item.amount }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 收入分析页面 -->
    <scroll-view class="content-scroll" scroll-y v-if="currentTab === 1">
      <!-- 收入构成 -->
      <view class="section-card">
        <text class="section-title">收入构成</text>
        <view class="income-header">
          <text class="income-value">¥{{ incomeData.total }}</text>
          <view class="income-change">
            <text class="change-label">较上周</text>
            <text class="change-value up">{{ incomeData.change }}%</text>
            <image class="change-arrow" :src="incomeData.change >= 0 ? '/pages/data/static/up.png' : '/pages/data/static/arrow-up@3x.png'" mode="aspectFit"></image>
          </view>
        </view>
        <!-- 饼图 -->
        <view class="pie-chart-wrapper">
          <view class="pie-chart-css"></view>
        </view>
        <!-- 图例 -->
        <view class="chart-legend">
          <view class="legend-item" v-for="item in incomeData.categories" :key="item.name">
            <view class="legend-dot" :style="{ backgroundColor: item.color }"></view>
            <text class="legend-text">{{ item.name }}</text>
          </view>
        </view>
        <!-- 收入构成列表 -->
        <view class="composition-list">
          <view class="composition-item" v-for="item in incomeData.categories" :key="item.name">
            <view class="composition-dot" :style="{ backgroundColor: item.color, '--dot-color': item.color }"></view>
            <view class="composition-info">
              <text class="composition-name">{{ item.name }}</text>
              <text class="composition-percent">{{ item.percent }}</text>
            </view>
            <text class="composition-amount">¥{{ item.amount }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 客户分析页面 -->
    <scroll-view class="content-scroll" scroll-y v-if="currentTab === 2">
      <!-- 客户数据统计卡片 -->
      <view class="stats-grid">
        <view class="stats-card">
          <view class="stats-header">
            <image src="/pages/data/static/group-line@3x.png" mode="aspectFit" class="stats-icon"></image>
            <text class="stats-label">总客户数</text>
          </view>
          <text class="stats-value">{{ customerData.totalCustomers }}</text>
          <view class="stats-compare">
            <text class="compare-label">较上周</text>
            <text class="compare-value" :class="customerData.totalChange >= 0 ? 'up' : 'down'">
              {{ customerData.totalChange }}%
            </text>
            <image class="compare-arrow" :src="customerData.totalChange >= 0 ? '/pages/data/static/up.png' : '/pages/data/static/arrow-up@3x.png'" mode="aspectFit"></image>
          </view>
        </view>

        <view class="stats-card">
          <view class="stats-header">
            <image src="/pages/data/static/open-arm-line@3x.png" mode="aspectFit" class="stats-icon"></image>
            <text class="stats-label">活跃客户</text>
          </view>
          <text class="stats-value">{{ customerData.activeCustomers }}</text>
          <view class="stats-compare">
            <text class="compare-label">较上周</text>
            <text class="compare-value" :class="customerData.activeChange >= 0 ? 'up' : 'down'">
              {{ Math.abs(customerData.activeChange) }}%
            </text>
            <image class="compare-arrow" :src="customerData.activeChange >= 0 ? '/pages/data/static/up.png' : '/pages/data/static/arrow-up@3x.png'" mode="aspectFit"></image>
          </view>
        </view>

        <view class="stats-card">
          <view class="stats-header">
            <image src="/pages/data/static/user-add-line@3x.png" mode="aspectFit" class="stats-icon"></image>
            <text class="stats-label">新增客户</text>
          </view>
          <text class="stats-value">{{ customerData.newCustomers }}</text>
          <view class="stats-compare">
            <text class="compare-label">较上周</text>
            <text class="compare-value" :class="customerData.newChange >= 0 ? 'up' : 'down'">
              {{ customerData.newChange }}%
            </text>
            <image class="compare-arrow" :src="customerData.newChange >= 0 ? '/pages/data/static/up.png' : '/pages/data/static/arrow-up@3x.png'" mode="aspectFit"></image>
          </view>
        </view>

        <view class="stats-card">
          <view class="stats-header">
            <image src="/pages/data/static/user-unfollow-line@3x.png" mode="aspectFit" class="stats-icon"></image>
            <text class="stats-label">流失客户</text>
          </view>
          <text class="stats-value">{{ customerData.lostCustomers }}</text>
          <view class="stats-compare">
            <text class="compare-label">较上周</text>
            <text class="compare-value" :class="customerData.lostChange >= 0 ? 'up' : 'down'">
              {{ customerData.lostChange }}%
            </text>
            <image class="compare-arrow" :src="customerData.lostChange >= 0 ? '/pages/data/static/up.png' : '/pages/data/static/arrow-up@3x.png'" mode="aspectFit"></image>
          </view>
        </view>
      </view>

      <!-- 客户消费分析 -->
      <view class="ranking-section">
        <view class="ranking-header">
          <text class="ranking-title">客户消费分析</text>
          <view class="ranking-tabs">
            <view
              class="ranking-tab"
              :class="{ active: customerRankingType === 'amount' }"
              @tap="customerRankingType = 'amount'"
            >
              <text>金额排行</text>
            </view>
            <view
              class="ranking-tab"
              :class="{ active: customerRankingType === 'count' }"
              @tap="customerRankingType = 'count'"
            >
              <text>次数排行</text>
            </view>
          </view>
        </view>

        <view class="customer-ranking-list">
          <view class="customer-ranking-item" v-for="item in customerRanking" :key="item.id">
            <image class="customer-avatar" :src="item.avatar" mode="aspectFill"></image>
            <view class="customer-info">
              <view class="customer-name-row">
                <text class="customer-name">{{ item.name }}</text>
                <image v-if="item.vipLevel === 'SVIP'" src="/static/icons/svip-badge@3x.png" mode="aspectFit" class="vip-badge-img"></image>
                <image v-else src="/static/icons/vip.png" mode="aspectFit" class="vip-badge-img"></image>
              </view>
              <text class="customer-count">{{ item.count }}次消费</text>
            </view>
            <text class="customer-amount">¥{{ item.amount }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {
  getOverview,
  getRevenueStats,
  getRevenueComposition,
  getCustomerStats,
  getHotServiceRanking,
  getCustomerConsumptionAnalysis
} from '@/api/modules/statistics'

// 标签页
const tabs = ['总览', '收入分析', '客户分析']
const currentTab = ref(0)

// 时间筛选
const timeFilters = computed(() => {
  if (currentTab.value === 0) {
    return ['今日', '本周', '本月', '本年']
  }
  return ['本周', '本月', '本年']
})
const currentTimeFilter = ref(1)

// 排行类型
const rankingType = ref('amount')
const customerRankingType = ref('amount')

// 总览数据
const overviewData = ref({
  totalIncome: '5,000.00',
  incomeChange: 2.5,
  totalOrders: 128,
  ordersChange: -8.3,
  newCustomers: 26,
  customersChange: 20.3,
  repurchaseRate: 68,
  repurchaseChange: 24.5
})

// 热门服务排行
const serviceRanking = ref([
  { id: 1, name: '精护服务', count: 288, amount: 799 },
  { id: 2, name: '造型设计', count: 126, amount: 488 },
  { id: 3, name: '基础理发', count: 126, amount: 488 },
  { id: 4, name: '染发服务', count: 126, amount: 488 },
  { id: 5, name: '深层护理', count: 126, amount: 488 }
])

// 排名徽章图标
const rankBadgeIcons = [
  '/pages/data/static/total-customers@3x.png',
  '/pages/data/static/active-customers@3x.png',
  '/pages/data/static/new-customers@3x.png',
  '/pages/data/static/lost-customers@3x.png',
  '/pages/data/static/customer-icon-4@3x.png'
]

// 获取排名图标
const getRankIcon = (index) => {
  if (index < 5) {
    return rankBadgeIcons[index]
  }
  // 第6名及以后循环使用第4、5名的图标
  return rankBadgeIcons[3 + (index % 2)]
}

// 收入数据
const incomeData = ref({
  total: '5,000.00',
  change: 20.3,
  categories: [
    { name: '理发服务', percent: '40%', amount: 2000, color: '#5B8FF9' },
    { name: '美发造型', percent: '30%', amount: 1500, color: '#F46A6A' },
    { name: '护理项目', percent: '15%', amount: 750, color: '#B8A9C9' },
    { name: '产品销售', percent: '15%', amount: 750, color: '#5AD8A6' }
  ]
})

// 客户数据
const customerData = ref({
  totalCustomers: 588,
  totalChange: 2.5,
  activeCustomers: 128,
  activeChange: -8.3,
  newCustomers: 26,
  newChange: 20.3,
  lostCustomers: 68,
  lostChange: 24.5
})

// 客户消费排行
const customerRanking = ref([
  { id: 1, name: '魏莹玲', avatar: '/static/images/avatar1.png', vipLevel: 'SVIP', count: 24, amount: '1,799' },
  { id: 2, name: '马菲菲', avatar: '/static/images/avatar2.png', vipLevel: 'SVIP', count: 13, amount: '888' },
  { id: 3, name: '李思思', avatar: '/static/images/avatar3.png', vipLevel: 'VIP', count: 8, amount: '499' }
])

// 页面加载
onLoad(() => {
  loadOverviewData()
  loadServiceRanking()
})

// 获取时间周期参数
const getPeriodParam = () => {
  const filters = timeFilters.value
  const index = currentTimeFilter.value
  if (index < 0 || index >= filters.length) return 'week'
  const map = { '今日': 'today', '本周': 'week', '本月': 'month', '本年': 'year' }
  return map[filters[index]] || 'week'
}

// 加载总览数据
const loadOverviewData = async () => {
  try {
    const period = getPeriodParam()
    const res = await getOverview({ period })
    if (res) {
      overviewData.value = {
        totalIncome: res.totalIncome || '0.00',
        incomeChange: res.incomeChange || 0,
        totalOrders: res.totalOrders || 0,
        ordersChange: res.ordersChange || 0,
        newCustomers: res.newCustomers || 0,
        customersChange: res.customersChange || 0,
        repurchaseRate: res.repurchaseRate || 0,
        repurchaseChange: res.repurchaseChange || 0
      }
    }
  } catch (e) {
    console.log('加载总览数据失败', e)
  }
}

// 加载热门服务排行
const loadServiceRanking = async () => {
  try {
    const period = getPeriodParam()
    const res = await getHotServiceRanking({ period, limit: 5 })
    if (res && res.list) {
      serviceRanking.value = res.list
    }
  } catch (e) {
    console.log('加载服务排行失败', e)
  }
}

// 加载收入数据
const loadIncomeData = async () => {
  try {
    const period = getPeriodParam()
    const [statsRes, compositionRes] = await Promise.all([
      getRevenueStats({ period }),
      getRevenueComposition({ period })
    ])
    if (statsRes) {
      incomeData.value.total = statsRes.total || '0.00'
      incomeData.value.change = statsRes.change || 0
    }
    if (compositionRes && compositionRes.categories) {
      incomeData.value.categories = compositionRes.categories
    }
  } catch (e) {
    console.log('加载收入数据失败', e)
  }
}

// 加载客户数据
const loadCustomerData = async () => {
  try {
    const period = getPeriodParam()
    const res = await getCustomerStats({ period })
    if (res) {
      customerData.value = {
        totalCustomers: res.totalCustomers || 0,
        totalChange: res.totalChange || 0,
        activeCustomers: res.activeCustomers || 0,
        activeChange: res.activeChange || 0,
        newCustomers: res.newCustomers || 0,
        newChange: res.newChange || 0,
        lostCustomers: res.lostCustomers || 0,
        lostChange: res.lostChange || 0
      }
    }
  } catch (e) {
    console.log('加载客户数据失败', e)
  }
}

// 加载客户消费排行
const loadCustomerRanking = async () => {
  try {
    const period = getPeriodParam()
    const res = await getCustomerConsumptionAnalysis({ period })
    if (res && res.ranking) {
      customerRanking.value = res.ranking
    }
  } catch (e) {
    console.log('加载客户排行失败', e)
  }
}

// 切换标签页
const switchTab = (index) => {
  currentTab.value = index
  currentTimeFilter.value = currentTab.value === 0 ? 1 : 0
  loadTabData()
}

// 切换时间筛选
const switchTimeFilter = (index) => {
  currentTimeFilter.value = index
  loadTabData()
}

// 根据当前 Tab 加载数据
const loadTabData = () => {
  if (currentTab.value === 0) {
    loadOverviewData()
    loadServiceRanking()
  } else if (currentTab.value === 1) {
    loadIncomeData()
  } else if (currentTab.value === 2) {
    loadCustomerData()
    loadCustomerRanking()
  }
}

// 日期范围选择
const showDatePicker = ref(false)
const startDate = ref('')
const endDate = ref('')
const datePickerType = ref('start') // 'start' 或 'end'

// 年份列表
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)

// picker-view 的值
const pickerValue = ref([5, new Date().getMonth(), new Date().getDate() - 1])

// 日期范围显示文本
const dateRangeText = computed(() => {
  if (startDate.value && endDate.value) {
    return `${startDate.value.slice(5)} ~ ${endDate.value.slice(5)}`
  }
  return '自定'
})

// picker 值变化
const onPickerChange = (e) => {
  const val = e.detail.value
  const year = years[val[0]]
  const month = String(val[1] + 1).padStart(2, '0')
  const day = String(val[2] + 1).padStart(2, '0')
  const dateStr = `${year}-${month}-${day}`

  if (datePickerType.value === 'start') {
    startDate.value = dateStr
  } else {
    endDate.value = dateStr
  }
}

// 确认日期范围
const confirmDateRange = () => {
  if (!startDate.value || !endDate.value) {
    uni.showToast({ title: '请选择完整日期', icon: 'none' })
    return
  }
  if (new Date(startDate.value) > new Date(endDate.value)) {
    uni.showToast({ title: '开始日期不能大于结束日期', icon: 'none' })
    return
  }
  currentTimeFilter.value = -1
  showDatePicker.value = false
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  display: flex;
  flex-direction: column;
}

// 标签导航
.tab-nav {
  width: 100%;
  display: flex;
  background-color: #fff;
  padding: 0 40rpx;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28rpx 0;
  position: relative;

  text {
    font-size: 30rpx;
    color: #333;
  }

  &.active {
    text {
      color: #5B8FF9;
      font-weight: 500;
    }
  }
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  width: 44rpx;
  height: 6rpx;
  background-color: #5B8FF9;
  border-radius: 3rpx;
}

// 时间筛选
.time-filter {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 24rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #F0F0F0;
  box-sizing: border-box;
}

.time-pills {
  display: flex;
  gap: 16rpx;
}

.time-pill {
  padding: 8rpx 32rpx;
  border-radius: 36rpx;
  background-color: #F5F7FA;

  text {
    font-size: 26rpx;
    color: #333;
  }

  &.active {
    background-color: #5B8FF9;

    text {
      color: #fff;
    }
  }
}

.custom-date {
  display: flex;
  align-items: center;
  gap: 8rpx;

  .calendar-icon {
    width: 32rpx;
    height: 32rpx;
  }

  text {
    font-size: 26rpx;
    color: #333;
  }
}

// 日期范围选择弹窗
.date-picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.date-picker-popup {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  z-index: 1000;
  transform: translateY(100%);
  transition: transform 0.3s ease;

  &.show {
    transform: translateY(0);
  }
}

.picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 32rpx;
  border-bottom: 1rpx solid #F0F0F0;
}

.picker-cancel {
  font-size: 28rpx;
  color: #999;
}

.picker-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.picker-confirm {
  font-size: 28rpx;
  color: #5B8FF9;
  font-weight: 500;
}

.picker-body {
  padding: 0 32rpx 32rpx;
}

.date-type-tabs {
  display: flex;
  gap: 20rpx;
  padding: 24rpx 0;
}

.date-type-tab {
  flex: 1;
  padding: 20rpx;
  background-color: #F5F7FA;
  border-radius: 12rpx;
  text-align: center;
  border: 2rpx solid transparent;

  text {
    font-size: 26rpx;
    color: #666;
  }

  &.active {
    background-color: #EBF3FF;
    border-color: #5B8FF9;

    text {
      color: #5B8FF9;
    }
  }
}

.date-picker-view {
  height: 400rpx;
}

.picker-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #333;
}

// 内容滚动区
.content-scroll {
  flex: 1;
  padding: 24rpx;
}

// 数据统计卡片
.stats-grid {
  margin: 24rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.stats-card {
  width: calc(50% - 10rpx);
  background-color: #fff;
  border-radius: 16rpx;
  padding: 28rpx 24rpx;
  box-sizing: border-box;
}

.stats-header {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 16rpx;
}

.stats-icon {
  width: 36rpx;
  height: 36rpx;
}

.stats-label {
  font-size: 26rpx;
  color: #666;
}

.stats-value {
  font-size: 52rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 12rpx;
  font-family: DIN Alternate, -apple-system, sans-serif;
}

.stats-value-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 12rpx;

  .stats-value {
    margin-bottom: 0;
  }

  .stats-unit {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
    margin-left: 4rpx;
  }
}

.stats-compare {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.compare-label {
  font-size: 24rpx;
  color: #999;
}

.compare-value {
  font-size: 24rpx;

  &.up {
    color: #52C41A;
  }

  &.down {
    color: #FF4D4F;
  }
}

.compare-arrow {
  width: 24rpx;
  height: 24rpx;
}

// 排行榜区域
.ranking-section {
  margin: 24rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 28rpx 24rpx;
}

.ranking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28rpx;
}

.ranking-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.ranking-tabs {
  display: flex;
  background-color: #F5F7FA;
  border-radius: 8rpx;
  overflow: hidden;
}

.ranking-tab {
  padding: 14rpx 24rpx;

  text {
    font-size: 24rpx;
    color: #666;
  }

  &.active {
    background-color: #5B8FF9;

    text {
      color: #fff;
    }
  }
}

.ranking-list {
  display: flex;
  flex-direction: column;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 28rpx 0;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }
}

.ranking-badge {
  width: 44rpx;
  height: 44rpx;
  margin-right: 24rpx;
}

.ranking-info {
  flex: 1;

  .ranking-name {
    font-size: 30rpx;
    color: #333;
    font-weight: 500;
    display: block;
    margin-bottom: 8rpx;
  }

  .ranking-count {
    font-size: 24rpx;
    color: #999;
  }
}

.ranking-amount {
  font-size: 40rpx;
  color: #FF9500;
  font-weight: 600;
  font-family: DIN Alternate, -apple-system, sans-serif;
}

// 收入分析页面
.section-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 28rpx 24rpx;
  margin: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 24rpx;
}

.income-header {
  padding: 24rpx;
  background-color: #F8FAFC;
  display: flex;
  align-items: baseline;
  gap: 20rpx;
  border-radius: 12rpx;
}

.income-value {
  font-size: 56rpx;
  font-weight: 600;
  color: #5B8FF9;
  font-family: DIN Alternate, -apple-system, sans-serif;
}

.income-change {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.change-label {
  font-size: 24rpx;
  color: #999;
}

.change-value {
  font-size: 24rpx;

  &.up {
    color: #52C41A;
  }

  &.down {
    color: #FF4D4F;
  }
}

.change-arrow {
  width: 24rpx;
  height: 24rpx;
}

// 饼图
.pie-chart-wrapper {
  background-color: #F8FAFC;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40rpx 0;
  margin-bottom: 32rpx;
  border-radius: 0 0 12rpx 12rpx;
}

.pie-chart-css {
  width: 280rpx;
  height: 280rpx;
  border-radius: 50%;
  background: conic-gradient(
    #5B8FF9 0deg 144deg,
    #F46A6A 144deg 252deg,
    #B8A9C9 252deg 306deg,
    #5AD8A6 306deg 360deg
  );
  position: relative;
}

.pie-chart-css::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120rpx;
  height: 120rpx;
  background-color: #F8FAFC;
  border-radius: 50%;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 40rpx;
  flex-wrap: wrap;
  padding-bottom: 40rpx;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.legend-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
}

.legend-text {
  font-size: 24rpx;
  color: #666;
}

// 收入构成列表
.composition-list {
  display: flex;
  flex-direction: column;
}

.composition-item {
  display: flex;
  align-items: center;
  padding: 28rpx 0;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }
}

.composition-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  position: relative;
}

.composition-dot::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background-color: var(--dot-color);
  opacity: 0.2;
}

.composition-info {
  flex: 1;

  .composition-name {
    font-size: 30rpx;
    color: #333;
    font-weight: 500;
    display: block;
    margin-bottom: 8rpx;
  }

  .composition-percent {
    font-size: 24rpx;
    color: #999;
  }
}

.composition-amount {
  font-size: 40rpx;
  color: #FF9500;
  font-weight: 600;
  font-family: DIN Alternate, -apple-system, sans-serif;
}

// 客户排行列表
.customer-ranking-list {
  display: flex;
  flex-direction: column;
}

.customer-ranking-item {
  display: flex;
  align-items: center;
  padding: 28rpx 0;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }
}

.customer-avatar {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  background-color: #f5f5f5;
}

.customer-info {
  flex: 1;
}

.customer-name-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 10rpx;
}

.customer-name {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}

.vip-badge-img {
  width: 64rpx;
  height: 28rpx;
  margin-left: 8rpx;
}

.customer-count {
  font-size: 24rpx;
  color: #999;
}

.customer-amount {
  font-size: 40rpx;
  color: #FF9500;
  font-weight: 600;
  font-family: DIN Alternate, -apple-system, sans-serif;
}
</style>
