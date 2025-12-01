<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 获取设备信息并持久化存储
			const systemInfo = uni.getSystemInfoSync()
			uni.setStorageSync('statusBarHeight', systemInfo.statusBarHeight || 44)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
