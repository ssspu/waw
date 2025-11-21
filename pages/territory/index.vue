<template>
	<view class="territory-page">
		<!-- 自定义导航栏 -->
		<view class="custom-header">
			<!-- 状态栏 -->
			<view class="status-bar">
				<text class="time">9:41</text>
				<view class="status-icons">
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5ng54v4eM3X6/img/cellular-connection.svg" 
						mode="aspectFit"
					></image>
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5ng54v4eM3X6/img/wifi.svg" 
						mode="aspectFit"
					></image>
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5ng54v4eM3X6/img/battery.png" 
						mode="aspectFit"
					></image>
				</view>
			</view>
			
			<!-- 导航栏内容 -->
			<view class="navbar-content">
				<view class="nav-left">
					<view class="back-btn" @tap="goBack">
						<image 
							class="back-icon" 
							src="https://c.animaapp.com/mi5ng54v4eM3X6/img/frame.svg" 
							mode="aspectFit"
						></image>
					</view>
				</view>
				<text class="nav-title">私人领地</text>
				<view class="nav-right">
					<view class="action-btn" @tap="handleMore">
						<text class="action-text">⋮</text>
					</view>
					<view class="action-btn" @tap="handleRadio">
						<text class="action-text">●</text>
					</view>
				</view>
			</view>
			
			<!-- Logo -->
			<image 
				class="logo" 
				src="https://c.animaapp.com/mi5ng54v4eM3X6/img/group-8.png" 
				mode="aspectFit"
			></image>
		</view>
		
		<!-- 主内容区域 -->
		<view class="main-content">
			<territory-header-section 
				:active-top-tab="activeTopTab"
				:active-sub-tab="activeSubTab"
				@top-tab-change="handleTopTabChange"
				@sub-tab-change="handleSubTabChange"
			></territory-header-section>
			
			<territory-user-profile-section></territory-user-profile-section>
			
			<territory-service-card-section></territory-service-card-section>
			
			<territory-service-list-section></territory-service-list-section>
			
			<territory-booking-section></territory-booking-section>
		</view>
		
		<!-- 底部指示器 -->
		<view class="footer-indicator">
			<view class="indicator-bar"></view>
		</view>
	</view>
</template>

<script>
import TerritoryHeaderSection from '../../components/territory/index/TerritoryHeaderSection.vue'
import TerritoryUserProfileSection from '../../components/territory/index/TerritoryUserProfileSection.vue'
import TerritoryServiceCardSection from '../../components/territory/index/TerritoryServiceCardSection.vue'
import TerritoryServiceListSection from '../../components/territory/index/TerritoryServiceListSection.vue'
import TerritoryBookingSection from '../../components/territory/index/TerritoryBookingSection.vue'

export default {
	components: {
		TerritoryHeaderSection,
		TerritoryUserProfileSection,
		TerritoryServiceCardSection,
		TerritoryServiceListSection,
		TerritoryBookingSection
	},
	data() {
		return {
			activeTopTab: 'designer',
			activeSubTab: 'hairstylist'
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		handleMore() {
			console.log('More clicked')
		},
		handleRadio() {
			console.log('Radio clicked')
		},
		handleTopTabChange(tabId) {
			this.activeTopTab = tabId
		},
		handleSubTabChange(tabId) {
			this.activeSubTab = tabId
		}
	}
}
</script>

<style scoped lang="scss">
.territory-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.custom-header {
	position: relative;
	width: 100%;
	background-color: #ffffff;
	flex-shrink: 0;
}

.status-bar {
	width: 100%;
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 32rpx;
	box-sizing: border-box;
}

.time {
	font-family: 'Inter', Helvetica;
	font-size: 28rpx;
	color: #000000;
	font-weight: normal;
}

.status-icons {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.status-icon {
	width: 35rpx;
	height: 22rpx;
	flex-shrink: 0;
}

.navbar-content {
	position: relative;
	width: 100%;
	height: 136rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 32rpx;
	box-sizing: border-box;
}

.nav-left {
	position: absolute;
	left: 32rpx;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
	z-index: 2;
}

.back-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
}

.nav-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 32rpx;
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.nav-right {
	position: absolute;
	right: 32rpx;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	gap: 16rpx;
	z-index: 2;
}

.action-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
	cursor: pointer;
}

.action-text {
	font-size: 32rpx;
	color: #333333;
	line-height: 1;
}

.logo {
	position: absolute;
	top: -74rpx;
	right: 30rpx;
	width: 256rpx;
	height: 144rpx;
	z-index: 1;
}

.main-content {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 12rpx;
	gap: 12rpx;
	box-sizing: border-box;
}

.footer-indicator {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: flex-end;
	gap: 20rpx;
	padding: 16rpx 240rpx;
	flex-shrink: 0;
	box-sizing: border-box;
}

.indicator-bar {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
}
</style>

