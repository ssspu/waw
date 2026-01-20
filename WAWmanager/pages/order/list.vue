<template>
  <view class="container">
    <!-- 标签页切换 -->
    <view class="tab-container">
      <view
        class="tab-item"
        :class="{ active: currentTab === 0 }"
        @tap="switchTab(0)"
      >
        <text>预约订单</text>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 1 }"
        @tap="switchTab(1)"
      >
        <text>确认订单</text>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 2 }"
        @tap="switchTab(2)"
      >
        <text>完成订单</text>
      </view>
    </view>

    <!-- 日期选择器 -->
    <view class="date-selector">

        <view
          v-for="(item, index) in dateList"
          :key="index"
          class="date-item"
          :class="{ selected: selectedDate === index }"
          @tap="selectDate(index)"
        >
          <view class="date-day">{{ item.day }}</view>
          <view class="date-date">{{ item.date }}</view>
        </view>

    </view>

    <!-- 订单列表 -->
    <view class="order-list">
      <view v-for="item in orderList" :key="item.id" class="order-item">
        <!-- 订单时间和服务信息 -->
        <view class="order-header">
          <view class="order-time-dot"></view>
          <view class="order-time">{{ item.time }}</view>
          <view class="order-service">{{ item.service }}</view>

          <!-- 预约订单显示修改时间按钮和电话图标 -->
          <template v-if="currentTab === 0">
            <view class="modify-time" @tap="modifyTime(item.id)">
              <img src="/pages/order/static/edit@3x.png" alt="" class="edit">
              <p>修改时间</p>
            </view>
            <view class="header-spacer"></view>
            <image
              class="phone-icon"
              src="/pages/order/static/phone.png"
              @tap="makeCall(item.phone)"
            ></image>
          </template>

          <!-- 确认订单显示更多操作图标 -->
          <template v-else-if="currentTab === 1">
            <view class="header-spacer"></view>
            <view class="more-options" @tap.stop="showMoreOptions(item.id)">
              <view class="more-icon">
                <view class="dot"></view>
                <view class="dot"></view>
                <view class="dot"></view>
              </view>
            </view>
          </template>

          <!-- 完成订单显示状态标签和更多操作图标 -->
          <template v-else>
            <view class="order-status-tag complete">已完成</view>
            <view class="header-spacer"></view>
            <view class="more-options" @tap.stop="showMoreOptions(item.id)">
              <view class="more-icon">
                <view class="dot"></view>
                <view class="dot"></view>
                <view class="dot"></view>
              </view>
            </view>
          </template>
        </view>

        <!-- 服务详情 -->
        <view class="service-details">
          <view class="service-item">
            <view class="service-dot"></view>
            <text class="service-text">服务：{{ item.serviceDetail }}</text>
          </view>
          <view class="service-item">
            <view class="service-dot black"></view>
            <text class="service-text">用时：{{ item.duration }}</text>
          </view>
          <view class="service-price">¥{{ item.price }}</view>
        </view>

        <!-- 技师信息 -->
        <view class="technician-info">
          <image class="technician-avatar" :src="item.technician.avatar"></image>
          <view class="technician-details">
            <view class="technician-name">
              {{ item.technician.name }}
              <image v-if="item.technician.isVip" class="vip-badge" src="/static/icons/svip-badge@3x.png" mode="aspectFit"></image>
            </view>
            <view class="technician-stats">
              <text class="rating-score">{{ item.technician.rating }}</text>
              <image class="star-icon" src="/static/icons/start.png" mode="aspectFit"></image>
              <text class="booking-count">({{ item.technician.bookings }}次预约)</text>
            </view>
          </view>
          <view class="order-actions">
            <!-- 预约订单显示取消和接单按钮 -->
            <template v-if="currentTab === 0">
              <view class="cancel-btn" @tap="cancelOrder(item.id)">取消</view>
              <view class="accept-btn" @tap="acceptOrder(item.id)">接单</view>
            </template>
            <!-- 确认订单显示开始服务按钮 -->
            <template v-else-if="currentTab === 1">
              <view class="start-service-btn" @tap="startService(item.id)">开始服务</view>
            </template>
            <!-- 完成订单显示点评按钮 -->
            <template v-else>
              <view class="completed-order-actions">
                <template v-if="item.reviewed">
                  <view class="reviewed-tag">已点评</view>
                </template>
                <template v-else>
                  <view class="review-btn" @tap="reviewOrder(item.id)">点评</view>
                </template>
              </view>
            </template>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="orderList.length === 0" class="empty-state">
        <image class="empty-icon" src="/static/images/empty-order.png"></image>
        <text class="empty-text">暂无订单</text>
      </view>
    </view>

    <!-- 修改时间弹窗 -->
    <view class="time-modal" v-if="showTimeModal">
      <view class="modal-mask" @tap="closeTimeModal"></view>
      <view class="modal-content">
        <view class="modal-header">
          <text class="modal-title">修改时间</text>
        </view>

        <view class="modal-date-selector">
          <view
            v-for="(item, index) in dateList"
            :key="index"
            class="modal-date-item"
            :class="{ selected: modalSelectedDate === index }"
            @tap="selectModalDate(index)"
          >
            <view class="modal-date-day">{{ item.day }}</view>
            <view class="modal-date-date">{{ item.date }}</view>
          </view>
        </view>

        <view class="time-slots">
          <view
            v-for="slot in timeSlots"
            :key="slot.time"
            class="time-slot"
            :class="[slot.status, { selected: selectedTimeSlot === slot.time }]"
            @tap="selectTimeSlot(slot)"
          >
            <view class="slot-time">{{ slot.time }}</view>
            <view class="slot-status">{{ slot.statusText }}</view>
          </view>
        </view>

        <view class="modal-footer">
          <view class="change-notice">
            <text class="notice-label">更改后预约时间为：</text>
            <text class="notice-time">{{ selectedTimeSlot || '--:--' }}</text>
          </view>
          <view class="confirm-btn" @tap="confirmTimeChange">
            <text>保存修改</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 取消订单弹窗 -->
    <view class="cancel-modal" v-if="showCancelModal">
      <view class="modal-mask" @tap="closeCancelModal"></view>
      <view class="cancel-modal-content">
        <view class="cancel-modal-header">
          <text class="cancel-modal-title">取消订单</text>
        </view>
        <view class="cancel-modal-icon">
          <image src="/pages/order/static/warn.png" mode="aspectFit"></image>
        </view>
        <view class="cancel-modal-message">
          <text class="cancel-message-text">取消订单将会影响个人信誉排名</text>
          <text class="cancel-notice-text">注：每日拒绝超过2次，平台将限制其未来24小时内不能再接单</text>
        </view>
        <view class="cancel-modal-actions">
          <view class="cancel-action-btn secondary" @tap="confirmCancelOrder">确定取消</view>
          <view class="cancel-action-btn primary" @tap="closeCancelModal">暂不取消</view>
        </view>
      </view>
    </view>

    <!-- 更多选择弹窗 -->
    <view class="more-modal" v-if="showMoreModal">
      <view class="modal-mask" @tap="closeMoreModal"></view>
      <view class="more-modal-content">
        <view class="more-modal-header">
          <text class="more-modal-title">更多选择</text>
        </view>
        <view class="more-modal-options">
          <view class="more-option-item" @tap="handleMoreOption('modifyTime')">
            <text>修改时间</text>
          </view>
          <view class="more-option-item" @tap="handleMoreOption('call')">
            <text>电话联系</text>
          </view>
          <view class="more-option-item" @tap="handleMoreOption('cancel')">
            <text>取消订单</text>
          </view>
        </view>
        <view class="more-modal-indicator"></view>
      </view>
    </view>

    <!-- 点评弹窗 -->
    <view class="review-modal" v-if="showReviewModal">
      <view class="modal-mask" @tap="closeReviewModal"></view>
      <view class="review-modal-content">
        <view class="review-modal-header">
          <text class="review-modal-title">星级点评</text>
        </view>

        <view class="star-rating">
          <view
            v-for="(_, index) in 5"
            :key="index"
            class="star"
            :class="{ active: index < starRating }"
            @tap="selectStar(index)"
          >
            <image
              class="star-icon"
              src="/static/icons/start.png"
              mode="aspectFit"
            ></image>
          </view>
        </view>

        <view class="review-label-section">
          <text class="review-label">{{ ratingLabel }}</text>
        </view>

        <view class="review-tags">
          <view
            v-for="tag in reviewTags"
            :key="tag.id"
            class="review-tag"
            :class="{ selected: tag.selected }"
            @tap="toggleTag(tag.id)"
          >{{ tag.text }}</view>
        </view>

        <view class="review-submit-btn" @tap="submitReview">
          <text>匿名提交</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
