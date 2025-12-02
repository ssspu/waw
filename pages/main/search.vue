<template>
	<view class="search-page">
		<view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="back-btn" @tap="handleBack">
					<image class="back-icon" src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" mode="aspectFit"></image>
				</view>
				<view class="search-input-wrapper">
					<image class="search-icon" src="@/static/icon/search.png" mode="aspectFit"></image>
					<input 
						class="search-input" 
						type="text" 
						:placeholder="currentPlaceholder"
						v-model="searchKeyword"
						@confirm="handleSearch"
						@input="handleInput"
					/>
				</view>
			</view>
			
			<!-- 标签页 -->
			<view class="tabs-bar">
				<view 
					v-for="(tab, index) in tabs" 
					:key="index"
					class="tab-item"
					:class="{ active: activeTab === tab.value }"
					@tap="switchTab(tab.value)"
				>
					<text class="tab-text" :class="{ active: activeTab === tab.value }">{{ tab.label }}</text>
					<view v-if="activeTab === tab.value" class="tab-indicator"></view>
				</view>
			</view>
		</view>

		<!-- 筛选和排序栏 -->
		<view class="filter-bar-wrapper">
			<view class="filter-bar">
				<view class="filter-item" :class="{ active: showCategoryDropdown }" @tap.stop="toggleCategoryDropdown">
					<text class="filter-text">{{ selectedCategory }}</text>
					<image class="filter-arrow" src="@/static/icon/xiala.png" mode="aspectFit"></image>
				</view>
				<view class="filter-item" :class="{ active: showSortDropdown }" @tap.stop="toggleSortDropdown">
					<text class="filter-text">{{ selectedSort }}</text>
					<image class="filter-arrow" src="@/static/icon/xiala.png" mode="aspectFit"></image>
				</view>
				<view class="filter-item" :class="{ active: showLocationDropdown }" @tap.stop="toggleLocationDropdown">
					<text class="filter-text">{{ selectedLocation }}</text>
					<image class="filter-arrow" src="@/static/icon/xiala.png" mode="aspectFit"></image>
				</view>
				<view class="filter-item" :class="{ active: showFilterModal }" @tap.stop="toggleFilterModal">
					<text class="filter-text">筛选</text>
					<image class="filter-arrow" src="@/static/icon/xiala.png" mode="aspectFit"></image>
				</view>
			</view>

			<!-- 分类下拉菜单 -->
			<view class="dropdown-menu filter-dropdown-menu" v-if="showCategoryDropdown" @tap.stop>
				<view class="dropdown-filter-container">
					<!-- 左侧分类列表 -->
					<view class="dropdown-category-sidebar">
						<view 
							v-for="(category, index) in categories" 
							:key="index"
							class="dropdown-category-item"
							:class="{ active: dropdownSelectedCategoryIndex === index }"
							@tap="selectDropdownCategory(index)"
						>
							<text class="dropdown-category-name">{{ category.name }}</text>
						</view>
					</view>
					
					<!-- 右侧服务类型列表 -->
					<view class="dropdown-service-types">
						<view 
							v-for="(service, index) in serviceTypes" 
							:key="index"
							class="dropdown-service-type-item"
							:class="{ active: dropdownSelectedServiceIndex === index }"
							@tap="selectDropdownService(index)"
						>
							<text class="dropdown-service-type-name">{{ service.name }}({{ service.count }})</text>
						</view>
					</view>
				</view>
				<view class="modal-footer">
					<button class="reset-btn" @tap="handleCategoryReset">重置</button>
					<button class="confirm-btn" @tap="handleCategoryConfirm">确定</button>
				</view>
			</view>

			<!-- 排序下拉菜单 -->
			<view class="dropdown-menu filter-dropdown-menu" v-if="showSortDropdown" @tap.stop>
				<view class="dropdown-list">
					<view 
						v-for="(sort, index) in sortOptions" 
						:key="index"
						class="dropdown-list-item"
						:class="{ active: dropdownSelectedSortIndex === index }"
						@tap="selectDropdownSort(index)"
					>
						<text class="dropdown-list-text">{{ sort }}</text>
					</view>
				</view>
				<view class="modal-footer">
					<button class="reset-btn" @tap="handleSortReset">重置</button>
					<button class="confirm-btn" @tap="handleSortConfirm">确定</button>
				</view>
			</view>

			<!-- 位置区域下拉菜单 -->
			<view class="dropdown-menu location-dropdown" v-if="showLocationDropdown" @tap.stop>
				<view class="location-panel">
					<scroll-view class="location-region-list" scroll-y>
						<view
							v-for="(region, index) in locationRegions"
							:key="region.name"
							class="location-region-item"
							:class="{ active: index === activeLocationRegionIndex }"
							@tap="handleLocationRegionChange(index)"
						>
							{{ region.name }}
						</view>
					</scroll-view>

					<scroll-view class="location-area-list" scroll-y>
						<view
							class="location-group"
							v-for="(group, groupIndex) in currentLocationGroups"
							:key="group.title"
						>
							<text class="location-group-title">{{ group.title }}</text>
							<view class="location-group-items">
								<text
									v-for="(item, itemIndex) in group.items"
									:key="item.value"
									class="location-group-item"
									:class="{ active: isLocationActive(groupIndex, itemIndex) }"
									@tap="handleLocationSelect(groupIndex, itemIndex)"
								>
									{{ item.label }}
								</text>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="location-action-bar">
					<button class="reset-btn" @tap.stop="handleLocationReset">重置</button>
					<button class="confirm-btn" @tap.stop="handleLocationConfirm">确定</button>
				</view>
			</view>

			<!-- 筛选下拉菜单 -->
			<view class="dropdown-menu filter-dropdown-menu" v-if="showFilterModal" @tap.stop>
				<view class="modal-filter-container">
					<!-- 左侧分类列表 -->
					<view class="modal-category-sidebar">
						<view 
							v-for="(category, index) in filterCategories" 
							:key="index"
							class="modal-category-item"
							:class="{ active: modalSelectedCategoryIndex === index }"
							@tap="selectModalCategory(index)"
						>
							<text class="modal-category-name">{{ category.name }}</text>
						</view>
					</view>
					
					<!-- 右侧筛选内容 -->
					<view class="modal-filter-content">
						<!-- 价格选择 -->
						<view v-if="modalSelectedCategoryIndex === 0" class="filter-content-section">
							<view class="filter-section-title">价格选择</view>
							<!-- 价格滑块 -->
							<view class="price-slider-container">
								<view class="price-labels">
									<text class="price-label price-label-start">0</text>
									<text class="price-label price-label-dynamic price-label-active" :style="{ left: minLabelPosition }">{{ priceRange[0] }}</text>
									<text class="price-label price-label-dynamic price-label-active" :style="{ left: maxLabelPosition }">{{ priceRange[1] }}</text>
									<text class="price-label price-label-end">1000+</text>
								</view>
								<view class="range-slider-wrapper">
									<view class="range-slider-track" @tap="handleTrackTap">
										<view class="range-slider-active" :style="activeRangeStyle"></view>
										<view 
											class="range-slider-handle range-slider-handle-min"
											:style="minHandleStyle"
											@touchstart="handleMinTouchStart"
											@touchmove="handleMinTouchMove"
											@touchend="handleMinTouchEnd"
										></view>
										<view 
											class="range-slider-handle range-slider-handle-max"
											:style="maxHandleStyle"
											@touchstart="handleMaxTouchStart"
											@touchmove="handleMaxTouchMove"
											@touchend="handleMaxTouchEnd"
										></view>
									</view>
								</view>
							</view>
							<!-- 设计师(星级) -->
							<view class="filter-option-group">
								<view class="filter-option-title">设计师(星级)</view>
								<view class="filter-option-buttons">
									<view 
										v-for="(option, idx) in designerStarOptions" 
										:key="idx"
										class="filter-option-btn"
										:class="{ active: selectedDesignerStar === idx }"
										@tap="selectDesignerStar(idx)"
									>
										<text class="filter-option-text">{{ option }}</text>
									</view>
								</view>
							</view>
							<!-- 商家(钻级) -->
							<view class="filter-option-group">
								<view class="filter-option-title">商家(钻级)</view>
								<view class="filter-option-buttons">
									<view 
										v-for="(option, idx) in merchantDiamondOptions" 
										:key="idx"
										class="filter-option-btn"
										:class="{ active: selectedMerchantDiamond === idx }"
										@tap="selectMerchantDiamond(idx)"
									>
										<text class="filter-option-text">{{ option }}</text>
									</view>
								</view>
							</view>
							<!-- 门店 -->
							<view class="filter-option-group">
								<view class="filter-option-title">门店</view>
								<view class="filter-option-buttons">
									<view 
										v-for="(option, idx) in storeTypeOptions" 
										:key="idx"
										class="filter-option-btn"
										:class="{ active: selectedStoreType === idx }"
										@tap="selectStoreType(idx)"
									>
										<text class="filter-option-text">{{ option }}</text>
									</view>
								</view>
							</view>
						</view>
						
						<!-- 设计师(星级) -->
						<view v-else-if="modalSelectedCategoryIndex === 1" class="filter-content-section">
							<view class="filter-section-title">设计师(星级)</view>
							<view class="filter-option-buttons">
								<view 
									v-for="(option, idx) in designerStarOptions" 
									:key="idx"
									class="filter-option-btn"
									:class="{ active: selectedDesignerStar === idx }"
									@tap="selectDesignerStar(idx)"
								>
									<text class="filter-option-text">{{ option }}</text>
								</view>
							</view>
						</view>
						
						<!-- 商家(钻级) -->
						<view v-else-if="modalSelectedCategoryIndex === 2" class="filter-content-section">
							<view class="filter-section-title">商家(钻级)</view>
							<view class="filter-option-buttons">
								<view 
									v-for="(option, idx) in merchantDiamondOptions" 
									:key="idx"
									class="filter-option-btn"
									:class="{ active: selectedMerchantDiamond === idx }"
									@tap="selectMerchantDiamond(idx)"
								>
									<text class="filter-option-text">{{ option }}</text>
								</view>
							</view>
						</view>
						
						<!-- 门店 -->
						<view v-else-if="modalSelectedCategoryIndex === 3" class="filter-content-section">
							<view class="filter-section-title">门店</view>
							<view class="filter-option-buttons">
								<view 
									v-for="(option, idx) in storeTypeOptions" 
									:key="idx"
									class="filter-option-btn"
									:class="{ active: selectedStoreType === idx }"
									@tap="selectStoreType(idx)"
								>
									<text class="filter-option-text">{{ option }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="modal-footer">
					<button class="reset-btn" @tap="handleReset">重置</button>
					<button class="confirm-btn" @tap="handleConfirm">确定</button>
				</view>
			</view>
		</view>

		<!-- 遮罩层 -->
		<view class="dropdown-mask" v-if="showCategoryDropdown || showSortDropdown || showLocationDropdown || showFilterModal" @tap="closeAllDropdowns"></view>

		<view class="search-content">
			<!-- 设计师标签内容 -->
			<view v-if="activeTab === 'designer'" class="tab-content">
				<view class="service-sub-tabs">
					<view
						v-for="(tab, index) in designerSubTabs"
						:key="`designer-${tab}`"
						class="service-sub-tab"
						:class="{ active: activeDesignerSubTab === index }"
						@tap="selectDesignerSubTab(index)"
					>
						{{ tab }}
					</view>
				</view>
				<!-- 附近推荐 -->
				<view class="nearby-section">
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

			<!-- 服务标签内容 -->
			<view v-if="activeTab === 'service'" class="tab-content">
				<view class="service-sub-tabs">
					<view
						v-for="(tab, index) in serviceSubTabs"
						:key="tab"
						class="service-sub-tab"
						:class="{ active: activeServiceSubTab === index }"
						@tap="selectServiceSubTab(index)"
					>
						{{ tab }}
					</view>
				</view>
				<service-gallery-section :show-category-header="false"></service-gallery-section>
			</view>

			<!-- 品牌馆标签内容 -->
			<view v-if="activeTab === 'brand'" class="tab-content">
				<view class="service-sub-tabs">
					<view
						v-for="(tab, index) in brandSubTabs"
						:key="`brand-${tab}`"
						class="service-sub-tab"
						:class="{ active: activeBrandSubTab === index }"
						@tap="selectBrandSubTab(index)"
					>
						{{ tab }}
					</view>
				</view>
				<view class="brand-list">
					<nearby-store-item
						v-for="store in brandRecords"
						:key="store.id"
						:store="store"
						@select="handleStoreSelect"
					/>
				</view>
			</view>

			<view class="safe-area-spacer"></view>
		</view>

	</view>
</template>

<script>
import ServiceGallerySection from '../../components/main/index/ServiceGallerySection.vue'
import NearbyStoreItem from '../../components/common/NearbyStoreItem.vue'

export default {
	name: 'SearchPage',
	components: {
		ServiceGallerySection,
		NearbyStoreItem
	},
	data() {
		return {
			statusBarHeight: 44,
			activeTab: 'designer', // 默认显示设计师标签
			tabs: [
				{ label: '服务', value: 'service' },
				{ label: '设计师', value: 'designer' },
				{ label: '品牌馆', value: 'brand' }
			],
			searchPlaceholderMap: {
				service: '服务',
				designer: '设计师',
				brand: '品牌馆'
			},
			searchKeyword: '',
			showFilterModal: false,
			showCategoryDropdown: false,
			showSortDropdown: false,
			showLocationDropdown: false,
			selectedCategory: '全部',
			selectedSort: '推荐排序',
			selectedLocation: '位置区域',
			selectedCategoryIndex: 0,
			selectedServiceIndex: 0,
			selectedSortIndex: 0,
			dropdownSelectedCategoryIndex: 0,
			dropdownSelectedServiceIndex: 0,
			dropdownSelectedSortIndex: 0,
			modalSelectedCategoryIndex: 0,
			modalSelectedServiceIndex: 0,
			activeLocationRegionIndex: 0,
			selectedLocationValue: {
				regionIndex: 0,
				groupIndex: 0,
				itemIndex: 0
			},
			pendingLocationSelection: {
				regionIndex: 0,
				groupIndex: 0,
				itemIndex: 0
			},
			filterCategories: [
				{ name: '价格选择' },
				{ name: '设计师(星级)' },
				{ name: '商家(钻级)' },
				{ name: '门店' }
			],
			priceRange: [160, 460],
			sliderMin: 0,
			sliderMax: 1000,
			sliderWidth: 0,
			draggingMin: false,
			draggingMax: false,
			touchStartX: 0,
			selectedDesignerStar: 0,
			selectedMerchantDiamond: 0,
			selectedStoreType: 0,
			designerStarOptions: ['二星/中级', '三星/高级', '四星/导师', '五星/名师', '不限'],
			merchantDiamondOptions: ['二星/中级', '三星/高级', '四星/导师', '五星/名师', '不限'],
			storeTypeOptions: ['独立设计师', '工作室', '专业店', '综合店', '连锁店', '品牌店'],
			sortOptions: ['推荐排序', '距离最近', '评分最高', '服务最多', '价格最低'],
			locationRegions: [
				{
					name: '全部',
					groups: [
						{
							title: '全部区域',
							items: [
								{ label: '全城', value: 'all-city' },
								{ label: '高新区', value: 'gaoxin' },
								{ label: '天府新区', value: 'tianfu' },
								{ label: '锦江区', value: 'jinjiang' },
								{ label: '青羊区', value: 'qingyang' },
								{ label: '金牛区', value: 'jinniu' },
								{ label: '武侯区', value: 'wuhou' },
								{ label: '成华区', value: 'chenghua' }
							]
						}
					]
				},
				{
					name: '附近',
					groups: [
						{
							title: '推荐商圈',
							items: [
								{ label: '双林路', value: 'nearby-shuanglin' },
								{ label: '电子科技大学', value: 'nearby-uestc' },
								{ label: '新华公园', value: 'nearby-xinhua' },
								{ label: '万象城', value: 'nearby-wanxiang' },
								{ label: '抚琴', value: 'nearby-fuqin' },
								{ label: '牛王庙', value: 'nearby-niuwangmiao' }
							]
						}
					]
				},
				{
					name: '武侯区',
					groups: [
						{
							title: '武侯区',
							items: [
								{ label: '双楠', value: 'wuhou-shuangnan' },
								{ label: '桐梓林', value: 'wuhou-tongzilin' },
								{ label: '跳伞塔', value: 'wuhou-tiaosanta' },
								{ label: '高升桥', value: 'wuhou-gaoshengqiao' },
								{ label: '磨子桥', value: 'wuhou-moziqiao' }
							]
						}
					]
				},
				{
					name: '青羊区',
					groups: [
						{
							title: '青羊区',
							items: [
								{ label: '宽窄巷子', value: 'qingyang-kuanzhai' },
								{ label: '杜甫草堂', value: 'qingyang-dufu' },
								{ label: '金沙遗址', value: 'qingyang-jinsha' },
								{ label: '青羊宫', value: 'qingyang-qingyanggong' },
								{ label: '浣花溪', value: 'qingyang-huanhuaxi' }
							]
						}
					]
				},
				{
					name: '成华区',
					groups: [
						{
							title: '成华区',
							items: [
								{ label: '建设路', value: 'chenghua-jianshe' },
								{ label: '猛追湾', value: 'chenghua-mengzhuiwan' },
								{ label: '熊猫大道', value: 'chenghua-panda' },
								{ label: '新华公园', value: 'chenghua-xinhua' },
								{ label: '理工大学', value: 'chenghua-ligong' }
							]
						}
					]
				},
				{
					name: '锦江区',
					groups: [
						{
							title: '锦江区',
							items: [
								{ label: '春熙路', value: 'jinjiang-chunxi' },
								{ label: '九眼桥', value: 'jinjiang-jiuyanqiao' },
								{ label: '东大街', value: 'jinjiang-dongdajie' },
								{ label: '合江亭', value: 'jinjiang-hejiang' },
								{ label: '盐市口', value: 'jinjiang-yanshikou' }
							]
						}
					]
				},
				{
					name: '金牛区',
					groups: [
						{
							title: '金牛区',
							items: [
								{ label: '欢乐谷', value: 'jinniu-huanlegu' },
								{ label: '沙湾会展', value: 'jinniu-shawan' },
								{ label: '五块石', value: 'jinniu-wukuaishi' },
								{ label: '茶店子', value: 'jinniu-chadianzi' },
								{ label: '火车北站', value: 'jinniu-huochebei' }
							]
						}
					]
				},
				{
					name: '高新区',
					groups: [
						{
							title: '高新区',
							items: [
								{ label: '锦城湖', value: 'gaoxin-jinchenghu' },
								{ label: '软件园', value: 'gaoxin-ruanjianyuan' },
								{ label: '环球中心', value: 'gaoxin-huanqiuzhongxin' },
								{ label: '金融城', value: 'gaoxin-jinrongcheng' },
								{ label: '中和', value: 'gaoxin-zhonghe' }
							]
						}
					]
				}
			],
			categories: [
				{ name: '附近' },
				{ name: '美发' },
				{ name: '美容' },
				{ name: '美妆' },
				{ name: '美体' },
				{ name: '美甲' },
				{ name: '美睫' }
			],
			serviceTypes: [
				{ name: '全部', count: 2365 },
				{ name: '洗护', count: 523 },
				{ name: '造型', count: 2365 },
				{ name: '剪发', count: 523 },
				{ name: '洗剪吹', count: 2678 },
				{ name: '烫发', count: 856 },
				{ name: '染发', count: 642 },
				{ name: '护理', count: 421 }
			],
			serviceSubTabs: ['洗剪吹', '烫发', '染发', '护发', '头皮', '接发'],
			activeServiceSubTab: 0,
			designerSubTabs: ['洗剪吹', '烫发', '染发', '护发', '头皮', '接发'],
			activeDesignerSubTab: 0,
			brandSubTabs: ['洗剪吹', '烫发', '染发', '护发', '头皮', '接发'],
			activeBrandSubTab: 0,
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
			brandRecords: [
				{
					id: 1,
					name: '成都NICE造型沙龙',
					tag: '舒适',
					type: '专业店｜2012年开业',
					rating: '4.8',
					designers: '8人',
					services: '1236',
					distance: '7.5km',
					amenities: ['代客泊车', '免费茶点', '共享工位', '7天无忧'],
					image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-6.png'
				},
				{
					id: 2,
					name: '成都NICE造型沙龙',
					tag: '舒适',
					type: '专业店｜2012年开业',
					rating: '4.8',
					designers: '8人',
					services: '1236',
					distance: '7.5km',
					amenities: ['代客泊车', '免费茶点', '共享工位', '7天无忧'],
					image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-1.png'
				},
				{
					id: 3,
					name: '成都NICE造型沙龙',
					tag: '舒适',
					type: '专业店｜2012年开业',
					rating: '4.8',
					designers: '8人',
					services: '1236',
					distance: '7.5km',
					amenities: ['代客泊车', '免费茶点', '共享工位', '7天无忧'],
					image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-4.png'
				},
				{
					id: 4,
					name: '成都NICE造型沙龙',
					tag: '舒适',
					type: '专业店｜2012年开业',
					rating: '4.8',
					designers: '8人',
					services: '1236',
					distance: '7.5km',
					amenities: ['代客泊车', '免费茶点', '共享工位', '7天无忧'],
					image: 'https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-5.png'
				}
			]
		}
	},
	computed: {
		currentPlaceholder() {
			return this.searchPlaceholderMap[this.activeTab] || '搜索';
		},
		currentLocationGroups() {
			const region = this.locationRegions[this.activeLocationRegionIndex];
			if (region && Array.isArray(region.groups) && region.groups.length) {
				return region.groups;
			}
			return [
				{
					title: '全部区域',
					items: [{ label: '全城', value: 'all-city' }]
				}
			];
		},
		minHandleStyle() {
			const percent = ((this.priceRange[0] - this.sliderMin) / (this.sliderMax - this.sliderMin)) * 100
			return {
				left: `${percent}%`,
				transform: 'translateX(-50%)'
			}
		},
		maxHandleStyle() {
			const percent = ((this.priceRange[1] - this.sliderMin) / (this.sliderMax - this.sliderMin)) * 100
			return {
				left: `${percent}%`,
				transform: 'translateX(-50%)'
			}
		},
		activeRangeStyle() {
			const minPercent = ((this.priceRange[0] - this.sliderMin) / (this.sliderMax - this.sliderMin)) * 100
			const maxPercent = ((this.priceRange[1] - this.sliderMin) / (this.sliderMax - this.sliderMin)) * 100
			return {
				left: `${minPercent}%`,
				width: `${maxPercent - minPercent}%`
			}
		},
		minLabelPosition() {
			const percent = ((this.priceRange[0] - this.sliderMin) / (this.sliderMax - this.sliderMin)) * 100
			return `${percent}%`
		},
		maxLabelPosition() {
			const percent = ((this.priceRange[1] - this.sliderMin) / (this.sliderMax - this.sliderMin)) * 100
			return `${percent}%`
		}
	},
	onLoad(options) {
		// 从持久化存储获取状态栏高度
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44

		// 从URL参数获取tab，切换到对应标签
		if (options.tab) {
			const validTabs = ['designer', 'service', 'brand']
			if (validTabs.includes(options.tab)) {
				this.activeTab = options.tab
			}
		}
	},
	onReady() {
		// 获取滑块轨道宽度
		const query = uni.createSelectorQuery().in(this)
		query.select('.range-slider-track').boundingClientRect((data) => {
			if (data) {
				this.sliderWidth = data.width
			}
		}).exec()
	},
	methods: {
		handleBack() {
			uni.navigateBack({
				fail: () => uni.switchTab({ url: '/pages/main/index' })
			})
		},
		handleSearch() {
			console.log('Search keyword:', this.searchKeyword)
			// TODO: 实现搜索逻辑
		},
		handleInput(e) {
			this.searchKeyword = e.detail.value
		},
		handleFilter() {
			console.log('Filter clicked')
		},
		switchTab(value) {
			this.activeTab = value
			// 切换标签时关闭所有下拉菜单
			this.closeAllDropdowns()
		},
		handleStylistClick(stylist) {
			uni.navigateTo({
				url: `/pages/designer/detail?id=${stylist.id || 1}&name=${encodeURIComponent(stylist.name || '')}`
			})
		},
		handleStoreSelect(store) {
			uni.navigateTo({
				url: `/pages/brand/detail?id=${store.id}`
			})
		},
		toggleCategoryDropdown() {
			this.showCategoryDropdown = !this.showCategoryDropdown
			if (this.showCategoryDropdown) {
				this.showSortDropdown = false
				this.showLocationDropdown = false
				// 同步当前选中状态
				this.dropdownSelectedCategoryIndex = this.selectedCategoryIndex
				this.dropdownSelectedServiceIndex = this.selectedServiceIndex
			}
		},
		toggleSortDropdown() {
			this.showSortDropdown = !this.showSortDropdown
			if (this.showSortDropdown) {
				this.showCategoryDropdown = false
				this.showLocationDropdown = false
				this.showFilterModal = false
				// 同步当前选中状态
				this.dropdownSelectedSortIndex = this.selectedSortIndex
			}
		},
		toggleLocationDropdown() {
			this.showLocationDropdown = !this.showLocationDropdown
			if (this.showLocationDropdown) {
				this.showCategoryDropdown = false
				this.showSortDropdown = false
				this.showFilterModal = false
				this.activeLocationRegionIndex = this.selectedLocationValue.regionIndex || 0
				this.pendingLocationSelection = { ...this.selectedLocationValue }
			}
		},
		toggleFilterModal() {
			this.showFilterModal = !this.showFilterModal
			if (this.showFilterModal) {
				this.showCategoryDropdown = false
				this.showSortDropdown = false
				this.showLocationDropdown = false
			}
		},
		closeAllDropdowns() {
			this.showCategoryDropdown = false
			this.showSortDropdown = false
			this.showLocationDropdown = false
			this.showFilterModal = false
		},
		selectDropdownCategory(index) {
			this.dropdownSelectedCategoryIndex = index
			// 切换分类时重置服务类型选择
			this.dropdownSelectedServiceIndex = 0
		},
		selectDropdownService(index) {
			this.dropdownSelectedServiceIndex = index
		},
		selectDropdownSort(index) {
			this.dropdownSelectedSortIndex = index
		},
		handleCategoryReset() {
			this.dropdownSelectedCategoryIndex = 0
			this.dropdownSelectedServiceIndex = 0
		},
		handleCategoryConfirm() {
			this.selectedCategoryIndex = this.dropdownSelectedCategoryIndex
			this.selectedServiceIndex = this.dropdownSelectedServiceIndex
			this.selectedCategory = this.categories[this.dropdownSelectedCategoryIndex].name
			this.closeAllDropdowns()
			// TODO: 根据选中的分类和服务类型筛选数据
		},
		handleSortReset() {
			this.dropdownSelectedSortIndex = 0
		},
		handleSortConfirm() {
			this.selectedSortIndex = this.dropdownSelectedSortIndex
			this.selectedSort = this.sortOptions[this.dropdownSelectedSortIndex]
			this.closeAllDropdowns()
			// TODO: 根据选中的排序方式排序数据
		},
		selectSort(index) {
			this.selectedSortIndex = index
			this.selectedSort = this.sortOptions[index]
			this.closeAllDropdowns()
			// TODO: 根据选中的排序方式排序数据
		},
		handleLocationRegionChange(index) {
			this.activeLocationRegionIndex = index
			this.pendingLocationSelection.regionIndex = index
			this.pendingLocationSelection.groupIndex = 0
			this.pendingLocationSelection.itemIndex = 0
		},
		handleLocationSelect(groupIndex, itemIndex) {
			this.pendingLocationSelection.groupIndex = groupIndex
			this.pendingLocationSelection.itemIndex = itemIndex
		},
		handleLocationConfirm() {
			const region = this.locationRegions[this.pendingLocationSelection.regionIndex]
			const group = region?.groups?.[this.pendingLocationSelection.groupIndex]
			const item = group?.items?.[this.pendingLocationSelection.itemIndex]
			this.selectedLocationValue = { ...this.pendingLocationSelection }
			this.selectedLocation = item?.label || group?.title || region?.name || '全部'
			this.closeAllDropdowns()
		},
		handleLocationReset() {
			this.pendingLocationSelection = {
				regionIndex: 0,
				groupIndex: 0,
				itemIndex: 0
			}
			this.activeLocationRegionIndex = 0
		},
		isLocationActive(groupIndex, itemIndex) {
			return (
				this.pendingLocationSelection.regionIndex === this.activeLocationRegionIndex &&
				this.pendingLocationSelection.groupIndex === groupIndex &&
				this.pendingLocationSelection.itemIndex === itemIndex
			)
		},
		selectModalCategory(index) {
			this.modalSelectedCategoryIndex = index
		},
		selectModalService(index) {
			this.modalSelectedServiceIndex = index
		},
		valueToPosition(value) {
			return ((value - this.sliderMin) / (this.sliderMax - this.sliderMin)) * 100
		},
		positionToValue(percent) {
			const value = this.sliderMin + (percent / 100) * (this.sliderMax - this.sliderMin)
			return Math.round(value / 10) * 10 // 按10的倍数取整
		},
		handleTrackTap(e) {
			if (this.draggingMin || this.draggingMax) return
			
			const query = uni.createSelectorQuery().in(this)
			query.select('.range-slider-track').boundingClientRect((data) => {
				if (data) {
					const touchX = e.detail.x || (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
					if (!touchX) return
					
					const trackLeft = data.left
					const trackWidth = data.width
					const percent = ((touchX - trackLeft) / trackWidth) * 100
					const value = this.positionToValue(percent)
					
					// 判断点击位置更靠近哪个滑块
					const minDistance = Math.abs(value - this.priceRange[0])
					const maxDistance = Math.abs(value - this.priceRange[1])
					
					if (minDistance < maxDistance) {
						if (value <= this.priceRange[1]) {
							this.priceRange[0] = Math.max(this.sliderMin, value)
						}
					} else {
						if (value >= this.priceRange[0]) {
							this.priceRange[1] = Math.min(this.sliderMax, value)
						}
					}
				}
			}).exec()
		},
		handleMinTouchStart(e) {
			this.draggingMin = true
			this.touchStartX = e.touches[0].clientX
		},
		handleMinTouchMove(e) {
			if (!this.draggingMin) return
			e.preventDefault()
			
			const query = uni.createSelectorQuery().in(this)
			query.select('.range-slider-track').boundingClientRect((data) => {
				if (data) {
					const touchX = e.touches[0].clientX
					const trackLeft = data.left
					const trackWidth = data.width
					const percent = ((touchX - trackLeft) / trackWidth) * 100
					const value = this.positionToValue(percent)
					
					if (value >= this.sliderMin && value <= this.priceRange[1]) {
						this.priceRange[0] = value
					}
				}
			}).exec()
		},
		handleMinTouchEnd(e) {
			this.draggingMin = false
		},
		handleMaxTouchStart(e) {
			this.draggingMax = true
			this.touchStartX = e.touches[0].clientX
		},
		handleMaxTouchMove(e) {
			if (!this.draggingMax) return
			e.preventDefault()
			
			const query = uni.createSelectorQuery().in(this)
			query.select('.range-slider-track').boundingClientRect((data) => {
				if (data) {
					const touchX = e.touches[0].clientX
					const trackLeft = data.left
					const trackWidth = data.width
					const percent = ((touchX - trackLeft) / trackWidth) * 100
					const value = this.positionToValue(percent)
					
					if (value <= this.sliderMax && value >= this.priceRange[0]) {
						this.priceRange[1] = value
					}
				}
			}).exec()
		},
		handleMaxTouchEnd(e) {
			this.draggingMax = false
		},
		selectDesignerStar(index) {
			this.selectedDesignerStar = index
		},
		selectMerchantDiamond(index) {
			this.selectedMerchantDiamond = index
		},
		selectStoreType(index) {
			this.selectedStoreType = index
		},
		handleReset() {
			// 重置弹窗中的筛选条件
			this.modalSelectedCategoryIndex = 0
			this.modalSelectedServiceIndex = 0
			this.priceRange = [160, 460]
			this.selectedDesignerStar = 0
			this.selectedMerchantDiamond = 0
			this.selectedStoreType = 0
		},
		handleConfirm() {
			// 应用筛选条件到主页面
			this.showFilterModal = false
			// TODO: 根据筛选条件更新数据
		},
		selectServiceSubTab(index) {
			this.activeServiceSubTab = index
			// TODO: 根据 serviceSubTabs[index] 筛选服务列表数据
		},
		selectDesignerSubTab(index) {
			this.activeDesignerSubTab = index
			// TODO: 根据 designerSubTabs[index] 筛选设计师列表数据
		},
		selectBrandSubTab(index) {
			this.activeBrandSubTab = index
			// TODO: 根据 brandSubTabs[index] 筛选品牌馆列表数据
		}
	}
}
</script>

<style scoped lang="scss">
.search-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
}


.navbar {
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 101;
}

/* 标签页 */
.tabs-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 40rpx;
	gap: 40rpx;
	background-color: #ffffff;
	border-bottom: 1rpx solid #f0f0f0;
}

