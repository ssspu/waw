/**
 * 消息通知模块 Mock 数据
 * 系统消息、订单通知、营销消息
 */

import { success, error, paginate, generateId, formatNow } from '../utils.js'

// 消息列表
const messages = [
  {
    id: 'MSG001',
    type: 'order',
    title: '新订单提醒',
    content: '您有一笔新的预约订单，顾客王小明预约了精致剪发服务',
    orderId: 'ORD20251213001',
    isRead: false,
    createTime: '2025-12-13 10:30:00'
  },
  {
    id: 'MSG002',
    type: 'order',
    title: '订单取消通知',
    content: '顾客李小红取消了订单ORD20251212005，原因：临时有事',
    orderId: 'ORD20251212005',
    isRead: false,
    createTime: '2025-12-12 18:20:00'
  },
  {
    id: 'MSG003',
    type: 'review',
    title: '新评价提醒',
    content: '顾客张小花对您的服务进行了评价，点击查看详情',
    reviewId: 'REV003',
    isRead: true,
    createTime: '2025-12-11 16:00:00'
  },
  {
    id: 'MSG004',
    type: 'system',
    title: '系统升级通知',
    content: '系统将于今晚22:00-24:00进行升级维护，届时部分功能可能无法使用，请提前做好安排。',
    isRead: true,
    createTime: '2025-12-10 14:00:00'
  },
  {
    id: 'MSG005',
    type: 'marketing',
    title: '双十二活动提醒',
    content: '双十二活动已开始，您的店铺优惠券已自动上架，快去查看活动效果吧！',
    isRead: true,
    createTime: '2025-12-12 00:00:00'
  },
  {
    id: 'MSG006',
    type: 'finance',
    title: '提现到账通知',
    content: '您申请的提现￥1,280.00已到账，请注意查收',
    isRead: true,
    createTime: '2025-12-09 10:30:00'
  }
]

// 消息模板
const messageTemplates = [
  {
    id: 'TMPL001',
    type: 'appointment_reminder',
    name: '预约提醒',
    content: '亲爱的{customerName}，您预约的{serviceName}服务将于{appointmentTime}开始，请准时到店。地址：{shopAddress}',
    variables: ['customerName', 'serviceName', 'appointmentTime', 'shopAddress']
  },
  {
    id: 'TMPL002',
    type: 'order_confirm',
    name: '订单确认',
    content: '您的预约已确认！服务：{serviceName}，技师：{technicianName}，时间：{appointmentTime}。期待为您服务！',
    variables: ['serviceName', 'technicianName', 'appointmentTime']
  },
  {
    id: 'TMPL003',
    type: 'birthday_wish',
    name: '生日祝福',
    content: '亲爱的{customerName}，祝您生日快乐！特送上{couponName}一张，快来体验吧～',
    variables: ['customerName', 'couponName']
  },
  {
    id: 'TMPL004',
    type: 'service_complete',
    name: '服务完成',
    content: '感谢您今天的光临！希望您对本次服务满意，期待您的好评和下次再来～',
    variables: []
  }
]

// 通知设置
const notificationSettings = {
  // 订单通知
  orderNew: true,
  orderCancel: true,
  orderReminder: true,
  // 评价通知
  reviewNew: true,
  reviewNegative: true,
  // 财务通知
  withdrawSuccess: true,
  incomeDaily: false,
  // 系统通知
  systemUpdate: true,
  marketing: true,
  // 通知方式
  pushEnabled: true,
  smsEnabled: false,
  wechatEnabled: true
}

export const data = {
  messages,
  messageTemplates,
  notificationSettings
}

