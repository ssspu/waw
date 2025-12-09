<template>
	<view class="services-section">
		<!-- 加载状态 -->
		<view v-if="loading" class="loading-state">
			<text class="loading-text">加载中...</text>
		</view>

		<!-- 设计师介绍标签页内容 -->
		<template v-else-if="activeTab === 'designer'">
			<image
				class="profile-image"
				:src="designer && designer.coverImage ? designer.coverImage : '/static/background-image/designer-cover.png'"
				mode="aspectFill"
			></image>

			<view class="card overview-card">
				<view class="card-content">
					<text class="card-title">概况介绍</text>

					<view class="overview-list">
						<view
							v-for="(item, index) in overviewItems"
							:key="index"
							class="overview-item"
						>
							<view class="overview-row">
								<text class="overview-label">{{ item.label }}</text>
								<view class="overview-value-wrapper">
									<view class="overview-value-group">
										<text class="overview-value">{{ item.value }}</text>
										<text v-if="item.extra" class="overview-extra">{{ item.extra }}</text>
									</view>
									<image
										v-if="item.hasPhone"
										class="phone-icon"
										src="https://c.animaapp.com/mi5eklbiAEaKLJ/img/phone.svg"
										mode="aspectFit"
									></image>
								</view>
							</view>
							<view class="separator-line"></view>
						</view>

						<view class="overview-item personal-intro">
							<text class="overview-label">个人介绍</text>
							<text class="personal-intro-text">
								{{ designer && designer.introduction ? designer.introduction : '暂无介绍' }}
							</text>
						</view>
					</view>
				</view>
			</view>
		</template>
		
		<!-- 服务特色标签页内容 -->
		<template v-else-if="activeTab === 'service'">
			<view class="card service-card">
				<view class="card-content">
					<text class="card-title">服务特色</text>

					<view class="badges-container">
						<view
							v-for="(feature, index) in serviceFeatures"
							:key="index"
							class="feature-badge"
						>
							<text class="badge-text">{{ feature }}</text>
						</view>
					</view>

					<text class="section-label">其他</text>

					<view class="badges-container">
						<view
							v-for="(feature, index) in otherFeatures"
							:key="index"
							class="feature-badge"
						>
							<text class="badge-text">{{ feature }}</text>
						</view>
					</view>
				</view>
			</view>
		</template>
		
		<!-- 环境设施标签页内容 -->
		<template v-else-if="activeTab === 'environment'">
			<view class="card environment-card">
				<view class="card-content">
					<text class="card-title">环境设施</text>

					<text class="section-label">环境设施</text>

					<view class="badges-container">
						<view
							v-for="(facility, index) in environmentFacilities"
							:key="index"
							class="feature-badge"
						>
							<text class="badge-text">{{ facility }}</text>
						</view>
					</view>

					<text class="section-label">通用设施</text>

					<view class="badges-container">
						<view
							v-for="(facility, index) in generalFacilities"
							:key="index"
							class="feature-badge"
						>
							<text class="badge-text">{{ facility }}</text>
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
import api from '@/api/index.js'

