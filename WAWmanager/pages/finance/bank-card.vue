<template>
  <view class="container">
    <!-- 银行卡列表 -->
    <view class="card-list">
      <view
        v-for="card in bankCardList"
        :key="card.id"
        class="bank-card"
        :class="{ expanded: expandedCardId === card.id }"
      >
        <!-- 银行卡主体 -->
        <view class="card-main" @tap="toggleCardExpand(card.id)">
          <view class="card-logo">
            <image class="logo-img" src="/static/icons/noye-bank.png" mode="aspectFit"></image>
          </view>
          <view class="card-info">
            <view class="card-name-row">
              <text class="card-name">{{ card.name }}</text>
              <view class="default-tag" v-if="card.isDefault">
                <text class="default-text">默认</text>
              </view>
            </view>
            <text class="card-account">{{ card.type }} 尾号{{ card.lastFour }}</text>
          </view>
          <image class="arrow-icon" :class="{ rotated: expandedCardId === card.id }" src="/static/icons/xiala.png" mode="aspectFit"></image>
        </view>

        <!-- 展开详情 -->
        <view class="card-detail" v-if="expandedCardId === card.id">
          <view class="detail-divider"></view>
          <view class="detail-row">
            <text class="detail-label">开户银行</text>
            <text class="detail-value">{{ card.name }}</text>
          </view>
          <view class="detail-row">
            <text class="detail-label">银行卡号</text>
            <text class="detail-value">{{ card.type }} 尾号{{ card.lastFour }}</text>
          </view>
          <view class="detail-row">
            <text class="detail-label">当前状态</text>
            <text class="detail-value">{{ card.status }}</text>
          </view>

          <!-- 操作按钮 -->
          <view class="action-buttons">
            <view
              class="action-btn default-btn"
              :class="{ disabled: card.isDefault }"
              @tap="setDefault(card)"
            >
              <text class="btn-text">设为默认</text>
            </view>
            <view class="action-btn edit-btn" @tap="editCard(card)">
              <text class="btn-text">修改信息</text>
            </view>
            <view class="action-btn delete-btn" @tap="deleteCard(card)">
              <text class="btn-text">删除银行卡</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 添加银行卡 -->
      <view class="add-card" @tap="addBankCard">
        <text class="add-icon">+</text>
        <text class="add-text">添加银行卡</text>
      </view>
    </view>

    <!-- 删除确认弹窗 -->
    <view class="confirm-popup" v-if="showDeletePopup">
      <view class="popup-mask" @tap="closeDeletePopup"></view>
      <view class="popup-content">
        <text class="popup-title">确认删除</text>
        <text class="popup-message">确定要删除该银行卡吗？删除后将无法恢复</text>
        <view class="popup-buttons">
          <view class="popup-btn cancel" @tap="closeDeletePopup">
            <text class="btn-text">取消</text>
          </view>
          <view class="popup-btn confirm" @tap="confirmDelete">
            <text class="btn-text">确认删除</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getBankCards, deleteBankCard, setDefaultBankCard } from '@/api'

// 展开的卡片ID
const expandedCardId = ref(null)

// 银行卡列表
const bankCardList = ref([])

// 删除弹窗
const showDeletePopup = ref(false)
const cardToDelete = ref(null)

// 页面加载
onLoad(() => {
  loadBankCards()
})

// 加载银行卡列表
const loadBankCards = async () => {
  try {
    const res = await getBankCards()
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      bankCardList.value = list.map(item => ({
        id: item.id,
        name: item.bankName || item.name || '',
        type: item.cardType || '储蓄卡',
        lastFour: item.cardNumber?.slice(-4) || item.lastFour || '',
        status: item.status || '正常',
        isDefault: item.isDefault || false
      }))
    }
  } catch (error) {
    console.error('加载银行卡列表失败:', error)
  }
}

// 切换卡片展开状态
const toggleCardExpand = (cardId) => {
  if (expandedCardId.value === cardId) {
    expandedCardId.value = null
  } else {
    expandedCardId.value = cardId
  }
}

