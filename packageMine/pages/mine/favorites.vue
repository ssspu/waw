<template>
	<view class="favorites-page">
		<view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
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
import FavoriteCard from '../../../components/mine/FavoriteCard.vue'

export default {
	name: 'MineFavoritesPage',
	components: {
		FavoriteCard
	},
	data() {
		return {
			statusBarHeight: 44,
			favorites: [
				{
					id: 1,
					name: '洗吹',
					description: '水洗+按摩+造型',
					duration: '1小时',
					distance: '距离1.2km',
					price: 799,
					cover: '/static/mine/favorites/rectangle-169.png',
					stylist: {
						name: '李天天',
						title: '资深设计师',
						rating: '4.9',
						reviews: '128',
						location: '成都市锦江区新...',
						distance: '2.5km'
					}
				},
				{
					id: 2,
					name: '洗吹',
					description: '水洗+按摩+造型',
					duration: '1小时',
					distance: '距离1.2km',
					price: 799,
					cover: '/static/mine/favorites/rectangle-169.png',
					stylist: {
						name: '李天天',
						title: '资深设计师',
						rating: '4.9',
						reviews: '128',
						location: '成都市锦江区新...',
						distance: '2.5km'
					}
				},
				{
					id: 3,
					name: '洗吹',
					description: '水洗+按摩+造型',
					duration: '1小时',
					distance: '距离1.2km',
					price: 799,
					cover: '/static/mine/favorites/rectangle-169.png',
					stylist: {
						name: '李天天',
						title: '资深设计师',
						rating: '4.9',
						reviews: '128',
						location: '成都市锦江区新...',
						distance: '2.5km'
					}
				},
				{
					id: 4,
					name: '洗吹',
					description: '水洗+按摩+造型',
					duration: '1小时',
					distance: '距离1.2km',
					price: 799,
					cover: '/static/mine/favorites/rectangle-169.png',
					stylist: {
						name: '李天天',
						title: '资深设计师',
						rating: '4.9',
						reviews: '128',
						location: '成都市锦江区新...',
						distance: '2.5km'
					}
				}
			]
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
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
			// 删除对应的收藏数据
			const index = this.favorites.findIndex(f => f.id === item.id)
			if (index !== -1) {
				this.favorites.splice(index, 1)
				uni.showToast({
					title: '已取消收藏',
					icon: 'none'
				})
			}
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
	display: flex;
	flex-direction: column;
	gap: 20rpx;
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

