/**
 * 用户模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 当前用户信息
const currentUser = {
  id: '1',
  phone: '13800138000',
  nickname: '美丽达人',
  avatar: '/static/avatar/avatar.png',
  gender: 1, // 1-男 2-女
  birthday: '1995-06-15',
  signature: '追求美丽，享受生活~',
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
  { id: '1', type: 'income', title: '订单退款', amount: 288.00, time: '2025-11-28 15:30', orderNo: '20251128001' },
  { id: '2', type: 'expense', title: '服务消费', amount: -599.00, time: '2025-11-27 14:20', orderNo: '20251127001' },
  { id: '3', type: 'income', title: '充值', amount: 1000.00, time: '2025-11-25 10:00', orderNo: '' },
  { id: '4', type: 'expense', title: '服务消费', amount: -399.00, time: '2025-11-22 16:45', orderNo: '20251122001' },
  { id: '5', type: 'income', title: '邀请奖励', amount: 50.00, time: '2025-11-20 09:30', orderNo: '' },
  { id: '6', type: 'expense', title: '服务消费', amount: -799.00, time: '2025-11-18 11:20', orderNo: '20251118001' }
]

// 收藏列表
const favorites = [
  { id: '1', type: 'designer', targetId: '1', name: '李天天', avatar: '/static/avatar/avatar.png', desc: '美发师 | 高级', time: '2025-11-25' },
  { id: '2', type: 'designer', targetId: '2', name: '张小雨', avatar: '/static/avatar/avatar.png', desc: '美发师 | 资深', time: '2025-11-22' },
  { id: '3', type: 'brand', targetId: '1', name: '金龙大好人美发沙龙', avatar: '/static/avatar/avatar.png', desc: '锦江区红星路120号', time: '2025-11-20' },
  { id: '4', type: 'service', targetId: '1', name: '精致剪发', avatar: '/static/avatar/avatar.png', desc: '¥99起', time: '2025-11-18' }
]

// 关注列表
const follows = [
  { id: '1', type: 'designer', targetId: '1', name: '李天天', avatar: '/static/avatar/avatar.png', desc: '店长 | 从业12年', isFollowed: true },
  { id: '2', type: 'designer', targetId: '2', name: '张小雨', avatar: '/static/avatar/avatar.png', desc: '总监 | 从业10年', isFollowed: true },
  { id: '3', type: 'brand', targetId: '1', name: '金龙大好人美发沙龙', avatar: '/static/avatar/avatar.png', desc: '粉丝 2000', isFollowed: true }
]

// 浏览记录
const browseRecords = [
  { id: '1', type: 'designer', targetId: '1', name: '李天天', avatar: '/static/avatar/avatar.png', desc: '美发师', time: '2025-11-28 16:30' },
  { id: '2', type: 'brand', targetId: '1', name: '金龙大好人美发沙龙', avatar: '/static/avatar/avatar.png', desc: '锦江区', time: '2025-11-28 15:20' },
  { id: '3', type: 'service', targetId: '1', name: '精致剪发造型', avatar: '/static/avatar/avatar.png', desc: '¥99', time: '2025-11-27 14:10' }
]

// 地址列表
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
  { id: '3', level: 3, name: 'VIP3', price: 999, months: 12, benefits: ['8.5折优惠', '专属客服', '优先预约', '免费造型设计'] }
]

// 隐私设置
const privacySettings = {
  showOnlineStatus: true,
  showBrowseHistory: true,
  allowRecommend: true
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
  privacySettings
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
    const avatarUrl = '/static/avatar/avatar.png'
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
    let list = favorites
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
    let list = follows
    if (params.type) {
      list = list.filter(item => item.type === params.type)
    }
    return success(paginate(list, params.page, params.pageSize))
  },

  // 批量取消关注
  'POST /api/user/follows/batch-remove': (params) => {
    return success(null, '已取消关注')
  },

  // 获取浏览记录
  'GET /api/user/browse-records': (params) => {
    return success(paginate(browseRecords, params.page, params.pageSize))
  },

  // 清空浏览记录
  'DELETE /api/user/browse-records': () => {
    return success(null, '浏览记录已清空')
  },

  // 获取地址列表
  'GET /api/user/address': () => {
    return success(addresses)
  },

  // 获取地址详情
  'GET /api/user/address/:addressId': (params) => {
    const address = addresses.find(a => a.id === params.addressId)
    return address ? success(address) : error('地址不存在')
  },

  // 新增地址
  'POST /api/user/address': (params) => {
    const newAddress = { id: String(addresses.length + 1), ...params }
    addresses.push(newAddress)
    return success(newAddress)
  },

  // 更新地址
  'PUT /api/user/address/:addressId': (params) => {
    const address = addresses.find(a => a.id === params.addressId)
    if (address) {
      Object.assign(address, params)
      return success(address)
    }
    return error('地址不存在')
  },

  // 删除地址
  'DELETE /api/user/address/:addressId': (params) => {
    const index = addresses.findIndex(a => a.id === params.addressId)
    if (index > -1) {
      addresses.splice(index, 1)
      return success(null, '删除成功')
    }
    return error('地址不存在')
  },

  // 设置默认地址
  'PUT /api/user/address/:addressId/default': (params) => {
    addresses.forEach(a => a.isDefault = false)
    const address = addresses.find(a => a.id === params.addressId)
    if (address) {
      address.isDefault = true
      return success(null, '设置成功')
    }
    return error('地址不存在')
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

  // 开通/续费会员
  'POST /api/user/vip/buy': (params) => {
    return success({ orderId: 'VIP' + Date.now() }, '会员开通成功')
  },

  // 提交设计师入驻申请
  'POST /api/user/apply/designer': (params) => {
    return success({ applyId: 'AD' + Date.now() }, '申请已提交，请等待审核')
  },

  // 提交店铺入驻申请
  'POST /api/user/apply/store': (params) => {
    return success({ applyId: 'AS' + Date.now() }, '申请已提交，请等待审核')
  },

  // 获取入驻申请状态
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
  }
}

export default {
  data,
  routes
}
