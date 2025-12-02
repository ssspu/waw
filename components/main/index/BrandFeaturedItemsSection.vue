<template>
	<view class="featured-items-section">
		<!-- 分类卡片 -->
		<view class="category-card">
			<view class="category-content">
				<view 
					v-for="(item, index) in categoryItems" 
					:key="index" 
					class="category-item"
					@tap="handleCategoryClick(item)"
				>
					<image class="category-icon" :src="item.icon" :alt="item.title" mode="aspectFit"></image>
					<view class="category-info">
						<text class="category-title">{{ item.title }}</text>
						<text class="category-subtitle">{{ item.subtitle }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 精选店卡片 -->
		<view class="featured-stores-card">
			<view class="card-header">
				<text class="card-title">精选店</text>
				<!-- 测试阶段不显示 -->
				<!-- <image class="more-icon" src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-3.svg" mode="aspectFit"></image> -->
			</view>
			
			<!-- 标签切换 -->
			<view class="tabs-container">
				<view 
					v-for="(tab, index) in tabItems" 
					:key="index" 
					class="tab-item"
					:class="{ active: tab.active }"
					@tap="switchTab(index)"
				>
					<text>{{ tab.label }}</text>
					<view v-if="tab.new" class="new-badge">
						<image class="badge-bg" src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-216.svg" mode="aspectFit"></image>
						<text class="new-text">NEW</text>
					</view>
				</view>
			</view>
			
			<!-- 精选店列表 - Swiper -->
			<swiper 
				class="stores-swiper"
				:current="storeSwiperIndex"
				@change="handleStoreSwiperChange"
				:indicator-dots="false"
				:autoplay="false"
				:circular="false"
			>
				<swiper-item 
					v-for="(slide, slideIndex) in currentStoreSlides" 
					:key="slideIndex"
					class="stores-swiper-item"
				>
					<view class="featured-stores-list">
						<view 
							v-for="(store, index) in slide" 
							:key="index" 
							class="featured-store-item"
							@tap="handleStoreClick(store)"
						>
					<view class="store-bg"></view>
					<image class="store-image" :src="store.image" :alt="store.name" mode="aspectFill"></image>
					<image class="store-overlay" :src="store.overlay" mode="aspectFill"></image>
					
					<!-- 评分和统计信息 -->
					<view class="store-stats">
						<view class="rating-group">
							<text class="rating-score">{{ store.rating }}</text>
							<view class="star-container">
								<image class="star-icon" src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/star-1.svg" mode="aspectFit"></image>
							</view>
						</view>
						<view class="stats-group">
							<view class="stat-item">
								<text class="stat-label">设计师</text>
								<text class="stat-value">{{ store.designers }}</text>
							</view>
							<text class="stat-divider">｜</text>
							<view class="stat-item">
								<text class="stat-label">服务</text>
								<text class="stat-value">{{ store.services }}</text>
							</view>
						</view>
					</view>
					
					<!-- 店铺信息 -->
					<view class="store-info">
						<text class="store-name">{{ store.name }}</text>
						<text class="store-type">{{ store.type }}</text>
						<view class="store-footer">
							<view class="amenities">
								<view 
									v-for="(amenity, idx) in store.amenities" 
									:key="idx" 
									class="amenity-badge"
								>
									{{ amenity }}
								</view>
							</view>
							<text class="store-distance">{{ store.distance }}</text>
						</view>
					</view>
					
					<!-- 标签 -->
					<view class="store-tag">{{ store.tag }}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			
			<!-- 分页指示器 -->
			<view class="pagination-dots">
				<view 
					v-for="(dot, index) in currentStoreSlides.length" 
					:key="index" 
					class="dot"
					:class="{ active: index === storeSwiperIndex }"
				></view>
			</view>
		</view>
		
		<!-- 附近推荐标题 -->
		<view id="brand-nearby-section" class="nearby-header">
			<text class="nearby-title">附近推荐</text>
			<!-- 测试阶段不显示 -->
			<!-- <view class="filter-btn" @tap="handleFilter">
				<text class="filter-text">筛选</text>
				<image class="filter-icon" src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2.svg" mode="aspectFit"></image>
			</view> -->
		</view>

		<!-- 分类标签 -->
		<view class="category-tab">
			<view class="tab-content">
				<image class="tab-icon" src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-1.svg" mode="aspectFit"></image>
				<text class="tab-text">{{ activeCategory }}</text>
			</view>
		</view>

		<!-- 附近店铺列表 -->
		<view class="nearby-stores-list">
			<view
				v-for="(store, index) in currentNearbyStores"
				:key="index"
				class="nearby-store-item"
				@tap="handleStoreClick(store)"
			>
				<view class="store-avatar" :style="{ backgroundImage: `url(${store.image})` }"></view>
				<view class="store-details">
					<view class="store-header">
						<text class="store-name">{{ store.name }}</text>
						<view class="store-tag-badge">{{ store.tag }}</view>
					</view>
					<text class="store-type">{{ store.type }}</text>
					<view class="store-stats-row">
						<view class="stats-rating">
							<text class="stats-rating-score">{{ store.rating }}</text>
							<view class="star-container-small">
								<image class="star-small" src="https://c.animaapp.com/mi5cgxi6ndVkfo/img/star-1.svg" mode="aspectFit"></image>
							</view>
						</view>
						<view class="stats-info">
							<view class="stat-item">
								<text class="stat-label">设计师</text>
								<text class="stat-value">{{ store.designers }}</text>
							</view>
							<text class="stat-divider">｜</text>
							<view class="stat-item">
								<text class="stat-label">服务</text>
								<text class="stat-value">{{ store.services }}</text>
							</view>
						</view>
					</view>
					<view class="store-footer">
						<view class="amenities">
							<view 
								v-for="(amenity, idx) in store.amenities" 
								:key="idx" 
								class="amenity-badge-outline"
							>
								{{ amenity }}
							</view>
						</view>
						<text class="store-distance">{{ store.distance }}</text>
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
			activeCategory: '品牌馆',
			categoryItems: [
				{
					icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2006-1.svg",
					title: "专业店",
					subtitle: "专业服务店",
				},
				{
					icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2005.svg",
					title: "品牌店",
					subtitle: "影响力名店",
				},
				{
					icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2005-1.svg",
					title: "工作室",
					subtitle: "独立设计师",
				},
				{
					icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2006.svg",
					title: "综合店",
					subtitle: "多服务模式",
				},
			],
			tabItems: [
				{ label: "星级店", active: true, value: "star", new: false },
				{ label: "人气店", active: false, value: "popular", new: false },
				{ label: "男士店", active: false, value: "men", new: true },
			],
			activeStoreTab: "star",
			storeSwiperIndex: 0,
			storeSlides: {
				star: [
					[
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
					],
					[
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
					],
					[
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
					],
					[
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
					],
				],
				popular: [
					[
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
					],
					[
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
					],
				],
				men: [
					[
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
					],
					[
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
						{
							image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
							overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
							name: "成都NICE造型沙龙",
							type: "专业店｜2012年开业",
							rating: "4.8",
							designers: "8人",
							services: "1236",
							amenities: ["代客泊车", "免费茶点"],
							distance: "7.5km",
							tag: "舒适",
						},
					],
				],
			},
			// 按分类存储的附近店铺数据
			categoryStores: {
				'品牌馆': [
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-6.png",
						name: "成都NICE造型沙龙",
						type: "品牌馆｜2012年开业",
						rating: "4.8",
						designers: "8人",
						services: "1236",
						amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
						distance: "7.5km",
						tag: "舒适",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-1.png",
						name: "成都NICE造型沙龙",
						type: "品牌馆｜2012年开业",
						rating: "4.8",
						designers: "8人",
						services: "1236",
						amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
						distance: "7.5km",
						tag: "舒适",
					},
				],
				'专业店': [
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-2.png",
						name: "丝域养发馆",
						type: "专业店｜2015年开业",
						rating: "4.9",
						designers: "12人",
						services: "2568",
						amenities: ["头皮检测", "养发护理", "免费停车"],
						distance: "3.2km",
						tag: "专业",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-3.png",
						name: "发之源专业美发",
						type: "专业店｜2018年开业",
						rating: "4.7",
						designers: "6人",
						services: "890",
						amenities: ["专业染发", "烫发造型", "预约服务"],
						distance: "4.8km",
						tag: "口碑好",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-4.png",
						name: "造型专家工坊",
						type: "专业店｜2020年开业",
						rating: "4.6",
						designers: "5人",
						services: "456",
						amenities: ["新店优惠", "免费设计"],
						distance: "2.1km",
						tag: "新店",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-5.png",
						name: "匠心美发专业店",
						type: "专业店｜2016年开业",
						rating: "4.8",
						designers: "8人",
						services: "1560",
						amenities: ["精细剪裁", "日式服务", "免费饮品"],
						distance: "3.8km",
						tag: "匠心",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-6.png",
						name: "青丝专业造型",
						type: "专业店｜2017年开业",
						rating: "4.7",
						designers: "7人",
						services: "1120",
						amenities: ["烫染专家", "会员折扣", "预约优先"],
						distance: "5.2km",
						tag: "烫染",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-1.png",
						name: "发型研究所",
						type: "专业店｜2019年开业",
						rating: "4.9",
						designers: "10人",
						services: "780",
						amenities: ["形象诊断", "一对一服务", "无推销"],
						distance: "2.6km",
						tag: "高评",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-2.png",
						name: "剪艺专业美发",
						type: "专业店｜2014年开业",
						rating: "4.6",
						designers: "9人",
						services: "2340",
						amenities: ["十年老店", "技术过硬", "价格实惠"],
						distance: "4.1km",
						tag: "老店",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-3.png",
						name: "锋芒造型专业店",
						type: "专业店｜2021年开业",
						rating: "4.8",
						designers: "6人",
						services: "320",
						amenities: ["潮流设计", "年轻团队", "新客特惠"],
						distance: "1.8km",
						tag: "潮流",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-4.png",
						name: "秀发专业护理中心",
						type: "专业店｜2013年开业",
						rating: "4.7",
						designers: "11人",
						services: "3560",
						amenities: ["护发专家", "头皮养护", "深层修复"],
						distance: "6.5km",
						tag: "护发",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-5.png",
						name: "形象设计专业馆",
						type: "专业店｜2018年开业",
						rating: "4.9",
						designers: "8人",
						services: "980",
						amenities: ["整体形象", "私人顾问", "VIP服务"],
						distance: "3.5km",
						tag: "形象",
					},
				],
				'品牌店': [
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-5.png",
						name: "东田造型",
						type: "品牌店｜2008年开业",
						rating: "4.9",
						designers: "20人",
						services: "5680",
						amenities: ["明星同款", "VIP包间", "代客泊车"],
						distance: "5.6km",
						tag: "明星店",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-6.png",
						name: "沙宣美发连锁",
						type: "品牌店｜2010年开业",
						rating: "4.8",
						designers: "15人",
						services: "3890",
						amenities: ["国际品牌", "专业培训", "品质保证"],
						distance: "6.3km",
						tag: "连锁",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-1.png",
						name: "文峰美发",
						type: "品牌店｜2005年开业",
						rating: "4.7",
						designers: "18人",
						services: "8900",
						amenities: ["老牌连锁", "会员优惠", "免费茶点"],
						distance: "4.2km",
						tag: "老牌",
					},
				],
				'工作室': [
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-2.png",
						name: "小林私人订制",
						type: "工作室｜2019年开业",
						rating: "4.9",
						designers: "3人",
						services: "680",
						amenities: ["私人定制", "预约制", "一对一服务"],
						distance: "1.8km",
						tag: "私密",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-3.png",
						name: "美研造型工作室",
						type: "工作室｜2021年开业",
						rating: "4.8",
						designers: "2人",
						services: "320",
						amenities: ["独立设计师", "作品展示", "咖啡茶饮"],
						distance: "2.5km",
						tag: "设计感",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-4.png",
						name: "花间发艺工作室",
						type: "工作室｜2020年开业",
						rating: "4.7",
						designers: "4人",
						services: "520",
						amenities: ["日系风格", "花艺装饰", "拍照打卡"],
						distance: "3.6km",
						tag: "网红",
					},
				],
				'综合店': [
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-5.png",
						name: "美丽人生综合店",
						type: "综合店｜2016年开业",
						rating: "4.6",
						designers: "25人",
						services: "4560",
						amenities: ["美发美甲", "美容SPA", "纹绣"],
						distance: "3.8km",
						tag: "一站式",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-6.png",
						name: "悦美汇生活馆",
						type: "综合店｜2018年开业",
						rating: "4.7",
						designers: "30人",
						services: "6780",
						amenities: ["美发", "美容", "养生", "美甲"],
						distance: "5.2km",
						tag: "综合",
					},
					{
						image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-1.png",
						name: "时尚芭莎会所",
						type: "综合店｜2014年开业",
						rating: "4.8",
						designers: "22人",
						services: "5230",
						amenities: ["高端会所", "私人定制", "VIP服务"],
						distance: "6.8km",
						tag: "高端",
					},
				],
			},
		}
	},
	computed: {
		currentStoreSlides() {
			const slides = this.storeSlides[this.activeStoreTab]
			return slides || []
		},
		currentNearbyStores() {
			if (this.activeCategory === '品牌馆') {
				// 品牌馆显示所有店铺
				const allStores = []
				Object.values(this.categoryStores).forEach(stores => {
					allStores.push(...stores)
				})
				return allStores
			}
			return this.categoryStores[this.activeCategory] || []
		}
	},
	methods: {
		handleCategoryClick(item) {
			// 切换分类
			this.activeCategory = item.title
			// 滚动到附近推荐区域
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this)
				query.select('#brand-nearby-section').boundingClientRect()
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
		switchTab(index) {
			const tab = this.tabItems[index]
			this.tabItems.forEach((t, i) => {
				t.active = i === index
			})
			this.activeStoreTab = tab.value
			this.storeSwiperIndex = 0
			// 点击后清除该标签的 NEW 状态
			if (tab.new) {
				tab.new = false
			}
		},
		handleStoreSwiperChange(e) {
			this.storeSwiperIndex = e.detail.current
		},
		handleStoreClick(store) {
			// 跳转到品牌详情页面，传递品牌ID等信息
			uni.navigateTo({
				url: `/pages/brand/detail?id=${store.id || 1}&name=${encodeURIComponent(store.name || '')}`
			})
		},
		handleFilter() {
			console.log('Filter clicked')
		}
	}
}
</script>

