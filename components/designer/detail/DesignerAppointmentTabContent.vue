<template>
	<view class="appointment-tab-content">
		<designer-booking-profile-section :designer-id="designerId" :active-sub-tab="activeSubTab"></designer-booking-profile-section>
	</view>
</template>

<script>
import DesignerBookingProfileSection from './DesignerBookingProfileSection.vue'

export default {
	components: {
		DesignerBookingProfileSection
	},
	props: {
		activeSubTab: {
			type: String,
			default: 'today'
		},
		designerId: {
			type: [String, Number],
			default: null
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
</style>