import { getOrderList, confirmOrder, startOrder, completeOrder, cancelOrder as cancelOrderApi } from '@/api'

// 响应式数据
const currentTab = ref(0)
const selectedDate = ref(0)
const dateList = ref([])
const orderList = ref([])
const allOrdersData = ref({})

// 弹窗相关
const showTimeModal = ref(false)
const modalSelectedDate = ref(0)
const timeSlots = ref([])
const selectedTimeSlot = ref('')
const selectedTimeText = ref('请选择时间')
const currentOrderId = ref(null)

const showCancelModal = ref(false)
const cancelOrderId = ref(null)

const showMoreModal = ref(false)
const moreModalOrderId = ref(null)

const showReviewModal = ref(false)
const starRating = ref(0)
const reviewTags = ref([])
const currentReviewOrderId = ref(null)

// 根据星级显示不同的评价标签文字
const ratingLabel = computed(() => {
  if (starRating.value === 0) return '给TA评价'
  if (starRating.value <= 2) return '给TA评价'
  if (starRating.value === 3) return '一般'
  return '非常好'
})

// 页面加载
onLoad((options) => {
  initDateList()

  // 处理URL参数
  if (options.tab) {
    const tabMap = { bookings: 0, confirmed: 1, completed: 2 }
    currentTab.value = tabMap[options.tab] || 0
  }

  loadOrderData()
})

