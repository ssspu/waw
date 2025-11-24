<template>
	<view class="brand-detail-page">
		<!-- 头部 -->
		<brand-detail-header></brand-detail-header>
		
		<!-- 主内容区域 -->
		<view class="main-content">
			<!-- 品牌信息卡片 -->
			<view class="designer-info-card">
				<view class="card-wrapper">
					<!-- 关注按钮 -->
					<view class="follow-btn" @tap="handleFollow">
						<view class="follow-content">
							<image class="follow-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-12.svg" mode="aspectFit"></image>
							<text class="follow-text">关注</text>
						</view>
						<text class="follow-subtitle">你的优质好店</text>
					</view>
					
					<!-- 背景装饰 -->
					<image 
						class="bg-decoration" 
						src="https://c.animaapp.com/mi5d4lp0csJxnR/img/subtract.svg" 
						mode="aspectFill"
					></image>
					
					<!-- 设计师信息 -->
					<view class="designer-card">
						<view class="designer-info">
							<!-- 头像 -->
							<view class="avatar" :style="{ backgroundImage: `url(${designerInfo.avatar})` }"></view>
							
							<!-- 基本信息 -->
							<view class="info-content">
								<view class="name-row">
									<text class="designer-name">{{ designerInfo.name }}</text>
								</view>
								<view class="tags-row">
									<view class="tag-badge comfort-tag">
										<text class="tag-text">{{ designerInfo.comfortTag || '舒适' }}</text>
									</view>
									<text class="tag-divider">｜</text>
									<view class="cert-badge">
										<image class="cert-icon" :src="designerInfo.certIcon" mode="aspectFit"></image>
										<text class="cert-text">{{ designerInfo.certText }}</text>
										<image class="cert-arrow" src="https://c.animaapp.com/mi5ng54v4eM3X6/img/frame.svg" mode="aspectFit"></image>
									</view>
								</view>
							</view>
						</view>
						
						<!-- 专业擅长和个人简介 -->
						<view class="info-card">
							<view class="info-item">
								<text class="info-label">店铺性质</text>
								<text class="info-value">{{ designerInfo.storeType }}</text>
							</view>
							<view class="info-item intro-item">
								<text class="info-label">品牌简介</text>
								<view class="intro-content">
									<text class="intro-text">{{ designerInfo.introduction }}</text>
									<view class="more-btn" @tap="handleMoreInfo">
										<text class="more-text">更多</text>
										<image class="more-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-8.svg" mode="aspectFit"></image>
									</view>
								</view>
							</view>
						</view>
						
						<!-- 服务标签 -->
						<view class="service-badges">
							<view 
								v-for="(badge, index) in serviceBadges" 
								:key="index" 
								class="service-badge"
							>
								<image class="badge-icon" :src="badge.icon" mode="aspectFit"></image>
								<text class="badge-label">{{ badge.label }}</text>
							</view>
						</view>
						
						<!-- 统计数据 -->
						<view class="stats-container">
							<view 
								v-for="(stat, index) in statsData" 
								:key="index" 
								class="stat-item"
							>
								<view class="stat-value-row">
									<text class="stat-value">{{ stat.value }}</text>
									<text v-if="stat.unit" class="stat-unit">{{ stat.unit }}</text>
								</view>
								<text class="stat-label">{{ stat.label }}</text>
							</view>
						</view>
						
						<!-- 营业信息和店铺信息 -->
						<view class="business-info">
							<view class="business-card">
								<view class="business-content">
									<view class="business-status">
										<text class="status-text">{{ businessInfo.status }}</text>
										<text class="status-note">{{ businessInfo.restDay }}</text>
									</view>
									<text class="business-time">{{ businessInfo.hours }}</text>
									<view class="business-more" @tap="handleMoreInfo">
										<text class="more-text">更多</text>
										<image class="more-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-8.svg" mode="aspectFit"></image>
									</view>
								</view>
								<view class="phone-btn" @tap="handlePhone">
									<image class="phone-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1879-2.svg" mode="aspectFit"></image>
									<text class="phone-label">电话</text>
								</view>
							</view>
							
							<view class="business-card shop-card">
								<view class="shop-bg"></view>
								<view class="business-content">
									<text class="shop-name">{{ shopInfo.name }}</text>
									<text class="shop-address">{{ shopInfo.address }}</text>
									<text class="shop-distance">{{ shopInfo.distance }}</text>
								</view>
								<view class="nav-btn" @tap="handleNavigation">
									<image class="nav-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1879.svg" mode="aspectFit"></image>
									<text class="nav-label">导航</text>
								</view>
							</view>
						</view>
						
						<!-- 分隔线 -->
						<view class="separator-line"></view>
						
						<!-- 优惠信息 -->
						<view class="promotions">
							<image class="promo-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-5.svg" mode="aspectFit"></image>
							<view class="promo-badges">
								<view 
									v-for="(promo, index) in promotions" 
									:key="index" 
									class="promo-badge"
								>
									{{ promo.text }}
								</view>
							</view>
						</view>
					</view>
					
					<!-- 右侧统计 -->
					<view class="right-stats">
						<view class="share-btn" @tap="handleShare">
							<image class="share-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1879-1.svg" mode="aspectFit"></image>
						</view>
						<view class="stats-badge">
							<view class="stat-group">
								<image class="stat-icon" :src="rightStats.serviceIcon" mode="aspectFit"></image>
								<text class="stat-count">({{ rightStats.serviceCount }})</text>
								<image class="stat-dot" :src="rightStats.dotIcon" mode="aspectFit"></image>
							</view>
							<text class="stat-divider">｜</text>
							<view class="stat-group">
								<image class="stat-icon" :src="rightStats.workIcon" mode="aspectFit"></image>
								<text class="stat-count">({{ rightStats.workCount }})</text>
								<image class="stat-dot" :src="rightStats.dotIcon" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- Tab区域 -->
			<view class="tab-section">
				<view class="tab-card">
					<designer-tab-switcher
						:active-tab="activeTab"
						:tabs="tabs"
						@tab-change="handleTabChange"
					></designer-tab-switcher>
					
					<!-- Tab内容 -->
					<view class="tab-content-wrapper">
						<!-- 设计师tab内容 -->
						<view v-if="activeTab === 'stylist'" class="tab-content" :key="'stylist'">
							<designer-profile-section></designer-profile-section>
						</view>
						
						<!-- 服务tab内容 -->
						<view v-if="activeTab === 'service'" class="tab-content" :key="'service'">
							<brand-service-tab-content></brand-service-tab-content>
						</view>
						
						<!-- 作品tab内容 -->
						<view v-if="activeTab === 'works'" class="tab-content" :key="'works'">
							<designer-works-tab-content></designer-works-tab-content>
						</view>
						
						<!-- 点评tab内容 -->
						<view v-if="activeTab === 'reviews'" class="tab-content" :key="'reviews'">
							<brand-reviews-tab-content></brand-reviews-tab-content>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部指示器 -->
		<view class="footer-indicator">
			<view class="indicator-bar"></view>
		</view>
	</view>
