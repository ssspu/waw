/**
 * 品牌馆模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 品牌馆列表
const brands = [
  {
    id: '1',
    name: '金龙大好人美发沙龙',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    coverImage: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png',
    badge: '舒',
    certification: '企业认证',
    nature: '专业店',
    type: '专业美发店',
    mainServices: '剪发烫发染发护发',
    businessDays: '周一 - 周日',
    establishedYear: 2017,
    introduction: '从业19年，毕业沙宣美发学院，擅长各种型设计师有丰富的设计经验擅长女士型烫发设计短发型等多种服务',
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
    distance: '2.7km',
    businessHours: '10:00-21:00',
    restDay: '周休息',
    phone: '028-88888888',
    status: 'open',
    establishDate: '2017-11-20',
    area: '160m²',
    stationCount: 15,
    advanceBookingHours: 3,
    isFollowed: false,
    isFavorited: false,
    tags: ['代客泊车', '免费茶点', '共享工位', '7天无忧'],
    promotions: ['满100-5', '满500-50']
  },
  {
    id: '2',
    name: '成都NICE发型沙龙',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
    coverImage: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png',
    badge: '精品',
    certification: '企业认证',
    nature: '连锁品牌',
    type: '连锁美发品牌',
    mainServices: '发型设计烫染护理',
    businessDays: '周一 - 周日',
    establishedYear: 2012,
    introduction: '成都知名美发连锁品牌，多年专注时尚发型服务',
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
    distance: '5.2km',
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
  },
  {
    id: '3',
    name: '潮流发型工作室',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png',
    coverImage: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png',
    badge: '潮流',
    certification: '个人认证',
    nature: '工作室',
    type: '潮流工作室',
    mainServices: '潮流发型个性染发',
    businessDays: '周三 - 周日',
    establishedYear: 2019,
    introduction: '专注潮流发型设计，为年轻人打造个性发型',
    rating: 4.7,
    reviewCount: 876,
    designerCount: 5,
    serviceCount: 18,
    worksCount: 156,
    followerCount: 1200,
    appointmentCount: 890,
    address: {
      province: '四川省',
      city: '成都市',
      district: '青羊区',
      street: '宽窄巷子旁',
      detail: '创意园区A栋302',
      latitude: 30.669,
      longitude: 104.055
    },
    distance: '3.5km',
    businessHours: '11:00-21:00',
    restDay: '周二休息',
    phone: '028-77777777',
    status: 'open',
    establishDate: '2019-03-15',
    area: '80m²',
    stationCount: 6,
    advanceBookingHours: 2,
    isFollowed: false,
    isFavorited: false,
    tags: ['个定制', '潮流前沿', '年轻时尚'],
    promotions: ['首单85折']
  },
  {
    id: '4',
    name: '优雅女士美发馆',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png',
    coverImage: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
    badge: '优雅',
    certification: '企业认证',
    nature: '专业店',
    type: '女士专属美发',
    mainServices: '女士发型护理养护',
    businessDays: '周一 - 周日',
    establishedYear: 2015,
    introduction: '专注女士美发服务，优雅环境，贴心服务',
    rating: 4.8,
    reviewCount: 1567,
    designerCount: 12,
    serviceCount: 32,
    worksCount: 267,
    followerCount: 2800,
    appointmentCount: 1890,
    address: {
      province: '四川省',
      city: '成都市',
      district: '高新区',
      street: '天府三街',
      detail: '环球中心W3栋1205',
      latitude: 30.545,
      longitude: 104.068
    },
    distance: '7.8km',
    businessHours: '10:00-20:00',
    restDay: '无休',
    phone: '028-66666666',
    status: 'open',
    establishDate: '2015-08-20',
    area: '200m²',
    stationCount: 18,
    advanceBookingHours: 4,
    isFollowed: false,
    isFavorited: true,
    tags: ['女士专属', '优雅环境', '贴心服务', '免费茶点'],
    promotions: ['会员9折', '生日特惠']
  },
  {
    id: '5',
    name: '男士理发馆',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png',
    coverImage: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png',
    badge: '专业',
    certification: '企业认证',
    nature: '专业店',
    type: '男士专属理发',
    mainServices: '男士剪发修面刮胡',
    businessDays: '周 - 周日',
    establishedYear: 2018,
    introduction: '专业男士理发服务，快高效，打精神帅气形象',
    rating: 4.6,
    reviewCount: 987,
    designerCount: 8,
    serviceCount: 15,
    worksCount: 145,
    followerCount: 1500,
    appointmentCount: 1234,
    address: {
      province: '四川省',
      city: '成都市',
      district: '成华区',
      street: '建设路',
      detail: '万科金域蓝湾商铺108',
      latitude: 30.678,
      longitude: 104.098
    },
    distance: '4.2km',
    businessHours: '09:00-21:00',
    restDay: '无休',
    phone: '028-55555555',
    status: 'open',
    establishDate: '2018-06-01',
    area: '120m²',
    stationCount: 10,
    advanceBookingHours: 1,
    isFollowed: false,
    isFavorited: false,
    tags: ['男士专属', '快服务', '价格实惠'],
    promotions: ['充10%']
  },
  {
    id: '6',
    name: '韩式发型沙龙',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png',
    coverImage: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png',
    badge: '韩风',
    certification: '企业认证',
    nature: '连锁品牌',
    introduction: '正宗韩式美发技术，打造韩剧同款发型',
    rating: 4.9,
    reviewCount: 1876,
    designerCount: 10,
    serviceCount: 28,
    worksCount: 312,
    followerCount: 4200,
    appointmentCount: 2560,
    address: {
      province: '四川省',
      city: '成都市',
      district: '锦江区',
      street: '春熙路',
      detail: '群光广场负楼B108',
      latitude: 30.655,
      longitude: 104.080
    },
    distance: '1.5km',
    businessHours: '10:00-22:00',
    restDay: '无休',
    phone: '028-44444444',
    status: 'open',
    establishDate: '2016-09-10',
    area: '250m²',
    stationCount: 22,
    advanceBookingHours: 3,
    isFollowed: false,
    isFavorited: false,
    tags: ['韩式术', '明星同款', '预约服务', '免费设计'],
    promotions: ['新客7折', '会员积分']
  },
  {
    id: '7',
    name: '发艺空间',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    coverImage: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png',
    badge: '创意',
    certification: '个人认证',
    nature: '工作室',
    introduction: '创意发型设计，每款都是独一无二的艺术品',
    rating: 4.7,
    reviewCount: 654,
    designerCount: 4,
    serviceCount: 12,
    worksCount: 189,
    followerCount: 980,
    appointmentCount: 567,
    address: {
      province: '四川省',
      city: '成都市',
      district: '武侯区',
      street: '玉林路',
      detail: '小酒馆旁创意空间2楼',
      latitude: 30.623,
      longitude: 104.045
    },
    distance: '6.3km',
    businessHours: '12:00-21:00',
    restDay: '周休息',
    phone: '028-33333333',
    status: 'open',
    establishDate: '2020-01-15',
    area: '60m²',
    stationCount: 4,
    advanceBookingHours: 2,
    isFollowed: false,
    isFavorited: false,
    tags: ['创意设计', '艺术风格', '预约制'],
    promotions: ['首单8折']
  },
  {
    id: '8',
    name: '尊享美发会',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
    coverImage: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png',
    badge: '尊享',
    certification: '企业认证',
    nature: '高端会',
    introduction: '高端私密美发会，对专属服务，尊贵体验',
    rating: 4.9,
    reviewCount: 567,
    designerCount: 6,
    serviceCount: 20,
    worksCount: 234,
    followerCount: 1800,
    appointmentCount: 890,
    address: {
      province: '四川省',
      city: '成都市',
      district: '高新区',
      street: '交子大道',
      detail: '银泰中心顶层会',
      latitude: 30.548,
      longitude: 104.062
    },
    distance: '8.5km',
    businessHours: '10:00-20:00',
    restDay: '预约制',
    phone: '028-22222222',
    status: 'open',
    establishDate: '2014-12-01',
    area: '350m²',
    stationCount: 8,
    advanceBookingHours: 24,
    isFollowed: false,
    isFavorited: false,
    tags: ['VIP服务', '私密空间', '高端定制', '专属管家'],
    promotions: ['会员专享']
  }
]

// 品牌馆设计师
const brandDesigners = [
  {
    id: '1',
    brandId: '1',
    name: '李天天',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美发师',
    level: '高级',
    category: 'manager',
    position: '店长｜从业12年',
    specialties: ['短发裁剪', '染发设计'],
    rating: 4.8,
    serviceCount: 287,
    worksCount: 123,
    tags: ['提前预约', '上门服务', '术专业'],
    price: 799,
    discount: '预约优惠10%',
    soldCount: 1234
  },
  {
    id: '2',
    brandId: '1',
    name: '张小雨',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美发师',
    level: '高级',
    category: 'director',
    position: '监｜从业10年',
    specialties: ['烫发设计', '护发养护'],
    rating: 4.9,
    serviceCount: 356,
    worksCount: 189,
    tags: ['提前预约', '术专业', '服务贴心'],
    price: 899,
    discount: '新客优惠15%',
    soldCount: 2156
  },
  {
    id: '3',
    brandId: '1',
    name: '王大明',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美发师',
    level: '资深',
    category: 'chief',
    position: '首席｜从业8年',
    specialties: ['男士发型', '渐变染发'],
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
  { id: '1', brandId: '1', name: '精致剪发', price: 99, originalPrice: 128, image: 'https://bioflex.cn/static/service/service1.png', soldCount: 2356, categoryId: '1' },
  { id: '2', brandId: '1', name: '时尚烫发', price: 399, originalPrice: 499, image: 'https://bioflex.cn/static/service/service2.png', soldCount: 1289, categoryId: '2' },
  { id: '3', brandId: '1', name: '个染发', price: 299, originalPrice: 399, image: 'https://bioflex.cn/static/service/service3.png', soldCount: 1567, categoryId: '3' },
  { id: '4', brandId: '1', name: '深度护理', price: 199, originalPrice: 258, image: 'https://bioflex.cn/static/service/service4.png', soldCount: 876, categoryId: '4' }
]

// 品牌馆作品
const brandWorks = [
  { id: '1', brandId: '1', image: 'https://bioflex.cn/static/works/work1.png', title: '女士短发发型', likes: 236, designerId: '1', designerName: '李天天' },
  { id: '2', brandId: '1', image: 'https://bioflex.cn/static/works/work2.png', title: '时尚渐变染发', likes: 189, designerId: '2', designerName: '张小雨' },
  { id: '3', brandId: '1', image: 'https://bioflex.cn/static/works/work3.png', title: '韩式烫发', likes: 156, designerId: '1', designerName: '李天天' },
  { id: '4', brandId: '1', image: 'https://bioflex.cn/static/works/work4.png', title: '男士潮流发型', likes: 98, designerId: '3', designerName: '王大明' }
]

// 品牌馆评价
const brandReviews = [
  {
    id: '1',
    brandId: '1',
    userId: '100',
    userName: '加菲猫',
    userAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
    rating: 5.0,
    content: '环境特别好，服务很贴心，设计师术也很棒，下次还会再来！',
    images: ['https://bioflex.cn/static/review/review1.png', 'https://bioflex.cn/static/review/review2.png'],
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
    userAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
    rating: 4.8,
    content: '术很好，很满意！',
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
