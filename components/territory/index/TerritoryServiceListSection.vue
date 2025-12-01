<template>
	<view class="territory-service-list-section">
		<view class="card-content">
			<!-- 头部信息 -->
			<view class="header-info">
				<view class="info-left">
					<text 
						v-for="(item, index) in headerInfo" 
						:key="index" 
						class="info-text"
					>{{ item.text }}</text>
				</view>
				<text class="info-price">¥888.00</text>
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
							:src="avatarSrc" 
							mode="aspectFill"
						></image>
					</view>
					
					<!-- 详情 -->
					<view class="service-details">
						<view class="service-header">
							<text class="service-name">李天天</text>
							<view class="role-badge" style="background-color: #f6f6f6; color: #666666;">
								<text class="badge-text">美发师</text>
							</view>
							<view class="role-badge" style="background-color: #dacbb1; color: #645e57;">
								<text class="badge-text">高级</text>
							</view>
						</view>
						
						<text class="service-role">店长｜从业12年</text>
						
						<view class="service-skills">
							<text class="skills-label">擅长:</text>
							<view 
								v-for="(specialty, index) in specialties" 
								:key="index" 
								class="skill-badge"
							>
								<text class="skill-text">{{ specialty.label }}</text>
							</view>
						</view>
						
						<view class="service-stats">
							<view class="rating-section">
								<text class="rating-score">4.8</text>
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
									<text class="stat-value">287</text>
								</view>
								<text class="stat-divider">｜</text>
								<view class="stat-item">
									<text class="stat-label">作品</text>
									<text class="stat-value">123</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		<!-- 底部操作 -->
		<view class="action-bar">
			<view class="more-wrapper">
				<text class="more-link" @tap="handleMore">更多</text>
				<!-- 删除菜单 -->
				<view v-if="showMoreMenu" class="more-menu">
					<view class="menu-item" @tap="handleDelete">
						<text>删除</text>
					</view>
				</view>
			</view>
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
		
		<!-- 分享弹窗 -->
		<view v-if="showShareModal" class="share-modal-overlay" @tap="closeShareModal">
			<view class="share-modal" @tap.stop="">
				<view class="share-grid">
					<view class="share-item" @tap="handleShare('wechat')">
						<view class="share-icon">
							<image class="share-icon-img" src="/static/icon/weixin.png" mode="aspectFit"></image>
						</view>
						<text class="share-label">微信</text>
					</view>
					<view class="share-item" @tap="handleShare('moments')">
						<view class="share-icon">
							<image class="share-icon-img" src="/static/icon/shejiaotubiao-42.png" mode="aspectFit"></image>
						</view>
						<text class="share-label">朋友圈</text>
					</view>
					<view class="share-item" @tap="handleShare('weibo')">
						<view class="share-icon">
							<image class="share-icon-img" src="/static/icon/iconfontzhizuobiaozhunbduan36.png" mode="aspectFit"></image>
						</view>
						<text class="share-label">微博</text>
					</view>
					<view class="share-item" @tap="handleShare('link')">
						<view class="share-icon">
							<image class="share-icon-img" src="/static/icon/lianjie.png" mode="aspectFit"></image>
						</view>
						<text class="share-label">复制链接</text>
					</view>
					<view class="share-item" @tap="handleShare('qrcode')">
						<view class="share-icon">
							<image class="share-icon-img" src="/static/icon/saoyisao.png" mode="aspectFit"></image>
						</view>
						<text class="share-label">服务二维码</text>
					</view>
				</view>
				<view class="share-cancel" @tap="closeShareModal">
					<text>取消</text>
				</view>
			</view>
		</view>
		
		<!-- 确认删除弹窗 -->
		<view v-if="showDeleteConfirm" class="confirm-modal-overlay" @tap="closeDeleteConfirm">
			<view class="confirm-modal" @tap.stop="">
				<text class="confirm-title">删除服务</text>
				<text class="confirm-content">确定要删除这个设计师吗？</text>
				<view class="confirm-buttons">
					<view class="confirm-btn cancel-btn" @tap="closeDeleteConfirm">
						<text>取消</text>
					</view>
					<view class="confirm-btn delete-btn" @tap="confirmDelete">
						<text>删除</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isBrandMode: {
			type: Boolean,
			default: false
		},
		avatarSrc: {
			type: String,
			default: 'https://c.animaapp.com/mi5ng54v4eM3X6/img/rectangle-153-2.png'
		}
	},
	data() {
		return {
			headerInfo: [
				{ text: "2025-05-05" },
				{ text: "｜" },
				{ text: "洗剪吹" },
				{ text: "｜" },
				{ text: "欧莱雅生化烫" },
			],
			specialties: [
				{ label: "女士造型" },
				{ label: "烫发设计" },
				{ label: "短发造型" },
			],
			showShareModal: false,
			showMoreMenu: false,
			showDeleteConfirm: false
		}
	},
	methods: {
		handleMore() {
			this.showMoreMenu = !this.showMoreMenu
		},
		handlePromote() {
			this.showShareModal = true
		},
		closeShareModal() {
			this.showShareModal = false
		},
		handleShare(type) {
			console.log('Share via:', type)
			this.showShareModal = false
			// 实现不同渠道的分享逻辑
		},
		handleDelete() {
			this.showMoreMenu = false
			this.showDeleteConfirm = true
		},
		closeDeleteConfirm() {
			this.showDeleteConfirm = false
		},
		confirmDelete() {
			console.log('Delete confirmed')
			this.showDeleteConfirm = false
			// 实现删除逻辑
		},
		handleBookAgain() {
			// 跳转到设计师详情页
			uni.navigateTo({
				url: '/pages/designer/info'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.territory-service-list-section {
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
	align-items: flex-end;
	gap: 4rpx;
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
	display: flex;
	align-items: center;
	gap: 12rpx;
	flex: 1;
	justify-content: flex-end;
}

.promote-btn,
.book-again-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 220rpx;
	height: 60rpx;
	padding: 0 30rpx;
	border-radius: 4rpx;
	cursor: pointer;
	box-sizing: border-box;
	flex-shrink: 0;
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
	white-space: nowrap;
	display: block;
	
	&.primary {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
		color: #ffffff;
		white-space: nowrap;
	}
}

.share-modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: flex-end;
	z-index: 1000;
}

.share-modal {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx 16rpx 0 0;
	padding: 30rpx 0;
	box-sizing: border-box;
}

.share-grid {
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 30rpx 20rpx;
	flex-wrap: wrap;
	gap: 20rpx;
}

.share-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;
	cursor: pointer;
}

.share-icon {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5f5f5;
}

.share-icon-img {
	width: 60rpx;
	height: 60rpx;
}

.share-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
	text-align: center;
}

