/**
 * 通用模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 应用配置
const appConfig = {
  version: '1.0.0',
  minVersion: '1.0.0',
  updateUrl: '',
  forceUpdate: false,
  announcement: '',
  features: {
    enableVip: true,
    enableCoupon: true,
    enableMessage: true
  },
  agreements: {
    userAgreement: '/pages/setting/agreement?type=user',
    privacyPolicy: '/pages/setting/agreement?type=privacy',
    serviceAgreement: '/pages/setting/agreement?type=service'
  },
  customerService: {
    phone: '400-888-8888',
    workTime: '09:00-21:00',
    wechat: 'waw_service'
  }
}

// 首页数据
const homeData = {
  banners: [
    { id: '1', image: '/static/banner/banner1.png', link: '/pages/brand/info?id=1', title: '双12活动' },
    { id: '2', image: '/static/banner/banner2.png', link: '/pages/coupon/index', title: '领券中心' },
    { id: '3', image: '/static/banner/banner3.png', link: '/pages/designer/info?id=1', title: '明星设计师' }
  ],
  categories: [
    { id: '1', name: '美发', icon: '/static/icon/hair.png' },
    { id: '2', name: '美容', icon: '/static/icon/beauty.png' },
    { id: '3', name: '美甲', icon: '/static/icon/nail.png' },
    { id: '4', name: '美体', icon: '/static/icon/body.png' },
    { id: '5', name: '化妆', icon: '/static/icon/makeup.png' }
  ],
  hotDesigners: [
    { id: '1', name: '李天天', avatar: '/static/avatar/avatar.png', role: '美发师', rating: 4.8 },
    { id: '2', name: '张小雨', avatar: '/static/avatar/avatar.png', role: '美发师', rating: 4.9 }
  ],
  recommendBrands: [
    { id: '1', name: '金龙大好人美发沙龙', avatar: '/static/avatar/avatar.png', rating: 4.8, distance: 2.7 },
    { id: '2', name: '成都NICE造型沙龙', avatar: '/static/avatar/avatar.png', rating: 4.9, distance: 5.2 }
  ],
  hotServices: [
    { id: '1', name: '精致剪发', price: 99, image: '/static/service/service1.png', soldCount: 2356 },
    { id: '2', name: '时尚烫发', price: 399, image: '/static/service/service2.png', soldCount: 1289 }
  ]
}

// Banner 列表
const banners = {
  home: homeData.banners,
  brand: [
    { id: '10', image: '/static/banner/brand-banner1.png', link: '', title: '品牌活动' }
  ],
  designer: [
    { id: '20', image: '/static/banner/designer-banner1.png', link: '', title: '设计师招募' }
  ]
}

// 分类列表
const categories = {
  service: [
    { id: '1', name: '剪发', parentId: null },
    { id: '2', name: '烫发', parentId: null },
    { id: '3', name: '染发', parentId: null },
    { id: '4', name: '护理', parentId: null },
    { id: '5', name: '造型', parentId: null }
  ],
  designer: [
    { id: '1', name: '美发师', parentId: null },
    { id: '2', name: '美容师', parentId: null },
    { id: '3', name: '化妆师', parentId: null },
    { id: '4', name: '美甲师', parentId: null },
    { id: '5', name: '美体师', parentId: null }
  ]
}

// 热门搜索关键词
const hotKeywords = ['短发', '烫发', '染发', '护理', '造型', '新娘妆', '美甲']

// 搜索历史
let searchHistory = ['李天天', '金龙大好人', '剪发']

// 地区数据
const regions = [
  { code: '510000', name: '四川省', parentCode: null },
  { code: '510100', name: '成都市', parentCode: '510000' },
  { code: '510104', name: '锦江区', parentCode: '510100' },
  { code: '510105', name: '青羊区', parentCode: '510100' },
  { code: '510106', name: '金牛区', parentCode: '510100' },
  { code: '510107', name: '武侯区', parentCode: '510100' },
  { code: '510108', name: '成华区', parentCode: '510100' },
  { code: '510112', name: '龙泉驿区', parentCode: '510100' },
  { code: '510113', name: '青白江区', parentCode: '510100' },
  { code: '510114', name: '新都区', parentCode: '510100' },
  { code: '510115', name: '温江区', parentCode: '510100' },
  { code: '510116', name: '双流区', parentCode: '510100' },
  { code: '510117', name: '郫都区', parentCode: '510100' }
]

// 热门城市
const hotCities = [
  { code: '510100', name: '成都' },
  { code: '110000', name: '北京' },
  { code: '310000', name: '上海' },
  { code: '440100', name: '广州' },
  { code: '440300', name: '深圳' },
  { code: '330100', name: '杭州' }
]

// 银行列表
const banks = [
  { code: 'ICBC', name: '中国工商银行', logo: '/static/bank/icbc.png' },
  { code: 'CCB', name: '中国建设银行', logo: '/static/bank/ccb.png' },
  { code: 'ABC', name: '中国农业银行', logo: '/static/bank/abc.png' },
  { code: 'BOC', name: '中国银行', logo: '/static/bank/boc.png' },
  { code: 'CMB', name: '招商银行', logo: '/static/bank/cmb.png' },
  { code: 'COMM', name: '交通银行', logo: '/static/bank/comm.png' }
]

// 支付方式
const paymentMethods = [
  { id: 'wechat', name: '微信支付', icon: '/static/icon/wechat-pay.png', enabled: true },
  { id: 'alipay', name: '支付宝', icon: '/static/icon/alipay.png', enabled: true },
  { id: 'balance', name: '余额支付', icon: '/static/icon/balance.png', enabled: true }
]

// 协议内容
const agreements = {
  user: {
    title: '用户服务协议',
    content: '欢迎使用我们的服务...(用户协议全文内容)'
  },
  privacy: {
    title: '隐私政策',
    content: '我们非常重视您的隐私保护...(隐私政策全文内容)'
  },
  service: {
    title: '服务条款',
    content: '请仔细阅读以下服务条款...(服务条款全文内容)'
  }
}

// 关于我们
const aboutInfo = {
  companyName: '众美科技有限公司',
  version: '1.0.0',
  description: '众美平台致力于为用户提供优质的美业服务预约体验。',
  copyright: '© 2025 众美科技 版权所有',
  contact: {
    phone: '400-888-8888',
    email: 'service@waw.com',
    address: '四川省成都市锦江区红星路120号'
  }
}

// Mock 数据
export const data = {
  appConfig,
  homeData,
  banners,
  categories,
  hotKeywords,
  searchHistory,
  regions,
  hotCities,
  banks,
  paymentMethods,
  agreements,
  aboutInfo
}

// Mock 路由处理
export const routes = {
  // 获取应用配置
  'GET /api/common/config': () => {
    return success(appConfig)
  },

  // 获取首页数据
  'GET /api/common/home': () => {
    return success(homeData)
  },

  // 获取 Banner 列表
  'GET /api/common/banners': (params) => {
    const position = params.position || 'home'
    return success(banners[position] || [])
  },

  // 获取分类列表
  'GET /api/common/categories': (params) => {
    const type = params.type || 'service'
    return success(categories[type] || [])
  },

  // 搜索
  'GET /api/common/search': (params) => {
    const { keyword, type = 'all' } = params
    // 简化的搜索结果
    const results = {
      designers: [
        { id: '1', name: '李天天', avatar: '/static/avatar/avatar.png', role: '美发师', rating: 4.8 }
      ],
      brands: [
        { id: '1', name: '金龙大好人美发沙龙', avatar: '/static/avatar/avatar.png', rating: 4.8 }
      ],
      services: [
        { id: '1', name: '精致剪发', price: 99, image: '/static/service/service1.png' }
      ]
    }
    // 添加到搜索历史
    if (keyword && !searchHistory.includes(keyword)) {
      searchHistory.unshift(keyword)
      if (searchHistory.length > 10) searchHistory.pop()
    }
    if (type === 'all') {
      return success(results)
    }
    return success(paginate(results[type + 's'] || [], params.page, params.pageSize))
  },

  // 获取搜索热词
  'GET /api/common/hot-keywords': () => {
    return success(hotKeywords)
  },

  // 获取搜索历史
  'GET /api/common/search-history': () => {
    return success(searchHistory)
  },

  // 清空搜索历史
  'POST /api/common/search-history/clear': () => {
    searchHistory = []
    return success(null, '已清空')
  },

  // 获取地区列表
  'GET /api/common/regions': (params) => {
    const { parentId } = params
    let list = regions
    if (parentId) {
      list = regions.filter(r => r.parentCode === parentId)
    } else {
      list = regions.filter(r => !r.parentCode)
    }
    return success(list)
  },

  // 获取热门城市
  'GET /api/common/hot-cities': () => {
    return success(hotCities)
  },

  // 上传文件
  'POST /api/common/upload': (params) => {
    return success({
      url: '/static/upload/' + Date.now() + '.png',
      name: 'uploaded_file.png'
    })
  },

  // 获取协议内容
  'GET /api/common/agreement/:type': (params) => {
    const agreement = agreements[params.type]
    return agreement ? success(agreement) : error('协议不存在')
  },

  // 获取关于我们
  'GET /api/common/about': () => {
    return success(aboutInfo)
  },

  // 检查更新
  'GET /api/common/check-update': (params) => {
    return success({
      hasUpdate: false,
      version: '1.0.0',
      description: '',
      downloadUrl: '',
      forceUpdate: false
    })
  },

  // 获取客服信息
  'GET /api/common/customer-service': () => {
    return success(appConfig.customerService)
  },

  // 获取银行列表
  'GET /api/common/banks': () => {
    return success(banks)
  },

  // 获取支付方式列表
  'GET /api/common/payment-methods': () => {
    return success(paymentMethods)
  }
}

export default {
  data,
  routes
}
