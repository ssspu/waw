<template>
	<view class="profile-section">
		<!-- 提示卡片 -->
		<view class="alert-card animate-fade-in" style="animation-delay: 0ms;">
			<view class="alert-content">
				<view class="alert-left">
					<view class="avatar">
						<image class="avatar-img" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-71.svg" mode="aspectFill"></image>
					</view>
					<text class="alert-text">hey,快去看看你周边设计师吧！</text>
				</view>
				<view class="close-btn">
					<image class="close-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-6.svg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		
		<!-- 快捷操作卡片 -->
		<view class="quick-actions-card animate-fade-in" style="animation-delay: 100ms;">
			<view class="quick-actions-top">
				<view 
					v-for="(action, index) in quickActions" 
					:key="index" 
					class="quick-action-item"
					@tap="handleQuickAction(action, index)"
				>
					<image class="action-icon" :src="action.icon" mode="aspectFit"></image>
					<view class="action-info">
						<text class="action-title">{{ action.title }}</text>
						<text class="action-subtitle">{{ action.subtitle }}</text>
					</view>
				</view>
			</view>
			<view class="quick-actions-bottom">
				<view 
					v-for="(action, index) in bottomActions" 
					:key="index" 
					class="bottom-action-item"
				>
					<image class="action-icon" :src="action.icon" mode="aspectFit"></image>
					<view class="action-info">
						<text class="action-title-small">{{ action.title }}</text>
						<text class="action-subtitle-small">{{ action.subtitle }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 作品集 -->
		<view class="portfolio-card animate-fade-in" style="animation-delay: 200ms;">
			<view class="card-header">
				<text class="card-title">作品集</text>
				<image class="more-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-7.svg" mode="aspectFit"></image>
			</view>
			<view class="portfolio-content">
				<view 
					v-for="(item, index) in portfolioItems" 
					:key="index" 
					class="portfolio-item"
					:style="{ left: index === 0 ? '0' : '314rpx' }"
				>
					<image class="portfolio-img" :src="item.image" mode="aspectFill"></image>
					<image class="portfolio-overlay" :src="item.overlay" mode="aspectFill"></image>
					<image class="portfolio-gradient" :src="item.gradient" mode="aspectFill" :style="{ left: index === 0 ? '0' : '58rpx', width: index === 0 ? '372rpx' : '314rpx' }"></image>
					<view class="portfolio-label" :style="{ left: item.align === 'left' ? '20rpx' : '200rpx' }">
						<text v-if="item.align === 'left'" class="label-text">{{ item.label }}</text>
						<text class="label-count">{{ item.count }}</text>
						<text v-if="item.align === 'right'" class="label-text">{{ item.label }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 设计师 -->
		<view class="designers-card animate-fade-in" style="animation-delay: 300ms;">
			<view class="card-header" @tap="handleSectionHeaderClick('designer')">
				<text class="card-title">设计师</text>
				<image class="more-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-7.svg" mode="aspectFit"></image>
			</view>
			<scroll-view class="tabs-scroll" scroll-x>
				<view class="tabs-container">
					<view 
						v-for="(tab, index) in designerTabs" 
						:key="index" 
						class="tab-item"
						:class="{ active: index === 0 }"
					>
						<text>{{ tab }}</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view class="designers-scroll" scroll-x>
				<view class="designers-container">
					<view 
						v-for="(designer, index) in designers" 
						:key="index" 
						class="designer-card"
						@tap="handleDesignerClick(designer)"
					>
						<view class="designer-img-wrapper">
							<view class="designer-img-bg"></view>
							<image class="designer-img" :src="designer.image" mode="aspectFill"></image>
						</view>
						<view class="designer-info">
							<view class="designer-header">
								<text class="designer-name">{{ designer.name }}</text>
								<view class="designer-badge secondary">{{ designer.role }}</view>
								<view class="designer-badge primary">{{ designer.level }}</view>
							</view>
							<text class="designer-title">{{ designer.title }}</text>
							<view class="designer-footer">
								<view class="rating-info">
									<text class="rating-score">{{ designer.rating }}</text>
									<text class="star">★</text>
									<text class="review-count">({{ designer.reviews }})</text>
								</view>
								<text class="distance">{{ designer.distance }}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="pagination-dots">
				<view 
					v-for="(dot, index) in paginationDots" 
					:key="index" 
					class="dot"
					:class="{ active: dot.active }"
					:style="{ width: dot.width }"
				></view>
			</view>
		</view>
		
		<!-- 品牌馆 -->
		<view class="brands-card animate-fade-in" style="animation-delay: 400ms;">
			<view class="card-header" @tap="handleSectionHeaderClick('brand')">
				<text class="card-title">品牌馆</text>
				<image class="more-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-7.svg" mode="aspectFit"></image>
			</view>
			<scroll-view class="tabs-scroll" scroll-x>
				<view class="tabs-container">
					<view 
						v-for="(tab, index) in brandTabs" 
						:key="index" 
						class="tab-item"
						:class="{ active: index === 0 }"
					>
						<text>{{ tab }}</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view class="brands-scroll" scroll-x>
				<view class="brands-container">
					<view 
						v-for="(brand, index) in brands" 
						:key="index" 
						class="brand-card"
						:style="{ width: brand.width }"
						@tap="handleBrandClick(brand)"
					>
						<view class="brand-img-wrapper" :style="{ width: brand.width }">
							<view v-if="!brand.hasOverlay" class="brand-img-bg" :style="{ width: brand.width }"></view>
							<image class="brand-img" :src="brand.image" mode="aspectFill" :style="{ width: brand.width }"></image>
						</view>
						<view class="brand-info">
							<text class="brand-name">{{ brand.name }}</text>
							<view class="brand-rating">
								<text class="rating-score">{{ brand.rating }}</text>
								<view class="stars">
									<text v-if="brand.hasOverlay" class="star">★</text>
									<text v-if="brand.hasOverlay" class="star">★</text>
									<text v-if="brand.hasOverlay" class="star">★</text>
									<text v-if="!brand.hasOverlay" class="star">★</text>
								</view>
								<text class="review-count">({{ brand.reviews }})</text>
							</view>
							<view class="brand-address">
								<text class="location-icon">📍</text>
								<text class="address-text">{{ brand.address }}</text>
								<text v-if="brand.distance" class="distance">{{ brand.distance }}</text>
							</view>
						</view>
						<view v-if="brand.hasOverlay" class="brand-overlay"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 优服务 -->
		<view class="services-section animate-fade-in" style="animation-delay: 500ms;">
			<view class="services-header">
				<text class="services-title" @tap="handleSectionHeaderClick('service')">优服务</text>
				<view class="filter-btn">
					<text class="filter-text">筛选</text>
					<image class="filter-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-5.svg" mode="aspectFit"></image>
				</view>
			</view>
			<scroll-view class="service-tabs-scroll" scroll-x>
				<view class="service-tabs-container">
					<view 
						v-for="(tab, index) in serviceTabs" 
						:key="index" 
						class="service-tab-item"
						:class="{ active: index === 0 }"
					>
						<text>{{ tab }}</text>
						<image v-if="index === 0" class="tab-indicator" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/vector-15.svg" mode="aspectFit"></image>
					</view>
				</view>
			</scroll-view>
			<view class="services-grid">
				<view 
					v-for="(service, index) in services" 
					:key="index" 
					class="service-card"
				>
					<image class="service-img" :src="service.image" mode="aspectFill"></image>
					<view class="service-info">
						<text class="service-title">{{ service.title }}</text>
						<text class="service-desc">{{ service.description }}</text>
						<view class="service-price">
							<text class="price-symbol">¥</text>
							<text class="price-value">{{ service.price }}</text>
						</view>
						<view class="service-footer">
							<view class="service-designer">
								<view class="service-avatar">
									<image class="avatar-img-small" :src="service.avatar" mode="aspectFill"></image>
								</view>
								<view class="designer-details">
									<text class="designer-name-small">{{ service.designerName }}</text>
									<text class="designer-role-small">{{ service.designerRole }}</text>
									<view class="designer-rating">
										<text class="rating-score-small">{{ service.rating }}</text>
										<text class="star-small">★</text>
										<text class="review-count-small">({{ service.reviews }})</text>
									</view>
								</view>
							</view>
							<text class="service-distance">{{ service.distance }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			quickActions: [
				{
					icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2284.svg",
					title: "设计师",
					subtitle: "发现宝藏设计师",
				},
				{
					icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2280.svg",
					title: "优服务",
					subtitle: "甄选特色服务",
				},
				{
					icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2278.svg",
					title: "品牌馆",
					subtitle: "优质线下门店",
				},
			],
			bottomActions: [
				{
					icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2005.svg",
					title: "预约单",
					subtitle: "你的预约订单",
				},
				{
					icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2006.svg",
					title: "优惠券",
					subtitle: "更多折扣等你",
				},
				{
					icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2007.svg",
					title: "会员",
					subtitle: "VIP平台特权",
				},
				{
					icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2008.svg",
					title: "入驻中",
					subtitle: "诚邀全球设计师",
				},
			],
			portfolioItems: [
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-175.png",
					overlay: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-177-1.svg",
					gradient: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-179.svg",
					label: "WOMAN",
					count: "12,349+",
					align: "left",
				},
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-176.png",
					overlay: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-178.svg",
					gradient: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-180.svg",
					label: "MAN",
					count: "12,349+",
					align: "right",
				},
			],
			designerTabs: ["首席创意", "总监店长", "网红名师", "国际导师"],
			designers: [
				{
					id: 13,
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
					name: "李天天",
					role: "美发师",
					level: "高级",
					title: "总监｜从业十年",
					rating: "4.8",
					reviews: "234",
					distance: "6.7km",
				},
				{
					id: 14,
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
					name: "李天天",
					role: "美发师",
					level: "高级",
					title: "总监｜从业十年",
					rating: "4.8",
					reviews: "234",
					distance: "6.7km",
				},
			],
			brandTabs: ["专业店", "品牌店", "工作室", "综合店"],
			brands: [
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
					name: "成都意念美发造型沙龙",
					rating: "4.8",
					reviews: "768",
					address: "成都青羊区草堂路12号...",
					distance: "7.5km",
					width: "420rpx",
				},
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-3.png",
					name: "成都意念美发造",
					rating: "4.8",
					reviews: "768",
					address: "成都青羊区草堂路",
					distance: "",
					width: "240rpx",
					hasOverlay: true,
				},
			],
			serviceTabs: ["全部", "洗吹", "剪发", "烫发", "染发", "护发", "头皮", "接发"],
			services: [
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
					title: "烫发",
					description: "发型提案+染发+造型",
					price: "799",
					designerName: "李天天",
					designerRole: "美发师",
					rating: "4.8",
					reviews: "768",
					distance: "6.7km",
					avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
				},
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
					title: "烫发",
					description: "发型提案+染发+造型",
					price: "799",
					designerName: "李天天",
					designerRole: "美发师",
					rating: "4.8",
					reviews: "768",
					distance: "6.7km",
					avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
				},
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
					title: "烫发",
					description: "发型提案+染发+造型",
					price: "799",
					designerName: "李天天",
					designerRole: "美发师",
					rating: "4.8",
					reviews: "768",
					distance: "6.7km",
					avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
				},
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
					title: "烫发",
					description: "发型提案+染发+造型",
					price: "799",
					designerName: "李天天",
					designerRole: "美发师",
					rating: "4.8",
					reviews: "768",
					distance: "6.7km",
					avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
				},
			],
			paginationDots: [
				{ active: false, width: "10rpx" },
				{ active: false, width: "10rpx" },
				{ active: true, width: "28rpx" },
				{ active: false, width: "10rpx" },
			],
		}
	},
	methods: {
		handleQuickAction(action, index) {
			let url = ''
			if (action.title === '设计师') {
				url = '/pages/main/index?tab=designer'
			} else if (action.title === '优服务') {
				url = '/pages/main/index?tab=service'
			} else if (action.title === '品牌馆') {
				url = '/pages/main/index?tab=brand'
			}
			
			if (url) {
				console.log('准备跳转到:', url)
				uni.navigateTo({
					url: url,
					success: (res) => {
						console.log('跳转成功:', res)
					},
					fail: (err) => {
						console.error('跳转失败:', err)
						uni.showToast({
							title: '跳转失败: ' + (err.errMsg || '未知错误'),
							icon: 'none',
							duration: 2000
						})
					}
				})
			}
		},
		handleSectionHeaderClick(section) {
			// 点击卡片标题跳转到 main 页面对应的标签
			let url = ''
			if (section === 'designer') {
				url = '/pages/main/index?tab=designer'
			} else if (section === 'service') {
				url = '/pages/main/index?tab=service'
			} else if (section === 'brand') {
				url = '/pages/main/index?tab=brand'
			}
			
			if (url) {
				console.log('准备跳转到:', url)
				uni.navigateTo({
					url: url,
					success: (res) => {
						console.log('跳转成功:', res)
					},
					fail: (err) => {
						console.error('跳转失败:', err)
						uni.showToast({
							title: '跳转失败: ' + (err.errMsg || '未知错误'),
							icon: 'none',
							duration: 2000
						})
					}
				})
			}
		},
		handleDesignerClick(designer) {
			// 跳转到设计师详情页面，传递设计师ID等信息
			uni.navigateTo({
				url: `/pages/designer/detail?id=${designer.id || 1}&name=${encodeURIComponent(designer.name || '')}`
			})
		},
		handleBrandClick(brand) {
			// 跳转到品牌详情页面，传递品牌ID等信息
			uni.navigateTo({
				url: `/pages/brand/detail?id=${brand.id || 1}&name=${encodeURIComponent(brand.name || '')}`
			})
		}
	}
}
</script>

