<template>
	<view class="featured-items-section">
		<!-- 分类卡片 -->
		<view class="category-card">
			<view class="category-content">
				<view
					v-for="(item, index) in categoryItems"
					:key="index"
					class="category-item"
					:class="{ active: activeBrandType === item.brandType }"
					@tap="handleCategoryClick(item)"
				>
					<image class="category-icon" :src="item.icon" :alt="item.title" mode="aspectFit"></image>
					<view class="category-info">
						<text class="category-title">{{ item.title }}</text>
						<text class="category-subtitle">{{ item.subtitle }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="featured-stores-card">
			<view class="card-header">
				<view class="title-wrapper">
					<text class="card-title">精选店</text>
					<view class="title-bar"></view>
				</view>
				<!-- 测试阶段不显示 -->
				<!-- <image class="more-icon" src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-3.svg" mode="aspectFit"></image> -->
			</view>
			
			<!-- 标签切换 -->
			<view class="tabs-container">
				<view 
					v-for="(tab, index) in tabItems" 
					:key="index" 
					class="tab-item"
					:class="{ active: tab.active }"
					@tap="switchTab(index)"
				>
					<text>{{ tab.label }}</text>
					<view v-if="tab.new" class="new-badge">
						<image class="badge-bg" src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-216.svg" mode="aspectFit"></image>
						<text class="new-text">NEW</text>
					</view>
				</view>
			</view>
			
			<swiper 
				class="stores-swiper"
				:current="storeSwiperIndex"
				@change="handleStoreSwiperChange"
				:indicator-dots="false"
				:autoplay="false"
				:circular="false"
			>
				<swiper-item 
					v-for="(slide, slideIndex) in currentStoreSlides" 
					:key="slideIndex"
					class="stores-swiper-item"
				>
					<view class="featured-stores-list">
						<view 
							v-for="(store, index) in slide" 
							:key="index" 
							class="featured-store-item"
							@tap="handleStoreClick(store)"
						>
					<view class="store-bg"></view>
					<image class="store-image" :src="store.image || 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png'" :alt="store.name" mode="aspectFill"></image>
					<image class="store-overlay" :src="store.overlay" mode="aspectFill"></image>
					
					<!-- 评分和统计信息 -->
					<view class="store-stats">
						<view class="rating-group">
							<text class="rating-score">{{ store.rating }}</text>
							<view class="star-container">
								<image class="star-icon" src="/static/icon/star.png" mode="aspectFit"></image>
							</view>
						</view>
						<view class="stats-group">
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
					
					<!-- 店铺信息 -->
					<view class="store-info">
						<text class="store-name">{{ store.name }}</text>
						<text class="store-type">{{ store.type }}</text>
						<view class="store-footer">
							<view class="amenities">
								<view 
									v-for="(amenity, idx) in store.amenities" 
									:key="idx" 
									class="amenity-badge"
								>
									{{ amenity }}
								</view>
							</view>
							<text class="store-distance">{{ store.distance }}</text>
						</view>
					</view>
					
					<!-- 标签 -->
					<view class="store-tag">舒适</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			
			<!-- 分页指示器 -->
			<view class="pagination-dots">
				<view 
					v-for="(dot, index) in currentStoreSlides.length" 
					:key="index" 
					class="dot"
					:class="{ active: index === storeSwiperIndex }"
				></view>
			</view>
		</view>
		
		<!-- 附近推荐标题 -->
		<view id="brand-nearby-section" class="nearby-header">
			<view class="title-wrapper">
				<text class="nearby-title">附近推荐</text>
				<view class="title-bar"></view>
			</view>
			<!-- 测试阶段不显示 -->
			<!-- <view class="filter-btn" @tap="handleFilter">
				<image class="filter-icon" src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2.svg" mode="aspectFit"></image>
			</view> -->
		</view>

		<!-- 分类标签 -->
		<view class="category-tab">
			<view class="tab-content">
				<image class="tab-icon" src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-1.svg" mode="aspectFit"></image>
				<text class="tab-text">{{ activeCategory }}</text>
			</view>
		</view>

		<!-- 附近店铺列表 -->
		<view class="nearby-stores-list">
			<view
				v-for="(store, index) in currentNearbyStores"
				:key="index"
				class="nearby-store-item"
				@tap="handleStoreClick(store)"
			>
				<view class="store-avatar" :style="{ backgroundImage: `url(${store.image || 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png'})` }"></view>
				<view class="store-details">
					<view class="store-header">
						<text class="store-name">{{ store.name }}</text>
						<view class="store-tag-badge">舒适</view>
					</view>
					<text class="store-type">{{ store.type }}</text>
					<view class="store-stats-row">
						<view class="stats-rating">
							<text class="stats-rating-score">{{ store.rating }}</text>
							<view class="star-container-small">
								<image class="star-small" src="/static/icon/star.png" mode="aspectFit"></image>
							</view>
						</view>
						<view class="stats-info">
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
					<view class="store-footer">
						<view class="amenities">
							<view 
								v-for="(amenity, idx) in store.amenities" 
								:key="idx" 
								class="amenity-badge-outline"
							>
								{{ amenity }}
							</view>
						</view>
						<text class="store-distance">{{ store.distance }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import { calculateDistance, getCurrentLocation } from '@/utils/location.js'

export default {
	data() {
		return {
			categoryItems: [
				{
					icon: "https://bioflex.cn/static/11.png",
					title: "专业店",
					subtitle: "专业服务店",
					brandType: "专业店",
				},
				{
					icon: "https://bioflex.cn/static/12.png",
					title: "品牌店",
					subtitle: "影响力名店",
					brandType: "品牌店",
				},
				{
					icon: "https://bioflex.cn/static/13.png",
					title: "工作室",
					subtitle: "独立设计师",
					brandType: "工作室",
				},
				{
					icon: "https://bioflex.cn/static/14.png",
					title: "综合店",
					subtitle: "多服务模式",
					brandType: "综合店",
				},
			],
			tabItems: [
				{ label: "星级店", active: true, value: "star", new: false },
				{ label: "人气店", active: false, value: "popular", new: false },
				{ label: "男士店", active: false, value: "men", new: true },
			],
			activeStoreTab: "star",
			storeSwiperIndex: 0,
			
			storeSlides: {
				star: [],
				popular: [],
				men: [],
			},
			
			nearbyStoresMap: {
				star: [],
				popular: [],
				men: [],
			},
			
			activeCategory: '品牌馆',
			activeBrandType: '',
			allBrands: [],
			loading: false,
			userLatitude: null,
			userLongitude: null
		}
	},
	computed: {
		currentStoreSlides() {
			const slides = this.storeSlides[this.activeStoreTab]
			return slides || []
		},
		currentNearbyStores() {
			
			return this.nearbyStoresMap[this.activeStoreTab] || []
		}
	},
	mounted() {
		this.getUserLocation()
		this.fetchAllTabsData()
	},
	methods: {
		async getUserLocation() {
			try {
				const location = await getCurrentLocation()
				if (location) {
					this.userLatitude = location.latitude
					this.userLongitude = location.longitude
					// 如果已经加载了数据，更新距离
					if (this.allBrands.length > 0) {
						this.classifyBrandsByTab(this.allBrands)
					}
				}
			} catch (err) {
				console.error('获取位置失败:', err)
			}
		},
		
		async fetchAllTabsData() {
			try {
				const res = await api.brand.getList({ page: 1, pageSize: 50 })
				if (res.code === 200) {
					const list = res.data?.items || []
					this.allBrands = list
					if (list.length > 0) {
						this.classifyBrandsByTab(list)
					}
				}
			} catch (err) {
				console.error('获取品牌列表失败:', err)
			}
		},
		
		classifyBrandsByTab(list) {
			let filteredList = list
			if (this.activeBrandType) {
				filteredList = list.filter(b => {
					const type = b.brand_type || b.business_mode || ''
					const typeMap = {
						'专业店': ['单店经营', '专业店'],
						'品牌店': ['连锁经营', '品牌直营'],
						'工作室': ['工作室'],
						'综合店': ['商场店', '街边店', '写字楼店', '创意园']
					}
					const targetTypes = typeMap[this.activeBrandType] || []
					return targetTypes.some(t => type.includes(t))
				})
			}

			const finalList = filteredList.length > 0 ? filteredList : list

			// 转换并计算距离
			const transformedList = finalList.map(b => {
				const item = this.transformBrand(b)
				if (this.userLatitude && this.userLongitude && b.latitude && b.longitude) {
					item.distance = calculateDistance(this.userLatitude, this.userLongitude, b.latitude, b.longitude)
				}
				if (!item.distance) {
					item.distance = '2.5km'
				}
				return item
			})

			// 星级店
			this.nearbyStoresMap.star = [...transformedList].sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0))
			this.storeSlides.star = this.groupIntoSlides(this.nearbyStoresMap.star.map(item => this.transformBrandForSlide(item)))

			// 人气店
			this.nearbyStoresMap.popular = [...transformedList].sort((a, b) => (parseInt(b.services) || 0) - (parseInt(a.services) || 0))
			this.storeSlides.popular = this.groupIntoSlides(this.nearbyStoresMap.popular.map(item => this.transformBrandForSlide(item)))

			// 男士店
			const menList = transformedList.filter(item => {
				const target = (item.targetCustomer || '').toLowerCase()
				return target.includes('男士') || target.includes('男') || target.includes('男发')
			})
			
			const finalMenList = menList.length > 0 ? menList : [...transformedList].sort((a, b) => (parseInt(b.services) || 0) - (parseInt(a.services) || 0))
			this.nearbyStoresMap.men = finalMenList
			this.storeSlides.men = this.groupIntoSlides(finalMenList.map(item => this.transformBrandForSlide(item)))
		},
		
		groupIntoSlides(transformedList) {
			const slideGroups = []
			for (let i = 0; i < transformedList.length; i += 3) {
				slideGroups.push(transformedList.slice(i, i + 3))
			}
			return slideGroups
		},
		
		transformBrand(b) {
			const defaultImage = 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png'

			let establishedYear = ''
			if (b.established_date) {
				const year = new Date(b.established_date).getFullYear()
				establishedYear = `${year}年`
			}

			const amenities = b.service_features ? b.service_features.split(/[,]/) : (b.tags || ['代客泊车', '免费茶点', '共享工位', '7天无忧'])
			const firstAmenity = amenities[0] || '舒适'

			// 将 business_mode 映射到 categoryItems 中的四个类型
			const businessModeMap = {
				'单店经营': '专业店',
				'专业店': '专业店',
				'连锁经营': '品牌店',
				'品牌直营': '品牌店',
				'工作室': '工作室',
				'商场店': '综合店',
				'街边店': '综合店',
				'写字楼店': '综合店',
				'创意园': '综合店'
			}
			const level = businessModeMap[b.business_mode] || b.brand_type || '专业店'

			return {
				id: b.id,
				image: b.avatar || b.coverImage || defaultImage,
				name: b.brand_intro || b.name || '未知品牌',
				type: `${level}｜${establishedYear || '2012年'}开业`,
				rating: String(b.rating || 4.8),
				designers: `${b.designer_count || 0}人`,
				services: String(b.appointment_count || 0),
				amenities: amenities,
				distance: b.distance || '2.5km',
				tag: level,
				storeTag: firstAmenity,
				targetCustomer: b.target_customer || '',
				venueType: b.venue_type || '',
				chainCount: b.chain_count || 0,
				latitude: b.latitude,
				longitude: b.longitude
			}
		},
		
		transformBrandForSlide(item) {
			return {
				...item,
				image: item.image || 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png',
				overlay: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg',
				amenities: item.amenities.slice(0, 2), 
			}
		},
		handleCategoryClick(item) {
			if (this.activeBrandType === item.brandType) {
				this.activeBrandType = ''
				this.activeCategory = '品牌馆'
			} else {
				this.activeBrandType = item.brandType
				this.activeCategory = item.title
			}
			
			if (this.allBrands.length > 0) {
				this.classifyBrandsByTab(this.allBrands)
			}
		},
		switchTab(index) {
			const tab = this.tabItems[index]
			this.tabItems.forEach((t, i) => {
				t.active = i === index
			})
			this.activeStoreTab = tab.value
			this.storeSwiperIndex = 0
			
			if (tab.new) {
				tab.new = false
			}
		},
		handleStoreSwiperChange(e) {
			this.storeSwiperIndex = e.detail.current
		},
		handleStoreClick(store) {
			if (!store.id) {
				uni.showToast({ title: '品牌信息不完整', icon: 'none' })
				return
			}
			uni.navigateTo({
				url: `/pages/brand/detail?id=${store.id}&name=${encodeURIComponent(store.name || '')}`
			})
		},
		handleFilter() {
			console.log('Filter clicked')
		}
	}
}
</script>

