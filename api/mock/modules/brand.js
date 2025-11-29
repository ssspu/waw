/**
 * 品牌馆模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 品牌馆列表
const brands = [
  {
    id: '1',
    name: '金龙大好人美发沙龙',
    avatar: '/static/avatar/avatar.png',
    coverImage: '/static/background-image/brand-cover.png',
    badge: '舒适',
    certification: '企业认证',
    nature: '工作室、专业店',
    introduction: '从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长女士造型、烫发设计、短发造型等多种服务。',
    rating: 4.8,
    reviewCount: 1236,
    designerCount: 15,
    serviceCount: 28,
    worksCount: 234,
    followerCount: 2000,
    appointmentCount: 1244,
    address: {
      province: '四川省',
      city: '成都市',
      district: '锦江区',
      street: '红星路120号',
      detail: 'IFS国际东门2栋607室',
      latitude: 30.657,
      longitude: 104.065
    },
    distance: 2.7,
    businessHours: '10:00-21:00',
    restDay: '周一休息',
    phone: '028-88888888',
    status: 'open', // open/closed/rest
    establishDate: '2017-11-20',
    area: '160m²',
    stationCount: 15,
    advanceBookingHours: 3,
    isFollowed: false,
    isFavorited: false,
    tags: ['安心服务', '7天无忧', '免费设计', '小吃水果', '预约服务'],
    promotions: ['满100-5', '满500-50']
  },
  {
    id: '2',
    name: '成都NICE造型沙龙',
    avatar: '/static/avatar/avatar.png',
    coverImage: '/static/background-image/brand-cover.png',
    badge: '精品',
    certification: '企业认证',
    nature: '连锁品牌',
    introduction: '成都知名美发连锁品牌，多年专注时尚造型服务。',
    rating: 4.9,
    reviewCount: 2156,
    designerCount: 8,
    serviceCount: 35,
    worksCount: 189,
    followerCount: 3500,
    appointmentCount: 2380,
    address: {
      province: '四川省',
      city: '成都市',
      district: '武侯区',
      street: '天府大道中段666号',
      detail: '时代广场3楼',
      latitude: 30.573,
      longitude: 104.066
    },
    distance: 5.2,
    businessHours: '09:30-22:00',
    restDay: '无休',
    phone: '028-99999999',
    status: 'open',
    establishDate: '2012-05-18',
    area: '280m²',
    stationCount: 20,
    advanceBookingHours: 2,
    isFollowed: true,
    isFavorited: false,
    tags: ['连锁品牌', '专业团队', '高端服务'],
    promotions: ['新客8折', '会员95折']
  }
]

// 品牌馆设计师
const brandDesigners = [
  {
    id: '1',
    brandId: '1',
    name: '李天天',
    avatar: '/static/avatar/avatar.png',
    role: '美发师',
    level: '高级',
    category: 'manager',
    position: '店长｜从业12年',
    specialties: ['短发裁剪', '染发设计'],
    rating: 4.8,
    serviceCount: 287,
    worksCount: 123,
    tags: ['提前预约', '上门服务', '技术专业'],
    price: 799,
    discount: '预约优惠10%',
    soldCount: 1234
  },
  {
    id: '2',
    brandId: '1',
    name: '张小雨',
    avatar: '/static/avatar/avatar.png',
    role: '美发师',
    level: '高级',
    category: 'director',
    position: '总监｜从业10年',
    specialties: ['烫发设计', '护发养护'],
    rating: 4.9,
    serviceCount: 356,
    worksCount: 189,
    tags: ['提前预约', '技术专业', '服务贴心'],
    price: 899,
    discount: '新客优惠15%',
    soldCount: 2156
  },
  {
    id: '3',
    brandId: '1',
    name: '王大明',
    avatar: '/static/avatar/avatar.png',
    role: '美发师',
    level: '资深',
    category: 'chief',
    position: '首席｜从业8年',
    specialties: ['男士造型', '渐变染发'],
    rating: 4.7,
    serviceCount: 245,
    worksCount: 98,
    tags: ['提前预约', '快速服务'],
    price: 599,
    discount: '预约优惠10%',
    soldCount: 987
  }
]

// 品牌馆服务
const brandServices = [
  { id: '1', brandId: '1', name: '精致剪发', price: 99, originalPrice: 128, image: '/static/service/service1.png', soldCount: 2356, categoryId: '1' },
  { id: '2', brandId: '1', name: '时尚烫发', price: 399, originalPrice: 499, image: '/static/service/service2.png', soldCount: 1289, categoryId: '2' },
  { id: '3', brandId: '1', name: '个性染发', price: 299, originalPrice: 399, image: '/static/service/service3.png', soldCount: 1567, categoryId: '3' },
  { id: '4', brandId: '1', name: '深度护理', price: 199, originalPrice: 258, image: '/static/service/service4.png', soldCount: 876, categoryId: '4' }
]

// 品牌馆作品
const brandWorks = [
  { id: '1', brandId: '1', image: '/static/works/work1.png', title: '女士短发造型', likes: 236, designerId: '1', designerName: '李天天' },
  { id: '2', brandId: '1', image: '/static/works/work2.png', title: '时尚渐变染发', likes: 189, designerId: '2', designerName: '张小雨' },
  { id: '3', brandId: '1', image: '/static/works/work3.png', title: '韩式烫发', likes: 156, designerId: '1', designerName: '李天天' },
  { id: '4', brandId: '1', image: '/static/works/work4.png', title: '男士潮流造型', likes: 98, designerId: '3', designerName: '王大明' }
]

// 品牌馆评价
const brandReviews = [
  {
    id: '1',
    brandId: '1',
    userId: '100',
    userName: '加菲猫',
    userAvatar: '/static/avatar/avatar.png',
    rating: 5.0,
    content: '环境特别好，服务很贴心，设计师技术也很棒，下次还会再来！',
    images: ['/static/review/review1.png', '/static/review/review2.png'],
    time: '2025-11-25',
    serviceName: '时尚烫发',
    designerName: '李天天',
    likeCount: 56,
    replyCount: 2
  },
  {
    id: '2',
    brandId: '1',
    userId: '101',
    userName: '小美',
    userAvatar: '/static/avatar/avatar.png',
    rating: 4.8,
    content: '技术很好，很满意！',
    images: [],
    time: '2025-11-22',
    serviceName: '精致剪发',
    designerName: '张小雨',
    likeCount: 23,
    replyCount: 0
  }
]

// Mock 数据
export const data = {
  brands,
  brandDesigners,
  brandServices,
  brandWorks,
  brandReviews
}

// Mock 路由处理
export const routes = {
  // 获取品牌馆列表
  'GET /api/brand/list': (params) => {
    let list = [...brands]
    if (params.keyword) {
      list = list.filter(b => b.name.includes(params.keyword))
    }
    if (params.sortBy === 'distance') {
      list.sort((a, b) => a.distance - b.distance)
    } else if (params.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    }
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取品牌馆详情
  'GET /api/brand/detail/:brandId': (params) => {
    const brand = brands.find(b => b.id === params.brandId)
    return brand ? success(brand) : error('品牌馆不存在')
  },

  // 获取品牌馆基本信息
  'GET /api/brand/info/:brandId': (params) => {
    const brand = brands.find(b => b.id === params.brandId)
    if (!brand) return error('品牌馆不存在')
    return success({
      id: brand.id,
      name: brand.name,
      avatar: brand.avatar,
      badge: brand.badge,
      rating: brand.rating,
      isFollowed: brand.isFollowed
    })
  },

  // 获取品牌馆设计师列表
  'GET /api/brand/:brandId/designers': (params) => {
    const list = brandDesigners.filter(d => d.brandId === params.brandId)
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取品牌馆服务列表
  'GET /api/brand/:brandId/services': (params) => {
    let list = brandServices.filter(s => s.brandId === params.brandId)
    if (params.categoryId) {
      list = list.filter(s => s.categoryId === params.categoryId)
    }
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取品牌馆预约信息
  'GET /api/brand/:brandId/appointments': (params) => {
    return success({
      availableTimes: ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '19:00', '20:00'],
      bookedTimes: ['13:00', '18:00']
    })
  },

  // 获取品牌馆作品集
  'GET /api/brand/:brandId/works': (params) => {
    const list = brandWorks.filter(w => w.brandId === params.brandId)
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取品牌馆评价列表
  'GET /api/brand/:brandId/reviews': (params) => {
    let list = brandReviews.filter(r => r.brandId === params.brandId)
    if (params.rating) {
      list = list.filter(r => Math.floor(r.rating) === parseInt(params.rating))
    }
    return success(paginate(list, params.page, params.pageSize))
  },

  // 关注品牌馆
  'POST /api/brand/:brandId/follow': (params) => {
    const brand = brands.find(b => b.id === params.brandId)
    if (brand) {
      brand.isFollowed = true
      brand.followerCount++
      return success(null, '关注成功')
    }
    return error('品牌馆不存在')
  },

  // 取消关注品牌馆
  'POST /api/brand/:brandId/unfollow': (params) => {
    const brand = brands.find(b => b.id === params.brandId)
    if (brand) {
      brand.isFollowed = false
      brand.followerCount--
      return success(null, '已取消关注')
    }
    return error('品牌馆不存在')
  },

  // 收藏品牌馆
  'POST /api/brand/:brandId/favorite': (params) => {
    const brand = brands.find(b => b.id === params.brandId)
    if (brand) {
      brand.isFavorited = true
      return success(null, '收藏成功')
    }
    return error('品牌馆不存在')
  },

  // 取消收藏品牌馆
  'POST /api/brand/:brandId/unfavorite': (params) => {
    const brand = brands.find(b => b.id === params.brandId)
    if (brand) {
      brand.isFavorited = false
      return success(null, '已取消收藏')
    }
    return error('品牌馆不存在')
  },

  // 获取附近品牌馆
  'GET /api/brand/nearby': (params) => {
    const list = brands.filter(b => b.distance <= (params.radius || 10))
    return success(list)
  },

  // 获取推荐品牌馆
  'GET /api/brand/recommend': (params) => {
    const limit = params.limit || 4
    return success(brands.slice(0, limit))
  }
}

export default {
  data,
  routes
}
