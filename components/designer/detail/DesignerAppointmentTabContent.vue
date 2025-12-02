<template>
	<view class="appointment-tab-content">
		<designer-booking-profile-section
			@time-selected="handleTimeSelected"
		></designer-booking-profile-section>

		<!-- 未选服务提示弹窗 -->
		<view class="service-prompt-modal" v-if="showServicePrompt" @tap="closePrompt">
			<view class="modal-content" @tap.stop>
				<view class="modal-body">
					<text class="modal-title">温馨提示</text>
					<text class="modal-desc">请先选择要进行的服务项目</text>
				</view>
				<view class="modal-footer">
					<view class="modal-btn cancel-btn" @tap="closePrompt">
						<text class="btn-text">我再看看</text>
					</view>
					<view class="modal-btn confirm-btn" @tap="goToService">
						<text class="btn-text">立即选择</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import DesignerBookingProfileSection from './DesignerBookingProfileSection.vue'

export default {
	components: {
		DesignerBookingProfileSection
	},
	data() {
		return {
			showServicePrompt: false
		}
	},
	props: {
		activeSubTab: {
			type: String,
			default: 'today'
		},
		selectedService: {
			type: Object,
			default: null
		}
	},
	methods: {
		handleTimeSelected(timeSlot) {
			// 如果未选择服务，显示提示弹窗
			if (!this.selectedService) {
				this.showServicePrompt = true
				return
			}
			this.$emit('time-selected', timeSlot)
		},
		closePrompt() {
			this.showServicePrompt = false
		},
		goToService() {
			this.showServicePrompt = false
			// 触发事件通知父组件切换到服务tab
			this.$emit('go-to-service')
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

/* 未选服务提示弹窗 */
.service-prompt-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.modal-content {
	width: 560rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	overflow: hidden;
}

.modal-body {
	padding: 48rpx 32rpx 32rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;
}

.modal-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: 600;
	color: #333333;
	font-size: 32rpx;
}

.modal-desc {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 28rpx;
	text-align: center;
}

.modal-footer {
	display: flex;
	border-top: 1rpx solid #f0f0f0;
}

.modal-btn {
	flex: 1;
	height: 96rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.cancel-btn {
	border-right: 1rpx solid #f0f0f0;

	.btn-text {
		font-family: 'PingFang_SC-Regular', Helvetica;
		font-weight: normal;
		color: #666666;
		font-size: 28rpx;
	}
}

.confirm-btn {
	.btn-text {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: 600;
		color: #333333;
		font-size: 28rpx;
	}
}
</style>
