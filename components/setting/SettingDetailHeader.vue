<template>
	<view class="custom-header" :style="{ paddingTop: statusBarHeight + 'px' }">
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
	data() {
		return {
			statusBarHeight: 44
		}
	},
	created() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
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
	padding: 24rpx 32rpx;
	box-sizing: border-box;
	gap: 24rpx;
}

.nav-left {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
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
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
}
</style>

