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
						:class="{ active: activeDesignerTab === index }"
						@tap="handleDesignerTabClick(index)"
					>
						<text>{{ tab }}</text>
					</view>
				</view>
			</scroll-view>
			<swiper 
				class="designers-swiper"
				:current="designerSwiperIndex"
				@change="handleDesignerSwiperChange"
				:indicator-dots="false"
				:autoplay="false"
				:circular="false"
			>
				<swiper-item 
					v-for="(slide, slideIndex) in designerSlides" 
					:key="slideIndex"
					class="designers-swiper-item"
				>
					<view class="designers-container">
						<view 
							v-for="(designer, index) in slide" 
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
				</swiper-item>
			</swiper>
			<view class="pagination-dots">
				<view 
					v-for="(dot, index) in designerSlides.length" 
					:key="index" 
					class="dot"
					:class="{ active: index === designerSwiperIndex }"
					:style="{ width: index === designerSwiperIndex ? '28rpx' : '10rpx' }"
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
						:class="{ active: activeBrandTab === tab }"
						@tap="handleBrandTabClick(tab)"
					>
						<text>{{ tab }}</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view class="brands-scroll" scroll-x>
				<view class="brands-container">
					<view 
						v-for="(brand, index) in filteredBrands" 
						:key="index" 
						class="brand-card"
						@tap="handleBrandClick(brand)"
					>
						<view class="brand-img-wrapper">
							<view v-if="!brand.hasOverlay" class="brand-img-bg"></view>
							<image class="brand-img" :src="brand.image" mode="aspectFill"></image>
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
					:class="{ active: activeServiceTab === tab }"
					@tap="handleServiceTabClick(tab)"
					>
						<text>{{ tab }}</text>
					<image v-if="activeServiceTab === tab" class="tab-indicator" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/vector-15.svg" mode="aspectFit"></image>
					</view>
				</view>
			</scroll-view>
			<view class="services-grid">
				<view 
					v-for="(service, index) in filteredServices" 
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
			activeDesignerTab: 0,
			designerSwiperIndex: 0,
			designersByTab: {
				0: [ // 首席创意
					{
						id: 13,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "李天天",
						role: "美发师",
						level: "高级",
						title: "创意总监｜从业十年",
						rating: "4.8",
						reviews: "234",
						distance: "6.7km",
					},
					{
						id: 14,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "张雨辰",
						role: "美发师",
						level: "高级",
						title: "创意导师｜从业八年",
						rating: "4.8",
						reviews: "234",
						distance: "6.7km",
					},
					{
						id: 15,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "王珊珊",
						role: "美发师",
						level: "特级",
						title: "创意造型｜从业八年",
						rating: "4.9",
						reviews: "356",
						distance: "5.2km",
					},
					{
						id: 16,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "林一",
						role: "美发师",
						level: "高级",
						title: "创意导师｜从业九年",
						rating: "4.8",
						reviews: "289",
						distance: "7.1km",
					},
					{
						id: 29,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "陈星",
						role: "美发师",
						level: "高级",
						title: "创意设计｜从业七年",
						rating: "4.7",
						reviews: "198",
						distance: "4.8km",
					},
					{
						id: 30,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "李苒",
						role: "美发师",
						level: "特级",
						title: "创意总监｜从业十一年",
						rating: "4.9",
						reviews: "445",
						distance: "6.3km",
					},
					{
						id: 31,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "孟冬",
						role: "美发师",
						level: "高级",
						title: "创意造型师｜从业六年",
						rating: "4.8",
						reviews: "312",
						distance: "5.7km",
					},
					{
						id: 32,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "孙晓",
						role: "美发师",
						level: "高级",
						title: "创意导师｜从业十年",
						rating: "4.8",
						reviews: "378",
						distance: "7.5km",
					},
				],
				1: [ // 总监店长
					{
						id: 17,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "陈曦",
						role: "美发师",
						level: "高级",
						title: "店长｜从业七年",
						rating: "4.7",
						reviews: "198",
						distance: "4.5km",
					},
					{
						id: 18,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "赵一凡",
						role: "美发师",
						level: "高级",
						title: "店长｜从业十一年",
						rating: "4.8",
						reviews: "412",
						distance: "8.3km",
					},
					{
						id: 19,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "韩清",
						role: "美发师",
						level: "高级",
						title: "总监｜从业十年",
						rating: "4.9",
						reviews: "287",
						distance: "5.8km",
					},
					{
						id: 20,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "宋璇",
						role: "美发师",
						level: "特级",
						title: "店长｜从业九年",
						rating: "4.8",
						reviews: "356",
						distance: "6.2km",
					},
					{
						id: 33,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "周成",
						role: "美发师",
						level: "高级",
						title: "总监｜从业十三年",
						rating: "4.9",
						reviews: "523",
						distance: "5.1km",
					},
					{
						id: 34,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "郭雪",
						role: "美发师",
						level: "特级",
						title: "店长｜从业十五年",
						rating: "4.9",
						reviews: "678",
						distance: "7.2km",
					},
					{
						id: 35,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "方野",
						role: "美发师",
						level: "高级",
						title: "总监｜从业八年",
						rating: "4.8",
						reviews: "389",
						distance: "6.8km",
					},
					{
						id: 36,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "许静",
						role: "美发师",
						level: "高级",
						title: "店长｜从业十二年",
						rating: "4.8",
						reviews: "456",
						distance: "4.9km",
					},
				],
				2: [ // 网红名师
					{
						id: 21,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "杨沐",
						role: "美发师",
						level: "高级",
						title: "网红造型师｜从业六年",
						rating: "4.9",
						reviews: "512",
						distance: "3.5km",
					},
					{
						id: 22,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "顾明",
						role: "美发师",
						level: "高级",
						title: "名师｜从业十三年",
						rating: "4.8",
						reviews: "445",
						distance: "7.8km",
					},
					{
						id: 23,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "陈牧",
						role: "美发师",
						level: "特级",
						title: "网红导师｜从业十二年",
						rating: "4.9",
						reviews: "678",
						distance: "4.2km",
					},
					{
						id: 24,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "赵然",
						role: "美发师",
						level: "高级",
						title: "名师｜从业十年",
						rating: "4.7",
						reviews: "389",
						distance: "6.5km",
					},
					{
						id: 37,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "蓝川",
						role: "美发师",
						level: "高级",
						title: "网红造型师｜从业五年",
						rating: "4.8",
						reviews: "567",
						distance: "3.8km",
					},
					{
						id: 38,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "任熙",
						role: "美发师",
						level: "特级",
						title: "名师｜从业十四年",
						rating: "4.9",
						reviews: "789",
						distance: "5.6km",
					},
					{
						id: 39,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "洪宇",
						role: "美发师",
						level: "高级",
						title: "网红导师｜从业七年",
						rating: "4.8",
						reviews: "623",
						distance: "4.7km",
					},
					{
						id: 40,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "叶辰",
						role: "美发师",
						level: "高级",
						title: "名师｜从业十一年",
						rating: "4.8",
						reviews: "534",
						distance: "6.1km",
					},
				],
				3: [ // 国际导师
					{
						id: 25,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "李想",
						role: "美发师",
						level: "特级",
						title: "国际导师｜从业八年",
						rating: "5.0",
						reviews: "234",
						distance: "9.2km",
					},
					{
						id: 26,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "许澄",
						role: "美发师",
						level: "高级",
						title: "国际造型师｜从业七年",
						rating: "4.8",
						reviews: "298",
						distance: "8.7km",
					},
					{
						id: 27,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "吴迪",
						role: "美发师",
						level: "高级",
						title: "国际导师｜从业九年",
						rating: "4.9",
						reviews: "456",
						distance: "7.3km",
					},
					{
						id: 28,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "秦月",
						role: "美发师",
						level: "特级",
						title: "国际造型导师｜从业八年",
						rating: "4.8",
						reviews: "367",
						distance: "10.1km",
					},
					{
						id: 41,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "许乔",
						role: "美发师",
						level: "特级",
						title: "国际导师｜从业十五年",
						rating: "5.0",
						reviews: "892",
						distance: "8.5km",
					},
					{
						id: 42,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "秦澈",
						role: "美发师",
						level: "高级",
						title: "国际造型师｜从业十年",
						rating: "4.9",
						reviews: "645",
						distance: "9.8km",
					},
					{
						id: 43,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "洛竹",
						role: "美发师",
						level: "高级",
						title: "国际导师｜从业十一年",
						rating: "4.8",
						reviews: "523",
						distance: "7.9km",
					},
					{
						id: 44,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
						name: "沈宴",
						role: "美发师",
						level: "特级",
						title: "国际造型导师｜从业十二年",
						rating: "4.9",
						reviews: "712",
						distance: "10.5km",
					},
				],
			},
			brandTabs: ["专业店", "品牌店", "工作室", "综合店"],
			activeBrandTab: "专业店",
			allBrands: {
				"专业店": [
					{
						id: 1,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "成都意念美发造型沙龙",
						rating: "4.8",
						reviews: "768",
						address: "成都青羊区草堂路12号...",
						distance: "7.5km",
						category: "专业店",
					},
					{
						id: 2,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "专业美发造型店",
						rating: "4.7",
						reviews: "520",
						address: "成都武侯区天府大道...",
						distance: "5.2km",
						category: "专业店",
					},
					{
						id: 3,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "专业发型设计工作室",
						rating: "4.9",
						reviews: "365",
						address: "成都锦江区春熙路...",
						distance: "3.8km",
						category: "专业店",
					},
					{
						id: 4,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "专业造型美发店",
						rating: "4.6",
						reviews: "288",
						address: "成都成华区建设路...",
						distance: "6.5km",
						category: "专业店",
					},
					{
						id: 5,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "专业剪发造型店",
						rating: "4.8",
						reviews: "445",
						address: "成都高新区天府三街...",
						distance: "4.3km",
						category: "专业店",
					},
					{
						id: 6,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "专业美发沙龙",
						rating: "4.7",
						reviews: "312",
						address: "成都金牛区沙湾路...",
						distance: "8.1km",
						category: "专业店",
					},
					{
						id: 7,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "专业造型设计店",
						rating: "4.9",
						reviews: "567",
						address: "成都青羊区宽窄巷子...",
						distance: "2.5km",
						category: "专业店",
					},
					{
						id: 8,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "专业美发工作室",
						rating: "4.6",
						reviews: "234",
						address: "成都武侯区红牌楼...",
						distance: "9.2km",
						category: "专业店",
					},
				],
				"品牌店": [
					{
						id: 9,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "品牌美发连锁店",
						rating: "4.8",
						reviews: "689",
						address: "成都锦江区太古里...",
						distance: "3.2km",
						category: "品牌店",
					},
					{
						id: 10,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "知名品牌美发沙龙",
						rating: "4.9",
						reviews: "756",
						address: "成都武侯区科华路...",
						distance: "4.8km",
						category: "品牌店",
					},
					{
						id: 11,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "品牌连锁造型店",
						rating: "4.7",
						reviews: "543",
						address: "成都高新区金融城...",
						distance: "5.5km",
						category: "品牌店",
					},
					{
						id: 12,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "国际品牌美发店",
						rating: "4.8",
						reviews: "612",
						address: "成都青羊区骡马市...",
						distance: "7.3km",
						category: "品牌店",
					},
					{
						id: 13,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "品牌造型设计店",
						rating: "4.6",
						reviews: "389",
						address: "成都成华区SM广场...",
						distance: "6.8km",
						category: "品牌店",
					},
					{
						id: 14,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "知名品牌美发工作室",
						rating: "4.9",
						reviews: "478",
						address: "成都武侯区大悦城...",
						distance: "5.9km",
						category: "品牌店",
					},
					{
						id: 15,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "品牌连锁美发店",
						rating: "4.7",
						reviews: "425",
						address: "成都锦江区IFS...",
						distance: "4.1km",
						category: "品牌店",
					},
					{
						id: 16,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "品牌美发造型沙龙",
						rating: "4.8",
						reviews: "521",
						address: "成都高新区环球中心...",
						distance: "8.7km",
						category: "品牌店",
					},
				],
				"工作室": [
					{
						id: 17,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "私人美发工作室",
						rating: "4.9",
						reviews: "456",
						address: "成都青羊区浣花溪...",
						distance: "2.8km",
						category: "工作室",
					},
					{
						id: 18,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "创意造型工作室",
						rating: "4.7",
						reviews: "334",
						address: "成都武侯区桐梓林...",
						distance: "4.5km",
						category: "工作室",
					},
					{
						id: 19,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "设计美发工作室",
						rating: "4.8",
						reviews: "389",
						address: "成都锦江区九眼桥...",
						distance: "3.6km",
						category: "工作室",
					},
					{
						id: 20,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "私人定制工作室",
						rating: "4.9",
						reviews: "267",
						address: "成都高新区银泰城...",
						distance: "5.3km",
						category: "工作室",
					},
					{
						id: 21,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "艺术造型工作室",
						rating: "4.6",
						reviews: "298",
						address: "成都成华区东郊记忆...",
						distance: "7.2km",
						category: "工作室",
					},
					{
						id: 22,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "高端美发工作室",
						rating: "4.8",
						reviews: "412",
						address: "成都武侯区棕榈泉...",
						distance: "6.4km",
						category: "工作室",
					},
					{
						id: 23,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "精品造型工作室",
						rating: "4.7",
						reviews: "356",
						address: "成都青羊区金沙...",
						distance: "8.3km",
						category: "工作室",
					},
					{
						id: 24,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "专业造型工作室",
						rating: "4.9",
						reviews: "523",
						address: "成都锦江区水碾河...",
						distance: "4.7km",
						category: "工作室",
					},
				],
				"综合店": [
					{
						id: 25,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "综合美发造型店",
						rating: "4.8",
						reviews: "678",
						address: "成都武侯区红牌楼广场...",
						distance: "5.6km",
						category: "综合店",
					},
					{
						id: 26,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "综合美容美发店",
						rating: "4.7",
						reviews: "542",
						address: "成都锦江区万达广场...",
						distance: "3.9km",
						category: "综合店",
					},
					{
						id: 27,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "综合造型美发店",
						rating: "4.9",
						reviews: "634",
						address: "成都高新区凯德广场...",
						distance: "6.2km",
						category: "综合店",
					},
					{
						id: 28,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "综合美发沙龙",
						rating: "4.6",
						reviews: "487",
						address: "成都青羊区宽窄巷子...",
						distance: "2.7km",
						category: "综合店",
					},
					{
						id: 29,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "综合美容美发沙龙",
						rating: "4.8",
						reviews: "556",
						address: "成都武侯区来福士...",
						distance: "4.4km",
						category: "综合店",
					},
					{
						id: 30,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "综合造型设计店",
						rating: "4.7",
						reviews: "423",
						address: "成都成华区建设路...",
						distance: "7.1km",
						category: "综合店",
					},
					{
						id: 31,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "综合美发造型中心",
						rating: "4.9",
						reviews: "589",
						address: "成都锦江区春熙路...",
						distance: "3.3km",
						category: "综合店",
					},
					{
						id: 32,
						image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
						name: "综合美容美发中心",
						rating: "4.8",
						reviews: "512",
						address: "成都高新区天府大道...",
						distance: "5.8km",
						category: "综合店",
					},
				],
			},
			serviceTabs: ["全部", "洗吹", "剪发", "烫发", "染发", "护发", "头皮", "接发"],
			activeServiceTab: "全部",
			allServices: [
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
					title: "烫发",
					category: "烫发",
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
					title: "剪发",
					category: "剪发",
					description: "专业剪发+造型设计",
					price: "199",
					designerName: "张美发",
					designerRole: "造型师",
					rating: "4.9",
					reviews: "520",
					distance: "3.2km",
					avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
				},
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
					title: "染发",
					category: "染发",
					description: "专业染发+护理",
					price: "599",
					designerName: "王染发",
					designerRole: "染发师",
					rating: "4.7",
					reviews: "365",
					distance: "5.8km",
					avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
				},
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
					title: "洗吹",
					category: "洗吹",
					description: "洗发+吹风造型",
					price: "88",
					designerName: "刘洗发",
					designerRole: "助理",
					rating: "4.6",
					reviews: "288",
					distance: "2.1km",
					avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
				},
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
					title: "护发",
					category: "护发",
					description: "深层护理+滋养",
					price: "299",
					designerName: "陈护理",
					designerRole: "护理师",
					rating: "4.8",
					reviews: "156",
					distance: "4.5km",
					avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
				},
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
					title: "头皮",
					category: "头皮",
					description: "头皮护理+清洁",
					price: "399",
					designerName: "周头皮",
					designerRole: "护理师",
					rating: "4.9",
					reviews: "234",
					distance: "6.2km",
					avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
				},
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
					title: "接发",
					category: "接发",
					description: "专业接发+造型",
					price: "1299",
					designerName: "赵接发",
					designerRole: "接发师",
					rating: "4.7",
					reviews: "89",
					distance: "7.8km",
					avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
				},
				{
					image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
					title: "烫发",
					category: "烫发",
					description: "造型烫发+护理",
					price: "899",
					designerName: "孙烫发",
					designerRole: "烫发师",
					rating: "4.8",
					reviews: "445",
					distance: "3.9km",
					avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg",
				},
			],
		}
	},
	computed: {
		filteredServices() {
			if (this.activeServiceTab === "全部") {
				return this.allServices
			}
			return this.allServices.filter(service => service.category === this.activeServiceTab)
		},
		filteredBrands() {
			return this.allBrands[this.activeBrandTab] || []
		},
		designerSlides() {
			const currentDesigners = this.designersByTab[this.activeDesignerTab] || []
			const slides = []
			for (let i = 0; i < currentDesigners.length; i += 2) {
				slides.push(currentDesigners.slice(i, i + 2))
			}
			return slides
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
		handleServiceTabClick(tab) {
			// 切换服务筛选项
			this.activeServiceTab = tab
		},
		handleDesignerClick(designer) {
			// 跳转到设计师详情页面，传递设计师ID等信息
			uni.navigateTo({
				url: `/pages/designer/detail?id=${designer.id || 1}&name=${encodeURIComponent(designer.name || '')}`
			})
		},
		handleDesignerSwiperChange(e) {
			this.designerSwiperIndex = e.detail.current
		},
		handleDesignerTabClick(index) {
			this.activeDesignerTab = index
			this.designerSwiperIndex = 0 // 切换 tab 时重置 swiper 索引
		},
		handleBrandTabClick(tab) {
			// 切换品牌馆标签
			this.activeBrandTab = tab
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
.designers-swiper {
	width: 100%;
	height: 480rpx;
}

.designers-swiper-item {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.designers-container {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 20rpx;
	padding: 0 12rpx;
	box-sizing: border-box;
	height: 100%;
}

.designer-card {
	flex: 1;
	min-width: 0;
	max-width: calc(50% - 10rpx);
	border: 2rpx solid #f3f3f3;
	border-radius: 8rpx;
	overflow: hidden;
	box-sizing: border-box;
}

.designer-img-wrapper {
	position: relative;
	width: 100%;
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
	flex: 0 0 420rpx;
	width: 420rpx;
	border: 2rpx solid #f3f3f3;
	border-radius: 8rpx;
	overflow: hidden;
	position: relative;
}

.brand-img-wrapper {
	position: relative;
	width: 100%;
	height: 236rpx;
}

.brand-img-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 236rpx;
	border-radius: 8rpx 8rpx 0 0;
	background: linear-gradient(180deg, rgba(244, 244, 244, 1) 0%);
}

.brand-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
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
	justify-content: flex-start;
	gap: 36rpx;
	width: auto;
	min-width: 100%;
	flex-wrap: nowrap;
	// padding: 0 11rpx;
}

.service-tab-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12rpx;
	position: relative;
	height: auto;
	padding: 0;
	font-size: 28rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: 400;
	color: #a6a6a6;
	white-space: nowrap;
	flex-shrink: 0;
}

.service-tab-item text {
	white-space: nowrap;
}

.service-tab-item.active {
	color: #000000;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: 400;
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

