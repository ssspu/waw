<template>
	<view class="dashboard-section">
		<view class="navigation-bar">
			<view class="nav-items">
				<view 
					v-for="(item, index) in navigationItems" 
					:key="index" 
					class="nav-item"
					:class="{ active: item.isActive }"
					@tap="handleNavClick(index, item)"
				>
					<image class="nav-icon" :src="item.icon" mode="aspectFit"></image>
					<text class="nav-label" :class="{ active: item.isActive }">{{ item.label }}</text>
				</view>
			</view>
		</view>
		
		<view class="footer-indicator">
			<view class="indicator-bar"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			navigationItems: [
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-4.svg",
					label: "服务",
					isActive: false,
					path: "/pages/main/index?tab=service"
				},
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-15.svg",
					label: "消息",
					isActive: false,
					path: "/pages/main/index?tab=service"
				},
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-14.svg",
					label: "我的",
					isActive: true,
					path: "/pages/mine/index"
				},
			],
		}
	},
	methods: {
		handleNavClick(index, item) {
			this.navigationItems.forEach((nav, i) => {
				nav.isActive = i === index
			})
			
			// 导航到对应页面
			if (item.path) {
				if (item.label === '服务') {
					// 跳转到服务页面（主页面）
					uni.navigateTo({ url: '/pages/main/index?tab=service' })
				} else if (item.label === '消息') {
					// 跳转到消息页面（暂时先跳转到主页面）
					uni.navigateTo({ url: '/pages/main/index?tab=service' })
				} else if (item.label === '我的') {
					// 已经在我的页面，不需要跳转
				}
			}
		}
	}
}
</script>

<style scoped lang="scss">
.dashboard-section {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	background-color: #ffffff;
	box-shadow: 0 -2rpx 0 rgba(0, 0, 0, 0.04);
	z-index: 30;
	display: flex;
	flex-direction: column;
}

.navigation-bar {
	width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
}

.nav-items {
	display: flex;
	height: 98rpx;
	align-items: flex-end;
	justify-content: space-around;
	width: 100%;
}

.nav-item {
	display: flex;
	flex-direction: column;
	width: 88rpx;
	height: auto;
	align-items: center;
	justify-content: flex-end;
	gap: 6rpx;
	padding: 0;
	cursor: pointer;
}

.nav-icon {
	width: 50rpx;
	height: 50rpx;
	flex-shrink: 0;
}

.nav-label {
	width: fit-content;
	font-size: 22rpx;
	color: #333333;
	text-align: center;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	
	&.active {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
	}
}

.footer-indicator {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 68rpx;
	align-items: center;
	justify-content: flex-end;
	gap: 20rpx;
	padding: 16rpx 240rpx;
	background-color: #ffffff;
	box-sizing: border-box;
}

.indicator-bar {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
}
</style>

