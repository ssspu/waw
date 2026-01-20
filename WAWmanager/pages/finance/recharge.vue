<template>
  <view class="container">
    <!-- 充值到 -->
    <view class="section-label">充值到</view>

    <!-- 银行卡选择 -->
    <view class="bank-card" @tap="selectBankCard">
      <view class="bank-left">
        <view class="bank-logo">
          <image class="logo-img" src="/static/icons/noye-bank.png" mode="aspectFit"></image>
        </view>
        <view class="bank-info">
          <text class="bank-name">{{ selectedBank.name }}</text>
          <text class="bank-account">{{ selectedBank.type }} 尾号{{ selectedBank.lastFour }}</text>
        </view>
      </view>
      <text class="arrow-icon">›</text>
    </view>

    <!-- 充值金额 -->
    <view class="amount-section">
      <text class="amount-label">充值金额</text>
      <view class="amount-input-wrapper">
        <text class="currency-symbol">¥</text>
        <input
          class="amount-input"
          type="digit"
          v-model="rechargeAmount"
          placeholder="请输入充值金额"
          placeholder-class="placeholder"
          @input="onAmountInput"
        />
        <view class="clear-btn" v-if="rechargeAmount" @tap="clearAmount">
          <image class="clear-icon" src="/pages/finance/static/add-circle@3x.png" mode="aspectFit"></image>
        </view>
      </view>
      <view class="amount-divider"></view>
    </view>

    <!-- 充值按钮 -->
    <view
      class="recharge-btn"
      :class="{ disabled: !canRecharge }"
      @tap="confirmRecharge"
    >
      <text class="btn-text">下一步</text>
    </view>

    <!-- 银行卡选择弹窗 -->
    <view class="bank-popup" v-if="showBankPopup">
      <view class="popup-mask" @tap="closeBankPopup"></view>
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">选择银行卡</text>
          <text class="popup-close" @tap="closeBankPopup">×</text>
        </view>
        <view class="bank-list">
          <view
            v-for="bank in bankList"
            :key="bank.id"
            class="bank-option"
            :class="{ selected: selectedBank.id === bank.id }"
            @tap="selectBank(bank)"
          >
            <view class="bank-left">
              <view class="bank-logo">
                <image class="logo-img" src="/static/icons/noye-bank.png" mode="aspectFit"></image>
              </view>
              <view class="bank-info">
                <text class="bank-name">{{ bank.name }}</text>
                <text class="bank-account">{{ bank.type }} 尾号{{ bank.lastFour }}</text>
              </view>
            </view>
            <view class="check-icon" v-if="selectedBank.id === bank.id">✓</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getBankCards, recharge } from '@/api'

// 充值金额
const rechargeAmount = ref('')

// 银行卡列表
const bankList = ref([])

// 选中的银行卡
const selectedBank = ref(null)

// 弹窗状态
const showBankPopup = ref(false)

// 是否可以充值
const canRecharge = computed(() => {
  const amount = parseFloat(rechargeAmount.value)
  return amount > 0 && selectedBank.value
})

// 页面加载
onLoad(() => {
  loadBankCards()
})

// 页面显示
onShow(() => {
  loadBankCards()
})

// 加载银行卡列表
const loadBankCards = async () => {
  try {
    const res = await getBankCards()
    if (res.code === 200 || res.code === 0) {
      const list = res.data?.list || res.data || []
      bankList.value = list.map(item => ({
        id: item.id,
        name: item.bankName || item.name || '',
        shortName: (item.bankName || item.name || '').charAt(0),
        type: item.cardType || '储蓄卡',
        lastFour: item.cardNumber?.slice(-4) || item.lastFour || '',
        color: item.color || '#00A650'
      }))
      if (bankList.value.length > 0 && !selectedBank.value) {
        selectedBank.value = bankList.value[0]
      }
    }
  } catch (error) {
    console.error('加载银行卡列表失败:', error)
  }
}

// 金额输入处理
const onAmountInput = (e) => {
  let value = e.detail.value
  value = value.replace(/[^\d.]/g, '')
  const parts = value.split('.')
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('')
  }
  if (parts[1] && parts[1].length > 2) {
    value = parts[0] + '.' + parts[1].slice(0, 2)
  }
  rechargeAmount.value = value
}

