/**
 * 时间/排班管理模块 Mock 数据
 * 营业时间、预约管理、工作排班
 */

import { success, error, paginate, generateId, formatNow, formatDate, randomInt } from '../utils.js'

// 营业时间配置
const businessHours = {
  shopId: 'SHOP001',
  isOpen: true,
  weeklyHours: [
    { day: 1, dayName: '周一', isOpen: true, openTime: '09:00', closeTime: '21:00' },
    { day: 2, dayName: '周二', isOpen: true, openTime: '09:00', closeTime: '21:00' },
    { day: 3, dayName: '周三', isOpen: true, openTime: '09:00', closeTime: '21:00' },
    { day: 4, dayName: '周四', isOpen: true, openTime: '09:00', closeTime: '21:00' },
    { day: 5, dayName: '周五', isOpen: true, openTime: '09:00', closeTime: '22:00' },
    { day: 6, dayName: '周六', isOpen: true, openTime: '09:00', closeTime: '22:00' },
    { day: 0, dayName: '周日', isOpen: true, openTime: '10:00', closeTime: '20:00' }
  ],
  holidays: [
    { date: '2025-12-25', name: '圣诞节', isOpen: false },
    { date: '2026-01-01', name: '元旦', isOpen: false }
  ],
  specialDays: [
    { date: '2025-12-31', name: '跨年夜', openTime: '09:00', closeTime: '24:00' }
  ],
  advanceBookingDays: 30,
  minBookingInterval: 30,
  maxBookingsPerSlot: 3
}

// 今日预约数据
const todayAppointments = [
  {
    id: 'APT001',
    time: '10:00',
    duration: 45,
    customerId: 'C001',
    customerName: '王小明',
    customerPhone: '138****8888',
    customerAvatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    technicianId: 'T001',
    technicianName: '李天天',
    serviceId: 'S001',
    serviceName: '精致剪发',
    status: 'confirmed',
    remark: ''
  },
  {
    id: 'APT002',
    time: '11:00',
    duration: 120,
    customerId: 'C002',
    customerName: '李小红',
    customerPhone: '139****9999',
    customerAvatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    technicianId: 'T002',
    technicianName: '张小雨',
    serviceId: 'S002',
    serviceName: '时尚烫发',
    status: 'pending',
    remark: '想要自然卷'
  },
  {
    id: 'APT003',
    time: '14:00',
    duration: 90,
    customerId: 'C003',
    customerName: '张小花',
    customerPhone: '137****7777',
    customerAvatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    technicianId: 'T001',
    technicianName: '李天天',
    serviceId: 'S003',
    serviceName: '个性染发',
    status: 'confirmed',
    remark: '浅棕色'
  }
]

// 工作排班数据
const schedules = [
  {
    id: 'SCH001',
    technicianId: 'T001',
    technicianName: '李天天',
    technicianAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    date: '2025-12-13',
    status: 'working',
    startTime: '09:00',
    endTime: '18:00',
    breakStart: '12:00',
    breakEnd: '13:00'
  },
  {
    id: 'SCH002',
    technicianId: 'T002',
    technicianName: '张小雨',
    technicianAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
    date: '2025-12-13',
    status: 'working',
    startTime: '10:00',
    endTime: '19:00',
    breakStart: '13:00',
    breakEnd: '14:00'
  },
  {
    id: 'SCH003',
    technicianId: 'T003',
    technicianName: '王小刚',
    technicianAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    date: '2025-12-13',
    status: 'off',
    startTime: null,
    endTime: null,
    reason: '休假'
  }
]

// 排班模板
const scheduleTemplates = [
  {
    id: 'TPL001',
    name: '标准班次',
    startTime: '09:00',
    endTime: '18:00',
    breakStart: '12:00',
    breakEnd: '13:00'
  },
  {
    id: 'TPL002',
    name: '晚班',
    startTime: '13:00',
    endTime: '22:00',
    breakStart: '17:00',
    breakEnd: '18:00'
  },
  {
    id: 'TPL003',
    name: '全天班',
    startTime: '09:00',
    endTime: '21:00',
    breakStart: '12:00',
    breakEnd: '13:00'
  }
]

export const data = {
  businessHours,
  todayAppointments,
  schedules,
  scheduleTemplates
}

