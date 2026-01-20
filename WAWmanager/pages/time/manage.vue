<template>
  <view class="container">
    <!-- Tab 标签栏 -->
    <view class="tab-bar">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-item"
        :class="{ active: activeTab === index }"
        @tap="switchTab(index)"
      >
        <text>{{ tab.name }}</text>
        <view class="tab-indicator" v-if="activeTab === index"></view>
      </view>
    </view>

    <!-- 今日预约 Tab 内容 -->
    <view class="tab-content" v-if="activeTab === 0">
      <!-- 月份选择器 -->
      <view class="month-selector">
        <view class="arrow-btn" @tap="prevMonth">
          <image src="/pages/time/static/arrow-square-left@2x.png" mode="aspectFit"></image>
        </view>
        <text class="month-text">{{ currentYear }}年{{ currentMonth }}月</text>
        <view class="arrow-btn" @tap="nextMonth">
          <image src="/pages/time/static/arrow-square-right@2x.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 星期选择器 -->
      <view class="week-selector">
        <view
          v-for="(day, index) in weekDays"
          :key="index"
          class="week-day"
          :class="{ active: selectedDay === index }"
          @tap="selectDay(index)"
        >
          <text class="day-label">{{ day.label }}</text>
          <text class="day-date">{{ day.date }}</text>
        </view>
      </view>

      <!-- 时间段网格 -->
      <view class="time-grid">
        <view
          v-for="(slot, index) in timeSlots"
          :key="index"
          class="time-slot"
          :class="getSlotClass(slot)"
          @tap="handleSlotTap(slot, index)"
        >
          <text class="slot-time">{{ slot.time }}</text>
          <text class="slot-status">{{ slot.statusText }}</text>
        </view>
      </view>

      <!-- 提示信息 -->
      <view class="tips">
        <image class="tip-icon" src="/pages/time/static/lamp-charge@2x.png" mode="aspectFit"></image>
        <text>做好预约时间安排，避免预约等位和影响顾客体验。</text>
      </view>
    </view>

    <!-- 时间管理 Tab 内容 -->
    <view class="tab-content" v-if="activeTab === 1">
      <!-- 月份选择器 -->
      <view class="month-selector">
        <view class="arrow-btn" @tap="prevMonthCalendar">
          <image src="/pages/time/static/arrow-square-left@2x.png" mode="aspectFit"></image>
        </view>
        <text class="month-text">{{ calendarYear }}年{{ calendarMonth }}月</text>
        <view class="arrow-btn" @tap="nextMonthCalendar">
          <image src="/pages/time/static/arrow-square-right@2x.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 星期标题 -->
      <view class="calendar-week-header">
        <view class="week-header-item" v-for="(day, index) in weekHeaders" :key="index">
          <text>{{ day }}</text>
        </view>
      </view>

      <!-- 日历网格 -->
      <view class="calendar-grid">
        <view
          v-for="(day, index) in calendarDays"
          :key="index"
          class="calendar-day"
          :class="{
            'other-month': day.isOtherMonth,
            'today': day.isToday,
            'selected': day.isSelected,
            'rest-day': day.isRestDay
          }"
          @tap="selectCalendarDay(day)"
        >
          <text class="day-number">{{ day.day }}</text>
          <text class="rest-tag" v-if="day.isRestDay && !day.isOtherMonth">休</text>
        </view>
      </view>

      <!-- 底部设置卡片 -->
      <view class="settings-card">
        <view class="settings-date">
          <view class="date-dot"></view>
          <text class="date-text">{{ selectedDateText }}</text>
        </view>

        <view class="settings-divider"></view>

        <view class="settings-item">
          <text class="settings-label">店铺接单开启</text>
          <switch
            :checked="storeOrderEnabled"
            color="#4CD964"
            @change="toggleStoreOrder"
          />
        </view>

        <view class="settings-item" @tap="showTimePicker">
          <text class="settings-label">营业时间设定</text>
          <view class="settings-value">
            <text>{{ businessTimeText }}</text>
            <text class="arrow">›</text>
          </view>
        </view>

        <view class="settings-item" @tap="showRestDayPicker">
          <text class="settings-label">休息日设定</text>
          <view class="settings-value">
            <text>{{ restDayText }}</text>
            <text class="arrow">›</text>
          </view>
        </view>

        <view class="save-btn" @tap="saveSettings">
          <text>保存</text>
        </view>
      </view>
    </view>

    <!-- 营业时间选择弹窗 -->
    <view class="picker-modal" v-if="showTimePickerModal">
      <view class="picker-mask" @tap="closeTimePicker"></view>
      <view class="picker-content">
        <view class="picker-header">
          <text class="picker-cancel" @tap="closeTimePicker">取消</text>
          <text class="picker-title">营业时间设定</text>
          <text class="picker-confirm" @tap="confirmTimePicker">确定</text>
        </view>
        <view class="time-picker-body">
          <!-- 开始时间 -->
          <view class="time-section">
            <text class="time-section-label">开始时间</text>
            <view class="time-picker-wrapper">
              <picker-view
                class="time-picker-view"
                :value="startTimeIndex"
                @change="onStartTimePickerChange"
                indicator-style="height: 80rpx;"
              >
                <picker-view-column>
                  <view class="picker-item" v-for="hour in hours" :key="hour">{{ hour }}</view>
                </picker-view-column>
                <picker-view-column>
                  <view class="picker-item">:</view>
                </picker-view-column>
                <picker-view-column>
                  <view class="picker-item" v-for="minute in minutes" :key="minute">{{ minute }}</view>
                </picker-view-column>
              </picker-view>
            </view>
          </view>
          <!-- 结束时间 -->
          <view class="time-section">
            <text class="time-section-label">结束时间</text>
            <view class="time-picker-wrapper">
              <picker-view
                class="time-picker-view"
                :value="endTimeIndex"
                @change="onEndTimePickerChange"
                indicator-style="height: 80rpx;"
              >
                <picker-view-column>
                  <view class="picker-item" v-for="hour in hours" :key="hour">{{ hour }}</view>
                </picker-view-column>
                <picker-view-column>
                  <view class="picker-item">:</view>
                </picker-view-column>
                <picker-view-column>
                  <view class="picker-item" v-for="minute in minutes" :key="minute">{{ minute }}</view>
                </picker-view-column>
              </picker-view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 休息日选择弹窗 -->
    <view class="picker-modal" v-if="showRestDayPickerModal">
      <view class="picker-mask" @tap="closeRestDayPicker"></view>
      <view class="picker-content">
        <view class="picker-header">
          <text class="picker-cancel" @tap="closeRestDayPicker">取消</text>
          <text class="picker-title">休息日设定</text>
          <text class="picker-confirm" @tap="confirmRestDayPicker">确定</text>
        </view>
        <view class="rest-day-picker-body">
          <view
            v-for="(day, index) in restDayOptions"
            :key="index"
            class="rest-day-option"
            :class="{ selected: tempRestDays.includes(index) }"
            @tap="toggleRestDay(index)"
          >
            <text>{{ day }}</text>
            <view class="check-icon" v-if="tempRestDays.includes(index)">✓</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 工作排班 Tab 内容 -->
    <view class="tab-content schedule-tab" v-if="activeTab === 2">
      <!-- 周选择器 -->
      <view class="schedule-week-selector">
        <view class="arrow-btn" @tap="prevWeekSchedule">
          <image src="/pages/time/static/arrow-square-left@2x.png" mode="aspectFit"></image>
        </view>
        <text class="week-range-text">{{ scheduleWeekRange }}</text>
        <view class="arrow-btn" @tap="nextWeekSchedule">
          <image src="/pages/time/static/arrow-square-right@2x.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 星期日期选择器 -->
      <view class="schedule-day-selector">
        <view
          v-for="(day, index) in scheduleWeekDays"
          :key="index"
          class="schedule-day-item"
          :class="{ active: selectedScheduleDay === index }"
          @tap="selectScheduleDay(index)"
        >
          <text class="schedule-day-date">{{ day.date }}</text>
          <text class="schedule-day-label">{{ day.label }}</text>
        </view>
      </view>

      <!-- 技师排班标题 -->
      <view class="schedule-header">
        <text class="schedule-title">技师排班</text>
        <view class="add-staff-btn" @tap="addStaff">
          <text class="add-icon">+</text>
          <text>添加</text>
        </view>
      </view>

      <!-- 技师排班列表 -->
      <scroll-view class="staff-list" scroll-y>
        <view
          v-for="(staff, index) in staffList"
          :key="index"
          class="staff-card"
        >
          <!-- 技师信息头部 -->
          <view class="staff-header">
            <image class="staff-avatar" :src="staff.avatar" mode="aspectFill"></image>
            <view class="staff-info">
              <text class="staff-name">{{ staff.name }}</text>
              <text class="staff-level">{{ staff.level }}</text>
            </view>
            <view class="staff-status" :class="staff.statusClass">
              <view class="status-dot"></view>
              <text>{{ staff.statusText }}</text>
            </view>
          </view>

          <!-- 时间段网格 -->
          <view class="staff-time-grid">
            <view
              v-for="(slot, slotIndex) in getDisplaySlots(staff)"
              :key="slotIndex"
              class="staff-time-slot"
              :class="{ available: slot.status === 'available' }"
              @tap="handleStaffSlotTap(staff, slot, slotIndex)"
            >
              <text class="staff-slot-time">{{ slot.time }}</text>
              <text class="staff-slot-status">{{ slot.statusText }}</text>
            </view>
          </view>

          <!-- 收起/展开按钮 -->
          <view class="collapse-btn" @tap="toggleStaffCollapse(index)">
            <text>{{ staff.collapsed ? '展开排班' : '收起排班' }}</text>
            <image
              class="collapse-icon"
              :class="{ expanded: !staff.collapsed }"
              src="/static/icons/xiala.png"
              mode="aspectFit"
            ></image>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 底部预约卡片 -->
    <view class="appointment-card" v-if="currentAppointment && activeTab === 0">
      <view class="card-header">
        <view class="card-time">
          <view class="time-dot"></view>
          <text class="time-label">今天</text>
          <text class="time-value">{{ currentAppointment.time }}</text>
        </view>
        <view class="service-info">
          <text class="service-name">{{ currentAppointment.serviceName }}</text>
          <view class="edit-time" @tap="editAppointmentTime">
            <image src="/pages/time/static/edit@3x.png" mode="aspectFit"></image>
            <text>修改时间</text>
          </view>
        </view>
        <view class="call-btn" @tap="callCustomer">
          <image src="/pages/time/static/容器 95@3x.png" mode="aspectFit"></image>
        </view>
      </view>

      <view class="card-detail">
        <view class="detail-rows">
          <view class="detail-row">
            <text class="detail-label">服务：</text>
            <text class="detail-value">{{ currentAppointment.serviceDetail }}</text>
          </view>
          <view class="detail-row">
            <text class="detail-label">用时：</text>
            <text class="detail-value">{{ currentAppointment.duration }}</text>
          </view>
        </view>
        <view class="price-tag">¥{{ currentAppointment.price }}</view>
      </view>

      <view class="card-divider"></view>

      <view class="card-footer">
        <view class="customer-info">
          <image class="customer-avatar" :src="currentAppointment.customer.avatar" mode="aspectFill"></image>
          <view class="customer-detail">
            <view class="customer-name-row">
              <text class="customer-name">{{ currentAppointment.customer.name }}</text>
              <view class="vip-tag" v-if="currentAppointment.customer.isVip">
                <image src="/static/icons/svip-badge@3x.png" mode="aspectFit"></image>
              </view>
            </view>
            <view class="customer-stats">
              <text class="rating">{{ currentAppointment.customer.rating }}</text>
              <image class="star-icon" src="/static/icons/start.png"></image>
              <text class="booking-count">({{ currentAppointment.customer.bookingCount }}次预约)</text>
            </view>
          </view>
        </view>
        <view class="action-btns">
          <view class="btn-cancel" @tap="cancelAppointment">取消</view>
          <view class="btn-accept" @tap="acceptAppointment">接单</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {
  getBusinessHours,
  updateBusinessHours,
  getTodayAppointments,
  getScheduleList,
  updateShopStatus
} from '@/api/modules/schedule'