<style scoped lang="scss">
.profile-section {
	width: 100%;
	max-width: 750rpx;
	margin: 0 auto;
	padding: 0 12rpx;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	box-sizing: border-box;
}

/* 提示卡片 */
.alert-card {
	width: 100%;
	background-color: #303136;
	border-radius: 12rpx;
	padding:16rpx 20rpx;
	box-sizing: border-box;
}

.alert-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.alert-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.avatar {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	overflow: hidden;
	flex-shrink: 0;
}

.avatar-img {
	width: 100%;
	height: 100%;
}

.alert-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	color: #dacbb1;
	font-weight: 500;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.close-btn {
	width: 56rpx;
	height: 56rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.close-icon {
	width: 56rpx;
	height: 56rpx;
}

/* 快捷操作卡片 */
.quick-actions-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	overflow: hidden;
}

.quick-actions-top {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.quick-action-item {
	flex: 1;
	height: 240rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 14rpx;
	padding: 30rpx 32rpx;
}

.action-icon {
	width: 88rpx;
	height: 88rpx;
}

.action-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rpx;
}

.action-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-size: 26rpx;
	color: #000000;
}

.action-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #a6a6a6;
	text-align: center;
}

.quick-actions-bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 30rpx;
	border-top: 2rpx solid #f3f3f3;
}

