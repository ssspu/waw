/**
 * 服务模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 服务列表
const services = [
  {
    id: '1',
    name: '精致剪发',
    categoryId: '1',
    categoryName: '剪发',
    price: 99,
    originalPrice: 128,
    image: '/static/service/service1.png',
    images: ['/static/service/service1.png', '/static/service/service1-2.png'],
    description: '专业剪发服务，根据您的脸型和气质，为您打造最适合的发型。',
    duration: 45,
    soldCount: 2356,
    rating: 4.8,
    reviewCount: 856,
    tags: ['热门', '推荐'],
    isFavorited: false,
    brandId: '1',
    brandName: '金龙大好人美发沙龙'
  },
  {
    id: '2',
    name: '时尚烫发',
    categoryId: '2',
    categoryName: '烫发',
    price: 399,
    originalPrice: 499,
    image: '/static/service/service2.png',
    images: ['/static/service/service2.png'],
    description: '采用进口烫发药水，打造自然卷度，持久定型。',
    duration: 120,
    soldCount: 1289,
    rating: 4.9,
    reviewCount: 523,
    tags: ['热门'],
    isFavorited: true,
    brandId: '1',
    brandName: '金龙大好人美发沙龙'
  },
  {
    id: '3',
    name: '个性染发',
    categoryId: '3',
    categoryName: '染发',
    price: 299,
    originalPrice: 399,
    image: '/static/service/service3.png',
    images: ['/static/service/service3.png'],
    description: '使用植物染发剂，安全健康，色彩持久。',
    duration: 90,
    soldCount: 1567,
    rating: 4.7,
    reviewCount: 412,
    tags: [],
    isFavorited: false,
    brandId: '1',
    brandName: '金龙大好人美发沙龙'
  },
  {
    id: '4',
    name: '深度护理',
    categoryId: '4',
    categoryName: '护理',
    price: 199,
    originalPrice: 258,
    image: '/static/service/service4.png',
    images: ['/static/service/service4.png'],
    description: '深层修复受损发质，让秀发重焕光泽。',
    duration: 60,
    soldCount: 876,
    rating: 4.8,
    reviewCount: 234,
    tags: ['新品'],
    isFavorited: false,
    brandId: '1',
    brandName: '金龙大好人美发沙龙'
  },
  {
    id: '5',
    name: '造型设计',
    categoryId: '5',
    categoryName: '造型',
    price: 159,
    originalPrice: 199,
    image: '/static/service/service5.png',
    images: ['/static/service/service5.png'],
    description: '专业造型设计，适合各种场合。',
    duration: 40,
    soldCount: 654,
    rating: 4.6,
    reviewCount: 189,
    tags: [],
    isFavorited: false,
    brandId: '2',
    brandName: '成都NICE造型沙龙'
  }
]

// 服务分类
const serviceCategories = [
  { id: '1', name: '剪发', icon: '/static/icon/cut.png', count: 15 },
  { id: '2', name: '烫发', icon: '/static/icon/perm.png', count: 12 },
  { id: '3', name: '染发', icon: '/static/icon/dye.png', count: 18 },
  { id: '4', name: '护理', icon: '/static/icon/care.png', count: 10 },
  { id: '5', name: '造型', icon: '/static/icon/style.png', count: 8 }
]

// 服务评价
const serviceReviews = [
  {
    id: '1',
    serviceId: '1',
    userId: '100',
    userName: '加菲猫',
    userAvatar: '/static/avatar/avatar.png',
    rating: 5.0,
    content: '剪发效果很满意，设计师很专业！',
    images: ['/static/review/review1.png'],
    time: '2025-11-25',
    likeCount: 36,
    replyCount: 1
  },
  {
    id: '2',
    serviceId: '1',
    userId: '101',
    userName: '小美',
    userAvatar: '/static/avatar/avatar.png',
    rating: 4.8,
    content: '服务态度很好',
    images: [],
    time: '2025-11-22',
    likeCount: 12,
    replyCount: 0
  },
  {
    id: '3',
    serviceId: '2',
    userId: '102',
    userName: '花花',
    userAvatar: '/static/avatar/avatar.png',
    rating: 5.0,
    content: '烫发效果超级自然，很喜欢！',
    images: ['/static/review/review2.png', '/static/review/review3.png'],
    time: '2025-11-20',
    likeCount: 58,
    replyCount: 3
  }
]

// Mock 数据
export const data = {
  services,
  serviceCategories,
  serviceReviews
}

// Mock 路由处理
export const routes = {
  // 获取服务列表
  'GET /api/service/list': (params) => {
    let list = [...services]
    if (params.categoryId) {
      list = list.filter(s => s.categoryId === params.categoryId)
    }
    if (params.keyword) {
      list = list.filter(s => s.name.includes(params.keyword))
    }
    if (params.sortBy === 'price') {
      list.sort((a, b) => a.price - b.price)
    } else if (params.sortBy === 'soldCount') {
      list.sort((a, b) => b.soldCount - a.soldCount)
    } else if (params.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    }
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取服务详情
  'GET /api/service/detail/:serviceId': (params) => {
    const service = services.find(s => s.id === params.serviceId)
    return service ? success(service) : error('服务不存在')
  },

  // 获取服务分类
  'GET /api/service/categories': () => {
    return success(serviceCategories)
  },

  // 获取推荐服务
  'GET /api/service/recommend': (params) => {
    const limit = params.limit || 4
    const list = [...services].sort((a, b) => b.rating - a.rating).slice(0, limit)
    return success(list)
  },

  // 获取热门服务
  'GET /api/service/hot': (params) => {
    const limit = params.limit || 4
    const list = [...services].sort((a, b) => b.soldCount - a.soldCount).slice(0, limit)
    return success(list)
  },

  // 收藏服务
  'POST /api/service/:serviceId/favorite': (params) => {
    const service = services.find(s => s.id === params.serviceId)
    if (service) {
      service.isFavorited = true
      return success(null, '收藏成功')
    }
    return error('服务不存在')
  },

  // 取消收藏服务
  'POST /api/service/:serviceId/unfavorite': (params) => {
    const service = services.find(s => s.id === params.serviceId)
    if (service) {
      service.isFavorited = false
      return success(null, '已取消收藏')
    }
    return error('服务不存在')
  },

  // 获取服务评价
  'GET /api/service/:serviceId/reviews': (params) => {
    const list = serviceReviews.filter(r => r.serviceId === params.serviceId)
    return success(paginate(list, params.page, params.pageSize))
  }
}

export default {
  data,
  routes
}
