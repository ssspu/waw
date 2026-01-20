/**
 * 设置管理 API
 * 包含账号安全、通知设置、隐私设置、系统设置等接口
 */
import { get, post, put, del } from '../request'

// ==================== 账号安全 ====================

/**
 * 获取账号安全信息
 */
export const getSecurityInfo = () => {
  return get('/settings/security')
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
  return post('/settings/security/password', data)
}

/**
 * 绑定手机号
 * @param {Object} data - { phone: '手机号', code: '验证码' }
 */
export const bindPhone = (data) => {
  return post('/settings/security/bind-phone', data)
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
  return post('/settings/security/change-phone', data)
}

/**
 * 绑定微信
 * @param {Object} data - { code: '微信授权code' }
 */
export const bindWechat = (data) => {
  return post('/settings/security/bind-wechat', data)
}

/**
 * 解绑微信
 */
export const unbindWechat = () => {
  return post('/settings/security/unbind-wechat')
}

/**
 * 获取登录设备列表
 */
export const getLoginDevices = () => {
  return get('/settings/security/devices')
}

/**
 * 移除登录设备
 * @param {string} deviceId - 设备ID
 */
export const removeDevice = (deviceId) => {
  return del(`/settings/security/devices/${deviceId}`)
}

/**
 * 移除所有其他设备
 */
export const removeOtherDevices = () => {
  return del('/settings/security/devices/others')
}

/**
 * 获取登录日志
 * @param {Object} params - 分页参数
 */
export const getLoginLogs = (params = {}) => {
  return get('/settings/security/login-logs', params)
}

// ==================== 通知设置 ====================

/**
 * 获取通知设置
 */
export const getNotificationSettings = () => {
  return get('/settings/notification')
}

/**
 * 更新通知设置
 * @param {Object} data - {
 *   // 订单相关
 *   newOrder: boolean, // 新订单通知
 *   orderConfirm: boolean, // 订单确认通知
 *   orderCancel: boolean, // 订单取消通知
 *   orderComplete: boolean, // 订单完成通知
 *
 *   // 评价相关
 *   newReview: boolean, // 新评价通知
 *   negativeReview: boolean, // 差评通知
 *   reviewReply: boolean, // 评价回复通知
 *
 *   // 顾客相关
 *   newCustomer: boolean, // 新顾客通知
 *   customerBirthday: boolean, // 顾客生日提醒
 *
 *   // 财务相关
 *   incomeNotify: boolean, // 收入通知
 *   withdrawNotify: boolean, // 提现通知
 *
 *   // 系统相关
 *   systemNotify: boolean, // 系统通知
 *   marketingNotify: boolean, // 营销活动通知
 *
 *   // 提醒方式
 *   sound: boolean, // 声音提醒
 *   vibrate: boolean, // 震动提醒
 *   badge: boolean // 角标显示
 * }
 */
export const updateNotificationSettings = (data) => {
  return put('/settings/notification', data)
}

/**
 * 获取免打扰时段
 */
export const getDoNotDisturbSettings = () => {
  return get('/settings/notification/dnd')
}

/**
 * 设置免打扰时段
 * @param {Object} data - {
 *   enabled: boolean,
 *   startTime: '22:00',
 *   endTime: '08:00'
 * }
 */
export const updateDoNotDisturbSettings = (data) => {
  return put('/settings/notification/dnd', data)
}

// ==================== 隐私设置 ====================

/**
 * 获取隐私设置
 */
export const getPrivacySettings = () => {
  return get('/settings/privacy')
}

/**
 * 更新隐私设置
 * @param {Object} data - {
 *   showPhone: boolean, // 显示手机号
 *   showAddress: boolean, // 显示地址
 *   allowSearch: boolean, // 允许被搜索
 *   allowMessage: boolean, // 允许私信
 *   showOnlineStatus: boolean, // 显示在线状态
 *   showLastActive: boolean // 显示最后活跃时间
 * }
 */
export const updatePrivacySettings = (data) => {
  return put('/settings/privacy', data)
}

// ==================== 权限管理 ====================

/**
 * 获取角色列表
 */
export const getRoles = () => {
  return get('/settings/roles')
}

/**
 * 获取角色详情（含权限）
 * @param {string} roleId - 角色ID
 */
export const getRoleDetail = (roleId) => {
  return get(`/settings/roles/${roleId}`)
}

/**
 * 创建角色
 * @param {Object} data - {
 *   name: '角色名称',
 *   description: '角色描述',
 *   permissions: ['order.view', 'order.edit'] // 权限列表
 * }
 */
export const createRole = (data) => {
  return post('/settings/roles', data)
}

/**
 * 更新角色
 * @param {string} roleId - 角色ID
 * @param {Object} data - 角色数据
 */
export const updateRole = (roleId, data) => {
  return put(`/settings/roles/${roleId}`, data)
}

/**
 * 删除角色
 * @param {string} roleId - 角色ID
 */
export const deleteRole = (roleId) => {
  return del(`/settings/roles/${roleId}`)
}

/**
 * 获取权限列表
 */
export const getPermissions = () => {
  return get('/settings/permissions')
}

