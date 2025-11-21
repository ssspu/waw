<template>
	<view class="gallery-section">
		<view class="section-container">
			<!-- 选择器卡片 -->
			<view class="filter-card">
				<view class="filter-content">
					<!-- 脸型选择 -->
					<view class="filter-row">
						<text class="filter-label">脸型</text>
						<image 
							class="face-type-image" 
							src="https://c.animaapp.com/mi5jretszAhz9Y/img/frame-2052.svg" 
							mode="aspectFit"
						></image>
					</view>
					
					<!-- 发量选择 -->
					<view class="filter-row">
						<text class="filter-label">{{ hairAttributes[0].label }}</text>
						<view class="toggle-group">
							<view 
								v-for="(option, index) in hairAttributes[0].options" 
								:key="option.value"
								class="toggle-item"
								:class="{ active: hairVolume === option.value }"
								@tap="handleHairVolumeChange(option.value)"
							>
								<text class="toggle-text" :class="{ active: hairVolume === option.value }">
									{{ option.label }}
								</text>
							</view>
						</view>
					</view>
					
					<!-- 发质选择 -->
					<view class="filter-row">
						<text class="filter-label">{{ hairAttributes[1].label }}</text>
						<view class="toggle-group">
							<view 
								v-for="(option, index) in hairAttributes[1].options" 
								:key="option.value"
								class="toggle-item"
								:class="{ active: hairQuality === option.value }"
								@tap="handleHairQualityChange(option.value)"
							>
								<text class="toggle-text" :class="{ active: hairQuality === option.value }">
									{{ option.label }}
								</text>
							</view>
						</view>
					</view>
					
					<!-- 粗细选择 -->
					<view class="filter-row">
						<text class="filter-label">{{ hairAttributes[2].label }}</text>
						<view class="toggle-group">
							<view 
								v-for="(option, index) in hairAttributes[2].options" 
								:key="option.value"
								class="toggle-item"
								:class="{ active: hairThickness === option.value }"
								@tap="handleHairThicknessChange(option.value)"
							>
								<text class="toggle-text" :class="{ active: hairThickness === option.value }">
									{{ option.label }}
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 作品画廊 -->
			<view class="gallery-grid">
				<image 
					v-for="(image, index) in galleryImages" 
					:key="index"
					class="gallery-image" 
					:class="{ tall: index >= 4 }"
					:src="image.src" 
					mode="aspectFill"
					@tap="handleImageClick(image.src, index)"
				></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hairVolume: 'less',
			hairQuality: 'soft',
			hairThickness: 'fine',
			hairAttributes: [
				{
					label: "发量",
					options: [
						{ value: "less", label: "少" },
						{ value: "normal", label: "正常" },
						{ value: "more", label: "多" }
					]
				},
				{
					label: "发质",
					options: [
						{ value: "soft", label: "软" },
						{ value: "normal", label: "正常" },
						{ value: "hard", label: "硬" }
					]
				},
				{
					label: "粗细",
					options: [
						{ value: "fine", label: "细" },
						{ value: "normal", label: "正常" },
						{ value: "thick", label: "粗" }
					]
				}
			],
			galleryImages: [
				{ src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
				{ src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
				{ src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
				{ src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
				{ src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
				{ src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" }
			]
		}
	},
	methods: {
		handleHairVolumeChange(value) {
			this.hairVolume = value
		},
		handleHairQualityChange(value) {
			this.hairQuality = value
		},
		handleHairThicknessChange(value) {
			this.hairThickness = value
		},
		handleImageClick(src, index) {
			const urls = this.galleryImages.map(img => img.src)
			uni.previewImage({
				urls: urls,
				current: src
			})
		}
	}
}
</script>

<style scoped lang="scss">
.gallery-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 726rpx;
	margin: 0 auto;
	align-items: stretch;
	gap: 20rpx;
	padding: 0 12rpx;
	box-sizing: border-box;
}

.section-container {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	width: 100%;
}

.filter-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-sizing: border-box;
}

.filter-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 30rpx;
	padding: 18rpx 20rpx 20rpx;
	box-sizing: border-box;
}

.filter-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
}

.filter-label {
	width: fit-content;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 24rpx;
	text-align: center;
	flex-shrink: 0;
	white-space: nowrap;
}

.face-type-image {
	width: 616rpx;
	max-width: calc(100% - 80rpx);
	height: auto;
	flex-shrink: 0;
}

.toggle-group {
	display: inline-flex;
	align-items: center;
	gap: 14rpx;
	flex-shrink: 0;
}

.toggle-item {
	display: flex;
	width: 196rpx;
	height: 60rpx;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	padding: 16rpx 40rpx;
	background-color: #f6f6f6;
	border-radius: 0;
	border: 0;
	cursor: pointer;
	box-sizing: border-box;
	
	&.active {
		background-color: #333333;
		border-radius: 4rpx;
	}
}

.toggle-text {
	width: fit-content;
	margin-top: -3rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
	text-align: center;
	white-space: nowrap;
	
	&.active {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
		color: #ffffff;
	}
}

.gallery-grid {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 10rpx;
	width: 100%;
	box-sizing: border-box;
}

.gallery-image {
	width: calc((100% - 10rpx) / 2);
	height: 358rpx;
	border-radius: 8rpx;
	object-fit: cover;
	flex-shrink: 0;
	cursor: pointer;
	
	&.tall {
		height: 174rpx;
	}
}
</style>