<style scoped lang="scss">
.featured-items-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	align-items: stretch;
	gap: 8rpx;
	padding: 0 12rpx;
	box-sizing: border-box;
}

/* 分类卡片 */
.category-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
}

.category-content {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 16rpx;
	padding: 20rpx;
	box-sizing: border-box;
}

.category-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6rpx;
	min-width: 0;
	flex: 1;
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
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 24rpx;
	text-align: center;
	margin-bottom: 4rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
}

.category-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 18rpx;
	text-align: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
}

/* 精选店卡片 */
.featured-stores-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
	margin-top: 12rpx;
}

.card-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
	padding: 20rpx;
	box-sizing: border-box;
	min-height: auto;
}

.card-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
	line-height: 1.5;
	overflow: visible;
	height: auto;
}

.more-icon {
	width: 44rpx;
	height: 44rpx;
	flex-shrink: 0;
	margin-top: 2rpx;
}

.tabs-container {
	display: flex;
	align-items: center;
	gap: 30rpx;
	width: 100%;
	padding: 0 20rpx;
}

.tab-item {
	position: relative;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	font-size: 26rpx;
	text-align: center;
	color: #a6a6a6;
}

.tab-item.active {
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

.stores-swiper {
	height: 570rpx;
	min-height: 560rpx;
}

.stores-swiper-item {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.featured-stores-list {
	display: flex;
	flex-direction: column;
	gap: 0;
	padding: 20rpx;
	box-sizing: border-box;
	height: 100%;
}

.featured-store-item {
	position: relative;
	width: 100%;
	height: 170rpx;
	margin-bottom: 16rpx;
	box-sizing: border-box;
	overflow: hidden;
}

.store-bg {
	position: absolute;
	width: 100%;
	height: 90.59%;
	top: 9.41%;
	left: 0;
	background-color: #f6f6f6;
	border-radius: 8rpx;
}

.store-image {
	position: absolute;
	width: 44.02%;
	height: 100%;
	top: 0;
	left: 0;
	object-fit: cover;
}

.store-overlay {
	position: absolute;
	width: 44.02%;
	height: 28.24%;
	top: 71.76%;
	left: 0;
}

.store-stats {
	position: absolute;
	width: 46.94%;
	height: 20%;
	top: 75.29%;
	left: 0;
	display: flex;
	align-items: center;
	gap: 16rpx;
	padding: 0 16rpx;
}

.rating-group {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
}

.rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffffff;
	font-size: 20rpx;
}

.star-container {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
	padding: 4rpx;
	background-color: #ffffff;
	border-radius: 4rpx;
}

.star-icon {
	width: 16rpx;
	height: 16rpx;
}

.stats-group {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.stat-item {
	display: inline-flex;
	align-items: flex-end;
	gap: 4rpx;
}

.store-stats .stat-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: rgba(255, 255, 255, 0.6);
	font-size: 18rpx;
}

.store-stats .stat-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #ffffff;
	font-size: 20rpx;
}

