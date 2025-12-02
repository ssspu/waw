<template>
	<view class="portfolio-page">
		<view class="status-bar-space"></view>
		<!-- 导航栏 -->
		<view class="navbar">
			<view class="navbar-content">
				<view class="back-btn" @tap="handleBack">
					<image
						class="back-icon"
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg"
						mode="aspectFit"
					></image>
				</view>
				<text class="navbar-title">作品集</text>
				<view class="navbar-right">
					<view class="nav-icon-btn">
						<view class="nav-dots">
							<view class="dot"></view>
							<view class="dot"></view>
							<view class="dot"></view>
						</view>
					</view>
					<view class="nav-icon-btn">
						<view class="nav-circle">
							<view class="circle-dot"></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 搜索和筛选区域 -->
		<view class="filter-section">
			<!-- 搜索框 -->
			<view class="search-box">
				<image
					class="search-icon"
					src="/static/icon/search.png"
					mode="aspectFit"
				></image>
				<input
					class="search-input"
					placeholder="请输入关键词搜索"
					placeholder-class="search-placeholder"
					v-model="searchKeyword"
				/>
			</view>

			<!-- 分类和筛选 -->
			<view class="category-row">
				<view class="category-tabs">
					<view
						v-for="(category, index) in categories"
						:key="index"
						class="category-item"
						:class="{ active: activeCategory === category.value }"
						@tap="handleCategoryChange(category.value)"
					>
						<text class="category-text">{{ category.label }}</text>
						<view v-if="activeCategory === category.value" class="category-indicator"></view>
					</view>
				</view>
				<view class="filter-btn" @tap="handleOpenFilter">
					<text class="filter-text">筛选</text>
					<image
						class="filter-arrow"
						src="/static/icon/down.png"
						mode="aspectFit"
					></image>
				</view>
			</view>
		</view>

		<!-- 作品列表 -->
		<scroll-view class="gallery-scroll" scroll-y>
			<view class="gallery-grid">
				<view
					v-for="(item, index) in galleryList"
					:key="index"
					class="gallery-item"
					@tap="handleItemClick(item)"
				>
					<image
						class="gallery-image"
						:src="item.image"
						mode="aspectFill"
					></image>
				</view>
			</view>
		</scroll-view>

		<!-- 筛选弹窗 -->
		<view class="filter-modal" v-if="showFilterModal" @tap="handleCloseFilter">
			<view class="filter-modal-content" @tap.stop>
				<!-- 弹窗头部分类 -->
				<view class="modal-header">
					<view class="modal-tabs">
						<view
							v-for="(category, index) in categories"
							:key="index"
							class="modal-tab-item"
							:class="{ active: modalCategory === category.value }"
							@tap="modalCategory = category.value"
						>
							<text class="modal-tab-text">{{ category.label }}</text>
						</view>
					</view>
					<text class="modal-filter-label">筛选</text>
				</view>

				<!-- 筛选选项 -->
				<view class="filter-options">
					<!-- 脸型选项 -->
					<view class="filter-row">
						<text class="filter-label">脸型</text>
						<view class="shape-options">
							<view
								v-for="(shape, index) in faceShapes"
								:key="index"
								class="shape-item"
								:class="{ active: selectedFaceShape === shape.value }"
								@tap="selectedFaceShape = shape.value"
							>
								<view class="shape-icon" :class="shape.type"></view>
							</view>
						</view>
					</view>

					<!-- 发量选项 -->
					<view class="filter-row">
						<text class="filter-label">发量</text>
						<view class="option-buttons">
							<view
								v-for="(option, index) in hairAmountOptions"
								:key="index"
								class="option-btn"
								:class="{ active: selectedHairAmount === option.value }"
								@tap="selectedHairAmount = option.value"
							>
								<text class="option-text">{{ option.label }}</text>
							</view>
						</view>
					</view>

					<!-- 发质选项 -->
					<view class="filter-row">
						<text class="filter-label">发质</text>
						<view class="option-buttons">
							<view
								v-for="(option, index) in hairQualityOptions"
								:key="index"
								class="option-btn"
								:class="{ active: selectedHairQuality === option.value }"
								@tap="selectedHairQuality = option.value"
							>
								<text class="option-text">{{ option.label }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 底部按钮 -->
				<view class="modal-footer">
					<view class="reset-btn" @tap="handleReset">
						<text class="reset-text">重置</text>
					</view>
					<view class="confirm-btn" @tap="handleConfirmFilter">
						<text class="confirm-text">确定</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const searchKeyword = ref('')
const activeCategory = ref('women')
const showFilterModal = ref(false)
const modalCategory = ref('women')
const selectedFaceShape = ref('')
const selectedHairAmount = ref('less')
const selectedHairQuality = ref('soft')

const categories = [
	{ label: '女士', value: 'women' },
	{ label: '男士', value: 'men' },
	{ label: '儿童', value: 'children' }
]

const faceShapes = [
	{ type: 'circle-filled', value: 'round' },
	{ type: 'circle', value: 'oval' },
	{ type: 'square', value: 'square' },
	{ type: 'diamond', value: 'diamond' },
	{ type: 'triangle', value: 'triangle' },
	{ type: 'rectangle', value: 'rectangle' }
]

const hairAmountOptions = [
	{ label: '少', value: 'less' },
	{ label: '正常', value: 'normal' },
	{ label: '多', value: 'more' }
]

const hairQualityOptions = [
	{ label: '软', value: 'soft' },
	{ label: '正常', value: 'normal' },
	{ label: '粗', value: 'coarse' }
]

const galleryList = ref([
	{ id: 1, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---176.svg' },
	{ id: 2, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---177.svg' },
	{ id: 3, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---178.svg' },
	{ id: 4, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---179.svg' },
	{ id: 5, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---180.svg' },
	{ id: 6, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---181.svg' }
])

const handleBack = () => {
	uni.navigateBack()
}

const handleCategoryChange = (value) => {
	activeCategory.value = value
}

const handleOpenFilter = () => {
	showFilterModal.value = true
}

const handleCloseFilter = () => {
	showFilterModal.value = false
}

const handleReset = () => {
	selectedFaceShape.value = ''
	selectedHairAmount.value = 'less'
	selectedHairQuality.value = 'soft'
}

const handleConfirmFilter = () => {
	showFilterModal.value = false
	// 根据筛选条件过滤列表
}

const handleItemClick = (item) => {
	uni.navigateTo({
		url: `/pages/portfolio/detail?id=${item.id}`
	})
}
</script>

<style scoped lang="scss">
.portfolio-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.status-bar-space {
	height: var(--status-bar-height, 44px);
	background-color: #ffffff;
}

.navbar {
	width: 100%;
	background-color: #ffffff;
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 88rpx;
	padding: 0 30rpx;
	position: relative;
}

.back-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
}

.navbar-title {
	font-family: 'PingFang SC';
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

.navbar-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.nav-icon-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.nav-dots {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.dot {
	width: 6rpx;
	height: 6rpx;
	border-radius: 50%;
	background-color: #000000;
}

.nav-circle {
	width: 28rpx;
	height: 28rpx;
	border-radius: 50%;
	border: 2rpx solid #000000;
	display: flex;
	align-items: center;
	justify-content: center;
}

.circle-dot {
	width: 10rpx;
	height: 10rpx;
	border-radius: 50%;
	background-color: #000000;
}

.filter-section {
	background-color: #ffffff;
	padding: 0 30rpx 0;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.search-box {
	display: flex;
	align-items: center;
	height: 60rpx;
	background-color: #f6f6f6;
	border-radius: 99rpx;
	padding: 0 20rpx;
}

.search-icon {
	width: 36rpx;
	height: 36rpx;
	margin-right: 12rpx;
}

.search-input {
	flex: 1;
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #333333;
}

.search-placeholder {
	color: #a6a6a6;
}

.category-row {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding-top: 4rpx;
}

.category-tabs {
	display: flex;
	align-items: flex-start;
	gap: 80rpx;
}

.category-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;
}

.category-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.category-item.active .category-text {
	font-weight: 600;
	color: #000000;
}

.category-indicator {
	width: 20rpx;
	height: 6rpx;
	background-color: #000000;
	border-radius: 3rpx;
}

.filter-btn {
	display: flex;
	align-items: center;
	gap: 8rpx;
	padding-top: 4rpx;
}

.filter-text {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	font-weight: 500;
	color: #333333;
}

.filter-arrow {
	width: 32rpx;
	height: 32rpx;
}

.gallery-scroll {
	flex: 1;
	padding: 12rpx;
	box-sizing: border-box;
}

.gallery-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 12rpx;
	width: 100%;
	box-sizing: border-box;
}

.gallery-item {
	width: calc(50% - 6rpx);
	border-radius: 8rpx;
	overflow: hidden;
	box-sizing: border-box;
}

.gallery-image {
	width: 100%;
	height: 478rpx;
}

/* 筛选弹窗样式 */
.filter-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	display: flex;
	align-items: flex-end;
}

.filter-modal-content {
	width: 100%;
	background-color: #ffffff;
	border-radius: 32rpx 32rpx 0 0;
	padding: 32rpx;
	box-sizing: border-box;
}

.modal-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 24rpx;
	border-bottom: 2rpx solid #f0f0f0;
}

.modal-tabs {
	display: flex;
	align-items: center;
	gap: 48rpx;
}

.modal-tab-item {
	padding: 8rpx 0;
}

.modal-tab-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.modal-tab-item.active .modal-tab-text {
	color: #000000;
}

.modal-filter-label {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.filter-options {
	padding: 32rpx 0;
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.filter-row {
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.filter-label {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #666666;
	min-width: 80rpx;
}

.shape-options {
	display: flex;
	align-items: center;
	gap: 24rpx;
	flex: 1;
}

.shape-item {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2rpx solid #e5e5e5;
	border-radius: 8rpx;
}

.shape-item.active {
	border-color: #000000;
}

.shape-icon {
	width: 48rpx;
	height: 48rpx;
}

.shape-icon.circle-filled {
	background-color: #000000;
	border-radius: 50%;
}

.shape-icon.circle {
	border: 4rpx solid #000000;
	border-radius: 50%;
	background-color: transparent;
}

.shape-icon.square {
	border: 4rpx solid #000000;
	background-color: transparent;
}

.shape-icon.diamond {
	border: 4rpx solid #000000;
	transform: rotate(45deg);
	width: 36rpx;
	height: 36rpx;
	background-color: transparent;
}

.shape-icon.triangle {
	width: 0;
	height: 0;
	border-left: 24rpx solid transparent;
	border-right: 24rpx solid transparent;
	border-bottom: 40rpx solid #000000;
	background-color: transparent;
}

.shape-icon.rectangle {
	width: 56rpx;
	height: 36rpx;
	border: 4rpx solid #000000;
	background-color: transparent;
}

.option-buttons {
	display: flex;
	align-items: center;
	gap: 24rpx;
	flex: 1;
}

.option-btn {
	padding: 16rpx 48rpx;
	border-radius: 8rpx;
	background-color: transparent;
}

.option-btn.active {
	background-color: #333333;
}

.option-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #666666;
}

.option-btn.active .option-text {
	color: #ffffff;
}

.modal-footer {
	display: flex;
	align-items: center;
	gap: 24rpx;
	padding-top: 24rpx;
	border-top: 2rpx solid #f0f0f0;
}

.reset-btn,
.confirm-btn {
	flex: 1;
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 44rpx;
}

.reset-btn {
	border: 2rpx solid #333333;
	background-color: #ffffff;
}

.confirm-btn {
	background-color: #333333;
}

.reset-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 500;
	color: #333333;
}

.confirm-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 500;
	color: #ffffff;
}
</style>
