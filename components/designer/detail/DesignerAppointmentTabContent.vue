<template>
	<view class="appointment-tab-content">
		<designer-booking-profile-section></designer-booking-profile-section>
	</view>
</template>

<script>
import DesignerBookingProfileSection from '../../DesignerBookingProfileSection.vue'

export default {
	components: {
		DesignerBookingProfileSection
	},
	props: {
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
</style>
