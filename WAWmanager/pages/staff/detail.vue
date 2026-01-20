<template>
  <view class="container">
    <!-- 基本信息卡片 -->
    <view class="info-card">
      <!-- 平台账号 -->
      <view class="info-item">
        <text class="info-label">平台帐号</text>
        <text class="info-value">{{ staffInfo.phone }}</text>
      </view>

      <!-- 员工名称 -->
      <view class="info-item">
        <text class="info-label">员工名称</text>
        <text class="info-value">{{ staffInfo.name }}</text>
      </view>
    </view>

    <!-- 员工角色卡片 -->
    <view class="info-card">
      <view class="info-item no-border">
        <text class="info-label">员工角色</text>
        <text class="info-value">{{ staffInfo.position }}</text>
      </view>
    </view>

    <!-- 其他信息卡片 -->
    <view class="info-card">
      <!-- 添加人 -->
      <view class="info-item">
        <text class="info-label">添加人</text>
        <text class="info-value">{{ staffInfo.addedBy || '' }}</text>
      </view>

      <!-- 加入时间 -->
      <view class="info-item no-border">
        <text class="info-label">加入时间</text>
        <text class="info-value">{{ staffInfo.joinTime || '--' }}</text>
      </view>
    </view>

    <!-- 底部操作按钮 -->
    <view class="bottom-buttons">
      <button class="btn btn-outline" @tap="deleteStaff">删除员工</button>
      <button class="btn btn-primary" @tap="editStaff">编辑信息</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getStaffDetail, deleteStaff as deleteStaffApi } from '@/api'

// 响应式数据
const staffInfo = ref({
  id: '',
  name: '',
  phone: '',
  position: '',
  status: 'active',
  addedBy: '',
  joinTime: ''
})

// 页面加载
onLoad((options) => {
  if (options.id) {
    loadStaffInfo(options.id)
  }
})

// 加载员工信息
const loadStaffInfo = async (id) => {
  try {
    const res = await getStaffDetail(id)
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      staffInfo.value = {
        id: data.id,
        name: data.name || '',
        phone: data.phone || '',
        position: data.position || data.roleName || '',
        status: data.status || 'active',
        addedBy: data.addedBy || '',
        joinTime: data.joinTime || data.createTime || ''
      }
    }
  } catch (error) {
    console.error('加载员工信息失败:', error)
  }
}

// 删除员工
const deleteStaff = () => {
  uni.showModal({
    title: '确认删除',
    content: `确定要删除员工"${staffInfo.value.name}"吗？删除后将无法恢复。`,
    confirmText: '删除',
    confirmColor: '#ff4d4f',
    success: (res) => {
      if (res.confirm) {
        performDelete()
      }
    }
  })
}

// 执行删除
const performDelete = async () => {
  uni.showLoading({ title: '删除中...' })

  try {
    const res = await deleteStaffApi(staffInfo.value.id)
    uni.hideLoading()
    if (res.code === 200 || res.code === 0) {
      uni.showToast({ title: '删除成功', icon: 'success' })
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    } else {
      uni.showToast({ title: res.message || '删除失败', icon: 'none' })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('删除员工失败:', error)
    uni.showToast({ title: '删除失败', icon: 'none' })
  }
}

// 编辑员工
const editStaff = () => {
  const phone = staffInfo.value.phone.replace('+86 - ', '')
  uni.navigateTo({
    url: `/pages/staff/add?mode=edit&id=${staffInfo.value.id}&name=${staffInfo.value.name}&phone=${phone}&role=${staffInfo.value.position}`
  })
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

.info-card {
  width: 100%;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 36rpx 32rpx;
  border-bottom: 1rpx solid #f5f5f5;

  &.no-border {
    border-bottom: none;
  }
}

.info-label {
  font-size: 30rpx;
  color: #333;
  width: 160rpx;
  flex-shrink: 0;
}

.info-value {
  font-size: 30rpx;
  color: #333;
  flex: 1;
}

/* 底部按钮 */
.bottom-buttons {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 24rpx;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: #fff;
}

.btn {
  flex: 1;
  height: 80rpx;
  border-radius: 12rpx;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  &::after {
    border: none;
  }
}

.btn-outline {
  background-color: #fff;
  color: #333;
  border: 2rpx solid #ddd;

  &:active {
    background-color: #f5f5f5;
  }
}

.btn-primary {
  background-color: #5280FF;
  color: #fff;

  &:active {
    opacity: 0.8;
  }
}
</style>
