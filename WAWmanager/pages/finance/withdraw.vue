<template>
  <view class="container">
    <!-- 提现到 -->
    <view class="section-label">提现到</view>

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

    <!-- 提现金额 -->
    <view class="amount-section">
      <text class="amount-label">提现金额</text>
      <view class="amount-input-wrapper">
        <text class="currency-symbol">¥</text>
        <input
          class="amount-input"
          type="digit"
          v-model="withdrawAmount"
          placeholder="请输入提现金额"
          placeholder-class="placeholder"
          @input="onAmountInput"
        />
        <view class="clear-btn" v-if="withdrawAmount" @tap="clearAmount">
          <image class="clear-icon" src="/pages/finance/static/add-circle@3x.png" mode="aspectFit"></image>
        </view>
      </view>
      <view class="amount-divider"></view>
      <text class="available-balance" :class="{ exceed: isExceed }">
        {{ isExceed ? '超过可提现金额' : `可用余额：${availableBalance}元` }}
      </text>
    </view>

    <!-- 提现按钮 -->
    <view
      class="withdraw-btn"
      :class="{ disabled: !canWithdraw }"
      @tap="confirmWithdraw"
    >
      <text class="btn-text">预计两小时内到账，确认提现</text>
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
                <view class="logo-placeholder" :style="{ backgroundColor: bank.color }">
                  <text class="logo-text">{{ bank.shortName }}</text>
                </view>
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

    <!-- 超出限额提示弹窗 -->
    <view class="alert-popup" v-if="showAlertPopup">
      <view class="popup-mask" @tap="closeAlertPopup"></view>
      <view class="alert-content">
        <text class="alert-title">提示</text>
        <text class="alert-message">提现金额超出可用余额</text>
        <view class="alert-btn" @tap="closeAlertPopup">
          <text class="alert-btn-text">确定</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getBalance, getBankCards, withdraw } from '@/api'

// 可用余额
const availableBalance = ref('0')

// 提现金额
const withdrawAmount = ref('')

// 银行卡列表
const bankList = ref([])

// 选中的银行卡
const selectedBank = ref(null)

// 弹窗状态
const showBankPopup = ref(false)
const showAlertPopup = ref(false)

// 是否可以提现
const canWithdraw = computed(() => {
  const amount = parseFloat(withdrawAmount.value)
  return amount > 0 && amount <= parseFloat(availableBalance.value) && selectedBank.value
})

// 是否超出可用余额
const isExceed = computed(() => {
  const amount = parseFloat(withdrawAmount.value)
  return amount > parseFloat(availableBalance.value)
})

// 页面加载
onLoad(() => {
  loadData()
})

// 页面显示
onShow(() => {
  loadData()
})

// 加载数据
const loadData = async () => {
  try {
    const [balanceRes, cardsRes] = await Promise.all([
      getBalance(),
      getBankCards()
    ])
    if (balanceRes.code === 200 || balanceRes.code === 0) {
      const data = balanceRes.data || {}
      availableBalance.value = String(data.available || data.balance || 0)
    }
    if (cardsRes.code === 200 || cardsRes.code === 0) {
      const list = cardsRes.data?.list || cardsRes.data || []
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
    console.error('加载数据失败:', error)
  }
}

// 金额输入处理
const onAmountInput = (e) => {
  let value = e.detail.value
  // 限制输入格式
  value = value.replace(/[^\d.]/g, '')
  // 限制小数点
  const parts = value.split('.')
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('')
  }
  // 限制小数位数
  if (parts[1] && parts[1].length > 2) {
    value = parts[0] + '.' + parts[1].slice(0, 2)
  }
  withdrawAmount.value = value
}

// 选择银行卡
const selectBankCard = () => {
  showBankPopup.value = true
}

// 清空金额
const clearAmount = () => {
  withdrawAmount.value = ''
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

// 确认提现
const confirmWithdraw = () => {
  if (!canWithdraw.value) {
    if (parseFloat(withdrawAmount.value) > parseFloat(availableBalance.value)) {
      showAlertPopup.value = true
    } else if (!selectedBank.value) {
      uni.showToast({ title: '请选择银行卡', icon: 'none' })
    } else {
      uni.showToast({ title: '请输入提现金额', icon: 'none' })
    }
    return
  }

  uni.showModal({
    title: '确认提现',
    content: `确认提现 ¥${withdrawAmount.value} 到 ${selectedBank.value.name}（尾号${selectedBank.value.lastFour}）？`,
    success: async (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '处理中...' })
        try {
          const result = await withdraw({
            amount: parseFloat(withdrawAmount.value),
            bankCardId: selectedBank.value.id
          })
          uni.hideLoading()
          if (result.code === 200 || result.code === 0) {
            uni.showToast({ title: '提现申请已提交', icon: 'success' })
            setTimeout(() => {
              uni.navigateBack()
            }, 1500)
          } else {
            uni.showToast({ title: result.message || '提现失败', icon: 'none' })
          }
        } catch (error) {
          uni.hideLoading()
          console.error('提现失败:', error)
          uni.showToast({ title: '提现失败', icon: 'none' })
        }
      }
    }
  })
}

// 关闭超出限额提示
const closeAlertPopup = () => {
  showAlertPopup.value = false
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

/* 提现金额区域 */
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

.available-balance {
  font-size: 26rpx;
  color: #999;

  &.exceed {
    color: #FF4D4F;
  }
}

/* 提现按钮 */
.withdraw-btn {
  width: 700rpx;
  margin: 24rpx 24rpx;
  height: 96rpx;
  background-color: #B2C9FF;
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

/* 超出限额提示弹窗 */
.alert-popup {
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

.alert-content {
  position: relative;
  width: 560rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 48rpx 40rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.alert-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
}

.alert-message {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.alert-btn {
  width: 100%;
  height: 80rpx;
  background-color: #5280FF;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    opacity: 0.9;
  }
}

.alert-btn-text {
  font-size: 30rpx;
  color: #fff;
  font-weight: 500;
}
</style>
