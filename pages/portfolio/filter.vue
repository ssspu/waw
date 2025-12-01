<template>
	<view class="portfolio-filter-page">
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
						src="/static/icon/arrow-down.png"
						mode="aspectFit"
					></image>
				</view>
			</view>
		</view>

		<!-- 筛选标签行 -->
		<view class="filter-tags-row">
			<view class="filter-tag-item dropdown">
				<image
					class="tag-icon"
					src="https://c.animaapp.com/mimxnb7pa9Z2TF/img/---207.svg"
					mode="aspectFit"
				></image>
				<text class="tag-text">综合</text>
				<image
					class="dropdown-arrow"
					src="/static/icon/arrow-down.png"
					mode="aspectFit"
				></image>
			</view>
			<view
				v-for="(tag, index) in filterTags"
				:key="index"
				class="filter-tag-item"
				:class="{ active: selectedTags.includes(tag.value) }"
				@tap="handleTagClick(tag.value)"
			>
				<text class="tag-text">{{ tag.label }}</text>
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
	</view>
</template>

<script setup>
import { ref } from 'vue'

const searchKeyword = ref('')
const activeCategory = ref('women')
const selectedTags = ref([])

const categories = [
	{ label: '女士', value: 'women' },
	{ label: '男士', value: 'men' },
	{ label: '儿童', value: 'children' }
]

const filterTags = [
	{ label: '圆脸 �', value: 'round-face' },
	{ label: '发量少', value: 'less-hair' }
]

const galleryList = ref([
	{ id: 1, image: 'https://c.animaapp.com/mimxnb7pa9Z2TF/img/---176.svg' },
	{ id: 2, image: 'https://c.animaapp.com/mimxnb7pa9Z2TF/img/---177.svg' },
	{ id: 3, image: 'https://c.animaapp.com/mimxnb7pa9Z2TF/img/---178.svg' },
	{ id: 4, image: 'https://c.animaapp.com/mimxnb7pa9Z2TF/img/---179.svg' },
	{ id: 5, image: 'https://c.animaapp.com/mimxnb7pa9Z2TF/img/---180.svg' },
	{ id: 6, image: 'https://c.animaapp.com/mimxnb7pa9Z2TF/img/---181.svg' }
])

const handleBack = () => {
	uni.navigateBack()
}

const handleCategoryChange = (value) => {
	activeCategory.value = value
}

const handleOpenFilter = () => {
	uni.navigateTo({
		url: '/pages/portfolio/index'
	})
}

const handleTagClick = (value) => {
	const index = selectedTags.value.indexOf(value)
	if (index > -1) {
		selectedTags.value.splice(index, 1)
	} else {
		selectedTags.value.push(value)
	}
}

const handleItemClick = (item) => {
	uni.navigateTo({
		url: `/pages/portfolio/detail?id=${item.id}`
	})
}
</script>

<style scoped lang="scss">
.portfolio-filter-page {
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
	padding: 0 30rpx 24rpx;
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
	align-items: center;
	justify-content: space-between;
}

.category-tabs {
	display: flex;
	align-items: center;
	gap: 80rpx;
}

.category-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12rpx;
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
	height: 5rpx;
	background-color: #000000;
	border-radius: 3rpx;
}

.filter-btn {
	display: flex;
	align-items: center;
	gap: 8rpx;
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

.filter-tags-row {
	display: flex;
	align-items: center;
	gap: 12rpx;
	padding: 16rpx 12rpx;
	overflow-x: auto;
}

.filter-tag-item {
	display: flex;
	align-items: center;
	gap: 8rpx;
	height: 48rpx;
	padding: 0 16rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.filter-tag-item.dropdown {
	padding: 0 12rpx;
}

.filter-tag-item.active {
	background-color: #333333;
}

.filter-tag-item.active .tag-text {
	color: #ffffff;
}

.tag-icon {
	width: 32rpx;
	height: 32rpx;
}

.tag-text {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #333333;
}

.dropdown-arrow {
	width: 16rpx;
	height: 16rpx;
}

.gallery-scroll {
	flex: 1;
	padding: 0 12rpx 12rpx;
}

.gallery-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 12rpx;
}

.gallery-item {
	width: calc(50% - 6rpx);
	border-radius: 8rpx;
	overflow: hidden;
}

.gallery-image {
	width: 100%;
	height: 478rpx;
}
</style>
