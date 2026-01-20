<template>
  <view class="container">
    <!-- 表单区域 -->
    <view class="form-container">
      <!-- 平台账号 -->
      <view class="form-item">
        <view class="form-label">平台账号</view>
        <input
          class="form-input"
          placeholder="注册平台的手机号码"
          :value="formData.phone"
          @input="onPhoneInput"
          type="number"
        />
      </view>

      <!-- 员工名称 -->
      <view class="form-item last">
        <view class="form-label">员工名称</view>
        <input
          class="form-input"
          placeholder="输入员工名称"
          :value="formData.name"
          @input="onNameInput"
        />
      </view>
    </view>

    <!-- 员工角色 -->
    <view class="form-container">
      <view class="form-item form-item-clickable last" @tap="selectRole">
        <view class="form-label">员工角色</view>
        <view class="form-select">
          <text :class="formData.role ? 'form-select-text' : 'form-select-placeholder'">
            {{ formData.role || '选择员工角色' }}
          </text>
          <image class="form-arrow" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
        </view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="save-button-container">
      <button class="save-button" @tap="saveStaff">保存</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { addStaff } from '@/api'

// 响应式数据
const formData = ref({
  phone: '',
  name: '',
  role: ''
})
const editMode = ref(false)
const editStaffId = ref(null)

// 角色选项
const roleOptions = ref([
  '高级管理员',
  '普通管理员',
  '店长',
  '前台',
  '设计师',
  '助理',
  '实习生'
])

// 页面加载
onLoad((options) => {
  const { mode, id, name, phone, role } = options

  if (mode === 'edit' && id) {
    // 编辑模式
    uni.setNavigationBarTitle({ title: '编辑员工' })
    formData.value.phone = phone || ''
    formData.value.name = name || ''
    formData.value.role = role || ''
    editMode.value = true
    editStaffId.value = id
  } else {
    // 新增模式
    uni.setNavigationBarTitle({ title: '添加员工' })
  }
})

// 页面显示
onShow(() => {
  // 监听角色选择事件
  uni.$once('roleSelected', (data) => {
    formData.value.role = data.label
  })
})

// 手机号输入
const onPhoneInput = (e) => {
  formData.value.phone = e.detail.value
}

// 员工名称输入
const onNameInput = (e) => {
  formData.value.name = e.detail.value
}

// 选择员工角色
const selectRole = () => {
  uni.navigateTo({
    url: `/pages/role-select?currentRole=${formData.value.role || 'manager'}`
  })
}

// 保存员工信息
const saveStaff = async () => {
  const { phone, name, role } = formData.value

  // 表单验证
  if (!phone) {
    uni.showToast({ title: '请输入平台账号', icon: 'none' })
    return
  }

  if (!name) {
    uni.showToast({ title: '请输入员工名称', icon: 'none' })
    return
  }

  if (!role) {
    uni.showToast({ title: '请选择员工角色', icon: 'none' })
    return
  }

  // 手机号格式验证
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(phone)) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }

  uni.showLoading({ title: '保存中...' })

  try {
    const res = await addStaff({
      platformAccount: phone,
      name: name,
      roleName: role,
      phone: phone
    })
    uni.hideLoading()
    if (res.code === 200 || res.code === 0) {
      uni.showToast({ title: editMode.value ? '更新成功' : '保存成功', icon: 'success' })
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    } else {
      uni.showToast({ title: res.message || '保存失败', icon: 'none' })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('保存员工失败:', error)
    uni.showToast({ title: '保存失败', icon: 'none' })
  }
}

// 格式化日期时间
const formatDateTime = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 30rpx;
  box-sizing: border-box;
}

.form-container {
  width: 100%;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 36rpx 30rpx;
  border-bottom: 1rpx solid #f5f5f5;

  &.last {
    border-bottom: none;
  }
}

.form-item-clickable {
  &:active {
    background-color: #f8f8f8;
  }
}

.form-label {
  font-size: 30rpx;
  color: #333;
  width: 180rpx;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  font-size: 30rpx;
  color: #333;
  text-align: left;
  padding-left: 40rpx;
}

:deep(.uni-input-placeholder),
:deep(.input-placeholder) {
  color: #999;
  padding-left: 0;
}

.form-select {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 40rpx;
}

.form-select-text {
  font-size: 30rpx;
  color: #333;
}

.form-select-placeholder {
  font-size: 30rpx;
  color: #999;
}

.form-arrow {
  width: 32rpx;
  height: 32rpx;
}

.save-button-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30rpx;
  padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.save-button {
  width: 100%;
  height: 88rpx;
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