<template>
  <view class="login-page">
    <view class="header">
      <text class="page-title">登录</text>
    </view>

    <!-- 登录方式切换 -->
    <view class="login-type-tabs">
      <view
        class="tab-item"
        :class="{ active: loginType === 'password' }"
        @tap="switchLoginType('password')"
      >
        密码登录
      </view>
      <view
        class="tab-item"
        :class="{ active: loginType === 'code' }"
        @tap="switchLoginType('code')"
      >
        验证码登录
      </view>
    </view>

    <!-- 密码登录表单 -->
    <view class="form" v-if="loginType === 'password'">
      <view class="field">
        <text class="field-label">+86</text>
        <input
          class="field-input"
          type="number"
          maxlength="11"
          placeholder="请输入手机号"
          v-model="mobile"
        />
      </view>
      <view class="divider"></view>
      <view class="field">
        <text class="field-label">密码</text>
        <input
          class="field-input"
          password
          placeholder="请输入密码"
          v-model="password"
        />
      </view>
    </view>

    <!-- 验证码登录表单 -->
    <view class="form" v-if="loginType === 'code'">
      <view class="field">
        <text class="field-label">+86</text>
        <input
          class="field-input"
          type="number"
          maxlength="11"
          placeholder="请输入手机号"
          v-model="mobile"
        />
      </view>
      <view class="divider"></view>
      <view class="field">
        <text class="field-label">验证码</text>
        <input
          class="field-input"
          type="number"
          maxlength="6"
          placeholder="请输入验证码"
          v-model="smsCode"
        />
        <view class="code-btn" @tap="handleSendCode">
          <text class="code-btn-text">{{ codeBtnText }}</text>
        </view>
      </view>
    </view>

    <view class="role-section">
      <view class="role-title">请选择登录身份</view>
      <view class="role-options">
        <view
          class="role-option"
          :class="{ active: selectedVersion === 'merchant' }"
          @tap="selectMerchant"
        >
          我是商家
        </view>
        <view
          class="role-option"
          :class="{ active: selectedVersion === 'technician' || selectedVersion === 'storeTechnician' }"
          @tap="openTechnicianSelector"
        >
          我是技师
        </view>
      </view>
      <view class="role-helper" v-if="selectedVersionLabel">
        已选择：{{ selectedVersionLabel }}
      </view>
    </view>

    <button class="primary-btn" :disabled="loading" @tap="handleLogin">
      {{ loading ? '登录中...' : '登录' }}
    </button>

    <view class="link-row">
      <navigator url="/pages/auth/register" open-type="navigate">注册账号</navigator>
      <text class="link-divider">|</text>
      <view class="link-disable">忘记密码</view>
    </view>

    <!-- 技师类型选择弹窗 -->
    <view class="technician-popup" v-if="showTechnicianSelector">
      <view class="popup-mask" @tap="closeTechnicianSelector"></view>
      <view class="popup-panel">
        <view class="popup-header">请选择技师类型</view>
        <view
          class="popup-option"
          @tap="selectTechnicianVersion('technician')"
        >
          <view class="option-title">我是个人技师</view>
          <view class="option-desc">独立经营，拥有个人工作室，进入技师版</view>
        </view>
        <view
          class="popup-option"
          @tap="selectTechnicianVersion('storeTechnician')"
        >
          <view class="option-title">我已是门店技师</view>
          <view class="option-desc">加入门店团队，进入门店技师版</view>
        </view>
        <button class="popup-cancel" @tap="closeTechnicianSelector">取消</button>
      </view>
    </view>

    <!-- 设置密码弹窗 -->
    <view class="password-popup" v-if="showSetPasswordModal">
      <view class="popup-mask" @tap="skipSetPassword"></view>
      <view class="popup-panel password-panel">
        <view class="popup-header">设置登录密码</view>
        <view class="popup-desc">设置密码后可使用密码快捷登录</view>

        <view class="password-form">
          <!-- 验证码输入 -->
          <view class="password-field">
            <view class="field-icon-box">
              <image class="field-icon-img" src="/static/icons/mobile.png" mode="aspectFit" />
            </view>
            <input
              class="password-input"
              type="number"
              maxlength="6"
              placeholder="请输入验证码"
              v-model="resetSmsCode"
            />
            <view class="send-code-btn" @tap="handleSendResetCode">
              <text class="send-code-text">{{ resetCodeBtnText }}</text>
            </view>
          </view>
          <!-- 密码输入 -->
          <view class="password-field">
            <view class="field-icon-box">
              <image class="field-icon-img" src="/static/icons/lock.png" mode="aspectFit" />
            </view>
            <input
              class="password-input"
              :password="!showPassword"
              placeholder="请输入密码（6-20位）"
              v-model="newPassword"
              maxlength="20"
            />
            <view class="eye-icon" @tap="togglePasswordVisible">
              <image class="eye-img" :src="showPassword ? '/static/icons/eye-open.png' : '/static/icons/eye-close.png'" mode="aspectFit" />
            </view>
          </view>
          <!-- 确认密码输入 -->
          <view class="password-field">
            <view class="field-icon-box">
              <image class="field-icon-img" src="/static/icons/lock.png" mode="aspectFit" />
            </view>
            <input
              class="password-input"
              :password="!showConfirmPassword"
              placeholder="请再次输入密码"
              v-model="confirmPassword"
              maxlength="20"
            />
            <view class="eye-icon" @tap="toggleConfirmPasswordVisible">
              <image class="eye-img" :src="showConfirmPassword ? '/static/icons/eye-open.png' : '/static/icons/eye-close.png'" mode="aspectFit" />
            </view>
          </view>
        </view>

        <view class="password-tips">
          <text class="tip-item" :class="{ valid: resetSmsCode.length === 6 }">• 请输入6位验证码</text>
          <text class="tip-item" :class="{ valid: newPassword.length >= 6 }">• 密码长度6-20位</text>
          <text class="tip-item" :class="{ valid: newPassword === confirmPassword && confirmPassword.length > 0 }">• 两次输入密码一致</text>
        </view>

        <view class="password-actions">
          <button class="btn-confirm" :disabled="settingPassword" @tap="handleSetPassword">
            {{ settingPassword ? '设置中...' : '确认设置' }}
          </button>
          <button class="btn-skip" @tap="skipSetPassword">稍后设置</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/store'
