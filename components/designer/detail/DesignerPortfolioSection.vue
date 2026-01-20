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
						:class="{ active: activeNavTab === index }"
						@tap="switchNav(index)"
					>
						<text>{{ nav }}</text>
					</view>
				</view>
				<image class="chevron-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-8.svg" mode="aspectFit"></image>
			</view>
			
			<!-- 服务须知列表 -->
			<view v-if="activeNavTab === 0" class="info-list">
				<view 
					v-for="(item, index) in currentInfoData" 
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
					<view v-if="index < currentInfoData.length - 1" class="separator-line"></view>
				</view>
			</view>
			
			<view v-if="activeNavTab === 1" class="features-content">
				<view v-for="(section, sectionIndex) in serviceFeaturesData" :key="sectionIndex" class="feature-section">
					<text v-if="section.title" class="section-title">{{ section.title }}</text>
					<view class="tags-grid">
						<view 
							v-for="(tag, tagIndex) in section.tags" 
							:key="tagIndex" 
							class="feature-tag"
						>
							<text>{{ tag }}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view v-if="activeNavTab === 2" class="features-content">
				<view v-for="(section, sectionIndex) in environmentData" :key="sectionIndex" class="feature-section">
					<text v-if="section.title" class="section-title">{{ section.title }}</text>
					<view class="tags-grid">
						<view 
							v-for="(tag, tagIndex) in section.tags" 
							:key="tagIndex" 
							class="feature-tag"
						>
							<text>{{ tag }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 顾客点评卡片 -->
		<view class="reviews-card" @tap="handleViewMoreReviews">
			<view class="card-header">
				<text class="card-title">顾客点评</text>
				<view class="more-btn" @tap="handleViewMoreReviews">
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
											v-for="i in 5" 
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
		
		<!-- 问TA卡片 - 暂时隐藏 -->
		<!--
		<view class="qa-card">
			<view class="card-header">
				<text class="card-title">问TA</text>
				<view class="more-btn" @tap="handleViewMoreQA">
					<text class="more-text">12条回答</text>
					<image class="chevron-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-8.svg" mode="aspectFit"></image>
				</view>
			</view>

			问题列表
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
		-->
		
		<!-- 入驻按钮 -->
		<view class="join-btn" @tap="handleJoin">
			<text class="join-text">设计师/商家 立即入驻 展示你的项目</text>
		</view>
		
		<!-- 免责声明 -->
		<text class="disclaimer">*本页面内信息有门店/设计师发布并对信息的真实性和合法性负责，如您对信息真实性和合法性有质疑，请向**反馈</text>
	</view>
</template>

<script>
import { designerApi } from '@/api'

export default {
	props: {
		designerId: {
			type: [String, Number],
			default: null
		}
	},
	data() {
		return {
			activeNavTab: 0,
			navTabs: ["服务须知", "服务特色", "环境设施"],
			serviceInfoData: [],
			serviceFeaturesData: [],
			environmentData: [],
			reviewTags: [],
			reviews: [],
			questions: [],
			
			reviewScrollLeft: 0,
			lastReviewScrollLeft: 0,
			showReviewLeftFade: false,
			showReviewRightFade: false,
			reviewFadeOut: false,
			reviewFadeTimeout: null,
			reviewFadeStartTimeout: null,
			reviewScrollContainerWidth: 0,
			reviewScrollContentWidth: 0,
		}
	},
	watch: {
		designerId: {
			immediate: true,
			handler(newVal) {
				if (newVal) {
					this.loadDesignerInfo()
					this.loadReviews()
				}
			}
		},
		displayedReviews() {
			this.measureReviewScroll()
		}
	},
	async created() {
		if (this.designerId) {
			await Promise.all([
				this.loadDesignerInfo(),
				this.loadReviews()
			])
		}
	},
	methods: {
		async loadDesignerInfo() {
			try {
				// 检查 designerId 是否为有效的 UUID 格式（32位无连字符）
				const isValidUUID = this.designerId && /^[0-9a-f]{32}$/i.test(this.designerId)
				if (!isValidUUID) {
					console.warn('designerId 格式不正确，使用默认数据:', this.designerId)
					this.setDefaultData()
					return
				}

				// 调用新的 portfolio 接口获取设计师档案信息
				const res = await designerApi.getPortfolioInfo(this.designerId)
				if (res && res.code === 200 && res.data) {
					const data = res.data
					const serviceInfo = data.serviceInfo || {}

					// 服务须知数据
					this.serviceInfoData = [
						{ label: "职位", value: serviceInfo.position || "店长" },
						{ label: "职称", value: serviceInfo.title || "国家高级美发师" },
						{ label: "擅长", value: Array.isArray(serviceInfo.specialties) ? serviceInfo.specialties.join('、') : (serviceInfo.specialties || "男士油头发型及细软烫发") },
						{ label: "工作时间", value: serviceInfo.workDays || "周二 - 周日", extra: serviceInfo.workHours || "10:00-21:00" },
						{ label: "从业时间", value: `${serviceInfo.experience || 12}年` },
						{ label: "预约时间", value: serviceInfo.appointmentAdvance || "提前3小时" },
					]

					// 服务特色数据
					this.serviceFeaturesData = data.serviceFeatures || [
						{
							title: "",
							tags: ["全预约制", "免费茶点", "头皮检测", "免费停车", "烫染专业店", "免费修眉", "一对一服务", "免费按摩", "没有隐形消费", "可上门服务"]
						},
						{
							title: "其他",
							tags: ["不可携带宠物", "服务区不可吸烟"]
						}
					]

					// 环境设施数据
					this.environmentData = data.environmentFacilities || [
						{
							title: "",
							tags: ["储物柜", "免费Wifi", "充电宝", "可看电视", "VIP专区", "沙发座"]
						},
						{
							title: "通用设施",
							tags: ["特定吸烟区", "电梯", "有停车位", "空调", "先进/刷卡支付"]
						}
					]

					// 问TA数据
					this.questions = data.questions || [
						"这边发质受损严重可以做什么项目呢?",
						"周末人多吗，需要提前预约吗?",
						"剪发大概需要多长时间?"
					]
				} else {
					// API 返回非200状态码，使用默认数据
					console.warn('获取设计师档案信息失败，使用默认数据')
					this.setDefaultData()
				}
			} catch (error) {
				console.error('加载设计师档案信息失败:', error)
				// 加载失败时使用默认数据
				this.setDefaultData()
			}
		},

		// 设置默认数据
		setDefaultData() {
			this.serviceInfoData = [
				{ label: "职位", value: "店长" },
				{ label: "职称", value: "国家高级美发师" },
				{ label: "擅长", value: "男士油头发型及细软烫发" },
				{ label: "工作时间", value: "周二 - 周日", extra: "10:00-21:00" },
				{ label: "从业时间", value: "12年" },
				{ label: "预约时间", value: "提前3小时" },
			]
			this.serviceFeaturesData = [
				{
					title: "",
					tags: ["全预约制", "免费茶点", "头皮检测", "免费停车", "烫染专业店", "免费修眉", "一对一服务", "免费按摩", "没有隐形消费", "可上门服务"]
				},
				{
					title: "其他",
					tags: ["不可携带宠物", "服务区不可吸烟"]
				}
			]
			this.environmentData = [
				{
					title: "",
					tags: ["储物柜", "免费Wifi", "充电宝", "可看电视", "VIP专区", "沙发座"]
				},
				{
					title: "通用设施",
					tags: ["特定吸烟区", "电梯", "有停车位", "空调", "先进/刷卡支付"]
				}
			]
			this.questions = [
				"这边发质受损严重可以做什么项目呢?",
				"周末人多吗，需要提前预约吗?",
				"剪发大概需要多长时间?"
			]
		},
		async loadReviews() {
			try {
				// 检查 designerId 是否为有效的 UUID 格式
				const isValidUUID = this.designerId && /^[0-9a-f]{32}$/i.test(this.designerId)
				if (!isValidUUID) {
					console.warn('designerId 格式不正确，跳过加载评价:', this.designerId)
					return
				}

				const res = await designerApi.getReviews(this.designerId, { page: 1, pageSize: 10 })
				if (res && res.data) {
					const data = res.data
					const list = data.list || data.records || []
					
					this.reviews = list.map(r => ({
						id: r.id,
						title: r.title || "服务很好",
						rating: String(r.rating || 5.0),
						content: r.content,
						author: r.userName || r.author,
						avatar: r.userAvatar || "https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg",
						date: r.createTime || r.date || r.time,
						image: r.images && r.images.length > 0 ? r.images[0] : "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
					}))

					
					const ratingStats = data.ratingStats
					this.reviewTags = ratingStats?.filterTags?.map((tag, index) => ({
						text: tag.label,
						count: String(tag.count || ''),
						active: index === 0
					})) || [
						{ text: "技术很好", count: String(data.total || this.reviews.length), active: true },
						{ text: "效果满意", count: String(Math.floor((data.total || this.reviews.length) * 0.8)), active: false },
						{ text: "服务态度", count: String(Math.floor((data.total || this.reviews.length) * 0.7)), active: false },
					]
				}
			} catch (error) {
				console.error('加载点评失败:', error)
			}
		},
		switchNav(index) {
			this.activeNavTab = index
		},
		selectTag(index) {
			this.reviewTags.forEach((tag, i) => {
				tag.active = i === index
			})
		},
		handleViewMoreReviews() {
			this.$emit('go-to-reviews')
		},
		handleViewMoreQA() {
			console.log('View more QA')
		},
		handleQuestionClick(question) {
			console.log('Question clicked:', question)
		},
		handleJoin() {
			uni.navigateTo({
				url: '/packageMine/pages/mine/apply-settlement'
			})
		},
		handleReviewScroll(e) {
			const scrollLeft = e.detail.scrollLeft || 0
			const maxScroll = this.getReviewMaxScroll()
			const direction = scrollLeft - this.lastReviewScrollLeft

			
			if (this.reviewFadeTimeout) {
				clearTimeout(this.reviewFadeTimeout)
			}
			if (this.reviewFadeStartTimeout) {
				clearTimeout(this.reviewFadeStartTimeout)
			}

			
			this.reviewFadeOut = false

			if (direction > 0) {
				
				this.showReviewRightFade = scrollLeft < maxScroll - 2
				this.showReviewLeftFade = false
			} else if (direction < 0) {
				
				this.showReviewLeftFade = scrollLeft > 2
				this.showReviewRightFade = false
			}

			this.lastReviewScrollLeft = scrollLeft
			this.reviewScrollLeft = scrollLeft
			this.updateReviewFadeEdges(scrollLeft)

			
			this.reviewFadeStartTimeout = setTimeout(() => {
				
				this.reviewFadeOut = true
				
				this.reviewFadeTimeout = setTimeout(() => {
					this.showReviewLeftFade = false
					this.showReviewRightFade = false
					this.reviewFadeOut = false
				}, 1500)
			}, 300)
		},
		getReviewMaxScroll() {
			return Math.max(this.reviewScrollContentWidth - this.reviewScrollContainerWidth, 0)
		},
		updateReviewFadeEdges(scrollLeft = 0) {
			const maxScroll = this.getReviewMaxScroll()
			if (maxScroll <= 0) {
				this.showReviewLeftFade = false
				this.showReviewRightFade = false
				return
			}

			if (scrollLeft <= 2) {
				this.showReviewLeftFade = false
			}
			if (scrollLeft >= maxScroll - 2) {
				this.showReviewRightFade = false
			}
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
		}
	},
	computed: {
		currentInfoData() {
			if (this.activeNavTab === 0) {
				return this.serviceInfoData
			} else if (this.activeNavTab === 1) {
				return this.serviceFeaturesData
			} else {
				return this.environmentData
			}
		},
		totalReviewCount() {
			return this.reviews.length || this.reviewTags.reduce((sum, tag) => sum + parseInt(tag.count || 0), 0)
		},
		displayedReviews() {
			return this.reviews.slice(0, 10)
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
.portfolio-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: stretch;
	gap: 16rpx;
	padding: 0;
	box-sizing: border-box;
}

.info-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	border: 0;
	box-shadow: none;
	box-sizing: border-box;
	overflow: hidden;
}

.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx;
	width: 100%;
	box-sizing: border-box;
}

.nav-tabs {
	display: inline-flex;
	align-items: center;
	gap: 40rpx;
	flex: 1;
}

.nav-item {
	font-size: 28rpx;
	text-align: left;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	cursor: pointer;
	position: relative;
	white-space: nowrap;
}

.nav-item.active {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: 600;
	color: #000000;
}

.chevron-icon {
	width: 28rpx;
	height: 28rpx;
	flex-shrink: 0;
	opacity: 0.6;
}

.info-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0;
	padding: 0 20rpx 20rpx;
	width: 100%;
	box-sizing: border-box;
}

