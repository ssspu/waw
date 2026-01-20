<template>
  <view class="container">
    <!-- 表单内容 -->
    <scroll-view class="form-scroll" scroll-y>
      <!-- 门店名称 -->
      <view class="form-card">
        <view class="form-item">
          <text class="form-label">门店名称</text>
          <input
            class="form-input"
            placeholder="支持最多20个字符"
            placeholder-class="placeholder"
            v-model="formData.name"
            maxlength="20"
          />
        </view>
        <view class="form-divider"></view>
        <view class="form-item">
          <text class="form-label">门店电话</text>
          <input
            class="form-input"
            placeholder="门店的固话或移动电话"
            placeholder-class="placeholder"
            v-model="formData.phone"
            type="text"
          />
        </view>
      </view>

      <!-- 门店地址 -->
      <view class="form-card">
        <view class="form-item" @tap="chooseLocation">
          <text class="form-label">门店地址</text>
          <view class="form-value-row">
            <image class="location-icon" src="/static/icons/location@3x.png" mode="aspectFit"></image>
            <text class="form-placeholder" v-if="!formData.address">标记店铺地址</text>
            <text class="form-value" v-else>{{ formData.address }}</text>
          </view>
        </view>
        <view class="form-divider"></view>
        <view class="form-item">
          <text class="form-label">门牌号码</text>
          <input
            class="form-input"
            placeholder="输入详细地址 例：5楼518号"
            placeholder-class="placeholder"
            v-model="formData.addressDetail"
          />
        </view>
      </view>

      <!-- 门店照片 -->
      <view class="form-card">
        <view class="photo-section">
          <view class="photo-header">
            <text class="form-label">门店照片</text>
            <text class="photo-tip">需拍出完整门匾、内部环境、前台</text>
          </view>
          <view class="photo-list">
            <!-- 门头照 -->
            <view class="photo-item" @tap="chooseImage('front')">
              <image
                v-if="formData.frontPhoto"
                class="photo-preview"
                :src="formData.frontPhoto"
                mode="aspectFill"
              ></image>
              <view class="photo-upload" v-else>
                <text class="upload-icon">+</text>
              </view>
              <text class="photo-label">门头照</text>
            </view>
            <!-- 内景照 -->
            <view class="photo-item" @tap="chooseImage('interior')">
              <image
                v-if="formData.interiorPhoto"
                class="photo-preview"
                :src="formData.interiorPhoto"
                mode="aspectFill"
              ></image>
              <view class="photo-upload" v-else>
                <text class="upload-icon">+</text>
              </view>
              <text class="photo-label">内景照</text>
            </view>
            <!-- 收银台 -->
            <view class="photo-item" @tap="chooseImage('cashier')">
              <image
                v-if="formData.cashierPhoto"
                class="photo-preview"
                :src="formData.cashierPhoto"
                mode="aspectFill"
              ></image>
              <view class="photo-upload" v-else>
                <text class="upload-icon">+</text>
              </view>
              <text class="photo-label">收银台</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 营业设置 -->
      <view class="form-card">
        <view class="form-item">
          <text class="form-label">是否营业</text>
          <switch
            class="form-switch"
            :checked="formData.isOpen"
            @change="onSwitchChange"
            color="#4CD964"
          />
        </view>
        <view class="form-divider"></view>
        <view class="form-item" @tap="showTimePicker">
          <text class="form-label">营业时间</text>
          <view class="form-value-row">
            <text class="form-placeholder" v-if="!formData.businessTime">选择营业时间段</text>
            <text class="form-value" v-else>{{ formData.businessTime }}</text>
            <view class="arrow-icon-box">
              <text class="arrow-text">›</text>
            </view>
          </view>
        </view>
        <view class="form-divider"></view>
        <view class="form-item">
          <text class="form-label">门店推荐</text>
          <input
            class="form-input"
            placeholder="简述门店的特色服务或优势"
            placeholder-class="placeholder"
            v-model="formData.recommendation"
          />
        </view>
      </view>
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="bottom-btn" :class="{ 'edit-mode': isEdit }">
      <view class="delete-btn" v-if="isEdit" @tap="showDeleteModal = true">
        <text>删除</text>
      </view>
      <view class="save-btn" :class="{ 'with-delete': isEdit }" @tap="handleSave">
        <text>保存</text>
      </view>
    </view>

    <!-- 删除确认弹窗 -->
    <view class="confirm-mask" v-if="showDeleteModal" @tap="showDeleteModal = false"></view>
    <view class="confirm-modal" :class="{ show: showDeleteModal }">
      <view class="confirm-title">删除门店</view>
      <view class="confirm-content">
        <text>确定删除此门店吗？</text>
        <text class="confirm-sub">删除后请补充你的服务门店信息</text>
      </view>
      <view class="confirm-buttons">
        <view class="confirm-btn cancel" @tap="showDeleteModal = false">
          <text>取消</text>
        </view>
        <view class="confirm-btn confirm" @tap="handleDelete">
          <text>确定</text>
        </view>
      </view>
    </view>

    <!-- 时间选择器 -->
    <view class="picker-mask" v-if="showTimePickerModal" @tap="closeTimePicker"></view>
    <view class="picker-container" :class="{ show: showTimePickerModal }">
      <view class="picker-header">
        <text class="picker-cancel" @tap="closeTimePicker">取消</text>
        <text class="picker-title">选择营业时间</text>
        <text class="picker-confirm" @tap="confirmTime">确定</text>
      </view>
      <view class="time-picker-content">
        <view class="time-row">
          <text class="time-label">开始时间</text>
          <picker mode="time" :value="tempStartTime" @change="onStartTimeChange">
            <view class="time-value">{{ tempStartTime || '09:00' }}</view>
          </picker>
        </view>
        <view class="time-row">
          <text class="time-label">结束时间</text>
          <picker mode="time" :value="tempEndTime" @change="onEndTimeChange">
            <view class="time-value">{{ tempEndTime || '21:00' }}</view>
          </picker>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 表单数据
