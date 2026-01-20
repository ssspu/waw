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
			scrollIntoViewId: '',
			oldScrollTop: 0,
			brandId: '',
			isScrolling: false
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
			this.isScrolling = true

			// 使用 selector 获取目标元素位置并滚动
			const query = uni.createSelectorQuery().in(this)
			query.select(`#${tab}`).boundingClientRect()
			query.select('.main-content').scrollOffset()
			query.exec((res) => {
				if (res[0] && res[1]) {
					const targetTop = res[1].scrollTop + res[0].top
					this.scrollTop = this.scrollTop === targetTop ? targetTop + 0.1 : targetTop
				}
				setTimeout(() => {
					this.isScrolling = false
				}, 500)
			})
		},
		onScroll(e) {
			this.oldScrollTop = e.detail.scrollTop
		},
		updateActiveTabByScroll() {
			const sections = ['designer', 'service', 'environment']
			const query = uni.createSelectorQuery().in(this)
			query.select('#designer').boundingClientRect()
			query.select('#service').boundingClientRect()
			query.select('#environment').boundingClientRect()
			query.exec(results => {
				if (!results || results.every(r => !r)) return
				const systemInfo = uni.getSystemInfoSync()
				const threshold = systemInfo.windowHeight / 3
				for (let i = results.length - 1; i >= 0; i--) {
					const rect = results[i]
					if (rect && rect.top <= threshold) {
						if (this.activeTab !== sections[i]) {
							this.activeTab = sections[i]
						}
						break
					}
				}
			})
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


.indicator-dot {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
}
</style>

























