<template>
  <view class="container">
    <!-- 下拉菜单遮罩 -->
    <view class="dropdown-mask" v-if="showDropdown" @tap="closeDropdown"></view>

    <!-- 顶部区域（导航栏 + 今日业绩） -->
    <view class="header-section" :style="{ paddingTop: statusBarHeight + 'px' }">
      <!-- 导航栏 -->
      <view class="navbar-content">
        <view class="back-btn" @tap="goBack">
          <image
            class="back-icon"
            src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg"
            mode="aspectFit"
          ></image>
        </view>
        <text class="navbar-title">{{ storeInfo.name }}</text>
        <view class="navbar-placeholder"></view>
      </view>

      <!-- 今日业绩模块 -->
      <view class="performance-card">
        <view class="performance-header">
          <view class="performance-title">今日业绩</view>
          <view class="header-right">
            <view class="bell-container" @tap="goOrders">
              <image class="bell-icon" src="/static/pages/后台管理页面_slices/notification-2-line@2x.png"></image>
              <view class="message-count" v-if="messageCount > 0">{{ messageCount }}</view>
            </view>
            <view class="add-btn-container">
              <view class="add-btn" @tap="toggleDropdown">
                <image class="add-icon" src="/static/pages/后台管理页面_slices/add-circle-line@2x.png"></image>
              </view>
              <view class="dropdown-menu" v-if="showDropdown">
                <view class="dropdown-item" @tap="selectOption('scan')">
                  <image class="dropdown-icon" src="/static/pages/后台管理页面_slices/qr-scan-2-line.png"></image>
                  <text>扫一扫</text>
                </view>
                <view class="dropdown-item" @tap="selectOption('promotion')">
                  <image class="dropdown-icon" src="/static/pages/后台管理页面_slices/share-circle-line.png"></image>
                  <text>推广店铺</text>
                </view>
                <view class="dropdown-item" @tap="selectOption('qrcode')">
                  <image class="dropdown-icon" src="/static/pages/后台管理页面_slices/qr-code-line.png"></image>
                  <text>店铺二维码</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 数据展示网格 -->
        <view class="data-grid">
          <view class="data-item" @tap="goToDataDetail('bookings')">
            <view class="data-label">预约订单</view>
            <view class="data-number">{{ todayData.bookings }}</view>
          </view>
          <view class="data-divider"></view>
          <view class="data-item" @tap="goToDataDetail('completed')">
            <view class="data-label">完成订单</view>
            <view class="data-number">{{ todayData.completed }}</view>
          </view>
          <view class="data-divider"></view>
          <view class="data-item" @tap="goToDataDetail('visitors')">
            <view class="data-label">访客数量</view>
            <view class="data-number">{{ todayData.visitors }}</view>
          </view>
        </view>

        <view class="data-grid">
          <view class="data-item" @tap="goToDataDetail('distribution')">
            <view class="data-label">分销订单</view>
            <view class="data-number">{{ todayData.distribution }}</view>
          </view>
          <view class="data-divider"></view>
          <view class="data-item" @tap="goToDataDetail('income')">
            <view class="data-label">支付收入</view>
            <view class="data-number">{{ formatNumber(todayData.income) }}</view>
          </view>
          <view class="data-divider"></view>
          <view class="data-item" @tap="goToDataDetail('balance')">
            <view class="data-label">店铺余额</view>
            <view class="data-number">{{ formatNumber(todayData.balance) }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 日常营业模块 -->
    <view class="section daily-operation">
      <view class="section-title">日常营业</view>
      <view class="operation-content">
        <view class="store-status-row">
          <view class="status-left">
            <view class="status-dot" :class="storeStatus.isOpen ? 'open' : 'closed'"></view>
            <text class="status-text" :class="storeStatus.isOpen ? 'open' : 'closed'">{{ storeStatus.statusText }}</text>
          </view>
          <view class="switch-wrapper" @tap.stop="onSwitchTap">
            <switch
              :checked="storeStatus.isOpen"
              color="#4CD964"
              :disabled="true"
            />
          </view>
        </view>
        <view class="time-manage-btn" @tap="goTimeManage">
          <image class="time-icon" src="/static/pages/后台管理页面_slices/time-line@2x.png"></image>
          <text>时间管理</text>
        </view>
      </view>
    </view>

    <!-- 管理应用模块 -->
    <view class="section management-section">
      <view class="section-title">管理应用</view>

      <!-- 功能网格 -->
      <view class="function-grid">
        <view
          class="function-item"
          v-for="item in filteredFunctionList"
          :key="item.id"
          @tap="goFunction(item.type)"
        >
          <view class="function-icon-wrapper">
            <image class="function-icon" :src="item.icon"></image>
          </view>
          <view class="function-name">{{ item.name }}</view>
        </view>
      </view>
    </view>

    <!-- 店铺状态确认弹窗 -->
    <view class="confirm-modal" v-if="showConfirmModal">
      <view class="confirm-mask" @tap="cancelSwitch"></view>
      <view class="confirm-dialog">
        <view class="confirm-title">{{ confirmModalData.title }}</view>
        <view class="confirm-content">{{ confirmModalData.content }}</view>
        <view class="confirm-buttons">
          <view class="confirm-btn cancel" @tap="cancelSwitch">取消</view>
          <view class="confirm-btn confirm" @tap="confirmSwitch">确定</view>
        </view>
      </view>
    </view>

    <!-- 分享菜单组件 -->
    <view class="share-popup" v-if="showShareMenu">
      <view class="share-mask" @tap="closeShareMenu"></view>
      <view class="share-panel">
        <view class="share-options">
          <button class="share-item" open-type="share">
            <view class="share-icon-wrapper wechat">
              <image src="/static/pages/后台管理页面_slices/weixin.png" />
            </view>
            <text>微信</text>
          </button>
          <view class="share-item" @tap="shareToMoments">
            <view class="share-icon-wrapper moments">
              <image src="/static/pages/后台管理页面_slices/iconfontzhizuobiaozhunbduan36.png" />
            </view>
            <text>朋友圈</text>
          </view>
          <view class="share-item" @tap="shareToWeibo">
            <view class="share-icon-wrapper weibo">
              <image src="/static/pages/后台管理页面_slices/shejiaotubiao-42.png" />
            </view>
            <text>微博</text>
          </view>
          <view class="share-item" @tap="copyLink">
            <view class="share-icon-wrapper link">
              <image src="/static/pages/后台管理页面_slices/lianjie.png" />
            </view>
            <text>复制链接</text>
          </view>
          <view class="share-item" @tap="showServiceQrcode">
            <view class="share-icon-wrapper qrcode">
              <image src="/static/pages/后台管理页面_slices/saoyisao.png" />
            </view>
            <text>服务二维码</text>
          </view>
        </view>
        <view class="share-cancel" @tap="closeShareMenu">取消</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onLoad, onShow, onShareAppMessage } from '@dcloudio/uni-app'
