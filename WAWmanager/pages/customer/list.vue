<template>
  <view class="container">
    <!-- 标签页导航 -->
    <view class="tab-container">
      <view
        class="tab-item"
        :class="{ active: currentTab === 0 }"
        @tap="switchTab(0)"
      >
        <text>新顾客</text>
        <view class="tab-indicator" v-if="currentTab === 0"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 1 }"
        @tap="switchTab(1)"
      >
        <text>老顾客</text>
        <view class="tab-indicator" v-if="currentTab === 1"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 2 }"
        @tap="switchTab(2)"
      >
        <text>生日提醒</text>
        <view class="tab-indicator" v-if="currentTab === 2"></view>
      </view>
    </view>

    <!-- 顾客列表 (新顾客/老顾客) -->
    <scroll-view class="customer-list" scroll-y v-if="currentTab !== 2">
      <view class="customer-card" v-for="item in customerList" :key="item.id">
        <!-- 服务信息头部 -->
        <view class="service-header">
          <view class="service-info">
            <text class="service-date">{{ item.serviceDate }}</text>
            <text class="service-type">{{ item.serviceType }}</text>
            <text class="service-desc">{{ item.serviceDesc }}</text>
          </view>
          <text class="service-price">¥{{ item.price }}</text>
        </view>

        <!-- 服务时间 -->
        <view class="service-time">
          <text>{{ item.serviceTime }}</text>
        </view>

        <!-- 分割线 -->
        <view class="divider"></view>

        <!-- 顾客信息 -->
        <view class="customer-info">
          <view class="avatar-wrapper">
            <image class="avatar" :src="item.avatar" mode="aspectFill"></image>
          </view>
          <view class="customer-details">
            <view class="name-row">
              <text class="customer-name">{{ item.name }}</text>
              <image class="svip-badge" v-if="item.isVip" src="/static/icons/svip-badge@3x.png" mode="aspectFit"></image>
            </view>
            <view class="rating-row">
              <text class="rating">{{ item.rating }}</text>
              <image class="star-icon" src="/static/icons/start.png" mode="aspectFit"></image>
              <text class="booking-count">({{ item.totalBookings }}次预约)</text>
            </view>
          </view>
          <!-- 更多操作 -->
          <view class="more-btn" @tap.stop="showMoreMenu(item)">
            <text class="more-dots">···</text>
          </view>
        </view>

        <!-- 统计信息和档案按钮 -->
        <view class="stats-section">
          <view class="stats-content">
            <view class="stats-row">
              <text class="stat-item">预约: {{ item.bookingCount }}次</text>
              <text class="stat-item">消费: {{ item.totalAmount }}元</text>
            </view>
            <view class="remark-row">
              <text class="remark">备注: {{ item.remark || '暂无备注' }}</text>
            </view>
          </view>
          <view class="profile-btn" @tap="viewProfile(item.id)">
            <text>顾客档案</text>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="customerList.length === 0">
        <text>暂无顾客数据</text>
      </view>
    </scroll-view>

    <!-- 生日提醒列表 -->
    <scroll-view class="birthday-list" scroll-y v-if="currentTab === 2">
      <!-- 今天生日 -->
      <view class="birthday-group" v-if="todayBirthdays.length > 0">
        <view class="birthday-header">
          <image class="cake-icon" src="/static/icons/cake@3x.png" mode="aspectFit"></image>
          <text class="birthday-title">今天生日: {{ todayDate }}</text>
        </view>
        <view class="birthday-date-sub">{{ todayDateFull }}</view>
        <view class="divider-line"></view>

        <view class="birthday-item" v-for="item in todayBirthdays" :key="item.id">
          <view class="birthday-customer">
            <image class="avatar" :src="item.avatar" mode="aspectFill"></image>
            <view class="customer-info-simple">
              <view class="name-row">
                <text class="customer-name">{{ item.name }}</text>
                <image class="svip-badge" v-if="item.isVip" src="/static/icons/svip-badge@3x.png" mode="aspectFit"></image>
              </view>
              <view class="rating-row">
                <text class="rating">{{ item.rating }}</text>
                <image class="star-icon" src="/static/icons/star-fill.png" mode="aspectFit"></image>
                <text class="booking-count">({{ item.totalBookings }}次预约)</text>
              </view>
              <view class="stats-row">
                <text class="stat-item">预约: {{ item.bookingCount }}次</text>
                <text class="stat-item">消费: {{ item.totalAmount }}元</text>
              </view>
            </view>
          </view>
          <view class="wish-btn" @tap="sendWish(item.id)">
            <text>去送祝福</text>
          </view>
        </view>
      </view>

      <!-- 明天生日 -->
      <view class="birthday-group" v-if="tomorrowBirthdays.length > 0">
        <view class="birthday-header">
          <image class="cake-icon" src="/static/icons/cake@3x.png" mode="aspectFit"></image>
          <text class="birthday-title">明天生日: {{ tomorrowDate }}</text>
        </view>
        <view class="birthday-date-sub">{{ tomorrowDateFull }}</view>
        <view class="divider-line"></view>

        <view class="birthday-item" v-for="item in tomorrowBirthdays" :key="item.id">
          <view class="birthday-customer">
            <image class="avatar" :src="item.avatar" mode="aspectFill"></image>
            <view class="customer-info-simple">
              <view class="name-row">
                <text class="customer-name">{{ item.name }}</text>
                <image class="svip-badge" v-if="item.isVip" src="/static/icons/svip-badge@3x.png" mode="aspectFit"></image>
              </view>
              <view class="rating-row">
                <text class="rating">{{ item.rating }}</text>
                <image class="star-icon" src="/static/icons/star-fill.png" mode="aspectFit"></image>
                <text class="booking-count">({{ item.totalBookings }}次预约)</text>
              </view>
              <view class="stats-row">
                <text class="stat-item">预约: {{ item.bookingCount }}次</text>
                <text class="stat-item">消费: {{ item.totalAmount }}元</text>
              </view>
            </view>
          </view>
          <view class="wish-btn" @tap="sendWish(item.id)">
            <text>去送祝福</text>
          </view>
        </view>
      </view>

      <!-- 后天生日 -->
      <view class="birthday-group" v-if="dayAfterBirthdays.length > 0">
        <view class="birthday-header">
          <image class="cake-icon" src="/static/icons/cake@3x.png" mode="aspectFit"></image>
          <text class="birthday-title">后天生日: {{ dayAfterDate }}</text>
        </view>
        <view class="birthday-date-sub">{{ dayAfterDateFull }}</view>
        <view class="divider-line"></view>

        <view class="birthday-item" v-for="item in dayAfterBirthdays" :key="item.id">
          <view class="birthday-customer">
            <image class="avatar" :src="item.avatar" mode="aspectFill"></image>
            <view class="customer-info-simple">
              <view class="name-row">
                <text class="customer-name">{{ item.name }}</text>
                <image class="svip-badge" v-if="item.isVip" src="/static/icons/svip-badge@3x.png" mode="aspectFit"></image>
              </view>
              <view class="rating-row">
                <text class="rating">{{ item.rating }}</text>
                <image class="star-icon" src="/static/icons/star-fill.png" mode="aspectFit"></image>
                <text class="booking-count">({{ item.totalBookings }}次预约)</text>
              </view>
              <view class="stats-row">
                <text class="stat-item">预约: {{ item.bookingCount }}次</text>
                <text class="stat-item">消费: {{ item.totalAmount }}元</text>
              </view>
            </view>
          </view>
          <view class="wish-btn" @tap="sendWish(item.id)">
            <text>去送祝福</text>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="todayBirthdays.length === 0 && tomorrowBirthdays.length === 0 && dayAfterBirthdays.length === 0">
        <text>暂无生日提醒</text>
      </view>
    </scroll-view>

    <!-- 更多选择弹窗 -->
    <view class="action-mask" v-if="showActionPopup" @tap="closeActionPopup"></view>
    <view class="action-popup" :class="{ show: showActionPopup }">
      <view class="action-header">更多选择</view>
      <view class="action-item" @tap="handleAction(0)">
        <text>编辑资料</text>
      </view>
      <view class="action-item" @tap="handleAction(1)">
        <text>拨打电话</text>
      </view>
      <view class="action-item" @tap="handleAction(2)">
        <text>删除顾客</text>
      </view>
    </view>

    <!-- 删除确认弹窗 -->
    <view class="modal-mask" v-if="showDeleteModal" @tap="closeDeleteModal"></view>
    <view class="delete-modal" :class="{ show: showDeleteModal }">
      <view class="modal-title">删除顾客</view>
      <view class="modal-content">
        确定要删除顾客 <text class="highlight-name">{{ selectedCustomer?.name }}</text> 吗?
      </view>
      <view class="modal-buttons">
        <view class="modal-btn cancel" @tap="closeDeleteModal">
          <text>取消</text>
        </view>
        <view class="modal-btn delete" @tap="confirmDelete">
          <text>删除</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { getCustomerList, getBirthdayCustomers, deleteCustomer } from '@/api'