// 下拉刷新
onPullDownRefresh(() => {
  loadOrderData()
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 1000)
})

// 初始化日期列表
const initDateList = () => {
  const list = []
  const today = new Date()
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    let dayText = ''
    if (i === 0) dayText = '今天'
    else if (i === 1) dayText = '明天'
    else if (i === 2) dayText = '后天'
    else dayText = weekDays[date.getDay()]

    list.push({
      day: dayText,
      date: `${date.getMonth() + 1}-${date.getDate()}`
    })
  }

  dateList.value = list
}

// 初始化所有订单数据
const initAllOrdersData = () => {
  allOrdersData.value = {
    pending: {
      '今天': [
        {
          id: 1,
          time: '今天11:00',
          service: '洗剪吹·1人',
          serviceDetail: '洗护+修剪+造型',
          duration: '预计1小时',
          price: 260,
          phone: '13800138000',
          technician: {
            name: '张艺兴',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            isVip: true,
            isVerified: false,
            bookings: 23,
            rating: 4.5
          }
        },
        {
          id: 2,
          time: '今天12:00',
          service: '洗吹·1人',
          serviceDetail: '洗发+按摩+造型',
          duration: '预计1小时',
          price: 260,
          phone: '13800138001',
          technician: {
            name: '张艺兴',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            isVip: false,
            isVerified: true,
            bookings: 23,
            rating: 4.5
          }
        }
      ],
      '明天': [
        {
          id: 4,
          time: '明天10:00',
          service: '烫发·1人',
          serviceDetail: '设计+烫发+护理',
          duration: '预计2小时',
          price: 380,
          phone: '13800138003',
          technician: {
            name: '李小明',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            isVip: true,
            isVerified: true,
            bookings: 45,
            rating: 4.8
          }
        }
      ]
    },
    confirmed: {
      '今天': [
        {
          id: 101,
          time: '今天11:00',
          service: '洗剪吹·1人',
          serviceDetail: '洗护+修剪+造型',
          duration: '预计1小时',
          price: 260,
          phone: '13800138000',
          technician: {
            name: '张艺兴',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            isVip: true,
            isVerified: false,
            bookings: 23,
            rating: 4.9
          }
        }
      ]
    },
    completed: {
      '今天': [
        {
          id: 201,
          time: '今天11:00',
          service: '洗剪吹·1人',
          serviceDetail: '洗护+修剪+造型',
          duration: '预计1小时',
          price: 68,
          phone: '13800138000',
          status: 'complete',
          reviewed: false,
          technician: {
            name: '刘美丽',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            isVip: true,
            isVerified: false,
            bookings: 40,
            rating: 4.8
          }
        },
        {
          id: 202,
          time: '今天12:00',
          service: '洗吹·1人',
          serviceDetail: '洗护+修剪+造型',
          duration: '预计1小时',
          price: 38,
          phone: '13800138001',
          status: 'complete',
          reviewed: true,
          technician: {
            name: '娜娜',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
            isVip: true,
            isVerified: false,
            bookings: 23,
            rating: 4.5
          }
        },
        {
          id: 203,
          time: '今天13:00',
          service: '染发·1人',
          serviceDetail: '洗护+修剪+造型',
          duration: '预计3小时',
          price: 280,
          phone: '13800138002',
          status: 'complete',
          reviewed: false,
          technician: {
            name: '李思思',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
            isVip: true,
            isVerified: false,
            bookings: 16,
            rating: 4.4
          }
        }
      ]
    }
  }
}

