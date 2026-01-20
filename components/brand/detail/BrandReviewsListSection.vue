<template>
	<view class="reviews-list-section">
		<!-- 评分详情卡片 -->
		<view class="rating-card">
			<view class="rating-content">
				<view class="rating-main">
					<view class="rating-score-section">
						<view class="score-row">
							<text class="score-value">4.8</text>
							<view class="score-level-wrapper">
								<text class="score-level">很棒</text>
							</view>
						</view>
						<view class="star-section">
							<view class="stars">
								<image 
									v-for="(star, index) in 5" 
									:key="index"
									class="star-icon" 
									src="/static/icon/star.png" 
									mode="aspectFit"
								></image>
							</view>
							<text class="review-count">2345条评价</text>
						</view>
					</view>
					
					<view class="rating-categories">
						<view 
							v-for="(category, index) in ratingCategories" 
							:key="index" 
							class="category-item"
						>
							<text class="category-label">{{ category.label }}</text>
							<view class="progress-wrapper">
								<view class="progress-bg">
									<view 
										class="progress-fill" 
										:style="{ width: `${category.width}%` }"
									></view>
								</view>
							</view>
							<text class="category-value">{{ category.value }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 筛选标签卡片 -->
		<view class="filter-card">
			<view class="filter-content">
				<view class="filter-tags">
					<view 
						v-for="(tag, index) in filterTags" 
						:key="index" 
						class="filter-tag"
						:class="{ active: activeFilterIndex === index }"
						@tap="handleTagClick(index)"
					>
						<text class="tag-label">{{ tag.label }}</text>
						<text v-if="tag.count" class="tag-count">{{ tag.count }}</text>
					</view>
				</view>
				
				<!-- 点评列表 -->
				<view class="reviews-list">
					<view 
						v-for="review in filteredReviews" 
						:key="review.id" 
						class="review-item"
					>
						<view class="review-header">
							<view class="user-info">
								<view class="user-avatar">
									<image 
										class="avatar-img" 
										src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg" 
										mode="aspectFill"
									></image>
								</view>
								<view class="user-details">
									<text class="user-name">{{ review.userName }}</text>
									<view class="user-rating">
										<text class="rating-score">{{ review.rating }}</text>
										<view class="review-stars">
											<image 
												v-for="(star, index) in 5" 
												:key="index"
												class="star-small" 
												src="/static/icon/star.png" 
												mode="aspectFit"
											></image>
										</view>
									</view>
								</view>
							</view>
							<text class="review-date">{{ review.date }}</text>
						</view>
						
						<text class="review-content">{{ review.content }}</text>
						
						<view class="review-images">
							<image 
								v-for="(image, index) in review.images" 
								:key="index"
								class="review-image" 
								:class="{ 'tall': review.id === 3 && index === 2 }"
								:src="image" 
								mode="aspectFill"
								@tap="handleImageClick(image, index)"
							></image>
						</view>
						
						<view v-if="review.reply" class="reply-section">
							<text class="reply-label">回复:</text>
							<text class="reply-content">{{ review.reply }}</text>
						</view>
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
		brandId: {
			type: [String, Number],
			default: null
		}
	},
	data() {
		return {
			activeFilterIndex: 0,
			loading: false,
			overallRating: 4.8,
			reviewCount: 0,
			ratingCategories: [
				{ label: "专业", value: 0, width: 0 },
				{ label: "服务", value: 0, width: 0 },
				{ label: "效果", value: 0, width: 0 },
				{ label: "环境", value: 0, width: 0 }
			],
			filterTags: [
				{ label: "全部", count: null, filter: 'all' },
				{ label: "技术很好", count: 0, filter: 'skill' },
				{ label: "效果满意", count: 0, filter: 'effect' },
				{ label: "服务态度", count: 0, filter: 'service' }
			],
			reviews: []
		}
	},
	computed: {
		filteredReviews() {
			const currentFilter = this.filterTags[this.activeFilterIndex].filter
			if (currentFilter === 'all') {
				return this.reviews
			}
			return this.reviews.filter(review => review.tags && review.tags.includes(currentFilter))
		}
	},
	mounted() {
		this.fetchReviews()
	},
	methods: {
		
		async fetchReviews() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.brand.getReviews(this.brandId, { pageSize: 50 })
				if (res.code === 200 && res.data) {
					const data = res.data
					
					if (data.overallRating) {
						this.overallRating = data.overallRating
					}
					if (data.total) {
						this.reviewCount = data.total
					}
					
					if (data.categoryRatings) {
						this.ratingCategories = data.categoryRatings.map(cat => ({
							label: cat.label,
							value: cat.value,
							width: Math.round((cat.value / 5) * 100)
						}))
					}
					
					if (data.tagCounts) {
						this.filterTags = [
							{ label: "全部", count: null, filter: 'all' },
							...data.tagCounts.map(tag => ({
								label: tag.label,
								count: tag.count,
								filter: tag.filter
							}))
						]
					}
					
					const list = data.list || data.records || []
					this.reviews = list.map(review => ({
						id: review.id,
						userName: review.userName || review.nickname,
						userAvatar: review.userAvatar || review.avatar,
						rating: review.rating || 5.0,
						date: review.date || review.createTime,
						content: review.content,
						images: review.images || [],
						reply: review.reply,
						tags: review.tags || []
					}))
				}
			} catch (err) {
				console.error('获取品牌馆评价失败:', err)
			} finally {
				this.loading = false
			}
		},
		handleTagClick(index) {
			this.activeFilterIndex = index
		},
		handleImageClick(image, index) {
			const review = this.filteredReviews[index]
			if (review && review.images) {
				uni.previewImage({
					urls: review.images,
					current: image
				})
			}
		}
	}
}
</script>

