<template>
  <view class="container">
    <!-- Tab导航 -->
    <view class="tab-nav">
      <view
        class="tab-item"
        :class="{ active: currentTab === 0 }"
        @tap="switchTab(0)"
      >
        <text>服务门店</text>
        <view class="tab-line" v-if="currentTab === 0"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 1 }"
        @tap="switchTab(1)"
      >
        <text>入驻门店</text>
        <view class="tab-line" v-if="currentTab === 1"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 2 }"
        @tap="switchTab(2)"
      >
        <text>连锁门店</text>
        <view class="tab-line" v-if="currentTab === 2"></view>
      </view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content" scroll-y>
      <!-- 搜索栏(入驻门店和连锁门店显示) -->
      <view class="search-bar" v-if="currentTab === 1 || currentTab === 2">
        <view class="city-select" @tap="showCityPicker">
          <text>{{ selectedCity }}</text>
          <image class="dropdown-icon" src="/pages/shop/static/下啦.png" mode="aspectFit"></image>
        </view>
        <view class="search-input-wrapper">
          <input
            class="search-input"
            placeholder="输入要入驻的店铺名称/店铺ID编号"
            placeholder-style="color: #999; font-size: 26rpx;"
            v-model="searchKeyword"
            @confirm="handleSearch"
          />
          <image class="search-icon" src="/pages/shop/static/sousuo.png" mode="aspectFit" @tap="handleSearch"></image>
        </view>
      </view>
      <!-- 服务门店 -->
      <view class="tab-content" v-if="currentTab === 0">
        <!-- 门店列表 -->
        <view class="store-list" v-if="serviceStores.length > 0">
          <view
            class="store-card"
            v-for="(store, index) in serviceStores"
            :key="index"
            @tap="goStoreDetail(store)"
          >
            <view class="store-logo-placeholder" v-if="!store.logo">
              <text>LOGO</text>
            </view>
            <image class="store-logo" v-else :src="store.logo" mode="aspectFill"></image>
            <view class="store-info">
              <view class="store-name-row">
                <text class="store-name">{{ store.name }}</text>
                <text class="store-branch" v-if="store.branch">{{ store.branch }}</text>
              </view>
              <text class="store-status">是否营业：{{ store.status }}</text>
              <text class="store-address">店铺地址：{{ store.address }}</text>
            </view>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>
        <!-- 添加服务门店 -->
        <view class="add-store-card" @tap="addServiceStore">
          <text class="add-icon">+</text>
          <text class="add-text">添加服务门店</text>
        </view>
      </view>

      <!-- 入驻门店 -->
      <view class="tab-content" v-if="currentTab === 1">
        <!-- 门店列表容器 -->
        <view class="settled-store-container" v-if="settledStores.length > 0">
          <view
            class="settled-store-wrapper"
            v-for="(store, index) in settledStores"
            :key="index"
          >
            <view class="settled-store-item">
              <view class="store-logo-wrapper">
                <image class="store-logo" :src="store.logo" mode="aspectFill"></image>
              </view>
              <view class="store-info">
                <view class="store-name-row">
                  <text class="store-name">{{ store.name }}</text>
                </view>
                <view class="store-detail-row">
                  <text class="store-label">是否营业：</text>
                  <text class="store-value">{{ store.status }}</text>
                </view>
                <view class="store-detail-row">
                  <text class="store-label">店铺地址：</text>
                  <text class="store-value">{{ store.address }}</text>
                </view>
              </view>
              <!-- 申请入驻按钮 -->
              <view class="apply-btn" v-if="store.settleStatus === 'none'" @tap.stop="applySettle(store)">
                <text>申请入驻</text>
              </view>
              <!-- 等待确认状态 -->
              <view class="pending-tag" v-else-if="store.settleStatus === 'pending'">
                <text>等待确认</text>
              </view>
              <!-- 已驻门店状态 -->
              <view class="settled-tag" v-else-if="store.settleStatus === 'settled'">
                <text>已驻门店</text>
              </view>
            </view>
            <!-- 已入驻门店的操作按钮 -->
            <view class="settled-actions" v-if="store.settleStatus === 'settled'">
              <view class="leave-btn" @tap="leaveStore(store)">
                <text>脱离本店</text>
              </view>
              <view class="sync-btn" @tap="syncServices(store)">
                <text>同步服务</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 空状态 -->
        <view class="empty-state" v-if="settledStores.length === 0">
          <text>暂无门店,请搜索要入驻的门店</text>
        </view>
      </view>

      <!-- 连锁门店 -->
      <view class="tab-content" v-if="currentTab === 2">
        <!-- 门店列表 -->
        <view class="store-list" v-if="chainStores.length > 0">
          <view
            class="store-card"
            v-for="(store, index) in chainStores"
            :key="index"
            @tap="goStoreDetail(store)"
          >
            <image class="store-logo" :src="store.logo" mode="aspectFill"></image>
            <view class="store-info">
              <view class="store-name-row">
                <text class="store-name">{{ store.name }}</text>
                <text class="store-branch" v-if="store.branch">{{ store.branch }}</text>
              </view>
              <text class="store-status">是否营业: {{ store.status }}</text>
              <text class="store-address">店铺地址: {{ store.address }}</text>
            </view>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>

        <!-- 添加连锁门店 -->
        <view class="add-store-card" @tap="addChainStore">
          <text class="add-icon">+</text>
          <text class="add-text">添加连锁门店</text>
        </view>
      </view>
    </scroll-view>

    <!-- 申请入驻确认弹窗 -->
    <view class="confirm-mask" v-if="showApplyModal" @tap="cancelApply"></view>
    <view class="confirm-modal" :class="{ show: showApplyModal }">
      <view class="confirm-title">申请入驻</view>
      <view class="confirm-content">
        <text>确定入驻此店铺吗?</text>
        <text>入驻此店铺后结算资金将到此店铺账户</text>
      </view>
      <view class="confirm-buttons">
        <view class="confirm-btn cancel" @tap="cancelApply">
          <text>取消</text>
        </view>
        <view class="confirm-btn confirm" @tap="confirmApply">
          <text>确定</text>
        </view>
      </view>
    </view>

    <!-- 脱离本店确认弹窗 -->
    <view class="confirm-mask" v-if="showLeaveModal" @tap="cancelLeave"></view>
    <view class="confirm-modal" :class="{ show: showLeaveModal }">
      <view class="confirm-title">脱离本店</view>
      <view class="confirm-content">确定要脱离该门店吗?脱离将失去此店铺的相关权益。</view>
      <view class="confirm-buttons">
        <view class="confirm-btn cancel" @tap="cancelLeave">
          <text>取消</text>
        </view>
        <view class="confirm-btn confirm" @tap="confirmLeave">
          <text>确定</text>
        </view>
      </view>
    </view>

    <!-- 城市选择器 -->
    <view class="picker-mask" v-if="showCityPickerModal" @tap="closeCityPicker"></view>
    <view class="picker-container" :class="{ show: showCityPickerModal }">
      <view class="picker-header">
        <text class="picker-cancel" @tap="closeCityPicker">取消</text>
        <text class="picker-title">选择城市</text>
        <text class="picker-confirm" @tap="confirmCity">确定</text>
      </view>
      <picker-view class="picker-view" :value="cityPickerValue" @change="onCityChange">
        <picker-view-column>
          <view class="picker-item" v-for="city in cityList" :key="city">{{ city }}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

