<template>
	<view class="profile-section">
		<!-- 空数据状态 -->
		<view v-if="!loading && services.length === 0" class="empty-state">
			<image class="empty-icon" src="https://bioflex.cn/static/icon/empty-service.png" mode="aspectFit"></image>
			<text class="empty-text">暂无服务内容</text>
		</view>

		<!-- 加载状态 -->
		<view v-if="loading" class="loading-state">
			<text class="loading-text">加载中...</text>
		</view>

		<!-- 服务列表 -->
		<view v-if="!loading && services.length > 0" class="services-list">
			<view 
				v-for="service in services" 
				:key="service.id" 
				class="service-card"
			>
				<view class="service-content" :class="{ 'has-options': isExpanded(service.id) }">
					<image 
						class="service-image" 
						:src="service.image" 
						:alt="service.title" 
						mode="aspectFill"
					></image>
					
					<view class="service-info">
						<view class="service-details">
							<view class="service-header">
								<text class="service-title">{{ service.title }}</text>
							</view>
							<text class="service-description">{{ service.description }}</text>
							<view class="time-info">
								<text class="time-label">预计时间:</text>
								<text class="time-value">{{ service.estimatedTime }}</text>
							</view>
							<text class="sales-count">已售{{ service.salesCount }}</text>
						</view>
						
						<view class="service-pricing" :class="{ 'has-options': isExpanded(service.id) }">
							<view class="price-container">
								<text class="price-symbol">¥</text>
								<text class="price-value">{{ service.price }}</text>
							</view>
							<view v-if="service.discount" class="discount-badge">
								<text class="discount-text">{{ service.discount }}</text>
							</view>
							
							<view v-if="!isExpanded(service.id)" class="book-btn" @tap="toggleExpand(service.id)">
								<text class="book-text">在线预订</text>
							</view>
							<view v-else class="expand-btn" @tap="toggleExpand(service.id)">
								<image 
									class="options-icon" 
									src="https://bioflex.cn/static/icon/up.png" 
									mode="aspectFit"
								></image>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 选项区域（如果展值） -->
				<view v-if="isExpanded(service.id)" class="options-section">
					<!-- 头发长度选择 -->
					<view class="hair-length-options">
						<view 
							v-for="option in hairLengthOptions" 
							:key="option.id" 
							class="hair-length-btn"
							:class="{ active: getSelectedHairLength(service.id) === option.id }"
							@tap="selectHairLengthForService(service.id, option.id)"
						>
							<text>{{ option.label }}</text>
						</view>
					</view>
					
					<!-- 品牌选项 -->
					<view class="brand-options">
						<view 
							v-for="brand in getFilteredBrandOptions(service)" 
							:key="brand.id" 
							class="brand-item"
							@tap="selectBrand(service.id, brand.id)"
						>
							<view class="brand-info">
								<view class="brand-radio" :class="{ checked: getSelectedBrand(service, brand.id) }">
									<image v-if="getSelectedBrand(service, brand.id)" class="check-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg" mode="aspectFit"></image>
								</view>
								<text class="brand-name">{{ brand.name }}</text>
							</view>
							<view class="brand-price">
								<text v-if="brand.appointmentPrice" class="brand-appointment-price">预约价¥{{ brand.appointmentPrice }}</text>
								<view class="price-row">
									<text class="price-symbol">¥</text>
									<text class="price-value">{{ brand.price }}</text>
								</view>
							</view>
						</view>
					</view>
					
					<!-- 预订按钮 -->
					<view class="book-btn-large" @tap="handleBook(service)">
						<text class="book-text">在线预订</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'

