<template>
	<view class="profile-section">
		<!-- 价格卡片 -->
		<view class="price-card card-item full-width">
			<view class="card-content">
				<view class="price-info">
					<view class="price-row">
						<text class="currency-symbol">¥</text>
						<text class="price-value">{{ price }}</text>
						<text class="appointment-price-tag">预约价 ¥{{ appointmentPrice }}</text>
					</view>
					<text class="sold-count">已售{{ soldCount }}</text>
				</view>
				<view class="service-info-row">
					<view class="service-text-info">
						<text class="service-title">{{ serviceTitle }}</text>
						<view v-if="coupons.length > 0" class="coupon-row">
							<image
								class="coupon-icon"
								src="https://c.animaapp.com/mifnbli6udxphC/img/frame-5.svg"
								mode="aspectFit"
							></image>
							<view class="coupon-badges">
								<view v-for="coupon in coupons" :key="coupon.id" class="coupon-badge">
									<text class="coupon-text">{{ coupon.text }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="favorite-btn" @tap="handleFavorite">
						<image
							class="favorite-icon"
							:class="{ 'is-favorited': isFavorited }"
							src="https://c.animaapp.com/mifnbli6udxphC/img/frame-6.svg"
							mode="aspectFit"
						></image>
						<text class="favorite-text">收藏</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 预约优惠卡片 -->
		<view class="appointment-card card-item full-width">
			<view class="card-content">
				<view class="appointment-content">
					<view class="appointment-info">
						<view class="appointment-text-wrapper">
							<text class="appointment-title">预约优惠专家</text>
							<text class="appointment-desc">即可享受10%以上的项目服务优惠！</text>
						</view>
					</view>
					<view class="view-appointment-btn" @tap="handleViewAppointment">
						<text class="btn-gradient-text">查看预约</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 设计师信息卡片 -->
		<view class="designer-card card-item full-width">
			<view class="card-content designer-content">
				<view class="designer-info-row">
					<image
						class="designer-avatar"
						:src="designer.avatar"
						mode="aspectFill"
					></image>
					<view class="designer-details">
						<view class="designer-name-row">
							<text class="designer-name">{{ designer.name }}</text>
							<view v-if="designer.level" class="designer-level-badge">
								<text class="level-text">{{ designer.level }}</text>
							</view>
							<view v-if="designer.badge" class="designer-badge">
								<text class="badge-text">{{ designer.badge }}</text>
							</view>
						</view>
						<view class="designer-meta">
							<text class="designer-role">{{ designer.role }}</text>
							<text class="meta-divider">｜</text>
							<text class="designer-work-years">从业{{ designer.workYears || 6 }}年</text>
						</view>
						<view class="designer-stats">
							<view class="rating-info">
								<text class="rating-value">{{ designer.rating }}</text>
								<view class="star-badge">
									<image
										class="star-icon"
										src="/static/icon/star.png"
										mode="aspectFit"
									></image>
								</view>
							</view>
							<view class="stats-row">
								<view class="stat-item">
									<text class="stat-label">服务</text>
									<text class="stat-value">{{ designer.serviceCount }}</text>
								</view>
								<text class="stat-divider">｜</text>
								<view class="stat-item">
									<text class="stat-label">作品</text>
									<text class="stat-value">{{ designer.worksCount }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="enter-store-btn" @tap="handleEnterStore">
						<text class="enter-store-text">进入店铺</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 服务内容卡片 -->
		<view v-if="serviceItems.length > 0" class="service-content-card card-item">
			<view class="card-content">
				<text class="section-title">服务内容</text>
				<view class="service-list">
					<view
						v-for="(item, index) in serviceItems"
						:key="index"
						class="service-item-wrapper"
					>
						<view class="service-item-row">
							<text class="service-item-name">{{ item.name }}</text>
							<text class="service-item-quantity">{{ item.quantity }}</text>
						</view>
						<view v-if="index < serviceItems.length - 1" class="separator"></view>
					</view>
				</view>
			</view>
		</view>


		<!-- 温馨提示卡片 -->
		<view v-if="warmTips.length > 0" class="tips-card card-item">
			<view class="card-content">
				<text class="section-title">温馨提示</text>
				<view class="tips-list">
					<text
						v-for="(item, index) in warmTips"
						:key="index"
						class="tips-text"
					>{{ item }}</text>
				</view>
			</view>
		</view>

		<!-- 图文详情卡片 -->
		<view v-if="allImages.length > 0" class="detail-images-card card-item">
			<view class="card-content detail-images-content">
				<text class="section-title">图文详情</text>
				<view class="images-container" :class="{ 'expanded': showMoreImages }">
					<image
						v-for="(image, index) in displayImages"
						:key="index"
						class="detail-image"
						:src="image"
						mode="aspectFill"
					></image>
				</view>
				<view v-if="allImages.length > 2" class="view-more-btn" @tap="handleViewMore">
					<text class="view-more-text">{{ showMoreImages ? '收起' : '查看更多图文详情' }}</text>
					<image
						class="chevron-icon"
						:class="{ 'rotated': showMoreImages }"
						src="https://bioflex.cn/static/icon/down.png"
						mode="aspectFit"
					></image>
				</view>
			</view>
		</view>

		<!-- 服务须知卡片 - 暂时注释 -->
		<!-- <view class="service-notice-card card-item">
			<view class="card-content">
				<text class="section-title">服务须知</text>
				<view class="notice-list">
					<text
						v-for="(item, index) in serviceNotices"
						:key="index"
						class="notice-text"
					>{{ item }}</text>
				</view>
			</view>
		</view> -->

		<!-- 顾客点评卡片 -->
		<view v-if="reviews.length > 0" class="reviews-card card-item">
			<view class="card-header">
				<text class="card-title">顾客点评</text>
				<view class="more-btn" @tap="handleViewAllReviews">
					<text class="more-text">{{ totalReviewCount }}条点评</text>
					<image class="chevron-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-8.svg" mode="aspectFit"></image>
				</view>
			</view>
			
			<!-- 点评标签 -->
			<view class="review-tags">
				<view 
					v-for="(tag, index) in reviewTags" 
					:key="index" 
					class="review-tag"
					:class="{ active: tag.active }"
					@tap="selectTag(index)"
				>
					<text>{{ tag.text }}</text>
					<text>{{ tag.count }}</text>
				</view>
			</view>
			
			<!-- 点评列表 -->
			<view class="reviews-scroll-wrapper">
				<scroll-view 
					class="reviews-scroll" 
					scroll-x 
					show-scrollbar="false"
					@scroll="handleReviewScroll"
					ref="reviewsScroll"
				>
					<view class="reviews-list" ref="reviewsList">
						<view 
							v-for="(review, index) in displayedReviews" 
							:key="index" 
							class="review-item"
						>
							<image 
								class="review-image" 
								:src="review.image" 
								mode="aspectFill"
							></image>
							<view class="review-content">
								<text class="review-title">{{ review.title }}</text>
								<view class="review-rating">
									<text class="rating-score">{{ review.rating }}</text>
									<view class="stars">
										<image 
											v-for="i in Math.floor(review.rating)" 
											:key="i" 
											class="star-icon" 
											src="/static/icon/star.png" 
											mode="aspectFit"
										></image>
									</view>
								</view>
								<text class="review-text">{{ review.content }}</text>
								<view class="review-author">
									<view class="author-avatar" :style="{ backgroundImage: `url(${review.avatar})` }"></view>
									<text class="author-name">{{ review.author }}</text>
									<text class="review-date">{{ review.date }}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="scroll-fade-left" :class="{ 'visible': showReviewLeftFade, 'fading': reviewFadeOut && showReviewLeftFade }"></view>
				<view class="scroll-fade-right" :class="{ 'visible': showReviewRightFade, 'fading': reviewFadeOut && showReviewRightFade }"></view>
			</view>
		</view>

		<!-- 问TA卡片 -->
		<view v-if="questions.length > 0" class="question-card card-item">
			<view class="card-content">
				<view class="question-header">
					<text class="section-title">问TA</text>
					<view class="answer-count-btn" @tap="handleViewAllQuestions">
						<text class="answer-count">{{ questionCount }}条回答</text>
						<text class="chevron-icon-small">›</text>
					</view>
				</view>
				<view
					v-for="(question, index) in questions"
					:key="index"
					class="question-item"
				>
					<view class="question-badge">
						<text class="question-text">问</text>
					</view>
					<text class="question-content">{{ question }}</text>
				</view>
			</view>
		</view>

		<!-- 为您推荐标题 -->
		<view v-if="recommendedServices.length > 0" class="recommend-header">
			<text class="recommend-title">为您推荐</text>
		</view>

		<!-- 推荐服务列表 -->
		<view v-if="recommendedServices.length > 0" class="recommend-services">
			<view 
				v-for="(service, index) in recommendedServices" 
				:key="index" 
				class="recommend-service-card"
				@tap="handleServiceClick(service)"
			>
				<image 
					class="recommend-service-image" 
					:src="service.image" 
					mode="aspectFill"
				></image>
				<view class="recommend-service-info">
					<view class="recommend-service-header">
						<text class="recommend-service-title">{{ service.title }}</text>
					</view>
					<view class="recommend-service-details">
						<text class="recommend-service-desc">{{ service.description }}</text>
						<view class="recommend-price-row">
							<text class="recommend-currency">¥</text>
							<text class="recommend-price">{{ service.price }}</text>
						</view>
					</view>
					<view class="recommend-designer-info">
						<view class="recommend-designer-row">
							<image 
								class="recommend-designer-avatar" 
								:src="service.avatar" 
								mode="aspectFill"
							></image>
							<view class="recommend-designer-details">
								<view class="recommend-designer-name-row">
									<text class="recommend-designer-name">{{ service.stylistName }}</text>
									<text class="recommend-designer-role">{{ service.stylistRole }}</text>
								</view>
								<view class="recommend-rating-row">
									<text class="recommend-rating">{{ service.rating }}</text>
									<image 
										class="recommend-star" 
										src="/static/icon/star.png" 
										mode="aspectFit"
									></image>
									<text class="recommend-review-count">({{ service.reviewCount }})</text>
								</view>
							</view>
						</view>
						<text class="recommend-distance">{{ service.distance }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'

export default {
	name: 'ServicePurchaseProfileSection',
	props: {
		serviceData: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			isFavorited: false,
			showMoreImages: false,
			reviewScrollLeft: 0,
			lastReviewScrollLeft: 0,
			showReviewLeftFade: false,
			showReviewRightFade: false,
			reviewFadeOut: false,
			reviewFadeTimeout: null,
			reviewFadeStartTimeout: null,
			reviewScrollContainerWidth: 0,
			reviewScrollContentWidth: 0,
			localReviewTags: []
		}
	},
	watch: {
		'serviceData.isFavorited': {
			immediate: true,
			handler(val) {
				this.isFavorited = val || false
			}
		},
		'serviceData.reviewTags': {
			immediate: true,
			handler(newTags) {
				if (newTags && newTags.length > 0) {
					this.localReviewTags = newTags.map(tag => ({ ...tag }))
				}
			}
		}
	},
	computed: {
		
		price() {
			return this.serviceData.price || 0
		},
		appointmentPrice() {
			return this.serviceData.appointmentPrice || this.serviceData.price || 0
		},
		soldCount() {
			return this.serviceData.soldCount || 0
		},
		serviceTitle() {
			return this.serviceData.fullTitle || this.serviceData.name || ''
		},
		
		coupons() {
			return this.serviceData.coupons || []
		},
		
		designer() {
			return this.serviceData.designer || {
				id: 'default',
				name: '设计师',
				avatar: '',
				level: '高级',
				role: '设计师',
				workYears: 6,
				rating: 5.0,
				serviceCount: 0,
				worksCount: 0
			}
		},
		
		serviceItems() {
			return this.serviceData.serviceItems || []
		},
		
		warmTips() {
			return this.serviceData.warmTips || []
		},
		
		allImages() {
			return this.serviceData.detailImages || []
		},
		
		reviewTags() {
			return this.localReviewTags.length > 0 ? this.localReviewTags : (this.serviceData.reviewTags || [])
		},
		
		reviews() {
			return this.serviceData.reviews || []
		},
		
		questions() {
			return this.serviceData.questions || []
		},
		questionCount() {
			return this.serviceData.questionCount || 0
		},
		
		recommendedServices() {
			return this.serviceData.recommendedServices || []
		},
		
		displayImages() {
			return this.showMoreImages ? this.allImages : this.allImages.slice(0, 2)
		},
		
		totalReviewCount() {
			return this.reviews.length || this.reviewTags.reduce((sum, tag) => sum + parseInt(tag.count || 0), 0)
		},
		
		displayedReviews() {
			return this.reviews.slice(0, 10)
		}
	},
	methods: {
		async handleFavorite() {
			const serviceId = this.serviceData.id
			if (!serviceId) return
			try {
				if (this.isFavorited) {
					await api.service.unfavorite(serviceId)
					this.isFavorited = false
					uni.showToast({
						title: '已取消收藏',
						icon: 'success'
					})
				} else {
					await api.service.favorite(serviceId)
					this.isFavorited = true
					uni.showToast({
						title: '已收藏',
						icon: 'success'
					})
				}
				this.$emit('favorite-change', this.isFavorited)
			} catch (err) {
				console.error('收藏操作失败:', err)
				// 409 表示已收藏，更新状态
				if (err.code === 409) {
					this.isFavorited = true
					this.$emit('favorite-change', true)
				}
			}
		},
		handleViewAppointment() {
			uni.navigateTo({
				url: '/pages/designer/booking'
			})
		},
		handleEnterStore() {
			const designerId = this.designer.id
			if (designerId && designerId !== 'default') {
				uni.navigateTo({
					url: `/pages/designer/detail?id=${designerId}`
				})
			} else {
				uni.showToast({
					title: '暂无设计师信息',
					icon: 'none'
				})
			}
		},
		handleViewMore() {
			this.showMoreImages = !this.showMoreImages
		},
		handleViewAllReviews() {
			console.log('查看所有点评')
		},
		selectTag(index) {
			this.localReviewTags.forEach((tag, i) => {
				tag.active = i === index
			})
		},
		handleReviewScroll(e) {
			const scrollLeft = e.detail.scrollLeft
			this.reviewScrollLeft = scrollLeft
			this.updateReviewFadeEdges(scrollLeft)
		},
		updateReviewFadeEdges(scrollLeft) {
			const containerWidth = this.reviewScrollContainerWidth
			const contentWidth = this.reviewScrollContentWidth
			
			this.showReviewLeftFade = scrollLeft > 5
			this.showReviewRightFade = scrollLeft < contentWidth - containerWidth - 5
		},
		measureReviewScroll() {
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this)
				query.select('.reviews-scroll').boundingClientRect(rect => {
					this.reviewScrollContainerWidth = rect ? rect.width : 0
				})
				query.select('.reviews-list').boundingClientRect(rect => {
					this.reviewScrollContentWidth = rect ? rect.width : 0
				})
				query.exec(() => {
					this.updateReviewFadeEdges(this.reviewScrollLeft)
				})
			})
		},
		handleViewAllQuestions() {
			console.log('查看所有问题')
		},
		handleServiceClick(service) {
			uni.navigateTo({
				url: `/packageOrder/pages/order/purchase?id=${service.id || 1}`
			})
		}
	},
	mounted() {
		this.measureReviewScroll()
	},
	beforeDestroy() {
		if (this.reviewFadeTimeout) {
			clearTimeout(this.reviewFadeTimeout)
		}
		if (this.reviewFadeStartTimeout) {
			clearTimeout(this.reviewFadeStartTimeout)
		}
	}
}
</script>

