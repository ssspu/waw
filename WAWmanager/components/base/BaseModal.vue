<template>
  <view v-if="visible" class="modal">
    <view class="modal-mask" @tap="handleClose"></view>
    <view class="modal-content">
      <image
        v-if="closeable"
        class="modal-close"
        @tap="handleClose"
        src="/static/icons/close.png"
      />
      <view class="modal-title">{{ title }}</view>
      <view class="modal-body">
        <slot>{{ content }}</slot>
      </view>
      <view v-if="showButtons" class="modal-buttons">
        <slot name="footer">
          <view v-if="showCancel" class="modal-button" @tap="handleCancel">
            {{ cancelText }}
          </view>
          <view class="modal-button modal-button-primary" @tap="handleConfirm">
            {{ confirmText }}
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  closeable: {
    type: Boolean,
    default: true
  },
  showButtons: {
    type: Boolean,
    default: false
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  closeOnMask: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:visible', 'close', 'confirm', 'cancel'])

const handleClose = () => {
  if (props.closeOnMask) {
    emit('update:visible', false)
    emit('close')
  }
}

const handleConfirm = () => {
  emit('confirm')
  emit('update:visible', false)
}

const handleCancel = () => {
  emit('cancel')
  emit('update:visible', false)
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

.modal-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: fixed;
  background-color: #fff;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 40rpx 40rpx 0 0;
  padding: 50rpx 50rpx 100rpx 50rpx;
  z-index: 1000;
}

.modal-close {
  position: absolute;
  right: 20rpx;
  top: 20rpx;
  width: 48rpx;
  height: 48rpx;
}

.modal-title {
  font-weight: 500;
  font-size: 36rpx;
  text-align: center;
  color: #333;
  padding-bottom: 20rpx;
}

.modal-body {
  font-size: 28rpx;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.6;
  text-align: left;
}

.modal-buttons {
  padding-top: 50rpx;
  display: flex;
  justify-content: center;
  gap: 30rpx;
}

.modal-button {
  color: #07C160;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.1);
  width: 40%;
  text-align: center;
  padding: 20rpx 0;
  border-radius: 10rpx;
}

.modal-button-primary {
  background-color: #07C160;
  color: #fff;
}
</style>
