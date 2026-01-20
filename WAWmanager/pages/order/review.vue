<template>
  <view class="container">
    <!-- 对设计师满意吗 -->
    <view class="review-section">
      <view class="section-title">您对设计师满意吗?</view>

      <!-- 设计师信息 -->
      <view class="designer-info" @tap="goDesignerDetail">
        <text class="designer-name">{{ designer.name }}</text>
        <text class="designer-type">{{ designer.type }}</text>
        <image class="arrow-icon" src="/static/icons/arrow-right.png" mode="aspectFit"></image>
      </view>

      <!-- 产品信息 -->
      <view class="product-card">
        <image class="product-image" :src="product.image" mode="aspectFill"></image>
        <view class="product-info">
          <text class="product-name">{{ product.name }}</text>
          <text class="product-desc">{{ product.desc }}</text>
          <text class="product-spec">{{ product.spec }}</text>
        </view>
        <view class="product-price">
          <text class="price">¥{{ product.price }}</text>
          <text class="quantity">x{{ product.quantity }}</text>
        </view>
      </view>

      <!-- 设计师评分 -->
      <view class="rating-card">
        <view class="rating-score">
          <text class="score-value">{{ designerRating.total }}</text>
          <text class="score-unit">分</text>
          <text class="score-label">服务评价</text>
        </view>
        <view class="rating-details">
          <view class="rating-item">
            <text class="rating-label">专业</text>
            <view class="rating-stars">
              <text class="star" v-for="i in 5" :key="i" :class="{ active: i <= designerRating.professional }">★</text>
            </view>
            <text class="rating-value">{{ designerRating.professional.toFixed(1) }}</text>
          </view>
          <view class="rating-item">
            <text class="rating-label">服务</text>
            <view class="rating-stars">
              <text class="star" v-for="i in 5" :key="i" :class="{ active: i <= designerRating.service }">★</text>
            </view>
            <text class="rating-value">{{ designerRating.service.toFixed(1) }}</text>
          </view>
          <view class="rating-item">
            <text class="rating-label">效果</text>
            <view class="rating-stars">
              <text class="star" v-for="i in 5" :key="i" :class="{ active: i <= designerRating.effect }">★</text>
            </view>
            <text class="rating-value">{{ designerRating.effect.toFixed(1) }}</text>
          </view>
          <view class="rating-item">
            <text class="rating-label">环境</text>
            <view class="rating-stars">
              <text class="star" v-for="i in 5" :key="i" :class="{ active: i <= designerRating.environment }">★</text>
            </view>
            <text class="rating-value">{{ designerRating.environment.toFixed(1) }}</text>
          </view>
        </view>
      </view>

      <!-- 设计师评价输入 -->
      <view class="review-input-card">
        <textarea
          class="review-textarea"
          placeholder="分享你的体验感受，可以帮助更多人哦！"
          v-model="designerReview"
          maxlength="200"
        ></textarea>

        <!-- 添加图片/视频 -->
        <view class="media-upload">
          <view class="upload-btn" @tap="uploadImage('designer')">
            <image class="upload-icon" src="/static/icons/camera.png" mode="aspectFit"></image>
            <text>添加图片</text>
          </view>
          <view class="upload-btn" @tap="uploadVideo('designer')">
            <image class="upload-icon" src="/static/icons/video.png" mode="aspectFit"></image>
            <text>添加视频</text>
          </view>
        </view>

        <!-- 评价标签 -->
        <view class="review-tags">
          <view
            class="tag-item"
            :class="{ active: designerTags.includes(tag) }"
            v-for="tag in designerTagOptions"
            :key="tag"
            @tap="toggleDesignerTag(tag)"
          >
            <text>{{ tag }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 对店铺满意吗 -->
    <view class="review-section">
      <view class="section-title">您对店铺满意吗?</view>

      <!-- 店铺信息 -->
      <view class="store-card">
        <image class="store-logo" :src="store.logo" mode="aspectFill"></image>
        <view class="store-info">
          <view class="store-name-row">
            <text class="store-name">{{ store.name }}</text>
            <view class="store-badge">{{ store.badge }}</view>
          </view>
          <view class="store-meta">
            <text>{{ store.type }}</text>
            <text class="divider">|</text>
            <text>{{ store.year }}年开业</text>
          </view>
          <view class="store-stats">
            <text class="store-rating">{{ store.rating }}</text>
            <image class="rating-icon" src="/static/icons/star-fill.png" mode="aspectFit"></image>
            <text class="store-designer">设计师{{ store.designerCount }}人</text>
            <text class="divider">|</text>
            <text class="store-service">服务{{ store.serviceCount }}</text>
          </view>
        </view>
      </view>

      <!-- 店铺评分 -->
      <view class="rating-card">
        <view class="rating-score">
          <text class="score-value">{{ storeRating.total }}</text>
          <text class="score-unit">分</text>
          <text class="score-label">服务评价</text>
        </view>
        <view class="rating-details">
          <view class="rating-item">
            <text class="rating-label">专业</text>
            <view class="rating-stars">
              <text class="star" v-for="i in 5" :key="'store-pro-'+i" :class="{ active: i <= storeRating.professional }">★</text>
            </view>
            <text class="rating-value">{{ storeRating.professional.toFixed(1) }}</text>
          </view>
          <view class="rating-item">
            <text class="rating-label">服务</text>
            <view class="rating-stars">
              <text class="star" v-for="i in 5" :key="'store-ser-'+i" :class="{ active: i <= storeRating.service }">★</text>
            </view>
            <text class="rating-value">{{ storeRating.service.toFixed(1) }}</text>
          </view>
          <view class="rating-item">
            <text class="rating-label">效果</text>
            <view class="rating-stars">
              <text class="star" v-for="i in 5" :key="'store-eff-'+i" :class="{ active: i <= storeRating.effect }">★</text>
            </view>
            <text class="rating-value">{{ storeRating.effect.toFixed(1) }}</text>
          </view>
          <view class="rating-item">
            <text class="rating-label">环境</text>
            <view class="rating-stars">
              <text class="star" v-for="i in 5" :key="'store-env-'+i" :class="{ active: i <= storeRating.environment }">★</text>
            </view>
            <text class="rating-value">{{ storeRating.environment.toFixed(1) }}</text>
          </view>
        </view>
      </view>

      <!-- 店铺评价输入 -->
      <view class="review-input-card">
        <textarea
          class="review-textarea"
          placeholder="分享你的体验感受，可以帮助更多人哦！"
          v-model="storeReview"
          maxlength="200"
        ></textarea>

        <!-- 添加图片/视频 -->
        <view class="media-upload">
          <view class="upload-btn" @tap="uploadImage('store')">
            <image class="upload-icon" src="/static/icons/camera.png" mode="aspectFit"></image>
            <text>添加图片</text>
          </view>
          <view class="upload-btn" @tap="uploadVideo('store')">
            <image class="upload-icon" src="/static/icons/video.png" mode="aspectFit"></image>
            <text>添加视频</text>
          </view>
        </view>

        <!-- 评价标签 -->
        <view class="review-tags">
          <view
            class="tag-item"
            :class="{ active: storeTags.includes(tag) }"
            v-for="tag in storeTagOptions"
            :key="tag"
            @tap="toggleStoreTag(tag)"
          >
            <text>{{ tag }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 发布按钮 -->
    <view class="submit-btn" @tap="submitReview">
      <text>发布点评</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 设计师信息
const designer = ref({
  name: '李天天',
  type: '美发师'
})

// 产品信息
const product = ref({
  image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=100&fit=crop',
  name: '欧莱雅植物洗护套装一套',
  desc: '洗发水+护发素',
  spec: '500ml+500ml',
  price: 799,
  quantity: 1
})

// 店铺信息
const store = ref({
  logo: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop',
  name: '成都NICE造型沙龙',
  badge: '舒适',
  type: '专业店',
  year: 2012,
  rating: 4.8,
  designerCount: 8,
  serviceCount: 1236
})

// 设计师评分
const designerRating = ref({
  total: 4.8,
  professional: 4.6,
  service: 4.9,
  effect: 4.8,
  environment: 4.8
})

// 店铺评分
const storeRating = ref({
  total: 4.8,
  professional: 4.6,
  service: 4.9,
  effect: 4.8,
  environment: 4.8
})

// 评价内容
const designerReview = ref('')
const storeReview = ref('')

// 评价标签
const designerTagOptions = ['服务热情', '环境优雅', '无隐形消费', '非常好', '环境优雅', '无隐形消费', '非常好']
const storeTagOptions = ['服务热情', '环境优雅', '无隐形消费', '非常好', '环境优雅', '无隐形消费', '非常好']
const designerTags = ref(['服务热情'])
const storeTags = ref(['服务热情'])

// 页面加载
onLoad((options) => {
  if (options.orderId) {
    loadOrderData(options.orderId)
  }
})

// 加载订单数据
const loadOrderData = (orderId) => {
  // 模拟加载数据
}

// 切换设计师评价标签
const toggleDesignerTag = (tag) => {
  const index = designerTags.value.indexOf(tag)
  if (index > -1) {
    designerTags.value.splice(index, 1)
  } else {
    designerTags.value.push(tag)
  }
}

// 切换店铺评价标签
const toggleStoreTag = (tag) => {
  const index = storeTags.value.indexOf(tag)
  if (index > -1) {
    storeTags.value.splice(index, 1)
  } else {
    storeTags.value.push(tag)
  }
}

// 上传图片
const uploadImage = (type) => {
  uni.chooseImage({
    count: 9,
    success: (res) => {
      uni.showToast({ title: '图片上传成功', icon: 'success' })
    }
  })
}

// 上传视频
const uploadVideo = (type) => {
  uni.chooseVideo({
    success: (res) => {
      uni.showToast({ title: '视频上传成功', icon: 'success' })
    }
  })
}

// 跳转设计师详情
const goDesignerDetail = () => {
  uni.showToast({ title: '功能开发中', icon: 'none' })
}

// 提交评价
const submitReview = () => {
  uni.showLoading({ title: '提交中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '评价发布成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1000)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.review-section {
  background-color: #fff;
  margin-bottom: 20rpx;
  padding: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
}

// 设计师信息
.designer-info {
  display: flex;
  align-items: center;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
  margin-bottom: 20rpx;
}

.designer-name {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
}

.designer-type {
  font-size: 24rpx;
  color: #999;
  margin-left: 16rpx;
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: auto;
}

// 产品卡片
.product-card {
  display: flex;
  padding: 20rpx;
  background-color: #F8FAFC;
  border-radius: 12rpx;
  margin-bottom: 24rpx;
}

.product-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-name {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.product-desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 4rpx;
}

.product-spec {
  font-size: 22rpx;
  color: #999;
}

.product-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.price {
  font-size: 32rpx;
  color: #FF6B35;
  font-weight: 600;
}

.quantity {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

// 评分卡片
.rating-card {
  display: flex;
  padding: 24rpx;
  background-color: #F8FAFC;
  border-radius: 12rpx;
  margin-bottom: 24rpx;
}

.rating-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 32rpx;
  border-right: 1rpx solid #E8E8E8;
  min-width: 120rpx;
}

.score-value {
  font-size: 56rpx;
  font-weight: 600;
  color: #333;
  line-height: 1;
}

.score-unit {
  font-size: 24rpx;
  color: #666;
  margin-top: 4rpx;
}

.score-label {
  font-size: 22rpx;
  color: #999;
  margin-top: 8rpx;
}

.rating-details {
  flex: 1;
  padding-left: 32rpx;
}

.rating-item {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.rating-label {
  font-size: 24rpx;
  color: #666;
  width: 60rpx;
}

.rating-stars {
  display: flex;
  margin: 0 12rpx;
}

.star {
  font-size: 28rpx;
  color: #E8E8E8;
  margin-right: 4rpx;

  &.active {
    color: #FFB800;
  }
}

.rating-value {
  font-size: 24rpx;
  color: #333;
}

// 评价输入卡片
.review-input-card {
  background-color: #F8FAFC;
  border-radius: 12rpx;
  padding: 24rpx;
}

.review-textarea {
  width: 100%;
  height: 160rpx;
  font-size: 28rpx;
  color: #333;
  background-color: transparent;
}

.media-upload {
  display: flex;
  gap: 24rpx;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #E8E8E8;
}

.upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  padding: 20rpx 32rpx;
  background-color: #fff;
  border-radius: 12rpx;
  border: 2rpx dashed #ddd;

  text {
    font-size: 22rpx;
    color: #999;
  }
}

.upload-icon {
  width: 48rpx;
  height: 48rpx;
}

.review-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  padding-top: 20rpx;
}

.tag-item {
  padding: 12rpx 24rpx;
  background-color: #fff;
  border-radius: 24rpx;
  border: 2rpx solid #E8E8E8;

  text {
    font-size: 24rpx;
    color: #666;
  }

  &.active {
    background-color: #FFF8F0;
    border-color: #FF6B35;

    text {
      color: #FF6B35;
    }
  }
}

// 店铺卡片
.store-card {
  display: flex;
  padding: 20rpx;
  background-color: #F8FAFC;
  border-radius: 12rpx;
  margin-bottom: 24rpx;
}

.store-logo {
  width: 100rpx;
  height: 100rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
}

.store-info {
  flex: 1;
  margin-left: 20rpx;
}

.store-name-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.store-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}

.store-badge {
  font-size: 20rpx;
  color: #4A90E2;
  background-color: #E8F4FD;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
  margin-left: 12rpx;
}

.store-meta {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;

  .divider {
    margin: 0 8rpx;
  }
}

.store-stats {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #666;

  .divider {
    margin: 0 8rpx;
    color: #ddd;
  }
}

.store-rating {
  font-weight: 600;
  color: #333;
}

.rating-icon {
  width: 24rpx;
  height: 24rpx;
  margin-left: 4rpx;
  margin-right: 12rpx;
}

// 提交按钮
.submit-btn {
  position: fixed;
  left: 24rpx;
  right: 24rpx;
  bottom: calc(24rpx + env(safe-area-inset-bottom));
  height: 96rpx;
  background-color: #4A90E2;
  border-radius: 12rpx;
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
}
</style>
