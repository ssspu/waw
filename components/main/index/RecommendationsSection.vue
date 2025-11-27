<template>
	<view class="recommendations-section">
		<view class="recommendations-section-inner">
		<!-- 大卡片 - 会员特区 -->
		<view class="large-card" @tap="handleCardClick(recommendationCards[0])">
			<view class="card-content">
				<image 
					class="card-icon" 
					:src="recommendationCards[0].icon" 
					:alt="recommendationCards[0].title"
					mode="aspectFit"
				></image>
				<view class="card-info">
					<text class="card-title">{{ recommendationCards[0].title }}</text>
					<text class="card-subtitle">{{ recommendationCards[0].subtitle }}</text>
				</view>
			</view>
		</view>
			
			<!-- 小卡片区域 -->
			<view class="small-cards">
				<view 
					v-for="(card, index) in recommendationCards.slice(1)" 
					:key="card.id" 
					class="small-card"
					@tap="handleCardClick(card)"
				>
					<view class="small-card-content">
						<view class="small-card-info">
							<text class="small-card-title">{{ card.title }}</text>
							<text class="small-card-subtitle">{{ card.subtitle }}</text>
						</view>
						<image 
							class="small-card-icon" 
							:src="card.icon" 
							:alt="card.title"
							mode="aspectFit"
						></image>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 附近推荐标题 -->
		<view class="recommendations-header">
			<text class="recommendations-title">附近推荐</text>
			<view class="filter-btn" @tap="handleFilter">
				<text class="filter-text">筛选</text>
				<image class="filter-icon" src="https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-1.svg" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			recommendationCards: [
				{
					id: "vip",
					title: "会员特区",
					subtitle: "VIP精选优服务",
					icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2288-1.svg",
					size: "large",
				},
				{
					id: "package",
					title: "套餐优选",
					subtitle: "套餐项目更实惠",
					icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2288.svg",
					size: "small",
				},
				{
					id: "haircare",
					title: "防脱护理",
					subtitle: "头皮保养和防护",
					icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2288-2.svg",
					size: "small",
				},
			],
		}
	},
	methods: {
		handleCardClick(card) {
			console.log('Card clicked:', card)
		},
		handleFilter() {
			console.log('Filter clicked')
		}
	}
}
</script>

<style scoped lang="scss">
.recommendations-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	padding: 0 12rpx;
	box-sizing: border-box;
	gap: 18rpx;
}

.recommendations-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 0;
	margin-top: 18rpx;
	box-sizing: border-box;
}

.recommendations-title {
	font-size: 28rpx;
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
}

.filter-btn {
	display: flex;
	align-items: center;
	gap: 4rpx;
	cursor: pointer;
}

.filter-text {
	font-size: 28rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	text-align: center;
}

.filter-icon {
	width: 20rpx;
	height: 20rpx;
}

.recommendations-section-inner {
	display: flex;
	width: 100%;
	align-items: stretch;
	gap: 12rpx;
	padding: 20rpx;
	background-color: #ffffff;
	border-radius: 12rpx;
	box-sizing: border-box;
	overflow: hidden;
}

.large-card {
	flex: 1;
	min-width: 0;
	height: 300rpx;
	border: 0;
	box-shadow: none;
	background: linear-gradient(180deg, rgba(246, 246, 246, 1) 0%, rgba(255, 255, 255, 1) 100%);
	border-radius: 8rpx;
	overflow: hidden;
	box-sizing: border-box;
	cursor: pointer;
}

.card-content {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100%;
	align-items: flex-start;
	justify-content: flex-end;
	gap: 20rpx;
	padding: 24rpx;
	z-index: 10;
	box-sizing: border-box;
}

.card-icon {
	position: absolute;
	top: 14rpx;
	left: 76rpx;
	width: 176rpx;
	height: 176rpx;
	z-index: 1;
}

.card-info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-end;
	gap: 10rpx;
	width: 100%;
	min-width: 0;
	z-index: 10;
	box-sizing: border-box;
}

.card-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: 600;
	color: #1a1a1a;
	font-size: 28rpx;
	line-height: 1.2;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
}

.card-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
	text-align: left;
	line-height: 1.2;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
}

.small-cards {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 12rpx;
	flex: 1;
	min-width: 0;
	box-sizing: border-box;
}

.small-card {
	width: 100%;
	height: 144rpx;
	border: 0;
	box-shadow: none;
	background: linear-gradient(180deg, rgba(246, 246, 246, 1) 0%, rgba(255, 255, 255, 1) 100%);
	border-radius: 8rpx;
	box-sizing: border-box;
	overflow: hidden;
	cursor: pointer;
}

.small-card-content {
	display: flex;
	height: 100%;
	align-items: flex-end;
	justify-content: space-between;
	gap: 20rpx;
	padding: 24rpx;
	box-sizing: border-box;
}

.small-card-info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-end;
	gap: 10rpx;
	flex: 1;
	min-width: 0;
	box-sizing: border-box;
}

.small-card-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: 600;
	color: #1a1a1a;
	font-size: 28rpx;
	line-height: 1.2;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
}

.small-card-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
	text-align: left;
	line-height: 1.2;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
}

.small-card-icon {
	width: 88rpx;
	height: 88rpx;
	flex-shrink: 0;
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

