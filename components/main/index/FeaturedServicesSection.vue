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
					icon: "https://bioflex.cn/static/4.png",
					label: "发型",
				},
				{
					icon: "https://bioflex.cn/static/Frame@3x.png",
					label: "剪发",
				},
				{
					icon: "https://bioflex.cn/static/Frame@3x(1).png",
					label: "烫发",
				},
				{
					icon: "https://bioflex.cn/static/5.png",
					label: "染发",
				},
				{
					icon: "https://bioflex.cn/static/Frame@3x(2).png",
					label: "护发",
				},
				{
					icon: "https://bioflex.cn/static/Frame@3x(3).png",
					label: "头皮",
				},
				{
					icon: "https://bioflex.cn/static/user-3-line@3x.png",
					label: "接发",
				},
				{
					icon: "https://bioflex.cn/static/user-3-line@3x(1).png",
					label: "男士",
				},
			],
		}
	},
	methods: {
		handleServiceClick(service) {
			
			uni.navigateTo({
				url: `/pages/main/search?tab=service&keyword=${encodeURIComponent(service.label)}`
			})
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
	padding: 20rpx;
	box-sizing: border-box;
	background: linear-gradient(180deg, #FEFEFE 0%, #F2F2F2 100%);
	border-radius: 40rpx 40rpx 40rpx 4rpx;
}

.service-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 24rpx;
	text-align: center;
}


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

