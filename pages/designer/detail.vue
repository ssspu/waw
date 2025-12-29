<template>
	<page-meta :page-style="'padding-top:0px; background-color:#f2f2f2;'"></page-meta>
	<view class="screen">
		<!-- <view class="status-bar" style="height: 44rpx;"></view> -->
		
		<!-- 头部 -->
		<designer-detail-header :cover-image="coverImage"></designer-detail-header>
		
		<!-- 主内容区域 -->
		<view class="main-content" :class="{ 'reviews-fullwidth': activeTab === 'reviews', 'no-bottom-padding': activeTab === 'works' || activeTab === 'service' }">
			<!-- 设计师信息卡片 -->
			<designer-info-card
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
			></designer-info-card>
			
		<!-- Tab切换 -->
		<view class="tabs-wrapper">
			<designer-tab-switcher
				:active-tab="activeTab"
				:tabs="tabs"
				@tab-change="handleTabChange"
			></designer-tab-switcher>
			
			<!-- 子标签切换（根据当前tab显示） -->
			<view 
				v-if="currentSubTabs.length" 
				:class="['sub-tabs-section', { 'compact-sub-tabs': isCompactSubTabs, 'appointment-sub-tabs': activeTab === 'appointment' }]"
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
				<!-- 服务tab内容 -->
				<view v-if="activeTab === 'service'" class="tab-content" :key="'service'">
					<designer-service-tab-content
						:designer-id="designerId"
						:designer-user-id="designerUserId"
						:active-sub-tab="activeSubTabs.service"
						@book-service="handleBookService"
					></designer-service-tab-content>
				</view>

				<!-- 预约tab内容 -->
				<view v-if="activeTab === 'appointment'" class="tab-content" :key="'appointment'">
					<designer-appointment-tab-content
						:designer-id="designerId"
						:designer-user-id="designerUserId"
						:active-sub-tab="activeSubTabs.appointment"
						:selected-service="selectedBookingData"
						@time-selected="handleTimeSelected"
						@go-to-service="handleGoToService"
					></designer-appointment-tab-content>
				</view>

				<!-- 作品tab内容 -->
				<view v-if="activeTab === 'works'" class="tab-content" :key="'works'">
					<designer-works-tab-content :designer-id="designerUserId || designerId" :active-sub-tab="activeSubTabs.works"></designer-works-tab-content>
				</view>

				<!-- 点评tab内容 -->
				<view v-if="activeTab === 'reviews'" class="tab-content" :key="'reviews'">
					<designer-reviews-tab-content :designer-id="designerUserId || designerId" :active-sub-tab="activeSubTabs.reviews"></designer-reviews-tab-content>
				</view>
			</view>

			<!-- 底部内容（只在服务tab显示） -->
			<view v-if="activeTab === 'service'" class="bottom-content">
				<designer-portfolio-section :designer-id="designerUserId || designerId"></designer-portfolio-section>
			</view>
			
			<!-- 预约按钮（只在预约tab显示） -->
			<view v-if="activeTab === 'appointment'" class="booking-footer">
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
import { designerApi } from '@/api'
import DesignerDetailHeader from '../../components/designer/detail/DesignerDetailHeader.vue'
import DesignerInfoCard from '../../components/designer/detail/DesignerInfoCard.vue'
import DesignerTabSwitcher from '../../components/designer/detail/DesignerTabSwitcher.vue'
import DesignerServiceTabContent from '../../components/designer/detail/DesignerServiceTabContent.vue'
import DesignerAppointmentTabContent from '../../components/designer/detail/DesignerAppointmentTabContent.vue'
import DesignerWorksTabContent from '../../components/designer/detail/DesignerWorksTabContent.vue'
import DesignerReviewsTabContent from '../../components/designer/detail/DesignerReviewsTabContent.vue'
import DesignerPortfolioSection from '../../components/designer/detail/DesignerPortfolioSection.vue'
import CouponPopup from '../../components/popup/CouponPopup.vue'

