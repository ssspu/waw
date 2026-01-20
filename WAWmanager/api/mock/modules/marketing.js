/**
 * 营销管理模块 Mock 数据
 * 商家端营销管理，包括优惠券、分销、会员、生日祝福等
 * 与用户端优惠券数据保持一致
 */

import { success, error, paginate, generateId, formatNow, formatDate } from '../utils.js'

// 优惠券列表 - 与用户端coupon数据对应
const coupons = [
  {
    id: 'CPN001',
    name: '新人专享券',
    type: 'fullReduction', // fullReduction/discount/free
    typeName: '满减券',
    value: 20, // 满减金额或折扣
    minAmount: 100, // 满足金额
    description: '满100减20',
    quantity: 1000, // 发放总量
    usedCount: 356, // 已使用
    receivedCount: 580, // 已领取
    startTime: '2025-01-01 00:00:00',
    endTime: '2025-12-31 23:59:59',
    applicableServices: [], // 空表示全部服务可用
    applicableServiceNames: '全部服务',
    status: 'active', // active/expired/ended
    statusText: '进行中',
    isPublic: true, // 是否公开领取
    createTime: '2025-01-01 10:00:00'
  },
  {
    id: 'CPN002',
    name: '烫染8折券',
    type: 'discount',
    typeName: '折扣券',
    value: 80, // 80折
    minAmount: 0,
    description: '烫染服务享8折',
    quantity: 500,
    usedCount: 128,
    receivedCount: 234,
    startTime: '2025-06-01 00:00:00',
    endTime: '2025-12-31 23:59:59',
    applicableServices: ['2', '3'], // 烫发、染发
    applicableServiceNames: '烫发、染发',
    status: 'active',
    statusText: '进行中',
    isPublic: true,
    createTime: '2025-06-01 10:00:00'
  },
  {
    id: 'CPN003',
    name: '会员专享50元券',
    type: 'fullReduction',
    typeName: '满减券',
    value: 50,
    minAmount: 200,
    description: '满200减50，VIP会员专享',
    quantity: 200,
    usedCount: 89,
    receivedCount: 150,
    startTime: '2025-10-01 00:00:00',
    endTime: '2025-12-31 23:59:59',
    applicableServices: [],
    applicableServiceNames: '全部服务',
    status: 'active',
    statusText: '进行中',
    isPublic: false, // 仅VIP可领
    vipOnly: true,
    createTime: '2025-10-01 10:00:00'
  },
  {
    id: 'CPN004',
    name: '双11特惠券',
    type: 'fullReduction',
    typeName: '满减券',
    value: 111,
    minAmount: 500,
    description: '满500减111',
    quantity: 100,
    usedCount: 100,
    receivedCount: 100,
    startTime: '2025-11-01 00:00:00',
    endTime: '2025-11-15 23:59:59',
    applicableServices: [],
    applicableServiceNames: '全部服务',
    status: 'ended',
    statusText: '已结束',
    isPublic: true,
    createTime: '2025-10-25 10:00:00'
  }
]

// 分销设置
const distributionSettings = {
  enabled: true,
  commissionRate: 10, // 佣金比例 %
  secondLevelRate: 5, // 二级佣金比例 %
  minWithdrawAmount: 100, // 最低提现金额
  withdrawCycle: 'weekly', // 提现周期
  description: '分享服务获得佣金，每单最高10%返佣'
}

// 分销商列表（推广员）
const distributors = [
  {
    id: 'D001',
    userId: 'U001',
    name: '王小明',
    phone: '138****8888',
    avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    level: 1,
    totalEarnings: 580.00,
    monthEarnings: 120.00,
    orderCount: 12,
    inviteCount: 3, // 邀请人数
    status: 'active',
    joinTime: '2025-08-15 10:00:00'
  },
  {
    id: 'D002',
    userId: 'U003',
    name: '张小花',
    phone: '137****7777',
    avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    level: 1,
    totalEarnings: 320.00,
    monthEarnings: 80.00,
    orderCount: 8,
    inviteCount: 1,
    status: 'active',
    joinTime: '2025-09-20 10:00:00'
  }
]