// Tab 数据
const tabs = ref([
  { name: '今日预约' },
  { name: '时间管理' },
  { name: '工作排班' }
])
const activeTab = ref(0)

// 日期相关
const currentYear = ref(2025)
const currentMonth = ref(11)
const selectedDay = ref(0)

// 日历相��（时间管理Tab）
const calendarYear = ref(2025)
const calendarMonth = ref(11)
const selectedCalendarDate = ref(null)
const weekHeaders = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const restDays = ref([6, 13, 20, 27]) // 休息日（周六）
const storeOrderEnabled = ref(true)
const businessStartTime = ref('09:00')
const businessEndTime = ref('22:00')

// 弹窗控制
const showTimePickerModal = ref(false)
const showRestDayPickerModal = ref(false)
const tempRestDays = ref([])
const restDayOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const selectedRestDayIndexes = ref([5]) // 默认周六休息

// 时间选择器数据
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))
const startTimeIndex = ref([9, 0, 0]) // [小时索引, 冒号固定0, 分钟索引]
const endTimeIndex = ref([22, 0, 0])

// 计算日历天数
const calendarDays = computed(() => {
  const year = calendarYear.value
  const month = calendarMonth.value
  const days = []

  // 获取当月第一天是星期几（0是周日，需要转换为周一开始）
  const firstDay = new Date(year, month - 1, 1)
  let firstDayOfWeek = firstDay.getDay()
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1 // 转换为周一开始

  // 获取当月天数
  const daysInMonth = new Date(year, month, 0).getDate()

  // 获取上个月天数
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate()

  // 获取今天
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth() + 1
  const todayDate = today.getDate()

  // 填充上个月的日期
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isOtherMonth: true,
      isToday: false,
      isSelected: false,
      isRestDay: false,
      fullDate: null
    })
  }

  // 填充当月日期
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = year === todayYear && month === todayMonth && i === todayDate
    const isRestDay = restDays.value.includes(i)
    const isSelected = selectedCalendarDate.value &&
      selectedCalendarDate.value.year === year &&
      selectedCalendarDate.value.month === month &&
      selectedCalendarDate.value.day === i

    days.push({
      day: i,
      isOtherMonth: false,
      isToday,
      isSelected: isSelected || (isToday && !selectedCalendarDate.value),
      isRestDay,
      fullDate: { year, month, day: i }
    })
  }

  // 填充下个月的日期
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isOtherMonth: true,
      isToday: false,
      isSelected: false,
      isRestDay: false,
      fullDate: null
    })
  }

  return days
})

