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

    <!-- 优惠券列表 -->
    <scroll-view class="coupon-list" scroll-y>
      <!-- 空状态 -->
      <view class="empty-state" v-if="couponList.length === 0">
        <image src="/pages/marketing/static/图片@3x.png" mode="aspectFit" class="empty-image"></image>
        <text class="empty-text">暂无优惠券</text>
      </view>

      <!-- 优惠券卡片 -->
      <view
        class="coupon-card"
        :class="{ ended: currentTab === 2 }"
        v-for="item in couponList"
        :key="item.id"
      >
        <!-- 卡片主体 -->
        <view class="coupon-body">
          <!-- 左侧金额区域 -->
          <view class="coupon-left" :class="{ gray: currentTab === 2 }">
            <view class="coupon-amount">
              <text class="symbol">¥</text>
              <text class="value">{{ item.amount }}</text>
            </view>
            <text class="coupon-condition">满{{ item.condition }}元可用</text>
          </view>

          <!-- 右侧信息区域 -->
          <view class="coupon-right">
            <text class="coupon-name">{{ item.name }}</text>
            <text class="coupon-validity">{{ item.validity }}</text>
            <view class="coupon-stats">
              <text>已领：{{ item.received }}张</text>
              <text class="divider">|</text>
              <text>已用：{{ item.used }}张</text>
              <text class="divider">|</text>
              <text>库存：{{ item.stock }}张</text>
            </view>

            <!-- 已下架印章 -->
            <image class="stamp" v-if="currentTab === 2" src="/pages/marketing/static/xiajia.png" mode="aspectFit"></image>

            <!-- 删除按钮 -->
            <view class="delete-btn" v-if="currentTab === 2" @tap.stop="deleteCoupon(item.id)">
              <image src="/static/icons/删除.png" mode="aspectFit"></image>
            </view>
          </view>
        </view>

        <!-- 操作按钮 - 未开始状态 -->
        <view class="coupon-actions" v-if="currentTab === 0">
          <view class="action-btn edit" @tap.stop="editCoupon(item.id)">
            <text>编辑</text>
          </view>
          <view class="action-btn distribute" @tap.stop="startCoupon(item)">
            <text>立即发放</text>
          </view>
        </view>

        <!-- 操作按钮 - 进行中状态 -->
        <view class="coupon-actions" v-if="currentTab === 1">
          <view class="action-btn edit" @tap.stop="editCoupon(item.id)">
            <text>编辑</text>
          </view>
          <view class="action-btn distribute" @tap.stop="stopCoupon(item)">
            <text>停止发放</text>
          </view>
        </view>
      </view>

      <!-- 底部占位 -->
      <view class="bottom-placeholder"></view>
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="bottom-btn">
      <view class="add-btn" @tap="addCoupon">
        <text>新增</text>
      </view>
    </view>

    <!-- 确认弹窗 -->
    <view class="confirm-mask" v-if="showConfirmModal" @tap="cancelConfirm"></view>
    <view class="confirm-modal" :class="{ show: showConfirmModal }">
      <view class="confirm-title">{{ confirmTitle }}</view>
      <view class="confirm-content">{{ confirmContent }}</view>
      <view class="confirm-buttons">
        <view class="confirm-btn cancel" @tap="cancelConfirm">
          <text>取消</text>
        </view>
        <view class="confirm-btn confirm" @tap="doConfirm">
          <text>确定</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getCouponList, updateCouponStatus, deleteCouponById } from '@/api'

// 标签页
const tabs = ['未开始', '进行中', '已结束']
const currentTab = ref(1)

// 所有优惠券数据
const allCoupons = ref({
  0: [],
  1: [],
  2: []
})

// 当前优惠券列表
const couponList = computed(() => {
  return allCoupons.value[currentTab.value] || []
})