// 加载订单数据
const loadOrderData = async () => {
  const statusMap = ['pending', 'confirmed', 'completed']
  const status = statusMap[currentTab.value]
  const dateItem = dateList.value[selectedDate.value]

  try {
    const res = await getOrderList({ status, date: dateItem?.fullDate })
    if (res.code === 200 || res.code === 0) {
      orderList.value = (res.data?.list || []).map(item => ({
        id: item.id,
        time: item.appointmentTime || item.time,
        service: item.serviceName || item.service,
        serviceDetail: item.serviceDetail || '',
        duration: item.duration || '预计1小时',
        price: item.price || 0,
        phone: item.customerPhone || item.phone,
        reviewed: item.reviewed || false,
        technician: {
          name: item.technicianName || item.technician?.name || '未分配',
          avatar: item.technicianAvatar || item.technician?.avatar || '',
          isVip: item.technician?.isVip || false,
          bookings: item.technician?.bookings || 0,
          rating: item.technician?.rating || 0
        }
      }))
    }
  } catch (error) {
    console.error('加载订单失败:', error)
    // 加载失败时使用本地mock数据
    if (Object.keys(allOrdersData.value).length === 0) {
      initAllOrdersData()
    }
    const dateText = dateList.value[selectedDate.value]?.day || '今天'
    const tabStatus = ['pending', 'confirmed', 'completed']
    const currentStatus = tabStatus[currentTab.value]
    orderList.value = (allOrdersData.value[currentStatus] && allOrdersData.value[currentStatus][dateText]) || []
  }
}

// 切换标签页
const switchTab = (index) => {
  currentTab.value = index
  loadOrderData()
}

// 选择日期
const selectDate = (index) => {
  selectedDate.value = index
  loadOrderData()
}

// 修改时间
const modifyTime = (orderId) => {
  currentOrderId.value = orderId
  showTimeModal.value = true
  modalSelectedDate.value = 0
  initTimeSlots()
}

// 初始化时间段
const initTimeSlots = () => {
  timeSlots.value = [
    { time: '09:00', status: 'booked', statusText: '已预约' },
    { time: '09:30', status: 'booked', statusText: '已预约' },
    { time: '10:00', status: 'available', statusText: '可预约' },
    { time: '10:30', status: 'available', statusText: '可预约' },
    { time: '11:00', status: 'booked', statusText: '已预约' },
    { time: '11:30', status: 'booked', statusText: '已预约' },
    { time: '12:00', status: 'original', statusText: '原预约' },
    { time: '12:30', status: 'available', statusText: '可预约' },
    { time: '13:00', status: 'available', statusText: '可预约' },
    { time: '13:30', status: 'booked', statusText: '已预约' },
    { time: '14:00', status: 'booked', statusText: '已预约' },
    { time: '14:30', status: 'booked', statusText: '已预约' },
    { time: '15:00', status: 'selected', statusText: '现预约' },
    { time: '15:30', status: 'booked', statusText: '已预约' },
    { time: '16:00', status: 'booked', statusText: '已预约' },
    { time: '16:30', status: 'booked', statusText: '已预约' },
    { time: '17:00', status: 'booked', statusText: '已预约' },
    { time: '17:30', status: 'booked', statusText: '已预约' },
    { time: '18:00', status: 'booked', statusText: '已预约' },
    { time: '18:30', status: 'booked', statusText: '已预约' },
    { time: '19:00', status: 'booked', statusText: '已预约' },
    { time: '19:30', status: 'booked', statusText: '已预约' },
    { time: '20:00', status: 'available', statusText: '可预约' },
    { time: '20:30', status: 'available', statusText: '可预约' },
    { time: '21:00', status: 'booked', statusText: '已预约' },
    { time: '21:30', status: 'booked', statusText: '已预约' },
    { time: '22:00', status: 'booked', statusText: '已预约' },
    { time: '22:30', status: 'booked', statusText: '已预约' }
  ]
  selectedTimeSlot.value = '15:00'
}

