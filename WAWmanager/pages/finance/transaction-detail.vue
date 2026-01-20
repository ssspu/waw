<template>
  <view class="container">

    <!-- 交易详情卡片 -->
    <view class="info-card">
      <view class="info-row">
        <text class="info-label">流水号</text>
        <text class="info-value">{{ transactionInfo.serialNo }}</text>
      </view>
      <view class="info-divider"></view>
      <view class="info-row">
        <text class="info-label">类型</text>
        <text class="info-value">{{ transactionInfo.type }}</text>
      </view>
      <view class="info-divider"></view>
      <view class="info-row">
        <text class="info-label">支出</text>
        <text class="info-value expense-value">{{ transactionInfo.expense }}</text>
      </view>
      <view class="info-divider"></view>
      <view class="info-row">
        <text class="info-label">支付方式</text>
        <text class="info-value">{{ transactionInfo.payMethod }}</text>
      </view>
      <view class="info-divider"></view>
      <view class="info-row">
        <text class="info-label">时间</text>
        <text class="info-value">{{ transactionInfo.time }}</text>
      </view>
      <view class="info-divider"></view>
      <view class="info-row">
        <text class="info-label">余额</text>
        <text class="info-value">{{ transactionInfo.balance }}</text>
      </view>
      <view class="info-divider"></view>
      <view class="info-row">
        <text class="info-label">备注</text>
        <text class="info-value">{{ transactionInfo.remark || '-' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getTransactionInfo } from '@/api'

// 交易信息
const transactionInfo = ref({
  amount: 0,
  serialNo: '',
  type: '',
  expense: '',
  payMethod: '',
  time: '',
  balance: '',
  remark: ''
})

// 页面加载
onLoad((options) => {
  if (options.id) {
    loadTransactionDetail(options.id)
  }
})

// 加载交易详情
const loadTransactionDetail = async (id) => {
  try {
    const res = await getTransactionInfo(id)
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      transactionInfo.value = {
        amount: data.amount || 0,
        serialNo: data.serialNo || data.id || '',
        type: data.type || data.typeName || '',
        expense: data.expense || Math.abs(data.amount || 0).toFixed(2),
        payMethod: data.payMethod || data.bankName || '',
        time: data.time || data.createTime || '',
        balance: data.balance || '0',
        remark: data.remark || ''
      }
    }
  } catch (error) {
    console.error('加载交易详情失败:', error)
  }
}

// 格式化金额
const formatAmount = (amount) => {
  if (amount < 0) {
    return amount.toFixed(2)
  }
  return '+' + amount.toFixed(2)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding: 24rpx;
  padding-top: 0;
}


.amount-value {
  font-size: 64rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;

  &.expense {
    color: #FF4D4F;
  }
}

.status-text {
  font-size: 28rpx;
  color: #4CD964;
}

/* 信息卡片 */
.info-card {
  width: 100%;
  margin: 24rpx;
  background-color: #fff;
  border-radius: 16rpx;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
}

.info-label {
  font-size: 28rpx;
  color: #333;
}

.info-value {
  font-size: 28rpx;
  color: #333;

  &.expense-value {
    color: #FF4D4F;
  }
}

.info-divider {
  height: 1rpx;
  background-color: #F5F5F5;
}
</style>
