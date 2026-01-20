<template>
  <view class="base-list">
    <view v-if="$slots.header || title" class="list-header">
      <slot name="header">
        <view class="list-title">{{ title }}</view>
      </slot>
    </view>
    <view class="list-content">
      <view
        v-for="(item, index) in list"
        :key="item[keyField] || index"
        class="list-item"
        :class="{ 'list-item-clickable': clickable }"
        @tap="handleItemClick(item, index)"
      >
        <slot :item="item" :index="index">
          <view class="list-item-content">
            <view v-if="item.icon" class="item-icon">
              <image :src="item.icon" mode="aspectFill" />
            </view>
            <view class="item-main">
              <view class="item-title">{{ item[labelField] }}</view>
              <view v-if="item[descField]" class="item-desc">{{ item[descField] }}</view>
            </view>
            <view v-if="showArrow || item.arrow" class="item-arrow">
              <text>></text>
            </view>
          </view>
        </slot>
      </view>
      <view v-if="list.length === 0" class="list-empty">
        <slot name="empty">
          <text>{{ emptyText }}</text>
        </slot>
      </view>
    </view>
    <view v-if="$slots.footer" class="list-footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => []
  },
  keyField: {
    type: String,
    default: 'id'
  },
  labelField: {
    type: String,
    default: 'label'
  },
  descField: {
    type: String,
    default: 'desc'
  },
  clickable: {
    type: Boolean,
    default: true
  },
  showArrow: {
    type: Boolean,
    default: false
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  }
})

const emit = defineEmits(['click'])

const handleItemClick = (item, index) => {
  if (props.clickable) {
    emit('click', { item, index })
  }
}
</script>

<style lang="scss" scoped>
.base-list {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.list-header {
  padding: 24rpx 30rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.list-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.list-content {
  //
}

.list-item {
  padding: 24rpx 30rpx;
  border-bottom: 2rpx solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
}

.list-item-clickable {
  &:active {
    background-color: #f5f5f5;
  }
}

.list-item-content {
  display: flex;
  align-items: center;
}

.item-icon {
  width: 80rpx;
  height: 80rpx;
  margin-right: 24rpx;

  image {
    width: 100%;
    height: 100%;
    border-radius: 8rpx;
  }
}

.item-main {
  flex: 1;
  overflow: hidden;
}

.item-title {
  font-size: 30rpx;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-desc {
  font-size: 26rpx;
  color: #999;
  margin-top: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-arrow {
  color: #c8c9cc;
  font-size: 32rpx;
  margin-left: 16rpx;
}

.list-empty {
  padding: 60rpx 0;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}

.list-footer {
  padding: 20rpx 30rpx;
  border-top: 2rpx solid #f0f0f0;
}
</style>
