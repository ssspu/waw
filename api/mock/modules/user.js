/**
 * 用户模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 当前用户信息
const currentUser = {
  id: '1',
  phone: '13800138000',
  nickname: '美丽达人',
  avatar: 'https://bioflex.cn/static/avatar/avatar.png',
  gender: '女',
  birthday: '1995-06-15',
  signature: '追求美丽，享受生活~',
  profession: '美发师',
  region: '四川-成都',
  vipLevel: 2,
  vipExpireDate: '2025-12-31',
  balance: 2580.00,
  points: 3680,
  couponCount: 5,
  followCount: 28,
  favoriteCount: 56
}

// 资产明细
const assetDetails = [
  { id: '1', type: 'income', title: '订单款', amount: 288.00, time: '2025-11-28 15:30', orderNo: '20251128001' },
  { id: '2', type: 'expense', title: '服务消费', amount: -599.00, time: '2025-11-27 14:20', orderNo: '20251127001' },
  { id: '3', type: 'income', title: '充', amount: 1000.00, time: '2025-11-25 10:00', orderNo: '' },
  { id: '4', type: 'expense', title: '服务消费', amount: -399.00, time: '2025-11-22 16:45', orderNo: '20251122001' },
  { id: '5', type: 'income', title: '请奖励', amount: 50.00, time: '2025-11-20 09:30', orderNo: '' },
  { id: '6', type: 'expense', title: '服务消费', amount: -799.00, time: '2025-11-18 11:20', orderNo: '20251118001' }
]

// 收藏列表 - 服务类型
const favoriteServices = [
  {
    id: '1',
    type: 'service',
    name: '洗吹',
    description: '水洗+按摩+型',
    duration: '1小时',
    distance: '距离1.2km',
    price: 799,
    cover: 'https://bioflex.cn/static/mine/favorites/rectangle-169.png'
  },
  {
    id: '2',
    type: 'service',
    name: '质感染发',
    description: '头皮护理+高级染发',
    duration: '2小时',
    distance: '距离2.5km',
    price: 1299,
    cover: 'https://bioflex.cn/static/mine/favorites/rectangle-169.png'
  },
  {
    id: '3',
    type: 'service',
    name: '烫染体',
    description: '烫发+染发+型设计',
    duration: '3小时',
    distance: '距离1.8km',
    price: 1699,
    cover: 'https://bioflex.cn/static/mine/favorites/rectangle-169.png'
  },
  {
    id: '4',
    type: 'service',
    name: '头皮护理',
    description: '深层清洁+舒缓按摩',
    duration: '1.5小时',
    distance: '距离3.0km',
    price: 599,
    cover: 'https://bioflex.cn/static/mine/favorites/rectangle-169.png'
  }
]

// 关注列表 - 设计师
const followDesigners = [
  {
    id: '1',
    type: 'designer',
    name: '李天天',
    level: '高级',
    role: '店长｜从业12年',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png',
    specialties: ['女士型', '烫发设计', '短发型'],
    rating: '4.8',
    services: 287,
    works: 123,
    promotionStatus: 'apply'
  },
  {
    id: '2',
    type: 'designer',
    name: '张小雨',
    level: '资深',
    role: '监｜从业10年',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png',
    specialties: ['时尚染发', '型设计', '发型修复'],
    rating: '4.9',
    services: 356,
    works: 189,
    promotionStatus: 'pending'
  },
  {
    id: '3',
    type: 'designer',
    name: '王大明',
    level: '高级',
    role: '美发师｜从业8年',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png',
    specialties: ['男士理发', '商务型', '发型设计'],
    rating: '4.7',
    services: 198,
    works: 87,
    promotionStatus: 'active'
  }
]

// 关注列表 - 品牌馆/商家
const followBrands = [
  {
    id: '1',
    type: 'brand',
    name: '成都NICE发型沙龙',
    tag: '舒适',
    type_desc: '专业店｜2012年营业',
    rating: '4.8',
    designers: '8人',
    services: '1236',
    distance: '7.5km',
    image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png',
    promotionStatus: 'apply'
  },
  {
    id: '2',
    type: 'brand',
    name: '潮流发型工作室',
    tag: '时尚',
    type_desc: '精品店｜2018年业',
    rating: '4.6',
    designers: '5人',
    services: '856',
    distance: '3.2km',
    image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png',
    promotionStatus: 'pending'
  }
]

// 浏览记录 - 服务
const browseServiceRecords = [
  {
    id: '1',
    type: 'service',
    name: '洗吹',
    description: '水洗+按摩+造型',
    duration: '1小时',
    sold: 1234,
    price: 799,
    discount: '预约优惠10%',
    ctaText: '快速预约',
    cover: 'https://bioflex.cn/static/mine/favorites/rectangle-169.png'
  },
  {
    id: '2',
    type: 'service',
    name: '质感染发',
    description: '头皮护理+高级染发',
    duration: '2小时',
    sold: 856,
    price: 1299,
    discount: '预约优惠10%',
    ctaText: '快速预约',
    cover: 'https://bioflex.cn/static/mine/favorites/rectangle-169.png'
  },
  {
    id: '3',
    type: 'service',
    name: '烫染一体',
    description: '烫发+染发+发型设计',
    duration: '3小时',
    sold: 421,
    price: 1699,
    discount: '预约优惠10%',
    ctaText: '快速预约',
    cover: 'https://bioflex.cn/static/mine/favorites/rectangle-169.png'
  },
  {
    id: '4',
    type: 'service',
    name: '头皮护理',
    description: '深层清洁+舒缓按摩',
    duration: '1.5小时',
    sold: 642,
    price: 599,
    discount: '预约优惠10%',
    ctaText: '快速预约',
    cover: 'https://bioflex.cn/static/mine/favorites/rectangle-169.png'
  }
]

// 浏览记录 - 品牌馆
const browseBrandRecords = [
  {
    id: '1',
    type: 'brand',
    name: '成都NICE发型沙龙',
    tag: '舒适',
    type_desc: '专业店｜2012年业',
    rating: '4.8',
    designers: '8人',
    services: '1236',
    distance: '7.5km',
    amenities: ['代客泊车', '免费茶点', '共享工位', '7天无忧'],
    image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-6.png'
  },
  {
    id: '2',
    type: 'brand',
    name: '潮流发型工作室',
    tag: '时尚',
    type_desc: '精品店｜2018年业',
    rating: '4.6',
    designers: '5人',
    services: '856',
    distance: '3.2km',
    amenities: ['免费WiFi', '免费茶点', '休息区'],
    image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-1.png'
  },
  {
    id: '3',
    type: 'brand',
    name: '时尚美发沙龙',
    tag: '高端',
    type_desc: '旗舰店｜2015年业',
    rating: '4.9',
    designers: '12人',
    services: '2156',
    distance: '5.1km',
    amenities: ['代客泊车', '免费茶点', 'VIP室', '7天无忧'],
    image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-4.png'
  },
  {
    id: '4',
    type: 'brand',
    name: '发型达人会所',
    tag: '精品',
    type_desc: '精品店｜2020年营业',
    rating: '4.7',
    designers: '6人',
    services: '689',
    distance: '2.8km',
    amenities: ['免费WiFi', '休息区', '儿童区'],
    image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-5.png'
  }
]

// 兼容旧代码的数据
const favorites = favoriteServices
const follows = followDesigners
const browseRecords = browseServiceRecords

// 地列表
const addresses = [
  { id: '1', name: '张三', phone: '13800138000', province: '四川省', city: '成都市', district: '锦江区', detail: '红星路120号IFS国际东门2栋607室', isDefault: true },
  { id: '2', name: '张三', phone: '13800138000', province: '四川省', city: '成都市', district: '武侯区', detail: '天府大道中段666号', isDefault: false }
]

// 银行卡列表
const bankCards = [
  { id: '1', bankName: '中国工商银行', cardNumber: '6222 **** **** 1234', holderName: '张三', phone: '138****8000', isDefault: true },
  { id: '2', bankName: '招商银行', cardNumber: '6225 **** **** 5678', holderName: '张三', phone: '138****8000', isDefault: false }
]

// VIP 等级列表
const vipLevels = [
  { id: '1', level: 1, name: 'VIP1', price: 99, months: 1, benefits: ['9.5折优惠', '专属客服'] },
  { id: '2', level: 2, name: 'VIP2', price: 299, months: 3, benefits: ['9折优惠', '专属客服', '优先预约'] },
  { id: '3', level: 3, name: 'VIP3', price: 999, months: 12, benefits: ['8.5折优惠', '专属客服', '优先预约', '免费发型设计'] }
]

// 隐私设置
const privacySettings = {
  showOnlineStatus: true,
  showBrowseHistory: true,
  allowRecommend: true,
  allowMicrophone: false
}

// ============ 余额相关数据 ============
const balanceInfo = {
  balance: 2580.00,
  frozenBalance: 100.00,
  totalRecharge: 5000.00,
  totalConsume: 2420.00
}

const balanceRecords = [
  { id: '1', type: 'income', title: '余额充值', amount: 500.00, balance: 2580.00, time: '2025-11-28 10:00', remark: '微信支付' },
  { id: '2', type: 'expense', title: '服务消费', amount: -199.00, balance: 2080.00, time: '2025-11-27 15:30', remark: '精致剪发', orderNo: 'O20251127001' },
  { id: '3', type: 'income', title: '订单退款', amount: 199.00, balance: 2279.00, time: '2025-11-26 11:20', remark: '订单取消退款', orderNo: 'O20251126001' },
  { id: '4', type: 'expense', title: '服务消费', amount: -399.00, balance: 2080.00, time: '2025-11-25 14:00', remark: '烫染套餐', orderNo: 'O20251125001' },
  { id: '5', type: 'income', title: '余额充值', amount: 1000.00, balance: 2479.00, time: '2025-11-20 09:30', remark: '支付宝支付' }
]

// ============ 美豆相关数据 ============
const beansInfo = {
  beans: 3680,
  todayEarned: 10,
  totalEarned: 5280,
  totalSpent: 1600,
  expiringSoon: 200,
  expireDate: '2025-12-31'
}

const beansRecords = [
  { id: '1', type: 'earn', title: '每日签到', amount: 10, balance: 3680, time: '2025-11-28 08:00', remark: '连续签到第7天' },
  { id: '2', type: 'earn', title: '订单奖励', amount: 50, balance: 3670, time: '2025-11-27 16:00', remark: '消费满100赠', orderNo: 'O20251127001' },
  { id: '3', type: 'spend', title: '兑换优惠券', amount: -200, balance: 3620, time: '2025-11-26 10:30', remark: '10元无门槛券' },
  { id: '4', type: 'earn', title: '评价奖励', amount: 20, balance: 3820, time: '2025-11-25 15:20', remark: '发表优质评价' },
  { id: '5', type: 'earn', title: '邀请奖励', amount: 100, balance: 3800, time: '2025-11-24 11:00', remark: '邀请好友注册' }
]

const signStatus = {
  isSigned: false,
  continuousDays: 6,
  todayReward: 10,
  nextReward: 15,
  signCalendar: []
}

// ============ 推广佣金相关数据 ============
const promotionInfo = {
  totalCommission: 1280.50,
  availableCommission: 980.50,
  frozenCommission: 300.00,
  withdrawnCommission: 2500.00,
  inviteCount: 28,
  orderCount: 56
}

const promotionRecords = [
  { id: '1', type: 'invite', title: '请奖励', amount: 50.00, status: 'settled', time: '2025-11-28 10:30', remark: '请用户张**注册', userId: 'U001' },
  { id: '2', type: 'order', title: '订单佣金', amount: 28.80, status: 'settled', time: '2025-11-27 16:20', remark: '下级用户消费288元', orderNo: 'O20251127002' },
  { id: '3', type: 'order', title: '订单佣金', amount: 15.50, status: 'pending', time: '2025-11-26 14:00', remark: '下级用户消费155元', orderNo: 'O20251126002' },
  { id: '4', type: 'invite', title: '请奖励', amount: 50.00, status: 'settled', time: '2025-11-25 09:15', remark: '请用户李**注册', userId: 'U002' },
  { id: '5', type: 'withdraw', title: '佣金提现', amount: -500.00, status: 'success', time: '2025-11-20 11:00', remark: '提现至招商银行尾号5678' }
]

const inviteCode = {
  code: 'WAW2025ABC',
  qrCodeUrl: 'https://bioflex.cn/static/qrcode/invite.png',
  shareUrl: 'https://waw.com/invite/WAW2025ABC',
  expireTime: null
}

const inviteList = [
  { id: '1', userId: 'U001', nickname: '张**', avatar: 'https://bioflex.cn/static/avatar/user1.png', phone: '138****1234', registerTime: '2025-11-28 10:30', orderCount: 3, totalAmount: 588.00 },
  { id: '2', userId: 'U002', nickname: '李**', avatar: 'https://bioflex.cn/static/avatar/user2.png', phone: '139****5678', registerTime: '2025-11-25 09:15', orderCount: 1, totalAmount: 199.00 },
  { id: '3', userId: 'U003', nickname: '王**', avatar: 'https://bioflex.cn/static/avatar/user3.png', phone: '136****9012', registerTime: '2025-11-20 14:20', orderCount: 5, totalAmount: 1280.00 }
]

const promotionRules = {
  inviteReward: 50,
  orderCommissionRate: 0.1,
  minWithdraw: 100,
  withdrawFee: 0,
  settleDelay: 7,
  rules: [
    '邀请新用户注册成功，可获得50美豆奖励',
    '被邀请用户完成首单后，邀请人可获得订单金额10%的佣金',
    '佣金满100元可申请提现，提现无手续费',
    '订单佣金在订单完成7天后结算'
  ]
}

// ============ 平台奖励相关数据 ============
const platformRewardInfo = {
  totalReward: 680.00,
  availableReward: 380.00,
  claimedReward: 300.00,
  pendingReward: 150.00
}

const platformRewardRecords = [
  { id: '1', type: 'activity', title: '双11活动奖励', amount: 100.00, status: 'claimed', time: '2025-11-11 00:00', expireTime: '2025-12-11 23:59' },
  { id: '2', type: 'task', title: '完善资料奖励', amount: 50.00, status: 'claimed', time: '2025-11-05 10:00', expireTime: null },
  { id: '3', type: 'activity', title: '新人礼包', amount: 200.00, status: 'pending', time: '2025-11-01 08:00', expireTime: '2025-12-01 23:59' },
  { id: '4', type: 'compensation', title: '订单补偿', amount: 30.00, status: 'available', time: '2025-10-28 15:30', expireTime: '2025-11-28 23:59' },
  { id: '5', type: 'task', title: '首单奖励', amount: 100.00, status: 'claimed', time: '2025-10-20 16:00', expireTime: null }
]

// ============ 二维码名片相关数据 ============
const qrCodeInfo = {
  personalQrCode: 'https://bioflex.cn/static/qrcode/personal.png',
  inviteQrCode: 'https://bioflex.cn/static/qrcode/invite.png',
  nickname: '美丽达人',
  avatar: 'https://bioflex.cn/static/avatar/avatar.png',
  userId: '1',
  signature: '追求美丽，享受生活~'
}

// ============ 账号注销相关数据 ============
const deactivationStatus = {
  status: 'none', // none/pending/processing/completed
  applyTime: null,
  processTime: null,
  reason: null,
  remainingDays: null
}

// Mock 数据
export const data = {
  currentUser,
  assetDetails,
  favorites,
  follows,
  browseRecords,
  addresses,
  bankCards,
  vipLevels,
  privacySettings,
  balanceInfo,
  balanceRecords,
  beansInfo,
  beansRecords,
  signStatus,
  promotionInfo,
  promotionRecords,
  inviteCode,
  inviteList,
  promotionRules,
  platformRewardInfo,
  platformRewardRecords,
  qrCodeInfo,
  deactivationStatus
}

// Mock 路由处理
export const routes = {
  // 获取用户信息
  'GET /api/user/info': () => {
    return success(currentUser)
  },

  // 更新用户信息
  'PUT /api/user/info': (params) => {
    Object.assign(currentUser, params)
    return success(currentUser)
  },

  // 上传头像
  'POST /api/user/avatar': (params) => {
    const avatarUrl = 'https://bioflex.cn/static/avatar/avatar.png'
    currentUser.avatar = avatarUrl
    return success({ url: avatarUrl })
  },

  // 修改密码
  'PUT /api/user/password': (params) => {
    return success(null, '密码修改成功')
  },

  // 绑定手机号
  'POST /api/user/bindPhone': (params) => {
    return success(null, '手机号绑定成功')
  },

  // 更换手机号
  'PUT /api/user/phone': (params) => {
    return success(null, '手机号更换成功')
  },

  // 获取资产概览
  'GET /api/user/asset': () => {
    return success({
      balance: currentUser.balance,
      points: currentUser.points,
      couponCount: currentUser.couponCount,
      totalIncome: 1338.00,
      totalExpense: 1797.00
    })
  },

  // 获取资产明细
  'GET /api/user/asset/detail': (params) => {
    let list = assetDetails
    if (params.type) {
      list = list.filter(item => item.type === params.type)
    }
    return success(paginate(list, params.page, params.pageSize))
  },

  // 提现申请
  'POST /api/user/withdraw': (params) => {
    return success({ withdrawId: 'W' + Date.now() }, '提现申请已提交')
  },

  // 获取收藏列表
  'GET /api/user/favorites': (params) => {
    let list = favoriteServices
    if (params.type) {
      list = list.filter(item => item.type === params.type)
    }
    return success(paginate(list, params.page, params.pageSize))
  },

  // 批量取消收藏
  'POST /api/user/favorites/batch-remove': (params) => {
    return success(null, '已取消收藏')
  },

  // 获取关注列表
  'GET /api/user/follows': (params) => {
    const type = params.type
    let list = []
    if (type === 'designer') {
      list = followDesigners
    } else if (type === 'brand' || type === 'store') {
      list = followBrands
    } else {
      // 默认返回有
      list = [...followDesigners, ...followBrands]
    }
    return success({
      ...paginate(list, params.page, params.pageSize),
      designerCount: followDesigners.length,
      brandCount: followBrands.length
    })
  },

  // 批量取消关注
  'POST /api/user/follows/batch-remove': (params) => {
    return success(null, '已取消关注')
  },

  // 获取浏览记录
  'GET /api/user/browse-records': (params) => {
    const type = params.type
    let list = []
    if (type === 'service') {
      list = browseServiceRecords
    } else if (type === 'brand') {
      list = browseBrandRecords
    } else {
      // 默认返回服务浏览
      list = browseServiceRecords
    }
    return success({
      ...paginate(list, params.page, params.pageSize),
      serviceRecords: browseServiceRecords,
      brandRecords: browseBrandRecords
    })
  },

  // 清空浏览记录
  'DELETE /api/user/browse-records': () => {
    return success(null, '浏览记录已清空')
  },

  // 获取地列表
  'GET /api/user/address': () => {
    return success(addresses)
  },

  // 获取地详情
  'GET /api/user/address/:addressId': (params) => {
    const address = addresses.find(a => a.id === params.addressId)
    return address ? success(address) : error('地不存在')
  },

  // 新增地
  'POST /api/user/address': (params) => {
    const newAddress = { id: String(addresses.length + 1), ...params }
    addresses.push(newAddress)
    return success(newAddress)
  },

  // 更新地
  'PUT /api/user/address/:addressId': (params) => {
    const address = addresses.find(a => a.id === params.addressId)
    if (address) {
      Object.assign(address, params)
      return success(address)
    }
    return error('地不存在')
  },

  // 删除地
  'DELETE /api/user/address/:addressId': (params) => {
    const index = addresses.findIndex(a => a.id === params.addressId)
    if (index > -1) {
      addresses.splice(index, 1)
      return success(null, '删除成功')
    }
    return error('地不存在')
  },

  // 设置默认地址
  'PUT /api/user/address/:addressId/default': (params) => {
    addresses.forEach(a => a.isDefault = false)
    const address = addresses.find(a => a.id === params.addressId)
    if (address) {
      address.isDefault = true
      return success(null, '设置成功')
    }
    return error('地不存在')
  },

  // 获取银行卡列表
  'GET /api/user/bank-cards': () => {
    return success(bankCards)
  },

  // 添加银行卡
  'POST /api/user/bank-cards': (params) => {
    const newCard = { id: String(bankCards.length + 1), ...params }
    bankCards.push(newCard)
    return success(newCard)
  },

  // 删除银行卡
  'DELETE /api/user/bank-cards/:cardId': (params) => {
    const index = bankCards.findIndex(c => c.id === params.cardId)
    if (index > -1) {
      bankCards.splice(index, 1)
      return success(null, '删除成功')
    }
    return error('银行卡不存在')
  },

  // 获取会员信息
  'GET /api/user/vip': () => {
    return success({
      level: currentUser.vipLevel,
      expireDate: currentUser.vipExpireDate,
      benefits: vipLevels.find(v => v.level === currentUser.vipLevel)?.benefits || []
    })
  },

  // 获取会员等级列表
  'GET /api/user/vip/levels': () => {
    return success(vipLevels)
  },

  'POST /api/user/vip/buy': (params) => {
    return success({ orderId: 'VIP' + Date.now() }, '会员成功')
  },

  // 提交设计师入驻申请
  'POST /api/user/apply/designer': (params) => {
    return success({ applyId: 'AD' + Date.now() }, '申请已提交，请等待审核')
  },

  // 提交店铺入驻申请
  'POST /api/user/apply/store': (params) => {
    return success({ applyId: 'AS' + Date.now() }, '申请已提交，请等待审核')
  },

  // 获取入驻申请状
  'GET /api/user/apply/:type/status': (params) => {
    return success({
      status: 'pending', // pending/reviewing/approved/rejected
      applyTime: '2025-11-28 10:00',
      reviewTime: null,
      rejectReason: null
    })
  },

  // 获取隐私设置
  'GET /api/user/privacy': () => {
    return success(privacySettings)
  },

  // 更新隐私设置
  'PUT /api/user/privacy': (params) => {
    Object.assign(privacySettings, params)
    return success(privacySettings)
  },

  // 提交意见反馈
  'POST /api/user/feedback': (params) => {
    return success({ feedbackId: 'FB' + Date.now() }, '感谢您的反馈')
  },

  // ============ 余额相关路由 ============

  // 获取余额详情
  'GET /api/user/balance': () => {
    return success(balanceInfo)
  },

  // 获取余额变动记录
  'GET /api/user/balance/records': (params) => {
    let list = balanceRecords
    if (params.type) {
      list = list.filter(item => item.type === params.type)
    }
    return success(paginate(list, params.page || 1, params.pageSize || 10))
  },

  // 余额充
  'POST /api/user/balance/recharge': (params) => {
    const { amount } = params
    balanceInfo.balance += amount
    balanceInfo.totalRecharge += amount
    return success({
      orderId: 'R' + Date.now(),
      balance: balanceInfo.balance
    }, '充成功')
  },

  // ============ 美豆相关路由 ============

  // 获取美豆余额
  'GET /api/user/beans': () => {
    return success(beansInfo)
  },

  // 获取美豆变动记录
  'GET /api/user/beans/records': (params) => {
    let list = beansRecords
    if (params.type) {
      list = list.filter(item => item.type === params.type)
    }
    return success(paginate(list, params.page || 1, params.pageSize || 10))
  },

  // 美豆兑换
  'POST /api/user/beans/exchange': (params) => {
    const { amount } = params
    if (beansInfo.beans < amount) {
      return error('美豆余额不足')
    }
    beansInfo.beans -= amount
    beansInfo.totalSpent += amount
    return success({
      exchangeId: 'EX' + Date.now(),
      beans: beansInfo.beans
    }, '兑换成功')
  },

  // 签到获取美豆
  'POST /api/user/beans/sign': () => {
    if (signStatus.isSigned) {
      return error('今日已签到')
    }
    signStatus.isSigned = true
    signStatus.continuousDays += 1
    beansInfo.beans += signStatus.todayReward
    beansInfo.todayEarned = signStatus.todayReward
    return success({
      reward: signStatus.todayReward,
      continuousDays: signStatus.continuousDays,
      beans: beansInfo.beans
    }, '签到成功')
  },

  // 获取签到状
  'GET /api/user/beans/sign-status': () => {
    return success(signStatus)
  },

  // 获取签到日历
  'GET /api/user/beans/sign-calendar': (params) => {
    const { year, month } = params
    const calendar = []
    const daysInMonth = new Date(year, month, 0).getDate()
    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push({
        day: i,
        isSigned: i <= 6,
        reward: i % 7 === 0 ? 20 : 10
      })
    }
    return success({
      year,
      month,
      calendar,
      continuousDays: signStatus.continuousDays
    })
  },

  // ============ 推广佣金相关路由 ============

  // 获取推广佣金概览
  'GET /api/user/promotion': () => {
    return success(promotionInfo)
  },

  // 获取推广佣金记录
  'GET /api/user/promotion/records': (params) => {
    let list = promotionRecords
    if (params.type) {
      list = list.filter(item => item.type === params.type)
    }
    return success(paginate(list, params.page || 1, params.pageSize || 10))
  },

  // 获取请码
  'GET /api/user/promotion/invite-code': () => {
    return success(inviteCode)
  },

  // 获取请记录列表
  'GET /api/user/promotion/invites': (params) => {
    return success(paginate(inviteList, params.page || 1, params.pageSize || 10))
  },

  // 推广佣金提现
  'POST /api/user/promotion/withdraw': (params) => {
    const { amount } = params
    if (promotionInfo.availableCommission < amount) {
      return error('可提现佣金不足')
    }
    if (amount < promotionRules.minWithdraw) {
      return error(`低提现金额为${promotionRules.minWithdraw}元`)
    }
    promotionInfo.availableCommission -= amount
    promotionInfo.withdrawnCommission += amount
    return success({
      withdrawId: 'PW' + Date.now(),
      amount,
      availableCommission: promotionInfo.availableCommission
    }, '提现申请已提交')
  },

  // 获取推广规则
  'GET /api/user/promotion/rules': () => {
    return success(promotionRules)
  },

  // ============ 平台奖励相关路由 ============

  // 获取平台奖励概览
  'GET /api/user/platform-reward': () => {
    return success(platformRewardInfo)
  },

  // 获取平台奖励记录
  'GET /api/user/platform-reward/records': (params) => {
    let list = platformRewardRecords
    if (params.type) {
      list = list.filter(item => item.type === params.type)
    }
    return success(paginate(list, params.page || 1, params.pageSize || 10))
  },

  // 领取平台奖励
  'POST /api/user/platform-reward/claim/:rewardId': (params) => {
    const reward = platformRewardRecords.find(r => r.id === params.rewardId)
    if (!reward) {
      return error('奖励不存在')
    }
    if (reward.status !== 'available') {
      return error('该奖励不可领取')
    }
    reward.status = 'claimed'
    platformRewardInfo.availableReward -= reward.amount
    platformRewardInfo.claimedReward += reward.amount
    return success({
      amount: reward.amount,
      availableReward: platformRewardInfo.availableReward
    }, '领取成功')
  },

  // ============ 二维码名片相关路由 ============

  // 获取用户二维码名片
  'GET /api/user/qr-code': () => {
    return success(qrCodeInfo)
  },

  // 生成二维码
  'POST /api/user/qr-code/generate': (params) => {
    const { type = 'personal' } = params
    return success({
      qrCodeUrl: type === 'invite' ? 'https://bioflex.cn/static/qrcode/invite.png' : 'https://bioflex.cn/static/qrcode/personal.png',
      type,
      expireTime: null
    }, '生成成功')
  },

  // 保存二维码名片
  'POST /api/user/qr-code/save': () => {
    return success(null, '保存成功')
  },


  // 申请注账号
  'POST /api/user/deactivation/apply': (params) => {
    if (deactivationStatus.status !== 'none') {
      return error('已有注申请在处理中')
    }
    deactivationStatus.status = 'pending'
    deactivationStatus.applyTime = new Date().toISOString()
    deactivationStatus.reason = params.reason || ''
    deactivationStatus.remainingDays = 15
    return success({
      status: deactivationStatus.status,
      remainingDays: deactivationStatus.remainingDays
    }, '注申请已提交，15天内可撤')
  },

  'POST /api/user/deactivation/cancel': () => {
    if (deactivationStatus.status === 'none') {
      return error('没有待处理的注申请')
    }
    if (deactivationStatus.status === 'completed') {
      return error('账号已注，无法撤')
    }
    deactivationStatus.status = 'none'
    deactivationStatus.applyTime = null
    deactivationStatus.reason = null
    deactivationStatus.remainingDays = null
    return success(null, '注申请已撤')
  },

  'GET /api/user/deactivation/status': () => {
    return success(deactivationStatus)
  },

  // ============ 设置相关 ============

  // 获取用户设置
  'GET /api/user/settings': () => {
    return success({
      notificationEnabled: true,
      cacheSize: '365M'
    })
  },

  'PUT /api/user/settings/notification': (params) => {
    return success({
      notificationEnabled: params.notificationEnabled
    }, '设置已更新')
  },

  // 获取缓存大小
  'GET /api/user/cache-size': () => {
    return success({
      cacheSize: '365M',
      cacheSizeBytes: 382730240
    })
  },

  // 清除缓存
  'POST /api/user/cache/clear': () => {
    return success({
      cacheSize: '0M',
      cacheSizeBytes: 0
    }, '缓存已清除')
  }
}

export default {
  data,
  routes
}
