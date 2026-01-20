/**
 * 服务管理模块 Mock 数据
 * 与用户端服务数据保持一致，商家端可编辑管理
 */

import { success, error, paginate, generateId, formatNow } from '../utils.js'

// 服务分类
const serviceCategories = [
  { id: '1', name: '剪发', icon: '/static/icon/cut.png' },
  { id: '2', name: '烫发', icon: '/static/icon/perm.png' },
  { id: '3', name: '染发', icon: '/static/icon/dye.png' },
  { id: '4', name: '护理', icon: '/static/icon/care.png' },
  { id: '5', name: '造型', icon: '/static/icon/style.png' }
]

// 服务列表 - 与用户端services数据保持一致
const services = [
  {
    id: '1',
    name: '精致剪发',
    category: '剪发',
    categoryId: '1',
    subCategory: '男士剪发',
    includes: ['洗发', '剪发', '吹风造型'],
    image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    images: ['https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png'],
    isMaleOnly: false,
    isPackage: false,
    pricingMode: 'fixedPrice', // fixedPrice/productPricing
    price: 99,
    originalPrice: 128,
    duration: 45,
    serviceType: 'store', // store/home
    description: '专业剪发服务，根据您的脸型和气质，为您打造最适合的发型。',
    matters: ['请提前15分钟到店', '如需取消请提前2小时'],
    commitments: ['7天服务保障', '不满意重做'],
    status: 'published', // published/draft/off-shelf
    soldCount: 2356,
    rating: 4.8,
    reviewCount: 856,
    isDistribution: true,
    commissionRate: 10,
    createTime: '2024-01-15 10:00:00',
    updateTime: '2025-12-01 10:00:00'
  },
  {
    id: '2',
    name: '时尚烫发',
    category: '烫发',
    categoryId: '2',
    subCategory: '冷烫',
    includes: ['洗发', '烫发', '护理', '造型'],
    image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    images: ['https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png'],
    isMaleOnly: false,
    isPackage: false,
    pricingMode: 'productPricing',
    price: 399,
    originalPrice: 499,
    products: [
      {
        name: '基础烫发',
        specs: [
          { name: '短发', price: 299 },
          { name: '中长发', price: 399 },
          { name: '长发', price: 499 }
        ]
      },
      {
        name: '高端烫发',
        specs: [
          { name: '短发', price: 499 },
          { name: '中长发', price: 599 },
          { name: '长发', price: 699 }
        ]
      }
    ],
    duration: 120,
    serviceType: 'store',
    description: '采用进口烫发药水，打造自然卷度，持久定型。',
    matters: ['烫发后24小时内不要洗头', '一周内避免高温'],
    commitments: ['7天服务保障', '专业产品保证'],
    status: 'published',
    soldCount: 1289,
    rating: 4.9,
    reviewCount: 523,
    isDistribution: true,
    commissionRate: 15,
    createTime: '2024-02-20 10:00:00',
    updateTime: '2025-11-15 10:00:00'
  },
  {
    id: '3',
    name: '个性染发',
    category: '染发',
    categoryId: '3',
    subCategory: '全染',
    includes: ['洗发', '染发', '护理'],
    image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    images: ['https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png'],
    isMaleOnly: false,
    isPackage: false,
    pricingMode: 'fixedPrice',
    price: 299,
    originalPrice: 399,
    duration: 90,
    serviceType: 'store',
    description: '使用植物染发剂，安全健康，色彩持久。',
    matters: ['染发前请做皮肤测试', '孕妇慎用'],
    commitments: ['7天服务保障', '安全环保产品'],
    status: 'published',
    soldCount: 1567,
    rating: 4.7,
    reviewCount: 412,
    isDistribution: false,
    commissionRate: 0,
    createTime: '2024-03-10 10:00:00',
    updateTime: '2025-10-20 10:00:00'
  },
  {
    id: '4',
    name: '深度护理',
    category: '护理',
    categoryId: '4',
    subCategory: '头皮护理',
    includes: ['头皮检测', '深层清洁', '营养护理', '按摩放松'],
    image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    images: ['https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png'],
    isMaleOnly: false,
    isPackage: true,
    pricingMode: 'fixedPrice',
    price: 199,
    originalPrice: 258,
    duration: 60,
    serviceType: 'store',
    description: '深层修复受损发质，让秀发重焕光泽。',
    matters: ['建议每月护理一次'],
    commitments: ['7天服务保障'],
    status: 'published',
    soldCount: 876,
    rating: 4.8,
    reviewCount: 234,
    isDistribution: true,
    commissionRate: 8,
    createTime: '2024-04-05 10:00:00',
    updateTime: '2025-09-10 10:00:00'
  },
  {
    id: '5',
    name: '造型设计',
    category: '造型',
    categoryId: '5',
    subCategory: '日常造型',
    includes: ['洗发', '造型设计', '定型'],
    image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    images: ['https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png'],
    isMaleOnly: false,
    isPackage: false,
    pricingMode: 'fixedPrice',
    price: 159,
    originalPrice: 199,
    duration: 40,
    serviceType: 'home', // 上门服务
    description: '专业造型设计，适合各种场合。',
    matters: ['上门服务需提前预约'],
    commitments: ['7天服务保障'],
    status: 'published',
    soldCount: 654,
    rating: 4.6,
    reviewCount: 189,
    isDistribution: false,
    commissionRate: 0,
    createTime: '2024-05-01 10:00:00',
    updateTime: '2025-08-25 10:00:00'
  },
  {
    id: '6',
    name: '男士精剪（已下架）',
    category: '剪发',
    categoryId: '1',
    subCategory: '男士剪发',
    includes: ['洗发', '剪发', '造型'],
    image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
    images: [],
    isMaleOnly: true,
    isPackage: false,
    pricingMode: 'fixedPrice',
    price: 79,
    originalPrice: 99,
    duration: 30,
    serviceType: 'store',
    description: '专业男士剪发服务',
    matters: [],
    commitments: [],
    status: 'off-shelf',
    soldCount: 1230,
    rating: 4.5,
    reviewCount: 320,
    isDistribution: false,
    commissionRate: 0,
    createTime: '2024-01-10 10:00:00',
    updateTime: '2025-06-01 10:00:00'
  }
]