.info-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0;
	width: 100%;
	padding: 10rpx 0;
	box-sizing: border-box;
}

.info-row {
	display: flex;
	align-items: center;
	gap: 30rpx;
	width: 100%;
	box-sizing: border-box;
}

.info-label {
	min-width: 96rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
	flex-shrink: 0;
	white-space: nowrap;
}

.info-value-group {
	display: inline-flex;
	align-items: center;
	gap: 16rpx;
	flex: 1;
	box-sizing: border-box;
	min-width: 0;
}

.info-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 24rpx;
	flex-shrink: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.info-extra {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 24rpx;
	flex-shrink: 0;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #f5f5f5;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
}


.features-content {
	padding: 0 20rpx 20rpx;
	width: 100%;
	box-sizing: border-box;
}

.feature-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 32rpx;
}

.feature-section:last-child {
	margin-bottom: 0;
}

.section-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 400;
	color: #666666;
	font-size: 28rpx;
	margin-bottom: 20rpx;
}

.tags-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
	width: 100%;
}

.feature-tag {
	flex: 0 0 calc(50% - 8rpx);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16rpx 20rpx;
	background-color: #f5f5f5;
	border-radius: 8rpx;
	box-sizing: border-box;
	min-height: 72rpx;
}

.feature-tag text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
	text-align: center;
}

