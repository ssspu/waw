<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
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
	
</style>
