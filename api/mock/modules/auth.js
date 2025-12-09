/**
 * 认证模块 Mock 数据
 */

import { success, error } from '../utils.js'

// 模拟用户数据库
const users = [
  {
    id: '1',
    phone: '13800138000',
    password: '123456',
    nickname: '测试用户',
    avatar: '/static/avatar/avatar.png',
    token: 'mock_token_13800138000',
    refreshToken: 'mock_refresh_token_13800138000'
  },
  {
    id: '2',
    phone: '13900139000',
    password: '123456',
    nickname: '设计师用户',
    avatar: '/static/avatar/avatar.png',
    token: 'mock_token_13900139000',
    refreshToken: 'mock_refresh_token_13900139000'
  }
]

// 验证码缓存（模拟）
const verificationCodes = {}

// Mock 数据
export const data = {
  users
}

// Mock 路由处理
export const routes = {
  // 发送验证码
  'POST /api/auth/send-code': (params) => {
    const { phone, type } = params
    if (!phone || !/^1\d{10}$/.test(phone)) {
      return error('手机号格式不正确')
    }
    // 生成6位验证码
    const code = '123456' // 固定验证码方便测试
    verificationCodes[phone] = { code, type, expireAt: Date.now() + 5 * 60 * 1000 }
    return success(null, '验证码发送成功')
  },

  // 验证码登录
  'POST /api/auth/login/code': (params) => {
    const { phone, code } = params
    // 验证验证码（测试环境固定123456）
    if (code !== '123456') {
      return error('验证码错误')
    }
    let user = users.find(u => u.phone === phone)
    if (!user) {
      // 自动注册新用户
      user = {
        id: String(users.length + 1),
        phone,
        nickname: `用户${phone.slice(-4)}`,
        avatar: '/static/avatar/avatar.png',
        token: `mock_token_${phone}`,
        refreshToken: `mock_refresh_token_${phone}`
      }
      users.push(user)
    }
    return success({
      token: user.token,
      refreshToken: user.refreshToken,
      userInfo: {
        id: user.id,
        phone: user.phone,
        nickname: user.nickname,
        avatar: user.avatar
      }
    })
  },

  // 密码登录
  'POST /api/auth/login/password': (params) => {
    const { phone, password } = params
    const user = users.find(u => u.phone === phone && u.password === password)
    if (!user) {
      return error('手机号或密码错误')
    }
    return success({
      token: user.token,
      refreshToken: user.refreshToken,
      userInfo: {
        id: user.id,
        phone: user.phone,
        nickname: user.nickname,
        avatar: user.avatar
      }
    })
  },

  // 微信登录
  'POST /api/auth/login/wechat': (params) => {
    return success({
      token: 'mock_token_wechat',
      refreshToken: 'mock_refresh_token_wechat',
      userInfo: {
        id: '100',
        phone: '',
        nickname: '微信用户',
        avatar: '/static/avatar/avatar.png'
      }
    })
  },

  // 苹果登录
  'POST /api/auth/login/apple': (params) => {
    return success({
      token: 'mock_token_apple',
      refreshToken: 'mock_refresh_token_apple',
      userInfo: {
        id: '101',
        phone: '',
        nickname: 'Apple用户',
        avatar: '/static/avatar/avatar.png'
      }
    })
  },

  // 用户注册
  'POST /api/auth/register': (params) => {
    const { phone, code, password } = params
    if (code !== '123456') {
      return error('验证码错误')
    }
    if (users.find(u => u.phone === phone)) {
      return error('该手机号已注册')
    }
    const newUser = {
      id: String(users.length + 1),
      phone,
      password,
      nickname: `用户${phone.slice(-4)}`,
      avatar: '/static/avatar/avatar.png',
      token: `mock_token_${phone}`,
      refreshToken: `mock_refresh_token_${phone}`
    }
    users.push(newUser)
    return success({
      token: newUser.token,
      refreshToken: newUser.refreshToken,
      userInfo: {
        id: newUser.id,
        phone: newUser.phone,
        nickname: newUser.nickname,
        avatar: newUser.avatar
      }
    })
  },

  // 重置密码
  'POST /api/auth/reset-password': (params) => {
    const { phone, code, newPassword } = params
    if (code !== '123456') {
      return error('验证码错误')
    }
    const user = users.find(u => u.phone === phone)
    if (!user) {
      return error('用户不存在')
    }
    user.password = newPassword
    return success(null, '密码重置成功')
  },

  // 刷新 Token
  'POST /api/auth/refresh-token': (params) => {
    const { refreshToken } = params
    const user = users.find(u => u.refreshToken === refreshToken)
    if (!user) {
      return error('refresh token 无效', 10001)
    }
    return success({
      token: user.token,
      refreshToken: user.refreshToken
    })
  },

  // 退出登录
  'POST /api/auth/logout': () => {
    return success(null, '退出成功')
  },

  // 检查手机号是否已注册
  'GET /api/auth/check-phone': (params) => {
    const { phone } = params
    const exists = users.some(u => u.phone === phone)
    return success({ exists })
  }
}

export default {
  data,
  routes
}
