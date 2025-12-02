<template>
	<view class="profile-section">
		<!-- 空数据状态 -->
		<view v-if="!loading && morningSlots.length === 0 && afternoonSlots.length === 0" class="empty-state">
			<image class="empty-icon" src="/static/icon/empty-time.png" mode="aspectFit"></image>
			<text class="empty-text">暂无可预约时间</text>
		</view>

		<!-- 加载状态 -->
		<view v-if="loading" class="loading-state">
			<text class="loading-text">加载中...</text>
		</view>

		<view v-if="!loading && (morningSlots.length > 0 || afternoonSlots.length > 0)" class="card">
			<view class="card-content">
				<!-- 上午时间段 -->
				<view v-if="morningSlots.length > 0" class="time-section">
					<text class="section-title">上午</text>
					
					<view class="time-slots-grid">
						<view 
							v-for="(slot, index) in morningSlots" 
							:key="index"
							class="time-slot"
							:class="{ 
								selected: slot.status === 'selected',
								booked: slot.status === 'booked'
							}"
							@tap="handleSlotClick('morning', index)"
						>
							<text 
								class="time-text"
								:class="{ 
									selected: slot.status === 'selected',
									booked: slot.status === 'booked'
								}"
							>{{ slot.time }}</text>
							<text 
								v-if="slot.label" 
								class="slot-label"
							>{{ slot.label }}</text>
						</view>
					</view>
				</view>
				
				<!-- 下午时间段 -->
				<view v-if="afternoonSlots.length > 0" class="time-section">
					<text class="section-title">下午</text>
					
					<view class="time-slots-grid">
					<view 
						v-for="(slot, index) in afternoonSlots" 
						:key="index"
						class="time-slot"
						:class="{ 
							selected: slot.status === 'selected',
							booked: slot.status === 'booked',
							available: slot.status === 'available'
						}"
						@tap="handleSlotClick('afternoon', index)"
					>
						<text 
							class="time-text"
							:class="{ 
								selected: slot.status === 'selected',
								booked: slot.status === 'booked'
							}"
						>{{ slot.time }}</text>
					</view>
					</view>
				</view>
				
				<!-- 提示信息 -->
				<text class="notice-text">{{ noticeText }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'

export default {
	props: {
		designerId: {
			type: [String, Number],
			default: null
		},
		activeSubTab: {
			type: String,
			default: 'today'
		}
	},
	data() {
		return {
			loading: false,
			morningSlots: [],
			afternoonSlots: [],
			noticeText: '预约当天服务需要提前60分钟'
		}
	},
	watch: {
		designerId: {
			immediate: true,
			handler(newVal) {
				if (newVal) {
					this.fetchAvailableTime()
				}
			}
		},
		activeSubTab() {
			this.fetchAvailableTime()
		}
	},
	methods: {
		// 获取可预约时间
		async fetchAvailableTime() {
			if (!this.designerId || this.loading) return
			this.loading = true
			try {
				const res = await api.designer.getAvailableTime(this.designerId, {
					date: this.activeSubTab
				})
				if (res.code === 0) {
					const data = res.data
					// 转换上午时间段数据
					this.morningSlots = (data.morningSlots || []).map(slot => ({
						time: slot.time,
						status: slot.status || 'available',
						label: slot.label || null
					}))
					// 转换下午时间段数据
					this.afternoonSlots = (data.afternoonSlots || []).map(slot => ({
						time: slot.time,
						status: slot.status || 'available',
						label: slot.label || null
					}))
					// 更新提示文案
					if (data.notice) {
						this.noticeText = data.notice
					}
				}
			} catch (err) {
				console.error('获取可预约时间失败:', err)
			} finally {
				this.loading = false
			}
		},
		handleSlotClick(period, index) {
			let selectedSlot = null
			if (period === 'morning') {
				const slot = this.morningSlots[index]
				if (slot.status === 'booked') {
					return // 已预约的不能选择
				}
				// 重置所有上午时间段的选择状态
				this.morningSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
						s.label = null
					}
				})
				// 重置所有下午时间段的选择状态
				this.afternoonSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
					}
				})
				// 设置当前选择
				slot.status = 'selected'
				selectedSlot = { period: 'morning', time: slot.time }
			} else if (period === 'afternoon') {
				const slot = this.afternoonSlots[index]
				if (slot.status === 'booked') {
					return // 已预约的不能选择
				}
				// 重置所有上午时间段的选择状态
				this.morningSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
						s.label = null
					}
				})
				// 重置所有下午时间段的选择状态
				this.afternoonSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
					}
				})
				// 设置当前选择
				slot.status = 'selected'
				selectedSlot = { period: 'afternoon', time: slot.time }
			}
			// 触发时间选择事件
			if (selectedSlot) {
				this.$emit('time-selected', selectedSlot)
			}
		}
	}
}
</script>

<style scoped lang="scss">
.profile-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	padding: 0 4rpx;
	box-sizing: border-box;
}

.card {
	width: 100%;
	max-width: 760rpx;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius: 16rpx;
	box-sizing: border-box;
}

.card-content {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	padding: 32rpx 30rpx;
	box-sizing: border-box;
}

.time-section {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.section-title {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
	line-height: normal;
	letter-spacing: 0;
}

.time-slots-grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 14rpx;
	width: 100%;
}

.time-slot {
	display: flex;
	flex-direction: column;
	height: 80rpx;
	align-items: center;
	justify-content: center;
	padding: 10rpx 0;
	background-color: #f6f6f6;
	border-radius: 8rpx;
	border: 2rpx solid #f6f6f6;

	&.available {
		background-color: #f6f6f6;
		border: 2rpx solid #f6f6f6;
	}

	&.selected {
		background-color: #ffffff;
		border: 3rpx solid #333333;
	}

	&.booked {
		background-color: #ffffff;
		border: 2rpx solid #f6f6f6;
	}
}

.time-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 28rpx;
	line-height: normal;
	letter-spacing: 0;
	
	&.selected {
		font-family: 'PingFang_SC-Medium', Helvetica;
		font-weight: 500;
		color: #333333;
	}
	
	&.booked {
		font-family: 'PingFang_SC-Regular', Helvetica;
		font-weight: normal;
		color: #a6a6a6;
	}
}

.slot-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 18rpx;
	line-height: normal;
	letter-spacing: 0;
	margin-top: 4rpx;
}

.notice-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
	line-height: normal;
	letter-spacing: 0;
}

/* 空数据和加载状态 */
.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 80rpx 40rpx;
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	box-sizing: border-box;
}

.empty-icon {
	width: 160rpx;
	height: 160rpx;
	margin-bottom: 24rpx;
	opacity: 0.6;
}

.empty-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #a6a6a6;
}

.loading-state {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60rpx 0;
	width: 100%;
}

.loading-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #a6a6a6;
}
</style>

