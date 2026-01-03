<template>
	<view class="screen">
		<!-- 状态栏占位 -->
		<!-- <view class="status-bar" style="height: 44rpx;"></view> -->
		
		<!-- 头部 -->
		<brand-detail-header :cover-image="coverImage" :brand-name="designerInfo.name"></brand-detail-header>
		
		<!-- 主内容区域 -->
		<view class="main-content" :class="{ 'reviews-fullwidth': activeTab === 'reviews', 'no-bottom-padding': activeTab === 'works' || activeTab === 'service' }">
			<!-- 品牌信息卡片 -->
			<brand-info-card
				:designer-info="designerInfo"
				:service-badges="serviceBadges"
				:stats-data="statsData"
				:business-info="businessInfo"
				:shop-info="shopInfo"
				:promotions="promotions"
				:right-stats="rightStats"
				@more-info="handleMoreInfo"
				@follow="handleFollow"
				@phone="handlePhone"
				@navigation="handleNavigation"
				@share="handleShare"
				@coupon-click="showCouponPopup = true"
			></brand-info-card>
			
		<!-- Tab切换 -->
		<view class="tabs-wrapper">
			<brand-tab-switcher
				:active-tab="activeTab"
				:tabs="tabs"
				@tab-change="handleTabChange"
			></brand-tab-switcher>
			
			<!-- 子标签切换（根据当前tab显示） -->
			<view 
				v-if="currentSubTabs.length" 
				:class="['sub-tabs-section', { 'compact-sub-tabs': isCompactSubTabs }]"
			>
				<view 
					v-for="(subTab, index) in currentSubTabs" 
					:key="index" 
					class="sub-tab-item"
					:class="{ active: activeSubTabs[activeTab] === subTab.id }"
					@tap="handleSubTabClick(subTab.id)"
				>
					<text class="sub-tab-title">{{ subTab.title }}</text>
					<text v-if="subTab.subtitle" class="sub-tab-subtitle">{{ subTab.subtitle }}</text>
				</view>
			</view>
		</view>
		
			<!-- Tab内容 -->
			<view class="tab-content-wrapper">
				<!-- 设计师tab内容 -->
				<view v-if="activeTab === 'service'" class="tab-content" :key="'service'">
					<brand-designer-tab-content :active-sub-tab="activeSubTabs.service" :brand-id="brandId"></brand-designer-tab-content>
				</view>

				<!-- 服务tab内容 -->
				<view v-if="activeTab === 'appointment'" class="tab-content" :key="'appointment'">
					<brand-service-tab-content :active-sub-tab="activeSubTabs.appointment" :brand-id="brandId"></brand-service-tab-content>
				</view>

				<!-- 作品tab内容 -->
				<view v-if="activeTab === 'works'" class="tab-content" :key="'works'">
					<brand-works-tab-content :active-sub-tab="activeSubTabs.works" :brand-id="brandId"></brand-works-tab-content>
				</view>

				<!-- 点评tab内容 -->
				<view v-if="activeTab === 'reviews'" class="tab-content" :key="'reviews'">
					<brand-reviews-tab-content :active-sub-tab="activeSubTabs.reviews" :brand-id="brandId"></brand-reviews-tab-content>
				</view>
			</view>
			
			<!-- 底部内容（在设计师和服务tab显示） -->
			<view v-if="activeTab === 'service' || activeTab === 'appointment'" class="bottom-content">
				<brand-portfolio-section></brand-portfolio-section>
			</view>
			
			<!-- 预约按钮（暂时隐藏） -->
			<view v-if="false" class="booking-footer">
				<view class="booking-btn-container">
					<view class="booking-btn" @tap="handleBooking">
						<text class="booking-btn-text">预约</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 优惠券弹窗 -->
		<coupon-popup 
			:visible="showCouponPopup" 
			@close="showCouponPopup = false"
			@claim="handleClaimCoupon"
		></coupon-popup>
	</view>
