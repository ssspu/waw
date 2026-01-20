/**
 * 顾客管理模块 Mock 数据
 * 商家端顾客管理，对应用户端的用户数据
 */

import { success, error, paginate, generateId, formatNow, formatDate, randomInt } from '../utils.js'

// 顾客列表 - 商家视角的用户
const customers = [
  {
    id: 'C001',
    userId: 'U001', // 对应用户端用户ID
    name: '王小明',
    phone: '13888888888',
    avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    gender: 'M',
    age: 28,
    birthday: '1997-03-15',
    occupation: '程序员',
    preferences: '喜欢干净利落的发型',
    email: 'wangxiaoming@example.com',
    notes: '头发比较硬，喜欢打薄',
    isVip: true,
    vipLevel: 2,
    // 消费统计
    totalBookings: 12,
    totalSpent: 2580,
    averagePrice: 215,
    lastVisit: '2025-12-11',
    firstVisit: '2024-06-15',
    // 分类
    type: 'old', // new/old
    tags: ['常客', 'VIP'],
    // 时间
    createTime: '2024-06-15 14:00:00'
  },
  {
    id: 'C002',
    userId: 'U002',
    name: '李小红',
    phone: '13999999999',
    avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    gender: 'F',
    age: 25,
    birthday: '2000-07-22',
    occupation: '设计师',
    preferences: '喜欢时尚潮流的发型',
    email: 'lixiaohong@example.com',
    notes: '发质较细软',
    isVip: false,
    vipLevel: 0,
    totalBookings: 1,
    totalSpent: 349,
    averagePrice: 349,
    lastVisit: '2025-12-13',
    firstVisit: '2025-12-13',
    type: 'new',
    tags: ['新客'],
    createTime: '2025-12-13 09:15:00'
  },
  {
    id: 'C003',
    userId: 'U003',
    name: '张小花',
    phone: '13777777777',
    avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    gender: 'F',
    age: 30,
    birthday: '1995-12-25',
    occupation: '教师',
    preferences: '自然优雅的风格',
    email: 'zhangxiaohua@example.com',
    notes: '对染发剂过敏，需要做皮试',
    isVip: true,
    vipLevel: 1,
    totalBookings: 8,
    totalSpent: 1890,
    averagePrice: 236,
    lastVisit: '2025-12-13',
    firstVisit: '2024-09-10',
    type: 'old',
    tags: ['常客', '过敏体质'],
    createTime: '2024-09-10 10:00:00'
  },
  {
    id: 'C004',
    userId: 'U004',
    name: '赵小明',
    phone: '13666666666',
    avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    gender: 'M',
    age: 35,
    birthday: '1990-01-08',
    occupation: '企业高管',
    preferences: '商务精英风格',
    email: 'zhaoxiaoming@example.com',
    notes: '时间宝贵，喜欢预约准时',
    isVip: true,
    vipLevel: 3,
    totalBookings: 25,
    totalSpent: 6800,
    averagePrice: 272,
    lastVisit: '2025-12-10',
    firstVisit: '2024-03-20',
    type: 'old',
    tags: ['VIP', '商务客户'],
    createTime: '2024-03-20 15:00:00'
  },
  {
    id: 'C005',
    userId: 'U005',
    name: '孙小美',
    phone: '13555555555',
    avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    gender: 'F',
    age: 22,
    birthday: '2003-05-18',
    occupation: '大学生',
    preferences: '时尚个性',
    email: '',
    notes: '',
    isVip: false,
    vipLevel: 0,
    totalBookings: 3,
    totalSpent: 580,
    averagePrice: 193,
    lastVisit: '2025-12-07',
    firstVisit: '2025-08-20',
    type: 'old',
    tags: ['学生'],
    createTime: '2025-08-20 11:00:00'
  }
]

// 生日提醒客户（本周过生日的）
const getBirthdayCustomers = () => {
  const today = new Date()
  const weekLater = new Date()
  weekLater.setDate(today.getDate() + 7)

  return customers.filter(c => {
    if (!c.birthday) return false
    const birthday = new Date(c.birthday)
    const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())
    return thisYearBirthday >= today && thisYearBirthday <= weekLater
  })
}

// 顾客服务记录
const customerServiceHistory = {
  'C001': [
    {
      id: 'SH001',
      orderId: 'ORD20251211001',
      serviceName: '精致剪发',
      designerName: '李天天',
      serviceTime: '2025-12-11 14:00',
      amount: 94,
      rating: 5,
      notes: '满意'
    },
    {
      id: 'SH002',
      orderId: 'ORD20251125001',
      serviceName: '时尚烫发',
      designerName: '张小雨',
      serviceTime: '2025-11-25 10:00',
      amount: 399,
      rating: 5,
      notes: ''
    }
  ]
}

