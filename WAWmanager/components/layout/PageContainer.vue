<template>
  <view class="page-container" :style="containerStyle">
    <view v-if="$slots.header" class="page-header">
      <slot name="header"></slot>
    </view>
    <scroll-view
      class="page-content"
      scroll-y
      :enable-back-to-top="true"
      :refresher-enabled="refresherEnabled"
      :refresher-triggered="refreshing"
      @refresherrefresh="handleRefresh"
      @scrolltolower="handleScrollToLower"
    >
      <slot></slot>
      <view v-if="loading && !refreshing" class="page-loading">
        <view class="loading-spinner"></view>
        <text>{{ loadingText }}</text>
      </view>
      <view v-if="finished && showFinished" class="page-finished">
        {{ finishedText }}
      </view>
    </scroll-view>
    <view v-if="$slots.footer" class="page-footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  bgColor: {
    type: String,
    default: '#f5f5f5'
  },
  refresherEnabled: {
    type: Boolean,
    default: false
  },
  refreshing: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: '加载中...'
  },
  finished: {
    type: Boolean,
    default: false
  },
  showFinished: {
    type: Boolean,
    default: true
  },
  finishedText: {
    type: String,
    default: '没有更多了'
  },
  safeAreaBottom: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['refresh', 'load-more'])

const containerStyle = computed(() => {
  return {
    backgroundColor: props.bgColor
  }
})

const handleRefresh = () => {
  emit('refresh')
}

const handleScrollToLower = () => {
  if (!props.loading && !props.finished) {
    emit('load-more')
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.page-header {
  flex-shrink: 0;
}

.page-content {
  flex: 1;
  overflow: hidden;
}

.page-footer {
  flex-shrink: 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.page-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30rpx;
  color: #999;
  font-size: 26rpx;

  .loading-spinner {
    width: 32rpx;
    height: 32rpx;
    border: 4rpx solid #e8e8e8;
    border-top-color: #4A90E2;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 16rpx;
  }
}

.page-finished {
  text-align: center;
  padding: 30rpx;
  color: #c8c9cc;
  font-size: 26rpx;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
