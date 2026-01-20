<template>
  <view class="container">
    <!-- 顶部金额卡片 -->
    <view class="amount-card">
      <image class="user-avatar" :src="orderInfo.avatar" mode="aspectFill"></image>
      <text class="amount-value">+{{ orderInfo.amount }}</text>
      <text class="status-text">交易成功</text>
    </view>

    <!-- 顾客信息卡片 -->
    <view class="info-card">
      <view class="info-row">
        <text class="info-label">顾客昵称</text>
        <text class="info-value">{{ orderInfo.customerName }}</text>
      </view>
      <view class="info-divider"></view>
      <view class="info-row">
        <text class="info-label">消费类型</text>
        <text class="info-value">{{ orderInfo.serviceType }}</text>
      </view>
    </view>

    <!-- 交易详情卡片 -->
    <view class="info-card">
      <view class="info-row">
        <text class="info-label">分销佣金</text>
        <text class="info-value commission">{{ orderInfo.commission ? `-${orderInfo.commission}元` : '无' }}</text>
      </view>
      <view class="info-divider"></view>
      <view class="info-row">
        <text class="info-label">支付方式</text>
        <text class="info-value">{{ orderInfo.payMethod }}</text>
      </view>
      <view class="info-divider"></view>
      <view class="info-row">
        <text class="info-label">消费时间</text>
        <text class="info-value">{{ orderInfo.time }}</text>
      </view>
      <view class="info-divider"></view>
      <view class="info-row">
        <text class="info-label">交易单号</text>
        <text class="info-value">{{ orderInfo.orderNo }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 订单信息
const orderInfo = ref({
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  amount: '88.00',
  customerName: '魏莹玲',
  serviceType: '洗剪吹',
  commission: '8.88',
  payMethod: '农业银行(8848)',
  time: '2025-12-12 12:12',
  orderNo: '23879327423749'
})

// 页面加载
onLoad((options) => {
  if (options.id) {
    loadOrderDetail(options.id)
  }
})

// 加载订单详情
const loadOrderDetail = (id) => {
  console.log('加载订单详情:', id)
  // TODO: 调用API获取订单详情
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding: 24rpx;
}

/* 顶部金额卡片 */
.amount-card {
  width: 655rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 48rpx 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24rpx;
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-bottom: 24rpx;
}

.amount-value {
  font-size: 56rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}

.status-text {
  font-size: 28rpx;
  color: #4CD964;
}

/* 信息卡片 */
.info-card {
  width: 655rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 0 32rpx;
  margin-bottom: 24rpx;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 0;
}

.info-label {
  font-size: 28rpx;
  color: #333;
}

.info-value {
  font-size: 28rpx;
  color: #333;

  &.commission {
    color: #F04438;
  }
}

.info-divider {
  height: 1rpx;
  background-color: #F5F5F5;
}
</style>
