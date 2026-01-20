<template>
  <view class="container">

    <!-- 消息详情卡片 -->
    <view class="detail-card">
      <view class="card-header">
        <image class="message-icon" src="/pages/message/static/message.png" mode="aspectFit"></image>
        <view class="header-info">
          <text class="message-type">{{ messageData.type }}</text>
          <text class="message-time">{{ messageData.time }}</text>
        </view>
      </view>

      <view class="card-content">
        <text class="content-text">{{ messageData.content }}</text>

        <view class="detail-item" v-if="messageData.orderNo">
          <text class="detail-label">订单号：</text>
          <text class="detail-value">{{ messageData.orderNo }}</text>
        </view>

        <view class="detail-item" v-if="messageData.customer">
          <text class="detail-label">顾客：</text>
          <text class="detail-value">{{ messageData.customer }}</text>
        </view>

        <view class="detail-item" v-if="messageData.amount">
          <text class="detail-label">金额：</text>
          <text class="detail-value">{{ messageData.amount }}元</text>
        </view>

        <view class="detail-item" v-if="messageData.points">
          <text class="detail-label">积分：</text>
          <text class="detail-value">{{ messageData.points }}</text>
        </view>

        <text class="extra-content" v-if="messageData.extraContent">{{ messageData.extraContent }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const messageData = ref({
  id: '',
  type: '系统通知',
  content: '',
  time: '',
  orderNo: '',
  customer: '',
  amount: 0,
  points: 0,
  extraContent: '这里是通知消息文案，内容区域。'
})

// 页面加载
onLoad((options) => {
  if (options.data) {
    try {
      const data = JSON.parse(decodeURIComponent(options.data))
      messageData.value = { ...messageData.value, ...data }
    } catch (e) {
      console.error('解析消息数据失败', e)
    }
  }
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 查看订单详情
const goOrderDetail = () => {
  uni.navigateTo({
    url: `/pages/order/list?orderNo=${messageData.value.orderNo}`
  })
}
</script>

<style lang="scss" scoped>
.container {
  margin: 24rpx;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 48rpx;
  color: #333;
  line-height: 1;
}

.navbar-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.navbar-placeholder {
  width: 32rpx;
  height: 32rpx;
}

/* 详情卡片 */
.detail-card {
  width: 100%;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.message-icon {
  width: 80rpx;
  height: 80rpx;
  margin-right: 24rpx;
}

.header-info {
  flex: 1;
}

.message-type {
  display: block;
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 8rpx;
}

.message-time {
  display: block;
  font-size: 24rpx;
  color: #999;
}

.card-content {
  padding: 32rpx;
}

.content-text {
  display: block;
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
  margin-bottom: 30rpx;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.detail-label {
  font-size: 28rpx;
  color: #333;
}

.detail-value {
  font-size: 28rpx;
  color: #333;
}

.extra-content {
  display: block;
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
  margin-top: 30rpx;
}

/* 操作按钮 */
.action-buttons {
  padding: 0 24rpx;
}
</style>
