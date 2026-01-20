<template>
  <view class="container">
    <!-- 作品上传页面 -->
    <view v-if="currentTab === 'works'" class="works-page">
      <!-- 表单内容 -->
      <scroll-view class="form-scroll" scroll-y>
        <view class="form-card">
          <!-- 人物类型 -->
          <view class="form-section">
            <text class="section-label">人物类型</text>
            <view class="tag-group">
              <view
                class="tag-item"
                :class="{ active: personType === 'female' }"
                @tap="personType = 'female'"
              >女生</view>
              <view
                class="tag-item"
                :class="{ active: personType === 'male' }"
                @tap="personType = 'male'"
              >男生</view>
              <view
                class="tag-item"
                :class="{ active: personType === 'child' }"
                @tap="personType = 'child'"
              >儿童</view>
            </view>
          </view>

          <!-- 脸型 -->
          <view class="form-section">
            <text class="section-label">脸型</text>
            <view class="face-group">
              <view
                class="face-item"
                :class="{ active: faceType === 'round' }"
                @tap="faceType = 'round'"
              >
                <view class="face-icon round"></view>
              </view>
              <view
                class="face-item"
                :class="{ active: faceType === 'oval' }"
                @tap="faceType = 'oval'"
              >
                <view class="face-icon oval"></view>
              </view>
              <view
                class="face-item"
                :class="{ active: faceType === 'square' }"
                @tap="faceType = 'square'"
              >
                <view class="face-icon square"></view>
              </view>
              <view
                class="face-item"
                :class="{ active: faceType === 'diamond' }"
                @tap="faceType = 'diamond'"
              >
                <view class="face-icon diamond"></view>
              </view>
              <view
                class="face-item"
                :class="{ active: faceType === 'triangle' }"
                @tap="faceType = 'triangle'"
              >
                <view class="face-icon triangle"></view>
              </view>
              <view
                class="face-item"
                :class="{ active: faceType === 'oblong' }"
                @tap="faceType = 'oblong'"
              >
                <view class="face-icon oblong"></view>
              </view>
            </view>
          </view>

          <!-- 发量 -->
          <view class="form-section">
            <text class="section-label">发量</text>
            <view class="tag-group">
              <view
                class="tag-item"
                :class="{ active: hairAmount === 'less' }"
                @tap="hairAmount = 'less'"
              >少</view>
              <view
                class="tag-item"
                :class="{ active: hairAmount === 'normal' }"
                @tap="hairAmount = 'normal'"
              >正常</view>
              <view
                class="tag-item"
                :class="{ active: hairAmount === 'more' }"
                @tap="hairAmount = 'more'"
              >多</view>
            </view>
          </view>

          <!-- 发质 -->
          <view class="form-section">
            <text class="section-label">发质</text>
            <view class="tag-group">
              <view
                class="tag-item"
                :class="{ active: hairTexture === 'soft' }"
                @tap="hairTexture = 'soft'"
              >软</view>
              <view
                class="tag-item"
                :class="{ active: hairTexture === 'normal' }"
                @tap="hairTexture = 'normal'"
              >正常</view>
              <view
                class="tag-item"
                :class="{ active: hairTexture === 'hard' }"
                @tap="hairTexture = 'hard'"
              >硬</view>
            </view>
          </view>

          <!-- 粗细 -->
          <view class="form-section">
            <text class="section-label">粗细</text>
            <view class="tag-group">
              <view
                class="tag-item"
                :class="{ active: hairThickness === 'thin' }"
                @tap="hairThickness = 'thin'"
              >细</view>
              <view
                class="tag-item"
                :class="{ active: hairThickness === 'normal' }"
                @tap="hairThickness = 'normal'"
              >正常</view>
              <view
                class="tag-item"
                :class="{ active: hairThickness === 'thick' }"
                @tap="hairThickness = 'thick'"
              >粗</view>
            </view>
          </view>

          <!-- 作品图片 -->
          <view class="form-section">
            <text class="section-label">作品图片</text>
            <view class="image-grid">
              <view class="image-upload-item" @tap="uploadImage('front')">
                <image v-if="images.front" class="uploaded-image" :src="images.front" mode="aspectFill"></image>
                <view v-else class="upload-placeholder">
                  <text class="plus-icon">+</text>
                </view>
                <text class="image-label">正面主图</text>
              </view>
              <view class="image-upload-item" @tap="uploadImage('left')">
                <image v-if="images.left" class="uploaded-image" :src="images.left" mode="aspectFill"></image>
                <view v-else class="upload-placeholder">
                  <text class="plus-icon">+</text>
                </view>
                <text class="image-label">左侧面</text>
              </view>
              <view class="image-upload-item" @tap="uploadImage('right')">
                <image v-if="images.right" class="uploaded-image" :src="images.right" mode="aspectFill"></image>
                <view v-else class="upload-placeholder">
                  <text class="plus-icon">+</text>
                </view>
                <text class="image-label">右侧面</text>
              </view>
              <view class="image-upload-item" @tap="uploadImage('back')">
                <image v-if="images.back" class="uploaded-image" :src="images.back" mode="aspectFill"></image>
                <view v-else class="upload-placeholder">
                  <text class="plus-icon">+</text>
                </view>
                <text class="image-label">后面</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>

      <!-- 底部按钮 -->
      <view class="bottom-buttons">
        <view class="btn-cancel" @tap="handleCancel">取消</view>
        <view class="btn-confirm" @tap="handleConfirm">确定</view>
      </view>
    </view>

    <!-- 默认店铺中心页面 -->
    <view v-else class="default-page">
      <view class="main-content">
        <!-- 基础信息 -->
        <view class="section-title">基础信息</view>
        <view class="info-card">
          <view class="info-item" @tap="uploadShopIcon">
            <text class="item-label">店铺图标</text>
            <view class="item-right">
              <image
                class="shop-icon"
                :src="shopIcon || 'https://img.yzcdn.cn/vant/cat.jpeg'"
                mode="aspectFill"
              ></image>
            </view>
          </view>

          <view class="info-item">
            <text class="item-label">店铺名称</text>
            <view class="item-right">
              <input
                class="item-input"
                placeholder="请输入店铺名称"
                placeholder-class="placeholder-text"
                :value="shopName"
                @input="onShopNameInput"
              />
            </view>
          </view>

          <view class="info-item">
            <text class="item-label">店铺编号</text>
            <view class="item-right">
              <text class="item-value">{{ shopCode }}</text>
            </view>
          </view>

          <view class="info-item" @tap="selectService">
            <text class="item-label">主营服务</text>
            <view class="item-right">
              <text class="item-value link">{{ mainService || '请选择主营服务' }}</text>
              <text class="arrow">></text>
            </view>
          </view>

          <view class="info-item" @tap="selectAddress">
            <text class="item-label">店铺地址</text>
            <view class="item-right">
              <text class="item-value link">{{ shopAddress || '请选择店铺地址' }}</text>
              <text class="arrow">></text>
            </view>
          </view>
        </view>

        <!-- 店主信息 -->
        <view class="section-header">
          <text class="section-title">店主信息</text>
          <text class="section-desc">方便顾客/平台与您联系</text>
        </view>
        <view class="info-card">
          <view class="info-item">
            <text class="item-label">联系人</text>
            <view class="item-right">
              <input
                class="item-input"
                placeholder="请输入门店服务人姓名"
                placeholder-class="placeholder-text"
                :value="contactName"
                @input="onContactNameInput"
              />
            </view>
          </view>

          <view class="info-item">
            <text class="item-label">手机号</text>
            <view class="item-right">
              <input
                class="item-input"
                placeholder="请输入门店服务电话"
                placeholder-class="placeholder-text"
                type="number"
                :value="contactPhone"
                @input="onContactPhoneInput"
              />
            </view>
          </view>

          <view class="info-item">
            <text class="item-label">微信号</text>
            <view class="item-right">
              <input
                class="item-input"
                placeholder="请输入门店服务微信"
                placeholder-class="placeholder-text"
                :value="contactWechat"
                @input="onContactWechatInput"
              />
            </view>
          </view>

          <view class="info-item last">
            <text class="item-label">邮箱</text>
            <view class="item-right">
              <input
                class="item-input"
                placeholder="请输入门店服务邮箱"
                placeholder-class="placeholder-text"
                :value="contactEmail"
                @input="onContactEmailInput"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const statusBarHeight = ref(44)
