<template>
	<view class="asset-record-item">
		<view class="record-content">
			<image 
				class="record-image" 
				src="https://bioflex.cn/static/icon/rectangle-169.png" 
				mode="aspectFill"
			></image>
			<view class="record-info">
				<view class="record-details">
					<text class="record-title">{{ record.title }}</text>
					<text class="record-desc">{{ record.desc }}</text>
					<text class="record-time">{{ record.time }}</text>
				</view>
				<text class="record-amount">{{ record.amount }}</text>
			</view>
		</view>
		<image 
			v-if="!isLast"
			class="divider" 
			src="https://bioflex.cn/static/icon/vector-20.svg" 
			mode="aspectFit"
		></image>
	</view>
</template>

<script>
export default {
	name: 'AssetRecordItem',
	props: {
		record: {
			type: Object,
			required: true
		},
		isLast: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scoped lang="scss">
.asset-record-item {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
	padding-bottom: 30rpx;
}

.asset-record-item.last-item {
	padding-bottom: 0;
}

.record-content {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.record-image {
	width: 132rpx;
	height: 132rpx;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.record-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex: 1;
}

.record-details {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
}

.record-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #666666;
}

.record-desc {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a7a7a7;
}

.record-time {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a7a7a7;
}

.record-amount {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 34rpx;
	font-weight: normal;
	color: #333333;
}

.divider {
	width: 100%;
	height: 2rpx;
}
</style>

