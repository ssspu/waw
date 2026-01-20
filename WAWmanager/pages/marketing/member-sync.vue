<template>
  <view class="container">
    <!-- 标签页导航 -->
    <view class="tab-nav">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-item"
        :class="{ active: currentTab === index }"
        @tap="switchTab(index)"
      >
        <text>{{ tab }}</text>
        <view class="tab-indicator" v-if="currentTab === index"></view>
      </view>
    </view>

    <!-- 会员权限列表 -->
    <view class="member-list">
      <view
        class="member-item"
        v-for="item in memberList"
        :key="item.id"
        @tap="toggleItem(item)"
      >
        <view class="item-left">
          <view
            class="check-icon"
            :class="{ checked: item.checked }"
          >
            <text v-if="item.checked">✓</text>
          </view>
          <view class="item-info">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-desc">{{ item.desc }}</text>
          </view>
        </view>
        <view class="item-right" @tap.stop="selectDiscount(item)">
          <text class="discount-text" v-if="item.discount">{{ item.discount }}</text>
          <text class="select-text" v-else>选择折扣</text>
          <text class="arrow">›</text>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-btn">
      <view class="save-btn" @tap="onSave">
        <text>保存</text>
      </view>
    </view>

    <!-- 折扣选择弹窗 -->
    <view class="popup-mask" v-if="showDiscountPicker" @tap="closeDiscountPicker"></view>
    <view class="popup-container" :class="{ show: showDiscountPicker }">
      <view class="popup-content">
        <view class="popup-title">选择折扣</view>
        <view class="discount-list">
          <view
            v-for="d in discountOptions"
            :key="d"
            class="discount-item"
            :class="{ active: selectedDiscount === d }"
            @tap="selectDiscountValue(d)"
          >
            <text>{{ d }}</text>
          </view>
        </view>
        <view class="popup-btn" @tap="confirmDiscount">
          <text>确定</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 标签页
const tabs = ['美发', '美容', '化妆', '美甲', '美体']
const currentTab = ref(0)

// 会员权限数据
const allMemberData = ref({
  0: [ // 美发
    { id: 1, title: '基础服务折扣', desc: '洗吹、造型、洗剪吹', checked: true, discount: '7折' },
    { id: 2, title: '项目服务折扣', desc: '烫发、染发、护理等', checked: true, discount: '' },
    { id: 3, title: '店卖商品折扣', desc: '店内销售相关的商品', checked: false, discount: '' },
    { id: 4, title: '会员权限协议', desc: 'xx平台会员，可同步享受此门店/设计师相关服务的会员折扣和优惠权限', checked: false, discount: '' }
  ],
  1: [ // 美容
    { id: 5, title: '基础护肤折扣', desc: '面部清洁、补水、按摩', checked: false, discount: '' },
    { id: 6, title: '项目服务折扣', desc: '美白、抗衰、祛痘等', checked: false, discount: '' },
    { id: 7, title: '店卖商品折扣', desc: '店内销售相关的商品', checked: false, discount: '' }
  ],
  2: [ // 化妆
    { id: 8, title: '日常妆容折扣', desc: '日妆、晚妆、新娘妆', checked: false, discount: '' },
    { id: 9, title: '特殊造型折扣', desc: '舞台妆、影视妆等', checked: false, discount: '' }
  ],
  3: [ // 美甲
    { id: 10, title: '基础美甲折扣', desc: '单色、渐变、法式', checked: false, discount: '' },
    { id: 11, title: '美甲艺术折扣', desc: '彩绘、钻饰、3D雕花', checked: false, discount: '' }
  ],
  4: [ // 美体
    { id: 12, title: '身体护理折扣', desc: '按摩、SPA、身体护理', checked: false, discount: '' },
    { id: 13, title: '塑形项目折扣', desc: '减脂、塑形、美体', checked: false, discount: '' }
  ]
})

// 当前列表
const memberList = computed(() => {
  return allMemberData.value[currentTab.value] || []
})

// 折扣选择弹窗
const showDiscountPicker = ref(false)
const selectedDiscount = ref('')
const currentEditItem = ref(null)
const discountOptions = ['9折', '8.5折', '8折', '7.5折', '7折', '6.5折', '6折', '5.5折', '5折']