<style scoped lang="scss">
.profile-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: none;
	margin: 0;
	align-items: center;
	gap: 12rpx;
	padding: 0 15rpx;
	box-sizing: border-box;
	padding-bottom: 220rpx;
}

.card-item {
	width: 100%;
	background-color: #ffffff;
	border-radius: 8rpx;
	overflow: hidden;

	&.full-width {
		max-width: none;
		border-radius: 0;
		margin-left: -15rpx;
		margin-right: -15rpx;
		width: calc(100% + 30rpx);
	}
}

.card-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20rpx;
	padding: 26rpx;
	box-sizing: border-box;
}


.price-card {
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 0ms;

	&.full-width {
		margin-top: -40rpx;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		overflow: hidden;
		box-shadow: 0 -20rpx 40rpx rgba(0, 0, 0, 0.04);
	}
}

.price-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.price-row {
	display: flex;
	align-items: center;
}

.currency-symbol {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 46rpx;
	font-weight: 400;
	color: #333333;
}

.price-value {
	font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	font-size: 52rpx;
	font-weight: 800;
	color: #333333;
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

.sold-count {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #a6a6a6;
}

.service-info-row {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
}

.service-text-info {
	display: flex;
	flex-direction: column;
	width: 452rpx;
	gap: 14rpx;
}

.service-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 36rpx;
	font-weight: 500;
	color: #000000;
	white-space: nowrap;
}