<style scoped lang="scss">
.featured-items-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	align-items: stretch;
	gap: 8rpx;
	padding: 0 12rpx;
	box-sizing: border-box;
}


.category-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
}

.category-content {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 16rpx;
	padding: 20rpx;
	box-sizing: border-box;
}

.category-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6rpx;
	min-width: 0;
	flex: 1;
	padding: 10rpx;
	border-radius: 8rpx;
	transition: background-color 0.2s;

	&.active {
		background-color: rgba(218, 203, 177, 0.2);
	}
}

.category-icon {
	width: 88rpx;
	height: 88rpx;
	padding: 20rpx;
	box-sizing: border-box;
	background: linear-gradient(180deg, #FEFEFE 0%, #F2F2F2 100%);
	border-radius: 40rpx 40rpx 40rpx 4rpx;
}

.category-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.category-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 24rpx;
	text-align: center;
	margin-bottom: 4rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
}

.category-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 18rpx;
	text-align: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
}


.featured-stores-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
	margin-top: 12rpx;
}

.card-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
	padding: 20rpx;
	box-sizing: border-box;
	min-height: auto;
}

.card-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: 600;
	color: #000000;
	font-size: 28rpx;
	line-height: 1.5;
	overflow: visible;
	height: auto;
	position: relative;
	z-index: 2;
}

