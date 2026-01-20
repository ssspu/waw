<template>
	<view class="info-page">
		<!-- 自定义导航栏 -->
		<view class="custom-navbar">
			<view class="navbar-content">
				<!-- Tab切换移入导航栏 -->
				<view class="navbar-tabs">
					<designer-info-profile-section
						:active-tab="activeTab"
						@tab-change="handleTabChange"
					></designer-info-profile-section>
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
			<!-- 详细内容 -->
			<view class="content-section">
				<designer-info-services-section 
					:active-tab="activeTab" 
					:designer-id="designerId"
					@phone="handlePhone"
				></designer-info-services-section>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
import DesignerInfoProfileSection from '../../components/designer/info/DesignerInfoProfileSection.vue'
import DesignerInfoServicesSection from '../../components/designer/info/DesignerInfoServicesSection.vue'
import { designerApi } from '@/api'

export default {
	components: {
		DesignerInfoProfileSection,
		DesignerInfoServicesSection
	},
	data() {
		return {
			statusBarHeight: 44,
			designerId: '',
			activeTab: 'designer',
			scrollTop: 0,
			scrollIntoViewId: '',
			oldScrollTop: 0,
			isScrolling: false,
			designerInfo: {},
			serviceBadges: [],
			statsData: [],
			businessInfo: {},
			shopInfo: {},
			promotions: [],
			rightStats: {},
			userLatitude: null,
			userLongitude: null
		}
	},
	onLoad(options) {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
		if (options.id) {
			this.designerId = options.id
			this.fetchDesignerDetail()
		}
		this.getUserLocation()
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
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
		},
		async fetchDesignerDetail() {
			if (!this.designerId) return

			try {
				const res = await designerApi.getDetail(this.designerId)
				if (res && res.code === 200 && res.data) {
					const list = res.data.items || res.data.list || []
					const data = list.find(item => item.id === this.designerId) || list[0]
					
					if (!data || !data.id) return

					const level = data.professional_level || 1
					const levelMap = {
						1: '初级',
						2: '中级',
						3: '高级',
						4: '导师',
						5: '名师'
					}
					
					this.designerInfo = {
						id: data.user_id || data.id || '',
						avatar: data.avatar || data.coverImage || '',
						name: data.real_name || data.name || '',
						verifyIcon: data.verifyIcon || '',
						role: data.position || data.role || '',
						level: levelMap[level] || '设计师',
						certIcon: data.certIcon || '',
						certText: data.certification || '',
						certDot: data.certDot || '',
						skills: data.expertise || (data.specialties ? data.specialties.join(',') : ''),
						introduction: data.introduction || ''
					}

					this.serviceBadges = ((data.service_features || data.tags) ? String(data.service_features || data.tags).split(/[,]/) : []).map(tag => ({
						icon: '',
						label: tag.trim()
					}))

					this.statsData = [
						{ value: String(data.total_appointments || data.appointmentCount || 0), label: "预约" },
						{ value: String(data.followers || data.followerCount || 0), label: "粉丝" },
						{ value: String(data.work_years || data.experience || 0), unit: "年", label: "从业" },
						{ value: String(data.rating || 0), unit: "分", label: "评分" }
					]

					this.shopInfo = {
						name: data.brand_name || data.brandName || 'NICE美发沙龙',
						address: data.location_desc || '成都市高新区天府五街',
						distance: '正在获取位置...',
						latitude: data.latitude || 30.5728,
						longitude: data.longitude || 104.0668,
						phone: data.contact_phone || '13800000000',
						image: data.shop_image || data.coverImage || 'https://c.animaapp.com/mi5d4lp0csJxnR/img/mask-group.png'
					}
					
					if (this.userLatitude && this.userLongitude) {
						this.updateDistance()
					}

					this.rightStats = {
						serviceIcon: data.serviceIcon || '',
						serviceCount: String(data.serviceCount || 0),
						workIcon: data.workIcon || '',
						workCount: String(data.worksCount || 0),
						dotIcon: data.dotIcon || ''
					}

					this.businessInfo = {
						status: '营业中',
						restDay: data.appointment_time || '',
						hours: data.work_hours || ''
					}

					this.promotions = (data.promotions || []).map(p => ({
						text: typeof p === 'string' ? p : (p.label || p.name || '')
					}))
				}
			} catch (error) {
				console.error('获取设计师详情失败:', error)
			}
		},
		async getUserLocation() {
			try {
				const res = await new Promise((resolve, reject) => {
					uni.getLocation({
						type: 'gcj02',
						success: resolve,
						fail: reject
					})
				})
				this.userLatitude = res.latitude
				this.userLongitude = res.longitude
				this.updateDistance()
			} catch (err) {
				console.error('获取位置失败:', err)
			}
		},
		updateDistance() {
			if (this.userLatitude && this.userLongitude && this.shopInfo.latitude && this.shopInfo.longitude) {
				const distance = this.calculateDistance(
					this.userLatitude, 
					this.userLongitude, 
					this.shopInfo.latitude, 
					this.shopInfo.longitude
				)
				this.shopInfo.distance = distance
			}
		},
		calculateDistance(lat1, lng1, lat2, lng2) {
			if (!lat1 || !lng1 || !lat2 || !lng2) return ''
			const R = 6371
			const dLat = (lat2 - lat1) * Math.PI / 180
			const dLng = (lng2 - lng1) * Math.PI / 180
			const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
				Math.sin(dLng / 2) * Math.sin(dLng / 2)
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
			const distance = R * c
			return `距您${distance.toFixed(1)}km`
		},
		handleFollow() {
			console.log('Follow clicked')
		},
		handlePhone() {
			if (this.shopInfo.phone) {
				uni.makePhoneCall({ phoneNumber: this.shopInfo.phone })
			}
		},
		handleNavigation() {
			if (this.shopInfo.latitude && this.shopInfo.longitude) {
				uni.openLocation({
					latitude: Number(this.shopInfo.latitude),
					longitude: Number(this.shopInfo.longitude),
					name: this.shopInfo.name,
					address: this.shopInfo.address
				})
			}
		},
		handleShare() {
			console.log('Share clicked')
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

.back-icon {
	width: 20rpx;
	height: 34rpx;
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