// 选中日期文本
const selectedDateText = computed(() => {
  if (selectedCalendarDate.value) {
    const { month, day } = selectedCalendarDate.value
    const today = new Date()
    const todayMonth = today.getMonth() + 1
    const todayDate = today.getDate()
    const isToday = month === todayMonth && day === todayDate
    return `${month}月${day}日${isToday ? ' 今天' : ''}`
  }
  const today = new Date()
  return `${today.getMonth() + 1}月${today.getDate()}日 今天`
})

// 营业时间文本
const businessTimeText = computed(() => {
  return `${businessStartTime.value} - ${businessEndTime.value}`
})

// 休息日文本
const restDayText = computed(() => {
  if (selectedRestDayIndexes.value.length === 0) {
    return '未设置休息日'
  }
  const dayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  return selectedRestDayIndexes.value
    .sort((a, b) => a - b)
    .map(i => dayNames[i])
    .join('、')
})

// 工作排班相关数据
const scheduleWeekOffset = ref(0)
const selectedScheduleDay = ref(0)

// 计算周范围显示文本
const scheduleWeekRange = computed(() => {
  const today = new Date()
  const startOfWeek = new Date(today)
  const dayOfWeek = today.getDay()
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  startOfWeek.setDate(today.getDate() + diff + scheduleWeekOffset.value * 7)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)

  const startMonth = startOfWeek.getMonth() + 1
  const startDay = startOfWeek.getDate()
  const endMonth = endOfWeek.getMonth() + 1
  const endDay = endOfWeek.getDate()

  return `${startMonth}月${startDay}日 - ${endMonth}月${endDay}日`
})