// 当前选中的tab
const currentTab = ref(0)
// 搜索关键词
const searchKeyword = ref('')
// 选中的城市
const selectedCity = ref('成都市')
// 城市选择器
const showCityPickerModal = ref(false)
const cityPickerValue = ref([0])
const cityList = ['成都市', '北京市', '上海市', '广州市', '深圳市', '杭州市', '南京市', '武汉市']

// 弹窗状态
const showApplyModal = ref(false)
const showLeaveModal = ref(false)
const applyingStore = ref(null)

// 门店数据
const serviceStores = ref([
  {
    id: 1,
    name: 'CD beautiful 造型',
    phone: '+86-18177778888',
    logo: '',
    status: '正常营业',
    address: '四川省成都市xxx街xxx大厦',
    addressDetail: '9楼2号',
    businessTime: '09:00 - 21:00',
    recommendation: ''
  }
])

const settledStores = ref([
  {
    id: 1,
    name: 'CD beautiful 造型',
    logo: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop',
    status: '正常营业',
    address: '成都市青羊区某某街某某位置',
    settleStatus: 'none' // 'none' | 'pending' | 'settled'
  },
  {
    id: 2,
    name: 'CD beautiful 造型',
    logo: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop',
    status: '正常营业',
    address: '成都市青羊区某某街某某位置',
    settleStatus: 'settled'
  }
])