.more-icon {
	width: 44rpx;
	height: 44rpx;
	flex-shrink: 0;
	margin-top: 2rpx;
}

.tabs-container {
	display: flex;
	align-items: center;
	gap: 30rpx;
	width: 100%;
	padding: 0 20rpx;
}

.tab-item {
	position: relative;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	font-size: 26rpx;
	text-align: center;
	color: #a6a6a6;
}

.tab-item.active {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	color: #333333;
}

.new-badge {
	position: absolute;
	top: -14rpx;
	left: calc(80% + 4rpx);
	width: 50rpx;
	height: 24rpx;
}

.badge-bg {
	position: absolute;
	top: 2rpx;
	left: 0;
	width: 46rpx;
	height: 20rpx;
}

.new-text {
	position: absolute;
	top: 0;
	left: 6rpx;
	width: 36rpx;
	font-size: 14rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffffff;
}

.stores-swiper {
	height: 570rpx;
	min-height: 560rpx;
}

.stores-swiper-item {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.featured-stores-list {
	display: flex;
	flex-direction: column;
	gap: 0;
	padding: 20rpx;
	box-sizing: border-box;
	height: 100%;
}

.featured-store-item {
	position: relative;
	width: 100%;
	height: 170rpx;
	margin-bottom: 16rpx;
	box-sizing: border-box;
	overflow: hidden;
}

.store-bg {
	position: absolute;
	width: 100%;
	height: 90.59%;
	top: 9.41%;
	left: 0;
	background-color: #f6f6f6;
	border-radius: 8rpx;
}

.store-image {
	position: absolute;
	width: 44.02%;
	height: 100%;
	top: 0;
	left: 0;
	object-fit: cover;
}

.store-overlay {
	position: absolute;
	width: 44.02%;
	height: 28.24%;
	top: 71.76%;
	left: 0;
}

.store-stats {
	position: absolute;
	width: 46.94%;
	height: 20%;
	top: 75.29%;
	left: 0;
	display: flex;
	align-items: center;
	gap: 16rpx;
	padding: 0 16rpx;
}

.rating-group {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
}

.rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffffff;
	font-size: 20rpx;
}