// 计算周日期选择器数据
const scheduleWeekDays = computed(() => {
  const today = new Date()
  const startOfWeek = new Date(today)
  const dayOfWeek = today.getDay()
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  startOfWeek.setDate(today.getDate() + diff + scheduleWeekOffset.value * 7)

  const weekLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const days = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    days.push({
      date: date.getDate(),
      label: weekLabels[i]
    })
  }

  return days
})

// 技师列表数据
const staffList = ref([
  {
    id: 1,
    name: '魏莹玲',
    level: '资深技师',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    statusText: '在班',
    statusClass: 'status-online',
    collapsed: false,
    timeSlots: [
      { time: '09:00', status: 'booked', statusText: '已预约' },
      { time: '09:30', status: 'booked', statusText: '已预约' },
      { time: '10:00', status: 'available', statusText: '空闲' },
      { time: '10:30', status: 'available', statusText: '空闲' },
      { time: '11:00', status: 'booked', statusText: '已预约' },
      { time: '11:30', status: 'booked', statusText: '已预约' },
      { time: '14:00', status: 'available', statusText: '空闲' },
      { time: '14:30', status: 'available', statusText: '空闲' },
      { time: '15:00', status: 'booked', statusText: '已预约' },
      { time: '15:30', status: 'booked', statusText: '已预约' },
      { time: '16:00', status: 'booked', statusText: '已预约' }
    ]
  },
  {
    id: 2,
    name: '马菲菲',
    level: '高级技师',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    statusText: '忙碌',
    statusClass: 'status-busy',
    collapsed: false,
    timeSlots: [
      { time: '09:00', status: 'booked', statusText: '已预约' },
      { time: '09:30', status: 'booked', statusText: '已预约' },
      { time: '10:00', status: 'available', statusText: '空闲' },
      { time: '10:30', status: 'booked', statusText: '已预约' },
      { time: '11:00', status: 'booked', statusText: '已预约' },
      { time: '11:30', status: 'available', statusText: '空闲' },
      { time: '14:00', status: 'available', statusText: '空闲' },
      { time: '14:30', status: 'booked', statusText: '已预约' },
      { time: '15:00', status: 'booked', statusText: '已预约' },
      { time: '15:30', status: 'available', statusText: '空闲' },
      { time: '16:00', status: 'booked', statusText: '已预约' }
    ]
  },
  {
    id: 3,
    name: '韩善宇',
    level: '中级技师',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    statusText: '休息',
    statusClass: 'status-rest',
    collapsed: false,
    timeSlots: [
      { time: '09:00', status: 'booked', statusText: '已预约' },
      { time: '09:30', status: 'available', statusText: '空闲' },
      { time: '10:00', status: 'available', statusText: '空闲' },
      { time: '10:30', status: 'booked', statusText: '已预约' },
      { time: '11:00', status: 'booked', statusText: '已预约' },
      { time: '11:30', status: 'booked', statusText: '已预约' },
      { time: '14:00', status: 'available', statusText: '空闲' },
      { time: '14:30', status: 'available', statusText: '空闲' },
      { time: '15:00', status: 'booked', statusText: '已预约' },
      { time: '15:30', status: 'booked', statusText: '已预约' },
      { time: '16:00', status: 'booked', statusText: '已预约' }
    ]
  }
])

// 上一周
const prevWeekSchedule = () => {
  scheduleWeekOffset.value--
}

// 下一周
const nextWeekSchedule = () => {
  scheduleWeekOffset.value++
}

// 选择排班日期
const selectScheduleDay = (index) => {
  selectedScheduleDay.value = index
}

// 添加技师
const addStaff = () => {
  // 添加技师功能
}

// 处理技师时间段点击
const handleStaffSlotTap = (staff, slot, slotIndex) => {
  // 处理时间段点击
}

// 切换技师排班展开/收起
const toggleStaffCollapse = (index) => {
  staffList.value[index].collapsed = !staffList.value[index].collapsed
}

// 获取显示的时间段（收起时显示一半）
const getDisplaySlots = (staff) => {
  if (staff.collapsed) {
    const halfLength = Math.ceil(staff.timeSlots.length / 2)
    return staff.timeSlots.slice(0, halfLength)
  }
  return staff.timeSlots
}