/**
 * 分配员工角色
 * @param {string} staffId - 员工ID
 * @param {Object} data - { roleId: '角色ID' }
 */
export const assignStaffRole = (staffId, data) => {
  return put(`/settings/staff/${staffId}/role`, data)
}

// ==================== 打印设置 ====================

/**
 * 获取打印设置
 */
export const getPrintSettings = () => {
  return get('/settings/print')
}

/**
 * 更新打印设置
 * @param {Object} data - {
 *   autoPrint: boolean, // 自动打印
 *   printCopies: 1, // 打印份数
 *   printerName: '打印机名称',
 *   templateId: '模板ID',
 *   showLogo: boolean,
 *   showQrcode: boolean,
 *   footerText: '页脚文字'
 * }
 */
export const updatePrintSettings = (data) => {
  return put('/settings/print', data)
}

/**
 * 获取打印模板列表
 */
export const getPrintTemplates = () => {
  return get('/settings/print/templates')
}

/**
 * 测试打印
 * @param {Object} data - { templateId: '模板ID' }
 */
export const testPrint = (data) => {
  return post('/settings/print/test', data)
}

// ==================== 收款设置 ====================

/**
 * 获取收款设置
 */
export const getPaymentSettings = () => {
  return get('/settings/payment')
}

/**
 * 更新收款设置
 * @param {Object} data - {
 *   wechatPayEnabled: boolean, // 微信支付
 *   alipayEnabled: boolean, // 支付宝
 *   cashEnabled: boolean, // 现金
 *   cardEnabled: boolean, // 银行卡
 *   balancePayEnabled: boolean, // 余额支付
 *   couponEnabled: boolean // 优惠券
 * }
 */
export const updatePaymentSettings = (data) => {
  return put('/settings/payment', data)
}

/**
 * 获取微信支付配置
 */
export const getWechatPayConfig = () => {
  return get('/settings/payment/wechat')
}

/**
 * 更新微信支付配置
 * @param {Object} data - 微信支付配置
 */
export const updateWechatPayConfig = (data) => {
  return put('/settings/payment/wechat', data)
}

// ==================== 系统设置 ====================

/**
 * 获取系统设置
 */
export const getSystemSettings = () => {
  return get('/settings/system')
}

/**
 * 更新系统设置
 * @param {Object} data - {
 *   language: 'zh-CN', // 语言
 *   timezone: 'Asia/Shanghai', // 时区
 *   dateFormat: 'YYYY-MM-DD', // 日期格式
 *   timeFormat: 'HH:mm', // 时间格式
 *   currency: 'CNY' // 货币
 * }
 */
export const updateSystemSettings = (data) => {
  return put('/settings/system', data)
}

/**
 * 获取缓存信息
 */
export const getCacheInfo = () => {
  return get('/settings/system/cache')
}

/**
 * 清除缓存
 * @param {Object} data - { type: 'all' | 'image' | 'data' }
 */
export const clearCache = (data = { type: 'all' }) => {
  return post('/settings/system/cache/clear', data)
}

/**
 * 获取存储空间使用情况
 */
export const getStorageUsage = () => {
  return get('/settings/system/storage')
}

// ==================== 账号注销 ====================

/**
 * 获取注销账号状态
 */
export const getDeactivationStatus = () => {
  return get('/settings/account/deactivation')
}

/**
 * 申请注销账号
 * @param {Object} data - { reason: '注销原因', password: '密码确认' }
 */
export const applyDeactivation = (data) => {
  return post('/settings/account/deactivation', data)
}

/**
 * 取消注销申请
 */
export const cancelDeactivation = () => {
  return del('/settings/account/deactivation')
}

// ==================== 数据导出 ====================

/**
 * 导出账号数据
 * @param {Object} data - {
 *   types: ['orders', 'customers', 'reviews'], // 导出类型
 *   format: 'excel' | 'json'
 * }
 */
export const exportAccountData = (data) => {
  return post('/settings/account/export', data)
}

/**
 * 获取数据导出记录
 */
export const getExportRecords = () => {
  return get('/settings/account/export/records')
}

/**
 * 下载导出的数据
 * @param {string} recordId - 导出记录ID
 */
export const downloadExportedData = (recordId) => {
  return get(`/settings/account/export/download/${recordId}`)
}

// ==================== 操作日志 ====================

/**
 * 获取操作日志
 * @param {Object} params - {
 *   page: 1,
 *   pageSize: 20,
 *   type?: '操作类型',
 *   operator?: '操作人',
 *   startDate?: '2024-01-01',
 *   endDate?: '2024-01-31'
 * }
 */
export const getOperationLogs = (params = {}) => {
  return get('/settings/logs/operation', params)
}

/**
 * 获取操作日志详情
 * @param {string} logId - 日志ID
 */
export const getOperationLogDetail = (logId) => {
  return get(`/settings/logs/operation/${logId}`)
}

// ==================== 版本信息 ====================

/**
 * 获取版本信息
 */
export const getVersionInfo = () => {
  return get('/settings/version')
}

/**
 * 检查更新
 */
export const checkForUpdates = () => {
  return get('/settings/version/check-update')
}
