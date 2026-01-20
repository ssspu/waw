/**
 * 平台判断工具
 */

/**
 * 判断是否为微信小程序
 */
export const isWxMiniProgram = () => {
  // #ifdef MP-WEIXIN
  return true
  // #endif
  // #ifndef MP-WEIXIN
  return false
  // #endif
}

/**
 * 判断是否为支付宝小程序
 */
export const isAlipayMiniProgram = () => {
  // #ifdef MP-ALIPAY
  return true
  // #endif
  // #ifndef MP-ALIPAY
  return false
  // #endif
}

/**
 * 判断是否为H5
 */
export const isH5 = () => {
  // #ifdef H5
  return true
  // #endif
  // #ifndef H5
  return false
  // #endif
}

/**
 * 判断是否为 App
 */
export const isApp = () => {
  // #ifdef APP-PLUS
  return true
  // #endif
  // #ifndef APP-PLUS
  return false
  // #endif
}

/**
 * 获取平台类型
 */
export const getPlatform = () => {
  // #ifdef MP-WEIXIN
  return 'mp-weixin'
  // #endif
  // #ifdef MP-ALIPAY
  return 'mp-alipay'
  // #endif
  // #ifdef MP-BAIDU
  return 'mp-baidu'
  // #endif
  // #ifdef MP-TOUTIAO
  return 'mp-toutiao'
  // #endif
  // #ifdef H5
  return 'h5'
  // #endif
  // #ifdef APP-PLUS
  return 'app'
  // #endif
  return 'unknown'
}

/**
 * 获取系统信息
 */
export const getSystemInfo = () => {
  return uni.getSystemInfoSync()
}

/**
 * 是否为iOS
 */
export const isIOS = () => {
  const systemInfo = getSystemInfo()
  return systemInfo.platform === 'ios' || systemInfo.osName === 'ios'
}

/**
 * 是否为Android
 */
export const isAndroid = () => {
  const systemInfo = getSystemInfo()
  return systemInfo.platform === 'android' || systemInfo.osName === 'android'
}

/**
 * 获取状态栏高度
 */
export const getStatusBarHeight = () => {
  const systemInfo = getSystemInfo()
  return systemInfo.statusBarHeight || 0
}

/**
 * 获取安全区域
 */
export const getSafeAreaInsets = () => {
  const systemInfo = getSystemInfo()
  return systemInfo.safeAreaInsets || { top: 0, bottom: 0, left: 0, right: 0 }
}

/**
 * 获取窗口尺寸
 */
export const getWindowSize = () => {
  const systemInfo = getSystemInfo()
  return {
    windowWidth: systemInfo.windowWidth,
    windowHeight: systemInfo.windowHeight,
    screenWidth: systemInfo.screenWidth,
    screenHeight: systemInfo.screenHeight
  }
}
