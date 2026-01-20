/**
 * 店铺管理模块 Mock 数据
 * 与用户端品牌馆数据保持一致
 */

import { success, error, paginate, generateId, formatNow } from '../utils.js'

// 店铺信息 - 与用户端brand数据对应
const shopInfo = {
  id: 'SHOP001',
  name: '金龙大好人美发沙龙',
  logo: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
  identity: 'company', // company/individual
  status: 'open', // open/closed
  isAcceptingOrders: true,
  address: '成都市锦江区春熙路123号',
  phone: '028-88888888',
  description: '专业美发沙龙，拥有十年品牌历史，为您提供最专业的美发服务。',
  businessHours: {
    start: '09:00',
    end: '21:00'
  },
  restDays: ['周一'],
  area: 200, // 经营面积
  workStations: 12, // 服务工位
  designerCount: 8, // 美发师数
  establishedDate: '2015-01-01',
  mainServices: ['剪发', '烫发', '染发', '护理'],
  rating: 4.8,
  reviewCount: 2356,
  orderCount: 15678,
  monthlyIncome: 128000,
  followerCount: 3256,
  createTime: '2024-01-01 10:00:00'
}

// 店铺装修配置
const shopDecoration = {
  brandImage: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png',
  businessHours: {
    start: '09:00',
    end: '21:00'
  },
  restDays: ['周一'],
  address: '成都市锦江区春熙路123号',
  area: 200,
  establishedDate: '2015-01-01',
  workStations: 12,
  designerCount: 8,
  appointmentTime: 30, // 预约时间间隔
  skills: ['精剪', '烫染', '护理', '造型'],
  introduction: '专业美发沙龙，拥有十年品牌历史',
  // 服务特色
  features: ['免费WiFi', '空调', '停车场', '茶水服务', '杂志阅读', '专业洗护'],
  // 环境设施
  facilities: ['独立包间', '舒适座椅', '专业设备', '优雅环境']
}

// 关联门店列表
const stores = [
  {
    id: 'STORE001',
    name: '金龙大好人美发沙龙(春熙路店)',
    type: 'service', // service/joined/chain
    address: '成都市锦江区春熙路123号',
    phone: '028-88888888',
    businessHours: '09:00-21:00',
    image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png',
    status: 'active',
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: 'STORE002',
    name: '金龙大好人美发沙龙(天府广场店)',
    type: 'chain',
    address: '成都市青羊区天府广场456号',
    phone: '028-99999999',
    businessHours: '10:00-22:00',
    image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png',
    status: 'active',
    createTime: '2024-06-15 10:00:00'
  },
  {
    id: 'STORE003',
    name: '成都NICE造型沙龙',
    type: 'joined',
    address: '成都市武侯区科华北路789号',
    phone: '028-77777777',
    businessHours: '09:30-20:30',
    image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png',
    status: 'active',
    joinTime: '2024-08-20 10:00:00',
    createTime: '2024-08-20 10:00:00'
  }
]

// Mock 数据
export const data = {
  shopInfo,
  shopDecoration,
  stores
}

// Mock 路由处理
export const routes = {
  // 获取我的店铺（商家专用）
  'GET /shop/my': () => {
    return success(shopInfo)
  },

  // 获取店铺详情（公开接口）
  'GET /shop/:id': (params) => {
    return success(shopInfo)
  },

  // 更新店铺信息
  'PUT /shop/:id': (params) => {
    Object.assign(shopInfo, params)
    return success(shopInfo, '更新成功')
  },

  // 获取店铺装修配置
  'GET /shop/decoration': () => {
    return success(shopDecoration)
  },

  // 更新店铺装修配置
  'PUT /shop/decoration': (params) => {
    Object.assign(shopDecoration, params)
    return success(shopDecoration, '保存成功')
  },

  // 获取门店列表
  'GET /stores': (params) => {
    let list = [...stores]
    if (params.type) {
      list = list.filter(s => s.type === params.type)
    }
    if (params.status) {
      list = list.filter(s => s.status === params.status)
    }
    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取门店详情
  'GET /stores/:id': (params) => {
    const store = stores.find(s => s.id === params.id)
    return store ? success(store) : error('门店不存在')
  },

  // 添加门店
  'POST /stores': (params) => {
    const newStore = {
      id: generateId('STORE'),
      ...params,
      status: 'active',
      createTime: formatNow()
    }
    stores.push(newStore)
    return success(newStore, '添加成功')
  },

  // 更新门店
  'PUT /stores/:id': (params) => {
    const store = stores.find(s => s.id === params.id)
    if (!store) return error('门店不存在')
    Object.assign(store, params)
    return success(store, '更新成功')
  },

  // 删除门店
  'DELETE /stores/:id': (params) => {
    const index = stores.findIndex(s => s.id === params.id)
    if (index === -1) return error('门店不存在')
    stores.splice(index, 1)
    return success(null, '删除成功')
  },

  // 获取店铺二维码
  'GET /stores/:id/qrcode': (params) => {
    return success({
      qrcodeUrl: 'https://api.waw.com/qrcode/' + params.id,
      storeId: params.id
    })
  },

  // 生成店铺二维码
  'POST /stores/:id/qrcode': (params) => {
    return success({
      qrcodeUrl: 'https://api.waw.com/qrcode/' + params.id + '?t=' + Date.now(),
      storeId: params.id
    }, '生成成功')
  },

  // 获取店铺链接
  'GET /stores/:id/link': (params) => {
    return success({
      link: 'https://waw.com/store/' + params.id,
      shortLink: 'https://waw.me/s/' + params.id.slice(-6)
    })
  },

  // 同步门店数据
  'POST /stores/sync': () => {
    return success({
      syncTime: formatNow(),
      syncCount: stores.length
    }, '同步成功')
  },

  // 更新店铺状态（开/关店）- 新接口
  'PUT /shop/my/status': (params) => {
    shopInfo.status = params.status
    return success({ status: shopInfo.status }, params.status === 'open' ? '店铺已开启' : '店铺已关闭')
  },

  // 更新店铺状态（开/关店）- 旧接口兼容
  'PUT /shop/status': (params) => {
    shopInfo.status = params.status
    return success({ status: shopInfo.status }, params.status === 'open' ? '店铺已开启' : '店铺已关闭')
  },

  // 更新接单状态
  'PUT /shop/accepting-orders': (params) => {
    shopInfo.isAcceptingOrders = params.isAcceptingOrders
    return success(
      { isAcceptingOrders: shopInfo.isAcceptingOrders },
      params.isAcceptingOrders ? '已开启接单' : '已关闭接单'
    )
  }
}

export default {
  data,
  routes
}
