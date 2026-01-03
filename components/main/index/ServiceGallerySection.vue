<template>
	<view id="service-gallery-section" class="service-gallery-section animate-fade-in" style="animation-delay: 500ms;">
		<!-- 附近推荐标题 -->
		<view v-if="showNearbyHeader" class="nearby-header">
			<view class="title-wrapper">
				<text class="nearby-title">附近推荐</text>
				<view class="title-bar"></view>
			</view>
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
							<text class="appointment-price-tag">预约价 ¥{{ card.appointmentPrice || card.price }}</text>
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
									<view class="star-container">
										<image class="star-icon" src="/static/icon/star.png" mode="aspectFit"></image>
									</view>
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
import { calculateDistance, getCurrentLocation } from '@/utils/location.js'

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
			serviceCards: [],
			loading: false,
			userLatitude: null,
			userLongitude: null
		}
	},
	mounted() {
		this.getUserLocation()
		this.fetchServices()
	},
	methods: {
		async getUserLocation() {
			try {
				const location = await getCurrentLocation()
				if (location) {
					this.userLatitude = location.latitude
					this.userLongitude = location.longitude
					// 如果已经加载了数据，更新距离
					if (this.serviceCards.length > 0) {
						this.fetchServices()
					}
				}
			} catch (err) {
				console.error('获取位置失败:', err)
			}
		},
		
		async fetchServices() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.service.getList({ pageSize: 50 })
				if (res && res.code === 200 && res.data) {
					const list = res.data.items || res.data.list || res.data.records || []

					this.serviceCards = list.map(service => {
						const image = Array.isArray(service.image_urls) && service.image_urls.length > 0
							? service.image_urls[0]
							: (service.image || '')

						// 计算距离
						let distance = ''
						if (this.userLatitude && this.userLongitude && service.latitude && service.longitude) {
							distance = calculateDistance(this.userLatitude, this.userLongitude, service.latitude, service.longitude)
						} else {
							distance = service.distance || '2.5km'
						}

						// 从 skus 数组获取价格
						const firstSku = Array.isArray(service.skus) && service.skus.length > 0 ? service.skus[0] : {}
						const skuSellPrice = firstSku.sell_price || firstSku.price || ''
						const skuRefPrice = firstSku.ref_price || ''

						return {
							id: service.id,
							category: service.categoryName || service.category_id,
							image: image,
							title: service.name,
							description: service.detail_text || service.description || '',
							// price 为原价（ref_price），appointmentPrice 为销售价（sell_price）
							price: String(skuRefPrice || service.fixed_ref_price || skuSellPrice || service.fixed_price || 0),
							appointmentPrice: String(skuSellPrice || service.fixed_price || skuRefPrice || service.fixed_ref_price || 0),
							stylist: {
								name: service.designer_name || '',
								role: '设计师',
								avatar: ''
							},
							rating: String(service.rating || 0),
							reviews: String(service.review_count || service.reviewCount || 0),
							distance: distance
						}
					})
				}
			} catch (err) {
				console.error('获取服务列表失败:', err)
			} finally {
				this.loading = false
			}
		},
		
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
			
			uni.navigateTo({
				url: `/packageOrder/pages/order/purchase?id=${card.id}`
			})
		}
	},
	computed: {
		
		displayTitle() {
			return this.selectedCategory || '优服务'
		},
		
		filteredServiceCards() {
			if (!this.selectedCategory) {
				
				return this.serviceCards
			}
			
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
	font-weight: 600;
	color: #000000;
	font-size: 28rpx;
	position: relative;
	z-index: 2;
}

.title-wrapper {
	display: flex;
	flex-direction: column;
}

.title-bar {
	width: 74rpx;
	height: 12rpx;
	background-color: #DACBB1;
	margin-top: -14rpx;
	position: relative;
	z-index: 1;
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
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
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

.appointment-price-tag {
	font-family: 'PingFang_SC-Regular', Helvetica;
	background-color: #dacbb1;
	font-size: 20rpx;
	color: #645E57;
	padding: 2rpx 8rpx;
	border-radius: 4rpx;
	margin-left: 12rpx;
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
	align-items: baseline;
	gap: 8rpx;
	flex-wrap: nowrap;
	white-space: nowrap;
}

.stylist-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 22rpx;
	flex-shrink: 0;
}

.stylist-role {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	white-space: nowrap;
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

.star-container {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4rpx;
	background-color: #333333;
	border-radius: 4rpx;
}

.star-icon {
	width: 20rpx;
	height: 20rpx;
	filter: brightness(0) invert(1);
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
	font-size: 20rpx;
	white-space: nowrap;
	flex-shrink: 0;
}


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
