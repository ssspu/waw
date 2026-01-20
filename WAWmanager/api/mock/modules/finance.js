/**
 * 财务管理模块 Mock 数据
 * 商家端财务管理，包括余额、收入、提现、银行卡等
 */

import { success, error, paginate, generateId, formatNow, formatDate, randomInt } from '../utils.js'

// 资产概览
const assets = {
  availableBalance: 12580.00, // 可用余额
  frozenBalance: 2000.00, // 冻结余额（提现中）
  totalBalance: 14580.00, // 总余额
  totalIncome: 158600.00, // 累计收入
  totalWithdraw: 146020.00, // 累计提现
  points: 2680, // 积分
  // 今日数据
  todayIncome: 1280.00,
  todayOrderCount: 8,
  // 本月数据
  monthIncome: 28560.00,
  monthOrderCount: 156
}

// 余额明细
const balanceDetails = [
  {
    id: 'BD001',
    type: 'income',
    typeName: '订单收入',
    amount: 99.00,
    balance: 12580.00,
    orderId: 'ORD20251213001',
    description: '精致剪发 - 王小明',
    time: '2025-12-13 15:00:00'
  },
  {
    id: 'BD002',
    type: 'income',
    typeName: '订单收入',
    amount: 349.00,
    balance: 12481.00,
    orderId: 'ORD20251213002',
    description: '时尚烫发 - 李小红',
    time: '2025-12-13 12:00:00'
  },
  {
    id: 'BD003',
    type: 'withdraw',
    typeName: '提现',
    amount: -2000.00,
    balance: 12132.00,
    withdrawId: 'WD001',
    description: '提现到建设银行',
    status: 'pending',
    time: '2025-12-12 18:00:00'
  },
  {
    id: 'BD004',
    type: 'income',
    typeName: '订单收入',
    amount: 299.00,
    balance: 14132.00,
    orderId: 'ORD20251212001',
    description: '个性染发 - 张小花',
    time: '2025-12-12 16:30:00'
  },
  {
    id: 'BD005',
    type: 'commission',
    typeName: '分销佣金',
    amount: 50.00,
    balance: 13833.00,
    description: '用户王小明分享成交',
    time: '2025-12-11 20:00:00'
  },
  {
    id: 'BD006',
    type: 'income',
    typeName: '订单收入',
    amount: 94.00,
    balance: 13783.00,
    orderId: 'ORD20251211001',
    description: '精致剪发 - 王小明',
    time: '2025-12-11 15:00:00'
  },
  {
    id: 'BD007',
    type: 'withdraw',
    typeName: '提现',
    amount: -5000.00,
    balance: 13689.00,
    withdrawId: 'WD002',
    description: '提现到建设银行',
    status: 'completed',
    time: '2025-12-10 10:00:00'
  }
]

// 收入明细
const incomeDetails = [
  {
    id: 'IN001',
    type: 'order',
    typeName: '订单收入',
    amount: 99.00,
    orderId: 'ORD20251213001',
    serviceName: '精致剪发',
    customerName: '王小明',
    designerName: '李天天',
    time: '2025-12-13 15:00:00'
  },
  {
    id: 'IN002',
    type: 'order',
    typeName: '订单收入',
    amount: 349.00,
    orderId: 'ORD20251213002',
    serviceName: '时尚烫发',
    customerName: '李小红',
    designerName: '张小雨',
    time: '2025-12-13 12:00:00'
  },
  {
    id: 'IN003',
    type: 'commission',
    typeName: '分销佣金',
    amount: 50.00,
    fromUser: '王小明',
    description: '分享成交奖励',
    time: '2025-12-11 20:00:00'
  },
  {
    id: 'IN004',
    type: 'order',
    typeName: '订单收入',
    amount: 299.00,
    orderId: 'ORD20251212001',
    serviceName: '个性染发',
    customerName: '张小花',
    designerName: '李天天',
    time: '2025-12-12 16:30:00'
  },
  {
    id: 'IN005',
    type: 'promotion',
    typeName: '推广奖励',
    amount: 100.00,
    description: '平台活动奖励',
    time: '2025-12-10 12:00:00'
  }
]

// 交易记录（综合）
const transactions = [
  ...balanceDetails.map(d => ({
    id: d.id,
    type: d.type,
    typeName: d.typeName,
    amount: d.amount,
    description: d.description,
    status: d.status || 'completed',
    time: d.time
  }))
]

