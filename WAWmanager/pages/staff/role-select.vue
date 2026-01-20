<template>
  <view class="container">
    <!-- 角色列表 -->
    <view class="role-card">
      <view
        v-for="role in roleList"
        :key="role.value"
        class="role-item"
        @tap="selectRole(role.value)"
      >
        <view class="checkbox" :class="{ checked: selectedRole === role.value }">
          <view v-if="selectedRole === role.value" class="check-icon">✓</view>
        </view>
        <text class="role-name">{{ role.label }}</text>
      </view>
    </view>

    <!-- 底部确认按钮 -->
    <view class="bottom-button">
      <button class="confirm-btn" @tap="confirmSelect">确认</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 角色列表
const roleList = ref([
  { label: '高级管理员', value: '高级管理员' },
  { label: '普通管理员', value: '普通管理员' },
  { label: '店长', value: '店长' },
  { label: '前台', value: '前台' },
  { label: '设计师', value: '设计师' }
])

// 当前选中的角色
const selectedRole = ref('')

// 页面加载时获取初始值
onLoad((options) => {
  if (options.current) {
    selectedRole.value = decodeURIComponent(options.current)
  }
})

// 选择角色
const selectRole = (role) => {
  selectedRole.value = role
}

// 确认选择
const confirmSelect = () => {
  if (!selectedRole.value) {
    uni.showToast({
      title: '请选择员工角色',
      icon: 'none'
    })
    return
  }

  // 通知上一页
  uni.$emit('roleSelected', selectedRole.value)
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #EDF0F4;
  padding: 24rpx;
  padding-bottom: 180rpx;
  box-sizing: border-box;
}

.role-card {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.role-item {
  display: flex;
  align-items: center;
  padding: 36rpx 32rpx;
  border-bottom: 1rpx solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f9f9f9;
  }
}

.checkbox {
  width: 44rpx;
  height: 44rpx;
  border: 2rpx solid #ddd;
  border-radius: 8rpx;
  margin-right: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  transition: all 0.2s;

  &.checked {
    background-color: #5280FF;
    border-color: #5280FF;
  }
}

.check-icon {
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
}

.role-name {
  font-size: 30rpx;
  color: #333;
}

/* 底部按钮 */
.bottom-button {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: #fff;
}

.confirm-btn {
  width: 100%;
  height: 96rpx;
  background-color: #5280FF;
  color: #fff;
  font-size: 32rpx;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  &::after {
    border: none;
  }

  &:active {
    opacity: 0.8;
  }
}
</style>
