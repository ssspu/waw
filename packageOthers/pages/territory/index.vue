<template>
	<view class="territory-page">
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
			<territory-service-list-section
				v-for="designer in designerList"
				:key="designer.id"
				:designer="designer"
				@delete="handleDeleteDesigner"
			></territory-service-list-section>
		</view>
		
		<!-- 品牌馆页面 -->
		<view v-if="activeTopTab === 'brand'" class="tab-content brand-content">
			<view
				v-for="(card, index) in brandCards"
				:key="index"
				class="brand-card"
				@tap="handleBrandCardClick(card)"
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
												src="/static/icon/star.png" 
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
						<text class="more-link" @tap.stop="handleMore">更多</text>
						<view class="action-buttons">
							<view class="promote-btn" @tap.stop="handlePromote">
								<text class="btn-text">推广</text>
							</view>
							<view class="book-again-btn" @tap.stop="handleBookAgain">
								<text class="btn-text primary">再次预约</text>
							</view>
						</view>
					</view>
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

	<!-- 底部指示器 -->
	<view class="footer-indicator">
		<!-- <view class="indicator-bar"></view> -->
	</view>
	</view>
</template>

<script>
import TerritoryHeaderSection from '../../../components/territory/index/TerritoryHeaderSection.vue'
import TerritoryServiceListSection from '../../../components/territory/index/TerritoryServiceListSection.vue'
import api from '@/api'

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
			avatarImage: 'https://bioflex.cn/static/avatar/avatar.png',
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
			brandCards: [],
			designerList: [],
			showShareModal: false,
			loading: false
		}
	},
	onLoad() {
		this.fetchTerritoryDesigners()
		this.fetchTerritoryBrands()
	},
	methods: {
		
		async fetchTerritoryDesigners() {
			try {
				const res = await api.territory.getMyDesigners({
					page: 1,
					pageSize: 20,
					category: this.activeSubTab 
				})
				if (res.code === 200 && res.data) {
					const list = res.data.list || res.data || []
					this.designerList = list.map(item => ({
						id: item.id,
						name: item.name || '',
						avatar: item.avatar || 'https://bioflex.cn/static/avatar/avatar.png',
						role: item.role || '美发师',
						level: item.level || '高级',
						position: item.position || '',
						specialties: item.specialties || ['发型', '美发'],
						rating: item.rating || 4.8,
						serviceCount: item.serviceCount || 0,
						worksCount: item.worksCount || 0,
						lastServiceDate: item.lastServiceDate || '',
						lastServiceName: item.lastServiceName || '',
						lastProductName: item.lastProductName || '',
						lastServicePrice: item.lastServicePrice || 0
					}))
				}
			} catch (err) {
				console.error('获取私人领地设计师失败:', err)
			}
		},
		
		async handleDeleteDesigner(designer) {
			try {
				const res = await api.territory.removeDesigner(designer.id)
				if (res.code === 200) {
					this.designerList = this.designerList.filter(d => d.id !== designer.id)
					uni.showToast({ title: '删除成功', icon: 'success' })
				}
			} catch (err) {
				console.error('删除设计师失败:', err)
				uni.showToast({ title: '删除失败', icon: 'none' })
			}
		},
		
		async fetchTerritoryBrands() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.territory.getMyBrands({
					page: 1,
					pageSize: 20,
					category: this.activeBrandTab 
				})
				if (res.code === 200 && res.data) {
					const list = res.data.list || res.data || []
					this.brandCards = list.map(item => ({
						id: item.id,
						headerInfo: [
							item.lastOrderDate || '2025-01-01',
							'｜',
							item.lastServiceName || '洗剪吹',
							'｜',
							item.lastServiceDetail || '服务'
						],
						price: item.lastOrderPrice || 0,
						name: item.name || item.brandName || '',
						type: '品牌',
						level: item.level || '舒适',
						role: item.typeDesc || '专业店',
						specialties: item.specialties || ['发型', '美发'],
						rating: item.rating || 4.8,
						designers: item.designerCount || 0,
						services: item.serviceCount || 0,
						image: item.image || item.cover
					}))
				}
			} catch (err) {
				console.error('获取私人领地品牌馆失败:', err)
			} finally {
				this.loading = false
			}
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
			this.fetchTerritoryDesigners() 
		},
		handleBrandTabChange(tabId) {
			this.activeBrandTab = tabId
			this.fetchTerritoryBrands() 
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
			
			const currentBrand = this.brandCards && this.brandCards[0]
			if (!currentBrand || !currentBrand.id) {
				uni.showToast({ title: '请先选择品牌馆', icon: 'none' })
				return
			}
			uni.navigateTo({
				url: `/pages/brand/detail?id=${currentBrand.id}&name=${encodeURIComponent(currentBrand.name || '')}`
			})
		},
		handleBrandCardClick(card) {
			
			uni.navigateTo({
				url: `/pages/brand/detail?id=${card.id}&name=${encodeURIComponent(card.name || '')}`
			})
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

.nav-right {
	width: 64rpx;
	display: flex;
	justify-content: flex-end;
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
	gap: 48rpx;
	width: 100%;
	padding: 16rpx 30rpx 24rpx 30rpx;
	box-sizing: border-box;
}

.top-nav-fixed .top-nav-item {
	cursor: pointer;
}

.top-nav-fixed .top-nav-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 28rpx;
	text-align: center;

	&.active {
		font-weight: 500;
		color: #000000;
	}
}


.top-nav-fixed .sub-nav {
	display: flex;
	align-items: center;
	width: 100%;
	padding: 16rpx 0 0 0;
	box-sizing: border-box;
}

.top-nav-fixed .sub-nav-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	cursor: pointer;
	padding-bottom: 16rpx;
}

.top-nav-fixed .sub-nav-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 28rpx;

	&.active {
		font-weight: 500;
		color: #000000;
	}
}

.top-nav-fixed .sub-nav-indicator {
	position: absolute;
	bottom: 0;
	width: 32rpx;
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
	gap: 16rpx;
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
	filter: brightness(0) invert(1);
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
	filter: brightness(0) invert(1);
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
	padding: 4rpx;
	background-color: #333333;
	border-radius: 4rpx;
}

.star-icon {
	width: 20rpx;
	height: 20rpx;
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
	filter: brightness(0) invert(1);
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
</style>

