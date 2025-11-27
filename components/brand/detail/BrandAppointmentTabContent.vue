<template>
	<view class="appointment-tab-content">
		<brand-booking-profile-section></brand-booking-profile-section>
	</view>
</template>

<script>
import BrandBookingProfileSection from '../../BrandBookingProfileSection.vue'

export default {
	components: {
		BrandBookingProfileSection
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
