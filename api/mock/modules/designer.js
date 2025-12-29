/**
 * 设计师模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 封面图片列表 - 用于设计师详情页背景
const coverImages = [
  'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png',
  'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png',
  'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png',
  'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
  'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png'
]

// 设计师列表
const designers = [
  {
    id: '1',
    name: '李天天',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    coverImage: coverImages[0],
    role: '美发师',
    level: '高级',
    position: '店长',
    title: '国家高级美发师',
    experience: 12,
    introduction: '从业12年，毕业于沙宣美发学院，擅长各种型设计，有丰富的设计经验',
    specialties: ['短发裁剪', '染发设计', '女士型', '烫发设计'],
    workDays: '周二 - 周日',
    workHours: '10:00-21:00',
    appointmentAdvance: '提前3小时',
    rating: 4.8,
    reviewCount: 287,
    serviceCount: 1234,
    worksCount: 123,
    followerCount: 2000,
    favoriteCount: 560,
    appointmentCount: 1244,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    brandAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
    isFollowed: false,
    isFavorited: false,
    tags: ['明星网红', '预约服务', '免费设计', '7天无忧'],
    certifications: ['高级美发师证', '沙宣学院认证'],
    serviceFeatures: [
      { title: '', tags: ['全预约制', '免费茶点', '头皮检测', '免费停车', '烫染专业店', '免费修眉', '一对一服务', '免费按摩', '没有隐形消费', '可上门服务'] },
      { title: '其他', tags: ['不可携带宠物', '服务区不可吸烟'] }
    ],
    environmentFacilities: [
      { title: '', tags: ['储物柜', '免费Wifi', '充电宝', '可看电视', 'VIP专区', '沙发座'] },
      { title: '通用设施', tags: ['特定吸烟区', '电梯', '有停车位', '空调', '现金/刷卡支付'] }
    ],
    questions: ['烫发后多久可以洗头？', '染发前需要注意什么？', '如何选择适合自己的发型？'],
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
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
    coverImage: coverImages[1],
    role: '美发师',
    level: '高级',
    position: '总监',
    title: '资深造型师',
    experience: 10,
    introduction: '专注烫发和护发领域，为您打造独特发型 ',
    specialties: ['烫发设计', '护发养护', '发型设计'],
    workDays: '周一 - 周六',
    workHours: '09:00-20:00',
    appointmentAdvance: '提前2小时',
    rating: 4.9,
    reviewCount: 356,
    serviceCount: 2156,
    worksCount: 189,
    followerCount: 3500,
    favoriteCount: 890,
    appointmentCount: 2380,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    brandAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
    isFollowed: true,
    isFavorited: false,
    tags: ['提前预约', '技术专业', '服务贴心'],
    certifications: ['高级美发师证'],
    serviceFeatures: [
      { title: '', tags: ['全预约制', '免费茶点', '一对一服务', '免费按摩', '没有隐形消费'] },
      { title: '其他', tags: ['不可携带宠物'] }
    ],
    environmentFacilities: [
      { title: '', tags: ['储物柜', '免费Wifi', '充电宝', 'VIP专区'] },
      { title: '通用设施', tags: ['电梯', '有停车位', '空调'] }
    ],
    questions: ['烫发需要多长时间？', '护发产品如何选择？'],
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
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png',
    coverImage: coverImages[2],
    role: '美发师',
    level: '资深',
    position: '首席',
    title: '男士造型专家',
    experience: 8,
    introduction: '男士发型专家，擅长潮流发型设计',
    specialties: ['男士发型', '渐变染发', '潮流发型'],
    workDays: '周二 - 周日',
    workHours: '10:00-21:00',
    appointmentAdvance: '提前1小时',
    rating: 4.7,
    reviewCount: 245,
    serviceCount: 987,
    worksCount: 98,
    followerCount: 1500,
    favoriteCount: 320,
    appointmentCount: 890,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    brandAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
    isFollowed: false,
    isFavorited: true,
    tags: ['提前预约', '快速服务', '男士专属'],
    certifications: ['中级美发师证'],
    serviceFeatures: [
      { title: '', tags: ['快速服务', '免费茶点', '一对一服务'] },
      { title: '其他', tags: ['服务区不可吸烟'] }
    ],
    environmentFacilities: [
      { title: '', tags: ['免费Wifi', '充电宝', '可看电视'] },
      { title: '通用设施', tags: ['空调', '现金/刷卡支付'] }
    ],
    questions: ['男士发型多久修剪一次？', '渐变染发适合什么脸型？'],
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
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png',
    coverImage: coverImages[3],
    role: '美发师',
    level: '高级',
    position: '设计师',
    title: '女士烫发专家',
    experience: 6,
    introduction: '女士烫发发型专家，打造属于你的独特风格',
    specialties: ['女士烫发', '发型设计', '染发'],
    workDays: '周一 - 周六',
    workHours: '09:30-20:30',
    appointmentAdvance: '提前2小时',
    rating: 4.8,
    reviewCount: 198,
    serviceCount: 1567,
    worksCount: 156,
    followerCount: 2200,
    favoriteCount: 450,
    appointmentCount: 1100,
    brandId: '2',
    brandName: '成都NICE发型沙龙',
    brandAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
    isFollowed: false,
    isFavorited: false,
    tags: ['提前预约', '上门服务', '女士专属'],
    certifications: ['高级美发师证', '染发专家认证'],
    serviceFeatures: [
      { title: '', tags: ['全预约制', '免费茶点', '头皮检测', '一对一服务', '可上门服务'] },
      { title: '其他', tags: ['不可携带宠物'] }
    ],
    environmentFacilities: [
      { title: '', tags: ['储物柜', '免费Wifi', 'VIP专区', '沙发座'] },
      { title: '通用设施', tags: ['电梯', '空调'] }
    ],
    questions: ['烫发后如何护理？', '染发颜色如何选择？'],
    statistics: {
      appointmentCount: 1100,
      followerCount: 2200,
      experience: 6,
      rating: 4.8
    }
  },
  {
    id: '5',
    name: '陈晓峰',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png',
    coverImage: coverImages[4],
    role: '美发师',
    level: '特级',
    position: '创意总监',
    title: '国际沙宣认证导师',
    experience: 15,
    introduction: '国际沙宣学院认证导师，擅长欧美系发型设计',
    specialties: ['创意剪裁', '欧美发型', '高端染发'],
    workDays: '周二 - 周日',
    workHours: '10:00-20:00',
    appointmentAdvance: '提前1天',
    rating: 4.9,
    reviewCount: 512,
    serviceCount: 3200,
    worksCount: 280,
    followerCount: 5600,
    favoriteCount: 1200,
    appointmentCount: 2800,
    brandId: '2',
    brandName: '成都NICE发型沙龙',
    brandAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
    isFollowed: false,
    isFavorited: false,
    tags: ['国际认证', '明星御用', 'VIP服务'],
    certifications: ['国际美发师证', '沙宣导师认证'],
    serviceFeatures: [
      { title: '', tags: ['全预约制', '免费茶点', '头皮检测', '免费停车', 'VIP专属', '一对一服务', '免费按摩'] },
      { title: '其他', tags: ['不可携带宠物', '服务区不可吸烟'] }
    ],
    environmentFacilities: [
      { title: '', tags: ['储物柜', '免费Wifi', '充电宝', '可看电视', 'VIP专区', '沙发座', '独立包间'] },
      { title: '通用设施', tags: ['电梯', '有停车位', '空调', '现金/刷卡支付'] }
    ],
    questions: ['创意剪裁适合什么人群？', '高端染发使用什么品牌？', '如何预约VIP服务？'],
    statistics: {
      appointmentCount: 2800,
      followerCount: 5600,
      experience: 15,
      rating: 4.9
    }
  },
  {
    id: '6',
    name: '林婉儿',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png',
    coverImage: coverImages[0],
    role: '美发师',
    level: '高级',
    position: '资深设计师',
    title: '日韩造型师',
    experience: 7,
    introduction: '日韩系发型专家，擅长氛围感发型设计',
    specialties: ['日韩发型', '氛围感设计', '柔顺护理'],
    workDays: '周一 - 周六',
    workHours: '10:00-21:00',
    appointmentAdvance: '提前2小时',
    rating: 4.8,
    reviewCount: 267,
    serviceCount: 1890,
    worksCount: 145,
    followerCount: 2800,
    favoriteCount: 680,
    appointmentCount: 1560,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    brandAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
    isFollowed: false,
    isFavorited: false,
    tags: ['日韩风格', '温柔服务', '免费设计'],
    certifications: ['高级美发师证'],
    serviceFeatures: [
      { title: '', tags: ['全预约制', '免费茶点', '一对一服务', '免费设计咨询'] },
      { title: '其他', tags: ['不可携带宠物'] }
    ],
    environmentFacilities: [
      { title: '', tags: ['储物柜', '免费Wifi', '沙发座'] },
      { title: '通用设施', tags: ['空调', '现金/刷卡支付'] }
    ],
    questions: ['日韩风格发型如何打理？', '氛围感发型适合什么脸型？'],
    statistics: {
      appointmentCount: 1560,
      followerCount: 2800,
      experience: 7,
      rating: 4.8
    }
  },
  {
    id: '7',
    name: '赵凯',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    coverImage: coverImages[1],
    role: '美发师',
    level: '资深',
    position: '技术主管',
    title: '染发专家',
    experience: 9,
    introduction: '潮流染发专家，擅长各种时尚发色设计',
    specialties: ['潮流染发', '漂染技术', '挑染设计'],
    workDays: '周二 - 周日',
    workHours: '10:00-21:00',
    appointmentAdvance: '提前3小时',
    rating: 4.7,
    reviewCount: 189,
    serviceCount: 1456,
    worksCount: 112,
    followerCount: 1900,
    favoriteCount: 420,
    appointmentCount: 980,
    brandId: '2',
    brandName: '成都NICE发型沙龙',
    brandAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
    isFollowed: false,
    isFavorited: false,
    tags: ['染发专家', '潮流前沿', '色彩搭配'],
    certifications: ['高级染发师证', '色彩顾问认证'],
    serviceFeatures: [
      { title: '', tags: ['全预约制', '免费茶点', '头皮检测', '一对一服务'] },
      { title: '其他', tags: ['服务区不可吸烟'] }
    ],
    environmentFacilities: [
      { title: '', tags: ['储物柜', '免费Wifi', '充电宝'] },
      { title: '通用设施', tags: ['空调', '现金/刷卡支付'] }
    ],
    questions: ['漂染会伤害头发吗？', '染发颜色能保持多久？'],
    statistics: {
      appointmentCount: 980,
      followerCount: 1900,
      experience: 9,
      rating: 4.7
    }
  },
  {
    id: '8',
    name: '周雅琪',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
    coverImage: coverImages[2],
    role: '美发师',
    level: '高级',
    position: '发型师',
    title: '短发造型师',
    experience: 5,
    introduction: '新锐发型师，擅长时尚短发和个性发型',
    specialties: ['时尚短发', '个性发型', '轻盈剪裁'],
    workDays: '周一 - 周六',
    workHours: '09:00-20:00',
    appointmentAdvance: '提前1小时',
    rating: 4.6,
    reviewCount: 156,
    serviceCount: 876,
    worksCount: 89,
    followerCount: 1200,
    favoriteCount: 280,
    appointmentCount: 720,
    brandId: '1',
    brandName: '金龙大好人美发沙龙',
    brandAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
    isFollowed: false,
    isFavorited: false,
    tags: ['新锐设计', '时尚前沿', '个定制'],
    certifications: ['中级美发师证'],
    serviceFeatures: [
      { title: '', tags: ['免费茶点', '一对一服务', '快速服务'] },
      { title: '其他', tags: ['不可携带宠物'] }
    ],
    environmentFacilities: [
      { title: '', tags: ['免费Wifi', '充电宝'] },
      { title: '通用设施', tags: ['空调'] }
    ],
    questions: ['短发多久修剪一次？', '如何选择适合的短发造型？'],
    statistics: {
      appointmentCount: 720,
      followerCount: 1200,
      experience: 5,
      rating: 4.6
    }
  }
]

// 服务分类
const serviceCategories = [
  { id: 'wash-cut-blow', label: '洗剪吹' },
  { id: 'perm', label: '烫发' },
  { id: 'dye', label: '染发' },
  { id: 'care', label: '护发' },
  { id: 'scalp', label: '头皮' },
  { id: 'extension', label: '接发' }
]

// 头发长度项
const hairLengthOptions = [
  { id: 'short', label: '短发' },
  { id: 'medium', label: '中发' },
  { id: 'long', label: '长发' }
]

// 品牌项（产品品牌）
const brandOptions = [
  { id: 1, name: '威娜', price: '560' },
  { id: 2, name: '菲灵', price: '660' },
  { id: 3, name: '欧莱雅', price: '760' },
  { id: 4, name: '乔薇尔', price: '860' }
]

// 服务类型分类
const serviceTypes = {
  'hair-service': ['wash-cut-blow', 'perm', 'dye', 'care', 'scalp', 'extension'], // 美发服务
  'beauty-service': ['facial', 'makeup', 'skincare', 'nail'], // 美容服务
  'other-service': ['consultation', 'vip', 'special'] // 其他服务
}

// 设计师服务项目 - 增强版，添加serviceType
const designerServices = [
  // 美发服务
  { id: '1', designerId: '1', serviceType: 'hair-service', category: 'perm', name: '烫发', description: '发型提案+烫发+发型', price: 799, originalPrice: 999, duration: 60, soldCount: 1234, discount: '预约优惠10%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '2', designerId: '1', serviceType: 'hair-service', category: 'wash-cut-blow', name: '精致剪发', description: '专业剪发+发型设计', price: 99, originalPrice: 128, duration: 45, soldCount: 2356, discount: '新客立减20', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '3', designerId: '1', serviceType: 'hair-service', category: 'dye', name: '个性染发', description: '发型提案+染发+护理', price: 599, originalPrice: 799, duration: 90, soldCount: 1567, discount: '预约优惠15%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '4', designerId: '1', serviceType: 'hair-service', category: 'care', name: '深层护理', description: '头皮检测+深层护理', price: 299, originalPrice: 399, duration: 60, soldCount: 876, discount: '会员专享', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '5', designerId: '2', serviceType: 'hair-service', category: 'perm', name: '韩式烫发', description: '韩式发型+烫发+护理', price: 899, originalPrice: 1199, duration: 120, soldCount: 956, discount: '预约优惠10%', image:'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id:'6', designerId:'2', serviceType:'hair-service', category:'wash-cut-blow', name:'总监剪发', description:'总监亲剪+发型设计', price:'199',
    originalPrice:'258',
    duration:'60',
    soldCount:'1890',
    discount:'新客立减30',
    image:'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png'
  },
  { id: '8', designerId: '3', serviceType: 'hair-service', category: 'dye', name: '渐变染发', description: '时尚渐变染发设计', price: 699, originalPrice: 899, duration: 120, soldCount: 567, discount: '预约优惠20%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '9', designerId: '4', serviceType: 'hair-service', category: 'perm', name: '女士烫发', description: '女士专属烫发发型', price: 699, originalPrice: 899, duration: 90, soldCount: 1456, discount: '预约优惠10%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '10', designerId: '5', serviceType: 'hair-service', category: 'perm', name: '创意烫发', description: '国际导师创意烫发', price: 1299, originalPrice: 1599, duration: 150, soldCount: 890, discount: 'VIP专享', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '11', designerId: '5', serviceType: 'hair-service', category: 'dye', name: '高端染发', description: '进口染剂+专业护理', price: 999, originalPrice: 1299, duration: 120, soldCount: 678, discount: '预约优惠15%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  // 美容服务 - 仅设计师1有
  { id: '12', designerId: '1', serviceType: 'beauty-service', category: 'facial', name: '深层清洁护理', description: '专业深层清洁+补水', price: 399, originalPrice: 499, duration: 60, soldCount: 456, discount: '新客体验价', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '13', designerId: '1', serviceType: 'beauty-service', category: 'skincare', name: '水光护肤', description: '水光精华+深层滋养', price: 599, originalPrice: 799, duration: 90, soldCount: 234, discount: '会员专享', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  // 其他服务 - 仅设计师1有
  { id: '14', designerId: '1', serviceType: 'other-service', category: 'consultation', name: '形象咨询', description: '专业形象设计咨询', price: 199, originalPrice: 299, duration: 30, soldCount: 123, discount: '', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  // 设计师2的更多服务
  { id: '15', designerId: '2', serviceType: 'hair-service', category: 'dye', name: '时尚染发', description: '进口染剂+专业护理', price: 699, originalPrice: 899, duration: 90, soldCount: 876, discount: '预约优惠15%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '16', designerId: '2', serviceType: 'hair-service', category: 'care', name: '深层修复护理', description: '受损发质专业修复', price: 399, originalPrice: 499, duration: 60, soldCount: 567, discount: '会员专享', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  // 设计师3的更多服务
  { id: '17', designerId: '3', serviceType: 'hair-service', category: 'perm', name: '男士纹理烫', description: '自然纹理烫发发型', price: 499, originalPrice: 699, duration: 60, soldCount: 456, discount: '新客立减50', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '18', designerId: '3', serviceType: 'hair-service', category: 'care', name: '头皮护理', description: '头皮深层清洁养护', price: 199, originalPrice: 299, duration: 45, soldCount: 234, discount: '', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  // 设计师4的更多服务
  { id: '19', designerId: '4', serviceType: 'hair-service', category: 'wash-cut-blow', name: '女士精剪', description: '女士专业剪发发型', price: 128, originalPrice: 168, duration: 45, soldCount: 789, discount: '新客立减20', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '20', designerId: '4', serviceType: 'hair-service', category: 'dye', name: '女士染发', description: '时尚染发+护理', price: 599, originalPrice: 799, duration: 90, soldCount: 567, discount: '预约优惠10%', image:'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id:'21', designerId:'4', serviceType:'hair-service', category:'care',
    name:'柔顺护理',
    description:'深层柔顺修复护理',
    price:'299',
    originalPrice:'399',
    duration:'60',
    soldCount:'345',
    discount:'会员专享',
    image:'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png'
  },
  // 设计师5的更多服务
  { id: '22', designerId: '5', serviceType: 'hair-service', category: 'wash-cut-blow', name: '创意剪发', description: '国际导师创意剪发', price: 299, originalPrice: 399, duration: 60, soldCount: 456, discount: 'VIP专享', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '23', designerId: '5', serviceType: 'hair-service', category: 'care', name: '高端护理', description: '进口产品深层护理', price: 599, originalPrice: 799, duration: 90, soldCount: 234, discount: '会员专享', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  // 设计师6的服务
  { id: '24', designerId: '6', serviceType: 'hair-service', category: 'perm', name: '日韩烫发', description: '日韩风格自然烫发', price: 799, originalPrice: 999, duration: 90, soldCount: 678, discount: '预约优惠10%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '25', designerId: '6', serviceType: 'hair-service', category: 'wash-cut-blow', name: '氛围感剪发', description: '日系氛围感型', price: 128, originalPrice: 168, duration: 45, soldCount: 567, discount: '新客立减20', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '26', designerId: '6', serviceType: 'hair-service', category: 'dye', name: '日系染发', description: '日系低调染发', price: 599, originalPrice: 799, duration: 90, soldCount: 456, discount: '预约优惠15%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '27', designerId: '6', serviceType: 'hair-service', category: 'care', name: '柔顺护理', description: '深层柔顺修复', price: 299, originalPrice: 399, duration: 60, soldCount: 345, discount: '', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  // 设计师7的服务
  { id: '28', designerId: '7', serviceType: 'hair-service', category: 'dye', name: '潮流染发', description: '时尚潮流染发设计', price: 799, originalPrice: 999, duration: 120, soldCount: 567, discount: '预约优惠15%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '29', designerId: '7', serviceType: 'hair-service', category: 'wash-cut-blow', name: '时尚剪发', description: '潮流时尚剪发型', price: 99, originalPrice: 128, duration: 45, soldCount: 456, discount: '新客立减10', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '30', designerId: '7', serviceType: 'hair-service', category: 'perm', name: '挑染烫发', description: '挑染+烫发发型', price: 899, originalPrice: 1199, duration: 150, soldCount: 345, discount: '预约优惠20%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '31', designerId: '7', serviceType: 'hair-service', category: 'care', name: '染后护理', description: '染发后专业护理', price: 199, originalPrice: 299, duration: 45, soldCount: 234, discount: '', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  // 设计师8的服务
  { id: '32', designerId: '8', serviceType: 'hair-service', category: 'wash-cut-blow', name: '时尚短发', description: '时尚短发精剪', price: 99, originalPrice: 128, duration: 30, soldCount: 456, discount: '新客立减10', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '33', designerId: '8', serviceType: 'hair-service', category: 'perm', name: '个性烫发', description: '个性发型烫发', price: 599, originalPrice: 799, duration: 90, soldCount: 345, discount: '预约优惠10%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '34', designerId: '8', serviceType: 'hair-service', category: 'dye', name: '个性染发', description: '个性潮流染发', price: 499, originalPrice: 699, duration: 90, soldCount: 234, discount: '预约优惠15%', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' },
  { id: '35', designerId: '8', serviceType: 'hair-service', category: 'care', name: '轻盈护理', description: '轻盈蓬松护理', price: 199, originalPrice: 299, duration: 45, soldCount: 123, discount: '', image: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png' }
]

// 设计师作品 - 增强版，包含性别分类
const designerWorks = [
  // 设计师1的作品
  { id: '1', designerId: '1', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '女士短发发型', description: '清爽短发，展现独特气质', likes: 236, time: '2025-11-20' },
  { id: '2', designerId: '1', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '时尚渐变染发', description: '个渐变色，潮流前沿', likes: 189, time: '2025-11-18' },
  { id: '3', designerId: '1', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '韩式烫发', description: '自然卷度，优雅气质', likes: 156, time: '2025-11-15' },
  { id: '4', designerId: '1', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '男士商务发型', description: '干练利落，商务精英', likes: 98, time: '2025-11-12' },
  { id: '5', designerId: '1', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '男士潮流短发', description: '潮流前卫，个十足', likes: 145, time: '2025-11-10' },
  { id: '6', designerId: '1', type: 'kids', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '儿童可爱发型', description: '活泼可爱，童趣满满', likes: 78, time: '2025-11-08' },
  // 设计师2的作品
  { id: '7', designerId: '2', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '柔顺护理效果', description: '深度护理后的柔顺效果', likes: 98, time: '2025-11-12' },
  { id: '8', designerId: '2', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '优雅长发发型', description: '飘长发，气质优雅', likes: 234, time: '2025-11-10' },
  { id: '9', designerId: '2', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '韩式烫发发型', description: '韩式自然卷，温柔可人', likes: 189, time: '2025-11-09' },
  { id: '10', designerId: '2', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '男士纹理烫', description: '自然纹理，时尚型男', likes: 167, time: '2025-11-08' },
  { id: '11', designerId: '2', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '男士商务短发', description: '干练专业，商务首', likes: 145, time: '2025-11-06' },
  { id: '12', designerId: '2', type: 'kids', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '儿童时尚发型', description: '时尚可爱，萌趣十足', likes: 89, time: '2025-11-05' },
  // 设计师3的作品
  { id: '13', designerId: '3', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '男士渐变发型', description: '渐变层次，潮流必备', likes: 289, time: '2025-11-15' },
  { id: '14', designerId: '3', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '男士复古油头', description: '复古风格，绅士品味', likes: 198, time: '2025-11-12' },
  { id: '15', designerId: '3', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '潮流短发发型', description: '潮流前卫，个张扬', likes: 267, time: '2025-11-10' },
  { id: '16', designerId: '3', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '中风短发', description: '帅气中，酷感十足', likes: 156, time: '2025-11-08' },
  { id: '17', designerId: '3', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '渐变染发发型', description: '个渐变，独特魅力', likes: 189, time: '2025-11-06' },
  { id: '18', designerId: '3', type: 'kids', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '男孩潮流发型', description: '潮流小男孩，帅气可爱', likes: 98, time: '2025-11-04' },
  // 设计师4的作品
  { id: '19', designerId: '4', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '温柔波浪卷', description: '浪漫波浪，温柔气质', likes: 312, time: '2025-11-18' },
  { id: '20', designerId: '4', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '空气感烫发', description: '轻盈空气感，自然灵动', likes: 278, time: '2025-11-16' },
  { id: '21', designerId: '4', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '女神长发发型', description: '飘长发，女神气质', likes: 256, time: '2025-11-14' },
  { id: '22', designerId: '4', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '男士简约发型', description: '简约干练，清爽帅气', likes: 134, time: '2025-11-12' },
  { id: '23', designerId: '4', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '绅士分头发型', description: '绅士风范，成熟稳重', likes: 112, time: '2025-11-10' },
  { id: '24', designerId: '4', type: 'kids', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '女孩公主发型', description: '甜美公主，可爱动人', likes: 89, time: '2025-11-08' },
  // 设计师5的作品
  { id: '25', designerId: '5', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '欧美系大波浪', description: '欧美风格，感迷人', likes: 456, time: '2025-11-20' },
  { id: '26', designerId: '5', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '高端染发作品', description: '进口染剂，色彩持久', likes: 378, time: '2025-11-18' },
  { id: '27', designerId: '5', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '创意剪裁发型', description: '创意设计，独特风格', likes: 345, time: '2025-11-16' },
  { id: '28', designerId: '5', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '高端男士发型', description: '精致剪裁，高端品质', likes: 267, time: '2025-11-14' },
  { id: '29', designerId: '5', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '欧美男士发型', description: '欧美风格，型男必备', likes: 234, time: '2025-11-12' },
  { id: '30', designerId: '5', type: 'kids', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '精致儿童发型', description: '精致可爱，萌化人心', likes: 123, time: '2025-11-10' },
  // 设计师6的作品
  { id: '31', designerId: '6', type:'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '日系自然卷', description: '自然卷发，清新脱俗', likes: 278, time: '2025-11-19' }, 
  { id: '32', designerId: '6', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '韩式空气刘海', description: '甜美空气刘海，减龄神器', likes: 256, time: '2025-11-17' },
  { id: '33', designerId: '6', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '氛围感中长发', description: '日韩氛围感，温柔治愈', likes: 234, time: '2025-11-15' },
  { id: '34', designerId: '6', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '日系男士发型', description: '日系清爽，阳光帅气', likes: 178, time: '2025-11-13' },
  { id: '35', designerId: '6', type:'male', image:'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png' , title:'韩系男士发型' , description:'韩系温柔，暖男气质' , likes : 156 , time : "2025-11-11" },
  { id: '36', designerId:'6' , type:'kids' , image:'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png' , title:'可爱日系童发' , description:'日系萌娃，可爱满分' , likes : 98 , time : "2025-11-09" },
  // 设计师7的作品
  { id: '37', designerId: '7', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '潮流挑染发型', description: '潮流挑染，个性前卫', likes: 312, time: '2025-11-20' },
  { id: '38', designerId: '7', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '渐变色染发', description: '渐变色系，独特魅力', likes: 278, time: '2025-11-18' },
  { id: '39', designerId: '7', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '时尚漂染作品', description: '大胆漂染，潮流先锋', likes: 245, time: '2025-11-16' },
  { id: '40', designerId: '7', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '男士潮流染发', description: '潮流色彩，型男必备', likes: 189, time: '2025-11-14' },
  { id: '41', designerId: '7', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '渐变男士发型', description: '渐变层次，潮流前卫', likes: 167, time: '2025-11-12' },
  { id: '42', designerId: '7', type: 'kids', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '时尚儿童染发', description: '时尚小潮童，个性十足', likes: 78, time: '2025-11-10' },
  // 设计师8的作品
  { id: '43', designerId: '8', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '时尚短发发型', description: '时尚短发，干练帅气', likes: 234, time: '2025-11-19' },
  { id: '44', designerId: '8', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '个性短发设计', description: '个性设计，独特风格', likes: 198, time: '2025-11-17' },
  { id: '45', designerId: '8', type: 'female', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '轻盈短发发型', description: '轻盈蓬松，青春活力', likes: 178, time: '2025-11-15' },
  { id: '46', designerId: '8', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '清爽男士短发', description: '清爽干练，阳光帅气', likes: 156, time: '2025-11-13' },
  { id: '47', designerId: '8', type: 'male', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '个性男士发型', description: '个性张扬，潮流前卫', likes: 134, time: '2025-11-11' },
  { id: '48', designerId: '8', type: 'kids', image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', title: '可爱童短发', description: '可爱活泼，萌趣满满', likes: 89, time: '2025-11-09' }
]

// 设计师评价 - 增强版
const designerReviews = [
  // 设计师1的评价
  {
    id: '1',
    designerId: '1',
    userId: '100',
    userName: '加菲猫',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '技术很好！发型师很专业，剪出来的效果超出预期',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-25',
    serviceName: '精致剪发',
    likeCount: 56,
    replyCount: 1,
    reply: null,
    tags: ['skill']
  },
  {
    id: '2',
    designerId: '1',
    userId: '101',
    userName: '小美',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '效果满意！染的颜色很好看，跟我想要的一模一样',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-22',
    serviceName: '个性染发',
    likeCount: 23,
    replyCount: 1,
    reply: '感谢您的认可，欢迎下次光临！',
    tags: ['effect']
  },
  {
    id: '3',
    designerId: '1',
    userId: '102',
    userName: '阿杰',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '服务态度超好！店员很热情，还提供免费茶水',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-20',
    serviceName: '烫发',
    likeCount: 45,
    replyCount: 0,
    reply: null,
    tags: ['service']
  },
  {
    id: '4',
    designerId: '1',
    userId: '103',
    userName: '丽丽',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 4.8,
    content: '术很好，效果也满意，下次还会来',
    images: [],
    time: '2025-11-18',
    serviceName: '深层护理',
    likeCount: 12,
    replyCount: 0,
    reply: null,
    tags: ['skill', 'effect']
  },
  // 设计师2的评价
  {
    id: '5',
    designerId: '2',
    userId: '104',
    userName: '大头',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '张师傅太专业了，烫发效果非常自然',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-25',
    serviceName: '韩式烫发',
    likeCount: 78,
    replyCount: 1,
    reply: '谢谢您的好评！',
    tags: ['skill', 'effect']
  },
  {
    id: '6',
    designerId: '2',
    userId: '106',
    userName: '小花',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '张师傅太专业了，烫发效果非常自然',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-23',
    serviceName: '张师傅剪发',
    likeCount: 45,
    replyCount: 0,
    reply: null,
    tags: ['skill', 'service']
  },
  {
    id: '7',
    designerId: '2',
    userId: '107',
    userName: '阿明',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 4.9,
    content: '服务很贴心，染发效果也很满意',
    images: [],
    time: '2025-11-20',
    serviceName: '时尚染发',
    likeCount: 32,
    replyCount: 0,
    reply: null,
    tags: ['service', 'effect']
  },
  // 设计师3的评价
  {
    id: '8',
    designerId: '3',
    userId: '105',
    userName: '小王',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 4.5,
    content: '男士发型做得很帅，价格也实惠',
    images: [],
    time: '2025-11-22',
    serviceName: '男士发型',
    likeCount: 34,
    replyCount: 0,
    reply: null,
    tags: ['effect', 'service']
  },
  {
    id: '9',
    designerId: '3',
    userId: '108',
    userName: '大伟',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '渐变染发做得太酷了，朋友都说好看',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-20',
    serviceName: '渐变染发',
    likeCount: 56,
    replyCount: 1,
    reply: '谢谢支持！',
    tags: ['skill', 'effect']
  },
  {
    id: '10',
    designerId: '3',
    userId: '109',
    userName: '阿强',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 4.8,
    content: '术专业，沟很顺畅',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-18',
    serviceName: '男士纹理烫',
    likeCount: 23,
    replyCount: 0,
    reply: null,
    tags: ['skill', 'service']
  },
  // 设计师4的评价
  {
    id: '11',
    designerId: '4',
    userId: '110',
    userName: '小红',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '烫发效果超级自然，刘师手法很棒',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-24',
    serviceName: '女士烫发',
    likeCount: 67,
    replyCount: 1,
    reply: '感谢您的认可！',
    tags: ['skill', 'effect']
  },
  {
    id: '12',
    designerId: '4',
    userId: '111',
    userName: '小兰',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 4.9,
    content: '服务度很好，染发颜色也很持久',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-21',
    serviceName: '女士染发',
    likeCount: 34,
    replyCount: 0,
    reply: null,
    tags: ['service', 'effect']
  },
  {
    id: '13',
    designerId: '4',
    userId: '112',
    userName: '娜娜',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '护理后头发顺滑多了，效果明显',
    images: [],
    time: '2025-11-19',
    serviceName: '柔顺护理',
    likeCount: 21,
    replyCount: 0,
    reply: null,
    tags: ['effect']
  },
  // 设计师5的评价
  {
    id: '14',
    designerId: '5',
    userId: '113',
    userName: '阿琳',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '陈监太厉害了，创意烫发效果惊艳！',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-25',
    serviceName: '创意烫发',
    likeCount: 89,
    replyCount: 1,
    reply: '很高兴您满意！',
    tags: ['skill', 'effect']
  },
  {
    id: '15',
    designerId: '5',
    userId: '114',
    userName: '小婷',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '高端染发果然不样，颜色超级持久',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-22',
    serviceName: '高端染发',
    likeCount: 67,
    replyCount: 0,
    reply: null,
    tags: ['skill', 'effect']
  },
  {
    id: '16',
    designerId: '5',
    userId: '115',
    userName: '阿华',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 4.9,
    content: 'VIP服务体验很棒，环境舒',
    images: [],
    time: '2025-11-19',
    serviceName: '创意剪发',
    likeCount: 45,
    replyCount: 0,
    reply: null,
    tags: ['service']
  },
  // 设计师6的评价
  {
    id: '17',
    designerId: '6',
    userId: '116',
    userName: '小樱',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '日韩风格做得太棒了，氛围感满分！',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-24',
    serviceName: '日韩烫发',
    likeCount: 78,
    replyCount: 1,
    reply: '谢谢喜欢！',
    tags: ['skill', 'effect']
  },
  {
    id: '18',
    designerId: '6',
    userId: '117',
    userName: '小雪',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 4.9,
    content: '氛围感剪发名不虚传，很温柔的感觉',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-21',
    serviceName: '氛围感剪发',
    likeCount: 56,
    replyCount: 0,
    reply: null,
    tags: ['skill', 'effect']
  },
  {
    id: '19',
    designerId: '6',
    userId: '118',
    userName: '小月',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '服务特别贴心，会详细沟想要的效果',
    images: [],
    time: '2025-11-18',
    serviceName: '日系染发',
    likeCount: 34,
    replyCount: 0,
    reply: null,
    tags: ['service']
  },
  // 设计师7的评价
  {
    id: '20',
    designerId: '7',
    userId: '119',
    userName: '阿彩',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '潮流染发做得太酷了，颜色调得超级好看',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-25',
    serviceName: '潮流染发',
    likeCount: 89,
    replyCount: 1,
    reply: '感谢支持！',
    tags: ['skill', 'effect']
  },
  {
    id: '21',
    designerId: '7',
    userId: '120',
    userName: '小虹',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 4.8,
    content: '挑染效果很个，朋友都问我在哪做的',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-22',
    serviceName: '挑染烫发',
    likeCount: 56,
    replyCount: 0,
    reply: null,
    tags: ['effect']
  },
  {
    id: '22',
    designerId: '7',
    userId: '121',
    userName: '大志',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 4.7,
    content: '时尚剪发很潮，价格也合理',
    images: [],
    time: '2025-11-19',
    serviceName: '时尚剪发',
    likeCount: 23,
    replyCount: 0,
    reply: null,
    tags: ['effect', 'service']
  },
  // 设计师8的评价
  {
    id: '23',
    designerId: '8',
    userId: '122',
    userName: '小安',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 5.0,
    content: '时尚短发剪得超级好看，很有个！',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png',
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-24',
    serviceName: '时尚短发',
    likeCount: 67,
    replyCount: 1,
    reply: '谢谢认可！',
    tags: ['skill', 'effect']
  },
  {
    id: '24',
    designerId: '8',
    userId: '123',
    userName: '小琪',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 4.8,
    content: '个烫发效果很棒，轻盈蓬松',
    images: [
      'https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png'
    ],
    time: '2025-11-21',
    serviceName: '个烫发',
    likeCount: 45,
    replyCount: 0,
    reply: null,
    tags: ['skill', 'effect']
  },
  {
    id: '25',
    designerId: '8',
    userId: '124',
    userName: '小敏',
    userAvatar: 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg',
    rating: 4.6,
    content: '服务度很好，会细心询问求',
    images: [],
    time: '2025-11-18',
    serviceName: '个染发',
    likeCount: 21,
    replyCount: 0,
    reply: null,
    tags: ['service']
  }
]

// 评分统计数据
const ratingStats = {
  '1': {
    overall: 4.8,
    level: '很棒',
    totalCount: 287,
    categories: [
      { label: '专业', value: 4.6, width: 91 },
      { label: '服务', value: 4.9, width: 97 },
      { label: '效果', value: 4.8, width: 94 },
      { label: '环境', value: 4.8, width: 94 }
    ],
    filterTags: [
      { label: '全部', count: null, filter: 'all' },
      { label: '术很好', count: 232, filter: 'skill' },
      { label: '效果满意', count: 198, filter: 'effect' },
      { label: '服务度', count: 156, filter: 'service' }
    ]
  },
  '2': {
    overall: 4.9,
    level: '非常棒',
    totalCount: 356,
    categories: [
      { label: '专业', value: 4.9, width: 97 },
      { label: '服务', value: 4.8, width: 94 },
      { label: '效果', value: 4.9, width: 97 },
      { label: '环境', value: 4.7, width: 92 }
    ],
    filterTags: [
      { label: '全部', count: null, filter: 'all' },
      { label: '术很好', count: 289, filter: 'skill' },
      { label: '效果满意', count: 267, filter: 'effect' },
      { label: '服务度', count: 198, filter: 'service' }
    ]
  },
  '3': {
    overall: 4.7,
    level: '很棒',
    totalCount: 245,
    categories: [
      { label: '专业', value: 4.7, width: 93 },
      { label: '服务', value: 4.6, width: 91 },
      { label: '效果', value: 4.8, width: 95 },
      { label: '环境', value: 4.5, width: 89 }
    ],
    filterTags: [
      { label: '全部', count: null, filter: 'all' },
      { label: '术很好', count: 198, filter: 'skill' },
      { label: '效果满意', count: 178, filter: 'effect' },
      { label: '服务度', count: 134, filter: 'service' }
    ]
  },
  '4': {
    overall: 4.8,
    level: '很棒',
    totalCount: 198,
    categories: [
      { label: '专业', value: 4.8, width: 95 },
      { label: '服务', value: 4.9, width: 97 },
      { label: '效果', value: 4.7, width: 93 },
      { label: '环境', value: 4.8, width: 95 }
    ],
    filterTags: [
      { label: '全部', count: null, filter: 'all' },
      { label: '术很好', count: 156, filter: 'skill' },
      { label: '效果满意', count: 145, filter: 'effect' },
      { label: '服务度', count: 123, filter: 'service' }
    ]
  },
  '5': {
    overall: 4.9,
    level: '非常棒',
    totalCount: 512,
    categories: [
      { label: '专业', value: 4.9, width: 98 },
      { label: '服务', value: 4.8, width: 95 },
      { label: '效果', value: 4.9, width: 98 },
      { label: '环境', value: 4.9, width: 98 }
    ],
    filterTags: [
      { label: '全部', count: null, filter: 'all' },
      { label: '术很好', count: 423, filter: 'skill' },
      { label: '效果满意', count: 389, filter: 'effect' },
      { label: '服务度', count: 278, filter: 'service' }
    ]
  },
  '6': {
    overall: 4.8,
    level: '很棒',
    totalCount: 267,
    categories: [
      { label: '专业', value: 4.8, width: 95 },
      { label: '服务', value: 4.9, width: 97 },
      { label: '效果', value: 4.8, width: 95 },
      { label: '环境', value: 4.7, width: 93 }
    ],
    filterTags: [
      { label: '全部', count: null, filter: 'all' },
      { label: '术很好', count: 213, filter: 'skill' },
      { label: '效果满意', count: 198, filter: 'effect' },
      { label: '服务度', count: 167, filter: 'service' }
    ]
  },
  '7': {
    overall: 4.7,
    level: '很棒',
    totalCount: 189,
    categories: [
      { label: '专业', value: 4.8, width: 95 },
      { label: '服务', value: 4.6, width: 91 },
      { label: '效果', value: 4.8, width: 95 },
      { label: '环境', value: 4.5, width: 89 }
    ],
    filterTags: [
      { label: '全部', count: null, filter: 'all' },
      { label: '术很好', count: 145, filter: 'skill' },
      { label: '效果满意', count: 134, filter: 'effect' },
      { label: '服务度', count: 98, filter: 'service' }
    ]
  },
  '8': {
    overall: 4.6,
    level: '很棒',
    totalCount: 156,
    categories: [
      { label: '专业', value: 4.6, width: 91 },
      { label: '服务', value: 4.7, width: 93 },
      { label: '效果', value: 4.6, width: 91 },
      { label: '环境', value: 4.5, width: 89 }
    ],
    filterTags: [
      { label: '全部', count: null, filter: 'all' },
      { label: '术很好', count: 112, filter: 'skill' },
      { label: '效果满意', count: 98, filter: 'effect' },
      { label: '服务度', count: 78, filter: 'service' }
    ]
  }
}

// Mock 数据
export const data = {
  designers,
  designerServices,
  designerWorks,
  designerReviews,
  serviceCategories,
  hairLengthOptions,
  brandOptions,
  ratingStats
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

  // 获取设计师 Portfolio 详情（服务须知、服务特色、环境设施、问答）
  'GET /api/designer/:designerId/portfolio': (params) => {
    const designer = designers.find(d => d.id === params.designerId)
    if (!designer) return error('设计师不存在')
    return success({
      serviceInfo: {
        position: designer.position || '',
        title: designer.title || '',
        specialties: designer.specialties || [],
        workDays: designer.workDays || '',
        workHours: designer.workHours || '',
        experience: designer.experience || 0,
        appointmentAdvance: designer.appointmentAdvance || ''
      },
      serviceFeatures: designer.serviceFeatures || [],
      environmentFacilities: designer.environmentFacilities || [],
      questions: designer.questions || []
    })
  },

  // 获取设计师服务项目（增强版，返回分类和项）
  'GET /api/designer/:designerId/services': (params) => {
    // 获取该设计师的有服务
    let allServices = designerServices.filter(s => s.designerId === params.designerId)

    if (params.serviceType) {
      allServices = allServices.filter(s => s.serviceType === params.serviceType)
    }

    // 计算每个分类的服务数量（基于筛后的服务）
    const categoriesWithCount = serviceCategories.map(cat => ({
      ...cat,
      count: allServices.filter(s => s.category === cat.id).length
    }))

    // 支持按分类筛
    let list = allServices
    if (params.category) {
      list = list.filter(s => s.category === params.category)
    }
    return success({
      ...paginate(list, params.page, params.pageSize),
      categories: categoriesWithCount,
      hairLengthOptions: hairLengthOptions,
      brandOptions: brandOptions
    })
  },

  // 获取设计师作品集（增强版，支持类型筛）
  'GET /api/designer/:designerId/works': (params) => {
    let list = designerWorks.filter(w => w.designerId === params.designerId)
    if (params.type) {
      list = list.filter(w => w.type === params.type)
    }
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取设计师评价列表（增强版，返回评分统计）
  'GET /api/designer/:designerId/reviews': (params) => {
    let list = designerReviews.filter(r => r.designerId === params.designerId)

    if (params.reviewType) {
      if (params.reviewType === 'with-image') {
        list = list.filter(r => r.images && r.images.length > 0)
      } else if (params.reviewType === 'bad') {
        list = list.filter(r => r.rating < 4)
      }
      // 'all' 不要额外筛
    }

    // 支持按标签筛
    if (params.filter && params.filter !== 'all') {
      list = list.filter(r => r.tags && r.tags.includes(params.filter))
    }
    // 支持按评分筛
    if (params.rating) {
      list = list.filter(r => Math.floor(r.rating) === parseInt(params.rating))
    }
    // 获取评分统计
    const stats = ratingStats[params.designerId] || ratingStats['1']
    return success({
      ...paginate(list, params.page, params.pageSize),
      ratingStats: stats
    })
  },

  // 获取设计师可预约时间（增强版，分上午下午）
  'GET /api/designer/:designerId/available-time': (params) => {
    // 模拟不同日期的不同预约状
    const dateStr = params.date || ''
    const isToday = dateStr.includes('today') || !dateStr

    return success({
      date: params.date,
      morningSlots: [
        { time: '10:00', status: isToday ? 'booked' : 'available', label: isToday ? '已预约' : null },
        { time: '11:00', status: isToday ? 'booked' : 'available', label: isToday ? '已预约' : null },
        { time: '12:00', status: 'available', label: null }
      ],
      afternoonSlots: [
        { time: '13:00', status: 'available' },
        { time: '14:00', status: 'available' },
        { time: '15:00', status: 'available' },
        { time: '16:00', status: 'available' },
        { time: '17:00', status: 'available' },
        { time: '18:00', status: 'available' }
      ],
      notice: '预约当天服务要提前60分钟'
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
