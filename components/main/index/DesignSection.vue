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
		
		<!-- 预约选项 -->
		<view class="booking-options">
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
		</view>
		
		<!-- 排行榜 -->
		<view class="ranking-card">
			<view class="ranking-header">
				<text class="ranking-title">排行榜</text>
				<image class="more-icon" src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2.svg" mode="aspectFit"></image>
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
							<view class="stylist-avatar" :style="{ backgroundImage: `url(${stylist.image})` }"></view>
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
		<view class="nearby-section">
			<view class="nearby-header">
				<text class="nearby-title">附近推荐</text>
				<view class="filter-btn" @tap="handleFilter">
					<text class="filter-text">筛选</text>
					<image class="filter-icon" src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-3.svg" mode="aspectFit"></image>
				</view>
			</view>
			
			<!-- 分类标签 -->
			<view class="category-tab">
				<view class="tab-content">
					<image class="tab-icon" src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame.svg" mode="aspectFit"></image>
					<text class="tab-text">美发师</text>
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
					<view class="nearby-item-wrapper">
						<view class="nearby-avatar" :style="{ backgroundImage: `url(${stylist.image})` }"></view>
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
					title: "网红名师",
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
			rankingSlides: {
				rookie: [
					[
						{ id: 1, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "李天天", level: "高级", role: "店长｜从业12年", rating: "4.8" },
						{ id: 2, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "张雨辰", level: "高级", role: "发型总监｜从业10年", rating: "4.9" },
						{ id: 3, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "王珊珊", level: "特级", role: "资深设计｜从业8年", rating: "4.7" },
						{ id: 4, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "林一", level: "高级", role: "创意导师｜从业9年", rating: "4.8" },
						{ id: 5, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "陈曦", level: "高级", role: "潮流造型｜从业7年", rating: "4.6" },
						{ id: 6, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "赵一凡", level: "高级", role: "店长｜从业11年", rating: "4.8" },
					],
					[
						{ id: 7, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "韩清", level: "高级", role: "高级染发｜从业10年", rating: "4.9" },
						{ id: 8, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "宋璇", level: "特级", role: "明星造型｜从业9年", rating: "4.8" },
						{ id: 9, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "杨沐", level: "高级", role: "青年导师｜从业6年", rating: "4.6" },
						{ id: 10, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "顾明", level: "高级", role: "首席剪发｜从业13年", rating: "4.9" },
						{ id: 11, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "陈牧", level: "高级", role: "烫染专家｜从业12年", rating: "4.8" },
						{ id: 12, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "赵然", level: "高级", role: "店长｜从业10年", rating: "4.7" },
					],
					[
						{ id: 13, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "李想", level: "高级", role: "潮流导师｜从业8年", rating: "4.8" },
						{ id: 14, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "许澄", level: "高级", role: "染发顾问｜从业7年", rating: "4.7" },
						{ id: 15, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "吴迪", level: "高级", role: "短发专家｜从业9年", rating: "4.8" },
						{ id: 16, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "秦月", level: "高级", role: "造型顾问｜从业8年", rating: "4.6" },
						{ id: 17, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "周行", level: "高级", role: "日韩造型｜从业7年", rating: "4.8" },
						{ id: 18, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "顾瞳", level: "高级", role: "氛围感设计｜从业6年", rating: "4.7" },
					],
					[
						{ id: 19, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "任欢", level: "高级", role: "质感剪裁｜从业8年", rating: "4.9" },
						{ id: 20, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "罗雪", level: "高级", role: "形象改造｜从业9年", rating: "4.8" },
						{ id: 21, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "郑忆", level: "高级", role: "校园风造型｜从业5年", rating: "4.6" },
						{ id: 22, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "夏禾", level: "高级", role: "都市时尚｜从业7年", rating: "4.7" },
						{ id: 23, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "游浅", level: "高级", role: "设计助教｜从业6年", rating: "4.8" },
						{ id: 24, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "霍笙", level: "高级", role: "创意造型｜从业9年", rating: "4.9" },
					],
				],
				pro: [
					[
						{ id: 25, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "陈星", level: "总监", role: "专业导师｜从业15年", rating: "4.9" },
						{ id: 26, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "李苒", level: "总监", role: "发色专家｜从业12年", rating: "4.9" },
						{ id: 27, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "孟冬", level: "总监", role: "发型顾问｜从业14年", rating: "4.8" },
						{ id: 28, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "孙晓", level: "总监", role: "高级设计｜从业16年", rating: "4.9" },
						{ id: 29, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "周成", level: "总监", role: "时尚造型｜从业13年", rating: "4.8" },
						{ id: 30, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "郭雪", level: "总监", role: "沙宣导师｜从业15年", rating: "4.9" },
					],
					[
						{ id: 31, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "方野", level: "总监", role: "造型顾问｜从业14年", rating: "4.8" },
						{ id: 32, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "许静", level: "总监", role: "高级染发｜从业13年", rating: "4.8" },
						{ id: 33, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "蓝川", level: "总监", role: "光影剪裁｜从业12年", rating: "4.7" },
						{ id: 34, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "任熙", level: "总监", role: "国际导师｜从业18年", rating: "5.0" },
						{ id: 35, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "洪宇", level: "总监", role: "首席造型｜从业17年", rating: "4.9" },
						{ id: 36, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "叶辰", level: "总监", role: "高级顾问｜从业16年", rating: "4.8" },
					],
					[
						{ id: 37, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "许乔", level: "总监", role: "秀场造型｜从业15年", rating: "4.9" },
						{ id: 38, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "秦澈", level: "总监", role: "高级烫染｜从业14年", rating: "4.8" },
						{ id: 39, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "洛竹", level: "总监", role: "质感剪裁｜从业13年", rating: "4.8" },
						{ id: 40, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "沈宴", level: "总监", role: "风格导师｜从业12年", rating: "4.7" },
						{ id: 41, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "阮潇", level: "总监", role: "潮流研究｜从业11年", rating: "4.8" },
						{ id: 42, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "盛恒", level: "总监", role: "高奢造型｜从业15年", rating: "4.9" },
					],
					[
						{ id: 43, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "柏庭", level: "总监", role: "私人订制｜从业14年", rating: "4.8" },
						{ id: 44, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "蒲岚", level: "总监", role: "明星御用｜从业16年", rating: "4.9" },
						{ id: 45, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "卓一", level: "总监", role: "剧组造型｜从业13年", rating: "4.8" },
						{ id: 46, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "霍泽", level: "总监", role: "国际赛导师｜从业17年", rating: "5.0" },
						{ id: 47, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "米澜", level: "总监", role: "学院讲师｜从业12年", rating: "4.8" },
						{ id: 48, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "柯乔", level: "总监", role: "质感染发｜从业14年", rating: "4.9" },
					],
				],
				service: [
					[
						{ id: 49, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "潘黎", level: "高级", role: "五星好评｜从业11年", rating: "4.9" },
						{ id: 50, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "晋航", level: "高级", role: "回头客王｜从业9年", rating: "4.9" },
						{ id: 51, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "白芷", level: "高级", role: "超高满意｜从业8年", rating: "4.8" },
						{ id: 52, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "楚翎", level: "高级", role: "贴心服务｜从业10年", rating: "4.8" },
						{ id: 53, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "程西", level: "高级", role: "口碑导师｜从业9年", rating: "4.7" },
						{ id: 54, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "乐瑶", level: "高级", role: "极速响应｜从业7年", rating: "4.8" },
					],
					[
						{ id: 55, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "米朵", level: "高级", role: "礼貌服务｜从业8年", rating: "4.9" },
						{ id: 56, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "沈沁", level: "高级", role: "好评之星｜从业9年", rating: "4.8" },
						{ id: 57, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "元启", level: "高级", role: "服务达人｜从业8年", rating: "4.8" },
						{ id: 58, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "汪言", level: "高级", role: "舒适体验｜从业9年", rating: "4.9" },
						{ id: 59, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "唐润", level: "高级", role: "预约稳定｜从业10年", rating: "4.8" },
						{ id: 60, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "柯依", level: "高级", role: "首选服务｜从业9年", rating: "4.9" },
					],
					[
						{ id: 61, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "傅岚", level: "高级", role: "高端礼遇｜从业10年", rating: "4.8" },
						{ id: 62, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "沈栩", level: "高级", role: "安抚沟通｜从业8年", rating: "4.7" },
						{ id: 63, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "陆澜", level: "高级", role: "极速排期｜从业7年", rating: "4.8" },
						{ id: 64, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "季枝", level: "高级", role: "细致讲解｜从业9年", rating: "4.9" },
						{ id: 65, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "闻笙", level: "高级", role: "客户维护｜从业8年", rating: "4.8" },
						{ id: 66, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "艾川", level: "高级", role: "安心保障｜从业9年", rating: "4.8" },
					],
					[
						{ id: 67, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "秦韶", level: "高级", role: "回访专员｜从业8年", rating: "4.9" },
						{ id: 68, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "俞娴", level: "高级", role: "贴心话术｜从业7年", rating: "4.7" },
						{ id: 69, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "凌笛", level: "高级", role: "加班响应｜从业6年", rating: "4.8" },
						{ id: 70, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "顾晴", level: "高级", role: "VIP服务｜从业9年", rating: "4.9" },
						{ id: 71, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "俞牧", level: "高级", role: "满意回访｜从业8年", rating: "4.8" },
						{ id: 72, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "柏真", level: "高级", role: "细心记录｜从业7年", rating: "4.8" },
					],
				],
			},
			nearbyStylistsData: [
				{
					id: 7,
					image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png",
					name: "李天天",
					level: "高级",
					role: "店长｜从业12年",
					specialties: ["女士造型", "烫发设计", "短发造型"],
					rating: "4.8",
					services: "287",
					works: "123",
					tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
					distance: "7.5km",
				},
				{
					id: 8,
					image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png",
					name: "李天天",
					level: "高级",
					role: "店长｜从业12年",
					specialties: ["女士造型", "烫发设计", "短发造型"],
					rating: "4.8",
					services: "287",
					works: "123",
					tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
					distance: "7.5km",
				},
				{
					id: 9,
					image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png",
					name: "李天天",
					level: "高级",
					role: "店长｜从业12年",
					specialties: ["女士造型", "烫发设计", "短发造型"],
					rating: "4.8",
					services: "287",
					works: "123",
					tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
					distance: "7.5km",
				},
				{
					id: 10,
					image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png",
					name: "李天天",
					level: "高级",
					role: "店长｜从业12年",
					specialties: ["女士造型", "烫发设计", "短发造型"],
					rating: "4.8",
					services: "287",
					works: "123",
					tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
					distance: "7.5km",
				},
				{
					id: 11,
					image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png",
					name: "李天天",
					level: "高级",
					role: "店长｜从业12年",
					specialties: ["女士造型", "烫发设计", "短发造型"],
					rating: "4.8",
					services: "287",
					works: "123",
					tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
					distance: "7.5km",
				},
				{
					id: 12,
					image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png",
					name: "李天天",
					level: "高级",
					role: "店长｜从业12年",
					specialties: ["女士造型", "烫发设计", "短发造型"],
					rating: "4.8",
					services: "287",
					works: "123",
					tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
					distance: "7.5km",
				},
			],
		}
	},
	computed: {
		currentRankingSlides() {
			const slides = this.rankingSlides[this.activeRankingTab]
			return slides || []
		}
	},
	methods: {
		handleCategoryClick(category) {
			console.log('Category clicked:', category)
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
	padding: 10rpx 0 0 10rpx;
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
}

.nearby-item-wrapper {
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

