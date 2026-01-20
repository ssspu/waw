<template>
  <view class="container">
    <!-- 顶部区域 -->
    <view class="header-section" :style="{ paddingTop: statusBarHeight + 'px' }">
      <image class="header-bg" src="/pages/message/static/message-bg.png" mode="aspectFill"></image>
      <!-- 导航栏 -->
      <view class="navbar-content">
        <view class="back-btn" @tap="goBack">
          <image
            class="back-icon"
            src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg"
            mode="aspectFit"
          ></image>
        </view>
        <text class="navbar-title">消息通知</text>
        <view class="navbar-placeholder"></view>
      </view>
    </view>

    <!-- 消息列表 -->
    <view class="message-list">
      <!-- 按日期分组 -->
      <view class="date-group" v-for="(group, index) in groupedMessages" :key="index">
        <view class="date-label">{{ group.date }}</view>

        <!-- 消息卡片 -->
        <view
          class="message-card-wrapper"
          v-for="message in group.messages"
          :key="message.id"
        >
          <view
            class="message-card"
            :class="{ 'swiped': message.swiped }"
            @touchstart="onTouchStart($event, message)"
            @touchmove="onTouchMove($event, message)"
            @touchend="onTouchEnd($event, message)"
            @tap="goDetail(message)"
            :style="{ transform: `translateX(${message.translateX || 0}px)` }"
          >
            <image class="message-icon" src="/pages/message/static/message.png" mode="aspectFit"></image>
          <view class="unread-dot" v-if="!message.isRead"></view>
            <view class="message-content">
              <view class="message-header">
                <text class="message-type">{{ message.type }}</text>
                <text class="message-time">{{ message.time }}</text>
              </view>
              <text class="message-text">{{ message.content }}</text>
            </view>
          </view>
          <view
            class="delete-btn"
            :class="{ 'show': message.swiped }"
            @tap.stop="deleteMessage(message)"
          >
            <image class="delete-icon" src="/static/icons/删除.png" mode="aspectFit"></image>
          </view>
        </view>
      </view>

      <!-- 底部提示 -->
      <view class="bottom-tip" v-if="messageList.length > 0">暂时没有更多了～</view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="messageList.length === 0">
        <view class="empty-icon-placeholder"></view>
        <text class="empty-text">暂无消息通知</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {
  getMessageList,
  markAsRead,
  deleteMessage as deleteMessageApi
} from '@/api/modules/message'

const statusBarHeight = ref(44)

// 消息列表
const messageList = ref([])

// 触摸相关变量
const touchStartX = ref(0)
const touchStartY = ref(0)
const currentMessage = ref(null)

// 按日期分组消息
const groupedMessages = computed(() => {
  const groups = {}
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  messageList.value.forEach(msg => {
    let dateLabel = msg.date
    if (msg.date === today) {
      dateLabel = '今天'
    } else if (msg.date === yesterday) {
      dateLabel = '昨天'
    }

    if (!groups[dateLabel]) {
      groups[dateLabel] = {
        date: dateLabel,
        messages: []
      }
    }
    groups[dateLabel].messages.push(msg)
  })

  return Object.values(groups)
})

// 页面加载
onLoad(() => {
  statusBarHeight.value = uni.getStorageSync('statusBarHeight') || 44
  loadMessages()
})

// 加载消息列表
const loadMessages = async () => {
  try {
    const res = await getMessageList({ page: 1, pageSize: 50 })
    if (res && res.list) {
      messageList.value = res.list.map(item => ({
        id: item.id,
        type: getMessageTypeName(item.type),
        content: item.content,
        time: item.createTime,
        date: item.createTime.split(' ')[0],
        isRead: item.isRead,
        swiped: false,
        translateX: 0,
        extra: item.extra || {}
      }))
    }
  } catch (e) {
    console.log('加载消息失败', e)
  }
}

