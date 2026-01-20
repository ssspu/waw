/**
 * 代理系统模块 Mock 数据
 * 商家端代理/推广系统
 */

import { success, error, paginate, generateId, formatNow } from '../utils.js'

// 代理奖励数据
const agentReward = {
  totalReward: 2580.00, // 累计奖励
  monthReward: 580.00, // 本月奖励
  pendingReward: 120.00, // 待结算
  withdrawnReward: 2460.00, // 已提现
  level: 2, // 代理等级
  levelName: '银牌代理',
  nextLevel: '金牌代理',
  nextLevelRequire: 5000.00, // 升级所需金额
  progress: 51.6 // 升级进度 %
}

// 平台奖励数据
const platformReward = {
  totalReward: 500.00,
  availableReward: 300.00,
  usedReward: 200.00,
  rewards: [
    {
      id: 'PR001',
      type: 'activity',
      typeName: '活动奖励',
      amount: 100.00,
      description: '双11活动参与奖励',
      status: 'received',
      time: '2025-11-15 10:00:00'
    },
    {
      id: 'PR002',
      type: 'performance',
      typeName: '业绩奖励',
      amount: 200.00,
      description: '月度业绩达标奖励',
      status: 'received',
      time: '2025-12-01 10:00:00'
    },
    {
      id: 'PR003',
      type: 'invite',
      typeName: '邀请奖励',
      amount: 200.00,
      description: '邀请新商家入驻奖励',
      status: 'pending',
      time: '2025-12-10 10:00:00'
    }
  ]
}

// 代理结算记录
const settlementRecords = [
  {
    id: 'AS001',
    period: '2025年12月上半月',
    startDate: '2025-12-01',
    endDate: '2025-12-15',
    orderCount: 25,
    orderAmount: 5800.00,
    commissionRate: 10,
    commissionAmount: 580.00,
    status: 'settled', // pending/settled/paid
    statusText: '已结算',
    settleTime: '2025-12-16 10:00:00'
  },
  {
    id: 'AS002',
    period: '2025年11月下半月',
    startDate: '2025-11-16',
    endDate: '2025-11-30',
    orderCount: 32,
    orderAmount: 6500.00,
    commissionRate: 10,
    commissionAmount: 650.00,
    status: 'paid',
    statusText: '已打款',
    settleTime: '2025-12-01 10:00:00',
    paidTime: '2025-12-02 10:00:00'
  }
]

// 代理支付方式
const agentPayment = {
  type: 'bankCard', // bankCard/wechat/alipay
  bankName: '中国建设银行',
  cardNumber: '**** **** **** 6789',
  holderName: '张*龙',
  phone: '138****8888'
}

// 佣金进度
const commissionProgress = {
  currentMonth: {
    target: 10000.00,
    achieved: 5800.00,
    progress: 58,
    orders: 45,
    commission: 580.00
  },
  lastMonth: {
    target: 10000.00,
    achieved: 8500.00,
    progress: 85,
    orders: 68,
    commission: 850.00
  }
}

// 佣金明细
const commissionDetails = [
  {
    id: 'CD001',
    orderId: 'ORD20251213001',
    orderAmount: 99.00,
    commissionRate: 10,
    commissionAmount: 9.90,
    customerName: '王小明',
    serviceName: '精致剪发',
    status: 'pending',
    time: '2025-12-13 15:00:00'
  },
  {
    id: 'CD002',
    orderId: 'ORD20251212001',
    orderAmount: 299.00,
    commissionRate: 10,
    commissionAmount: 29.90,
    customerName: '张小花',
    serviceName: '个性染发',
    status: 'settled',
    time: '2025-12-12 16:30:00'
  },
  {
    id: 'CD003',
    orderId: 'ORD20251211001',
    orderAmount: 94.00,
    commissionRate: 10,
    commissionAmount: 9.40,
    customerName: '王小明',
    serviceName: '精致剪发',
    status: 'settled',
    time: '2025-12-11 15:00:00'
  }
]

// Mock 数据
export const data = {
  agentReward,
  platformReward,
  settlementRecords,
  agentPayment,
  commissionProgress,
  commissionDetails
}

// Mock 路由处理
export const routes = {
  // 获取代理奖励
  'GET /agent/reward': () => {
    return success(agentReward)
  },

  // 获取平台奖励
  'GET /agent/platform-reward': (params) => {
    let rewards = [...platformReward.rewards]

    if (params.status) {
      rewards = rewards.filter(r => r.status === params.status)
    }

    return success({
      ...platformReward,
      rewards: paginate(rewards, params.page || 1, params.pageSize || 20)
    })
  },

  // 激活代理账号
  'POST /agent/activate': (params) => {
    return success({
      activated: true,
      level: 1,
      levelName: '初级代理',
      activateTime: formatNow()
    }, '代理账号已激活')
  },

  // 提交代理身份认证
  'POST /agent/identity': (params) => {
    return success({
      status: 'pending',
      submitTime: formatNow()
    }, '身份认证已提交，请等待审核')
  },

  // 获取代理结算记录
  'GET /agent/settlement': (params) => {
    let list = [...settlementRecords]

    if (params.status) {
      list = list.filter(s => s.status === params.status)
    }

    list.sort((a, b) => new Date(b.settleTime) - new Date(a.settleTime))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取代理支付方式
  'GET /agent/payment': () => {
    return success(agentPayment)
  },

  // 更新代理支付方式
  'PUT /agent/payment': (params) => {
    Object.assign(agentPayment, params)
    return success(agentPayment, '支付方式已更新')
  },

  // 获取代理佣金进度
  'GET /agent/progress': (params) => {
    const { period = 'current' } = params
    return success(period === 'current' ? commissionProgress.currentMonth : commissionProgress.lastMonth)
  },

  // 设置佣金分享
  'POST /agent/share': (params) => {
    return success({
      shareUrl: 'https://waw.com/share/' + generateId(''),
      qrcodeUrl: 'https://api.waw.com/qrcode/share/' + generateId('')
    }, '分享链接已生成')
  },

  // 代理注册
  'POST /agent/register': (params) => {
    return success({
      agentId: generateId('AG'),
      status: 'pending',
      registerTime: formatNow()
    }, '注册申请已提交')
  },

  // 佣金明细
  'GET /agent/commission': (params) => {
    let list = [...commissionDetails]

    if (params.status) {
      list = list.filter(c => c.status === params.status)
    }

    list.sort((a, b) => new Date(b.time) - new Date(a.time))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 提取佣金
  'POST /agent/withdraw': (params) => {
    const { amount } = params

    if (!amount || amount <= 0) {
      return error('请输入正确的提现金额')
    }
    if (amount > agentReward.pendingReward) {
      return error('可提现金额不足')
    }

    agentReward.pendingReward -= amount
    agentReward.withdrawnReward += amount

    return success({
      withdrawId: generateId('AW'),
      amount,
      status: 'pending',
      applyTime: formatNow()
    }, '提现申请已提交')
  }
}

export default {
  data,
  routes
}