.bottom-action-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6rpx;
}

.action-title-small {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	color: #000000;
	text-align: center;
	font-weight: 500;
}

.action-subtitle-small {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 18rpx;
	color: #a6a6a6;
	text-align: center;
}

/* 卡片通用样式 */
.portfolio-card,
.designers-card,
.brands-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	gap: 14rpx;
	box-sizing: border-box;
}

.card-header {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
}

.card-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-size: 28rpx;
	color: #000000;
}

.more-icon {
	width: 44rpx;
	height: 44rpx;
}

/* 作品集 */
.portfolio-content {
	width: 100%;
	height: 216rpx;
	position: relative;
}

.portfolio-item {
	position: absolute;
	top: 0;
	width: 372rpx;
	height: 216rpx;
}

.portfolio-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 370rpx;
	height: 216rpx;
	border-radius: 8rpx;
}

.portfolio-overlay {
	position: absolute;
	top: 0;
	left: 2rpx;
	width: 372rpx;
	height: 216rpx;
}

.portfolio-gradient {
	position: absolute;
	bottom: 0;
	height: 48rpx;
}

.portfolio-label {
	position: absolute;
	bottom: 26rpx;
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.label-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	color: #ffffff;
}

.label-count {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.6);
}

/* Tabs */
.tabs-scroll {
	width: 100%;
	white-space: nowrap;
}