export const routes = {
  // ==================== 营业时间 ====================
  'GET /schedule/business-hours': () => {
    return success(businessHours)
  },

  'PUT /schedule/business-hours': (params) => {
    Object.assign(businessHours, params)
    return success(businessHours, '营业时间已更新')
  },

  'PUT /schedule/business-hours/day/:day': (params) => {
    const { day } = params
    const dayConfig = businessHours.weeklyHours.find(d => d.day === Number(day))
    if (dayConfig) {
      Object.assign(dayConfig, params)
      return success(dayConfig, '已更新')
    }
    return error('未找到指定日期配置')
  },

  'POST /schedule/holidays': (params) => {
    const holiday = {
      ...params,
      id: generateId('HOL')
    }
    businessHours.holidays.push(holiday)
    return success(holiday, '节假日已添加')
  },

  'DELETE /schedule/holidays/:id': (params) => {
    const index = businessHours.holidays.findIndex(h => h.id === params.id)
    if (index > -1) {
      businessHours.holidays.splice(index, 1)
      return success(null, '已删除')
    }
    return error('未找到该节假日')
  },

  // ==================== 今日预约 ====================
  'GET /schedule/today': () => {
    return success({
      date: formatDate(new Date(), 'YYYY-MM-DD'),
      total: todayAppointments.length,
      confirmed: todayAppointments.filter(a => a.status === 'confirmed').length,
      pending: todayAppointments.filter(a => a.status === 'pending').length,
      appointments: todayAppointments
    })
  },

  'GET /schedule/appointments': (params) => {
    const { date, technicianId, status, page = 1, pageSize = 20 } = params
    let list = [...todayAppointments]

    if (date) {
      // 模拟按日期筛选
    }
    if (technicianId) {
      list = list.filter(a => a.technicianId === technicianId)
    }
    if (status && status !== 'all') {
      list = list.filter(a => a.status === status)
    }

    return success(paginate(list, page, pageSize))
  },

  'GET /schedule/appointments/:id': (params) => {
    const appointment = todayAppointments.find(a => a.id === params.id)
    if (appointment) {
      return success(appointment)
    }
    return error('预约不存在')
  },

  // ==================== 可用时间段 ====================
  'GET /schedule/available-slots': (params) => {
    const { date, technicianId, serviceId } = params
    // 模拟生成可用时间段
    const slots = []
    for (let hour = 9; hour < 21; hour++) {
      slots.push({
        time: `${String(hour).padStart(2, '0')}:00`,
        available: Math.random() > 0.3,
        bookedCount: randomInt(0, 3)
      })
      slots.push({
        time: `${String(hour).padStart(2, '0')}:30`,
        available: Math.random() > 0.3,
        bookedCount: randomInt(0, 3)
      })
    }
    return success({
      date: date || formatDate(new Date(), 'YYYY-MM-DD'),
      slots
    })
  },

  // ==================== 工作排班 ====================
  'GET /schedule/work': (params) => {
    const { date, page = 1, pageSize = 20 } = params
    return success(paginate(schedules, page, pageSize))
  },

  'GET /schedule/work/:id': (params) => {
    const schedule = schedules.find(s => s.id === params.id)
    if (schedule) {
      return success(schedule)
    }
    return error('排班不存在')
  },

  'POST /schedule/work': (params) => {
    const newSchedule = {
      id: generateId('SCH'),
      ...params,
      createTime: formatNow()
    }
    schedules.push(newSchedule)
    return success(newSchedule, '排班已创建')
  },

  'PUT /schedule/work/:id': (params) => {
    const schedule = schedules.find(s => s.id === params.id)
    if (schedule) {
      Object.assign(schedule, params)
      return success(schedule, '排班已更新')
    }
    return error('排班不存在')
  },

  'DELETE /schedule/work/:id': (params) => {
    const index = schedules.findIndex(s => s.id === params.id)
    if (index > -1) {
      schedules.splice(index, 1)
      return success(null, '排班已删除')
    }
    return error('排班不存在')
  },

  // ==================== 排班模板 ====================
  'GET /schedule/templates': () => {
    return success(scheduleTemplates)
  },

  'POST /schedule/templates': (params) => {
    const template = {
      id: generateId('TPL'),
      ...params
    }
    scheduleTemplates.push(template)
    return success(template, '模板已创建')
  },

  'POST /schedule/apply-template': (params) => {
    const { templateId, technicianIds, dates } = params
    return success({
      applied: technicianIds.length * dates.length
    }, '模板已应用')
  },

  // ==================== 技师排班查询 ====================
  'GET /schedule/technician/:id': (params) => {
    const { id } = params
    const techSchedules = schedules.filter(s => s.technicianId === id)
    return success(techSchedules)
  },

  'PUT /schedule/technician/:id/status': (params) => {
    const { id, status, reason } = params
    const schedule = schedules.find(s => s.technicianId === id)
    if (schedule) {
      schedule.status = status
      if (reason) schedule.reason = reason
      return success(schedule, '状态已更新')
    }
    return error('未找到该技师排班')
  }
}

export default {
  data,
  routes
}
