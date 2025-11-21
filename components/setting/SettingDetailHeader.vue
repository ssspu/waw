<template>
	<view class="custom-header">
		<view class="navbar-content">
			<view class="nav-left">
				<view class="back-btn" @tap="goBack">
					<image 
						class="back-icon" 
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" 
						mode="aspectFit"
					></image>
				</view>
			</view>
			<text class="nav-title">{{ title }}</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		}
	}
}
</script>

<style scoped lang="scss">
.custom-header {
	position: relative;
	width: 100%;
	background-color: #ffffff;
	flex-shrink: 0;
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 88rpx 32rpx 24rpx;
	box-sizing: border-box;
}

.nav-left {
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
	margin-top: 30rpx;
	margin-left: -240rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 30rpx;
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>

