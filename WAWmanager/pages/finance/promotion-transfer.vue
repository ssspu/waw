<template>
  <view class="container">
    <!-- 转出到 -->
    <view class="section-label">转出到</view>

    <!-- 转出方式选择 -->
    <view class="transfer-options">
      <view
        class="option-item"
        :class="{ active: transferType === 'balance' }"
        @tap="selectType('balance')"
      >
        <view class="check-icon" v-if="transferType === 'balance'">
          <text class="check-text">✓</text>
        </view>
        <view class="option-icon">
          <image class="icon-img" src="/pages/finance/static/coin@3x.png" mode="aspectFit"></image>
        </view>
        <text class="option-text">余额</text>
      </view>

      <view
        class="option-item"
        :class="{ active: transferType === 'bank' }"
        @tap="selectType('bank')"
      >
        <view class="check-icon" v-if="transferType === 'bank'">
          <text class="check-text">✓</text>
        </view>
        <view class="option-icon">
          <image class="icon-img" src="/pages/finance/static/card@3x.png" mode="aspectFit"></image>
        </view>
        <text class="option-text">银行卡</text>
      </view>
    </view>

    <!-- 转出金额 -->
    <view class="amount-card">
      <text class="amount-label">转出金额</text>
      <view class="amount-input-wrapper">
        <text class="currency-symbol">¥</text>
        <input
          class="amount-input"
          type="digit"
          v-model="transferAmount"
          placeholder="0"
          placeholder-class="placeholder"
        />
        <view class="clear-btn" v-if="transferAmount" @tap="clearAmount">
          <image class="clear-icon" src="/pages/finance/static/add-circle@3x.png" mode="aspectFit"></image>
        </view>
      </view>
      <view class="amount-divider"></view>
      <view class="available-row">
        <text class="available-text">可用订单金额：{{ availableAmount }}元</text>
        <text class="transfer-all" @tap="transferAll">全部转出</text>
      </view>
    </view>

    <!-- 确认转出按钮 -->
    <view
      class="confirm-btn"
      :class="{ disabled: !canTransfer }"
      @tap="confirmTransfer"
    >
      <text class="btn-text">确认转出</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 转出方式
const transferType = ref('balance')

// 可用金额
const availableAmount = ref('1888.00')

// 转出金额
const transferAmount = ref('')

// 是否可以转出
const canTransfer = computed(() => {
  const amount = parseFloat(transferAmount.value)
  return amount > 0 && amount <= parseFloat(availableAmount.value)
})

// 页面加载
onLoad((options) => {
  if (options.amount) {
    availableAmount.value = options.amount
  }
})

// 选择转出方式
const selectType = (type) => {
  transferType.value = type
}

// 清空金额
const clearAmount = () => {
  transferAmount.value = ''
}

// 全部转出
const transferAll = () => {
  transferAmount.value = availableAmount.value
}

// 确认转出
const confirmTransfer = () => {
  if (!canTransfer.value) {
    if (!transferAmount.value) {
      uni.showToast({ title: '请输入转出金额', icon: 'none' })
    } else {
      uni.showToast({ title: '超出可用金额', icon: 'none' })
    }
    return
  }

  const targetText = transferType.value === 'balance' ? '余额' : '银行卡'

  uni.showModal({
    title: '确认转出',
    content: `确认将 ¥${transferAmount.value} 转出到${targetText}？`,
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '处理中...' })
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({ title: '转出成功', icon: 'success' })
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        }, 1500)
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
}

/* 区块标签 */
.section-label {
  display: block;
  margin-right: 600rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  padding: 24rpx;
}

/* 转出方式选择 */
.transfer-options {
  background-color: #fff;
  border-radius: 12rpx;
  display: flex;
  gap: 50rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.option-item {
  width: 300rpx;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  height: 68rpx;
  background-color: #fff;
  border-radius: 16rpx;
  border: 2rpx solid #E5E5E5;
  position: relative;

  &.active {
    border-color: #5280FF;
    background-color: #F8FAFF;
  }

  &:active {
    opacity: 0.8;
  }
}

.check-icon {
  position: absolute;
  top: -2rpx;
  left: -2rpx;
  width: 36rpx;
  height: 36rpx;
  background-color: #5280FF;
  border-radius: 8rpx 0 8rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-text {
  font-size: 20rpx;
  color: #fff;
  font-weight: 600;
}

.option-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-img {
  width: 40rpx;
  height: 40rpx;
}

.option-text {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

/* 金额输入卡片 */
.amount-card {
  margin: 0 24rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
}

.amount-label {
  display: block;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 32rpx;
}

.amount-input-wrapper {
  display: flex;
  align-items: center;
}

.currency-symbol {
  font-size: 32rpx;
  color: #333;
  margin-right: 8rpx;
}

.amount-input {
  flex: 1;
  font-size: 72rpx;
  color: #333;
  font-weight: 600;
}

.placeholder {
  color: #ccc;
  font-size: 72rpx;
}

.clear-btn {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    opacity: 0.7;
  }
}

.clear-icon {
  width: 40rpx;
  height: 40rpx;
}

.amount-divider {
  height: 1rpx;
  background-color: #EEEEEE;
  margin: 24rpx 0;
}

.available-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.available-text {
  font-size: 26rpx;
  color: #999;
}

.transfer-all {
  font-size: 26rpx;
  color: #5280FF;
  font-weight: 500;

  &:active {
    opacity: 0.7;
  }
}

/* 确认按钮 */
.confirm-btn {
  width: 700rpx;
  margin: 48rpx 24rpx;
  height: 96rpx;
  background-color: #5280FF;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &.disabled {
    background-color: #B8C5D9;
  }

  &:not(.disabled):active {
    opacity: 0.9;
  }
}

.btn-text {
  font-size: 32rpx;
  color: #fff;
  font-weight: 500;
}
</style>
