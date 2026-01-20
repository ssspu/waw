<template>
  <view class="container">
    <!-- 背景图 -->
    <image class="bg-image" src="/pages/technician/static/yaoqing-bg.png" mode="aspectFill"></image>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 店铺信息卡片 -->
      <view class="store-card">
        <!-- 店铺头部 -->
        <view class="store-header">
          <image class="store-logo" :src="storeInfo.logo" mode="aspectFill"></image>
          <view class="store-info">
            <text class="store-name">{{ storeInfo.name }}</text>
            <view class="store-tags">
              <text class="store-tag">{{ storeInfo.category }}</text>
              <text class="store-tag">{{ storeInfo.level }}</text>
            </view>
          </view>
        </view>

        <!-- 店铺描述 -->
        <view class="store-desc">
          <text>{{ storeInfo.description }}</text>
        </view>

        <!-- 分割线 -->
        <view class="divider"></view>

        <!-- 店铺信息列表 -->
        <view class="info-list">
          <view class="info-item">
            <text class="info-label">营业时间</text>
            <text class="info-value">{{ storeInfo.businessHours }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">店铺地址</text>
            <text class="info-value">{{ storeInfo.address }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">联系电话</text>
            <text class="info-value">{{ storeInfo.phone }}</text>
          </view>
        </view>

        <!-- 分割线 -->
        <view class="divider"></view>

        <!-- 招聘信息 -->
        <view class="recruit-section">
          <text class="recruit-title">招聘岗位</text>
          <view class="position-list">
            <view class="position-item" v-for="pos in storeInfo.positions" :key="pos">
              <text>{{ pos }}</text>
            </view>
          </view>
        </view>

        <!-- 福利待遇 -->
        <view class="benefits-section">
          <text class="benefits-title">福利待遇</text>
          <view class="benefits-list">
            <view class="benefit-tag" v-for="benefit in storeInfo.benefits" :key="benefit">
              <text>{{ benefit }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 申请按钮 -->
      <view class="apply-btn-wrapper">
        <view class="apply-btn" @tap="applyToJoin">
          <text>申请加入</text>
        </view>
      </view>
    </view>

    <!-- 申请成功弹窗 -->
    <view class="success-mask" v-if="showSuccessModal" @tap="closeSuccessModal"></view>
    <view class="success-modal" :class="{ show: showSuccessModal }">
      <image class="success-icon" src="/static/icons/check-circle.png" mode="aspectFit"></image>
      <text class="success-title">申请已提交</text>
      <text class="success-desc">请等待店铺管理员审核</text>
      <view class="success-btn" @tap="closeSuccessModal">
        <text>我知道了</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 店铺信息
const storeInfo = reactive({
  logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop',
  name: 'WAW造型',
  category: '美发沙龙',
  level: '高端店铺',
  description: '专注于时尚造型设计，为顾客提供个性化的美发服务体验。我们拥有专业的技术团队和舒适的服务环境。',
  businessHours: '09:00 - 21:00',
  address: '北京市朝阳区建国路88号SOHO现代城A座1层',
  phone: '400-888-8888',
  positions: ['美发师', '美容师', '美甲师', '学徒'],
  benefits: ['五险一金', '带薪年假', '技能培训', '晋升空间', '员工折扣']
})

// 成功弹窗
const showSuccessModal = ref(false)

// 页面加载
onLoad((options) => {
  if (options.storeId) {
    loadStoreInfo(options.storeId)
  }
})

// 加载店铺信息
const loadStoreInfo = (storeId) => {
  // 根据storeId加载店铺信息
}

// 申请加入
const applyToJoin = () => {
  uni.showLoading({ title: '提交中...' })
  setTimeout(() => {
    uni.hideLoading()
    showSuccessModal.value = true
  }, 1000)
}

// 关闭成功弹窗
const closeSuccessModal = () => {
  showSuccessModal.value = false
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  padding: 120rpx 48rpx 48rpx;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

// 店铺卡片
.store-card {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.store-header {
  display: flex;
  align-items: center;
}

.store-logo {
  width: 120rpx;
  height: 120rpx;
  border-radius: 16rpx;
  flex-shrink: 0;
}

.store-info {
  flex: 1;
  margin-left: 24rpx;
}

.store-name {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  display: block;
}

.store-tags {
  display: flex;
  gap: 12rpx;
  margin-top: 12rpx;
}

.store-tag {
  font-size: 22rpx;
  color: #5280FF;
  background-color: #EBF2FF;
  padding: 6rpx 16rpx;
  border-radius: 6rpx;
}

.store-desc {
  margin-top: 24rpx;

  text {
    font-size: 26rpx;
    color: #666;
    line-height: 1.6;
  }
}

.divider {
  height: 1rpx;
  background-color: #F0F0F0;
  margin: 32rpx 0;
}

// 信息列表
.info-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.info-item {
  display: flex;
  align-items: flex-start;
}

.info-label {
  width: 140rpx;
  font-size: 26rpx;
  color: #999;
  flex-shrink: 0;
}

.info-value {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}

// 招聘岗位
.recruit-section {
  margin-top: 8rpx;
}

.recruit-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.position-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.position-item {
  padding: 12rpx 28rpx;
  background-color: #F5F7FA;
  border-radius: 8rpx;

  text {
    font-size: 26rpx;
    color: #333;
  }
}

// 福利待遇
.benefits-section {
  margin-top: 32rpx;
}

.benefits-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.benefits-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.benefit-tag {
  padding: 12rpx 28rpx;
  background-color: #FFF7E6;
  border-radius: 8rpx;

  text {
    font-size: 26rpx;
    color: #FF9500;
  }
}

// 申请按钮
.apply-btn-wrapper {
  margin-top: auto;
  padding-top: 48rpx;
}

.apply-btn {
  height: 96rpx;
  background: linear-gradient(135deg, #7D7CE3 0%, #3CA4FC 100%);
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(74, 144, 226, 0.3);

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }

  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
}

// 成功弹窗
.success-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.success-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 560rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 64rpx 48rpx 48rpx;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-out;
  text-align: center;

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
  }
}

.success-icon {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 32rpx;
}

.success-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 16rpx;
}

.success-desc {
  font-size: 28rpx;
  color: #999;
  display: block;
  margin-bottom: 48rpx;
}

.success-btn {
  height: 88rpx;
  background-color: #4A90E2;
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 30rpx;
    color: #fff;
  }

  &:active {
    opacity: 0.8;
  }
}
</style>
