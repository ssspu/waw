<template>
	<view class="brand-store-page">
		<!-- 自定义导航栏 -->
		<view class="custom-header">
			<!-- 导航栏内容 -->
			<view class="navbar-content">
				<view class="nav-left">
					<view class="back-btn" @tap="goBack">
						<image 
							class="back-icon" 
							src="https://c.animaapp.com/mi5ng54v4eM3X6/img/frame.svg" 
							mode="aspectFit"
						></image>
					</view>
				</view>
				<text class="nav-title">品牌馆</text>
				<view class="nav-right">
					<view class="action-btn" @tap="handleMore">
					</view>
					<view class="action-btn" @tap="handleRadio">
					</view>
				</view>
			</view>
		</view>
		
		<!-- 主内容区域 -->
		<view class="main-content">
			<!-- Tab导航 -->
			<view class="brand-tab-nav">
				<view class="tab-nav">
					<view 
						class="tab-item"
						:class="{ active: activeBrandTab === 'hair' }"
						@tap="handleBrandTabChange('hair')"
					>
						<text class="tab-label" :class="{ active: activeBrandTab === 'hair' }">美发</text>
						<image 
							v-if="activeBrandTab === 'hair'"
							class="tab-indicator" 
							src="https://c.animaapp.com/mi5ng54v4eM3X6/img/vector-15.svg" 
							mode="aspectFit"
						></image>
					</view>
					<view 
						class="tab-item"
						:class="{ active: activeBrandTab === 'beauty' }"
						@tap="handleBrandTabChange('beauty')"
					>
						<text class="tab-label" :class="{ active: activeBrandTab === 'beauty' }">美容</text>
						<image 
							v-if="activeBrandTab === 'beauty'"
							class="tab-indicator" 
							src="https://c.animaapp.com/mi5ng54v4eM3X6/img/vector-15.svg" 
							mode="aspectFit"
						></image>
					</view>
					<view 
						class="tab-item"
						:class="{ active: activeBrandTab === 'makeup' }"
						@tap="handleBrandTabChange('makeup')"
					>
						<text class="tab-label" :class="{ active: activeBrandTab === 'makeup' }">化妆</text>
						<image 
							v-if="activeBrandTab === 'makeup'"
							class="tab-indicator" 
							src="https://c.animaapp.com/mi5ng54v4eM3X6/img/vector-15.svg" 
							mode="aspectFit"
						></image>
					</view>
					<view 
						class="tab-item"
						:class="{ active: activeBrandTab === 'nail' }"
						@tap="handleBrandTabChange('nail')"
					>
						<text class="tab-label" :class="{ active: activeBrandTab === 'nail' }">美甲</text>
						<image 
							v-if="activeBrandTab === 'nail'"
							class="tab-indicator" 
							src="https://c.animaapp.com/mi5ng54v4eM3X6/img/vector-15.svg" 
							mode="aspectFit"
						></image>
					</view>
					<view 
						class="tab-item"
						:class="{ active: activeBrandTab === 'body' }"
						@tap="handleBrandTabChange('body')"
					>
						<text class="tab-label" :class="{ active: activeBrandTab === 'body' }">美体</text>
						<image 
							v-if="activeBrandTab === 'body'"
							class="tab-indicator" 
							src="https://c.animaapp.com/mi5ng54v4eM3X6/img/vector-15.svg" 
							mode="aspectFit"
						></image>
					</view>
				</view>
			</view>

			<!-- 品牌卡片列表 -->
			<view 
				v-for="(card, index) in brandCards" 
				:key="index"
				class="brand-card"
			>
				<view class="card-content">
					<!-- 头部信息 -->
					<view class="header-info">
						<view class="info-left">
							<text 
								v-for="(item, idx) in card.headerInfo" 
								:key="idx" 
								class="info-text"
							>{{ item }}</text>
						</view>
						<text class="info-price">¥{{ card.price }}</text>
					</view>
					
					<!-- 分隔线 -->
					<view class="separator-line"></view>
					
					<!-- 服务提供者信息 -->
					<view class="service-info">
						<view class="service-left">
							<!-- 头像 -->
							<view class="avatar-wrapper">
								<view class="avatar" :style="{backgroundImage: `url(${avatarImage})`}"></view>
							</view>
							
							<!-- 详情 -->
							<view class="service-details">
								<view class="service-header">
									<text class="service-name">{{ card.name }}</text>
									<view class="role-badge" style="background-color: #f6f6f6; color: #666666;">
										<text class="badge-text">{{ card.type }}</text>
									</view>
									<view class="role-badge" style="background-color: #dacbb1; color: #645e57;">
										<text class="badge-text">{{ card.level }}</text>
									</view>
								</view>
								
								<text class="service-role">{{ card.role }}</text>
								
								<view class="service-skills">
									<text class="skills-label">擅长:</text>
									<view 
										v-for="(specialty, idx) in card.specialties" 
										:key="idx" 
										class="skill-badge"
									>
										<text class="skill-text">{{ specialty }}</text>
									</view>
								</view>
								
								<view class="service-stats">
									<view class="rating-section">
										<text class="rating-score">{{ card.rating }}</text>
										<view class="star-wrapper">
											<image 
												class="star-icon" 
												src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/star-1.svg" 
												mode="aspectFit"
											></image>
										</view>
									</view>
									
									<view class="stats-section">
										<view class="stat-item">
											<text class="stat-label">设计师</text>
											<text class="stat-value">{{ card.designers }}</text>
										</view>
										<text class="stat-divider">｜</text>
										<view class="stat-item">
											<text class="stat-label">服务</text>
											<text class="stat-value">{{ card.services }}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					
					<!-- 底部操作 -->
					<view class="action-bar">
						<text class="more-link" @tap="handleMore">更多</text>
						<view class="action-buttons">
							<view class="promote-btn" @tap="handlePromote">
								<text class="btn-text">推广</text>
							</view>
							<view class="book-again-btn" @tap="handleBookAgain">
								<text class="btn-text primary">再次预约</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 分享弹窗 -->
				<view v-if="showShareModal" class="share-modal-overlay" @tap="closeShareModal">
					<view class="share-modal" @tap.stop="">
						<view class="share-grid">
							<view class="share-item" @tap="handleShare('wechat')">
								<view class="share-icon wechat-icon">
									<text>微信</text>
								</view>
								<text class="share-label">微信</text>
							</view>
							<view class="share-item" @tap="handleShare('moments')">
								<view class="share-icon moments-icon">
									<text>朋友圈</text>
								</view>
								<text class="share-label">朋友圈</text>
							</view>
							<view class="share-item" @tap="handleShare('weibo')">
								<view class="share-icon weibo-icon">
									<text>微博</text>
								</view>
								<text class="share-label">微博</text>
							</view>
							<view class="share-item" @tap="handleShare('link')">
								<view class="share-icon link-icon">
									<text>链接</text>
								</view>
								<text class="share-label">复制链接</text>
							</view>
							<view class="share-item" @tap="handleShare('qrcode')">
								<view class="share-icon qrcode-icon">
									<text>二维码</text>
								</view>
								<text class="share-label">服务二维码</text>
							</view>
						</view>
						<view class="share-cancel" @tap="closeShareModal">
							<text>取消</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部指示器 -->
		<view class="footer-indicator">
			<!-- <view class="indicator-bar"></view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			activeBrandTab: 'hair',
			showShareModal: false,
			avatarImage: '/static/avatar/avatar.png',
			brandCards: [
				{
					headerInfo: ['2025-05-05', '｜', '洗剪吹', '｜', '欧莱雅生化烫'],
					price: 888,
					name: '成都NICE造型沙龙',
					type: '品牌',
					level: '舒适',
					role: '专业店｜2012年开业',
					specialties: ['女士造型', '烫发设计', '短发造型'],
					rating: 4.8,
					designers: 8,
					services: 1236
				},
				{
					headerInfo: ['2025-05-05', '｜', '洗剪吹', '｜', '欧莱雅生化烫'],
					price: 888,
					name: '成都NICE造型沙龙',
					type: '品牌',
					level: '舒适',
					role: '专业店｜2012年开业',
					specialties: ['女士造型', '烫发设计', '短发造型'],
					rating: 4.8,
					designers: 8,
					services: 1236
				},
				{
					headerInfo: ['2025-05-05', '｜', '洗剪吹', '｜', '欧莱雅生化烫'],
					price: 888,
					name: '成都NICE造型沙龙',
					type: '品牌',
					level: '舒适',
					role: '专业店｜2012年开业',
					specialties: ['女士造型', '烫发设计', '短发造型'],
					rating: 4.8,
					designers: 8,
					services: 1236
				},
				{
					headerInfo: ['2025-05-05', '｜', '洗剪吹', '｜', '欧莱雅生化烫'],
					price: 888,
					name: '成都NICE造型沙龙',
					type: '品牌',
					level: '舒适',
					role: '专业店｜2012年开业',
					specialties: ['女士造型', '烫发设计', '短发造型'],
					rating: 4.8,
					designers: 8,
					services: 1236
				}
			]
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		handleMore() {
			console.log('More clicked')
		},
		handleRadio() {
			console.log('Radio clicked')
		},
		handleBrandTabChange(tabId) {
			this.activeBrandTab = tabId
		},
		handlePromote() {
			this.showShareModal = true
		},
		closeShareModal() {
			this.showShareModal = false
		},
		handleShare(type) {
			console.log('Share via:', type)
			this.showShareModal = false
		},
		handleBookAgain() {
			console.log('Book again clicked')
		}
	}
}
</script>

