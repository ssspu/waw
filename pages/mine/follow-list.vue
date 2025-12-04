<template>
	<view class="follow-list-page">
		<view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="back-btn" @tap="handleBack">
					<image class="back-icon" src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" mode="aspectFit"></image>
				</view>
				<text class="navbar-title">我的关注</text>
			</view>
			<view class="tabs">
				<view 
					v-for="(tab, index) in tabs" 
					:key="tab.label"
					class="tab-item"
					:class="{ active: activeTab === tab.value }"
					@tap="handleTabChange(tab.value)"
				>
					<text class="tab-text">{{ tab.label }}</text>
					<text class="tab-count">({{ tab.count }})</text>
				</view>
			</view>
		</view>

		<view class="main-content">
			<view 
				v-if="activeTab === 'designer'" 
				class="nearby-list"
			>
				<view 
					v-for="(designer, index) in designerList" 
					:key="index"
					class="nearby-item"
				>
					<view class="nearby-item-wrapper">
						<view class="nearby-avatar" :style="{ backgroundImage: `url(${designer.avatar})` }"></view>
						<view class="nearby-info">
							<view class="nearby-top-row">
								<view class="nearby-header-info">
									<text class="nearby-name">{{ designer.name }}</text>
									<view class="nearby-level-badge">{{ designer.level }}</view>
								</view>
								<text class="unfollow-link" @tap.stop="handleUnfollow(designer)">取消关注</text>
							</view>
							<text class="nearby-role">{{ designer.role }}</text>
							<view class="nearby-specialties">
								<text class="specialties-label">擅长:</text>
								<view 
									v-for="(specialty, idx) in designer.specialties" 
									:key="idx"
									class="specialty-badge"
								>
									{{ specialty }}
								</view>
							</view>
							<view class="nearby-bottom-row">
								<view class="nearby-stats">
									<view class="stats-rating">
										<text class="stats-rating-score">{{ designer.rating }}</text>
										<view class="star-container">
											<image class="star-small" src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/star-1.svg" mode="aspectFit"></image>
										</view>
									</view>
									<view class="stats-info">
										<view class="stats-item">
											<text class="stats-label">服务</text>
											<text class="stats-value">{{ designer.services }}</text>
										</view>
										<text class="stats-divider">｜</text>
										<view class="stats-item">
											<text class="stats-label">作品</text>
											<text class="stats-value">{{ designer.works }}</text>
										</view>
									</view>
								</view>
								<view
									class="promotion-btn"
									:class="{
										'promotion-apply': designer.promotionStatus === 'apply',
										'promotion-pending': designer.promotionStatus === 'pending',
										'promotion-active': designer.promotionStatus === 'active'
									}"
									@tap.stop="handlePromotion(designer)"
								>
									<text class="promotion-text">{{ getPromotionText(designer.promotionStatus) }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view 
				v-else 
				class="nearby-stores-list"
			>
				<view 
					v-for="(store, index) in storeList" 
					:key="index"
					class="nearby-store-item"
				>
					<view class="store-avatar" :style="{ backgroundImage: `url(${store.image})` }"></view>
					<view class="store-details">
						<view class="store-header">
							<view class="store-title-row">
								<text class="store-name">{{ store.name }}</text>
								<view class="store-tag-badge">{{ store.tag }}</view>
							</view>
							<text class="store-unfollow" @tap.stop="handleUnfollowStore(store)">取消关注</text>
						</view>
						<text class="store-type">{{ store.type }}</text>
						<view class="store-bottom-row">
							<view class="store-stats-row">
								<view class="stats-rating">
									<text class="stats-rating-score">{{ store.rating }}</text>
									<view class="star-container-small">
										<image class="star-small" src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/star-1.svg" mode="aspectFit"></image>
									</view>
								</view>
								<view class="store-stats-info">
									<view class="stat-item">
										<text class="stat-label">设计师</text>
										<text class="stat-value">{{ store.designers }}</text>
									</view>
									<text class="stat-divider">｜</text>
									<view class="stat-item">
										<text class="stat-label">服务</text>
										<text class="stat-value">{{ store.services }}</text>
									</view>
								</view>
							</view>
							<view
								class="promotion-btn"
								:class="{
									'promotion-apply': store.promotionStatus === 'apply',
									'promotion-pending': store.promotionStatus === 'pending',
									'promotion-active': store.promotionStatus === 'active'
								}"
								@tap.stop="handleStorePromotion(store)"
							>
								<text class="promotion-text">{{ getPromotionText(store.promotionStatus) }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'

export default {
	data() {
		return {
			statusBarHeight: 44,
			activeTab: 'designer',
			tabs: [
				{ label: '设计师', value: 'designer', count: 0 },
				{ label: '商家', value: 'store', count: 0 }
			],
			designerList: [],
			storeList: [],
			loading: false,
			page: 1,
			pageSize: 20
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
		this.fetchFollowList()
	},
	methods: {
		async fetchFollowList() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.user.getFollowList({
					page: this.page,
					pageSize: this.pageSize
				})
				if (res.code === 0) {
					// 更新tab计数
					this.tabs[0].count = res.data.designerCount || 0
					this.tabs[1].count = res.data.brandCount || 0

					// 分离设计师和商家数据
					const list = res.data.list || res.data.records || []
					this.designerList = list.filter(item => item.type === 'designer').map(item => ({
						id: item.id,
						name: item.name,
						level: item.level || '高级',
						role: item.role || '',
						avatar: item.avatar,
						specialties: item.specialties || [],
						rating: item.rating || '4.8',
						services: item.services || 0,
						works: item.works || 0,
						promotionStatus: item.promotionStatus || 'apply'
					}))
					this.storeList = list.filter(item => item.type === 'brand').map(item => ({
						id: item.id,
						name: item.name,
						tag: item.tag || '舒适',
						type: item.type_desc || '',
						rating: item.rating || '4.8',
						designers: item.designers || '0人',
						services: item.services || '0',
						distance: item.distance || '',
						image: item.image,
						promotionStatus: item.promotionStatus || 'apply'
					}))
				}
			} catch (err) {
				console.error('获取关注列表失败:', err)
				uni.showToast({ title: '获取关注列表失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		handleBack() {
			uni.navigateBack()
		},
		handleTabChange(tabValue) {
			this.activeTab = tabValue
		},
		async handleUnfollow(designer) {
			try {
				const res = await api.user.batchUnfollow({ ids: [designer.id], type: 'designer' })
				if (res.code === 0) {
					this.designerList = this.designerList.filter(d => d.id !== designer.id)
					this.tabs[0].count = this.designerList.length
					uni.showToast({ title: '已取消关注', icon: 'success' })
				}
			} catch (err) {
				uni.showToast({ title: '操作失败', icon: 'none' })
			}
		},
		async handleUnfollowStore(store) {
			try {
				const res = await api.user.batchUnfollow({ ids: [store.id], type: 'brand' })
				if (res.code === 0) {
					this.storeList = this.storeList.filter(s => s.id !== store.id)
					this.tabs[1].count = this.storeList.length
					uni.showToast({ title: '已取消关注', icon: 'success' })
				}
			} catch (err) {
				uni.showToast({ title: '操作失败', icon: 'none' })
			}
		},
		getPromotionText(status) {
			const textMap = {
				'apply': '申请推广',
				'pending': '申请中',
				'active': '推广中'
			}
			return textMap[status] || '申请推广'
		},
		handlePromotion(designer) {
			if (designer.promotionStatus === 'apply') {
				uni.showToast({
					title: '申请已发送',
					icon: 'none'
				})
			} else if (designer.promotionStatus === 'pending') {
				uni.showToast({
					title: '推广申请审核中',
					icon: 'none'
				})
			} else if (designer.promotionStatus === 'active') {
				uni.showToast({
					title: '正在推广中',
					icon: 'none'
				})
			}
		},
		handleStorePromotion(store) {
			if (store.promotionStatus === 'apply') {
				uni.showToast({
					title: '申请已发送',
					icon: 'none'
				})
			} else if (store.promotionStatus === 'pending') {
				uni.showToast({
					title: '推广申请审核中',
					icon: 'none'
				})
			} else if (store.promotionStatus === 'active') {
				uni.showToast({
					title: '正在推广中',
					icon: 'none'
				})
			}
		}
	}
}
</script>

<style scoped lang="scss">
.follow-list-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
}
.navbar {
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
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
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

.tabs {
	display: flex;
	align-items: center;
	padding: 0 40rpx;
	gap: 40rpx;
	margin-top: 28rpx;
}

.tab-item {
	display: flex;
	align-items: center;
	gap: 4rpx;
	padding-bottom: 18rpx;
	position: relative;
}

.tab-item::after {
	content: '';
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: 6rpx;
	border-radius: 3rpx;
	background-color: transparent;
}

.tab-item.active::after {
	background-color: #000000;
}

.tab-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	color: #999999;
}

.tab-item.active .tab-text {
	color: #000000;
	font-weight: 600;
}

.tab-count {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #999999;
}

.main-content {
	flex: 1;
	padding: 20rpx 20rpx 40rpx;
	box-sizing: border-box;
}

.nearby-list {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	gap: 12rpx;
	box-sizing: border-box;
}

.nearby-item {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	padding: 20rpx;
	box-sizing: border-box;
}

.nearby-item-wrapper {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
	width: 100%;
	box-sizing: border-box;
}

.nearby-avatar {
	width: 152rpx;
	height: 151.04rpx;
	background-size: cover;
	background-position: center;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.nearby-info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	flex: 1;
	min-width: 0;
	box-sizing: border-box;
}

.nearby-top-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	gap: 12rpx;
}

.nearby-header-info {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.nearby-name {
	font-size: 28rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
}

.nearby-level-badge {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #dacbb1;
	color: #645e57;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	border-radius: 4rpx;
}

.unfollow-link {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #999999;
}

.nearby-role {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
}

.nearby-specialties {
	display: flex;
	align-items: center;
	gap: 6rpx;
	flex-wrap: wrap;
}

.specialties-label {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
}

.specialty-badge {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #f6f6f6;
	color: #a6a6a6;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	border-radius: 4rpx;
}

.nearby-bottom-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-top: 4rpx;
}

.nearby-stats {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.promotion-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 128rpx;
	height: 48rpx;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.promotion-apply {
	background-color: #333333;
	border: none;
}

.promotion-apply .promotion-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	font-weight: 500;
	color: #ffffff;
}

.promotion-pending {
	border: 2rpx solid #e5e5e5;
	background-color: #ffffff;
}

.promotion-pending .promotion-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #999999;
}

