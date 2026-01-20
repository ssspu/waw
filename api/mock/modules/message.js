/**
 * 消息中心模块 Mock 数据
 */

import { success, error, paginate } from '../utils.js'

// 消息列表
const messages = [
  {
    id: '1',
    type: 'system',
    title: '系统通知',
    content: '您有一个待确认订单，请及时处理。',
    time: '2025-11-28 16:30',
    unread: true,
    extra: {
      orderNo: '2837283723',
      customer: '马菲菲',
      amount: 288,
      points: 288
    }
  },
  {
    id: '2',
    type: 'system',
    title: '系统通知',
    content: '您有三名顾客发起了预约申请，请及时确认。',
    time: '2025-11-28 10:15',
    unread: true,
    extra: {}
  },
  {
    id: '3',
    type: 'order',
    title: '订单通知',
    content: '您的订单已完成，感谢您的使用。',
    time: '2025-11-27 18:20',
    unread: false,
    extra: {
      orderNo: 'ORD20251127001'
    }
  },
  {
    id: '4',
    type: 'activity',
    title: '活动通知',
    content: '双十二活动即将值始，多重优惠等你来！',
    time: '2025-11-27 09:00',
    unread: false,
    extra: {
      activityId: 'ACT001',
      link: '/pages/activity/detail?id=ACT001'
    }
  },
  {
    id: '5',
    type: 'system',
    title: '系统通知',
    content: '您的账户已成功绑定银行卡。',
    time: '2025-11-25 14:30',
    unread: false,
    extra: {}
  },
  {
    id: '6',
    type: 'order',
    title: '预约提醒',
    content: '您预约的服务将于明天下午2点值始，请准时到店。',
    time: '2025-11-22 20:00',
    unread: false,
    extra: {
      orderNo: 'ORD20251122001',
      appointmentTime: '2025-11-23 14:00'
    }
  },
  {
    id: '7',
    type: 'system',
    title: '系统通知',
    content: '您有一笔退款已到账，请查收。',
    time: '2025-11-22 11:45',
    unread: false,
    extra: {
      amount: 99,
      refundNo: 'REF20251122001'
    }
  },
  {
    id: '8',
    type: 'coupon',
    title: '优惠通知',
    content: '恭喜您获得50元优惠券，有效期7天。',
    time: '2025-11-18 09:30',
    unread: false,
    extra: {
      couponId: 'CPN001',
      couponName: '50元优惠券'
    }
  },
  {
    id: '9',
    type: 'system',
    title: '系统通知',
    content: '您的会员等级已升级为VIP2。',
    time: '2025-11-18 08:00',
    unread: false,
    extra: {
      vipLevel: 2
    }
  },
  {
    id: '10',
    type: 'system',
    title: '系统通知',
    content: '欢迎注册众美平台，值启您的美丽之旅！',
    time: '2025-11-10 15:20',
    unread: false,
    extra: {}
  }
]

// 按日期分组消息
const groupMessagesByDate = (list) => {
  const groups = {}
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  list.forEach(msg => {
    const date = msg.time.slice(0, 10)
    let groupKey
    if (date === today) {
      groupKey = '今天'
    } else if (date === yesterday) {
      groupKey = '昨天'
    } else {
      groupKey = date
    }
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(msg)
  })

  return Object.entries(groups).map(([date, messages]) => ({
    date,
    messages
  }))
}

// Mock 数据
export const data = {
  messages
}

// Mock 路由处理
export const routes = {
  // 获取消息列表
  'GET /api/message/list': (params) => {
    let list = [...messages]
    if (params.type) {
      list = list.filter(m => m.type === params.type)
    }
    // 按时间倒序
    list.sort((a, b) => new Date(b.time) - new Date(a.time))
    return success(paginate(list, params.page, params.pageSize))
  },

  // 获取消息详情
  'GET /api/message/detail/:messageId': (params) => {
    const message = messages.find(m => m.id === params.messageId)
    if (message) {
      message.unread = false // 查看详情自动标记已读
      return success(message)
    }
    return error('消息不存在')
  },

  // 标记消息为已读
  'PUT /api/message/read/:messageId': (params) => {
    const message = messages.find(m => m.id === params.messageId)
    if (message) {
      message.unread = false
      return success(null, '已标记为已读')
    }
    return error('消息不存在')
  },

  // 批量标记消息为已读
  'PUT /api/message/batch-read': (params) => {
    const { ids } = params
    messages.forEach(m => {
      if (ids.includes(m.id)) {
        m.unread = false
      }
    })
    return success(null, '已批量标记为已读')
  },

  // 标记所有消息为已读
  'PUT /api/message/read-all': () => {
    messages.forEach(m => m.unread = false)
    return success(null, '已全部标记为已读')
  },

  // 删除消息
  'DELETE /api/message/:messageId': (params) => {
    const index = messages.findIndex(m => m.id === params.messageId)
    if (index > -1) {
      messages.splice(index, 1)
      return success(null, '删除成功')
    }
    return error('消息不存在')
  },

  // 批量删除消息
  'POST /api/message/batch-delete': (params) => {
    const { ids } = params
    ids.forEach(id => {
      const index = messages.findIndex(m => m.id === id)
      if (index > -1) {
        messages.splice(index, 1)
      }
    })
    return success(null, '批量删除成功')
  },

  // 清空消息
  'DELETE /api/message/clear': (params) => {
    if (params.type) {
      const filtered = messages.filter(m => m.type !== params.type)
      messages.length = 0
      messages.push(...filtered)
    } else {
      messages.length = 0
    }
    return success(null, '已清空')
  },

  // 获取未读消息数量
  'GET /api/message/unread-count': () => {
    const count = messages.filter(m => m.unread).length
    return success({ count })
  },

  // 获取各类型消息未读数量
  'GET /api/message/unread-count/types': () => {
    const counts = {
      system: messages.filter(m => m.type === 'system' && m.unread).length,
      order: messages.filter(m => m.type === 'order' && m.unread).length,
      activity: messages.filter(m => m.type === 'activity' && m.unread).length,
      coupon: messages.filter(m => m.type === 'coupon' && m.unread).length
    }
    return success(counts)
  },

  // 获取消息分组列表（按日期分组）
  'GET /api/message/grouped': (params) => {
    let list = [...messages]
    // 按时间倒序
    list.sort((a, b) => new Date(b.time) - new Date(a.time))
    // 分页
    const start = ((params.page || 1) - 1) * (params.pageSize || 20)
    const end = start + (params.pageSize || 20)
    list = list.slice(start, end)
    // 分组
    const grouped = groupMessagesByDate(list)
    return success({
      groups: grouped,
      total: messages.length,
      hasMore: end < messages.length
    })
  }
}

export default {
  data,
  routes
}