<style scoped lang="scss">
.brand-store-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.custom-header {
	position: relative;
	width: 100%;
	background-color: #ffffff;
	flex-shrink: 0;
}

.navbar-content {
	position: relative;
	width: 100%;
	height: 96rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 32rpx;
	box-sizing: border-box;
}

.nav-left {
	position: absolute;
	left: 32rpx;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
	z-index: 2;
}

.back-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
}

.nav-right {
	position: absolute;
	right: 32rpx;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	gap: 16rpx;
	z-index: 2;
}

.action-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
	cursor: pointer;
}

.main-content {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 12rpx;
	gap: 12rpx;
	box-sizing: border-box;
	background-color: #f2f2f2;
}

.brand-tab-nav {
	background-color: #ffffff;
	padding: 24rpx 30rpx;
	box-sizing: border-box;
	flex-shrink: 0;
	width: 100%;
}

.tab-nav {
	display: flex;
	align-items: flex-start;
	gap: 24rpx;
	width: 100%;
	flex-wrap: wrap;
}

.tab-item {
	display: inline-flex;
	flex-direction: column;
	height: 62rpx;
	align-items: center;
	gap: 20rpx;
	position: relative;
	cursor: pointer;
	transition: color 0.3s;
}

.tab-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 28rpx;
	text-align: center;
	
	&.active {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: 600;
		color: #000000;
	}
}