.coupon-row {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.coupon-icon {
	width: 40rpx;
	height: 40rpx;
}

.coupon-badges {
	display: flex;
	align-items: flex-start;
	gap: 6rpx;
}

.coupon-badge {
	height: 40rpx;
	padding: 0rpx 12rpx 8rpx 12rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	filter: brightness(0) invert(1);
}

.coupon-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	font-weight: 500;
	color: #666666;
}

.favorite-btn {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 6rpx;
	padding: 12rpx 16rpx;
	background-color: #f6f6f6;
	border-radius: 8rpx;
}

.favorite-icon {
	width: 32rpx;
	height: 32rpx;
}

.favorite-icon.is-favorited {
	filter: invert(83%) sepia(60%) saturate(1000%) hue-rotate(360deg) brightness(105%) contrast(105%);
}

.favorite-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	font-weight: 400;
	color: #666666;
}


.appointment-card {
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 100ms;
}

.appointment-content {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
	width: 100%;
	padding: 20rpx;
	border-radius: 8rpx;
	border: 2rpx solid #f6f6f6;
	background: linear-gradient(180deg, rgba(246, 246, 246, 1) 0%, rgba(251, 251, 251, 1) 100%);
	box-sizing: border-box;
}

.appointment-info {
	display: flex;
	align-items: center;
	gap: 16rpx;
	width: 100%;
}

