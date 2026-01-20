<template>
  <view class="container">
    <!-- Tab栏 -->
    <view class="tabs-container">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-item"
        :class="{ active: currentTab === index }"
        @tap="switchTab(index)"
      >
        <text class="tab-name">{{ tab.name }}</text>
        <text class="tab-count">{{ tab.count }}笔</text>
      </view>
    </view>

    <!-- 交易记录列表 -->
    <scroll-view
      class="record-list"
      scroll-y
      :style="{ height: scrollHeight + 'px' }"
      @scrolltolower="loadMore"
    >
      <view v-if="recordList.length > 0">
        <view
          v-for="item in filteredRecords"
          :key="item.id"
          class="record-item"
          @tap="goToDetail(item.id)"
        >
          <view class="record-info">
            <text class="record-type">{{ item.type }}</text>
            <view class="record-meta">
              <text class="record-balance">余额: {{ item.balance }}</text>
            </view>
          </view>
          <view class="record-right">
            <text class="record-time">{{ item.time }}</text>
            <text class="record-amount" :class="{ income: item.amount > 0, expense: item.amount < 0 }">
              {{ item.amount > 0 ? '+' : '' }}{{ item.amount.toFixed(2) }}
            </text>
          </view>
        </view>
      </view>

      <view v-else class="empty-state">
        <text class="empty-text">暂无记录</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getBalanceDetail } from '@/api'

// 滚动区域高度
const scrollHeight = ref(600)

// Tab数据
const tabs = ref([
  { name: '全部', count: 0, type: 'all' },
  { name: '提现', count: 0, type: 'withdraw' },
  { name: '充值', count: 0, type: 'recharge' },
  { name: '支付', count: 0, type: 'payment' }
])

const currentTab = ref(0)

// 记录列表
const recordList = ref([])

// 根据Tab筛选记录
const filteredRecords = computed(() => {
  const tabType = tabs.value[currentTab.value].type
  if (tabType === 'all') {
    return recordList.value
  }
  return recordList.value.filter(item => item.category === tabType)
})

// 页面加载
onLoad(() => {
  const systemInfo = uni.getSystemInfoSync()
  // 计算滚动区域高度
  scrollHeight.value = systemInfo.windowHeight - 100
  loadRecordData()
})

// 加载记录数据
const loadRecordData = async () => {
  try {
    const res = await getBalanceDetail()
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      recordList.value = list.map(item => ({
        id: item.id,
        type: item.type || item.typeName || '',
        balance: item.balance || '0',
        time: item.time || item.createTime || '',
        amount: item.amount || 0,
        category: item.category || item.type || ''
      }))
      // 更新Tab统计
      updateTabCounts()
    }
  } catch (error) {
    console.error('加载余额明细失败:', error)
  }
}

// 更新Tab统计数量
const updateTabCounts = () => {
  tabs.value[0].count = recordList.value.length
  tabs.value[1].count = recordList.value.filter(i => i.category === 'withdraw').length
  tabs.value[2].count = recordList.value.filter(i => i.category === 'recharge').length
  tabs.value[3].count = recordList.value.filter(i => i.category === 'payment').length
}

// 切换Tab
const switchTab = (index) => {
  currentTab.value = index
}

// 加载更多
const loadMore = () => {
  console.log('加载更多数据')
}

// 跳转到详情
const goToDetail = (id) => {
  uni.navigateTo({ url: `/pages/finance/transaction-detail?id=${id}` })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #EDF0F4;
}

/* Tab栏 */
.tabs-container {
  width: 100%;
  display: flex;
  background-color: #fff;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #F5F5F5;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  position: relative;

  &.active {
    .tab-name {
      color: #5280FF;
    }
    .tab-count {
      color: #5280FF;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -24rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 48rpx;
      height: 4rpx;
      background-color: #5280FF;
      border-radius: 2rpx;
    }
  }
}

.tab-name {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}

.tab-count {
  font-size: 24rpx;
  color: #999;
}



.record-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin  : 24rpx;

  &:active {
    opacity: 0.8;
  }
}

.record-info {
  flex: 1;
}

.record-type {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}

.record-meta {
  display: flex;
  align-items: center;
}

.record-balance {
  font-size: 26rpx;
  color: #999;
}

.record-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16rpx;
}

.record-time {
  font-size: 26rpx;
  color: #999;
}

.record-amount {
  font-size: 36rpx;
  font-weight: 600;

  &.income {
    color: #4CD964;
  }

  &.expense {
    color: #FF4D4F;
  }
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