const currentTab = ref('')

// 作品上传相关
const personType = ref('female')
const faceType = ref('round')
const hairAmount = ref('less')
const hairTexture = ref('soft')
const hairThickness = ref('thin')
const images = reactive({
  front: '',
  left: '',
  right: '',
  back: ''
})

// 基础信息
const shopIcon = ref('')
const shopName = ref('CD beautiful 美发沙龙')
const shopCode = ref('SC20251126')
const mainService = ref('美发、美容')
const shopAddress = ref('')

// 店主信息
const contactName = ref('')
const contactPhone = ref('')
const contactWechat = ref('')
const contactEmail = ref('')

// 页面加载
onLoad((options) => {
  statusBarHeight.value = uni.getStorageSync('statusBarHeight') || 44
  if (options.tab) {
    currentTab.value = options.tab
  }
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 上传图片
const uploadImage = (position) => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      images[position] = res.tempFilePaths[0]
    }
  })
}

// 取消
const handleCancel = () => {
  uni.navigateBack()
}

// 确定
const handleConfirm = () => {
  // 验证必填项
  if (!images.front) {
    uni.showToast({ title: '请上传正面主图', icon: 'none' })
    return
  }

  // 提交数据
  const data = {
    personType: personType.value,
    faceType: faceType.value,
    hairAmount: hairAmount.value,
    hairTexture: hairTexture.value,
    hairThickness: hairThickness.value,
    images: { ...images }
  }

  console.log('提交作品数据:', data)
  uni.showToast({ title: '上传成功', icon: 'success' })
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}

// 上传店铺图标
const uploadShopIcon = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      shopIcon.value = res.tempFilePaths[0]
    }
  })
}

// 店铺名称输入
const onShopNameInput = (e) => {
  shopName.value = e.detail.value
}