.reviews-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	border: 0;
	box-shadow: none;
	box-sizing: border-box;
	overflow: hidden;
	align-self: stretch;
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
	box-sizing: border-box;
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

.reviews-scroll-wrapper {
	position: relative;
	width: 100%;
	overflow: hidden;
}

.reviews-scroll {
	width: 100%;
	white-space: nowrap;
	box-sizing: border-box;
}

.scroll-fade-left,
.scroll-fade-right {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 60rpx;
	pointer-events: none;
	opacity: 0;
	transition: opacity 1.5s linear;
	z-index: 10;
}

.scroll-fade-left {
	left: 0;
	background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 30%, rgba(255, 255, 255, 0) 100%);
}

.scroll-fade-right {
	right: 0;
	background: linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 30%, rgba(255, 255, 255, 0) 100%);
}

.scroll-fade-left.visible,
.scroll-fade-right.visible {
	opacity: 1;
}

.scroll-fade-left.fading,
.scroll-fade-right.fading {
	opacity: 0;
}

.reviews-list {
	display: inline-flex;
	align-items: flex-start;
	gap: 24rpx;
	padding: 0 20rpx 20rpx;
	min-width: 100%;
	box-sizing: border-box;
	width: auto;
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
	padding: 4rpx;
	background-color: #333333;
	border-radius: 4rpx;
}

.star-icon {
	width: 20rpx;
	height: 20rpx;
	filter: brightness(0) invert(1);
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
	border-radius: 16rpx;
	border: 0;
	box-shadow: none;
	box-sizing: border-box;
	overflow: hidden;
}

.questions-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 24rpx;
	padding: 0 20rpx 20rpx;
	width: 100%;
	box-sizing: border-box;
}

.question-item {
	display: flex;
	align-items: center;
	gap: 16rpx;
	width: 100%;
	box-sizing: border-box;
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
	flex: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	white-space: normal;
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
	border-radius: 16rpx;
	box-sizing: border-box;
}

.join-text {
	background: linear-gradient(90deg, rgba(253, 145, 255, 1) 0%, rgba(83, 64, 254, 1) 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	font-size: 24rpx;
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

