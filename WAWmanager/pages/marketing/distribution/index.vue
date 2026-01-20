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

    <!-- 分销服务列表 -->
    <scroll-view class="content-list" scroll-y v-if="currentTab === 0 || currentTab === 2">
      <view
        class="service-card"
        :class="{ 'off-shelf': currentTab === 2 }"
        v-for="item in serviceList"
        :key="item.id"
      >
        <view class="service-image-wrapper" :class="{ gray: currentTab === 2 }">
          <image class="service-image" :src="item.image" mode="aspectFill"></image>
        </view>
        <view class="service-info">
          <view class="service-header">
            <view class="service-title">
              <text class="service-name" :class="{ gray: currentTab === 2 }">{{ item.name }}</text>
              <text class="service-subtitle" v-if="item.subtitle">{{ item.subtitle }}</text>
            </view>
            <view class="more-btn" @tap.stop="showMoreOptions(item)">
              <text class="more-dots">···</text>
            </view>
          </view>
          <text class="service-desc" :class="{ gray: currentTab === 2 }">{{ item.description }}</text>
          <text class="member-price" :class="{ gray: currentTab === 2 }">会员价：¥{{ item.memberPrice }}</text>
          <text class="profit-text" :class="{ gray: currentTab === 2 }">利润{{ item.profit }}%</text>
        </view>
        <view class="right-section">
          <view class="distribution-btn" :class="{ disabled: currentTab === 2 }" @tap.stop="onDistributionLink(item)">
            <text>分销链接</text>
          </view>
          <text class="sales-text" :class="{ gray: currentTab === 2 }">销售：{{ item.sales }}单</text>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="serviceList.length === 0">
        <text>暂无分销服务</text>
      </view>
    </scroll-view>

    <!-- 分销成员列表 -->
    <scroll-view class="content-list" scroll-y v-if="currentTab === 1">
      <view class="member-card" v-for="item in memberList" :key="item.id">
        <!-- 头部：日期+服务名 / 收益 -->
        <view class="member-header">
          <view class="member-date-info">
            <text class="date-text">{{ item.date }}</text>
            <text class="service-text">{{ item.serviceName }}</text>
          </view>
          <text class="earnings-text">+{{ item.earnings }}</text>
        </view>
        <!-- 时间 / 支付价 -->
        <view class="member-detail">
          <text class="detail-time">{{ item.time }}</text>
          <text class="detail-price">支付价：{{ item.payPrice }}</text>
        </view>
        <!-- 成员信息 -->
        <view class="member-info-row">
          <image class="member-avatar" :src="item.avatar" mode="aspectFill"></image>
          <view class="member-info">
            <view class="member-name-row">
              <text class="member-name">{{ item.name }}</text>
              <image v-if="item.vipLevel === 'SVIP'" src="/static/icons/svip-badge@3x.png" mode="aspectFit" class="vip-badge-img"></image>
            </view>
            <view class="member-stats">
              <text>分销单数：{{ item.orderCount }}单</text>
              <text>分销收益：{{ item.totalEarnings }}元</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="memberList.length === 0">
        <text>暂无分销成员</text>
      </view>
    </scroll-view>

    <!-- 更多选择弹窗 -->
    <view class="popup-mask" v-if="showPopup" @tap="closePopup"></view>
    <view class="popup-container" :class="{ show: showPopup }">
      <view class="popup-content">
        <view class="popup-title">更多操作</view>
        <view class="popup-actions">
          <view class="popup-btn" @tap="handleEdit" v-if="currentTab === 0">
            <text>编辑</text>
          </view>
          <view class="popup-btn" @tap="handleOffShelf" v-if="currentTab === 0">
            <text>下架</text>
          </view>
          <view class="popup-btn" @tap="handleOnShelf" v-if="currentTab === 2">
            <text>上架</text>
          </view>
          <view class="popup-btn danger" @tap="handleDelete">
            <text>删除</text>
          </view>
          <view class="popup-btn" @tap="handlePromote" v-if="currentTab === 0">
            <text>推广</text>
          </view>
        </view>
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

    <!-- 分享推广弹窗 -->
    <view class="share-popup" v-if="showShareMenu">
      <view class="share-mask" @tap="closeShareMenu"></view>
      <view class="share-panel">
        <view class="share-options">
          <button class="share-item" open-type="share">
            <view class="share-icon-wrapper">
              <image src="/static/pages/后台管理页面_slices/weixin.png" mode="aspectFit" />
            </view>
            <text>微信</text>
          </button>
          <view class="share-item" @tap="shareToMoments">
            <view class="share-icon-wrapper">
              <image src="/static/pages/后台管理页面_slices/iconfontzhizuobiaozhunbduan36.png" mode="aspectFit" />
            </view>
            <text>朋友圈</text>
          </view>
          <view class="share-item" @tap="shareToWeibo">
            <view class="share-icon-wrapper">
              <image src="/static/pages/后台管理页面_slices/shejiaotubiao-42.png" mode="aspectFit" />
            </view>
            <text>微博</text>
          </view>
          <view class="share-item" @tap="copyLink">
            <view class="share-icon-wrapper">
              <image src="/static/pages/后台管理页面_slices/lianjie.png" mode="aspectFit" />
            </view>
            <text>复制链接</text>
          </view>
          <view class="share-item" @tap="showQrcode">
            <view class="share-icon-wrapper">
              <image src="/static/pages/后台管理页面_slices/saoyisao.png" mode="aspectFit" />
            </view>
            <text>二维码</text>
          </view>
        </view>
        <view class="share-cancel" @tap="closeShareMenu">
          <text>取消</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getDistributorList } from '@/api'

