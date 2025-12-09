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

// 首页数据 - 完整数据结构用于 ProfileSection
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
  // 设计师按分类 - 对应 designerTabs: ["首席创意", "总监店长", "网红名师", "国际导师"]
  // 注意: ID 必须与 designer.js 中的 designers 数组中的 ID 对应 (1-8)
  designersByCategory: {
    '首席创意': [
      { id: '1', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png', name: '李天天', role: '美发师', level: '高级', title: '店长｜从业十二年', rating: '4.8', reviews: '287', distance: '2.7km' },
      { id: '5', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png', name: '陈晓峰', role: '美发师', level: '特级', title: '创意总监｜从业十五年', rating: '4.9', reviews: '512', distance: '5.2km' }
    ],
    '总监店长': [
      { id: '2', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png', name: '张小雨', role: '美发师', level: '高级', title: '总监｜从业十年', rating: '4.9', reviews: '356', distance: '5.2km' },
      { id: '1', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png', name: '李天天', role: '美发师', level: '高级', title: '店长｜从业十二年', rating: '4.8', reviews: '287', distance: '2.7km' }
    ],
    '网红名师': [
      { id: '3', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png', name: '王大明', role: '美发师', level: '资深', title: '首席｜从业八年', rating: '4.7', reviews: '245', distance: '3.5km' },
      { id: '6', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png', name: '林婉儿', role: '美发师', level: '高级', title: '资深设计师｜从业七年', rating: '4.8', reviews: '267', distance: '2.7km' },
      { id: '8', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png', name: '周雅琪', role: '美发师', level: '高级', title: '造型师｜从业五年', rating: '4.6', reviews: '156', distance: '2.7km' }
    ],
    '国际导师': [
      { id: '5', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png', name: '陈晓峰', role: '美发师', level: '特级', title: '创意总监｜从业十五年', rating: '4.9', reviews: '512', distance: '5.2km' },
      { id: '4', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png', name: '刘美丽', role: '美发师', level: '高级', title: '设计师｜从业六年', rating: '4.8', reviews: '198', distance: '5.2km' },
      { id: '7', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png', name: '赵凯', role: '美发师', level: '资深', title: '技术主管｜从业九年', rating: '4.7', reviews: '189', distance: '5.2km' }
    ]
  },
  // 品牌馆按分类 - 对应 brandTabs: ["专业店", "品牌店", "工作室", "综合店"]
  // 注意: ID 必须与 brand.js 中的 brands 数组中的 ID 对应 (1-8)
  brandsByCategory: {
    '专业店': [
      { id: '1', image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png', name: '金龙大好人美发沙龙', rating: '4.8', reviews: '1236', address: '成都锦江区红星路120号...', distance: '2.7km' },
      { id: '4', image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-5.png', name: '优雅女士美发馆', rating: '4.8', reviews: '1567', address: '成都高新区天府三街...', distance: '7.8km' },
      { id: '5', image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png', name: '男士理发馆', rating: '4.6', reviews: '987', address: '成都成华区建设路...', distance: '4.2km' }
    ],
    '品牌店': [
      { id: '2', image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-3.png', name: '成都NICE造型沙龙', rating: '4.9', reviews: '2156', address: '成都武侯区天府大道中段666号...', distance: '5.2km' },
      { id: '6', image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-3.png', name: '韩式造型沙龙', rating: '4.9', reviews: '1876', address: '成都锦江区春熙路...', distance: '1.5km' }
    ],
    '工作室': [
      { id: '3', image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-4.png', name: '潮流发型工作室', rating: '4.7', reviews: '876', address: '成都青羊区宽窄巷子旁...', distance: '3.5km' },
      { id: '7', image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-4.png', name: '发艺空间', rating: '4.7', reviews: '654', address: '成都武侯区玉林路...', distance: '6.3km' }
    ],
    '综合店': [
      { id: '8', image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-5.png', name: '尊享美发会所', rating: '4.9', reviews: '567', address: '成都高新区交子大道...', distance: '8.5km' },
      { id: '1', image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png', name: '金龙大好人美发沙龙', rating: '4.8', reviews: '1236', address: '成都锦江区红星路120号...', distance: '2.7km' },
      { id: '2', image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-3.png', name: '成都NICE造型沙龙', rating: '4.9', reviews: '2156', address: '成都武侯区天府大道中段666号...', distance: '5.2km' }
    ]
  },
  // 服务按分类 - 对应 serviceTabs: ["全部", "洗吹", "剪发", "烫发", "染发", "护发", "头皮", "接发"]
  servicesByCategory: {
    '全部': [
      { id: '1', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '烫发', category: '烫发', description: '发型提案+染发+造型', price: '799', designerName: '李天天', designerRole: '美发师', rating: '4.8', reviews: '768', distance: '6.7km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '2', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '剪发', category: '剪发', description: '专业剪发+造型设计', price: '199', designerName: '张美发', designerRole: '造型师', rating: '4.9', reviews: '520', distance: '3.2km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '3', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '染发', category: '染发', description: '专业染发+护理', price: '599', designerName: '王染发', designerRole: '染发师', rating: '4.7', reviews: '365', distance: '5.8km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '4', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '洗吹', category: '洗吹', description: '洗发+吹风造型', price: '88', designerName: '刘洗发', designerRole: '助理', rating: '4.6', reviews: '288', distance: '2.1km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '5', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '护发', category: '护发', description: '深层护理+滋养', price: '299', designerName: '陈护理', designerRole: '护理师', rating: '4.8', reviews: '156', distance: '4.5km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '6', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '头皮', category: '头皮', description: '头皮护理+清洁', price: '399', designerName: '周头皮', designerRole: '护理师', rating: '4.9', reviews: '234', distance: '6.2km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '7', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '接发', category: '接发', description: '专业接发+造型', price: '1299', designerName: '赵接发', designerRole: '接发师', rating: '4.7', reviews: '89', distance: '7.8km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '8', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '烫发', category: '烫发', description: '造型烫发+护理', price: '899', designerName: '孙烫发', designerRole: '烫发师', rating: '4.8', reviews: '445', distance: '3.9km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' }
    ],
    '洗吹': [
      { id: '4', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '洗吹', category: '洗吹', description: '洗发+吹风造型', price: '88', designerName: '刘洗发', designerRole: '助理', rating: '4.6', reviews: '288', distance: '2.1km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '9', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '精致洗吹', category: '洗吹', description: '头皮按摩+洗发+造型', price: '128', designerName: '马洗护', designerRole: '助理', rating: '4.7', reviews: '345', distance: '3.4km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' }
    ],
    '剪发': [
      { id: '2', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '剪发', category: '剪发', description: '专业剪发+造型设计', price: '199', designerName: '张美发', designerRole: '造型师', rating: '4.9', reviews: '520', distance: '3.2km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '10', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '男士剪发', category: '剪发', description: '男士专业剪发', price: '99', designerName: '李剪发', designerRole: '设计师', rating: '4.8', reviews: '678', distance: '4.1km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' }
    ],
    '烫发': [
      { id: '1', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '烫发', category: '烫发', description: '发型提案+染发+造型', price: '799', designerName: '李天天', designerRole: '美发师', rating: '4.8', reviews: '768', distance: '6.7km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '8', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '烫发', category: '烫发', description: '造型烫发+护理', price: '899', designerName: '孙烫发', designerRole: '烫发师', rating: '4.8', reviews: '445', distance: '3.9km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' }
    ],
    '染发': [
      { id: '3', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '染发', category: '染发', description: '专业染发+护理', price: '599', designerName: '王染发', designerRole: '染发师', rating: '4.7', reviews: '365', distance: '5.8km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '11', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '渐变染发', category: '染发', description: '时尚渐变染发', price: '699', designerName: '周染发', designerRole: '染发师', rating: '4.9', reviews: '423', distance: '4.8km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' }
    ],
    '护发': [
      { id: '5', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '护发', category: '护发', description: '深层护理+滋养', price: '299', designerName: '陈护理', designerRole: '护理师', rating: '4.8', reviews: '156', distance: '4.5km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '12', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '深层护理', category: '护发', description: '专业深层护理', price: '399', designerName: '吴护理', designerRole: '护理师', rating: '4.8', reviews: '289', distance: '5.3km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' }
    ],
    '头皮': [
      { id: '6', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '头皮', category: '头皮', description: '头皮护理+清洁', price: '399', designerName: '周头皮', designerRole: '护理师', rating: '4.9', reviews: '234', distance: '6.2km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '13', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '头皮深层清洁', category: '头皮', description: '去油去屑+深层清洁', price: '299', designerName: '郑头皮', designerRole: '护理师', rating: '4.7', reviews: '198', distance: '3.9km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' }
    ],
    '接发': [
      { id: '7', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '接发', category: '接发', description: '专业接发+造型', price: '1299', designerName: '赵接发', designerRole: '接发师', rating: '4.7', reviews: '89', distance: '7.8km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' },
      { id: '14', image: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png', title: '无痕接发', category: '接发', description: '高端无痕接发', price: '1599', designerName: '钱接发', designerRole: '接发师', rating: '4.9', reviews: '156', distance: '8.5km', avatar: 'https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg' }
    ]
  },
  // 兼容旧版的简化数据
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

// 排行榜数据 - 对应三个 tab: 新秀榜(rookie)、专业榜(pro)、服务榜(service)
const rankingData = {
  // 新秀榜 - 新晋设计师，从业时间较短但发展迅速
  rookie: [
    { id: '8', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png', name: '周雅琪', level: '高级', role: '造型师｜从业五年', rating: '4.6' },
    { id: '6', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png', name: '林婉儿', level: '高级', role: '资深设计师｜从业七年', rating: '4.8' },
    { id: '4', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png', name: '刘美丽', level: '高级', role: '设计师｜从业六年', rating: '4.8' },
    { id: '3', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png', name: '王大明', level: '资深', role: '首席｜从业八年', rating: '4.7' },
    { id: '7', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png', name: '赵凯', level: '资深', role: '技术主管｜从业九年', rating: '4.7' },
    { id: '1', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png', name: '李天天', level: '高级', role: '店长｜从业十二年', rating: '4.8' },
    { id: '2', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png', name: '张小雨', level: '高级', role: '总监｜从业十年', rating: '4.9' },
    { id: '5', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png', name: '陈晓峰', level: '特级', role: '创意总监｜从业十五年', rating: '4.9' }
  ],
  // 专业榜 - 按评分和从业经验排名
  pro: [
    { id: '5', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png', name: '陈晓峰', level: '特级', role: '创意总监｜从业十五年', rating: '4.9' },
    { id: '2', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png', name: '张小雨', level: '高级', role: '总监｜从业十年', rating: '4.9' },
    { id: '1', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png', name: '李天天', level: '高级', role: '店长｜从业十二年', rating: '4.8' },
    { id: '4', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png', name: '刘美丽', level: '高级', role: '设计师｜从业六年', rating: '4.8' },
    { id: '6', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png', name: '林婉儿', level: '高级', role: '资深设计师｜从业七年', rating: '4.8' },
    { id: '3', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png', name: '王大明', level: '资深', role: '首席｜从业八年', rating: '4.7' },
    { id: '7', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png', name: '赵凯', level: '资深', role: '技术主管｜从业九年', rating: '4.7' },
    { id: '8', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png', name: '周雅琪', level: '高级', role: '造型师｜从业五年', rating: '4.6' }
  ],
  // 服务榜 - 按服务数量和好评排名
  service: [
    { id: '2', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png', name: '张小雨', level: '高级', role: '总监｜服务2156人', rating: '4.9' },
    { id: '5', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png', name: '陈晓峰', level: '特级', role: '创意总监｜服务3200人', rating: '4.9' },
    { id: '6', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png', name: '林婉儿', level: '高级', role: '资深设计师｜服务1890人', rating: '4.8' },
    { id: '4', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png', name: '刘美丽', level: '高级', role: '设计师｜服务1567人', rating: '4.8' },
    { id: '7', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png', name: '赵凯', level: '资深', role: '技术主管｜服务1456人', rating: '4.7' },
    { id: '1', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png', name: '李天天', level: '高级', role: '店长｜服务1234人', rating: '4.8' },
    { id: '3', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png', name: '王大明', level: '资深', role: '首席｜服务987人', rating: '4.7' },
    { id: '8', image: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png', name: '周雅琪', level: '高级', role: '造型师｜服务876人', rating: '4.6' }
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
  rankingData,
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
  },

  // 获取排行榜数据
  'GET /api/common/ranking': (params) => {
    const type = params.type || 'rookie' // rookie | pro | service
    const list = rankingData[type] || []
    return success({
      type,
      list
    })
  },

  // 获取所有排行榜数据（一次性返回三个榜单）
  'GET /api/common/ranking/all': () => {
    return success(rankingData)
  }
}

export default {
  data,
  routes
}
