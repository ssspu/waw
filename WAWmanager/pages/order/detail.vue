<template>
      <!-- 订单状态横幅 -->
    <view class="status-banner">
      <image class="status-icon" src="/static/icons/check-line@3x.png" mode="aspectFit"></image>
      <text class="status-text">订单已完成</text>
    </view>
  <view class="container">


    <!-- 服务信息卡片 -->
    <view class="service-card">
      <!-- 技师信息部分 -->
      <view class="technician-section">
        <view class="avatar-wrapper">
          <image class="technician-avatar" :src="orderInfo.technician.avatar" mode="aspectFill"></image>
        </view>
        <view class="technician-details">
          <view class="name-row">
            <text class="technician-name">{{ orderInfo.technician.name }}</text>
            <image v-if="orderInfo.technician.isVip" class="svip-badge" src="/static/icons/svip-badge@3x.png" mode="aspectFit"></image>
          </view>
          <view class="rating-row">
            <text class="rating">{{ orderInfo.technician.rating }}</text>
            <image class="star-icon" src="/static/icons/start.png" mode="aspectFit"></image>
            <text class="booking-count">({{ orderInfo.technician.bookings }}次预约)</text>
          </view>
        </view>
      </view>

      <!-- 分割线 -->
      <view class="divider"></view>

      <!-- 服务信息部分 -->
      <view class="service-section">
        <view class="service-top">
          <image class="service-image" :src="orderInfo.serviceImage" mode="aspectFill"></image>
          <view class="service-info">
            <view class="service-title-row">
              <text class="service-name">{{ orderInfo.serviceName }}</text>
            </view>
          </view>
          <view class="service-price">
            <text class="price-symbol">¥</text>
            <text class="price-value">{{ orderInfo.totalAmount }}</text>
          </view>
        </view>
        <view class="service-bottom">
          <text class="service-description">{{ orderInfo.serviceDetail }}</text>
          <text class="service-duration">用时：{{ orderInfo.duration }}</text>
        </view>
      </view>
    </view>

    <!-- 订单金额 -->
    <view class="section">
      <view class="section-title">订单金额</view>
      <view class="fee-list">
        <view class="fee-item">
          <text class="fee-label">商品金额</text>
          <text class="fee-value">¥{{ orderInfo.productAmount.toFixed(2) }}</text>
        </view>
        <view class="fee-item">
          <text class="fee-label">优惠金额</text>
          <text class="fee-value discount">-¥{{ orderInfo.discount.toFixed(2) }}</text>
        </view>
        <view class="fee-item">
          <text class="fee-label total-label">合计金额</text>
          <text class="fee-value total-value">¥{{ orderInfo.totalAmount.toFixed(2) }}</text>
        </view>
      </view>
    </view>

    <!-- 订单信息 -->
    <view class="section">
      <view class="section-title">订单信息</view>
      <view class="info-list">
        <view class="info-item">
          <text class="info-label">创建时间</text>
          <text class="info-value">{{ orderInfo.createTime }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">支付方式</text>
          <text class="info-value">{{ orderInfo.payMethod }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">订单编号</text>
          <view class="info-value-row">
            <text class="info-value">{{ orderInfo.orderNo }}</text>
            <view class="copy-btn" @tap="copyOrderNo">
              <text>复制</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 底部按钮 -->
      <view class="bottom-buttons">
        <view class="btn-contact" @tap="contactService">
          <text>私领TA</text>
        </view>
        <view class="btn-reorder" @tap="reorder">
          <text>点评</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 订单ID
const orderId = ref(null)

// 订单信息
const orderInfo = reactive({
  id: '',
  status: 'completed',
  serviceName: '',
  serviceSubtitle: '',
  serviceDetail: '',
  serviceImage: '',
  appointmentTime: '',
  duration: '',
  technician: {
    avatar: '/static/images/avatar-default.png',
    name: '',
    isVip: false,
    rating: 0,
    bookings: 0
  },
  customer: {
    name: '',
    phone: ''
  },
  orderNo: '',
  createTime: '',
  completeTime: '',
  payMethod: '',
  productAmount: 0,
  discount: 0,
  totalAmount: 0,
  reviewed: false
})

// 页面加载
onLoad((options) => {
  if (options.id) {
    orderId.value = options.id
    loadOrderData(options.id)
  }
})

// 加载订单数据
const loadOrderData = (id) => {
  // 模拟数据
  orderInfo.id = id
  orderInfo.serviceName = '女士染发'
  orderInfo.serviceSubtitle = '专业植物染发'
  orderInfo.serviceDetail = '洗护+按摩+修剪+染发+造型'
  orderInfo.serviceImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop'
  orderInfo.appointmentTime = '14:00'
  orderInfo.duration = '预计2小时'
  orderInfo.technician = {
    avatar: '/static/images/avatar-default.png',
    name: '张设计师',
    isVip: true,
    rating: 4.9,
    bookings: 128
  }
  orderInfo.customer = {
    name: '魏莹玲',
    phone: '138****8888'
  }
  orderInfo.orderNo = '202511261400001'
  orderInfo.createTime = '2025-11-26 12:30:00'
  orderInfo.completeTime = '2025-11-26 16:20:48'
  orderInfo.payMethod = '微信支付'
  orderInfo.productAmount = 280
  orderInfo.discount = 80
  orderInfo.totalAmount = 200
  orderInfo.reviewed = false
}

// 复制订单号
const copyOrderNo = () => {
  uni.setClipboardData({
    data: orderInfo.orderNo,
    success: () => {
      uni.showToast({ title: '已复制', icon: 'success' })
    }
  })
}

// 联系客服
const contactService = () => {
  uni.showToast({ title: '联系客服', icon: 'none' })
}

// 再来一单
const reorder = () => {
  uni.showToast({ title: '再来一单', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.container {
  padding: 24rpx;
  min-height: 100vh;
  background-color: #EDF0F4;
}

// 订单状态横幅
.status-banner {
  height: 100rpx;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.status-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 12rpx;
}

.status-text {
  font-size: 32rpx;
  font-weight: 500;
  color: #101828;
}

// 服务信息卡片
.service-card {
  width: 100%;
  background-color: #fff;
  border-radius: 16rpx;
  margin: 0 24rpx 24rpx 24rpx;
  overflow: hidden;
}

// 服务信息部分
.service-section {
  display: flex;
  flex-direction: column;
  padding: 24rpx;
  position: relative;
}

.service-top {
  display: flex;
  align-items: flex-start;
}

.service-bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 16rpx;
  gap: 24rpx;
}

.service-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  background-color: #f5f5f5;
  flex-shrink: 0;
}

.service-left {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.service-info {
  flex: 1;
  margin-left: 24rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 120rpx;
}

.service-title-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  flex-wrap: wrap;
}

.service-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.service-description {
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.service-details {
  display: flex;
  margin-top: auto;
  padding-top: 12rpx;
}

.service-duration {
  font-size: 24rpx;
  color: #999;
}

.service-price {
  position: absolute;
  right: 24rpx;
  bottom: 24rpx;
  display: flex;
  align-items: baseline;
}

.price-symbol {
  font-size: 24rpx;
  color: #FF9500;
}

.price-value {
  font-size: 40rpx;
  color: #FF9500;
  font-weight: 600;
}

// 分割线
.divider {
  height: 1rpx;
  background-color: #F5F5F5;
  margin: 0 24rpx;
}

// 技师信息部分
.technician-section {
  display: flex;
  align-items: center;
  padding: 20rpx 24rpx;
}

.avatar-wrapper {
  width: 80rpx;
  height: 80rpx;
  margin-right: 16rpx;
  flex-shrink: 0;
}

.technician-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}

.technician-details {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.technician-name {
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

// 区块样式
.section {
  width: 100%;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin: 0 24rpx 24rpx 24rpx;
  box-sizing: border-box;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
}

// 信息列表
.info-list {
  display: flex;
  flex-direction: column;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14rpx 0;
}

.info-label {
  font-size: 28rpx;
  color: #999;
}

.info-value {
  font-size: 28rpx;
  color: #333;
}

.info-value-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.copy-btn {
  padding: 6rpx 16rpx;
  background-color: #F5F7FA;
  border-radius: 6rpx;

  text {
    font-size: 24rpx;
    color: #666;
  }

  &:active {
    background-color: #EAECF0;
  }
}

// 费用明细
.fee-list {
  display: flex;
  flex-direction: column;
}

.fee-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14rpx 0;
}

.fee-label {
  font-size: 28rpx;
  color: #999;

  &.total-label {
    color: #333;
    font-weight: 600;
  }
}

.fee-value {
  font-size: 28rpx;
  color: #333;

  &.discount {
    color: #333;
  }

  &.total-value {
    color: #FA8C16;
  }
}

// 底部按钮
.bottom-buttons {
  display: flex;
  gap: 24rpx;
  margin-top: 24rpx;
  padding: 0 24rpx;
}

.btn-contact {
  width: 300rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 12rpx;
  border: 1rpx solid #E5E5E5;

  text {
    font-size: 30rpx;
    color: #333;
  }

  &:active {
    background-color: #f5f5f5;
  }
}

.btn-reorder {
  width: 300rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #5280FF;
  border-radius: 12rpx;

  text {
    font-size: 30rpx;
    color: #fff;
  }

  &:active {
    opacity: 0.9;
  }
}
</style>