import { getTodayOverview, getBusinessStatus, updateBusinessStatus } from '@/api'

// 响应式数据
const showDropdown = ref(false)
const showShareMenu = ref(false)
const showConfirmModal = ref(false)
const messageCount = ref(4)
const isProcessing = ref(false)
const currentVersion = ref('merchant')
const statusBarHeight = ref(44)
const pendingSwitchStatus = ref(null)

const confirmModalData = ref({
  title: '',
  content: ''
})

const todayData = ref({
  bookings: 24,
  completed: 16,
  visitors: 34,
  distribution: 12,
  income: 2493,
  balance: 3678
})

const storeInfo = ref({
  id: 'store_001',
  name: 'WAW Style',
  coverImage: '/static/images/store-cover.jpg',
  description: '专业美发造型，为您打造完美形象'
})

const storeStatus = ref({
  isOpen: true,
  statusText: '营业中',
  openTime: '09:00',
  closeTime: '21:00'
})

const functionList = ref([
  { id: 1, name: '店铺管理', type: 'shop', icon: '/static/pages/后台管理页面_slices/shop@2x.png' },
  { id: 2, name: '全部服务', type: 'services', icon: '/static/pages/后台管理页面_slices/category-2@2x.png' },
  { id: 3, name: '订单管理', type: 'orders', icon: '/static/pages/后台管理页面_slices/note@2x.png' },
  { id: 4, name: '营销管理', type: 'marketing', icon: '/static/pages/后台管理页面_slices/graph@2x.png' },
  { id: 5, name: '验证核销', type: 'verify', icon: '/static/pages/后台管理页面_slices/verify@2x.png' },
  { id: 6, name: '顾客管理', type: 'customers', icon: '/static/pages/后台管理页面_slices/people@2x.png' },
  { id: 7, name: '资产收入', type: 'assets', icon: '/static/pages/后台管理页面_slices/wallet@2x.png' },
  { id: 8, name: '员工管理', type: 'staff', icon: '/static/pages/后台管理页面_slices/personalcard@2x.png' },
  { id: 9, name: '技师管理', type: 'technician', icon: '/static/pages/后台管理页面_slices/user-square@2x.png' },
  { id: 10, name: '数据统计', type: 'stats', icon: '/static/pages/后台管理页面_slices/status-up@2x.png' }
])