.appointment-text-wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 8rpx;
}

.appointment-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #000000;
}

.appointment-desc {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.view-appointment-btn {
	width: 180rpx;
	height: 70rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ffffff;
	border-radius: 60rpx;
}

.btn-gradient-text {
	background: linear-gradient(90deg, rgba(253, 145, 255, 1) 0%, rgba(83, 64, 254, 1) 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
}


.designer-card {
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 200ms;
}

.designer-content {
	min-height: 130rpx;
	gap: 14rpx;
	padding: 20rpx;
}

.designer-info-row {
	display: flex;
	align-items: center;
	gap: 16rpx;
	width: 100%;
}

.designer-avatar {
	width: 120rpx;
	height: 119rpx;
	border-radius: 8rpx;
	flex-shrink: 0;
	background-color: #f2f2f2;
	overflow: hidden;
}

.designer-details {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	flex: 1;
	min-width: 0;
}

.designer-name-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.designer-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #000000;
}

.designer-level-badge {
	display: inline-flex;
	align-items: center;
	padding: 4rpx 10rpx;
	background-color: #dacbb1;
	border-radius: 6rpx;
	height: 24rpx;
	margin-left: 8rpx;
}

.level-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #645E57;
	font-size: 20rpx;
}

.designer-badge {
	padding: 0 8rpx;
	background-color: #dacbb1;
	border-radius: 4rpx;
	filter: brightness(0) invert(1);
	height: 40rpx;
	line-height: 40rpx;
	display: inline-flex;
	align-items: center;
}