// 加载优惠券列表
const loadCouponList = async () => {
  try {
    const statusMap = { 0: 'pending', 1: 'active', 2: 'ended' }
    const res = await getCouponList({ status: statusMap[currentTab.value] })
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      allCoupons.value[currentTab.value] = list.map(item => ({
        id: item.id,
        name: item.name,
        amount: item.value || item.amount,
        condition: item.minAmount || item.condition,
        validity: item.validityText || item.validity,
        validityType: item.validityType || 'claim',
        received: item.receivedCount || item.received || 0,
        used: item.usedCount || item.used || 0,
        stock: item.stock || item.totalCount || 0
      }))
    }
  } catch (error) {
    console.error('加载优惠券列表失败:', error)
  }
}

// 确认弹窗状态
const showConfirmModal = ref(false)
const confirmTitle = ref('')
const confirmContent = ref('')
const confirmCallback = ref(null)

// 页面加载
onLoad(() => {
  loadCouponList()
})

// 页面显示时刷新数据
onShow(() => {
  loadCouponList()
})

// 切换标签页
const switchTab = (index) => {
  currentTab.value = index
  loadCouponList()
}

// 新增优惠券
const addCoupon = () => {
  uni.navigateTo({
    url: '/pages/marketing/coupon/add'
  })
}

// 编辑优惠券
const editCoupon = (id) => {
  uni.navigateTo({
    url: `/pages/marketing/coupon/add?id=${id}`
  })
}

// 停止发放
const stopCoupon = (coupon) => {
  showCustomConfirm('停止发放', '确定要停止发放这个优惠券吗？', async () => {
    try {
      const res = await updateCouponStatus(coupon.id, 'stopped')
      if (res.code === 200 || res.code === 0) {
        uni.showToast({ title: '已停止发放', icon: 'success' })
        loadCouponList()
      }
    } catch (error) {
      console.error('停止发放失败:', error)
      uni.showToast({ title: '操作失败', icon: 'none' })
    }
  })
}

// 立即发放（开始让用户领取）
const startCoupon = (coupon) => {
  showCustomConfirm('立即发放', '确定要开始发放这个优惠券吗？用户将可以开始领取。', async () => {
    try {
      const res = await updateCouponStatus(coupon.id, 'active')
      if (res.code === 200 || res.code === 0) {
        uni.showToast({ title: '已开始发放', icon: 'success' })
        loadCouponList()
      }
    } catch (error) {
      console.error('开始发放失败:', error)
      uni.showToast({ title: '操作失败', icon: 'none' })
    }
  })
}

// 删除优惠券
const deleteCoupon = (id) => {
  showCustomConfirm('删除优惠券', '确定要删除这个优惠券吗？', async () => {
    try {
      const res = await deleteCouponById(id)
      if (res.code === 200 || res.code === 0) {
        uni.showToast({ title: '已删除', icon: 'success' })
        loadCouponList()
      }
    } catch (error) {
      console.error('删除优惠券失败:', error)
      uni.showToast({ title: '删除失败', icon: 'none' })
    }
  })
}

// 显示自定义确认弹窗
const showCustomConfirm = (title, content, callback) => {
  confirmTitle.value = title
  confirmContent.value = content
  confirmCallback.value = callback
  showConfirmModal.value = true
}

// 取消确认
const cancelConfirm = () => {
  showConfirmModal.value = false
  confirmCallback.value = null
}

// 执行确认
const doConfirm = () => {
  if (confirmCallback.value) {
    confirmCallback.value()
  }
  showConfirmModal.value = false
  confirmCallback.value = null
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  display: flex;
  flex-direction: column;
}

// 标签导航
.tab-nav {
  width: 100%;
  display: flex;
  background-color: #fff;
  padding: 0 40rpx;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28rpx 0;
  position: relative;

  text {
    font-size: 30rpx;
    color: #333;
  }

  &.active {
    text {
      color: #5B8FF9;
      font-weight: 500;
    }
  }
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  width: 44rpx;
  height: 6rpx;
  background-color: #5B8FF9;
  border-radius: 3rpx;
}

// 优惠券列表
.coupon-list {
  flex: 1;
  padding: 24rpx;
  box-sizing: border-box;
  width: 100%;
}

// 空状态
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200rpx 0;

  .empty-image {
    width: 320rpx;
    height: 240rpx;
    margin-bottom: 32rpx;
  }

  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}