// 格式化数字（千分位）
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 根据版本过滤功能列表
const filteredFunctionList = computed(() => {
  const hiddenTypeMap = {
    technician: ['technician'],
    storeTechnician: ['technician', 'staff']
  }

  if (hiddenTypeMap[currentVersion.value]) {
    return functionList.value.filter(
      item => !hiddenTypeMap[currentVersion.value].includes(item.type)
    )
  }
  return functionList.value
})

// 解析版本
const resolveVersion = (version) => {
  const validVersions = ['merchant', 'technician', 'storeTechnician']
  return validVersions.includes(version) ? version : ''
}

// 页面加载
onLoad((options) => {
  // 检查登录状态
  const token = uni.getStorageSync('waw_manager_token')
  const shopId = uni.getStorageSync('shop_id')

  if (!token) {
    uni.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 2000
    })
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/auth/login'
      })
    }, 1500)
    return
  }

  if (!shopId) {
    uni.showToast({
      title: '请先完善店铺信息',
      icon: 'none',
      duration: 2000
    })
  }

  // 获取状态栏高度
  statusBarHeight.value = uni.getStorageSync('statusBarHeight') || 44

  const optionVersion = options && options.version ? resolveVersion(options.version) : ''
  const storedVersion = resolveVersion(uni.getStorageSync('currentVersion'))
  const versionToUse = optionVersion || storedVersion || currentVersion.value

  if (versionToUse !== currentVersion.value) {
    currentVersion.value = versionToUse
  }

  loadTodayData()
  restoreStoreStatus()
})

// 页面显示
onShow(() => {
  refreshData()
})

// 分享配置
onShareAppMessage(() => {
  return {
    title: storeInfo.value.name,
    path: `/pages/manage/index?version=${currentVersion.value}`,
    imageUrl: storeInfo.value.coverImage
  }
})

// 加载今日数据
const loadTodayData = async () => {
  try {
    const res = await getTodayOverview()
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      todayData.value = {
        bookings: data.bookings || 0,
        completed: data.completed || 0,
        visitors: data.visitors || 0,
        distribution: data.distribution || 0,
        income: data.income || 0,
        balance: data.balance || 0
      }
    }
  } catch (error) {
    console.error('加载今日数据失败:', error)
  }
}

// 刷新数据
const refreshData = async () => {
  uni.showLoading({ title: '刷新中...' })
  try {
    await loadTodayData()
  } finally {
    uni.hideLoading()
  }
}

