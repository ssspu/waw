<template>
  <view class="container">
    <!-- 标签页导航 -->
    <view class="tab-nav">
      <view
        class="tab-item"
        :class="{ active: currentTab === 0 }"
        @tap="switchTab(0)"
      >
        <text>新增技师</text>
        <view class="tab-indicator" v-if="currentTab === 0"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 1 }"
        @tap="switchTab(1)"
      >
        <text>在职技师</text>
        <view class="tab-indicator" v-if="currentTab === 1"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 2 }"
        @tap="switchTab(2)"
      >
        <text>离职技师</text>
        <view class="tab-indicator" v-if="currentTab === 2"></view>
      </view>
    </view>

    <!-- 技师类型筛选 -->
    <view class="filter-header">
      <view class="type-filter">
        <view
          class="type-item"
          :class="{ active: currentType === 'hairdresser' }"
          @tap="switchType('hairdresser')"
        >
          <text>美发师</text>
        </view>
        <view
          class="type-item"
          :class="{ active: currentType === 'beautician' }"
          @tap="switchType('beautician')"
        >
          <text>美容师</text>
        </view>
        <view
          class="type-item"
          :class="{ active: currentType === 'makeup' }"
          @tap="switchType('makeup')"
        >
          <text>化妆师</text>
        </view>
        <view
          class="type-item"
          :class="{ active: currentType === 'manicurist' }"
          @tap="switchType('manicurist')"
        >
          <text>美甲师</text>
        </view>
      </view>
      <view class="add-tech-btn" v-if="currentTab === 1 || currentTab === 2" @tap="addTechnician">
        <image class="add-icon" src="/static/icons/add-circle-line.png" mode="aspectFit"></image>
      </view>
    </view>

    <!-- 技师列表 -->
    <scroll-view class="technician-list" scroll-y>
      <!-- 按职位分组 -->
      <view class="position-group" v-for="group in groupedTechnicians" :key="group.position">
        <!-- 职位标题 -->
        <view class="position-header">
          <image class="position-icon" src="/static/icons/容器@3x.png" mode="aspectFit"></image>
          <text class="position-title">{{ group.position }}</text>
          <text class="position-date">{{ group.dateInfo }}</text>
          <view class="position-more" @tap.stop="showGroupMore(group)">
            <text>...</text>
          </view>
        </view>

        <!-- 技师卡片 -->
        <view
          class="technician-card"
          :class="{ 'resigned': currentTab === 2 }"
          v-for="tech in group.technicians"
          :key="tech.id"
          @longpress="showTechMore(tech)"
        >
          <view class="tech-main">
            <image class="tech-avatar" :src="tech.avatar" mode="aspectFill"></image>
            <view class="tech-info">
              <view class="tech-name-row">
                <text class="tech-name">{{ tech.name }}</text>
                <image class="tech-badge" src="/static/icons/personalcard.png" mode="aspectFit"></image>
              </view>
              <view class="tech-rating">
                <text class="rating-score">{{ tech.rating }}</text>
                <image class="rating-star" src="/static/icons/start.png" mode="aspectFit"></image>
                <text class="rating-count">({{ tech.bookings }}次预约)</text>
              </view>
            </view>
          </view>

          <view class="tech-details">
            <text>从业: {{ tech.experience }}</text>
            <text>等级: {{ tech.level }}</text>
            <text>{{ tech.restDay }}</text>
          </view>
          <view class="tech-skills">
            <text class="skill-label">擅长:</text>
            <view class="skill-tags">
              <text class="skill-tag" v-for="skill in tech.skills" :key="skill">{{ skill }}</text>
            </view>
          </view>

          <!-- 已离职印章 -->
          <image class="resigned-stamp" v-if="currentTab === 2" src="/pages/technician/static/lizhi.png" mode="aspectFit"></image>

          <!-- 操作按钮 -->
          <view class="tech-action">
            <view
              class="action-btn"
              :class="{ 'confirm': currentTab === 0, 'profile': currentTab === 1 || currentTab === 2 }"
              @tap="handleAction(tech)"
            >
              <text>{{ getActionText() }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="groupedTechnicians.length === 0">
        <text>暂无技师</text>
      </view>
    </scroll-view>

    <!-- 邀请加入按钮 (仅新增技师Tab显示) -->
    <view class="bottom-btn-wrapper" v-if="currentTab === 0">
      <view class="invite-btn" @tap="goToInvite">
        <text>邀请加入</text>
      </view>
    </view>

    <!-- 更多操作弹窗 -->
    <view class="popup-mask" v-if="showPopup" @tap="closePopup"></view>
    <view class="popup-container" :class="{ show: showPopup }">
      <view class="popup-content">
        <view class="popup-title">更多选择</view>
        <view class="popup-actions">
          <view class="popup-btn" @tap="handleEdit" v-if="currentTab !== 0">
            <text>编辑</text>
          </view>
          <view class="popup-btn" @tap="handleResign" v-if="currentTab === 1">
            <text>离职</text>
          </view>
          <view class="popup-btn" @tap="handleDelete">
            <text>删除</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 确认弹窗 -->
    <view class="confirm-mask" v-if="showConfirmModal" @tap="cancelConfirm"></view>
    <view class="confirm-modal" :class="{ show: showConfirmModal }">
      <view class="confirm-title">{{ confirmTitle }}</view>
      <view class="confirm-content">
        <text>{{ confirmPrefix }}</text>
        <text class="highlight-name">{{ confirmName }}</text>
        <text>{{ confirmSuffix }}</text>
      </view>
      <view class="confirm-buttons">
        <view class="confirm-btn cancel" @tap="cancelConfirm">
          <text>取消</text>
        </view>
        <view class="confirm-btn" :class="confirmBtnClass" @tap="doConfirm">
          <text>{{ confirmBtnText }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getTechnicianList } from '@/api'

// 当前标签页: 0-新增技师, 1-在职技师, 2-离职技师
const currentTab = ref(1)
// 当前技师类型
const currentType = ref('hairdresser')
// 弹窗状态
const showPopup = ref(false)
const currentTechId = ref(null)
// 确认弹窗
const showConfirmModal = ref(false)
const confirmTitle = ref('')
const confirmPrefix = ref('')
const confirmName = ref('')
const confirmSuffix = ref('')
const confirmBtnText = ref('确定')
const confirmBtnClass = ref('confirm')
const confirmCallback = ref(null)

// 技师数据
const technicians = ref({
  // 新增技师(待审批)
  0: [
    {
      id: 101,
      name: '赵静静',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 4.7,
      bookings: 88,
      experience: '10年',
      level: '高级',
      restDay: '周一休息',
      skills: ['短发裁剪', '染发烫发'],
      position: '店长',
      submitDate: '2025-11-27',
      type: 'hairdresser'
    },
    {
      id: 102,
      name: '李华华',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 4.7,
      bookings: 88,
      experience: '8年',
      level: '中级',
      restDay: '周一休息',
      skills: ['头发护理', '基础造型'],
      position: '总监',
      submitDate: '2025-11-27',
      type: 'hairdresser'
    },
    {
      id: 103,
      name: '刘美丽',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 4.7,
      bookings: 88,
      experience: '8年',
      level: '中级',
      restDay: '周一休息',
      skills: ['头发护理', '基础造型'],
      position: '设计师',
      submitDate: '2025-11-27',
      type: 'hairdresser'
    }
  ],
  // 在职技师
  1: [
    {
      id: 1,
      name: '赵静静',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 4.7,
      bookings: 88,
      experience: '10年',
      level: '高级',
      restDay: '周一休息',
      skills: ['短发裁剪', '染发烫发'],
      position: '店长',
      entryDate: '2025-07-27',
      workDuration: '4个月',
      type: 'hairdresser'
    },
    {
      id: 2,
      name: '李华华',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 4.7,
      bookings: 88,
      experience: '8年',
      level: '中级',
      restDay: '周一休息',
      skills: ['头发护理', '基础造型'],
      position: '总监',
      entryDate: '2024-07-27',
      workDuration: '1年4个月',
      type: 'hairdresser'
    },
    {
      id: 3,
      name: '刘美丽',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 4.7,
      bookings: 88,
      experience: '8年',
      level: '中级',
      restDay: '周一休息',
      skills: ['头发护理', '基础造型'],
      position: '设计师',
      entryDate: '2025-07-27',
      workDuration: '4个月',
      type: 'hairdresser'
    }
  ],
  // 离职技师
  2: [
    {
      id: 201,
      name: '赵静静',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 4.7,
      bookings: 88,
      experience: '10年',
      level: '高级',
      restDay: '周一休息',
      skills: ['短发裁剪', '染发烫发'],
      position: '店长',
      entryDate: '2025-07-27',
      workDuration: '4个月',
      type: 'hairdresser'
    },
    {
      id: 202,
      name: '李华华',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 4.7,
      bookings: 88,
      experience: '8年',
      level: '中级',
      restDay: '周一休息',
      skills: ['头发护理', '基础造型'],
      position: '总监',
      entryDate: '2024-07-27',
      workDuration: '1年4个月',
      type: 'hairdresser'
    }
  ]
})

// 按职位分组的技师列表
const groupedTechnicians = computed(() => {
  const list = technicians.value[currentTab.value] || []
  // 筛选当前类型
  const filtered = list.filter(t => t.type === currentType.value)

  // 按职位分组
  const groups = {}
  filtered.forEach(tech => {
    if (!groups[tech.position]) {
      groups[tech.position] = {
        position: tech.position,
        dateInfo: currentTab.value === 0
          ? `提交 ${tech.submitDate}`
          : `${tech.entryDate}入职  ${tech.workDuration}`,
        technicians: []
      }
    }
    groups[tech.position].technicians.push(tech)
  })

  // 排序: 店长 > 总监 > 设计师
  const order = ['店长', '总监', '设计师']
  return Object.values(groups).sort((a, b) => {
    return order.indexOf(a.position) - order.indexOf(b.position)
  })
})

// 获取操作按钮文字
const getActionText = () => {
  switch (currentTab.value) {
    case 0: return '确认入职'
    case 1: return '技师档案'
    case 2: return '技师档案'
    default: return '技师档案'
  }
}

// 切换标签页
const switchTab = (index) => {
  currentTab.value = index
}

// 切换技师类型
const switchType = (type) => {
  currentType.value = type
}

// 添加新类型
const addNewType = () => {
  uni.showToast({ title: '功能开发中', icon: 'none' })
}

// 显示分组更多操作
const showGroupMore = (group) => {
  // 默认选择该分组中的第一个技师
  if (group.technicians && group.technicians.length > 0) {
    selectedTech.value = group.technicians[0]
  }
  showPopup.value = true
}

// 关闭弹窗
const closePopup = () => {
  showPopup.value = false
  currentTechId.value = null
}

// 添加技师
const addTechnician = () => {
  uni.showToast({ title: '添加技师', icon: 'none' })
}

// 处理操作按钮点击
const handleAction = (tech) => {
  if (currentTab.value === 0) {
    // 确认入职
    showCustomConfirm({
      title: '确认入职',
      prefix: '确定要让',
      name: tech.name,
      suffix: '入职吗?',
      btnText: '确认',
      btnClass: 'confirm',
      callback: () => {
        const list = technicians.value[0]
        const index = list.findIndex(t => t.id === tech.id)
        if (index !== -1) {
          const [t] = list.splice(index, 1)
          t.entryDate = new Date().toISOString().split('T')[0]
          t.workDuration = '0天'
          technicians.value[1].push(t)
          uni.showToast({ title: '入职成功', icon: 'success' })
        }
      }
    })
  } else if (currentTab.value === 1) {
    // 查看技师档案
    uni.navigateTo({
      url: `/pages/technician/profile?id=${tech.id}`
    })
  } else {
    // 查看离职技师档案
    uni.navigateTo({
      url: `/pages/technician/profile?id=${tech.id}`
    })
  }
}

// 编辑技师
const handleEdit = () => {
  closePopup()
  uni.showToast({ title: '功能开发中', icon: 'none' })
}

// 当前选中的技师(用于删除/离职操作)
const selectedTech = ref(null)

// 显示分组更多操作(记录选中的技师)
const showTechMore = (tech) => {
  selectedTech.value = tech
  showPopup.value = true
}

// 技师离职
const handleResign = () => {
  closePopup()
  if (!selectedTech.value) return
  showCustomConfirm({
    title: '技师离职',
    prefix: '确定要让技师',
    name: selectedTech.value.name,
    suffix: '离职吗?',
    btnText: '确认',
    btnClass: 'confirm',
    callback: () => {
      uni.showToast({ title: '已离职', icon: 'success' })
    }
  })
}

// 删除技师
const handleDelete = () => {
  closePopup()
  if (!selectedTech.value) return
  showCustomConfirm({
    title: '删除技师',
    prefix: '确定要删除技师',
    name: selectedTech.value.name,
    suffix: '吗?',
    btnText: '删除',
    btnClass: 'delete',
    callback: () => {
      uni.showToast({ title: '已删除', icon: 'success' })
    }
  })
}

// 显示确认弹窗
const showCustomConfirm = (options) => {
  confirmTitle.value = options.title
  confirmPrefix.value = options.prefix || ''
  confirmName.value = options.name || ''
  confirmSuffix.value = options.suffix || ''
  confirmBtnText.value = options.btnText || '确定'
  confirmBtnClass.value = options.btnClass || 'confirm'
  confirmCallback.value = options.callback
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

// 页面加载
onLoad(() => {
  // 监听技师信息更新事件
  uni.$on('technicianUpdated', handleTechnicianUpdated)
  // 加载技师数据
  loadTechnicianData()
})

// 页面卸载时移除事件监听
onUnload(() => {
  uni.$off('technicianUpdated', handleTechnicianUpdated)
})

// 加载技师数据
const loadTechnicianData = async () => {
  const statusMap = ['pending', 'active', 'resigned']
  const status = statusMap[currentTab.value]

  try {
    const res = await getTechnicianList({ status, type: currentType.value })
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      technicians.value[currentTab.value] = list.map(item => ({
        id: item.id,
        name: item.name,
        avatar: item.avatar || '',
        rating: item.rating || 0,
        bookings: item.bookings || 0,
        experience: item.experience || '',
        level: item.level || '',
        restDay: item.restDay || '',
        skills: item.skills || [],
        position: item.position || '',
        type: item.type || 'hairdresser'
      }))
    }
  } catch (error) {
    console.error('加载技师数据失败:', error)
  }
}

// 处理技师信息更新
const handleTechnicianUpdated = (payload) => {
  const { id, data } = payload
  // 遍历所有标签页的技师列表
  for (const tabKey in technicians.value) {
    const list = technicians.value[tabKey]
    const techIndex = list.findIndex(t => t.id == id)
    if (techIndex !== -1) {
      // 更新技师信息
      const tech = list[techIndex]
      if (data.name) tech.name = data.name
      if (data.experience) tech.experience = data.experience
      if (data.level) tech.level = data.level
      if (data.entryDate) tech.entryDate = data.entryDate
      break
    }
  }
}

// 下拉刷新
onPullDownRefresh(() => {
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 1000)
})