.tab-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20rpx 0 18rpx;
	position: relative;
}

.tab-text {
	font-size: 28rpx;
	color: #999999;
	font-family: 'PingFang_SC-Regular', Helvetica;
}

.tab-item.active .tab-text {
	color: #000000;
	font-weight: 600;
	font-family: 'PingFang_SC-Medium', Helvetica;
}

.tab-indicator {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 6rpx;
	background-color: #000000;
	border-radius: 3rpx;
}

.navbar-content {
	display: flex;
	align-items: center;
	height: 88rpx;
	padding: 0 30rpx;
	position: relative;
	gap: 20rpx;
	box-sizing: border-box;
	background-color: #ffffff;
}

.back-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
}

.search-input-wrapper {
	width: 400rpx;
	display: flex;
	align-items: center;
	gap: 12rpx;
	background-color: #f5f5f5;
	border-radius: 52rpx;
	height: 60rpx;
	padding: 0 20rpx;
	box-sizing: border-box;
}

.search-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
	opacity: 0.75;
}

.search-input {
	flex: 1;
	font-size: 28rpx;
	color: #333;
	font-family: 'PingFang_SC-Regular', Helvetica;
	background: transparent;
	border: none;
}

.search-input::placeholder {
	color: #999;
}

/* 筛选和排序栏 */
.filter-bar-wrapper {
	position: relative;
	background-color: #ffffff;
	z-index: 101;
}

