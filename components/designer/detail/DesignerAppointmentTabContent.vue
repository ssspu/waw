<template>
	<view class="appointment-tab-content">
		<!-- 日期选择 -->
		<view class="date-schedule-section">
			<view 
				v-for="(date, index) in dateSchedule" 
				:key="index" 
				class="date-item"
				:class="{ active: date.active }"
				@tap="handleDateClick(index)"
			>
				<text class="date-text" :class="{ active: date.active }">{{ date.date }}</text>
				<text class="day-text" :class="{ active: date.active }">{{ date.day }}</text>
			</view>
		</view>
		
		<!-- 时间段选择 -->
		<designer-booking-profile-section></designer-booking-profile-section>
	</view>
</template>

<script>
import DesignerBookingProfileSection from '../../DesignerBookingProfileSection.vue'

export default {
	components: {
		DesignerBookingProfileSection
	},
	data() {
		return {
			dateSchedule: [
				{ date: "今天", day: "周一", active: true },
				{ date: "明天", day: "周二", active: false },
				{ date: "12.05", day: "周三", active: false },
				{ date: "12.06", day: "周四", active: false },
				{ date: "12.07", day: "周五", active: false },
				{ date: "12.08", day: "周六", active: false },
				{ date: "12.09", day: "周日", active: false }
			]
		}
	},
	methods: {
		handleDateClick(index) {
			this.dateSchedule.forEach((date, i) => {
				date.active = i === index
			})
		}
	}
}
</script>

<style scoped lang="scss">
.appointment-tab-content {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 16rpx;
}

.date-schedule-section {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 0 30rpx 0;
	width: 100%;
	box-sizing: border-box;
}

.date-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6rpx;
	cursor: pointer;
	opacity: 0.6;
	
	&.active {
		opacity: 1;
	}
}

.date-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 28rpx;
	text-align: center;
	
	&.active {
		font-family: 'PingFang_SC-Medium', Helvetica;
		font-weight: 500;
		color: #333333;
	}
}

.day-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 24rpx;
	text-align: center;
	
	&.active {
		font-family: 'PingFang_SC-Medium', Helvetica;
		font-weight: 500;
		color: #000000;
	}
}
</style>

