<template>
	<view id="service-gallery-section" class="service-gallery-section">
		<!-- 附近推荐标题 -->
		<view v-if="showNearbyHeader" class="nearby-header">
			<text class="nearby-title">附近推荐</text>
		</view>

		<!-- 分类标题 -->
		<view v-if="showCategoryHeader" class="category-header">
			<image class="header-icon" src="https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2.svg" mode="aspectFit"></image>
			<text class="header-title">{{ displayTitle }}</text>
		</view>

		<!-- 服务卡片网格 -->
		<view v-if="loading" class="loading-state">
			<text>加载中...</text>
		</view>
		<view v-else-if="filteredServiceCards.length === 0" class="empty-state">
			<text>暂无服务数据</text>
		</view>
		<view v-else class="service-grid">
			<view
				v-for="(card, index) in filteredServiceCards"
				:key="card.id"
				class="service-card"
				@tap="handleCardClick(card)"
			>
				<image
					class="card-image"
					:src="card.image"
					:alt="card.title"
					mode="aspectFill"
				></image>

				<view class="card-info">
					<view class="card-header">
						<text class="card-title">{{ card.title }}</text>
						<text class="card-description">{{ card.description }}</text>
						<view class="card-price">
							<text class="price-symbol">¥</text>
							<text class="price-value">{{ card.price }}</text>
						</view>
					</view>

					<view class="card-footer">
						<view class="stylist-info">
							<view class="stylist-avatar">
								<image
									class="avatar-image"
									:src="card.stylist.avatar"
									:alt="card.stylist.name"
									mode="aspectFill"
								></image>
							</view>
							<view class="stylist-details">
								<view class="stylist-name-row">
									<text class="stylist-name">{{ card.stylist.name }}</text>
									<text class="stylist-role">{{ card.stylist.role }}</text>
								</view>
								<view class="stylist-rating">
									<text class="rating-score">{{ card.rating }}</text>
									<text class="star-icon">★</text>
									<text class="review-count">({{ card.reviews }})</text>
								</view>
							</view>
						</view>
						<text class="card-distance">{{ card.distance }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'

export default {
	props: {
		showCategoryHeader: {
			type: Boolean,
			default: true
		},
		showNearbyHeader: {
			type: Boolean,
			default: true
		},
		selectedCategory: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			// 从API获取的服务数据
			serviceCards: [],
			loading: false
		}
	},
	mounted() {
		this.fetchServices()
	},
	methods: {
		// 从API获取服务列表
		async fetchServices() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.service.getList({ pageSize: 50 })
				console.log('API响应:', JSON.stringify(res, null, 2))
				if (res && res.code === 0 && res.data) {
					// 支持 list 或 records 字段
					const list = res.data.list || res.data.records || []
					console.log('第一条数据:', list[0])
					console.log('第一条图片URL:', list[0]?.image)
					// 转换API数据为组件需要的格式
					this.serviceCards = list.map(service => ({
						id: service.id,
						category: service.categoryName,
						image: service.image || '',
						title: service.name,
						description: service.description,
						price: String(service.price),
						stylist: {
							name: service.designerName,
							role: '设计师',
							avatar: service.designerAvatar || ''
						},
						rating: String(service.rating),
						reviews: String(service.reviewCount),
						distance: service.distance
					}))
					console.log('转换后第一条:', this.serviceCards[0])
				}
			} catch (err) {
				console.error('获取服务列表失败:', err)
			} finally {
				this.loading = false
			}
		},
		// 供父组件调用的滚动方法
		scrollToTop() {
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this)
				query.select('#service-gallery-section').boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec((res) => {
					if (res && res[0] && res[1]) {
						const elementRect = res[0]
						const scrollOffset = res[1]
						uni.pageScrollTo({
							scrollTop: scrollOffset.scrollTop + elementRect.top,
							duration: 100
						})
					}
				})
			})
		},
		handleCardClick(card) {
			// 跳转到服务订单购买页面，并传递服务卡片的 id
			uni.navigateTo({
				url: `/pages/order/purchase?id=${card.id}`
			})
		}
	},
	computed: {
		// 显示的标题
		displayTitle() {
			return this.selectedCategory || '优服务'
		},
		// 根据选中的分类筛选服务卡片
		filteredServiceCards() {
			if (!this.selectedCategory) {
				// 没有选择分类时显示全部
				return this.serviceCards
			}
			// 根据分类筛选
			return this.serviceCards.filter(card => card.category === this.selectedCategory)
		}
	}
}
</script>

<style scoped lang="scss">
.service-gallery-section {
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	padding: 0 12rpx;
	box-sizing: border-box;
}

.loading-state,
.empty-state {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60rpx 0;
	color: #a6a6a6;
	font-size: 28rpx;
}

.nearby-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 0 8rpx;
	margin-bottom: 16rpx;
	box-sizing: border-box;
}

.nearby-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.category-header {
	display: flex;
	align-items: center;
	gap: 12rpx;
	padding: 0 20rpx;
	height: 60rpx;
	background-image: url('https://c.animaapp.com/mi5bcgvrGbkedE/img/subtract.svg');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.header-icon {
	width: 28rpx;
	height: 28rpx;
}

.header-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #dacbb1;
	font-size: 28rpx;
}

.service-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 12rpx;
	margin-top: 10rpx;
	width: 100%;
	box-sizing: border-box;
}

.service-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 8rpx;
	border: 0;
	box-shadow: none;
	box-sizing: border-box;
	overflow: hidden;
}

.card-image {
	width: 100%;
	height: 358rpx;
	border-radius: 8rpx 8rpx 0 0;
	object-fit: cover;
}

.card-info {
	display: flex;
	flex-direction: column;
	gap: 14rpx;
	padding: 16rpx;
}

.card-header {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
}

.card-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 32rpx;
}

.card-description {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.card-price {
	display: flex;
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

.card-footer {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
}

.stylist-info {
	display: flex;
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
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.stylist-name-row {
	display: flex;
	align-items: flex-start;
	gap: 8rpx;
}

.stylist-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 22rpx;
}

.stylist-role {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.stylist-rating {
	display: flex;
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
	font-size: 20rpx;
	color: #333333;
}

.review-count {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
}

.card-distance {
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