// 设为默认
const setDefault = async (card) => {
  if (card.isDefault) return

  uni.showLoading({ title: '设置中...' })
  try {
    const res = await setDefaultBankCard(card.id)
    uni.hideLoading()
    if (res.code === 200 || res.code === 0) {
      // 更新默认状态
      bankCardList.value.forEach(c => {
        c.isDefault = c.id === card.id
      })
      uni.showToast({ title: '设置成功', icon: 'success' })
    } else {
      uni.showToast({ title: res.message || '设置失败', icon: 'none' })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('设置默认银行卡失败:', error)
    uni.showToast({ title: '设置失败', icon: 'none' })
  }
}

// 编辑银行卡
const editCard = (card) => {
  uni.navigateTo({
    url: `/pages/finance/bank-card-edit?id=${card.id}`
  })
}

// 删除银行卡
const deleteCard = (card) => {
  if (card.isDefault) {
    uni.showToast({ title: '默认银行卡不能删除', icon: 'none' })
    return
  }
  cardToDelete.value = card
  showDeletePopup.value = true
}

// 关闭删除弹窗
const closeDeletePopup = () => {
  showDeletePopup.value = false
  cardToDelete.value = null
}

// 确认删除
const confirmDelete = async () => {
  if (!cardToDelete.value) return

  uni.showLoading({ title: '删除中...' })
  try {
    const res = await deleteBankCard(cardToDelete.value.id)
    uni.hideLoading()
    if (res.code === 200 || res.code === 0) {
      const index = bankCardList.value.findIndex(c => c.id === cardToDelete.value.id)
      if (index > -1) {
        bankCardList.value.splice(index, 1)
      }
      closeDeletePopup()
      uni.showToast({ title: '删除成功', icon: 'success' })
      expandedCardId.value = null
    } else {
      uni.showToast({ title: res.message || '删除失败', icon: 'none' })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('删除银行卡失败:', error)
    uni.showToast({ title: '删除失败', icon: 'none' })
  }
}

// 添加银行卡
const addBankCard = () => {
  uni.navigateTo({
    url: '/pages/finance/bank-card-add'
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #EDF0F4;
}

/* 银行卡列表 */
.card-list {
  padding: 24rpx;
}

.bank-card {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  overflow: hidden;
}

.card-main {
  width: 650rpx;
  display: flex;
  align-items: center;
  padding: 24rpx;

  &:active {
    background-color: #FAFAFA;
  }
}

.card-logo {
  margin-right: 24rpx;
}

.logo-img {
  width: 100rpx;
  height: 100rpx;
}

.card-info {
  flex: 1;
}

.card-name-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 8rpx;
}

.card-name {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.default-tag {
  padding:  0 16rpx;
  background-color: #DBE8FF;
  border-radius: 12rpx;
}

.default-text {
  font-size: 22rpx;
  color: #5280FF;
}

.card-account {
  font-size: 26rpx;
  color: #999;
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
  transition: transform 0.3s;
  transform: rotate(-90deg);

  &.rotated {
    transform: rotate(0deg);
  }
}

/* 展开详情 */
.card-detail {
  padding: 0 32rpx 32rpx;
}

.detail-divider {
  height: 1rpx;
  background-color: #F5F5F5;
  margin-bottom: 24rpx;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 0;
}

.detail-label {
  font-size: 28rpx;
  color: #666;
}

.detail-value {
  font-size: 28rpx;
  color: #333;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 16rpx;
  margin-top: 24rpx;
}

.action-btn {
  flex: 1;
  height: 72rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    opacity: 0.8;
  }
}

.default-btn {
  background-color: #fff;
  border: 2rpx solid #DDDDDD;

  .btn-text {
    font-size: 26rpx;
    color: #333;
  }

  &.disabled {
    opacity: 0.5;
  }
}

.edit-btn {
  background-color: #fff;
  border: 2rpx solid #DDDDDD;

  .btn-text {
    font-size: 26rpx;
    color: #333;
  }
}

.delete-btn {
  background-color: #FF4D4F;
  border: 2rpx solid #FF4D4F;

  .btn-text {
    font-size: 26rpx;
    color: #fff;
  }
}

/* 添加银行卡 */
.add-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 48rpx;
  background-color: #F8FAFC;
  border: 2rpx dashed #EAECF0;
  border-radius: 16rpx;

  &:active {
    background-color: #FAFAFA;
  }
}

.add-icon {
  font-size: 36rpx;
  color: #999;
}

.add-text {
  font-size: 28rpx;
  color: #999;
}

/* 确认弹窗 */
.confirm-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: relative;
  width: 560rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 48rpx 40rpx 40rpx;
}

.popup-title {
  display: block;
  text-align: center;
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
}

.popup-message {
  display: block;
  text-align: center;
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
  margin-bottom: 40rpx;
}

.popup-buttons {
  display: flex;
  gap: 24rpx;
}

.popup-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &.cancel {
    background-color: #fff;
    border: 2rpx solid #DDDDDD;

    .btn-text {
      color: #333;
    }
  }

  &.confirm {
    background-color: #FF4D4F;
    border: 2rpx solid #FF4D4F;

    .btn-text {
      color: #fff;
    }
  }

  .btn-text {
    font-size: 30rpx;
    font-weight: 500;
  }

  &:active {
    opacity: 0.8;
  }
}
</style>
