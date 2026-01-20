<template>
	<view class="setting-detail-page">
		<view class="main-content">
			<!-- 所有项目卡片 -->
			<view class="settings-card">
				<view class="card-content">
					<!-- 头像 -->
					<view class="setting-item-wrapper">
						<view class="setting-item">
							<text class="setting-label">头像</text>
							<view class="setting-right">
								<image
									class="avatar-preview"
									:src="userInfo.avatar || 'https://bioflex.cn/static/avatar/avatar.png'"
								></image>
							</view>
						</view>
					</view>

					<!-- 分隔线 -->
					<view class="separator-line"></view>

					<!-- 昵称 -->
					<view class="setting-item-wrapper">
						<view class="setting-item">
							<text class="setting-label">昵称</text>
							<view class="setting-right">
								<text class="right-text">{{ userInfo.nickname || '微信用户' }}</text>
							</view>
						</view>
					</view>

					<!-- 分隔线 -->
					<view class="separator-line"></view>

					<!-- 性别 -->
					<view class="setting-item-wrapper">
						<view class="setting-item" @tap="handleItemClick(basicInfoItems[0])">
							<text class="setting-label">性别</text>
							<view class="setting-right">
								<view v-if="userInfo.gender === '男'" class="gender-badge gender-male">
									<image class="gender-icon" src="/static/icon/nanxing.png" mode="aspectFit"></image>
								</view>
								<view v-else-if="userInfo.gender === '女'" class="gender-badge gender-female">
									<image class="gender-icon" src="/static/icon/nvxing.png" mode="aspectFit"></image>
								</view>
								<text class="right-text">{{ userInfo.gender }}</text>
								<view class="action-button">
									<image
										class="button-icon"
										src="https://bioflex.cn/static/icon/gengduo.png"
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
										src="https://bioflex.cn/static/icon/gengduo.png" 
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
						<view class="setting-item" @tap="handleItemClick(basicInfoItems[1])">
							<text class="setting-label">职业</text>
							<view class="setting-right">
								<text class="right-text" :class="{ 'bio-placeholder': !userInfo.profession }">{{ userInfo.profession || '请选择职业' }}</text>
								<view class="action-button">
									<image
										class="button-icon"
										src="https://bioflex.cn/static/icon/gengduo.png"
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
						<view class="setting-item" @tap="handleItemClick(basicInfoItems[2])">
							<text class="setting-label">地区</text>
							<view class="setting-right">
								<text class="right-text">{{ userInfo.region }}</text>
								<view class="action-button">
									<image 
										class="button-icon" 
										src="https://bioflex.cn/static/icon/gengduo.png" 
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
										src="https://bioflex.cn/static/icon/gengduo.png" 
										mode="aspectFit"
									></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 简介编辑弹窗 -->
		<view class="bio-modal" v-if="showBioModal" @tap="closeBioModal">
			<view class="bio-modal-content" @tap.stop>
				<view class="bio-modal-header">
					<text class="bio-modal-title">修改简介</text>
					<text class="bio-modal-close" @tap="closeBioModal">×</text>
				</view>
				<textarea
					class="bio-textarea"
					v-model="tempBio"
					placeholder="请输入1-30字简介"
					maxlength="30"
					:focus="showBioModal"
				></textarea>
				<view class="bio-modal-footer">
					<text class="bio-char-count">{{ tempBio.length }}/30</text>
					<view class="bio-modal-btns">
						<view class="bio-btn bio-btn-cancel" @tap="closeBioModal">取消</view>
						<view class="bio-btn bio-btn-confirm" @tap="confirmBio">确定</view>
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
			basicInfoItems: [
				{ label: '性别', key: 'gender' },
				{ label: '职业', key: 'profession' },
				{ label: '地区', key: 'region' }
			],
			userInfo: {
				avatar: 'https://bioflex.cn/static/avatar/avatar.png',
				nickname: '',
				gender: '',
				profession: '',
				region: '',
				bio: ''
			},
			loading: false,
			showBioModal: false,
			tempBio: ''
		}
	},
	onLoad() {
		this.fetchUserInfo()
	},
	methods: {
		async fetchUserInfo() {
			if (this.loading) return
			this.loading = true

			// 先从本地存储读取用户信息
			const localUserInfo = uni.getStorageSync('userInfo') || {}

			try {
				const res = await api.user.getInfo()
				if (res.code === 200) {
					const data = res.data || {}
					this.userInfo = {
						// 优先使用接口返回的数据，其次使用本地存储的数据
						avatar: data.avatar || localUserInfo.avatar || 'https://bioflex.cn/static/avatar/avatar.png',
						nickname: data.nickname || localUserInfo.nickname || '',
						gender: data.gender || '保密',
						profession: data.profession || '',
						region: data.region || '',
						bio: data.signature || data.bio || ''
					}
				} else {
					// 接口失败时使用本地存储的数据
					this.userInfo.avatar = localUserInfo.avatar || this.userInfo.avatar
					this.userInfo.nickname = localUserInfo.nickname || this.userInfo.nickname
				}
			} catch (err) {
				console.error('获取用户信息失败:', err)
				// 接口异常时使用本地存储的数据
				this.userInfo.avatar = localUserInfo.avatar || this.userInfo.avatar
				this.userInfo.nickname = localUserInfo.nickname || this.userInfo.nickname
			} finally {
				this.loading = false
			}
		},
		async updateUserInfo(key, value) {
			try {
				const res = await api.user.updateInfo({ [key]: value })
				if (res.code === 200) {
					uni.showToast({ title: '已更新', icon: 'success' })
					return true
				} else {
					uni.showToast({ title: '更新失败', icon: 'none' })
					return false
				}
			} catch (err) {
				console.error('更新用户信息失败:', err)
				uni.showToast({ title: '更新失败', icon: 'none' })
				return false
			}
		},
		handleItemClick(item) {
			if (item.key === 'gender') {
				this.editGender()
			} else if (item.key === 'profession') {
				this.editProfession()
			} else if (item.key === 'region') {
				this.editRegion()
			}
		},
		editGender() {
			uni.showActionSheet({
				itemList: ['男', '女', '保密'],
				success: async (res) => {
					const genders = ['男', '女', '保密']
					const oldValue = this.userInfo.gender
					this.userInfo.gender = genders[res.tapIndex]
					const success = await this.updateUserInfo('gender', genders[res.tapIndex])
					if (success) {
						// 同步更新本地存储
						const localUserInfo = uni.getStorageSync('userInfo') || {}
						localUserInfo.gender = genders[res.tapIndex]
						uni.setStorageSync('userInfo', localUserInfo)
						// 通知我的页面刷新
						uni.$emit('refreshMineUserInfo')
					} else {
						this.userInfo.gender = oldValue
					}
				}
			})
		},
		editProfession() {
			uni.showModal({
				title: '修改职业',
				editable: true,
				placeholderText: '请输入职业',
				content: this.userInfo.profession,
				success: async (res) => {
					if (res.confirm && res.content) {
						const oldValue = this.userInfo.profession
						this.userInfo.profession = res.content
						const success = await this.updateUserInfo('profession', res.content)
						if (!success) {
							this.userInfo.profession = oldValue
						}
					}
				}
			})
		},
		editRegion() {
			uni.showModal({
				title: '修改地区',
				editable: true,
				placeholderText: '请输入地区，如：四川-成都',
				content: this.userInfo.region,
				success: async (res) => {
					if (res.confirm && res.content) {
						const oldValue = this.userInfo.region
						this.userInfo.region = res.content
						const success = await this.updateUserInfo('region', res.content)
						if (!success) {
							this.userInfo.region = oldValue
						}
					}
				}
			})
		},
		handleQRCodeClick() {
			uni.navigateTo({
				url: '/packageMine/pages/mine/share-promotion'
			})
		},
		handleBioClick() {
			this.tempBio = this.userInfo.bio || ''
			this.showBioModal = true
		},
		closeBioModal() {
			this.showBioModal = false
		},
		async confirmBio() {
			if (this.tempBio.trim()) {
				const oldValue = this.userInfo.bio
				this.userInfo.bio = this.tempBio
				const success = await this.updateUserInfo('signature', this.tempBio)
				if (!success) {
					this.userInfo.bio = oldValue
				}
			}
			this.showBioModal = false
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

.gender-icon {
	width: 20rpx;
	height: 20rpx;
	flex-shrink: 0;
}

.gender-badge {
	width: 32rpx;
	height: 32rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.gender-male {
	background-color: #DBE8FF;
}

.gender-male .gender-icon {
	filter: invert(45%) sepia(70%) saturate(600%) hue-rotate(190deg) brightness(95%);
}

.gender-female {
	background-color: #FFE4EC;
}

.gender-female .gender-icon {
	filter: invert(55%) sepia(80%) saturate(500%) hue-rotate(310deg) brightness(95%);
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
	background-image: url('https://bioflex.cn/static/icon/erweima.png');
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


.bio-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
}

.bio-modal-content {
	width: 600rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 32rpx;
	box-sizing: border-box;
}

.bio-modal-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 24rpx;
}

.bio-modal-title {
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
}

.bio-modal-close {
	font-size: 48rpx;
	color: #999999;
	line-height: 1;
}

.bio-textarea {
	width: 100%;
	height: 240rpx;
	padding: 20rpx;
	border: 2rpx solid #e5e5e5;
	border-radius: 12rpx;
	font-size: 28rpx;
	color: #333333;
	box-sizing: border-box;
	background-color: #f9f9f9;
}

.bio-modal-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 24rpx;
}

.bio-char-count {
	font-size: 24rpx;
	color: #999999;
}

.bio-modal-btns {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.bio-btn {
	padding: 16rpx 40rpx;
	border-radius: 8rpx;
	font-size: 28rpx;
}

.bio-btn-cancel {
	background-color: #f5f5f5;
	color: #666666;
}

.bio-btn-confirm {
	background-color: #333333;
	color: #ffffff;
}
</style>