.filter-bar {
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: #ffffff;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.filter-item {
	display: flex;
	align-items: center;
	gap: 8rpx;
	position: relative;
}

.filter-item.active {
	color: #dacbb1;
}

.filter-text {
	font-size: 26rpx;
	color: #333;
	font-family: 'PingFang_SC-Regular', Helvetica;
}

.filter-item.active .filter-text {
	color: #dacbb1;
}

.filter-arrow {
	width: 20rpx;
	height: 20rpx;
}

/* 下拉菜单 */
.dropdown-menu {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background-color: #ffffff;
	z-index: 101;
	max-height: 60vh;
	overflow: hidden;
}

.location-dropdown {
	padding: 0;
	box-shadow: none;
	background-color: transparent;
	max-height: none;
	overflow: visible;
}

.location-panel {
	display: flex;
	height: 800rpx;
	background-color: #ffffff;
	box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.12);
}

.location-region-list {
	width: 180rpx;
	background-color: #f7f7f7;
	height: 100%;
	overflow: hidden;
}

.location-region-item {
	padding: 32rpx 20rpx;
	font-size: 26rpx;
	color: #666;
	border-left: 6rpx solid transparent;
}

.location-region-item.active {
	background-color: #ffffff;
	color: #000000;
	font-weight: 600;
	border-left-color: #000000;
}

