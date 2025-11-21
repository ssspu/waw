<template>
	<view class="order-page">
		<!-- 自定义导航栏 -->
		<view class="custom-header">
			<!-- 状态栏 -->
			<view class="status-bar">
				<text class="time">9:41</text>
				<view class="status-icons">
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/cellular-connection.svg" 
						mode="aspectFit"
					></image>
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/wifi.svg" 
						mode="aspectFit"
					></image>
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/battery.png" 
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
							src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/frame.svg" 
							mode="aspectFit"
						></image>
					</view>
					<text class="nav-title">服务订单</text>
				</view>
				<view class="nav-right">
					<view class="action-btn" @tap="handleMore">
						<text class="action-text">⋮</text>
					</view>
					<view class="action-btn" @tap="handleCircle">
						<text class="action-text">○</text>
					</view>
				</view>
			</view>
			
			<!-- Logo -->
			<image 
				class="logo" 
				src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/group-8.png" 
				mode="aspectFit"
			></image>
		</view>
		
		<!-- Tab导航栏 -->
		<order-navigation-bar 
			:active-tab="activeTab"
			@tab-change="handleTabChange"
		></order-navigation-bar>
		
		<!-- 订单列表 -->
		<order-service-list 
			:active-tab="activeTab"
		></order-service-list>
		
		<!-- 底部指示器 -->
		<view class="footer-indicator">
			<view class="indicator-bar"></view>
		</view>
	</view>
</template>

<script>
import OrderNavigationBar from '../../components/order/index/OrderNavigationBar.vue'
import OrderServiceList from '../../components/order/index/OrderServiceList.vue'

export default {
	components: {
		OrderNavigationBar,
		OrderServiceList
	},
	data() {
		return {
			activeTab: 'all'
		}
	},
	onLoad(options) {
		if (options.tab) {
			this.activeTab = options.tab
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
.order-page {
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
	gap: 12rpx;
}

.status-icon {
	width: 35rpx;
	height: 23rpx;
	flex-shrink: 0;
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 112rpx 32rpx 32rpx;
	box-sizing: border-box;
}

.nav-left {
	display: flex;
	align-items: center;
	gap: 48rpx;
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
	color: #666666;
	font-size: 30rpx;
}

.nav-right {
	display: flex;
	align-items: center;
	gap: 32rpx;
}

.action-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.action-text {
	font-size: 40rpx;
	color: #666666;
	line-height: 1;
}

.logo {
	position: absolute;
	top: 62rpx;
	right: 16rpx;
	width: 256rpx;
	height: 144rpx;
	z-index: 1;
}

.footer-indicator {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: flex-end;
	gap: 20rpx;
	padding: 16rpx 240rpx;
	margin-top: auto;
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

