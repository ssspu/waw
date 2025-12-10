<template>
	<view class="design-section">
		<!-- 服务分类 -->
		<view class="service-categories-card">
			<view class="categories-content">
				<view 
					v-for="(category, index) in serviceCategories" 
					:key="index" 
					class="category-item"
					@tap="handleCategoryClick(category)"
				>
					<image class="category-icon" :src="category.icon" :alt="category.title" mode="aspectFit"></image>
					<view class="category-info">
						<text class="category-title">{{ category.title }}</text>
						<text class="category-subtitle">{{ category.subtitle }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 预约选项 - 测试阶段不显示 -->
		<!-- <view class="booking-options">
			<view
				v-for="(option, index) in bookingOptions"
				:key="index"
				class="booking-card"
				@tap="handleBookingClick(option)"
			>
				<view class="booking-content">
					<view class="booking-info">
						<text class="booking-title">{{ option.title }}</text>
						<text class="booking-subtitle">{{ option.subtitle }}</text>
					</view>
					<image class="booking-icon" :src="option.icon" :alt="option.title" mode="aspectFit"></image>
				</view>
			</view>
		</view> -->
		
		<!-- 排行榜 -->
		<view class="ranking-card">
			<view class="ranking-header">
				<text class="ranking-title">排行榜</text>
				<!-- 测试阶段不显示 -->
				<!-- <image class="more-icon" src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2.svg" mode="aspectFit"></image> -->
			</view>
			
			<view class="ranking-tabs">
				<view 
					v-for="(tab, index) in rankingTabs" 
					:key="index" 
					class="ranking-tab"
					:class="{ active: tab.active }"
					@tap="switchRankingTab(index)"
				>
					<text>{{ tab.label }}</text>
					<view v-if="tab.new" class="new-badge">
						<image class="badge-bg" src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-216.svg" mode="aspectFit"></image>
						<text class="new-text">NEW</text>
					</view>
				</view>
			</view>
			
			<swiper 
				class="ranking-swiper"
				:current="rankingSwiperIndex"
				@change="handleRankingSwiperChange"
				:indicator-dots="false"
				:autoplay="false"
				:circular="false"
			>
				<swiper-item 
					v-for="(slide, slideIndex) in currentRankingSlides" 
					:key="slideIndex"
					class="ranking-swiper-item"
				>
					<view class="ranking-list">
						<view 
							v-for="(stylist, index) in slide" 
							:key="index" 
							class="ranking-item"
							@tap="handleStylistClick(stylist)"
						>
							<view class="stylist-avatar" :style="{ backgroundImage: `url(${stylist.image || 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png'})` }"></view>
							<view class="stylist-info">
								<view class="stylist-header">
									<text class="stylist-name">{{ stylist.name }}</text>
									<view class="stylist-badge">{{ stylist.level }}</view>
								</view>
								<text class="stylist-role">{{ stylist.role }}</text>
								<view class="stylist-rating">
									<text class="rating-score">{{ stylist.rating }}</text>
									<image class="star-icon" src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/star-1.svg" mode="aspectFit"></image>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			
			<view class="pagination-dots">
				<view 
					v-for="(dot, index) in currentRankingSlides.length" 
					:key="index"
					class="dot"
					:class="{ active: index === rankingSwiperIndex }"
				></view>
			</view>
		</view>
		
		<!-- 附近推荐 -->
		<view id="nearby-section" class="nearby-section">
			<view class="nearby-header">
				<text class="nearby-title">附近推荐</text>
				<!-- <view class="filter-btn" @tap="handleFilter">
					<text class="filter-text">筛选</text>
					<image class="filter-icon" src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-3.svg" mode="aspectFit"></image>
				</view> -->
			</view>

			<!-- 分类标签 -->
			<view class="category-tab">
				<view class="tab-content">
					<image class="tab-icon" src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame.svg" mode="aspectFit"></image>
					<text class="tab-text">{{ activeCategory }}</text>
				</view>
			</view>
			
			<!-- 附近设计师列表 -->
			<view class="nearby-list">
				<view
					v-for="(stylist, index) in nearbyStylistsData"
					:key="index"
					class="nearby-item"
					@tap="handleStylistClick(stylist)"
				>
					<!-- 背景图片 -->
					<view class="nearby-cover" :style="{ backgroundImage: `url(${stylist.coverImage || stylist.image || 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png'})` }"></view>
					<view class="nearby-item-wrapper">
						<view class="nearby-avatar" :style="{ backgroundImage: `url(${stylist.image || 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png'})` }"></view>
						<view class="nearby-info">
							<view class="nearby-header-info">
								<text class="nearby-name">{{ stylist.name }}</text>
								<view class="nearby-level-badge">{{ stylist.level }}</view>
							</view>
							<text class="nearby-role">{{ stylist.role }}</text>
							<view class="nearby-specialties">
								<text class="specialties-label">擅长:</text>
								<view 
									v-for="(specialty, idx) in stylist.specialties" 
									:key="idx" 
									class="specialty-badge"
								>
									{{ specialty }}
								</view>
							</view>
							<view class="nearby-stats">
								<view class="stats-rating">
									<text class="stats-rating-score">{{ stylist.rating }}</text>
									<view class="star-container">
										<image class="star-small" src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/star-1.svg" mode="aspectFit"></image>
									</view>
								</view>
								<view class="stats-info">
									<view class="stats-item">
										<text class="stats-label">服务</text>
										<text class="stats-value">{{ stylist.services }}</text>
									</view>
									<text class="stats-divider">｜</text>
									<view class="stats-item">
										<text class="stats-label">作品</text>
										<text class="stats-value">{{ stylist.works }}</text>
									</view>
								</view>
							</view>
							<view class="nearby-footer">
								<view class="nearby-tags">
									<view 
										v-for="(tag, idx) in stylist.tags" 
										:key="idx" 
										class="tag-badge"
									>
										{{ tag }}
									</view>
								</view>
								<text class="nearby-distance">{{ stylist.distance }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { designerApi } from '@/api'

export default {
	data() {
		return {
			serviceCategories: [
				{
					icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2006.svg",
					title: "首席创意",
					subtitle: "新潮时尚引领",
				},
				{
					icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2005-1.svg",
					title: "总监店长",
					subtitle: "资深技术大咖",
				},
				{
					icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2005.svg",
					title: "人气名师",
					subtitle: "人气霸榜标杆",
				},
				{
					icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2006-1.svg",
					title: "国际导师",
					subtitle: "海内外多语种",
				},
			],
			bookingOptions: [
				{
					title: "预约到店",
					subtitle: "线下固定门店",
					icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2278.svg",
				},
				{
					title: "预约上门",
					subtitle: "约定服务地点",
					icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2287.svg",
				},
			],
			rankingTabs: [
				{ label: "新秀榜", active: true, value: "rookie", new: true },
				{ label: "专业榜", active: false, value: "pro", new: false },
				{ label: "服务榜", active: false, value: "service", new: true },
			],
			activeRankingTab: "rookie",
			rankingSwiperIndex: 0,
			// 从API获取的设计师列表
			designers: [],
			// 当前选中的分类
			activeCategory: '美发师',
		}
	},
	async created() {
		await this.loadDesigners()
	},
	computed: {
		// 排行榜数据，基于designers分组
		currentRankingSlides() {
			if (!this.designers.length) return []
			// 将设计师分成每6个一组
			const chunkSize = 6
			const slides = []
			for (let i = 0; i < this.designers.length; i += chunkSize) {
				slides.push(this.designers.slice(i, i + chunkSize).map(d => ({
					id: d.id,
					image: d.avatar,
					name: d.name,
					level: d.level,
					role: `${d.position}｜从业${d.experience}年`,
					rating: String(d.rating)
				})))
			}
			return slides
		},
		// 根据当前选中分类获取美发师列表
		nearbyStylistsData() {
			if (!this.designers.length) return []
			// 转换为附近设计师列表格式
			let filteredDesigners = this.designers
			// 根据分类筛选
			if (this.activeCategory !== '美发师') {
				const categoryLevelMap = {
					'首席创意': ['首席', '特级'],
					'总监店长': ['总监'],
					'人气名师': ['名师', '高级'],
					'国际导师': ['国际']
				}
				const levels = categoryLevelMap[this.activeCategory] || []
				if (levels.length) {
					filteredDesigners = this.designers.filter(d =>
						levels.some(level => d.level.includes(level) || d.position.includes(level))
					)
				}
			}
			return filteredDesigners.map(d => ({
				id: d.id,
				image: d.avatar,
				coverImage: d.coverImage || d.avatar,
				name: d.name,
				level: d.level,
				role: `${d.position}｜从业${d.experience}年`,
				specialties: d.specialties || [],
				rating: String(d.rating),
				services: String(d.serviceCount),
				works: String(d.worksCount),
				tags: d.tags || [],
				distance: '2.5km'
			}))
		}
	},
	methods: {
		// 加载设计师列表
		async loadDesigners() {
			try {
				const res = await designerApi.getList({ page: 1, pageSize: 20 })
				if (res && res.data && res.data.list) {
					this.designers = res.data.list
				}
			} catch (error) {
				console.error('加载设计师列表失败:', error)
			}
		},
		// 供父组件调用的滚动方法
		scrollToNearby() {
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this)
				query.select('#nearby-section').boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec((res) => {
					if (res && res[0] && res[1]) {
						const elementRect = res[0]
						const scrollOffset = res[1]
						uni.pageScrollTo({
							scrollTop: scrollOffset.scrollTop + elementRect.top,
							duration: 100
						})
					}
				})
			})
		},
		handleCategoryClick(category) {
			console.log('Category clicked:', category)
			// 跳转到搜索页面，执行所点击内容的搜索
			uni.navigateTo({
				url: `/pages/main/search?tab=designer&keyword=${encodeURIComponent(category.title)}`
			})
		},
		handleBookingClick(option) {
			console.log('Booking clicked:', option)
		},
		switchRankingTab(index) {
			const tab = this.rankingTabs[index]
			this.rankingTabs.forEach((t, i) => {
				t.active = i === index
			})
			this.activeRankingTab = tab.value
			this.rankingSwiperIndex = 0
			// 点击后清除该标签的 NEW 状态
			if (tab.new) {
				tab.new = false
			}
		},
		handleRankingSwiperChange(e) {
			this.rankingSwiperIndex = e.detail.current
		},
		handleStylistClick(stylist) {
			// 跳转到设计师详情页面，传递设计师ID等信息
			uni.navigateTo({
				url: `/pages/designer/detail?id=${stylist.id || 1}&name=${encodeURIComponent(stylist.name || '')}`
			})
		},
		handleFilter() {
			console.log('Filter clicked')
		}
	}
}
</script>

