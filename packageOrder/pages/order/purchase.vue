<template>
	<view class="service-purchase-page">
		<scroll-view class="page-scroll" scroll-y enable-back-to-top>
			<!-- 头部背景图片 -->
			<view class="header-section">
				<image
					class="header-bg-image"
					src="https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png"
					mode="aspectFill"
				></image>

				<!-- 自定义导航栏 -->
				<view class="custom-navbar" >
					<view class="navbar-content">
						<view class="back-btn" @click="handleBack">
							<image
								class="back-icon"
								src="https://c.animaapp.com/mifnbli6udxphC/img/frame-1877.svg"
								mode="aspectFit"
							></image>
						</view>
						<text class="nav-title">洗剪吹</text>
					</view>
				</view>

				<!-- 右上角详情区域 -->
				<ServicePurchaseDetailsSection :current-page="currentPage" :total-pages="totalPages" />
			</view>

			<!-- 主内容区域 -->
			<view class="content-wrapper">
				<ServicePurchaseProfileSection ref="profileSection" :service-data="serviceData" @favorite-change="handleFavoriteChange" />
			</view>
		</scroll-view>

		<!-- 底部导航栏 -->
		<ServicePurchaseFooter
			:service-id="serviceId"
			:designer-id="serviceData.designer ? serviceData.designer.id : ''"
			:is-favorited="isFavorited"
			@favorite-change="handleFooterFavoriteChange"
		/>
	</view>
</template>

<script>
import ServicePurchaseDetailsSection from '../../../components/order/purchase/ServicePurchaseDetailsSection.vue'
import ServicePurchaseProfileSection from '../../../components/order/purchase/ServicePurchaseProfileSection.vue'
import ServicePurchaseFooter from '../../../components/order/purchase/ServicePurchaseFooter.vue'
import api from '@/api'

export default {
	components: {
		ServicePurchaseDetailsSection,
		ServicePurchaseProfileSection,
		ServicePurchaseFooter
	},
	data() {
		return {
						serviceId: '',
			isFavorited: false,
			loading: true,
			serviceData: {},
			headerImages: [],
			currentImageIndex: 0
		}
	},
	computed: {
		currentPage() {
			return this.currentImageIndex + 1
		},
		totalPages() {
			return this.headerImages.length
		}
	},
	onLoad(options) {
		// 从持久化存储获取状态栏高度
		if (options.id) {
			this.serviceId = options.id
			this.fetchServiceDetail(options.id)
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		handleFavoriteChange(isFavorited) {
			this.isFavorited = isFavorited
		},
		handleFooterFavoriteChange(isFavorited) {
			this.isFavorited = isFavorited
			if (this.$refs.profileSection) {
				this.$refs.profileSection.isFavorited = isFavorited
			}
		},
		// 获取服务详情
		async fetchServiceDetail(serviceId) {
			this.loading = true
			try {
				const res = await api.service.getDetail(serviceId)
				if (res.code === 0 && res.data) {
					const service = res.data
					// 头部图片
					this.headerImages = service.images || [service.cover || service.image]
					// 服务数据传给子组件
					this.serviceData = {
						id: service.id,
						name: service.name || service.title || '',
						fullTitle: service.fullTitle || service.name || service.title || '',
						price: service.price || 0,
						soldCount: service.soldCount || service.sales || 0,
						isFavorited: service.isFavorited || false,
						// 优惠券信息
						coupons: (service.coupons || []).map(c => ({
							id: c.id,
							text: c.text || c.title || ''
						})),
						// 设计师信息
						designer: service.designer ? {
							id: service.designer.id,
							name: service.designer.name || '',
							avatar: service.designer.avatar || '',
							badge: service.designer.badge || service.designer.level || '',
							role: service.designer.role || service.designer.title || '',
							rating: service.designer.rating || 5.0,
							serviceCount: service.designer.serviceCount || 0,
							worksCount: service.designer.worksCount || 0
						} : null,
						// 服务内容
						serviceItems: (service.items || service.serviceItems || []).map(item => ({
							name: item.name || item.title || '',
							quantity: item.quantity || item.value || ''
						})),
						// 温馨提示
						warmTips: service.warmTips || service.tips || [],
						// 图文详情
						detailImages: service.detailImages || service.details || [],
						// 评价标签
						reviewTags: (service.reviewTags || []).map(tag => ({
							text: tag.text || tag.name || '',
							count: tag.count || 0,
							active: tag.active || false
						})),
						// 评价列表
						reviews: (service.reviews || []).map(review => ({
							image: review.image || review.cover || '',
							title: review.title || '',
							rating: review.rating || 5.0,
							content: review.content || review.text || '',
							avatar: review.avatar || review.userAvatar || '',
							author: review.author || review.userName || '',
							date: review.date || review.createTime || ''
						})),
						// 问答
						questions: service.questions || [],
						questionCount: service.questionCount || (service.questions || []).length,
						// 推荐服务
						recommendedServices: (service.recommendedServices || []).map(s => ({
							id: s.id,
							image: s.image || s.cover || '',
							title: s.title || s.name || '',
							description: s.description || s.desc || '',
							price: s.price || 0,
							avatar: s.designer?.avatar || s.avatar || '',
							stylistName: s.designer?.name || s.stylistName || '',
							stylistRole: s.designer?.role || s.stylistRole || '',
							rating: s.rating || 5.0,
							reviewCount: s.reviewCount || 0,
							distance: s.distance || ''
						}))
					}
					this.isFavorited = service.isFavorited || false
				}
			} catch (err) {
				console.error('获取服务详情失败:', err)
			} finally {
				this.loading = false
			}
		}
	}
}
</script>

<style scoped lang="scss">
.service-purchase-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.page-scroll {
	flex: 1;
	width: 100%;
}

.header-bg-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

// 自定义导航栏
.custom-navbar {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 30;
}

.navbar-content {
	display: flex;
	align-items: center;
	padding: 24rpx 32rpx;
	box-sizing: border-box;
	gap: 24rpx;
}

.back-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 64rpx;
	height: 64rpx;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 50%;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
}

.nav-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #ffffff;
}

.content-wrapper {
	position: relative;
	top: -40rpx;
	width: 100%;
	min-height: calc(100vh - 460rpx);
	background-color: #f2f2f2;
	border-radius: 40rpx 40rpx 0 0;
	padding-top: 40rpx;
	opacity: 0;
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 600ms;
}

@keyframes fadeIn {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>






