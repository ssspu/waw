<template>
	<view class="service-review-page">
		<!-- 导航栏 -->
		<view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="back-btn" @tap="handleBack">
					<image 
						class="back-icon" 
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" 
						mode="aspectFit"
					></image>
				</view>
				<text class="navbar-title">服务点评</text>
			</view>
		</view>
		
		<!-- 主内容 -->
		<view class="main-content">
			<!-- 服务信息卡片 -->
			<view class="service-card">
				<!-- 美发师信息 -->
				<view class="provider-header">
					<text class="provider-name">李天天</text>
					<view class="provider-badge">
						<text class="badge-text">美发师</text>
					</view>
					<image 
						class="arrow-icon" 
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame-1.svg" 
						mode="aspectFit"
					></image>
				</view>
				
				<!-- 商品信息 -->
				<view class="product-info">
					<image 
						class="product-image" 
						src="/static/icon/rectangle-169.png" 
						mode="aspectFill"
					></image>
					<view class="product-details">
						<view class="product-left">
							<text class="product-name">欧莱雅植物洗护套装一套</text>
							<text class="product-category">洗护</text>
							<text class="product-duration">1小时</text>
						</view>
						<view class="product-right">
							<view class="price-row">
								<text class="price-symbol">¥</text>
								<text class="price-value">799</text>
							</view>
							<text class="quantity">*1</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 评分区域 -->
			<view class="rating-section">
				<view class="rating-left">
					<view class="overall-rating">
						<text class="rating-score">{{ averageRating }}</text>
						<text class="rating-unit">分</text>
					</view>
					<text class="rating-label">服务评价</text>
				</view>
				<view class="rating-right">
					<view 
						class="rating-item"
						v-for="(category, catIndex) in ratingCategories"
						:key="category.label"
					>
						<text class="rating-category">{{ category.label }}</text>
						<view class="stars">
							<image 
								v-for="(star, index) in 5" 
								:key="index"
								class="star-icon" 
								:src="getStarIcon(index, category.score)" 
								mode="aspectFit"
								@tap="handleSelectStar(catIndex, index)"
							></image>
						</view>
						<text class="rating-value">{{ category.score.toFixed(1) }}</text>
					</view>
				</view>
			</view>
			
			<!-- 评论输入区域 -->
			<view class="comment-section">
				<textarea 
					class="comment-input" 
					v-model="commentText"
					placeholder="分享你的体验感受,可以帮助更多人哦!"
					placeholder-style="color: #a7a7a7;"
				></textarea>
				<view class="media-buttons">
					<view class="media-btn" @tap="handleAddImage">
						<image 
							class="media-icon" 
							src="/static/icon/zhaoxiangji.png" 
							mode="aspectFit"
						></image>
						<text class="media-text">添加图片</text>
					</view>
					<view class="media-btn" @tap="handleAddVideo">
						<image 
							class="media-icon" 
							src="/static/icon/shipin.png" 
							mode="aspectFit"
						></image>
						<text class="media-text">添加视频</text>
					</view>
				</view>
			</view>
			
			<!-- 反馈标签区域 -->
			<view class="tags-section">
				<view 
					v-for="(tag, index) in feedbackTags" 
					:key="index"
					class="tag-item"
					:class="{ 'selected': selectedTags.includes(index) }"
					@tap="handleToggleTag(index)"
				>
					<text class="tag-text">{{ tag }}</text>
				</view>
			</view>
		</view>
		
		<!-- 发布按钮 -->
		<view class="footer-actions">
			<view class="publish-btn" @tap="handlePublish">
				<text class="publish-text">发布</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 44,
			commentText: '',
			selectedTags: [0], // 默认选中第一个标签
			feedbackTags: [
				'服务热情',
				'环境优雅',
				'无隐形消费',
				'非常好',
				'环境优雅',
				'无隐形消费',
				'非常好'
			],
			ratingCategories: [
				{ label: '专业', score: 4.6 },
				{ label: '服务', score: 4.9 },
				{ label: '效果', score: 4.8 },
				{ label: '环境', score: 4.8 }
			]
		}
	},
	onLoad() {
		// 从持久化存储获取状态栏高度
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	computed: {
		averageRating() {
			if (!this.ratingCategories.length) return '0.0'
			const total = this.ratingCategories.reduce((sum, item) => sum + item.score, 0)
			return (total / this.ratingCategories.length).toFixed(1)
		}
	},
	methods: {
		getStarIcon(index, rating) {
			// 根据评分返回对应的星星图标
			// star-4-3.svg 是填充的星星，star-6-3.svg 是空心的星星
			if (index < Math.floor(rating)) {
				return '/static/icon/star-4-3.svg'
			} else if (index < rating) {
				return '/static/icon/star-4-3.svg' // 半星也用填充
			} else {
				return '/static/icon/star-6-3.svg'
			}
		},
		handleSelectStar(categoryIndex, starIndex) {
			const newScore = starIndex + 1
			this.ratingCategories[categoryIndex].score = Number(newScore.toFixed(1))
		},
		handleBack() {
			uni.navigateBack()
		},
		handleToggleTag(index) {
			const tagIndex = this.selectedTags.indexOf(index)
			if (tagIndex > -1) {
				this.selectedTags.splice(tagIndex, 1)
			} else {
				this.selectedTags.push(index)
			}
		},
		handleAddImage() {
			uni.chooseImage({
				count: 9,
				success: (res) => {
					console.log('选择的图片:', res.tempFilePaths)
				}
			})
		},
		handleAddVideo() {
			uni.chooseVideo({
				success: (res) => {
					console.log('选择的视频:', res.tempFilePath)
				}
			})
		},
		handlePublish() {
			if (!this.commentText.trim()) {
				uni.showToast({
					title: '请输入评价内容',
					icon: 'none'
				})
				return
			}
			
			// 这里可以调用发布评价的API
			uni.showToast({
				title: '发布成功',
				icon: 'success'
			})
			
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
		}
	}
}
</script>