export default {
	props: {
		designerId: {
			type: [String, Number],
			default: null
		},
		designerUserId: {
			type: String,
			default: ''
		},
		activeSubTab: {
			type: String,
			default: 'all'
		}
	},
	data() {
		return {
			loading: false,
			serviceType: 'hair-service',
			selectedSecondary: 'hairstylist',
			secondaryTabs: [
				{ id: 'hairstylist', label: '美发师' },
				{ id: 'beautician', label: '美容师' }
			],
			services: [],
			expandedServices: [],
			selectedBrands: {},
			selectedHairLengths: {},
			hairLengthOptions: [
				{ id: 'short', label: '短发' },
				{ id: 'medium', label: '中发' },
				{ id: 'long', label: '长发' }
			],
			brandOptions: [
				{ id: 'brand1', name: '施华蔻', price: '288' },
				{ id: 'brand2', name: '欧莱雅', price: '388' },
				{ id: 'brand3', name: '卡诗', price: '488' }
			],
		}
	},
	watch: {
		designerUserId: {
			immediate: true,
			handler(newVal) {
				if (newVal) {
					this.fetchServices()
				}
			}
		},
		activeSubTab: {
			immediate: true,
			handler(newVal) {
				if (this.designerUserId) {
					this.fetchServices()
				}
			}
		}
	},
	methods: {

		async fetchServices() {
			if (!this.designerUserId || this.loading) return
			this.loading = true
			try {
				// 构建请求参数
				const params = {
					page: 1,
					pageSize: 50
				}
				// 如果选择了分类且是有效的 UUID 格式，传入 categoryId
				// 后端 categoryId 需要 UUID 格式，不是字符串如 "hair-service"
				if (this.activeSubTab && this.activeSubTab !== 'all') {
					const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
					if (uuidRegex.test(this.activeSubTab)) {
						params.categoryId = this.activeSubTab
					}
					// 如果不是 UUID 格式（如 "hair-service"），则不传 categoryId，返回全部服务
				}

				const res = await api.service.getList(params)
				if (res.code === 200) {
					const data = res.data

					const allList = data.items || data.list || data.records || []

					// 过滤该设计师的服务
					const list = allList.filter(s => s.user_id === this.designerUserId)

					
					this.services = list.map(s => {

						const image = Array.isArray(s.image_urls) && s.image_urls.length > 0
							? s.image_urls[0]
							: (s.image || '')

						// 从 skus 数组获取价格
						const firstSku = Array.isArray(s.skus) && s.skus.length > 0 ? s.skus[0] : {}
						const skuSellPrice = Number(firstSku.sell_price) || 0
						const skuRefPrice = Number(firstSku.ref_price) || 0

						const fixedPrice = skuSellPrice || Number(s.fixed_price) || 0
						const refPrice = skuRefPrice || Number(s.fixed_ref_price) || 0
						let discountText = s.discount || ''
						
						if (fixedPrice > 0 && refPrice > fixedPrice) {
							const discountPercent = Math.round((1 - fixedPrice / refPrice) * 100)
							discountText = `预约优惠${discountPercent}%`
						}

						// 优先取 brand_options，其次取 skus，最后取默认值
						let brandOptions = s.brand_options
						if (!brandOptions && s.skus && s.skus.length > 0) {
							brandOptions = s.skus.map(sku => ({
								id: sku.id,
								name: sku.sku_name || sku.name,
								price: sku.ref_price || sku.price,
								appointmentPrice: sku.sell_price || sku.price,
								hairLength: sku.hair_length || ''
							}))
						}

						return {
							id: s.id,
							title: s.name,
							description: s.detail_text || s.description || '',
							estimatedTime: s.duration_min ? `${s.duration_min}分钟` : '1小时',
							salesCount: String(s.sold_count || s.soldCount || 0),
							price: String(refPrice || s.fixed_ref_price || s.price || 0),
							fixedPrice: fixedPrice,
							discount: discountText,
							image: image,
							brandOptions: brandOptions || [
								{ id: 'brand1', name: '施华蔻', price: '388', appointmentPrice: '288' },
								{ id: 'brand2', name: '欧莱雅', price: '488', appointmentPrice: '388' },
								{ id: 'brand3', name: '卡诗', price: '588', appointmentPrice: '488' }
							]
						}
					})

					
					if (data.categories) {
						this.categories = data.categories
						const available = data.categories.filter(cat => cat.count > 0)
						if (available.length > 0 && !available.find(cat => cat.id === this.selectedCategory)) {
							this.selectedCategory = available[0].id
						}
					}
					if (data.hairLengthOptions) {
						this.hairLengthOptions = data.hairLengthOptions
					}
					if (data.brandOptions) {
						this.brandOptions = data.brandOptions
					}
				}
			} catch (err) {
				console.error('获取服务列表失败:', err)
			} finally {
				this.loading = false
			}
		},
		getFilteredBrandOptions(service) {
			const selectedLength = this.getSelectedHairLength(service.id)
			// 如果品牌选项带有 hairLength 标识，则进行过滤
			const filtered = service.brandOptions.filter(opt => {
				// 如果选项没有设置长度标识，或者长度标识匹配，则显示
				return !opt.hairLength || opt.hairLength === selectedLength
			})
			
			// 如果过滤后没有内容，显示该长度下的所有内容（兜底）
			return filtered.length > 0 ? filtered : service.brandOptions
		},
		selectSecondary(id) {
			this.selectedSecondary = id
		},
		toggleExpand(serviceId) {
			const service = this.services.find(s => s.id === serviceId)

			// 如果服务没有多个品牌选项，直接预约不需要二次选择
			if (!service || !service.brandOptions || service.brandOptions.length <= 1) {
				// 设置默认选项
				if (!this.selectedHairLengths[serviceId]) {
					this.$set(this.selectedHairLengths, serviceId, 'short')
				}
				if (!this.selectedBrands[serviceId] && service.brandOptions && service.brandOptions.length > 0) {
					this.$set(this.selectedBrands, serviceId, service.brandOptions[0].id)
				}
				// 直接预约
				this.handleBook(service)
				return
			}

			// 有多个品牌选项，展开二次选择
			const index = this.expandedServices.indexOf(serviceId)
			if (index > -1) {
				this.expandedServices.splice(index, 1)
			} else {
				this.expandedServices.push(serviceId)

				if (!this.selectedHairLengths[serviceId]) {
					this.$set(this.selectedHairLengths, serviceId, 'short')
				}
				if (!this.selectedBrands[serviceId]) {
					if (service && service.brandOptions && service.brandOptions.length > 0) {
						this.$set(this.selectedBrands, serviceId, service.brandOptions[0].id)
					}
				}
			}
		},
		isExpanded(serviceId) {
			
			return this.expandedServices.includes(serviceId)
		},
		getSelectedHairLength(serviceId) {
			return this.selectedHairLengths[serviceId] || 'short'
		},
		selectHairLengthForService(serviceId, lengthId) {
			this.$set(this.selectedHairLengths, serviceId, lengthId)
		},
		selectBrand(serviceId, brandId) {
			this.$set(this.selectedBrands, serviceId, brandId)
		},
		getSelectedBrand(service, brandId) {
			return this.selectedBrands[service.id] === brandId
		},
		handleBook(service) {
			
			const selectedHairLengthId = this.getSelectedHairLength(service.id)
			const selectedHairLength = this.hairLengthOptions.find(opt => opt.id === selectedHairLengthId)

			// 获取选中的品牌
			const selectedBrandId = this.selectedBrands[service.id]
			const selectedBrand = service.brandOptions.find(opt => opt.id === selectedBrandId)

			
			const bookingData = {
				service: {
					id: service.id,
					title: service.title,
					description: service.description,
					estimatedTime: service.estimatedTime,
					image: service.image,
					discount: service.discount,
					fixedPrice: service.fixedPrice
				},
				hairLength: selectedHairLength,
				brand: selectedBrand,
				price: selectedBrand ? selectedBrand.price : service.fixedPrice
			}

			
			this.$emit('book-service', bookingData)
		}
	}
}
</script>

