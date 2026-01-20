<template>
  <view class="container">
    <!-- 祝福内容输入区 -->
    <view class="input-card">
      <textarea
        class="wish-input"
        placeholder="请输入祝福内容，请不超过80字"
        v-model="wishContent"
        maxlength="80"
        @input="onInput"
      ></textarea>
      <view class="word-count">
        <text>{{ wishContent.length }}/80</text>
      </view>
    </view>

    <!-- 底部操作按钮 -->
    <view class="bottom-actions">
      <view class="action-btn cancel" @tap="handleCancel">
        <text>取消</text>
      </view>
      <view class="action-btn send" @tap="handleSend">
        <text>发送</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 顾客ID
const customerId = ref('')
// 祝福内容
const wishContent = ref('')

// 页面加载
onLoad((options) => {
  if (options.customerId) {
    customerId.value = options.customerId
  }
})

// 输入事件
const onInput = (e) => {
  wishContent.value = e.detail.value
}

// 取消
const handleCancel = () => {
  uni.navigateBack()
}

// 发送祝福
const handleSend = () => {
  if (!wishContent.value.trim()) {
    uni.showToast({ title: '请输入祝福内容', icon: 'none' })
    return
  }

  uni.showLoading({ title: '发送中...' })

  // 模拟发送
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '祝福发送成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1000)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #EDF0F4;
  display: flex;
  flex-direction: column;
  padding-bottom: calc(144rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.input-card {
  box-sizing: border-box;
  width: calc(100% - 48rpx);
  padding: 24rpx;
  margin: 24rpx;
  background-color: #FFFFFF;
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
}

.wish-input {
  flex: 1;
  width: 100%;
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
  min-height: 400rpx;
}

.word-count {
  text-align: right;
  padding-top: 16rpx;

  text {
    font-size: 24rpx;
    color: #999;
  }
}

.bottom-actions {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 24rpx;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  box-sizing: border-box;
}
  
.action-btn {
  flex: 1;
  height: 96rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
  }

  &.cancel {
    background-color: #fff;
    border: 2rpx solid #ddd;

    text {
      color: #333;
    }
  }

  &.send {
    background-color: #4A90E2;

    text {
      color: #fff;
    }
  }

  &:active {
    opacity: 0.8;
  }
}
</style>
