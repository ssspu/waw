<template>
	<view class="service-tab-content">
		<!-- 服务列表 -->
		<designer-profile-section :active-sub-tab="activeSubTab"></designer-profile-section>
	</view>
</template>

<script>
import DesignerProfileSection from '../../DesignerProfileSection.vue'

export default {
	components: {
		DesignerProfileSection
	},
	props: {
		activeSubTab: {
			type: String,
			default: 'hair'
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