// 关闭时间弹窗
const closeTimeModal = () => {
  showTimeModal.value = false
}

// 选择弹窗中的日期
const selectModalDate = (index) => {
  modalSelectedDate.value = index
  updateSelectedTimeText()
}

// 选择时间段
const selectTimeSlot = (slot) => {
  if (slot.status === 'available' || slot.status === 'original') {
    // 重置所有 selected 状态为对应的原始状态
    timeSlots.value.forEach(s => {
      if (s.status === 'selected') {
        s.status = 'available'
        s.statusText = '可预约'
      }
    })
    // 设置新选中的时间段
    slot.status = 'selected'
    slot.statusText = '现预约'
    selectedTimeSlot.value = slot.time
  }
}

// 更新选中时间文本
const updateSelectedTimeText = () => {
  const dateText = dateList.value[modalSelectedDate.value]?.day || '今天'
  selectedTimeText.value = `${dateText} ${selectedTimeSlot.value} 开始`
}

// 确认时间修改
const confirmTimeChange = () => {
  if (!selectedTimeSlot.value) {
    uni.showToast({ title: '请选择时间', icon: 'none' })
    return
  }

  const dateText = dateList.value[modalSelectedDate.value]?.day || '今天'
  uni.showToast({
    title: `已修改为${dateText} ${selectedTimeSlot.value}`,
    icon: 'success'
  })
  closeTimeModal()
}

// 拨打电话
const makeCall = (phone) => {
  uni.makePhoneCall({ phoneNumber: phone })
}

// 显示更多选项
const showMoreOptions = (orderId) => {
  if (currentTab.value === 1) {
    // 确认订单 - 显示自定义弹窗
    moreModalOrderId.value = orderId
    showMoreModal.value = true
  } else if (currentTab.value === 2) {
    // 完成订单 - 删除操作
    uni.showActionSheet({
      itemList: ['删除订单'],
      success: (res) => {
        if (res.tapIndex === 0) deleteOrder(orderId)
      }
    })
  }
}

// 关闭更多选项弹窗
const closeMoreModal = () => {
  showMoreModal.value = false
  moreModalOrderId.value = null
}

// 处理更多选项
const handleMoreOption = (action) => {
  const orderId = moreModalOrderId.value
  closeMoreModal()

  if (action === 'modifyTime') {
    modifyTime(orderId)
  } else if (action === 'call') {
    const order = findOrderById(orderId)
    if (order) makeCall(order.phone)
  } else if (action === 'cancel') {
    cancelOrder(orderId)
  }
}

// 根据ID查找订单
const findOrderById = (orderId) => {
  return orderList.value.find(order => order.id === orderId)
}

// 取消订单
const cancelOrder = (orderId) => {
  cancelOrderId.value = orderId
  showCancelModal.value = true
}

// 关闭取消弹窗
const closeCancelModal = () => {
  showCancelModal.value = false
  cancelOrderId.value = null
}

// 确认取消订单
const confirmCancelOrder = () => {
  orderList.value = orderList.value.filter(order => order.id !== cancelOrderId.value)
  closeCancelModal()
  uni.showToast({ title: '订单已取消', icon: 'success' })
}

// 删除订单
const deleteOrder = (orderId) => {
  uni.showModal({
    title: '删除订单',
    content: '确定要删除此订单吗？',
    success: (res) => {
      if (res.confirm) {
        orderList.value = orderList.value.filter(order => order.id !== orderId)
        uni.showToast({ title: '删除成功', icon: 'success' })
      }
    }
  })
}

