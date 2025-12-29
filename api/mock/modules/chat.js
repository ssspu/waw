/**
 * 私信/聊天模块 Mock 数据
 */

import { success, error, paginate, generateId, formatNow } from '../utils.js'

// ========== 模拟数据 ==========

// 会话列表
const conversations = [
  {
    id: 'conv_001',
    targetType: 'designer',
    targetId: 'designer_001',
    targetName: '李设计师',
    targetAvatar: 'https://bioflex.cn/static/avatar/designer1.png',
    lastMessage: {
      type: 'text',
      content: '好的，那我们约明天下午3点',
      createdAt: '2024-01-15 14:30:00'
    },
    unreadCount: 2,
    isPinned: true,
    isMuted: false,
    createdAt: '2024-01-10 10:00:00',
    updatedAt: '2024-01-15 14:30:00'
  },
  {
    id: 'conv_002',
    targetType: 'designer',
    targetId: 'designer_002',
    targetName: '王发型师',
    targetAvatar: 'https://bioflex.cn/static/avatar/designer2.png',
    lastMessage: {
      type: 'image',
      content: '[图片]',
      createdAt: '2024-01-14 16:20:00'
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    createdAt: '2024-01-08 09:00:00',
    updatedAt: '2024-01-14 16:20:00'
  },
  {
    id: 'conv_003',
    targetType: 'brand',
    targetId: 'brand_001',
    targetName: '潮流发型屋',
    targetAvatar: 'https://bioflex.cn/static/avatar/brand1.png',
    lastMessage: {
      type: 'service',
      content: '[服务卡片] 精致剪发套餐',
      createdAt: '2024-01-13 11:00:00'
    },
    unreadCount: 1,
    isPinned: false,
    isMuted: true,
    createdAt: '2024-01-05 15:00:00',
    updatedAt: '2024-01-13 11:00:00'
  },
  {
    id: 'conv_004',
    targetType: 'user',
    targetId: 'user_002',
    targetName: '小明',
    targetAvatar: 'https://bioflex.cn/static/avatar/user2.png',
    lastMessage: {
      type: 'text',
      content: '谢谢推荐！',
      createdAt: '2024-01-12 09:45:00'
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    createdAt: '2024-01-01 12:00:00',
    updatedAt: '2024-01-12 09:45:00'
  }
]

// 消息记录（按会话分组）
const messages = {
  conv_001: [
    {
      id: 'msg_001',
      conversationId: 'conv_001',
      senderId: 'designer_001',
      senderName: '李设计师',
      senderAvatar: 'https://bioflex.cn/static/avatar/designer1.png',
      isSelf: false,
      type: 'text',
      content: '您好，有么可以帮您的吗？',
      createdAt: '2024-01-15 14:00:00',
      isRead: true,
      isDeleted: false
    },
    {
      id: 'msg_002',
      conversationId: 'conv_001',
      senderId: 'user_001',
      senderName: '我',
      senderAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
      isSelf: true,
      type: 'text',
      content: '我想预约明天的剪发服务',
      createdAt: '2024-01-15 14:10:00',
      isRead: true,
      isDeleted: false
    },
    {
      id: 'msg_003',
      conversationId: 'conv_001',
      senderId: 'designer_001',
      senderName: '李设计师',
      senderAvatar: 'https://bioflex.cn/static/avatar/designer1.png',
      isSelf: false,
      type: 'text',
      content: '好的，请问您方便几点呢？',
      createdAt: '2024-01-15 14:15:00',
      isRead: true,
      isDeleted: false
    },
    {
      id: 'msg_004',
      conversationId: 'conv_001',
      senderId: 'user_001',
      senderName: '我',
      senderAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
      isSelf: true,
      type: 'text',
      content: '下午3点可以吗？',
      createdAt: '2024-01-15 14:20:00',
      isRead: true,
      isDeleted: false
    },
    {
      id: 'msg_005',
      conversationId: 'conv_001',
      senderId: 'designer_001',
      senderName: '李设计师',
      senderAvatar: 'https://bioflex.cn/static/avatar/designer1.png',
      isSelf: false,
      type: 'text',
      content: '好的，那我们约明天下午3点',
      createdAt: '2024-01-15 14:30:00',
      isRead: false,
      isDeleted: false
    }
  ],
  conv_002: [
    {
      id: 'msg_010',
      conversationId: 'conv_002',
      senderId: 'user_001',
      senderName: '我',
      senderAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
      isSelf: true,
      type: 'text',
      content: '请问这个发型适合我吗？',
      createdAt: '2024-01-14 16:00:00',
      isRead: true,
      isDeleted: false
    },
    {
      id: 'msg_011',
      conversationId: 'conv_002',
      senderId: 'user_001',
      senderName: '我',
      senderAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
      isSelf: true,
      type: 'image',
      content: 'https://bioflex.cn/static/temp/hairstyle1.jpg',
      createdAt: '2024-01-14 16:01:00',
      isRead: true,
      isDeleted: false
    },
    {
      id: 'msg_012',
      conversationId: 'conv_002',
      senderId: 'designer_002',
      senderName: '王发型师',
      senderAvatar: 'https://bioflex.cn/static/avatar/designer2.png',
      isSelf: false,
      type: 'text',
      content: '这款发型很合您的脸型，不过要稍微调整下刘海的长度',
      createdAt: '2024-01-14 16:15:00',
      isRead: true,
      isDeleted: false
    },
    {
      id: 'msg_013',
      conversationId: 'conv_002',
      senderId: 'designer_002',
      senderName: '王发型师',
      senderAvatar: 'https://bioflex.cn/static/avatar/designer2.png',
      isSelf: false,
      type: 'image',
      content: 'https://bioflex.cn/static/temp/hairstyle2.jpg',
      createdAt: '2024-01-14 16:20:00',
      isRead: true,
      isDeleted: false
    }
  ],
  conv_003: [
    {
      id: 'msg_020',
      conversationId: 'conv_003',
      senderId: 'brand_001',
      senderName: '潮流发型屋',
      senderAvatar: 'https://bioflex.cn/static/avatar/brand1.png',
      isSelf: false,
      type: 'text',
      content: '感谢您关注我们店铺！现在有新客优惠活动',
      createdAt: '2024-01-13 10:30:00',
      isRead: true,
      isDeleted: false
    },
    {
      id: 'msg_021',
      conversationId: 'conv_003',
      senderId: 'brand_001',
      senderName: '潮流发型屋',
      senderAvatar: 'https://bioflex.cn/static/avatar/brand1.png',
      isSelf: false,
      type: 'service',
      content: '精致剪发套餐',
      extra: {
        serviceId: 'service_001',
        serviceName: '精致剪发套餐',
        serviceImage: 'https://bioflex.cn/static/service/cut1.jpg',
        price: 128,
        originalPrice: 198
      },
      createdAt: '2024-01-13 11:00:00',
      isRead: false,
      isDeleted: false
    }
  ]
}

// 黑名单
const blockList = []

// ========== 数据导出 ==========
export const data = {
  conversations,
  messages,
  blockList
}

// ========== 路由处理器 ==========
export const routes = {
  // 获取会话列表
  'GET /api/chat/conversations': (params) => {
    const { page = 1, pageSize = 20 } = params
    // 按置顶和更新时间排序
    const sorted = [...conversations].sort((a, b) => {
      if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
    return success(paginate(sorted, page, pageSize))
  },

  // 获取会话详情
  'GET /api/chat/conversations/:conversationId': (params) => {
    const conv = conversations.find(c => c.id === params.conversationId)
    if (!conv) {
      return error('会话不存在')
    }
    return success(conv)
  },

  // 创建/获取会话
  'POST /api/chat/conversations': (params) => {
    const { targetType, targetId } = params
    if (!targetType || !targetId) {
      return error('参数不完整')
    }

    // 查找是否已存在
    let conv = conversations.find(c => c.targetType === targetType && c.targetId === targetId)
    if (conv) {
      return success(conv)
    }

    // 创建新会话
    const newConv = {
      id: generateId('conv_'),
      targetType,
      targetId,
      targetName: targetType === 'designer' ? '设计师' : targetType === 'brand' ? '品牌馆' : '用户',
      targetAvatar: 'https://bioflex.cn/static/avatar/default.png',
      lastMessage: null,
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      createdAt: formatNow(),
      updatedAt: formatNow()
    }
    conversations.unshift(newConv)
    messages[newConv.id] = []
    return success(newConv)
  },

  // 获取聊天记录
  'GET /api/chat/conversations/:conversationId/messages': (params) => {
    const { conversationId, page = 1, pageSize = 20 } = params
    const msgList = messages[conversationId] || []
    // 按时间序
    const sorted = [...msgList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return success(paginate(sorted, page, pageSize))
  },

  // 发消息
  'POST /api/chat/conversations/:conversationId/messages': (params) => {
    const { conversationId, type = 'text', content, extra } = params
    if (!content) {
      return error('消息内容不能为空')
    }

    const conv = conversations.find(c => c.id === conversationId)
    if (!conv) {
      return error('会话不存在')
    }

    const newMsg = {
      id: generateId('msg_'),
      conversationId,
      senderId: 'user_001',
      senderName: '我',
      senderAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
      isSelf: true,
      type,
      content,
      extra,
      createdAt: formatNow(),
      isRead: false,
      isDeleted: false
    }

    if (!messages[conversationId]) {
      messages[conversationId] = []
    }
    messages[conversationId].push(newMsg)

    // 更新会话后消息
    conv.lastMessage = {
      type,
      content: type === 'image' ? '[图片]' : type === 'service' ? '[服务卡片]' : content,
      createdAt: newMsg.createdAt
    }
    conv.updatedAt = newMsg.createdAt

    return success(newMsg, '发成功')
  },

  // 标记会话已读
  'PUT /api/chat/conversations/:conversationId/read': (params) => {
    const conv = conversations.find(c => c.id === params.conversationId)
    if (!conv) {
      return error('会话不存在')
    }
    conv.unreadCount = 0
    // 标记有消息已读
    const msgList = messages[params.conversationId] || []
    msgList.forEach(msg => {
      if (!msg.isSelf) msg.isRead = true
    })
    return success(null, '已标记为已读')
  },

  // 标记有会话已读
  'PUT /api/chat/conversations/read-all': () => {
    conversations.forEach(conv => {
      conv.unreadCount = 0
    })
    Object.values(messages).forEach(msgList => {
      msgList.forEach(msg => {
        if (!msg.isSelf) msg.isRead = true
      })
    })
    return success(null, '已全部标记为已读')
  },

  // 删除会话
  'DELETE /api/chat/conversations/:conversationId': (params) => {
    const index = conversations.findIndex(c => c.id === params.conversationId)
    if (index === -1) {
      return error('会话不存在')
    }
    conversations.splice(index, 1)
    delete messages[params.conversationId]
    return success(null, '删除成功')
  },

  // 删除消息
  'DELETE /api/chat/conversations/:conversationId/messages/:messageId': (params) => {
    const { conversationId, messageId } = params
    const msgList = messages[conversationId]
    if (!msgList) {
      return error('会话不存在')
    }
    const msg = msgList.find(m => m.id === messageId)
    if (!msg) {
      return error('消息不存在')
    }
    msg.isDeleted = true
    msg.content = '此消息已被删除'
    return success(null, '删除成功')
  },

  // 撤回消息
  'POST /api/chat/conversations/:conversationId/messages/:messageId/recall': (params) => {
    const { conversationId, messageId } = params
    const msgList = messages[conversationId]
    if (!msgList) {
      return error('会话不存在')
    }
    const msg = msgList.find(m => m.id === messageId)
    if (!msg) {
      return error('消息不存在')
    }
    if (!msg.isSelf) {
      return error('只能撤回自己的消息')
    }
    // 查是否超过2分钟（mock中不做真实时间校验）
    msg.isDeleted = true
    msg.content = '你撤回了条消息'
    return success(null, '撤回成功')
  },

  // 获取未读消息数
  'GET /api/chat/unread-count': () => {
    const total = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)
    return success({ count: total })
  },

  // 置顶会话
  'PUT /api/chat/conversations/:conversationId/pin': (params) => {
    const conv = conversations.find(c => c.id === params.conversationId)
    if (!conv) {
      return error('会话不存在')
    }
    conv.isPinned = true
    return success(null, '置顶成功')
  },

  // 取消置顶
  'DELETE /api/chat/conversations/:conversationId/pin': (params) => {
    const conv = conversations.find(c => c.id === params.conversationId)
    if (!conv) {
      return error('会话不存在')
    }
    conv.isPinned = false
    return success(null, '已取消置顶')
  },

  // 设置免打扰
  'PUT /api/chat/conversations/:conversationId/mute': (params) => {
    const conv = conversations.find(c => c.id === params.conversationId)
    if (!conv) {
      return error('会话不存在')
    }
    conv.isMuted = params.mute !== false
    return success(null, conv.isMuted ? '已启免打扰' : '已关闭免打扰')
  },

  // 举报
  'POST /api/chat/report': (params) => {
    const { conversationId, reason } = params
    if (!conversationId || !reason) {
      return error('参数不完整')
    }
    return success(null, '举报成功，我们会尽快处理')
  },

  // 拉黑用户
  'POST /api/chat/block': (params) => {
    const { targetType, targetId } = params
    if (!targetType || !targetId) {
      return error('参数不完整')
    }
    const exists = blockList.find(b => b.targetType === targetType && b.targetId === targetId)
    if (exists) {
      return error('已在黑名单中')
    }
    blockList.push({
      id: generateId('block_'),
      targetType,
      targetId,
      targetName: '被拉黑用户',
      targetAvatar: 'https://bioflex.cn/static/avatar/default.png',
      createdAt: formatNow()
    })
    return success(null, '已加入黑名单')
  },

  // 取消拉黑
  'POST /api/chat/unblock': (params) => {
    const { targetType, targetId } = params
    const index = blockList.findIndex(b => b.targetType === targetType && b.targetId === targetId)
    if (index === -1) {
      return error('不在黑名单中')
    }
    blockList.splice(index, 1)
    return success(null, '已移出黑名单')
  },

  // 获取黑名单列表
  'GET /api/chat/block-list': (params) => {
    const { page = 1, pageSize = 20 } = params
    return success(paginate(blockList, page, pageSize))
  },

  // 发服务卡片消息
  'POST /api/chat/conversations/:conversationId/service-card': (params) => {
    const { conversationId, serviceId } = params
    if (!serviceId) {
      return error('服务ID不能为空')
    }

    const conv = conversations.find(c => c.id === conversationId)
    if (!conv) {
      return error('会话不存在')
    }

    const newMsg = {
      id: generateId('msg_'),
      conversationId,
      senderId: 'user_001',
      senderName: '我',
      senderAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
      isSelf: true,
      type: 'service',
      content: '服务卡片',
      extra: {
        serviceId,
        serviceName: '精致剪发套餐',
        serviceImage: 'https://bioflex.cn/static/service/cut1.jpg',
        price: 128
      },
      createdAt: formatNow(),
      isRead: false,
      isDeleted: false
    }

    if (!messages[conversationId]) {
      messages[conversationId] = []
    }
    messages[conversationId].push(newMsg)

    conv.lastMessage = {
      type: 'service',
      content: '[服务卡片]',
      createdAt: newMsg.createdAt
    }
    conv.updatedAt = newMsg.createdAt

    return success(newMsg, '发成功')
  },

  'POST /api/chat/conversations/:conversationId/appointment-card': (params) => {
    const { conversationId, orderId } = params
    if (!orderId) {
      return error('订单ID不能为空')
    }

    const conv = conversations.find(c => c.id === conversationId)
    if (!conv) {
      return error('会话不存在')
    }

    const newMsg = {
      id: generateId('msg_'),
      conversationId,
      senderId: 'user_001',
      senderName: '我',
      senderAvatar: 'https://bioflex.cn/static/avatar/avatar.png',
      isSelf: true,
      type: 'appointment',
      content: '预约卡片',
      extra: {
        orderId,
        serviceName: '精致剪发套餐',
        appointmentTime: '2024-01-20 15:00',
        status: 'pending'
      },
      createdAt: formatNow(),
      isRead: false,
      isDeleted: false
    }

    if (!messages[conversationId]) {
      messages[conversationId] = []
    }
    messages[conversationId].push(newMsg)

    conv.lastMessage = {
      type: 'appointment',
      content: '[预约卡片]',
      createdAt: newMsg.createdAt
    }
    conv.updatedAt = newMsg.createdAt

    return success(newMsg, '发成功')
  }
}

export default {
  data,
  routes
}