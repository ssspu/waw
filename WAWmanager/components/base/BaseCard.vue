<template>
  <view class="base-card" :class="cardClass" :style="cardStyle">
    <view v-if="title || $slots.header" class="card-header">
      <slot name="header">
        <view class="card-title">{{ title }}</view>
        <view v-if="extra || $slots.extra" class="card-extra">
          <slot name="extra">{{ extra }}</slot>
        </view>
      </slot>
    </view>
    <view class="card-body">
      <slot></slot>
    </view>
    <view v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  extra: {
    type: String,
    default: ''
  },
  shadow: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: false
  },
  padding: {
    type: [Boolean, String, Number],
    default: true
  }
})

const cardClass = computed(() => {
  return {
    'card-shadow': props.shadow,
    'card-border': props.border,
    'card-no-padding': !props.padding
  }
})

const cardStyle = computed(() => {
  if (typeof props.padding === 'string' || typeof props.padding === 'number') {
    return { padding: typeof props.padding === 'number' ? `${props.padding}rpx` : props.padding }
  }
  return {}
})
</script>

<style lang="scss" scoped>
.base-card {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.card-shadow {
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.card-border {
  border: 2rpx solid #e8e8e8;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 30rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.card-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.card-extra {
  font-size: 28rpx;
  color: #4A90E2;
}

.card-body {
  padding: 30rpx;
}

.card-footer {
  padding: 20rpx 30rpx;
  border-top: 2rpx solid #f0f0f0;
}

.card-no-padding .card-body {
  padding: 0;
}
</style>
