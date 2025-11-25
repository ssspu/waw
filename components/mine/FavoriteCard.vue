<template>
	<view class="favorite-card" :class="[`favorite-card--${mode}`]">
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
	emits: ['unfavorite', 'action'],
	methods: {
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
	align-items: flex-start;
	gap: 20rpx;
	padding: 24rpx;
	border-radius: 16rpx;
	background: #fff;
	box-shadow: 0 0 44rpx rgba(0, 0, 0, 0.06);
	margin: 0;
	box-sizing: border-box;
}

.favorite-card--record {
	padding-right: 30rpx;
	margin: 0;
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
	width: 100%;
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
	align-items: flex-end;
	gap: 6rpx;
}

.price-block {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 6rpx;
}

.price-text {
	display: flex;
	align-items: flex-end;
	gap: 6rpx;
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
</style>

