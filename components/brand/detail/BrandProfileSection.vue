<template>
	<view class="profile-section">
		<!-- 分类标签 -->
		<view class="category-nav">
			<view 
				v-for="category in categories" 
				:key="category.id" 
				class="category-btn"
				:class="{ active: selectedCategory === category.id }"
				@tap="selectCategory(category.id)"
			>
				<text>{{ category.label }}</text>
			</view>
		</view>
		
		<!-- 服务列表 -->
		<view class="services-list">
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
							<view class="discount-badge">
								<text class="discount-text">{{ service.discount }}</text>
							</view>
							
							<view v-if="!isExpanded(service.id)" class="book-btn" @tap="toggleExpand(service.id)">
								<text class="book-text">在线预订</text>
							</view>
							<view v-else class="expand-btn" @tap="toggleExpand(service.id)">
								<image 
									class="options-icon" 
									src="/static/icon/up.png" 
									mode="aspectFit"
								></image>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 选项区域（如果展开） -->
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
							v-for="brand in brandOptions" 
							:key="brand.id" 
							class="brand-item"
							@tap="selectBrand(service.id, brand.id)"
						>
							<view class="brand-info">
								<view class="brand-radio" :class="{ checked: getSelectedBrand(service.id) === brand.id }">
									<image v-if="getSelectedBrand(service.id) === brand.id" class="check-icon" src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg" mode="aspectFit"></image>
								</view>
								<text class="brand-name">{{ brand.name }}</text>
							</view>
							<view class="brand-price">
								<text class="price-symbol">¥</text>
								<text class="price-value">{{ brand.price }}</text>
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
		brandId: {
			type: [String, Number],
			default: null
		}
	},
	data() {
		return {
			selectedCategory: "wash-cut-blow",
			selectedHairLength: "short",
			loading: false,
			categories: [
				{ id: "wash-cut-blow", label: "洗剪吹", active: true },
				{ id: "perm", label: "烫发", active: false },
				{ id: "dye", label: "染发", active: false },
				{ id: "care", label: "护发", active: false },
				{ id: "scalp", label: "头皮", active: false },
				{ id: "extension", label: "接发", active: false },
			],
			services: [],
			expandedServices: [], // 展开的服务ID列表
			selectedBrands: {}, // 每个服务选中的品牌 { serviceId: brandId }
			selectedHairLengths: {}, // 每个服务选中的头发长度 { serviceId: lengthId }
			hairLengthOptions: [
				{ id: "short", label: "短发", active: true },
				{ id: "medium", label: "中发", active: false },
				{ id: "long", label: "长发", active: false },
			],
			brandOptions: [],
		}
	},
	mounted() {
		this.fetchServices()
	},
	methods: {
		// 获取品牌馆服务列表
		async fetchServices() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.brand.getServices(this.brandId, { pageSize: 50 })
				if (res.code === 0 && res.data) {
					const list = res.data.list || res.data.records || []
					// 转换API数据为组件需要的格式
					this.services = list.map(service => ({
						id: service.id,
						title: service.name || service.title,
						description: service.description || '',
						estimatedTime: service.estimatedTime || service.duration || '1小时',
						salesCount: String(service.salesCount || service.soldCount || 0),
						price: String(service.price || 0),
						discount: service.discount || '',
						image: service.image || '',
						categoryId: service.categoryId,
						brandOptions: service.brandOptions || []
					}))
					// 如果服务有品牌选项，使用第一个服务的品牌选项
					if (list.length > 0 && list[0].brandOptions) {
						this.brandOptions = list[0].brandOptions.map(brand => ({
							id: brand.id,
							name: brand.name,
							price: String(brand.price || 0),
							icon: brand.icon || ''
						}))
					}
				}
			} catch (err) {
				console.error('获取品牌馆服务失败:', err)
			} finally {
				this.loading = false
			}
		},
		selectCategory(id) {
			this.selectedCategory = id
		},
		selectHairLength(id) {
			this.selectedHairLength = id
		},
		toggleExpand(serviceId) {
			// 切换展开状态
			const index = this.expandedServices.indexOf(serviceId)
			if (index > -1) {
				this.expandedServices.splice(index, 1)
			} else {
				this.expandedServices.push(serviceId)
				// 默认选择第一个头发长度和品牌
				if (!this.selectedHairLengths[serviceId]) {
					this.$set(this.selectedHairLengths, serviceId, 'short')
				}
				if (!this.selectedBrands[serviceId] && this.brandOptions && this.brandOptions.length > 0) {
					this.$set(this.selectedBrands, serviceId, this.brandOptions[0].id)
				}
			}
		},
		isExpanded(serviceId) {
			// 检查服务是否展开
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
		getSelectedBrand(serviceId) {
			return this.selectedBrands[serviceId] || (this.brandOptions && this.brandOptions.length > 0 ? this.brandOptions[0].id : null)
		},
		handleBook(service) {
			console.log('Book service:', service)
			uni.navigateTo({
				url: `/packageOrder/pages/order/purchase?id=${service.id}`
			})
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
	padding: 0 12rpx;
	align-items: flex-start;
	gap: 12rpx;
	opacity: 0;
	box-sizing: border-box;
}

.category-nav {
	display: inline-flex;
	align-items: center;
	gap: 12rpx;
	flex-wrap: wrap;
}

.category-btn {
	height: auto;
	padding: 8rpx 20rpx;
	border-radius: 4rpx;
	background-color: #ffffff;
	color: #a6a6a6;
	font-size: 26rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
}

.category-btn.active {
	background-color: #333333;
	color: #ffffff;
}

.services-list {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 12rpx;
}

.service-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
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
	justify-content: center;
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
	padding: 4rpx 8rpx;
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
	filter: brightness(0) invert(1);
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
	display: inline-flex;
	align-items: baseline;
	gap: 4rpx;
	
	.price-symbol {
		font-size: 26rpx;
		color: #333333;
	}
	
	.price-value {
		font-size: 32rpx;
		color: #333333;
	}
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

.profile-section {
	animation: fade-in 1s ease forwards;
}
</style>

