<template>
  <view class="container">
    <!-- 基础信息 -->
    <view class="section-title">基础信息</view>
    <view class="form-card">
      <view class="form-item">
        <text class="form-label">姓名</text>
        <input
          class="form-input"
          placeholder="请输入顾客姓名"
          placeholder-class="placeholder"
          v-model="formData.name"
        />
      </view>

      <view class="form-item">
        <text class="form-label">性别</text>
        <view class="gender-options">
          <view
            class="gender-option"
            :class="{ active: formData.gender === 'male' }"
            @tap="selectGender('male')"
          >
            <view class="radio-circle" :class="{ checked: formData.gender === 'male' }"></view>
            <text>男</text>
          </view>
          <view
            class="gender-option"
            :class="{ active: formData.gender === 'female' }"
            @tap="selectGender('female')"
          >
            <view class="radio-circle" :class="{ checked: formData.gender === 'female' }"></view>
            <text>女</text>
          </view>
        </view>
      </view>

      <view class="form-item" @tap="showAgePicker">
        <text class="form-label">年龄</text>
        <view class="form-value">
          <text :class="{ placeholder: !formData.age }">{{ formData.age || '请选择年龄' }}</text>
          <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
        </view>
      </view>

      <picker mode="date" :value="formData.birthday || '2000-01-01'" @change="onBirthdayChange">
        <view class="form-item">
          <text class="form-label">生日</text>
          <view class="form-value">
            <text :class="{ placeholder: !formData.birthday }">{{ formData.birthday || '请选择生日' }}</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>
      </picker>

      <view class="form-item">
        <text class="form-label">工龄</text>
        <input
          class="form-input"
          placeholder="请填写从业时间"
          placeholder-class="placeholder"
          v-model="formData.workYears"
        />
      </view>

      <view class="form-item">
        <text class="form-label">等级</text>
        <input
          class="form-input"
          placeholder="请填写技能等级"
          placeholder-class="placeholder"
          v-model="formData.level"
        />
      </view>

      <view class="form-item">
        <text class="form-label">电话</text>
        <input
          class="form-input"
          placeholder="请填写电话"
          placeholder-class="placeholder"
          type="number"
          v-model="formData.phone"
        />
      </view>

      <view class="form-item">
        <text class="form-label">邮箱</text>
        <input
          class="form-input"
          placeholder="请填写邮箱"
          placeholder-class="placeholder"
          v-model="formData.email"
        />
      </view>

      <view class="form-item">
        <text class="form-label">身份证号</text>
        <input
          class="form-input"
          placeholder="请填写身份证号"
          placeholder-class="placeholder"
          v-model="formData.idCard"
        />
      </view>

      <view class="form-item">
        <text class="form-label">联系地址</text>
        <input
          class="form-input"
          placeholder="请填写联系地址"
          placeholder-class="placeholder"
          v-model="formData.address"
        />
      </view>

      <picker mode="date" :value="formData.entryDate || '2020-01-01'" @change="onEntryDateChange">
        <view class="form-item">
          <text class="form-label">入职时间</text>
          <view class="form-value">
            <text :class="{ placeholder: !formData.entryDate }">{{ formData.entryDate || '请选择入职时间' }}</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>
      </picker>

      <view class="form-item last">
        <text class="form-label">备注</text>
        <input
          class="form-input"
          placeholder="请填写备注"
          placeholder-class="placeholder"
          v-model="formData.remark"
        />
      </view>
    </view>

    <!-- 年龄选择器 -->
    <picker
      mode="selector"
      :range="ageRange"
      :value="ageIndex"
      @change="onAgeChange"
      ref="agePicker"
      style="display: none;"
    ></picker>

    <!-- 底部保存按钮 -->
    <view class="save-btn-wrapper" v-if="hasChanged">
      <view class="save-btn" @tap="saveData">
        <text>保存</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 表单数据
const formData = ref({
  name: '',
  gender: '',
  age: '',
  birthday: '',
  workYears: '',
  level: '',
  phone: '',
  email: '',
  idCard: '',
  address: '',
  entryDate: '',
  remark: ''
})

