<template>
	<view class="brand-service-info-section">
		<view class="service-info-card">
			<!-- Tab切换 -->
			<view class="service-tabs">
				<view 
					v-for="tab in serviceTabs" 
					:key="tab.id" 
					class="service-tab"
					:class="{ active: selectedServiceTab === tab.id }"
					@tap="selectServiceTab(tab.id)"
				>
					<text>{{ tab.label }}</text>
				</view>
				<image class="more-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-8.svg" mode="aspectFit"></image>
			</view>
			
			<!-- 服务信息列表 -->
			<view class="service-info-list">
				<view 
					v-for="(item, index) in serviceInfoData" 
					:key="index" 
					class="service-info-item"
				>
					<view class="info-row">
						<text class="info-label">{{ item.label }}</text>
						<view class="info-values">
							<text 
								v-for="(val, valIndex) in item.value" 
								:key="valIndex" 
								class="info-value"
							>{{ val }}</text>
						</view>
					</view>
					<view v-if="index < serviceInfoData.length - 1" class="separator-line"></view>
				</view>
			</view>
		</view>
		
		<!-- 点评卡片 -->
		<view class="reviews-card">
			<view class="reviews-header">
				<text class="reviews-title">顾客点评</text>
				<view class="reviews-more" @tap="handleMoreReviews">
					<text class="more-text">123条点评</text>
					<image class="more-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-8.svg" mode="aspectFit"></image>
				</view>
			</view>
			
			<!-- 点评标签 -->
			<view class="review-tags">
				<view 
					v-for="(tag, index) in reviewTags" 
					:key="index" 
					class="review-tag"
					:class="{ active: tag.active }"
					@tap="selectReviewTag(index)"
				>
					<text>{{ tag.label }}</text>
					<text class="tag-count">{{ tag.count }}</text>
				</view>
			</view>
			
			<!-- 点评列表 -->
			<scroll-view class="reviews-scroll" scroll-x>
				<view class="reviews-container">
					<view 
						v-for="(review, index) in reviews" 
						:key="index" 
						class="review-item"
					>
						<image class="review-image" :src="review.image" mode="aspectFill"></image>
						<view class="review-content">
							<text class="review-title">{{ review.title }}</text>
							<view class="review-rating">
								<text class="rating-score">{{ review.rating }}</text>
								<image 
									v-for="i in 5" 
									:key="i" 
									class="star-icon" 
									src="https://c.animaapp.com/mi5l377nJk1HHO/img/star-1.svg" 
									mode="aspectFit"
								></image>
							</view>
							<text class="review-text">{{ review.text }}</text>
							<view class="review-author">
								<image class="author-avatar" :src="review.author.avatar" mode="aspectFill"></image>
								<text class="author-name">{{ review.author.name }}</text>
								<text class="review-date">{{ review.date }}</text>
							</view>
						</view>
					</view>
					<view class="review-overlay"></view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 问TA卡片 -->
		<view class="qa-card">
			<view class="qa-header">
				<text class="qa-title">问TA</text>
				<view class="qa-more" @tap="handleMoreQA">
					<text class="more-text">12条回答</text>
					<image class="more-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-8.svg" mode="aspectFit"></image>
				</view>
			</view>
			
			<view class="questions-list">
				<view 
					v-for="(question, index) in questions" 
					:key="index" 
					class="question-item"
				>
					<view class="question-badge">
						<text>问</text>
					</view>
					<text class="question-text">{{ question }}</text>
				</view>
			</view>
		</view>
		
		<!-- 入驻按钮 -->
		<view class="entry-card">
			<view class="entry-btn" @tap="handleEntry">
				<text class="entry-text">设计师/商家 立即入驻 展示你的项目</text>
			</view>
			<text class="entry-note">*本页面内信息有门店/设计师发布并对信息的真实性及合法性负责，如您对信息真实性及合法性有质疑，请向**反馈</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selectedServiceTab: "notice",
			serviceTabs: [
				{ id: "notice", label: "服务须知" },
				{ id: "features", label: "服务特色" },
				{ id: "facilities", label: "环境设施" },
			],
			serviceInfoData: [
				{ label: "营业时间", value: ["周二 - 周日", "10:00-21:00"] },
				{ label: "预约时间", value: ["提前3小时"] },
				{ label: "美发师", value: ["15人"] },
				{ label: "工位", value: ["15个"] },
				{ label: "成立", value: ["2017-11-20"] },
				{ label: "面积", value: ["160m"] },
			],
			reviewTags: [
				{ label: "技术很好", count: 232, active: true },
				{ label: "效果满意", count: 321, active: false },
				{ label: "服务态度", count: 321, active: false },
			],
			reviews: [
				{
					image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-187.png",
					title: "环境特别好",
					rating: 5.0,
					text: "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境...",
					author: {
						avatar: "https://c.animaapp.com/mi5l377nJk1HHO/img/ellipse-34.svg",
						name: "加菲猫"
					},
					date: "2019-12-25"
				},
				{
					image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-187-1.png",
					title: "环境特别好",
					rating: 5.0,
					text: "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境...",
					author: {
						avatar: "https://c.animaapp.com/mi5l377nJk1HHO/img/ellipse-34.svg",
						name: "加菲猫"
					},
					date: "2019-12-25"
				}
			],
			questions: [
				"只烫不染的短发多少钱？头发比较干，不知道能不能做？",
				"刘海发际线太高怎么办？",
			]
		}
	},
	methods: {
		selectServiceTab(id) {
			this.selectedServiceTab = id
		},
		selectReviewTag(index) {
			this.reviewTags.forEach((tag, i) => {
				tag.active = i === index
			})
		},
		handleMoreReviews() {
			console.log('More reviews')
		},
		handleMoreQA() {
			console.log('More QA')
		},
		handleEntry() {
			console.log('Entry clicked')
		}
	}
}
</script>