// 接单
const acceptOrder = (orderId) => {
  const dateText = dateList.value[selectedDate.value]?.day || '今天'
  const pendingOrders = allOrdersData.value.pending[dateText] || []
  const orderIndex = pendingOrders.findIndex(order => order.id === orderId)

  if (orderIndex !== -1) {
    const acceptedOrder = pendingOrders[orderIndex]
    allOrdersData.value.pending[dateText] = pendingOrders.filter(order => order.id !== orderId)

    if (!allOrdersData.value.confirmed[dateText]) {
      allOrdersData.value.confirmed[dateText] = []
    }
    allOrdersData.value.confirmed[dateText].push(acceptedOrder)

    loadOrderData()
  }

  uni.showToast({ title: '接单成功', icon: 'success' })
}

// 开始服务
const startService = (orderId) => {
  const dateText = dateList.value[selectedDate.value]?.day || '今天'
  const confirmedOrders = allOrdersData.value.confirmed[dateText] || []
  const orderIndex = confirmedOrders.findIndex(order => order.id === orderId)

  if (orderIndex !== -1) {
    const serviceOrder = confirmedOrders[orderIndex]
    allOrdersData.value.confirmed[dateText] = confirmedOrders.filter(order => order.id !== orderId)

    if (!allOrdersData.value.completed[dateText]) {
      allOrdersData.value.completed[dateText] = []
    }
    allOrdersData.value.completed[dateText].push(serviceOrder)

    loadOrderData()
  }

  uni.showToast({ title: '服务已开始', icon: 'success' })
}

// 点评订单
const reviewOrder = (orderId) => {
  currentReviewOrderId.value = orderId
  starRating.value = 0
  reviewTags.value = [
    { id: 1, text: '沟通顺畅', selected: false },
    { id: 2, text: '态度友好', selected: false },
    { id: 3, text: '支付及时', selected: false },
    { id: 4, text: '准时到店', selected: false }
  ]
  showReviewModal.value = true
}

// 关闭点评弹窗
const closeReviewModal = () => {
  showReviewModal.value = false
  starRating.value = 0
  currentReviewOrderId.value = null
}

// 选择星级
const selectStar = (index) => {
  const rating = index + 1
  starRating.value = rating

  if (rating <= 3) {
    reviewTags.value = [
      { id: 1, text: '沟通不顺畅', selected: false },
      { id: 2, text: '态度不友好', selected: false },
      { id: 3, text: '支付不及时', selected: false },
      { id: 4, text: '未准时到店', selected: false }
    ]
  } else {
    reviewTags.value = [
      { id: 1, text: '沟通顺畅', selected: false },
      { id: 2, text: '态度友好', selected: false },
      { id: 3, text: '支付及时', selected: false },
      { id: 4, text: '准时到店', selected: false }
    ]
  }
}

// 切换评价标签
const toggleTag = (tagId) => {
  const tag = reviewTags.value.find(t => t.id === tagId)
  if (tag) {
    tag.selected = !tag.selected
  }
}

// 提交点评
const submitReview = () => {
  if (starRating.value === 0) {
    uni.showToast({ title: '请选择星级评分', icon: 'none' })
    return
  }

  uni.showToast({ title: '点评提交成功', icon: 'success' })
  closeReviewModal()
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 标签页 */
.tab-container {
  width: 100%;
  display: flex;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 30rpx 0;
  font-size: 28rpx;
  color: #666;
  position: relative;

  &.active {
    color: #5280FF;
    font-weight: 500;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: 60rpx;
      height: 4rpx;
      background-color: #5280FF;
      border-radius: 2rpx;
    }
  }
}

/* 日期选择器 */
.date-selector {
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20rpx;
}


.date-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 5rpx;
  border-radius: 12rpx;
  padding: 10rpx 12rpx;
  background-color: #FFFFFF;

  &.selected {
    background-color: #DBE8FF;
    color: #5280FF;

    .date-day,
    .date-date {
      color: #5280FF;
    }
  }
}

.date-day {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}

.date-date {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

/* 订单列表 */
.order-list {
  padding: 0 12rpx 12rpx;
}

.order-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx 24rpx;
  margin-bottom: 20rpx;
  width: 726rpx;
  box-sizing: border-box;
}

.order-header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20rpx;
}

.order-time-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background-color: #5280FF;
  margin-right: 12rpx;
}

.order-time {
  font-size: 32rpx;
  font-weight: 600;
  color: #5280FF;
  margin-right: 20rpx;
}

.order-service {
  font-size: 26rpx;
  color: #666;
  margin-right: 12rpx;
}