// 恢复店铺状态
const restoreStoreStatus = async () => {
  try {
    const res = await getBusinessStatus()
    if (res.code === 200 || res.code === 0) {
      const data = res.data || {}
      storeStatus.value = {
        ...storeStatus.value,
        isOpen: data.isOpen ?? true,
        statusText: data.isOpen ? '营业中' : '已关店'
      }
    }
  } catch (error) {
    console.error('获取营业状态失败:', error)
    // 如果是 shop_id 相关错误，显示友好提示
    if (error.message && error.message.includes('shop_id')) {
      uni.showToast({
        title: '请先完善店铺信息',
        icon: 'none',
        duration: 2000
      })
    }
  }
}

// 切换下拉菜单
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// 关闭下拉菜单
const closeDropdown = () => {
  showDropdown.value = false
}

// 选择下拉选项
const selectOption = (type) => {
  showDropdown.value = false
  handleAddRecord(type)
}

// 处理添加记录
const handleAddRecord = (type) => {
  switch (type) {
    case 'scan':
      uni.scanCode({
        success: (res) => {
          console.log('扫码结果:', res)
          uni.showToast({ title: '扫码成功', icon: 'success' })
        },
        fail: () => {
          uni.showToast({ title: '扫码失败', icon: 'none' })
        }
      })
      break
    case 'promotion':
      showShareMenu.value = true
      break
    case 'qrcode':
      const storeInfoStr = encodeURIComponent(JSON.stringify(storeInfo.value))
      uni.navigateTo({
        url: `/pages/shop/store-qrcode?storeInfo=${storeInfoStr}`
      })
      break
  }
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
  const link = `https://waw.com/store/${storeInfo.value.id}`
  uni.setClipboardData({
    data: link,
    success: () => {
      uni.showToast({ title: '链接已复制', icon: 'success' })
    }
  })
  closeShareMenu()
}

