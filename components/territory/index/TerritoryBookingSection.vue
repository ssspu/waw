<template>
	<view class="territory-booking-section">
		<view class="card-content">
			<!-- 头部信息 -->
			<view class="header-info">
				<view class="info-left">
					<text class="info-text">{{ bookingData.date }}</text>
					<text class="info-text">｜</text>
					<text class="info-text">{{ bookingData.serviceType }}</text>
					<text class="info-text">｜</text>
					<text class="info-text">{{ bookingData.treatment }}</text>
				</view>
				<text class="info-price">{{ bookingData.price }}</text>
			</view>

			<!-- 分隔线 -->
			<view class="separator-line"></view>

			<!-- 服务提供者信息 -->
			<view class="service-info">
				<view class="service-left">
					<!-- 头像 -->
					<view class="avatar-wrapper">
						<view class="avatar-bg"></view>
						<image
							class="avatar"
							:src="stylistData.avatar"
							mode="aspectFill"
						></image>
					</view>

					<!-- 详情 -->
					<view class="service-details">
						<view class="service-header">
							<text class="service-name">{{ stylistData.name }}</text>
							<view class="role-badge" style="background-color: #f6f6f6; color: #666666;">
								<text class="badge-text">{{ stylistData.role }}</text>
							</view>
							<view class="role-badge" style="background-color: #dacbb1; color: #645e57;">
								<text class="badge-text">{{ stylistData.level }}</text>
							</view>
						</view>

						<text class="service-role">{{ stylistData.position }}｜{{ stylistData.experience }}</text>

						<view class="service-skills">
							<text class="skills-label">擅长:</text>
							<view
								v-for="(specialty, index) in stylistData.specialties"
								:key="index"
								class="skill-badge"
							>
								<text class="skill-text">{{ specialty }}</text>
							</view>
						</view>

						<view class="service-stats">
							<view class="rating-section">
								<text class="rating-score">{{ stylistData.rating }}</text>
								<view class="star-wrapper">
									<image
										class="star-icon"
										src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/star-1.svg"
										mode="aspectFit"
									></image>
								</view>
							</view>

							<view class="stats-section">
								<view class="stat-item">
									<text class="stat-label">服务</text>
									<text class="stat-value">{{ stylistData.serviceCount }}</text>
								</view>
								<text class="stat-divider">｜</text>
								<view class="stat-item">
									<text class="stat-label">作品</text>
									<text class="stat-value">{{ stylistData.portfolioCount }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 底部操作 -->
			<view class="action-bar">
				<text class="more-link" @tap="handleMore">更多</text>
				<view class="action-buttons">
					<view class="promote-btn" @tap="handlePromote">
						<text class="btn-text">推广</text>
					</view>
					<view class="book-again-btn" @tap="handleBookAgain">
						<text class="btn-text primary">再次预约</text>
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
			bookingData: {
				date: "2025-05-05",
				serviceType: "洗剪吹",
				treatment: "欧莱雅生化烫",
				price: "¥888.00",
			},
			stylistData: {
				name: "李天天",
				avatar: "https://c.animaapp.com/mi5ng54v4eM3X6/img/rectangle-153-3.png",
				role: "美发师",
				level: "高级",
				position: "店长",
				experience: "从业12年",
				rating: "4.8",
				serviceCount: "287",
				portfolioCount: "123",
				specialties: ["女士造型", "烫发设计", "短发造型"],
			},
		}
	},
	methods: {
		handleMore() {
			console.log('More clicked')
		},
		handlePromote() {
			console.log('Promote clicked')
		},
		handleBookAgain() {
			console.log('Book again clicked')
		}
	}
}
</script>

<style scoped lang="scss">
.territory-booking-section {
	width: 100%;
	max-width: 726rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-shadow: none;
	box-sizing: border-box;
}

.card-content {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	padding: 24rpx;
	box-sizing: border-box;
}

.header-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.info-left {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.info-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 26rpx;
}

.info-price {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 26rpx;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
}

.service-info {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.service-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.avatar-wrapper {
	position: relative;
	width: 160rpx;
	height: 160rpx;
	flex-shrink: 0;
}

.avatar-bg {
	position: absolute;
	top: 0;
	left: 2rpx;
	width: 160rpx;
	height: 158rpx;
	border-radius: 92rpx 92rpx 4rpx 92rpx;
	background: linear-gradient(180deg, rgba(244, 244, 244, 1) 0%);
	z-index: 0;
}

.avatar {
	position: absolute;
	top: 2rpx;
	left: 0;
	width: 160rpx;
	height: 158rpx;
	object-fit: cover;
	border-radius: 92rpx 92rpx 4rpx 92rpx;
	z-index: 1;
}

.service-details {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
	flex: 1;
	min-width: 0;
}

.service-header {
	display: flex;
	align-items: center;
	gap: 8rpx;
	flex-wrap: wrap;
}

.service-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.role-badge {
	display: inline-flex;
	align-items: center;
	padding: 4rpx 8rpx;
	border-radius: 4rpx;
	height: auto;
	box-sizing: border-box;
}

.badge-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	font-size: 20rpx;
}

.service-role {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
}

.service-skills {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
	flex-wrap: wrap;
}

.skills-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.skill-badge {
	display: inline-flex;
	align-items: center;
	padding: 4rpx 8rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	height: auto;
	box-sizing: border-box;
}

.skill-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 20rpx;
}

.service-stats {
	display: inline-flex;
	align-items: center;
	gap: 16rpx;
}

.rating-section {
	display: inline-flex;
	align-items: center;
	gap: 6rpx;
}

.rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 24rpx;
}

.star-wrapper {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
	padding: 2rpx;
	background-color: #333333;
	border-radius: 4rpx;
}

.star-icon {
	width: 16rpx;
	height: 16rpx;
	flex-shrink: 0;
	filter: brightness(0) invert(1);
}

.stats-section {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.stat-item {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
}

.stat-icon {
	width: 24rpx;
	height: 24rpx;
	flex-shrink: 0;
}

.stat-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.stat-value {
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

.action-bar {
	display: flex;
	height: 72rpx;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.more-link {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
	cursor: pointer;
}

.action-buttons {
	display: inline-flex;
	align-items: center;
	gap: 12rpx;
}

.promote-btn, .book-again-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 148rpx;
	height: 60rpx;
	padding: 16rpx 30rpx;
	border-radius: 4rpx;
	cursor: pointer;
	box-sizing: border-box;
}

.promote-btn {
	background-color: #f6f6f6;
}

.book-again-btn {
	background-color: #333333;
}

.btn-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 22rpx;
	
	&.primary {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
		color: #ffffff;
	}
}
</style>

