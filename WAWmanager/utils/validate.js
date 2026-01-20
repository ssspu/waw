/**
 * 验证工具函数
 */

/**
 * 验证手机号
 */
export const isPhone = (phone) => {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 验证邮箱
 */
export const isEmail = (email) => {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)
}

/**
 * 验证身份证号
 */
export const isIdCard = (idCard) => {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)
}

/**
 * 验证银行卡号
 */
export const isBankCard = (cardNo) => {
  return /^\d{16,19}$/.test(cardNo)
}

/**
 * 验证URL
 */
export const isUrl = (url) => {
  return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url)
}

/**
 * 验证密码强度（6-20位，包含数字和字母）
 */
export const isPassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(password)
}

/**
 * 验证验证码（6位数字）
 */
export const isVerifyCode = (code) => {
  return /^\d{6}$/.test(code)
}

/**
 * 验证中文姓名
 */
export const isChineseName = (name) => {
  return /^[\u4e00-\u9fa5]{2,10}$/.test(name)
}

/**
 * 验证金额（最多两位小数）
 */
export const isMoney = (money) => {
  return /^(([1-9]\d*)|\d)(\.\d{1,2})?$/.test(money)
}

/**
 * 验证正整数
 */
export const isPositiveInteger = (value) => {
  return /^[1-9]\d*$/.test(value)
}

/**
 * 验证非负整数
 */
export const isNonNegativeInteger = (value) => {
  return /^\d+$/.test(value)
}

/**
 * 验证是否为空
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 验证是否为空白字符串
 */
export const isBlank = (value) => {
  return typeof value === 'string' && value.trim() === ''
}

/**
 * 表单验证器
 */
export const createValidator = (rules) => {
  return (data) => {
    const errors = {}

    for (const field in rules) {
      const fieldRules = rules[field]
      const value = data[field]

      for (const rule of fieldRules) {
        if (rule.required && isEmpty(value)) {
          errors[field] = rule.message || `${field}不能为空`
          break
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errors[field] = rule.message || `${field}格式不正确`
          break
        }

        if (rule.validator && !rule.validator(value)) {
          errors[field] = rule.message || `${field}验证失败`
          break
        }

        if (rule.minLength && value.length < rule.minLength) {
          errors[field] = rule.message || `${field}长度不能少于${rule.minLength}位`
          break
        }

        if (rule.maxLength && value.length > rule.maxLength) {
          errors[field] = rule.message || `${field}长度不能超过${rule.maxLength}位`
          break
        }
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    }
  }
}
