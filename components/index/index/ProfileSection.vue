<template>
	<view class="profile-section">
		<!--  -->
		<view class="alert-card animate-fade-in" style="animation-delay: 0ms;">
			<view class="alert-content">
				<view class="alert-left">
					<view class="avatar">
						<image class="avatar-img" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-71.svg" mode="aspectFill"></image>
					</view>
					<text class="alert-text">hey,快去看看你的周边设计师吧</text>
				</view>
				<view class="close-btn" @tap="handleNearbyDesignerClick">
					<image class="close-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-6.svg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	

		<!--  Tab  -->
		<view class="top-tab-section animate-fade-in" style="animation-delay: 150ms;">
			<!--  Tab -->
			<view class="main-tabs">
				<view
					v-for="(tab, index) in mainTabs"
					:key="index"
					class="main-tab-item"
					:class="{ active: activeMainTab === tab.value }"
					@tap="switchMainTab(tab.value)"
				>
					<image class="main-tab-icon" :src="tab.icon" mode="aspectFit"></image>
					<image class="main-tab-text-img" :src="tab.textIcon" mode="aspectFit"></image>
					<text class="main-tab-subtitle">{{ tab.subtitle }}</text>
				</view>
			</view>
			<!--  Tab -->
			<scroll-view class="sub-tabs-scroll" scroll-x>
				<view class="sub-tabs-container">
					<view
						v-for="(tab, index) in subTabs"
						:key="index"
						class="sub-tab-item"
						:class="{ active: activeSubTab === tab.value }"
						@tap="switchSubTab(tab.value)"
					>
						<image class="sub-tab-icon" :src="tab.icon" mode="aspectFit"></image>
						<text class="sub-tab-text" :class="{ active: activeSubTab === tab.value }">{{ tab.label }}</text>
						<text class="sub-tab-subtitle">{{ tab.subtitle }}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 作品集 -->
		<view class="portfolio-card animate-fade-in" style="animation-delay: 200ms;">
			<view class="card-header" @tap="handlePortfolioHeaderClick">
				<view class="title-wrapper">
					<text class="card-title">作品集</text>
					<view class="title-bar"></view>
				</view>
				<image class="more-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-7.svg" mode="aspectFit"></image>
			</view>
			<view class="portfolio-content">
				<view
					v-for="(item, index) in portfolioItems"
					:key="index"
					class="portfolio-item"
					:style="{ left: index === 0 ? '0' : '314rpx' }"
					@tap="handlePortfolioItemClick(item, index)"
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
			<view class="card-header" @tap="handleDesignerSectionClick">
				<view class="title-wrapper">
					<text class="card-title">设计师</text>
					<view class="title-bar"></view>
				</view>
				<image class="more-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-7.svg" mode="aspectFit"></image>
			</view>
			<scroll-view class="designers-tabs-scroll" scroll-x>
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
			<scroll-view class="designers-list-scroll" scroll-x show-scrollbar="false" scroll-with-animation>
				<view class="designers-list-container">
					<!-- 暂无数据占位 -->
					<view v-if="!currentDesigners || currentDesigners.length === 0" class="empty-placeholder">
						<text class="empty-text">暂无</text>
					</view>
					<view
						v-else
						v-for="(designer, index) in currentDesigners"
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
								<view class="designer-badge secondary">{{ designer.position }}</view>
								<view class="designer-badge primary">{{ designer.level }}</view>
							</view>
							<view class="designer-title-row">
								<text class="designer-title">{{ designer.title }}</text>
								<text class="title-separator">|</text>
								<text class="work-years">{{ designer.workYears }}年从业</text>
							</view>
							<view class="designer-footer">
								<view class="rating-info">
									<text class="rating-score">{{ designer.rating }}</text>
									<view class="star-container">
										<image class="star-icon" src="/static/icon/star.png" mode="aspectFit"></image>
									</view>
									<text class="review-count">({{ designer.appointments }})</text>
								</view>
								<text class="distance">{{ designer.distance }}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 品牌馆 -->
		<view class="brands-card animate-fade-in" style="animation-delay: 400ms;">
			<view class="card-header" @tap="handleSectionHeaderClick('brand')">
				<view class="title-wrapper">
					<text class="card-title">品牌馆</text>
					<view class="title-bar"></view>
				</view>
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
			<scroll-view class="brands-scroll" scroll-x show-scrollbar="false" scroll-with-animation>
				<view class="brands-container">
					<!-- 暂无数据占位 -->
					<view v-if="!filteredBrands || filteredBrands.length === 0" class="empty-placeholder">
						<text class="empty-text">暂无</text>
					</view>
					<view
						v-else
						v-for="(brand, index) in filteredBrands"
						:key="index"
						class="brand-card"
						:class="brand.brandType"
						@tap="handleBrandClick(brand)"
					>
						<template v-if="brand.brandType === ''">
							<view class="brand-img-wrapper">
								<view class="brand-img-bg"></view>
								<image class="brand-img" :src="brand.image" mode="aspectFill"></image>
							</view>
							<view class="brand-info">
								<text class="brand-name">{{ brand.name }}</text>
								<view class="brand-footer">
									<view class="brand-rating">
										<text class="rating-score">{{ brand.rating }}</text>
										<view class="star-container">
											<image class="star-icon" src="/static/icon/star.png" mode="aspectFit"></image>
										</view>
										<text class="review-count">({{ brand.reviews }})</text>
									</view>
								</view>
								<view class="brand-address">
									<image class="location-icon" src="https://bioflex.cn/static/icon/position.png" mode="aspectFit"></image>
									<text class="address-text">{{ brand.address }}</text>
									<text class="distance">{{ brand.distance }}</text>
								</view>
							</view>
						</template>
						<template v-else-if="brand.brandType === 'brand-store'">
							<view class="brand-img-wrapper">
								<view class="brand-img-bg brand-img-bg-dark"></view>
								<image class="brand-img" :src="brand.image" mode="aspectFill"></image>
								<view class="brand-tag">品牌店</view>
							</view>
							<view class="brand-info">
								<text class="brand-name">{{ brand.name }}</text>
								<view class="brand-footer">
									<view class="brand-rating">
										<text class="rating-score primary">{{ brand.rating }}</text>
										<view class="star-container">
											<image class="star-icon" src="/static/icon/star.png" mode="aspectFit"></image>
										</view>
										<text class="review-count">({{ brand.reviews }})</text>
									</view>
								</view>
								<view class="brand-meta">
									<text class="meta-item">{{ brand.targetCustomer }}</text>
									<text class="meta-divider">|</text>
									<text class="meta-item">{{ brand.designerCount }}位设计师</text>
								</view>
								<view class="brand-address">
									<image class="location-icon" src="https://bioflex.cn/static/icon/position.png" mode="aspectFit"></image>
									<text class="address-text">{{ brand.address }}</text>
									<text class="distance">{{ brand.distance }}</text>
								</view>
							</view>
						</template>
						<template v-else-if="brand.brandType === 'studio'">
							<view class="brand-img-wrapper">
								<view class="brand-img-bg brand-img-bg-light"></view>
								<image class="brand-img" :src="brand.image" mode="aspectFill"></image>
							</view>
							<view class="brand-info studio-info">
								<text class="brand-name studio-name">{{ brand.name }}</text>
								<text class="studio-service">{{ brand.mainServices }}</text>
								<view class="brand-footer">
									<view class="brand-rating studio-rating">
										<text class="rating-score">{{ brand.rating }}</text>
										<view class="star-container">
											<image class="star-icon" src="/static/icon/star.png" mode="aspectFit"></image>
										</view>
									</view>
									<text class="distance">{{ brand.distance }}</text>
								</view>
							</view>
						</template>
						<template v-else-if="brand.brandType === 'comprehensive'">
							<view class="brand-img-wrapper">
								<view class="brand-img-bg"></view>
								<image class="brand-img" :src="brand.image" mode="aspectFill"></image>
								<view class="comprehensive-badge">
									<text>综合店</text>
								</view>
							</view>
							<view class="brand-info comprehensive-info">
								<view class="comprehensive-header">
									<text class="brand-name">{{ brand.name }}</text>
									<view class="venue-type-tag">{{ brand.venueType }}</view>
								</view>
								<view class="comprehensive-services">
									<text class="services-label">服务:</text>
									<text class="services-text">{{ brand.mainServices }}</text>
								</view>
								<view class="brand-footer">
									<view class="brand-rating">
										<text class="rating-score">{{ brand.rating }}</text>
										<view class="star-container">
											<image class="star-icon" src="/static/icon/star.png" mode="aspectFit"></image>
										</view>
										<text class="review-count">({{ brand.reviews }})</text>
									</view>
								</view>
								<view class="brand-address">
									<image class="location-icon" src="https://bioflex.cn/static/icon/position.png" mode="aspectFit"></image>
									<text class="address-text">{{ brand.address }}</text>
									<text class="distance">{{ brand.distance }}</text>
								</view>
							</view>
						</template>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 服务 -->
		<view class="services-section animate-fade-in" style="animation-delay: 500ms;">
			<view class="services-header">
				<view class="title-wrapper">
					<text class="services-title" @tap="handleSectionHeaderClick('service')">优服务</text>
					<view class="title-bar"></view>
				</view>
				<view class="dropdown-wrapper" @tap="toggleServiceDropdown">
					<text class="dropdown-text">筛选</text>
					<image class="dropdown-arrow" :class="{ 'rotate': showServiceDropdown }" src="/static/icon/xiala.png" mode="aspectFit"></image>
					<view class="dropdown-menu" v-if="showServiceDropdown">
						<view
							class="dropdown-item"
							v-for="(tab, index) in serviceTabs"
							:key="index"
							:class="{ active: activeServiceTab === tab }"
							@tap.stop="selectServiceType(tab)"
						>
							<text>{{ tab }}</text>
						</view>
					</view>
				</view>
			</view>
			<scroll-view class="service-tabs-scroll" scroll-x>
				<view class="tabs-container">
					<view
						v-for="(tab, index) in serviceTabs"
						:key="index"
						class="tab-item"
						:class="{ active: activeServiceTab === tab }"
						@tap="handleServiceTabClick(tab)"
					>
						<text>{{ tab }}</text>
					</view>
				</view>
			</scroll-view>
			<view class="services-grid">
				<view
					v-for="(service, index) in allServices"
					:key="index"
					class="service-card"
					@tap="handleServiceCardClick(service)"
				>
					<image class="service-img" :src="service.image" mode="aspectFill"></image>
					<view class="service-info">
						<text class="service-title">{{ service.title }}</text>
						<text class="service-desc">{{ service.description }}</text>
						<view class="service-price">
							<text class="price-symbol">¥</text>
							<text class="price-value">{{ service.price }}</text>
							<text class="appointment-price-tag">预约价¥{{ service.appointmentPrice || service.price }}</text>
						</view>
						<view class="service-footer">
							<view class="service-designer">
								<view class="service-avatar">
									<image class="avatar-img-small" :src="service.avatar" mode="aspectFill"></image>
								</view>
								<view class="designer-details">
									<view class="designer-name-row">
										<text class="designer-name-small">{{ service.designerName }}</text>
										<text class="designer-role-small">{{ service.designerRole }}</text>
									</view>
									<view class="designer-rating">
										<text class="rating-score-small">{{ service.rating }}</text>
										<view class="star-container-small">
											<image class="star-icon-small" src="/static/icon/star.png" mode="aspectFit"></image>
										</view>
										<text class="review-count-small">({{ service.reviews }})</text>
										<text class="service-distance">{{ service.distance }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import { calculateDistance, getCurrentLocation } from '@/utils/location.js'

export default {
	data() {
		return {
			loading: false,
			userLatitude: null,
			userLongitude: null,
			// ... existing data ...
			mainTabs: [
				{ label: "", value: "designer", icon: "https://bioflex.cn/static/容器@3x.png", textIcon: "https://bioflex.cn/static/设计师@3x.png", subtitle: "发现宝藏设计师" },
				{ label: "", value: "service", icon: "https://bioflex.cn/static/容器@3x(1).png", textIcon: "https://bioflex.cn/static/优服务@3x.png", subtitle: "甄选优质服务" },
				{ label: "", value: "brand", icon: "https://bioflex.cn/static/容器@3x(4).png", textIcon: "https://bioflex.cn/static/品牌馆@3x.png", subtitle: "优质线下门店" }
			],
			activeMainTab: "designer",
			subTabs: [
				{ label: "预约单", value: "all", icon: "https://bioflex.cn/static/calendar-schedule-line@3x.png", subtitle: "你的预约订单" },
				{ label: "优惠券", value: "coupon", icon: "https://bioflex.cn/static/coupon-line@3x.png", subtitle: "更多折扣等你" },
				{ label: "会员", value: "vip", icon: "https://bioflex.cn/static/vip-line@3x.png", subtitle: "VIP平台特权" },
				{ label: "入驻中", value: "service", icon: "https://bioflex.cn/static/service-line@3x.png", subtitle: "诚邀全球设计师" }
			],
			activeSubTab: "all",
			portfolioItems: [
				{
					image: "https://bioflex.cn/static/组 25@3x.png",
					overlay: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-177-1.svg",
					gradient: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-179.svg",
					label: "WOMAN",
					count: "12,349+",
					align: "left",
				},
				{
					image: "https://bioflex.cn/static/组 26@3x.png",
					overlay: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-178.svg",
					gradient: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-180.svg",
					label: "MAN",
					count: "12,349+",
					align: "right",
				},
			],
			designerTabs: ["首席创意", "总监店长", "人气名师", "国际导师"],
			activeDesignerTab: 0,
			designersByTab: {},
			brandTabs: ["专业店", "品牌店", "工作室", "综合店"],
			activeBrandTab: "专业店",
			allBrands: {},
			serviceTabs: ["全部", "洗吹", "剪发", "烫发", "染发", "护发", "头皮", "接发"],
			activeServiceTab: "全部",
			showServiceDropdown: false,
			allServices: [],
		}
	},
	computed: {
		filteredServices() {
			if (this.activeServiceTab === "") {
				return this.allServices
			}
			return this.allServices.filter(service => service.category === this.activeServiceTab)
		},
		filteredBrands() {
			return this.allBrands[this.activeBrandTab] || []
		},
		currentDesigners() {
			return this.designersByTab[this.activeDesignerTab] || []
		}
	},
	mounted() {
		this.getUserLocation()
		this.loadData()
	},
	activated() {
		this.getUserLocation()
		this.loadData()
	},
	methods: {
		async getUserLocation() {
			try {
				const location = await getCurrentLocation()
				if (location) {
					this.userLatitude = location.latitude
					this.userLongitude = location.longitude
					// 如果已经加载了数据，更新距离
					if (Object.keys(this.designersByTab).length > 0 || Object.keys(this.allBrands).length > 0 || this.allServices.length > 0) {
						this.loadData()
					}
				}
			} catch (err) {
				console.error('获取位置失败:', err)
			}
		},
		switchMainTab(value) {
			this.activeMainTab = value
			//  Tab 
			if (value === 'designer') {
				uni.navigateTo({ url: '/pages/main/index?tab=designer' })
			} else if (value === 'service') {
				uni.navigateTo({ url: '/pages/main/index?tab=service' })
			} else if (value === 'brand') {
				uni.navigateTo({ url: '/pages/main/index?tab=brand' })
			}
		},
		switchSubTab(tab) {
			this.activeSubTab = tab
		},
		handleQuickAction(action, index) {
			let url = ''
			if (action.title === '') {
				url = '/pages/main/index?tab=designer'
			} else if (action.title === '') {
				url = '/pages/main/index?tab=service'
			} else if (action.title === '') {
				url = '/pages/main/index?tab=brand'
			}
			
			if (url) {
				console.log(':', url)
				uni.navigateTo({
					url: url,
					success: (res) => {
						console.log(':', res)
					},
					fail: (err) => {
						console.error(':', err)
						uni.showToast({
							title: ': ' + (err.errMsg || ''),
							icon: 'none',
							duration: 2000
						})
					}
				})
			}
		},
		handleSectionHeaderClick(section) {
			//  main 
			let url = ''
			if (section === 'designer') {
				url = '/pages/main/index?tab=designer'
			} else if (section === 'service') {
				url = '/pages/main/index?tab=service'
			} else if (section === 'brand') {
				url = '/pages/main/index?tab=brand'
			}
			
			if (url) {
				console.log(':', url)
				uni.navigateTo({
					url: url,
					success: (res) => {
						console.log(':', res)
					},
					fail: (err) => {
						console.error(':', err)
						uni.showToast({
							title: ': ' + (err.errMsg || ''),
							icon: 'none',
							duration: 2000
						})
					}
				})
			}
		},
		handleServiceTabClick(tab) {

			this.activeServiceTab = tab
		},
		toggleServiceDropdown() {
			this.showServiceDropdown = !this.showServiceDropdown
		},
		selectServiceType(tab) {
			this.activeServiceTab = tab
			this.showServiceDropdown = false
		},
		handleDesignerClick(designer) {
			uni.navigateTo({
				url: `/pages/designer/detail?id=${designer.id || 1}&name=${encodeURIComponent(designer.name || '')}`
			})
		},
		handleDesignerTabClick(index) {
			this.activeDesignerTab = index
		},
		handleBrandTabClick(tab) {
			// 
			this.activeBrandTab = tab
		},
		handleBrandClick(brand) {
			if (!brand.id) {
				uni.showToast({ title: '', icon: 'none' })
				return
			}
			uni.navigateTo({
				url: `/pages/brand/detail?id=${brand.id}&name=${encodeURIComponent(brand.name || '')}`
			})
		},
		handleBottomAction(action, index) {
			// 
			if (action.title === '') {
				uni.navigateTo({
					url: '/packageOthers/pages/coupon/index'
				})
			} else if (action.title === '') {
				uni.navigateTo({
					url: '/packageOrder/pages/order/index?tab=pending-use'
				})
			} else if (action.title === '') {
				// 
				return
			} else if (action.title === '') {
				// 
				uni.navigateTo({
					url: '/packageMine/pages/mine/apply-settlement'
				})
			}
		},
		handleNearbyDesignerClick() {
			//  - main/indextabs
			uni.navigateTo({
				url: '/pages/main/index?tab=designer&scrollTo=nearby'
			})
		},
		handleDesignerSectionClick() {
			// main/indextabs
			uni.navigateTo({
				url: '/pages/main/index?tab=designer&scrollTo=nearby'
			})
		},
		handlePortfolioHeaderClick() {
			// 
			uni.navigateTo({
				url: '/packageOthers/pages/portfolio/index'
			})
		},
		handlePortfolioItemClick(item, index) {
			// index 0 index 1 
			const category = index === 0 ? 'women' : 'men'
			uni.navigateTo({
				url: `/packageOthers/pages/portfolio/index?category=${category}`
			})
		},
		handleServiceCardClick(service) {
			// 
			uni.navigateTo({
				url: `/packageOrder/pages/order/purchase?id=${service.id}`
			})
		},

		//
		async loadData() {
			if (this.loading) return
			this.loading = true
			try {
				await Promise.all([
					this.loadDesigners(),
					this.loadBrands(),
					this.loadServices()
				])
			} catch (err) {
				console.error('加载数据失败:', err)
			} finally {
				this.loading = false
			}
		},

		//
		async loadDesigners() {
			try {
				console.log('开始加载设计师数据...')
				const res = await api.designer.getList({ page: 1, pageSize: 50 })
				console.log('设计师API响应:', res)
				if (res.code === 200) {
					const list = res.data?.list || res.data?.items || []
					console.log('设计师列表数据:', list.length, '条')
					this.designersByTab = this.groupDesignersByLevel(list)
					console.log('分组后的设计师:', this.designersByTab)
				} else {
					console.error('设计师API返回错误:', res.message)
				}
			} catch (err) {
				console.error('加载设计师失败:', err)
			}
		},

		// 
		groupDesignersByLevel(designers) {
			const groups = { 0: [], 1: [], 2: [], 3: [] }
			//  professional_level  tab 
			const levelMap = {
				1: 0, //  -> 
				2: 0,
				3: 1,
				4: 2,
				5: 3,
			}

			designers.forEach(item => {
				const level = item.professional_level || item.designerLevel || 1
				const groupIndex = levelMap[level] !== undefined ? levelMap[level] : 0
				const designer = this.formatDesignerData(item, level)
				if (groups[groupIndex]) {
					groups[groupIndex].push(designer)
				}
			})

			// 
			return groups
		},

		//
		formatDesignerData(data, level = 1) {
			const tabs = ["", "", "", ""]
			const levelMap = {
				1: 0, //
				2: 0, //
				3: 1,
				4: 2, //
				5: 3, //
			}
			const tabIndex = levelMap[level] !== undefined ? levelMap[level] : 0

			// 设计师姓名
			const name = data.real_name || data.name || '设计师'
			// 使用 ui-avatars 生成头像
			const avatarUrl = data.avatar || data.coverImage || data.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=DACBB1&color=645E57&size=320`

			// 计算距离
			let distance = ''
			if (this.userLatitude && this.userLongitude && data.latitude && data.longitude) {
				distance = calculateDistance(this.userLatitude, this.userLongitude, data.latitude, data.longitude)
			} else {
				distance = data.distance || ''
			}

			return {
				id: data.id,
				image: avatarUrl,
				name: name,
				position: data.position || '',
				level: this.getLevelText(data.professional_level),
				levelValue: level,
				tabIndex: tabIndex,
				tabName: tabs[tabIndex],
				title: data.title || '',
				rating: String(data.rating || 0),
				appointments: String(data.total_appointments || 0),
				distance: distance,
				workYears: data.work_years || 0,
				locationDesc: data.location_desc || '',
				expertise: data.expertise || '',
				introduction: data.introduction || '',
				followers: data.followers || 0
			}
		},

		// 计算两点间的距离（km）
		calculateDistance(lat1, lng1, lat2, lng2) {
			if (!lat1 || !lng1 || !lat2 || !lng2) return ''
			const R = 6371 // 地球半径（km）
			const dLat = this.deg2rad(lat2 - lat1)
			const dLng = this.deg2rad(lng2 - lng1)
			const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
				Math.sin(dLng / 2) * Math.sin(dLng / 2)
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
			const distance = R * c
			return distance > 1 ? distance.toFixed(1) + 'km' : distance.toFixed(1) + 'km'
		},

		// 角度转弧度
		deg2rad(deg) {
			return deg * (Math.PI / 180)
		},

		//
		getLevelText(level) {
			const levelNum = Number(level)
			const levelMap = {
				1: '初级',
				2: '中级',
				3: '高级',
				4: '资深',
				5: '专家'
			}
			return levelMap[levelNum] || ''
		},

		// 
		async loadBrands() {
			try {
				const res = await api.brand.getList({ page: 1, pageSize: 50 })
				if (res.code === 200) {
					const list = res.data?.list || res.data?.items || []

					this.allBrands = this.groupBrandsByNature(list)
				}
			} catch (err) {
				console.error(':', err)
			}
		},

		groupBrandsByNature(brands) {
			const groups = {
				'专业店': [],
				'品牌店': [],
				'工作室': [],
				'综合店': []
			}

			const natureMap = {
				// 专业店
				'专业美发': '专业店',
				// 品牌店
				'品牌连锁': '品牌店',
				// 工作室
				'独立工作室': '工作室',
				// 综合店
				'综合美业': '综合店',
				// 默认
				'': '专业店'
			}

			brands.forEach(item => {
				const businessMode = item.business_mode || ''
				const brandType = item.brand_type || ''
				const venueType = item.venue_type || ''
				const mainServices = item.main_services || ''

				//  +
				const isComprehensive = (venueType.includes('综合') && mainServices.includes('美')) ||
						(brandType === '综合' && mainServices.length > 10)

				let groupKey = natureMap[businessMode] || natureMap[brandType]

				if (isComprehensive) {
					groupKey = '综合店'
				} else if (!groupKey) {
					groupKey = '专业店' //
				}

				const brand = this.formatBrandData(item, groupKey)
				if (groups[groupKey]) {
					groups[groupKey].push(brand)
				}
			})

			//
			return groups
		},

		//
		formatBrandData(data, groupKey = '') {
			// 将分组名映射为模板中的brandType
			const brandTypeMap = {
				'专业店': '',
				'品牌店': 'brand-store',
				'工作室': 'studio',
				'综合店': 'comprehensive'
			}
			const brandType = brandTypeMap[groupKey] || ''

			// 计算距离
			let distance = ''
			if (this.userLatitude && this.userLongitude && data.latitude && data.longitude) {
				distance = calculateDistance(this.userLatitude, this.userLongitude, data.latitude, data.longitude)
			} else {
				distance = data.distance || ''
			}

			return {
				id: data.id,
				image: data.coverImage || data.image || '',
				name: data.brand_intro || data.name || '',
				rating: String(data.rating || 0),
				reviews: String(data.appointment_count || 0),
				address: data.location_desc || '',
				distance: distance,
				category: data.brand_type || data.business_mode || '',
				brandType: brandType,
				targetCustomer: data.target_customer || '',
				mainServices: data.main_services || '',
				designerCount: data.designer_count || 0,
				venueType: data.venue_type || ''
			}
		},

		// 
		async loadServices() {
			try {
				const res = await api.service.getList({ page: 1, pageSize: 20 })
				if (res.code === 200) {
					const list = res.data?.list || res.data?.items || []
					this.allServices = list.map(item => this.formatServiceData(item))
				}
			} catch (err) {
				console.error(':', err)
			}
		},

		//
		formatServiceData(data) {
			const image = Array.isArray(data.image_urls) && data.image_urls.length > 0
				? data.image_urls[0]
				: (data.coverImage || data.image || '')

			// category_id
			const categoryMap = {
				'019400a0-0001-7000-8000-000000000011': '',
				'019400a0-0001-7000-8000-000000000012': '',
				'019400a0-0001-7000-8000-000000000013': '',
				'019400a0-0001-7000-8000-000000000003': '',
				'019400a0-0001-7000-8000-000000000021': '',
				'019400a0-0001-7000-8000-000000000022': '',
				'019400a0-0001-7000-8000-000000000004': '',
				'019400a0-0001-7000-8000-000000000005': ''
			}
			const category = categoryMap[data.category_id] || data.category || data.categoryName || ''

			// 从 skus 数组获取价格
			const firstSku = Array.isArray(data.skus) && data.skus.length > 0 ? data.skus[0] : {}
			const skuSellPrice = firstSku.sell_price || firstSku.price || ''
			const skuRefPrice = firstSku.ref_price || ''

			// 设计师信息 - 支持多种字段名
			const designerName = data.designerName || data.designer_name || data.designer?.name || data.designer?.real_name || '设计师'
			const designerAvatar = data.designerAvatar || data.designer_avatar || data.designer?.avatar || ''
			const designerRole = data.designerRole || data.designer_role || data.designer?.position || data.designer?.title || data.categoryName || '造型师'

			return {
				id: data.id,
				image: image,
				title: data.name || data.serviceName || '',
				category: category,
				description: data.detail_text || data.description || '',
				// price 为原价（ref_price），appointmentPrice 为销售价（sell_price）
				// 优先从 skus 获取，其次用 fixed_price/fixed_ref_price
				price: String(skuRefPrice || data.fixed_ref_price || skuSellPrice || data.fixed_price || 0),
				appointmentPrice: String(skuSellPrice || data.fixed_price || skuRefPrice || data.fixed_ref_price || 0),
				designerName: designerName,
				designerRole: designerRole,
				rating: String(data.rating || data.designer?.rating || 0),
				reviews: String(data.review_count || data.reviewCount || data.soldCount || 0),
				distance: (this.userLatitude && this.userLongitude && data.latitude && data.longitude)
					? calculateDistance(this.userLatitude, this.userLongitude, data.latitude, data.longitude)
					: (data.distance || ''),
				avatar: designerAvatar
			}
		},
	},
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
	padding: 0 30rpx 20rpx;
}

.bottom-action-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6rpx;

	&.disabled {
		opacity: 0.4;
	}
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

 
.top-tab-section {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.main-tabs {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	gap: 12rpx;
}

.main-tab-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10rpx;
	position: relative;
	flex: 1;
	height: 268rpx;
	padding: 0;
	border-radius: 12rpx;
	background-color: #ffffff;
}

.main-tab-icon {
	width: 128rpx;
	height: 128rpx;
}

.main-tab-text-img {
	width: 100rpx;
	height: 32rpx;
}

.main-tab-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #cccccc;
}

.sub-tabs-scroll {
	width: 100%;
	white-space: nowrap;
}

.sub-tabs-container {
	background-color: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16rpx;
	width: auto;
	min-width: 100%;
	flex-wrap: nowrap;
	padding: 20rpx 16rpx;
	border-radius: 12rpx;
	box-sizing: border-box;
}

.sub-tab-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	padding: 16rpx 0;
	background-color: transparent;
	border: none;
	font-size: 24rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: 500;
	color: #000000;
	white-space: nowrap;
}


.sub-tab-icon {
	width: 88rpx;
	height: 88rpx;
	padding: 20rpx;
	box-sizing: border-box;
	background: linear-gradient(180deg, #F6F6F6 0%, #FFFFFF 100%);
	border-radius: 50%;
}

.sub-tab-text {
	white-space: nowrap;
	font-size: 24rpx;
}

.sub-tab-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #cccccc;
	white-space: nowrap;
}
         
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
	font-size: 32rpx;
	font-weight: 700;
	color: #000000;
	position: relative;
	z-index: 2;
}

.title-wrapper {
	display: flex;
	flex-direction: column;
}

.title-bar {
	width: 74rpx;
	height: 12rpx;
	background-color: #DACBB1;
	margin-top: -14rpx;
	position: relative;
	z-index: 1;
}

.more-icon {
	width: 44rpx;
	height: 44rpx;
}

 
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
	bottom: 0;
	height: 48rpx;
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
	font-size: 28rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: 400;
	color: #a6a6a6;
}

.tab-item.active {
	color: #333333;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: 600;
}

.designers-tabs-scroll {
	width: 100%;
	white-space: nowrap;
}

.designers-list-scroll {
	width: 100%;
	white-space: nowrap;
	box-sizing: border-box;
	-webkit-overflow-scrolling: touch;
}

.designers-list-container {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.empty-placeholder {
	width: 100%;
	min-height: 200rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.empty-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #a6a6a6;
}

.designer-card {
	flex: 0 0 346rpx;
	width: 346rpx;
	border: 2rpx solid #f3f3f3;
	border-radius: 8rpx;
	overflow: hidden;
}

.designer-img-wrapper {
	position: relative;
	width: 100%;
	height: 346rpx;
}

.designer-img-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 346rpx;
	background: linear-gradient(180deg, rgba(244, 244, 244, 1) 0%);
}

.designer-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 346rpx;
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

.designer-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	color: #a6a6a6;
	font-weight: 500;
}

.designer-title-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.title-separator {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	color: #dacbb1;
	font-weight: 500;
}

.designer-title-row .work-years {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	color: #a6a6a6;
	font-weight: 500;
}

.designer-badge {
	padding: 4rpx 8rpx;
	border-radius: 4rpx;
	filter: brightness(0) invert(1);
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
	font-weight: 600;
}

.star {
	font-size: 20rpx;
	color: #333333;
}

.star-container {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4rpx;
	background-color: #333333;
	border-radius: 4rpx;
}

.star-icon {
	width: 20rpx;
	height: 20rpx;
	filter: brightness(0) invert(1);
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

.designer-location {
	display: flex;
	align-items: center;
	gap: 8rpx;
	margin-top: 4rpx;
}

.designer-location .location-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #666666;
}

.designer-location .separator {
	font-size: 20rpx;
	color: #cccccc;
}

.designer-location .work-years-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #666666;
}


.brands-scroll {
	width: 100%;
	white-space: nowrap;
	box-sizing: border-box;
	 
	-webkit-overflow-scrolling: touch;
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

.brand-img-bg-dark {
	background: linear-gradient(180deg, rgba(230, 230, 230, 1) 0%);
}

.brand-img-bg-light {
	background: linear-gradient(180deg, rgba(250, 250, 250, 1) 0%);
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

.brand-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
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
	gap: 6rpx;
	justify-content: flex-start;
	width: 100%;
}

.location-icon {
	width: 28rpx;
	height: 28rpx;
	flex-shrink: 0;
}

.address-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	color: #666666;
	font-weight: 500;
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.brand-address .distance {
	margin-left: 8rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #a6a6a6;
	white-space: nowrap;
}

.brand-overlay {
	position: absolute;
	top: 0;
	left: 202rpx;
	width: 54rpx;
	height: 402rpx;
	background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 61%, rgba(255, 255, 255, 0) 100%);
}

 
.brand-card.brand-store {
	border: 2rpx solid #dacbb1;
}

.brand-card.brand-store .brand-tag {
	position: absolute;
	top: 16rpx;
	left: 16rpx;
	background-color: #dacbb1;
	color: #645e57;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 20rpx;
	font-weight: 500;
	padding: 4rpx 12rpx;
	border-radius: 4rpx;
	filter: brightness(0) invert(1);
}

.brand-card.brand-store .rating-score.primary,
.brand-card.brand-store .star.primary {
	color: #dacbb1;
}

.brand-card.brand-store .brand-meta {
	display: flex;
	align-items: center;
	gap: 8rpx;
	margin-top: 4rpx;
}

.brand-card.brand-store .meta-item {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #a6a6a6;
}

.brand-card.brand-store .meta-divider {
	color: #e5e5e5;
	font-size: 20rpx;
}

 
.brand-card.studio {
	flex: 0 0 420rpx;
	width: 420rpx;
}

.brand-card.studio .studio-info {
	padding: 22rpx 22rpx 16rpx;
}

.brand-card.studio .studio-name {
	font-size: 30rpx;
}

.brand-card.studio .studio-service {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #a6a6a6;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.brand-card.studio .studio-rating {
	margin-top: 4rpx;
}

 
.brand-card.comprehensive {
	flex: 0 0 420rpx;
	width: 420rpx;
	border: 2rpx solid #333333;
}

.brand-card.comprehensive .comprehensive-badge {
	position: absolute;
	top: 16rpx;
	right: 16rpx;
	background-color: #333333;
	color: #ffffff;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 20rpx;
	font-weight: 500;
	padding: 4rpx 12rpx;
	border-radius: 4rpx;
	filter: brightness(0) invert(1);
}

.brand-card.comprehensive .comprehensive-info {
	gap: 8rpx;
}

.brand-card.comprehensive .comprehensive-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.brand-card.comprehensive .venue-type-tag {
	background-color: #f6f6f6;
	color: #666666;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	padding: 4rpx 8rpx;
	border-radius: 4rpx;
	filter: brightness(0) invert(1);
}

.brand-card.comprehensive .comprehensive-services {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.brand-card.comprehensive .services-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #a6a6a6;
}

.brand-card.comprehensive .services-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	color: #666666;
	font-weight: 500;
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

 
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
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.dropdown-wrapper {
	display: flex;
	align-items: center;
	gap: 8rpx;
	padding: 12rpx 20rpx;
	border-radius: 24rpx;
	position: relative;
}

.dropdown-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	color: #333333;
	font-weight: 500;
}

.dropdown-arrow {
	width: 24rpx;
	height: 24rpx;
	transition: transform 0.3s ease;
}

.dropdown-arrow.rotate {
	transform: rotate(180deg);
}

.dropdown-menu {
	position: absolute;
	top: 100%;
	right: 0;
	margin-top: 12rpx;
	background-color: #ffffff;
	border-radius: 12rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
	min-width: 180rpx;
	z-index: 100;
	overflow: hidden;
}

.dropdown-item {
	padding: 20rpx 24rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #666666;
	white-space: nowrap;
}

.dropdown-item.active {
	color: #333333;
	background-color: #f6f6f6;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
}

.services-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-size: 32rpx;
	font-weight: 700;
	color: #000000;
	position: relative;
	z-index: 2;
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
	color: #333333;
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
	height: 620rpx;
	display: flex;
	flex-direction: column;
}

.service-img {
	width: 340rpx;
	height: 340rpx;
	border-radius: 12rpx 12rpx 0 0;
}

.service-info {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
	margin-top: auto;
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
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.service-price {
	font-weight: 600;
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

.appointment-price-tag {
	font-family: 'PingFang_SC-Regular', Helvetica;
	background-color: #dacbb1;
	font-size: 20rpx;
	color: #645E57;
	padding: 2rpx 8rpx;
	border-radius: 4rpx;
	margin-left: 12rpx;
}

.service-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.service-designer {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.service-avatar {
	width: 44rpx;
	height: 44rpx;
	border-radius: 50%;
	overflow: hidden;
	flex-shrink: 0;
}

.avatar-img-small {
	background-color: #a6a6a6;
	width: 100%;
	height: 100%;
}

.designer-details {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.designer-name-row {
	display: flex;
	align-items: baseline;
	gap: 6rpx;
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
	font-weight: 600;
}

.star-container-small {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 3rpx;
	background-color: #333333;
	border-radius: 4rpx;
}

.star-icon-small {
	width: 18rpx;
	height: 18rpx;
	filter: brightness(0) invert(1);
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
	flex-shrink: 0;
	margin-left: 8rpx;
}


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

