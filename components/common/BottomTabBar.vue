<template>
	<view class="bottom-tab-bar">
		<view class="navigation-bar">
			<view class="nav-items">
				<view 
					v-for="(item, index) in navigationItems" 
					:key="index" 
					class="nav-item"
					:class="{ active: item.key === activeTab }"
					@tap="handleNavClick(item)"
				>
					<image class="nav-icon" :src="item.key === activeTab ? item.activeIcon : item.icon" mode="aspectFit"></image>
					<text class="nav-label" :class="{ active: item.key === activeTab }">{{ item.label }}</text>
				</view>
			</view>
		</view>
		<view class="bottom-indicator"></view>
	</view>
</template>

<script>
export default {
	props: {
		// 当前激活的 tab: 'service' | 'message' | 'mine'
		active: {
			type: String,
			default: 'service'
		}
	},
	data() {
		return {
			navigationItems: [
				{
					key: 'service',
					icon: '/static/icon/service.png',
					activeIcon: '/static/icon/service-active.png',
					label: '服务',
					path: '/pages/index/index'
				},
				{
					key: 'message',
					icon: '/static/icon/message.png',
					activeIcon: '/static/icon/message-active.png',
					label: '消息',
					path: '/pages/message/index'
				},
				{
					key: 'mine',
					icon: '/static/icon/mine.png',
					activeIcon: '/static/icon/mine-active.png',
					label: '我的',
					path: '/pages/mine/index'
				}
			]
		}
	},
	computed: {
		activeTab() {
			return this.active
		}
	},
	methods: {
		handleNavClick(item) {
			// 如果点击的是当前页面，不跳转
			if (item.key === this.activeTab) return
			
			// 使用 redirectTo 避免页面堆栈过多
			uni.redirectTo({ url: item.path })
		}
	}
}
</script>

<style scoped lang="scss">
.bottom-tab-bar {
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
}

.nav-label.active {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: 600;
}

.bottom-indicator {
	width: 100%;
	height: 48rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	gap: 20rpx;
	padding: 16rpx 240rpx;
	background-color: #ffffff;
	box-sizing: border-box;
}
</style>