.badge-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 20rpx;
	font-weight: 500;
	color: #645e57;
}

.designer-meta {
	display: flex;
	align-items: center;
}

.designer-role {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.meta-divider {
	font-size: 22rpx;
	color: #a6a6a6;
}

.designer-work-years {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.designer-stats {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.rating-info {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.rating-value {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #333333;
}

.star-badge {
	display: inline-flex;
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

.stats-row {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.stat-item {
	display: flex;
	align-items: flex-end;
	gap: 4rpx;
}

.stat-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	font-weight: 400;
	color: #a6a6a6;
}

.stat-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #666666;
}

.stat-divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.enter-store-btn {
	padding: 16rpx 28rpx;
	background-color: #ffffff;
	border: 2rpx solid #e0e0e0;
	border-radius: 6rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.enter-store-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 22rpx;
	font-weight: 500;
	color: #666666;
}


.service-content-card {
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 300ms;
}

.section-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #000000;
}

.service-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20rpx;
	width: 100%;
}

.service-item-wrapper {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20rpx;
	width: 100%;
}

.service-item-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.service-item-name {
	width: 96rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #666666;
	white-space: nowrap;
}

.service-item-quantity {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #333333;
}

.separator {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
}



.tips-card {
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 300ms;
}

.tips-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20rpx;
	width: 100%;
}

.tips-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #666666;
}