// 星期数据
const weekDays = ref([
  { label: '今天', date: '11-26' },
  { label: '明天', date: '11-27' },
  { label: '后天', date: '11-28' },
  { label: '周四', date: '11-29' },
  { label: '周五', date: '11-30' },
  { label: '周六', date: '12-01' },
  { label: '周日', date: '11-02' }
])

// 时间段数据
const timeSlots = ref([
  { time: '09:00', status: 'booked', statusText: '已预约' },
  { time: '10:00', status: 'available', statusText: '可预约' },
  { time: '11:00', status: 'booked', statusText: '已预约' },
  { time: '12:00', status: 'booked', statusText: '已预约' },
  { time: '13:00', status: 'available', statusText: '可预约' },
  { time: '14:00', status: 'booked', statusText: '已预约' },
  { time: '15:00', status: 'booked', statusText: '已预约' },
  { time: '16:00', status: 'booked', statusText: '已预约' },
  { time: '17:00', status: 'booked', statusText: '已预约' },
  { time: '18:00', status: 'closed', statusText: '关闭预约' },
  { time: '19:00', status: 'booked', statusText: '已预约' },
  { time: '20:00', status: 'available', statusText: '可预约' },
  { time: '21:00', status: 'booked', statusText: '已预约' },
  { time: '22:00', status: 'booked', statusText: '已预约' }
])

// 当前预约信息
const currentAppointment = ref({
  time: '11:00',
  serviceName: '洗剪吹·1人',
  serviceDetail: '洗护+修剪+造型',
  duration: '预计1小时',
  price: 799,
  customer: {
    name: '刘美丽',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
    isVip: true,
    rating: 4.8,
    bookingCount: 23
  }
})

// 页面加载
onLoad(() => {
  statusBarHeight.value = uni.getStorageSync('statusBarHeight') || 44
  initWeekDays()
  // 加载数据
  loadBusinessHours()
  loadTodayAppointments()
})

// 加载营业时间设置
const loadBusinessHours = async () => {
  try {
    const res = await getBusinessHours()
    if (res) {
      businessStartTime.value = res.openTime || '09:00'
      businessEndTime.value = res.closeTime || '22:00'
      storeOrderEnabled.value = res.isOpen !== false
      if (res.restDays && res.restDays.length > 0) {
        selectedRestDayIndexes.value = res.restDays.map(d => d - 1)
      }
    }
  } catch (e) {
    console.log('加载营业时间失败', e)
  }
}

// 加载今日预约
const loadTodayAppointments = async () => {
  try {
    const res = await getTodayAppointments()
    if (res && res.list && res.list.length > 0) {
      const first = res.list[0]
      currentAppointment.value = {
        time: first.appointmentTime,
        serviceName: first.serviceName,
        serviceDetail: first.serviceName,
        duration: '预计1小时',
        price: first.price || 0,
        customer: {
          name: first.customerName,
          avatar: first.customerAvatar || 'https://img.yzcdn.cn/vant/cat.jpeg',
          isVip: first.isVip || false,
          rating: first.rating || 4.5,
          bookingCount: first.bookingCount || 1
        }
      }
    }
  } catch (e) {
    console.log('加载今日预约失败', e)
  }
}

// 加载排班数据
const loadScheduleList = async () => {
  try {
    const today = new Date()
    const startOfWeek = new Date(today)
    const dayOfWeek = today.getDay()
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    startOfWeek.setDate(today.getDate() + diff + scheduleWeekOffset.value * 7)

    const year = startOfWeek.getFullYear()
    const month = String(startOfWeek.getMonth() + 1).padStart(2, '0')
    const day = String(startOfWeek.getDate()).padStart(2, '0')

    const res = await getScheduleList({ week: `${year}-W${getWeekNumber(startOfWeek)}` })
    if (res && res.list) {
      // 更新排班数据
    }
  } catch (e) {
    console.log('加载排班数据失败', e)
  }
}

// 获取周数
const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

// 初始化星期数据
const initWeekDays = () => {
  const today = new Date()
  const days = []
  const weekLabels = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    let label = weekLabels[date.getDay()]
    if (i === 0) label = '今天'
    else if (i === 1) label = '明天'
    else if (i === 2) label = '后天'

    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    days.push({
      label,
      date: `${month}-${day}`
    })
  }

  weekDays.value = days
  currentYear.value = today.getFullYear()
  currentMonth.value = today.getMonth() + 1
}

// 切换 Tab
const switchTab = (index) => {
  activeTab.value = index
}

// 上一个月
const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

// 下一个月
const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

// 日历上一个月
const prevMonthCalendar = () => {
  if (calendarMonth.value === 1) {
    calendarMonth.value = 12
    calendarYear.value--
  } else {
    calendarMonth.value--
  }
}

// 日历下一个月
const nextMonthCalendar = () => {
  if (calendarMonth.value === 12) {
    calendarMonth.value = 1
    calendarYear.value++
  } else {
    calendarMonth.value++
  }
}

// 选择日历日期
const selectCalendarDay = (day) => {
  if (day.isOtherMonth || !day.fullDate) return
  selectedCalendarDate.value = day.fullDate
}

