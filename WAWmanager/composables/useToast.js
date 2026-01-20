/**
 * Toast 提示组合式函数
 */

export const useToast = () => {
  /**
   * 成功提示
   */
  const showSuccess = (title, options = {}) => {
    uni.showToast({
      title,
      icon: 'success',
      duration: 2000,
      ...options
    })
  }

  /**
   * 失败提示
   */
  const showError = (title, options = {}) => {
    uni.showToast({
      title,
      icon: 'none',
      duration: 2000,
      ...options
    })
  }

  /**
   * 普通提示
   */
  const showInfo = (title, options = {}) => {
    uni.showToast({
      title,
      icon: 'none',
      duration: 2000,
      ...options
    })
  }

  /**
   * 加载中
   */
  const showLoading = (title = '加载中...', options = {}) => {
    uni.showLoading({
      title,
      mask: true,
      ...options
    })
  }

  /**
   * 隐藏加载
   */
  const hideLoading = () => {
    uni.hideLoading()
  }

  /**
   * 确认对话框
   */
  const showConfirm = (content, title = '提示') => {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title,
        content,
        success: (res) => {
          if (res.confirm) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        fail: reject
      })
    })
  }

  /**
   * 输入对话框
   */
  const showPrompt = (placeholder = '', title = '请输入') => {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title,
        editable: true,
        placeholderText: placeholder,
        success: (res) => {
          if (res.confirm) {
            resolve(res.content)
          } else {
            resolve(null)
          }
        },
        fail: reject
      })
    })
  }

  /**
   * 操作菜单
   */
  const showActionSheet = (itemList) => {
    return new Promise((resolve, reject) => {
      uni.showActionSheet({
        itemList,
        success: (res) => {
          resolve(res.tapIndex)
        },
        fail: (err) => {
          if (err.errMsg === 'showActionSheet:fail cancel') {
            resolve(-1)
          } else {
            reject(err)
          }
        }
      })
    })
  }

  return {
    showSuccess,
    showError,
    showInfo,
    showLoading,
    hideLoading,
    showConfirm,
    showPrompt,
    showActionSheet
  }
}