</template>

<script>
import BrandDetailHeader from '../../components/brand/detail/BrandDetailHeader.vue'
import DesignerTabSwitcher from '../../components/DesignerTabSwitcher.vue'
import DesignerProfileSection from '../../components/DesignerProfileSection.vue'
import BrandServiceTabContent from '../../components/brand/detail/BrandServiceTabContent.vue'
import DesignerWorksTabContent from '../../components/DesignerWorksTabContent.vue'
import BrandReviewsTabContent from '../../components/brand/detail/BrandReviewsTabContent.vue'

export default {
	components: {
		BrandDetailHeader,
		DesignerTabSwitcher,
		DesignerProfileSection,
		BrandServiceTabContent,
		DesignerWorksTabContent,
		BrandReviewsTabContent
	},
	onLoad(options) {
		// 可以从options中获取品牌ID等信息
		if (options.id) {
			console.log('Brand ID:', options.id)
		}
		// 支持从URL参数中指定初始tab
		if (options.tab) {
			this.activeTab = options.tab
		}
	},
	data() {
		return {
			activeTab: 'stylist',
			tabs: [
				{ id: 'stylist', label: '设计师' },
				{ id: 'service', label: '服务' },
				{ id: 'works', label: '作品' },
				{ id: 'reviews', label: '点评' }
			],
			designerInfo: {
				avatar: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-153.png",
				name: "金龙大好人美发沙龙...",
				comfortTag: "舒适",
				certIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-3.svg",
				certText: "企业认证",
				skills: "染发设计、短发造型、女士晚装",
				storeType: "工作室、专业店",
				introduction: "从业19年,毕业沙宣美发学院,擅长各种造型设计师有丰富的设计经验擅长..."
			},
			serviceBadges: [
				{ icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "安心服务" },
				{ icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "7天无忧" },
				{ icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "免费设计" },
				{ icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "小吃水果" },
				{ icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "预约服务" }
			],
			statsData: [
				{ value: "1244", label: "预约" },
				{ value: "2000", label: "粉丝" },
				{ value: "18", unit: "年", label: "从业" },
				{ value: "4.8", unit: "分", label: "评分" }
			],
			businessInfo: {
				status: "营业中",
				restDay: "周二休息",
				hours: "10:00-21:00"
			},
			shopInfo: {
				name: "锦江区红星路120号",
				address: "IFS国际东门2栋607室",
				distance: "距您2.7km"
			},
			promotions: [
				{ text: "满100-5" },
				{ text: "满500-50" }
			],
			rightStats: {
				serviceIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-4.svg",
				serviceCount: "281",
				workIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-12.svg",
				workCount: "234",
				dotIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg"
			}
		}
	},
	methods: {
		handleTabChange(tabId) {
			this.activeTab = tabId
		},
		handleMoreInfo() {
			console.log('More info clicked')
		},
		handleFollow() {
			console.log('Follow clicked')
		},
		handlePhone() {
			console.log('Phone clicked')
		},
		handleNavigation() {
			console.log('Navigation clicked')
		},
		handleShare() {
			console.log('Share clicked')
		}
	}
}
</script>