// 选择银行卡
const selectBankCard = () => {
  showBankPopup.value = true
}

// 清空金额
const clearAmount = () => {
  rechargeAmount.value = ''
}

// 关闭银行卡选择弹窗
const closeBankPopup = () => {
  showBankPopup.value = false
}

// 选择银行
const selectBank = (bank) => {
  selectedBank.value = bank
  showBankPopup.value = false
}

// 确认充值
const confirmRecharge = () => {
  if (!canRecharge.value) {
    if (!selectedBank.value) {
      uni.showToast({ title: '请选择银行卡', icon: 'none' })
    } else {
      uni.showToast({ title: '请输入充值金额', icon: 'none' })
    }
    return
  }

  uni.showModal({
    title: '确认充值',
    content: `确认充值 ¥${rechargeAmount.value} 从 ${selectedBank.value.name}（尾号${selectedBank.value.lastFour}）？`,
    success: async (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '处理中...' })
        try {
          const result = await recharge({
            amount: parseFloat(rechargeAmount.value),
            bankCardId: selectedBank.value.id
          })
          uni.hideLoading()
          if (result.code === 200 || result.code === 0) {
            uni.showToast({ title: '充值成功', icon: 'success' })
            setTimeout(() => {
              uni.navigateBack()
            }, 1500)
          } else {
            uni.showToast({ title: result.message || '充值失败', icon: 'none' })
          }
        } catch (error) {
          uni.hideLoading()
          console.error('充值失败:', error)
          uni.showToast({ title: '充值失败', icon: 'none' })
        }
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #EDF0F4;
}

/* 区块标签 */
.section-label {
  margin-right: 600rpx;
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
  padding: 24rpx;
}

/* 银行卡选择 */
.bank-card {
  width: 640rpx;
  padding: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 16rpx;

  &:active {
    opacity: 0.8;
  }
}

.bank-logo {
  margin-right: 24rpx;
}

.bank-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.logo-img {
  width: 80rpx;
  height: 80rpx;
}

.bank-info {
  flex: 1;
}

.bank-name {
  display: block;
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 8rpx;
}

.bank-account {
  display: block;
  font-size: 26rpx;
  color: #999;
}

.arrow-icon {
  font-size: 36rpx;
  color: #ccc;
}

/* 充值金额区域 */
.amount-section {
  width: 640rpx;
  background-color: #fff;
  margin: 24rpx;
  border-radius: 16rpx;
  padding: 32rpx;
}

.amount-label {
  display: block;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 32rpx;
}

.amount-input-wrapper {
  display: flex;
  align-items: center;
}

.currency-symbol {
  font-size: 48rpx;
  color: #333;
  font-weight: 500;
  margin-right: 16rpx;
}

.amount-input {
  flex: 1;
  font-size: 48rpx;
  color: #333;
  font-weight: 500;
}

.placeholder {
  color: #ccc;
  font-size: 32rpx;
}

.clear-btn {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    opacity: 0.7;
  }
}

.clear-icon {
  width: 40rpx;
  height: 40rpx;
}

.amount-divider {
  height: 1rpx;
  background-color: #EEEEEE;
  margin: 24rpx 0;
}

/* 充值按钮 */
.recharge-btn {
  width: 700rpx;
  margin: 24rpx 24rpx;
  height: 96rpx;
  background-color: #B8C5D9;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(.disabled) {
    background-color: #5280FF;

    &:active {
      opacity: 0.9;
    }
  }
}

.btn-text {
  font-size: 32rpx;
  color: #fff;
  font-weight: 500;
}

/* 银行卡选择弹窗 */
.bank-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
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
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #F5F5F5;
}

.popup-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.popup-close {
  font-size: 48rpx;
  color: #999;
  line-height: 1;
}

.bank-list {
  padding: 16rpx 0;
  max-height: 60vh;
  overflow-y: auto;
}

.bank-option {
  display: flex;
  align-items: center;
  padding: 24rpx 32rpx;

  &.selected {
    background-color: #F8F9FC;
  }

  &:active {
    background-color: #F5F5F5;
  }
}

.check-icon {
  font-size: 32rpx;
  color: #5280FF;
  font-weight: 600;
}
</style>