// 标签页
const tabs = ['分销服务', '分销成员', '已下架']
const currentTab = ref(0)

// 弹窗状态
const showPopup = ref(false)
const currentItem = ref(null)

// 确认弹窗状态
const showConfirmModal = ref(false)
const confirmTitle = ref('')
const confirmContent = ref('')
const confirmCallback = ref(null)

// 分享菜单状态
const showShareMenu = ref(false)

// 分销服务数据
const allServices = ref({
  0: [],
  2: []
})

// 分销成员数据
const allMembers = ref([])

// 加载分销服务列表
const loadServiceList = async () => {
  try {
    const status = currentTab.value === 0 ? 'active' : 'inactive'
    const res = await getDistributorList({ type: 'service', status })
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      allServices.value[currentTab.value === 0 ? 0 : 2] = list.map(item => ({
        id: item.id,
        name: item.name || item.serviceName,
        subtitle: item.subtitle || '',
        description: item.description || '',
        memberPrice: item.memberPrice || item.price || 0,
        profit: item.profit || item.commissionRate || 0,
        sales: item.sales || item.orderCount || 0,
        image: item.image || item.cover || ''
      }))
    }
  } catch (error) {
    console.error('加载分销服务失败:', error)
  }
}

// 加载分销成员列表
const loadMemberList = async () => {
  try {
    const res = await getDistributorList({ type: 'member' })
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      allMembers.value = list.map(item => ({
        id: item.id,
        date: item.date || '',
        serviceName: item.serviceName || '',
        time: item.time || item.createTime || '',
        payPrice: item.payPrice || item.amount || '0',
        earnings: item.earnings || item.commission || '0',
        name: item.name || item.userName || '',
        avatar: item.avatar || '',
        vipLevel: item.vipLevel || '',
        orderCount: item.orderCount || 0,
        totalEarnings: item.totalEarnings || '0'
      }))
    }
  } catch (error) {
    console.error('加载分销成员失败:', error)
  }
}

// 当前服务列表
const serviceList = computed(() => {
  if (currentTab.value === 0) {
    return allServices.value[0] || []
  } else if (currentTab.value === 2) {
    return allServices.value[2] || []
  }
  return []
})

// 当前成员列表
const memberList = computed(() => {
  return currentTab.value === 1 ? allMembers.value : []
})

// 页面加载
onLoad((options) => {
  if (options.tab) {
    const tabIndex = parseInt(options.tab) || 0
    currentTab.value = tabIndex
  }
  loadData()
})

