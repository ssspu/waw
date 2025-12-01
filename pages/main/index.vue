<template>
	<view class="screen">
		<view class="status-bar" style="height: 44rpx;"></view>

		<!-- 背景图片 - 预加载所有背景图避免切换闪烁 -->
		<image
			v-for="(tab, key) in assets"
			:key="'header-' + key"
			class="bg-image-1"
			:class="{ active: activeTab === key }"
			:src="tab.headerBg"
			mode="aspectFill"
		></image>
		<!-- <image 
			v-if="currentMainBg"
			class="bg-image-2" 
			:src="currentMainBg" 
			mode="aspectFill"
		></image> -->
		
		<!-- 状态栏和头部 -->
		<view class="header-wrapper">
			<!-- 导航栏 -->
			<view class="nav-bar">
				<view class="nav-left">
					<view class="back-btn" @tap="goBack">
						<image class="back-icon" src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-4.svg" mode="aspectFit"></image>
					</view>
					<text class="nav-title">美发</text>
				</view>
				<view class="nav-bar-right">
					<!-- 搜索栏 -->
					<view class="search-bar" @tap="handleSearchClick">
						<image class="search-icon" :src="currentBadgeIcon" mode="aspectFit"></image>
						<text class="search-text">{{ currentTabLabel }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- Tabs 背景块 -->
		<view class="tabs-bg"></view>
		
		<!-- Tabs + 内容区背景 -->
		<view class="content-section">
			<!-- 预加载所有背景图，通过 opacity 切换避免闪烁 -->
			<image
				v-for="(tab, key) in assets"
				:key="key"
				class="content-bg-image"
				:class="{ active: activeTab === key }"
				:src="tab.tabBg"
				mode="widthFix"
			></image>
			<!-- Tabs -->
			<view class="tabs-wrapper">
				<view class="tabs-list">
					<view 
						v-for="(tab, index) in tabItems" 
						:key="index"
						class="tab-item"
						:class="{ active: activeTab === tab.value }"
						@tap="switchTab(tab.value)"
					>
						<text class="tab-label" :class="{ active: activeTab === tab.value }">{{ tab.label }}</text>
						<image 
							v-if="activeTab === tab.value"
							class="tab-indicator" 
							src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-215.svg" 
							mode="aspectFit"
						></image>
					</view>
				</view>
			</view>
			
			<!-- 主内容 -->
			<view class="main-content" :class="{ 'reviews-fullwidth': activeTab === 'reviews' }">
				<!-- 设计师板块 -->
				<view v-if="activeTab === 'designer'" :key="'designer'" class="designer-content animate-fade-up">
					<design-section ref="designSection" :key="'designer-section-' + tabSwitchCount"></design-section>
				</view>

				<!-- 优服务板块 -->
				<view v-if="activeTab === 'service'" :key="'service'" class="service-content animate-fade-up">
					<featured-services-section @service-click="handleServiceCategoryClick"></featured-services-section>
					<recommendations-section @card-click="handleRecommendationCardClick"></recommendations-section>
					<vip-section></vip-section>
					<service-gallery-section ref="serviceGallerySection" :selected-category="selectedServiceCategory"></service-gallery-section>
				</view>

				<!-- 品牌馆板块 -->
				<view v-if="activeTab === 'brand'" :key="'brand'" class="brand-content animate-fade-up">
					<view class="featured-section">
						<brand-featured-items-section></brand-featured-items-section>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import DesignSection from '../../components/main/index/DesignSection.vue'
import ServiceOptionsSection from '../../components/main/index/ServiceOptionsSection.vue'
import FeaturedServicesSection from '../../components/main/index/FeaturedServicesSection.vue'
import RecommendationsSection from '../../components/main/index/RecommendationsSection.vue'
import VIPSection from '../../components/main/index/VIPSection.vue'
import ServiceGallerySection from '../../components/main/index/ServiceGallerySection.vue'
import BrandFeaturedItemsSection from '../../components/main/index/BrandFeaturedItemsSection.vue'

export default {
	components: {
		DesignSection,
		ServiceOptionsSection,
		FeaturedServicesSection,
		RecommendationsSection,
		VIPSection,
		ServiceGallerySection,
		BrandFeaturedItemsSection
	},
	data() {
		return {
			activeTab: 'designer',
			selectedServiceCategory: '', // 空字符串表示"优服务"显示全部
			tabSwitchCount: 0, // 用于重置组件状态
			tabItems: [
				{ value: "designer", label: "设计师" },
				{ value: "service", label: "优服务" },
				{ value: "brand", label: "品牌馆" },
			],
			// Assets configuration
			assets: {
				designer: {
					headerBg: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-217.png",
					mainBg: "/static/background-image/mian-background-left.png",
					badgeIcon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-1.svg",
					tabBg: "/static/background-image/mian-background-left.png"
				},
				service: {
					headerBg: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-217.png",
					mainBg: "/static/background-image/mian-background-mid.png",
					badgeIcon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-3.svg",
					tabBg: "/static/background-image/mian-background-mid.png"
				},
				brand: {
					headerBg: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-217.png",
					mainBg: "/static/background-image/mian-background-right.png",
					badgeIcon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-4.svg",
					tabBg: "/static/background-image/mian-background-right.png"
				}
			}
		}
	},
	computed: {
		currentHeaderBg() {
			return this.assets[this.activeTab].headerBg
		},
		currentMainBg() {
			return this.assets[this.activeTab].mainBg
		},
		currentBadgeIcon() {
			return this.assets[this.activeTab].badgeIcon
		},
		currentTabLabel() {
			const currentTab = this.tabItems.find(tab => tab.value === this.activeTab)
			return currentTab ? currentTab.label : '设计师'
		}
	},
	onLoad(options) {
		console.log('main页面 onLoad, 接收到的参数:', options)
		if (options.tab) {
			// Ensure the tab exists
			const validTabs = ['designer', 'service', 'brand'];
			if (validTabs.includes(options.tab)) {
				this.activeTab = options.tab;
				console.log('切换到标签:', options.tab)
			} else {
				console.warn('无效的标签:', options.tab)
			}
		} else {
			console.log('没有接收到tab参数，使用默认标签: designer')
		}

		// 处理滚动到附近推荐
		if (options.scrollTo === 'nearby') {
			this.$nextTick(() => {
				setTimeout(() => {
					this.scrollToNearbySection()
				}, 500) // 等待页面渲染完成
			})
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		switchTab(value) {
			this.activeTab = value
			// 切换tabs时重置分类为默认
			this.selectedServiceCategory = ''
			this.tabSwitchCount++
		},
		handleSearchClick() {
			uni.navigateTo({
				url: `/pages/main/search?tab=${this.activeTab}`
			})
		},
		handleServiceCategoryClick(service) {
			// 切换服务分类
			this.selectedServiceCategory = service.label
			// 滚动到列表区域
			this.scrollToServiceGallery()
		},
		handleRecommendationCardClick(card) {
			// 只处理套餐优选和防脱护理
			if (card.id === 'package' || card.id === 'haircare') {
				this.selectedServiceCategory = card.title
				// 滚动到列表区域
				this.scrollToServiceGallery()
			}
			// 会员特区可以跳转到会员页面（暂不处理）
		},
		scrollToServiceGallery() {
			// 通过 ref 调用子组件方法，确保微信小程序中也能正常工作
			this.$nextTick(() => {
				if (this.$refs.serviceGallerySection) {
					this.$refs.serviceGallerySection.scrollToTop()
				}
			})
		},
		scrollToNearbySection() {
			// 滚动到附近推荐区域，使其直接显示在屏幕顶端
			// 通过 ref 调用子组件方法，确保微信小程序中也能正常工作
			this.$nextTick(() => {
				if (this.$refs.designSection) {
					this.$refs.designSection.scrollToNearby()
				}
			})
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
	// 禁用微信小程序点击高亮
	-webkit-tap-highlight-color: transparent;
	tap-highlight-color: transparent;

	// 所有可点击元素禁用高亮
	view, text, image {
		-webkit-tap-highlight-color: transparent;
	}
}

.bg-image-1 {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 772rpx;
	object-fit: cover;
	z-index: 0;
	opacity: 0;

	&.active {
		opacity: 1;
	}
}

.bg-image-2 {
	position: absolute;
	top: 570rpx;
	left: 0;
	width: 100%;
	height: auto;
	min-height: 100vh;
	object-fit: contain;
	object-position: top center;
	z-index: 10;
	transition: opacity 0.3s ease;
}

.header-wrapper {
	position: relative;
	z-index: 10;
	width: 100%;
}

.nav-bar {
	position: relative;
	padding: 62rpx 30rpx;
	display: flex;
	align-items: center;
	white-space: nowrap;
}

.nav-bar-right {
	position: relative;
	display: flex;
	align-items: center;
	gap: 12rpx;
	margin-left: 30rpx;
}

.nav-left {
	display: flex;
	align-items: center;
	gap: 48rpx;
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


.logo-group {
	width: 256rpx;
	height: 144rpx;
}

.badge-container {
	position: relative;
	padding: 0;
	margin: 0;
}

.category-badge {
	background-color: rgba(0, 0, 0, 0.4);
	color: #e6e6e6;
	border-radius: 52rpx;
	height: 60rpx;
	margin-right: 400rpx;
	padding: 0 20rpx;
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
	border: 0;
}

.badge-icon {
	width: 36rpx;
	height: 36rpx;
	margin-right: 4rpx;
}

.badge-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #e6e6e6;
}

.search-bar {
	background-color: rgba(0, 0, 0, 0.4);
	color: #e6e6e6;
	border-radius: 52rpx;
	width: 240rpx;
	height: 60rpx;
	padding: 0 20rpx;
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
	border: 0;
	white-space: nowrap;
	cursor: pointer;
	position: relative;
	z-index: 10;
}

.search-icon {
	width: 36rpx;
	height: 36rpx;
	margin-right: 4rpx;
}

.search-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #e6e6e6;
	white-space: nowrap;
}

.content-section {
	position: relative;
	z-index: 10;
	margin-top: 438rpx;
	width: 100%;
	min-height: calc(100vh - 438rpx);
	padding-bottom: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
}

.content-bg-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: auto;
	z-index: 0;
	pointer-events: none;
	opacity: 0;

	&.active {
		opacity: 1;
	}
}

.tabs-bg {
	position: absolute;
	top: 678rpx;
	left: 0;
	right: 0;
	height: 100rpx;
	background-color: #e6e6e6;
	border-radius: 36rpx 36rpx 0 0;
	box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.08);
	z-index: 5;
}

.tabs-wrapper {
	position: relative;
	z-index: 11;
	margin-top: 0;
	margin-bottom: -25rpx;
	width: 100%;
	height: 125rpx;
	background-color: transparent;
	padding: 0;
	box-sizing: border-box;
	display: flex;
	align-items: flex-start;
	justify-content: center;
}

.tabs-list {
	width: 100%;
	height: 100%;
	background-color: transparent;
	border: 0;
	border-radius: 0;
	padding: 0 30rpx;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	gap: 0;
	position: relative;
}

.tab-item {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 6rpx;
	padding: 20rpx 0 0;
	height: 125rpx;
	flex: 1;
	cursor: pointer;
	box-sizing: border-box;
	transition: color 0.15s ease;
	// 禁用微信小程序点击高亮
	-webkit-tap-highlight-color: transparent;
	tap-highlight-color: transparent;

	&.active {
		top: -10rpx;
	}
}

.tab-label {
	font-size: 28rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #666666;
	font-weight: normal;
	line-height: 1.2;
	white-space: nowrap;
	transition: color 0.15s ease;
	position: relative;
	top: 16rpx;
	z-index: 2;
	// 禁用微信小程序点击高亮
	-webkit-tap-highlight-color: transparent;

	&.active {
		font-family: 'DIN_Black-Regular', Helvetica;
		font-weight: 700;
		color: #000000;
	}
}

.tab-indicator {
	width: 34rpx;
	height: 10rpx;
	position: absolute;
	bottom: 40rpx;
	left: 50%;
	transform: translateX(-50%);
}

.main-content {
	position: relative;
	z-index: 10;
	flex: 1;
	display: flex;
	flex-direction: column;
	// align-items: stretch; // Removed to avoid stretching fixed width items if any
	gap: 18rpx;
	padding: 20rpx 12rpx 40rpx;
	top: -15rpx;
	width: 100%;

	&.reviews-fullwidth {
		padding-left: 0;
		padding-right: 0;
	}
}

// Brand specific styles
.brand-content {
	position: relative;
	width: 100%;
}

.item-list-section-wrapper {
	// Adjusted for relative flow in this merged page, unless we want to keep absolute
	// In the original brand page it was absolute. Here we are inside main-content.
	// If we make it relative, it will stack.
	position: relative; 
	width: 100%;
	padding: 0 12rpx;
	box-sizing: border-box;
}

.footer {
	position: relative;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16rpx 240rpx;
	height: 68rpx;
	margin-top: auto;
}

.indicator-bar {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
}

/* 内容容器 */
.designer-content,
.service-content,
.brand-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 18rpx;
}

/* 动画 */
@keyframes fade-up {
	0% {
		opacity: 0;
		transform: translateY(20rpx);
	}
	to {
		opacity: 1;
		transform: none;
	}
}

.animate-fade-up {
	animation: fade-up 0.5s ease forwards;
}
</style>