const formData = reactive({
  name: '',
  phone: '',
  address: '',
  addressDetail: '',
  frontPhoto: '',
  interiorPhoto: '',
  cashierPhoto: '',
  isOpen: true,
  businessTime: '',
  recommendation: '',
  latitude: 0,
  longitude: 0
})

// 时间选择器
const showTimePickerModal = ref(false)
const tempStartTime = ref('09:00')
const tempEndTime = ref('21:00')

// 编辑模式
const isEdit = ref(false)
const storeId = ref('')
const showDeleteModal = ref(false)

// 页面加载
onLoad((options) => {
  if (options.id) {
    isEdit.value = true
    storeId.value = options.id
    uni.setNavigationBarTitle({ title: '编辑服务门店' })
    // 加载门店数据
    loadStoreData(options.id)
  } else {
    uni.setNavigationBarTitle({ title: '添加线下服务门店' })
  }
})

// 加载门店数据
const loadStoreData = (id) => {
  // 从 Storage 获取门店列表
  const storeData = uni.getStorageSync('editStoreData')
  if (storeData) {
    formData.name = storeData.name || ''
    formData.phone = storeData.phone || ''
    formData.address = storeData.address || ''
    formData.addressDetail = storeData.addressDetail || ''
    formData.frontPhoto = storeData.logo || ''
    formData.isOpen = storeData.status === '正常营业'
    formData.businessTime = storeData.businessTime || ''
    formData.recommendation = storeData.recommendation || ''
    uni.removeStorageSync('editStoreData')
  }
}

// 选择位置
const chooseLocation = () => {
  uni.chooseLocation({
    success: (res) => {
      formData.address = res.address
      formData.latitude = res.latitude
      formData.longitude = res.longitude
    },
    fail: (err) => {
      console.log('选择位置失败', err)
      // 小程序环境可能需要授权
      uni.showToast({ title: '请授权位置权限', icon: 'none' })
    }
  })
}

// 选择图片
const chooseImage = (type) => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      if (type === 'front') {
        formData.frontPhoto = tempFilePath
      } else if (type === 'interior') {
        formData.interiorPhoto = tempFilePath
      } else if (type === 'cashier') {
        formData.cashierPhoto = tempFilePath
      }
    }
  })
}

// 营业开关变化
const onSwitchChange = (e) => {
  formData.isOpen = e.detail.value
}

// 显示时间选择器
const showTimePicker = () => {
  showTimePickerModal.value = true
}

// 关闭时间选择器
const closeTimePicker = () => {
  showTimePickerModal.value = false
}

// 开始时间变化
const onStartTimeChange = (e) => {
  tempStartTime.value = e.detail.value
}

// 结束时间变化
const onEndTimeChange = (e) => {
  tempEndTime.value = e.detail.value
}

// 确认时间选择
const confirmTime = () => {
  formData.businessTime = `${tempStartTime.value} - ${tempEndTime.value}`
  closeTimePicker()
}

// 表单验证
const validateForm = () => {
  if (!formData.name.trim()) {
    uni.showToast({ title: '请输入门店名称', icon: 'none' })
    return false
  }
  if (!formData.phone.trim()) {
    uni.showToast({ title: '请输入门店电话', icon: 'none' })
    return false
  }
  if (!formData.address) {
    uni.showToast({ title: '请选择门店地址', icon: 'none' })
    return false
  }
  return true
}