// 显示服务二维码
const showServiceQrcode = () => {
  closeShareMenu()
  const storeInfoStr = encodeURIComponent(JSON.stringify(storeInfo.value))
  uni.navigateTo({
    url: `/pages/shop/store-qrcode?storeInfo=${storeInfoStr}`
  })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 跳转到时间管理
const goTimeManage = () => {
  uni.navigateTo({
    url: `/pages/time/manage?version=${currentVersion.value}`
  })
}

// 跳转到功能页面
const goFunction = (type) => {
  const routeMap = {
    shop: '/pages/shop/manage',
    services: '/pages/service/list',
    orders: '/pages/order/list',
    marketing: '/pages/marketing/index',
    verify: '/pages/verify/index',
    customers: '/pages/customer/list',
    assets: '/pages/finance/assets-home',
    staff: '/pages/staff/list',
    technician: '/pages/technician/list',
    stats: '/pages/data/index'
  }

  const url = routeMap[type]
  if (url) {
    uni.navigateTo({ url })
  } else {
    uni.showToast({ title: '功能开发中', icon: 'none' })
  }
}

// 跳转到消息通知
const goOrders = () => {
  uni.navigateTo({ url: '/pages/message/list' })
}

// 跳转到数据详情
const goToDataDetail = (type) => {
  const routeMap = {
    bookings: '/pages/order/list',
    completed: '/pages/order/list',
    visitors: '/pages/visitor/record',
    distribution: '/pages/marketing/distribution/index',
    income: '/pages/finance/assets-home',
    balance: '/pages/finance/assets-home'
  }

  const url = routeMap[type]
  if (url) {
    uni.navigateTo({ url })
  } else {
    uni.showToast({ title: '功能开发中', icon: 'none' })
  }
}

// 点击开关区域
const onSwitchTap = () => {
  if (isProcessing.value) return

  const newStatus = !storeStatus.value.isOpen
  pendingSwitchStatus.value = newStatus

  // 显示自定义弹窗
  confirmModalData.value = {
    title: newStatus ? '开启店铺' : '关闭店铺',
    content: newStatus
      ? '开启店铺后客户可以正常预约服务'
      : '关闭店铺将无法显示店铺信息和接单'
  }
  showConfirmModal.value = true
}

// 取消开关操作
const cancelSwitch = () => {
  showConfirmModal.value = false
  // 状态已在 handleSwitchChange 中恢复，只需清除待处理状态
  pendingSwitchStatus.value = null
}

// 确认开关操作
const confirmSwitch = async () => {
  showConfirmModal.value = false
  const newStatus = pendingSwitchStatus.value
  const action = newStatus ? '开启' : '关闭'

  isProcessing.value = true

  try {
    const res = await updateBusinessStatus({ isOpen: newStatus })
    if (res.code === 200 || res.code === 0) {
      const statusText = newStatus ? '营业中' : '已关店'
      storeStatus.value.isOpen = newStatus
      storeStatus.value.statusText = statusText

      uni.showToast({
        title: `店铺已${action}`,
        icon: 'success',
        duration: 2000
      })
    } else {
      uni.showToast({
        title: res.message || `${action}失败`,
        icon: 'none',
        duration: 2000
      })
    }
  } catch (error) {
    console.error('更新营业状态失败:', error)
    uni.showToast({
      title: `${action}失败`,
      icon: 'none',
      duration: 2000
    })
  } finally {
    isProcessing.value = false
    pendingSwitchStatus.value = null
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}

.container {
  padding: 0;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.dropdown-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
}

/* 顶部区域（导航栏 + 今日业绩） */
.header-section {
  width: 100%;
  background: linear-gradient(135deg, rgb(125, 124, 227) 0%, rgb(60, 164, 252) 100%);
  color: white;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
  padding: 0 30rpx;
  position: relative;
}

.back-btn {
  width: 32rpx;
  height: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  width: 32rpx;
  height: 32rpx;
}

.navbar-title {
  font-family: 'PingFang SC', sans-serif;
  font-size: 32rpx;
  font-weight: 500;
  color: #ffffff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.navbar-placeholder {
  width: 32rpx;
  height: 32rpx;
}

/* 今日业绩卡片 */
.performance-card {
  width: 100%;
  box-sizing: border-box;
  padding: 30rpx 30rpx 80rpx;
}

.performance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50rpx;
}

.performance-title {
  font-size: 36rpx;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 30rpx;
}

.bell-container {
  position: relative;
}

.bell-icon {
  width: 48rpx;
  height: 48rpx;
}

.message-count {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  background-color: #ff4d4f;
  color: #fff;
  font-size: 20rpx;
  min-width: 32rpx;
  height: 32rpx;
  line-height: 32rpx;
  border-radius: 16rpx;
  text-align: center;
  padding: 0 6rpx;
}

.add-btn-container {
  position: relative;
}

.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-icon {
  width: 48rpx;
  height: 48rpx;
}

.dropdown-menu {
  position: absolute;
  top: 80rpx;
  right: -10rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
  z-index: 100;
  padding: 16rpx 0;

  &::before {
    content: '';
    position: absolute;
    top: -16rpx;
    right: 24rpx;
    width: 0;
    height: 0;
    border-left: 16rpx solid transparent;
    border-right: 16rpx solid transparent;
    border-bottom: 16rpx solid #fff;
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 20rpx 28rpx;
  font-size: 26rpx;
  color: #333;
  white-space: nowrap;

  text {
    white-space: nowrap;
  }

  &:active {
    background-color: #f5f5f5;
  }
}

.dropdown-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 16rpx;
  flex-shrink: 0;
}

.data-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.data-item {
  flex: 1;
  text-align: center;
}

.data-label {
  font-size: 24rpx;
  opacity: 0.85;
  margin-bottom: 12rpx;
}

.data-number {
  font-size: 40rpx;
  font-weight: 500;
}

.data-divider {
  width: 1rpx;
  height: 60rpx;
  background-color: rgba(255, 255, 255, 0.3);
}

/* 区块 */
.section {
  margin: 24rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
}

/* 日常营业模块 - 去掉下边距，上部圆角 */
.daily-operation {
  width: calc(100% - 48rpx);
  margin: -40rpx auto 0 auto;
  margin-left: 24rpx;
  margin-right: 24rpx;
  margin-bottom: 25rpx;
  border-radius: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
  padding: 32rpx;
  box-sizing: border-box;
}

/* 管理应用模块 - 去掉上边距，下部圆角 */
.management-section {
  width: calc(100% - 48rpx);
  margin: 0 auto 24rpx auto;
  margin-left: 24rpx;
  margin-right: 24rpx;
  border-radius:24rpx;
  padding: 32rpx;
  box-sizing: border-box;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
}

/* 日常营业模块内部样式 */
.daily-operation {
  .operation-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .store-status-row {
    display: flex;
    align-items: center;
    gap: 150rpx;
    padding: 10rpx 20rpx;
    border-radius: 12rpx;
    border: 1rpx solid #E1FBEA;
  }

  .status-left {
    display: flex;
    align-items: center;
    gap: 12rpx;
  }

  .status-dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;

    &.open {
      background-color: #4CD964;
    }

    &.closed {
      background-color: #ff4d4f;
    }
  }

  .status-text {
    font-size: 28rpx;
    font-weight: 500;

    &.open {
      color: #4CD964;
    }

    &.closed {
      color: #ff4d4f;
    }
  }

  .time-manage-btn {
    color: #5280FF;
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 20rpx 24rpx;
    background-color: #f8f8f8;
    border-radius: 12rpx;
    font-size: 28rpx;
    color: #666;

    .time-icon {
      width: 36rpx;
      height: 36rpx;
    }
  }
}

