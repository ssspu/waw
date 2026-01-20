<template>
  <view class="container">
    <!-- 已选卡片 -->
    <view class="selected-card">
      <view class="card-title">已选</view>
      <view class="selected-tags">
        <view class="selected-tag" v-for="item in selectedItems" :key="item">
          <text class="tag-text">{{ item }}</text>
          <image class="tag-close" src="/pages/service/static/add-circle@3x.png" mode="aspectFit" @tap="removeItem(item)"></image>
        </view>
      </view>
    </view>

    <!-- 选择服务包含内容卡片 -->
    <view class="options-card">
      <view class="card-title">{{ pageMode === 'package' ? '选择基础服务' : '选择服务包含内容' }}</view>
      <view class="card-subtitle">{{ pageMode === 'package' ? '选择套餐包含的基础服务项目' : '最多选择4个，服务内容将展示在项目服务内' }}</view>

      <view class="options-grid">
        <view
          class="option-item"
          :class="{ selected: selectedItems.includes(item) }"
          v-for="item in serviceOptions"
          :key="item"
          @tap="toggleItem(item)"
        >
          <text>{{ item }}</text>
        </view>
        <!-- 添加自定义按钮 -->
        <view class="option-item add-custom" @tap="showCustomModal">
          <text class="add-icon">+</text>
          <text>自定义</text>
        </view>
      </view>
    </view>

    <!-- 自定义弹窗 -->
    <view class="custom-modal" v-if="showModal" @tap="closeModal">
      <view class="modal-content" @tap.stop>
        <view class="modal-title">添加自定义内容</view>
        <view class="modal-input-wrap">
          <input
            class="modal-input"
            type="text"
            v-model="customInputValue"
            placeholder="请输入自定义内容"
            :maxlength="10"
          />
          <view class="input-count">
            <text class="count-current">{{ customInputValue.length }}</text>
            <text class="count-total">/10</text>
          </view>
        </view>
        <view class="modal-buttons">
          <view class="modal-btn modal-btn-cancel" @tap="closeModal">
            <text>取消</text>
          </view>
          <view class="modal-btn modal-btn-confirm" @tap="confirmCustom">
            <text>确定</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部保存按钮 -->
    <view class="bottom-button">
      <view class="btn-save" @tap="saveSelection">
        <text>保存</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 获取页面实例
const instance = getCurrentInstance()

// 页面模式：普通模式或套餐模式
const pageMode = ref('')

// 已选项目
const selectedItems = ref([])

// 服务选项列表
const serviceOptions = ref([
  '检测', '洗发', '按摩', '修剪', '造型',
  '烫发', '染发', '头发护理', '头皮护理'
])

// 自定义弹窗
const showModal = ref(false)
const customInputValue = ref('')

// 显示自定义弹窗
const showCustomModal = () => {
  customInputValue.value = ''
  showModal.value = true
}

// 关闭自定义弹窗
const closeModal = () => {
  showModal.value = false
}

// 确认自定义内容
const confirmCustom = () => {
  const value = customInputValue.value.trim()
  if (!value) {
    uni.showToast({ title: '请输入内容', icon: 'none' })
    return
  }
  // 检查是否已存在
  if (serviceOptions.value.includes(value) || selectedItems.value.includes(value)) {
    uni.showToast({ title: '该选项已存在', icon: 'none' })
    return
  }
  // 添加到选项列表和已选列表
  serviceOptions.value.push(value)
  // 检查是否超过限制
  if (pageMode.value !== 'package' && selectedItems.value.length >= 4) {
    uni.showToast({ title: '最多选择4个', icon: 'none' })
  } else {
    selectedItems.value.push(value)
  }
  closeModal()
}

// 切换选项
const toggleItem = (item) => {
  const index = selectedItems.value.indexOf(item)
  if (index > -1) {
    // 已选中，取消选择
    selectedItems.value.splice(index, 1)
  } else {
    // 未选中，添加选择
    // 普通模式最多4个，套餐模式不限制
    if (pageMode.value !== 'package' && selectedItems.value.length >= 4) {
      uni.showToast({
        title: '最多选择4个',
        icon: 'none'
      })
      return
    }
    selectedItems.value.push(item)
  }
}

