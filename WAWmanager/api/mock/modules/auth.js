/**
 * 认证模块 Mock 数据
 * 商家端认证系统
 */

import { success, error, generateId, formatNow } from '../utils.js'

// 商家用户数据
const merchants = [
  {
    id: 'M001',
    phone: '13800138001',
    password: '123456',
    name: '金龙大好人美发沙龙',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    role: 'merchant', // merchant/technician/storeTechnician
    shopId: 'SHOP001',
    shopName: '金龙大好人美发沙龙',
    openId: 'oXYZ123456789merchant',
    createTime: '2024-01-01 10:00:00',
    lastLoginTime: '2025-12-13 09:00:00'
  },
  {
    id: 'T001',
    phone: '13800138002',
    password: '123456',
    name: '李天天',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    role: 'technician',
    shopId: 'SHOP001',
    shopName: '金龙大好人美发沙龙',
    position: '店长',
    level: '高级',
    openId: 'oXYZ123456789tech1',
    createTime: '2024-02-15 10:00:00',
    lastLoginTime: '2025-12-13 08:30:00'
  },
  {
    id: 'T002',
    phone: '13800138003',
    password: '123456',
    name: '张小雨',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
    role: 'storeTechnician',
    shopId: 'SHOP001',
    shopName: '金龙大好人美发沙龙',
    position: '总监',
    level: '高级',
    openId: 'oXYZ123456789tech2',
    createTime: '2024-03-20 10:00:00',
    lastLoginTime: '2025-12-12 18:00:00'
  }
]

// 验证码缓存
const smsCodeCache = {}

// 当前登录用户
let currentUser = null

// Mock 数据
export const data = {
  merchants,
  smsCodeCache,
  currentUser
}

// 获取当前用户
export const getCurrentUser = () => currentUser

// 设置当前用户
export const setCurrentUser = (user) => {
  currentUser = user
}

// Mock 路由处理
export const routes = {
  // 发送验证码
  'POST /auth/send-sms': (params) => {
    const { phone } = params
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return error('请输入正确的手机号')
    }
    // 固定验证码用于测试
    smsCodeCache[phone] = {
      code: '123456',
      expireTime: Date.now() + 5 * 60 * 1000
    }
    console.log(`📱 验证码已发送: ${phone} -> 123456`)
    return success(null, '验证码已发送')
  },

  // 手机号登录
  'POST /auth/phone-login': (params) => {
    const { phone, password, code, role } = params

    // 验证码登录
    if (code) {
      const cachedCode = smsCodeCache[phone]
      if (!cachedCode || cachedCode.code !== code) {
        return error('验证码错误')
      }
      if (Date.now() > cachedCode.expireTime) {
        return error('验证码已过期')
      }
    }

    // 密码登录
    let user = merchants.find(u => u.phone === phone)

    if (password && user && user.password !== password) {
      return error('密码错误')
    }

    // 如果用户不存在，创建新用户
    if (!user) {
      user = {
        id: generateId('M'),
        phone,
        name: '新商家',
        avatar: '',
        role: role || 'merchant',
        shopId: '',
        shopName: '',
        openId: '',
        createTime: formatNow(),
        lastLoginTime: formatNow()
      }
      merchants.push(user)
    } else {
      // 检查角色匹配
      if (role && user.role !== role) {
        return error('账号角色不匹配')
      }
      user.lastLoginTime = formatNow()
    }

    currentUser = user

    return success({
      token: 'mock_token_' + user.id + '_' + Date.now(),
      userInfo: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        shopId: user.shopId,
        shopName: user.shopName
      }
    }, '登录成功')
  },

  // 微信登录
  'POST /auth/wx-login': (params) => {
    const { code } = params
    if (!code) {
      return error('微信授权失败')
    }

    // 模拟根据code获取用户信息
    // 实际项目中需要调用微信API
    const mockOpenId = 'oXYZ' + Date.now()

    // 查找已绑定的用户
    let user = merchants.find(u => u.openId === mockOpenId)

    if (!user) {
      // 新用户，需要绑定手机号
      return success({
        needBindPhone: true,
        openId: mockOpenId
      }, '请绑定手机号')
    }

    currentUser = user
    user.lastLoginTime = formatNow()

    return success({
      token: 'mock_token_' + user.id + '_' + Date.now(),
      userInfo: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        shopId: user.shopId,
        shopName: user.shopName
      }
    }, '登录成功')
  },

  // 注册
  'POST /auth/register': (params) => {
    const { phone, code, password, role, name } = params

    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return error('请输入正确的手机号')
    }

    // 验证验证码
    const cachedCode = smsCodeCache[phone]
    if (!cachedCode || cachedCode.code !== code) {
      return error('验证码错误')
    }

    // 检查是否已注册
    if (merchants.find(u => u.phone === phone)) {
      return error('该手机号已注册')
    }

    const newUser = {
      id: generateId('M'),
      phone,
      password: password || '123456',
      name: name || '新商家',
      avatar: '',
      role: role || 'merchant',
      shopId: '',
      shopName: '',
      openId: '',
      createTime: formatNow(),
      lastLoginTime: formatNow()
    }
    merchants.push(newUser)
    currentUser = newUser

    return success({
      token: 'mock_token_' + newUser.id + '_' + Date.now(),
      userInfo: {
        id: newUser.id,
        phone: newUser.phone,
        name: newUser.name,
        avatar: newUser.avatar,
        role: newUser.role
      }
    }, '注册成功')
  },

  // 获取用户信息
  'GET /user/info': () => {
    if (!currentUser) {
      // 返回默认用户
      currentUser = merchants[0]
    }
    return success({
      id: currentUser.id,
      phone: currentUser.phone,
      name: currentUser.name,
      avatar: currentUser.avatar,
      role: currentUser.role,
      shopId: currentUser.shopId,
      shopName: currentUser.shopName,
      position: currentUser.position,
      level: currentUser.level
    })
  },

  // 更新用户信息
  'POST /user/update': (params) => {
    if (!currentUser) {
      return error('请先登录')
    }
    Object.assign(currentUser, params)
    return success(currentUser, '更新成功')
  },

  // 退出登录
  'POST /auth/logout': () => {
    currentUser = null
    return success(null, '退出成功')
  },

  // 获取OpenId
  'GET /auth/openid': () => {
    return success({
      openId: 'mock_openid_' + Date.now()
    })
  },

  // 设置/重置密码
  'POST /auth/reset-password': (params) => {
    const { phone, code, newPassword } = params

    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return error('请输入正确的手机号')
    }

    if (!newPassword || newPassword.length < 6) {
      return error('密码至少6位')
    }

    // 验证验证码（验证码登录后设置密码时，验证码已验证过）
    const cachedCode = smsCodeCache[phone]
    if (code && cachedCode && cachedCode.code !== code) {
      return error('验证码错误')
    }

    // 查找用户并更新密码
    let user = merchants.find(u => u.phone === phone)
    if (user) {
      user.password = newPassword
      console.log(`🔐 密码已更新: ${phone} -> ${newPassword}`)
    } else {
      // 如果用户不存在，创建新用户
      user = {
        id: generateId('M'),
        phone,
        password: newPassword,
        name: '新商家',
        avatar: '',
        role: 'merchant',
        shopId: '',
        shopName: '',
        openId: '',
        createTime: formatNow(),
        lastLoginTime: formatNow()
      }
      merchants.push(user)
      console.log(`🔐 新用户密码已设置: ${phone} -> ${newPassword}`)
    }

    return success(null, '密码设置成功')
  }
}

export default {
  data,
  routes,
  getCurrentUser,
  setCurrentUser
}
