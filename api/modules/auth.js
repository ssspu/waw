/**
 * 认证模块 API
 * 包含登录、注册、验证码、密码重置等接口
 */

import { post, get } from '../request.js'

const AUTH_PREFIX = '/auth'

export default {
  /**
   * 发送验证码
   * @param {Object} data - { phone: 手机号, type: 类型(login/register/reset) }
   */
  sendCode(data) {
    return post(`${AUTH_PREFIX}/send-code`, data)
  },

  /**
   * 手机号验证码登录
   * @param {Object} data - { phone: 手机号, code: 验证码 }
   */
  loginByCode(data) {
    return post(`${AUTH_PREFIX}/login/code`, data)
  },

  /**
   * 账号密码登录
   * @param {Object} data - { phone: 手机号, password: 密码 }
   */
  loginByPassword(data) {
    return post(`${AUTH_PREFIX}/login/password`, data)
  },

  /**
   * 微信一键登录
   * @param {Object} data - { code: 微信授权码, encryptedData, iv }
   */
  loginByWechat(data) {
    return post(`${AUTH_PREFIX}/login/wechat`, data)
  },

  /**
   * 苹果一键登录
   * @param {Object} data - { identityToken, authorizationCode }
   */
  loginByApple(data) {
    return post(`${AUTH_PREFIX}/login/apple`, data)
  },

  /**
   * 用户注册
   * @param {Object} data - { phone, code, password, confirmPassword, inviteCode? }
   */
  register(data) {
    return post(`${AUTH_PREFIX}/register`, data)
  },

  /**
   * 重置密码
   * @param {Object} data - { phone, code, newPassword, confirmPassword }
   */
  resetPassword(data) {
    return post(`${AUTH_PREFIX}/reset-password`, data)
  },

  /**
   * 刷新 Token
   * @param {Object} data - { refreshToken }
   */
  refreshToken(data) {
    return post(`${AUTH_PREFIX}/refresh-token`, data)
  },

  /**
   * 退出登录
   */
  logout() {
    return post(`${AUTH_PREFIX}/logout`)
  },

  /**
   * 检查手机号是否已注册
   * @param {string} phone - 手机号
   */
  checkPhone(phone) {
    return get(`${AUTH_PREFIX}/check-phone`, { phone })
  }
}
