<template>
	<page-meta :page-style="'padding-top:0px; background-color:#f2f2f2;'"></page-meta>
	<view class="screen">
		<!-- 头部 -->
		<designer-detail-header></designer-detail-header>
		
		<!-- 主内容区域 -->
		<view class="main-content">
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
			<designer-tab-switcher
				:active-tab="activeTab"
				:tabs="tabs"
				@tab-change="handleTabChange"
			></designer-tab-switcher>
			
			<!-- Tab内容 -->
			<view class="tab-content-wrapper">
				<!-- 服务tab内容 -->
				<view v-if="activeTab === 'service'" class="tab-content" :key="'service'">
					<designer-service-tab-content></designer-service-tab-content>
				</view>
				
				<!-- 预约tab内容 -->
				<view v-if="activeTab === 'appointment'" class="tab-content" :key="'appointment'">
					<designer-appointment-tab-content></designer-appointment-tab-content>
				</view>
				
				<!-- 作品tab内容 -->
				<view v-if="activeTab === 'works'" class="tab-content" :key="'works'">
					<designer-works-tab-content></designer-works-tab-content>
				</view>
				
				<!-- 点评tab内容 -->
				<view v-if="activeTab === 'reviews'" class="tab-content" :key="'reviews'">
					<designer-reviews-tab-content></designer-reviews-tab-content>
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
			tabs: [
				{ id: 'service', label: '服务' },
				{ id: 'appointment', label: '预约' },
				{ id: 'works', label: '作品' },
				{ id: 'reviews', label: '点评' }
			],
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
	methods: {
		handleTabChange(tabId) {
			this.activeTab = tabId
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
	box-sizing: border-box;
	margin-top: -200rpx;
	z-index: 5;
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
