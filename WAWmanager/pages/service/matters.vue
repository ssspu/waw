<template>
  <view class="container">
    <!-- 服务事项提示卡片 -->
    <view class="tip-card">
      <view class="tip-title">服务事项提示</view>
      <view class="tip-desc">勾选需要告知顾客的注意事项，或补充你的专属说明</view>
    </view>

    <!-- 常用提醒卡片 -->
    <view class="reminder-card">
      <view class="card-title">常用提醒</view>

      <view class="reminder-list">
        <view
          class="reminder-item"
          v-for="(item, index) in reminderList"
          :key="index"
          @tap="toggleReminder(index)"
        >
          <view class="reminder-checkbox" :class="{ checked: item.selected }">
            <text v-if="item.selected">✓</text>
          </view>
          <view class="reminder-content">
            <view class="reminder-title">{{ item.title }}</view>
            <view class="reminder-desc">{{ item.desc }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 自定义补充卡片 -->
    <view class="custom-card">
      <view class="custom-header">
        <view class="card-title">自定义补充</view>
        <view class="char-count">{{ customText.length }}/120</view>
      </view>
      <view class="custom-input-wrapper">
        <textarea
          class="custom-input"
          placeholder="示例：如有头皮敏感请提前告知；服务当日请勿安排剧烈运动"
          placeholder-class="placeholder-text"
          :value="customText"
          @input="onCustomInput"
          maxlength="120"
        />
      </view>
    </view>

    <!-- 底部保存按钮 -->
    <view class="bottom-button">
      <view class="btn-save" @tap="saveMatters">
        <text>保存</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 常用提醒列表
const reminderList = ref([
  {
    title: '到店前请保持头发干爽，避免使用定型产品',
    desc: '确保发质状态便于设计师评估，提升服务体验',
    selected: false
  },
  {
    title: '请提前10分钟到店完成接待登记',
    desc: '为您预留准备时间，保障后续服务顺畅进行',
    selected: false
  },
  {
    title: '如需改期请至少提前4小时联系门店',
    desc: '便于我们重新安排档期，避免资源浪费',
    selected: false
  },
  {
    title: '迟到超过15分钟可能需要重新排期',
    desc: '我们会尽力协调，如遇高峰时段敬请谅解',
    selected: false
  },
  {
    title: '如对染烫过敏或孕期，请提前告知设计师',
    desc: '我们将为您提供更安全的产品与服务建议',
    selected: false
  }
])

// 自定义补充文本
const customText = ref('')

// 切换提醒选中状态
const toggleReminder = (index) => {
  reminderList.value[index].selected = !reminderList.value[index].selected
}

// 自定义输入
const onCustomInput = (e) => {
  customText.value = e.detail.value
}

// 保存服务事项
const saveMatters = () => {
  // 获取选中的提醒
  const selectedReminders = reminderList.value
    .filter(item => item.selected)
    .map(item => item.title)

  // 组合结果
  let result = selectedReminders.join('；')
  if (customText.value) {
    result = result ? `${result}；${customText.value}` : customText.value
  }

  // 通过事件通道传递数据
  const eventChannel = getOpenerEventChannel()
  if (eventChannel) {
    eventChannel.emit('selectMatters', result || '已设置')
  }

  uni.navigateBack()
}

// 页面加载
onLoad(() => {
  uni.setNavigationBarTitle({ title: '服务事项' })
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding: 20rpx 20rpx 180rpx;
}

// 通用卡片样式
.tip-card,
.reminder-card,
.custom-card {
  width: 100%;
  box-sizing: border-box;
}

// 提示卡片
.tip-card {
  background-color: #fff;
  padding: 32rpx;
  border-radius: 16rpx;
}

.tip-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 12rpx;
}

.tip-desc {
  font-size: 28rpx;
  color: #999;
}

// 常用提醒卡片
.reminder-card {
  background-color: #fff;
  padding: 32rpx;
  margin-top: 20rpx;
  border-radius: 16rpx;
}

.card-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.reminder-list {
  display: flex;
  flex-direction: column;
}

.reminder-item {
  display: flex;
  align-items: flex-start;
  padding: 28rpx 0;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:active {
    opacity: 0.7;
  }
}

.reminder-checkbox {
  width: 32rpx;
  height: 32rpx;
  border: 2rpx solid #E8E8E8;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EAECF0;
  flex-shrink: 0;
  margin-right: 24rpx;
  margin-top: 4rpx;

  &.checked {
    background-color: #4A90E2;
    border-color: #4A90E2;

    text {
      font-size: 24rpx;
      color: #fff;
    }
  }
}

.reminder-content {
  flex: 1;
}

.reminder-title {
  font-size: 30rpx;
  color: #333;
  line-height: 1.5;
  margin-bottom: 8rpx;
}

.reminder-desc {
  font-size: 26rpx;
  color: #98A2B3;
  line-height: 1.5;
}

// 自定义补充卡片
.custom-card {
  background-color: #fff;
  padding: 32rpx 32rpx;
  margin-top: 20rpx;
  border-radius: 16rpx;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.char-count {
  font-size: 28rpx;
  color: #999;
}

.custom-input-wrapper {
  background-color: #F5F7FA;
  border-radius: 16rpx;
  padding: 24rpx;
}

.placeholder-text {
  color: #999;
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
