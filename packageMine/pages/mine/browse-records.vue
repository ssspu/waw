<template>
	<view class="browse-record-page">
		<view class="tabs">
			<view
				v-for="tab in tabs"
				:key="tab.value"
				class="tab-item"
				:class="{ active: activeTab === tab.value }"
				@tap="switchTab(tab.value)"
			>
				<text class="tab-text">{{ tab.label }}</text>
			</view>
		</view>

		<view class="records-content">
			<view v-if="activeTab === 'service'" class="service-list">
				<favorite-card
					v-for="item in serviceRecords"
					:key="item.id"
					:item="item"
					mode="record"
					@tap="handleServiceTap"
					@action="handleCardAction"
				/>
			</view>
			<view v-else class="brand-list">
				<nearby-store-item
					v-for="store in brandRecords"
					:key="store.id"
					:store="store"
					@select="handleStoreSelect"
				/>
			</view>
			<view class="safe-area-spacer"></view>
		</view>

		<view class="home-indicator">
			<!-- <view class="indicator-bar"></view> -->
		</view>
	</view>
</template>

<script>
import FavoriteCard from '../../../components/mine/FavoriteCard.vue'
import NearbyStoreItem from '../../../components/common/NearbyStoreItem.vue'
import api from '@/api'

export default {
	name: 'MineBrowseRecordsPage',
	components: {
		FavoriteCard,
		NearbyStoreItem
	},
	data() {
		return {
						activeTab: 'service',
			activeView: 'list',
			tabs: [
				{ label: '服务浏览', value: 'service' },
				{ label: '品牌馆浏览', value: 'brand' }
			],
			viewOptions: [
				{
					value: 'list',
					icon: 'https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg'
				},
				{
					value: 'scan',
					icon: 'https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame-1.svg'
				}
			],
			serviceRecords: [],
			brandRecords: [],
			loading: false
		}
	},
	onLoad() {
		this.fetchBrowseRecords()
	},
	methods: {
		// 获取浏览记录
		async fetchBrowseRecords() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.user.getBrowseRecords({ page: 1, pageSize: 20 })
				if (res.code === 0 && res.data) {
					const list = res.data.list || res.data.records || []
					// 分离服务和品牌记录
					this.serviceRecords = list.filter(item => item.type === 'service').map(item => ({
						id: item.id,
						name: item.name || item.serviceName,
						description: item.description || '',
						duration: item.duration || '1小时',
						sold: item.soldCount || 0,
						price: item.price || 0,
						discount: item.discount || '预约优惠10%',
						ctaText: '快速预约',
						cover: item.image || item.cover,
						stylist: {
							id: item.designerId,
							name: item.designerName || '',
							title: item.designerLevel || '设计师',
							rating: String(item.rating || 4.9),
							reviews: item.reviewCount || 0,
							location: item.address || '',
							distance: item.distance || ''
						}
					}))
					this.brandRecords = list.filter(item => item.type === 'brand').map(item => ({
						id: item.id,
						name: item.name || item.brandName,
						tag: item.tag || '舒适',
						type: item.typeDesc || '专业店',
						rating: String(item.rating || 4.8),
						designers: item.designerCount ? `${item.designerCount}人` : '0人',
						services: String(item.serviceCount || 0),
						distance: item.distance || '',
						amenities: item.amenities || [],
						image: item.image || item.cover
					}))
				}
			} catch (err) {
				console.error('获取浏览记录失败:', err)
			} finally {
				this.loading = false
			}
		},
		handleBack() {
			uni.navigateBack({
				fail: () => uni.switchTab({ url: '/pages/mine/index' })
			})
		},
		switchTab(value) {
			this.activeTab = value
		},
		handleServiceTap(item) {
			// 跳转到设计师详情页查看服务
			uni.navigateTo({
				url: `/pages/designer/detail?serviceId=${item.id}`
			})
		},
		handleCardAction(item) {
			// 跳转到设计师详情页进行预约
			uni.navigateTo({
				url: `/pages/designer/detail?serviceId=${item.id}&designerId=${item.stylist?.id || ''}`
			})
		},
		handleStoreSelect(store) {
			uni.navigateTo({
				url: `/pages/brand/detail?id=${store.id}`
			})
		}
	}
}
</script>

<style scoped lang="scss">
.browse-record-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
}

.nav-placeholder {
	width: 64rpx;
}

.toggle-btn {
	width: 64rpx;
	height: 64rpx;
	border-radius: 32rpx;
	background-color: #f5f5f5;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
}

.toggle-btn::after {
	border: none;
}

.toggle-btn.active {
	background-color: #222;
}

.toggle-btn.active .toggle-icon {
	filter: brightness(0) invert(1);
}

.toggle-icon {
	width: 30rpx;
	height: 30rpx;
}

.tabs {
	display: flex;
	align-items: center;
	padding: 0 40rpx;
	gap: 40rpx;
	margin-top: 10rpx;
}

.tab-item {
	padding-bottom: 20rpx;
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
	background-color: #050505;
}

.tab-text {
	font-size: 30rpx;
	color: #a6a6a6;
}

.tab-item.active .tab-text {
	color: #000000;
	font-weight: 600;
}

.records-content {
	flex: 1;
	width: 100%;
	padding: 30rpx 24rpx 0;
	box-sizing: border-box;
}

.service-list,
.brand-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.safe-area-spacer {
	height: 40rpx;
}

.home-indicator {
	display: flex;
	justify-content: center;
	padding: 20rpx 0 30rpx;
}

.indicator-bar {
	width: 200rpx;
	height: 8rpx;
	border-radius: 100rpx;
	background: #000;
	opacity: 0.2;
}
</style>