<style scoped lang="scss">
.brand-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-sizing: border-box;
}

.main-content {
	position: relative;
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	padding: 0 12rpx 80rpx;
	box-sizing: border-box;
	margin-top: -200rpx;
	z-index: 5;
}

.designer-info-card {
	position: relative;
	width: calc(100% + 24rpx);
	margin: 0 -12rpx 18rpx -12rpx;
}

.card-wrapper {
	position: relative;
	width: 100%;
}

.follow-btn {
	position: absolute;
	top: 108rpx;
	right: 10rpx;
	width: 200rpx;
	height: 100rpx;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 6rpx;
	padding: 10rpx 20rpx;
	border-radius: 32rpx;
	background: linear-gradient(180deg, rgba(135, 134, 145, 1) 0%, rgba(59, 54, 83, 1) 100%);
	cursor: pointer;
}

.follow-content {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.follow-icon {
	width: 32rpx;
	height: 32rpx;
	filter: brightness(0) invert(1);
}

.follow-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffffff;
	font-size: 24rpx;
}

.follow-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: rgba(255, 255, 255, 0.6);
	font-size: 18rpx;
	margin-top: -2rpx;
}

.bg-decoration {
	width: 100%;
	height: auto;
	object-fit: cover;
}

.designer-card {
	position: relative;
	width: 100%;
	padding: 7rpx 30rpx;
	box-sizing: border-box;
	background-color: transparent;
	overflow: hidden;
}

.designer-card::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url('/static/background-image/designer-card-bg.png');
	background-size: contain;
	background-position: center 58rpx;
	background-repeat: no-repeat;
	z-index: 3;
	pointer-events: none;
}

.designer-info {
	display: flex;
	align-items: center;
	gap: 16rpx;
	margin-bottom: 20rpx;
	position: relative;
	z-index: 4;
}

.avatar {
	width: 158rpx;
	height: 157rpx;
	background-size: cover;
	background-position: center;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.info-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	justify-content: center;
	padding-top: 44rpx;
}

.name-row {
	display: flex;
	align-items: center;
}

.designer-name {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 32rpx;
}

.tags-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
	margin-top: 16rpx;
}

.tag-badge {
	display: inline-flex;
	align-items: center;
	padding: 4rpx 12rpx;
	border-radius: 4rpx;
	height: 36rpx;
	box-sizing: border-box;
}

.comfort-tag {
	background-color: #dacbb1;
}

.tag-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #645e57;
	font-size: 20rpx;
}

.tag-divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 24rpx;
}

.cert-badge {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
	padding: 0;
	background-color: transparent;
	border-radius: 0;
	height: auto;
}

.cert-icon {
	width: 24rpx;
	height: 24rpx;
}

.cert-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 20rpx;
}

.cert-arrow {
	width: 14rpx;
	height: 14rpx;
}

.info-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 8rpx;
	padding: 24rpx 20rpx;
	margin-bottom: 20rpx;
	position: relative;
	z-index: 4;
	box-sizing: border-box;
}

.info-item {
	display: flex;
	align-items: flex-start;
	gap: 20rpx;
}

.info-item.intro-item {
	align-items: flex-start;
}

.info-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
	flex-shrink: 0;
	line-height: 36rpx;
}

.info-value {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #999999;
	font-size: 24rpx;
	flex: 1;
	line-height: 36rpx;
}

.intro-content {
	flex: 1;
	position: relative;
}

.intro-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #999999;
	font-size: 24rpx;
	line-height: 36rpx;
	display: block;
	padding-right: 80rpx;
}

.more-btn {
	position: absolute;
	bottom: 0;
	right: 0;
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
	cursor: pointer;
}

.more-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #999999;
	font-size: 24rpx;
	white-space: nowrap;
}

.more-icon {
	width: 14rpx;
	height: 14rpx;
}

.service-badges {
	display: flex;
	align-items: flex-start;
	gap: 10rpx;
	flex-wrap: wrap;
	margin-bottom: 20rpx;
	position: relative;
	z-index: 4;
}

.service-badge {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4rpx;
	padding: 4rpx 8rpx;
	height: 42rpx;
	flex-shrink: 0;
	width: auto;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	box-sizing: border-box;
}

