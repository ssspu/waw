<template>
	<view class="setting-detail-page">
		<view class="status-bar-space"></view>
		<SettingDetailHeader title="编辑收货地址" />

		<view class="main-content">
			<view class="settings-card">
				<view class="card-content">
					<view class="form-row">
						<text class="row-label">收货人</text>
						<input
							class="row-input"
							v-model="recipient"
							type="text"
							placeholder="请输入收货人姓名"
							maxlength="20"
						/>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">联系方式</text>
						<input
							class="row-input"
							v-model="phone"
							type="number"
							placeholder="手机号"
							maxlength="11"
						/>
					</view>
					<view class="separator-line"></view>
					<view class="form-row region-row" @tap="handleChooseRegion">
						<text class="row-label">所在地</text>
						<view class="region-input">
							<text :class="['region-text', { placeholder: !regionDisplay }]">
								{{ regionDisplay || '请选择' }}
							</text>
							<image class="chevron-icon" src="/static/icon/gengduo.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">详细地址</text>
						<input
							class="row-input"
							v-model="detailAddress"
							type="text"
							placeholder="详细地址"
							maxlength="60"
						/>
					</view>
					<view class="separator-line"></view>
					<view class="form-row switch-row">
						<text class="row-label">设为默认地址</text>
						<switch
							class="default-switch"
							:checked="isDefault"
							color="#927eff"
							@change="onDefaultChange"
						></switch>
					</view>
				</view>
			</view>

			<view class="delete-card">
				<button class="delete-btn" @tap="handleDelete">删除收货地址</button>
			</view>

			<view class="submit-btn-group">
				<button class="confirm-btn" @tap="handleSave">认证信息</button>
			</view>
		</view>
	</view>
</template>

<script>
import SettingDetailHeader from '@/components/setting/SettingDetailHeader.vue'

export default {
	components: { SettingDetailHeader },
	data() {
		return {
			recipient: '小悦悦',
			phone: '',
			region: {
				province: '',
				city: '',
				district: ''
			},
			detailAddress: '',
			isDefault: true
		}
	},
	computed: {
		regionDisplay() {
			const { province, city, district } = this.region
			return province && city && district ? `${province}${city}${district}` : ''
		}
	},
	methods: {
		handleChooseRegion() {
			uni.showActionSheet({
				itemList: ['四川省 成都市 武侯区', '北京市 朝阳区', '上海市 浦东新区'],
				success: ({ tapIndex }) => {
					const list = [
						{ province: '四川省', city: '成都市', district: '武侯区' },
						{ province: '北京市', city: '北京市', district: '朝阳区' },
						{ province: '上海市', city: '上海市', district: '浦东新区' }
					]
					this.region = list[tapIndex]
				}
			})
		},
		onDefaultChange(e) {
			this.isDefault = e.detail.value
		},
		handleDelete() {
			uni.showModal({
				title: '删除收货地址',
				content: '确定要删除该地址吗？',
				success: (res) => {
					if (res.confirm) {
						uni.showToast({ title: '已删除', icon: 'success' })
						setTimeout(() => { uni.navigateBack() }, 600)
					}
				}
			})
		},
		handleSave() {
			if (!this.recipient.trim()) {
				uni.showToast({ title: '请输入收货人', icon: 'none' })
				return
			}
			if (!/^1\d{10}$/.test(this.phone)) {
				uni.showToast({ title: '请输入有效手机号', icon: 'none' })
				return
			}
			if (!this.regionDisplay) {
				uni.showToast({ title: '请选择地区', icon: 'none' })
				return
			}
			if (!this.detailAddress.trim()) {
				uni.showToast({ title: '请输入详细地址', icon: 'none' })
				return
			}
			uni.showLoading({ title: '保存中...' })
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({ title: '保存成功', icon: 'success' })
				setTimeout(() => { uni.navigateBack() }, 800)
			}, 800)
		}
	}
}
</script>

<style scoped lang="scss">
.setting-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f6f6f6;
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
	padding: 24rpx;
	gap: 24rpx;
	padding-bottom: 220rpx;
	box-sizing: border-box;
}

.settings-card, .delete-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	box-sizing: border-box;
}

.card-content {
	padding: 30rpx;
	box-sizing: border-box;
}

.form-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
}

.row-label {
	width: 140rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: 400;
	color: #1d1d1f;
	font-size: 30rpx;
	white-space: nowrap;
}

.row-input {
	flex: 1;
	padding: 10rpx 0;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 30rpx;
	color: #1d1d1f;
	border: none;
	background: transparent;
	text-align: left;
}

.row-input::placeholder {
	color: #b9b9b9;
}

.region-row {
	cursor: pointer;
}

.region-input {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12rpx;
}

.region-text {
	flex: 1;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #1d1d1f;
	text-align: left;
}

.region-text.placeholder {
	color: #b9b9b9;
}

.chevron-icon {
	width: 28rpx;
	height: 28rpx;
	flex-shrink: 0;
	opacity: 0.6;
}

.switch-row {
	padding: 10rpx 0;
}

.default-switch {
	transform: scale(0.86);
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #ebebeb;
	margin: 20rpx 0;
}


.delete-btn {
	width: 100%;
	padding: 24rpx 0;
	border: none;
	background-color: transparent;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	color: #000000;
}

.submit-btn-group {
	position: fixed;
	left: 24rpx;
	right: 24rpx;
	bottom: 48rpx;
	box-sizing: border-box;
}

.confirm-btn {
	width: 100%;
	padding: 24rpx;
	background-color: #333333;
	color: #ffffff;
	border: none;
	border-radius: 12rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 30rpx;
}
</style>