</template>

<script>
import BrandDetailHeader from '../../components/brand/detail/BrandDetailHeader.vue'
import BrandInfoCard from '../../components/brand/detail/BrandInfoCard.vue'
import BrandTabSwitcher from '../../components/brand/detail/BrandTabSwitcher.vue'
import BrandServiceTabContent from '../../components/brand/detail/BrandServiceTabContent.vue'
import BrandDesignerTabContent from '../../components/brand/detail/BrandDesignerTabContent.vue'
import BrandAppointmentTabContent from '../../components/brand/detail/BrandAppointmentTabContent.vue'
import BrandWorksTabContent from '../../components/brand/detail/BrandWorksTabContent.vue'
import BrandReviewsTabContent from '../../components/brand/detail/BrandReviewsTabContent.vue'
import BrandPortfolioSection from '../../components/brand/detail/BrandPortfolioSection.vue'
import CouponPopup from '../../components/popup/CouponPopup.vue'
import api from '@/api'
import { calculateDistance } from '@/utils/location.js'

export default {
	components: {
		BrandDetailHeader,
		BrandInfoCard,
		BrandTabSwitcher,
		BrandServiceTabContent,
		BrandDesignerTabContent,
		BrandAppointmentTabContent,
		BrandWorksTabContent,
		BrandReviewsTabContent,
		BrandPortfolioSection,
		CouponPopup
	},
	onLoad(options) {
		
		console.log('Brand detail page onLoad, options:', options)
		if (options.id) {
			console.log('Brand ID:', options.id)
			this.brandId = options.id
			this.fetchBrandDetail()
		}
		
		if (options.tab) {
			this.activeTab = options.tab
		}
		
		this.getUserLocation()
	},
	data() {
		return {
			brandId: null,
			coverImage: '',
			activeTab: 'service',
			showCouponPopup: false,
			loading: false,
			isFollowed: false,
			activeSubTabs: {
				service: 'hair',
				appointment: 'hair-service',
				works: 'female',
				reviews: 'all'
			},
			tabs: [
				{ id: 'service', label: '设计师' },
				{ id: 'appointment', label: '服务' },
				{ id: 'works', label: '作品' },
				{ id: 'reviews', label: '点评' }
			],
			subTabs: {
				service: [
					{ id: 'hair', title: '美发师' },
					
					
				],
				appointment: [
					{ id: 'hair-service', title: '美发服务' },
					{ id: 'beauty-service', title: '美容服务' },
					{ id: 'other-service', title: '其他服务' }
				],
				works: [
					{ id: 'female', title: '女士' },
					{ id: 'male', title: '男士' },
					{ id: 'kids', title: '儿童' }
				],
				reviews: [
					{ id: 'all', title: '全部' },
					{ id: 'with-image', title: '有图(71)' },
					{ id: 'bad', title: '差评(9)' }
				]
			},
			
			designerInfo: {
				avatar: '',
				name: '',
				verifyIcon: "",
				role: '',
				certIcon: '',
				certText: '',
				certDot: "",
				skills: '',
				introduction: '',
				userId: '',          
				brandType: '',       
				businessMode: '',    
				targetCustomer: '',  
				facilities: ''       
			},
			serviceBadges: [],
			statsData: [],
			businessInfo: {
				status: '',
				restDay: '',
				hours: '',
				establishedDate: ''  
			},
			shopInfo: {
				name: '',
				address: '',
				distance: '正在获取位置...',
				phone: '',
				latitude: null,
				longitude: null
			},
			promotions: [],
			rightStats: {
				serviceIcon: '',
				serviceCount: '0',
				workIcon: '',
				workCount: '0',
				dotIcon: ""
			},
			
			brandCategories: {
				service: [],
				appointment: [],
				works: [],
				reviews: []
			},
			userLatitude: null,
			userLongitude: null
		}
	},
	computed: {
		currentSubTabs() {
			
			const apiTabs = this.brandCategories[this.activeTab]
			if (apiTabs && apiTabs.length) {
				return apiTabs
			}
			
			const defaultTabs = this.subTabs[this.activeTab] || []
			return defaultTabs
		},
		isCompactSubTabs() {
			return ['service', 'appointment', 'works', 'reviews'].includes(this.activeTab)
		}
	},
	methods: {
		
		async getUserLocation() {
			try {
				const location = await this.getLocation()
				if (location) {
					this.userLatitude = location.latitude
					this.userLongitude = location.longitude
					this.updateDistance()
					await this.fetchNearbyStores(location.latitude, location.longitude)
				}
			} catch (err) {
				console.error('获取位置失败:', err)
				this.fetchNearbyStores(31.2304, 121.4737)
			}
		},
		
		getLocation() {
			return new Promise((resolve, reject) => {
				// #ifdef MP-WEIXIN
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						console.log('获取位置成功:', res)
						resolve({ latitude: res.latitude, longitude: res.longitude })
					},
					fail: (err) => {
						console.error('获取位置失败:', err)
						reject(err)
					}
				})
				// #endif
				// #ifdef H5
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						(position) => {
							const { latitude, longitude } = position.coords
							console.log('获取位置成功:', { latitude, longitude })
							resolve({ latitude, longitude })
						},
						(error) => {
							console.error('获取位置失败:', error)
							reject(error)
						}
					)
				} else {
					reject(new Error('浏览器不支持定位'))
				}
				// #endif
				// #ifdef APP-PLUS
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						resolve({ latitude: res.latitude, longitude: res.longitude })
					},
					fail: (err) => {
						reject(err)
					}
				})
				// #endif
			})
		},
		
		async fetchNearbyStores(latitude, longitude) {
			try {
				const res = await api.brand.getNearbyStores({
					latitude,
					longitude,
					radius_km: 10, 
					page: 1,
					page_size: 50
				})
				console.log('附近门店响应:', res)
				if (res.code === 200 && res.data && res.data.items) {
					
					const currentStore = res.data.items.find(item => item.id === this.brandId)
					if (currentStore && currentStore.distance_text) {
						this.shopInfo.distance = currentStore.distance_text
					}
				}
			} catch (err) {
				console.error('获取附近门店失败:', err)
			}
		},
		
		async fetchBrandDetail() {
			if (!this.brandId || this.loading) {
				console.log('fetchBrandDetail skipped: brandId=', this.brandId, 'loading=', this.loading)
				return
			}
			this.loading = true
			console.log('Fetching brand detail for brandId:', this.brandId)

			try {
				const res = await api.brand.getDetail(this.brandId)
				console.log('Brand detail response:', res)
				if (res.code === 200 && res.data) {
					
					const list = res.data.items || res.data.list || []
					console.log('Total brands:', list.length)

					
					const data = list.find(item => item.id === this.brandId) || list[0]
					console.log('Filtered brand data:', data)
					console.log('Brand name:', data?.brand_intro || data?.name)

					
					if (!data || !data.id) {
						console.error('No brand data found for id:', this.brandId)
						uni.showToast({ title: '品牌不存在', icon: 'none' })
						return
					}

					
					this.coverImage = data.logo || data.coverImage || data.avatar || ''

					
					this.designerInfo = {
						avatar: data.logo || data.avatar || '',
						name: data.brand_intro || data.name || '未知品牌',
						verifyIcon: data.verifyIcon || '',
						role: data.brand_type || data.business_mode || '',
						certIcon: data.certIcon || '',
						certText: data.certification || '',
						certDot: data.certDot || '',
						skills: data.main_services || data.nature || '',
						introduction: data.brand_intro || data.introduction || '',
						userId: data.user_id || '',
						brandType: data.brand_type || '',
						businessMode: data.business_mode || '',
						targetCustomer: data.target_customer || '',
						facilities: data.facilities || ''
					}

					
					const serviceFeatures = data.service_features || data.tags
					this.serviceBadges = serviceFeatures ? String(serviceFeatures).split(/[、,]/).map(tag => ({
						icon: '',
						label: tag.trim()
					})) : []

					
					// 计算从业年限（如果后端没给 experience 字段，则根据成立日期计算）
					const currentYear = new Date().getFullYear()
					const establishedYear = data.established_date ? new Date(data.established_date).getFullYear() : currentYear
					const experienceYears = data.experience || (currentYear - establishedYear)

					this.statsData = [
						{ value: String(data.appointment_count || data.appointmentCount || 0), label: '预约' },
						{ value: String(data.followers || data.followerCount || 0), label: '粉丝' },
						{ value: String(experienceYears || 0), unit: '年', label: '从业' },
						{ value: String(data.rating || 0), unit: '分', label: '评分' }
					]

					let establishedText = ''
					if (data.established_date) {
						establishedText = `${establishedYear}年入驻`
					}

					
					this.businessInfo = {
						status: '营业中',
						restDay: data.venue_type || '',
						hours: data.business_hours || data.businessHours || '',
						establishedDate: establishedYear
					}

					
					this.shopInfo = {
						name: data.brand_intro || data.name || '',
						address: data.location_desc || data.address || '',
						distance: this.shopInfo.distance || '',
						phone: data.contact_phone || data.phone || '',
						latitude: data.latitude,
						longitude: data.longitude
					}
					
					this.updateDistance()

					
					this.promotions = (data.promotions || []).map(p => ({
						text: typeof p === 'string' ? p : (p.label || p.name || '')
					}))

					
					this.rightStats = {
						serviceIcon: data.serviceIcon || '',
						serviceCount: String(data.designer_count || data.designerCount || 0),
						workIcon: data.workIcon || '',
						workCount: String(data.worksCount || 0),
						dotIcon: data.dotIcon || ''
					}

					
					this.isFollowed = data.isFollowed || false
				}
			} catch (err) {
				console.error('获取品牌详情失败:', err)
				uni.showToast({ title: '获取品牌信息失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		handleTabChange(tabId) {
			this.activeTab = tabId
			const tabs = this.subTabs[tabId]
			if (tabs && tabs.length && !this.activeSubTabs[tabId]) {
				this.$set(this.activeSubTabs, tabId, tabs[0].id)
			}
		},
		handleSubTabClick(subTabId) {
			this.$set(this.activeSubTabs, this.activeTab, subTabId)
		},
		handleMoreInfo() {
			uni.navigateTo({ url: `/pages/brand/info?id=${this.brandId}` })
		},
		async handleFollow() {
			if (!this.brandId) return
			try {
				const res = this.isFollowed
					? await api.brand.unfollow(this.brandId)
					: await api.brand.follow(this.brandId)

				if (res.code === 200) {
					this.isFollowed = !this.isFollowed
					uni.showToast({
						title: this.isFollowed ? '关注成功' : '已取消关注',
						icon: 'success'
					})
				}
			} catch (err) {
				console.error('关注操作失败:', err)
				uni.showToast({ title: '操作失败', icon: 'none' })
			}
		},
		handlePhone() {
			
			if (this.shopInfo.phone) {
				uni.makePhoneCall({ phoneNumber: this.shopInfo.phone })
			} else {
				uni.showToast({ title: '暂无联系电话', icon: 'none' })
			}
		},
		handleNavigation() {
			
			uni.openLocation({
				latitude: this.shopInfo.latitude || 30.5728,
				longitude: this.shopInfo.longitude || 104.0668,
				name: this.designerInfo.name,
				address: this.shopInfo.address
			})
		},
		handleShare() {
			console.log('Share clicked')
		},
		handleBooking() {
			console.log('Booking clicked')
		},
		handleClaimCoupon(coupon) {
			console.log('Claim coupon:', coupon)
			uni.showToast({ title: '领取成功', icon: 'success' })
		},
		updateDistance() {
			if (this.userLatitude && this.userLongitude && this.shopInfo.latitude && this.shopInfo.longitude) {
				const distance = calculateDistance(
					this.userLatitude, 
					this.userLongitude, 
					this.shopInfo.latitude, 
					this.shopInfo.longitude
				)
				this.shopInfo.distance = distance
			}
		}
	}
}
</script>

<style scoped lang="scss">
.screen {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-sizing: border-box;
}

.status-bar {
	height: 44rpx;
}

.main-content {
	position: relative;
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	padding: 0 12rpx 80rpx;
	padding-bottom: calc(220rpx + constant(safe-area-inset-bottom, 0));
	padding-bottom: calc(220rpx + env(safe-area-inset-bottom, 0));
	box-sizing: border-box;
	margin-top: -200rpx;
	z-index: 5;
	
	&.no-bottom-padding {
		padding-bottom: 20rpx;
	}
}



.tabs-wrapper {
	width: 100vw;
	margin-left: calc(-12rpx - 1px);
	background-color: #ffffff;
	border-radius: 16rpx;
	margin-top: -4rpx;
	overflow: hidden;
	box-sizing: border-box;
	padding-top: 10rpx;
}

.sub-tabs-section {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 24rpx;
	flex-wrap: nowrap;
	padding: 12rpx 20rpx;
	width: 100%;
	box-sizing: border-box;
	border-top: 2rpx solid #f5f5f5;
	margin-top: 0;
	overflow-x: auto;
	scrollbar-width: none;
}

.sub-tabs-section::-webkit-scrollbar {
	display: none;
}

.sub-tabs-section.appointment-sub-tabs {
	overflow: hidden;
	gap: 8rpx;
	padding: 12rpx 0;
	justify-content: space-between;
}

.sub-tabs-section.compact-sub-tabs:not(.appointment-sub-tabs) {
	overflow: hidden;
	gap: 8rpx;
	padding: 12rpx 30rpx;
	justify-content: flex-start;
}

.sub-tab-item {
	font-size: 28rpx;
	text-align: center;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	cursor: pointer;
	padding: 10rpx 16rpx;
	position: relative;
	margin: 10rpx 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	min-width: 90rpx;

	.compact-sub-tabs:not(.appointment-sub-tabs) & {
		flex: 0 0 auto;
		min-width: auto;
		padding: 6rpx 8rpx;
	}

	.appointment-sub-tabs & {
		flex: 1;
		min-width: auto;
		padding: 6rpx 4rpx;
	}
	
	&.active {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
		color: #333333;
	}
}

.sub-tab-title {
	font-size: 26rpx;
	line-height: 32rpx;
}

.sub-tab-subtitle {
	font-size: 22rpx;
	line-height: 28rpx;
	color: #a6a6a6;
	
	.sub-tab-item.active & {
		color: #333333;
		font-weight: 500;
	}
}

.tab-content-wrapper {
	position: relative;
	width: 100%;
	min-height: 200rpx;
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

.bottom-content {
	width: 100%;
}

.booking-footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	background-color: #ffffff;
	padding: 20rpx 12rpx;
	padding-bottom: calc(20rpx + constant(safe-area-inset-bottom, 0));
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom, 0));
	box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.1);
	z-index: 100;
	box-sizing: border-box;
}

.booking-btn-container {
	width: 100%;
	max-width: 726rpx;
	margin: 0 auto;
}

.booking-btn {
	width: 100%;
	height: 88rpx;
	background-color: #333333;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.booking-btn-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffffff;
	font-size: 32rpx;
}

.footer {
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	gap: 20rpx;
	padding: 16rpx 240rpx;
	height: 68rpx;
	flex-shrink: 0;
}

.indicator-bar {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
}
</style>
