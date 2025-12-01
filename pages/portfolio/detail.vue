<template>
	<view class="portfolio-detail-page">
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
				<text class="navbar-title">作品详情</text>
				<view class="navbar-right">
					<view class="nav-icon-btn">
						<view class="nav-dots">
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

		<!-- 设计师信息 -->
		<view class="designer-section">
			<view class="designer-info" @tap="handleDesignerClick">
				<image
					class="designer-avatar"
					:src="designerInfo.avatar"
					mode="aspectFill"
				></image>
				<view class="designer-details">
					<view class="designer-name-row">
						<text class="designer-name">{{ designerInfo.name }}</text>
						<image
							v-if="designerInfo.verified"
							class="verified-icon"
							src="https://c.animaapp.com/mimycn40ClpGDL/img/renzhengyonghu.svg"
							mode="aspectFit"
						></image>
					</view>
					<view class="designer-tags">
						<text class="tag-text">{{ designerInfo.title }}</text>
						<text class="tag-divider">|</text>
						<view class="certification-tag" @tap.stop="handleCertClick">
							<image class="cert-icon" src="https://c.animaapp.com/mimycn40ClpGDL/img/zhiyerenzheng.svg" mode="aspectFit"></image>
							<text class="cert-text">职业认证</text>
							<image class="cert-arrow" src="/static/icon/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="action-btns">
				<view class="msg-btn" @tap="handleMessage">
					<text class="msg-text">私信TA</text>
				</view>
				<view class="follow-btn" @tap="handleFollow">
					<text class="follow-text">{{ isFollowed ? '已关注' : '+ 关注' }}</text>
				</view>
			</view>
		</view>

		<!-- 作品大图 -->
		<scroll-view class="content-scroll" scroll-y>
			<view class="main-image-wrapper">
				<image
					class="main-image"
					:src="workDetail.image"
					mode="widthFix"
					@tap="handlePreviewImage"
				></image>
			</view>

			<!-- 互动数据 -->
			<view class="interaction-section">
				<view class="interaction-left">
					<view class="interaction-item" @tap="handleLike">
						<image
							class="interaction-icon"
							:src="isLiked ? 'https://c.animaapp.com/mimycn40ClpGDL/img/dianzan-active.svg' : 'https://c.animaapp.com/mimycn40ClpGDL/img/dianzan.svg'"
							mode="aspectFit"
						></image>
						<text class="interaction-count">{{ workDetail.likes }}</text>
					</view>
					<view class="interaction-item" @tap="handleOpenComment">
						<image
							class="interaction-icon"
							src="https://c.animaapp.com/mimycn40ClpGDL/img/pinglun.svg"
							mode="aspectFit"
						></image>
						<text class="interaction-count">{{ workDetail.comments }}</text>
					</view>
					<view class="interaction-item" @tap="handleShare">
						<image
							class="interaction-icon"
							src="https://c.animaapp.com/mimycn40ClpGDL/img/zhuanfa.svg"
							mode="aspectFit"
						></image>
						<text class="interaction-count">{{ workDetail.shares }}</text>
					</view>
				</view>
				<view class="interaction-right">
					<view class="favorite-item" @tap="handleFavorite">
						<image
							class="favorite-icon"
							:src="isFavorited ? 'https://c.animaapp.com/mimycn40ClpGDL/img/shoucang-active.svg' : 'https://c.animaapp.com/mimycn40ClpGDL/img/shoucang.svg'"
							mode="aspectFit"
						></image>
					</view>
				</view>
			</view>

			<!-- 评论区 -->
			<view class="comment-section">
				<text class="comment-title">评论·{{ commentList.length }}</text>

				<!-- 评论输入 -->
				<view class="comment-input-row">
					<view class="comment-input-box" @tap="handleOpenComment">
						<text class="comment-placeholder">请说说你的看法吧……</text>
					</view>
				</view>

				<!-- 评论列表 -->
				<view class="comment-list">
					<view
						v-for="(comment, index) in commentList"
						:key="index"
						class="comment-item"
					>
						<image
							class="commenter-avatar"
							:src="comment.avatar"
							mode="aspectFill"
						></image>
						<view class="comment-content">
							<view class="comment-header">
								<text class="commenter-name">{{ comment.username }}</text>
								<text class="comment-time">{{ comment.time }}</text>
							</view>
							<text class="comment-text">{{ comment.content }}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 底部操作栏 -->
		<view class="footer-bar">
			<view class="input-wrapper" @tap="handleOpenComment">
				<text class="input-placeholder">请说说你的看法吧……</text>
			</view>
			<view class="send-btn" @tap="handleSend">
				<text class="send-text">发送</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isFollowed = ref(false)
