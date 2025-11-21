<template>
	<view class="service-options-section animate-fade-in" style="animation-delay: 200ms;">
		<view class="service-card">
			<image 
				class="service-image" 
				:src="serviceData.image" 
				:alt="serviceData.title" 
				mode="aspectFill"
			></image>
			
			<view class="service-info">
				<view class="service-header">
					<text class="service-title">{{ serviceData.title }}</text>
				</view>
				
				<view class="service-details">
					<text class="service-description">{{ serviceData.description }}</text>
					<view class="service-price-container">
						<text class="price-symbol">¥</text>
						<text class="price-value">{{ serviceData.price }}</text>
					</view>
				</view>
				
				<view class="service-footer">
					<view class="stylist-info">
						<view class="stylist-avatar">
							<image 
								class="avatar-image" 
								:src="serviceData.stylist.avatar" 
								:alt="serviceData.stylist.name"
								mode="aspectFill"
							></image>
						</view>
						<view class="stylist-details">
							<view class="stylist-name-row">
								<text class="stylist-name">{{ serviceData.stylist.name }}</text>
								<text class="stylist-title">{{ serviceData.stylist.title }}</text>
							</view>
							<view class="stylist-rating">
								<text class="rating-score">{{ serviceData.stylist.rating }}</text>
								<image 
									class="star-icon" 
									src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/star-1.svg" 
									mode="aspectFit"
								></image>
								<text class="review-count">({{ serviceData.stylist.reviews }})</text>
							</view>
						</view>
					</view>
					<text class="service-distance">{{ serviceData.distance }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			serviceData: {
				image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-169.png",
				title: "烫发",
				description: "发型提案+染发+造型",
				price: "799",
				stylist: {
					avatar: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/ellipse-34.svg",
					name: "李天天",
					title: "美发师",
					rating: "4.8",
					reviews: "768",
				},
				distance: "6.7km",
			},
		}
	}
}
</script>

<style scoped lang="scss">
.service-options-section {
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	padding: 0 12rpx;
	box-sizing: border-box;
}

.service-card {
	width: 100%;
	max-width: 358rpx;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius: 8rpx;
	overflow: hidden;
	box-sizing: border-box;
}

.service-image {
	width: 100%;
	height: 358rpx;
	object-fit: cover;
	border-radius: 8rpx 8rpx 0 0;
}

.service-info {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
	padding: 16rpx;
}

.service-header {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
}

.service-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 32rpx;
}

.service-details {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
}

.service-description {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.service-price-container {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
}

.price-symbol {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 28rpx;
}

.price-value {
	font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 28rpx;
	white-space: nowrap;
}

.service-footer {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
}

.stylist-info {
	display: inline-flex;
	align-items: center;
	gap: 12rpx;
}

.stylist-avatar {
	width: 52rpx;
	height: 52rpx;
	border-radius: 50%;
	overflow: hidden;
}

.avatar-image {
	width: 100%;
	height: 100%;
}

.stylist-details {
	display: inline-flex;
	flex-direction: column;
	gap: 4rpx;
}

.stylist-name-row {
	display: inline-flex;
	align-items: flex-start;
	gap: 8rpx;
}

.stylist-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
}

.stylist-title {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.stylist-rating {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 24rpx;
}

.star-icon {
	width: 20rpx;
	height: 20rpx;
}

.review-count {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
}

.service-distance {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

/* 动画 */
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

