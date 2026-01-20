<template>
  <view class="container">
    <!-- 表单区域 -->
    <view class="form-card">
      <!-- 优惠形式 -->
      <view class="form-item">
        <text class="form-label">优惠形式</text>
        <text class="form-value">满减券</text>
      </view>

      <!-- 优惠券名称 -->
      <view class="form-item">
        <text class="form-label">优惠券名称</text>
        <input
          class="form-input"
          placeholder="最多10个字，例：洗剪吹优惠券"
          placeholder-class="placeholder"
          v-model="formData.couponName"
          maxlength="10"
        />
      </view>

      <!-- 门槛金额 -->
      <view class="form-item">
        <text class="form-label">门槛金额</text>
        <input
          class="form-input"
          placeholder="1-100000"
          placeholder-class="placeholder"
          v-model="formData.thresholdAmount"
          type="number"
        />
      </view>

      <!-- 立减金额 -->
      <view class="form-item">
        <text class="form-label">立减金额</text>
        <input
          class="form-input"
          placeholder="1-100000"
          placeholder-class="placeholder"
          v-model="formData.discountAmount"
          type="number"
        />
      </view>

      <!-- 发放数量 -->
      <view class="form-item">
        <text class="form-label">发放数量</text>
        <input
          class="form-input"
          placeholder="1-100000000"
          placeholder-class="placeholder"
          v-model="formData.issueQuantity"
          type="number"
        />
      </view>

      <!-- 有效期类型 -->
      <view class="form-item validity-section">
        <text class="form-label">有效期类型</text>
      </view>
      <view class="validity-cards">
        <view
          class="validity-card"
          :class="{ active: validityType === 'claim' }"
          @tap="selectValidityType('claim')"
        >
          <view class="validity-check" :class="{ checked: validityType === 'claim' }">
            <text v-if="validityType === 'claim'">✓</text>
          </view>
          <view class="validity-content">
            <text class="validity-title">领券当日开始计算</text>
            <text class="validity-desc">按天数计算有效期</text>
          </view>
        </view>
        <view
          class="validity-card"
          :class="{ active: validityType === 'fixed' }"
          @tap="selectValidityType('fixed')"
        >
          <view class="validity-check" :class="{ checked: validityType === 'fixed' }">
            <text v-if="validityType === 'fixed'">✓</text>
          </view>
          <view class="validity-content">
            <text class="validity-title">固定有效期</text>
            <text class="validity-desc">仅在指定时间段可用</text>
          </view>
        </view>
      </view>

      <!-- 有效期天数 (领券当日模式) -->
      <view class="form-item" v-if="validityType === 'claim'">
        <text class="form-label">有效期天数</text>
        <input
          class="form-input"
          placeholder="0-365天，0表示领取当日失效"
          placeholder-class="placeholder"
          v-model="formData.validityDays"
          type="number"
        />
      </view>

      <!-- 固定有效期 (固定有效期模式) -->
      <picker v-if="validityType === 'fixed'" mode="date" @change="onStartDateChange">
        <view class="form-item">
          <text class="form-label">开始日期</text>
          <view class="form-picker">
            <text :class="{ placeholder: !formData.validityStartDate }">
              {{ formData.validityStartDate || '请选择开始日期' }}
            </text>
            <text class="arrow">›</text>
          </view>
        </view>
      </picker>
      <picker v-if="validityType === 'fixed'" mode="date" @change="onEndDateChange">
        <view class="form-item">
          <text class="form-label">结束日期</text>
          <view class="form-picker">
            <text :class="{ placeholder: !formData.validityEndDate }">
              {{ formData.validityEndDate || '请选择结束日期' }}
            </text>
            <text class="arrow">›</text>
          </view>
        </view>
      </picker>

      <!-- 每人限领 -->
      <view class="form-item" @tap="showPersonLimitPicker">
        <text class="form-label">每人限领</text>
        <view class="form-picker">
          <text>{{ formData.personLimit }}</text>
          <text class="arrow">›</text>
        </view>
      </view>

      <!-- 适用服务 -->
      <view class="form-item" @tap="showServicePicker">
        <text class="form-label">适用服务</text>
        <view class="form-picker">
          <text>{{ formData.applicableService }}</text>
          <text class="arrow">›</text>
        </view>
      </view>
    </view>

    <!-- 使用说明 -->
    <view class="form-card usage-card">
      <view class="usage-header">
        <text class="form-label">使用说明</text>
        <text class="char-count">{{ formData.usageDescription.length }}/50</text>
      </view>
      <textarea
        class="usage-textarea"
        placeholder="请输入使用说明（选填）"
        placeholder-class="placeholder"
        v-model="formData.usageDescription"
        maxlength="50"
      ></textarea>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-btn">
      <view class="save-btn" @tap="onSave">
        <text>保存</text>
      </view>
    </view>

    <!-- 每人限领弹窗 -->
    <view class="picker-mask" v-if="showLimitPicker" @tap="closeLimitPicker"></view>
    <view class="picker-modal" :class="{ show: showLimitPicker }">
      <view class="picker-header">
        <text class="picker-title">每人限领</text>
        <view class="picker-close" @tap="closeLimitPicker">
          <text>×</text>
        </view>
      </view>
      <view class="picker-options limit-options">
        <view
          class="picker-option"
          v-for="item in limitOptions"
          :key="item"
          :class="{ active: formData.personLimit === item }"
          @tap="selectPersonLimit(item)"
        >
          <text>{{ item }}</text>
        </view>
        <!-- 自定义选项 -->
        <view class="picker-option" v-if="!showCustomInput" @tap="showCustomInput = true">
          <text>自定义</text>
        </view>
        <view class="custom-limit-row" v-else>
          <text class="custom-label">自定义</text>
          <input
            class="custom-input"
            type="number"
            placeholder="输入数量"
            v-model="customLimitValue"
            @confirm="confirmCustomLimit"
            focus
          />
          <text class="custom-unit">张</text>
          <view class="custom-confirm-btn" @tap="confirmCustomLimit">
            <text>确定</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 适用服务弹窗 -->
    <view class="picker-mask" v-if="showServiceModal" @tap="closeServiceModal"></view>
    <view class="service-modal" :class="{ show: showServiceModal }">
      <view class="service-modal-header">
        <text class="service-modal-title">选择适用服务</text>
        <view class="service-modal-close" @tap="closeServiceModal">
          <text>×</text>
        </view>
      </view>
      <view class="service-tags-wrap">
        <view
          class="service-tag"
          v-for="item in serviceOptions"
          :key="item.name"
          :class="{ active: item.selected }"
          @tap="toggleService(item)"
        >
          <text>{{ item.name }}</text>
        </view>
      </view>
      <view class="service-modal-footer">
        <view class="service-confirm-btn" @tap="confirmService">
          <text>确定</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { createCoupon, getCouponList } from '@/api'

