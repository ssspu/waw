<template>
  <view class="container">
    <!-- 核销方式卡片 -->
    <view class="verify-card">
      <view class="card-title">验证核销</view>
      <view class="card-subtitle">扫描顾客的核销二维码</view>

      <view class="verify-methods">
        <view class="method-item" @tap="handleScan">
          <view class="method-icon-wrapper scan">
            <image class="method-icon" src="/pages/verify/static/scanner.png" mode="aspectFit"></image>
          </view>
          <text class="method-name">扫一扫</text>
        </view>

        <view class="method-item" @tap="showPhoneModal">
          <view class="method-icon-wrapper phone">
            <image class="method-icon" src="/static/icons/mobile.png" mode="aspectFit"></image>
          </view>
          <text class="method-name">手机号核销</text>
        </view>
      </view>
    </view>

    <!-- 今日核销记录 -->
    <view class="records-section">
      <view class="section-header">
        <text class="section-title">今日核销记录</text>
        <text class="record-count">共{{ verifyRecords.length }}单</text>
      </view>

      <!-- 核销记录列表 -->
      <view class="records-list" v-if="verifyRecords.length > 0">
        <view class="record-card" v-for="record in verifyRecords" :key="record.id">
          <view class="record-left">
            <view class="record-title-row">
              <view class="record-title">{{ record.serviceName }}</view>
              <view class="record-time">{{ record.time }}</view>
            </view>
            <view class="record-info">
              <text>单号：{{ record.orderNo }}</text>
              <text class="info-divider">顾客：{{ record.customer }}</text>
            </view>
          </view>
          <view class="record-right">
            <text class="record-price">¥{{ record.price }}</text>
            <view class="record-status" :class="record.status">
              {{ record.statusText }}
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-else>
        <view class="empty-icon-placeholder"></view>
        <text class="empty-text">今日暂无核销记录</text>
      </view>
    </view>

    <!-- 手机号核销弹窗 -->
    <view class="modal-mask" v-if="showPhoneVerify" @tap="closePhoneModal"></view>
    <view class="phone-modal" v-if="showPhoneVerify">
      <view class="modal-title">手机号核销</view>

      <!-- 订单信息 -->
      <view class="order-info">
        <view class="info-row">
          <text class="info-label">用户名称</text>
          <text class="info-value">{{ selectedOrder ? selectedOrder.customer : '--' }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">服务内容</text>
          <text class="info-value">{{ selectedOrder ? selectedOrder.serviceName : '--' }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">订单时间段</text>
          <text class="info-value">{{ selectedOrder ? selectedOrder.timeRange : '--' }}</text>
        </view>
      </view>

      <!-- 选择订单 -->
      <view class="select-order">
        <view class="select-label">选择订单</view>
        <view class="order-picker" @tap="showOrderPicker = !showOrderPicker">
          <text class="picker-text" v-if="selectedOrder">{{ selectedOrder.customer }}  |  {{ selectedOrder.phone }}</text>
          <text class="picker-placeholder" v-else>请选择订单</text>
        </view>
        <!-- 订单下拉列表 -->
        <view class="order-dropdown" v-if="showOrderPicker">
          <view
            class="dropdown-item"
            v-for="order in pendingOrders"
            :key="order.id"
            @tap="selectOrder(order)"
          >
            <text>{{ order.customer }}  |  {{ order.phone }}</text>
          </view>
        </view>
      </view>

      <!-- 手机号验证 -->
      <view class="phone-verify-section">
        <view class="verify-label">手机号后四位</view>
        <view class="phone-inputs">
          <view class="phone-prefix">
            <text>{{ phonePrefix || '- -' }}</text>
          </view>
          <input
            class="phone-input"
            type="number"
            maxlength="2"
            placeholder="请输入后两位"
            v-model="phoneSuffix"
            :disabled="!selectedOrder"
          />
        </view>
        <view class="verify-tip">系统默认显示前两位，输入后两位完成核销</view>
      </view>

      <!-- 按钮 -->
      <view class="modal-buttons">
        <view class="modal-btn cancel" @tap="closePhoneModal">取消</view>
        <view class="modal-btn confirm" @tap="confirmPhoneVerify">确定</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getVerifyRecords, getPendingVerifyOrders, verifyByCode, verifyByPhone } from '@/api'

// 核销记录
const verifyRecords = ref([])

// 弹窗状态
const showPhoneVerify = ref(false)
const showOrderPicker = ref(false)
const selectedOrder = ref(null)
const phoneSuffix = ref('')

// 待核销订单
const pendingOrders = ref([])

const phonePrefix = computed(() => {
  if (selectedOrder.value) {
    const phone = selectedOrder.value.phone
    const lastFour = phone.slice(-4)
    return lastFour.slice(0, 2)
  }
  return ''
})

// 加载核销记录
const loadVerifyRecords = async () => {
  try {
    const res = await getVerifyRecords()
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      verifyRecords.value = list.map(item => ({
        id: item.id,
        serviceName: item.serviceName || item.service_name || '',
        time: item.time || item.verifyTime || item.verify_time || '',
        orderNo: item.orderNo || item.order_no || '',
        customer: item.customer || item.customerName || item.customer_name || '',
        price: item.price || item.amount || 0,
        status: 'verified',
        statusText: '已核销'
      }))
    }
  } catch (error) {
    console.error('加载核销记录失败:', error)
  }
}

