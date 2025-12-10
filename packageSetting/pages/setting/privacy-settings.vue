<template>
	<view class="setting-detail-page">
		<view class="main-content">
			<!-- 隐私设置卡片 -->
			<view class="settings-card">
				<view class="card-content">
					<view 
						v-for="(item, index) in privacyItems" 
						:key="index"
						class="setting-item-wrapper"
					>
						<view v-if="index > 0" class="separator-line"></view>
						<view class="setting-item">
							<view class="item-info">
								<text class="setting-label">{{ item.label }}</text>
								<text class="setting-desc">{{ item.desc }}</text>
							</view>
							
							<switch 
								:checked="item.checked"
								@change="(e) => handleToggleChange(item, e)"
								color="#927eff"
								class="setting-switch"
							></switch>
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
	data() {
		return {
			loading: false,
			privacyItems: [
				{
					key: 'showOnlineStatus',
					label: '开启地理位置',
					desc: '开启后，其他用户可通过位置搜索到您',
					checked: false
				},
				{
					key: 'showBrowseHistory',
					label: '允许访问相册',
					desc: '开启后，可以访问您的相册信息',
					checked: false
				},
				{
					key: 'allowRecommend',
					label: '允许访问相机',
					desc: '开启后，可以访问您的相机',
					checked: false
				},
				{
					key: 'allowMicrophone',
					label: '允许访问麦克风',
					desc: '开启后，可以访问您的麦克风',
					checked: false
				}
			]
		}
	},
	onLoad() {
		this.fetchPrivacySettings()
	},
	methods: {
		async fetchPrivacySettings() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.user.getPrivacySettings()
				if (res.code === 0) {
					const settings = res.data || {}
					// 更新每个隐私项的状态
					this.privacyItems.forEach(item => {
						if (settings[item.key] !== undefined) {
							item.checked = settings[item.key]
						}
					})
				}
			} catch (err) {
				console.error('获取隐私设置失败:', err)
			} finally {
				this.loading = false
			}
		},
		async handleToggleChange(item, event) {
			const checked = event.detail.value || event.target.checked
			const oldValue = item.checked
			item.checked = checked

			try {
				const updateData = { [item.key]: checked }
				const res = await api.user.updatePrivacySettings(updateData)
				if (res.code !== 0) {
					// 恢复原状态
					item.checked = oldValue
					uni.showToast({ title: '设置失败', icon: 'none' })
				}
			} catch (err) {
				// 恢复原状态
				item.checked = oldValue
				console.error('更新隐私设置失败:', err)
				uni.showToast({ title: '设置失败', icon: 'none' })
			}
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
	height: 1rpx;
	background-color: #f0f0f0;
	margin: 24rpx 0;
}

.setting-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 0;
	background-color: transparent;
	border: none;
	box-sizing: border-box;
}

.item-info {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	flex: 1;
}

.setting-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.setting-desc {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 24rpx;
	line-height: 1.4;
}

.setting-switch {
	transform: scale(0.85);
	flex-shrink: 0;
}
</style>
