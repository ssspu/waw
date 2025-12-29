/**
 * 私人领地模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 我的设计师列表（私人领地）- 包含怉有分类
const myDesigners = [
  // ========== 美发师 hairstylist ==========
  {
    id: '1',
    designerId: '1',
    name: '李天天',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美发师',
    level: '高级',
    position: '店长｜从业12年',
    specialties: ['短发裁剪', '染发设计'],
    rating: 4.8,
    category: 'hairstylist',
    lastServiceTime: '2025-11-22 14:30',
    lastServiceName: '精致剪发',
    lastProductName: '欧莱雅护发素',
    serviceCount: 5,
    worksCount: 123,
    totalSpent: 1580
  },
  {
    id: '2',
    designerId: '2',
    name: '张小雨',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美发师',
    level: '资深',
    position: '总监｜从业10年',
    specialties: ['烫发设计', '护发养护'],
    rating: 4.9,
    category: 'hairstylist',
    lastServiceTime: '2025-11-15 16:00',
    lastServiceName: '时尚烫发',
    lastProductName: '施华蔻烫发药水',
    serviceCount: 3,
    worksCount: 89,
    totalSpent: 1197
  },
  {
    id: '3',
    designerId: '3',
    name: '王大明',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美发师',
    level: '高级',
    position: '首席｜从业8年',
    specialties: ['男士造型', '渐变染发'],
    rating: 4.7,
    category: 'hairstylist',
    lastServiceTime: '2025-10-28 10:00',
    lastServiceName: '男士理发',
    lastProductName: '发蜡造型',
    serviceCount: 2,
    worksCount: 56,
    totalSpent: 598
  },
  // ========== 美容师 beautician ==========
  {
    id: '4',
    designerId: '4',
    name: '刘美美',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美容师',
    level: '高级',
    position: '主管｜从业9年',
    specialties: ['面部护理', '深层清洁', '抗衰老'],
    rating: 4.9,
    category: 'beautician',
    lastServiceTime: '2025-11-20 10:00',
    lastServiceName: '深层补水护理',
    lastProductName: 'SK-II精华液',
    serviceCount: 8,
    worksCount: 156,
    totalSpent: 3200
  },
  {
    id: '5',
    designerId: '5',
    name: '陈晓晓',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美容师',
    level: '资深',
    position: '怊术总监｜从业15年',
    specialties: ['问题肌肤', '祛斑祛痘', '美白'],
    rating: 4.8,
    category: 'beautician',
    lastServiceTime: '2025-11-18 14:00',
    lastServiceName: '祛痘护理',
    lastProductName: '理肤泉祛痘精华',
    serviceCount: 6,
    worksCount: 203,
    totalSpent: 2580
  },
  // ========== 化妆师 makeup ==========
  {
    id: '6',
    designerId: '6',
    name: '赵艺琳',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '化妆师',
    level: '资深',
    position: '首席化妆师｜从业11年',
    specialties: ['新娘妆', '晚宴妆', '日常妆'],
    rating: 4.9,
    category: 'makeup',
    lastServiceTime: '2025-11-25 08:00',
    lastServiceName: '新娘跟妆',
    lastProductName: 'MAC口红',
    serviceCount: 12,
    worksCount: 328,
    totalSpent: 5800
  },
  {
    id: '7',
    designerId: '7',
    name: '孙梦瑶',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '化妆师',
    level: '高级',
    position: '化妆师｜从业6年',
    specialties: ['时尚妆容', '舞台妆', '特效妆'],
    rating: 4.7,
    category: 'makeup',
    lastServiceTime: '2025-11-10 15:00',
    lastServiceName: '舞台妆',
    lastProductName: 'NARS腮红',
    serviceCount: 4,
    worksCount: 87,
    totalSpent: 1200
  },
  // ========== 美甲师 nail ==========
  {
    id: '8',
    designerId: '8',
    name: '周小琴',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美甲师',
    level: '高级',
    position: '美甲主管｜从业7年',
    specialties: ['法式美甲', '彩绘', '延长甲'],
    rating: 4.8,
    category: 'nail',
    lastServiceTime: '2025-11-23 11:00',
    lastServiceName: '法式美甲',
    lastProductName: 'OPI甲油',
    serviceCount: 15,
    worksCount: 256,
    totalSpent: 1890
  },
  {
    id: '9',
    designerId: '9',
    name: '吴婷婷',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美甲师',
    level: '资深',
    position: '首席美甲师｜从业10年',
    specialties: ['日式美甲', '3D立体', '水晶甲'],
    rating: 4.9,
    category: 'nail',
    lastServiceTime: '2025-11-21 14:30',
    lastServiceName: '日式美甲',
    lastProductName: 'PREGEL甲胶',
    serviceCount: 20,
    worksCount: 412,
    totalSpent: 3200
  },
  // ========== 美体师 body ==========
  {
    id: '10',
    designerId: '10',
    name: '郑丽娜',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美体师',
    level: '高级',
    position: '美体主管｜从业8年',
    specialties: ['身体塑形', '淋巴排毒', '精油SPA'],
    rating: 4.8,
    category: 'body',
    lastServiceTime: '2025-11-19 16:00',
    lastServiceName: '全身精油SPA',
    lastProductName: '薰衣草精油',
    serviceCount: 10,
    worksCount: 89,
    totalSpent: 4500
  },
  {
    id: '11',
    designerId: '11',
    name: '冯雅雅',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    role: '美体师',
    level: '资深',
    position: '怊术总监｜从业12年',
    specialties: ['产后修复', '纤体瘦身', '肩颈理疗'],
    rating: 4.9,
    category: 'body',
    lastServiceTime: '2025-11-17 10:00',
    lastServiceName: '产后修复',
    lastProductName: '紧致精华',
    serviceCount: 8,
    worksCount: 145,
    totalSpent: 6800
  }
]

// 我的品牌馆列表（私人领地）- 包含怉有分类
const myBrands = [
  // ========== 美发 hair ==========
  {
    id: '1',
    brandId: '1',
    name: '金龙大好人美发沙龙',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    type: '品牌',
    level: '舒适',
    shopType: '专业店',
    openYear: '2012',
    specialties: ['女士造型', '烫发设计', '短发造型'],
    rating: 4.8,
    category: 'hair',
    designerCount: 8,
    serviceCount: 1236,
    lastServiceTime: '2025-11-22 14:30',
    lastService: {
      date: '2025-11-22',
      serviceName: '精致剪发',
      productName: '欧莱雅护发素',
      price: 299
    },
    visitCount: 8,
    totalSpent: 2775
  },
  {
    id: '2',
    brandId: '2',
    name: '成都NICE造型沙龙',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    type: '品牌',
    level: '精品',
    shopType: '连锁店',
    openYear: '2015',
    specialties: ['时尚染发', '护理', '造型'],
    rating: 4.9,
    category: 'hair',
    designerCount: 12,
    serviceCount: 2156,
    lastServiceTime: '2025-10-15 11:00',
    lastService: {
      date: '2025-10-15',
      serviceName: '时尚烫染',
      productName: '施华蔻染膏',
      price: 599
    },
    visitCount: 3,
    totalSpent: 899
  },
  // ========== 美容 beauty ==========
  {
    id: '3',
    brandId: '3',
    name: '悦颜美容会怉',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    type: '品牌',
    level: '高端',
    shopType: '旗舰店',
    openYear: '2010',
    specialties: ['面部护理', '抗衰老', '美白淡斑'],
    rating: 4.9,
    category: 'beauty',
    designerCount: 15,
    serviceCount: 3200,
    lastServiceTime: '2025-11-20 10:00',
    lastService: {
      date: '2025-11-20',
      serviceName: '深层补水',
      productName: 'SK-II精华液',
      price: 680
    },
    visitCount: 12,
    totalSpent: 8500
  },
  {
    id: '4',
    brandId: '4',
    name: '美丽人生SPA馆',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    type: '品牌',
    level: '精品',
    shopType: '精品店',
    openYear: '2018',
    specialties: ['问题肌肤', '祛痘祛斑', '敏感护理'],
    rating: 4.7,
    category: 'beauty',
    designerCount: 8,
    serviceCount: 1560,
    lastServiceTime: '2025-11-18 14:00',
    lastService: {
      date: '2025-11-18',
      serviceName: '祛痘护理',
      productName: '理肤泉精华',
      price: 380
    },
    visitCount: 5,
    totalSpent: 2200
  },
  // ========== 化妆 makeup ==========
  {
    id: '5',
    brandId: '5',
    name: '艺琳造型工作室',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    type: '品牌',
    level: '高端',
    shopType: '工作室',
    openYear: '2016',
    specialties: ['新娘跟妆', '晚宴妆', '商业拍摄'],
    rating: 4.9,
    category: 'makeup',
    designerCount: 6,
    serviceCount: 2800,
    lastServiceTime: '2025-11-25 08:00',
    lastService: {
      date: '2025-11-25',
      serviceName: '新娘跟妆',
      productName: 'MAC彩妆',
      price: 1280
    },
    visitCount: 3,
    totalSpent: 3800
  },
  {
    id: '6',
    brandId: '6',
    name: '潮流彩妆馆',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    type: '品牌',
    level: '舒适',
    shopType: '专业店',
    openYear: '2019',
    specialties: ['日常妆容', '约会妆', '证件照妆'],
    rating: 4.6,
    category: 'makeup',
    designerCount: 4,
    serviceCount: 980,
    lastServiceTime: '2025-11-10 15:00',
    lastService: {
      date: '2025-11-10',
      serviceName: '日常妆容',
      productName: 'NARS彩妆',
      price: 198
    },
    visitCount: 2,
    totalSpent: 580
  },
  // ========== 美甲 nail ==========
  {
    id: '7',
    brandId: '7',
    name: '指尖艺术美甲店',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    type: '品牌',
    level: '精品',
    shopType: '精品店',
    openYear: '2017',
    specialties: ['日式美甲', '法式美甲', '彩绘'],
    rating: 4.8,
    category: 'nail',
    designerCount: 5,
    serviceCount: 1680,
    lastServiceTime: '2025-11-23 11:00',
    lastService: {
      date: '2025-11-23',
      serviceName: '日式美甲',
      productName: 'OPI甲油',
      price: 268
    },
    visitCount: 10,
    totalSpent: 2680
  },
  {
    id: '8',
    brandId: '8',
    name: '美甲小屋',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    type: '品牌',
    level: '舒适',
    shopType: '社区店',
    openYear: '2020',
    specialties: ['基瀡美甲', '美甲护理', '卸甲'],
    rating: 4.5,
    category: 'nail',
    designerCount: 3,
    serviceCount: 560,
    lastServiceTime: '2025-11-21 14:30',
    lastService: {
      date: '2025-11-21',
      serviceName: '基瀡美甲',
      productName: '甲油胶',
      price: 128
    },
    visitCount: 6,
    totalSpent: 768
  },
  // ========== 美体 body ==========
  {
    id: '9',
    brandId: '9',
    name: '御尚SPA养生会怉',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    type: '品牌',
    level: '高端',
    shopType: '旗舰店',
    openYear: '2014',
    specialties: ['精油SPA', '淋巴排毒', '身体塑形'],
    rating: 4.9,
    category: 'body',
    designerCount: 10,
    serviceCount: 2800,
    lastServiceTime: '2025-11-19 16:00',
    lastService: {
      date: '2025-11-19',
      serviceName: '全身SPA',
      productName: '薰衣草精油',
      price: 580
    },
    visitCount: 8,
    totalSpent: 6500
  },
  {
    id: '10',
    brandId: '10',
    name: '轻盈纤体中心',
    avatar: 'https://bioflex.cn/static/avatar/avatar.png',
    type: '品牌',
    level: '精品',
    shopType: '专业店',
    openYear: '2018',
    specialties: ['纤体瘦身', '产后修复', '肩颈理疗'],
    rating: 4.7,
    category: 'body',
    designerCount: 6,
    serviceCount: 1200,
    lastServiceTime: '2025-11-17 10:00',
    lastService: {
      date: '2025-11-17',
      serviceName: '纤体疗程',
      productName: '紧致精华',
      price: 480
    },
    visitCount: 4,
    totalSpent: 3200
  }
]

// 服务记录
const serviceRecords = [
  {
    id: '1',
    type: 'designer',
    targetId: '1',
    targetName: '李天天',
    targetAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
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
    targetAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
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
    targetAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
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
  designerCount: 11,
  brandCount: 10,
  serviceCount: 103,
  totalSpent: 35623
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
    // 按怜近服务时间倒序
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
    // 按怜近服务时间倒序
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
      // 根据分类过滤（瀮化处理）
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