// 切换店铺接单状态
const toggleStoreOrder = (e) => {
  storeOrderEnabled.value = e.detail.value
}

// 显示时间选择器
const showTimePicker = () => {
  // 解析当前时间设置索引
  const [startH, startM] = businessStartTime.value.split(':').map(Number)
  const [endH, endM] = businessEndTime.value.split(':').map(Number)
  startTimeIndex.value = [startH, 0, startM]
  endTimeIndex.value = [endH, 0, endM]
  showTimePickerModal.value = true
}

// 关闭时间选择器
const closeTimePicker = () => {
  showTimePickerModal.value = false
}

// 确认时间选择
const confirmTimePicker = () => {
  const startH = hours[startTimeIndex.value[0]]
  const startM = minutes[startTimeIndex.value[2]]
  const endH = hours[endTimeIndex.value[0]]
  const endM = minutes[endTimeIndex.value[2]]
  businessStartTime.value = `${startH}:${startM}`
  businessEndTime.value = `${endH}:${endM}`
  showTimePickerModal.value = false
}

// 开始时间 picker-view 变化
const onStartTimePickerChange = (e) => {
  startTimeIndex.value = e.detail.value
}

// 结束时间 picker-view 变化
const onEndTimePickerChange = (e) => {
  endTimeIndex.value = e.detail.value
}

// 显示休息日选择器
const showRestDayPicker = () => {
  tempRestDays.value = [...selectedRestDayIndexes.value]
  showRestDayPickerModal.value = true
}

// 关闭休息日选择器
const closeRestDayPicker = () => {
  showRestDayPickerModal.value = false
}

// 切换休息日选择
const toggleRestDay = (index) => {
  const idx = tempRestDays.value.indexOf(index)
  if (idx > -1) {
    tempRestDays.value.splice(idx, 1)
  } else {
    tempRestDays.value.push(index)
  }
}

// 确认休息日选择
const confirmRestDayPicker = () => {
  selectedRestDayIndexes.value = [...tempRestDays.value]
  showRestDayPickerModal.value = false
}

// 保存设置
const saveSettings = async () => {
  try {
    uni.showLoading({ title: '保存中...' })
    await updateBusinessHours({
      openTime: businessStartTime.value,
      closeTime: businessEndTime.value,
      restDays: selectedRestDayIndexes.value.map(i => i + 1)
    })
    uni.hideLoading()
    uni.showToast({ title: '保存成功', icon: 'success' })
  } catch (e) {
    uni.hideLoading()
    uni.showToast({ title: '保存失败', icon: 'none' })
  }
}

// 选择日期
const selectDay = (index) => {
  selectedDay.value = index
}

// 获取时间段样式类
const getSlotClass = (slot) => {
  return {
    'booked': slot.status === 'booked',
    'available': slot.status === 'available',
    'closed': slot.status === 'closed'
  }
}

// 处理时间段点击
const handleSlotTap = (slot, index) => {
  if (slot.status === 'available') {
  } else if (slot.status === 'booked') {
    // 该时段已被预约
  } else if (slot.status === 'closed') {
    uni.showModal({
      title: '提示',
      content: '是否开启该时段预约？',
      success: (res) => {
        if (res.confirm) {
          timeSlots.value[index].status = 'available'
          timeSlots.value[index].statusText = '可预约'
        }
      }
    })
  }
}

// 修改预约时间
const editAppointmentTime = () => {
  // 修改时间功能
}

// 拨打电话
const callCustomer = () => {
  uni.makePhoneCall({
    phoneNumber: '13800138000'
  })
}

// 取消预约
const cancelAppointment = () => {
  uni.showModal({
    title: '取消预约',
    content: '确定要取消该预约吗？',
    success: (res) => {
      if (res.confirm) {
        currentAppointment.value = null
      }
    }
  })
}

// 接受预约
const acceptAppointment = () => {
  // 接单处理
}
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}

.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: calc(env(safe-area-inset-bottom) + 24rpx);
}

// Tab 标签栏
.tab-bar {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 40rpx;
  gap: 80rpx;
  background-color: #fff;
  box-sizing: border-box;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 0;
  position: relative;

  text {
    font-size: 30rpx;
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
  width: 48rpx;
  height: 6rpx;
  background-color: #4A90E2;
  border-radius: 3rpx;
}

// Tab 内容
.tab-content {
  background-color: #EDF0F4;
}

// 月份选择器
.month-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx 0;
  background-color: #fff;
  gap: 30rpx;
}

.arrow-btn {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  image {
    width: 48rpx;
    height: 48rpx;
  }
}

.month-text {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

// 星期选择器
.week-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 24rpx;
  background-color: #fff;
}

.week-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12rpx 12rpx;
  border-radius: 8rpx;

  &.active {
    background-color: #DBE8FF;

    .day-label,
    .day-date {
      color: #5280FF;
    }
  }
}

.day-label {
  font-size: 24rpx;
  color: #333;
  margin-bottom: 4rpx;
}

.day-date {
  font-size: 20rpx;
  color: #999;
}

// 时间段网格
.time-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  padding: 0 24rpx 20rpx;
  background-color: #fff;
}

