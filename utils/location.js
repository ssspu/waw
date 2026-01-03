/**
 * 地理位置相关工具函数
 */

/**
 * 计算两个坐标点之间的距离（单位：km）
 * 使用 Haversine 公式
 * @param {number} lat1 - 点1纬度
 * @param {number} lng1 - 点1经度
 * @param {number} lat2 - 点2纬度
 * @param {number} lng2 - 点2经度
 * @returns {string} 格式化后的距离字符串，如 "2.7km"
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
    if (!lat1 || !lng1 || !lat2 || !lng2) return ''

    const R = 6371 // 地球半径，单位 km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return `${distance.toFixed(1)}km`
}

/**
 * 获取当前位置
 * @returns {Promise<Object>} 包含 latitude 和 longitude 的对象
 */
export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        // #ifdef MP-WEIXIN
        uni.getLocation({
            type: 'gcj02',
            success: (res) => {
                resolve({ latitude: res.latitude, longitude: res.longitude })
            },
            fail: (err) => {
                reject(err)
            }
        })
        // #endif

        // #ifdef H5
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                },
                (error) => {
                    reject(error)
                }
            )
        } else {
            reject(new Error('浏览器不支持定位'))
        }
        // #endif

        // #ifdef APP-PLUS
        uni.getLocation({
            type: 'gcj02',
            success: (res) => {
                resolve({ latitude: res.latitude, longitude: res.longitude })
            },
            fail: (err) => {
                reject(err)
            }
        })
        // #endif
    })
}
