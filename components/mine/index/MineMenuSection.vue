<template>
	<view class="menu-section">
		<view class="vip-card">
			<view class="vip-content">
				<view class="vip-header">
					<text class="vip-title">VIP会员专享</text>
					<view class="crown-wrapper">
						<text class="crown-emoji">👑</text>
					</view>
				</view>
				<text class="vip-subtitle">超值补贴优惠专享</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.menu-section {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 6rpx;
	padding: 10rpx 24rpx;
	width: 100%;
	max-width: 710rpx;
	box-sizing: border-box;
}

.vip-card {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding: 10rpx 24rpx;
	border-radius: 32rpx;
	background: linear-gradient(180deg, rgba(208, 193, 167, 1) 0%, rgba(136, 125, 107, 1) 100%);
	box-sizing: border-box;
}

.vip-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
}

.vip-header {
	display: inline-flex;
	align-items: center;
	justify-content: flex-end;
	gap: 8rpx;
}

.vip-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffffff;
	font-size: 24rpx;
	text-align: center;
}

.crown-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
}

.crown-emoji {
	font-size: 28rpx;
	line-height: 1;
}

.vip-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: rgba(255, 255, 255, 0.6);
	font-size: 18rpx;
	white-space: nowrap;
}
</style>