.time-slot {
  width: calc(25% - 12rpx);
  background-color: #fff;
  border-radius: 12rpx;
  padding: 16rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2rpx solid #e8e8e8;
  box-sizing: border-box;

  &.booked {
    background-color: #F8FAFC;
    .slot-time {
      color: #98A2B3;
    }
    .slot-status {
      color: #999;
    }
  }

  &.available {
    border-color: #4A90E2;

    .slot-time {
      color: #4A90E2;
    }
    .slot-status {
      color: #4A90E2;
    }
  }

  &.closed {
    border-color: #ff6b35;

    .slot-time {
      color: #ff6b35;
    }
    .slot-status {
      color: #ff6b35;
    }
  }
}

.slot-time {
  font-size: 28rpx;
  font-weight: 500;
  margin-bottom: 4rpx;
}

.slot-status {
  font-size: 20rpx;
}

// 提示信息
.tips {
  display: flex;
  align-items: center;
  padding: 16rpx 24rpx;
  gap: 8rpx;
  background-color: #fff;

  .tip-icon {
    width: 28rpx;
    height: 28rpx;
  }

  text {
    font-size: 22rpx;
    color: #999;
  }
}

// 空状态
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;

  text {
    font-size: 28rpx;
    color: #999;
  }
}

// ========== 工作排班样式 ==========
.schedule-tab {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 220rpx);
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

// 周选择器
.schedule-week-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16rpx 0;
  background-color: #fff;
  gap: 30rpx;
  width: 100%;
  box-sizing: border-box;
}

.week-range-text {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}

// 星期日期选择器
.schedule-day-selector {
  display: flex;
  justify-content: space-between;
  padding: 12rpx 20rpx 16rpx;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
}

.schedule-day-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12rpx 14rpx;
  border-radius: 10rpx;
  min-width: 60rpx;

  &.active {
    background-color: #DBE8FF;

    .schedule-day-date,
    .schedule-day-label {
      color: #5280FF;
    }
  }
}

.schedule-day-date {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 2rpx;
}

.schedule-day-label {
  font-size: 20rpx;
  color: #999;
}

// 技师排班标题
.schedule-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 15rpx;
  background-color: #EDF0F4;
}

.schedule-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}

.add-staff-btn {
  display: flex;
  align-items: center;
  gap: 6rpx;
  background-color: #5280FF;
  padding: 10rpx 20rpx;
  border-radius: 12rpx;

  .add-icon {
    font-size: 24rpx;
    color: #fff;
    font-weight: 500;
  }

  text {
    font-size: 22rpx;
    color: #fff;
  }
}

// 技师列表
.staff-list {
  flex: 1;
  padding: 0 20rpx 20rpx;
  background-color: #EDF0F4;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.staff-card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

// 技师头部信息
.staff-header {
  display: flex;
  align-items: center;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid #F0F0F0;
}

.staff-avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}

.staff-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.staff-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}

.staff-level {
  font-size: 22rpx;
  color: #999;
}

.staff-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  height: 48rpx;
  width: 120rpx;
  border-radius: 12rpx;
  border: 2rpx solid transparent;
  box-sizing: border-box;

  .status-dot {
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
  }

  text {
    font-size: 24rpx;
  }

  &.status-online {
    border-color: #E1FBEA;
    .status-dot {
      background-color: #16B364;
    }
    text {
      color: #16B364;
    }
  }

  &.status-busy {
    border-color: #FFF6DB;
    .status-dot {
      background-color: #FF6B35;
    }
    text {
      color: #FF6B35;
    }
  }

  &.status-rest {
    border-color: #FFEEED;
    .status-dot {
      background-color: #FF4D4F;
    }
    text {
      color: #FF4D4F;
    }
  }
}

// 技师时间段网格
.staff-time-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-top: 16rpx;
}

.staff-time-slot {
  width: calc(33.33% - 14rpx);
  background-color: #F8FAFC;
  border-radius: 10rpx;
  padding: 12rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2rpx solid #E8E8E8;
  box-sizing: border-box;

  .staff-slot-time {
    font-size: 26rpx;
    font-weight: 500;
    color: #999;
    margin-bottom: 4rpx;
  }

  .staff-slot-status {
    font-size: 20rpx;
    color: #999;
  }

  &.available {
    border-color: #4A90E2;
    background-color: #fff;

    .staff-slot-time {
      color: #4A90E2;
    }

    .staff-slot-status {
      color: #4A90E2;
    }
  }
}

// 收起/展开按钮
.collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  padding: 16rpx 0 8rpx;

  text {
    font-size: 24rpx;
    color: #999;
  }
}

.collapse-icon {
  width: 24rpx;
  height: 24rpx;
  transition: transform 0.3s;

  &.expanded {
    transform: rotate(180deg);
  }
}

// 底部预约卡片
.appointment-card {
  margin: 16rpx 12rpx 0;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 24rpx 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
  width: calc(100% - 36rpx);
  box-sizing: border-box;
}

.card-header {
  display: flex;
  align-items: center;
}

.card-time {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.time-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background-color: #4A90E2;
}

.time-label {
  font-size: 28rpx;
  color: #4A90E2;
}

