<template>
	<view class="setting-detail-page">
		<view class="main-content">
		<!-- 地倝列表 -->
		<view 
			v-for="(address, index) in addresses" 
			:key="index"
			class="address-card"
		>
			<view class="card-content">
				<!-- 地倝头部 -->
				<view class="address-header">
					<view class="address-check">
						<view 
							v-if="address.isDefault"
							class="check-icon checked"
						>
							<text class="check-mark">✓</text>
						</view>
						<view 
							v-else
							class="check-icon unchecked"
						></view>
					</view>
					
					<view class="address-info">
						<view class="info-top">
							<text class="address-name">{{ address.name }} {{ address.phone }}</text>
							<text v-if="address.isDefault" class="default-tag">默认地倝</text>
						</view>
						<text class="address-title">{{ address.province }}{{ address.city }}{{ address.district }}</text>
						<text class="address-detail">{{ address.detail }}</text>
					</view>
					
					<view class="edit-button-wrapper">
						<view class="separator-line"></view>
						<view class="edit-icon-container" @tap="handleEditAddress(address)">
							<image 
								class="edit-icon-image" 
								src="https://bioflex.cn/static/icon/bianji.png"
								mode="aspectFit"
							></image>
						</view>
					</view>
				</view>
			</view>
		</view>

			<!-- 新增地倝按钮 -->
			<view class="add-address-btn" @tap="handleAddAddress">
				<text class="add-text">新增地倝</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addresses: [
				{
					id: 1,
					name: '李小姐',
					phone: '18999279748',
					isDefault: true,
					province: '四川省',
					city: '成都市',
					district: '武侯区',
					title: '默认地倝',
					detail: '软件园b7栋613号武侯区软件园b7栋613号'
				},
				{
					id: 2,
					name: '李小姐',
					phone: '18999279748',
					isDefault: false,
					province: '四川省',
					city: '成都市',
					district: '武侯区',
					title: '默认地倝',
					detail: '软件园b7栋613号武侯区软件园b7栋613号'
				}
			]
		}
	},
	methods: {
		handleEditAddress(address) {
			uni.navigateTo({ url: `/packageSetting/pages/setting/edit-address?id=${address.id}` })
		},
		handleDeleteAddress(address) {
			uni.showModal({
				title: '删除地倝',
				content: '确定要删除这个地倝吗？',
				success: (res) => {
					if (res.confirm) {
						console.log('Delete address:', address.id)
					}
				}
			})
		},
		handleAddAddress() {
			uni.navigateTo({ url: '/packageSetting/pages/setting/edit-address' })
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

.address-card {
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

.address-header {
	display: flex;
	align-items: center;
	gap: 16rpx;
	padding: 24rpx 30rpx;
	box-sizing: border-box;
	justify-content: space-between;
}

.address-check {
	flex-shrink: 0;
	margin-top: 8rpx;
}

.check-icon {
	width: 28rpx;
	height: 28rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2rpx solid #e5e5e5;
}

.check-icon.checked {
	background-color: #927eff;
	border-color: #927eff;
}

.check-icon.unchecked {
	background-color: #ffffff;
}

.check-mark {
	color: #ffffff;
	font-size: 16rpx;
	font-weight: bold;
	line-height: 1;
}

.address-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	min-width: 0;
}

.info-top {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.address-name {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.default-tag {
	background-color: transparent;
	color: #a6a6a6;
	font-size: 24rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
}

.address-title {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 26rpx;
}

.address-detail {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 26rpx;
	line-height: 1.4;
	word-wrap: break-word;
}

.edit-button-wrapper {
	display: flex;
	align-items: center;
	flex-shrink: 0;
	margin-left: 16rpx;
	gap: 16rpx;
}

.separator-line {
	width: 2rpx;
	height: 60rpx;
	background-color: #d9d9d9;
}

.edit-icon-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50rpx;
	height: 50rpx;
	cursor: pointer;
	flex-shrink: 0;
}

.edit-icon-image {
	width: 40rpx;
	height: 40rpx;
	flex-shrink: 0;
	opacity: 0.6;
}

.add-address-btn {
	width: 100%;
	max-width: 726rpx;
	background-color: #000000;
	padding: 20rpx;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	position: relative;
	margin: 0 auto;
	box-sizing: border-box;
	margin-top: 24rpx;
}

.add-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #ffffff;
	font-size: 28rpx;
}
</style>