// 提现记录
const withdrawRecords = [
  {
    id: 'WD001',
    amount: 2000.00,
    fee: 0,
    actualAmount: 2000.00,
    bankCardId: 'BC001',
    bankName: '中国建设银行',
    cardNumber: '**** **** **** 6789',
    status: 'pending', // pending/processing/completed/failed
    statusText: '处理中',
    applyTime: '2025-12-12 18:00:00',
    expectedTime: '2025-12-14 18:00:00'
  },
  {
    id: 'WD002',
    amount: 5000.00,
    fee: 0,
    actualAmount: 5000.00,
    bankCardId: 'BC001',
    bankName: '中国建设银行',
    cardNumber: '**** **** **** 6789',
    status: 'completed',
    statusText: '已完成',
    applyTime: '2025-12-10 10:00:00',
    completeTime: '2025-12-10 15:00:00'
  },
  {
    id: 'WD003',
    amount: 3000.00,
    fee: 0,
    actualAmount: 3000.00,
    bankCardId: 'BC002',
    bankName: '中国工商银行',
    cardNumber: '**** **** **** 1234',
    status: 'completed',
    statusText: '已完成',
    applyTime: '2025-12-05 14:00:00',
    completeTime: '2025-12-05 18:00:00'
  }
]

// 银行卡列表
const bankCards = [
  {
    id: 'BC001',
    bankName: '中国建设银行',
    bankCode: 'CCB',
    cardNumber: '6217 0012 3456 6789',
    cardNumberMask: '**** **** **** 6789',
    cardType: 'debit', // debit/credit
    cardTypeName: '储蓄卡',
    holderName: '张*龙',
    phone: '138****8888',
    isDefault: true,
    createTime: '2024-06-15 10:00:00'
  },
  {
    id: 'BC002',
    bankName: '中国工商银行',
    bankCode: 'ICBC',
    cardNumber: '6222 0234 5678 1234',
    cardNumberMask: '**** **** **** 1234',
    cardType: 'debit',
    cardTypeName: '储蓄卡',
    holderName: '张*龙',
    phone: '138****8888',
    isDefault: false,
    createTime: '2024-08-20 10:00:00'
  }
]

// 积分明细
const pointsDetails = [
  {
    id: 'PT001',
    type: 'earn',
    typeName: '获得积分',
    amount: 100,
    balance: 2680,
    description: '完成订单奖励',
    orderId: 'ORD20251213001',
    time: '2025-12-13 15:00:00'
  },
  {
    id: 'PT002',
    type: 'earn',
    typeName: '获得积分',
    amount: 50,
    balance: 2580,
    description: '好评奖励',
    time: '2025-12-11 16:30:00'
  },
  {
    id: 'PT003',
    type: 'spend',
    typeName: '消耗积分',
    amount: -200,
    balance: 2530,
    description: '兑换优惠券',
    time: '2025-12-08 10:00:00'
  }
]

// Mock 数据
export const data = {
  assets,
  balanceDetails,
  incomeDetails,
  transactions,
  withdrawRecords,
  bankCards,
  pointsDetails
}