const isLiked = ref(false)
const isFavorited = ref(false)
const userAvatar = ref('https://c.animaapp.com/mimycn40ClpGDL/img/---192.png')

const designerInfo = ref({
	id: 1,
	avatar: 'https://c.animaapp.com/mimycn40ClpGDL/img/---192.png',
	name: '造型师魏莹玲',
	title: '技术总监',
	verified: true
})

const workDetail = ref({
	id: 1,
	image: 'https://c.animaapp.com/mimycn40ClpGDL/img/---182.svg',
	likes: 188,
	comments: 188,
	favorites: 188,
	shares: 188
})

const commentList = ref([
	{
		id: 1,
		avatar: 'https://c.animaapp.com/mimycn40ClpGDL/img/---192-1.png',
		username: '李佳佳',
		time: '10分钟前',
		content: '这个设计师的审美很在线呢'
	},
	{
		id: 2,
		avatar: 'https://c.animaapp.com/mimycn40ClpGDL/img/---192-2.png',
		username: '韩善宇',
		time: '8小时前',
		content: '😍😍😍 好喜欢！'
	},
	{
		id: 3,
		avatar: 'https://c.animaapp.com/mimycn40ClpGDL/img/---192-3.png',
		username: '马菲菲',
		time: '2025-12-01 12:20:55',
		content: '这个发型我真的太喜欢了！很有高级感。'
	},
	{
		id: 4,
		avatar: 'https://c.animaapp.com/mimycn40ClpGDL/img/---192-4.png',
		username: '小仙女',
		time: '2025-12-01 12:20:55',
		content: '这个发型我真的太喜欢了！很有高级感。'
	}
])

onMounted(() => {
	// 获取页面参数
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	const options = currentPage.options || {}
	if (options.id) {
		// 根据id加载作品详情
		loadWorkDetail(options.id)
	}
})

const loadWorkDetail = (id) => {
	// 加载作品详情
	console.log('加载作品详情:', id)
}

const handleBack = () => {
	uni.navigateBack()
}

const handleDesignerClick = () => {
	uni.navigateTo({
		url: `/pages/designer/info?id=${designerInfo.value.id}`
	})
}

const handleCertClick = () => {
	uni.showToast({
		title: '查看职业认证',
		icon: 'none'
	})
}

const handleMessage = () => {
	uni.showToast({
		title: '私信功能开发中',
		icon: 'none'
	})
}

const handleFollow = () => {
	isFollowed.value = !isFollowed.value
	uni.showToast({
		title: isFollowed.value ? '关注成功' : '已取消关注',
		icon: 'none'
	})
}

const handlePreviewImage = () => {
	uni.previewImage({
		urls: [workDetail.value.image],
		current: workDetail.value.image
	})
}

const handleOpenComment = () => {
	// 打开评论输入框
	uni.showToast({
		title: '评论功能开发中',
		icon: 'none'
	})
}

const handleLike = () => {
	isLiked.value = !isLiked.value
	if (isLiked.value) {
		workDetail.value.likes++
	} else {
		workDetail.value.likes--
	}
}