<style scoped lang="scss">
.profile-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	padding: 0;
	align-items: flex-start;
	gap: 12rpx;
	opacity: 0;
	box-sizing: border-box;
}

.secondary-nav {
	display: flex;
	align-items: center;
	gap: 36rpx;
	width: 100%;
	padding-bottom: 12rpx;
	border-bottom: 2rpx solid #f3f3f3;
	margin-bottom: 16rpx;
}

.secondary-tab {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 26rpx;
	cursor: pointer;

	&.active {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		color: #000000;
	}
}

.services-list {
	margin-bottom: 12rpx;
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 12rpx;
}

.service-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	border: 0;
	box-shadow: none;
	box-sizing: border-box;
	overflow: hidden;
}

.service-content {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
	padding: 20rpx;
	box-sizing: border-box;
	width: 100%;
	overflow: hidden;
}

.service-content.has-options {
	padding-bottom: 16rpx;
}

.service-image {
	width: 160rpx;
	height: 160rpx;
	border-radius: 4rpx;
	object-fit: cover;
}

.service-info {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	flex: 1;
	align-self: stretch;
	min-width: 0;
	box-sizing: border-box;
}

.service-details {
	display: inline-flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	flex: 1;
	min-width: 0;
	box-sizing: border-box;
}

.service-header {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
}