// 跳转邀请页面
const goToInvite = () => {
  uni.navigateTo({
    url: '/pages/technician/invite'
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

// 技师类型筛选
.filter-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f0f0f0;
  box-sizing: border-box;
}

.type-filter {
  display: flex;
  gap: 16rpx;
}

.add-tech-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    opacity: 0.7;
  }
}

.add-icon {
  width: 48rpx;
  height: 48rpx;
}

.type-item {
  padding: 4rpx 24rpx;
  border-radius: 99rpx;
  background-color: #F5F7FA;

  text {
    font-size: 26rpx;
    color: #666;
  }

  &.active {
    background-color: #5280FF;
    border-color: #5280FF;

    text {
      color: #fff;
    }
  }

  &.add-type {
    background-color: #F5F7FA;
    border: 2rpx dashed #ccc;

    text {
      font-size: 32rpx;
      color: #999;
    }
  }
}

// 技师列表
.technician-list {
  flex: 1;
  padding: 24rpx;
  padding-bottom: calc(24rpx + 140rpx);
  box-sizing: border-box;
}

// 职位分组
.position-group {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  overflow: hidden;
}

.position-header {
  display: flex;
  align-items: center;
  padding: 24rpx 24rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  padding-bottom: 20rpx;
}

.position-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 12rpx;
}

