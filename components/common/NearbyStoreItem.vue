<template>
	<view class="nearby-store-item" @tap="$emit('select', store)">
		<view class="store-avatar" :style="{ backgroundImage: `url(${store.image})` }"></view>
		<view class="store-details">
			<view class="store-header">
				<view class="store-title-row">
					<text class="store-name">{{ store.name }}</text>
					<view v-if="store.tag" class="store-tag-badge">{{ store.tag }}</view>
				</view>
				<text v-if="store.extraAction" class="store-action">{{ store.extraAction }}</text>
			</view>
			<text class="store-type">{{ store.type }}</text>
			<view class="store-stats-row">
				<view class="stats-rating">
					<text class="stats-rating-score">{{ store.rating }}</text>
					<view class="star-container-small">
						<image class="star-small" src="/static/icon/star.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="store-stats-info">
					<view class="stat-item">
						<text class="stat-label">设计师</text>
						<text class="stat-value">{{ store.designers }}</text>
					</view>
					<text class="stat-divider">｜</text>
					<view class="stat-item">
						<text class="stat-label">服务</text>
						<text class="stat-value">{{ store.services }}</text>
					</view>
				</view>
				<text class="store-distance">{{ store.distance }}</text>
			</view>
			<view class="amenities" v-if="store.amenities && store.amenities.length">
				<view 
					v-for="(amenity, idx) in store.amenities" 
					:key="idx" 
					class="amenity-badge-outline"
				>
					{{ amenity }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'NearbyStoreItem',
	props: {
		store: {
			type: Object,
			required: true
		}
	},
	emits: ['select']
}
</script>

<style scoped lang="scss">
.nearby-store-item {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.08);
	padding: 20rpx;
	box-sizing: border-box;
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
}

.store-avatar {
	width: 152rpx;
	height: 152rpx;
	background-size: cover;
	background-position: center;
	border-radius: 16rpx;
	flex-shrink: 0;
}

.store-details {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	flex: 1;
}

.store-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 12rpx;
}

.store-title-row {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.store-name {
	font-size: 28rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
}

.store-tag-badge {
	padding: 4rpx 8rpx;
	background-color: #dacbb1;
	color: #645e57;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	border-radius: 4rpx;
}

.store-action {
	font-size: 24rpx;
	color: #9a9a9a;
}

.store-type {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
}

.store-stats-row {
	display: flex;
	align-items: center;
	gap: 16rpx;
	flex-wrap: wrap;
}

.stats-rating {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.stats-rating-score {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	color: #333333;
}

.star-container-small {
	display: flex;
	align-items: center;
	gap: 4rpx;
	padding: 4rpx 6rpx;
	background-color: #333333;
	border-radius: 6rpx;
}

.star-small {
	width: 16rpx;
	height: 16rpx;
	filter: brightness(0) invert(1);
}

.store-stats-info {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.stat-item {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.stat-label {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
}

.stat-value {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
}

.stat-divider {
	font-size: 24rpx;
	color: #c7c7c7;
}

.store-distance {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #a6a6a6;
	white-space: nowrap;
}

.amenities {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 8rpx;
}

.amenity-badge-outline {
	padding: 6rpx 12rpx;
	border: 2rpx solid #dadada;
	border-radius: 8rpx;
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #a6a6a6;
}
</style>

