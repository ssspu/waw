/**
 * 财务管理相关 API
 *
 * 后端接口文档: API-DOCUMENTATION(1)(2).md
 */
import { get, post } from '../request'

/**
 * 获取资产概览
 */
export const getAssets = () => {
  return get('/user/asset')
}

/**
 * 获取余额
 */
export const getBalance = () => {
  return get('/finance/balance')
}

/**
 * 获取余额明细
 */
export const getBalanceDetail = (params = {}) => {
  return get('/user/asset/detail', params)
}

/**
 * 提现申请
 * @param {Object} data - { amount: 100, bankCardId: 'string' }
 */
export const withdraw = (data) => {
  return post('/user/withdraw', data)
}

/**
 * 获取银行卡列表
 */
export const getBankCards = () => {
  return get('/user/bank-cards')
}

/**
 * 添加银行卡
 * @param {Object} data - {
 *   cardNumber: '银行卡号',
 *   bankName: '银行名称',
 *   holderName: '持卡人姓名',
 *   phone: '手机号'
 * }
 */
export const addBankCard = (data) => {
  return post('/user/bank-cards', data)
}

/**
 * 删除银行卡
 * @param {string} id - 银行卡ID
 */
export const deleteBankCard = (id) => {
  return post(`/user/bank-cards/${id}/delete`)
}

/**
 * 设置默认银行卡
 * @param {string} id - 银行卡ID
 */
export const setDefaultBankCard = (id) => {
  return post(`/user/bank-cards/${id}/default`)
}

/**
 * 获取收入明细
 */
export const getIncomeDetail = (params = {}) => {
  return get('/finance/income', params)
}

/**
 * 获取交易明细
 */
export const getTransactionDetail = (params = {}) => {
  return get('/finance/transactions', params)
}

/**
 * 获取单条交易详情
 * @param {string} id - 交易ID
 */
export const getTransactionInfo = (id) => {
  return get(`/finance/transactions/${id}`)
}

/**
 * 充值
 * @param {Object} data - { amount: 100, bankCardId: 'string' }
 */
export const recharge = (data) => {
  return post('/user/recharge', data)
}

