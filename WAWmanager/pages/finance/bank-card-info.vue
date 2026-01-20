<template>
  <view class="container">
    <!-- 提示文字 -->
    <view class="hint-text">请选择银行卡类型</view>

    <!-- 银行卡类型表单 -->
    <view class="form-card">
      <view class="form-row" @tap="showBankPicker">
        <text class="form-label">银行</text>
        <text class="form-value" :class="{ placeholder: !selectedBank }">
          {{ selectedBank || '请选择所属银行' }}
        </text>
        <text class="arrow-icon">›</text>
      </view>
      <view class="form-divider"></view>
      <view class="form-row" @tap="showCardTypePicker">
        <text class="form-label">卡类型</text>
        <text class="form-value" :class="{ placeholder: !selectedCardType }">
          {{ selectedCardType || '请选择卡类型' }}
        </text>
        <text class="arrow-icon">›</text>
      </view>
    </view>

    <!-- 手机号表单 -->
    <view class="form-card">
      <view class="form-row">
        <text class="form-label">手机号</text>
        <input
          class="form-input"
          type="number"
          v-model="phoneNumber"
          placeholder="请输入银行预留手机号"
          placeholder-class="placeholder"
          maxlength="11"
        />
      </view>
      <view class="form-divider"></view>
      <view class="form-row">
        <text class="form-label">验证码</text>
        <input
          class="form-input"
          type="number"
          v-model="verifyCode"
          placeholder="请输入验证码"
          placeholder-class="placeholder"
          maxlength="6"
        />
        <view
          class="code-btn"
          :class="{ disabled: !canSendCode || countdown > 0 }"
          @tap="sendVerifyCode"
        >
          <text class="code-btn-text">{{ countdown > 0 ? countdown + 's' : '获取验证码' }}</text>
        </view>
      </view>
    </view>

    <!-- 安全提示 -->
    <view class="security-hint">信息加密处理，仅用于银行验证</view>

    <!-- 用户协议 -->
    <view class="agreement-row" @tap="toggleAgreement">
      <view class="checkbox" :class="{ checked: agreeProtocol }">
        <text class="check-icon" v-if="agreeProtocol">✓</text>
      </view>
      <text class="agreement-text">同意</text>
      <text class="agreement-link" @tap.stop="viewProtocol">《用户协议》</text>
    </view>

    <!-- 下一步按钮 -->
    <view
      class="submit-btn"
      :class="{ disabled: !canSubmit }"
      @tap="handleSubmit"
    >
      <text class="btn-text">下一步</text>
    </view>

    <!-- 银行选择弹窗 -->
    <view class="picker-popup" v-if="showBankPopup">
      <view class="popup-mask" @tap="closeBankPopup"></view>
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">选择银行</text>
          <text class="popup-close" @tap="closeBankPopup">×</text>
        </view>
        <scroll-view class="popup-list" scroll-y>
          <view
            v-for="bank in bankList"
            :key="bank"
            class="popup-item"
            :class="{ selected: selectedBank === bank }"
            @tap="selectBank(bank)"
          >
            <text class="item-text">{{ bank }}</text>
            <text class="item-check" v-if="selectedBank === bank">✓</text>
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- 卡类型选择弹窗 -->
    <view class="picker-popup" v-if="showCardTypePopup">
      <view class="popup-mask" @tap="closeCardTypePopup"></view>
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">选择卡类型</text>
          <text class="popup-close" @tap="closeCardTypePopup">×</text>
        </view>
        <scroll-view class="popup-list" scroll-y>
          <view
            v-for="type in cardTypeList"
            :key="type"
            class="popup-item"
            :class="{ selected: selectedCardType === type }"
            @tap="selectCardType(type)"
          >
            <text class="item-text">{{ type }}</text>
            <text class="item-check" v-if="selectedCardType === type">✓</text>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { addBankCard } from '@/api'
import { sendSmsCode } from '@/api'

// 接收的卡号
const cardNumber = ref('')

// 银行列表
const bankList = ref([
  '中国农业银行',
  '中国建设银行',
  '中国工商银行',
  '中国银行',
  '招商银行',
  '交通银行',
  '中国邮政储蓄银行',
  '中信银行',
  '光大银行',
  '民生银行'
])

// 卡类型列表
const cardTypeList = ref(['储蓄卡', '信用卡'])

// 选中的银行
const selectedBank = ref('')

// 选中的卡类型
const selectedCardType = ref('')

// 手机号
const phoneNumber = ref('')

// 验证码
const verifyCode = ref('')

// 倒计时
const countdown = ref(0)
let countdownTimer = null

// 同意协议
const agreeProtocol = ref(false)

// 弹窗状态
const showBankPopup = ref(false)
const showCardTypePopup = ref(false)

// 是否可以发送验证码
const canSendCode = computed(() => {
  return phoneNumber.value.length === 11
})

// 是否可以提交
const canSubmit = computed(() => {
  return selectedBank.value && selectedCardType.value && phoneNumber.value.length === 11 && verifyCode.value.length === 6 && agreeProtocol.value
})

// 页面加载
onLoad((options) => {
  if (options.cardNumber) {
    cardNumber.value = options.cardNumber
  }
})

