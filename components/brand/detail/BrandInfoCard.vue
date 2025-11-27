<template>
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
			
			<!-- 店铺信息 -->
			<view class="designer-card">
				<view class="designer-info">
				<!-- 头像 -->
				<view class="avatar-wrapper">
					<view class="avatar" :style="{ backgroundImage: `url(${designerInfo.avatar})` }"></view>
				</view>
					
					<!-- 基本信息 -->
					<view class="info-content">
						<view class="name-row">
							<text class="designer-name">{{ designerInfo.name }}</text>
							<image class="verify-icon" :src="designerInfo.verifyIcon" mode="aspectFit"></image>
						</view>
						<view class="role-row">
							<text class="role">{{ designerInfo.role }}</text>
							<text class="divider">｜</text>
							<view class="cert-badge">
								<image class="cert-icon" :src="designerInfo.certIcon" mode="aspectFit"></image>
								<text class="cert-text">{{ designerInfo.certText }}</text>
								<image class="cert-dot" :src="designerInfo.certDot" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 专业擅长和个人简介 -->
				<view class="skills-section">
					<view class="skill-item">
						<view class="skill-badge">店铺性质</view>
						<text class="skill-text">{{ designerInfo.skills }}</text>
					</view>
					<view class="skill-item intro-item">
						<view class="skill-badge2">品牌简介</view>
						<text class="intro-text">{{ designerInfo.introduction }}</text>
						<view class="more-btn" @tap="handleMoreClick">
							<text class="more-text">更多</text>
							<image class="more-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-8.svg" mode="aspectFit"></image>
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
							<view class="business-more" @tap="handleMoreClick">
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
				<view class="promotions" @tap="handleCouponClick">
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
</template>

<script>
export default {
	props: {
		designerInfo: {
			type: Object,
			default: () => ({
				// avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-153.png",
				// name: "朱一龙",
				// verifyIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2110.svg",
				// role: "技术总监",
				// certIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2.svg",
				// certText: "职业认证",
				// certDot: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg",
				// skills: "染发设计、短发造型、女士晚装:",
				// introduction: "从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长..."
			})
		},
		serviceBadges: {
			type: Array,
			default: () => []
		},
		statsData: {
			type: Array,
			default: () => []
		},
		businessInfo: {
			type: Object,
			default: () => ({
				// status: "营业中",
				// restDay: "周二休息",
				// hours: "10:00-21:00"
			})
		},
		shopInfo: {
			type: Object,
			default: () => ({
				// name: "NICE美发造型沙...",
				// address: "武侯区天府三家B7栋...",
				// distance: "距您2.7km"
			})
		},
		promotions: {
			type: Array,
			default: () => []
		},
		rightStats: {
			type: Object,
			default: () => ({
				// serviceIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1.svg",
				// serviceCount: "281",
				// workIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-4.svg",
				// workCount: "234",
				// dotIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg"
			})
		}
	},
	methods: {
		handleFollow() {
			this.$emit('follow')
		},
		handleMoreClick() {
			this.$emit('more-info')
		},
		handlePhone() {
			this.$emit('phone')
		},
		handleNavigation() {
			this.$emit('navigation')
		},
		handleShare() {
			this.$emit('share')
		},
		handleCouponClick() {
			this.$emit('coupon-click')
		}
	}
}
</script>

<style scoped lang="scss">
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
	padding: 7rpx 30rpx 20rpx 30rpx;
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
	align-items: flex-start;
	gap: 16rpx;
	margin-bottom: 20rpx;
	position: relative;
	z-index: 4;
}

.avatar-wrapper {
	position: relative;
	left: -1rpx;
	width: 158rpx;
	height: 157rpx;
	flex-shrink: 0;
	background-image: url('/static/background-image/avatar-shape.png');
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
}

.avatar {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	border-radius: 8rpx;
	mask-image: url('/static/background-image/avatar-shape.png');
	mask-size: contain;
	mask-position: center;
	mask-repeat: no-repeat;
	-webkit-mask-image: url('/static/background-image/avatar-shape.png');
	-webkit-mask-size: contain;
	-webkit-mask-position: center;
	-webkit-mask-repeat: no-repeat;
}

.info-content {
	margin-top: 55rpx;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.name-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.designer-name {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 32rpx;
}

.verify-icon {
	width: 32rpx;
	height: 32rpx;
}

.role-row {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.role {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0rpx 10rpx;
	background-color: #dacbb1;
	border-radius: 6rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 400;
	color: #645e57;
	font-size: 22rpx;
	height: 36rpx;
	line-height: 36rpx;
}

.divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 24rpx;
}

.cert-badge {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
	padding: 4rpx 10rpx;
	background-color: #f6f6f6;
	border-radius: 6rpx;
	height: 36rpx;
}

.cert-icon {
	width: 24rpx;
	height: 24rpx;
}

.cert-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 20rpx;
}

.cert-dot {
	width: 14rpx;
	height: 14rpx;
}

.skills-section {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	margin-bottom: 20rpx;
	position: relative;
	z-index: 4;
}

.skill-item {
	display: flex;
	align-items: center;
	gap: 12rpx;
	position: relative;
}

.skill-badge {
	// margin-top: -20rpx;
	display: inline-flex;
	align-items: center;
	height: 44rpx;
	padding: 4rpx 8rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 22rpx;
	flex-shrink: 0;
}

.skill-badge2{
	margin-top: -40rpx;
	display: inline-flex;
	align-items: center;
	height: 44rpx;
	padding: 4rpx 8rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 22rpx;
	flex-shrink: 0;
}
.skill-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
	flex: 1;
}

.intro-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
	line-height: 42rpx;
	flex: 1;
}

.more-btn {
	position: absolute;
	top: 42rpx;
	right: 0;
	display: inline-flex;
	align-items: center;
	gap: 2rpx;
	cursor: pointer;
}

.more-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
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
	gap: 6rpx;
	padding: 4rpx 10rpx 8rpx 10rpx;
	height: 42rpx;
	flex-shrink: 0;
	width: auto;
	background-color: #f6f6f6;
	border-radius: 8rpx;
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
	height: 0;
	border-top: 2rpx dashed #e5e5e5;
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
	margin-top: -4rpx;
	margin-bottom: 0;
	padding-bottom: 0;
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
</style>
