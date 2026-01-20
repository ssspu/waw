<template>
  <view class="container">
    <!-- 标签页导航 -->
    <view class="tab-nav">
      <view
        class="tab-item"
        :class="{ active: currentTab === 0 }"
        @tap="switchTab(0)"
      >
        <text>门店服务</text>
        <view class="tab-indicator" v-if="currentTab === 0"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 1 }"
        @tap="switchTab(1)"
      >
        <text>上门服务</text>
        <view class="tab-indicator" v-if="currentTab === 1"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 2 }"
        @tap="switchTab(2)"
      >
        <text>已下架</text>
        <view class="tab-indicator" v-if="currentTab === 2"></view>
      </view>
    </view>

    <!-- 服务列表 -->
    <scroll-view class="service-list" scroll-y>
      <view
        class="service-item"
        :class="{ 'off-shelf': currentTab === 2 }"
        v-for="item in serviceList"
        :key="item.id"
        @tap="onServiceTap(item.id)"
      >
        <image class="service-image" :src="item.image" mode="aspectFill"></image>
        <view class="service-info">
          <view class="service-header">
            <view class="service-title-row">
              <text class="service-name">{{ item.name }}</text>
              <text class="service-subtitle" v-if="item.subtitle">{{ item.subtitle }}</text>
              <text class="package-tag" v-if="item.isPackage">套餐</text>
            </view>
            <view class="service-more" @tap.stop="showMoreOptions(item.id)">
              <text class="more-dots">...</text>
            </view>
          </view>
          <text class="service-description">{{ item.description }}</text>
          <view class="service-details">
            <text class="service-duration">用时：{{ item.duration }}</text>
            <text class="service-sales">销售：{{ item.sales }}</text>
          </view>
        </view>
        <view class="service-price">
          <text class="price-symbol">¥</text>
          <text class="price-value">{{ item.price }}</text>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="serviceList.length === 0">
        <text>暂无服务</text>
      </view>

      <!-- 底部占位 -->
      <view class="bottom-placeholder"></view>
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="bottom-buttons">
      <view class="btn-add-package" v-if="showAddPackageBtn" @tap="addNewPackage">
        <text>新增套餐</text>
      </view>
      <view class="btn-publish" :class="{ 'full-width': !showAddPackageBtn }" @tap="publishNewService">
        <text>发布新服务</text>
      </view>
    </view>

    <!-- 更多选择弹窗 -->
    <view class="popup-mask" v-if="showPopup" @tap="closePopup"></view>
    <view class="popup-container" :class="{ show: showPopup }">
      <view class="popup-content">
        <view class="popup-title">更多选择</view>
        <view class="popup-actions">
          <view class="popup-btn" @tap="handleEdit(currentServiceId)" v-if="currentTab !== 2">
            <text>编辑</text>
          </view>
          <view class="popup-btn" @tap="handleOffShelf(currentServiceId)" v-if="currentTab !== 2">
            <text>下架</text>
          </view>
          <view class="popup-btn" @tap="handleRelist(currentServiceId)" v-if="currentTab === 2">
            <text>上架</text>
          </view>
          <view class="popup-btn" @tap="handleDelete(currentServiceId)">
            <text>删除</text>
          </view>
          <view class="popup-btn" @tap="handlePromote(currentServiceId)" v-if="currentTab !== 2">
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
              <image src="/static/pages/后台管理页面_slices/weixin.png" />
            </view>
            <text>微信</text>
          </button>
          <view class="share-item" @tap="shareToMoments">
            <view class="share-icon-wrapper">
              <image src="/static/pages/后台管理页面_slices/iconfontzhizuobiaozhunbduan36.png" />
            </view>
            <text>朋友圈</text>
          </view>
          <view class="share-item" @tap="shareToWeibo">
            <view class="share-icon-wrapper">
              <image src="/static/pages/后台管理页面_slices/shejiaotubiao-42.png" />
            </view>
            <text>微博</text>
          </view>
          <view class="share-item" @tap="copyLink">
            <view class="share-icon-wrapper">
              <image src="/static/pages/后台管理页面_slices/lianjie.png" />
            </view>
            <text>复制链接</text>
          </view>
          <view class="share-item" @tap="showServiceQrcode">
            <view class="share-icon-wrapper">
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
import { ref, computed } from 'vue'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
import { getServiceList, offlineService, onlineService, deleteService as deleteServiceApi } from '@/api'

// 当前标签页
const currentTab = ref(0)

// 弹窗状态
const showPopup = ref(false)
const currentServiceId = ref(null)

// 确认弹窗状态
const showConfirmModal = ref(false)
const confirmTitle = ref('')
const confirmContent = ref('')
const confirmCallback = ref(null)

// 分享菜单状态
const showShareMenu = ref(false)