// 推广佣金记录
const commissionRecords = [
  {
    id: 'CM001',
    distributorId: 'D001',
    distributorName: '王小明',
    orderId: 'ORD20251211001',
    orderAmount: 94.00,
    commissionRate: 10,
    commissionAmount: 9.40,
    customerName: '新用户A',
    serviceName: '精致剪发',
    status: 'settled', // pending/settled/cancelled
    statusText: '已结算',
    orderTime: '2025-12-11 15:00:00',
    settleTime: '2025-12-12 10:00:00'
  },
  {
    id: 'CM002',
    distributorId: 'D001',
    distributorName: '王小明',
    orderId: 'ORD20251210001',
    orderAmount: 199.00,
    commissionRate: 10,
    commissionAmount: 19.90,
    customerName: '新用户B',
    serviceName: '深度护理',
    status: 'settled',
    statusText: '已结算',
    orderTime: '2025-12-10 11:10:00',
    settleTime: '2025-12-11 10:00:00'
  }
]

// 推广支出明细
const promotionExpenses = [
  {
    id: 'PE001',
    type: 'commission',
    typeName: '分销佣金',
    amount: 9.40,
    distributorName: '王小明',
    orderId: 'ORD20251211001',
    time: '2025-12-12 10:00:00'
  },
  {
    id: 'PE002',
    type: 'commission',
    typeName: '分销佣金',
    amount: 19.90,
    distributorName: '王小明',
    orderId: 'ORD20251210001',
    time: '2025-12-11 10:00:00'
  },
  {
    id: 'PE003',
    type: 'reward',
    typeName: '推广奖励',
    amount: 50.00,
    distributorName: '张小花',
    description: '邀请新用户奖励',
    time: '2025-12-08 10:00:00'
  }
]

// 生日客户列表
const birthdayCustomers = [
  {
    id: 'BC001',
    customerId: 'C003',
    name: '张小花',
    phone: '137****7777',
    avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    birthday: '12-25',
    birthdayFull: '1995-12-25',
    age: 30,
    daysUntilBirthday: 12,
    isVip: true,
    lastVisit: '2025-12-13',
    totalSpent: 1890,
    hasWished: false
  }
]

// 生日祝福记录
const birthdayWishRecords = [
  {
    id: 'BW001',
    customerId: 'C001',
    customerName: '王小明',
    message: '亲爱的王小明，祝您生日快乐！感谢您一直以来的支持，为您准备了专属优惠，快来体验吧！',
    couponId: 'CPN001',
    couponName: '新人专享券',
    sendTime: '2025-03-15 09:00:00',
    isRead: true
  }
]

// Mock 数据
export const data = {
  coupons,
  distributionSettings,
  distributors,
  commissionRecords,
  promotionExpenses,
  birthdayCustomers,
  birthdayWishRecords
}

