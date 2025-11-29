/**
 * 私人领地模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 我的设计师列表（私人领地）
const myDesigners = [
  {
    id: '1',
    designerId: '1',
    name: '李天天',
    avatar: '/static/avatar/avatar.png',
    role: '美发师',
    level: '高级',
    position: '店长｜从业12年',
    specialties: ['短发裁剪', '染发设计'],
    rating: 4.8,
    category: 'hairstylist',
    lastServiceTime: '2025-11-22 14:30',
    serviceCount: 5,
    totalSpent: 1580
  },
  {
    id: '2',
    designerId: '2',
    name: '张小雨',
    avatar: '/static/avatar/avatar.png',
    role: '美发师',
    level: '高级',
    position: '总监｜从业10年',
    specialties: ['烫发设计', '护发养护'],
    rating: 4.9,
    category: 'hairstylist',
    lastServiceTime: '2025-11-15 16:00',
    serviceCount: 3,
    totalSpent: 1197
  },
  {
    id: '3',
    designerId: '3',
    name: '王大明',
    avatar: '/static/avatar/avatar.png',
    role: '美发师',
    level: '资深',
    position: '首席｜从业8年',
    specialties: ['男士造型', '渐变染发'],
    rating: 4.7,
    category: 'hairstylist',
    lastServiceTime: '2025-10-28 10:00',
    serviceCount: 2,
    totalSpent: 598
  }
]

// 我的品牌馆列表（私人领地）
const myBrands = [
  {
    id: '1',
    brandId: '1',
    name: '金龙大好人美发沙龙',
    avatar: '/static/avatar/avatar.png',
    type: '品牌',
    level: '舒适',
    role: '专业店｜2012年开业',
    specialties: ['女士造型', '烫发设计', '短发造型'],
    rating: 4.8,
    category: 'hair',
    designerCount: 8,
    serviceCount: 1236,
    lastServiceTime: '2025-11-22 14:30',
    visitCount: 8,
    totalSpent: 2775
  },
  {
    id: '2',
    brandId: '2',
    name: '成都NICE造型沙龙',
    avatar: '/static/avatar/avatar.png',
    type: '品牌',
    level: '精品',
    role: '连锁店｜2015年开业',
    specialties: ['时尚染发', '护理', '造型'],
    rating: 4.9,
    category: 'hair',
    designerCount: 12,
    serviceCount: 2156,
    lastServiceTime: '2025-10-15 11:00',
    visitCount: 3,
    totalSpent: 899
  }
]

// 服务记录
const serviceRecords = [
  {
    id: '1',
    type: 'designer',
    targetId: '1',
    targetName: '李天天',
    targetAvatar: '/static/avatar/avatar.png',
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    serviceName: '精致剪发',
    servicePrice: 99,
    serviceTime: '2025-11-22 14:30',
    rating: 5,
    hasReviewed: true
  },
  {
    id: '2',
    type: 'designer',
    targetId: '2',
    targetName: '张小雨',
    targetAvatar: '/static/avatar/avatar.png',
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    serviceName: '时尚烫发',
    servicePrice: 399,
    serviceTime: '2025-11-15 16:00',
    rating: 5,
    hasReviewed: true
  },
  {
    id: '3',
    type: 'brand',
    targetId: '1',
    targetName: '金龙大好人美发沙龙',
    targetAvatar: '/static/avatar/avatar.png',
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    serviceName: '个性染发',
    servicePrice: 299,
    serviceTime: '2025-11-08 11:00',
    rating: 4,
    hasReviewed: true
  }
]

// 统计数据
const statistics = {
  designerCount: 3,
  brandCount: 2,
  serviceCount: 10,
  totalSpent: 3674
}

// Mock 数据
export const data = {
  myDesigners,
  myBrands,
  serviceRecords,
  statistics
}

// Mock 路由处理
export const routes = {
  // 获取我的设计师列表
  'GET /api/territory/designers': (params) => {
    let list = [...myDesigners]
    if (params.category) {
      list = list.filter(d => d.category === params.category)
    }
    // 按最近服务时间倒序
    list.sort((a, b) => new Date(b.lastServiceTime) - new Date(a.lastServiceTime))
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取设计师服务记录
  'GET /api/territory/designers/:designerId/records': (params) => {
    const list = serviceRecords.filter(r => r.type === 'designer' && r.targetId === params.designerId)
    return success(paginate(list, params.page, params.pageSize))
  },

  // 移除私人领地设计师
  'POST /api/territory/designers/:designerId/remove': (params) => {
    const index = myDesigners.findIndex(d => d.designerId === params.designerId)
    if (index > -1) {
      myDesigners.splice(index, 1)
      return success(null, '已移除')
    }
    return error('设计师不存在')
  },

  // 获取我的品牌馆列表
  'GET /api/territory/brands': (params) => {
    let list = [...myBrands]
    if (params.category) {
      list = list.filter(b => b.category === params.category)
    }
    // 按最近服务时间倒序
    list.sort((a, b) => new Date(b.lastServiceTime) - new Date(a.lastServiceTime))
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取品牌馆服务记录
  'GET /api/territory/brands/:brandId/records': (params) => {
    const list = serviceRecords.filter(r => r.brandId === params.brandId)
    return success(paginate(list, params.page, params.pageSize))
  },

  // 移除私人领地品牌馆
  'POST /api/territory/brands/:brandId/remove': (params) => {
    const index = myBrands.findIndex(b => b.brandId === params.brandId)
    if (index > -1) {
      myBrands.splice(index, 1)
      return success(null, '已移除')
    }
    return error('品牌馆不存在')
  },

  // 获取服务记录列表
  'GET /api/territory/records': (params) => {
    let list = [...serviceRecords]
    if (params.type) {
      list = list.filter(r => r.type === params.type)
    }
    if (params.category) {
      // 根据分类过滤（简化处理）
    }
    // 按服务时间倒序
    list.sort((a, b) => new Date(b.serviceTime) - new Date(a.serviceTime))
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取服务记录详情
  'GET /api/territory/records/:recordId': (params) => {
    const record = serviceRecords.find(r => r.id === params.recordId)
    return record ? success(record) : error('记录不存在')
  },

  // 基于服务记录再次预约
  'POST /api/territory/reorder/:recordId': (params) => {
    const record = serviceRecords.find(r => r.id === params.recordId)
    if (!record) return error('记录不存在')
    return success({
      designerId: record.targetId,
      brandId: record.brandId,
      serviceName: record.serviceName
    })
  },

  // 获取设计师推广信息
  'GET /api/territory/share/designer/:designerId': (params) => {
    const designer = myDesigners.find(d => d.designerId === params.designerId)
    if (!designer) return error('设计师不存在')
    return success({
      title: `推荐设计师 ${designer.name}`,
      description: `${designer.position}，专业${designer.specialties.join('、')}`,
      image: designer.avatar,
      path: `/pages/designer/info?id=${designer.designerId}`
    })
  },

  // 获取品牌馆推广信息
  'GET /api/territory/share/brand/:brandId': (params) => {
    const brand = myBrands.find(b => b.brandId === params.brandId)
    if (!brand) return error('品牌馆不存在')
    return success({
      title: `推荐品牌馆 ${brand.name}`,
      description: `${brand.role}，评分${brand.rating}`,
      image: brand.avatar,
      path: `/pages/brand/info?id=${brand.brandId}`
    })
  },

  // 记录分享行为
  'POST /api/territory/share/record': (params) => {
    return success(null, '分享成功')
  },

  // 获取私人领地统计数据
  'GET /api/territory/statistics': () => {
    return success(statistics)
  }
}

export default {
  data,
  routes
}
