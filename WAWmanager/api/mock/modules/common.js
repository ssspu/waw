/**
 * 通用模块 Mock 数据
 * 包括配置、统计、上传等公共功能
 */

import { success, error, generateId, formatNow, formatDate } from '../utils.js'

// 应用配置
const appConfig = {
  version: '1.0.0',
  minVersion: '0.9.0',
  updateUrl: '',
  features: {
    distribution: true, // 分销功能
    coupon: true, // 优惠券功能
    agent: true, // 代理功能
    chat: false // 聊天功能（暂未开放）
  },
  customerService: {
    phone: '400-888-8888',
    workTime: '09:00-21:00',
    wechat: 'waw_service'
  }
}

// 仪表板统计数据
const dashboardStats = {
  today: {
    bookingCount: 2, // 预约订单
    confirmedCount: 1, // 确认订单
    completedCount: 0, // 完成订单
    cancelledCount: 0, // 取消订单
    visitorCount: 15, // 访客数
    distributionOrderCount: 1, // 分销订单
    paymentIncome: 547.00, // 支付收入
    balance: 12580.00 // 店铺余额
  },
  week: {
    bookingCount: 12,
    confirmedCount: 8,
    completedCount: 15,
    cancelledCount: 2,
    visitorCount: 89,
    distributionOrderCount: 5,
    paymentIncome: 3560.00,
    balance: 12580.00
  },
  month: {
    bookingCount: 45,
    confirmedCount: 38,
    completedCount: 52,
    cancelledCount: 5,
    visitorCount: 356,
    distributionOrderCount: 18,
    paymentIncome: 15680.00,
    balance: 12580.00
  }
}

// 营业时间配置
const businessHours = {
  enabled: true,
  regularHours: {
    start: '09:00',
    end: '21:00'
  },
  restDays: ['周一'], // 固定休息日
  specialDays: [ // 特殊营业/休息日
    {
      date: '2025-12-25',
      type: 'holiday',
      name: '圣诞节',
      hours: null // null表示休息
    },
    {
      date: '2025-12-31',
      type: 'special',
      name: '跨年夜',
      hours: { start: '10:00', end: '23:00' }
    }
  ]
}

// 今日预约列表
const todayAppointments = [
  {
    id: 'TA001',
    orderId: 'ORD20251213001',
    time: '14:00',
    duration: 45,
    customerName: '王小明',
    serviceName: '精致剪发',
    designerName: '李天天',
    status: 'booking'
  },
  {
    id: 'TA002',
    orderId: 'ORD20251213002',
    time: '15:30',
    duration: 120,
    customerName: '李小红',
    serviceName: '时尚烫发',
    designerName: '张小雨',
    status: 'booking'
  },
  {
    id: 'TA003',
    orderId: 'ORD20251212001',
    time: '16:00',
    duration: 90,
    customerName: '张小花',
    serviceName: '个性染发',
    designerName: '李天天',
    status: 'confirmed'
  }
]

// 工作排班
const workSchedule = {
  date: formatDate(new Date(), 'YYYY-MM-DD'),
  technicians: [
    {
      id: 'T001',
      name: '李天天',
      avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
      status: 'working', // working/rest/leave
      schedule: [
        { start: '09:00', end: '12:00', type: 'work' },
        { start: '12:00', end: '13:00', type: 'break' },
        { start: '13:00', end: '18:00', type: 'work' },
        { start: '18:00', end: '19:00', type: 'break' },
        { start: '19:00', end: '21:00', type: 'work' }
      ],
      appointments: ['TA001', 'TA003']
    },
    {
      id: 'T002',
      name: '张小雨',
      avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
      status: 'working',
      schedule: [
        { start: '10:00', end: '13:00', type: 'work' },
        { start: '13:00', end: '14:00', type: 'break' },
        { start: '14:00', end: '21:00', type: 'work' }
      ],
      appointments: ['TA002']
    },
    {
      id: 'T003',
      name: '王大明',
      avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png',
      status: 'rest',
      schedule: [],
      appointments: []
    }
  ]
}

// 通知消息
const notifications = [
  {
    id: 'N001',
    type: 'order',
    title: '新订单提醒',
    content: '您有一笔新的预约订单待确认',
    orderId: 'ORD20251213001',
    isRead: false,
    time: '2025-12-13 10:28:00'
  },
  {
    id: 'N002',
    type: 'order',
    title: '新订单提醒',
    content: '您有一笔新的预约订单待确认',
    orderId: 'ORD20251213002',
    isRead: false,
    time: '2025-12-13 09:15:00'
  },
  {
    id: 'N003',
    type: 'system',
    title: '系统通知',
    content: '平台将于2025年12月20日进行系统维护',
    isRead: true,
    time: '2025-12-10 10:00:00'
  }
]