// 移除已选项目
const removeItem = (item) => {
  const index = selectedItems.value.indexOf(item)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  }
}

// 保存选择
const saveSelection = () => {
  // 将选中的内容传回上一页
  try {
    const eventChannel = instance.proxy.getOpenerEventChannel()
    if (eventChannel) {
      if (pageMode.value === 'package') {
        // 套餐模式传回服务名称数组
        eventChannel.emit('selectBaseServices', selectedItems.value)
      } else {
        // 普通模式传回字符串
        eventChannel.emit('selectInclude', selectedItems.value.join('、'))
      }
    }
  } catch (e) {
    console.log('eventChannel error:', e)
  }

  uni.showToast({
    title: '保存成功',
    icon: 'success',
    duration: 1000
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}

// 页面加载
onLoad((options) => {
  pageMode.value = options.mode || ''

  if (options.mode === 'package') {
    uni.setNavigationBarTitle({ title: '选择基础服务' })
    // 套餐模式下，读取已选服务
    if (options.selected) {
      try {
        const selected = JSON.parse(decodeURIComponent(options.selected))
        if (Array.isArray(selected)) {
          selectedItems.value = selected
        }
      } catch (e) {
        selectedItems.value = []
      }
    } else {
      selectedItems.value = []
    }
  } else {
    uni.setNavigationBarTitle({ title: '服务包含' })
  }
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding: 20rpx 24rpx 180rpx;
}

// 卡片通用样式
.selected-card,
.options-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
}

.selected-card,
.options-card {
  width: 100%;
  box-sizing: border-box;
}

.selected-card {
  min-height: 200rpx;
}

.card-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 16rpx;
}

.card-subtitle {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 24rpx;
}

// 已选标签
.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.selected-tag {
  font-size: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc((100% - 32rpx) / 3);
  flex-shrink: 0;
  background-color: #DBE8FF;
  border: 2rpx solid #D4E4FF;
  border-radius: 12rpx;
  padding: 12rpx 12rpx 12rpx 16rpx;
  box-sizing: border-box;
  min-height: 56rpx;

  .tag-text {
    font-size: 24rpx;
    color: #4A90E2;
    flex: 1;
    word-break: break-all;
    line-height: 1.3;
  }
}

.tag-close {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
  margin-left: 8rpx;
}

// 选项网格
.options-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.option-item {
  width: calc((100% - 32rpx) / 3);
  flex-shrink: 0;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F8FAFC;
  border: 2rpx solid #E8E8E8;
  border-radius: 8rpx;
  box-sizing: border-box;

  text {
    font-size: 28rpx;
    color: #333;
  }

  &.selected {
    background-color: #DBE8FF;
    border-color: #5280FF;

    text {
      color: #5280FF;
    }
  }

  &:active {
    opacity: 0.7;
  }
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
  height: 88rpx;
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

// 添加自定义按钮
.add-custom {
  border-style: dashed !important;
  border-color: #4A90E2 !important;
  background-color: #fff !important;
  gap: 8rpx;

  .add-icon {
    font-size: 32rpx;
    color: #4A90E2;
  }

  text {
    color: #4A90E2 !important;
  }
}

// 自定义弹窗
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 560rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 48rpx 32rpx 32rpx;
}

.modal-title {
  font-size: 34rpx;
  color: #333;
  font-weight: 600;
  text-align: center;
  margin-bottom: 48rpx;
}

.modal-input-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 48rpx;
  border-bottom: 1rpx solid #E8E8E8;
  padding-bottom: 16rpx;
}

.modal-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.input-count {
  display: flex;
  align-items: center;
  font-size: 24rpx;

  .count-current {
    color: #4A90E2;
  }

  .count-total {
    color: #999;
  }
}

.modal-buttons {
  display: flex;
  gap: 24rpx;
}

.modal-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
  }

  &:active {
    opacity: 0.8;
  }
}

.modal-btn-cancel {
  background-color: #F5F7FA;

  text {
    color: #333;
  }
}

.modal-btn-confirm {
  background-color: #4A90E2;

  text {
    color: #fff;
  }
}
</style>
