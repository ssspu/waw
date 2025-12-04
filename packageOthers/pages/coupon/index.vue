<template>
	<view class="coupon-page">
		<!-- 导航栏 -->
		<view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="back-btn" @tap="goBack">
					<image
						class="back-icon"
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg"
						mode="aspectFit"
					></image>
				</view>
				<text class="navbar-title">优惠券</text>
			</view>
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
import CouponListSection from '../../../components/coupon/index/CouponListSection.vue'
import CouponDetailsSection from '../../../components/coupon/index/CouponDetailsSection.vue'

export default {
	components: {
		CouponListSection,
		CouponDetailsSection
	},
	data() {
		return {
			statusBarHeight: 44,
			activeTab: 'service'
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
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

.navbar {
	position: relative;
	width: 100%;
	background-color: #ffffff;
	z-index: 10;
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 88rpx;
	padding: 0 30rpx;
	position: relative;
}

.back-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
}

.navbar-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
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

