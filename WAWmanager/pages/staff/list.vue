<template>
  <view class="container">
    <!-- 顶部Tab栏 -->
    <view class="tab-header">
      <view
        class="tab-item"
        :class="{ active: currentTab === 'active' }"
        @tap="switchTab('active')"
      >
        <text>已启用</text>
        <view class="tab-indicator" v-if="currentTab === 'active'"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 'inactive' }"
        @tap="switchTab('inactive')"
      >
        <text>已停用</text>
        <view class="tab-indicator" v-if="currentTab === 'inactive'"></view>
      </view>
      <view class="add-btn" @tap="addStaff">
        <view class="add-btn-inner">
          <text class="add-icon">+</text>
        </view>
      </view>
    </view>

    <!-- 员工列表 -->
    <view class="list-section">
      <view
        v-for="item in displayList"
        :key="item.id"
        class="staff-card"
        :class="{ disabled: currentTab === 'inactive' }"
        @tap="goToDetail(item)"
      >
        <view class="staff-info">
          <view class="staff-name-row">
            <text class="staff-name">{{ item.name }}</text>
            <text class="staff-position">{{ item.position }}</text>
          </view>
          <text class="staff-phone">{{ item.phone }}</text>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="displayList.length === 0" class="empty-state">
        <image class="empty-icon" src="https://img.yzcdn.cn/vant/empty-image-default.png" mode="aspectFit"></image>
        <text class="empty-text">{{ currentTab === 'active' ? '暂无启用员工' : '暂无停用员工' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { getStaffList } from '@/api'

// 响应式数据
const staffList = ref([])
const currentTab = ref('active')

// 计算属性
const displayList = computed(() => {
  return staffList.value.filter(item =>
    currentTab.value === 'active' ? item.status === 'active' : item.status === 'inactive'
  )
})

// 页面加载
onLoad(() => {
  loadStaffList()
})

// 页面显示
onShow(() => {
  // 监听员工新增事件
  uni.$once('staffAdded', (data) => {
    staffList.value.push(data)
  })

  // 监听员工更新事件
  uni.$once('staffUpdated', (data) => {
    const index = staffList.value.findIndex(item => item.id === data.id)
    if (index !== -1) {
      staffList.value[index] = { ...staffList.value[index], ...data }
    }
  })
})

// 下拉刷新
onPullDownRefresh(() => {
  loadStaffList()
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 1000)
})

// 加载员工列表
const loadStaffList = async () => {
  try {
    const res = await getStaffList({ status: 'all' })
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      staffList.value = list.map(item => ({
        id: item.id,
        name: item.name || '',
        phone: item.phone || '',
        position: item.position || item.roleName || '',
        status: item.status || 'active',
        joinTime: item.joinTime || item.createTime || '',
        addedBy: item.addedBy || ''
      }))
    }
  } catch (error) {
    console.error('加载员工列表失败:', error)
  }
}

// 切换Tab
const switchTab = (tab) => {
  currentTab.value = tab
}

// 跳转到详情页
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/staff/detail?id=${item.id}`
  })
}

// 添加员工
const addStaff = () => {
  uni.navigateTo({
    url: '/pages/staff/add'
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #EDF0F4;
}

/* Tab头部 */
.tab-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  border-bottom: 1rpx solid #f0f0f0;
  box-sizing: border-box;
}

.tab-item {
  flex: 1;
  position: relative;
  padding: 30rpx 0;
  font-size: 30rpx;
  color: #999;
  text-align: center;

  &.active {
    color: #5280FF;
    font-weight: 500;
  }
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 6rpx;
  background-color: #5280FF;
  border-radius: 3rpx;
}

.add-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30rpx 0;

  &:active {
    opacity: 0.7;
  }
}

.add-btn-inner {
  width: 56rpx;
  height: 56rpx;
  border: 2rpx solid #5280FF;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-icon {
  font-size: 36rpx;
  color: #5280FF;
  font-weight: 300;
  line-height: 1;
}

/* 列表部分 */
.list-section {
  width: 100%;
  padding: 24rpx;
  box-sizing: border-box;
}

.staff-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 20rpx;

  &:active {
    opacity: 0.9;
  }

  &.disabled {
    .staff-name,
    .staff-position,
    .staff-phone {
      color: #ccc;
    }
  }
}

.staff-info {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.staff-name-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.staff-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.staff-position {
  font-size: 28rpx;
  color: #999;
}

.staff-phone {
  font-size: 28rpx;
  color: #999;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 0;
}

.empty-icon {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 30rpx;
  opacity: 0.5;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>