.detail-images-card {
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 300ms;
}

.detail-images-content {
	padding-top: 30rpx;
	padding-bottom: 20rpx;
}

.detail-image {
	width: 100%;
	height: 686rpx;
	border-radius: 8rpx;
}

.view-more-btn {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	width: 100%;
	padding: 16rpx 0;
	transition: opacity 0.3s;
}

.view-more-btn:active {
	opacity: 0.7;
}

.images-container {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	width: 100%;
	overflow: hidden;
	transition: max-height 0.3s ease-in-out;
	max-height: 1392rpx; 
}

.images-container.expanded {
	max-height: none;
}

.more-images {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	width: 100%;
	margin-top: 20rpx;
}

.view-more-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #a6a6a6;
}

.chevron-icon {
	width: 24rpx;
	height: 24rpx;
	transition: transform 0.3s ease-in-out;
}

.chevron-icon.rotated {
	transform: rotate(180deg);
}





.reviews-card {
	width: calc(100% + 30rpx);
	background-color: #ffffff;
	border-radius: 0;
	margin-left: -15rpx;
	margin-right: -15rpx;
	box-sizing: border-box;
	overflow: hidden;
}

.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 26rpx 26rpx 0;
}

.card-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.more-btn {
	display: inline-flex;
	align-items: center;
	gap: 12rpx;
}

.more-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.chevron-icon {
	width: 24rpx;
	height: 24rpx;
}

.review-tags {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: 12rpx;
	padding: 20rpx 26rpx 24rpx;
	width: 100%;
	box-sizing: border-box;
}

.review-tag {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	padding: 8rpx 20rpx;
	border-radius: 4rpx;
	filter: brightness(0) invert(1);
	background-color: #f5f5f5;
}

.review-tag.active {
	background-color: #000000;
}

.review-tag text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	font-weight: 400;
	color: #666666;
}

.review-tag.active text {
	color: #ffffff;
}

.reviews-scroll-wrapper {
	position: relative;
	padding: 0 26rpx 26rpx;
}

.reviews-scroll {
	width: 100%;
	overflow-x: auto;
}

.reviews-list {
	display: flex;
	gap: 16rpx;
	width: max-content;
}

