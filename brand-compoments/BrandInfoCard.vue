<template>
	<view class="brand-info-card">
		<view class="card-wrapper">
			<!-- 关注按钮 -->
			<view class="follow-btn" @tap="handleFollow">
				<view class="follow-content">
					<image class="follow-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-11.svg" mode="aspectFit"></image>
					<text class="follow-text">关注</text>
				</view>
				<text class="follow-subtitle">你的优质好店</text>
			</view>
			
			<!-- 背景装饰 -->
			<image 
				class="bg-decoration" 
				src="https://c.animaapp.com/mi5l377nJk1HHO/img/subtract.svg" 
				mode="aspectFill"
			></image>
			
			<!-- 品牌信息 -->
			<view class="brand-card">
				<view class="brand-info">
					<!-- 头像 -->
					<view class="avatar" :style="{ backgroundImage: `url(${brandInfo.avatar})` }"></view>
					
					<!-- 基本信息 -->
					<view class="info-content">
						<view class="name-row">
							<text class="brand-name">{{ brandInfo.name }}</text>
						</view>
						<view class="badge-row">
							<view class="verify-badge" v-if="brandInfo.verifyBadge">
								<text class="verify-text">{{ brandInfo.verifyBadge }}</text>
							</view>
							<text class="divider" v-if="brandInfo.verifyBadge && brandInfo.certText">｜</text>
							<view class="cert-badge" v-if="brandInfo.certText">
								<image class="cert-icon" :src="brandInfo.certIcon" mode="aspectFit"></image>
								<text class="cert-text">{{ brandInfo.certText }}</text>
								<image class="cert-dot" :src="brandInfo.certDot" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 店铺性质和品牌简介 -->
				<view class="info-section">
					<view class="info-item" v-if="brandInfo.type">
						<view class="info-badge">店铺性质</view>
						<text class="info-text">{{ brandInfo.type }}</text>
					</view>
					<view class="info-item intro-item" v-if="brandInfo.introduction">
						<view class="info-badge">品牌简介</view>
						<text class="intro-text">{{ brandInfo.introduction }}</text>
						<view class="more-btn" @tap="handleMoreClick">
							<text class="more-text">更多</text>
							<image class="more-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-9.svg" mode="aspectFit"></image>
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
								<image class="more-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-5.svg" mode="aspectFit"></image>
							</view>
						</view>
						<view class="phone-btn" @tap="handlePhone">
							<image class="phone-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1879-2.svg" mode="aspectFit"></image>
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
							<image class="nav-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1879.svg" mode="aspectFit"></image>
							<text class="nav-label">导航</text>
						</view>
					</view>
				</view>
				
				<!-- 分隔线 -->
				<view class="separator-line"></view>
				
				<!-- 优惠信息 -->
				<view class="promotions">
					<image class="promo-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1.svg" mode="aspectFit"></image>
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
					<image class="share-icon" :src="rightStats.shareIcon || 'https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1879-1.svg'" mode="aspectFit"></image>
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
		brandInfo: {
			type: Object,
			default: () => ({
				avatar: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-153.png",
				name: "金龙大好人美发沙龙...",
				verifyBadge: "舒适",
				certIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-3.svg",
				certText: "企业认证",
				certDot: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg",
				type: "工作室、专业店",
				introduction: "从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长..."
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
				status: "营业中",
				restDay: "周二休息",
				hours: "10:00-21:00"
			})
		},
		shopInfo: {
			type: Object,
			default: () => ({
				name: "锦江区红星路120号",
				address: "IFS国际东门2栋607室",
				distance: "距您2.7km"
			})
		},
		promotions: {
			type: Array,
			default: () => []
		},
		rightStats: {
			type: Object,
			default: () => ({
				serviceIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-4.svg",
				serviceCount: "281",
				workIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-12.svg",
				workCount: "234",
				dotIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg"
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
		}
	}
}
</script>

<style scoped lang="scss">
.brand-info-card {
	position: relative;
	width: 100%;
	margin-bottom: 18rpx;
}

.card-wrapper {
	position: relative;
	width: 100%;
}

.follow-btn {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 10;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 6rpx;
	padding: 10rpx 20rpx;
	border-radius: 32rpx;
	background: linear-gradient(180deg, rgba(135, 134, 145, 1) 0%, rgba(59, 54, 83, 1) 100%);
	cursor: pointer;
	box-sizing: border-box;
}

.follow-content {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.follow-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
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
}

.bg-decoration {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: auto;
	object-fit: cover;
	pointer-events: none;
	z-index: 0;
}

