<template>
	<view class="stylist-section">
		<!-- 分类标签 -->
		<view class="category-nav">
			<view 
				v-for="category in categoryTabs" 
				:key="category.id" 
				class="category-btn"
				:class="{ active: selectedCategory === category.id }"
				@tap="selectCategory(category.id)"
			>
				<text>{{ category.label }}</text>
			</view>
		</view>
		
		<!-- 发型师列表 -->
		<view class="stylist-list">
			<view 
				v-for="stylist in filteredStylistData" 
				:key="stylist.id" 
				class="stylist-card"
			>
				<view class="card-content">
					<image 
						class="stylist-image" 
						:src="stylist.image" 
						mode="aspectFill"
					></image>
					
					<view class="stylist-info">
						<view class="info-main">
							<!-- 限制高度容器：与头像高度一致 -->
							<view class="info-height-limit">
								<!-- 姓名和标签 -->
								<view class="name-row">
									<text class="stylist-name" @tap="handleStylistClick(stylist)">{{ stylist.name }}</text>
									<view class="role-badge">{{ stylist.role }}</view>
									<view class="level-badge">{{ stylist.level }}</view>
								</view>

								<!-- 职位 -->
								<text class="position">{{ stylist.position }}</text>

								<!-- 擅长 -->
								<view class="specialties-row">
									<text class="specialties-label">擅长:</text>
									<view
										v-for="(specialty, index) in stylist.specialties"
										:key="index"
										class="specialty-tag"
									>
										{{ specialty }}
									</view>
								</view>

								<!-- 评分和统计 -->
								<view class="stats-row">
									<view class="rating">
										<text class="rating-value">{{ stylist.rating }}</text>
										<view class="star-badge">
											<image class="star-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/star-1.svg" mode="aspectFit"></image>
										</view>
									</view>
									<text class="stats-separator">｜</text>
									<view class="stats-item">
										<text class="stat-label">服务</text>
										<text class="stat-value">{{ stylist.serviceCount }}</text>
									</view>
									<text class="stats-separator">｜</text>
									<view class="stats-item">
										<text class="stat-label">作品</text>
										<text class="stat-value">{{ stylist.worksCount }}</text>
									</view>
								</view>
							</view>

							<!-- 标签 -->
							<view class="tags-row">
								<view
									v-for="(tag, index) in stylist.tags"
									:key="index"
									class="tag-item"
								>
									{{ tag }}
								</view>
							</view>
						</view>
						
						<!-- 价格和预订 -->
						<view class="price-section">
							<view class="price-row">
								<text class="price-symbol">¥</text>
								<text class="price-value">{{ stylist.price }}</text>
							</view>
							<view class="discount-info">
								<text class="discount-text">{{ stylist.discount }}</text>
							</view>
							<text class="sold-count">已售{{ stylist.soldCount }}</text>
							<view class="book-btn" @tap.stop="handleBook(stylist)">
								<text class="book-text">在线预订</text>
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

export default {
	props: {
		activeSubTab: {
			type: String,
			default: 'hair'
		},
		brandId: {
			type: [String, Number],
			default: null
		}
	},
	data() {
		return {
			selectedCategory: 'hairstylist',
			loading: false,
			categoryTabs: [
				{ id: 'hairstylist', label: '发型师' },
				{ id: 'chief', label: '首席' },
				{ id: 'senior', label: '资深' },
				{ id: 'director', label: '总监' },
				{ id: 'manager', label: '店长' }
			],
			stylistData: []
		}
	},
	computed: {
		filteredStylistData() {
			if (!this.selectedCategory || this.selectedCategory === 'hairstylist') {
				return this.stylistData
			}
			return this.stylistData.filter(stylist => stylist.category === this.selectedCategory)
		}
	},
	mounted() {
		this.fetchDesigners()
	},
	methods: {
		// 获取品牌馆设计师列表
		async fetchDesigners() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.brand.getDesigners(this.brandId, { pageSize: 50 })
				if (res.code === 0 && res.data) {
					const list = res.data.list || res.data.records || []
					// 转换API数据为组件需要的格式
					this.stylistData = list.map(designer => ({
						id: designer.id,
						name: designer.name,
						image: designer.avatar || '',
						role: designer.role || '美发师',
						level: designer.level || '高级',
						category: designer.category || 'hairstylist',
						position: designer.position || `${designer.level}｜从业${designer.experience || 5}年`,
						specialties: designer.specialties || [],
						rating: designer.rating || 0,
						serviceCount: designer.serviceCount || 0,
						worksCount: designer.worksCount || 0,
						tags: designer.tags || [],
						price: designer.price || 0,
						discount: designer.discount || '',
						soldCount: designer.soldCount || 0
					}))
				}
			} catch (err) {
				console.error('获取品牌馆设计师失败:', err)
			} finally {
				this.loading = false
			}
		},
		selectCategory(categoryId) {
			this.selectedCategory = categoryId
		},
		handleStylistClick(stylist) {
			console.log('Stylist clicked:', stylist)
			uni.navigateTo({
				url: `/pages/designer/detail?id=${stylist.id}`
			})
		},
		handleBook(stylist) {
			console.log('Book stylist:', stylist)
			uni.navigateTo({
				url: `/pages/designer/detail?id=${stylist.id}&tab=service`
			})
		}
	}
}
</script>