.location-area-list {
	flex: 1;
	background-color: #ffffff;
	padding: 24rpx;
	box-sizing: border-box;
	height: 100%;
	overflow-y: auto;
}

.location-action-bar {
	display: flex;
	gap: 20rpx;
	padding: 20rpx 24rpx 24rpx;
	background-color: #fff;
	box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04);
	justify-content: space-between;
}

.location-group {
	margin-bottom: 24rpx;
}

.location-group-title {
	font-size: 24rpx;
	color: #999999;
	margin-bottom: 16rpx;
	display: inline-block;
}

.location-group-items {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.location-group-item {
	font-size: 26rpx;
	color: #666666;
	padding: 8rpx 0;
}

.location-group-item.active {
	color: #dacbb1;
	font-weight: 600;
}

/* 遮罩层 */
.dropdown-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 99;
}

/* 两级菜单容器 */
.dropdown-filter-container {
	display: flex;
	width: 100%;
	flex: 1;
	min-height: 0;
	background-color: #ffffff;
}

/* 下拉菜单中的左侧分类列表 */
.dropdown-category-sidebar {
	width: 200rpx;
	background-color: #f8f8f8;
	padding: 20rpx 0;
	border-right: 1rpx solid #f0f0f0;
	overflow-y: auto;
}

.dropdown-category-item {
	padding: 24rpx 20rpx;
	text-align: center;
}