.position-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}

.position-date {
  font-size: 24rpx;
  color: #999;
  margin-left: 16rpx;
}

.position-more {
  margin-left: auto;
  padding: 8rpx 16rpx;

  text {
    font-size: 32rpx;
    color: #999;
    letter-spacing: 2rpx;
  }
}

// 技师卡片
.technician-card {
  padding: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &.resigned {
    opacity: 0.6;
  }
}

.tech-main {
  display: flex;
  align-items: flex-start;
}

.tech-avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.tech-info {
  flex: 1;
  margin-left: 20rpx;
}

.tech-name-row {
  display: flex;
  align-items: center;
}

.tech-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}

.tech-badge {
  width: 32rpx;
  height: 32rpx;
  margin-left: 8rpx;
}

.tech-rating {
  display: flex;
  align-items: center;
  margin-top: 8rpx;
}

.rating-score {
  font-size: 26rpx;
  color: #FF9500;
  font-weight: 500;
}

.rating-star {
  width: 24rpx;
  height: 24rpx;
  margin-left: 4rpx;
}

.rating-count {
  font-size: 24rpx;
  color: #999;
  margin-left: 8rpx;
}

.tech-details {
  display: flex;
  gap: 24rpx;
  margin-top: 16rpx;

  text {
    font-size: 24rpx;
    color: #666;
  }
}