// 获取消息类型名称
const getMessageTypeName = (type) => {
  const typeMap = {
    'system': '系统通知',
    'order': '订单消息',
    'marketing': '营销消息'
  }
  return typeMap[type] || '系统通知'
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 跳转到详情
const goDetail = async (message) => {
  if (message.swiped) {
    message.swiped = false
    message.translateX = 0
    return
  }

  // 标记为已读
  if (!message.isRead) {
    try {
      await markAsRead(message.id)
      message.isRead = true
    } catch (e) {
      console.log('标记已读失败', e)
    }
  }

  const messageData = encodeURIComponent(JSON.stringify(message))
  uni.navigateTo({
    url: `/pages/message/detail?data=${messageData}`
  })
}

// 触摸开始
const onTouchStart = (e, message) => {
  // 先收起其他已滑动的消息
  messageList.value.forEach(m => {
    if (m.id !== message.id && m.swiped) {
      m.swiped = false
      m.translateX = 0
    }
  })

  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
  currentMessage.value = message
}

// 触摸移动
const onTouchMove = (e, message) => {
  if (!currentMessage.value || currentMessage.value.id !== message.id) return

  const deltaX = e.touches[0].clientX - touchStartX.value
  const deltaY = e.touches[0].clientY - touchStartY.value

  // 判断是否为水平滑动
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    e.preventDefault && e.preventDefault()

    // 限制滑动范围
    let translateX = deltaX
    if (message.swiped) {
      translateX = -80 + deltaX
    }

    // 最大左滑80px，不允许右滑超过0
    translateX = Math.max(-80, Math.min(0, translateX))
    message.translateX = translateX
  }
}

// 触摸结束
const onTouchEnd = (e, message) => {
  if (!currentMessage.value || currentMessage.value.id !== message.id) return

  // 判断是否滑动超过阈值
  if (message.translateX < -40) {
    message.swiped = true
    message.translateX = -80
  } else {
    message.swiped = false
    message.translateX = 0
  }

  currentMessage.value = null
}

// 删除消息
const deleteMessage = (message) => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这条消息吗？',
    success: async (res) => {
      if (res.confirm) {
        try {
          await deleteMessageApi(message.id)
          const index = messageList.value.findIndex(m => m.id === message.id)
          if (index > -1) {
            messageList.value.splice(index, 1)
            uni.showToast({ title: '删除成功', icon: 'success' })
          }
        } catch (e) {
          uni.showToast({ title: '删除失败', icon: 'none' })
        }
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 顶部区域 */
.header-section {
  width: 100%;
  height: 630rpx;
  position: relative;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
  padding: 0 30rpx;
  position: relative;
  z-index: 1;
}

.back-btn {
  width: 32rpx;
  height: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  width: 32rpx;
  height: 32rpx;
}

.navbar-title {
  font-family: 'PingFang SC', sans-serif;
  font-size: 32rpx;
  font-weight: 500;
  color: #ffffff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.navbar-placeholder {
  width: 32rpx;
  height: 32rpx;
}

/* 消息列表 */
.message-list {
  padding: 0 24rpx 24rpx;
  background-color: #f5f5f5;
  border-radius: 24rpx 24rpx 0 0;
  margin-top: -530rpx;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.date-group {
  margin-bottom: 0;
}

.date-label {
  text-align: center;
  font-size: 26rpx;
  color: #999;
  padding: 30rpx 0 20rpx;
}

.message-card-wrapper {
  position: relative;
  overflow: hidden;
  margin-bottom: 20rpx;
  border-radius: 16rpx;
}

.message-card {
  display: flex;
  align-items: flex-start;
  background-color: #fff;
  padding: 32rpx;
  border-radius: 16rpx;
  position: relative;
  transition: transform 0.2s ease;
  z-index: 1;
}

.message-icon {
  width: 80rpx;
  height: 80rpx;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.unread-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 16rpx;
  height: 16rpx;
  background-color: #FF4D4F;
  border-radius: 50%;
  border: 2rpx solid #fff;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.message-type {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
}

.message-time {
  font-size: 24rpx;
  color: #999;
}

.message-text {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* 删除按钮 */
.delete-btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 80px;
  background-color: #FF4D4F;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 0 16rpx 16rpx 0;

  &.show {
    opacity: 1;
  }
}

.delete-icon {
  width: 44rpx;
  height: 44rpx;
}

/* 底部提示 */
.bottom-tip {
  text-align: center;
  font-size: 26rpx;
  color: #999;
  padding: 40rpx 0;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 200rpx 0;
}

.empty-icon-placeholder {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 30rpx;
  background-color: #e8e8e8;
  border-radius: 50%;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>
