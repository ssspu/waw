<template>
	<view class="setting-detail-page">
		<scroll-view class="main-content" scroll-y>
			<!-- 全部协议内容（可折叠） -->
			<view class="agreement-list">
				<view
					v-for="(agreement, index) in agreements"
					:key="index"
					class="agreement-section"
				>
					<view class="agreement-header" @tap="toggleAgreement(index)">
						<text class="agreement-title">{{ agreement.title }}</text>
						<image
							class="arrow-icon"
							:class="{ expanded: expandedList[index] }"
							src="https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-4.svg"
							mode="aspectFit"
						></image>
					</view>
					<view class="agreement-content" v-if="expandedList[index]">
						<text class="content-text">{{ agreement.content }}</text>
					</view>
					<!-- 分割线（怜后一项不显示） -->
					<view v-if="index < agreements.length - 1" class="divider"></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { agreementsData } from '@/data/agreements.js'

export default {
	data() {
		return {
			
			expandedList: [false, false, false, false],
			
			agreements: agreementsData
		}
	},
	onLoad() {
		
		// this.fetchAgreements()
	},
	methods: {
		
		toggleAgreement(index) {
			this.$set(this.expandedList, index, !this.expandedList[index])
		}
		// fetchAgreements() {
		
		// }
	}
}
</script>

<style scoped lang="scss">
.setting-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}


.fixed-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background-color: #f2f2f2;
}


.header-placeholder {
	height: 180rpx;
}

.main-content {
	flex: 1;
	width: 100%;
	height: calc(100vh - 180rpx);
	padding: 24rpx;
	padding-bottom: 60rpx;
	box-sizing: border-box;
}


.agreement-list {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	overflow: hidden;
}

.agreement-section {
	width: 100%;
	box-sizing: border-box;
}


.agreement-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30rpx;
	cursor: pointer;
}

.agreement-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
	flex: 1;
}


.arrow-icon {
	width: 32rpx;
	height: 32rpx;
	transform: rotate(-90deg);
	transition: transform 0.3s ease;
	flex-shrink: 0;

	&.expanded {
		transform: rotate(90deg);
	}
}

.agreement-content {
	width: 100%;
	padding: 0 30rpx 30rpx;
	box-sizing: border-box;
}

.content-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #333333;
	line-height: 1.8;
	word-wrap: break-word;
	white-space: pre-wrap;
}


.divider {
	height: 1rpx;
	background-color: #eeeeee;
	margin: 0 30rpx;
}
</style>

