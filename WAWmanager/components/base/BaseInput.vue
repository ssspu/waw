<template>
  <view class="base-input" :class="inputClass">
    <view v-if="label" class="input-label">{{ label }}</view>
    <view class="input-wrapper">
      <view v-if="$slots.prefix" class="input-prefix">
        <slot name="prefix"></slot>
      </view>
      <input
        class="input-field"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :password="password"
        :focus="focus"
        :confirm-type="confirmType"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
      />
      <view v-if="clearable && modelValue" class="input-clear" @tap="handleClear">
        <text>x</text>
      </view>
      <view v-if="$slots.suffix" class="input-suffix">
        <slot name="suffix"></slot>
      </view>
    </view>
    <view v-if="error" class="input-error">{{ error }}</view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number,
    default: 140
  },
  password: {
    type: Boolean,
    default: false
  },
  focus: {
    type: Boolean,
    default: false
  },
  confirmType: {
    type: String,
    default: 'done'
  },
  error: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'normal' // small, normal, large
  },
  border: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur', 'confirm', 'clear'])

const inputClass = computed(() => {
  return {
    [`input-${props.size}`]: true,
    'input-disabled': props.disabled,
    'input-error-state': !!props.error,
    'input-no-border': !props.border
  }
})

const handleInput = (e) => {
  emit('update:modelValue', e.detail.value)
  emit('input', e.detail.value)
}

const handleFocus = (e) => {
  emit('focus', e)
}

const handleBlur = (e) => {
  emit('blur', e)
}

const handleConfirm = (e) => {
  emit('confirm', e.detail.value)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style lang="scss" scoped>
.base-input {
  width: 100%;
}

.input-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 2rpx solid #e8e8e8;
  border-radius: 8rpx;
  padding: 0 24rpx;
  height: 88rpx;
}

.input-field {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.input-prefix,
.input-suffix {
  display: flex;
  align-items: center;
}

.input-prefix {
  margin-right: 16rpx;
}

.input-suffix {
  margin-left: 16rpx;
}

.input-clear {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  background-color: #c8c9cc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16rpx;

  text {
    color: #fff;
    font-size: 24rpx;
  }
}

.input-error {
  font-size: 24rpx;
  color: #ff4d4f;
  margin-top: 8rpx;
}

// 尺寸
.input-small .input-wrapper {
  height: 72rpx;
  padding: 0 20rpx;
}

.input-large .input-wrapper {
  height: 104rpx;
  padding: 0 30rpx;
}

// 禁用
.input-disabled {
  .input-wrapper {
    background-color: #f5f7fa;
  }

  .input-field {
    color: #c0c4cc;
  }
}

// 错误状态
.input-error-state .input-wrapper {
  border-color: #ff4d4f;
}

// 无边框
.input-no-border .input-wrapper {
  border: none;
}
</style>
