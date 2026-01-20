/**
 * 优惠券模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 用户优惠券列表
const userCoupons = [
  {
    id: '1',
    name: '新人专享券',
    type: 'discount', // discount/cash/full_reduction
    value: 10, // 折扣为百分比，现金为金额
    minAmount: 0,
    maxDiscount: 50,
    status: 'available', // available/used/expired
    startTime: '2025-11-01',
    endTime: '2025-12-31',
    description: '全场通用，新用户专享9折优惠',
    useScope: 'all', // all/brand/designer/service
    scopeIds: [],
    receiveTime: '2025-11-10 10:00'
  },
  {
    id: '2',
    name: '满100减10',
    type: 'full_reduction',
    value: 10,
    minAmount: 100,
    maxDiscount: null,
    status: 'available',
    startTime: '2025-11-15',
    endTime: '2025-12-15',
    description: '订单满100元可用',
    useScope: 'all',
    scopeIds: [],
    receiveTime: '2025-11-15 14:30'
  },
  {
    id: '3',
    name: '50元现金券',
    type: 'cash',
    value: 50,
    minAmount: 200,
    maxDiscount: null,
    status: 'available',
    startTime: '2025-11-20',
    endTime: '2025-11-30',
    description: '订单满200元可用，指定品牌馆可用',
    useScope: 'brand',
    scopeIds: ['1'],
    receiveTime: '2025-11-20 09:00'
  },
  {
    id: '4',
    name: '会员专享券',
    type: 'discount',
    value: 15,
    minAmount: 0,
    maxDiscount: 100,
    status: 'used',
    startTime: '2025-10-01',
    endTime: '2025-11-30',
    description: '会员专享8.5折优惠',
    useScope: 'all',
    scopeIds: [],
    receiveTime: '2025-10-05 16:00',
    useTime: '2025-11-22 14:30',
    useOrderId: 'ORD20251122001'
  },
  {
    id: '5',
    name: '过期券示例',
    type: 'cash',
    value: 20,
    minAmount: 50,
    maxDiscount: null,
    status: 'expired',
    startTime: '2025-10-01',
    endTime: '2025-10-31',
    description: '已过期',
    useScope: 'all',
    scopeIds: [],
    receiveTime: '2025-10-01 10:00'
  }
]

// 可领取的优惠券
const receivableCoupons = [
  {
    id: '101',
    name: '限时优惠券',
    type: 'full_reduction',
    value: 20,
    minAmount: 150,
    maxDiscount: null,
    startTime: '2025-11-28',
    endTime: '2025-12-31',
    description: '限时领取，订单满150元可用',
    useScope: 'all',
    scopeIds: [],
    totalCount: 1000,
    remainCount: 356,
    limitPerUser: 1,
    received: false
  },
  {
    id: '102',
    name: '品牌馆专属券',
    type: 'cash',
    value: 30,
    minAmount: 200,
    maxDiscount: null,
    startTime: '2025-11-28',
    endTime: '2025-12-15',
    description: '指定品牌馆使用',
    useScope: 'brand',
    scopeIds: ['1', '2'],
    totalCount: 500,
    remainCount: 128,
    limitPerUser: 1,
    received: false
  },
  {
    id: '103',
    name: '设计师新人券',
    type: 'discount',
    value: 20,
    minAmount: 0,
    maxDiscount: 80,
    startTime: '2025-11-28',
    endTime: '2025-12-31',
    description: '首次预约设计师8折',
    useScope: 'designer',
    scopeIds: [],
    totalCount: 2000,
    remainCount: 1500,
    limitPerUser: 1,
    received: true
  }
]

// Mock 数据
export const data = {
  userCoupons,
  receivableCoupons
}

// Mock 路由处理
export const routes = {
  // 获取用户优惠券列表
  'GET /api/coupon/list': (params) => {
    let list = [...userCoupons]
    if (params.status) {
      list = list.filter(c => c.status === params.status)
    }
    // 按领取时间倒序
    list.sort((a, b) => new Date(b.receiveTime) - new Date(a.receiveTime))
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取可用优惠券列表（下单时使用）
  'GET /api/coupon/available': (params) => {
    const { serviceId, designerId, amount } = params
    let list = userCoupons.filter(c => {
      if (c.status !== 'available') return false
      if (amount && c.minAmount > amount) return false
      // 怣查使用范围（瀮化处理）
      return true
    })
    return success(list)
  },

  // 获取优惠券详情
  'GET /api/coupon/detail/:couponId': (params) => {
    const coupon = userCoupons.find(c => c.id === params.couponId) ||
                   receivableCoupons.find(c => c.id === params.couponId)
    return coupon ? success(coupon) : error('优惠券不存在')
  },

  // 领取优惠券
  'POST /api/coupon/receive/:couponId': (params) => {
    const coupon = receivableCoupons.find(c => c.id === params.couponId)
    if (!coupon) return error('优惠券不存在')
    if (coupon.received) return error('您已领取过该优惠券')
    if (coupon.remainCount <= 0) return error('优惠券已被领完')

    // 添加到用户优惠券
    const newCoupon = {
      ...coupon,
      id: 'UC' + Date.now(),
      status: 'available',
      receiveTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
    }
    userCoupons.unshift(newCoupon)
    coupon.received = true
    coupon.remainCount--

    return success(newCoupon, '领取成功')
  },

  // 通过兑换码领取优惠券
  'POST /api/coupon/exchange': (params) => {
    const { code } = params
    if (!code) return error('请输入兑换码')
    // 模拟兑换码验证
    if (code === 'WAW2025') {
      const newCoupon = {
        id: 'UC' + Date.now(),
        name: '兑换码专享券',
        type: 'cash',
        value: 100,
        minAmount: 300,
        status: 'available',
        startTime: '2025-11-28',
        endTime: '2025-12-31',
        description: '兑换码专享优惠',
        useScope: 'all',
        scopeIds: [],
        receiveTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
      }
      userCoupons.unshift(newCoupon)
      return success(newCoupon, '兑换成功')
    }
    return error('兑换码无效或已过期')
  },

  // 获取可领取的优惠券列表
  'GET /api/coupon/receivable': (params) => {
    return success(paginate(receivableCoupons, params.page, params.pageSize))
  },

  // 获取优惠券使用规则
  'GET /api/coupon/rules/:couponId': (params) => {
    return success({
      rules: [
        '1. 优惠券在有效期内可使用，过期作废',
        '2. 每张优惠券限使用一次，不可叠加',
        '3. 优惠券不可兑换现金，不找零',
        '4. 退款时优惠券将按比例扣除',
        '5. 怜终解释权归平台所有'
      ]
    })
  },

  // 获取优惠券统计
  'GET /api/coupon/statistics': () => {
    const stats = {
      available: userCoupons.filter(c => c.status === 'available').length,
      used: userCoupons.filter(c => c.status === 'used').length,
      expired: userCoupons.filter(c => c.status === 'expired').length
    }
    return success(stats)
  }
}

export default {
  data,
  routes
}
