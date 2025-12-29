/**
 * 作品集模块 Mock 数据
 */

import { success, error, paginate, generateId, formatNow } from '../utils.js'

// ========== 模拟数据 ==========

// 作品分类
const categories = [
  { id: 'women', name: '女士', icon: 'https://bioflex.cn/static/icons/women.png' },
  { id: 'men', name: '男士', icon: 'https://bioflex.cn/static/icons/men.png' },
  { id: 'children', name: '儿童', icon: 'https://bioflex.cn/static/icons/children.png' }
]

// 筛条件
const filters = {
  faceType: [
    { id: 'oval', name: '鹅蛋脸' },
    { id: 'round', name: '圆脸' },
    { id: 'square', name: '方脸' },
    { id: 'long', name: '长脸' },
    { id: 'heart', name: '心形脸' },
    { id: 'diamond', name: '菱形脸' }
  ],
  hairVolume: [
    { id: 'thick', name: '发量多' },
    { id: 'normal', name: '发量中' },
    { id: 'thin', name: '发量少' }
  ],
  hairQuality: [
    { id: 'straight', name: '直发' },
    { id: 'wavy', name: '卷发' },
    { id: 'curly', name: '自然卷' }
  ],
  hairThickness: [
    { id: 'thick', name: '粗硬' },
    { id: 'normal', name: '中等' },
    { id: 'thin', name: '细软' }
  ]
}