// 页面加载
onLoad(() => {
  console.log('会员同步页面加载')
})

// 切换标签
const switchTab = (index) => {
  currentTab.value = index
}

// 切换选中状态
const toggleItem = (item) => {
  item.checked = !item.checked
}

// 选择折扣
const selectDiscount = (item) => {
  currentEditItem.value = item
  selectedDiscount.value = item.discount || ''
  showDiscountPicker.value = true
}

// 关闭折扣选择器
const closeDiscountPicker = () => {
  showDiscountPicker.value = false
  currentEditItem.value = null
}

// 选择折扣值
const selectDiscountValue = (d) => {
  selectedDiscount.value = d
}

// 确认折扣
const confirmDiscount = () => {
  if (currentEditItem.value && selectedDiscount.value) {
    currentEditItem.value.discount = selectedDiscount.value
    currentEditItem.value.checked = true
  }
  closeDiscountPicker()
}

// 保存
const onSave = () => {
  const selectedItems = []
  for (let key in allMemberData.value) {
    allMemberData.value[key].forEach(item => {
      if (item.checked) {
        selectedItems.push({
          id: item.id,
          title: item.title,
          discount: item.discount
        })
      }
    })
  }

  console.log('保存会员权限设置:', selectedItems)

  uni.showToast({
    title: '保存成功',
    icon: 'success'
  })

  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding-bottom: 140rpx;
}

// 标签导航
.tab-nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 0 16rpx;
  overflow-x: auto;
  white-space: nowrap;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28rpx 24rpx;
  position: relative;
  flex-shrink: 0;

  text {
    font-size: 28rpx;
    color: #999;
  }

  &.active {
    text {
      color: #4A90E2;
      font-weight: 500;
    }
  }
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  width: 40rpx;
  height: 4rpx;
  background-color: #4A90E2;
  border-radius: 2rpx;
}

// 会员权限列表
.member-list {
  padding: 24rpx;
}

.member-item {
  width: 640rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.check-icon {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 2rpx solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  flex-shrink: 0;

  text {
    font-size: 24rpx;
    color: #fff;
  }

  &.checked {
    background-color: #4A90E2;
    border-color: #4A90E2;
  }
}

.item-info {
  flex: 1;

  .item-title {
    font-size: 30rpx;
    color: #333;
    font-weight: 500;
    display: block;
    margin-bottom: 8rpx;
  }

  .item-desc {
    font-size: 26rpx;
    color: #999;
    display: block;
  }
}

.item-right {
  display: flex;
  align-items: center;
  gap: 8rpx;

  .discount-text {
    font-size: 28rpx;
    color: #4A90E2;
    font-weight: 500;
  }

  .select-text {
    font-size: 28rpx;
    color: #999;
  }

  .arrow {
    font-size: 32rpx;
    color: #ccc;
  }
}

// 底部按钮
.bottom-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.save-btn {
  height: 96rpx;
  border-radius: 16rpx;
  background-color: #4A90E2;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }

  &:active {
    opacity: 0.8;
  }
}

// 弹窗遮罩
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

// 弹窗容器
.popup-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;

  &.show {
    transform: translateY(0);
  }
}

.popup-content {
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding: 32rpx 24rpx;
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
}

.popup-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  text-align: center;
  margin-bottom: 32rpx;
}

.discount-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-bottom: 32rpx;
}

.discount-item {
  width: calc(33.333% - 14rpx);
  height: 80rpx;
  border-radius: 12rpx;
  background-color: #F5F7FA;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 28rpx;
    color: #333;
  }

  &.active {
    background-color: rgba(74, 144, 226, 0.1);
    border: 2rpx solid #4A90E2;

    text {
      color: #4A90E2;
      font-weight: 500;
    }
  }

  &:active {
    opacity: 0.7;
  }
}

.popup-btn {
  height: 96rpx;
  border-radius: 16rpx;
  background-color: #4A90E2;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }

  &:active {
    opacity: 0.8;
  }
}
</style>