// 原始数据（用于比较是否修改）
const originalData = ref({})

// 技师ID
const technicianId = ref(null)

// 检测是否有修改
const hasChanged = computed(() => {
  return JSON.stringify(formData.value) !== JSON.stringify(originalData.value)
})

// 年龄选择器
const ageRange = Array.from({ length: 60 }, (_, i) => `${i + 18}岁`)
const ageIndex = ref(0)

// 页面加载
onLoad((options) => {
  if (options.id) {
    technicianId.value = options.id
    loadTechnicianData(options.id)
  }
})

// 加载技师数据
const loadTechnicianData = (id) => {
  // 模拟数据
  const data = {
    name: '赵静静',
    gender: 'female',
    age: '28岁',
    birthday: '1996-05-15',
    workYears: '10年',
    level: '高级',
    phone: '13800138000',
    email: 'zhaojj@example.com',
    idCard: '510***********1234',
    address: '成都市青羊区某某街道',
    entryDate: '2025-07-27',
    remark: '优秀员工'
  }
  formData.value = { ...data }
  // 保存原始数据用于比较
  originalData.value = { ...data }
}

// 选择性别
const selectGender = (gender) => {
  formData.value.gender = gender
}

// 显示年龄选择器
const showAgePicker = () => {
  uni.showActionSheet({
    itemList: ageRange,
    success: (res) => {
      formData.value.age = ageRange[res.tapIndex]
    }
  })
}

// 年龄选择变化
const onAgeChange = (e) => {
  ageIndex.value = e.detail.value
  formData.value.age = ageRange[e.detail.value]
}

// 生日选择变化
const onBirthdayChange = (e) => {
  formData.value.birthday = e.detail.value
}

// 入职时间选择变化
const onEntryDateChange = (e) => {
  formData.value.entryDate = e.detail.value
}

// 保存数据
const saveData = () => {
  uni.showLoading({ title: '保存中...' })
  // 模拟保存请求
  setTimeout(() => {
    uni.hideLoading()
    // 更新原始数据为当前数据
    originalData.value = { ...formData.value }

    // 发送事件通知列表页面更新数据
    uni.$emit('technicianUpdated', {
      id: technicianId.value,
      data: {
        name: formData.value.name,
        experience: formData.value.workYears,
        level: formData.value.level,
        entryDate: formData.value.entryDate
      }
    })

    uni.showToast({ title: '保存成功', icon: 'success' })
  }, 500)
}
</script>

<style lang="scss" scoped>
.container {
  padding: 24rpx;
  min-height: 100vh;
  background-color: #F5F7FA;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
}

.section-title {
margin-right: 550rpx;
padding: 12rpx;
}

.form-card {
  width: 100%;
  background-color: #fff;
  margin: 0 24rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 32rpx 24rpx;
  border-bottom: 1rpx solid #F5F5F5;

  &.last {
    border-bottom: none;
  }
}

.form-label {
  font-size: 28rpx;
  color: #333;
  width: 160rpx;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  font-size: 28rpx;
  color: #98A2B3;
  text-align: left;
  padding-left: 40rpx;
}

.placeholder {
  color: #98A2B3;
}

.form-value {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 40rpx;

  text {
    font-size: 28rpx;
    color: #98A2B3;

    &.placeholder {
      color: #98A2B3;
    }
  }
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 8rpx;
}

.gender-options {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  gap: 48rpx;
  padding-left: 40rpx;
}

.gender-option {
  display: flex;
  align-items: center;
  gap: 12rpx;

  text {
    font-size: 28rpx;
    color: #333;
  }
}

.radio-circle {
  width: 32rpx;
  height: 32rpx;
  border: 2rpx solid #ddd;
  border-radius: 50%;
  position: relative;

  &.checked {
    border-color: #4A90E2;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20rpx;
      height: 20rpx;
      background-color: #4A90E2;
      border-radius: 50%;
    }
  }
}

// 底部保存按钮
.save-btn-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24rpx 32rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.save-btn {
  height: 88rpx;
  background-color: #5280FF;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }
}
</style>