.order-status-tag {
  padding: 6rpx 16rpx;
  border-radius: 8rpx;
  font-size: 22rpx;

  &.complete {
    background-color: #F8FAFC;
    color: #667085;
  }
}

.edit {
  width: 30rpx;
  height: 30rpx;
}

.modify-time {
  display: flex;
  flex-direction: row;
  gap: 8rpx;
  justify-content: space-around;
  padding: 8rpx;
  background-color: #F8FAFC;
  font-size: 24rpx;
  color: #667085;
  border-radius: 8rpx;
}

.header-spacer {
  flex: 1;
}

.phone-icon {
  width: 40rpx;
  height: 40rpx;
}

.more-options {
  padding: 10rpx;
}

.more-icon {
  display: flex;
  flex-direction: row;
  gap: 6rpx;
}

.dot {
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background-color: #999;
}

/* 服务详情 */
.service-details {
  display: flex;
  flex-direction: column;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
  position: relative;
}

.service-item {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.service-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background-color: #5280FF;
  margin-right: 10rpx;

  &.black {
    background-color: #333;
  }
}

.service-text {
  font-size: 24rpx;
  color: #666;
}

.service-price {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 32rpx;
  font-weight: 600;
  color: #ff4d4f;
}

/* 技师信息 */
.technician-info {
  gap: 18rpx;
  display: flex;
  align-items: center;
  padding-top: 20rpx;
}

.technician-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  margin-right: 20rpx;
}

.technician-details {
  flex: 1;
  margin-right: 30rpx;
}

.technician-name {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 8rpx;
}

.vip-badge {
  width: 68rpx;
  height: 28rpx;
  margin-left: 10rpx;
}

.verified-badge {
  font-size: 20rpx;
  padding: 2rpx 8rpx;
  border-radius: 4rpx;
  margin-left: 10rpx;
  background-color: #e6f7ff;
  color: #1890ff;
}

.technician-stats {
  display: flex;
  align-items: center;
  font-size: 22rpx;
  color: #999;
}

.rating-score {
  color: #FF9500;
  font-size: 24rpx;
  font-weight: 500;
}

.star-icon {
  width: 24rpx;
  height: 24rpx;
}

.booking-count {
  color: #999;
  font-size: 22rpx;
}

/* 订单操作按钮 */
.order-actions {
  display: flex;
  gap: 16rpx;
}

.cancel-btn,
.accept-btn,
.start-service-btn,
.review-btn {
  padding: 10rpx 44rpx;
  border-radius: 12rpx;
  font-size: 26rpx;
}

.cancel-btn {
  background-color: #fff;
  color: #666;
  border: 1rpx solid #ddd;
}

.accept-btn {
  background-color: #5280FF;
  color: #fff;
}

.start-service-btn {
  background-color: #5280FF;
  color: #fff;
}

.completed-order-actions {
  display: flex;
  gap: 16rpx;
  align-items: center;
}

.reviewed-tag {
  padding: 10rpx 32rpx;
  border-radius: 12rpx;
  font-size: 26rpx;
  background-color: #F5F5F5;
  color: #999;
}

.review-btn {
  background-color: #5280FF;
  color: #fff;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 0;
}

.empty-icon {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 30rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

/* 弹窗通用样式 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

/* 时间修改弹窗 */
.time-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

.modal-content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  padding: 40rpx 24rpx;
  padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
  z-index: 101;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  text-align: center;
  margin-bottom: 32rpx;
  flex-shrink: 0;
}

.modal-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
}

.modal-date-selector {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32rpx;
  flex-shrink: 0;
}

.modal-date-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rpx 6rpx;
  border-radius: 16rpx;
  flex-shrink: 0;
  min-width: 88rpx;

  &.selected {
    background-color: #DBE8FF;

    .modal-date-day,
    .modal-date-date {
      color: #5280FF;
    }
  }
}

.modal-date-day {
  font-size: 30rpx;
  font-weight: 500;
  color: #667085;
  margin-bottom: 6rpx;
}

.modal-date-date {
  font-size: 24rpx;
  color: #667085;
}

