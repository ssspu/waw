/**
 * 设计师模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 设计师列表
const designers = [
  {
    id: '1',
    name: '李天天',
    avatar: '/static/avatar/avatar.png',
    coverImage: '/static/background-image/designer-cover.png',
    role: '美发师',
    level: '高级',
    position: '店长',
    experience: 12,
    introduction: '从业12年，毕业于沙宣美发学院，擅长各种造型设计，有丰富的设计经验。',
    specialties: ['短发裁剪', '染发设计', '女士造型', '烫发设计'],
    rating: 4.8,
    reviewCount: 287,
    serviceCount: 1234,
    worksCount: 123,
    followerCount: 2000,
    favoriteCount: 560,
    appointmentCount: 1244,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    brandAvatar: '/static/avatar/avatar.png',
    isFollowed: false,
    isFavorited: false,
    tags: ['提前预约', '上门服务', '技术专业'],
    certifications: ['高级美发师证', '沙宣学院认证'],
    statistics: {
      appointmentCount: 1244,
      followerCount: 2000,
      experience: 12,
      rating: 4.8
    }
  },
  {
    id: '2',
    name: '张小雨',
    avatar: '/static/avatar/avatar.png',
    coverImage: '/static/background-image/designer-cover.png',
    role: '美发师',
    level: '高级',
    position: '总监',
    experience: 10,
    introduction: '专注烫发和护发领域，为您打造独特造型。',
    specialties: ['烫发设计', '护发养护', '造型设计'],
    rating: 4.9,
    reviewCount: 356,
    serviceCount: 2156,
    worksCount: 189,
    followerCount: 3500,
    favoriteCount: 890,
    appointmentCount: 2380,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    brandAvatar: '/static/avatar/avatar.png',
    isFollowed: true,
    isFavorited: false,
    tags: ['提前预约', '技术专业', '服务贴心'],
    certifications: ['高级美发师证'],
    statistics: {
      appointmentCount: 2380,
      followerCount: 3500,
      experience: 10,
      rating: 4.9
    }
  },
  {
    id: '3',
    name: '王大明',
    avatar: '/static/avatar/avatar.png',
    coverImage: '/static/background-image/designer-cover.png',
    role: '美发师',
    level: '资深',
    position: '首席',
    experience: 8,
    introduction: '男士造型专家，擅长潮流发型设计。',
    specialties: ['男士造型', '渐变染发', '潮流发型'],
    rating: 4.7,
    reviewCount: 245,
    serviceCount: 987,
    worksCount: 98,
    followerCount: 1500,
    favoriteCount: 320,
    appointmentCount: 890,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    brandAvatar: '/static/avatar/avatar.png',
    isFollowed: false,
    isFavorited: true,
    tags: ['提前预约', '快速服务'],
    certifications: ['中级美发师证'],
    statistics: {
      appointmentCount: 890,
      followerCount: 1500,
      experience: 8,
      rating: 4.7
    }
  },
  {
    id: '4',
    name: '刘美丽',
    avatar: '/static/avatar/avatar.png',
    coverImage: '/static/background-image/designer-cover.png',
    role: '美发师',
    level: '高级',
    position: '设计师',
    experience: 6,
    introduction: '女士烫发造型专家，打造属于你的独特风格。',
    specialties: ['女士烫发', '造型设计', '染发'],
    rating: 4.8,
    reviewCount: 198,
    serviceCount: 1567,
    worksCount: 156,
    followerCount: 2200,
    favoriteCount: 450,
    appointmentCount: 1100,
    brandId: '2',
    brandName: '成都NICE造型沙龙',
    brandAvatar: '/static/avatar/avatar.png',
    isFollowed: false,
    isFavorited: false,
    tags: ['提前预约', '上门服务'],
    certifications: ['高级美发师证', '染发专家认证'],
    statistics: {
      appointmentCount: 1100,
      followerCount: 2200,
      experience: 6,
      rating: 4.8
    }
  }
]

// 设计师服务项目
const designerServices = [
  { id: '1', designerId: '1', name: '精致剪发', price: 99, originalPrice: 128, duration: 45, soldCount: 2356, image: '/static/service/service1.png' },
  { id: '2', designerId: '1', name: '时尚烫发', price: 399, originalPrice: 499, duration: 120, soldCount: 1289, image: '/static/service/service2.png' },
  { id: '3', designerId: '1', name: '个性染发', price: 299, originalPrice: 399, duration: 90, soldCount: 1567, image: '/static/service/service3.png' },
  { id: '4', designerId: '2', name: '深度护理', price: 199, originalPrice: 258, duration: 60, soldCount: 876, image: '/static/service/service4.png' },
  { id: '5', designerId: '2', name: '时尚烫发', price: 499, originalPrice: 599, duration: 150, soldCount: 956, image: '/static/service/service2.png' }
]

// 设计师作品
const designerWorks = [
  { id: '1', designerId: '1', image: '/static/works/work1.png', title: '女士短发造型', description: '清爽短发，展现独特气质', likes: 236, time: '2025-11-20' },
  { id: '2', designerId: '1', image: '/static/works/work2.png', title: '时尚渐变染发', description: '个性渐变色，潮流前沿', likes: 189, time: '2025-11-18' },
  { id: '3', designerId: '1', image: '/static/works/work3.png', title: '韩式烫发', description: '自然卷度，优雅气质', likes: 156, time: '2025-11-15' },
  { id: '4', designerId: '2', image: '/static/works/work4.png', title: '柔顺护理效果', description: '深度护理后的柔顺效果', likes: 98, time: '2025-11-12' }
]

// 设计师评价
const designerReviews = [
  {
    id: '1',
    designerId: '1',
    userId: '100',
    userName: '加菲猫',
    userAvatar: '/static/avatar/avatar.png',
    rating: 5.0,
    content: '李老师技术真的很好，剪完效果超级满意！下次还找他！',
    images: ['/static/review/review1.png'],
    time: '2025-11-25',
    serviceName: '精致剪发',
    likeCount: 56,
    replyCount: 1
  },
  {
    id: '2',
    designerId: '1',
    userId: '101',
    userName: '小美',
    userAvatar: '/static/avatar/avatar.png',
    rating: 4.8,
    content: '烫发效果很自然，很喜欢！',
    images: [],
    time: '2025-11-22',
    serviceName: '时尚烫发',
    likeCount: 23,
    replyCount: 0
  }
]

// Mock 数据
export const data = {
  designers,
  designerServices,
  designerWorks,
  designerReviews
}

// Mock 路由处理
export const routes = {
  // 获取设计师列表
  'GET /api/designer/list': (params) => {
    let list = [...designers]
    if (params.keyword) {
      list = list.filter(d => d.name.includes(params.keyword) || d.specialties.some(s => s.includes(params.keyword)))
    }
    if (params.level) {
      list = list.filter(d => d.level === params.level)
    }
    if (params.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    } else if (params.sortBy === 'serviceCount') {
      list.sort((a, b) => b.serviceCount - a.serviceCount)
    }
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取设计师详情
  'GET /api/designer/detail/:designerId': (params) => {
    const designer = designers.find(d => d.id === params.designerId)
    return designer ? success(designer) : error('设计师不存在')
  },

  // 获取设计师基本信息
  'GET /api/designer/info/:designerId': (params) => {
    const designer = designers.find(d => d.id === params.designerId)
    if (!designer) return error('设计师不存在')
    return success({
      id: designer.id,
      name: designer.name,
      avatar: designer.avatar,
      role: designer.role,
      level: designer.level,
      rating: designer.rating,
      isFollowed: designer.isFollowed
    })
  },

  // 获取设计师服务项目
  'GET /api/designer/:designerId/services': (params) => {
    const list = designerServices.filter(s => s.designerId === params.designerId)
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取设计师作品集
  'GET /api/designer/:designerId/works': (params) => {
    const list = designerWorks.filter(w => w.designerId === params.designerId)
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取设计师评价列表
  'GET /api/designer/:designerId/reviews': (params) => {
    let list = designerReviews.filter(r => r.designerId === params.designerId)
    if (params.rating) {
      list = list.filter(r => Math.floor(r.rating) === parseInt(params.rating))
    }
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取设计师可预约时间
  'GET /api/designer/:designerId/available-time': (params) => {
    return success({
      date: params.date,
      availableTimes: [
        { time: '10:00', available: true },
        { time: '11:00', available: true },
        { time: '13:00', available: false },
        { time: '14:00', available: true },
        { time: '15:00', available: true },
        { time: '16:00', available: false },
        { time: '17:00', available: true },
        { time: '18:00', available: false },
        { time: '19:00', available: true },
        { time: '20:00', available: true }
      ]
    })
  },

  // 预约设计师
  'POST /api/designer/:designerId/appointment': (params) => {
    return success({
      appointmentId: 'APT' + Date.now(),
      designerId: params.designerId,
      serviceId: params.serviceId,
      appointmentTime: params.appointmentTime
    }, '预约成功')
  },

  // 关注设计师
  'POST /api/designer/:designerId/follow': (params) => {
    const designer = designers.find(d => d.id === params.designerId)
    if (designer) {
      designer.isFollowed = true
      designer.followerCount++
      return success(null, '关注成功')
    }
    return error('设计师不存在')
  },

  // 取消关注设计师
  'POST /api/designer/:designerId/unfollow': (params) => {
    const designer = designers.find(d => d.id === params.designerId)
    if (designer) {
      designer.isFollowed = false
      designer.followerCount--
      return success(null, '已取消关注')
    }
    return error('设计师不存在')
  },

  // 收藏设计师
  'POST /api/designer/:designerId/favorite': (params) => {
    const designer = designers.find(d => d.id === params.designerId)
    if (designer) {
      designer.isFavorited = true
      designer.favoriteCount++
      return success(null, '收藏成功')
    }
    return error('设计师不存在')
  },

  // 取消收藏设计师
  'POST /api/designer/:designerId/unfavorite': (params) => {
    const designer = designers.find(d => d.id === params.designerId)
    if (designer) {
      designer.isFavorited = false
      designer.favoriteCount--
      return success(null, '已取消收藏')
    }
    return error('设计师不存在')
  },

  // 获取推荐设计师
  'GET /api/designer/recommend': (params) => {
    const limit = params.limit || 4
    const list = [...designers].sort((a, b) => b.rating - a.rating).slice(0, limit)
    return success(list)
  },

  // 获取热门设计师
  'GET /api/designer/hot': (params) => {
    const limit = params.limit || 4
    const list = [...designers].sort((a, b) => b.serviceCount - a.serviceCount).slice(0, limit)
    return success(list)
  }
}

export default {
  data,
  routes
}
