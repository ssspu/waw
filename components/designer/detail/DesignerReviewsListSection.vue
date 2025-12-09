<template>
	<view class="reviews-list-section">
		<!-- 评分详情卡片 -->
		<view class="rating-card">
			<view class="rating-content">
				<view class="rating-main">
					<view class="rating-score-section">
						<view class="score-row">
							<text class="score-value">{{ overallRating }}</text>
							<view class="score-level-wrapper">
								<text class="score-level">{{ ratingLevel }}</text>
							</view>
						</view>
						<view class="star-section">
							<view class="stars">
								<image
									v-for="(star, index) in 5"
									:key="index"
									class="star-icon"
									src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/star-1.svg"
									mode="aspectFit"
								></image>
							</view>
							<text class="review-count">{{ totalReviewCount }}条评价</text>
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
				
				<!-- 空数据状态 -->
				<view v-if="!loading && filteredReviews.length === 0" class="empty-state">
					<image class="empty-icon" src="/static/icon/empty-review.png" mode="aspectFit"></image>
					<text class="empty-text">暂无点评内容</text>
				</view>

				<!-- 加载状态 -->
				<view v-if="loading" class="loading-state">
					<text class="loading-text">加载中...</text>
				</view>

				<!-- 点评列表 -->
				<view v-if="!loading && filteredReviews.length > 0" class="reviews-list">
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
										:src="review.userAvatar || 'https://c.animaapp.com/mi5kx1ohxTkA7e/img/ellipse-34.svg'"
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
												src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/star-1.svg" 
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
								v-for="(image, imgIndex) in review.images"
								:key="imgIndex"
								class="review-image"
								:src="image"
								mode="aspectFill"
								@tap="handleImageClick(review.images, image)"
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
		designerId: {
			type: [String, Number],
			default: null
		},
		activeSubTab: {
			type: String,
			default: 'all'
		}
	},
	data() {
		return {
			loading: false,
			reviewType: 'all', // 评价类型：all, with-image, bad
			activeFilterIndex: 0,
			overallRating: 0,
			ratingLevel: '',
			totalReviewCount: 0,
			ratingCategories: [],
			filterTags: [],
			reviews: []
		}
	},
	watch: {
		designerId: {
			immediate: true,
			handler(newVal) {
				if (newVal) {
					this.fetchReviews()
				}
			}
		},
		activeSubTab: {
			immediate: true,
			handler(newVal) {
				// 子tab切换时根据类型筛选评价
				this.reviewType = newVal
				// 重置筛选索引
				this.activeFilterIndex = 0
				if (this.designerId) {
					this.fetchReviews()
				}
			}
		}
	},
	computed: {
		currentFilter() {
			// 计算当前选中的筛选类型
			if (!this.filterTags || this.filterTags.length === 0) {
				return 'all'
			}
			const tag = this.filterTags[this.activeFilterIndex]
			return tag ? tag.filter : 'all'
		},
		filteredReviews() {
			// 根据筛选类型过滤评价列表
			if (this.currentFilter === 'all') {
				return this.reviews
			}
			return this.reviews.filter(review => {
				return review.tags && review.tags.includes(this.currentFilter)
			})
		}
	},
	methods: {
		// 获取评价列表
		async fetchReviews() {
			if (!this.designerId || this.loading) return
			this.loading = true
			try {
				const res = await api.designer.getReviews(this.designerId, {
					reviewType: this.reviewType, // 传递评价类型参数（全部/有图/差评）
					page: 1,
					pageSize: 20
				})
				if (res.code === 0) {
					const data = res.data
					const list = data.list || data.records || []
					// 转换评价数据格式
					this.reviews = list.map(r => ({
						id: r.id,
						userName: r.userName,
						userAvatar: r.userAvatar,
						rating: r.rating,
						date: r.time,
						content: r.content,
						images: r.images || [],
						reply: r.reply,
						tags: r.tags || []
					}))
					// 更新评分统计
					if (data.ratingStats) {
						const stats = data.ratingStats
						this.overallRating = stats.overall
						this.ratingLevel = stats.level
						this.totalReviewCount = stats.totalCount
						this.ratingCategories = stats.categories || []
						this.filterTags = stats.filterTags || []
					}
				}
			} catch (err) {
				console.error('获取评价列表失败:', err)
			} finally {
				this.loading = false
			}
		},
		handleTagClick(index) {
			// 只更新筛选索引，通过计算属性 filteredReviews 进行前端筛选
			if (index >= 0 && index < this.filterTags.length) {
				this.activeFilterIndex = index
			}
		},
		handleImageClick(images, currentImage) {
			if (images && images.length > 0) {
				uni.previewImage({
					urls: images,
					current: currentImage
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
	width: 20.74rpx;
	height: 19.82rpx;
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
	width: 20rpx;
	height: 20rpx;
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

/* 空数据和加载状态 */
.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 80rpx 40rpx;
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	box-sizing: border-box;
}

.empty-icon {
	width: 160rpx;
	height: 160rpx;
	margin-bottom: 24rpx;
	opacity: 0.6;
}

.empty-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #a6a6a6;
}

.loading-state {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60rpx 0;
	width: 100%;
}

.loading-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #a6a6a6;
}
</style>

