<template>
	<view class="territory-page">
		<view class="status-bar-space"></view>
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
				<text class="nav-title">私人领地</text>
				<view class="nav-right">
					<view class="action-btn" @tap="handleMore">
					</view>
					<view class="action-btn" @tap="handleRadio">
					</view>
				</view>
			</view>
		</view>
		
		<!-- 顶部导航栏 - 合并主tabs与子tabs -->
		<view class="top-nav-fixed">
			<!-- 主tabs行 -->
			<view class="top-nav">
				<view 
					class="top-nav-item"
					:class="{ active: activeTopTab === 'designer' }"
					@tap="handleTopTabChange('designer')"
				>
					<text class="top-nav-label" :class="{ active: activeTopTab === 'designer' }">设计师</text>
				</view>
				<view 
					class="top-nav-item"
					:class="{ active: activeTopTab === 'brand' }"
					@tap="handleTopTabChange('brand')"
				>
					<text class="top-nav-label" :class="{ active: activeTopTab === 'brand' }">品牌馆</text>
				</view>
			</view>
			<!-- 子tabs行 -->
			<view class="sub-nav">
				<template v-if="activeTopTab === 'designer'">
					<view 
						v-for="tab in designerSubTabs" 
						:key="tab.id" 
						class="sub-nav-item"
						:class="{ active: activeSubTab === tab.id }"
						@tap="handleSubTabChange(tab.id)"
					>
						<text class="sub-nav-label" :class="{ active: activeSubTab === tab.id }">{{ tab.label }}</text>
						<view v-if="activeSubTab === tab.id" class="sub-nav-indicator"></view>
					</view>
				</template>
				<template v-else>
					<view 
						v-for="tab in brandSubTabs" 
						:key="tab.id" 
						class="sub-nav-item"
						:class="{ active: activeBrandTab === tab.id }"
						@tap="handleBrandTabChange(tab.id)"
					>
						<text class="sub-nav-label" :class="{ active: activeBrandTab === tab.id }">{{ tab.label }}</text>
						<view v-if="activeBrandTab === tab.id" class="sub-nav-indicator"></view>
					</view>
				</template>
			</view>
		</view>
		
	<!-- 主内容区域 -->
	<view class="main-content">
		<!-- 设计师页面 -->
		<view v-if="activeTopTab === 'designer'" class="tab-content">
			<territory-service-list-section></territory-service-list-section>
			
			<territory-service-list-section></territory-service-list-section>
			
			<territory-service-list-section></territory-service-list-section>
			
			<territory-service-list-section></territory-service-list-section>
		</view>
		
		<!-- 品牌馆页面 -->
		<view v-if="activeTopTab === 'brand'" class="tab-content brand-content">
			<view 
				v-for="(card, index) in brandCards" 
				:key="index"
				class="brand-card"
			>
				<view class="card-content">
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
					
					<view class="separator-line"></view>
					
					<view class="service-info">
						<view class="service-left">
							<view class="avatar-wrapper">
								<view class="avatar" :style="{backgroundImage: `url(${avatarImage})`}"></view>
							</view>
							
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
import TerritoryHeaderSection from '../../components/territory/index/TerritoryHeaderSection.vue'
import TerritoryServiceListSection from '../../components/territory/index/TerritoryServiceListSection.vue'

export default {
	components: {
		TerritoryHeaderSection,
		TerritoryServiceListSection
	},
	data() {
		return {
			activeTopTab: 'designer',
			activeSubTab: 'hairstylist',
			activeBrandTab: 'hair',
			avatarImage: '/static/avatar/avatar.png',
			designerSubTabs: [
				{ id: 'hairstylist', label: '美发师' },
				{ id: 'beautician', label: '美容师' },
				{ id: 'makeup', label: '化妆师' },
				{ id: 'nail', label: '美甲师' },
				{ id: 'body', label: '美体师' }
			],
			brandSubTabs: [
				{ id: 'hair', label: '美发' },
				{ id: 'beauty', label: '美容' },
				{ id: 'makeup', label: '化妆' },
				{ id: 'nail', label: '美甲' },
				{ id: 'body', label: '美体' }
			],
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
			],
			showShareModal: false
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
		handleTopTabChange(tabId) {
			this.activeTopTab = tabId
		},
		handleSubTabChange(tabId) {
			this.activeSubTab = tabId
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
		},
		handleMore() {
			console.log('More clicked')
		}
	}
}
</script>

<style scoped lang="scss">
.territory-page {
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


.time {
	font-family: 'Inter', Helvetica;
	font-size: 28rpx;
	color: #000000;
	font-weight: normal;
}

.status-icons {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.status-icon {
	width: 35rpx;
	height: 22rpx;
	flex-shrink: 0;
}

.navbar-content {
	display: flex;
	align-items: center;
	padding: 24rpx 32rpx;
	box-sizing: border-box;
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


.action-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
	cursor: pointer;
}

.action-text {
	font-size: 32rpx;
	color: #333333;
	line-height: 1;
}

.logo {
	position: absolute;
	top: -74rpx;
	right: 30rpx;
	width: 256rpx;
	height: 144rpx;
	z-index: 1;
}

.top-nav-fixed {
	width: 100%;
	background-color: #ffffff;
	box-sizing: border-box;
	flex-shrink: 0;
}

.top-nav-fixed .top-nav {
	display: flex;
	align-items: center;
	gap: 40rpx;
	width: 100%;
	padding: 24rpx 30rpx 0 30rpx;
	box-sizing: border-box;
}

.top-nav-fixed .top-nav-item {
	cursor: pointer;
}

.top-nav-fixed .top-nav-label {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 28rpx;
	text-align: center;
	
	&.active {
		font-weight: 600;
		color: #000000;
	}
}

/* 子tabs行样式 */
.top-nav-fixed .sub-nav {
	display: flex;
	align-items: center;
	gap: 24rpx;
	width: 100%;
	padding: 20rpx 30rpx 0 30rpx;
	box-sizing: border-box;
}

.top-nav-fixed .sub-nav-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	cursor: pointer;
	padding-bottom: 16rpx;
}

.top-nav-fixed .sub-nav-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 400;
	color: #a6a6a6;
	font-size: 28rpx;
	
	&.active {
		font-weight: 500;
		color: #000000;
	}
}

.top-nav-fixed .sub-nav-indicator {
	position: absolute;
	bottom: -2rpx;
	width: 24rpx;
	height: 4rpx;
	background-color: #000000;
	border-radius: 2rpx;
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
	overflow-y: auto;
}

.tab-content.brand-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12rpx;
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

.btn-text.primary {
	white-space: nowrap;
}

.tab-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	flex: 1;
	gap: 12rpx;
}

.brand-card {
	width: 100%;
	max-width: 726rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	margin: 0 auto;
}

.card-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	padding: 24rpx;
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
</style>