.review-item {
	display: inline-flex;
	align-items: flex-start;
	gap: 16rpx;
	flex-shrink: 0;
	width: 600rpx;
	box-sizing: border-box;
}

.review-image {
	width: 200rpx;
	height: 200rpx;
	object-fit: cover;
	border-radius: 8rpx;
}

.review-content {
	display: flex;
	flex-direction: column;
	width: 388rpx;
	align-items: flex-start;
	gap: 2rpx;
	box-sizing: border-box;
	flex-shrink: 0;
}

.review-title {
	width: 100%;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
	line-height: 36rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.review-rating {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.rating-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #333333;
}

.star-wrapper {
	width: 20rpx;
	height: 20rpx;
}

.star-small {
	width: 16rpx;
	height: 16rpx;
	filter: brightness(0) invert(1);
}

.review-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	font-weight: 400;
	color: #666666;
	line-height: 36rpx;
}

.review-author {
	display: flex;
	align-items: center;
	width: 100%;
}

.author-info {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.author-avatar {
	width: 52rpx;
	height: 52rpx;
	border-radius: 50%;
}

.author-name {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	font-weight: 400;
	color: #a6a6a6;
}

.review-date {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 20rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.review-more-images {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
	position: relative;
}

.review-thumb {
	width: 78rpx;
	height: 200rpx;
}

.fade-overlay {
	position: absolute;
	top: -24rpx;
	left: 48rpx;
	width: 30rpx;
	height: 250rpx;
	background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 61%, rgba(255, 255, 255, 0) 100%);
}


.question-card {
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 400ms;
}

.question-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.answer-count-btn {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.answer-count {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.question-item {
	display: flex;
	align-items: center;
	gap: 16rpx;
	width: 100%;
}

.question-badge {
	display: flex;
	flex-direction: column;
	width: 40rpx;
	height: 40rpx;
	align-items: center;
	justify-content: center;
	gap: 20rpx;
	padding: 8rpx 0 4rpx;
	background-color: #fcf0e2;
	border-radius: 8rpx;
}

.question-text {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #ff9763;
}

.question-content {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #333333;
}


.recommend-header {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20rpx;
	padding: 12rpx 8rpx;
	width: 100%;
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 400ms;
}

.recommend-title {
	flex: 1;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #000000;
}

.recommend-services {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	width: 100%;
	padding: 0 8rpx;
	box-sizing: border-box;
	align-items: stretch;
	gap: 12rpx;
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 400ms;
}

.recommend-service-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 8rpx;
	padding-bottom: 16rpx;
	overflow: hidden;
}

.recommend-service-image {
	width: 100%;
	height: 358rpx;
	border-radius: 8rpx;
}

.recommend-service-info {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	gap: 14rpx;
	padding: 0 16rpx;
}

.recommend-service-header {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	width: 100%;
}

.recommend-service-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: 400;
	color: #000000;
	white-space: nowrap;
}

.recommend-service-details {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	width: 100%;
}

.recommend-service-desc {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.recommend-price-row {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.recommend-currency {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #333333;
}

.recommend-price {
	font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #333333;
}

.recommend-designer-info {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
	padding-right: 4rpx;
	box-sizing: border-box;
}

.recommend-designer-row {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.recommend-designer-avatar {
	width: 52rpx;
	height: 52rpx;
	border-radius: 50%;
}

.recommend-designer-details {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 4rpx;
}

.recommend-designer-name-row {
	display: flex;
	align-items: flex-start;
	gap: 8rpx;
}

.recommend-designer-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	font-weight: 500;
	color: #333333;
}

.recommend-designer-role {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	font-weight: 400;
	color: #a6a6a6;
}

.recommend-rating-row {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.recommend-rating {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #333333;
}

.recommend-star {
	width: 20rpx;
	height: 20rpx;
}

.recommend-review-count {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #333333;
}

.recommend-distance {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	font-weight: 400;
	color: #a6a6a6;
	position: relative;
	top: 0;
	left: -18rpx;
}

@keyframes fadeIn {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>






