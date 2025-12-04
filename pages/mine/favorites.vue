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
import FavoriteCard from '../../components/mine/FavoriteCard.vue'
import api from '@/api'

export default {
	name: 'MineFavoritesPage',
	components: {
		FavoriteCard
	},
	data() {
		return {
			statusBarHeight: 44,
			favorites: [],
			loading: false
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
		this.fetchFavorites()
	},
	methods: {
		async fetchFavorites() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.user.getFavorites({ page: 1, pageSize: 20 })
				if (res.code === 0) {
					const list = res.data.list || res.data.records || []
					this.favorites = list.map(item => ({
						id: item.id,
						name: item.name,
						description: item.description,
						duration: item.duration,
						distance: item.distance,
						price: item.price,
						cover: item.cover
					}))
				}
			} catch (err) {
				console.error('获取收藏列表失败:', err)
				uni.showToast({ title: '获取收藏列表失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		handleBack() {
			if (getCurrentPages().length > 1) {
				uni.navigateBack()
			} else {
				uni.switchTab({ url: '/pages/mine/index' })
			}
		},
		async handleUnfavorite(item) {
			try {
				const res = await api.user.batchUnfavorite({ ids: [item.id], type: 'service' })
				if (res.code === 0) {
					this.favorites = this.favorites.filter(f => f.id !== item.id)
					uni.showToast({ title: '已取消收藏', icon: 'success' })
				}
			} catch (err) {
				uni.showToast({ title: '操作失败', icon: 'none' })
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