// 服务方案（染发/烫发）
const schemes = [
  {
    id: 'SCH001',
    type: 'dyeing', // dyeing/perm
    customerId: 'C001',
    customerName: '张小姐',
    colorCode: '#8B4513',
    colorName: '自然棕',
    formula: '染膏A:B = 1:1',
    processTime: 35,
    notes: '发质较细，注意控制时间',
    createTime: '2025-11-20 14:00:00',
    designerName: '李天天'
  },
  {
    id: 'SCH002',
    type: 'perm',
    customerId: 'C002',
    customerName: '王女士',
    permType: '冷烫',
    rodSize: '中号',
    processTime: 25,
    notes: '发量较多，需要分区处理',
    createTime: '2025-11-18 10:00:00',
    designerName: '张小雨'
  }
]

// Mock 数据
export const data = {
  services,
  serviceCategories,
  schemes
}

// Mock 路由处理
export const routes = {
  // 获取服务列表
  'GET /services': (params) => {
    let list = [...services]

    // 按状态筛选
    if (params.status) {
      list = list.filter(s => s.status === params.status)
    }

    // 按服务类型筛选
    if (params.serviceType) {
      list = list.filter(s => s.serviceType === params.serviceType)
    }

    // 按分类筛选
    if (params.categoryId) {
      list = list.filter(s => s.categoryId === params.categoryId)
    }

    // 关键词搜索
    if (params.keyword) {
      list = list.filter(s => s.name.includes(params.keyword))
    }

    // 按更新时间倒序
    list.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取服务详情
  'GET /services/:id': (params) => {
    const service = services.find(s => s.id === params.id)
    return service ? success(service) : error('服务不存在')
  },

  // 创建服务
  'POST /services': (params) => {
    const newService = {
      id: generateId('SRV'),
      ...params,
      soldCount: 0,
      rating: 0,
      reviewCount: 0,
      status: params.status || 'draft',
      createTime: formatNow(),
      updateTime: formatNow()
    }
    services.push(newService)
    return success(newService, '创建成功')
  },

  // 更新服务
  'PUT /services/:id': (params) => {
    const service = services.find(s => s.id === params.id)
    if (!service) return error('服务不存在')
    Object.assign(service, params, { updateTime: formatNow() })
    return success(service, '更新成功')
  },

  // 删除服务
  'DELETE /services/:id': (params) => {
    const index = services.findIndex(s => s.id === params.id)
    if (index === -1) return error('服务不存在')
    services.splice(index, 1)
    return success(null, '删除成功')
  },

  // 上架/下架服务
  'PUT /services/:id/status': (params) => {
    const service = services.find(s => s.id === params.id)
    if (!service) return error('服务不存在')
    service.status = params.status
    service.updateTime = formatNow()
    return success(service, params.status === 'published' ? '上架成功' : '下架成功')
  },

  // 获取染发详情
  'GET /services/dyeing/:id': (params) => {
    const scheme = schemes.find(s => s.id === params.id && s.type === 'dyeing')
    return scheme ? success(scheme) : error('染发方案不存在')
  },

  // 更新染发详情
  'PUT /services/dyeing/:id': (params) => {
    const scheme = schemes.find(s => s.id === params.id && s.type === 'dyeing')
    if (!scheme) return error('染发方案不存在')
    Object.assign(scheme, params)
    return success(scheme, '更新成功')
  },

  // 获取烫发详情
  'GET /services/perm/:id': (params) => {
    const scheme = schemes.find(s => s.id === params.id && s.type === 'perm')
    return scheme ? success(scheme) : error('烫发方案不存在')
  },

  // 更新烫发详情
  'PUT /services/perm/:id': (params) => {
    const scheme = schemes.find(s => s.id === params.id && s.type === 'perm')
    if (!scheme) return error('烫发方案不存在')
    Object.assign(scheme, params)
    return success(scheme, '更新成功')
  },

  // 获取方案列表
  'GET /schemes': (params) => {
    let list = [...schemes]
    if (params.type) {
      list = list.filter(s => s.type === params.type)
    }
    if (params.customerId) {
      list = list.filter(s => s.customerId === params.customerId)
    }
    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 创建方案
  'POST /schemes': (params) => {
    const newScheme = {
      id: generateId('SCH'),
      ...params,
      createTime: formatNow()
    }
    schemes.push(newScheme)
    return success(newScheme, '创建成功')
  },

  // 获取服务分类
  'GET /service-categories': () => {
    return success(serviceCategories)
  }
}

export default {
  data,
  routes
}
