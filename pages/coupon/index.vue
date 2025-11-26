<template>
	<view class="coupon-page">
		<!-- 自定义导航栏 -->
		<view class="custom-header">
			<!-- 状态栏 -->
			<!-- <view class="status-bar">
				<text class="time">9:41</text>
				<view class="status-icons">
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5m9weyYgJtGL/img/cellular-connection.svg" 
						mode="aspectFit"
					></image>
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5m9weyYgJtGL/img/wifi.svg" 
						mode="aspectFit"
					></image>
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5m9weyYgJtGL/img/battery.png" 
						mode="aspectFit"
					></image>
				</view>
			</view> -->
			
			<!-- 导航栏内容 -->
			<view class="navbar-content">
				<view class="nav-left">
					<view class="back-btn" @tap="goBack">
						<text class="back-icon">‹</text>
					</view>
				</view>
				<text class="nav-title">优惠券</text>
				<view class="nav-right">
					<view class="action-btn" @tap="handleMore">
						<text class="action-text">⋯</text>
					</view>
					<view class="action-btn" @tap="handleCircle">
						<text class="action-text">○</text>
					</view>
				</view>
			</view>
			
			<!-- Logo -->
			<!-- <image 
				class="logo" 
				src="https://c.animaapp.com/mi5m9weyYgJtGL/img/group-8.png" 
				mode="aspectFit"
			></image> -->
		</view>
		
		<!-- Tab导航栏 -->
		<coupon-list-section 
			:active-tab="activeTab"
			@tab-change="handleTabChange"
		></coupon-list-section>
		
		<!-- 优惠券列表 -->
		<view class="coupon-content">
			<coupon-details-section :active-tab="activeTab"></coupon-details-section>
		</view>
		
		<!-- 底部指示器
		<view class="footer-indicator">
			<view class="indicator-bar"></view>
		</view> -->
	</view>
</template>

<script>
import CouponListSection from '../../components/coupon/index/CouponListSection.vue'
import CouponDetailsSection from '../../components/coupon/index/CouponDetailsSection.vue'

export default {
	components: {
		CouponListSection,
		CouponDetailsSection
	},
	data() {
		return {
			activeTab: 'service'
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		handleMore() {
			console.log('More clicked')
		},
		handleCircle() {
			console.log('Circle clicked')
		},
		handleTabChange(tabId) {
			this.activeTab = tabId
		}
	}
}
</script>

<style scoped lang="scss">
.coupon-page {
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
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
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
	width: 34rpx;
	height: 22rpx;
	flex-shrink: 0;
}

.navbar-content {
	position: relative;
	width: 100%;
	height: 164rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 88rpx 30rpx 32rpx;
	box-sizing: border-box;
}

.nav-left {
	position: absolute;
	left: 30rpx;
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
	font-size: 48rpx;
	color: #333333;
	line-height: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.nav-right {
	position: absolute;
	right: 30rpx;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	gap: 32rpx;
	z-index: 2;
}

.action-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48rpx;
	height: 48rpx;
	cursor: pointer;
}

.action-text {
	font-size: 40rpx;
	color: #333333;
	line-height: 1;
}

.logo {
	position: absolute;
	top: 88rpx;
	right: 30rpx;
	width: 256rpx;
	height: 144rpx;
	z-index: 1;
}

.coupon-content {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	min-height: 200rpx;
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

