<template>
	<view class="brand-detail-page">
		<!-- 头部 -->
		<brand-detail-header></brand-detail-header>
		
		<!-- 主内容区域 -->
		<view class="main-content">
			<!-- 品牌信息卡片 -->
			<brand-info-card
				:brand-info="brandInfo"
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
			></brand-info-card>
			
			<!-- Tab切换 -->
			<designer-tab-switcher
				:active-tab="activeTab"
				:tabs="tabs"
				@tab-change="handleTabChange"
			></designer-tab-switcher>
			
			<!-- Tab内容 -->
			<view class="tab-content-wrapper">
				<!-- 设计师tab内容 -->
				<view v-if="activeTab === 'stylist'" class="tab-content" :key="'stylist'">
					<brand-stylist-tab-content></brand-stylist-tab-content>
				</view>
				
				<!-- 服务tab内容 -->
				<view v-if="activeTab === 'service'" class="tab-content" :key="'service'">
					<brand-service-tab-content></brand-service-tab-content>
				</view>
				
				<!-- 作品tab内容 -->
				<view v-if="activeTab === 'works'" class="tab-content" :key="'works'">
					<designer-works-tab-content></designer-works-tab-content>
				</view>
				
				<!-- 点评tab内容 -->
				<view v-if="activeTab === 'reviews'" class="tab-content" :key="'reviews'">
					<brand-reviews-tab-content></brand-reviews-tab-content>
				</view>
			</view>
		</view>
		
		<!-- 底部指示器 -->
		<view class="footer-indicator">
			<view class="indicator-bar"></view>
		</view>
	</view>
</template>

<script>
import BrandDetailHeader from '../../components/brand/detail/BrandDetailHeader.vue'
import BrandInfoCard from '../../components/brand/detail/BrandInfoCard.vue'
import DesignerTabSwitcher from '../../components/DesignerTabSwitcher.vue'
import BrandStylistTabContent from '../../components/brand/detail/BrandStylistTabContent.vue'
import BrandServiceTabContent from '../../components/brand/detail/BrandServiceTabContent.vue'
import DesignerWorksTabContent from '../../components/DesignerWorksTabContent.vue'
import BrandReviewsTabContent from '../../components/brand/detail/BrandReviewsTabContent.vue'

export default {
	components: {
		BrandDetailHeader,
		BrandInfoCard,
		DesignerTabSwitcher,
		BrandStylistTabContent,
		BrandServiceTabContent,
		DesignerWorksTabContent,
		BrandReviewsTabContent
	},
	onLoad(options) {
		// 可以从options中获取品牌ID等信息
		if (options.id) {
			console.log('Brand ID:', options.id)
		}
		// 支持从URL参数中指定初始tab
		if (options.tab) {
			this.activeTab = options.tab
		}
	},
	data() {
		return {
			activeTab: 'stylist',
			tabs: [
				{ id: 'stylist', label: '设计师' },
				{ id: 'service', label: '服务' },
				{ id: 'works', label: '作品' },
				{ id: 'reviews', label: '点评' }
			],
			brandInfo: {
				avatar: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-153.png",
				name: "金龙大好人美发沙龙...",
				verifyBadge: "舒适",
				certIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-3.svg",
				certText: "企业认证",
				certDot: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg",
				type: "工作室、专业店",
				introduction: "从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长..."
			},
			serviceBadges: [
				{ icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "安心服务" },
				{ icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "7天无忧" },
				{ icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "免费设计" },
				{ icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "小吃水果" },
				{ icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "预约服务" }
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
				name: "锦江区红星路120号",
				address: "IFS国际东门2栋607室",
				distance: "距您2.7km"
			},
			promotions: [
				{ text: "满100-5" },
				{ text: "满500-50" }
			],
			rightStats: {
				serviceIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-4.svg",
				serviceCount: "281",
				workIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-12.svg",
				workCount: "234",
				dotIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg"
			}
		}
	},
	methods: {
		handleTabChange(tabId) {
			this.activeTab = tabId
		},
		handleMoreInfo() {
			console.log('More info clicked')
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
		}
	}
}
</script>

<style scoped lang="scss">
.brand-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-sizing: border-box;
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
</style>

