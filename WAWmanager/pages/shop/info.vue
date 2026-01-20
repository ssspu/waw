<template>
  <view class="container">
    <!-- 基础信息 -->
    <view class="section-title">基础信息</view>
    <view class="form-card">
      <view class="form-item">
        <text class="form-label">店铺图标</text>
        <view class="logo-wrapper" @tap="uploadLogo">
          <image class="shop-logo" :src="formData.logo || '/static/images/default-logo.png'" mode="aspectFill"></image>
        </view>
      </view>

      <view class="form-item">
        <text class="form-label">店铺名称</text>
        <input
          class="form-input"
          placeholder="请输入店铺名称"
          placeholder-class="placeholder"
          v-model="formData.name"
        />
      </view>

      <view class="form-item">
        <text class="form-label">店铺编号</text>
        <text class="form-value readonly">{{ formData.code }}</text>
      </view>

      <view class="form-item" @tap="selectService">
        <text class="form-label">主营服务</text>
        <view class="form-value-arrow">
          <text :class="{ placeholder: !formData.service }">{{ formData.service || '请选择主营服务' }}</text>
          <image class="arrow-icon" src="/static/icons/more.png" mode="aspectFit"></image>
        </view>
      </view>

      <view class="form-item last" @tap="selectAddress">
        <text class="form-label">店铺地址</text>
        <view class="form-value-arrow">
          <text :class="{ placeholder: !formData.address }">{{ formData.address || '请选择店铺地址' }}</text>
          <image class="arrow-icon" src="/static/icons/more.png" mode="aspectFit"></image>
        </view>
      </view>
    </view>

    <!-- 店主信息 -->
    <view class="section-title">
      <text class="title-text">店主信息</text>
      <text class="title-hint">方便顾客/平台与您联系</text>
    </view>
    <view class="form-card">
      <view class="form-item">
        <text class="form-label">联系人</text>
        <input
          class="form-input"
          placeholder="请输入门店服务人姓名"
          placeholder-class="placeholder"
          v-model="formData.contactName"
        />
      </view>

      <view class="form-item">
        <text class="form-label">手机号</text>
        <input
          class="form-input"
          placeholder="请输入门店服务电话"
          placeholder-class="placeholder"
          type="number"
          v-model="formData.phone"
        />
      </view>

      <view class="form-item">
        <text class="form-label">微信号</text>
        <input
          class="form-input"
          placeholder="请输入门店服务微信"
          placeholder-class="placeholder"
          v-model="formData.wechat"
        />
      </view>

      <view class="form-item last">
        <text class="form-label">邮箱</text>
        <input
          class="form-input"
          placeholder="请输入门店服务邮箱"
          placeholder-class="placeholder"
          v-model="formData.email"
        />
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="save-btn" @tap="saveInfo">
      <text>保存</text>
    </view>

    <!-- 主营服务选择弹窗 -->
    <view class="popup-mask" v-if="showServicePicker" @tap="closeServicePicker"></view>
    <view class="popup-container" :class="{ show: showServicePicker }">
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-cancel" @tap="closeServicePicker">取消</text>
          <text class="popup-title">选择主营服务</text>
          <text class="popup-confirm" @tap="confirmService">确定</text>
        </view>
        <view class="service-list">
          <view
            class="service-item"
            :class="{ active: tempService.includes(item) }"
            v-for="item in serviceOptions"
            :key="item"
            @tap="toggleService(item)"
          >
            <text>{{ item }}</text>
            <view class="check-icon" v-if="tempService.includes(item)">
              <text>✓</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 表单数据
const formData = ref({
  logo: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop',
  name: 'CD beautiful 美发沙龙',
  code: 'SC20251126',
  service: '美发、美容',
  address: '',
  contactName: '',
  phone: '',
  wechat: '',
  email: ''
})

// 主营服务选择
const showServicePicker = ref(false)
const serviceOptions = ['美发', '美容', '美甲', '美睫', '化妆', '养生']
const tempService = ref([])

// 页面加载
onLoad(() => {
  // 加载店铺信息
})

// 上传Logo
const uploadLogo = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      formData.value.logo = res.tempFilePaths[0]
    }
  })
}

// 选择主营服务
const selectService = () => {
  tempService.value = formData.value.service ? formData.value.service.split('、') : []
  showServicePicker.value = true
}

// 关闭服务选择器
const closeServicePicker = () => {
  showServicePicker.value = false
}

// 切换服务选择
const toggleService = (item) => {
  const index = tempService.value.indexOf(item)
  if (index > -1) {
    tempService.value.splice(index, 1)
  } else {
    tempService.value.push(item)
  }
}

// 确认服务选择
const confirmService = () => {
  formData.value.service = tempService.value.join('、')
  closeServicePicker()
}

// 选择地址
const selectAddress = () => {
  uni.chooseLocation({
    success: (res) => {
      formData.value.address = res.address
    },
    fail: () => {
      uni.showToast({ title: '请授权位置权限', icon: 'none' })
    }
  })
}

// 保存信息
const saveInfo = () => {
  if (!formData.value.name) {
    uni.showToast({ title: '请输入店铺名称', icon: 'none' })
    return
  }

  uni.showLoading({ title: '保存中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1000)
}
</script>

<style lang="scss" scoped>
.container {
  padding: 12rpx;
  min-height: 100vh;
  background-color: #F5F7FA;
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.section-title {
  margin-left:12rpx;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 28rpx;
  font-weight:700;
  color: #333;
  padding: 16rpx 0;
  background-color: #F5F7FA;
  .title-text {
    font-weight:700;
    font-size: 28rpx;
    color: #333;
  }

  .title-hint {
    font-weight:400;
    font-size: 24rpx;
    color: #999;
    margin-left: 12rpx;
  }
}

.form-card {
  width: 100%;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 32rpx 24rpx;
  border-bottom: 1rpx solid #F5F5F5;

  &.last {
    border-bottom: none;
  }
}

.form-label {
  font-size: 28rpx;
  color: #333;
  width: 160rpx;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
  text-align: right;
}

.placeholder {
  color: 98A2B3;
}

.form-value {
  flex: 1;
  font-size: 28rpx;
  color: #333;
  text-align: right;

  &.readonly {
    color: #333;
  }
}

.form-value-arrow {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  text {
    font-size: 28rpx;
    color: #333;

    &.placeholder {
      color: 98A2B3;
    }
  }
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 8rpx;
}

.logo-wrapper {
  margin-left: auto;
}

.shop-logo {
  width: 96rpx;
  height: 96rpx;
  border-radius: 12rpx;
  background-color: #f5f5f5;
}

.save-btn {
  position: fixed;
  left: 24rpx;
  right: 24rpx;
  bottom: calc(24rpx + env(safe-area-inset-bottom));
  height: 96rpx;
  background-color: 98A2B3;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
  }

  &:active {
    opacity: 0.8;
  }
}

// 弹窗遮罩
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

// 弹窗容器
.popup-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;

  &.show {
    transform: translateY(0);
  }
}

.popup-content {
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.popup-cancel {
  font-size: 30rpx;
  color: #999;
}

.popup-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
}

.popup-confirm {
  font-size: 30rpx;
  color: 98A2B3;
}

.service-list {
  max-height: 600rpx;
  overflow-y: auto;
}

.service-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  border-bottom: 1rpx solid #f5f5f5;

  text {
    font-size: 30rpx;
    color: #333;
  }

  &.active {
    text {
      color: 98A2B3;
    }
  }

  &:last-child {
    border-bottom: none;
  }
}

.check-icon {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: 98A2B3;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 24rpx;
    color: #fff;
  }
}
</style>
