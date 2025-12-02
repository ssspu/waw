<template>
	<view class="appointment-tab-content">
		<designer-booking-profile-section :designer-id="designerId"></designer-booking-profile-section>
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
		designerId: {
			type: [String, Number],
			default: null
		},
		activeSubTab: {
			type: String,
			default: 'today'
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
