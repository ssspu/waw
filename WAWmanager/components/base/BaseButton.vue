<template>
  <view class="base-button" :class="buttonClass" :style="buttonStyle" @tap="handleClick">
    <view v-if="loading" class="button-loading"></view>
    <slot>{{ text }}</slot>
  </view>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'default', // default, primary, success, warning, danger
    validator: (value) => ['default', 'primary', 'success', 'warning', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'normal', // mini, small, normal, large
    validator: (value) => ['mini', 'small', 'normal', 'large'].includes(value)
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClass = computed(() => {
  return {
    [`button-${props.type}`]: true,
    [`button-${props.size}`]: true,
    'button-plain': props.plain,
    'button-round': props.round,
    'button-block': props.block,
    'button-disabled': props.disabled,
    'button-loading': props.loading
  }
})

const buttonStyle = computed(() => {
  return {}
})

const handleClick = (e) => {
  if (props.disabled || props.loading) return
  emit('click', e)
}
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 30rpx;
  height: 80rpx;
  font-size: 28rpx;
  border-radius: 8rpx;
  background-color: #fff;
  border: 2rpx solid #dcdfe6;
  color: #606266;
  box-sizing: border-box;
  transition: all 0.2s;

  &:active {
    opacity: 0.7;
  }
}

// 类型
.button-primary {
  background-color: #4A90E2;
  border-color: #4A90E2;
  color: #fff;
}

.button-success {
  background-color: #52c41a;
  border-color: #52c41a;
  color: #fff;
}

.button-warning {
  background-color: #faad14;
  border-color: #faad14;
  color: #fff;
}

.button-danger {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: #fff;
}

// 朴素按钮
.button-plain {
  background-color: transparent;

  &.button-primary {
    color: #4A90E2;
  }

  &.button-success {
    color: #52c41a;
  }

  &.button-warning {
    color: #faad14;
  }

  &.button-danger {
    color: #ff4d4f;
  }
}

// 尺寸
.button-mini {
  height: 48rpx;
  padding: 0 16rpx;
  font-size: 22rpx;
}

.button-small {
  height: 64rpx;
  padding: 0 24rpx;
  font-size: 26rpx;
}

.button-large {
  height: 96rpx;
  padding: 0 40rpx;
  font-size: 32rpx;
}

// 圆角
.button-round {
  border-radius: 999rpx;
}

// 块级
.button-block {
  display: flex;
  width: 100%;
}

// 禁用
.button-disabled {
  opacity: 0.5;
  pointer-events: none;
}

// 加载中
.button-loading {
  display: inline-block;
  width: 28rpx;
  height: 28rpx;
  border: 4rpx solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 10rpx;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
