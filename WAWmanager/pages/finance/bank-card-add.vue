<template>
  <view class="container">
    <!-- 提示文字 -->
    <view class="hint-text">请绑定持卡人本人的银行卡</view>

    <!-- 表单卡片 -->
    <view class="form-card">
      <view class="form-row">
        <text class="form-label">持卡人</text>
        <text class="form-value">{{ cardHolder }}</text>
      </view>
      <view class="form-divider"></view>
      <view class="form-row">
        <text class="form-label">卡号</text>
        <input
          class="form-input"
          type="number"
          v-model="cardNumber"
          placeholder="请输入银行卡号"
          placeholder-class="placeholder"
          maxlength="19"
        />
      </view>
    </view>

    <!-- 下一步按钮 -->
    <view
      class="submit-btn"
      :class="{ disabled: !canSubmit }"
      @tap="handleSubmit"
    >
      <text class="btn-text">下一步</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getUserInfo } from '@/api'

// 持卡人姓名
const cardHolder = ref('')

// 银行卡号
const cardNumber = ref('')

// 页面加载
onLoad(() => {
  loadUserInfo()
})

// 加载用户信息
const loadUserInfo = async () => {
  try {
    const res = await getUserInfo()
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      cardHolder.value = data.realName || data.name || ''
    }
  } catch (error) {
    console.error('加载用户信息失败:', error)
  }
}

// 是否可以提交
const canSubmit = computed(() => {
  return cardNumber.value.length >= 16
})

// 提交
const handleSubmit = () => {
  if (!canSubmit.value) {
    uni.showToast({ title: '请输入正确的银行卡号', icon: 'none' })
    return
  }

  uni.navigateTo({
    url: `/pages/finance/bank-card-info?cardNumber=${cardNumber.value}`
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding: 24rpx;
}

/* 提示文字 */
.hint-text {
  font-size: 26rpx;
  color: #98A2B3;
  margin-bottom: 24rpx;
  margin-right: 380rpx;
}

/* 表单卡片 */
.form-card {
  width: 650rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 0 32rpx;
}

.form-row {
  display: flex;
  align-items: center;
  padding: 32rpx 0;
}

.form-label {
  width: 120rpx;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.form-value {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.form-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.placeholder {
  color: #ccc;
}

.form-divider {
  height: 1rpx;
  background-color: #F5F5F5;
}

/* 提交按钮 */
.submit-btn {
  width: 716rpx;
  margin-top: 48rpx;
  height: 96rpx;
  background-color: #5280FF;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &.disabled {
    background-color: #B2C9FF;
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
