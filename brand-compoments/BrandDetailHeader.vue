<template>
	<view class="header">
		<image 
			class="header-bg" 
			src="https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-186.png" 
			mode="aspectFill"
		></image>
		<view class="header-overlay"></view>

		<view class="header-content">
			<view class="header-actions">
				<view class="back-btn" @tap="goBack">
					<image class="back-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1877.svg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		goBack() {
			const pages = getCurrentPages && getCurrentPages()
			if (pages && pages.length > 1) {
				uni.navigateBack()
			} else {
				uni.redirectTo({
					url: '/pages/main/index'
				})
			}
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
	z-index: 2;
	height: 100%;
	padding: 48rpx 32rpx 32rpx;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
}

.header-actions {
	margin-top: auto;
	margin-bottom: 200rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
}

.back-btn {
	width: 64rpx;
	height: 64rpx;
	border-radius: 32rpx;
	background: rgba(255, 255, 255, 0.18);
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(6rpx);
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
	cursor: pointer;
	flex-shrink: 0;
	z-index: 10;
	opacity: 1;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
	filter: brightness(0) invert(1);
}
</style>