// 表单数据
const formData = reactive({
  couponName: '',
  thresholdAmount: '',
  discountAmount: '',
  issueQuantity: '',
  validityDays: '',
  validityStartDate: '',
  validityEndDate: '',
  personLimit: '不限张',
  applicableService: '全部服务',
  usageDescription: ''
})

// 有效期类型
const validityType = ref('claim')

// 弹窗状态
const showLimitPicker = ref(false)
const showServiceModal = ref(false)
const customLimitValue = ref('')
const showCustomInput = ref(false)

// 限领选项
const limitOptions = ['不限张', '1张', '2张', '3张', '5张', '10张']

// 服务选项
const serviceList = ['全部服务', '洗吹', '造型', '洗剪吹', '烫发', '染发', '头皮护理', '头发护理', '接发']
const selectedServiceName = ref('全部服务')
const serviceOptions = computed(() => {
  return serviceList.map(name => ({
    name,
    selected: selectedServiceName.value === name
  }))
})

// 编辑模式
const isEditMode = ref(false)
const couponId = ref(null)

// 页面加载
onLoad((options) => {
  if (options.id) {
    isEditMode.value = true
    couponId.value = parseInt(options.id)
    uni.setNavigationBarTitle({ title: '编辑优惠券' })
    loadCouponData(options.id)
  }
})