const handleShare = () => {
	uni.showToast({
		title: '分享功能开发中',
		icon: 'none'
	})
}

const handleFavorite = () => {
	isFavorited.value = !isFavorited.value
	uni.showToast({
		title: isFavorited.value ? '收藏成功' : '已取消收藏',
		icon: 'none'
	})
}

const handleSend = () => {
	uni.showToast({
		title: '请先输入评论内容',
		icon: 'none'
	})
}
</script>

<style scoped lang="scss">
.portfolio-detail-page {
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
	gap: 6rpx;
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

.designer-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 30rpx;
	background-color: #ffffff;
	border-bottom: 1rpx solid #f0f0f0;
}

.designer-info {
	display: flex;
	align-items: center;
	gap: 16rpx;
	flex: 1;
}

.designer-avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	flex-shrink: 0;
}

.designer-details {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.designer-name-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.designer-name {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 600;
	color: #333333;
}

.verified-icon {
	width: 32rpx;
	height: 32rpx;
}

.designer-tags {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.tag-text {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #666666;
}

.tag-divider {
	font-size: 22rpx;
	color: #e5e5e5;
}

.certification-tag {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.cert-icon {
	width: 24rpx;
	height: 24rpx;
}

.cert-text {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #666666;
}

.cert-arrow {
	width: 20rpx;
	height: 20rpx;
	opacity: 0.5;
}

.action-btns {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.msg-btn {
	padding: 12rpx 24rpx;
	background-color: #f5f5f5;
	border-radius: 32rpx;
}

.msg-text {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #333333;
}

.follow-btn {
	padding: 12rpx 24rpx;
	background-color: #333333;
	border-radius: 32rpx;
}

.follow-text {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #ffffff;
}

.content-scroll {
	flex: 1;
	padding-bottom: 120rpx;
}

.main-image-wrapper {
	width: 100%;
}

.main-image {
	width: 100%;
}

.interaction-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 30rpx;
	background-color: #ffffff;
}

.interaction-left {
	display: flex;
	align-items: center;
	gap: 48rpx;
}

.interaction-item {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.interaction-icon {
	width: 40rpx;
	height: 40rpx;
}

.interaction-count {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #666666;
}

.interaction-right {
	display: flex;
	align-items: center;
}

.favorite-item {
	display: flex;
	align-items: center;
	justify-content: center;
}

.favorite-icon {
	width: 44rpx;
	height: 44rpx;
}

.comment-section {
	background-color: #ffffff;
	padding: 24rpx 30rpx;
	margin-top: 12rpx;
}

.comment-title {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 600;
	color: #000000;
	display: block;
	margin-bottom: 24rpx;
}

.comment-input-row {
	display: flex;
	align-items: center;
	margin-bottom: 24rpx;
}

.comment-input-box {
	flex: 1;
	height: 64rpx;
	background-color: #f6f6f6;
	border-radius: 32rpx;
	display: flex;
	align-items: center;
	padding: 0 24rpx;
}

.comment-placeholder {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #a6a6a6;
}

.comment-list {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.comment-item {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
}

.commenter-avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	flex-shrink: 0;
}

.comment-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.comment-header {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.commenter-name {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	font-weight: 500;
	color: #333333;
}

.comment-time {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #a6a6a6;
}

.comment-text {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	color: #333333;
	line-height: 1.6;
}

.footer-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	gap: 20rpx;
	padding: 16rpx 30rpx;
	padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
	background-color: #ffffff;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	box-sizing: border-box;
}

.input-wrapper {
	flex: 1;
	height: 64rpx;
	background-color: #f6f6f6;
	border-radius: 32rpx;
	display: flex;
	align-items: center;
	padding: 0 24rpx;
}

.input-placeholder {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #a6a6a6;
}

.send-btn {
	padding: 12rpx 32rpx;
	background-color: #333333;
	border-radius: 32rpx;
}

.send-text {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	color: #ffffff;
}
</style>
