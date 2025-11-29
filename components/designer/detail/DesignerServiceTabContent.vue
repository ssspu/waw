<template>
	<view class="service-tab-content">
		<!-- 服务列表 -->
		<designer-profile-section
			:active-sub-tab="activeSubTab"
			@book-service="handleBookService"
		></designer-profile-section>
	</view>
</template>

<script>
import DesignerProfileSection from './DesignerProfileSection.vue'

export default {
	components: {
		DesignerProfileSection
	},
	props: {
		activeSubTab: {
			type: String,
			default: 'hair'
		}
	},
	methods: {
		handleBookService(bookingData) {
			// 向上传递事件到detail.vue
			this.$emit('book-service', bookingData)
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

