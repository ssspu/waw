/**
 * 格式化工具函数
 */

/**
 * 格式化金额
 * @param {number} amount 金额
 * @param {number} decimals 小数位数，默认2位
 * @param {string} symbol 货币符号
 */
export const formatMoney = (amount, decimals = 2, symbol = '¥') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${symbol}0.00`
  }

  const num = parseFloat(amount).toFixed(decimals)
  const parts = num.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return `${symbol}${parts.join('.')}`
}

/**
 * 格式化手机号
 * @param {string} phone 手机号
 */
export const formatPhone = (phone) => {
  if (!phone) return ''
  const str = phone.toString()
  return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化日期
 * @param {string|Date} date 日期
 * @param {string} format 格式 YYYY-MM-DD HH:mm:ss
 */
export const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return ''

  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  const second = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

/**
 * 格式化相对时间
 * @param {string|Date} date 日期
 */
export const formatRelativeTime = (date) => {
  if (!date) return ''

  const now = new Date()
  const target = new Date(date)
  const diff = now - target
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 7) {
    return formatDate(date, 'YYYY-MM-DD')
  } else if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小时前`
  } else if (minutes > 0) {
    return `${minutes}分钟前`
  } else {
    return '刚刚'
  }
}

/**
 * 格式化文件大小
 * @param {number} size 字节数
 */
export const formatFileSize = (size) => {
  if (!size) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`
}

/**
 * 格式化百分比
 * @param {number} value 值
 * @param {number} decimals 小数位数
 */
export const formatPercent = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00%'
  }

  return `${(parseFloat(value) * 100).toFixed(decimals)}%`
}

/**
 * 格式化银行卡号
 * @param {string} cardNo 银行卡号
 */
export const formatBankCard = (cardNo) => {
  if (!cardNo) return ''
  const str = cardNo.toString()
  return str.replace(/(\d{4})\d+(\d{4})/, '$1 **** **** $2')
}

/**
 * 格式化身份证号
 * @param {string} idCard 身份证号
 */
export const formatIdCard = (idCard) => {
  if (!idCard) return ''
  const str = idCard.toString()
  return str.replace(/(\d{6})\d+(\d{4})/, '$1********$2')
}

/**
 * 格式化数字（千分位）
 * @param {number} num 数字
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0'
  }

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
