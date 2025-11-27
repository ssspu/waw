<template>
	<view class="brand-stylist-content">
		<view class="nav-card">
			<!-- 次级标签 -->
			<view class="secondary-nav">
				<view 
					v-for="secondary in secondaryTabs" 
					:key="secondary.id" 
					class="secondary-tab"
					:class="{ active: selectedSecondary === secondary.id }"
					@tap="selectSecondary(secondary.id)"
				>
					<text>{{ secondary.label }}</text>
				</view>
			</view>
			
			<!-- 分类导航 -->
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
		
		<!-- 发型师列表 -->
		<view class="stylist-list">
			<view 
				v-for="stylist in stylists" 
				:key="stylist.id" 
				class="stylist-card"
			>
				<view class="stylist-content">
					<image 
						class="stylist-image" 
						:src="stylist.image" 
						:alt="stylist.name" 
						mode="aspectFill"
					></image>
					
					<view class="stylist-info">
						<view class="stylist-details">
							<view class="stylist-header">
								<text class="stylist-name">{{ stylist.name }}</text>
								<view class="stylist-badges">
									<view class="role-badge">
										<text>{{ stylist.role }}</text>
									</view>
									<view class="level-badge">
										<text>{{ stylist.level }}</text>
									</view>
								</view>
							</view>
							<text class="stylist-position">{{ stylist.position }}</text>
							<view class="stylist-specialties">
								<text class="specialty-label">擅长:</text>
								<view 
									v-for="(specialty, index) in stylist.specialties" 
									:key="index" 
									class="specialty-badge"
								>
									<text>{{ specialty }}</text>
								</view>
							</view>
							<view class="stylist-stats">
								<view class="rating-group">
									<text class="rating-score">{{ stylist.rating }}</text>
									<image class="star-icon" src="https://c.animaapp.com/mi5l377nJk1HHO/img/star-1.svg" mode="aspectFit"></image>
								</view>
								<view class="count-group">
									<text class="count-label">服务</text>
									<text class="count-value">{{ stylist.serviceCount }}</text>
								</view>
								<text class="stat-divider">｜</text>
								<view class="count-group">
									<text class="count-label">作品</text>
									<text class="count-value">{{ stylist.worksCount }}</text>
								</view>
							</view>
							<view class="stylist-tags">
								<view 
									v-for="(tag, index) in stylist.tags" 
									:key="index" 
									class="tag-item"
								>
									<text>{{ tag }}</text>
								</view>
							</view>
						</view>
						
						<view class="stylist-pricing">
							<view class="price-section">
								<view class="price-row">
									<text class="price-symbol">¥</text>
									<text class="price-value">{{ stylist.price }}</text>
								</view>
								<view class="discount-badge">
									<text class="discount-text">{{ stylist.discount }}</text>
								</view>
							</view>
							<view class="sales-section">
								<text class="sales-count">已售{{ stylist.soldCount }}</text>
								<view class="book-btn" @tap="handleBook(stylist)">
									<text class="book-text">在线预订</text>
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
export default {
	data() {
		return {
			selectedSecondary: 'hairstylist',
			secondaryTabs: [
				{ id: 'hairstylist', label: '美发师' },
				{ id: 'beautician', label: '美容师' }
			],
			selectedCategory: "hairstylist",
			categories: [
				{ id: "hairstylist", label: "发型师" },
				{ id: "chief", label: "首席" },
				{ id: "senior", label: "资深" },
				{ id: "director", label: "总监" },
				{ id: "manager", label: "店长" },
			],
			stylists: [
				{
					id: 1,
					name: "李天天",
					image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
					role: "美发师",
					level: "高级",
					position: "店长｜从业12年",
					specialties: ["短发裁剪", "染发设计"],
					rating: 4.8,
					serviceCount: 287,
					worksCount: 123,
					tags: ["提前预约", "上门服务", "技术专业"],
					price: 799,
					discount: "预约优惠10%",
					soldCount: 1234,
				},
				{
					id: 2,
					name: "李天天",
					image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
					role: "美发师",
					level: "高级",
					position: "店长｜从业12年",
					specialties: ["短发裁剪", "染发设计"],
					rating: 4.8,
					serviceCount: 287,
					worksCount: 123,
					tags: ["提前预约", "上门服务", "技术专业"],
					price: 799,
					discount: "预约优惠10%",
					soldCount: 1234,
				},
				{
					id: 3,
					name: "李天天",
					image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
					role: "美发师",
					level: "高级",
					position: "店长｜从业12年",
					specialties: ["短发裁剪", "染发设计"],
					rating: 4.8,
					serviceCount: 287,
					worksCount: 123,
					tags: ["提前预约", "上门服务", "技术专业"],
					price: 799,
					discount: "预约优惠10%",
					soldCount: 1234,
				},
				{
					id: 4,
					name: "李天天",
					image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
					role: "美发师",
					level: "高级",
					position: "店长｜从业12年",
					specialties: ["短发裁剪", "染发设计"],
					rating: 4.8,
					serviceCount: 287,
					worksCount: 123,
					tags: ["提前预约", "上门服务", "技术专业"],
					price: 799,
					discount: "预约优惠10%",
					soldCount: 1234,
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
		handleBook(stylist) {
			console.log('Book stylist:', stylist)
		}
	}
}
</script>

<style scoped lang="scss">
.brand-stylist-content {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	gap: 20rpx;
}

.nav-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 0 0 12rpx 12rpx;
	padding: 0rpx 0rpx;
	box-sizing: border-box;
	border-top: 2rpx solid #f3f3f3;
	margin-top: -2rpx;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.secondary-nav {
	display: flex;
	align-items: center;
	gap: 36rpx;
	border-bottom: 2rpx solid #f3f3f3;
	padding-bottom: 12rpx;
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
	display: flex;
	align-items: center;
	gap: 12rpx;
	flex-wrap: wrap;
}

.category-btn {
	min-width: 120rpx;
	text-align: center;
	padding: 0rpx 22rpx;
	border-radius: 6rpx;
	border: 2rpx solid #f0f0f0;
	background-color: #f7f7f7;
	color: #a6a6a6;
	font-size: 24rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	cursor: pointer;
	
	&.active {
		background-color: #000000;
		border-color: #000000;
		color: #ffffff;
		box-shadow: 0 6rpx 10rpx rgba(0, 0, 0, 0.15);
	}
}

.stylist-list {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 12rpx;
}

.stylist-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	box-shadow: none;
	box-sizing: border-box;
}

.stylist-content {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
	padding: 20rpx;
	box-sizing: border-box;
}

.stylist-image {
	width: 160rpx;
	height: 160rpx;
	border-radius: 4rpx;
	object-fit: cover;
	flex-shrink: 0;
}

.stylist-info {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	flex: 1;
	align-self: stretch;
	min-width: 0;
}

.stylist-details {
	display: inline-flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6rpx;
	flex: 1;
	min-width: 0;
}

.stylist-header {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
}

.stylist-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.stylist-badges {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.role-badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 2rpx 8rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 20rpx;
}

.level-badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 2rpx 8rpx;
	background-color: #dacbb1;
	border-radius: 4rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #645e57;
	font-size: 20rpx;
}

.stylist-position {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
}

.stylist-specialties {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
	flex-wrap: wrap;
}

.specialty-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.specialty-badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 2rpx 8rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 20rpx;
}

