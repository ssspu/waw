<template>
	<view class="setting-detail-page">
		<SettingDetailHeader title="账号安全" />
		
		<view class="main-content">
		<!-- 安全信息卡片 -->
		<view class="settings-card">
			<view class="card-content">
				<view 
					v-for="(item, index) in securityItems" 
					:key="index"
					class="setting-item-wrapper"
				>
					<view v-if="index > 0" class="separator-line"></view>
					<view class="setting-item" @tap="handleItemClick(item)">
						<text class="setting-label">{{ item.label }}</text>
						<view class="setting-right">
							<text v-if="item.value" class="right-text">{{ item.value }}</text>
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
			securityItems: [
				{ label: '修改手机号码', value: '151****65' },
				{ label: '修改登录密码', value: '' }
			]
		}
	},
	methods: {
		handleItemClick(item) {
			console.log('Edit:', item.label)
			// 根据不同的安全设置项打开对应的页面
			if (item.label === '修改手机号码') {
				this.navigateToEditPhone()
			} else if (item.label === '修改登录密码') {
				this.navigateToEditPassword()
			}
		},
		navigateToEditPhone() {
			console.log('Navigate to edit phone')
		},
		navigateToEditPassword() {
			console.log('Navigate to edit password')
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
	padding: 30rpx;
	box-sizing: border-box;
}

.setting-item-wrapper {
	display: flex;
	flex-direction: column;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
	margin: 30rpx 0;
}

.setting-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	cursor: pointer;
	padding: 0;
	background-color: transparent;
	border: none;
	box-sizing: border-box;
}

.setting-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.setting-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.right-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 28rpx;
	text-align: right;
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

.chevron-text {
	font-size: 32rpx;
	color: #a6a6a6;
	line-height: 1;
	font-weight: normal;
}
</style>

