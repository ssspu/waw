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
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220.png'],
    description: '专业剪发服务，根据您的脸型和气质，为您打造最适合的发型。',
    duration: 45,
    soldCount: 2356,
    rating: 4.8,
    reviewCount: 856,
    tags: ['热门', '推荐'],
    isFavorited: false,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    designerName: '李天天',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    distance: '2.7km'
  },
  {
    id: '2',
    name: '时尚烫发',
    categoryId: '2',
    categoryName: '烫发',
    price: 399,
    originalPrice: 499,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-1.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-1.png'],
    description: '采用进口烫发药水，打造自然卷度，持久定型。',
    duration: 120,
    soldCount: 1289,
    rating: 4.9,
    reviewCount: 523,
    tags: ['热门'],
    isFavorited: true,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    designerName: '张小雨',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
    distance: '2.7km'
  },
  {
    id: '3',
    name: '个性染发',
    categoryId: '3',
    categoryName: '染发',
    price: 299,
    originalPrice: 399,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-2.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-2.png'],
    description: '使用植物染发剂，安全健康，色彩持久。',
    duration: 90,
    soldCount: 1567,
    rating: 4.7,
    reviewCount: 412,
    tags: ['新品'],
    isFavorited: false,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    designerName: '王大明',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png',
    distance: '2.7km'
  },
  {
    id: '4',
    name: '深度护理',
    categoryId: '4',
    categoryName: '护理',
    price: 199,
    originalPrice: 258,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-3.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-3.png'],
    description: '深层修复受损发质，让秀发重焕光泽。',
    duration: 60,
    soldCount: 876,
    rating: 4.8,
    reviewCount: 234,
    tags: ['新品'],
    isFavorited: false,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    designerName: '林婉儿',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png',
    distance: '2.7km'
  },
  {
    id: '5',
    name: '造型设计',
    categoryId: '5',
    categoryName: '造型',
    price: 159,
    originalPrice: 199,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-4.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-4.png'],
    description: '专业造型设计，适合各种场合。',
    duration: 40,
    soldCount: 654,
    rating: 4.6,
    reviewCount: 189,
    tags: ['推荐'],
    isFavorited: false,
    brandId: '2',
    brandName: '成都NICE造型沙龙',
    designerName: '刘美丽',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png',
    distance: '5.2km'
  },
  {
    id: '6',
    name: '韩式烫发',
    categoryId: '2',
    categoryName: '烫发',
    price: 459,
    originalPrice: 599,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-5.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-5.png'],
    description: '韩式自然卷烫发，打造温柔氛围感。',
    duration: 150,
    soldCount: 987,
    rating: 4.9,
    reviewCount: 367,
    tags: ['热门', '推荐'],
    isFavorited: false,
    brandId: '2',
    brandName: '成都NICE造型沙龙',
    designerName: '陈晓峰',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png',
    distance: '5.2km'
  },
  {
    id: '7',
    name: '挑染设计',
    categoryId: '3',
    categoryName: '染发',
    price: 359,
    originalPrice: 459,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220.png'],
    description: '时尚挑染，个性十足，打造独特风格。',
    duration: 100,
    soldCount: 756,
    rating: 4.7,
    reviewCount: 289,
    tags: ['新品'],
    isFavorited: false,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    designerName: '赵凯',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    distance: '2.7km'
  },
  {
    id: '8',
    name: '头皮护理',
    categoryId: '4',
    categoryName: '护理',
    price: 258,
    originalPrice: 328,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-1.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-1.png'],
    description: '深层清洁头皮，改善头皮环境，预防脱发。',
    duration: 50,
    soldCount: 543,
    rating: 4.8,
    reviewCount: 178,
    tags: ['推荐'],
    isFavorited: false,
    brandId: '2',
    brandName: '成都NICE造型沙龙',
    designerName: '刘美丽',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png',
    distance: '5.2km'
  },
  {
    id: '9',
    name: '男士剪发',
    categoryId: '1',
    categoryName: '剪发',
    price: 79,
    originalPrice: 99,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-2.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-2.png'],
    description: '专业男士剪发，干净利落，展现男性魅力。',
    duration: 30,
    soldCount: 1876,
    rating: 4.7,
    reviewCount: 623,
    tags: ['热门'],
    isFavorited: false,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    designerName: '王大明',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png',
    distance: '2.7km'
  },
  {
    id: '10',
    name: '新娘造型',
    categoryId: '5',
    categoryName: '造型',
    price: 599,
    originalPrice: 799,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-3.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-3.png'],
    description: '专业新娘造型设计，让您在大日子里美丽动人。',
    duration: 120,
    soldCount: 234,
    rating: 4.9,
    reviewCount: 156,
    tags: ['推荐'],
    isFavorited: false,
    brandId: '2',
    brandName: '成都NICE造型沙龙',
    designerName: '陈晓峰',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png',
    distance: '5.2km'
  },
  {
    id: '11',
    name: '柔顺护理',
    categoryId: '4',
    categoryName: '护理',
    price: 299,
    originalPrice: 399,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-4.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-4.png'],
    description: '让毛躁头发变得柔顺亮泽，持久效果。',
    duration: 70,
    soldCount: 678,
    rating: 4.8,
    reviewCount: 234,
    tags: ['热门'],
    isFavorited: false,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    designerName: '林婉儿',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png',
    distance: '2.7km'
  },
  {
    id: '12',
    name: '渐变染发',
    categoryId: '3',
    categoryName: '染发',
    price: 459,
    originalPrice: 599,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-5.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-5.png'],
    description: '自然渐变色彩，时尚又不失优雅。',
    duration: 120,
    soldCount: 543,
    rating: 4.8,
    reviewCount: 198,
    tags: ['新品'],
    isFavorited: false,
    brandId: '2',
    brandName: '成都NICE造型沙龙',
    designerName: '赵凯',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    distance: '5.2km'
  },
  {
    id: '13',
    name: '日式烫发',
    categoryId: '2',
    categoryName: '烫发',
    price: 520,
    originalPrice: 680,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220.png'],
    description: '日式慵懒卷发，打造氛围感满分的造型。',
    duration: 140,
    soldCount: 823,
    rating: 4.9,
    reviewCount: 312,
    tags: ['热门', '推荐'],
    isFavorited: false,
    brandId: '3',
    brandName: '潮流发型工作室',
    designerName: '周雅琪',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
    distance: '3.5km'
  },
  {
    id: '14',
    name: '欧美剪发',
    categoryId: '1',
    categoryName: '剪发',
    price: 168,
    originalPrice: 218,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-1.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-1.png'],
    description: '欧美风格剪发，打造立体层次感。',
    duration: 50,
    soldCount: 1234,
    rating: 4.8,
    reviewCount: 456,
    tags: ['推荐'],
    isFavorited: false,
    brandId: '3',
    brandName: '潮流发型工作室',
    designerName: '李天天',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    distance: '3.5km'
  },
  {
    id: '15',
    name: '漂染套餐',
    categoryId: '3',
    categoryName: '染发',
    price: 680,
    originalPrice: 880,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-2.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-2.png'],
    description: '专业漂染服务，打造独特发色。',
    duration: 180,
    soldCount: 456,
    rating: 4.7,
    reviewCount: 189,
    tags: ['新品'],
    isFavorited: false,
    brandId: '3',
    brandName: '潮流发型工作室',
    designerName: '赵凯',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    distance: '3.5km'
  },
  {
    id: '16',
    name: '防脱护理',
    categoryId: '4',
    categoryName: '护理',
    price: 388,
    originalPrice: 488,
    image: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-3.png',
    images: ['https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-3.png'],
    description: '专业防脱护理，强韧发根，预防脱发。',
    duration: 80,
    soldCount: 678,
    rating: 4.9,
    reviewCount: 267,
    tags: ['热门', '推荐'],
    isFavorited: false,
    brandId: '4',
    brandName: '优雅女士美发馆',
    designerName: '刘美丽',
    designerAvatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png',
    distance: '7.8km'
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

// 服务详情数据 - 用于购买页面
const serviceDetails = {
  '1': {
    id: '1',
    name: '洗剪吹',
    fullTitle: '洗剪吹 发型提案+裁剪+造型',
    description: '专业剪发服务，根据您的脸型和气质，为您打造最适合的发型。',
    price: 799,
    originalPrice: 999,
    soldCount: 1234,
    headerImage: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png',
    isFavorited: false,
    // 优惠券
    coupons: [
      { id: '1', text: '满100-5' },
      { id: '2', text: '满500-50' }
    ],
    // 设计师信息
    designer: {
      id: '1',
      name: '李天天',
      avatar: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-153.png',
      badge: '高级',
      role: '店长｜从业12年',
      rating: 4.8,
      serviceCount: 287,
      worksCount: 123
    },
    // 服务内容
    serviceItems: [
      { name: '发型提案', quantity: '*1' },
      { name: '头发清洁', quantity: '*1' },
      { name: '发型修剪', quantity: '*1' },
      { name: '吹风造型', quantity: '*1' }
    ],
    // 温馨提示
    warmTips: [
      '有效日期2019-12-24至2019-12-30',
      '需您当日一次性体验完所有项目',
      '不予其他优惠同享'
    ],
    // 图文详情
    detailImages: [
      'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
      'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
      'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
      'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
      'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
      'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png'
    ],
    // 评价标签
    reviewTags: [
      { text: '技术很好', count: '232', active: true },
      { text: '效果满意', count: '321', active: false },
      { text: '服务态度', count: '321', active: false }
    ],
    // 评价列表
    reviews: [
      { id: 1, title: '环境特别好', rating: '4.0', content: '环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境...', author: '加菲猫', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-25', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' },
      { id: 2, title: '服务很专业', rating: '3.1', content: '服务很专业，发型设计很满意，下次还会再来...', author: '小可爱', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-24', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' },
      { id: 3, title: '效果超出预期', rating: '5.0', content: '效果超出预期，非常满意，推荐给大家...', author: '美少女', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-23', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' },
      { id: 4, title: '技术很棒', rating: '4.9', content: '技术很棒，服务态度也很好，值得推荐...', author: '时尚达人', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-22', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' },
      { id: 5, title: '性价比很高', rating: '4.7', content: '性价比很高，服务周到，环境舒适...', author: '追求者', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-21', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' },
      { id: 6, title: '非常满意', rating: '5.0', content: '非常满意，下次还会再来，强烈推荐...', author: '忠实客户', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-20', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' },
      { id: 7, title: '环境优雅', rating: '4.8', content: '环境优雅，服务专业，体验很好...', author: '品味生活', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-19', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' },
      { id: 8, title: '发型设计很赞', rating: '4.9', content: '发型设计很赞，技术精湛，推荐...', author: '时尚先锋', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-18', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' },
      { id: 9, title: '服务态度很好', rating: '5.0', content: '服务态度很好，技术也很专业，满意...', author: '满意客户', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-17', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' },
      { id: 10, title: '体验很棒', rating: '4.8', content: '体验很棒，整体服务很好，推荐...', author: '回头客', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-16', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' }
    ],
    // 问答
    questions: [
      '只烫不染的短发多少钱？头发比较干，不知道能不能做？',
      '刘海发际线太高怎么办？'
    ],
    questionCount: 12,
    // 推荐服务
    recommendedServices: [
      { id: '2', image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png', title: '烫发', description: '发型提案+染发+造型', price: '799', stylistName: '李天天', stylistRole: '美发师', rating: '4.8', reviewCount: '768', distance: '6.7km', avatar: 'https://c.animaapp.com/mifnbli6udxphC/img/ellipse-34-1.svg' },
      { id: '3', image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png', title: '染发', description: '发型提案+染发+造型', price: '599', stylistName: '张小雨', stylistRole: '美发师', rating: '4.9', reviewCount: '520', distance: '5.2km', avatar: 'https://c.animaapp.com/mifnbli6udxphC/img/ellipse-34-1.svg' }
    ]
  },
  '2': {
    id: '2',
    name: '时尚烫发',
    fullTitle: '时尚烫发 造型设计+烫发+护理',
    description: '采用进口烫发药水，打造自然卷度，持久定型。',
    price: 399,
    originalPrice: 499,
    soldCount: 1289,
    headerImage: 'https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-220-1.png',
    isFavorited: true,
    coupons: [
      { id: '1', text: '满200-20' },
      { id: '2', text: '满300-30' }
    ],
    designer: {
      id: '2',
      name: '张小雨',
      avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
      badge: '高级',
      role: '总监｜从业十年',
      rating: 4.9,
      serviceCount: 356,
      worksCount: 189
    },
    serviceItems: [
      { name: '发型设计', quantity: '*1' },
      { name: '头发清洁', quantity: '*1' },
      { name: '烫发处理', quantity: '*1' },
      { name: '护理定型', quantity: '*1' }
    ],
    warmTips: [
      '有效日期2019-12-24至2019-12-30',
      '需您当日一次性体验完所有项目',
      '不予其他优惠同享'
    ],
    detailImages: [
      'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
      'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png',
      'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png'
    ],
    reviewTags: [
      { text: '烫发自然', count: '198', active: true },
      { text: '效果持久', count: '256', active: false },
      { text: '服务周到', count: '167', active: false }
    ],
    reviews: [
      { id: 1, title: '烫发效果超棒', rating: '5.0', content: '烫发效果超级自然，很喜欢！下次还会再来...', author: '花花', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-25', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' },
      { id: 2, title: '服务专业', rating: '4.8', content: '设计师很专业，根据我的脸型推荐的发型...', author: '小美', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-24', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' },
      { id: 3, title: '环境很好', rating: '4.9', content: '环境舒适，服务态度好，效果满意...', author: '时尚达人', avatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg', date: '2019-12-23', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png' }
    ],
    questions: [
      '烫发后多久可以洗头？',
      '这个价格包含护理吗？'
    ],
    questionCount: 8,
    recommendedServices: [
      { id: '1', image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png', title: '洗剪吹', description: '发型提案+裁剪+造型', price: '799', stylistName: '李天天', stylistRole: '美发师', rating: '4.8', reviewCount: '768', distance: '6.7km', avatar: 'https://c.animaapp.com/mifnbli6udxphC/img/ellipse-34-1.svg' },
      { id: '3', image: 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png', title: '染发', description: '发型提案+染发+造型', price: '599', stylistName: '王染发', stylistRole: '染发师', rating: '4.7', reviewCount: '365', distance: '5.8km', avatar: 'https://c.animaapp.com/mifnbli6udxphC/img/ellipse-34-1.svg' }
    ]
  }
}

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
  serviceReviews,
  serviceDetails
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
    // 优先返回详情数据，如果没有则返回列表中的服务数据
    const detail = serviceDetails[params.serviceId]
    if (detail) {
      return success(detail)
    }
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