// Mock 路由处理
export const routes = {
  // 获取资产概览
  'GET /finance/assets': () => {
    return success(assets)
  },

  // 获取余额
  'GET /finance/balance': () => {
    return success({
      availableBalance: assets.availableBalance,
      frozenBalance: assets.frozenBalance,
      totalBalance: assets.totalBalance
    })
  },

  // 获取余额明细
  'GET /finance/balance/detail': (params) => {
    let list = [...balanceDetails]

    // 按类型筛选
    if (params.type) {
      list = list.filter(d => d.type === params.type)
    }

    // 按日期范围筛选
    if (params.startDate && params.endDate) {
      list = list.filter(d => {
        const date = d.time.split(' ')[0]
        return date >= params.startDate && date <= params.endDate
      })
    }

    // 按时间倒序
    list.sort((a, b) => new Date(b.time) - new Date(a.time))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 提现申请
  'POST /finance/withdraw': (params) => {
    const { amount, bankCardId } = params

    if (!amount || amount <= 0) {
      return error('请输入正确的提现金额')
    }
    if (amount > assets.availableBalance) {
      return error('可用余额不足')
    }

    const bankCard = bankCards.find(c => c.id === bankCardId)
    if (!bankCard) {
      return error('请选择银行卡')
    }

    const newWithdraw = {
      id: generateId('WD'),
      amount,
      fee: 0,
      actualAmount: amount,
      bankCardId,
      bankName: bankCard.bankName,
      cardNumber: bankCard.cardNumberMask,
      status: 'pending',
      statusText: '处理中',
      applyTime: formatNow(),
      expectedTime: formatDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD HH:mm:ss')
    }

    withdrawRecords.unshift(newWithdraw)

    // 更新余额
    assets.availableBalance -= amount
    assets.frozenBalance += amount

    // 添加余额明细
    balanceDetails.unshift({
      id: generateId('BD'),
      type: 'withdraw',
      typeName: '提现',
      amount: -amount,
      balance: assets.availableBalance,
      withdrawId: newWithdraw.id,
      description: `提现到${bankCard.bankName}`,
      status: 'pending',
      time: formatNow()
    })

    return success(newWithdraw, '提现申请已提交')
  },

  // 充值（测试用）
  'POST /finance/recharge': (params) => {
    const { amount } = params
    if (!amount || amount <= 0) {
      return error('请输入正确的充值金额')
    }

    assets.availableBalance += amount
    assets.totalBalance += amount

    balanceDetails.unshift({
      id: generateId('BD'),
      type: 'recharge',
      typeName: '充值',
      amount: amount,
      balance: assets.availableBalance,
      description: '余额充值',
      time: formatNow()
    })

    return success({ balance: assets.availableBalance }, '充值成功')
  },

  // 获取银行卡列表
  'GET /finance/bank-cards': () => {
    return success(bankCards)
  },

  // 添加银行卡
  'POST /finance/bank-cards': (params) => {
    const newCard = {
      id: generateId('BC'),
      ...params,
      cardNumberMask: '**** **** **** ' + params.cardNumber.slice(-4),
      isDefault: bankCards.length === 0,
      createTime: formatNow()
    }
    bankCards.push(newCard)
    return success(newCard, '添加成功')
  },

  // 获取银行卡详情
  'GET /finance/bank-cards/:id': (params) => {
    const card = bankCards.find(c => c.id === params.id)
    return card ? success(card) : error('银行卡不存在')
  },

  // 删除银行卡
  'POST /finance/bank-cards/:id/delete': (params) => {
    const index = bankCards.findIndex(c => c.id === params.id)
    if (index === -1) return error('银行卡不存在')
    if (bankCards[index].isDefault && bankCards.length > 1) {
      return error('请先设置其他银行卡为默认卡')
    }
    bankCards.splice(index, 1)
    return success(null, '删除成功')
  },

  // 设置默认银行卡
  'PUT /finance/bank-cards/:id/default': (params) => {
    const card = bankCards.find(c => c.id === params.id)
    if (!card) return error('银行卡不存在')

    // 取消其他卡的默认状态
    bankCards.forEach(c => c.isDefault = false)
    card.isDefault = true

    return success(card, '设置成功')
  },

  // 获取收入明细
  'GET /finance/income': (params) => {
    let list = [...incomeDetails]

    // 按类型筛选
    if (params.type) {
      list = list.filter(d => d.type === params.type)
    }

    // 按日期范围筛选
    if (params.startDate && params.endDate) {
      list = list.filter(d => {
        const date = d.time.split(' ')[0]
        return date >= params.startDate && date <= params.endDate
      })
    }

    list.sort((a, b) => new Date(b.time) - new Date(a.time))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取交易明细
  'GET /finance/transactions': (params) => {
    let list = [...transactions]

    if (params.type) {
      list = list.filter(t => t.type === params.type)
    }

    list.sort((a, b) => new Date(b.time) - new Date(a.time))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 余额转账
  'POST /finance/transfer': (params) => {
    const { toAccount, amount, note } = params

    if (!toAccount) return error('请输入收款账号')
    if (!amount || amount <= 0) return error('请输入正确的转账金额')
    if (amount > assets.availableBalance) return error('可用余额不足')

    assets.availableBalance -= amount
    assets.totalBalance -= amount

    balanceDetails.unshift({
      id: generateId('BD'),
      type: 'transfer',
      typeName: '转账',
      amount: -amount,
      balance: assets.availableBalance,
      description: `转账到${toAccount}${note ? ' - ' + note : ''}`,
      time: formatNow()
    })

    return success({ balance: assets.availableBalance }, '转账成功')
  },

  // 获取积分
  'GET /finance/points': () => {
    return success({
      points: assets.points,
      totalEarned: 5000,
      totalSpent: 2320
    })
  },

  // 获取积分明细
  'GET /finance/points/detail': (params) => {
    let list = [...pointsDetails]

    if (params.type) {
      list = list.filter(p => p.type === params.type)
    }

    list.sort((a, b) => new Date(b.time) - new Date(a.time))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取提现记录
  'GET /finance/withdraw/records': (params) => {
    let list = [...withdrawRecords]

    if (params.status) {
      list = list.filter(w => w.status === params.status)
    }

    list.sort((a, b) => new Date(b.applyTime) - new Date(a.applyTime))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  }
}

export default {
  data,
  routes
}