// 顾客消费记录
const customerTransactions = {
  'C001': [
    {
      id: 'TR001',
      type: 'service',
      typeName: '服务消费',
      amount: -94,
      serviceName: '精致剪发',
      time: '2025-12-11 15:00',
      balance: 0
    },
    {
      id: 'TR002',
      type: 'service',
      typeName: '服务消费',
      amount: -399,
      serviceName: '时尚烫发',
      time: '2025-11-25 11:30',
      balance: 0
    }
  ]
}

// 访客列表（查看了店铺但未下单的用户）
const visitors = [
  {
    id: 'V001',
    userId: 'U010',
    name: '访客用户1',
    avatar: '',
    visitTime: '2025-12-13 10:30',
    visitPage: '店铺首页',
    source: 'share',
    isConverted: false
  },
  {
    id: 'V002',
    userId: 'U011',
    name: '访客用户2',
    avatar: '',
    visitTime: '2025-12-13 09:15',
    visitPage: '服务详情',
    source: 'search',
    isConverted: false
  }
]

// Mock 数据
export const data = {
  customers,
  customerServiceHistory,
  customerTransactions,
  visitors
}

// Mock 路由处理
export const routes = {
  // 获取顾客列表
  'GET /customers': (params) => {
    let list = [...customers]

    // 按类型筛选
    if (params.type && params.type !== 'all') {
      if (params.type === 'birthday') {
        list = getBirthdayCustomers()
      } else {
        list = list.filter(c => c.type === params.type)
      }
    }

    // 按VIP筛选
    if (params.isVip !== undefined) {
      list = list.filter(c => c.isVip === params.isVip)
    }

    // 关键词搜索
    if (params.keyword) {
      list = list.filter(c =>
        c.name.includes(params.keyword) ||
        c.phone.includes(params.keyword)
      )
    }

    // 按最后访问时间倒序
    list.sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取顾客详情
  'GET /customers/:id': (params) => {
    const customer = customers.find(c => c.id === params.id)
    return customer ? success(customer) : error('顾客不存在')
  },

  // 创建顾客
  'POST /customers': (params) => {
    const newCustomer = {
      id: generateId('C'),
      userId: params.userId || '',
      ...params,
      totalBookings: 0,
      totalSpent: 0,
      averagePrice: 0,
      type: 'new',
      tags: ['新客'],
      createTime: formatNow(),
      firstVisit: formatNow()
    }
    customers.push(newCustomer)
    return success(newCustomer, '添加成功')
  },

  // 更新顾客信息
  'PUT /customers/:id': (params) => {
    const customer = customers.find(c => c.id === params.id)
    if (!customer) return error('顾客不存在')
    Object.assign(customer, params)
    return success(customer, '更新成功')
  },

  // 删除顾客
  'DELETE /customers/:id': (params) => {
    const index = customers.findIndex(c => c.id === params.id)
    if (index === -1) return error('顾客不存在')
    customers.splice(index, 1)
    return success(null, '删除成功')
  },

  // 搜索顾客
  'GET /customers/search': (params) => {
    const { keyword } = params
    if (!keyword) return success([])

    const list = customers.filter(c =>
      c.name.includes(keyword) ||
      c.phone.includes(keyword)
    )

    return success(list)
  },

  // 获取顾客服务记录
  'GET /customers/:customerId/services': (params) => {
    const history = customerServiceHistory[params.customerId] || []
    return success(paginate(history, params.page || 1, params.pageSize || 20))
  },

  // 获取顾客消费记录
  'GET /customers/:customerId/transactions': (params) => {
    const transactions = customerTransactions[params.customerId] || []
    return success(paginate(transactions, params.page || 1, params.pageSize || 20))
  },

  // 获取访客列表
  'GET /visitors': (params) => {
    let list = [...visitors]

    // 按日期筛选
    if (params.date) {
      list = list.filter(v => v.visitTime.startsWith(params.date))
    }

    // 按来源筛选
    if (params.source) {
      list = list.filter(v => v.source === params.source)
    }

    // 按访问时间倒序
    list.sort((a, b) => new Date(b.visitTime) - new Date(a.visitTime))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取顾客统计
  'GET /customers/stats': () => {
    return success({
      total: customers.length,
      newCount: customers.filter(c => c.type === 'new').length,
      oldCount: customers.filter(c => c.type === 'old').length,
      vipCount: customers.filter(c => c.isVip).length,
      birthdayCount: getBirthdayCustomers().length,
      todayVisitors: visitors.filter(v => v.visitTime.startsWith(formatDate(new Date(), 'YYYY-MM-DD'))).length
    })
  }
}

export default {
  data,
  routes
}
