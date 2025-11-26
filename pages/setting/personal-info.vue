<template>
	<view class="setting-detail-page">
		<view class="status-bar-space"></view>
		<SettingDetailHeader title="个人信息" />
		
		<view class="main-content">
			<!-- 所有项目卡片 -->
			<view class="settings-card">
				<view class="card-content">
					<!-- 头像 -->
					<view class="setting-item-wrapper">
						<view class="setting-item" @tap="handleAvatarClick">
							<text class="setting-label">头像</text>
							<view class="setting-right">
								<image 
									class="avatar-preview" 
									:src="userInfo.avatar"
								></image>
								<view class="action-button">
									<image 
										class="button-icon" 
										src="/static/icon/gengduo.png" 
										mode="aspectFit"
									></image>
								</view>
							</view>
						</view>
					</view>

					<!-- 分隔线 -->
					<view class="separator-line"></view>

					<!-- 昵称 -->
					<view class="setting-item-wrapper">
						<view class="setting-item" @tap="handleItemClick(basicInfoItems[0])">
							<text class="setting-label">昵称</text>
							<view class="setting-right">
								<text class="right-text">{{ userInfo.nickname }}</text>
								<view class="action-button">
									<image 
										class="button-icon" 
										src="/static/icon/gengduo.png" 
										mode="aspectFit"
									></image>
								</view>
							</view>
						</view>
					</view>

					<!-- 分隔线 -->
					<view class="separator-line"></view>

					<!-- 性别 -->
					<view class="setting-item-wrapper">
						<view class="setting-item" @tap="handleItemClick(basicInfoItems[1])">
							<text class="setting-label">性别</text>
							<view class="setting-right">
								<text class="right-text">{{ userInfo.gender }}</text>
								<view class="action-button">
									<image 
										class="button-icon" 
										src="/static/icon/gengduo.png" 
										mode="aspectFit"
									></image>
								</view>
							</view>
						</view>
					</view>

					<!-- 分隔线 -->
					<view class="separator-line"></view>

					<!-- 二维码名片 -->
					<view class="setting-item-wrapper">
						<view class="setting-item" @tap="handleQRCodeClick">
							<text class="setting-label">二维码名片</text>
							<view class="setting-right">
								<view class="qrcode-preview"></view>
								<view class="action-button">
									<image 
										class="button-icon" 
										src="/static/icon/gengduo.png" 
										mode="aspectFit"
									></image>
								</view>
							</view>
						</view>
					</view>

					<!-- 分隔线 -->
					<view class="separator-line"></view>

					<!-- 职业 -->
					<view class="setting-item-wrapper">
						<view class="setting-item" @tap="handleItemClick(basicInfoItems[2])">
							<text class="setting-label">职业</text>
							<view class="setting-right">
								<text class="right-text">{{ userInfo.profession }}</text>
								<view class="action-button">
									<image 
										class="button-icon" 
										src="/static/icon/gengduo.png" 
										mode="aspectFit"
									></image>
								</view>
							</view>
						</view>
					</view>

					<!-- 分隔线 -->
					<view class="separator-line"></view>

					<!-- 地区 -->
					<view class="setting-item-wrapper">
						<view class="setting-item" @tap="handleItemClick(basicInfoItems[3])">
							<text class="setting-label">地区</text>
							<view class="setting-right">
								<text class="right-text">{{ userInfo.region }}</text>
								<view class="action-button">
									<image 
										class="button-icon" 
										src="/static/icon/gengduo.png" 
										mode="aspectFit"
									></image>
								</view>
							</view>
						</view>
					</view>

					<!-- 分隔线 -->
					<view class="separator-line"></view>

					<!-- 简介 -->
					<view class="setting-item-wrapper">
						<view class="setting-item" @tap="handleBioClick">
							<text class="setting-label">简介</text>
							<view class="setting-right">
								<text class="right-text bio-placeholder">{{ userInfo.bio }}</text>
								<view class="action-button">
									<image 
										class="button-icon" 
										src="/static/icon/gengduo.png" 
										mode="aspectFit"
									></image>
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
import SettingDetailHeader from '@/components/setting/SettingDetailHeader.vue'

export default {
	components: {
		SettingDetailHeader
	},
	data() {
		return {
			basicInfoItems: [
				{ label: '昵称', key: 'nickname' },
				{ label: '性别', key: 'gender' },
				{ label: '职业', key: 'profession' },
				{ label: '地区', key: 'region' }
			],
			userInfo: {
				avatar: 'https://c.animaapp.com/mi5nkzbpeEnFKd/img/placeholder-avatar.png',
				nickname: 'yangqixiaonv',
				gender: '女',
				profession: '美发师',
				region: '四川-成都',
				bio: '输入1-30字简介'
			}
		}
	},
	methods: {
		handleAvatarClick() {
			uni.showActionSheet({
				itemList: ['拍照', '从相册选择', '删除'],
				success: (res) => {
					console.log('Avatar action:', res.tapIndex)
				}
			})
		},
		handleItemClick(item) {
			console.log('Edit:', item.label)
		},
		handleQRCodeClick() {
			console.log('Edit QR code')
		},
		handleBioClick() {
			console.log('Edit bio')
		}
	}
}
</script>

<style scoped lang="scss">
.setting-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.main-content {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 12rpx;
	gap: 12rpx;
	padding-bottom: 160rpx;
	box-sizing: border-box;
}

.settings-card {
	width: 100%;
	max-width: 726rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-sizing: border-box;
	margin: 0 auto;
}

.card-content {
	padding: 0;
	box-sizing: border-box;
}

.setting-item-wrapper {
	display: flex;
	flex-direction: column;
}

.separator-line {
	width: 100%;
	height: 1rpx;
	background-color: #e5e5e5;
	margin: 0;
}

.setting-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	cursor: pointer;
	padding: 32rpx 34rpx;
	background-color: transparent;
	border: none;
	box-sizing: border-box;
	min-height: 80rpx;
}

.setting-item-wrapper:first-child .setting-item {
	padding: 30rpx;
	min-height: 100rpx;
	background-color: #ffffff;
}

.setting-item-wrapper:nth-child(3) {
	border-top: 12rpx solid #f2f2f2;
}

.setting-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
	flex-shrink: 0;
}

.setting-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
	flex-shrink: 0;
}

.right-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 28rpx;
	text-align: right;
	max-width: 300rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.bio-placeholder {
	color: #a6a6a6;
	font-size: 26rpx;
}

.avatar-preview {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	flex-shrink: 0;
	background-color: #e5e5e5;
}

.qrcode-preview {
	width: 50rpx;
	height: 50rpx;
	flex-shrink: 0;
	background-image: url('/static/icon/erweima.png');
	background-position: 0% 0%;
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.action-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
	border-radius: 6rpx;
	background-color: transparent;
	cursor: pointer;
	flex-shrink: 0;
	padding: 4rpx;
}

.button-icon {
	width: 24rpx;
	height: 24rpx;
	flex-shrink: 0;
}
</style>