// 加载优惠券数据
const loadCouponData = async (id) => {
  try {
    const res = await getCouponList({ id })
    if (res.code === 200 || res.code === 0) {
      const data = res.data?.[0] || res.data || {}
      Object.assign(formData, {
        couponName: data.name || '',
        thresholdAmount: String(data.minAmount || data.condition || ''),
        discountAmount: String(data.value || data.amount || ''),
        issueQuantity: String(data.totalCount || data.stock || ''),
        validityDays: String(data.validityDays || ''),
        personLimit: data.personLimit || '不限张',
        applicableService: data.applicableService || '全部服务',
        usageDescription: data.description || ''
      })
      if (data.validityType === 'fixed') {
        validityType.value = 'fixed'
        formData.validityStartDate = data.startDate || ''
        formData.validityEndDate = data.endDate || ''
      }
    }
  } catch (error) {
    console.error('加载优惠券数据失败:', error)
  }
}

// 选择有效期类型
const selectValidityType = (type) => {
  validityType.value = type
}

// 开始日期选择
const onStartDateChange = (e) => {
  formData.validityStartDate = e.detail.value
}

// 结束日期选择
const onEndDateChange = (e) => {
  formData.validityEndDate = e.detail.value
}

// 显示限领选择器
const showPersonLimitPicker = () => {
  showLimitPicker.value = true
}

// 关闭限领选择器
const closeLimitPicker = () => {
  showLimitPicker.value = false
  showCustomInput.value = false
}

// 选择限领数量
const selectPersonLimit = (limit) => {
  formData.personLimit = limit
  customLimitValue.value = ''
  closeLimitPicker()
}

// 确认自定义限领
const confirmCustomLimit = () => {
  if (customLimitValue.value && parseInt(customLimitValue.value) > 0) {
    formData.personLimit = customLimitValue.value + '张'
    closeLimitPicker()
  }
}

// 显示服务选择器
const showServicePicker = () => {
  showServiceModal.value = true
}

// 关闭服务选择器
const closeServiceModal = () => {
  showServiceModal.value = false
}

// 切换服务选择（单选）
const toggleService = (item) => {
  selectedServiceName.value = item.name
}

// 确认服务选择
const confirmService = () => {
  formData.applicableService = selectedServiceName.value
  closeServiceModal()
}