.service-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 32rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
}

.service-description {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
}

.time-info {
	display: inline-flex;
	align-items: flex-start;
	gap: 6rpx;
}

.time-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.time-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.sales-count {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.service-pricing {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-between;
	min-width: 0;
	flex-shrink: 0;
	align-self: stretch;
	box-sizing: border-box;
}

.service-pricing:not(.has-options) {
	width: 242rpx;
}

.service-pricing.has-options {
	flex: 0 0 auto;
	width: auto;
}

.price-container {
	display: inline-flex;
	align-items: flex-end;
	justify-content: flex-end;
	gap: 6rpx;
}

.price-symbol {
	font-size: 32rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
}

.price-value {
	font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 34rpx;
	white-space: nowrap;
}

.discount-badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	background-color: #ffffff;
	border-radius: 4rpx;
	margin-top: -16rpx;
}

.discount-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #ffa77b;
	font-size: 20rpx;
}

.book-btn {
	height: 60rpx;
	min-width: 148rpx;
	padding: 0 30rpx;
	background-color: #333333;
	border-radius: 4rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-sizing: border-box;
}

.expand-btn {
	height: 60rpx;
	min-width: 148rpx;
	padding: 0;
	background-color: #333333;
	border-radius: 4rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-sizing: border-box;
}

.book-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffa77b;
	font-size: 22rpx;
	white-space: nowrap;
}

.options-icon {
	width: 40rpx;
	height: 40rpx;
	filter: brightness(0) invert(1);
}

.options-section {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 22rpx;
	margin-top: 20rpx;
	padding: 0 20rpx 20rpx;
	box-sizing: border-box;
	width: 100%;
	overflow: hidden;
}

.hair-length-options {
	display: flex;
	align-items: center;
	gap: 18rpx;
	width: 100%;
	box-sizing: border-box;
}

.hair-length-btn {
	flex: 1;
	min-width: 0;
	height: 70rpx;
	padding: 16rpx 12rpx;
	border-radius: 4rpx;
	background-color: #f6f6f6;
	color: #333333;
	font-size: 22rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.hair-length-btn.active {
	background-color: #333333;
	color: #ffffff;
}

.brand-options {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 16rpx;
	padding: 0 20rpx;
	width: 100%;
	box-sizing: border-box;
}

.brand-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	min-width: 0;
	box-sizing: border-box;
	cursor: pointer;
	padding: 8rpx 0;
}

.brand-info {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.brand-radio {
	width: 36rpx;
	height: 36rpx;
	border-radius: 50%;
	border: 2rpx solid #e5e5e5;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.brand-radio.checked {
	border-color: #333333;
	background-color: #333333;
}

.check-icon {
	width: 20rpx;
	height: 20rpx;
	
}

.brand-icon {
	width: 44rpx;
	height: 44rpx;
}

.brand-name {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 24rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 300rpx;
}

.brand-price {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 12rpx;
	
	.price-row {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
	}
	
	.price-symbol {
		font-size: 26rpx;
		color: #333333;
	}
	
	.price-value {
		font-size: 32rpx;
		color: #333333;
		font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	}
}

.brand-appointment-price {
	font-family: 'PingFang_SC-Regular', Helvetica;
	background-color: #dacbb1;
	font-size: 20rpx;
	color: #645E57;
	padding: 2rpx 8rpx;
	border-radius: 4rpx;
	white-space: nowrap;
}

.book-btn-large {
	height: 78rpx;
	width: 100%;
	padding: 0;
	background-color: #333333;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-sizing: border-box;
}

.book-btn-large .book-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffa77b;
	font-size: 26rpx;
}


.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 80rpx 40rpx;
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	box-sizing: border-box;
}

.empty-icon {
	width: 160rpx;
	height: 160rpx;
	margin-bottom: 24rpx;
	opacity: 0.6;
}

.empty-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #a6a6a6;
}

.loading-state {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60rpx 0;
	width: 100%;
}

.loading-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #a6a6a6;
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

.profile-section {
	animation: fade-in 1s ease forwards;
}
</style>