.badge-icon {
	width: 24rpx;
	height: 24rpx;
	flex-shrink: 0;
}

.badge-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 20rpx;
	white-space: nowrap;
}

.stats-container {
	display: flex;
	align-items: center;
	gap: 10rpx;
	margin-bottom: 20rpx;
	position: relative;
	z-index: 4;
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	height: 82rpx;
	padding: 8rpx 0;
	background: linear-gradient(180deg, rgba(241, 241, 241, 1) 0%, rgba(255, 255, 255, 1) 100%);
	border-radius: 8rpx;
	box-sizing: border-box;
}

.stat-value-row {
	display: inline-flex;
	align-items: flex-end;
	justify-content: center;
	gap: 2rpx;
}

.stat-value {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 30rpx;
}

.stat-unit {
	color: #666666;
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
}

.stat-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
}

.business-info {
	display: flex;
	flex-direction: row;
	gap: 12rpx;
	margin-bottom: 20rpx;
	position: relative;
	z-index: 4;
}

.business-card {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16rpx;
	padding: 14rpx 16rpx;
	background-color: #f6f6f6;
	border-radius: 16rpx;
	position: relative;
	box-sizing: border-box;
	flex: 1;
	min-width: 0;
}

.business-content {
	display: flex;
	flex-direction: column;
	gap: 2rpx;
	flex: 1;
	position: relative;
}

.business-status {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.status-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
}

.status-note {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 20rpx;
}

.business-time {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 22rpx;
}

.business-more {
	display: inline-flex;
	align-items: center;
	gap: 2rpx;
	cursor: pointer;
	margin-top: 6rpx;
}

.phone-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rpx;
	width: 48rpx;
	flex-shrink: 0;
	cursor: pointer;
}

.phone-icon {
	width: 48rpx;
	height: 48rpx;
}

.phone-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 18rpx;
}

.shop-card {
	position: relative;
}

.shop-bg {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	background-image: url('https://c.animaapp.com/mi5d4lp0csJxnR/img/mask-group.png');
	background-size: cover;
	background-position: center;
	border-radius: 16rpx;
	opacity: 0.5;
}

.shop-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
	position: relative;
	z-index: 2;
}

.shop-address {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 22rpx;
	position: relative;
	z-index: 2;
}

.shop-distance {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
	position: relative;
	z-index: 2;
}

.nav-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rpx;
	width: 48rpx;
	flex-shrink: 0;
	cursor: pointer;
	position: relative;
	z-index: 2;
}

.nav-icon {
	width: 48rpx;
	height: 48rpx;
}

.nav-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 18rpx;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
	margin: 20rpx 0;
	position: relative;
	z-index: 4;
}

.promotions {
	display: flex;
	align-items: center;
	gap: 20rpx;
	position: relative;
	z-index: 4;
}

.promo-icon {
	width: 40rpx;
	height: 40rpx;
	flex-shrink: 0;
}

.promo-badges {
	display: inline-flex;
	align-items: flex-start;
	gap: 6rpx;
}

.promo-badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 40rpx;
	padding: 6rpx 12rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
}

.right-stats {
	margin-top: -320rpx;
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	gap: 284rpx;
	width: 336rpx;
	height: 404rpx;
	z-index: 10;
	pointer-events: none;
	
	.share-btn,
	.stats-badge {
		pointer-events: auto;
	}
}

.share-btn {
	margin-left: 50rpx;
	width: 60rpx;
	height: 60rpx;
	cursor: pointer;
}

.share-icon {
	width: 100%;
	height: 100%;
}

.stats-badge {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
	padding: 6rpx 24rpx;
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 34rpx;
	backdrop-filter: blur(6rpx);
}

.stat-group {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
}

.stat-icon {
	width: 36rpx;
	height: 36rpx;
}

.stat-count {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #ffffff;
	font-size: 24rpx;
}

.stat-dot {
	width: 10rpx;
	height: 10rpx;
}

.stat-divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.5);
	font-size: 24rpx;
}

.tab-section {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0;
	padding: 0;
	box-sizing: border-box;
}

.tab-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	box-shadow: none;
	overflow: hidden;
}

.tab-content-wrapper {
	position: relative;
	width: 100%;
	min-height: 200rpx;
	padding: 0 30rpx 24rpx;
	box-sizing: border-box;
}

.tab-content {
	width: 100%;
	animation: fade-in 0.3s ease;
}

@keyframes fade-in {
	0% {
		opacity: 0;
		transform: translateY(10rpx);
	}
	to {
		opacity: 1;
		transform: none;
	}
}

.footer-indicator {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: flex-end;
	gap: 20rpx;
	padding: 16rpx 240rpx;
	flex-shrink: 0;
	box-sizing: border-box;
}

.indicator-bar {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
}
</style>

