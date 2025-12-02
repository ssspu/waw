<template>
	<view class="browse-record-page">
		<view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="back-btn" @tap="handleBack">
					<image class="back-icon" src="/static/mine/favorites/vector.svg" mode="aspectFit"></image>
				</view>
				<text class="navbar-title">浏览记录</text>
				<view class="nav-placeholder"></view>
			</view>
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
import FavoriteCard from '../../components/mine/FavoriteCard.vue'
import NearbyStoreItem from '../../components/common/NearbyStoreItem.vue'

export default {
	name: 'MineBrowseRecordsPage',
	components: {
		FavoriteCard,
		NearbyStoreItem
	},
	data() {
		return {
			statusBarHeight: 44,
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
			serviceRecords: [
				{
					id: 1,
					name: '洗吹',
					description: '水洗+按摩+造型',
					duration: '1小时',
					sold: 1234,
					price: 799,
					discount: '预约优惠10%',
					ctaText: '快速预约',
					cover: '/static/mine/favorites/rectangle-169.png',
					stylist: {
						id: 101,
						name: '李天天',
						title: '资深设计师',
						rating: '4.9',
						reviews: 128,
						location: '成都市锦江区春熙路',
						distance: '2.5km'
					}
				},
				{
					id: 2,
					name: '质感染发',
					description: '头皮护理+高级染发',
					duration: '2小时',
					sold: 856,
					price: 1299,
					discount: '预约优惠10%',
					ctaText: '快速预约',
					cover: '/static/mine/favorites/rectangle-169.png',
					stylist: {
						id: 102,
						name: '王小美',
						title: '首席设计师',
						rating: '4.8',
						reviews: 256,
						location: '成都市武侯区天府三街',
						distance: '3.2km'
					}
				},
				{
					id: 3,
					name: '烫染一体',
					description: '烫发+染发+造型设计',
					duration: '3小时',
					sold: 421,
					price: 1699,
					discount: '预约优惠10%',
					ctaText: '快速预约',
					cover: '/static/mine/favorites/rectangle-169.png',
					stylist: {
						id: 103,
						name: '张大师',
						title: '技术总监',
						rating: '5.0',
						reviews: 512,
						location: '成都市高新区环球中心',
						distance: '5.1km'
					}
				},
				{
					id: 4,
					name: '头皮护理',
					description: '深层清洁+舒缓按摩',
					duration: '1.5小时',
					sold: 642,
					price: 599,
					discount: '预约优惠10%',
					ctaText: '快速预约',
					cover: '/static/mine/favorites/rectangle-169.png',
					stylist: {
						id: 104,
						name: '刘造型',
						title: '高级设计师',
						rating: '4.7',
						reviews: 89,
						location: '成都市青羊区太升南路',
						distance: '1.8km'
					}
				}
			],
			brandRecords: [
				{
					id: 1,
					name: '成都NICE造型沙龙',
					tag: '舒适',
					type: '专业店｜2012年开业',
					rating: '4.8',
					designers: '8人',
					services: '1236',
					distance: '7.5km',
					amenities: ['代客泊车', '免费茶点', '共享工位', '7天无忧'],
					image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-6.png'
				},
				{
					id: 2,
					name: '成都NICE造型沙龙',
					tag: '舒适',
					type: '专业店｜2012年开业',
					rating: '4.8',
					designers: '8人',
					services: '1236',
					distance: '7.5km',
					amenities: ['代客泊车', '免费茶点', '共享工位', '7天无忧'],
					image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-1.png'
				},
				{
					id: 3,
					name: '成都NICE造型沙龙',
					tag: '舒适',
					type: '专业店｜2012年开业',
					rating: '4.8',
					designers: '8人',
					services: '1236',
					distance: '7.5km',
					amenities: ['代客泊车', '免费茶点', '共享工位', '7天无忧'],
					image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-4.png'
				},
				{
					id: 4,
					name: '成都NICE造型沙龙',
					tag: '舒适',
					type: '专业店｜2012年开业',
					rating: '4.8',
					designers: '8人',
					services: '1236',
					distance: '7.5km',
					amenities: ['代客泊车', '免费茶点', '共享工位', '7天无忧'],
					image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-5.png'
				}
			]
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	methods: {
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

.navbar {
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	box-shadow: 0 8rpx 18rpx rgba(0, 0, 0, 0.04);
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 88rpx;
	padding: 0 30rpx;
	position: relative;
	box-sizing: border-box;
}

.back-btn {
	width: 64rpx;
	height: 64rpx;
	border-radius: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon {
	width: 28rpx;
	height: 28rpx;
}

.navbar-title {
	font-size: 34rpx;
	color: #333;
	font-weight: 600;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
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