// 选择主营服务
const selectService = () => {
  uni.showActionSheet({
    itemList: ['美发', '美容', '美甲', '美睫', '纹绣', '美发、美容'],
    success: (res) => {
      const services = ['美发', '美容', '美甲', '美睫', '纹绣', '美发、美容']
      mainService.value = services[res.tapIndex]
    }
  })
}

// 选择店铺地址
const selectAddress = () => {
  uni.chooseLocation({
    success: (res) => {
      shopAddress.value = res.address
    },
    fail: () => {
      uni.showToast({
        title: '请授权位置权限',
        icon: 'none'
      })
    }
  })
}

// 联系人输入
const onContactNameInput = (e) => {
  contactName.value = e.detail.value
}

// 手机号输入
const onContactPhoneInput = (e) => {
  contactPhone.value = e.detail.value
}

// 微信号输入
const onContactWechatInput = (e) => {
  contactWechat.value = e.detail.value
}

// 邮箱输入
const onContactEmailInput = (e) => {
  contactEmail.value = e.detail.value
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
}

/* 作品上传页面 */
.works-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.form-scroll{
  flex: 1;
  padding: 24rpx;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;
}
/* 表单卡片 */
.form-card {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
}

/* 表单区块 */
.form-section {
  margin-bottom: 40rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-label {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 24rpx;
  display: block;
}

/* 标签组 */
.tag-group {
  display: flex;
  gap: 24rpx;
}

.tag-item {
  flex: 1;
  width: 200rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #E8E8E8;
  border-radius: 12rpx;
  font-size: 24rpx;
  color: #666;
  background-color: #fff;

  &.active {
    border-color: #4A90E2;
    color: #4A90E2;
    background-color: rgba(74, 144, 226, 0.05);
  }
}

/* 脸型组 */
.face-group {
  display: flex;
  gap: 16rpx;
}

.face-item {
  width: 96rpx;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #E8E8E8;
  border-radius: 12rpx;
  background-color: #fff;

  &.active {
    border-color: #4A90E2;
    background-color: rgba(74, 144, 226, 0.05);

    .face-icon {
      border-color: #4A90E2;
    }
  }
}

.face-icon {
  border: 3rpx solid #999;

  &.round {
    width: 44rpx;
    height: 44rpx;
    border-radius: 50%;
  }

  &.oval {
    width: 36rpx;
    height: 48rpx;
    border-radius: 50%;
  }

  &.square {
    width: 44rpx;
    height: 44rpx;
    border-radius: 6rpx;
  }

  &.diamond {
    width: 36rpx;
    height: 36rpx;
    transform: rotate(45deg);
    border-radius: 6rpx;
  }

  &.triangle {
    width: 0;
    height: 0;
    border: none;
    border-left: 22rpx solid transparent;
    border-right: 22rpx solid transparent;
    border-bottom: 40rpx solid #999;
  }

  &.oblong {
    width: 32rpx;
    height: 48rpx;
    border-radius: 6rpx;
  }
}

.face-item.active .face-icon.triangle {
  border-bottom-color: #4A90E2;
}

/* 图片上传区域 */
.image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24rpx;
}

.image-upload-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-placeholder {
  width: 100%;
  height: 240rpx;
  background-color: #F5F7FA;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.uploaded-image {
  width: 100%;
  height: 240rpx;
  border-radius: 16rpx;
}

.plus-icon {
  font-size: 60rpx;
  color: #CCCCCC;
  font-weight: 300;
}

.image-label {
  font-size: 26rpx;
  color: #666;
  margin-top: 16rpx;
}

/* 底部按钮 */
.bottom-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 24rpx;
  padding: 24rpx 32rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid #F0F0F0;
}

.btn-cancel {
  flex: 1;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #E8E8E8;
  border-radius: 44rpx;
  font-size: 32rpx;
  color: #666;
  background-color: #fff;
}

.btn-confirm {
  flex: 1;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 44rpx;
  font-size: 32rpx;
  color: #fff;
  background-color: #4A90E2;
}

/* 默认页面样式 */
.default-page {
  min-height: 100vh;
  background-color: #EDF0F4;
}

.main-content {
  width: 100%;
}

.section-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  padding: 16rpx 32rpx;
  background-color: #F5F7FA;
  margin: 0 -24rpx 0 -24rpx;
  margin-top: 24rpx;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-top: 32rpx;
  margin-bottom: 16rpx;
}

.section-desc {
  font-size: 24rpx;
  color: #999;
}

.info-card {
  background-color: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  margin: 24rpx;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  border-bottom: 1rpx solid #F5F5F5;

  &.last {
    border-bottom: none;
  }
}

.item-label {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
  flex-shrink: 0;
}

.item-right {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

.item-value {
  font-size: 28rpx;
  color: #333;
  text-align: right;
}

.item-input {
  font-size: 28rpx;
  color: #333;
  text-align: right;
  flex: 1;
}

.arrow {
  font-size: 28rpx;
  color: #ccc;
  margin-left: 8rpx;
}

.shop-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 12rpx;
  border: 1rpx solid #E8E8E8;
}
</style>