export const routes = {
  // ==================== 消息列表 ====================
  'GET /messages': (params) => {
    const { type, isRead, page = 1, pageSize = 20 } = params
    let list = [...messages]

    if (type && type !== 'all') {
      list = list.filter(m => m.type === type)
    }
    if (isRead !== undefined) {
      list = list.filter(m => m.isRead === (isRead === 'true' || isRead === true))
    }

    // 按时间倒序
    list.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))

    return success(paginate(list, page, pageSize))
  },

  'GET /messages/:id': (params) => {
    const message = messages.find(m => m.id === params.id)
    if (message) {
      return success(message)
    }
    return error('消息不存在')
  },

  'GET /messages/unread-count': () => {
    const unreadCount = messages.filter(m => !m.isRead).length
    const typeCount = {
      order: messages.filter(m => m.type === 'order' && !m.isRead).length,
      review: messages.filter(m => m.type === 'review' && !m.isRead).length,
      system: messages.filter(m => m.type === 'system' && !m.isRead).length,
      marketing: messages.filter(m => m.type === 'marketing' && !m.isRead).length,
      finance: messages.filter(m => m.type === 'finance' && !m.isRead).length
    }
    return success({
      total: unreadCount,
      ...typeCount
    })
  },

  // ==================== 消息操作 ====================
  'PUT /messages/:id/read': (params) => {
    const message = messages.find(m => m.id === params.id)
    if (message) {
      message.isRead = true
      return success(message, '已标记为已读')
    }
    return error('消息不存在')
  },

  'PUT /messages/read-all': (params) => {
    const { type } = params
    messages.forEach(m => {
      if (!type || m.type === type) {
        m.isRead = true
      }
    })
    return success(null, '已全部标记为已读')
  },

  'DELETE /messages/:id': (params) => {
    const index = messages.findIndex(m => m.id === params.id)
    if (index > -1) {
      messages.splice(index, 1)
      return success(null, '消息已删除')
    }
    return error('消息不存在')
  },

  'DELETE /messages/batch': (params) => {
    const { ids } = params
    ids.forEach(id => {
      const index = messages.findIndex(m => m.id === id)
      if (index > -1) {
        messages.splice(index, 1)
      }
    })
    return success(null, '已删除')
  },

  // ==================== 发送消息 ====================
  'POST /messages/send': (params) => {
    const { customerId, content, type = 'custom' } = params
    const newMessage = {
      id: generateId('MSG'),
      type,
      title: '商家消息',
      content,
      targetCustomerId: customerId,
      isRead: false,
      createTime: formatNow()
    }
    messages.unshift(newMessage)
    return success(newMessage, '消息已发送')
  },

  'POST /messages/broadcast': (params) => {
    const { customerIds, content, title } = params
    return success({
      sent: customerIds.length,
      failed: 0
    }, `已向${customerIds.length}位顾客发送消息`)
  },

  // ==================== 消息模板 ====================
  'GET /messages/templates': () => {
    return success(messageTemplates)
  },

  'GET /messages/templates/:id': (params) => {
    const template = messageTemplates.find(t => t.id === params.id)
    if (template) {
      return success(template)
    }
    return error('模板不存在')
  },

  'POST /messages/templates': (params) => {
    const template = {
      id: generateId('TMPL'),
      ...params
    }
    messageTemplates.push(template)
    return success(template, '模板已创建')
  },

  'PUT /messages/templates/:id': (params) => {
    const template = messageTemplates.find(t => t.id === params.id)
    if (template) {
      Object.assign(template, params)
      return success(template, '模板已更新')
    }
    return error('模板不存在')
  },

  'DELETE /messages/templates/:id': (params) => {
    const index = messageTemplates.findIndex(t => t.id === params.id)
    if (index > -1) {
      messageTemplates.splice(index, 1)
      return success(null, '模板已删除')
    }
    return error('模板不存在')
  },

  // ==================== 通知设置 ====================
  'GET /messages/settings': () => {
    return success(notificationSettings)
  },

  'PUT /messages/settings': (params) => {
    Object.assign(notificationSettings, params)
    return success(notificationSettings, '设置已保存')
  }
}

export default {
  data,
  routes
}
