/**
 * 代理系统相关 API
 */
import { get, post, put } from '../request'

/**
 * 获取代理奖励
 */
export const getAgentReward = (params = {}) => {
  return get('/agent/reward', params)
}

/**
 * 获取平台奖励
 */
export const getPlatformReward = (params = {}) => {
  return get('/agent/platform-reward', params)
}

/**
 * 激活代理账号
 */
export const activateAgent = (data) => {
  return post('/agent/activate', data)
}

/**
 * 提交代理身份认证
 */
export const submitAgentIdentity = (data) => {
  return post('/agent/identity', data)
}

/**
 * 获取代理结算记录
 */
export const getAgentSettlement = (params = {}) => {
  return get('/agent/settlement', params)
}

/**
 * 获取代理支付方式
 */
export const getAgentPayment = () => {
  return get('/agent/payment')
}

/**
 * 更新代理支付方式
 */
export const updateAgentPayment = (data) => {
  return put('/agent/payment', data)
}

/**
 * 获取代理佣金进度
 */
export const getAgentProgress = (params = {}) => {
  return get('/agent/progress', params)
}

/**
 * 设置佣金分享
 */
export const setAgentShare = (data) => {
  return post('/agent/share', data)
}

/**
 * 代理注册
 */
export const agentRegistration = (data) => {
  return post('/agent/register', data)
}

/**
 * 佣金明细
 */
export const getCommissionDetail = (params = {}) => {
  return get('/agent/commission', params)
}

/**
 * 提取佣金
 */
export const withdrawCommission = (data) => {
  return post('/agent/withdraw', data)
}
