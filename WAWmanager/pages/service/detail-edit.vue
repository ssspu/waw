<template>
  <view class="container">
    <!-- 服务详情卡片 -->
    <view class="detail-card">
      <view class="card-title">请输入服务详情</view>
      <view class="card-desc">不能填写QQ、微信、电话联系方式、以及特殊符号</view>

      <view class="input-wrapper">
        <textarea
          class="detail-input"
          :placeholder="placeholderText"
          placeholder-class="placeholder-text"
          :value="detailText"
          @input="onDetailInput"
          maxlength="500"
        />
      </view>
    </view>

    <!-- 底部保存按钮 -->
    <view class="bottom-button">
      <view class="btn-save" @tap="saveDetail">
        <text>保存</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 详情文本
const detailText = ref('')

// placeholder文本
const placeholderText = '1.服务简介\n2.服务内容\n3.特别说明'

// 详情输入
const onDetailInput = (e) => {
  detailText.value = e.detail.value
}

// 保存详情
const saveDetail = () => {
  // 通过事件通道传递数据
  const eventChannel = getOpenerEventChannel()
  if (eventChannel) {
    eventChannel.emit('selectDetail', detailText.value || '已设置')
  }

  uni.navigateBack()
}

// 页面加载
onLoad(() => {
  uni.setNavigationBarTitle({ title: '服务详情' })
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding: 20rpx 20rpx 180rpx;
}

// 服务详情卡片
.detail-card {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  padding: 32rpx;
  border-radius: 16rpx;
}

.card-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 12rpx;
}

.card-desc {
  font-size: 28rpx;
  color: #999;
  margin-bottom: 24rpx;
}

.input-wrapper {
  background-color: #F5F7FA;
  border-radius: 16rpx;
  padding: 24rpx;
}

.detail-input {
  width: 100%;
  height: 400rpx;
  font-size: 28rpx;
  color: #333;
  line-height: 1.8;
}

.placeholder-text {
  color: #999;
  line-height: 1.8;
}

// 底部按钮
.bottom-button {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20rpx 24rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background-color: #fff;
}

.btn-save {
  height: 96rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4A90E2;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }
}
</style>