// Mock 路由处理
export const routes = {
  // ========== 优惠券管理 ==========

  // 获取优惠券列表
  'GET /marketing/coupons': (params) => {
    let list = [...coupons]

    // 按状态筛选
    if (params.status) {
      list = list.filter(c => c.status === params.status)
    }

    // 按类型筛选
    if (params.type) {
      list = list.filter(c => c.type === params.type)
    }

    // 按创建时间倒序
    list.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取优惠券详情
  'GET /marketing/coupons/:id': (params) => {
    const coupon = coupons.find(c => c.id === params.id)
    return coupon ? success(coupon) : error('优惠券不存在')
  },

  // 创建优惠券
  'POST /marketing/coupons': (params) => {
    const newCoupon = {
      id: generateId('CPN'),
      ...params,
      usedCount: 0,
      receivedCount: 0,
      status: 'active',
      statusText: '进行中',
      createTime: formatNow()
    }
    coupons.unshift(newCoupon)
    return success(newCoupon, '创建成功')
  },

  // 更新优惠券
  'PUT /marketing/coupons/:id': (params) => {
    const coupon = coupons.find(c => c.id === params.id)
    if (!coupon) return error('优惠券不存在')
    Object.assign(coupon, params)
    return success(coupon, '更新成功')
  },

  // 删除优惠券
  'DELETE /marketing/coupons/:id': (params) => {
    const index = coupons.findIndex(c => c.id === params.id)
    if (index === -1) return error('优惠券不存在')
    coupons.splice(index, 1)
    return success(null, '删除成功')
  },

  // 结束优惠券活动
  'POST /marketing/coupons/:id/end': (params) => {
    const coupon = coupons.find(c => c.id === params.id)
    if (!coupon) return error('优惠券不存在')
    coupon.status = 'ended'
    coupon.statusText = '已结束'
    coupon.endTime = formatNow()
    return success(coupon, '活动已结束')
  },

  // ========== 分销管理 ==========

  // 获取分销设置
  'GET /marketing/distribution/settings': () => {
    return success(distributionSettings)
  },

  // 更新分销设置
  'PUT /marketing/distribution/settings': (params) => {
    Object.assign(distributionSettings, params)
    return success(distributionSettings, '设置已更新')
  },

  // 获取分销商列表
  'GET /marketing/distributors': (params) => {
    let list = [...distributors]

    if (params.status) {
      list = list.filter(d => d.status === params.status)
    }

    if (params.keyword) {
      list = list.filter(d =>
        d.name.includes(params.keyword) ||
        d.phone.includes(params.keyword)
      )
    }

    // 按收益倒序
    list.sort((a, b) => b.totalEarnings - a.totalEarnings)

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取推广佣金统计
  'GET /marketing/commission': (params) => {
    const { period = 'month' } = params

    const totalCommission = commissionRecords
      .filter(r => r.status === 'settled')
      .reduce((sum, r) => sum + r.commissionAmount, 0)

    return success({
      totalCommission,
      pendingCommission: commissionRecords
        .filter(r => r.status === 'pending')
        .reduce((sum, r) => sum + r.commissionAmount, 0),
      totalOrders: commissionRecords.length,
      distributorCount: distributors.length,
      records: commissionRecords.slice(0, 10)
    })
  },

  // 获取推广支出明细
  'GET /marketing/expense': (params) => {
    let list = [...promotionExpenses]

    if (params.type) {
      list = list.filter(e => e.type === params.type)
    }

    list.sort((a, b) => new Date(b.time) - new Date(a.time))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // ========== 生日祝福 ==========

  // 获取生日祝福客户
  'GET /marketing/birthday-wish': (params) => {
    let list = [...birthdayCustomers]

    // 按即将过生日排序
    list.sort((a, b) => a.daysUntilBirthday - b.daysUntilBirthday)

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 发送生日祝福
  'POST /marketing/birthday-wish/:customerId': (params) => {
    const customer = birthdayCustomers.find(c => c.customerId === params.customerId)
    if (!customer) return error('客户不存在')

    const wishRecord = {
      id: generateId('BW'),
      customerId: params.customerId,
      customerName: customer.name,
      message: params.message || '祝您生日快乐！',
      couponId: params.couponId,
      couponName: params.couponName,
      sendTime: formatNow(),
      isRead: false
    }

    birthdayWishRecords.unshift(wishRecord)
    customer.hasWished = true

    return success(wishRecord, '祝福发送成功')
  },

  // ========== 会员管理 ==========

  // 同步会员数据
  'POST /marketing/member-sync': () => {
    return success({
      syncTime: formatNow(),
      totalMembers: 156,
      newMembers: 12,
      upgradedMembers: 5
    }, '同步成功')
  },

  // 获取营销统计
  'GET /marketing/stats': () => {
    return success({
      couponStats: {
        total: coupons.length,
        active: coupons.filter(c => c.status === 'active').length,
        totalIssued: coupons.reduce((sum, c) => sum + c.receivedCount, 0),
        totalUsed: coupons.reduce((sum, c) => sum + c.usedCount, 0)
      },
      distributionStats: {
        enabled: distributionSettings.enabled,
        distributorCount: distributors.length,
        totalCommission: commissionRecords
          .filter(r => r.status === 'settled')
          .reduce((sum, r) => sum + r.commissionAmount, 0),
        monthCommission: 120.00
      },
      birthdayStats: {
        upcomingCount: birthdayCustomers.length,
        wishedCount: birthdayCustomers.filter(c => c.hasWished).length
      }
    })
  }
}

export default {
  data,
  routes
}