export default {
	props: {
		activeTab: {
			type: String,
			default: 'designer'
		},
		designerId: {
			type: [String, Number],
			default: '1'
		}
	},
	data() {
		return {
			loading: false,
			designer: null,
			overviewItems: [],
			serviceFeatures: [],
			otherFeatures: [],
			environmentFacilities: [],
			generalFacilities: []
		}
	},
	watch: {
		designerId: {
			handler(newVal) {
				if (newVal) {
					this.fetchDesignerInfo()
				}
			},
			immediate: true
		}
	},
	methods: {
		async fetchDesignerInfo() {
			if (!this.designerId) return

			this.loading = true
			try {
				const res = await api.designer.getDetail(this.designerId)
				if (res.code === 0 && res.data) {
					this.designer = res.data
					this.buildOverviewItems()
					this.buildFeatures()
				}
			} catch (e) {
				console.error('获取设计师信息失败:', e)
			} finally {
				this.loading = false
			}
		},
		buildOverviewItems() {
			if (!this.designer) return
			const d = this.designer
			this.overviewItems = [
				{ label: '职位', value: d.position || '设计师' },
				{ label: '职称', value: d.level ? `国家${d.level}${d.role}` : '美发师' },
				{ label: '擅长', value: d.specialties ? d.specialties.join('、') : '造型设计' },
				{ label: '工作时间', value: '周二 - 周日', extra: '10:00-21:00' },
				{ label: '从业时间', value: d.experience ? `${d.experience}年` : '未知' },
				{ label: '预约时间', value: '提前3小时' },
				{ label: '联系电话', value: '+86 1891808747', hasPhone: true }
			]
		},
		buildFeatures() {
			// 根据设计师标签生成服务特色
			if (this.designer && this.designer.tags) {
				this.serviceFeatures = [
					'全预约制',
					'免费茶点',
					'头皮检测',
					'免费停车',
					'烫染专业店',
					'免费修眉',
					'一对一服务',
					'免费按摩',
					'没有隐形消费',
					'可上门服务'
				]
			} else {
				this.serviceFeatures = [
					'全预约制',
					'免费茶点',
					'头皮检测',
					'免费停车'
				]
			}
			this.otherFeatures = [
				'不可携带宠物',
				'服务区不可吸烟'
			]
			this.environmentFacilities = [
				'储物柜',
				'免费Wifi',
				'充电宝',
				'可看电视',
				'VIP专区',
				'沙发座'
			]
			this.generalFacilities = [
				'特定吸烟区',
				'电梯',
				'有停车位',
				'空调',
				'先进/刷卡支付'
			]
		}
	}
}
</script>

<style scoped lang="scss">
.loading-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 100rpx 0;
	width: 100%;
}

.loading-text {
	font-size: 28rpx;
	color: #999999;
}

.services-section {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}

.section-block {
	width: 100%;
	padding: 0 20rpx 24rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24rpx;
}

.profile-image {
	position: relative;
	width: calc(100% + 40rpx);
	max-width: calc(100% + 40rpx);
	margin: 0 -20rpx 12rpx;
	height: 360rpx;
	object-fit: cover;
	border-radius: 0;
}

.card {
	width: 100%;
	max-width: 726rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
	box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.04);
}

.card-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 24rpx;
	padding: 34rpx 32rpx;
}

.card-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: 600;
	color: #111111;
	font-size: 30rpx;
}

.overview-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20rpx;
	padding: 0 10rpx;
	width: 100%;
}

.overview-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20rpx;
	width: 100%;
}

.overview-row {
	display: flex;
	align-items: center;
	gap: 16rpx;
	width: 100%;
}

.overview-label {
	width: 140rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
	white-space: nowrap;
	flex-shrink: 0;
}

.overview-value-wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex: 1;
	gap: 16rpx;
}

.overview-value-group {
	display: inline-flex;
	align-items: center;
	gap: 16rpx;
}

.overview-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 26rpx;
	line-height: 38rpx;
}

.overview-extra {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
}

.phone-icon {
	width: 32rpx;
	height: 32rpx;
	color: #333333;
}

.separator-line {
	width: 100%;
	height: 1rpx;
	background-color: #e5e5e5;
}

.personal-intro {
	display: inline-flex;
	align-items: flex-start;
	gap: 16rpx;
	width: 100%;
}

.personal-intro-text {
	flex: 1;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
	line-height: 40rpx;
}

.badges-container {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 12rpx;
	width: 100%;
}

.feature-badge {
	flex: 0 0 calc(50% - 6rpx);
	max-width: calc(50% - 6rpx);
	height: 70rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f6f6f6;
	border-radius: 8rpx;
	padding: 16rpx;
	box-sizing: border-box;
}

.badge-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 22rpx;
	text-align: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.section-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
}
</style>