<style scoped lang="scss">
.design-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	padding: 0 12rpx;
	box-sizing: border-box;
	gap: 18rpx;
}

/* 服务分类 */
.service-categories-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.categories-content {
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 18rpx;
	padding: 20rpx;
	box-sizing: border-box;
}

.category-item {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	gap: 6rpx;
}

.category-icon {
	width: 88rpx;
	height: 88rpx;
}

.category-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.category-title {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	text-align: center;
	margin-bottom: 4rpx;
	white-space: nowrap;
}

.category-subtitle {
	font-size: 18rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	text-align: center;
	white-space: nowrap;
}

/* 预约选项 */
.booking-options {
	display: flex;
	width: 100%;
	align-items: center;
	gap: 12rpx;
}

.booking-card {
	flex: 1;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.booking-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx;
	border-radius: 12rpx;
	background: linear-gradient(180deg, rgba(246, 246, 246, 1) 0%, rgba(255, 255, 255, 1) 100%);
}

.booking-info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10rpx;
}

.booking-title {
	font-size: 28rpx;
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
}

.booking-subtitle {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
}

.booking-icon {
	width: 76rpx;
	height: 76rpx;
}

/* 排行榜 */
.ranking-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	overflow: hidden;
	box-sizing: border-box;
}

.ranking-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 20rpx 20rpx 20rpx 20rpx;
	box-sizing: border-box;
}

