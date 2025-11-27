<template>
	<view class="gallery-section">
		<view class="navigation-bar">
			<view class="nav-items">
				<view 
					v-for="(item, index) in navigationItems" 
					:key="index" 
					class="nav-item"
					:class="{ active: item.isActive }"
					@tap="handleNavClick(index)"
				>
					<image class="nav-icon" :src="item.icon" mode="aspectFit"></image>
					<text class="nav-label" :class="{ active: item.isActive }">{{ item.label }}</text>
				</view>
			</view>
		</view>
		<view class="bottom-indicator">
			<!-- <view class="indicator-bar"></view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			navigationItems: [
				{
					icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2.svg",
					label: "服务",
					isActive: true,
				},
				{
					icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame.svg",
					label: "消息",
					isActive: false,
				},
				{
					icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-1.svg",
					label: "我的",
					isActive: false,
				},
			]
		}
	},
	methods: {
		handleNavClick(index) {
			this.navigationItems.forEach((item, i) => {
				item.isActive = i === index
			})
			
			const item = this.navigationItems[index]
			// 根据不同的标签进行导航
			if (item.label === '服务') {
				// 跳转到服务页面（主页面）
				uni.navigateTo({ url: '/pages/main/index?tab=service' })
			} else if (item.label === '消息') {
				// 跳转到消息页面（暂时先跳转到主页面）
				uni.navigateTo({ url: '/pages/main/index?tab=service' })
			} else if (item.label === '我的') {
				// 跳转到我的页面
				uni.navigateTo({ url: '/pages/mine/index' })
			}
		}
	}
}
</script>

<style scoped lang="scss">
.gallery-section {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	background-color: #ffffff;
	box-shadow: 0 -2rpx 0 rgba(0, 0, 0, 0.04);
	z-index: 50;
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
}

.nav-icon {
	width: 50rpx;
	height: 50rpx;
}

.nav-label {
	width: fit-content;
	font-size: 22rpx;
	color: #333333;
	text-align: center;
	font-family: 'PingFang_SC-Regular', Helvetica;
}

.nav-label.active {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: 600;
}

.bottom-indicator {
	width: 100%;
	height: 68rpx;
	display: flex;
	flex-direction: column;
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

