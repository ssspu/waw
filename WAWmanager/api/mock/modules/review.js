/**
 * 评价管理模块 Mock 数据
 * 服务评价、评价回复、评价统计
 */

import { success, error, paginate, generateId, formatNow, randomInt, randomItem } from '../utils.js'

// 评价列表
const reviews = [
  {
    id: 'REV001',
    orderId: 'ORD20251210001',
    customerId: 'C001',
    customerName: '王小明',
    customerAvatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    serviceId: 'S001',
    serviceName: '精致剪发',
    technicianId: 'T001',
    technicianName: '李天天',
    rating: 5,
    serviceRating: 5,
    environmentRating: 5,
    tags: ['技术专业', '服务热情', '环境舒适'],
    content: '非常满意！李天天老师手艺很好，沟通很耐心，推荐的发型很适合我。下次还来！',
    images: [
      'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-169-2.png'
    ],
    isAnonymous: false,
    createTime: '2025-12-10 16:30:00',
    reply: {
      content: '感谢您的支持和认可！期待下次为您服务～',
      replyTime: '2025-12-10 18:00:00'
    },
    status: 'replied',
    isTop: true
  },
  {
    id: 'REV002',
    orderId: 'ORD20251209001',
    customerId: 'C002',
    customerName: '李小红',
    customerAvatar: 'https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg',
    serviceId: 'S002',
    serviceName: '时尚烫发',
    technicianId: 'T002',
    technicianName: '张小雨',
    rating: 4,
    serviceRating: 4,
    environmentRating: 5,
    tags: ['环境舒适', '服务热情'],
    content: '整体不错，烫出来的效果还可以，就是时间有点长。',
    images: [],
    isAnonymous: false,
    createTime: '2025-12-09 17:20:00',
    reply: null,
    status: 'pending',
    isTop: false
  },
  {
    id: 'REV003',
    orderId: 'ORD20251208001',
    customerId: 'C003',
    customerName: '匿名用户',
    customerAvatar: '',
    serviceId: 'S003',
    serviceName: '个性染发',
    technicianId: 'T001',
    technicianName: '李天天',
    rating: 2,
    serviceRating: 2,
    environmentRating: 4,
    tags: ['等待时间长'],
    content: '染出来的颜色和我想要的有差距，沟通不够充分。',
    images: [],
    isAnonymous: true,
    createTime: '2025-12-08 15:00:00',
    reply: {
      content: '非常抱歉给您带来不好的体验，我们会加强与顾客的沟通。欢迎您再次光临，我们将提供更好的服务。',
      replyTime: '2025-12-08 20:00:00'
    },
    status: 'replied',
    isTop: false,
    appeal: {
      reason: '评价内容与实际情况不符',
      status: 'pending',
      createTime: '2025-12-09 10:00:00'
    }
  }
]

// 评价标签
const reviewTags = {
  positive: ['技术专业', '服务热情', '环境舒适', '准时', '性价比高', '沟通耐心', '手法轻柔'],
  negative: ['等待时间长', '沟通不畅', '效果一般', '价格偏高', '卫生待改善']
}

// 自动回复模板
const autoReplyTemplates = [
  {
    id: 'TPL001',
    name: '好评通用回复',
    minRating: 4,
    content: '感谢您的支持和认可！我们会继续努力，期待下次为您服务～'
  },
  {
    id: 'TPL002',
    name: '中评回复',
    minRating: 3,
    maxRating: 3,
    content: '感谢您的反馈，我们会认真改进，争取下次给您更好的体验！'
  },
  {
    id: 'TPL003',
    name: '差评安抚回复',
    maxRating: 2,
    content: '非常抱歉给您带来不好的体验，我们会认真对待您的反馈并改进。期待您再次光临，让我们有机会为您提供更好的服务。'
  }
]

// 评价统计
const reviewStats = {
  total: 156,
  averageRating: 4.6,
  ratingDistribution: {
    5: 98,
    4: 35,
    3: 15,
    2: 5,
    1: 3
  },
  replyRate: 92.3,
  positiveRate: 85.3,
  tagStats: [
    { tag: '技术专业', count: 89 },
    { tag: '服务热情', count: 76 },
    { tag: '环境舒适', count: 65 },
    { tag: '准时', count: 45 },
    { tag: '性价比高', count: 38 }
  ],
  monthlyTrend: [
    { month: '2025-07', count: 23, avgRating: 4.5 },
    { month: '2025-08', count: 28, avgRating: 4.6 },
    { month: '2025-09', count: 25, avgRating: 4.4 },
    { month: '2025-10', count: 30, avgRating: 4.7 },
    { month: '2025-11', count: 27, avgRating: 4.6 },
    { month: '2025-12', count: 23, avgRating: 4.8 }
  ]
}

export const data = {
  reviews,
  reviewTags,
  autoReplyTemplates,
  reviewStats
}