.ranking-title {
	font-size: 28rpx;
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
}

.more-icon {
	width: 44rpx;
	height: 44rpx;
}

.ranking-tabs {
	display: flex;
	align-items: center;
	gap: 30rpx;
	width: 100%;
	padding: 0 20rpx;
}

.ranking-tab {
	position: relative;
	font-size: 26rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
}

.ranking-tab.active {
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

.ranking-swiper {
	width: 100%;
	height: 470rpx;
	min-height: 460rpx;
}

.ranking-swiper-item {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.ranking-list {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
	width: 100%;
	padding: 20rpx;
	box-sizing: border-box;
}

.ranking-item {
	display: flex;
	width: calc((100% - 20rpx) / 2);
	min-width: 0;
	align-items: center;
	gap: 12rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-sizing: border-box;
}

.stylist-avatar {
	width: 112rpx;
	height: 111.3rpx;
	background-size: cover;
	background-position: center;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.stylist-info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	padding: 8rpx 0;
	flex: 1;
}

.stylist-header {
	display: flex;
	align-items: center;
	gap: 8rpx;
	width: 100%;
}

.stylist-name {
	font-size: 26rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
}

.stylist-badge {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #dacbb1;
	color: #645e57;
	font-size: 18rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	border-radius: 4rpx;
}

.stylist-role {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
}

.stylist-rating {
	display: flex;
	align-items: center;
	gap: 6rpx;
	width: 100%;
}

.rating-score {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
}

.star-icon {
	width: 20rpx;
	height: 20rpx;
}

.pagination-dots {
	display: flex;
	align-items: center;
	gap: 6rpx;
	padding: 0 20rpx;
	margin-bottom: 24rpx;
	justify-content: center;
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

/* 附近推荐 */
.nearby-section {
	width: 100%;
	box-sizing: border-box;
}

.nearby-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.nearby-title {
	font-size: 28rpx;
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
}

.filter-btn {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.filter-text {
	font-size: 28rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	text-align: center;
}

.filter-icon {
	width: 20rpx;
	height: 20rpx;
}

.category-tab {
	width: 100%;
	height: 60rpx;
	background-image: url('https://c.animaapp.com/mi4wi1dxPPrFZt/img/subtract.svg');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	margin-top: 18rpx;
}

.tab-content {
	display: flex;
	margin-top: -10rpx;
	width: 180rpx;
	padding: 10rpx 0 0 8rpx;
	height: 36rpx;
	margin-left: 10rpx;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
}

.tab-icon {
	width: 28rpx;
	height: 28rpx;
}

.tab-text {
	width: 150rpx;
	font-size: 28rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #dacbb1;
}

.nearby-list {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	gap: 12rpx;
	margin-top: 12rpx;
	box-sizing: border-box;
}

.nearby-item {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	padding: 20rpx;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
}

.nearby-cover {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 160rpx;
	background-size: cover;
	background-position: center;
	opacity: 0.15;
	z-index: 0;
}

.nearby-item-wrapper {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
	width: 100%;
	box-sizing: border-box;
}

.nearby-avatar {
	width: 152rpx;
	height: 151.04rpx;
	background-size: cover;
	background-position: center;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.nearby-info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	flex: 1;
	min-width: 0;
	box-sizing: border-box;
}

.nearby-header-info {
	display: flex;
	align-items: center;
	gap: 8rpx;
	width: 100%;
	box-sizing: border-box;
}

.nearby-name {
	font-size: 28rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
}

.nearby-level-badge {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #dacbb1;
	color: #645e57;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	border-radius: 4rpx;
}

.nearby-role {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
}

.nearby-specialties {
	display: flex;
	align-items: center;
	gap: 6rpx;
	flex-wrap: wrap;
}

.specialties-label {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
}

.specialty-badge {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #f6f6f6;
	color: #a6a6a6;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	border-radius: 4rpx;
}

.nearby-stats {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.stats-rating {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.stats-rating-score {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
}

.star-container {
	display: flex;
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
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.stats-item {
	display: flex;
	align-items: flex-end;
	gap: 4rpx;
}

.stats-label {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
}

.stats-value {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
}

.stats-divider {
	font-size: 24rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
}

.nearby-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
}

.nearby-tags {
	display: flex;
	align-items: center;
	gap: 6rpx;
	flex-wrap: wrap;
	flex: 1;
	min-width: 0;
}

.tag-badge {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #ffffff;
	color: #a6a6a6;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	border-radius: 4rpx;
	border: 2rpx solid #a6a6a6;
}

.nearby-distance {
	font-size: 22rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	white-space: nowrap;
	margin-left: 16rpx;
}
</style>