// 当前标签页
const currentTab = ref(0)
// 顾客列表数据
const allCustomers = ref([])
// 删除弹窗
const showDeleteModal = ref(false)
const selectedCustomer = ref(null)
// 更多选择弹窗
const showActionPopup = ref(false)

// 模拟顾客数据
const mockData = [
  {
    id: 1,
    name: '刘美丽',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    isVip: true,
    rating: 4.8,
    totalBookings: 40,
    bookingCount: 24,
    totalAmount: '24,225.26',
    remark: '一个特别好的顾客，喜欢烫头发',
    serviceDate: '11月27日',
    serviceType: '女士烫发',
    serviceDesc: '欧莱雅生化烫',
    price: '680',
    serviceTime: '2025-11-27 18:20:48',
    status: 'new',
    birthday: '12-12'
  },
  {
    id: 2,
    name: '李华华',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    isVip: true,
    rating: 4.7,
    totalBookings: 32,
    bookingCount: 18,
    totalAmount: '3,820.52',
    remark: '一个帅气的男顾客，人很好，每次都按...',
    serviceDate: '11月26日',
    serviceType: '洗剪吹',
    serviceDesc: '男士造型',
    price: '58',
    serviceTime: '2025-11-26 18:20:48',
    status: 'new',
    birthday: '12-12'
  },
  {
    id: 3,
    name: '赵静静',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    isVip: true,
    rating: 4.7,
    totalBookings: 88,
    bookingCount: 45,
    totalAmount: '32,120.92',
    remark: '一个很漂亮喜欢染发的女顾客',
    serviceDate: '11月26日',
    serviceType: '染发',
    serviceDesc: '专业植物染发',
    price: '1080',
    serviceTime: '2025-11-26 18:20:48',
    status: 'old',
    birthday: '12-13'
  },
  {
    id: 4,
    name: '王小明',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    isVip: false,
    rating: 4.5,
    totalBookings: 15,
    bookingCount: 8,
    totalAmount: '1,580.00',
    remark: '新顾客，喜欢简约风格',
    serviceDate: '12月10日',
    serviceType: '洗剪吹',
    serviceDesc: '男士精剪',
    price: '88',
    serviceTime: '2025-12-10 14:30:00',
    status: 'new',
    birthday: '12-13'
  },
  {
    id: 5,
    name: '张丽丽',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    isVip: true,
    rating: 4.9,
    totalBookings: 56,
    bookingCount: 32,
    totalAmount: '18,960.50',
    remark: '老顾客，每月定期护理',
    serviceDate: '12月8日',
    serviceType: '护理',
    serviceDesc: '深层滋养护理',
    price: '388',
    serviceTime: '2025-12-08 10:00:00',
    status: 'old',
    birthday: '12-14'
  },
  {
    id: 6,
    name: '陈大伟',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    isVip: true,
    rating: 4.6,
    totalBookings: 28,
    bookingCount: 16,
    totalAmount: '5,680.00',
    remark: '商务人士，时间要求准时',
    serviceDate: '12月11日',
    serviceType: '洗剪吹',
    serviceDesc: '商务造型',
    price: '128',
    serviceTime: '2025-12-11 09:00:00',
    status: 'old',
    birthday: '12-14'
  }
]

