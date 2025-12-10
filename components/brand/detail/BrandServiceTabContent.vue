<template>
	<view class="service-tab-content">
		<!-- 服务列表 -->
		<brand-profile-section :active-sub-tab="activeSubTab" :brand-id="brandId"></brand-profile-section>
	</view>
</template>

<script>
import BrandProfileSection from './BrandProfileSection.vue'

export default {
	components: {
		BrandProfileSection
	},
	props: {
		activeSubTab: {
			type: String,
			default: 'hair'
		},
		brandId: {
			type: [String, Number],
			default: null
		}
	}
}
</script>

<style scoped lang="scss">
.service-tab-content {
	display: flex;
	flex-direction: column;
	width: 100%;
}
</style>
