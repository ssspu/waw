<template>
	<view class="favorites-page">
		<view class="status-bar-space"></view>
		<view class="navbar">
			<view class="navbar-content">
				<view class="back-btn" @tap="handleBack">
					<image class="back-icon" src="/static/mine/favorites/vector.svg" mode="aspectFit"></image>
				</view>
				<text class="navbar-title">我的收藏</text>
			</view>
		</view>

		<view class="favorites-list">
			<favorite-card
				v-for="item in favorites"
				:key="item.id"
				:item="item"
				mode="favorite"
				@unfavorite="handleUnfavorite"
			/>
			<view class="safe-area-spacer"></view>
		</view>

		<view class="home-indicator">
			<!-- <view class="indicator-bar"></view> -->
		</view>
	</view>
</template>

<script>
import FavoriteCard from '../../components/mine/FavoriteCard.vue'

export default {
	name: 'MineFavoritesPage',
	components: {
		FavoriteCard
	},
	data() {
		return {
			favorites: [
				{
					id: 1,
					name: '洗吹',
					description: '水洗+按摩+造型',
					duration: '1小时',
					distance: '距离1.2km',
					price: 799,
					cover: '/static/mine/favorites/rectangle-169.png'
				},
				{
					id: 2,
					name: '洗吹',
					description: '水洗+按摩+造型',
					duration: '1小时',
					distance: '距离1.2km',
					price: 799,
					cover: '/static/mine/favorites/rectangle-169.png'
				},
				{
					id: 3,
					name: '洗吹',
					description: '水洗+按摩+造型',
					duration: '1小时',
					distance: '距离1.2km',
					price: 799,
					cover: '/static/mine/favorites/rectangle-169.png'
				},
				{
					id: 4,
					name: '洗吹',
					description: '水洗+按摩+造型',
					duration: '1小时',
					distance: '距离1.2km',
					price: 799,
					cover: '/static/mine/favorites/rectangle-169.png'
				}
			]
		}
	},
	methods: {
		handleBack() {
			if (getCurrentPages().length > 1) {
				uni.navigateBack()
			} else {
				uni.switchTab({ url: '/pages/mine/index' })
			}
		},
		handleUnfavorite(item) {
			uni.showToast({
				title: `已取消 ${item.name}`,
				icon: 'none'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.favorites-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
}

.navbar {
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
}
.favorite-card.favorite-card--favorite {
	margin: 15rpx 0;
}
.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 88rpx;
	padding: 0 30rpx;
	position: relative;
}

.back-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
}

.navbar-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

.favorites-list {
	flex: 1;
	width: 100%;
	padding: 20rpx 24rpx 0;
	box-sizing: border-box;
}

.safe-area-spacer {
	height: 40rpx;
}

.home-indicator {
	display: flex;
	justify-content: center;
	padding: 20rpx 0 30rpx;
}

.indicator-bar {
	width: 200rpx;
	height: 8rpx;
	border-radius: 100rpx;
	background: #000;
	opacity: 0.2;
}
</style>

