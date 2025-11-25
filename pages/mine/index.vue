<template>
	<view class="mine-page">
		<view class="hero-section">
			<image 
				class="hero-image" 
				src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/rectangle-186.png" 
				mode="aspectFill"
			></image>
			<view class="hero-toolbar">
				<button class="hero-btn" @tap="handleCustomerService">
					<image class="hero-btn-icon" src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-1881.svg" mode="aspectFit"></image>
				</button>
			</view>
		</view>
		
		<view class="main-content">
			<mine-user-info-section></mine-user-info-section>
			<mine-profile-section></mine-profile-section>
		</view>
		
		<mine-dashboard-section></mine-dashboard-section>
	</view>
</template>

<script>
import MineUserInfoSection from '../../components/mine/index/MineUserInfoSection.vue'
import MineProfileSection from '../../components/mine/index/MineProfileSection.vue'
import MineDashboardSection from '../../components/mine/index/MineDashboardSection.vue'

export default {
	components: {
		MineUserInfoSection,
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
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.hero-section {
	position: relative;
	height: 520rpx;
	width: 100%;
}

.hero-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-bottom-left-radius: 60rpx;
	border-bottom-right-radius: 60rpx;
}

.hero-toolbar {
	position: absolute;
	top: 80rpx;
	left: 40rpx;
	right: 40rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.hero-btn {
	width: 120rpx;
	height: 56rpx;
	border-radius: 28rpx;
	background-color: rgba(255, 255, 255, 0.85);
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	padding: 0;
}

.hero-btn::after {
	border: none;
}

.hero-btn-icon {
	width: 96rpx;
	height: 32rpx;
}
		

.pill-dot,
.pill-line {
	font-size: 24rpx;
	color: #333;
}

.pill-circle {
	width: 24rpx;
	height: 24rpx;
	border-radius: 50%;
	border: 2rpx solid #333;
}

.main-content {
	position: relative;
	margin-top: -80		rpx;
	padding: 0 24rpx 160rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
	box-sizing: border-box;
	z-index: 2;
}
</style>

