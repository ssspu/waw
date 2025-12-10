<template>
	<view class="favorites-page">
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
import api from '@/api'

export default {
	name: 'MineFavoritesPage',
	components: {
		FavoriteCard
	},
	data() {
		return {
			favorites: [],
			loading: false
		}
	},
	onLoad() {
		this.fetchFavorites()
	},
	methods: {
		// 获取收藏列表
		async fetchFavorites() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.user.getFavorites({ page: 1, pageSize: 20 })
				if (res.code === 0 && res.data) {
					const list = res.data.list || res.data.records || []
					// 转换数据格式
					this.favorites = list.map(item => ({
						id: item.id,
						name: item.name || item.serviceName,
						description: item.description,
						duration: item.duration || '1小时',
						distance: item.distance || '距离1.2km',
						price: item.price,
						cover: item.image || item.cover,
						stylist: {
							name: item.designerName,
							title: item.designerLevel || '设计师',
							rating: String(item.rating || 4.9),
							reviews: String(item.reviewCount || 0),
							location: item.address || '',
							distance: item.designerDistance || ''
						}
					}))
				}
			} catch (err) {
				console.error('获取收藏列表失败:', err)
			} finally {
				this.loading = false
			}
		},
		async handleUnfavorite(item) {
			try {
				// 调用API取消收藏
				const res = await api.user.batchUnfavorite({ ids: [item.id] })
				if (res.code === 0) {
					// 从本地列表中移除
					const index = this.favorites.findIndex(f => f.id === item.id)
					if (index !== -1) {
						this.favorites.splice(index, 1)
					}
					uni.showToast({
						title: '已取消收藏',
						icon: 'none'
					})
				}
			} catch (err) {
				console.error('取消收藏失败:', err)
				uni.showToast({
					title: '操作失败',
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

