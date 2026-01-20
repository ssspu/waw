/**
 * 订单管理模块 Mock 数据
 * 商家端视角的订单管理，与用户端订单数据完全一致
 * 订单状态流转：
 * 用户端：pending_payment -> confirmed -> pending_use -> completed/cancelled
 * 商家端：booking(预约) -> confirmed(确认) -> completed(完成)
 */

import { success, error, paginate, generateId, formatNow, formatDate } from '../utils.js'

// 订单列表 - 与用户端orders数据结构完全一致
// 商家端显示同一份订单数据，但视角不同
const orders = [
  {
    id: 'ORD20251213001',
    // 状态映射: 商家端 booking = 用户端 confirmed
    status: 'booking', // booking/confirmed/completed/cancelled
    statusText: '待确认',
    // 客户信息 - 对应用户端的用户
    customerId: 'U001',
    customerName: '王小明',
    customerPhone: '138****8888',
    customerAvatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    // 服务信息 - 与用户端service数据一致
    serviceId: '1',
    serviceName: '精致剪发',
    serviceImage: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    // 技师信息 - 对应用户端designer
    designerId: 'T001',
    designerName: '李天天',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    // 预约时间
    appointmentDate: '2025-12-14',
    appointmentTime: '14:00',
    appointmentDateTime: '2025-12-14 14:00',
    duration: 45, // 服务时长
    // 价格信息
    price: 99,
    originalPrice: 128,
    couponAmount: 0,
    payAmount: 99,
    // 支付状态
    isPaid: true,
    payTime: '2025-12-13 10:30',
    payMethod: 'wechat',
    // 时间信息
    createTime: '2025-12-13 10:28',
    // 备注
    remark: '希望剪短一点',
    // 订单来源
    source: 'miniprogram', // miniprogram/app/web
    // 是否新客户
    isNewCustomer: false
  },
  {
    id: 'ORD20251213002',
    status: 'booking',
    statusText: '待确认',
    customerId: 'U002',
    customerName: '李小红',
    customerPhone: '139****9999',
    customerAvatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    serviceId: '2',
    serviceName: '时尚烫发',
    serviceImage: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    designerId: 'T002',
    designerName: '张小雨',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
    appointmentDate: '2025-12-14',
    appointmentTime: '15:30',
    appointmentDateTime: '2025-12-14 15:30',
    duration: 120,
    price: 399,
    originalPrice: 499,
    couponAmount: 50,
    payAmount: 349,
    isPaid: true,
    payTime: '2025-12-13 09:20',
    payMethod: 'wechat',
    createTime: '2025-12-13 09:15',
    remark: '想要自然卷',
    source: 'miniprogram',
    isNewCustomer: true
  },
  {
    id: 'ORD20251212001',
    status: 'confirmed',
    statusText: '已确认',
    customerId: 'U003',
    customerName: '张小花',
    customerPhone: '137****7777',
    customerAvatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    serviceId: '3',
    serviceName: '个性染发',
    serviceImage: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    designerId: 'T001',
    designerName: '李天天',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    appointmentDate: '2025-12-13',
    appointmentTime: '16:00',
    appointmentDateTime: '2025-12-13 16:00',
    duration: 90,
    price: 299,
    originalPrice: 399,
    couponAmount: 0,
    payAmount: 299,
    isPaid: true,
    payTime: '2025-12-12 18:30',
    payMethod: 'alipay',
    createTime: '2025-12-12 18:25',
    confirmTime: '2025-12-12 19:00',
    remark: '想染成栗色',
    source: 'miniprogram',
    isNewCustomer: false,
    // 用于商家确认后生成的验证码
    verifyCode: '6688'
  },
  {
    id: 'ORD20251211001',
    status: 'completed',
    statusText: '已完成',
    customerId: 'U001',
    customerName: '王小明',
    customerPhone: '138****8888',
    customerAvatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    serviceId: '1',
    serviceName: '精致剪发',
    serviceImage: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    designerId: 'T001',
    designerName: '李天天',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    appointmentDate: '2025-12-11',
    appointmentTime: '14:00',
    appointmentDateTime: '2025-12-11 14:00',
    duration: 45,
    price: 99,
    originalPrice: 128,
    couponAmount: 5,
    payAmount: 94,
    isPaid: true,
    payTime: '2025-12-10 20:30',
    payMethod: 'wechat',
    createTime: '2025-12-10 20:25',
    confirmTime: '2025-12-10 21:00',
    completeTime: '2025-12-11 15:00',
    remark: '',
    source: 'miniprogram',
    isNewCustomer: false,
    // 点评信息
    hasReviewed: true,
    review: {
      designerRating: 5,
      shopRating: 5,
      content: '李老师技术很好，很满意！',
      tags: ['技术专业', '服务态度好', '环境舒适'],
      images: [],
      isAnonymous: false,
      createTime: '2025-12-11 16:00'
    }
  },
  {
    id: 'ORD20251210001',
    status: 'completed',
    statusText: '已完成',
    customerId: 'U004',
    customerName: '赵小明',
    customerPhone: '136****6666',
    customerAvatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    serviceId: '4',
    serviceName: '深度护理',
    serviceImage: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    designerId: 'T002',
    designerName: '张小雨',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
    appointmentDate: '2025-12-10',
    appointmentTime: '10:00',
    appointmentDateTime: '2025-12-10 10:00',
    duration: 60,
    price: 199,
    originalPrice: 258,
    couponAmount: 0,
    payAmount: 199,
    isPaid: true,
    payTime: '2025-12-09 21:00',
    payMethod: 'wechat',
    createTime: '2025-12-09 20:55',
    confirmTime: '2025-12-09 21:30',
    completeTime: '2025-12-10 11:10',
    remark: '头发比较干燥',
    source: 'app',
    isNewCustomer: true,
    hasReviewed: false
  },
  {
    id: 'ORD20251208001',
    status: 'cancelled',
    statusText: '已取消',
    customerId: 'U005',
    customerName: '孙小美',
    customerPhone: '135****5555',
    customerAvatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    serviceId: '2',
    serviceName: '时尚烫发',
    serviceImage: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    designerId: 'T001',
    designerName: '李天天',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    appointmentDate: '2025-12-08',
    appointmentTime: '11:00',
    appointmentDateTime: '2025-12-08 11:00',
    duration: 120,
    price: 399,
    originalPrice: 499,
    couponAmount: 0,
    payAmount: 399,
    isPaid: true,
    payTime: '2025-12-07 15:00',
    payMethod: 'wechat',
    createTime: '2025-12-07 14:55',
    cancelTime: '2025-12-07 20:00',
    cancelReason: '临时有事',
    cancelBy: 'customer', // customer/merchant
    remark: '',
    source: 'miniprogram',
    isNewCustomer: false,
    // 退款信息
    refundStatus: 'completed',
    refundAmount: 399,
    refundTime: '2025-12-08 10:00'
  }
]