<style scoped lang="scss">
.stylist-section {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	width: 100%;
	// padding: 0 20rpx;
	box-sizing: border-box;
}

.category-nav {
	display: flex;
	align-items: center;
	gap: 16rpx;
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
	
	&.active {
		background-color: #333333;
		color: #ffffff;
	}
}

.stylist-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.stylist-card {
	background-color: #ffffff;
	border-radius: 12rpx;
	overflow: hidden;
}

.card-content {
	display: flex;
	padding: 24rpx;
	gap: 20rpx;
}

.stylist-image {
	width: 160rpx;
	height: 160rpx;
	border-radius: 8rpx;
	flex-shrink: 0;
	object-fit: cover;
}

.stylist-info {
	flex: 1;
	display: flex;
	justify-content: space-between;
	min-width: 0;
}

.info-main {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
	flex: 1;
	min-width: 0;
}

// 限制高度容器：与头像高度一致
.info-height-limit {
	height: 160rpx;
	display: flex;
	flex-direction: column;
	gap: 6rpx;
	justify-content: space-between;
}

.name-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
	flex-wrap: wrap;
}

.stylist-name {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: 600;
	font-size: 30rpx;
	color: #000000;
}

.role-badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 4rpx 10rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #666666;
}

.level-badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 4rpx 10rpx;
	background-color: #dacbb1;
	border-radius: 4rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #645e57;
}

.position {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #999999;
}

.specialties-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
	flex-wrap: wrap;
}

.specialties-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #999999;
}

.specialty-tag {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 4rpx 10rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #999999;
}

.stats-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
	flex-wrap: nowrap;
	white-space: nowrap;
}

.rating {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.rating-value {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 26rpx;
	color: #333333;
}

.star-badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 4rpx;
	background-color: #333333;
	border-radius: 4rpx;
}

.star-icon {
	width: 16rpx;
	height: 16rpx;
	filter: brightness(0) invert(1)
}

.stats-item {
	display: flex;
	align-items: center;
	gap: 4rpx;
	flex-shrink: 0;
	white-space: nowrap;
}

.stat-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #999999;
}

.stat-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	color: #333333;
}

.stats-separator {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #e5e5e5;
}

.tags-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
	flex-wrap: nowrap;
}

.tag-item {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0rpx 8rpx;
	background-color: #ffffff;
	border: 1rpx solid #e5e5e5;
	border-radius: 4rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #999999;
}

.price-section {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-start;
	min-width: 120rpx;
	flex-shrink: 0;
}

.price-row {
	display: flex;
	align-items: flex-end;
}

.price-symbol {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 26rpx;
	color: #333333;
	line-height: 1.2;
}

.price-value {
	font-family: 'DIN-Bold', Helvetica;
	font-weight: bold;
	font-size: 40rpx;
	color: #333333;
	line-height: 1;
}

.discount-info {
	display: flex;
	align-items: center;
}

.discount-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #ffa77b;
}

.sold-count {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #999999;
	margin-top: auto;
}

.book-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 14rpx 24rpx;
	background-color: #333333;
	border-radius: 8rpx;
	margin-top: 0;
}

.book-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	color: #ffa77b;
}
</style>
