<template>
	<view class="favorite-card" :class="[`favorite-card--${mode}`]">
		<!-- 主内容区域 -->
		<view class="card-main">
			<image class="cover" :src="item.cover" mode="aspectFill"></image>
			<view class="card-content">
				<view class="card-info">
					<text class="service-name">{{ item.name }}</text>
					<text class="service-meta">{{ item.description }}</text>
					<view class="service-duration">
						<text class="meta-label">预计时间:</text>
						<text class="meta-value">{{ item.duration }}</text>
					</view>
					<text
						v-if="mode === 'record' && item.sold"
						class="service-distance service-sold"
					>
						已售{{ item.sold }}
					</text>
					<text
						v-else-if="item.distance"
						class="service-distance"
					>
						{{ item.distance }}
					</text>
				</view>
				<view class="card-actions">
					<template v-if="mode === 'favorite'">
						<text class="unfavorite" @tap.stop="handleUnfavorite">取消收藏</text>
						<view class="price-tag">
							<text class="currency">¥</text>
							<text class="price">{{ item.price }}</text>
						</view>
					</template>
					<template v-else>
						<view class="price-block">
							<view class="price-text">
								<text class="currency">¥</text>
								<text class="price">{{ item.price }}</text>
							</view>
							<text v-if="item.discount" class="discount-text">{{ item.discount }}</text>
						</view>
						<button class="cta-btn" @tap.stop="handleAction">{{ item.ctaText || '快速预约' }}</button>
					</template>
				</view>
			</view>
		</view>

		<!-- 设计师信息区域 - 有 stylist 数据时显示 -->
		<template v-if="item.stylist">
			<view class="divider"></view>
			<view class="stylist-section" @tap.stop>
				<view class="stylist-left">
					<view class="stylist-avatar"></view>
					<view class="stylist-info">
						<view class="stylist-name-row">
							<text class="stylist-name">{{ item.stylist.name }}</text>
							<view class="stylist-badge">
								<text class="badge-text">{{ item.stylist.title }}</text>
							</view>
						</view>
						<view class="stylist-rating">
							<text class="rating-score">{{ item.stylist.rating }}</text>
							<view class="star-wrapper">
								<image class="star-icon" src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/star-1.svg" mode="aspectFit"></image>
							</view>
							<text class="rating-count">({{ item.stylist.reviews }})</text>
						</view>
					</view>
				</view>
				<view class="stylist-right">
					<view class="location-info">
						<image class="location-icon" src="/static/icon/position.png" mode="aspectFit"></image>
						<text class="location-text">{{ item.stylist.location }}</text>
					</view>
					<text class="distance-text">{{ item.stylist.distance }}</text>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	name: 'FavoriteCard',
	props: {
		item: {
			type: Object,
			required: true
		},
		mode: {
			type: String,
			default: 'favorite' // favorite | record
		}
	},
	emits: ['unfavorite', 'action', 'tap'],
	methods: {
		handleCardTap() {
			this.$emit('tap', this.item)
		},
		handleUnfavorite() {
			this.$emit('unfavorite', this.item)
		},
		handleAction() {
			this.$emit('action', this.item)
		}
	}
}
</script>

<style scoped lang="scss">
.favorite-card {
	display: flex;
	flex-direction: column;
	padding: 24rpx;
	border-radius: 16rpx;
	background: #fff;
	box-shadow: 0 0 44rpx rgba(0, 0, 0, 0.06);
	margin: 0;
	box-sizing: border-box;
}

.favorite-card--record {
	padding: 20rpx;
	margin: 0;
}

.card-main {
	display: flex;
	align-items: flex-start;
	gap: 20rpx;
}

.cover {
	width: 160rpx;
	height: 160rpx;
	border-radius: 16rpx;
	object-fit: cover;
	flex-shrink: 0;
}

.card-content {
	display: flex;
	justify-content: space-between;
	flex: 1;
	gap: 20rpx;
}

.card-info {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.service-name {
	font-size: 32rpx;
	color: #000;
	font-weight: 600;
}

.service-meta,
.service-distance,
.meta-label,
.meta-value {
	font-size: 24rpx;
	color: #a7a7a7;
}

.service-sold {
	color: #9a9a9a;
}

.service-duration {
	display: flex;
	gap: 8rpx;
}

.card-actions {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-between;
	gap: 12rpx;
}

.favorite-card--record .card-actions {
	align-items: flex-end;
}

.unfavorite {
	font-size: 24rpx;
	color: #a7a7a7;
}

.price-tag {
	display: flex;
	align-items: baseline;
	gap: 4rpx;
}

.price-block {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 6rpx;
}

.price-text {
	display: flex;
	align-items: baseline;
	gap: 4rpx;
}

.currency {
	font-size: 26rpx;
	color: #333;
}

.price {
	font-size: 40rpx;
	font-weight: 600;
	color: #333;
}

.discount-text {
	font-size: 22rpx;
	color: #ff6f00;
}

.cta-btn {
	background-color: #2f2f2f;
	color: #f8b88d;
	border-radius: 4rpx;
	font-size: 26rpx;
	border: none;
	font-family: 'PingFang_SC-Medium', Helvetica;
}

.cta-btn::after {
	border: none;
}

/* 分隔线 */
.divider {
	width: 100%;
	height: 2rpx;
	background-color: #f2f2f2;
	margin: 16rpx 0;
}

/* 设计师信息区域 */
.stylist-section {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.stylist-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.stylist-avatar {
	width: 56rpx;
	height: 56rpx;
	background-color: #a6a6a6;
	border-radius: 50%;
	flex-shrink: 0;
}

.stylist-info {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
}

.stylist-name-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.stylist-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 26rpx;
	font-weight: 500;
	color: #333333;
}

.stylist-badge {
	background-color: #f6f6f6;
	padding: 4rpx 8rpx;
	border-radius: 4rpx;
	display: flex;
	align-items: center;
	height: 32rpx;
}

.badge-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	font-weight: 400;
	color: #999999;
}

.stylist-rating {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 600;
	color: #333333;
}

.star-wrapper {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 24rpx;
	height: 24rpx;
	padding: 2rpx;
	background-color: #333333;
	border-radius: 4rpx;
	box-sizing: border-box;
	flex-shrink: 0;
}

.star-icon {
	width: 20rpx;
	height: 20rpx;
	filter: brightness(0) invert(1);
}

.rating-count {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	font-weight: 400;
	color: #999999;
}

.stylist-right {
	display: flex;
	align-items: baseline;
	gap: 60rpx;
	margin-top: 10rpx;
}

.location-info {
	display: flex;
	align-items: baseline;
	gap: 0;
}

.location-icon {
	width: 24rpx;
	height: 24rpx;
	position: relative;
	top: 2rpx;
}

.location-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	font-weight: 400;
	color: #999999;
	max-width: 200rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.distance-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	font-weight: 400;
	color: #999999;
}
</style>