.stylist-stats {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.rating-group {
	display: inline-flex;
	align-items: center;
	gap: 2rpx;
}

.rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 24rpx;
}

.star-icon {
	width: 20rpx;
	height: 20rpx;
	background-color: #333333;
	border-radius: 14rpx;
	padding: 2rpx;
}

.count-group {
	display: inline-flex;
	align-items: flex-end;
	gap: 2rpx;
}

.count-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.count-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 24rpx;
}

.stat-divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.stylist-tags {
	display: flex;
	align-items: center;
	gap: 6rpx;
	flex-wrap: wrap;
	margin-top: 4rpx;
}

.tag-item {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 2rpx 8rpx;
	border: 2rpx solid #a6a6a6;
	border-radius: 4rpx;
	background-color: #ffffff;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 20rpx;
}

.stylist-pricing {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-between;
	min-width: 0;
	flex-shrink: 0;
	align-self: stretch;
}

.price-section {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 2rpx;
}

.price-row {
	display: inline-flex;
	align-items: flex-end;
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
	padding: 4rpx 8rpx;
	background-color: #ffffff;
	border-radius: 4rpx;
}

.discount-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #ffa77b;
	font-size: 20rpx;
}

.sales-section {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 8rpx;
	margin-top: 8rpx;
}

.sales-count {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.book-btn {
	height: 60rpx;
	padding: 16rpx 30rpx;
	background-color: #333333;
	border-radius: 4rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.book-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffa77b;
	font-size: 22rpx;
}
</style>