// 显示银行选择
const showBankPicker = () => {
  showBankPopup.value = true
}

// 关闭银行选择
const closeBankPopup = () => {
  showBankPopup.value = false
}

// 选择银行
const selectBank = (bank) => {
  selectedBank.value = bank
  showBankPopup.value = false
}

// 显示卡类型选择
const showCardTypePicker = () => {
  showCardTypePopup.value = true
}

// 关闭卡类型选择
const closeCardTypePopup = () => {
  showCardTypePopup.value = false
}

// 选择卡类型
const selectCardType = (type) => {
  selectedCardType.value = type
  showCardTypePopup.value = false
}

// 切换协议同意状态
const toggleAgreement = () => {
  agreeProtocol.value = !agreeProtocol.value
}

// 发送验证码
const sendVerifyCode = async () => {
  if (!canSendCode.value || countdown.value > 0) {
    if (!canSendCode.value) {
      uni.showToast({ title: '请先输入手机号', icon: 'none' })
    }
    return
  }

  try {
    const res = await sendSmsCode({ phone: phoneNumber.value, type: 'bindCard' })
    if (res.code === 200 || res.code === 0) {
      uni.showToast({ title: '验证码已发送', icon: 'success' })
      countdown.value = 60
      countdownTimer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(countdownTimer)
        }
      }, 1000)
    }
  } catch (error) {
    console.error('发送验证码失败:', error)
    uni.showToast({ title: '发送失败，请重试', icon: 'none' })
  }
}

// 查看用户协议
const viewProtocol = () => {
  uni.showToast({ title: '用户协议', icon: 'none' })
}

// 提交
const handleSubmit = async () => {
  if (!canSubmit.value) {
    if (!selectedBank.value) {
      uni.showToast({ title: '请选择所属银行', icon: 'none' })
    } else if (!selectedCardType.value) {
      uni.showToast({ title: '请选择卡类型', icon: 'none' })
    } else if (phoneNumber.value.length !== 11) {
      uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    } else if (verifyCode.value.length !== 6) {
      uni.showToast({ title: '请输入6位验证码', icon: 'none' })
    } else if (!agreeProtocol.value) {
      uni.showToast({ title: '请同意用户协议', icon: 'none' })
    }
    return
  }

  uni.showLoading({ title: '提交中...' })
  try {
    const res = await addBankCard({
      cardNumber: cardNumber.value,
      bankName: selectedBank.value,
      cardType: selectedCardType.value,
      phone: phoneNumber.value,
      code: verifyCode.value
    })
    uni.hideLoading()
    if (res.code === 200 || res.code === 0) {
      uni.showToast({ title: '添加成功', icon: 'success' })
      setTimeout(() => {
        uni.navigateBack({ delta: 2 })
      }, 1500)
    }
  } catch (error) {
    uni.hideLoading()
    console.error('添加银行卡失败:', error)
    uni.showToast({ title: '添加失败，请重试', icon: 'none' })
  }
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
  margin-right: 480rpx;
  font-size: 26rpx;
  color: #98A2B3;
  margin-bottom: 24rpx;
}

/* 表单卡片 */
.form-card {
  width: 655rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 0 32rpx;
  margin-bottom: 24rpx;
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

  &.placeholder {
    color: #ccc;
  }
}

.form-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.placeholder {
  color: #ccc;
}

.arrow-icon {
  font-size: 28rpx;
  color: #ccc;
}

.form-divider {
  height: 1rpx;
  background-color: #F5F5F5;
}

/* 验证码按钮 */
.code-btn {
  padding: 12rpx 24rpx;
  background-color: #5280FF;
  border-radius: 8rpx;
  flex-shrink: 0;

  &.disabled {
    background-color: #B2C9FF;
  }

  &:not(.disabled):active {
    opacity: 0.9;
  }
}

.code-btn-text {
  font-size: 24rpx;
  color: #fff;
}

/* 安全提示 */
.security-hint {
  font-size: 24rpx;
  color: #98A2B3;
  text-align: center;
}

/* 用户协议 */
.agreement-row {
  margin-right: 420rpx;
  display: flex;
  align-items: center;
  padding: 24rpx 0;
}

.checkbox {
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #DDDDDD;
  border-radius: 50%;
  margin-right: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &.checked {
    background-color: #5280FF;
    border-color: #5280FF;
  }
}

.check-icon {
  font-size: 24rpx;
  color: #fff;
}

.agreement-text {
  font-size: 26rpx;
  color: #333;
}

.agreement-link {
  font-size: 26rpx;
  color: #5280FF;
}

/* 提交按钮 */
.submit-btn {
  width: 716rpx;
  margin-top: 24rpx;
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

/* 选择弹窗 */
.picker-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #F5F5F5;
}

.popup-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.popup-close {
  font-size: 48rpx;
  color: #999;
  line-height: 1;
}

.popup-list {
  max-height: 60vh;
}

.popup-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #F5F5F5;

  &.selected {
    background-color: #F8F9FC;
  }

  &:active {
    background-color: #F5F5F5;
  }
}

.item-text {
  font-size: 28rpx;
  color: #333;
}

.item-check {
  font-size: 28rpx;
  color: #5280FF;
  font-weight: 600;
}
</style>