export const routes = {
  // ==================== 评价列表 ====================
  'GET /reviews': (params) => {
    const { page = 1, pageSize = 10, rating, status, technicianId, keyword, sortBy } = params
    let list = [...reviews]

    if (rating && rating !== 'all') {
      list = list.filter(r => r.rating === Number(rating))
    }
    if (status && status !== 'all') {
      list = list.filter(r => r.status === status)
    }
    if (technicianId) {
      list = list.filter(r => r.technicianId === technicianId)
    }
    if (keyword) {
      list = list.filter(r =>
        r.content.includes(keyword) ||
        r.customerName.includes(keyword) ||
        r.serviceName.includes(keyword)
      )
    }

    // 排序
    if (sortBy === 'rating_desc') {
      list.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'rating_asc') {
      list.sort((a, b) => a.rating - b.rating)
    } else {
      list.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    }

    return success(paginate(list, page, pageSize))
  },

  'GET /reviews/:id': (params) => {
    const review = reviews.find(r => r.id === params.id)
    if (review) {
      return success(review)
    }
    return error('评价不存在')
  },

  'GET /reviews/pending': (params) => {
    const { page = 1, pageSize = 10 } = params
    const list = reviews.filter(r => r.status === 'pending')
    return success(paginate(list, page, pageSize))
  },

  // ==================== 评价回复 ====================
  'POST /reviews/:id/reply': (params) => {
    const { id, content } = params
    const review = reviews.find(r => r.id === id)
    if (!review) {
      return error('评价不存在')
    }
    review.reply = {
      content,
      replyTime: formatNow()
    }
    review.status = 'replied'
    return success(review, '回复成功')
  },

  'PUT /reviews/:id/reply': (params) => {
    const { id, content } = params
    const review = reviews.find(r => r.id === id)
    if (!review || !review.reply) {
      return error('回复不存在')
    }
    review.reply.content = content
    review.reply.replyTime = formatNow()
    return success(review, '回复已修改')
  },

  'DELETE /reviews/:id/reply': (params) => {
    const review = reviews.find(r => r.id === params.id)
    if (!review) {
      return error('评价不存在')
    }
    review.reply = null
    review.status = 'pending'
    return success(null, '回复已删除')
  },

  // ==================== 评价操作 ====================
  'POST /reviews/:id/top': (params) => {
    const review = reviews.find(r => r.id === params.id)
    if (!review) {
      return error('评价不存在')
    }
    review.isTop = true
    return success(review, '已置顶')
  },

  'DELETE /reviews/:id/top': (params) => {
    const review = reviews.find(r => r.id === params.id)
    if (!review) {
      return error('评价不存在')
    }
    review.isTop = false
    return success(review, '已取消置顶')
  },

  'POST /reviews/:id/appeal': (params) => {
    const { id, reason } = params
    const review = reviews.find(r => r.id === id)
    if (!review) {
      return error('评价不存在')
    }
    review.appeal = {
      reason,
      status: 'pending',
      createTime: formatNow()
    }
    return success(review, '申诉已提交')
  },

  // ==================== 商家点评顾客 ====================
  'POST /reviews/customer': (params) => {
    const newReview = {
      id: generateId('CREV'),
      type: 'merchant_to_customer',
      ...params,
      createTime: formatNow()
    }
    return success(newReview, '点评成功')
  },

  // ==================== 评价标签 ====================
  'GET /reviews/tags': () => {
    return success(reviewTags)
  },

  // ==================== 自动回复模板 ====================
  'GET /reviews/auto-reply/templates': () => {
    return success(autoReplyTemplates)
  },

  'POST /reviews/auto-reply/templates': (params) => {
    const template = {
      id: generateId('TPL'),
      ...params
    }
    autoReplyTemplates.push(template)
    return success(template, '模板已创建')
  },

  'PUT /reviews/auto-reply/templates/:id': (params) => {
    const template = autoReplyTemplates.find(t => t.id === params.id)
    if (template) {
      Object.assign(template, params)
      return success(template, '模板已更新')
    }
    return error('模板不存在')
  },

  'DELETE /reviews/auto-reply/templates/:id': (params) => {
    const index = autoReplyTemplates.findIndex(t => t.id === params.id)
    if (index > -1) {
      autoReplyTemplates.splice(index, 1)
      return success(null, '模板已删除')
    }
    return error('模板不存在')
  },

  // ==================== 评价统计 ====================
  'GET /reviews/stats': () => {
    return success(reviewStats)
  },

  'GET /reviews/stats/technician/:id': (params) => {
    const { id } = params
    // 模拟技师评价统计
    return success({
      technicianId: id,
      total: randomInt(30, 100),
      averageRating: (4 + Math.random()).toFixed(1),
      positiveRate: randomInt(80, 98),
      tags: reviewStats.tagStats.slice(0, 5)
    })
  }
}

export default {
  data,
  routes
}