.dropdown-category-item.active {
	background-color: #ffffff;
	border-left: 4rpx solid #dacbb1;
}

.dropdown-category-name {
	font-size: 26rpx;
	color: #666;
	font-family: 'PingFang_SC-Regular', Helvetica;
}

.dropdown-category-item.active .dropdown-category-name {
	color: #333;
	font-weight: 500;
}

/* 下拉菜单中的右侧服务类型列表 */
.dropdown-service-types {
	flex: 1;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	overflow-y: auto;
	background-color: #ffffff;
}

.dropdown-service-type-item {
	padding: 16rpx 0;
}

.dropdown-service-type-item.active .dropdown-service-type-name {
	color: #dacbb1;
	font-weight: 500;
}

.dropdown-service-type-name {
	font-size: 26rpx;
	color: #666;
	font-family: 'PingFang_SC-Regular', Helvetica;
}

/* 单级下拉列表 */
.dropdown-list {
	padding: 20rpx 0;
	flex: 1;
	overflow-y: auto;
	min-height: 0;
}

.dropdown-list-item {
	padding: 24rpx 30rpx;
}

.dropdown-list-item.active .dropdown-list-text {
	color: #dacbb1;
	font-weight: 500;
}

.dropdown-list-text {
	font-size: 26rpx;
	color: #666;
	font-family: 'PingFang_SC-Regular', Helvetica;
}

