<template>
	<view class="service-gallery-section">
		<!-- 分类标题 -->
		<view v-if="showCategoryHeader" class="category-header">
			<image class="header-icon" src="https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2.svg" mode="aspectFit"></image>
			<text class="header-title">优服务</text>
		</view>
		
		<!-- 服务卡片网格 -->
		<view class="service-grid">
			<view 
				v-for="(card, index) in serviceCards" 
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
		categoryId: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			loading: false,
			page: 1,
			pageSize: 20,
			hasMore: true,
			serviceCards: [],
		}
	},
	mounted() {
		this.fetchServices()
	},
	methods: {
		// 获取服务列表
		async fetchServices() {
			if (this.loading) return
			this.loading = true
			try {
				const params = {
					page: this.page,
					pageSize: this.pageSize
				}
				if (this.categoryId) {
					params.categoryId = this.categoryId
				}
				const res = await api.service.getList(params)
				if (res.code === 0) {
					const list = (res.data.list || []).map(s => this.transformService(s))
					if (this.page === 1) {
						this.serviceCards = list
					} else {
						this.serviceCards = [...this.serviceCards, ...list]
					}
					this.hasMore = res.data.hasMore
				}
			} catch (err) {
				console.error('获取服务列表失败:', err)
			} finally {
				this.loading = false
			}
		},
		// 转换服务数据 - 对应mock数据 services
		transformService(s) {
			return {
				id: s.id,
				image: s.image,
				title: s.name,
				description: s.description || `${s.categoryName || ''}服务`,
				price: String(s.price || 0),
				stylist: {
					name: s.designerName || s.brandName || '设计师',
					role: s.categoryName || '美发服务',
					avatar: s.designerAvatar || 'https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg',
				},
				rating: String(s.rating || 4.8),
				reviews: String(s.reviewCount || 0),
				distance: s.distance || ''
			}
		},
		handleCardClick(card) {
		// 跳转到服务订单购买页面，并传递服务卡片的 id
		uni.navigateTo({
			url: `/pages/order/purchase?id=${card.id}`
		})
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