const chainStores = ref([
  {
    id: 1,
    name: 'CD beautiful 造型',
    branch: '家园店',
    logo: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop',
    status: '正常营业',
    address: '成都市青羊区某某街某某位置'
  },
  {
    id: 2,
    name: 'CD beautiful 造型',
    branch: '武清店',
    logo: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop',
    status: '正常营业',
    address: '成都市青羊区某某街某某位置'
  }
])

// 页面加载
onLoad(() => {
  uni.setNavigationBarTitle({ title: '关联店铺' })
})

// 页面显示时检查是否有新添加/更新/删除的门店
onShow(() => {
  // 新增门店
  const newStore = uni.getStorageSync('newServiceStore')
  if (newStore) {
    serviceStores.value.push({
      id: Date.now(),
      ...newStore
    })
    uni.removeStorageSync('newServiceStore')
  }

  // 更新门店
  const updateStore = uni.getStorageSync('updateServiceStore')
  if (updateStore) {
    const index = serviceStores.value.findIndex(s => String(s.id) === String(updateStore.id))
    if (index !== -1) {
      serviceStores.value[index] = { ...serviceStores.value[index], ...updateStore.data }
    }
    uni.removeStorageSync('updateServiceStore')
  }

  // 删除门店
  const deleteStoreId = uni.getStorageSync('deleteServiceStore')
  if (deleteStoreId) {
    const index = serviceStores.value.findIndex(s => String(s.id) === String(deleteStoreId))
    if (index !== -1) {
      serviceStores.value.splice(index, 1)
    }
    uni.removeStorageSync('deleteServiceStore')
  }
})

// 切换Tab
const switchTab = (index) => {
  currentTab.value = index
}

// 显示城市选择器
const showCityPicker = () => {
  showCityPickerModal.value = true
}

// 关闭城市选择器
const closeCityPicker = () => {
  showCityPickerModal.value = false
}

// 城市选择变化
const onCityChange = (e) => {
  cityPickerValue.value = e.detail.value
}

// 确认城市选择
const confirmCity = () => {
  selectedCity.value = cityList[cityPickerValue.value[0]]
  closeCityPicker()
}

// 搜索
const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    uni.showToast({ title: '请输入搜索关键词', icon: 'none' })
    return
  }
  uni.showToast({ title: '搜索中...', icon: 'loading' })
  // 模拟搜索
  setTimeout(() => {
    uni.hideToast()
  }, 1000)
}

// 添加服务门店
const addServiceStore = () => {
  uni.navigateTo({ url: '/pages/shop/store-add' })
}

// 添加连锁门店
const addChainStore = () => {
  uni.showToast({ title: '功能开发中', icon: 'none' })
}

// 申请入驻
const applySettle = (store) => {
  applyingStore.value = store
  showApplyModal.value = true
}

// 取消申请
const cancelApply = () => {
  showApplyModal.value = false
  applyingStore.value = null
}

// 确认申请
const confirmApply = () => {
  const store = applyingStore.value
  if (store) {
    const index = settledStores.value.findIndex(s => s.id === store.id)
    if (index !== -1) {
      settledStores.value[index].settleStatus = 'pending'
    }
  }
  showApplyModal.value = false
  applyingStore.value = null
  uni.showToast({ title: '申请成功，等待确认', icon: 'success' })
}

