<template>
	<view class="service-tab-content">
		<!-- 服务列表 -->
		<designer-profile-section
			:designer-id="designerId"
			:designer-user-id="designerUserId"
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
		designerId: {
			type: [String, Number],
			default: null
		},
		designerUserId: {
			type: String,
			default: ''
		},
		activeSubTab: {
			type: String,
			default: 'all'
		}
	},
	watch: {
		activeSubTab(newVal) {
			// 当分类切换时，重新加载服务列表
			this.$emit('refresh-services', newVal)
		}
	},
	methods: {
		handleBookService(bookingData) {
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

