<template>
  <view class="container">
    <!-- 内容区域 -->
    <view class="content">
      <!-- 统计卡片 -->
      <view class="stats-section">
        <view class="stats-card today-card">
          <image class="stats-icon" src="/static/icons/profile.png" mode="aspectFit"></image>
          <view class="stats-info">
            <text class="stats-number">{{ todayVisitors }}</text>
            <text class="stats-label">今日访客人数</text>
          </view>
        </view>
        <view class="stats-card total-card">
          <image class="stats-icon" src="/pages/visitor/static/people.png" mode="aspectFit"></image>
          <view class="stats-info">
            <text class="stats-number">{{ formatNumber(totalVisitors) }}</text>
            <text class="stats-label">总访客人数</text>
          </view>
        </view>
      </view>

      <!-- 访客列表 -->
      <view class="visitor-section">
        <text class="section-title">访客列表</text>

        <view class="visitor-list">
          <view
            class="visitor-card"
            v-for="(visitor, index) in visitorList"
            :key="index"
          >
            <view class="visitor-avatar-wrapper">
              <image class="visitor-avatar" :src="visitor.avatar" mode="aspectFill"></image>
            </view>
            <view class="visitor-info">
              <view class="visitor-name-row">
                <text class="visitor-name">{{ visitor.name }}</text>
                <image
                  v-if="visitor.vipType === 'svip'"
                  class="vip-badge"
                  src="/static/icons/svip-badge@3x.png"
                  mode="aspectFit"
                ></image>
                <image
                  v-else-if="visitor.vipType === 'vip'"
                  class="vip-badge"
                  src="/static/icons/vip.png"
                  mode="aspectFit"
                ></image>
                <text class="visit-time">{{ formatVisitTime(visitor.visitTime) }}</text>
              </view>
              <view class="visitor-stats">
                <text class="rating">{{ visitor.rating }}</text>
                <image class="star-icon" src="/static/icons/start.png" mode="aspectFit"></image>
                <text class="booking-count">({{ visitor.bookingCount }}次预约)</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 底部提示 -->
        <view class="list-footer" v-if="visitorList.length > 0">
          <text>暂时没有更多了～</text>
        </view>

        <!-- 空状态 -->
        <view class="empty-state" v-if="visitorList.length === 0">
          <image class="empty-icon" src="/static/icons/empty.png" mode="aspectFit"></image>
          <text class="empty-text">暂无访客记录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {
  getVisitorList,
  getVisitorStats,
  getTodayVisitorCount
} from '@/api/modules/visitor'

// 统计数据
const todayVisitors = ref(0)
const totalVisitors = ref(0)

// 访客列表
const visitorList = ref([])

// 页面加载
onLoad(() => {
  loadVisitorData()
})

// 加载访客数据
const loadVisitorData = async () => {
  try {
    // 并行加载统计数据和列表数据
    const [todayRes, statsRes, listRes] = await Promise.all([
      getTodayVisitorCount(),
      getVisitorStats({}),
      getVisitorList({ page: 1, pageSize: 50 })
    ])

    if (todayRes && todayRes.count !== undefined) {
      todayVisitors.value = todayRes.count
    }

    if (statsRes && statsRes.totalVisitors !== undefined) {
      totalVisitors.value = statsRes.totalVisitors
    }

    if (listRes && listRes.list) {
      visitorList.value = listRes.list.map(item => ({
        id: item.id,
        name: item.userName || '访客',
        avatar: item.userAvatar || '/static/images/avatar1.png',
        vipType: item.vipType || '',
        rating: item.rating || 0,
        bookingCount: item.bookingCount || 0,
        visitTime: new Date(item.visitTime)
      }))
    }
  } catch (e) {
    console.log('加载访客数据失败', e)
  }
}

// 格式化数字（千分位）
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 格式化访问时间
const formatVisitTime = (time) => {
  const now = new Date()
  const visitDate = new Date(time)

  const isToday =
    visitDate.getFullYear() === now.getFullYear() &&
    visitDate.getMonth() === now.getMonth() &&
    visitDate.getDate() === now.getDate()

  const hours = visitDate.getHours().toString().padStart(2, '0')
  const minutes = visitDate.getMinutes().toString().padStart(2, '0')

  if (isToday) {
    return `今天 ${hours}:${minutes}`
  }

  const year = visitDate.getFullYear()
  const month = (visitDate.getMonth() + 1).toString().padStart(2, '0')
  const day = visitDate.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 跳转到访客详情
const goToVisitorDetail = (visitor) => {
  uni.navigateTo({
    url: `/pages/customer/profile?id=${visitor.id}`
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

// 导航栏
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f5f7fa;
  z-index: 100;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
  padding: 0 30rpx;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  width: 32rpx;
  height: 32rpx;
}

.navbar-title {
  font-size: 34rpx;
  font-weight: 500;
  color: #333;
}

.navbar-placeholder {
  width: 60rpx;
}

// 内容区域
.content {
  padding: 24rpx;
}

// 统计卡片
.stats-section {
  display: flex;
  gap: 20rpx;
  margin-bottom: 32rpx;
}

.stats-card {
width: 344rpx;
height: 144rpx;
  flex: 1;
  display: flex;
  align-items: center;
  border-radius: 16rpx;
  gap: 16rpx;
}

.today-card {
  background: linear-gradient(135deg, #E8F4FD 0%, #D4E8FB 100%);
}

.total-card {
  background: linear-gradient(135deg, #F3E8FD 0%, #E8D4FB 100%);
}

.stats-icon {
  width: 80rpx;
  height: 80rpx;
}

.stats-info {
  display: flex;
  flex-direction: column;
}

.stats-number {
  font-size: 44rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.2;
}

.stats-label {
  font-size: 24rpx;
  color: #666;
  margin-top: 4rpx;
}

// 访客列表区域
.visitor-section {
  border-radius: 16rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
  display: block;
}

.visitor-list {
  display: flex;
  flex-direction: column;
}

.visitor-card {
  border-radius: 16rpx;
  margin-bottom: 12rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 24rpx;
  border-bottom: 1rpx solid #f5f5f5;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f9f9f9;
  }
}

.visitor-avatar-wrapper {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 20rpx;
}

.visitor-avatar {
  width: 100%;
  height: 100%;
}

.visitor-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.visitor-name-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.visitor-name {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
}

.vip-badge {
  width: 60rpx;
  height: 28rpx;
}

.visit-time {
  margin-left: auto;
  font-size: 24rpx;
  color: #999;
}

.visitor-stats {
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.rating {
  font-size: 26rpx;
  color: #FF9500;
  font-weight: 500;
}

.star-icon {
  width: 28rpx;
  height: 28rpx;
}

.booking-count {
  font-size: 26rpx;
  color: #999;
}

// 底部提示
.list-footer {
  display: flex;
  justify-content: center;
  padding: 32rpx 0 16rpx;

  text {
    font-size: 26rpx;
    color: #999;
  }
}

// 空状态
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 0;
}

.empty-icon {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 24rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>