.share-cancel {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20rpx;
	border-top: 1rpx solid #f0f0f0;
	cursor: pointer;
}

.share-cancel text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #999999;
	font-size: 28rpx;
}

.more-wrapper {
	position: relative;
}

.more-menu {
	position: absolute;
	bottom: 100%;
	left: 0;
	background-color: #ffffff;
	border-radius: 4rpx;
	border: 1rpx solid #e5e5e5;
	min-width: 100rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	z-index: 100;
	margin-bottom: 8rpx;
}

.menu-item {
	padding: 12rpx 20rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #e6162d;
	font-size: 26rpx;
	cursor: pointer;
	text-align: center;
}

.menu-item:active {
	background-color: #f5f5f5;
}

.confirm-modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1001;
}

.confirm-modal {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 40rpx 30rpx;
	width: 80%;
	max-width: 540rpx;
	text-align: center;
	box-sizing: border-box;
}

.confirm-title {
	display: block;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 32rpx;
	margin-bottom: 16rpx;
}

.confirm-content {
	display: block;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 28rpx;
	margin-bottom: 40rpx;
	line-height: 1.4;
}

.confirm-buttons {
	display: flex;
	gap: 16rpx;
	justify-content: center;
}

.confirm-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 200rpx;
	height: 60rpx;
	border-radius: 4rpx;
	cursor: pointer;
	box-sizing: border-box;
}

.cancel-btn {
	background-color: #f6f6f6;
	border: 1rpx solid #e5e5e5;
}

.cancel-btn text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 28rpx;
}

.delete-btn {
	background-color: #333333;
}

.delete-btn text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffffff;
	font-size: 28rpx;
}
</style>

