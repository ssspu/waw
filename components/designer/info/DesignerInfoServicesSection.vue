<template>
	<view class="services-section">
		<!-- 加载状态 -->
		<view v-if="loading" class="loading-state">
			<text class="loading-text">加载中...</text>
		</view>

		<template v-else>
			<!-- 设计师介绍/品牌介绍 -->
			<view id="designer" class="section-block">
				<image
					class="profile-image"
					:src="designer && designer.coverImage ? designer.coverImage : 'https://bioflex.cn/static/background-image/designer-cover.png'"
					mode="aspectFill"
				></image>

				<view class="card overview-card">
					<view class="card-content">
						<text class="card-title">概况介绍</text>

						<view class="overview-list">
							<view
								v-for="(item, index) in serviceInfoData"
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
											@tap="$emit('phone')"
										></image>
									</view>
								</view>
								<view v-if="index < serviceInfoData.length - 1" class="separator-line"></view>
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
			</view>
			
			<!-- 服务特色 -->
			<view id="service" class="section-block">
				<view class="card service-card">
					<view class="card-content">
						<text class="card-title">服务特色</text>

						<view v-for="(section, sIndex) in serviceFeaturesData" :key="sIndex" class="feature-section">
							<text v-if="section.title" class="section-label">{{ section.title }}</text>
							<view class="badges-container">
								<view
									v-for="(tag, tIndex) in section.tags"
									:key="tIndex"
									class="feature-badge"
								>
									<text class="badge-text">{{ tag }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 环境设施 -->
			<view id="environment" class="section-block">
				<view class="card environment-card">
					<view class="card-content">
						<text class="card-title">环境设施</text>

						<view v-for="(section, sIndex) in environmentData" :key="sIndex" class="feature-section">
							<text v-if="section.title" class="section-label">{{ section.title }}</text>
							<view class="badges-container">
								<view
									v-for="(tag, tIndex) in section.tags"
									:key="tIndex"
									class="feature-badge"
								>
									<text class="badge-text">{{ tag }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
import { designerApi } from '@/api'

export default {
	props: {
		activeTab: {
			type: String,
			default: 'designer'
		},
		designerId: {
			type: [String, Number],
			default: null
		}
	},
	data() {
		return {
			loading: false,
			designer: null,
			serviceInfoData: [],
			serviceFeaturesData: [],
			environmentData: []
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
				// 检查 designerId 是否为有效的 UUID 格式
				const isValidUUID = this.designerId && /^[0-9a-f]{32}$/i.test(this.designerId)
				if (!isValidUUID) {
					this.setDefaultData()
					return
				}

				const res = await designerApi.getPortfolioInfo(this.designerId)
				if (res && res.code === 200 && res.data) {
					const data = res.data
					this.designer = data
					const serviceInfo = data.serviceInfo || {}

					// 服务须知数据
					this.serviceInfoData = [
						{ label: "职位", value: serviceInfo.position || "店长" },
						{ label: "职称", value: serviceInfo.title || "国家高级美发师" },
						{ label: "擅长", value: Array.isArray(serviceInfo.specialties) ? serviceInfo.specialties.join('、') : (serviceInfo.specialties || "男士油头发型及细软烫发") },
						{ label: "工作时间", value: serviceInfo.workDays || "周二 - 周日", extra: serviceInfo.workHours || "10:00-21:00" },
						{ label: "从业时间", value: `${serviceInfo.experience || 12}年` },
						{ label: "预约时间", value: serviceInfo.appointmentAdvance || "提前3小时" },
						{ label: "联系电话", value: serviceInfo.phone || "+86 1891808747", hasPhone: true }
					]

					// 服务特色数据
					this.serviceFeaturesData = data.serviceFeatures || [
						{
							title: "",
							tags: ["全预约制", "免费茶点", "头皮检测", "免费停车", "烫染专业店", "免费修眉", "一对一服务", "免费按摩", "没有隐形消费", "可上门服务"]
						},
						{
							title: "其他",
							tags: ["不可携带宠物", "服务区不可吸烟"]
						}
					]

					// 环境设施数据
					this.environmentData = data.environmentFacilities || [
						{
							title: "",
							tags: ["储物柜", "免费Wifi", "充电宝", "可看电视", "VIP专区", "沙发座"]
						},
						{
							title: "通用设施",
							tags: ["特定吸烟区", "电梯", "有停车位", "空调", "先进/刷卡支付"]
						}
					]
				} else {
					this.setDefaultData()
				}
			} catch (e) {
				console.error('获取设计师信息失败:', e)
				this.setDefaultData()
			} finally {
				this.loading = false
			}
		},
		setDefaultData() {
			this.serviceInfoData = [
				{ label: "职位", value: "店长" },
				{ label: "职称", value: "国家高级美发师" },
				{ label: "擅长", value: "男士油头发型及细软烫发" },
				{ label: "工作时间", value: "周二 - 周日", extra: "10:00-21:00" },
				{ label: "从业时间", value: "12年" },
				{ label: "预约时间", value: "提前3小时" },
				{ label: "联系电话", value: "+86 1891808747", hasPhone: true }
			]
			this.serviceFeaturesData = [
				{
					title: "",
					tags: ["全预约制", "免费茶点", "头皮检测", "免费停车", "烫染专业店", "免费修眉", "一对一服务", "免费按摩", "没有隐形消费", "可上门服务"]
				},
				{
					title: "其他",
					tags: ["不可携带宠物", "服务区不可吸烟"]
				}
			]
			this.environmentData = [
				{
					title: "",
					tags: ["储物柜", "免费Wifi", "充电宝", "可看电视", "VIP专区", "沙发座"]
				},
				{
					title: "通用设施",
					tags: ["特定吸烟区", "电梯", "有停车位", "空调", "先进/刷卡支付"]
				}
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
	font-size: 32rpx;
	margin-bottom: 8rpx;
}

.overview-list {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.overview-item {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.overview-row {
	display: flex;
	align-items: flex-start;
	padding: 20rpx 0;
	width: 100%;
}

.overview-label {
	width: 160rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #999999;
	font-size: 26rpx;
	flex-shrink: 0;
}

.overview-value-wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex: 1;
}

.overview-value-group {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 12rpx;
}

.overview-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	color: #333333;
	font-size: 26rpx;
	line-height: 1.4;
}

.overview-extra {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #333333;
	font-size: 26rpx;
}

.phone-icon {
	width: 36rpx;
	height: 36rpx;
	margin-left: 20rpx;
}

.separator-line {
	width: 100%;
	height: 1rpx;
	background-color: #f5f5f5;
}

.personal-intro {
	padding: 24rpx 0;
}

.personal-intro-text {
	margin-top: 12rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #333333;
	font-size: 26rpx;
	line-height: 1.6;
}

.badges-container {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
	width: 100%;
}

.feature-badge {
	width: calc(50% - 8rpx);
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	border-radius: 8rpx;
}

.badge-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #333333;
	font-size: 24rpx;
}

.feature-section {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.section-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #999999;
	font-size: 24rpx;
	margin: 10rpx 0 0;
}
</style>