.star-container {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4rpx;
	background-color: #333333;
	border-radius: 4rpx;
}

.star-icon {
	width: 16rpx;
	height: 16rpx;
	filter: brightness(0) invert(1);
}

.stats-group {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.stat-item {
	display: inline-flex;
	align-items: flex-end;
	gap: 4rpx;
}

.store-stats .stat-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: rgba(255, 255, 255, 0.6);
	font-size: 18rpx;
}

.store-stats .stat-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #ffffff;
	font-size: 20rpx;
}

.stat-divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.6);
	font-size: 20rpx;
}

.store-info {
	position: absolute;
	width: 51.90%;
	height: auto;
	min-height: 67.06%;
	top: 21.18%;
	left: 45.19%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	overflow: visible;
}

.store-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
	white-space: nowrap;
	overflow: visible;
	text-overflow: ellipsis;
	width: 100%;
	line-height: 1.4;
	height: auto;
}

.store-type {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
}

.store-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	min-width: 0;
	box-sizing: border-box;
}

.amenities {
	display: flex;
	align-items: center;
	gap: 6rpx;
	flex-wrap: wrap;
	flex: 1;
	min-width: 0;
}

.amenity-badge {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #f6f6f6;
	color: #a6a6a6;
	border: 2rpx solid #a6a6a6;
	border-radius: 4rpx;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
}