// 加载待核销订单
const loadPendingOrders = async () => {
  try {
    const res = await getPendingVerifyOrders()
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      pendingOrders.value = list.map(item => ({
        id: item.id,
        customer: item.customer || item.customerName || item.customer_name || '',
        serviceName: item.serviceName || item.service_name || '',
        timeRange: item.timeRange || item.time_range || '',
        phone: item.phone || item.phoneDisplay || ''
      }))
    }
  } catch (error) {
    console.error('加载待核销订单失败:', error)
  }
}

// 页面加载
onLoad(() => {
  loadVerifyRecords()
  loadPendingOrders()
})

// 页面显示
onShow(() => {
  loadVerifyRecords()
})

// 扫码核销
const handleScan = () => {
  uni.scanCode({
    onlyFromCamera: true,
    scanType: ['qrCode'],
    success: (res) => {
      console.log('扫码结果:', res)
      // 处理核销逻辑
      processVerify(res.result)
    },
    fail: (err) => {
      if (err.errMsg.includes('cancel')) {
        return
      }
      uni.showToast({ title: '扫码失败', icon: 'none' })
    }
  })
}

// 处理核销
const processVerify = async (code) => {
  uni.showLoading({ title: '核销中...' })

  try {
    const res = await verifyByCode(code)
    uni.hideLoading()
    if (res.code === 200 || res.code === 0) {
      uni.showToast({ title: '核销成功', icon: 'success' })
      loadVerifyRecords()
    } else {
      uni.showToast({ title: res.message || '核销失败', icon: 'none' })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('核销失败:', error)
    uni.showToast({ title: '核销失败', icon: 'none' })
  }
}

// 显示手机号核销弹窗
const showPhoneModal = () => {
  showPhoneVerify.value = true
  showOrderPicker.value = false
  selectedOrder.value = null
  phoneSuffix.value = ''
}

// 关闭手机号核销弹窗
const closePhoneModal = () => {
  showPhoneVerify.value = false
  showOrderPicker.value = false
  selectedOrder.value = null
  phoneSuffix.value = ''
}

// 选择订单
const selectOrder = (order) => {
  selectedOrder.value = order
  showOrderPicker.value = false
  phoneSuffix.value = ''
}

// 确认手机号核销
const confirmPhoneVerify = async () => {
  if (!selectedOrder.value) {
    uni.showToast({ title: '请选择订单', icon: 'none' })
    return
  }

  if (phoneSuffix.value.length !== 2) {
    uni.showToast({ title: '请输入完整的手机号后两位', icon: 'none' })
    return
  }

  uni.showLoading({ title: '核销中...' })

  try {
    const res = await verifyByPhone({
      orderId: selectedOrder.value.id,
      phoneSuffix: phoneSuffix.value
    })
    uni.hideLoading()
    if (res.code === 200 || res.code === 0) {
      uni.showToast({ title: '核销成功', icon: 'success' })
      loadVerifyRecords()
      loadPendingOrders()
      closePhoneModal()
    } else {
      uni.showToast({ title: res.message || '核销失败', icon: 'none' })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('核销失败:', error)
    uni.showToast({ title: '核销失败', icon: 'none' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 24rpx;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 核销方式卡片 */
.verify-card {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
}

.card-title {
  text-align: center;
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}

.card-subtitle {
  text-align: center;
  font-size: 26rpx;
  color: #999;
  margin-bottom: 40rpx;
}

.verify-methods {
  display: flex;
  justify-content: center;
  gap: 40rpx;
}

.method-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 290rpx;
  height: 192rpx;
  background-color: #f8f9fc;
  border-radius: 16rpx;

  &:active {
    opacity: 0.8;
  }
}

.method-icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;

  &.scan {
    background-color: #E8F4FF;
    border-radius: 16rpx;
  }

  &.phone {
    background-color: #E8F4FF;
    border-radius: 16rpx;
  }
}

.method-icon {
  width: 48rpx;
  height: 48rpx;
}

.method-name {
  font-size: 28rpx;
  color: #333;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.records-section {
  width: 100%;
}
.record-count {
  background-color: #DBE8FF;
  padding: 6rpx 12rpx;
  border-radius: 12rpx;
  font-size: 26rpx;
  color: #5280FF;
}
.records-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.record-card {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
}

.record-left {
  flex: 1;
}

.record-title-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 24rpx;
}

.record-title {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
}

.record-time {
  font-size: 24rpx;
  color: #999;
}

.record-info {
  font-size: 24rpx;
  color: #98A2B3;

  .info-divider {
    margin-left: 30rpx;
  }
}

.record-right {
  margin-left: 98rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.record-price {
  font-size: 40rpx;
  font-weight: 600;
  color: #FF9500;
}

.record-status {
  font-size: 24rpx;
  padding: 6rpx 16rpx;
  border-radius: 12rpx;

  &.verified {
    color: #4CD964;
    background-color: #E8F8EB;
  }

  &.pending {
    color: #FF9500;
    background-color: #FFF7E8;
  }
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
  background-color: #fff;
  border-radius: 16rpx;
}

.empty-icon-placeholder {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 24rpx;
  background-color: #f5f5f5;
  border-radius: 50%;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

/* 弹窗遮罩 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

/* 手机号核销弹窗 */
.phone-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 620rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 48rpx 40rpx;
  z-index: 101;
}

.modal-title {
  text-align: center;
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 40rpx;
}

.order-info {
  background-color: #f8f9fc;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 30rpx;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12rpx 0;
}

.info-label {
  font-size: 26rpx;
  color: #666;
}

.info-value {
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
}

.select-order {
  margin-bottom: 30rpx;
  position: relative;
}

.select-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
}

.order-picker {
  display: flex;
  align-items: center;
  padding: 24rpx;
  background-color: #fff;
  border-radius: 12rpx;
  border: 2rpx solid #e5e5e5;
}

.picker-text {
  font-size: 28rpx;
  color: #333;
}

.picker-placeholder {
  font-size: 28rpx;
  color: #999;
}

.order-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 2rpx solid #e5e5e5;
  border-radius: 12rpx;
  margin-top: 8rpx;
  z-index: 10;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 24rpx;
  font-size: 28rpx;
  color: #333;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f5f5f5;
  }
}

.phone-verify-section {
  margin-bottom: 30rpx;
}

.verify-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
}

.phone-inputs {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.phone-prefix {
  width: 180rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fc;
  border: 2rpx solid #5280FF;
  border-radius: 12rpx;
  font-size: 36rpx;
  color: #5280FF;
  font-weight: 600;
  letter-spacing: 16rpx;
  padding-left: 16rpx;
}

.phone-input {
  flex: 1;
  height: 88rpx;
  background-color: #f8f9fc;
  border: 2rpx solid #e5e5e5;
  border-radius: 12rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
}

.verify-tip {
  font-size: 24rpx;
  color: #999;
  margin-top: 16rpx;
}

.modal-buttons {
  display: flex;
  gap: 24rpx;
  margin-top: 40rpx;
}

.modal-btn {
  flex: 1;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12rpx;
  font-size: 30rpx;
  font-weight: 500;

  &.cancel {
    background-color: #f5f5f5;
    color: #333;
  }

  &.confirm {
    background-color: #5280FF;
    color: #fff;
  }
}
</style>