.tabs-container {
	display: flex;
	align-items: center;
	gap: 30rpx;
}

.tab-item {
	height: auto;
	padding: 0;
	font-size: 26rpx;
	color: #a6a6a6;
	font-family: 'PingFang_SC-Regular', Helvetica;
}

.tab-item.active {
	color: #333333;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: 600;
}

/* 设计师 */
.designers-scroll {
	width: 100%;
	white-space: nowrap;
}

.designers-container {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.designer-card {
	width: 316rpx;
	border: 2rpx solid #f3f3f3;
	border-radius: 8rpx;
	overflow: hidden;
}

.designer-img-wrapper {
	position: relative;
	width: 316rpx;
	height: 318rpx;
}

.designer-img-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 316rpx;
	height: 316rpx;
	border-radius: 8rpx 8rpx 0 0;
	background: linear-gradient(180deg, rgba(244, 244, 244, 1) 0%);
}

.designer-img {
	position: absolute;
	top: 2rpx;
	left: 0;
	width: 316rpx;
	height: 316rpx;
}

.designer-info {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
	padding: 22rpx 22rpx 16rpx;
}

.designer-header {
	display: flex;
	align-items: center;
	gap: 8rpx;
	width: 100%;
}

.designer-name {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 30rpx;
	color: #000000;
}

.designer-badge {
	padding: 4rpx 8rpx;
	border-radius: 4rpx;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
}

.designer-badge.secondary {
	background-color: #f6f6f6;
	color: #666666;
}

.designer-badge.primary {
	background-color: #dacbb1;
	color: #645e57;
}