.search-content {
	flex: 1;
	width: 100%;
	padding: 10rpx 12rpx 0;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

.tab-content {
	width: 100%;
	display: flex;
	flex-direction: column;
}

.service-sub-tabs {
	display: flex;
	align-items: center;
	gap: 16rpx;
	padding: 6rpx 6rpx 4rpx;
	background-color: #f5f5f5;
	border-radius: 24rpx;
	margin-bottom: 10rpx;
	overflow-x: auto;
	white-space: nowrap;
}

.service-sub-tab {
	padding: 4rpx 16rpx;
	border-radius: 2rpx;
	background-color: #ffffff;
	color: #a0a0a0;
	font-size: 26rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	border: 2rpx solid transparent;
	transition: all 0.2s ease;
}

.service-sub-tab.active {
	background-color: #111111;
	color: #ffffff;
	border-color: #111111;
	font-weight: 500;
}

.brand-list {
	margin-top: 12rpx;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

/* 附近推荐 */
.nearby-section {
	width: 100%;
	box-sizing: border-box;
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

.safe-area-spacer {
	height: 40rpx;
}

/* 筛选下拉菜单 */
.filter-dropdown-menu {
	max-height: 70vh;
	display: flex;
	flex-direction: column;
}

/* 弹窗中的分类筛选容器 */
.modal-filter-container {
	display: flex;
	width: 100%;
	flex: 1;
	min-height: 0;
	background-color: #ffffff;
}

/* 弹窗中的左侧分类列表 */
.modal-category-sidebar {
	width: 160rpx;
	background-color: #f8f8f8;
	border-right: 1rpx solid #f0f0f0;
	overflow-y: auto;
	flex-shrink: 0;
}

.modal-category-item {
	padding: 24rpx 20rpx;
	text-align: center;
}

.modal-category-item.active {
	background-color: #ffffff;
	border-left: 4rpx solid #dacbb1;
}

.modal-category-name {
	font-size: 26rpx;
	color: #666;
	font-family: 'PingFang_SC-Regular', Helvetica;
}

.modal-category-item.active .modal-category-name {
	color: #333;
	font-weight: 500;
}

/* 弹窗中的右侧服务类型列表 */
.modal-service-types {
	flex: 1;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	overflow-y: auto;
	background-color: #ffffff;
}

/* 弹窗中的右侧筛选内容 */
.modal-filter-content {
	flex: 1;
	padding: 30rpx;
	overflow-y: auto;
	background-color: #ffffff;
	min-width: 0;
}

.filter-content-section {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
}

.filter-section-title {
	font-size: 26rpx;
	color: #333;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	margin-bottom: 10rpx;
}

/* 价格滑块容器 */
.price-slider-container {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	padding: 0;
}

.price-labels {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	margin-bottom: 24rpx;
	height: 32rpx;
}

.price-label {
	font-size: 24rpx;
	color: #999999;
	font-family: 'PingFang_SC-Regular', Helvetica;
	line-height: 32rpx;
}

.price-label-start {
	position: absolute;
	left: 0;
}

.price-label-end {
	position: absolute;
	right: 0;
}

.price-label-dynamic {
	position: absolute;
	transform: translateX(-50%);
}

.price-label-active {
	color: #000000;
	font-weight: 500;
}

.range-slider-wrapper {
	width: 100%;
	padding: 0;
	position: relative;
}

.range-slider-track {
	position: relative;
	width: 100%;
	height: 10rpx;
	background-color: #e0e0e0;
	border-radius: 3rpx;
}

.range-slider-active {
	position: absolute;
	top: 0;
	height: 100%;
	background-color: #000000;
	border-radius: 3rpx;
	z-index: 1;
}

.range-slider-handle {
	position: absolute;
	top: -5rpx;
	width: 20rpx;
	height: 20rpx;
	background-color: #ffffff;
	border-radius: 50%;
	transform: translateY(-50%) translateX(-50%);
	z-index: 2;
	border: 5rpx solid #000000;
	box-sizing: border-box;
}

.range-slider-handle-min {
	cursor: grab;
}

.range-slider-handle-max {
	cursor: grab;
}

/* 筛选选项组 */
.filter-option-group {
	padding: 15rpx 0;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.filter-option-title {
	font-size: 28rpx;
	color: rgb(167, 167, 167);
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 300;
}

.filter-option-buttons {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
}

.filter-option-btn {
	flex: 0 0 calc((100% - 32rpx) / 3);
	padding: 12rpx 0;
	border-radius: 2rpx;
	background-color: #f6f6f6;
	border: 1rpx solid #e0e0e0;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.filter-option-btn.active {
	background-color: #333333;
	border-color: #333333;
}

.filter-option-text {
	font-size: 26rpx;
	color: #666;
	font-family: 'PingFang_SC-Regular', Helvetica;
}

.filter-option-btn.active .filter-option-text {
	color: #ffffff;
}

.modal-service-type-item {
	padding: 16rpx 0;
}

.modal-service-type-item.active .modal-service-type-name {
	color: #dacbb1;
	font-weight: 500;
}

.modal-service-type-name {
	font-size: 26rpx;
	color: #666;
	font-family: 'PingFang_SC-Regular', Helvetica;
}

.modal-footer {
	display: flex;
	padding: 20rpx 30rpx;
	gap: 20rpx;
	border-top: 1rpx solid #f0f0f0;
}

.reset-btn,
.confirm-btn {
	flex: 1;
	height: 88rpx;
	border-radius: 2rpx;
	font-size: 28rpx;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
}

.reset-btn::after,
.confirm-btn::after {
	border: none;
}

.reset-btn {
	background-color: #ffffff;
	color: #666;
	border: 1rpx solid #e0e0e0;
}

.confirm-btn {
	background-color: #333333;
	color: #ffffff;
}
</style>

