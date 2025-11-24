<template>
	<view class="profile-section">
		<view class="nav-card">
			<!-- 次级标签 -->
			<view class="secondary-nav">
				<view 
					v-for="tab in secondaryTabs" 
					:key="tab.id" 
					class="secondary-tab"
					:class="{ active: selectedSecondary === tab.id }"
					@tap="selectSecondary(tab.id)"
				>
					<text>{{ tab.label }}</text>
				</view>
			</view>
			
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
		</view>
		
		<!-- 服务列表 -->
		<view class="services-list">
			<view 
				v-for="service in services" 
				:key="service.id" 
				class="service-card"
			>
				<view class="service-content" :class="{ 'has-options': service.hasOptions }">
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
						
						<view class="service-pricing" :class="{ 'has-options': service.hasOptions }">
							<view class="price-container">
								<text class="price-symbol">¥</text>
								<text class="price-value">{{ service.price }}</text>
							</view>
							<view class="discount-badge">
								<text class="discount-text">{{ service.discount }}</text>
							</view>
							
							<view v-if="!service.hasOptions" class="book-btn" @tap="handleBook(service)">
								<text class="book-text">在线预订</text>
							</view>
							<image 
								v-else
								class="options-icon" 
								src="https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1811.svg" 
								mode="aspectFit"
							></image>
						</view>
					</view>
				</view>
				
				<!-- 选项区域（如果有） -->
				<view v-if="service.hasOptions" class="options-section">
					<!-- 头发长度选择 -->
					<view class="hair-length-options">
						<view 
							v-for="option in hairLengthOptions" 
							:key="option.id" 
							class="hair-length-btn"
							:class="{ active: selectedHairLength === option.id }"
							@tap="selectHairLength(option.id)"
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
						>
							<view class="brand-info">
								<image class="brand-icon" :src="brand.icon" :alt="brand.name" mode="aspectFit"></image>
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
export default {
	data() {
		return {
			selectedSecondary: 'hairstylist',
			secondaryTabs: [
				{ id: 'hairstylist', label: '美发师' },
				{ id: 'beautician', label: '美容师' }
			],
			selectedCategory: "wash-cut-blow",
			selectedHairLength: "short",
			categories: [
				{ id: "stylist", label: "发型师", active: true },
				{ id: "chief", label: "首席", active: false },
				{ id: "senior", label: "资深", active: false },
				{ id: "director", label: "总监", active: false },
				{ id: "manager", label: "店长", active: false },
			],
			services: [
				{
					id: 1,
					title: "烫发",
					description: "发型提案+染发+造型",
					estimatedTime: "1小时",
					salesCount: "1234",
					price: "799",
					discount: "预约优惠10%",
					image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
					hasOptions: false,
				},
				{
					id: 2,
					title: "烫发",
					description: "发型提案+染发+造型",
					estimatedTime: "1小时",
					salesCount: "1234",
					price: "799",
					discount: "预约优惠10%",
					image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
					hasOptions: false,
				},
				{
					id: 3,
					title: "烫发",
					description: "发型提案+染发+造型",
					estimatedTime: "1小时",
					salesCount: "1234",
					price: "799",
					discount: "预约优惠10%",
					image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
					hasOptions: true,
				},
				{
					id: 4,
					title: "烫发",
					description: "发型提案+染发+造型",
					estimatedTime: "1小时",
					salesCount: "1234",
					price: "799",
					discount: "预约优惠10%",
					image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
					hasOptions: false,
				},
			],
			hairLengthOptions: [
				{ id: "short", label: "短发", active: true },
				{ id: "medium", label: "中发", active: false },
				{ id: "long", label: "长发", active: false },
			],
			brandOptions: [
				{
					id: 1,
					name: "威娜",
					price: "560",
					icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-7.svg",
				},
				{
					id: 2,
					name: "菲灵",
					price: "660",
					icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-3.svg",
				},
				{
					id: 3,
					name: "欧莱雅",
					price: "760",
					icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-3.svg",
				},
				{
					id: 4,
					name: "乔薇尔",
					price: "860",
					icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-3.svg",
				},
			],
		}
	},
	methods: {
		selectSecondary(id) {
			this.selectedSecondary = id
		},
		selectCategory(id) {
			this.selectedCategory = id
		},
		selectHairLength(id) {
			this.selectedHairLength = id
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
	background-color: #ffffff;
	border-radius: 0 0 12rpx 12rpx;

	box-sizing: border-box;
	border-top: 2rpx solid #f3f3f3;
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
	padding: 0rpx 20rpx;
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
	font-size: 28rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
}

.price-value {
	font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 36rpx;
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
	padding: 16rpx 30rpx;
	background-color: #333333;
	border-radius: 4rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.book-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffa77b;
	font-size: 22rpx;
}

.options-icon {
	width: 148rpx;
	height: 60rpx;
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
	gap: 30rpx;
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
}

.brand-info {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.brand-icon {
	width: 44rpx;
	height: 44rpx;
}

.brand-name {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 26rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 300rpx;
}

.brand-price {
	display: inline-flex;
	align-items: center;
}

.book-btn-large {
	height: 84rpx;
	width: 100%;
	padding: 16rpx 30rpx;
	background-color: #333333;
	border-radius: 4rpx;
	display: flex;
	align-items: center;
	justify-content: center;
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

