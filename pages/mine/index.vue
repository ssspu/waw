<template>
	<view class="mine-page">
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		
		<!-- 背景图片 -->
		<image 
			class="bg-image" 
			src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/rectangle-186.png" 
			mode="aspectFill"
		></image>
		
		<!-- 圆角背景 -->
		<view class="rounded-bg"></view>
		
		<!-- 客服按钮 - 独立在页面左上角 -->
		<button class="customer-service-btn" @tap="handleCustomerService">
			<image 
				class="customer-service-icon" 
				src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-1881.svg" 
				mode="aspectFit"
			></image>
		</button>
		
		<!-- 自定义导航栏 -->
		<view class="custom-navbar">
			<!-- Logo -->
			<image 
				class="logo" 
				src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/group-7.png" 
				mode="aspectFit"
			></image>
			
			<!-- 装饰图片 -->
			<image 
				class="decoration-image" 
				src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/subtract-1.svg" 
				mode="aspectFit"
			></image>
		</view>
		
		<!-- 主内容区域 -->
		<view class="main-content">
			<mine-user-info-section></mine-user-info-section>
			<mine-menu-section></mine-menu-section>
			<mine-profile-section></mine-profile-section>
		</view>
		
		<!-- 底部导航栏 -->
		<mine-dashboard-section></mine-dashboard-section>
	</view>
</template>

<script>
import MineUserInfoSection from '../../components/mine/index/MineUserInfoSection.vue'
import MineMenuSection from '../../components/mine/index/MineMenuSection.vue'
import MineProfileSection from '../../components/mine/index/MineProfileSection.vue'
import MineDashboardSection from '../../components/mine/index/MineDashboardSection.vue'

export default {
	components: {
		MineUserInfoSection,
		MineMenuSection,
		MineProfileSection,
		MineDashboardSection
	},
	methods: {
		handleCustomerService(e) {
			console.log('Customer service button clicked', e)
			uni.showToast({ title: '点击了客服按钮', icon: 'none', duration: 2000 })
			setTimeout(() => {
				uni.navigateTo({ 
					url: '/pages/mine/customer-service',
					success: () => {
						console.log('Navigate to customer service success')
					},
					fail: (err) => {
						console.error('Navigate to customer service failed:', err)
						uni.showToast({ title: '页面跳转失败: ' + JSON.stringify(err), icon: 'none', duration: 3000 })
					}
				})
			}, 100)
		}
	}
}
</script>

<style scoped lang="scss">
.mine-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.status-bar {
	height: 44rpx;
	flex-shrink: 0;
}

.bg-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 600rpx;
	object-fit: cover;
	z-index: 0;
}

.rounded-bg {
	position: absolute;
	top: 580rpx;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: #f3f3f3;
	border-top-left-radius: 16rpx;
	border-top-right-radius: 16rpx;
	flex: 1;
	z-index: 1;
}

.custom-navbar {
	position: relative;
	width: 100%;
	z-index: 10;
}

.logo {
	position: absolute;
	top: 62rpx;
	left: 494rpx;
	width: 256rpx;
	height: 144rpx;
	z-index: 10;
}

.customer-service-btn {
	position: fixed;
	top: 102rpx;
	left: 30rpx;
	z-index: 9999;
	width: 138rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	margin: 0;
	border: none;
	background-color: transparent;
	line-height: 1;
}

.customer-service-btn::after {
	border: none;
}

.customer-service-icon {
	width: 138rpx;
	height: 60rpx;
	pointer-events: none;
}

.decoration-image {
	position: absolute;
	top: 520rpx;
	left: 20rpx;
	width: 710rpx;
	height: 448rpx;
	z-index: 10;
}

.main-content {
	position: relative;
	z-index: 20;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 240rpx 0 166rpx;
	gap: 12rpx;
	width: 100%;
	box-sizing: border-box;
}
</style>

