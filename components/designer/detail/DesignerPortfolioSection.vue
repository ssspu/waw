<template>
	<view class="portfolio-section">
		<!-- 服务须知卡片 -->
		<view class="info-card">
			<view class="card-header">
				<view class="nav-tabs">
					<view 
						v-for="(nav, index) in navTabs" 
						:key="index" 
						class="nav-item"
						:class="{ active: index === 0 }"
						@tap="switchNav(index)"
					>
						<text>{{ nav }}</text>
					</view>
				</view>
				<image class="chevron-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-8.svg" mode="aspectFit"></image>
			</view>
			
			<!-- 服务信息列表 -->
			<view class="info-list">
				<view 
					v-for="(item, index) in serviceInfoData" 
					:key="index" 
					class="info-item"
				>
					<view class="info-row">
						<text class="info-label">{{ item.label }}</text>
						<view class="info-value-group">
							<text class="info-value">{{ item.value }}</text>
							<text v-if="item.extra" class="info-extra">{{ item.extra }}</text>
						</view>
					</view>
					<view class="separator-line"></view>
				</view>
			</view>
		</view>
		
		<!-- 顾客点评卡片 -->
		<view class="reviews-card">
			<view class="card-header">
				<text class="card-title">顾客点评</text>
				<view class="more-btn" @tap="handleViewMoreReviews">
					<text class="more-text">123条点评</text>
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
			<view class="reviews-list">
				<view class="review-item">
					<image 
						class="review-image" 
						src="https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png" 
						mode="aspectFill"
					></image>
					<view class="review-content">
						<text class="review-title">环境特别好</text>
						<view class="review-rating">
							<text class="rating-score">5.0</text>
							<view class="stars">
								<image 
									v-for="i in 5" 
									:key="i" 
									class="star-icon" 
									src="https://c.animaapp.com/mi5d4lp0csJxnR/img/star-1.svg" 
									mode="aspectFit"
								></image>
							</view>
						</view>
						<text class="review-text">环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境...</text>
						<view class="review-author">
							<view class="author-avatar" :style="{ backgroundImage: `url(https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg)` }"></view>
							<text class="author-name">加菲猫</text>
							<text class="review-date">2019-12-25</text>
						</view>
					</view>
				</view>
				
				<view class="review-item fade-overlay">
					<image 
						class="review-image-small" 
						src="https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187-1.png" 
						mode="aspectFill"
					></image>
					<view class="fade-gradient"></view>
				</view>
				
				<view class="fade-gradient-end"></view>
			</view>
		</view>
		
		<!-- 问TA卡片 -->
		<view class="qa-card">
			<view class="card-header">
				<text class="card-title">问TA</text>
				<view class="more-btn" @tap="handleViewMoreQA">
					<text class="more-text">12条回答</text>
					<image class="chevron-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-8.svg" mode="aspectFit"></image>
				</view>
			</view>
			
			<!-- 问题列表 -->
			<view class="questions-list">
				<view 
					v-for="(question, index) in questions" 
					:key="index" 
					class="question-item"
					@tap="handleQuestionClick(question)"
				>
					<view class="question-badge">
						<text class="question-mark">问</text>
					</view>
					<text class="question-text">{{ question }}</text>
				</view>
			</view>
		</view>
		
		<!-- 入驻按钮 -->
		<view class="join-btn" @tap="handleJoin">
			<text class="join-text">设计师/商家 立即入驻 展示你的项目</text>
		</view>
		
		<!-- 免责声明 -->
		<text class="disclaimer">*本页面内信息有门店/设计师发布并对信息的真实性及合法性负责，如您对信息真实性及合法性有质疑，请向**反馈</text>
	</view>
</template>

<script>
export default {
	data() {
		return {
			navTabs: ["服务须知", "服务特色", "环境设施"],
			serviceInfoData: [
				{ label: "职位", value: "店长" },
				{ label: "职称", value: "国家高级美发师" },
				{ label: "擅长", value: "男士油头造型、细软烫发" },
				{ label: "工作时间", value: "周二 - 周日", extra: "10:00-21:00" },
				{ label: "从业时间", value: "12年" },
				{ label: "预约时间", value: "提前3小时" },
			],
			reviewTags: [
				{ text: "技术很好", count: "232", active: true },
				{ text: "效果满意", count: "321", active: false },
				{ text: "服务态度", count: "321", active: false },
			],
			questions: [
				"只烫不染的短发多少钱？头发比较干，不知道能不能做？",
				"刘海发际线太高怎么办？",
			],
		}
	},
	methods: {
		switchNav(index) {
			console.log('Switch nav:', index)
		},
		selectTag(index) {
			this.reviewTags.forEach((tag, i) => {
				tag.active = i === index
			})
		},
		handleViewMoreReviews() {
			console.log('View more reviews')
		},
		handleViewMoreQA() {
			console.log('View more QA')
		},
		handleQuestionClick(question) {
			console.log('Question clicked:', question)
		},
		handleJoin() {
			console.log('Join clicked')
		}
	}
}
</script>