// 保存
const handleSave = () => {
  if (!validateForm()) return

  uni.showLoading({ title: '保存中...' })

  // 模拟保存
  setTimeout(() => {
    uni.hideLoading()

    // 将门店数据存储到 Storage
    const storeData = {
      id: isEdit.value ? storeId.value : Date.now(),
      name: formData.name,
      phone: formData.phone,
      address: formData.address || formData.addressDetail,
      addressDetail: formData.addressDetail,
      logo: formData.frontPhoto || '',
      status: formData.isOpen ? '正常营业' : '暂停营业',
      businessTime: formData.businessTime,
      recommendation: formData.recommendation
    }

    if (isEdit.value) {
      // 编辑模式：更新门店
      uni.setStorageSync('updateServiceStore', { id: storeId.value, data: storeData })
    } else {
      // 新增模式
      uni.setStorageSync('newServiceStore', storeData)
    }

    uni.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1000)
}

// 删除门店
const handleDelete = () => {
  showDeleteModal.value = false
  uni.showLoading({ title: '删除中...' })

  setTimeout(() => {
    uni.hideLoading()
    // 存储要删除的门店ID
    uni.setStorageSync('deleteServiceStore', storeId.value)
    uni.showToast({ title: '删除成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 500)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  display: flex;
  flex-direction: column;
}

.form-scroll {
  flex: 1;
  padding: 24rpx;
  padding-bottom: 140rpx;
}

// 表单卡片
.form-card {
  padding: 14rpx;
  background-color: #fff;
  border-radius: 16rpx;
  margin: 24rpx;
  margin-top: 0;
  overflow: hidden;
}

.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 96rpx;
}

.form-label {
  font-size: 30rpx;
  color: #333;
  flex-shrink: 0;
  width: 160rpx;
}

.form-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
  text-align: left;
  padding-left: 0;
}

.placeholder {
  color: #999;
}

.form-divider {
  height: 1rpx;
  background-color: #F5F5F5;
  margin-left: 32rpx;
}

.form-value-row {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.form-placeholder {
  font-size: 28rpx;
  color: #999;
}

.form-value {
  font-size: 28rpx;
  color: #333;
  flex: 1;
  text-align: left;
}

.location-icon {
  width: 28rpx;
  height: 28rpx;
  margin-right: 12rpx;
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 8rpx;
}

.arrow-icon-box {
  margin-left: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-text {
  font-size: 40rpx;
  color: #999;
  font-weight: 300;
  line-height: 1;
}

.photo-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.photo-tip {
  font-size: 28rpx;
  color: #999;
}

.photo-list {
  display: flex;
  justify-content: flex-end;
  gap: 24rpx;
}

.photo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-upload {
  width: 152rpx;
  height: 152rpx;
  background-color: #EAECF0;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx dashed #D0D5DD;
}

.photo-preview {
  width: 152rpx;
  height: 152rpx;
  border-radius: 12rpx;
}

.upload-icon {
  font-size: 56rpx;
  color: #C0C4CC;
  line-height: 1;
}

.photo-label {
  font-size: 24rpx;
  color: #666;
  margin-top: 12rpx;
}

// 开关样式
.form-switch {
  transform: scale(0.8);
}

// 底部按钮
.bottom-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  display: flex;
  gap: 24rpx;

  &.edit-mode {
    display: flex;
  }
}

.delete-btn {
  flex: 1;
  height: 96rpx;
  background-color: #fff;
  border: 2rpx solid #DCDFE6;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
  }

  &:active {
    opacity: 0.8;
  }
}

.save-btn {
  flex: 1;
  height: 96rpx;
  background-color: #4A90E2;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }

  &:active {
    opacity: 0.8;
  }

  &.with-delete {
    flex: 1;
  }
}

// 删除确认弹窗
.confirm-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.confirm-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 590rpx;
  background-color: #fff;
  border-radius: 24rpx;
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-out;

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
  }
}

.confirm-title {
  font-size: 34rpx;
  color: #333;
  font-weight: 500;
  text-align: center;
  padding: 48rpx 32rpx 24rpx;
}

.confirm-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32rpx 48rpx;

  text {
    font-size: 28rpx;
    color: #333;
    line-height: 1.5;
  }

  .confirm-sub {
    font-size: 26rpx;
    color: #999;
    margin-top: 8rpx;
  }
}

.confirm-buttons {
  display: flex;
  gap: 24rpx;
  padding: 0 32rpx 32rpx;
}

.confirm-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &.cancel {
    background-color: #F5F7FA;

    text {
      font-size: 32rpx;
      color: #333;
    }
  }

  &.confirm {
    background-color: #4A90E2;

    text {
      font-size: 32rpx;
      color: #fff;
    }
  }

  &:active {
    opacity: 0.8;
  }
}

// 时间选择器
.picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.picker-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  z-index: 1001;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;

  &.show {
    transform: translateY(0);
  }
}

.picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.picker-cancel {
  font-size: 30rpx;
  color: #999;
}

.picker-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
}

.picker-confirm {
  font-size: 30rpx;
  color: #4A90E2;
}

.time-picker-content {
  padding: 32rpx;
}

.time-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.time-label {
  font-size: 30rpx;
  color: #333;
}

.time-value {
  font-size: 30rpx;
  color: #4A90E2;
  padding: 16rpx 32rpx;
  background-color: #F5F7FA;
  border-radius: 8rpx;
}
</style>