// 所有服务数据
const allServices = ref({
  0: [ // 门店服务
    {
      id: 1,
      name: '洗吹',
      subtitle: '',
      description: '水洗+按摩+造型',
      duration: '预计1小时',
      sales: '682单',
      price: 38,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: '洗剪吹',
      subtitle: '',
      description: '水洗+按摩+修剪+造型',
      duration: '预计1小时',
      sales: '682单',
      price: 68,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      name: '烫发',
      subtitle: '水纹波浪烫',
      description: '洗护+按摩+修剪+烫发+造型',
      duration: '预计3小时',
      sales: '682单',
      price: 1080,
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=200&h=200&fit=crop'
    },
    {
      id: 9,
      name: '烫染套餐',
      subtitle: '水纹波浪烫',
      description: '洗护+按摩+修剪+烫发+造型',
      duration: '预计3小时',
      sales: '682单',
      price: 1080,
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=200&h=200&fit=crop',
      isPackage: true,
      includedServiceIds: [2, 3] // 套餐包含的基础服务ID
    }
  ],
  1: [ // 上门服务
    {
      id: 4,
      name: '上门洗剪吹',
      subtitle: '',
      description: '上门服务+水洗+修剪+造型',
      duration: '预计1.5小时',
      sales: '56单',
      price: 168,
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop'
    },
    {
      id: 5,
      name: '上门烫发',
      subtitle: '水纹波浪烫',
      description: '上门服务+洗护+修剪+烫发+造型',
      duration: '预计4小时',
      sales: '32单',
      price: 1280,
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=200&h=200&fit=crop'
    }
  ],
  2: [ // 已下架
    {
      id: 6,
      name: '洗吹',
      subtitle: '',
      description: '水洗+按摩+造型',
      duration: '预计1小时',
      sales: '682单',
      price: 38,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop'
    },
    {
      id: 7,
      name: '洗剪吹',
      subtitle: '',
      description: '水洗+按摩+修剪+造型',
      duration: '预计1小时',
      sales: '682单',
      price: 68,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop'
    },
    {
      id: 8,
      name: '烫发',
      subtitle: '水纹波浪烫',
      description: '洗护+按摩+修剪+烫发+造型',
      duration: '预计3小时',
      sales: '682单',
      price: 1080,
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=200&h=200&fit=crop'
    }
  ]
})

// 当前服务列表
const serviceList = computed(() => {
  return allServices.value[currentTab.value] || []
})

// 是否显示新增套餐按钮（基础服务数量≥2时显示）
const showAddPackageBtn = computed(() => {
  const currentList = allServices.value[currentTab.value] || []
  // 统计非套餐的基础服务数量
  const basicServiceCount = currentList.filter(item => !item.isPackage).length
  return basicServiceCount >= 2
})

// 页面加载
onLoad(() => {
  loadServices()
})

// 下拉刷新
onPullDownRefresh(() => {
  loadServices()
  uni.stopPullDownRefresh()
})

// 加载服务数据
const loadServices = async () => {
  const statusMap = ['online', 'home', 'offline']
  const status = statusMap[currentTab.value]

  try {
    const res = await getServiceList({ status })
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      allServices.value[currentTab.value] = list.map(item => ({
        id: item.id,
        name: item.name,
        subtitle: item.subtitle || '',
        description: item.description || '',
        duration: item.duration || '预计1小时',
        sales: item.sales || '0单',
        price: item.price || 0,
        image: item.image || item.coverImage || '',
        isPackage: item.isPackage || false
      }))
    }
  } catch (error) {
    console.error('加载服务数据失败:', error)
  }
}

// 切换标签页
const switchTab = (index) => {
  currentTab.value = index
}

// 点击服务
const onServiceTap = (id) => {
  uni.navigateTo({
    url: `/pages/service/detail?id=${id}`
  })
}

// 显示更多选项
const showMoreOptions = (id) => {
  currentServiceId.value = id
  showPopup.value = true
}

// 关闭弹窗
const closePopup = () => {
  showPopup.value = false
  currentServiceId.value = null
}

// 编辑服务
const handleEdit = (id) => {
  closePopup()
  uni.navigateTo({
    url: `/pages/service/edit?id=${id}`
  })
}

// 下架服务
const handleOffShelf = (id) => {
  closePopup()
  showCustomConfirm('下架服务', '确定要下架这1个服务吗?', () => {
    const currentList = allServices.value[currentTab.value]
    const index = currentList.findIndex(item => item.id === id)
    if (index !== -1) {
      const [service] = currentList.splice(index, 1)
      allServices.value[2].push(service)
      uni.showToast({ title: '已下架', icon: 'success' })
    }
  })
}

// 重新上架
const handleRelist = (id) => {
  closePopup()
  showCustomConfirm('上架服务', '确定要上架这1个服务吗?', () => {
    const offShelfList = allServices.value[2]
    const index = offShelfList.findIndex(item => item.id === id)
    if (index !== -1) {
      const [service] = offShelfList.splice(index, 1)
      allServices.value[0].push(service)
      uni.showToast({ title: '已上架', icon: 'success' })
    }
  })
}

// 查找包含指定基础服务的套餐
const findRelatedPackages = (serviceId) => {
  const relatedPackages = []
  // 遍历所有标签页的服务
  for (const tabKey in allServices.value) {
    const services = allServices.value[tabKey]
    for (const service of services) {
      if (service.isPackage && service.includedServiceIds && service.includedServiceIds.includes(serviceId)) {
        relatedPackages.push({
          ...service,
          tabKey: parseInt(tabKey)
        })
      }
    }
  }
  return relatedPackages
}