.tech-skills {
  display: flex;
  align-items: center;
  margin-top: 16rpx;
}

.skill-label {
  font-size: 24rpx;
  color: #666;
  margin-right: 8rpx;
}

.skill-tags {
  display: flex;
  gap: 12rpx;
}

.skill-tag {
  font-size: 22rpx;
  color: #5280FF;
  background-color: #DBE8FF;
  padding: 5rpx 14rpx;
  border-radius: 99rpx;
}

// 已离职印章
.resigned-stamp {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  width: 100rpx;
  height: 100rpx;
}

// 操作按钮
.tech-action {
  position: absolute;
  right: 24rpx;
  bottom: 30rpx;
}

.action-btn {
  padding: 12rpx 28rpx;
  border-radius: 12rpx;
  background-color: #5B7FE1;

  text {
    font-size: 26rpx;
    color: #fff;
  }

  &.confirm {
    background-color: #5B7FE1;
  }

  &.profile {
    background-color: #5B7FE1;
  }

  &.rehire {
    background-color: #ccc;
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

  .highlight-name {
    color: #333;
    font-weight: 600;
    margin: 0 8rpx;
  }
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

  &.delete {
    background-color: #FF4D4F;

    text {
      font-size: 32rpx;
      color: #fff;
    }
  }

  &:active {
    opacity: 0.8;
  }
}

// 底部按钮
.bottom-btn-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.invite-btn {
  height: 96rpx;
  background-color: #5280FF;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
  }

  &:active {
    opacity: 0.8;
  }
}
</style>
