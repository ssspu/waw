<template>
	<view class="profile-section">
		<view class="card">
			<view class="card-content">
				<!-- 上午时间段 -->
				<view class="time-section">
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
				<view class="time-section">
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
				<text class="notice-text">预约当天服务需要提前60分钟</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			morningSlots: [
				{ time: "10:00", status: "booked", label: "已预约" },
				{ time: "11:00", status: "booked", label: "已预约" },
				{ time: "12:00", status: "selected", label: null },
			],
			afternoonSlots: [
				{ time: "13:00", status: "available" },
				{ time: "14:00", status: "available" },
				{ time: "15:00", status: "available" },
				{ time: "16:00", status: "available" },
				{ time: "17:00", status: "available" },
				{ time: "18:00", status: "available" },
			],
		}
	},
	methods: {
		handleSlotClick(period, index) {
			if (period === 'morning') {
				const slot = this.morningSlots[index]
				if (slot.status === 'booked') {
					return // 已预约的不能选择
				}
				// 重置所有上午时间段的选择状态
				this.morningSlots.forEach((s, i) => {
					if (s.status === 'selected') {
						s.status = 'available'
						s.label = null
					}
				})
				// 重置所有下午时间段的选择状态
				this.afternoonSlots.forEach((s) => {
					s.status = 'available'
				})
				// 设置当前选择
				slot.status = 'selected'
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
				this.afternoonSlots.forEach((s, i) => {
					if (s.status === 'selected') {
						s.status = 'available'
					}
				})
				// 设置当前选择
				slot.status = 'selected'
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
</style>