// 保存
const onSave = async () => {
  // 表单验证
  if (!formData.couponName.trim()) {
    uni.showToast({ title: '请输入优惠券名称', icon: 'none' })
    return
  }
  if (!formData.thresholdAmount) {
    uni.showToast({ title: '请输入门槛金额', icon: 'none' })
    return
  }
  if (!formData.discountAmount) {
    uni.showToast({ title: '请输入立减金额', icon: 'none' })
    return
  }
  if (!formData.issueQuantity) {
    uni.showToast({ title: '请输入发放数量', icon: 'none' })
    return
  }
  if (parseFloat(formData.discountAmount) >= parseFloat(formData.thresholdAmount)) {
    uni.showToast({ title: '立减金额需小于门槛金额', icon: 'none' })
    return
  }
  if (validityType.value === 'claim' && !formData.validityDays) {
    uni.showToast({ title: '请输入有效期天数', icon: 'none' })
    return
  }
  if (validityType.value === 'fixed' && (!formData.validityStartDate || !formData.validityEndDate)) {
    uni.showToast({ title: '请选择有效期', icon: 'none' })
    return
  }

  uni.showLoading({ title: '保存中...' })

  try {
    const params = {
      name: formData.couponName,
      type: 'amount',
      value: parseInt(formData.discountAmount),
      minAmount: parseInt(formData.thresholdAmount),
      totalCount: parseInt(formData.issueQuantity),
      validityType: validityType.value,
      validityDays: validityType.value === 'claim' ? parseInt(formData.validityDays) : null,
      startTime: validityType.value === 'fixed' ? formData.validityStartDate : null,
      endTime: validityType.value === 'fixed' ? formData.validityEndDate : null,
      personLimit: formData.personLimit,
      applicableService: formData.applicableService,
      description: formData.usageDescription
    }
    if (isEditMode.value) {
      params.id = couponId.value
    }
    const res = await createCoupon(params)
    uni.hideLoading()
    if (res.code === 200 || res.code === 0) {
      uni.showToast({
        title: isEditMode.value ? '更新成功' : '保存成功',
        icon: 'success'
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    }
  } catch (error) {
    uni.hideLoading()
    console.error('保存优惠券失败:', error)
    uni.showToast({ title: '保存失败，请重试', icon: 'none' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding: 12rpx;
  padding-bottom: 140rpx;
  box-sizing: border-box;
}

// 表单卡片
.form-card {
  width: 100%;
  background-color: #fff;
  margin-bottom: 24rpx;
  border-radius: 16rpx;
  box-sizing: border-box;
}

// 表单项
.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:32rpx 24rpx;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
  }

  &.validity-section {
    border-bottom: none;
    padding-bottom: 16rpx;
  }
}

.form-label {
  font-size: 30rpx;
  color: #333;
  flex-shrink: 0;
  font-weight: 500;
}

.form-value {
  font-size: 30rpx;
  color: #333;
}

.form-input {
  flex: 1;
  font-size: 30rpx;
  color: #333;
  text-align: right;
}

.placeholder {
  color: #C0C4CC;
}

.form-picker {
  display: flex;
  align-items: center;
  gap: 8rpx;

  text {
    font-size: 30rpx;
    color: #333;

    &.placeholder {
      color: #C0C4CC;
    }
  }

  .arrow {
    font-size: 32rpx;
    color: #C0C4CC;
  }
}

// 有效期类型卡片
.validity-cards {
  display: flex;
  gap: 20rpx;
  padding: 0 32rpx 24rpx;
}

.validity-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 20rpx;
  border: 2rpx solid #E8E8E8;
  border-radius: 12rpx;
  background-color: #fff;

  &.active {
    border-color: #5B8FF9;
    background-color: rgba(91, 143, 249, 0.08);
  }
}

.validity-check {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 2rpx solid #DCDFE6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  text {
    font-size: 22rpx;
    color: #fff;
    font-weight: bold;
  }

  &.checked {
    background-color: #5B8FF9;
    border-color: #5B8FF9;
  }
}

.validity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.validity-title {
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
  white-space: nowrap;
}

.validity-desc {
  font-size: 22rpx;
  color: #999;
  white-space: nowrap;
}

// 使用说明
.usage-card {
  .usage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx 24rpx;
  }

  .usage-textarea {
    display: block;
    width: calc(100% - 48rpx);
    height: 200rpx;
    font-size: 28rpx;
    color: #333;
    background-color: #F5F7FA;
    border-radius: 12rpx;
    padding: 24rpx;
    margin: 0 24rpx 24rpx;
    box-sizing: border-box;
  }
}

.char-count {
  font-size: 26rpx;
  color: #999;
}

// 底部按钮
.bottom-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: #fff;
}

.save-btn {
  height: 96rpx;
  border-radius: 12rpx;
  background-color: #5B8FF9;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }

  &:active {
    opacity: 0.8;
  }
}

// 弹窗遮罩
.picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