// 脱离本店
const leavingStore = ref(null)
const leaveStore = (store) => {
  leavingStore.value = store
  showLeaveModal.value = true
}

// 取消脱离
const cancelLeave = () => {
  showLeaveModal.value = false
  leavingStore.value = null
}

// 确认脱离
const confirmLeave = () => {
  if (leavingStore.value) {
    const index = settledStores.value.findIndex(s => s.id === leavingStore.value.id)
    if (index !== -1) {
      settledStores.value[index].settleStatus = 'none'
    }
  }
  showLeaveModal.value = false
  leavingStore.value = null
  uni.showToast({ title: '已脱离', icon: 'success' })
}

// 同步服务
const syncServices = (store) => {
  uni.showToast({ title: '同步中...', icon: 'loading' })
  setTimeout(() => {
    uni.showToast({ title: '同步成功', icon: 'success' })
  }, 1500)
}

// 跳转门店详情（编辑）
const goStoreDetail = (store) => {
  // 将门店数据存储到 Storage 供编辑页面使用
  uni.setStorageSync('editStoreData', store)
  uni.navigateTo({ url: `/pages/shop/store-add?id=${store.id}` })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  display: flex;
  flex-direction: column;
}

// Tab导航
.tab-nav {
  width: 100%;
  display: flex;
  background-color: #fff;
  padding: 0 24rpx;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28rpx 0 20rpx;
  position: relative;

  text {
    font-size: 30rpx;
    color: #333;
  }

  &.active {
    text {
      color: #4A90E2;
      font-weight: 500;
    }
  }
}

.tab-line {
  position: absolute;
  bottom: 0;
  width: 48rpx;
  height: 6rpx;
  background-color: #4A90E2;
  border-radius: 3rpx;
}

// 搜索栏
.search-bar {
  padding: 0rpx 8rpx;
  display: flex;
  align-items: center;  
  background-color: #fff;
  margin-top: 20rpx;
  border-radius: 99rpx;
  gap: 0;
}

.city-select {
  display: flex;
  align-items: center;
  padding: 16rpx 16rpx 16rpx 8rpx;
  flex-shrink: 0;
  border-right: 1rpx solid #E8E8E8;

  text {
    font-size: 28rpx;
    color: #333;
  }
}

.dropdown-icon {
  width: 24rpx;
  height: 24rpx;
  margin-left: 8rpx;
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 16rpx;
}

.search-input {
  flex: 1;
  height: 60rpx;
  font-size: 26rpx;
}

.search-icon {
  width: 40rpx;
  height: 40rpx;
}

// 内容区域
.content {
  flex: 1;
  padding: 0 24rpx 24rpx;
  box-sizing: border-box;
}

.tab-content {
  width: 100%;
  margin-top: 16rpx;
}

// 添加门店卡片
.add-store-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #EAECF0;
  border: 2rpx dashed #D0D5DD;
  border-radius: 16rpx;
  padding: 24rpx 0;
  margin-top: 24rpx;

  &:active {
    opacity: 0.7;
  }
}

.add-icon {
  font-size: 56rpx;
  color: #98A2B3;
  line-height: 1;
  margin-bottom: 16rpx;
}

.add-text {
  font-size: 28rpx;
  color: #98A2B3;
}

// 门店列表
.store-list {
  width: 100%;
}

.store-card {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx 24rpx;
  margin-bottom: 16rpx;
  min-height: 180rpx;
  box-sizing: border-box;

  &:active {
    opacity: 0.8;
  }
}

.store-logo {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
  background-color: #F5F7FA;
}

.store-logo-placeholder {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
  background-color: #F0F2F5;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #E4E7ED;

  text {
    font-size: 24rpx;
    color: #909399;
    font-weight: 500;
  }
}

.store-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.store-name-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.store-name {
  font-size: 30rpx;
  color: #333;
  font-weight: 600;
}

.store-branch {
  font-size: 22rpx;
  color: #666;
  background-color: #F5F7FA;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
}

.store-status {
  font-size: 24rpx;
  color: #666;
}