.stat-divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.6);
	font-size: 20rpx;
}

.store-info {
	position: absolute;
	width: 51.90%;
	height: auto;
	min-height: 67.06%;
	top: 21.18%;
	left: 45.19%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	overflow: visible;
}

.store-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
	white-space: nowrap;
	overflow: visible;
	text-overflow: ellipsis;
	width: 100%;
	line-height: 1.4;
	height: auto;
}

.store-type {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
}

.store-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	min-width: 0;
	box-sizing: border-box;
}

.amenities {
	display: flex;
	align-items: center;
	gap: 6rpx;
	flex-wrap: wrap;
	flex: 1;
	min-width: 0;
}

.amenity-badge {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #f6f6f6;
	color: #a6a6a6;
	border: 2rpx solid #a6a6a6;
	border-radius: 4rpx;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
}

.store-distance {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
	flex-shrink: 0;
	white-space: nowrap;
}

.store-tag {
	width: 100rpx;
	position: absolute;
	height: 21.18%;
	padding: 2rpx 16rpx;
	top: 9.41%;
	left: calc(50% + 272rpx);
	border-radius: 0 4rpx 0 8rpx;
	background-color: #dacbb1;
	color: #645e57;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
}

.pagination-dots {
	display: flex;
	align-items: center;
	gap: 6rpx;
	padding:  20rpx;
	margin-top: -30rpx;
	margin-bottom: 0rpx;
	justify-content: center;
	width: 100%;
	box-sizing: border-box;
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
.nearby-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	margin-top: 20rpx;
}

