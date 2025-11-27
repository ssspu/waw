<template>
	<view class="mine-page">
		<view class="hero-section">
			<image 
				class="hero-image" 
				src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/rectangle-186.png" 
				mode="aspectFill"
			></image>
			<view class="hero-toolbar">
				<view class="toolbar-btns">
					<view class="toolbar-btn" @tap="handleOnlineService">
						<image class="toolbar-icon" src="/static/icon/online—service.png" mode="aspectFit"></image>
					</view>
					<view class="toolbar-btn" @tap="handleNotice">
						<image class="toolbar-icon" src="/static/icon/notice.png" mode="aspectFit"></image>
					</view>
				</view>
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
		handleOnlineService() {
			console.log('Online service button clicked')
			uni.navigateTo({ url: '/pages/mine/customer-service' })
		},
		handleNotice() {
			console.log('Notice button clicked')
			uni.navigateTo({ url: '/pages/mine/notice' })
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

}

.hero-toolbar {
	position: absolute;
	top: 80rpx;
	left: 30rpx;
	display: flex;
	align-items: center;
}

.toolbar-btns {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.toolbar-btn {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.toolbar-icon {
	width: 48rpx;
	height: 48rpx;
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
	// gap: 20rpx;
	box-sizing: border-box;
	z-index: 2;
}
</style>