.time-slots {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
  margin-bottom: 40rpx;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.time-slot {
  padding: 20rpx 0;
  border-radius: 16rpx;
  text-align: center;
  background-color: #F8FAFC;
  border: 2rpx solid #E4E7EC;
  box-sizing: border-box;

  &.available {
    background-color: #fff;
    border: 2rpx solid #5280FF;

    .slot-time {
      color: #5280FF;
      font-weight: 600;
    }

    .slot-status {
      color: #5280FF;
    }
  }

  &.booked {
    background-color: #F8FAFC;
    border: 2rpx solid #E4E7EC;

    .slot-time,
    .slot-status {
      color: #98A2B3;
    }
  }

  &.original {
    background-color: #DBE8FF;
    border: 2rpx solid #DBE8FF;

    .slot-time {
      color: #5280FF;
      font-weight: 600;
    }

    .slot-status {
      color: #5280FF;
    }
  }

  &.selected {
    background-color: #5280FF;
    border: 2rpx solid #5280FF;

    .slot-time,
    .slot-status {
      color: #fff;
      font-weight: 600;
    }
  }
}

.slot-time {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 4rpx;
}

.slot-status {
  font-size: 22rpx;
  color: #999;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
  flex-shrink: 0;
  padding-top: 20rpx;
}

.change-notice {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 26rpx;
}

.notice-label {
  color: #999;
}

.notice-time {
  color: #5280FF;
  font-size: 32rpx;
  font-weight: 600;
  margin-left: 8rpx;
}

.confirm-btn {
  padding: 20rpx 48rpx;
  background-color: #5280FF;
  color: #fff;
  font-size: 28rpx;
  font-weight: 500;
  border-radius: 12rpx;
  white-space: nowrap;
}

/* 取消订单弹窗 */
.cancel-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

.cancel-modal-content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  padding: 40rpx 24rpx;
  padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
  z-index: 101;
}

.cancel-modal-header {
  text-align: center;
  margin-bottom: 40rpx;
}

.cancel-modal-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
}

.cancel-modal-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 40rpx;

  image {
    width: 160rpx;
    height: 160rpx;
  }
}

.cancel-modal-message {
  text-align: center;
  margin-bottom: 48rpx;
}

.cancel-message-text {
  display: block;
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 20rpx;
}

.cancel-notice-text {
  display: block;
  font-size: 26rpx;
  color: #667085;
}

.cancel-modal-actions {
  display: flex;
  gap: 24rpx;
  padding: 0 8rpx;
}

.cancel-action-btn {
  flex: 1;
  height: 96rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  font-weight: 500;

  &.secondary {
    background-color: #fff;
    color: #333;
    border: 2rpx solid #E4E7EC;
  }

  &.primary {
    background-color: #5280FF;
    color: #fff;
  }
}

/* 点评弹窗 */
.review-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

.review-modal-content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  padding: 40rpx 32rpx;
  padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
  z-index: 101;
}

.review-modal-header {
  text-align: center;
  margin-bottom: 48rpx;
}

.review-modal-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
}

.star-rating {
  display: flex;
  justify-content: center;
  gap: 24rpx;
  margin-bottom: 32rpx;
}

.star {
  .star-icon {
    width: 56rpx;
    height: 56rpx;
    filter: grayscale(100%);
    opacity: 0.3;
  }

  &.active {
    .star-icon {
      filter: none;
      opacity: 1;
    }
  }
}

.review-label-section {
  text-align: center;
  margin-bottom: 32rpx;
}

.review-label {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
}

.review-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
  margin-bottom: 48rpx;
}

.review-tag {
  width: calc(50% - 12rpx);
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 2rpx solid #E4E7EC;
  border-radius: 16rpx;
  font-size: 28rpx;
  color: #333;
  box-sizing: border-box;

  &.selected {
    background-color: #5280FF;
    border-color: #5280FF;
    color: #fff;
  }
}

.review-submit-btn {
  width: 100%;
  height: 88rpx;
  background-color: #5280FF;
  color: #fff;
  font-size: 30rpx;
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 更多选择弹窗 */
.more-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

.more-modal-content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 101;
}

.more-modal-header {
  text-align: center;
  padding: 32rpx 0 24rpx;
  border-bottom: 1rpx solid #F0F0F0;
}

.more-modal-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.more-modal-options {
  padding: 0;
}

.more-option-item {
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

  &:active {
    background-color: #F5F5F5;
  }
}

.more-modal-indicator {
  width: 134rpx;
  height: 10rpx;
  background-color: #E0E0E0;
  border-radius: 5rpx;
  margin: 16rpx auto 20rpx;
}
</style>