// 订单统计
const orderStats = {
  today: {
    bookingCount: 2,
    confirmedCount: 1,
    completedCount: 0,
    totalIncome: 0,
    newCustomerCount: 1
  },
  week: {
    bookingCount: 5,
    confirmedCount: 3,
    completedCount: 8,
    totalIncome: 2580,
    newCustomerCount: 3
  },
  month: {
    bookingCount: 28,
    confirmedCount: 15,
    completedCount: 45,
    totalIncome: 15680,
    newCustomerCount: 12
  }
}

// Mock 数据
export const data = {
  orders,
  orderStats
}

// Mock 路由处理
export const routes = {
  // 获取订单列表
  'GET /orders': (params) => {
    let list = [...orders]

    // 按状态筛选
    if (params.status && params.status !== 'all') {
      list = list.filter(o => o.status === params.status)
    }

    // 按日期筛选
    if (params.date) {
      list = list.filter(o => o.appointmentDate === params.date)
    }

    // 按日期范围筛选
    if (params.startDate && params.endDate) {
      list = list.filter(o => {
        return o.appointmentDate >= params.startDate && o.appointmentDate <= params.endDate
      })
    }

    // 按技师筛选
    if (params.designerId) {
      list = list.filter(o => o.designerId === params.designerId)
    }

    // 按客户筛选
    if (params.customerId) {
      list = list.filter(o => o.customerId === params.customerId)
    }

    // 关键词搜索
    if (params.keyword) {
      list = list.filter(o =>
        o.customerName.includes(params.keyword) ||
        o.serviceName.includes(params.keyword) ||
        o.id.includes(params.keyword)
      )
    }

    // 按创建时间倒序
    list.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取订单详情
  'GET /orders/:id': (params) => {
    const order = orders.find(o => o.id === params.id)
    return order ? success(order) : error('订单不存在')
  },

  // 创建订单（商家代客下单）
  'POST /orders': (params) => {
    const newOrder = {
      id: 'ORD' + formatDate(new Date(), 'YYYYMMDD') + String(orders.length + 1).padStart(3, '0'),
      status: 'booking',
      statusText: '待确认',
      ...params,
      isPaid: false,
      createTime: formatNow(),
      source: 'merchant'
    }
    orders.unshift(newOrder)
    return success(newOrder, '创建成功')
  },

  // 更新订单状态
  'PUT /orders/:id/status': (params) => {
    const order = orders.find(o => o.id === params.id)
    if (!order) return error('订单不存在')

    const { status } = params

    // 状态流转验证
    if (status === 'confirmed' && order.status !== 'booking') {
      return error('只有待确认的订单可以确认')
    }
    if (status === 'completed' && order.status !== 'confirmed') {
      return error('只有已确认的订单可以完成')
    }

    order.status = status
    order.statusText = status === 'confirmed' ? '已确认' : status === 'completed' ? '已完成' : order.statusText

    if (status === 'confirmed') {
      order.confirmTime = formatNow()
      order.verifyCode = String(Math.floor(1000 + Math.random() * 9000))
    }
    if (status === 'completed') {
      order.completeTime = formatNow()
    }

    return success(order, '状态更新成功')
  },

  // 确认订单（接单）
  'POST /orders/:id/confirm': (params) => {
    const order = orders.find(o => o.id === params.id)
    if (!order) return error('订单不存在')
    if (order.status !== 'booking') {
      return error('只有待确认的订单可以接单')
    }

    order.status = 'confirmed'
    order.statusText = '已确认'
    order.confirmTime = formatNow()
    order.verifyCode = String(Math.floor(1000 + Math.random() * 9000))

    return success(order, '接单成功')
  },

  // 取消订单
  'POST /orders/:id/cancel': (params) => {
    const order = orders.find(o => o.id === params.id)
    if (!order) return error('订单不存在')
    if (order.status === 'completed' || order.status === 'cancelled') {
      return error('该订单状态不可取消')
    }

    order.status = 'cancelled'
    order.statusText = '已取消'
    order.cancelTime = formatNow()
    order.cancelReason = params.reason || '商家取消'
    order.cancelBy = 'merchant'

    // 如果已支付，触发退款
    if (order.isPaid) {
      order.refundStatus = 'pending'
      order.refundAmount = order.payAmount
    }

    return success(order, '取消成功')
  },

  // 修改预约时间
  'PUT /orders/:id/reschedule': (params) => {
    const order = orders.find(o => o.id === params.id)
    if (!order) return error('订单不存在')
    if (order.status !== 'booking' && order.status !== 'confirmed') {
      return error('该订单状态不可修改预约时间')
    }

    order.appointmentDate = params.appointmentDate
    order.appointmentTime = params.appointmentTime
    order.appointmentDateTime = `${params.appointmentDate} ${params.appointmentTime}`

    return success(order, '预约时间修改成功')
  },

  // 完成订单（开始服务后）
  'POST /orders/:id/complete': (params) => {
    const order = orders.find(o => o.id === params.id)
    if (!order) return error('订单不存在')
    if (order.status !== 'confirmed') {
      return error('只有已确认的订单可以完成')
    }

    order.status = 'completed'
    order.statusText = '已完成'
    order.completeTime = formatNow()

    return success(order, '服务完成')
  },

  // 确认支付（线下收款）
  'POST /orders/:id/payment': (params) => {
    const order = orders.find(o => o.id === params.id)
    if (!order) return error('订单不存在')

    order.isPaid = true
    order.payTime = formatNow()
    order.payMethod = params.payMethod || 'cash'

    return success(order, '支付确认成功')
  },

  // 获取订单收入统计
  'GET /orders/income': (params) => {
    const { period = 'today' } = params
    const now = new Date()

    let startDate, endDate
    if (period === 'today') {
      startDate = endDate = formatDate(now, 'YYYY-MM-DD')
    } else if (period === 'week') {
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - 7)
      startDate = formatDate(weekStart, 'YYYY-MM-DD')
      endDate = formatDate(now, 'YYYY-MM-DD')
    } else if (period === 'month') {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      startDate = formatDate(monthStart, 'YYYY-MM-DD')
      endDate = formatDate(now, 'YYYY-MM-DD')
    }

    const completedOrders = orders.filter(o =>
      o.status === 'completed' &&
      o.appointmentDate >= startDate &&
      o.appointmentDate <= endDate
    )

    const totalIncome = completedOrders.reduce((sum, o) => sum + o.payAmount, 0)
    const orderCount = completedOrders.length

    return success({
      period,
      startDate,
      endDate,
      totalIncome,
      orderCount,
      averageAmount: orderCount > 0 ? Math.round(totalIncome / orderCount) : 0
    })
  },

  // 获取订单统计
  'GET /orders/stats': (params) => {
    const { period = 'today' } = params

    // 计算各状态订单数
    const stats = {
      booking: orders.filter(o => o.status === 'booking').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    }

    return success({
      ...stats,
      total: orders.length,
      ...orderStats[period]
    })
  },

  // 提交服务点评（商家端查看点评）
  'GET /orders/:id/review': (params) => {
    const order = orders.find(o => o.id === params.id)
    if (!order) return error('订单不存在')
    if (!order.review) return error('该订单暂无点评')
    return success(order.review)
  },

  // 私领客户（将订单客户加入顾客管理）
  'POST /orders/:id/add-customer': (params) => {
    const order = orders.find(o => o.id === params.id)
    if (!order) return error('订单不存在')

    // 返回客户信息供添加到顾客管理
    return success({
      customerId: order.customerId,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerAvatar: order.customerAvatar,
      firstOrderTime: order.createTime,
      totalAmount: order.payAmount,
      orderCount: 1
    }, '已添加到顾客管理')
  }
}

export default {
  data,
  routes
}
