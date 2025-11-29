<template>
	<view class="featured-services-section">
		<view class="featured-services-section-inner">
			<view class="services-grid">
				<view 
					v-for="(service, index) in services" 
					:key="index" 
					class="service-item"
					@tap="handleServiceClick(service)"
				>
					<image class="service-icon" :src="service.icon" :alt="service.label" mode="aspectFit"></image>
					<text class="service-label">{{ service.label }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			services: [
				{
					icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-2.svg",
					label: "造型",
				},
				{
					icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006.svg",
					label: "剪发",
				},
				{
					icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-4.svg",
					label: "烫发",
				},
				{
					icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-6.svg",
					label: "染发",
				},
				{
					icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-3.svg",
					label: "护发",
				},
				{
					icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-5.svg",
					label: "头皮",
				},
				{
					icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-7.svg",
					label: "接发",
				},
				{
					icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-1.svg",
					label: "男士",
				},
			],
		}
	},
	methods: {
		handleServiceClick(service) {
			this.$emit('service-click', service)
		}
	}
}
</script>

<style scoped lang="scss">
.featured-services-section {
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	padding: 0 12rpx;
	box-sizing: border-box;
}

.featured-services-section-inner {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
}

.services-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 20rpx;
	width: 100%;
	box-sizing: border-box;
}

.service-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6rpx;
	height: auto;
	padding: 0;
}

.service-icon {
	width: 88rpx;
	height: 88rpx;
}

.service-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 24rpx;
	text-align: center;
}

/* 动画 */
@keyframes fade-in {
	0% {
		opacity: 0;
		transform: translateY(-20rpx);
	}
	to {
		opacity: 1;
		transform: none;
	}
}

.animate-fade-in {
	animation: fade-in 1s ease forwards;
	opacity: 0;
}
</style>

