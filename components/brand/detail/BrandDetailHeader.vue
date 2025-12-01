<template>
	<view class="header">
		<image
			class="header-bg"
			src="https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-186.png"
			mode="aspectFill"
		></image>
		<view class="header-overlay"></view>

		<!-- 自定义导航栏 -->
		<view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="header-actions">
				<view class="back-btn" @tap="goBack">
					<image class="back-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1877.svg" mode="aspectFit"></image>
				</view>
				<view class="share-btn" @tap="handleShare">
					<image class="share-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1879-1.svg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 44
		}
	},
	created() {
		// 从持久化存储获取状态栏高度
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	methods: {
		goBack() {
			const pages = getCurrentPages && getCurrentPages()
			if (pages && pages.length > 1) {
				uni.navigateBack()
			} else {
				uni.redirectTo({
					url: '/pages/brand/index'
				})
			}
		},
		handleShare() {
			this.$emit('share')
		}
	}
}
</script>

<style scoped lang="scss">
.header {
	position: relative;
	width: 100%;
	height: 662rpx;
	flex-shrink: 0;
}

.header-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.header-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 65%);
	z-index: 1;
}

.header-content {
	position: relative;
	top: -430rpx;
	z-index: 9;
	height: 100%;
	padding: 48rpx 32rpx 32rpx;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
}

// 自定义导航栏
.custom-navbar {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
}

.header-actions {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 40rpx;
	padding-right: 210rpx;
	box-sizing: border-box;
}

.back-btn {
	width: 64rpx;
	height: 64rpx;
	border-radius: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	flex-shrink: 0;
}

.back-icon {
	width: 60;
	height: 60rpx;
	flex-shrink: 0;
	filter: brightness(0) invert(1);
}

.logo {
	width: 220rpx;
	height: 124rpx;
	opacity: 0;
}

.share-btn {
	width: 60rpx;
	height: 60rpx;
	cursor: pointer;
}

.share-icon {
	width: 100%;
	height: 100%;
}
</style>