// 根据Tab筛选的顾客列表
const customerList = computed(() => {
  if (currentTab.value === 0) {
    return allCustomers.value.filter(c => c.status === 'new')
  } else if (currentTab.value === 1) {
    return allCustomers.value.filter(c => c.status === 'old')
  }
  return []
})

// 生日提醒数据
const todayBirthdays = computed(() => {
  const today = getDateString(0)
  return allCustomers.value.filter(c => c.birthday === today)
})

const tomorrowBirthdays = computed(() => {
  const tomorrow = getDateString(1)
  return allCustomers.value.filter(c => c.birthday === tomorrow)
})

const dayAfterBirthdays = computed(() => {
  const dayAfter = getDateString(2)
  return allCustomers.value.filter(c => c.birthday === dayAfter)
})

// 日期格式化
const getDateString = (offset) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}-${day}`
}

const getDisplayDate = (offset) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

const getFullDate = (offset) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const todayDate = computed(() => getDisplayDate(0))
const todayDateFull = computed(() => getFullDate(0))
const tomorrowDate = computed(() => getDisplayDate(1))
const tomorrowDateFull = computed(() => getFullDate(1))
const dayAfterDate = computed(() => getDisplayDate(2))
const dayAfterDateFull = computed(() => getFullDate(2))

// 页面加载
onLoad(() => {
  loadData()
})

// 页面显示
onShow(() => {
  loadData()
})

// 下拉刷新
onPullDownRefresh(() => {
  loadData()
  uni.stopPullDownRefresh()
})

// 加载数据
const loadData = async () => {
  try {
    const typeMap = ['new', 'old', 'birthday']
    const type = typeMap[currentTab.value]

    let res
    if (type === 'birthday') {
      res = await getBirthdayCustomers()
    } else {
      res = await getCustomerList({ type })
    }

    if (res.code === 200 || res.code === 0) {
      allCustomers.value = res.data?.list || res.data || []
    }
  } catch (error) {
    console.error('加载顾客数据失败:', error)
    // 失败时使用mock数据
    allCustomers.value = mockData
  }
}

// 切换标签页
const switchTab = (index) => {
  currentTab.value = index
}

// 查看顾客档案
const viewProfile = (id) => {
  uni.navigateTo({
    url: `/pages/customer/profile?id=${id}`
  })
}

// 发送生日祝福
const sendWish = (id) => {
  uni.navigateTo({
    url: `/pages/marketing/birthday-wish?customerId=${id}`
  })
}

// 显示更多菜单
const showMoreMenu = (item) => {
  selectedCustomer.value = item
  showActionPopup.value = true
}

// 关闭更多选择弹窗
const closeActionPopup = () => {
  showActionPopup.value = false
}

// 处理更多选择操作
const handleAction = (index) => {
  closeActionPopup()
  if (index === 0) {
    viewProfile(selectedCustomer.value.id)
  } else if (index === 1) {
    // 拨打电话
    uni.showToast({ title: '功能开发中', icon: 'none' })
  } else if (index === 2) {
    showDeleteModal.value = true
  }
}

// 关闭删除弹窗
const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedCustomer.value = null
}

// 确认删除
const confirmDelete = () => {
  if (selectedCustomer.value) {
    allCustomers.value = allCustomers.value.filter(c => c.id !== selectedCustomer.value.id)
    uni.showToast({ title: '删除成功', icon: 'success' })
  }
  closeDeleteModal()
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  display: flex;
  flex-direction: column;
}

// 标签页导航
.tab-container {
  width: 100%;
  display: flex;
  background-color: #fff;
  padding: 0 24rpx;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28rpx 0;
  position: relative;

  text {
    font-size: 28rpx;
    color: #999;
  }

  &.active {
    text {
      color: #4A90E2;
      font-weight: 500;
    }
  }
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  width: 40rpx;
  height: 4rpx;
  background-color: #4A90E2;
  border-radius: 2rpx;
}

// 顾客列表
.customer-list {
  flex: 1;
  height: calc(100vh - 100rpx);
  padding: 24rpx;
  box-sizing: border-box;
}

.customer-card {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  overflow: hidden;
}

// 服务头部
.service-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24rpx 24rpx 12rpx;
}

.service-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12rpx;
}

.service-date {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.service-type {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.service-desc {
  font-size: 26rpx;
  color: #999;
}

.service-price {
  font-size: 36rpx;
  color: #FF9500;
  font-weight: 600;
}

.service-time {
  padding: 0 24rpx 16rpx;

  text {
    font-size: 24rpx;
    color: #999;
  }
}

.divider {
  height: 1rpx;
  background-color: #F5F5F5;
  margin: 0 24rpx;
}

// 顾客信息
.customer-info {
  display: flex;
  align-items: flex-start;
  padding: 20rpx 24rpx 12rpx;
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

.rating-row {
  display: flex;
  align-items: center;
}

.rating {
  font-size: 26rpx;
  color: #FF9500;
  font-weight: 500;
}

.star-icon {
  width: 24rpx;
  height: 24rpx;
  margin: 0 4rpx;
}

.booking-count {
  font-size: 24rpx;
  color: #999;
}

.more-btn {
  padding: 8rpx;
  flex-shrink: 0;
}

.more-dots {
  font-size: 32rpx;
  color: #999;
  letter-spacing: 2rpx;
}

// 统计信息和档案按钮区域
.stats-section {
  display: flex;
  align-items: center;
  padding: 0 24rpx 24rpx;
}

.stats-content {
  flex: 1;
}

.stats-row {
  display: flex;
  gap: 48rpx;
  margin-bottom: 8rpx;
}

.stat-item {
  font-size: 24rpx;
  color: #666;
}

.remark-row {
  .remark {
    font-size: 24rpx;
    color: #999;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.profile-btn {
  background-color: #4A90E2;
  padding: 14rpx 28rpx;
  border-radius: 8rpx;

  text {
    font-size: 26rpx;
    color: #fff;
  }

  &:active {
    opacity: 0.8;
  }
}

// 生日列表
.birthday-list {
  flex: 1;
  height: calc(100vh - 100rpx);
  padding: 24rpx;
  box-sizing: border-box;
}

.birthday-group {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  padding: 24rpx;
}

.birthday-header {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.cake-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 12rpx;
}

.birthday-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.birthday-date-sub {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 16rpx;
  padding-left: 52rpx;
}

.divider-line {
  height: 1rpx;
  background-color: #F5F5F5;
  margin-bottom: 20rpx;
}

.birthday-item {
  display: flex;
  align-items: flex-start;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #F5F5F5;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
}

.birthday-customer {
  flex: 1;
  display: flex;
}

.customer-info-simple {
  flex: 1;
  margin-left: 16rpx;
}

.wish-btn {
  position: absolute;
  right: 0;
  bottom: 16rpx;
  background-color: #5B7FE1;
  padding: 8rpx 24rpx;
  border-radius: 12rpx;

  text {
    font-size: 26rpx;
    color: #fff;
  }

  &:active {
    opacity: 0.8;
  }
}

// 空状态
.empty-state {
  padding: 100rpx 0;
  text-align: center;

  text {
    font-size: 28rpx;
    color: #999;
  }
}

// 删除弹窗
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.delete-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 600rpx;
  background-color: #fff;
  border-radius: 24rpx;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-out;

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
  }
}

.modal-title {
  font-size: 34rpx;
  color: #333;
  font-weight: 500;
  text-align: center;
  padding: 48rpx 32rpx 24rpx;
}

.modal-content {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  padding: 0 32rpx 48rpx;

  .highlight-name {
    color: #FF9500;
    font-weight: 500;
  }
}

.modal-buttons {
  display: flex;
  gap: 24rpx;
  padding: 0 32rpx 32rpx;
}

.modal-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &.cancel {
    background-color: #F5F7FA;

    text {
      font-size: 32rpx;
      color: #333;
    }
  }

  &.delete {
    background-color: #FF4D4F;

    text {
      font-size: 32rpx;
      color: #fff;
    }
  }

  &:active {
    opacity: 0.8;
  }
}

// 更多选择弹窗
.action-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.action-popup {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  z-index: 999;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
  padding-bottom: env(safe-area-inset-bottom);

  &.show {
    transform: translateY(0);
  }
}

.action-header {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  text-align: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #F5F5F5;
}

.action-item {
  margin: 24rpx;
  display: flex;
  justify-content: center;
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid #F5F5F5;
  background-color: #F8FAFC;
  border-radius: 12rpx;

  &:last-child {
    border-bottom: none;
  }

  text {
    font-size: 30rpx;
    color: #333;
  }

  &:active {
    background-color: #f8f8f8;
  }
}
</style>
