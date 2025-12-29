<template>
	<view class="service-purchase-page">
		<scroll-view class="page-scroll" scroll-y enable-back-to-top>
			<!-- 头部背景图片 -->
			<view class="header-section">
				<image
					class="header-bg-image"
					:src="headerImages[0] || 'https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png'"
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
						<text class="nav-title">{{ serviceData.name || '服务详情' }}</text>
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
			:service-data="serviceData"
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
		
		async fetchServiceDetail(serviceId) {
			this.loading = true
			try {
				const res = await api.service.getDetail(serviceId)
				if (res.code === 200 && res.data) {
					const service = res.data

					// 头部图片 - 支持 image_urls 数组或单个图片
					this.headerImages = service.image_urls || service.images || [service.cover || service.image]

					// 计算价格 - 优先使用第一个 SKU 的价格，否则使用固定价格
					const firstSku = service.skus && service.skus.length > 0 ? service.skus[0] : null
					const price = firstSku ? parseFloat(firstSku.sell_price) : parseFloat(service.fixed_price) || 0
					const refPrice = firstSku ? parseFloat(firstSku.ref_price) : parseFloat(service.fixed_ref_price) || price

					// 将 SKUs 转换为服务项目列表
					const serviceItems = (service.skus || []).map(sku => ({
						name: sku.sku_name || sku.name || '',
						quantity: `¥${sku.sell_price}`
					}))

					// 温馨提示 - 从 notice_text 生成数组
					const warmTips = []
					if (service.notice_text) {
						warmTips.push(service.notice_text)
					}
					if (service.detail_text) {
						warmTips.push(service.detail_text)
					}
					if (service.is_seven_day_guarantee) {
						warmTips.push('支持7天无理由退款')
					}
					if (service.duration_min) {
						warmTips.push(`预计服务时长：${service.duration_min}分钟`)
					}

					this.serviceData = {
						id: service.id,
						name: service.name || service.title || '',
						fullTitle: service.fullTitle || service.name || service.title || '',
						price: price,
						appointmentPrice: refPrice,
						soldCount: service.sold_count || service.soldCount || service.sales || 0,
						isFavorited: service.isFavorited || service.is_favorited || false,
						rating: service.rating || 5.0,
						reviewCount: service.review_count || service.reviewCount || 0,
						tags: service.tag_ids || service.tags || [],

						// 优惠券 - 如果后端返回了就使用，否则为空
						coupons: (service.coupons || []).map(c => ({
							id: c.id,
							text: c.text || c.title || c.name || ''
						})),

						// 设计师信息 - 支持新的扁平化字段和嵌套对象
						designer: (service.designer_name || service.designer) ? {
							id: service.user_id || service.designer_id || (service.designer && service.designer.id) || '',
							name: service.designer_name || (service.designer && service.designer.name) || '',
							avatar: service.designer_avatar || (service.designer && service.designer.avatar) || '',
							badge: service.designer_badge || (service.designer && (service.designer.badge || service.designer.level)) || '',
							role: service.designer_role || (service.designer && (service.designer.role || service.designer.title)) || '设计师',
							rating: service.designer_rating || (service.designer && service.designer.rating) || service.rating || 5.0,
							serviceCount: service.designer_service_count || (service.designer && service.designer.serviceCount) || 0,
							worksCount: service.designer_works_count || (service.designer && service.designer.worksCount) || 0
						} : null,

						// 服务项目 - 从 SKUs 生成
						serviceItems: serviceItems,

						// 温馨提示
						warmTips: warmTips.length > 0 ? warmTips : (service.warmTips || service.tips || []),

						// 详情图片
						detailImages: service.detail_images || service.detailImages || service.image_urls || service.details || [],

						// 评价标签
						reviewTags: (service.reviewTags || service.review_tags || []).map(tag => ({
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
							avatar: review.avatar || review.userAvatar || review.user_avatar || '',
							author: review.author || review.userName || review.user_name || '',
							date: review.date || review.createTime || review.create_time || ''
						})),

						// 问答
						questions: service.questions || [],
						questionCount: service.questionCount || service.question_count || (service.questions || []).length,

						// 推荐服务
						recommendedServices: (service.recommendedServices || service.recommended_services || []).map(s => ({
							id: s.id,
							image: s.image || s.cover || (s.image_urls && s.image_urls[0]) || '',
							title: s.title || s.name || '',
							description: s.description || s.desc || s.detail_text || '',
							price: parseFloat(s.price || s.fixed_price) || 0,
							avatar: s.designer_avatar || (s.designer && s.designer.avatar) || s.avatar || '',
							stylistName: s.designer_name || (s.designer && s.designer.name) || s.stylistName || '',
							stylistRole: s.designer_role || (s.designer && s.designer.role) || s.stylistRole || '',
							rating: s.rating || 5.0,
							reviewCount: s.review_count || s.reviewCount || 0,
							distance: s.distance || ''
						}))
					}
					this.isFavorited = service.isFavorited || service.is_favorited || false
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

.header-section {
	position: relative;
	width: 100%;
	height: 500rpx;
}

.header-bg-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}


.custom-navbar {
	position: absolute;
	top: 88rpx;
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