// 弹窗
.picker-modal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  z-index: 1001;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
  padding-bottom: env(safe-area-inset-bottom);

  &.show {
    transform: translateY(0);
  }
}

.picker-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #F0F0F0;
}

.picker-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
}

.picker-close {
  position: absolute;
  right: 24rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 40rpx;
    color: #999;
  }
}

.picker-options {
  padding: 16rpx 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

// 每人限领弹窗选项 - 按钮式
.limit-options {
  .picker-option {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28rpx;
    background-color: #F8FAFC;
    border-radius: 12rpx;

    text {
      font-size: 30rpx;
      color: #333;
    }

    &.active {
      background-color: #5B8FF9;

      text {
        color: #fff;
      }
    }

    &:active {
      opacity: 0.8;
    }
  }
}

// 自定义限领
.custom-limit-row {
  display: flex;
  align-items: center;
  padding: 28rpx;
  background-color: #F8FAFC;
  border-radius: 12rpx;
  gap: 16rpx;
}

.custom-label {
  font-size: 30rpx;
  color: #333;
}

.custom-input {
  flex: 1;
  height: 60rpx;
  background-color: #fff;
  border-radius: 8rpx;
  padding: 0 16rpx;
  font-size: 28rpx;
  text-align: center;
}

.custom-unit {
  font-size: 28rpx;
  color: #666;
}

.custom-confirm-btn {
  height: 60rpx;
  padding: 0 24rpx;
  background-color: #5B8FF9;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 26rpx;
    color: #fff;
    font-weight: 500;
  }

  &:active {
    opacity: 0.8;
  }
}

// 适用服务弹窗 - 标签式
.service-modal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  z-index: 1001;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
  padding-bottom: env(safe-area-inset-bottom);

  &.show {
    transform: translateY(0);
  }
}

.service-modal-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #F0F0F0;
}

.service-modal-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
}

.service-modal-close {
  position: absolute;
  right: 24rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 40rpx;
    color: #999;
  }
}

.service-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 32rpx;
  gap: 24rpx;
}

.service-tag {
  width: calc(50% - 12rpx);
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8rpx;
  border: 2rpx solid #E8E8E8;
  background-color: #F8FAFC;
  box-sizing: border-box;

  text {
    font-size: 28rpx;
    color: #333;
  }

  &.active {
    border-color: #5280FF;
    background-color: #DBE8FF;

    text {
      color: #5280FF;
    }
  }

  &:active {
    opacity: 0.8;
  }
}

.service-modal-footer {
  padding: 24rpx 32rpx;
  border-top: 1rpx solid #F0F0F0;
}

.service-confirm-btn {
  height: 88rpx;
  border-radius: 12rpx;
  background-color: #5B8FF9;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }

  &:active {
    opacity: 0.8;
  }
}

.picker-option {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 28rpx 0;

  text {
    font-size: 30rpx;
    color: #333;
  }

  &:active {
    opacity: 0.7;
  }
}

.option-checkbox {
  width: 32rpx;
  height: 32rpx;
  border-radius: 4rpx;
  border: 2rpx solid #DCDFE6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  text {
    font-size: 22rpx;
    color: #fff;
    font-weight: bold;
  }

  &.checked {
    background-color: #5B8FF9;
    border-color: #5B8FF9;
  }
}

.option-radio {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 2rpx solid #DCDFE6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  text {
    font-size: 24rpx;
    color: #fff;
    font-weight: bold;
  }

  &.checked {
    background-color: #5B8FF9;
    border-color: #5B8FF9;
  }
}

.option-check {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #5B8FF9;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 24rpx;
    color: #fff;
  }
}

.picker-footer {
  padding: 24rpx 32rpx;
  border-top: 1rpx solid #F0F0F0;
}

.picker-btn {
  height: 88rpx;
  border-radius: 44rpx;
  background-color: #5B8FF9;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }

  &:active {
    opacity: 0.8;
  }
}
</style>