.time-value {
  font-size: 28rpx;
  color: #4A90E2;
  font-weight: 500;
}

.service-info {
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 16rpx;
  gap: 16rpx;
}

.service-name {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}

.edit-time {
  display: flex;
  align-items: center;
  gap: 4rpx;

  image {
    width: 28rpx;
    height: 28rpx;
  }

  text {
    font-size: 24rpx;
    color: #4A90E2;
  }
}

.call-btn {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  image {
    width: 36rpx;
    height: 36rpx;
  }
}

.card-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20rpx;
}

.detail-rows {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.detail-row {
  display: flex;
  align-items: center;
}

.detail-label {
  font-size: 26rpx;
  color: #999;
}

.detail-value {
  font-size: 26rpx;
  color: #666;
}

.price-tag {
  font-size: 40rpx;
  font-weight: 600;
  color: #F79009;
}

.card-divider {
  height: 1rpx;
  background-color: #f0f0f0;
  margin: 24rpx 0;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.customer-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}

.customer-detail {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.customer-name-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.customer-name {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}

.vip-tag {
  display: flex;
  align-items: center;

  image {
    width: 64rpx;
    height: 32rpx;
  }
}

.customer-stats {
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.rating {
  font-size: 24rpx;
  color: #ff6b35;
  font-weight: 500;
}

.star-icon {
  width: 24rpx;
  height: 24rpx;
}

.booking-count {
  font-size: 24rpx;
  color: #999;
}

.action-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24rpx;
}

.btn-cancel {
  padding: 10rpx 48rpx;
  background-color: #f5f5f5;
  border-radius: 14rpx;
  font-size: 28rpx;
  color: #666;
}

.btn-accept {
  padding: 10rpx 48rpx;
  background: #5280FF;
  border-radius: 14rpx;
  font-size: 28rpx;
  color: #fff;
  font-weight: 500;
}

// 日历星期标题
.calendar-week-header {
  display: flex;
  padding: 16rpx 0;
  background-color: #fff;
}

.week-header-item {
  flex: 1;
  text-align: center;

  text {
    font-size: 26rpx;
    color: #999;
  }
}

// 日历网格
.calendar-grid {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 8rpx 16rpx 16rpx;
  gap: 8rpx;
}

.calendar-day {
  width: calc((100% - 48rpx) / 7);
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  background-color: rgb(248, 250, 252);
  border-radius: 8rpx;

  &.other-month {
    background-color: #fff;

    .day-number {
      color: #ccc;
    }
  }

  &.today,
  &.selected {
    background-color: #4A90E2;

    .day-number {
      color: #fff;
    }

    .rest-tag {
      color: #fff;
    }
  }

  &.rest-day:not(.other-month):not(.today):not(.selected) {
    background-color: #e8e8e8;

    .day-number {
      color: #999;
    }

    .rest-tag {
      color: #999;
    }
  }
}

.day-number {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}

.rest-tag {
  position: absolute;
  top: 4rpx;
  right: 8rpx;
  font-size: 16rpx;
  color: #4A90E2;
}

// 设置卡片
.settings-card {
  margin: 24rpx 24rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}

.settings-date {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 8rpx 0;
}

.date-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background-color: #4A90E2;
}

.date-text {
  font-size: 32rpx;
  font-weight: 500;
  color: #4A90E2;
}

.settings-divider {
  height: 1rpx;
  background-color: #f0f0f0;
  margin: 20rpx 0;
}

.settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 0;

  switch {
    transform: scale(0.8);
    transform-origin: right center;
  }
}

.settings-label {
  font-size: 28rpx;
  color: #333;
}

.settings-value {
  display: flex;
  align-items: center;
  gap: 8rpx;

  text {
    font-size: 28rpx;
    color: #999;
  }

  .arrow {
    font-size: 32rpx;
    color: #ccc;
  }
}

.save-btn {
  margin-top: 24rpx;
  height: 88rpx;
  background-color: #5280FF;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }
}

// 弹窗样式
.picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
}

.picker-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.picker-content {
  position: relative;
  width: 100%;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.picker-cancel {
  font-size: 30rpx;
  color: #999;
}

.picker-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.picker-confirm {
  font-size: 30rpx;
  color: #5280FF;
  font-weight: 500;
}

// 时间选择器内容
.time-picker-body {
  padding: 24rpx 32rpx;
}

.time-section {
  margin-bottom: 24rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.time-section-label {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 16rpx;
  display: block;
}

.time-picker-wrapper {
  background-color: #f8f8f8;
  border-radius: 16rpx;
  overflow: hidden;
}

.time-picker-view {
  height: 240rpx;
  width: 100%;
}

.picker-item {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 36rpx;
  color: #333;
}

// 休息日选择器内容
.rest-day-picker-body {
  padding: 24rpx 32rpx;
}

.rest-day-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 16rpx;
  border-bottom: 1rpx solid #f5f5f5;

  text {
    font-size: 30rpx;
    color: #333;
  }

  &:last-child {
    border-bottom: none;
  }

  &.selected {
    text {
      color: #5280FF;
      font-weight: 500;
    }
  }
}

.check-icon {
  font-size: 32rpx;
  color: #5280FF;
  font-weight: 600;
}
</style>