// Mock 数据
export const data = {
  appConfig,
  dashboardStats,
  businessHours,
  todayAppointments,
  workSchedule,
  notifications
}

// Mock 路由处理
export const routes = {
  // 获取应用配置
  'GET /common/config': () => {
    return success(appConfig)
  },

  // 获取仪表板统计
  'GET /dashboard/stats': (params) => {
    const { period = 'today' } = params
    return success(dashboardStats[period] || dashboardStats.today)
  },

  // 获取营业时间配置
  'GET /business-hours': () => {
    return success(businessHours)
  },

  // 更新营业时间配置
  'PUT /business-hours': (params) => {
    Object.assign(businessHours, params)
    return success(businessHours, '更新成功')
  },

  // 获取今日预约
  'GET /appointments/today': () => {
    return success(todayAppointments)
  },

  // 获取工作排班
  'GET /schedule': (params) => {
    const { date } = params
    if (date && date !== workSchedule.date) {
      // 模拟其他日期的排班
      return success({
        date,
        technicians: workSchedule.technicians.map(t => ({
          ...t,
          appointments: []
        }))
      })
    }
    return success(workSchedule)
  },

  // 更新工作排班
  'PUT /schedule': (params) => {
    if (params.date === workSchedule.date) {
      Object.assign(workSchedule, params)
    }
    return success(workSchedule, '排班更新成功')
  },

  // 获取通知列表
  'GET /notifications': (params) => {
    let list = [...notifications]

    if (params.type) {
      list = list.filter(n => n.type === params.type)
    }

    if (params.isRead !== undefined) {
      list = list.filter(n => n.isRead === params.isRead)
    }

    list.sort((a, b) => new Date(b.time) - new Date(a.time))

    return success({
      list,
      unreadCount: notifications.filter(n => !n.isRead).length
    })
  },

  // 标记通知已读
  'PUT /notifications/:id/read': (params) => {
    const notification = notifications.find(n => n.id === params.id)
    if (!notification) return error('通知不存在')
    notification.isRead = true
    return success(null, '已标记为已读')
  },

  // 标记全部已读
  'PUT /notifications/read-all': () => {
    notifications.forEach(n => n.isRead = true)
    return success(null, '全部标记为已读')
  },

  // 获取未读通知数量
  'GET /notifications/unread-count': () => {
    return success({
      count: notifications.filter(n => !n.isRead).length
    })
  },

  // 文件上传
  'POST /upload': (params) => {
    // 模拟上传成功
    return success({
      url: 'https://api.waw.com/uploads/' + generateId('file_') + '.png',
      fileName: params.fileName || 'image.png',
      fileSize: params.fileSize || 102400,
      uploadTime: formatNow()
    }, '上传成功')
  },

  // 批量上传
  'POST /upload/batch': (params) => {
    const { files = [] } = params
    const results = files.map((f, i) => ({
      url: 'https://api.waw.com/uploads/' + generateId('file_') + '_' + i + '.png',
      fileName: f.name || `image_${i}.png`,
      uploadTime: formatNow()
    }))
    return success(results, '上传成功')
  },

  // 获取银行列表
  'GET /banks': () => {
    return success([
      { code: 'ICBC', name: '中国工商银行' },
      { code: 'CCB', name: '中国建设银行' },
      { code: 'ABC', name: '中国农业银行' },
      { code: 'BOC', name: '中国银行' },
      { code: 'CMB', name: '招商银行' },
      { code: 'CMBC', name: '民生银行' },
      { code: 'CITIC', name: '中信银行' },
      { code: 'CEB', name: '光大银行' }
    ])
  },

  // 获取地区列表
  'GET /regions': (params) => {
    const { parentId } = params
    // 简化的地区数据
    if (!parentId) {
      return success([
        { id: '51', name: '四川省' },
        { id: '11', name: '北京市' },
        { id: '31', name: '上海市' }
      ])
    }
    if (parentId === '51') {
      return success([
        { id: '5101', name: '成都市' },
        { id: '5102', name: '绵阳市' }
      ])
    }
    if (parentId === '5101') {
      return success([
        { id: '510104', name: '锦江区' },
        { id: '510105', name: '青羊区' },
        { id: '510106', name: '金牛区' },
        { id: '510107', name: '武侯区' },
        { id: '510108', name: '成华区' }
      ])
    }
    return success([])
  }
}

export default {
  data,
  routes
}
