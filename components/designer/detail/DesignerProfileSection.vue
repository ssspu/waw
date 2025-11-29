<template>
	<view class="profile-section">
		<view class="nav-card">

			<!-- 分类标签 -->
			<view class="category-nav">
				<view
					v-for="category in availableCategories"
					:key="category.id"
					class="category-btn"
					:class="{ active: selectedCategory === category.id }"
					@tap="selectCategory(category.id)"
				>
					<text>{{ category.label }}</text>
				</view>
			</view>
		</view>

		<!-- 空数据状态 -->
		<view v-if="!loading && services.length === 0" class="empty-state">
			<image class="empty-icon" src="/static/icon/empty-service.png" mode="aspectFit"></image>
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
		designerId: {
			type: [String, Number],
			default: null
		},
		activeSubTab: {
			type: String,
			default: 'hair-service'
		}
	},
	data() {
		return {
			loading: false,
			serviceType: 'hair-service', // 服务类型：hair-service, beauty-service, other-service
			selectedSecondary: 'hairstylist',
			secondaryTabs: [
				{ id: 'hairstylist', label: '美发师' },
				{ id: 'beautician', label: '美容师' }
			],
			selectedCategory: "wash-cut-blow",
			selectedHairLength: "short",
			categories: [],
			services: [],
			expandedServices: [],
			selectedBrands: {},
			selectedHairLengths: {},
			hairLengthOptions: [],
			brandOptions: [],
		}
	},
	computed: {
		// 只显示有服务内容的分类
		availableCategories() {
			return this.categories.filter(cat => cat.count > 0)
		}
	},
	watch: {
		designerId: {
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
				// 子tab切换时更新服务类型
				this.serviceType = newVal
				if (this.designerId) {
					this.fetchServices()
				}
			}
		},
		selectedCategory() {
			this.fetchServices()
		}
	},
	methods: {
		// 获取设计师服务列表
		async fetchServices() {
			if (!this.designerId || this.loading) return
			this.loading = true
			try {
				const res = await api.designer.getServices(this.designerId, {
					category: this.selectedCategory,
					serviceType: this.serviceType, // 传递服务类型参数
					page: 1,
					pageSize: 20
				})
				if (res.code === 0) {
					const data = res.data
					// 转换服务数据格式
					const list = data.list || data.records || []
					this.services = list.map(s => ({
						id: s.id,
						title: s.name,
						description: s.description,
						estimatedTime: s.duration ? `${s.duration}分钟` : '1小时',
						salesCount: String(s.soldCount || 0),
						price: String(s.price),
						discount: s.discount || '',
						image: s.image
					}))
					// 更新分类和选项
					if (data.categories) {
						this.categories = data.categories
						// 如果当前选中的分类没有服务，自动选择第一个有服务的分类
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
		selectSecondary(id) {
			this.selectedSecondary = id
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

.nav-card {
	width: 100%;
	border-radius: 0 0 12rpx 12rpx;
	box-sizing: border-box;
	border-top: 2rpx solid #f3f3f3;
	margin-bottom: 5rpx;
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

/* 空数据和加载状态 */
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

