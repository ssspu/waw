<template>
	<view class="profile-section">
		<view v-if="!loading && morningSlots.length === 0 && afternoonSlots.length === 0" class="empty-state">
			<image class="empty-icon" src="https://bioflex.cn/static/icon/empty-time.png" mode="aspectFit"></image>
			<text class="empty-text">暂无可预约时间</text>
		</view>

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
		designerUserId: {
			type: String,
			default: ''
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
		designerUserId: {
			immediate: true,
			handler(newVal) {
				if (newVal) {
					this.fetchAvailableTime()
				}
			}
		},
		activeSubTab() {
			if (this.designerUserId) {
				this.fetchAvailableTime()
			}
		}
	},
	methods: {
		
		async fetchAvailableTime() {
			if (!this.designerUserId || this.loading) return
			this.loading = true
			try {
				
				const dateStr = this.getDateFromSubTab(this.activeSubTab)
				const res = await api.designer.getAvailableTime(this.designerUserId, {
					date: dateStr
				})
				if (res.code === 200) {
					const data = res.data

					// 兼容多种字段名：timeSlots, slots, items, list
					const slots = data.timeSlots || data.slots || data.items || data.list || []
					console.log('📅 可预约时间:', slots)

					
					const morning = []
					const afternoon = []

					slots.forEach(slot => {
						const time = slot.time || slot.start_time || ''
						const hour = parseInt(time.split(':')[0], 10)
						
						const status = slot.available === false ? 'booked' : 'available'

						const slotData = {
							time: time,
							status: status,
							label: slot.label || null
						}

						if (hour < 12) {
							morning.push(slotData)
						} else {
							afternoon.push(slotData)
						}
					})

					this.morningSlots = morning
					this.afternoonSlots = afternoon

					
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
		
		getDateFromSubTab(subTab) {
			const today = new Date()
			let targetDate = new Date(today)

			if (subTab === 'today') {
				
			} else if (subTab === 'tomorrow') {
				targetDate.setDate(today.getDate() + 1)
			} else {
				
				const match = subTab.match(/^(\d{2})(\d{2})$/)
				if (match) {
					const month = parseInt(match[1], 10)
					const day = parseInt(match[2], 10)
					targetDate.setMonth(month - 1)
					targetDate.setDate(day)
				}
			}

			
			const year = targetDate.getFullYear()
			const month = String(targetDate.getMonth() + 1).padStart(2, '0')
			const day = String(targetDate.getDate()).padStart(2, '0')
			return `${year}-${month}-${day}`
		},
		handleSlotClick(period, index) {
			let selectedSlot = null
			if (period === 'morning') {
				const slot = this.morningSlots[index]
				if (slot.status === 'booked') {
					return 
				}
				
				this.morningSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
						s.label = null
					}
				})
				
				this.afternoonSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
					}
				})
				
				slot.status = 'selected'
				selectedSlot = { period: 'morning', time: slot.time }
			} else if (period === 'afternoon') {
				const slot = this.afternoonSlots[index]
				if (slot.status === 'booked') {
					return 
				}
				
				this.morningSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
						s.label = null
					}
				})
				
				this.afternoonSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
					}
				})
				
				slot.status = 'selected'
				selectedSlot = { period: 'afternoon', time: slot.time }
			}
			
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
	height: 60rpx;
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