// 删除服务
const handleDelete = (id) => {
  closePopup()

  const currentList = allServices.value[currentTab.value]
  const service = currentList.find(item => item.id === id)

  if (!service) return

  // 如果是基础服务，检查是否被套餐包含
  if (!service.isPackage) {
    const relatedPackages = findRelatedPackages(id)

    if (relatedPackages.length > 0) {
      // 有关联套餐，显示特殊提醒
      const packageNames = relatedPackages.map(p => `"${p.name}"`).join('、')
      showCustomConfirm(
        '删除服务',
        `该基础服务被套餐${packageNames}包含，删除后相关套餐也将一并删除，确定要删除吗？`,
        () => {
          // 先删除关联的套餐
          for (const pkg of relatedPackages) {
            const tabServices = allServices.value[pkg.tabKey]
            const pkgIndex = tabServices.findIndex(item => item.id === pkg.id)
            if (pkgIndex !== -1) {
              tabServices.splice(pkgIndex, 1)
            }
          }
          // 再删除基础服务
          const index = currentList.findIndex(item => item.id === id)
          if (index !== -1) {
            currentList.splice(index, 1)
          }
          uni.showToast({ title: '已删除', icon: 'success' })
        }
      )
      return
    }
  }

  // 普通删除（无关联套餐或删除的就是套餐）
  showCustomConfirm('删除服务', '确定要删除这1个服务吗?', () => {
    const index = currentList.findIndex(item => item.id === id)
    if (index !== -1) {
      currentList.splice(index, 1)
      uni.showToast({ title: '已删除', icon: 'success' })
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

// 推广服务
const handlePromote = (id) => {
  closePopup()
  showShareMenu.value = true
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
  const link = `https://waw.com/service/${currentServiceId.value}`
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
  uni.showToast({ title: '二维码功能开发中', icon: 'none' })
}

// 新增套餐
const addNewPackage = () => {
  uni.navigateTo({
    url: '/pages/service/edit?type=package'
  })
}

// 发布新服务
const publishNewService = () => {
  uni.navigateTo({
    url: '/pages/service/edit?type=new'
  })
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
  gap: 48rpx;
  box-sizing: border-box;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28rpx 0;
  position: relative;

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

// 服务列表
.service-list {
  flex: 1;
  padding: 24rpx;
  box-sizing: border-box;
}

.service-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: flex-start;
  position: relative;

  &.off-shelf {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 16rpx;
      pointer-events: none;
    }
  }
}

.service-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  background-color: #f5f5f5;
  flex-shrink: 0;
}

.service-info {
  flex: 1;
  margin-left: 24rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 120rpx;
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.service-title-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  flex: 1;
  overflow: hidden;
}

.service-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

.service-subtitle {
  font-size: 24rpx;
  color: #FF9500;
  background-color: #FFF8EE;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  white-space: nowrap;
}

.package-tag {
  font-size: 22rpx;
  color: #fff;
  background-color: #4A90E2;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  white-space: nowrap;
}

.service-more {
  padding: 8rpx 16rpx;
  margin-right: -16rpx;
  margin-top: -8rpx;
}

.more-dots {
  font-size: 32rpx;
  color: #999;
  letter-spacing: -2rpx;
}

.service-description {
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.service-details {
  display: flex;
  margin-top: auto;
  padding-top: 12rpx;
  font-size: 24rpx;
  color: #999;
  gap: 32rpx;
}

.service-price {
  position: absolute;
  right: 24rpx;
  bottom: 24rpx;
  display: flex;
  align-items: baseline;
}

.price-symbol {
  font-size: 24rpx;
  color: #FF9500;
}

.price-value {
  font-size: 40rpx;
  color: #FF9500;
  font-weight: 600;
}

// 空状态
.empty-state {
  padding: 100rpx 0;
  text-align: center;

  text {
    font-size: 28rpx;
    color: #999;
  }
}

// 底部占位
.bottom-placeholder {
  height: 140rpx;
}

// 底部按钮
.bottom-buttons {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20rpx 24rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 24rpx;
}

.btn-add-package {
  flex: 1;
  height: 88rpx;
  border-radius: 14rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 2rpx solid #4A90E2;

  text {
    font-size: 32rpx;
    color: #4A90E2;
    font-weight: 500;
  }

  &:active {
    opacity: 0.8;
  }
}

.btn-publish {
  flex: 1;
  height: 88rpx;
  border-radius: 14rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4A90E2;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }

  &:active {
    opacity: 0.8;
  }

  &.full-width {
    flex: none;
    width: 100%;
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

.popup-actions {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.popup-btn {
  height: 96rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F8FAFC;

  text {
    font-size: 32rpx;
    color: #333;
  }

  &:active {
    opacity: 0.7;
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
    background-color: #4A90E2;

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
  font-size: 32rpx;
  color: #333;
  border-top: 1rpx solid #f0f0f0;
}
</style>
