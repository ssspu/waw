/**
 * 认证相关 API
 * 包含登录、注册、Token管理、用户信息等接口
 *
 * 后端接口文档: API-DOCUMENTATION(1)(2).md
 */
import { get, post, put } from '../request'

// ==================== 登录相关 ====================

/**
 * 微信登录
 * @param {Object} data - { code: '微信授权code' }
 */
export const wxLogin = (data) => {
  return post('/auth/login/wechat', data)
}

/**
 * 微信手机号快捷登录
 * @param {Object} data - { code: '授权code', encryptedData: '', iv: '' }
 */
export const wxPhoneLogin = (data) => {
  return post('/auth/login/wechat', data)
}

/**
 * 手机号验证码登录
 * @param {Object} data - { phone: '手机号', code: '验证码' }
 */
export const phoneLogin = (data) => {
  return post('/auth/login/code', data)
}

/**
 * 商家手机号验证码登录
 * @param {Object} data - { phone: '手机号', code: '验证码' }
 */
export const merchantPhoneLogin = (data) => {
  return post('/auth/merchant/login/code', data)
}

/**
 * 密码登录
 * @param {Object} data - { phone: '手机号', password: '密码' }
 */
export const passwordLogin = (data) => {
  return post('/auth/login/password', data)
}

/**
 * 商家密码登录
 * @param {Object} data - { phone: '手机号', password: '密码' }
 */
export const merchantPasswordLogin = (data) => {
  return post('/auth/login/password', data)
}

/**
 * 发送验证码
 * @param {string} phone - 手机号
 * @param {string} type - 验证码类型: 'login' | 'register' | 'reset' | 'bindPhone'
 */
export const sendSmsCode = (phone, type = 'login') => {
  return post('/auth/send-code', { phone, type })
}

/**
 * 商家发送验证码
 * @param {string} phone - 手机号
 * @param {string} type - 验证码类型: 'login' | 'register' | 'reset' | 'bindPhone'
 */
export const merchantSendSmsCode = (phone, type = 'login') => {
  return post('/auth/send-code', { phone, type })
}

/**
 * 注册
 * @param {Object} data - {
 *   phone: '手机号',
 *   code: '验证码',
 *   password: '密码',
 *   inviteCode?: '邀请码'
 * }
 */
export const register = (data) => {
  return post('/auth/register', data)
}

/**
 * 退出登录
 */
export const logout = () => {
  return post('/auth/logout')
}

// ==================== Token 管理 ====================

/**
 * 刷新 Token
 * @param {Object} data - { refreshToken: 'refresh_token' }
 */
export const refreshToken = (data) => {
  return post('/auth/refresh-token', data)
}

// ==================== 密码管理 ====================

/**
 * 重置密码（忘记密码）
 * @param {Object} data - {
 *   phone: '手机号',
 *   code: '验证码',
 *   newPassword: '新密码'
 * }
 */
export const resetPassword = (data) => {
  return post('/auth/reset-password', data)
}

/**
 * 修改密码
 * @param {Object} data - {
 *   oldPassword: '旧密码',
 *   newPassword: '新密码',
 *   confirmPassword: '确认密码'
 * }
 */
export const changePassword = (data) => {
  return put('/user/password', data)
}

// ==================== 用户信息 ====================

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return get('/user/info')
}

/**
 * 更新用户信息
 * @param {Object} data - {
 *   nickname: '昵称',
 *   avatar: '头像URL',
 *   gender: 'male' | 'female' | 'unknown',
 *   birthday: '1990-01-01'
 * }
 */
export const updateUserInfo = (data) => {
  return put('/user/info', data)
}

/**
 * 获取用户角色信息
 */
export const getUserRole = () => {
  return get('/user/role')
}

/**
 * 切换用户角色/身份
 * @param {Object} data - { role: 'user' | 'designer' | 'merchant' }
 */
export const switchRole = (data) => {
  return post('/user/switch-role', data)
}

// ==================== 手机号绑定 ====================

/**
 * 绑定手机号
 * @param {Object} data - { phone: '手机号', code: '验证码' }
 */
export const bindPhone = (data) => {
  return post('/user/bindPhone', data)
}

/**
 * 更换手机号
 * @param {Object} data - {
 *   oldPhone: '旧手机号',
 *   oldCode: '旧手机验证码',
 *   newPhone: '新手机号',
 *   newCode: '新手机验证码'
 * }
 */
export const changePhone = (data) => {
  return put('/user/phone', data)
}

// ==================== 商家认证 ====================

/**
 * 获取商家认证状态
 */
export const getMerchantAuthStatus = () => {
  return get('/auth/merchant/status')
}

/**
 * 提交商家认证
 * @param {Object} data - {
 *   businessLicense: '营业执照图片URL',
 *   idCardFront: '身份证正面',
 *   idCardBack: '身份证背面',
 *   legalPersonName: '法人姓名',
 *   idCardNumber: '身份证号',
 *   shopName: '店铺名称',
 *   shopAddress: '店铺地址',
 *   contactPhone: '联系电话',
 *   brandType: 'store' | 'personal',  // 店铺类型: store-门店商家, personal-个人设计师
 *   longitude?: number,  // 经度（可选）
 *   latitude?: number    // 纬度（可选）
 * }
 */
export const submitMerchantAuth = (data) => {
  return post('/auth/merchant/submit', data)
}

/**
 * 重新提交商家认证
 * @param {Object} data - 认证信息
 */
export const resubmitMerchantAuth = (data) => {
  return post('/auth/merchant/resubmit', data)
}

/**
 * 获取商家认证详情
 */
export const getMerchantAuthDetail = () => {
  return get('/auth/merchant/detail')
}

// ==================== 入驻相关 ====================

/**
 * 获取入驻协议
 * @param {string} type - 'store' | 'designer'
 */
export const getSettlementAgreement = (type = 'store') => {
  return get(`/settlement/${type}/agreement`)
}

/**
 * 同意入驻协议
 * @param {string} type - 'store' | 'designer'
 */
export const agreeSettlementAgreement = (type = 'store') => {
  return post(`/settlement/${type}/agreement/agree`)
}

/**
 * 获取入驻进度
 * @param {string} type - 'store' | 'designer'
 */
export const getSettlementProgress = (type = 'store') => {
  return get(`/settlement/${type}/progress`)
}

// ==================== 微信相关 ====================

/**
 * 获取微信 OpenId
 */
export const getOpenId = () => {
  return get('/auth/openid')
}