<style scoped lang="scss">
.service-review-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	position: relative;
	padding-bottom: 120rpx;
}

.navbar {
	width: 100%;
	background-color: #ffffff;
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
	font-size: 30rpx;
	font-weight: 500;
	color: #666666;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
.nav-icon-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.nav-dots {
	display: flex;
	align-items: center;
	gap: 3rpx;
}

.dot {
	width: 3rpx;
	height: 3rpx;
	border-radius: 50%;
	background-color: #000000;
}

.nav-circle {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	border: 1.5rpx solid #000000;
	background-color: transparent;
	display: flex;
	align-items: center;
	justify-content: center;
}

.circle-dot {
	width: 6rpx;
	height: 6rpx;
	border-radius: 50%;
	background-color: #000000;
}

.main-content {
	flex: 1;
	padding: 12rpx;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.service-card {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 24rpx 20rpx;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.provider-header {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.provider-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #000000;
}

.provider-badge {
	background-color: #f6f6f6;
	border-radius: 4rpx;
	padding: 2rpx 8rpx;
}

.badge-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 20rpx;
	font-weight: 500;
	color: #666666;
}

.arrow-icon {
	width: 28rpx;
	height: 28rpx;
	margin-left: auto;
}

.product-info {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.product-image {
	width: 132rpx;
	height: 132rpx;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.product-details {
	flex: 1;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}

.product-left {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
	flex: 1;
}

.product-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #666666;
}

.product-category,
.product-duration {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a7a7a7;
}

.product-right {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 6rpx;
}

.price-row {
	display: flex;
	align-items: flex-end;
}

.price-symbol {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #333333;
}

.price-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 36rpx;
	font-weight: 500;
	color: #333333;
}

.quantity {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a7a7a7;
}

.rating-section {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 34rpx 0;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 68rpx;
}

.rating-left {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 164rpx;
}

.overall-rating {
	display: flex;
	align-items: flex-end;
	gap: 8rpx;
	margin-bottom: 8rpx;
}

.rating-score {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 54rpx;
	font-weight: 500;
	color: #000000;
}

.rating-unit {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #666666;
}

.rating-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #a7a7a7;
}

.rating-right {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	width: 388rpx;
}

.rating-item {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.rating-category {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	font-weight: 400;
	color: #a7a7a7;
	width: 60rpx;
}

.stars {
	display: flex;
	align-items: center;
	gap: 4rpx;
	flex: 1;
}

.star-icon {
	width: 28rpx;
	height: 28rpx;
	cursor: pointer;
}

.rating-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #333333;
	width: 60rpx;
	text-align: center;
}

.comment-section {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 24rpx 20rpx;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.comment-input {
	width: 100%;
	min-height: 200rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #333333;
	line-height: 1.5;
}

.media-buttons {
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.media-btn {
	display: flex;
	align-items: center;
	gap: 8rpx;
	padding: 16rpx 24rpx;
	background-color: #f6f6f6;
	border-radius: 8rpx;
}

.media-icon {
	width: 32rpx;
	height: 32rpx;
}

.media-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #333333;
}

.tags-section {
	display: flex;
	flex-wrap: wrap;
	gap: 14rpx;
	padding: 0 12rpx;
	justify-content: flex-start;
}

.tag-item {
	display: flex;
	align-items: center;
	justify-content: center;
	width: calc((100% - 28rpx) / 3);
	height: 68rpx;
	padding: 0;
	border-radius: 4rpx;
	background-color: #f6f6f6;
	box-sizing: border-box;
}

.tag-item.selected {
	background-color: #333333;
}

.tag-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 22rpx;
	font-weight: 400;
	color: #666666;
	white-space: nowrap;
	text-align: center;
}

.tag-item.selected .tag-text {
	color: #ffffff;
}

.footer-actions {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #ffffff;
	padding: 24rpx 20rpx;
	box-shadow: 0px -2rpx 0px rgba(0, 0, 0, 0.04);
	z-index: 100;
}

.publish-btn {
	width: 100%;
	height: 84rpx;
	background-color: #333333;
	border-radius: 4rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.publish-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #ffffff;
}
</style>

