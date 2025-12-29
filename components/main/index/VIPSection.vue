<template>
	<view class="vip-section">
		<text class="section-title">附近推荐</text>
		<view class="filter-btn" @tap="handleFilter">
			<text class="filter-text">筛选</text>
			<image class="filter-icon" src="https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-1.svg" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		handleFilter() {
			console.log('Filter clicked')
		}
	}
}
</script>

<style scoped lang="scss">
.vip-section {
	display: flex;
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	padding: 0 12rpx;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
}

.section-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.filter-btn {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
	height: auto;
	padding: 0;
}

.filter-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 28rpx;
	text-align: center;
}

.filter-icon {
	width: 20rpx;
	height: 20rpx;
}


@keyframes fade-in {
	0% {
		opacity: 0;
		transform: translateY(-20rpx);
	}
	to {
		opacity: 1;
		transform: none;
	}
}

.animate-fade-in {
	animation: fade-in 1s ease forwards;
	opacity: 0;
}
</style>

