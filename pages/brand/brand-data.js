/**
 * 品牌馆详情页数据
 * 从源/brand-detail重构为Vue3 JS格式
 */

// 分类标签
export const categoryTabs = [
  { id: 'hairstylist', label: '发型师' },
  { id: 'chief', label: '首席' },
  { id: 'senior', label: '资深' },
  { id: 'director', label: '总监' },
  { id: 'manager', label: '店长' }
]

// 发型师/员工数据
export const stylistData = [
  {
    id: 1,
    name: '李天天',
    image: 'https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png',
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
    id: 2,
    name: '张小雨',
    image: 'https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png',
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
    id: 3,
    name: '王大明',
    image: 'https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png',
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
  },
  {
    id: 4,
    name: '刘美丽',
    image: 'https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png',
    role: '美发师',
    level: '高级',
    category: 'hairstylist',
    position: '设计师｜从业6年',
    specialties: ['女士烫发', '造型设计'],
    rating: 4.8,
    serviceCount: 198,
    worksCount: 156,
    tags: ['提前预约', '上门服务'],
    price: 699,
    discount: '会员优惠20%',
    soldCount: 1567
  }
]

// 服务标签
export const serviceBadges = [
  { icon: 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg', label: '安心服务' },
  { icon: 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg', label: '7天无忧' },
  { icon: 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg', label: '免费设计' },
  { icon: 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg', label: '小吃水果' },
  { icon: 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg', label: '预约服务' }
]

// 统计数据
export const statistics = [
  { value: '1244', label: '预约' },
  { value: '2000', label: '粉丝' },
  { value: '18', unit: '年', label: '从业' },
  { value: '4.8', unit: '分', label: '评分' }
]

// 优惠信息
export const promotions = [
  { label: '满100-5' },
  { label: '满500-50' }
]

// 主标签
export const mainTabs = [
  { id: 'designer', label: '设计师', active: true },
  { id: 'service', label: '服务', active: false },
  { id: 'works', label: '作品', active: false },
  { id: 'reviews', label: '点评', active: false }
]

// 子标签
export const subTabs = [
  { id: 'hairdresser', label: '美发师', active: true },
  { id: 'beautician', label: '美容师', active: false }
]

// 服务信息数据
export const serviceInfoData = [
  { label: '营业时间', value: ['周二 - 周日', '10:00-21:00'] },
  { label: '预约时间', value: ['提前3小时'] },
  { label: '美发师', value: ['15人'] },
  { label: '工位', value: ['15个'] },
  { label: '成立', value: ['2017-11-20'] },
  { label: '面积', value: ['160m²'] }
]

// 服务须知标签
export const serviceTabs = [
  { id: 'notice', label: '服务须知' },
  { id: 'features', label: '服务特色' },
  { id: 'facilities', label: '环境设施' }
]

// 点评标签
export const reviewTags = [
  { label: '技术很好', count: 232, active: true },
  { label: '效果满意', count: 321, active: false },
  { label: '服务态度', count: 321, active: false }
]

// 问答数据
export const questions = [
  '只烫不染的短发多少钱？头发比较干，不知道能不能做？',
  '刘海发际线太高怎么办？'
]

// 品牌信息
export const brandInfo = {
  name: '金龙大好人美发沙龙',
  avatar: 'https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-153.png',
  badge: '舒适',
  certification: '企业认证',
  certIcon: 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-3.svg',
  natureLabel: '店铺性质',
  nature: '工作室、专业店',
  introLabel: '品牌简介',
  introduction: '从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长...'
}

// 营业信息
export const businessInfo = {
  status: '营业中',
  restDay: '周二休息',
  hours: '10:00-21:00',
  phoneIcon: 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1879-2.svg'
}

// 地址信息
export const addressInfo = {
  street: '锦江区红星路120号',
  detail: 'IFS国际东门2栋607室',
  distance: '距您2.7km',
  navIcon: 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1879.svg',
  mapBg: 'https://c.animaapp.com/mi5l377nJk1HHO/img/mask-group.png'
}

// 右侧统计信息
export const rightStats = {
  shareIcon: 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1879-1.svg',
  designerIcon: 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-4.svg',
  designerCount: 281,
  worksIcon: 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-12.svg',
  worksCount: 234
}

// 点评示例数据
export const reviewsData = [
  {
    id: 1,
    image: 'https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-187.png',
    title: '环境特别好',
    rating: 5.0,
    content: '环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境...',
    userAvatar: 'https://c.animaapp.com/mi5l377nJk1HHO/img/ellipse-34.svg',
    userName: '加菲猫',
    date: '2019-12-25'
  }
]

// 头部背景图
export const headerBg = 'https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-186.png'

// Logo
export const logoImg = 'https://c.animaapp.com/mi5l377nJk1HHO/img/group-7.png'

// 返回按钮
export const backIcon = 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1877.svg'

// 卡片背景装饰
export const subtractBg = 'https://c.animaapp.com/mi5l377nJk1HHO/img/subtract.svg'

// 关注按钮图标
export const followIcon = 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-11.svg'

// 优惠图标
export const promotionIcon = 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1.svg'

// Tab指示器
export const tabIndicator = 'https://c.animaapp.com/mi5l377nJk1HHO/img/vector-15.svg'

// 星星图标
export const starIcon = 'https://c.animaapp.com/mi5l377nJk1HHO/img/star-1.svg'

// 更多箭头图标
export const moreArrowIcon = 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-9.svg'

// 默认导出所有数据
export default {
  categoryTabs,
  stylistData,
  serviceBadges,
  statistics,
  promotions,
  mainTabs,
  subTabs,
  serviceInfoData,
  serviceTabs,
  reviewTags,
  questions,
  brandInfo,
  businessInfo,
  addressInfo,
  rightStats,
  reviewsData,
  headerBg,
  logoImg,
  backIcon,
  subtractBg,
  followIcon,
  promotionIcon,
  tabIndicator,
  starIcon,
  moreArrowIcon
}
