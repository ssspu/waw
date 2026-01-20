<template>
	<view class="services-section">
		<view v-if="loading" class="loading-state">
			<text class="loading-text">加载中...</text>
		</view>

		<template v-else>
			<!-- 品牌介绍内容 -->
			<view id="designer" class="section-container">
				<image
					class="profile-image"
					:src="brand && brand.coverImage ? brand.coverImage : 'https://bioflex.cn/static/background-image/brand-cover.png'"
					mode="aspectFill"
				></image>

				<view class="card overview-card">
					<view class="card-content">
						<text class="card-title">品牌介绍</text>

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
								<text class="overview-label">品牌介绍</text>
								<text class="personal-intro-text">
									{{ brand && brand.introduction ? brand.introduction : '暂无介绍' }}
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 服务特色内容 -->
			<view id="service" class="section-container">
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
			</view>
			
			<!-- 环境设施内容 -->
			<view id="environment" class="section-container">
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
		brandId: {
			type: [String, Number],
			default: '1'
		}
	},
	data() {
		return {
			loading: false,
			brand: null,
			overviewItems: [],
			serviceFeatures: [],
			otherFeatures: [],
			environmentFacilities: [],
			generalFacilities: []
		}
	},
	watch: {
		brandId: {
			handler(newVal) {
				if (newVal) {
					this.fetchBrandInfo()
				}
			},
			immediate: true
		}
	},
	methods: {
		async fetchBrandInfo() {
			if (!this.brandId) return

			this.loading = true
			try {
				const res = await api.brand.getDetail(this.brandId)
				if (res.code === 200 && res.data) {
					this.brand = res.data
					this.buildOverviewItems()
					this.buildFeatures()
				}
			} catch (e) {
				console.error('获取品牌信息失败:', e)
			} finally {
				this.loading = false
			}
		},
		buildOverviewItems() {
			if (!this.brand) return
			const b = this.brand
			this.overviewItems = [
				{ label: '品牌类型', value: b.type || '专业美发店' },
				{ label: '成立时间', value: b.establishedYear ? `${b.establishedYear}年` : '2018年' },
				{ label: '主营项目', value: b.mainServices || '剪发烫发染发护发' },
				{ label: '营业时间', value: b.businessDays || '周一 - 周日', extra: b.businessHours || '10:00-22:00' },
				{ label: '设计师数量', value: b.designerCount ? `${b.designerCount}位` : '12位' },
				{ label: '联系电话', value: b.phone || '+86 1891808747', hasPhone: true }
			]
		},
		buildFeatures() {
			
			if (this.brand && this.brand.tags) {
				this.serviceFeatures = this.brand.tags
			} else {
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
				'现金/刷卡支付'
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
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}

.section-container {
	width: 100%;
	padding: 0 12rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.profile-image {
	position: relative;
	width: calc(100% + 48rpx);
	margin-left: -24rpx;
	height: 480rpx;
	object-fit: cover;
	border-radius: 0;
}

.card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	box-shadow: none;
	margin-bottom: 20rpx;
}

.card-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 24rpx;
	padding: 32rpx;
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
