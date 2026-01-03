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
			this.serviceData.isFavorited = isFavorited
		},
		handleFooterFavoriteChange(isFavorited) {
			this.isFavorited = isFavorited
			this.serviceData.isFavorited = isFavorited
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

					// 计算价格 - 优先使用固定价格 fixed_price 和 fixed_ref_price，其次从 skus 获取
					const firstSku = Array.isArray(service.skus) && service.skus.length > 0 ? service.skus[0] : {}
					const skuSellPrice = parseFloat(firstSku.sell_price) || 0
					const skuRefPrice = parseFloat(firstSku.ref_price) || 0

					const price = skuRefPrice || parseFloat(service.fixed_ref_price) || 0
					const appointmentPrice = skuSellPrice || parseFloat(service.fixed_price) || price

					// 将 SKUs 转换为服务项目列表
					const serviceItems = (service.skus || []).map(sku => ({
						name: sku.sku_name || sku.name || '',
						quantity: `*${sku.quantity || sku.count || 1}`
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

					// 获取设计师信息 - 通过 designer_id 直接获取详情
					let designerInfo = null
					const designerId = service.designer_id || service.user_id
					const levelMap = { 1: '初级', 2: '中级', 3: '高级', 4: '导师', 5: '名师' }
					const pricingMode = service.pricing_mode || 1

					try {
						if (designerId) {
							// 直接通过 designer_id 获取设计师详情
							const designerRes = await api.designer.getDetail(designerId)
							console.log('设计师详情响应:', designerRes)
							if (designerRes.code === 200 && designerRes.data) {
								const data = designerRes.data
								designerInfo = {
									id: data.id,
									name: data.real_name || data.name || '',
									avatar: data.avatar || '',
									badge: data.title || data.position || '',
									role: data.position || '设计师',
									rating: data.rating || 5.0,
									serviceCount: data.total_appointments || 0,
									worksCount: data.followers || 0,
									level: levelMap[pricingMode] || '初级',
									workYears: data.work_years || 0
								}
							}
						}
					} catch (err) {
						console.error('获取设计师详情失败:', err)
					}

					// 如果没有获取到，回退到从列表匹配
					if (!designerInfo && !designerId) {
						try {
							const designerRes = await api.designer.getList({ page: 1, pageSize: 50 })
							console.log('设计师列表响应:', designerRes)
							let designerList = []
							if (designerRes.code === 200 && designerRes.data) {
								designerList = designerRes.data.list || designerRes.data.items || designerRes.data || []
							} else if (designerRes.list) {
								designerList = designerRes.list
							} else if (Array.isArray(designerRes)) {
								designerList = designerRes
							}

							if (designerList.length > 0) {
								const matchedDesigner = designerList[0]
								designerInfo = {
									id: matchedDesigner.id,
									name: matchedDesigner.real_name || matchedDesigner.name || '',
									avatar: matchedDesigner.avatar || '',
									badge: matchedDesigner.title || matchedDesigner.position || '',
									role: matchedDesigner.position || '设计师',
									rating: matchedDesigner.rating || 5.0,
									serviceCount: matchedDesigner.total_appointments || 0,
									worksCount: matchedDesigner.followers || 0,
									level: levelMap[pricingMode] || '初级',
									workYears: matchedDesigner.work_years || 0
								}
							}
						} catch (err) {
							console.error('获取设计师列表失败:', err)
						}
					}

					// 如果没有从设计师列表匹配到，使用服务详情中的数据
					if (!designerInfo && (service.designer_name || service.designer)) {
						const pricingMode = service.pricing_mode || 1
						const levelMap = { 1: '初级', 2: '中级', 3: '高级', 4: '导师', 5: '名师' }
						designerInfo = {
							id: service.user_id || service.designer_id || (service.designer && service.designer.id) || '',
							name: service.designer_name || (service.designer && service.designer.name) || '',
							avatar: service.designer_avatar || (service.designer && service.designer.avatar) || '',
							badge: service.designer_badge || (service.designer && (service.designer.badge || service.designer.level)) || '',
							role: service.designer_role || (service.designer && (service.designer.role || service.designer.title)) || '设计师',
							rating: service.designer_rating || (service.designer && service.designer.rating) || service.rating || 5.0,
							serviceCount: service.designer_service_count || (service.designer && service.designer.serviceCount) || 0,
							worksCount: service.designer_works_count || (service.designer && service.designer.worksCount) || 0,
							level: levelMap[pricingMode] || '初级',
							workYears: service.designer_work_years || (service.designer && service.designer.workYears) || 0
						}
					}

					this.serviceData = {
						id: service.id,
						name: service.name || service.title || '',
						fullTitle: service.fullTitle || service.name || service.title || '',
						price: price,
						appointmentPrice: appointmentPrice,
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

						// 设计师信息 - 从设计师列表接口获取
						designer: designerInfo,

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

					// 检查收藏状态 - 通过用户收藏列表
					try {
						const favoriteRes = await api.user.getFavorites({ type: 'service', page: 1, pageSize: 100 })
						if (favoriteRes.code === 200 && favoriteRes.data) {
							const favoriteList = favoriteRes.data.list || favoriteRes.data.items || favoriteRes.data || []
							const isFavorited = favoriteList.some(item => item.id === serviceId || item.service_id === serviceId)
							this.isFavorited = isFavorited
							this.serviceData.isFavorited = isFavorited
						}
					} catch (err) {
						// 如果未登录或接口出错，保持默认状态
						console.log('检查收藏状态失败:', err)
					}
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