<style scoped lang="scss">
.portfolio-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	gap: 16rpx;
	padding: 0 12rpx;
}

.info-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: none;
}

.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx;
	width: 100%;
}

.nav-tabs {
	display: inline-flex;
	align-items: center;
	gap: 30rpx;
}

.nav-item {
	font-size: 28rpx;
	text-align: center;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
}

.nav-item.active {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
}

.chevron-icon {
	width: 28rpx;
	height: 28rpx;
}

.info-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20rpx;
	padding: 0 20rpx 20rpx;
	width: 100%;
}

.info-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20rpx;
	width: 100%;
}

.info-row {
	display: flex;
	align-items: center;
	gap: 16rpx;
	width: 100%;
}

.info-label {
	width: 96rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
}

.info-value-group {
	display: inline-flex;
	align-items: center;
	gap: 16rpx;
}

.info-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
}

.info-extra {
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
	border-radius: 12rpx;
	border: 0;
	box-shadow: none;
}

.card-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
	text-align: center;
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

.review-tags {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: 12rpx;
	padding: 0 20rpx 24rpx;
	width: 100%;
}

.review-tag {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	padding: 8rpx 20rpx;
	border-radius: 4rpx;
	background-color: #f6f6f6;
}

.review-tag.active {
	background-color: #333333;
}

.review-tag text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	font-size: 22rpx;
}

.review-tag text:first-child {
	color: #a6a6a6;
}

.review-tag.active text:first-child {
	color: #ffffff;
}

.review-tag text:last-child {
	font-size: 20rpx;
	color: #a6a6a6;
}

.review-tag.active text:last-child {
	color: #ffffff;
}

.reviews-list {
	display: flex;
	align-items: flex-start;
	gap: 24rpx;
	padding: 0 20rpx 20rpx;
	width: 100%;
	overflow-x: auto;
}

.review-item {
	display: inline-flex;
	align-items: flex-start;
	gap: 16rpx;
	flex-shrink: 0;
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

.rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 24rpx;
}

.stars {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.star-icon {
	width: 20rpx;
	height: 20rpx;
}

.review-text {
	width: 100%;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
	line-height: 36rpx;
}

.review-author {
	display: flex;
	align-items: center;
	gap: 12rpx;
	width: 100%;
}

.author-avatar {
	width: 52rpx;
	height: 52rpx;
	border-radius: 50%;
	background-size: cover;
	background-position: center;
	background-color: #a6a6a6;
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

.fade-overlay {
	position: relative;
}

.review-image-small {
	width: 78rpx;
	height: 200rpx;
	object-fit: cover;
}

.fade-gradient {
	position: absolute;
	top: -6rpx;
	left: 48rpx;
	width: 30rpx;
	height: 250rpx;
	background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 61%, rgba(255, 255, 255, 0) 100%);
}

.fade-gradient-end {
	width: 44rpx;
	height: 250rpx;
	flex-shrink: 0;
	background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
}

.qa-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: none;
}

.questions-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 24rpx;
	padding: 0 20rpx 20rpx;
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
	padding: 8rpx 16rpx;
	background-color: #fcf0e2;
	border-radius: 8rpx;
}

.question-mark {
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
	text-align: left;
}

.join-btn {
	display: flex;
	width: 100%;
	height: 84rpx;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	padding: 16rpx 30rpx;
	background-color: #ffffff;
	border-radius: 4rpx;
}

.join-text {
	background: linear-gradient(90deg, rgba(253, 145, 255, 1) 0%, rgba(83, 64, 254, 1) 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	text-fill-color: transparent;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	font-size: 24rpx;
}

.join-text {
	color: #000000;
}

.disclaimer {
	width: 100%;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
	line-height: normal;
}
</style>