.store-distance {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
	flex-shrink: 0;
	white-space: nowrap;
}

.store-tag {
	position: absolute;
	height: auto;
	padding: 4rpx 16rpx;
	top: 9.41%;
	right: 0;
	border-radius: 0 4rpx 0 8rpx;
	background-color: #dacbb1;
	color: #645e57;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	white-space: nowrap;
}

.pagination-dots {
	display: flex;
	align-items: center;
	gap: 6rpx;
	padding:  20rpx;
	margin-top: -30rpx;
	margin-bottom: 0rpx;
	justify-content: center;
	width: 100%;
	box-sizing: border-box;
}

.dot {
	width: 10rpx;
	height: 10rpx;
	background-color: #d9d9d9;
	border-radius: 5rpx;
}

.dot.active {
	width: 28rpx;
	height: 10rpx;
	background-color: #333333;
	border-radius: 28rpx;
}


.nearby-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	margin-top: 20rpx;
}

.nearby-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: 600;
	color: #000000;
	font-size: 28rpx;
	position: relative;
	z-index: 2;
}

.title-wrapper {
	display: flex;
	flex-direction: column;
}

.title-bar {
	width: 74rpx;
	height: 12rpx;
	background-color: #DACBB1;
	margin-top: -14rpx;
	position: relative;
	z-index: 1;
}

.filter-btn {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
	height: auto;
	padding: 0;
}

.filter-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 28rpx;
	text-align: center;
}

.filter-icon {
	width: 20rpx;
	height: 20rpx;
}

.category-tab {
	width: 100%;
	height: 60rpx;
	background-image: url('https://c.animaapp.com/mi5cgxi6ndVkfo/img/subtract.svg');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	margin-top: 4rpx;
}

.tab-content {
	display: flex;
	margin-top: 12rpx;
	width: 124rpx;
	height: 36rpx;
	margin-left: 20rpx;
	align-items: center;
	gap: 12rpx;
}

.tab-icon {
	width: 28rpx;
	height: 28rpx;
}

.tab-text {
	width: 100rpx;
	font-size: 28rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #dacbb1;
}

.nearby-stores-list {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: stretch;
	gap: 16rpx;
	margin-top: 8rpx;
	box-sizing: border-box;
}

.nearby-store-item {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	padding: 20rpx;
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
	box-sizing: border-box;
}

.store-avatar {
	width: 152rpx;
	height: 151.04rpx;
	background-size: cover;
	background-position: center;
	border-radius: 50% 50% 2% 50%;
	flex-shrink: 0;
}

.store-details {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	flex: 1;
	min-width: 0;
}

.store-header {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.nearby-store-item .store-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.store-tag-badge {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #dacbb1;
	color: #645e57;
	border-radius: 4rpx;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	flex-shrink: 0;
}

.store-type {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
}

.store-stats-row {
	display: inline-flex;
	align-items: center;
	gap: 16rpx;
}

.stats-rating {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
}

.stats-rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 24rpx;
}

.star-container-small {
	display: inline-flex;
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
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.store-stats-row .stat-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.store-stats-row .stat-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 24rpx;
}

.store-stats-row .stat-divider {
	color: #a6a6a6;
}

.amenity-badge-outline {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #ffffff;
	color: #a6a6a6;
	border: 2rpx solid #a6a6a6;
	border-radius: 4rpx;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
}

.store-distance {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
	flex-shrink: 0;
}
</style>