// 页面显示
onShow(() => {
  loadData()
})

// 加载数据
const loadData = () => {
  if (currentTab.value === 1) {
    loadMemberList()
  } else {
    loadServiceList()
  }
}

// 切换标签页
const switchTab = (index) => {
  currentTab.value = index
  loadData()
}

// 显示更多选项
const showMoreOptions = (item) => {
  currentItem.value = item
  showPopup.value = true
}

// 关闭弹窗
const closePopup = () => {
  showPopup.value = false
  currentItem.value = null
}

// 编辑
const handleEdit = () => {
  const item = currentItem.value
  closePopup()
  // 将当前服务数据存储到本地，编辑页面可以读取
  uni.setStorageSync('editServiceData', JSON.stringify(item))
  uni.navigateTo({
    url: `/pages/service/edit?id=${item.id}&from=distribution`
  })
}

// 下架
const handleOffShelf = () => {
  closePopup()
  showCustomConfirm('下架分销服务', '确定要下架这个分销服务吗？', () => {
    const index = allServices.value[0].findIndex(item => item.id === currentItem.value.id)
    if (index !== -1) {
      const [service] = allServices.value[0].splice(index, 1)
      allServices.value[2].push(service)
      uni.showToast({ title: '已下架', icon: 'success' })
    }
  })
}

// 上架
const handleOnShelf = () => {
  closePopup()
  showCustomConfirm('上架分销服务', '确定要上架这个分销服务吗？', () => {
    const index = allServices.value[2].findIndex(item => item.id === currentItem.value.id)
    if (index !== -1) {
      const [service] = allServices.value[2].splice(index, 1)
      allServices.value[0].push(service)
      uni.showToast({ title: '已上架', icon: 'success' })
    }
  })
}

// 删除
const handleDelete = () => {
  closePopup()
  showCustomConfirm('删除分销服务', '确定要删除这个分销服务吗？', () => {
    const tabKey = currentTab.value === 0 ? 0 : 2
    const index = allServices.value[tabKey].findIndex(item => item.id === currentItem.value.id)
    if (index !== -1) {
      allServices.value[tabKey].splice(index, 1)
      uni.showToast({ title: '已删除', icon: 'success' })
    }
  })
}

// 推广
const handlePromote = () => {
  closePopup()
  showShareMenu.value = true
}

