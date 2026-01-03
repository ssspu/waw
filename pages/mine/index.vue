<template>
	<view class="mine-page">
		<view class="hero-section">
			<image 
				class="hero-image" 
				src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/rectangle-186.png" 
				mode="aspectFill"
			></image>
			<view class="hero-toolbar" :style="{ paddingTop: statusBarHeight + 'px' }">
				<view class="toolbar-btns">
					<view class="toolbar-btn kefu-btn" @tap="handleOnlineService">
						<image class="toolbar-icon kefu-icon" src="/static/icon/kefu.png" mode="aspectFit"></image>
					</view>
					<view class="toolbar-btn notice-btn" @tap="handleNotice">
						<image class="toolbar-icon notice-icon" src="https://bioflex.cn/static/icon/notice.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="main-content">
			<mine-user-info-section></mine-user-info-section>
			<mine-profile-section></mine-profile-section>
		</view>
		
		<bottom-tab-bar active="mine"></bottom-tab-bar>
	</view>
</template>

<script>
import MineUserInfoSection from '../../components/mine/index/MineUserInfoSection.vue'
import MineProfileSection from '../../components/mine/index/MineProfileSection.vue'
import BottomTabBar from '../../components/common/BottomTabBar.vue'

export default {
	components: {
		MineUserInfoSection,
		MineProfileSection,
		BottomTabBar
	},
	data() {
		return {
			statusBarHeight: 44
		}
	},
	onLoad() {
		
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	methods: {
		handleOnlineService() {
			console.log('Online service button clicked')
			uni.navigateTo({ url: '/packageMine/pages/mine/customer-service' })
		},
		handleNotice() {
			console.log('Notice button clicked')
			uni.navigateTo({ url: '/pages/message/index' })
		}
	}
}
</script>

<style scoped lang="scss">
.mine-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.hero-section {
	position: relative;
	height: 520rpx;
	width: 100%;
}

.hero-image {
	width: 100%;
	height: 100%;
	object-fit: cover;

}

.hero-toolbar {
	position: absolute;
	top: 0;
	left: 30rpx;
	display: flex;
	align-items: center;
	height: 88rpx;
}

.toolbar-btns {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	gap: 20rpx;
}

.toolbar-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.kefu-btn {
	width: 60rpx;
	height: 60rpx;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 50%;
}

.kefu-icon {
	width: 36rpx;
	height: 36rpx;
}

.notice-btn {
	width: 60rpx;
	height: 60rpx;
}

.notice-icon {
	width: 70rpx;
	height: 70rpx;
}

.hero-btn::after {
	border: none;
}

.hero-btn-icon {
	width: 96rpx;
	height: 32rpx;
}
		

.pill-dot,
.pill-line {
	font-size: 24rpx;
	color: #333;
}

.pill-circle {
	width: 24rpx;
	height: 24rpx;
	border-radius: 50%;
	border: 2rpx solid #333;
}

.main-content {
	position: relative;
	margin-top: 20rpx;
	width: 100%;
	padding: 0 30rpx 160rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
	box-sizing: border-box;
	z-index: 2;
}
</style>

