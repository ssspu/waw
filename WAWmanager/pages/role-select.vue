<template>
  <view class="container">
    <view class="role-list">
      <view
        class="role-item"
        v-for="item in roleOptions"
        :key="item.value"
        @tap="selectRole(item.value)"
      >
        <view class="checkbox" :class="{ checked: selectedRole === item.value }">
          <image
            v-if="selectedRole === item.value"
            class="check-icon"
            src="/static/icons/check-white.png"
            mode="aspectFit"
          ></image>
        </view>
        <text class="role-name">{{ item.label }}</text>
      </view>
    </view>

    <view class="confirm-button-container">
      <button class="confirm-button" @tap="confirmSelection">确认</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const roleOptions = ref([
  { value: 'senior_manager', label: '高级管理员' },
  { value: 'manager', label: '普通管理员' },
  { value: 'store_manager', label: '店长' },
  { value: 'receptionist', label: '前台' }
])

const selectedRole = ref('manager')

// 角色标签到值的映射
const roleMap = {
  '高级管理员': 'senior_manager',
  '普通管理员': 'manager',
  '店长': 'store_manager',
  '前台': 'receptionist'
}

onLoad((options) => {
  if (options.currentRole) {
    const roleValue = roleMap[options.currentRole] || options.currentRole
    selectedRole.value = roleValue
  }
})

const selectRole = (value) => {
  selectedRole.value = value
}

const confirmSelection = () => {
  const roleLabel = roleOptions.value.find(item => item.value === selectedRole.value)?.label || ''

  // 获取上一页面
  const pages = getCurrentPages()
  const prevPage = pages[pages.length - 2]

  if (prevPage && prevPage.$vm) {
    // 通过事件通道传递数据
    const eventChannel = prevPage.$vm.getOpenerEventChannel?.()
    if (eventChannel) {
      eventChannel.emit('roleSelected', {
        value: selectedRole.value,
        label: roleLabel
      })
    }
  }

  // 也可以通过全局事件总线传递
  uni.$emit('roleSelected', {
    value: selectedRole.value,
    label: roleLabel
  })

  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #EDF0F4;
  padding: 24rpx;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.role-list {
  width: 100%;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.role-item {
  display: flex;
  align-items: center;
  padding: 40rpx 32rpx;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f8f8f8;
  }
}

.checkbox {
  width: 36rpx;
  height: 36rpx;
  background-color: #EAECF0;
  border-radius: 8rpx;
  margin-right: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &.checked {
    background-color: #5280FF;
  }
}

.check-icon {
  width: 28rpx;
  height: 28rpx;
}

.role-name {
  font-size: 30rpx;
  color: #333;
}

.confirm-button-container {
  background-color: #FFFFFF;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: transparent;
}

.confirm-button {
  width: 100%;
  height: 96rpx;
  background-color: #5280FF;
  color: #fff;
  font-size: 32rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    opacity: 0.8;
  }
}
</style>
