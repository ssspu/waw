<template>
	<view class="info-page">
		<!-- 自定义导航栏 -->
		<view class="custom-navbar">
			<view class="navbar-content">
				<view class="navbar-tabs">
					<brand-info-profile-section
						:active-tab="activeTab"
						@tab-change="handleTabChange"
					></brand-info-profile-section>
				</view>
			</view>
		</view>

		<!-- 主内容 -->
		<scroll-view
			class="main-content"
			scroll-y
			:scroll-top="scrollTop"
			scroll-with-animation
			@scroll="onScroll"
		>
			<view class="content-section">
				<brand-info-services-section :active-tab="activeTab" :brand-id="brandId"></brand-info-services-section>
			</view>

			<!-- 底部指示器 -->
			<view class="footer-indicator">
				<view class="indicator-dot"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import BrandInfoProfileSection from '../../components/brand/info/BrandInfoProfileSection.vue'
import BrandInfoServicesSection from '../../components/brand/info/BrandInfoServicesSection.vue'

export default {
	components: {
		BrandInfoProfileSection,
		BrandInfoServicesSection
	},
	data() {
		return {
			statusBarHeight: 44,
			activeTab: 'designer',
			scrollTop: 0,
			oldScrollTop: 0,
			brandId: ''
		}
	},
	onLoad(options) {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
		if (options.id) {
			this.brandId = options.id
		}
	},
	methods: {
		handleTabChange(tab) {
			this.activeTab = tab
			this.scrollToSection(tab)
		},
		onScroll(e) {
			this.oldScrollTop = e.detail.scrollTop
		},
		scrollToSection(sectionId) {
			const query = uni.createSelectorQuery().in(this)
			query.select(`#${sectionId}`).boundingClientRect(rect => {
				if (rect) {
					// 计算目标滚动位置
					const targetTop = this.oldScrollTop + rect.top - 20
					// 先重置再设置，确保触发滚动
					this.scrollTop = this.oldScrollTop
					this.$nextTick(() => {
						this.scrollTop = targetTop > 0 ? targetTop : 0
					})
				}
			}).exec()
		}
	}
}
</script>

<style scoped lang="scss">
.info-page {
	width: 100%;
	height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
}

.custom-navbar {
	width: 100%;
	background-color: #ffffff;
	z-index: 100;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	flex-shrink: 0;
}

.navbar-content {
	height: 44px;
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.navbar-tabs {
	flex: 1;
}

.main-content {
	width: 100%;
	flex: 1;
	box-sizing: border-box;
	padding-bottom: 40rpx;
	min-height: 0;
}

.content-section {
	padding: 0;
}

.footer-indicator {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	padding: 40rpx 0;
}

.indicator-dot {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
}
</style>

