import { merchantSendSmsCode, resetPassword } from '@/api'

const userStore = useUserStore()

// 登录方式
const loginType = ref('password') // password | code

// 表单数据
const mobile = ref('')
const password = ref('')
const smsCode = ref('')
const selectedVersion = ref('')
const showTechnicianSelector = ref(false)
const loading = ref(false)

// 验证码相关
const countdown = ref(0)
const countdownTimer = ref(null)

// 设置密码弹窗相关
const showSetPasswordModal = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const settingPassword = ref(false)
const pendingLoginVersion = ref('') // 保存待跳转的版本

// 设置密码验证码相关
const resetSmsCode = ref('')
const resetCountdown = ref(0)
const resetCountdownTimer = ref(null)

const resetCodeBtnText = computed(() => {
  if (resetCountdown.value > 0) {
    return `${resetCountdown.value}s`
  }
  return '获取验证码'
})

// 版本元数据
const versionMeta = {
  merchant: {
    label: '商家版'
  },
  technician: {
    label: '技师版 · 个人工作室'
  },
  storeTechnician: {
    label: '门店技师版'
  }
}

// 计算属性
const selectedVersionLabel = computed(() => {
  return versionMeta[selectedVersion.value]?.label || ''
})

const codeBtnText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}s`
  }
  return '获取验证码'
})

// 切换登录方式
const switchLoginType = (type) => {
  loginType.value = type
  // 清空表单
  password.value = ''
  smsCode.value = ''
}

// 发送验证码
const handleSendCode = async () => {
  // 验证手机号
  if (!mobile.value) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none'
    })
    return
  }

  if (!validateMobile(mobile.value)) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }

  // 防止重复发送
  if (countdown.value > 0) {
    return
  }

  try {
    await merchantSendSmsCode(mobile.value, 'login')

    uni.showToast({
      title: '验证码已发送',
      icon: 'success'
    })

    // 开始倒计时
    countdown.value = 60
    countdownTimer.value = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(countdownTimer.value)
        countdownTimer.value = null
      }
    }, 1000)
  } catch (error) {
    console.error('发送验证码失败:', error)
    uni.showToast({
      title: error.message || '发送验证码失败',
      icon: 'none'
    })
  }
}

// 选择商家版
const selectMerchant = () => {
  selectedVersion.value = 'merchant'
  showTechnicianSelector.value = false
}

// 打开技师选择器
const openTechnicianSelector = () => {
  showTechnicianSelector.value = true
}

// 关闭技师选择器
const closeTechnicianSelector = () => {
  showTechnicianSelector.value = false
}

// 选择技师版本
const selectTechnicianVersion = (version) => {
  selectedVersion.value = version
  showTechnicianSelector.value = false
}

// 验证手机号格式
const validateMobile = (phone) => {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

// 登录处理
const handleLogin = async () => {
  // 表单验证
  if (!mobile.value) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none'
    })
    return
  }

  if (!validateMobile(mobile.value)) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }

  // 密码登录验证
  if (loginType.value === 'password') {
    if (!password.value) {
      uni.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }

    if (password.value.length < 6) {
      uni.showToast({
        title: '密码至少6位',
        icon: 'none'
      })
      return
    }
  }

  // 验证码登录验证
  if (loginType.value === 'code') {
    if (!smsCode.value) {
      uni.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return
    }

    if (smsCode.value.length !== 6) {
      uni.showToast({
        title: '请输入6位验证码',
        icon: 'none'
      })
      return
    }
  }

  const versionToUse = selectedVersion.value || 'merchant'

  // 防止重复提交
  if (loading.value) return
  loading.value = true

  try {
    // 根据登录方式调用不同的接口
    if (loginType.value === 'password') {
      // 调用密码登录接口
      await userStore.passwordLoginAction(mobile.value, password.value, versionToUse)

      const versionLabel = versionMeta[versionToUse]?.label || '商家版'
      uni.showToast({
        title: `${versionLabel}登录成功`,
        icon: 'success'
      })

      setTimeout(() => {
        uni.reLaunch({
          url: `/pages/manage/index?version=${versionToUse}`
        })
      }, 400)
    } else {
      // 调用验证码登录接口
      await userStore.phoneLoginAction(mobile.value, smsCode.value)

      // 验证码登录成功后，显示设置密码弹窗
      pendingLoginVersion.value = versionToUse
      showSetPasswordModal.value = true
    }
  } catch (error) {
    console.error('登录失败:', error)
    uni.showToast({
      title: error.message || '登录失败，请重试',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

// 切换密码可见性
const togglePasswordVisible = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisible = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// 发送设置密码验证码
const handleSendResetCode = async () => {
  // 防止重复发送
  if (resetCountdown.value > 0) {
    return
  }

  try {
    await merchantSendSmsCode(mobile.value, 'reset')

    uni.showToast({
      title: '验证码已发送',
      icon: 'success'
    })

    // 开始倒计时
    resetCountdown.value = 60
    resetCountdownTimer.value = setInterval(() => {
      resetCountdown.value--
      if (resetCountdown.value <= 0) {
        clearInterval(resetCountdownTimer.value)
        resetCountdownTimer.value = null
      }
    }, 1000)
  } catch (error) {
    console.error('发送验证码失败:', error)
    uni.showToast({
      title: error.message || '发送验证码失败',
      icon: 'none'
    })
  }
}

// 设置密码
const handleSetPassword = async () => {
  // 验证验证码
  if (!resetSmsCode.value) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none'
    })
    return
  }

  if (resetSmsCode.value.length !== 6) {
    uni.showToast({
      title: '请输入6位验证码',
      icon: 'none'
    })
    return
  }

  // 验证密码
  if (!newPassword.value) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none'
    })
    return
  }

  if (newPassword.value.length < 6) {
    uni.showToast({
      title: '密码至少6位',
      icon: 'none'
    })
    return
  }

  if (newPassword.value.length > 20) {
    uni.showToast({
      title: '密码最多20位',
      icon: 'none'
    })
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    uni.showToast({
      title: '两次输入密码不一致',
      icon: 'none'
    })
    return
  }

  settingPassword.value = true

  try {
    // 调用设置密码接口（使用新的验证码）
    await resetPassword({
      phone: mobile.value,
      code: resetSmsCode.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value
    })

    uni.showToast({
      title: '密码设置成功',
      icon: 'success'
    })

    // 关闭弹窗并跳转
    showSetPasswordModal.value = false
    navigateToHome()
  } catch (error) {
    console.error('设置密码失败:', error)
    uni.showToast({
      title: error.message || '设置密码失败',
      icon: 'none'
    })
  } finally {
    settingPassword.value = false
  }
}

// 跳过设置密码
const skipSetPassword = () => {
  showSetPasswordModal.value = false
  navigateToHome()
}

// 跳转到首页
const navigateToHome = () => {
  const versionToUse = pendingLoginVersion.value || 'merchant'
  const versionLabel = versionMeta[versionToUse]?.label || '商家版'

  uni.showToast({
    title: `${versionLabel}登录成功`,
    icon: 'success'
  })

  setTimeout(() => {
    uni.reLaunch({
      url: `/pages/manage/index?version=${versionToUse}`
    })
  }, 400)
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 160rpx 56rpx 80rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
}

.page-title {
  font-size: 44rpx;
  color: #101010;
  font-weight: 600;
}

.login-type-tabs {
  display: flex;
  justify-content: center;
  gap: 48rpx;
  margin-bottom: 60rpx;
}

.tab-item {
  font-size: 28rpx;
  color: #909399;
  padding-bottom: 12rpx;
  position: relative;
  cursor: pointer;

  &.active {
    color: #5280FF;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 40rpx;
      height: 4rpx;
      background-color: #5280FF;
      border-radius: 2rpx;
    }
  }
}

.form {
  background-color: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 12rpx 32rpx rgba(16, 16, 16, 0.04);
  padding: 12rpx 32rpx 12rpx;
}

.field {
  display: flex;
  align-items: center;
  height: 96rpx;
  position: relative;
}

.field-label {
  width: 160rpx;
  font-size: 30rpx;
  color: #303133;
}

.field-input {
  flex: 1;
  font-size: 30rpx;
  color: #303133;
}

.code-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 12rpx 24rpx;
  background-color: #5280FF;
  border-radius: 8rpx;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
}

.code-btn-text {
  font-size: 24rpx;
  color: #ffffff;
  white-space: nowrap;
}

.divider {
  height: 1rpx;
  background-color: #ebedf0;
}

.role-section {
  margin: 80rpx 0 60rpx;
}

.role-title {
  font-size: 28rpx;
  color: #606266;
  margin-bottom: 24rpx;
}

.role-options {
  display: flex;
  gap: 24rpx;
}

.role-option {
  flex: 1;
  border-radius: 36rpx;
  border: 1rpx solid #d4d8de;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  font-size: 28rpx;
  color: #606266;

  &.active {
    border-color: #5280FF;
    color: #5280FF;
  }
}

.role-helper {
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #5280FF;
}

.primary-btn {
  width: 100%;
  height: 96rpx;
  border-radius: 8rpx;
  background-color: #5280FF;
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    background-color: #a0c0ff;
    color: rgba(255, 255, 255, 0.8);
  }
}

.link-row {
  margin-top: 36rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26rpx;
  color: #a0a4ab;
  gap: 20rpx;

  navigator {
    color: #5280FF;
  }
}

.link-divider {
  color: #d4d8de;
}

.link-disable {
  color: #c0c4cc;
}

.technician-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 99;
}

.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
}

.popup-panel {
  position: relative;
  width: 100%;
  background: #ffffff;
  border-top-left-radius: 32rpx;
  border-top-right-radius: 32rpx;
  padding: 48rpx 48rpx calc(56rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.popup-header {
  font-size: 32rpx;
  font-weight: 600;
  color: #303133;
  margin-bottom: 36rpx;
  text-align: center;
}

.popup-option {
  padding: 28rpx 24rpx;
  border-radius: 20rpx;
  background-color: #f6f7fb;
  margin-bottom: 24rpx;

  &:active {
    background-color: #eef0f5;
  }
}

.option-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12rpx;
}

.option-desc {
  font-size: 26rpx;
  color: #80838a;
  line-height: 38rpx;
}

.popup-cancel {
  width: 100%;
  height: 88rpx;
  border-radius: 8rpx;
  border: 1rpx solid #d4d8de;
  background: #ffffff;
  font-size: 30rpx;
  color: #606266;
  margin-top: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 设置密码弹窗样式
.password-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.password-panel {
  width: 90%;
  max-width: 640rpx;
  border-radius: 24rpx;
  padding: 48rpx 40rpx calc(48rpx + env(safe-area-inset-bottom));
}

.popup-desc {
  font-size: 26rpx;
  color: #909399;
  text-align: center;
  margin-top: -20rpx;
  margin-bottom: 40rpx;
}

.password-form {
  margin-bottom: 24rpx;
}

.password-field {
  display: flex;
  align-items: center;
  height: 96rpx;
  background-color: #f6f7fb;
  border-radius: 12rpx;
  padding: 0 24rpx;
  margin-bottom: 20rpx;
}

.field-icon-box {
  width: 40rpx;
  height: 40rpx;
  margin-right: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.field-icon-img {
  width: 36rpx;
  height: 36rpx;
}

.password-input {
  flex: 1;
  font-size: 28rpx;
  color: #303133;
}

.eye-icon {
  padding: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eye-img {
  width: 36rpx;
  height: 36rpx;
}

.send-code-btn {
  padding: 12rpx 20rpx;
  background-color: #5280FF;
  border-radius: 8rpx;

  &:active {
    opacity: 0.8;
  }
}

.send-code-text {
  font-size: 24rpx;
  color: #ffffff;
  white-space: nowrap;
}

.password-tips {
  margin-bottom: 32rpx;
}

.tip-item {
  display: block;
  font-size: 24rpx;
  color: #c0c4cc;
  line-height: 40rpx;

  &.valid {
    color: #67c23a;
  }
}

.password-actions {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.btn-confirm {
  width: 100%;
  height: 88rpx;
  border-radius: 12rpx;
  background: linear-gradient(135deg, #5280FF 0%, #7B9FFF 100%);
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  &[disabled] {
    background: linear-gradient(135deg, #a0c0ff 0%, #c0d4ff 100%);
    color: rgba(255, 255, 255, 0.8);
  }
}

.btn-skip {
  width: 100%;
  height: 88rpx;
  border-radius: 12rpx;
  background: transparent;
  color: #909399;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  &:active {
    background-color: #f5f5f5;
  }
}
</style>