.designer-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	color: #a6a6a6;
	font-weight: 500;
}

.designer-footer {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
}

.rating-info {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	color: #333333;
}

.star {
	font-size: 20rpx;
	color: #333333;
}

.review-count {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	color: #333333;
	font-weight: 500;
}

.distance {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #333333;
}

.pagination-dots {
	display: flex;
	align-items: center;
	gap: 6rpx;
	justify-content: center;
}

.dot {
	height: 10rpx;
	border-radius: 5rpx;
	background-color: #d9d9d9;
}

.dot.active {
	background-color: #333333;
	border-radius: 28rpx;
}

/* 品牌馆 */
.brands-scroll {
	width: 100%;
	white-space: nowrap;
}

.brands-container {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.brand-card {
	border: 2rpx solid #f3f3f3;
	border-radius: 8rpx;
	overflow: hidden;
	position: relative;
}

.brand-img-wrapper {
	position: relative;
	height: 236rpx;
}

.brand-img-bg {
	position: absolute;
	top: 0;
	left: 0;
	height: 236rpx;
	border-radius: 8rpx 8rpx 0 0;
	background: linear-gradient(180deg, rgba(244, 244, 244, 1) 0%);
}

.brand-img {
	position: absolute;
	top: 0;
	left: 0;
	height: 236rpx;
}

.brand-info {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
	padding: 22rpx 22rpx 16rpx;
}

.brand-name {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 30rpx;
	color: #000000;
}

.brand-rating {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.stars {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.brand-address {
	display: flex;
	align-items: center;
	gap: 8rpx;
	justify-content: space-between;
	width: 100%;
}

.location-icon {
	font-size: 28rpx;
}

.address-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	color: #666666;
	font-weight: 500;
}

.brand-overlay {
	position: absolute;
	top: 0;
	left: 202rpx;
	width: 54rpx;
	height: 402rpx;
	background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 61%, rgba(255, 255, 255, 0) 100%);
}

/* 优服务 */
.services-section {
	width: 100%;
	padding: 0 8rpx;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	box-sizing: border-box;
}

.services-header {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
}

.services-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-size: 32rpx;
	color: #000000;
}

.filter-btn {
	display: flex;
	align-items: center;
	gap: 4rpx;
	height: auto;
	padding: 0;
}

.filter-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	color: #666666;
	text-align: center;
	font-weight: 500;
}

.filter-icon {
	width: 20rpx;
	height: 20rpx;
}

.service-tabs-scroll {
	width: 100%;
	white-space: nowrap;
}

.service-tabs-container {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	gap: 40rpx;
	width: 100%;
}

.service-tab-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
	position: relative;
	height: auto;
	padding: 0;
	font-size: 28rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	color: #a6a6a6;
}

.service-tab-item.active {
	color: #000000;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: 600;
}

.tab-indicator {
	width: 20rpx;
	height: 6rpx;
}

.services-grid {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 10rpx;
	width: 100%;
}

.service-card {
	width: calc((100% - 10rpx) / 2);
	border-radius: 12rpx;
	background-color: #ffffff;
	overflow: hidden;
	box-sizing: border-box;
}

.service-img {
	width: 100%;
	height: 358rpx;
	border-radius: 12rpx 12rpx 0 0;
}

.service-info {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
	padding: 16rpx 16rpx;
}

.service-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	color: #000000;
}

.service-desc {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	color: #a6a6a6;
	font-weight: 500;
}

.service-price {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.price-symbol {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	color: #333333;
}

.price-value {
	font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	font-size: 28rpx;
	color: #333333;
	white-space: nowrap;
}

.service-footer {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
}

.service-designer {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.service-avatar {
	width: 52rpx;
	height: 52rpx;
	border-radius: 50%;
	overflow: hidden;
}

.avatar-img-small {
	width: 100%;
	height: 100%;
}

.designer-details {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.designer-name-small {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	color: #333333;
	font-weight: 500;
}

.designer-role-small {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #a6a6a6;
}

.designer-rating {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.rating-score-small {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	color: #333333;
}

.star-small {
	font-size: 20rpx;
	color: #333333;
}

.review-count-small {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	color: #333333;
	font-weight: 500;
}

.service-distance {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #a6a6a6;
}

/* 动画 */
@keyframes fade-in {
	0% {
		opacity: 0;
		transform: translateY(-20rpx);
	}
	to {
		opacity: 1;
		transform: none;
	}
}

.animate-fade-in {
	animation: fade-in 1s ease forwards;
	opacity: 0;
}
</style>

