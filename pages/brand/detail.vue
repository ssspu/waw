<template>
	<view class="screen">
		<!-- 状态栏占位 -->
		<!-- <view class="status-bar" style="height: 44rpx;"></view> -->
		
		<!-- 头部 -->
		<brand-detail-header></brand-detail-header>
		
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
					<brand-designer-tab-content :active-sub-tab="activeSubTabs.service"></brand-designer-tab-content>
				</view>
				
				<!-- 服务tab内容 -->
				<view v-if="activeTab === 'appointment'" class="tab-content" :key="'appointment'">
					<brand-service-tab-content :active-sub-tab="activeSubTabs.appointment"></brand-service-tab-content>
				</view>
				
				<!-- 作品tab内容 -->
				<view v-if="activeTab === 'works'" class="tab-content" :key="'works'">
					<brand-works-tab-content :active-sub-tab="activeSubTabs.works"></brand-works-tab-content>
				</view>
				
				<!-- 点评tab内容 -->
				<view v-if="activeTab === 'reviews'" class="tab-content" :key="'reviews'">
					<brand-reviews-tab-content :active-sub-tab="activeSubTabs.reviews"></brand-reviews-tab-content>
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
import BrandTabSwitcher from '../../components/BrandTabSwitcher.vue'
import BrandServiceTabContent from '../../components/brand/detail/BrandServiceTabContent.vue'
import BrandDesignerTabContent from '../../components/brand/detail/BrandDesignerTabContent.vue'
import BrandAppointmentTabContent from '../../components/brand/detail/BrandAppointmentTabContent.vue'
import BrandWorksTabContent from '../../components/BrandWorksTabContent.vue'
import BrandReviewsTabContent from '../../components/BrandReviewsTabContent.vue'
import BrandPortfolioSection from '../../components/brand/detail/BrandPortfolioSection.vue'
import CouponPopup from '../../components/popup/CouponPopup.vue'
// 导入品牌馆数据
import brandData from './brand-data.js'

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
		// 可以从options中获取品牌ID等信息
		if (options.id) {
			console.log('Brand ID:', options.id)
			this.brandId = options.id
		}
		// 支持从URL参数中指定初始tab
		if (options.tab) {
			this.activeTab = options.tab
		}
	},
	data() {
		return {
			brandId: null,
			activeTab: 'service',
			showCouponPopup: false,
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
					{ id: 'beauty', title: '美容师' }
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
			// 使用brand-data.js中的品牌数据
			designerInfo: {
				avatar: brandData.brandInfo.avatar,
				name: brandData.brandInfo.name,
				verifyIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-3.svg",
				role: brandData.brandInfo.badge,
				certIcon: brandData.brandInfo.certIcon,
				certText: brandData.brandInfo.certification,
				certDot: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg",
				skills: brandData.brandInfo.nature,
				introduction: brandData.brandInfo.introduction
			},
			serviceBadges: brandData.serviceBadges,
			statsData: brandData.statistics,
			businessInfo: {
				status: brandData.businessInfo.status,
				restDay: brandData.businessInfo.restDay,
				hours: brandData.businessInfo.hours
			},
			shopInfo: {
				name: brandData.addressInfo.street,
				address: brandData.addressInfo.detail,
				distance: brandData.addressInfo.distance
			},
			promotions: brandData.promotions.map(p => ({ text: p.label })),
			rightStats: {
				serviceIcon: brandData.rightStats.designerIcon,
				serviceCount: String(brandData.rightStats.designerCount),
				workIcon: brandData.rightStats.worksIcon,
				workCount: String(brandData.rightStats.worksCount),
				dotIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg"
			}
		}
	},
	computed: {
		currentSubTabs() {
			return this.subTabs[this.activeTab] || []
		},
		isCompactSubTabs() {
			return ['service', 'appointment', 'works', 'reviews'].includes(this.activeTab)
		}
	},
	methods: {
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
			uni.navigateTo({ url: '/pages/brand/info' })
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
		handleBooking() {
			console.log('Booking clicked')
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