.tab-indicator {
	position: absolute;
	bottom: -20rpx;
	width: 20rpx;
	height: 6rpx;
	flex-shrink: 0;
	margin-bottom: -1rpx;
}

.brand-card {
	width: 100%;
	max-width: 726rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-sizing: border-box;
	margin: 0 auto;
	position: relative;
}

.card-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	padding: 24rpx;
	box-sizing: border-box;
}

.header-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.info-left {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.info-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 26rpx;
}

.info-price {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 26rpx;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
}

.service-info {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.service-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.avatar-wrapper {
	position: relative;
	width: 160rpx;
	height: 160rpx;
	flex-shrink: 0;
}

.avatar {
	position: absolute;
	top: 0;
	left: 0;
	width: 160rpx;
	height: 160rpx;
	border-radius: 92rpx 92rpx 4rpx 92rpx;
	background-image: none;
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
}

.service-details {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
	flex: 1;
	min-width: 0;
}

.service-header {
	display: flex;
	align-items: center;
	gap: 8rpx;
	flex-wrap: wrap;
}

.service-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.role-badge {
	display: inline-flex;
	align-items: center;
	padding: 4rpx 8rpx;
	border-radius: 4rpx;
	height: auto;
	box-sizing: border-box;
}

.badge-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	font-size: 20rpx;
}

.service-role {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
}

.service-skills {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
	flex-wrap: wrap;
}

.skills-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.skill-badge {
	display: inline-flex;
	align-items: center;
	padding: 4rpx 8rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	height: auto;
	box-sizing: border-box;
}

.skill-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 20rpx;
}

.service-stats {
	display: inline-flex;
	align-items: center;
	gap: 16rpx;
}

.rating-section {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
}

.rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 24rpx;
}

.star-wrapper {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
	padding: 2rpx;
	background-color: #333333;
	border-radius: 4rpx;
}

.star-icon {
	width: 16rpx;
	height: 16rpx;
	flex-shrink: 0;
	filter: brightness(0) invert(1);
}

.stats-section {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.stat-item {
	display: inline-flex;
	align-items: flex-end;
	gap: 4rpx;
}

.stat-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.stat-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 24rpx;
}

.stat-divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.action-bar {
	display: flex;
	height: 72rpx;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.more-link {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
	cursor: pointer;
}

.action-buttons {
	display: flex;
	align-items: center;
	gap: 12rpx;
	flex: 1;
	justify-content: flex-end;
}

.promote-btn,
.book-again-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 220rpx;
	height: 60rpx;
	padding: 0 30rpx;
	border-radius: 4rpx;
	cursor: pointer;
	box-sizing: border-box;
	flex-shrink: 0;
}

.promote-btn {
	background-color: #f6f6f6;
}

.book-again-btn {
	background-color: #333333;
	min-width: 300rpx;
}

.btn-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 22rpx;
	white-space: nowrap;
	display: block;
	
	&.primary {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
		color: #ffffff;
		white-space: nowrap;
	}
}

.share-modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: flex-end;
	z-index: 1000;
}

.share-modal {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx 16rpx 0 0;
	padding: 30rpx 0;
	box-sizing: border-box;
}

.share-grid {
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 30rpx 20rpx;
	flex-wrap: wrap;
	gap: 20rpx;
}

.share-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;
	cursor: pointer;
}

.share-icon {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	font-size: 24rpx;
	font-weight: 500;
}

.wechat-icon {
	background-color: #09b81f;
}

.moments-icon {
	background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
}

.weibo-icon {
	background-color: #e6162d;
}

.link-icon {
	background-color: #999999;
}

.qrcode-icon {
	background-color: #333333;
}

.share-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
	text-align: center;
}

.share-cancel {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20rpx;
	border-top: 1rpx solid #f0f0f0;
	cursor: pointer;
}

.share-cancel text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #999999;
	font-size: 28rpx;
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