<style scoped lang="scss">
.brand-service-info-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	gap: 12rpx;
}

.service-info-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 30rpx;
	box-sizing: border-box;
}

.service-tabs {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 24rpx;
}

.service-tab {
	font-size: 28rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	cursor: pointer;
	
	&.active {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
		color: #000000;
	}
}

.more-icon {
	width: 28rpx;
	height: 28rpx;
	flex-shrink: 0;
}

.service-info-list {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 24rpx;
}

.service-info-item {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.info-row {
	display: flex;
	align-items: flex-start;
	gap: 30rpx;
	width: 100%;
}

.info-label {
	width: 96rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
	flex-shrink: 0;
}

.info-values {
	display: flex;
	align-items: center;
	gap: 16rpx;
	flex: 1;
}

.info-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
}

.reviews-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 30rpx;
	box-sizing: border-box;
}

.reviews-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 18rpx;
}

.reviews-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.reviews-more {
	display: flex;
	align-items: center;
	gap: 6rpx;
	cursor: pointer;
}

.more-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.review-tags {
	display: flex;
	align-items: flex-start;
	gap: 12rpx;
	flex-wrap: wrap;
	margin-bottom: 18rpx;
}

.review-tag {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 4rpx;
	padding: 8rpx 20rpx;
	border-radius: 4rpx;
	background-color: #f6f6f6;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
	cursor: pointer;
	
	&.active {
		background-color: #333333;
		color: #ffffff;
	}
}

.tag-count {
	font-size: 20rpx;
}

.reviews-scroll {
	width: 100%;
	white-space: nowrap;
}

.reviews-container {
	display: inline-flex;
	align-items: flex-start;
	gap: 16rpx;
	position: relative;
}

.review-item {
	display: inline-flex;
	align-items: flex-start;
	gap: 16rpx;
	min-width: 388rpx;
	position: relative;
}

.review-image {
	width: 200rpx;
	height: 200rpx;
	border-radius: 8rpx;
	object-fit: cover;
	flex-shrink: 0;
}

.review-content {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	flex: 1;
	min-width: 172rpx;
}

.review-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.review-rating {
	display: inline-flex;
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
	width: 20rpx;
	height: 20rpx;
	flex-shrink: 0;
}

.review-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
	line-height: 36rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.review-author {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.author-avatar {
	width: 52rpx;
	height: 52rpx;
	border-radius: 50%;
	flex-shrink: 0;
}

.author-name {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.review-date {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 20rpx;
}

.review-overlay {
	position: absolute;
	right: 0;
	top: 0;
	width: 44rpx;
	height: 100%;
	background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 61%, rgba(255, 255, 255, 0) 100%);
	pointer-events: none;
}

.qa-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 30rpx;
	box-sizing: border-box;
}

.qa-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 18rpx;
}

.qa-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.qa-more {
	display: flex;
	align-items: center;
	gap: 6rpx;
	cursor: pointer;
}

.questions-list {
	display: flex;
	flex-direction: column;
	gap: 18rpx;
}

.question-item {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.question-badge {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40rpx;
	height: 40rpx;
	background-color: #fcf0e2;
	border-radius: 4rpx;
	flex-shrink: 0;
}

.question-badge text {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: normal;
	color: #ff9763;
	font-size: 24rpx;
}

.question-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
	flex: 1;
}

.entry-card {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.entry-btn {
	width: 100%;
	height: 84rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-sizing: border-box;
}

.entry-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	font-size: 24rpx;
	background: linear-gradient(90deg, rgba(253, 145, 255, 1) 0%, rgba(83, 64, 254, 1) 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	color: #333333;
}

.entry-note {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
	line-height: 32rpx;
}
</style>