/* 功能网格 */
.function-grid {
  display: flex;
  flex-wrap: wrap;
}

.function-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;

  &:active {
    opacity: 0.7;
  }
}

.function-icon-wrapper {
  width: 96rpx;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.function-icon {
  width: 64rpx;
  height: 64rpx;
}

.function-name {
  font-size: 26rpx;
  color: #333;
}

/* 分享弹窗 */
.share-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.share-mask {
  position: absolute;
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
  background-color: #f5f5f5;
  border-radius: 24rpx 24rpx 0 0;
  padding: 40rpx 20rpx calc(20rpx + env(safe-area-inset-bottom));
}

.share-options {
  display: flex;
  justify-content: space-between;
  padding: 0 20rpx;
  margin-bottom: 32rpx;
}

.share-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  padding: 0;
  margin: 0;
  line-height: 1;
  width: 120rpx;

  &::after {
    border: none;
  }

  text {
    font-size: 24rpx;
    color: #333;
    white-space: nowrap;
  }
}

.share-icon-wrapper {
  width: 96rpx;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;

  image {
    width: 96rpx;
    height: 96rpx;
  }
}

.share-cancel {
  width: 100%;
  height: 96rpx;
  background-color: #fff;
  color: #333;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 自定义确认弹窗 */
.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.confirm-dialog {
  position: relative;
  width: 560rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 48rpx 40rpx 40rpx;
  box-sizing: border-box;
}

.confirm-title {
  text-align: center;
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
}

.confirm-content {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
  margin-bottom: 48rpx;
}

.confirm-buttons {
  display: flex;
  gap: 24rpx;
}

.confirm-btn {
  flex: 1;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10rpx;
  font-size: 30rpx;
  font-weight: 500;
}

.confirm-btn.cancel {
  border: 2rpx solid #ddd;
  background-color: #fff;
  color: #333;
}

.confirm-btn.confirm {
  background-color: #5280FF;
  color: #fff;
  border: 2rpx solid #ddd;
}
</style>