export default {
	components: {
		DesignerDetailHeader,
		DesignerInfoCard,
		DesignerTabSwitcher,
		DesignerServiceTabContent,
		DesignerAppointmentTabContent,
		DesignerWorksTabContent,
		DesignerReviewsTabContent,
		DesignerPortfolioSection,
		CouponPopup
	},
	async onLoad(options) {
		
		this.designerId = options.id || '1'

		
		await this.loadDesignerDetail()

		
		if (options.tab) {
			this.activeTab = options.tab
			
			if (options.tab === 'appointment') {
				this.$nextTick(() => {
					setTimeout(() => {
						uni.pageScrollTo({
							scrollTop: 99999,
							duration: 300
						})
					}, 300)
				})
			}
		}
	},
	data() {
		return {
			designerId: '1',
			designerUserId: '', 
			coverImage: '',
			activeTab: 'service',
			showCouponPopup: false,
			selectedBookingData: null, 
			selectedTimeSlot: null, 
			activeSubTabs: {
				service: 'hair-service',
				appointment: 'today',
				works: 'female',
				reviews: 'all'
			},
			tabs: [
				{ id: 'service', label: '服务' },
				{ id: 'appointment', label: '预约' },
				{ id: 'works', label: '作品' },
				{ id: 'reviews', label: '点评' }
			],
			subTabs: {
				service: [
					{ id: 'hair-service', title: '美发服务' },
					
					
				],
				appointment: [
					{ id: 'today', title: '今天', subtitle: '周一' },
					{ id: 'tomorrow', title: '明天', subtitle: '周二' },
					{ id: '1205', title: '12.05', subtitle: '周三' },
					{ id: '1206', title: '12.06', subtitle: '周四' },
					{ id: '1207', title: '12.07', subtitle: '周五' },
					{ id: '1208', title: '12.08', subtitle: '周六' },
					{ id: '1209', title: '12.09', subtitle: '周日' }
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
				avatar: "",
				name: "",
				verifyIcon: "",
				role: "",
				certIcon: "",
				certText: "",
				certDot: "",
				skills: "",
				introduction: ""
			},
			serviceBadges: [],
			statsData: [],
			businessInfo: {
				status: "",
				restDay: "",
				hours: ""
			},
			shopInfo: {
				name: "NICE美发型沙...",
				address: "武侯区天府三家B7栋...",
				distance: "距您2.7km"
			},
			promotions: [],
			rightStats: {
				serviceIcon: "",
				serviceCount: "0",
				workIcon: "",
				workCount: "0",
				dotIcon: ""
			},
			
			designerCategories: {
				service: [],
				appointment: [],
				works: [],
				reviews: []
			}
		}
	},
	computed: {
		currentSubTabs() {
			
			const apiTabs = this.designerCategories[this.activeTab]
			if (apiTabs && apiTabs.length) {
				return apiTabs
			}
			
			return this.subTabs[this.activeTab] || []
		},
		isCompactSubTabs() {
			return ['appointment', 'works', 'reviews'].includes(this.activeTab)
		}
	},
	methods: {
		
		async loadDesignerDetail() {
			try {
				const res = await designerApi.getDetail(this.designerId)
				console.log('Designer detail response:', res)
				if (res && res.code === 200 && res.data) {
					
					const list = res.data.items || res.data.list || []
					console.log('Total designers:', list.length)

					
					const data = list.find(item => item.id === this.designerId) || list[0]
					console.log('Filtered designer data:', data)
					console.log('Designer name:', data?.real_name || data?.name)

					
					if (!data || !data.id) {
						console.error('No designer data found for id:', this.designerId)
						uni.showToast({ title: '设计师不存在', icon: 'none' })
						return
					}

					
					this.coverImage = data.coverImage || data.avatar || ''

					
					this.designerUserId = data.user_id || ''

					
					this.designerInfo = {
						id: data.user_id || data.id || '',
						avatar: data.avatar || data.coverImage || '',
						name: data.real_name || data.name || '',
						verifyIcon: data.verifyIcon || '',
						role: data.position || data.role || '',
						certIcon: data.certIcon || '',
						certText: data.certification || '',
						certDot: data.certDot || '',
						skills: data.expertise || (data.specialties ? data.specialties.join(',') : ''),
						introduction: data.introduction || ''
					}


					this.serviceBadges = ((data.service_features || data.tags) ? String(data.service_features || data.tags).split(/[,]/) : []).map(tag => ({
						icon: '',
						label: tag.trim()
					}))

					
					this.statsData = [
						{ value: String(data.total_appointments || data.appointmentCount || 0), label: "预约" },
						{ value: String(data.followers || data.followerCount || 0), label: "粉丝" },
						{ value: String(data.work_years || data.experience || 0), unit: "年", label: "从业" },
						{ value: String(data.rating || 0), unit: "分", label: "评分" }
					]

					
					this.shopInfo = {
						name: data.brandName || '',
						address: data.location_desc || '',
						distance: data.distance ? `距您${data.distance}km` : ''
					}

					
					this.rightStats = {
						serviceIcon: data.serviceIcon || '',
						serviceCount: String(data.serviceCount || 0),
						workIcon: data.workIcon || '',
						workCount: String(data.worksCount || 0),
						dotIcon: data.dotIcon || ''
					}

					
					this.businessInfo = {
						status: '营业中',
						restDay: data.appointment_time || '',
						hours: data.work_hours || ''
					}

					
					this.promotions = (data.promotions || []).map(p => ({
						text: typeof p === 'string' ? p : (p.label || p.name || '')
					}))

					
					if (data.categories) {
						if (data.categories.service) {
							this.designerCategories.service = data.categories.service.map(cat => ({
								id: cat.id || cat.key,
								title: cat.name || cat.label
							}))
						}
						if (data.categories.appointment) {
							this.designerCategories.appointment = data.categories.appointment.map(cat => ({
								id: cat.id || cat.key,
								title: cat.name || cat.label
							}))
						}
						if (data.categories.works) {
							this.designerCategories.works = data.categories.works.map(cat => ({
								id: cat.id || cat.key,
								title: cat.name || cat.label
							}))
						}
						if (data.categories.reviews) {
							this.designerCategories.reviews = data.categories.reviews.map(cat => ({
								id: cat.id || cat.key,
								title: cat.name || cat.label
							}))
						}
					}
				}
			} catch (error) {
				console.error('加载设计师详情失败:', error)
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
			uni.navigateTo({ url: `/pages/designer/info?id=${this.designerId}` })
		},
		handleFollow() {
			console.log('Follow clicked')
		},
		handlePhone() {
			console.log('Phone clicked')
		},
		handleNavigation() {
			console.log('Navigation clicked')
		},
		handleShare() {
			console.log('Share clicked')
		},
		handleBookService(bookingData) {
			
			this.selectedBookingData = bookingData
			
			this.activeTab = 'appointment'
			
			this.$nextTick(() => {
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 99999,
						duration: 300
					})
				}, 100)
			})
		},
		handleTimeSelected(timeSlot) {
			
			this.selectedTimeSlot = timeSlot
		},
		handleGoToService() {
			
			this.activeTab = 'service'
		},
		handleBooking() {
			
			if (!this.selectedBookingData) {
				uni.showToast({ title: '请先选择服务', icon: 'none' })
				return
			}
			
			if (!this.selectedTimeSlot) {
				uni.showToast({ title: '请选择预约时间', icon: 'none' })
				return
			}
			
			const orderData = {
				service: this.selectedBookingData.service,
				hairLength: this.selectedBookingData.hairLength,
				brand: this.selectedBookingData.brand,
				price: this.selectedBookingData.price,
				timeSlot: this.selectedTimeSlot,
				date: this.activeSubTabs.appointment,
				designer: this.designerInfo,
				shop: this.shopInfo
			}
			
			uni.navigateTo({
				url: '/packageOrder/pages/order/detail?data=' + encodeURIComponent(JSON.stringify(orderData))
			})
		},
		handleClaimCoupon(coupon) {
			console.log('Claim coupon:', coupon)
			uni.showToast({ title: '领取成功', icon: 'success' })
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