.brand-card {
	position: relative;
	z-index: 1;
	width: 100%;
	background-color: transparent;
	padding: 30rpx;
	box-sizing: border-box;
}

.brand-info {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
	margin-bottom: 20rpx;
}

.avatar {
	width: 158rpx;
	height: 158rpx;
	background-size: cover;
	background-position: center;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.info-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-end;
	gap: 8rpx;
	padding: 12rpx 0;
	flex: 1;
}

.name-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.brand-name {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 32rpx;
}

.badge-row {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.verify-badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 4rpx 8rpx;
	background-color: #dacbb1;
	border-radius: 6rpx;
}

.verify-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #645e57;
	font-size: 22rpx;
}

.divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 26rpx;
}

.cert-badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 4rpx;
	padding: 4rpx 10rpx;
	background-color: #f6f6f6;
	border-radius: 6rpx;
}

.cert-icon {
	width: 24rpx;
	height: 24rpx;
}

.cert-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
}

.cert-dot {
	width: 14rpx;
	height: 14rpx;
}

.info-section {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
	margin-bottom: 20rpx;
}

.info-item {
	display: flex;
	align-items: flex-start;
	gap: 12rpx;
	position: relative;
}

.info-badge {
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

.info-text {
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

.intro-item {
	align-items: flex-start;
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
	width: 28rpx;
	height: 28rpx;
}

.service-badges {
	display: flex;
	align-items: flex-start;
	gap: 10rpx;
	flex-wrap: wrap;
	margin-bottom: 20rpx;
}

.service-badge {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4rpx;
	padding: 4rpx 8rpx;
	height: 42rpx;
	flex: 1;
	min-width: 0;
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
	overflow: hidden;
	text-overflow: ellipsis;
}

.stats-container {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10rpx;
	margin-bottom: 20rpx;
}

.stat-item {
	display: flex;
	flex-direction: column;
	height: 82rpx;
	align-items: center;
	justify-content: center;
	padding: 8rpx 0;
	flex: 1;
	border-radius: 8rpx;
	background: linear-gradient(180deg, rgba(241, 241, 241, 1) 0%, rgba(255, 255, 255, 1) 100%);
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
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
}

.stat-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
}

.business-info {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	margin-bottom: 24rpx;
}

.business-card {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 14rpx 20rpx;
	background-color: #f6f6f6;
	border-radius: 12rpx;
	position: relative;
	overflow: hidden;
}

.business-content {
	display: inline-flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0;
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
	position: absolute;
	top: 70rpx;
	left: 20rpx;
	cursor: pointer;
}

.phone-btn, .nav-btn {
	display: flex;
	flex-direction: column;
	width: 48rpx;
	gap: 4rpx;
	align-items: center;
	flex-shrink: 0;
	cursor: pointer;
}

.phone-icon, .nav-icon {
	width: 100%;
	height: 48rpx;
}

.phone-label, .nav-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 18rpx;
}

.shop-card {
	background-color: #f6f6f6;
	position: relative;
	overflow: hidden;
}

.shop-bg {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	background-image: url('https://c.animaapp.com/mi5l377nJk1HHO/img/mask-group.png');
	background-size: cover;
	background-position: center;
	border-radius: 12rpx;
	z-index: 1;
}

.shop-name, .shop-address, .shop-distance {
	position: relative;
	z-index: 2;
}

.shop-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
}

.shop-address {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 22rpx;
}

.shop-distance {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
	margin-bottom: 24rpx;
}

.promotions {
	display: flex;
	align-items: center;
	gap: 20rpx;
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
	height: 40rpx;
	justify-content: center;
	gap: 8rpx;
	padding: 6rpx 12rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
}

.right-stats {
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	gap: 284rpx;
	width: 336rpx;
	height: 404rpx;
	padding: 30rpx;
	box-sizing: border-box;
	z-index: 3;
}

.share-btn {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(6rpx);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	flex-shrink: 0;
	z-index: 10;
	align-self: flex-end;
}

.share-icon {
	width: 60rpx;
	height: 60rpx;
	filter: brightness(0) invert(1);
}

.stats-badge {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
	padding: 6rpx 24rpx;
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 34rpx;
	backdrop-filter: blur(6rpx);
	align-self: flex-end;
}

.stat-group {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
}

.stat-icon {
	width: 36rpx;
	height: 36rpx;
	filter: brightness(0) invert(1);
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
	filter: brightness(0) invert(1);
}

.stat-divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.5);
	font-size: 24rpx;
}
</style>

