/**
 * 订单模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 订单列表
const orders = [
  {
    id: 'ORD20251128001',
    status: 'pending_payment', // pending_payment/confirmed/pending_use/completed/cancelled
    statusText: '待付款',
    serviceId: '1',
    serviceName: '精致剪发',
    serviceImage: '/static/service/service1.png',
    designerId: '1',
    designerName: '李天天',
    designerAvatar: '/static/avatar/avatar.png',
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    appointmentTime: '2025-11-30 14:00',
    price: 99,
    originalPrice: 128,
    couponAmount: 0,
    payAmount: 99,
    createTime: '2025-11-28 10:30',
    payDeadline: '2025-11-28 11:00',
    remark: ''
  },
  {
    id: 'ORD20251127001',
    status: 'confirmed',
    statusText: '已确认',
    serviceId: '2',
    serviceName: '时尚烫发',
    serviceImage: '/static/service/service2.png',
    designerId: '1',
    designerName: '李天天',
    designerAvatar: '/static/avatar/avatar.png',
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    appointmentTime: '2025-11-29 15:00',
    price: 399,
    originalPrice: 499,
    couponAmount: 50,
    payAmount: 349,
    createTime: '2025-11-27 16:20',
    payTime: '2025-11-27 16:25',
    remark: '希望自然一点'
  },
  {
    id: 'ORD20251125001',
    status: 'pending_use',
    statusText: '待使用',
    serviceId: '3',
    serviceName: '个性染发',
    serviceImage: '/static/service/service3.png',
    designerId: '2',
    designerName: '张小雨',
    designerAvatar: '/static/avatar/avatar.png',
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    appointmentTime: '2025-11-28 16:00',
    price: 299,
    originalPrice: 399,
    couponAmount: 0,
    payAmount: 299,
    createTime: '2025-11-25 09:15',
    payTime: '2025-11-25 09:18',
    confirmTime: '2025-11-25 10:00',
    verifyCode: '8866',
    remark: ''
  },
  {
    id: 'ORD20251122001',
    status: 'completed',
    statusText: '已完成',
    serviceId: '1',
    serviceName: '精致剪发',
    serviceImage: '/static/service/service1.png',
    designerId: '3',
    designerName: '王大明',
    designerAvatar: '/static/avatar/avatar.png',
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    appointmentTime: '2025-11-22 14:00',
    price: 99,
    originalPrice: 128,
    couponAmount: 5,
    payAmount: 94,
    createTime: '2025-11-20 11:30',
    payTime: '2025-11-20 11:32',
    confirmTime: '2025-11-20 14:00',
    completeTime: '2025-11-22 15:30',
    hasReviewed: true,
    remark: ''
  },
  {
    id: 'ORD20251118001',
    status: 'cancelled',
    statusText: '已取消',
    serviceId: '2',
    serviceName: '时尚烫发',
    serviceImage: '/static/service/service2.png',
    designerId: '1',
    designerName: '李天天',
    designerAvatar: '/static/avatar/avatar.png',
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    appointmentTime: '2025-11-20 10:00',
    price: 399,
    originalPrice: 499,
    couponAmount: 0,
    payAmount: 399,
    createTime: '2025-11-18 08:20',
    cancelTime: '2025-11-18 09:00',
    cancelReason: '临时有事',
    remark: ''
  }
]

// 订单评价
const orderReviews = {
  'ORD20251122001': {
    id: '1',
    orderId: 'ORD20251122001',
    rating: 5,
    content: '王老师技术很好，剪出来的效果很满意！店里环境也很好，下次还会来！',
    images: ['/static/review/review1.png', '/static/review/review2.png'],
    anonymous: false,
    createTime: '2025-11-22 16:00'
  }
}

// Mock 数据
export const data = {
  orders,
  orderReviews
}

// Mock 路由处理
export const routes = {
  // 获取订单列表
  'GET /api/order/list': (params) => {
    let list = [...orders]
    if (params.status && params.status !== 'all') {
      list = list.filter(o => o.status === params.status)
    }
    // 按创建时间倒序
    list.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取订单详情
  'GET /api/order/detail/:orderId': (params) => {
    const order = orders.find(o => o.id === params.orderId)
    return order ? success(order) : error('订单不存在')
  },

  // 创建订单
  'POST /api/order/create': (params) => {
    const newOrder = {
      id: 'ORD' + Date.now(),
      status: 'pending_payment',
      statusText: '待付款',
      ...params,
      createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
      payDeadline: new Date(Date.now() + 30 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19)
    }
    orders.unshift(newOrder)
    return success(newOrder)
  },

  // 取消订单
  'PUT /api/order/cancel/:orderId': (params) => {
    const order = orders.find(o => o.id === params.orderId)
    if (!order) return error('订单不存在')
    if (order.status !== 'pending_payment' && order.status !== 'confirmed') {
      return error('当前订单状态不可取消')
    }
    order.status = 'cancelled'
    order.statusText = '已取消'
    order.cancelTime = new Date().toISOString().replace('T', ' ').slice(0, 19)
    order.cancelReason = params.reason
    return success(null, '订单已取消')
  },

  // 订单支付
  'POST /api/order/pay/:orderId': (params) => {
    const order = orders.find(o => o.id === params.orderId)
    if (!order) return error('订单不存在')
    if (order.status !== 'pending_payment') {
      return error('订单状态异常')
    }
    // 模拟支付成功
    order.status = 'confirmed'
    order.statusText = '已确认'
    order.payTime = new Date().toISOString().replace('T', ' ').slice(0, 19)
    return success({
      paymentId: 'PAY' + Date.now(),
      // 返回支付参数（实际项目中返回微信/支付宝的支付参数）
      payParams: {}
    }, '支付成功')
  },

  // 确认订单完成
  'PUT /api/order/complete/:orderId': (params) => {
    const order = orders.find(o => o.id === params.orderId)
    if (!order) return error('订单不存在')
    if (order.status !== 'pending_use') {
      return error('订单状态异常')
    }
    order.status = 'completed'
    order.statusText = '已完成'
    order.completeTime = new Date().toISOString().replace('T', ' ').slice(0, 19)
    return success(null, '订单已完成')
  },

  // 提交订单评价
  'POST /api/order/review/:orderId': (params) => {
    const order = orders.find(o => o.id === params.orderId)
    if (!order) return error('订单不存在')
    if (order.status !== 'completed') {
      return error('只能评价已完成的订单')
    }
    if (order.hasReviewed) {
      return error('该订单已评价')
    }
    const review = {
      id: 'REV' + Date.now(),
      orderId: params.orderId,
      ...params,
      createTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
    }
    orderReviews[params.orderId] = review
    order.hasReviewed = true
    return success(review, '评价成功')
  },

  // 获取订单评价详情
  'GET /api/order/review/:orderId': (params) => {
    const review = orderReviews[params.orderId]
    return review ? success(review) : error('评价不存在')
  },

  // 申请退款
  'POST /api/order/refund/:orderId': (params) => {
    const order = orders.find(o => o.id === params.orderId)
    if (!order) return error('订单不存在')
    if (order.status !== 'confirmed' && order.status !== 'pending_use') {
      return error('当前订单状态不可退款')
    }
    return success({
      refundId: 'REF' + Date.now(),
      status: 'pending' // pending/approved/rejected
    }, '退款申请已提交')
  },

  // 获取订单统计
  'GET /api/order/statistics': () => {
    const stats = {
      pending_payment: orders.filter(o => o.status === 'pending_payment').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      pending_use: orders.filter(o => o.status === 'pending_use').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    }
    return success(stats)
  },

  // 再次预约
  'POST /api/order/reorder/:orderId': (params) => {
    const order = orders.find(o => o.id === params.orderId)
    if (!order) return error('订单不存在')
    return success({
      serviceId: order.serviceId,
      designerId: order.designerId
    })
  }
}

export default {
  data,
  routes
}