.nearby-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.filter-btn {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
	height: auto;
	padding: 0;
}

.filter-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 28rpx;
	text-align: center;
}

.filter-icon {
	width: 20rpx;
	height: 20rpx;
}

.category-tab {
	width: 100%;
	height: 60rpx;
	background-image: url('https://c.animaapp.com/mi5cgxi6ndVkfo/img/subtract.svg');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	margin-top: 4rpx;
}

.tab-content {
	display: flex;
	margin-top: 12rpx;
	width: 124rpx;
	height: 36rpx;
	margin-left: 20rpx;
	align-items: center;
	gap: 12rpx;
}

.tab-icon {
	width: 28rpx;
	height: 28rpx;
}

.tab-text {
	width: 100rpx;
	font-size: 28rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #dacbb1;
}

.nearby-stores-list {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: stretch;
	gap: 16rpx;
	margin-top: 8rpx;
	box-sizing: border-box;
}

.nearby-store-item {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	border: 0;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	padding: 20rpx;
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
	box-sizing: border-box;
}

.store-avatar {
	width: 152rpx;
	height: 151.04rpx;
	background-size: cover;
	background-position: center;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.store-details {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	flex: 1;
	min-width: 0;
}

.store-header {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.nearby-store-item .store-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.store-tag-badge {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #dacbb1;
	color: #645e57;
	border-radius: 4rpx;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	flex-shrink: 0;
}

.store-type {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
}

.store-stats-row {
	display: inline-flex;
	align-items: center;
	gap: 16rpx;
}

.stats-rating {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
}

.stats-rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 24rpx;
}

.star-container-small {
	display: inline-flex;
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
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.store-stats-row .stat-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.store-stats-row .stat-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 24rpx;
}

.amenity-badge-outline {
	height: auto;
	padding: 4rpx 8rpx;
	background-color: #ffffff;
	color: #a6a6a6;
	border: 2rpx solid #a6a6a6;
	border-radius: 4rpx;
	font-size: 20rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
}

.store-distance {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
	flex-shrink: 0;
}
</style>