// 分销链接
const onDistributionLink = (item) => {
  if (currentTab.value === 2) {
    uni.showToast({ title: '已下架的服务无法生成分销链接', icon: 'none' })
    return
  }
  const link = `https://waw.com/distribution/${item.id}`
  uni.setClipboardData({
    data: link,
    success: () => {
      uni.showToast({ title: '分销链接已复制', icon: 'success' })
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

// 关闭分享菜单
const closeShareMenu = () => {
  showShareMenu.value = false
}

// 分享到朋友圈
const shareToMoments = () => {
  uni.showToast({ title: '请截图分享到朋友圈', icon: 'none' })
  closeShareMenu()
}

// 分享到微博
const shareToWeibo = () => {
  uni.showToast({ title: '功能开发中', icon: 'none' })
  closeShareMenu()
}

// 复制链接
const copyLink = () => {
  const link = `https://waw.com/distribution/${currentItem.value?.id || ''}`
  uni.setClipboardData({
    data: link,
    success: () => {
      uni.showToast({ title: '链接已复制', icon: 'success' })
    }
  })
  closeShareMenu()
}

// 显示二维码
const showQrcode = () => {
  closeShareMenu()
  uni.showToast({ title: '二维码功能开发中', icon: 'none' })
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
  justify-content: space-around;
  background-color: #fff;
  padding: 0 32rpx;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28rpx 32rpx;
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

// 内容列表
.content-list {
  flex: 1;
  padding: 24rpx;
}

// 服务卡片
.service-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  display: flex;
  gap: 20rpx;
  position: relative;
}

.service-image-wrapper {
  width: 180rpx;
  height: 180rpx;
  border-radius: 12rpx;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;

  &.gray {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}

.service-image {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.service-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 180rpx;
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4rpx;
}

.service-title {
  display: flex;
  align-items: baseline;
  gap: 12rpx;
}

.service-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;

  &.gray {
    color: #999;
  }
}

.service-subtitle {
  font-size: 26rpx;
  color: #999;
}

.more-btn {
  padding: 8rpx 16rpx;
  margin-right: -16rpx;
  margin-top: -8rpx;
}

.more-dots {
  font-size: 28rpx;
  color: #999;
  letter-spacing: 2rpx;
}

.service-desc {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 4rpx;

  &.gray {
    color: #999;
  }
}

.member-price {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 4rpx;

  &.gray {
    color: #999;
  }
}

.service-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rpx;
}

.distribution-btn {
  padding: 4rpx 18rpx;
  background-color: #5280FF;
  border-radius: 12rpx;

  text {
    font-size: 26rpx;
    color: #fff;
  }

  &.disabled {
    background-color: #BFBFBF;
  }

  &:active {
    opacity: 0.8;
  }
}

.right-section {
  position: absolute;
  right: 24rpx;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.profit-text {
  font-size: 22rpx;
  color: #16B364;
  font-weight: 400;

  &.gray {
    color: #FF6B6B;
  }
}

.sales-text {
  font-size: 26rpx;
  color: #999;
  text-align: right;

  &.gray {
    color: #BFBFBF;
  }
}

// 成员卡片
.member-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin: 24rpx;
}

.member-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12rpx;
}

.member-date-info {
  display: flex;
  align-items: baseline;
  gap: 20rpx;
}

.date-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.service-text {
  font-size: 30rpx;
  color: #333;
}

.earnings-text {
  font-size: 36rpx;
  font-weight: 600;
  color: #5B8FF9;
  font-family: DIN Alternate, -apple-system, sans-serif;
}

.member-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24rpx;
  padding-bottom: 24rpx;
  border-bottom: 1rpx solid #F5F5F5;
}

.detail-time {
  font-size: 26rpx;
  color: #999;
}

.detail-price {
  font-size: 26rpx;
  color: #999;
}

.member-info-row {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.member-avatar {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}

.member-info {
  flex: 1;
}

.member-name-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 12rpx;
}

.member-name {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
}

.vip-badge-img {
  width: 68rpx;
  height: 32rpx;
}

.member-stats {
  display: flex;
  gap: 40rpx;

  text {
    font-size: 26rpx;
    color: #666;
  }
}

// 空状态
.empty-state {
  padding: 160rpx 0;
  text-align: center;

  text {
    font-size: 28rpx;
    color: #999;
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
  z-index: 1000;
}

// 弹窗容器
.popup-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;

  &.show {
    transform: translateY(0);
  }
}

.popup-content {
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.popup-title {
  text-align: center;
  padding: 32rpx 0 24rpx;
  border-bottom: 1rpx solid #F0F0F0;
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.popup-actions {
  padding: 0;
}

.popup-btn {
  display: flex;
  margin: 24rpx;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  border-bottom: 1rpx solid #F5F5F5;
  background-color: #F8FAFC;

  &:last-child {
    border-bottom: none;
  }

  text {
    font-size: 32rpx;
    color: #333;
  }

  &.danger {
    text {
      color: #FF4D4F;
    }
  }

  &:active {
    background-color: #F0F0F0;
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

// 分享弹窗
.share-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.share-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.share-panel {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.share-options {
  display: flex;
  justify-content: space-around;
  padding: 40rpx 24rpx;
}

.share-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  line-height: normal;

  &::after {
    display: none;
  }

  text {
    font-size: 24rpx;
    color: #666;
    margin-top: 12rpx;
  }
}

.share-icon-wrapper {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;

  image {
    width: 48rpx;
    height: 48rpx;
  }
}

.share-cancel {
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 16rpx solid #F5F5F5;

  text {
    font-size: 32rpx;
    color: #666;
  }

  &:active {
    background-color: #F5F5F5;
  }
}
</style>