// 作品列表
const portfolios = [
  {
    id: 'work_001',
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
    title: '温柔中长发',
    description: '适合日常的温柔中长发发型，简约大方又不失气质',
    category: 'women',
    tags: ['中长发', '温柔风', '日常'],
    designerId: 'designer_001',
    designerName: '李天天',
    designerAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    brandId: 'brand_001',
    brandName: 'WAW旗舰店',
    faceType: ['oval', 'round'],
    hairVolume: 'normal',
    hairQuality: 'straight',
    hairThickness: 'normal',
    likes: 1256,
    comments: 86,
    shares: 45,
    favorites: 328,
    isLiked: false,
    isFavorited: false,
    createdAt: '2024-01-10 10:00:00',
    updatedAt: '2024-01-15 14:30:00'
  },
  {
    id: 'work_002',
    images: ['https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600', 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600',
    title: '时尚短发发型',
    description: '干练又时髦的短发发型，展现独立自信的气质',
    category: 'women',
    tags: ['短发', '时尚', '干练'],
    designerId: 'designer_002',
    designerName: '王发型师',
    designerAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    brandId: 'brand_001',
    brandName: 'WAW旗舰店',
    faceType: ['oval', 'heart'],
    hairVolume: 'thick',
    hairQuality: 'straight',
    hairThickness: 'thick',
    likes: 892,
    comments: 54,
    shares: 32,
    favorites: 215,
    isLiked: true,
    isFavorited: false,
    createdAt: '2024-01-08 15:00:00',
    updatedAt: '2024-01-14 09:20:00'
  },
  {
    id: 'work_003',
    images: ['https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600',
    title: '商务男士发型',
    description: '专业干练的商务男士发型，彰显成熟稳重气质',
    category: 'men',
    tags: ['商务', '男士', '成熟'],
    designerId: 'designer_001',
    designerName: '李天天',
    designerAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    brandId: 'brand_002',
    brandName: '型男发型',
    faceType: ['square', 'long'],
    hairVolume: 'normal',
    hairQuality: 'straight',
    hairThickness: 'thick',
    likes: 567,
    comments: 28,
    shares: 18,
    favorites: 142,
    isLiked: false,
    isFavorited: true,
    createdAt: '2024-01-05 11:00:00',
    updatedAt: '2024-01-12 16:45:00'
  },
  {
    id: 'work_004',
    images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600', 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600',
    title: '可爱儿童短发',
    description: '活泼可爱的儿童短发型，打理方便又好看',
    category: 'children',
    tags: ['儿童', '可爱', '短发'],
    designerId: 'designer_003',
    designerName: '张美丽',
    designerAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    brandId: 'brand_003',
    brandName: '童趣发屋',
    faceType: ['round'],
    hairVolume: 'normal',
    hairQuality: 'straight',
    hairThickness: 'thin',
    likes: 423,
    comments: 35,
    shares: 22,
    favorites: 98,
    isLiked: false,
    isFavorited: false,
    createdAt: '2024-01-03 09:30:00',
    updatedAt: '2024-01-10 11:00:00'
  },
  {
    id: 'work_005',
    images: ['https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600', 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600',
    title: '浪漫卷发',
    description: '浪漫优雅的大波浪卷发，合各种场合',
    category: 'women',
    tags: ['卷发', '浪漫', '优雅'],
    designerId: 'designer_002',
    designerName: '王发型师',
    designerAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    brandId: 'brand_001',
    brandName: 'WAW旗舰店',
    faceType: ['oval', 'long', 'diamond'],
    hairVolume: 'thick',
    hairQuality: 'wavy',
    hairThickness: 'normal',
    likes: 2103,
    comments: 156,
    shares: 89,
    favorites: 567,
    isLiked: true,
    isFavorited: true,
    createdAt: '2024-01-01 14:00:00',
    updatedAt: '2024-01-15 10:30:00'
  },
  {
    id: 'work_006',
    images: ['https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600',
    title: '潮流男生发型',
    description: '年轻潮流的男生发型，展现个与活力',
    category: 'men',
    tags: ['潮流', '男生', '个'],
    designerId: 'designer_001',
    designerName: '李天天',
    designerAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    brandId: 'brand_002',
    brandName: '型男型',
    faceType: ['oval', 'round'],
    hairVolume: 'normal',
    hairQuality: 'straight',
    hairThickness: 'normal',
    likes: 789,
    comments: 42,
    shares: 28,
    favorites: 186,
    isLiked: false,
    isFavorited: false,
    createdAt: '2023-12-28 16:00:00',
    updatedAt: '2024-01-08 09:15:00'
  },
  {
    id: 'work_007',
    images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600',
    title: '气质长发',
    description: '优雅气质的长发型，展现女魅力',
    category: 'women',
    tags: ['长发', '气质', '优雅'],
    designerId: 'designer_001',
    designerName: '李天天',
    designerAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    brandId: 'brand_001',
    brandName: 'WAW旗舰店',
    faceType: ['oval', 'heart', 'diamond'],
    hairVolume: 'normal',
    hairQuality: 'straight',
    hairThickness: 'normal',
    likes: 1567,
    comments: 98,
    shares: 56,
    favorites: 423,
    isLiked: false,
    isFavorited: false,
    createdAt: '2024-01-12 09:00:00',
    updatedAt: '2024-01-16 11:30:00'
  },
  {
    id: 'work_008',
    images: ['https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600',
    title: '韩式男士发型',
    description: '清爽帅气的韩式男士发型，时尚又好打理',
    category: 'men',
    tags: ['韩式', '清爽', '帅气'],
    designerId: 'designer_002',
    designerName: '王型师',
    designerAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    brandId: 'brand_002',
    brandName: '型男型',
    faceType: ['oval', 'round', 'long'],
    hairVolume: 'normal',
    hairQuality: 'straight',
    hairThickness: 'normal',
    likes: 934,
    comments: 67,
    shares: 41,
    favorites: 278,
    isLiked: false,
    isFavorited: false,
    createdAt: '2024-01-11 14:00:00',
    updatedAt: '2024-01-15 16:20:00'
  },
  {
    id: 'work_009',
    images: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600',
    title: '日系空气刘海',
    description: '甜美可爱的日系空气刘海，减龄又显脸小',
    category: 'women',
    tags: ['日系', '刘海', '甜美'],
    designerId: 'designer_003',
    designerName: '张美丽',
    designerAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    brandId: 'brand_001',
    brandName: 'WAW旗舰店',
    faceType: ['round', 'square'],
    hairVolume: 'thin',
    hairQuality: 'straight',
    hairThickness: 'thin',
    likes: 1823,
    comments: 134,
    shares: 78,
    favorites: 512,
    isLiked: true,
    isFavorited: false,
    createdAt: '2024-01-09 10:30:00',
    updatedAt: '2024-01-14 15:00:00'
  },
  {
    id: 'work_010',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    title: '复古油头',
    description: '经典复古的油头型，绅士风范十足',
    category: 'men',
    tags: ['复古', '油头', '绅士'],
    designerId: 'designer_001',
    designerName: '李天天',
    designerAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    brandId: 'brand_002',
    brandName: '型男型',
    faceType: ['oval', 'square', 'long'],
    hairVolume: 'thick',
    hairQuality: 'straight',
    hairThickness: 'thick',
    likes: 678,
    comments: 45,
    shares: 29,
    favorites: 167,
    isLiked: false,
    isFavorited: true,
    createdAt: '2024-01-07 11:00:00',
    updatedAt: '2024-01-13 09:45:00'
  },
  {
    id: 'work_011',
    images: ['https://images.unsplash.com/photo-1514846326710-096e4a8035e0?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1514846326710-096e4a8035e0?w=600',
    title: '活力儿童型',
    description: '充满活力的儿童发型，让宝贝更加可爱',
    category: 'children',
    tags: ['儿童', '活力', '可爱'],
    designerId: 'designer_003',
    designerName: '张美丽',
    designerAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    brandId: 'brand_003',
    brandName: '童趣发屋',
    faceType: ['round', 'oval'],
    hairVolume: 'normal',
    hairQuality: 'straight',
    hairThickness: 'thin',
    likes: 534,
    comments: 42,
    shares: 31,
    favorites: 145,
    isLiked: false,
    isFavorited: false,
    createdAt: '2024-01-06 15:30:00',
    updatedAt: '2024-01-11 10:00:00'
  },
  {
    id: 'work_012',
    images: ['https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600', 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600'],
    coverImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600',
    title: '法式慵懒卷',
    description: '慵懒随的法式卷发，自然又有气质',
    category: 'women',
    tags: ['法式', '慵懒', '卷发'],
    designerId: 'designer_002',
    designerName: '王型师',
    designerAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    brandId: 'brand_001',
    brandName: 'WAW旗舰店',
    faceType: ['oval', 'long', 'heart'],
    hairVolume: 'thick',
    hairQuality: 'wavy',
    hairThickness: 'normal',
    likes: 2456,
    comments: 189,
    shares: 112,
    favorites: 678,
    isLiked: true,
    isFavorited: true,
    createdAt: '2024-01-13 16:00:00',
    updatedAt: '2024-01-16 14:30:00'
  }
]

// 评论数据（按作品分组）
const comments = {
  work_001: [
    {
      id: 'comment_001',
      workId: 'work_001',
      userId: 'user_002',
      userName: '小美',
      userAvatar: 'https://bioflex.cn/static/avatar/user2.png',
      content: '这个发型好好看，想去做同款！',
      likes: 25,
      isLiked: false,
      replyTo: null,
      replies: [
        {
          id: 'reply_001',
          commentId: 'comment_001',
          userId: 'designer_001',
          userName: '李设计师',
          userAvatar: 'https://bioflex.cn/static/avatar/designer1.png',
          content: '欢迎预约哦～',
          likes: 8,
          isLiked: false,
          createdAt: '2024-01-11 10:30:00'
        }
      ],
      createdAt: '2024-01-11 09:00:00'
    },
    {
      id: 'comment_002',
      workId: 'work_001',
      userId: 'user_003',
      userName: '优雅小姐',
      userAvatar: 'https://bioflex.cn/static/avatar/user3.png',
      content: '请问这个发型要多久能做完？',
      likes: 12,
      isLiked: true,
      replyTo: null,
      replies: [],
      createdAt: '2024-01-10 15:20:00'
    },
    {
      id: 'comment_003',
      workId: 'work_001',
      userId: 'user_004',
      userName: '时尚达人',
      userAvatar: 'https://bioflex.cn/static/avatar/user4.png',
      content: '我也做了同款，效果很好！',
      likes: 38,
      isLiked: false,
      replyTo: null,
      replies: [],
      createdAt: '2024-01-10 11:45:00'
    }
  ],
  work_002: [
    {
      id: 'comment_010',
      workId: 'work_002',
      userId: 'user_005',
      userName: '自信女生',
      userAvatar: 'https://bioflex.cn/static/avatar/user5.png',
      content: '干练又好看，合职场',
      likes: 18,
      isLiked: false,
      replyTo: null,
      replies: [],
      createdAt: '2024-01-09 14:00:00'
    }
  ],
  work_005: [
    {
      id: 'comment_020',
      workId: 'work_005',
      userId: 'user_002',
      userName: '小美',
      userAvatar: 'https://bioflex.cn/static/avatar/user2.png',
      content: '太美了！这个卷度刚刚好',
      likes: 56,
      isLiked: true,
      replyTo: null,
      replies: [
        {
          id: 'reply_010',
          commentId: 'comment_020',
          userId: 'user_003',
          userName: '优雅小姐',
          userAvatar: 'https://bioflex.cn/static/avatar/user3.png',
          content: '同意！这个型师太厉害了',
          likes: 12,
          isLiked: false,
          createdAt: '2024-01-02 11:00:00'
        }
      ],
      createdAt: '2024-01-02 09:30:00'
    }
  ]
}

// ========== 数据导出 ==========
export const data = {
  categories,
  filters,
  portfolios,
  comments
}

// ========== 辅助函数 ==========
const filterPortfolios = (list, params) => {
  let result = [...list]

  if (params.category) {
    result = result.filter(p => p.category === params.category)
  }
  if (params.designerId) {
    result = result.filter(p => p.designerId === params.designerId)
  }
  if (params.brandId) {
    result = result.filter(p => p.brandId === params.brandId)
  }
  if (params.faceType) {
    result = result.filter(p => p.faceType.includes(params.faceType))
  }
  if (params.hairVolume) {
    result = result.filter(p => p.hairVolume === params.hairVolume)
  }
  if (params.hairQuality) {
    result = result.filter(p => p.hairQuality === params.hairQuality)
  }
  if (params.hairThickness) {
    result = result.filter(p => p.hairThickness === params.hairThickness)
  }
  if (params.keyword) {
    const keyword = params.keyword.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword) ||
      p.tags.some(t => t.toLowerCase().includes(keyword))
    )
  }

  return result
}

// ========== 路由处理器 ==========
export const routes = {
  // 获取作品列表
  'GET /api/portfolio/list': (params) => {
    const { page = 1, pageSize = 10 } = params
    const filtered = filterPortfolios(portfolios, params)
    // 按更新时间序
    const sorted = filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    return success(paginate(sorted, page, pageSize))
  },

  // 获取作品详情
  'GET /api/portfolio/detail/:workId': (params) => {
    const work = portfolios.find(p => p.id === params.workId)
    if (!work) {
      return error('作品不存在')
    }
    return success(work)
  },

  // 获取作品分类
  'GET /api/portfolio/categories': () => {
    return success(categories)
  },

  // 获取筛条件
  'GET /api/portfolio/filters': () => {
    return success(filters)
  },

  // 点赞作品
  'POST /api/portfolio/:workId/like': (params) => {
    const work = portfolios.find(p => p.id === params.workId)
    if (!work) {
      return error('作品不存在')
    }
    if (work.isLiked) {
      return error('已点赞过')
    }
    work.isLiked = true
    work.likes += 1
    return success({ likes: work.likes }, '点赞成功')
  },

  // 取消点赞
  'DELETE /api/portfolio/:workId/like': (params) => {
    const work = portfolios.find(p => p.id === params.workId)
    if (!work) {
      return error('作品不存在')
    }
    if (!work.isLiked) {
      return error('未点赞')
    }
    work.isLiked = false
    work.likes -= 1
    return success({ likes: work.likes }, '已取消点赞')
  },

  // 收藏作品
  'POST /api/portfolio/:workId/favorite': (params) => {
    const work = portfolios.find(p => p.id === params.workId)
    if (!work) {
      return error('作品不存在')
    }
    if (work.isFavorited) {
      return error('已收藏过')
    }
    work.isFavorited = true
    work.favorites += 1
    return success({ favorites: work.favorites }, '收藏成功')
  },

  // 取消收藏
  'DELETE /api/portfolio/:workId/favorite': (params) => {
    const work = portfolios.find(p => p.id === params.workId)
    if (!work) {
      return error('作品不存在')
    }
    if (!work.isFavorited) {
      return error('未收藏')
    }
    work.isFavorited = false
    work.favorites -= 1
    return success({ favorites: work.favorites }, '已取消收藏')
  },

  // 获取作品评论列表
  'GET /api/portfolio/:workId/comments': (params) => {
    const { workId, page = 1, pageSize = 10, sortBy = 'newest' } = params
    const commentList = comments[workId] || []

    let sorted = [...commentList]
    if (sortBy === 'hottest') {
      sorted.sort((a, b) => b.likes - a.likes)
    } else {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    return success(paginate(sorted, page, pageSize))
  },

  // 发表评论
  'POST /api/portfolio/:workId/comments': (params) => {
    const { workId, content, replyTo } = params
    if (!content || !content.trim()) {
      return error('评论内容不能为空')
    }

    const work = portfolios.find(p => p.id === workId)
    if (!work) {
      return error('作品不存在')
    }

    const newComment = {
      id: generateId('comment_'),
      workId,
      userId: 'user_001',
      userName: '我',
      userAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
      content: content.trim(),
      likes: 0,
      isLiked: false,
      replyTo,
      replies: [],
      createdAt: formatNow()
    }

    if (!comments[workId]) {
      comments[workId] = []
    }

    // 如果是回复评论
    if (replyTo) {
      const parentComment = comments[workId].find(c => c.id === replyTo)
      if (parentComment) {
        parentComment.replies.push({
          id: generateId('reply_'),
          commentId: replyTo,
          userId: 'user_001',
          userName: '我',
          userAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
          content: content.trim(),
          likes: 0,
          isLiked: false,
          createdAt: formatNow()
        })
        work.comments += 1
        return success(parentComment.replies[parentComment.replies.length - 1], '回复成功')
      }
    }

    comments[workId].unshift(newComment)
    work.comments += 1

    return success(newComment, '评论成功')
  },

  // 删除评论
  'DELETE /api/portfolio/:workId/comments/:commentId': (params) => {
    const { workId, commentId } = params
    const commentList = comments[workId]
    if (!commentList) {
      return error('作品不存在')
    }

    const index = commentList.findIndex(c => c.id === commentId)
    if (index === -1) {
      return error('评论不存在')
    }

    // 查是否是自己的评论
    if (commentList[index].userId !== 'user_001') {
      return error('只能删除自己的评论')
    }

    commentList.splice(index, 1)
    const work = portfolios.find(p => p.id === workId)
    if (work) work.comments -= 1

    return success(null, '删除成功')
  },

  // 点赞评论
  'POST /api/portfolio/:workId/comments/:commentId/like': (params) => {
    const { workId, commentId } = params
    const commentList = comments[workId]
    if (!commentList) {
      return error('作品不存在')
    }

    const comment = commentList.find(c => c.id === commentId)
    if (!comment) {
      return error('评论不存在')
    }

    if (comment.isLiked) {
      return error('已点赞过')
    }

    comment.isLiked = true
    comment.likes += 1

    return success({ likes: comment.likes }, '点赞成功')
  },

  // 分享作品
  'POST /api/portfolio/:workId/share': (params) => {
    const { workId, channel } = params
    const work = portfolios.find(p => p.id === workId)
    if (!work) {
      return error('作品不存在')
    }

    work.shares += 1

    // 返回分享信息
    return success({
      shareUrl: `https://waw.com/portfolio/${workId}`,
      shareTitle: work.title,
      shareImage: work.coverImage,
      channel
    }, '分享成功')
  },

  // 获取推荐作品
  'GET /api/portfolio/recommend': (params) => {
    const { limit = 6, excludeId } = params
    let result = [...portfolios]

    if (excludeId) {
      result = result.filter(p => p.id !== excludeId)
    }

    // 单随机排序
    result.sort(() => Math.random() - 0.5)

    return success(result.slice(0, Number(limit)))
  },

  // 获取热门作品
  'GET /api/portfolio/hot': (params) => {
    const { limit = 10, category } = params
    let result = [...portfolios]

    if (category) {
      result = result.filter(p => p.category === category)
    }

    // 按点赞数排序
    result.sort((a, b) => b.likes - a.likes)

    return success(result.slice(0, Number(limit)))
  },

  // 获取设计师作品集
  'GET /api/portfolio/designer/:designerId': (params) => {
    const { designerId, page = 1, pageSize = 10, category } = params
    let result = portfolios.filter(p => p.designerId === designerId)

    if (category) {
      result = result.filter(p => p.category === category)
    }

    result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    return success(paginate(result, page, pageSize))
  },

  // 获取品牌馆作品集
  'GET /api/portfolio/brand/:brandId': (params) => {
    const { brandId, page = 1, pageSize = 10, category } = params
    let result = portfolios.filter(p => p.brandId === brandId)

    if (category) {
      result = result.filter(p => p.category === category)
    }

    result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    return success(paginate(result, page, pageSize))
  },

  // 举报作品
  'POST /api/portfolio/:workId/report': (params) => {
    const { workId, reason } = params
    if (!reason) {
      return error('请择举报原因')
    }

    const work = portfolios.find(p => p.id === workId)
    if (!work) {
      return error('作品不存在')
    }

    return success(null, '举报成功，我们会尽快处理')
  }
}

export default {
  data,
  routes
}