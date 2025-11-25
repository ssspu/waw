<template>
	<view class="screen">
		<!-- 状态栏占位 -->
		<!-- <view class="status-bar" style="height: 44rpx;"></view> -->
		
		<!-- 头部 -->
		<designer-detail-header></designer-detail-header>
		
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
					<designer-service-tab-content :active-sub-tab="activeSubTabs.service"></designer-service-tab-content>
				</view>
				
				<!-- 预约tab内容 -->
				<view v-if="activeTab === 'appointment'" class="tab-content" :key="'appointment'">
					<designer-appointment-tab-content :active-sub-tab="activeSubTabs.appointment"></designer-appointment-tab-content>
				</view>
				
				<!-- 作品tab内容 -->
				<view v-if="activeTab === 'works'" class="tab-content" :key="'works'">
					<designer-works-tab-content :active-sub-tab="activeSubTabs.works"></designer-works-tab-content>
				</view>
				
				<!-- 点评tab内容 -->
				<view v-if="activeTab === 'reviews'" class="tab-content" :key="'reviews'">
					<designer-reviews-tab-content :active-sub-tab="activeSubTabs.reviews"></designer-reviews-tab-content>
				</view>
			</view>
			
			<!-- 底部内容（只在服务tab显示） -->
			<view v-if="activeTab === 'service'" class="bottom-content">
				<designer-portfolio-section></designer-portfolio-section>
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
		
	</view>
</template>

<script>
import DesignerDetailHeader from '../../components/designer/detail/DesignerDetailHeader.vue'
import DesignerInfoCard from '../../components/designer/detail/DesignerInfoCard.vue'
import DesignerTabSwitcher from '../../components/DesignerTabSwitcher.vue'
import DesignerServiceTabContent from '../../components/designer/detail/DesignerServiceTabContent.vue'
import DesignerAppointmentTabContent from '../../components/designer/detail/DesignerAppointmentTabContent.vue'
import DesignerWorksTabContent from '../../components/DesignerWorksTabContent.vue'
import DesignerReviewsTabContent from '../../components/DesignerReviewsTabContent.vue'
import DesignerPortfolioSection from '../../components/designer/detail/DesignerPortfolioSection.vue'

export default {
	components: {
		DesignerDetailHeader,
		DesignerInfoCard,
		DesignerTabSwitcher,
		DesignerServiceTabContent,
		DesignerAppointmentTabContent,
		DesignerWorksTabContent,
		DesignerReviewsTabContent,
		DesignerPortfolioSection
	},
	onLoad(options) {
		// 可以从options中获取设计师ID等信息
		if (options.id) {
			console.log('Designer ID:', options.id)
		}
		// 支持从URL参数中指定初始tab
		if (options.tab) {
			this.activeTab = options.tab
		}
	},
	data() {
		return {
			activeTab: 'service',
			activeSubTabs: {
				service: 'hair',
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
					{ id: 'hair', title: '美发师' },
					{ id: 'beauty', title: '美容师' }
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
				avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-153.png",
				name: "朱一龙",
				verifyIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2110.svg",
				role: "技术总监",
				certIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2.svg",
				certText: "职业认证",
				certDot: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg",
				skills: "染发设计、短发造型、女士晚装:",
				introduction: "从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长..."
			},
			serviceBadges: [
				{ icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "安心服务" },
				{ icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "7天无忧" },
				{ icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "免费设计" },
				{ icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "小吃水果" },
				{ icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "预约服务" }
			],
			statsData: [
				{ value: "1244", label: "预约" },
				{ value: "2000", label: "粉丝" },
				{ value: "18", unit: "年", label: "从业" },
				{ value: "4.8", unit: "分", label: "评分" }
			],
			businessInfo: {
				status: "营业中",
				restDay: "周二休息",
				hours: "10:00-21:00"
			},
			shopInfo: {
				name: "NICE美发造型沙...",
				address: "武侯区天府三家B7栋...",
				distance: "距您2.7km"
			},
			promotions: [
				{ text: "满100-5" },
				{ text: "满500-50" }
			],
			rightStats: {
				serviceIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1.svg",
				serviceCount: "281",
				workIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-4.svg",
				workCount: "234",
				dotIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg"
			}
		}
	},
	computed: {
		currentSubTabs() {
			return this.subTabs[this.activeTab] || []
		},
		isCompactSubTabs() {
			return ['appointment', 'works', 'reviews'].includes(this.activeTab)
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
			uni.navigateTo({ url: '/pages/designer/info' })
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