// 优惠券卡片
.coupon-card {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  overflow: visible;
  position: relative;

  // 左侧半圆缺口
  &::before {
    content: '';
    position: absolute;
    left: -16rpx;
    top: 70%;
    transform: translateY(-50%);
    width: 32rpx;
    height: 32rpx;
    background-color: #F5F7FA;
    border-radius: 50%;
    z-index: 2;
  }

  // 右侧半圆缺口
  &::after {
    content: '';
    position: absolute;
    right: -16rpx;
    top: 70%;
    transform: translateY(-50%);
    width: 32rpx;
    height: 32rpx;
    background-color: #F5F7FA;
    border-radius: 50%;
    z-index: 2;
  }

  &.ended {
    .coupon-name, .coupon-validity, .coupon-stats {
      color: #999 !important;
    }
  }
}

// 卡片主体
.coupon-body {
  display: flex;
}

.coupon-left {
  width: 180rpx;
  height: 140rpx;
  background: linear-gradient(180deg, #8D93FF 0%, #5280FF 100%);
  display: flex;
  margin: 24rpx;
  border-radius: 12rpx;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &.gray {
    background: linear-gradient(180deg, #BFBFBF 0%, #A6A6A6 100%);
  }
}

.coupon-amount {
  display: flex;
  align-items: baseline;
  margin-bottom: 8rpx;

  .symbol {
    font-size: 28rpx;
    color: #fff;
    margin-right: 4rpx;
  }

  .value {
    font-size: 64rpx;
    color: #fff;
    font-weight: 600;
    font-family: DIN Alternate, -apple-system, sans-serif;
    line-height: 1;
  }
}

.coupon-condition {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.9);
}

.coupon-right {
  flex: 1;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  position: relative;
}

.coupon-name {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 12rpx;
}

.coupon-validity {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 16rpx;
}

.coupon-stats {
  display: flex;
  align-items: center;
  font-size: 20rpx;
  color: #999;

  .divider {
    margin: 0 12rpx;
    color: #E8E8E8;
  }
}

.stamp {
  position: absolute;
  right: 100rpx;
  top: 16rpx;
  width: 120rpx;
  height: 120rpx;
}

.delete-btn {
  position: absolute;
  right: 24rpx;
  top: 24rpx;
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFEEED;
  border-radius: 50%;

  image {
    width: 32rpx;
    height: 32rpx;
    filter: brightness(0) saturate(100%) invert(27%) sepia(89%) saturate(2186%) hue-rotate(346deg) brightness(97%) contrast(95%);
  }
}

// 操作按钮
.coupon-actions {
  display: flex;
  gap: 20rpx;
  padding: 0 24rpx 24rpx;
}

.action-btn {
  flex: 1;
  height: 56rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 28rpx;
  }

  &.edit {
    border: 2rpx solid #E8E8E8;
    background-color: #F8FAFC;

    text {
      color: #666;
    }
  }

  &.distribute {
    background-color: #5B8FF9;

    text {
      color: #fff;
    }
  }

  &:active {
    opacity: 0.8;
  }
}

// 底部占位
.bottom-placeholder {
  height: 140rpx;
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
}

.add-btn {
  height: 96rpx;
  border-radius: 12rpx;
  background-color: #5B8FF9;
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

// 确认弹窗遮罩
.confirm-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

// 确认弹窗
.confirm-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 560rpx;
  background-color: #fff;
  border-radius: 24rpx;
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-out;

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
  }
}

.confirm-title {
  font-size: 34rpx;
  color: #333;
  font-weight: 500;
  text-align: center;
  padding: 48rpx 32rpx 24rpx;
}

.confirm-content {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  padding: 0 32rpx 48rpx;
}

.confirm-buttons {
  display: flex;
  gap: 24rpx;
  padding: 0 32rpx 32rpx;
}

.confirm-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &.cancel {
    background-color: #F5F7FA;

    text {
      font-size: 32rpx;
      color: #333;
    }
  }

  &.confirm {
    background-color: #5B8FF9;

    text {
      font-size: 32rpx;
      color: #fff;
    }
  }

  &:active {
    opacity: 0.8;
  }
}
</style>