<style scoped lang="scss">
.reviews-list-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: stretch;
	gap: 16rpx;
	padding: 0 12rpx;
	box-sizing: border-box;
}

.rating-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-sizing: border-box;
}

.rating-content {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20rpx;
	padding: 34rpx 44rpx;
	box-sizing: border-box;
}

.rating-main {
	display: flex;
	align-items: center;
	gap: 68rpx;
}

.rating-score-section {
	display: flex;
	flex-direction: column;
	width: 164rpx;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
}

.score-row {
	display: flex;
	align-items: flex-end;
	justify-content: center;
	gap: 8rpx;
	width: 100%;
}

.score-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 54rpx;
}

.score-level-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10rpx 0;
}

.score-level {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
	text-align: center;
}

.star-section {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.stars {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.star-icon {
	width: 24rpx;
	height: 24rpx;
}

.review-count {
	color: #a6a6a6;
	font-size: 24rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
}

.rating-categories {
	display: flex;
	flex-direction: column;
	width: 388rpx;
	align-items: flex-start;
	gap: 8rpx;
}

.category-item {
	display: flex;
	align-items: center;
	gap: 16rpx;
	width: 100%;
}

.category-label {
	width: fit-content;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 22rpx;
	text-align: center;
	flex-shrink: 0;
}

.progress-wrapper {
	display: flex;
	flex-direction: column;
	width: 276rpx;
	height: 12rpx;
	align-items: flex-start;
	gap: 20rpx;
}

.progress-bg {
	width: 100%;
	height: 12rpx;
	background-color: rgba(255, 168, 124, 0.12);
	border-radius: 22rpx;
	position: relative;
}

.progress-fill {
	height: 12rpx;
	background-color: #ffa77b;
	border-radius: 22rpx;
	position: absolute;
	top: 0;
	left: 0;
}

.category-value {
	width: fit-content;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 24rpx;
	text-align: center;
	flex-shrink: 0;
}

.filter-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-sizing: border-box;
}

.filter-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 24rpx;
	padding: 20rpx;
	box-sizing: border-box;
}

.filter-tags {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: 12rpx;
	width: 100%;
}

.filter-tag {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	padding: 8rpx 20rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	cursor: pointer;
	transition: background-color 0.3s;
}

.filter-tag:active {
	background-color: #e6e6e6;
}

.filter-tag.active {
	.tag-label, .tag-count {
		color: #333333;
		font-weight: 500;
	}
}

.tag-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #a6a6a6;
	font-size: 26rpx;
	font-weight: normal;
}

.tag-count {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #a6a6a6;
	font-size: 24rpx;
	font-weight: normal;
}

.reviews-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 48rpx;
	width: 100%;
}

.review-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 16rpx;
	width: 100%;
}

.review-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
}

.user-info {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.user-avatar {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	overflow: hidden;
	flex-shrink: 0;
}

.avatar-img {
	width: 100%;
	height: 100%;
}

.user-details {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.user-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
}

.user-rating {
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

.review-stars {
	display: flex;
	align-items: center;
	gap: 2rpx;
}

.star-small {
	width: 16rpx;
	height: 16rpx;
}

.review-date {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
	flex-shrink: 0;
}

.review-content {
	width: 100%;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
	line-height: 36rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	word-break: break-all;
}

.review-images {
	display: flex;
	align-items: center;
	gap: 12rpx;
	flex-wrap: wrap;
}

.review-image {
	width: 160rpx;
	height: 160rpx;
	border-radius: 6rpx;
	object-fit: cover;
	
	&.tall {
		height: 122rpx;
	}
}

.reply-section {
	display: flex;
	align-items: flex-start;
	gap: 4rpx;
	padding: 12rpx 20rpx;
	width: 100%;
	background-color: #f6f6f6;
	border-radius: 8rpx;
	box-sizing: border-box;
}

.reply-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 20rpx;
	line-height: 32rpx;
	white-space: nowrap;
	flex-shrink: 0;
}

.reply-content {
	flex: 1;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 20rpx;
	line-height: 32rpx;
}
</style>