.store-address {
  font-size: 24rpx;
  color: #999;
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

// 操作按钮
.action-btn {
  padding: 12rpx 24rpx;
  border-radius: 8rpx;
  flex-shrink: 0;

  text {
    font-size: 26rpx;
  }

  &.apply {
    background-color: #4A90E2;

    text {
      color: #fff;
    }
  }
}

.settled-badge {
  padding: 8rpx 16rpx;
  background-color: #E8F4FD;
  border-radius: 6rpx;

  text {
    font-size: 24rpx;
    color: #4A90E2;
  }
}

// 入驻门店样式
.settled-store-container {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.settled-store-item {
  display: flex;
  align-items: center;
  padding: 28rpx 24rpx;
  border-bottom: 1rpx solid #F5F5F5;
  position: relative;
}

.store-logo-wrapper {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  border: 2rpx solid #E8E8E8;
  overflow: hidden;
  flex-shrink: 0;
  background-color: #fff;
}

.settled-store-item .store-logo {
  width: 100%;
  height: 100%;
}

.settled-store-item .store-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.settled-store-item .store-name-row {
  display: flex;
  align-items: center;
}

.settled-store-item .store-name {
  font-size: 30rpx;
  color: #333;
  font-weight: 600;
}

.store-detail-row {
  display: flex;
  align-items: center;
}

.store-label {
  font-size: 24rpx;
  color: #666;
}

.store-value {
  font-size: 24rpx;
  color: #666;
}

.apply-btn {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  padding: 6rpx 16rpx;
  background-color: #5280FF;
  border-radius: 8rpx;

  text {
    font-size: 26rpx;
    color: #fff;
  }

  &:active {
    opacity: 0.8;
  }
}

.pending-tag {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  padding: 6rpx 16rpx;
  background-color: #5280FF;
  border-radius: 8rpx;

  text {
    font-size: 24rpx;
    color: #ffffff;
  }
}

.settled-tag {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  padding: 6rpx 16rpx;
  background-color: #DBE8FF;
  border-radius: 8rpx;
  border: 1rpx solid #D4E8FC;

  text {
    font-size: 24rpx;
    color: #5280FF;
  }
}

// 已入驻门店操作按钮
.settled-actions {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
  padding: 12rpx;
  border-top: 1rpx solid #F5F5F5;
}

.leave-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14rpx 30rpx;
  border-radius: 8rpx;
  background-color: #F8FAFC;

  text {
    font-size: 22rpx;
    color: #333;
  }

  &:active {
    background-color: #F5F5F5;
  }
}

.sync-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14rpx 30rpx; 
  background-color: #4A90E2;
  border-radius: 12rpx;

  text {
    font-size: 22rpx;
    color: #fff;
  }

  &:active {
    opacity: 0.8;
  }
}

.action-btn-outline {
  padding: 16rpx 32rpx;
  border: 2rpx solid #ddd;
  border-radius: 8rpx;

  text {
    font-size: 28rpx;
    color: #333;
  }

  &:active {
    opacity: 0.7;
  }
}

.action-btn-primary {
  padding: 16rpx 32rpx;
  background-color: #4A90E2;
  border-radius: 8rpx;

  text {
    font-size: 28rpx;
    color: #fff;
  }

  &:active {
    opacity: 0.8;
  }
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

// 确认弹窗
.confirm-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.confirm-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 584rpx;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 28rpx;
  color: #666;
  text-align: center;
  padding: 0 32rpx 48rpx;
  line-height: 1.8;
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
    background-color: #5280FF;

    text {
      font-size: 32rpx;
      color: #fff;
    }
  }

  &:active {
    opacity: 0.8;
  }
}

// 城市选择器
.picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.picker-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  z-index: 1001;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;

  &.show {
    transform: translateY(0);
  }
}

.picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.picker-cancel {
  font-size: 30rpx;
  color: #999;
}

.picker-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
}

.picker-confirm {
  font-size: 30rpx;
  color: #4A90E2;
}

.picker-view {
  height: 400rpx;
}

.picker-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #333;
}
</style>