.promotion-active {
	border: 2rpx solid #e5e5e5;
	background-color: #ffffff;
}

.promotion-active .promotion-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #999999;
}

.stats-rating {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.stats-rating-score {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
}

.star-container {
	display: flex;
	align-items: center;
	gap: 4rpx;
	padding: 4rpx;
	background-color: #333333;
	border-radius: 4rpx;
}

.star-small {
	width: 16rpx;
	height: 16rpx;
	filter: brightness(0) invert(1);
}

.stats-info {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.stats-item {
	display: flex;
	align-items: flex-end;
	gap: 4rpx;
}

.stats-label {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
}

.stats-value {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
}

.stats-divider {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
}

.nearby-tags {
	display: flex;
	align-items: center;
	gap: 6rpx;
	flex-wrap: wrap;
	flex: 1;
	min-width: 0;
}

.tag-badge {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #ffffff;
	color: #a6a6a6;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	border-radius: 4rpx;
	border: 2rpx solid #a6a6a6;
}

.nearby-distance {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	white-space: nowrap;
	margin-left: 16rpx;
}

.nearby-stores-list {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	gap: 12rpx;
	box-sizing: border-box;
}

.nearby-store-item {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.08);
	padding: 20rpx;
	box-sizing: border-box;
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
}

.store-avatar {
	width: 152rpx;
	height: 152rpx;
	background-size: cover;
	background-position: center;
	border-radius: 16rpx;
	flex-shrink: 0;
}

.store-details {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	flex: 1;
}

.store-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 12rpx;
}

.store-title-row {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.store-name {
	font-size: 32rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	color: #000000;
}

.store-tag-badge {
	padding: 6rpx 16rpx;
	background-color: #dacbb1;
	color: #645e57;
	font-size: 22rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	border-radius: 8rpx;
}

.store-unfollow {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #9a9a9a;
}

.store-type {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #999999;
}

.store-bottom-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-top: 4rpx;
}

.store-stats-row {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.store-stats-info {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.stat-item {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.stat-label {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #999999;
}

.stat-value {
	font-size: 26rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	color: #333333;
}

.stat-divider {
	font-size: 24rpx;
	color: #c7c7c7;
}

.star-container-small {
	display: flex;
	align-items: center;
	gap: 4rpx;
	padding: 6rpx 8rpx;
	background-color: #333333;
	border-radius: 6rpx;
}

.amenity-badge-outline {
	padding: 6rpx 12rpx;
	border: 2rpx solid #dadada;
	border-radius: 8rpx;
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #a6a6a6;
}

.store-distance {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #a6a6a6;
	white-space: nowrap;
}
</style>

