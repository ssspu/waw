<template>
  <view class="container">
    <!-- 基础信息 -->
           <view class="section-title">基础信息</view>
    <view class="section">

      <view class="form-list">
        <view class="form-item">
          <text class="label">姓名</text>
          <input class="input-value" type="text" placeholder="请填写姓名" v-model="basicInfo.name" />
        </view>
        <view class="form-item">
          <text class="label">微信名</text>
          <input class="input-value" type="text" placeholder="请填写微信名" v-model="basicInfo.wechatName" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <view class="gender-options">
            <view class="gender-option" @tap="selectGender('男')">
              <view class="radio-circle" :class="{ checked: basicInfo.gender === '男' }"></view>
              <text>男</text>
            </view>
            <view class="gender-option" @tap="selectGender('女')">
              <view class="radio-circle" :class="{ checked: basicInfo.gender === '女' }"></view>
              <text>女</text>
            </view>
          </view>
        </view>
        <view class="form-item">
          <text class="label">年龄</text>
          <input class="input-value" type="number" placeholder="请填写年龄" v-model="basicInfo.age" />
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker mode="date" :value="basicInfo.birthday" @change="onBirthdayChange">
            <view class="picker-value">
              <text :class="{ placeholder: !basicInfo.birthday }">{{ basicInfo.birthday || '请选择生日' }}</text>
              <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
            </view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">身高</text>
          <input class="input-value" type="text" placeholder="请填写身高" v-model="basicInfo.height" />
        </view>
      </view>
    </view>

    <!-- 联系方式 -->
           <view class="section-title">联系方式</view>
    <view class="section">

      <view class="form-list">
        <view class="form-item">
          <text class="label">电话</text>
          <input class="input-value" type="number" placeholder="请填写电话" v-model="contactInfo.phone" />
        </view>
        <view class="form-item">
          <text class="label">邮箱</text>
          <input class="input-value" type="text" placeholder="请填写邮箱" v-model="contactInfo.email" />
        </view>
        <view class="form-item">
          <text class="label">地址</text>
          <input class="input-value" type="text" placeholder="请填写地址" v-model="contactInfo.address" />
        </view>
      </view>
    </view>

    <!-- 客户画像 -->
      <view class="section-title">客户画像</view>

    <view class="section">
      <view class="form-list">
        <view class="form-item clickable" @tap="openTagPicker('industry')">
          <text class="label">行业</text>
          <view class="picker-value">
            <text :class="{ placeholder: !customerProfile.industry }">{{ customerProfile.industry || '请选择行业' }}</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>
        <view v-if="currentStyleOptions.length" class="form-item clickable" @tap="openTagPicker('style')">
          <text class="label">风格</text>
          <view class="picker-value">
            <text :class="{ placeholder: !customerProfile.style }">{{ customerProfile.style || '请选择风格' }}</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>
        <view v-else class="form-item clickable" @tap="promptSelectGender">
          <text class="label">风格</text>
          <view class="picker-value">
            <text class="placeholder">请选择风格</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>
        <view class="form-item">
          <text class="label">喜好</text>
          <input class="input-value" type="text" placeholder="请填写喜好" v-model="customerProfile.preference" />
        </view>
        <view class="form-item clickable" @tap="openTagPicker('source')">
          <text class="label">来源</text>
          <view class="picker-value">
            <text :class="{ placeholder: !customerProfile.source }">{{ customerProfile.source || '请选择来源' }}</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>
        <view class="form-item">
          <text class="label">推荐人</text>
          <input class="input-value" type="text" placeholder="请填写推荐人" v-model="customerProfile.referrer" />
        </view>
        <view class="form-item">
          <text class="label">备注</text>
          <input class="input-value" type="text" placeholder="请填写备注" v-model="customerProfile.remark" />
        </view>
      </view>
    </view>

    <!-- 烫染详情 -->
             <text class="section-title-inline">烫染详情</text>
    <view class="section">
      <view class="section-header-row">

        <view class="scheme-tabs">
          <view
            class="scheme-tab"
            :class="{ active: schemeTab === 'all' }"
            @tap="switchSchemeTab('all')"
          >全部</view>
          <view
            class="scheme-tab"
            :class="{ active: schemeTab === 'dye' }"
            @tap="switchSchemeTab('dye')"
          >染发</view>
          <view
            class="scheme-tab"
            :class="{ active: schemeTab === 'perm' }"
            @tap="switchSchemeTab('perm')"
          >烫发</view>
        </view>
      </view>
      <view class="scheme-list">
        <view
          class="scheme-item"
          v-for="item in filteredSchemes"
          :key="item.id"
          @tap="goToSchemeDetail(item)"
        >
          <view class="scheme-tag" :class="item.type === 'perm' ? 'tag-perm' : 'tag-dye'">
            {{ item.type === 'perm' ? '烫发' : '染发' }}
          </view>
          <text class="scheme-name">{{ item.name }}</text>
          <text class="scheme-time">{{ item.time }}</text>
        </view>
        <view class="empty-state" v-if="filteredSchemes.length === 0">
          <text>暂无{{ schemeTab === 'all' ? '烫染' : schemeTab === 'dye' ? '染发' : '烫发' }}方案</text>
        </view>
      </view>
    </view>

    <!-- 消费记录 -->
           <view class="section-title">消费记录</view>
    <view class="section">

      <view class="record-list" v-if="consumptionRecords.length">
        <view class="record-item" v-for="item in consumptionRecords" :key="item.id" @tap="goToOrder(item.orderId)">
          <view class="record-left">
            <view class="record-title-row">
              <text class="record-name">{{ item.name }}</text>
              <text class="record-sub" v-if="item.subName">{{ item.subName }}</text>
            </view>
            <text class="record-time">{{ item.time }}</text>
          </view>
          <text class="record-price">¥{{ item.amount }}</text>
        </view>
      </view>
      <view class="empty-state" v-else>
        <text>暂无消费记录</text>
      </view>
    </view>

    <!-- 标签选择弹窗 -->
    <view class="tag-picker-mask" v-if="showTagPicker" @tap="closeTagPicker"></view>
    <view class="tag-picker-modal" :class="{ show: showTagPicker }">
      <view class="tag-picker-title">{{ tagPickerTitle }}</view>

      <!-- 已选 -->
      <view class="tag-picker-section">
        <text class="tag-picker-section-title">已选</text>
        <view class="tag-picker-tags">
          <view
            class="tag-item selected"
            v-for="item in tempSelectedTags"
            :key="item"
          >
            <text>{{ item }}</text>
            <view class="tag-close" @tap="removeSelectedTag(item)">
              <image src="/pages/customer/static/add-circle@3x.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="tag-item empty" v-if="tempSelectedTags.length === 0">
            <text>请选择</text>
          </view>
        </view>
      </view>

      <!-- 描述 -->
      <view class="tag-picker-section">
        <text class="tag-picker-section-title">描述</text>
        <view class="tag-picker-tags">
          <view
            class="tag-item"
            :class="{ active: tempSelectedTags.includes(item) }"
            v-for="item in currentTagOptions"
            :key="item"
            @tap="toggleTagItem(item)"
          >
            <text>{{ item }}</text>
          </view>
        </view>
      </view>

      <!-- 保存按钮 -->
      <view class="tag-picker-save-btn" @tap="saveTagSelection">
        <text>保存</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 客户ID
const customerId = ref(null)

// 基础信息
const basicInfo = reactive({
  name: '',
  wechatName: '',
  gender: '',
  age: '',
  birthday: '',
  height: ''
})

// 联系方式
const contactInfo = reactive({
  phone: '',
  email: '',
  address: ''
})

// 客户画像
const customerProfile = reactive({
  industry: '',
  style: '',
  preference: '',
  source: '',
  referrer: '',
  remark: ''
})

// 行业选择器选项
const industryOptions = ['医疗', '教育', '金融', '制造', '服务', '自由职业', '互联网', '技术']

// 风格选择器选项
const femaleStyleOptions = ['可爱型', '时尚型', '优雅型', '柔美型', '知性型', '浪漫型', '华丽型', '现代型']
const maleStyleOptions = ['轻熟风', '韩系风', '英伦风', '商务风', '少年风', '雅痞风', '运动风', '复古风']

// 来源选择器选项
const sourceOptions = ['推荐', '网络', '邮件', '海报', '传单', '其他']

// 标签选择弹窗状态
const showTagPicker = ref(false)
const tagPickerTitle = ref('')
const currentTagField = ref('')
const currentTagOptions = ref([])
const tempSelectedTags = ref([])

// 标签配置
const tagOptionsConfig = {
  industry: { title: '选择行业', options: industryOptions },
  style: { title: '选择风格', options: [] },  // 动态根据性别获取
  source: { title: '选择来源', options: sourceOptions }
}

// 根据性别选择风格选项
const currentStyleOptions = computed(() => {
  if (basicInfo.gender === '男') return maleStyleOptions
  if (basicInfo.gender === '女') return femaleStyleOptions
  return []
})

// 烫染方案Tab
const schemeTab = ref('all')
const schemes = ref([])

// 筛选后的方案列表
const filteredSchemes = computed(() => {
  if (schemeTab.value === 'all') {
    return schemes.value
  }
  return schemes.value.filter(s => s.type === schemeTab.value)
})

// 消费记录
const consumptionRecords = ref([])

// 页面加载
onLoad((options) => {
  if (options.id) {
    customerId.value = options.id
    loadCustomerData(options.id)
  }
})

// 加载客户数据
const loadCustomerData = (id) => {
  // 模拟数据填充 - 匹配设计图数据
  basicInfo.name = '魏莹玲'
  basicInfo.wechatName = 'Weiyingling'
  basicInfo.gender = '女'
  basicInfo.age = ''
  basicInfo.birthday = ''
  basicInfo.height = ''

  contactInfo.phone = ''
  contactInfo.email = ''
  contactInfo.address = ''

  customerProfile.industry = '自由职业'
  customerProfile.style = ''
  customerProfile.preference = '音乐、舞蹈'
  customerProfile.source = '朋友推荐'
  customerProfile.referrer = '马菲菲'
  customerProfile.remark = '很好的顾客'

  // 模拟烫染方案
  schemes.value = [
    { id: 1, type: 'dye', name: '专业植物染发', time: '2025-12-10 12:00:00' },
    { id: 2, type: 'perm', name: '欧莱雅生化烫', time: '2025-12-10 12:00:00' },
    { id: 3, type: 'dye', name: '专业植物染发', time: '2025-12-10 12:00:00' }
  ]

  // 模拟消费记录
  consumptionRecords.value = [
    { id: 1, orderId: 201, name: '洗吹', subName: '', time: '2025-11-26 18:20:48', amount: '38' },
    { id: 2, orderId: 202, name: '女士烫发', subName: '欧莱雅生化烫', time: '2025-11-26 18:20:48', amount: '680' },
    { id: 3, orderId: 203, name: '女士染发', subName: '专业植物染发', time: '2025-11-26 18:20:48', amount: '1080' }
  ]
}

// 选择性别
const selectGender = (gender) => {
  basicInfo.gender = gender
  customerProfile.style = ''
}

// 生日选择
const onBirthdayChange = (e) => {
  basicInfo.birthday = e.detail.value
}

// 提示选择性别
const promptSelectGender = () => {
  uni.showToast({ title: '请先选择性别', icon: 'none' })
}

// 打开标签选择弹窗
const openTagPicker = (field) => {
  currentTagField.value = field
  if (field === 'style') {
    tagPickerTitle.value = '选择风格'
    currentTagOptions.value = currentStyleOptions.value
  } else {
    const config = tagOptionsConfig[field]
    tagPickerTitle.value = config.title
    currentTagOptions.value = config.options
  }
  // 解析已保存的多选值
  const savedValue = customerProfile[field] || ''
  tempSelectedTags.value = savedValue ? savedValue.split('、') : []
  showTagPicker.value = true
}

// 关闭标签选择弹窗
const closeTagPicker = () => {
  showTagPicker.value = false
}

// 切换标签选中状态（单选模式）
const toggleTagItem = (item) => {
  // 单选：直接替换为当前选中项
  if (tempSelectedTags.value.includes(item)) {
    tempSelectedTags.value = []
  } else {
    tempSelectedTags.value = [item]
  }
}

// 移除已选标签
const removeSelectedTag = (item) => {
  const index = tempSelectedTags.value.indexOf(item)
  if (index > -1) {
    tempSelectedTags.value.splice(index, 1)
  }
}

// 保存标签选择
const saveTagSelection = () => {
  const field = currentTagField.value
  customerProfile[field] = tempSelectedTags.value.join('、')
  showTagPicker.value = false
}

// 切换烫染Tab
const switchSchemeTab = (tab) => {
  schemeTab.value = tab
}

// 跳转到方案详情
const goToSchemeDetail = (item) => {
  const url = item.type === 'perm'
    ? `/pages/customer/perm-plan?id=${item.id}&customerId=${customerId.value}`
    : `/pages/customer/dye-plan?id=${item.id}&customerId=${customerId.value}`
  uni.navigateTo({ url })
}

// 跳转到订单详情
const goToOrder = (orderId) => {
  uni.navigateTo({ url: `/pages/order/detail?id=${orderId}` })
}
</script>

<style lang="scss" scoped>
.container {
  padding:24rpx;
  min-height: 100vh;
  background-color: #EDF0F4;
  padding-bottom: env(safe-area-inset-bottom);
}

// 区块样式
.section {
  margin: 24rpx;
  width: 100%;
  background-color: #fff;
  margin-bottom: 24rpx;
  border-radius: 12rpx;
}



.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 32rpx 24rpx;
}

.section-title {
  padding-right:560rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  background-color: #EDF0F4;
  margin-top: 24rpx;
}

.section-title-inline {
  padding-right:560rpx;
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}

// 表单列表
.form-list {
  padding: 0 32rpx;
}

.form-item {
  display: flex;
  align-items: center;
  min-height: 100rpx;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
  }

  &.clickable:active {
    background-color: #f8f8f8;
  }

  picker {
    flex: 1;
  }
}

.label {
  width: 140rpx;
  font-size: 28rpx;
  color: #333;
  flex-shrink: 0;
}

.input-value {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.picker-value {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  text {
    font-size: 28rpx;
    color: #333;

    &.placeholder {
      color: #C8C9CC;
    }
  }
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: auto;
  flex-shrink: 0;
}

// 性别选择
.gender-options {
  flex: 1;
  display: flex;
  gap: 48rpx;
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
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #DCDFE6;
  border-radius: 50%;
  position: relative;
  background-color: #fff;

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

// 烫染方案Tab
.scheme-tabs {
  width: 400rpx;
  display: flex;
  justify-content: space-around;
  background-color: #F5F7FA;
  border-radius: 8rpx;
  padding: 4rpx;
}

.scheme-tab {
  padding: 12rpx 38rpx;
  font-size: 24rpx;
  color: #666;
  border-radius: 6rpx;

  &.active {
    background-color: #4A90E2;
    color: #fff;
  }
}

// 烫染方案列表
.scheme-list {
  padding: 0 32rpx 24rpx;
}

.scheme-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f8f8f8;
  }
}

.scheme-tag {
  padding: 6rpx 16rpx;
  border-radius: 6rpx;
  font-size: 22rpx;
  margin-right: 16rpx;

  &.tag-dye {
    background-color: #FFF7E6;
    color: #FA8C16;
  }

  &.tag-perm {
    background-color: #E6F7FF;
    color: #1890FF;
  }
}

.scheme-name {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.scheme-time {
  font-size: 24rpx;
  color: #999;
}

// 消费记录
.record-list {
  background-color: #EDF0F4;
}

.record-item {
  background-color:#FFFFFF;
  display: flex;
  justify-content: space-between;
  border-radius:12rpx;
  align-items: center;
  padding: 24rpx;
  margin: 12rpx 0;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f8f8f8;
  }
}

.record-left {
  flex: 1;
}

.record-title-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 8rpx;
}

.record-name {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}

.record-sub {
  font-size: 24rpx;
  color: #999;
}

.record-time {
  font-size: 24rpx;
  color: #999;
}

.record-price {
  font-size: 32rpx;
  font-weight: 600;
  color: #FA8C16;
}

// 空状态
.empty-state {
  padding: 48rpx;
  text-align: center;

  text {
    font-size: 28rpx;
    color: #999;
  }
}

// 标签选择弹窗
.tag-picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.tag-picker-modal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  z-index: 999;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
  max-height: 80vh;
  padding: 40rpx 32rpx;
  padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;

  &.show {
    transform: translateY(0);
  }
}

.tag-picker-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.tag-picker-section {
  margin-bottom: 40rpx;
  padding: 0 8rpx;
}

.tag-picker-section-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 24rpx;
  display: block;
}

.tag-picker-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.tag-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc((100% - 40rpx) / 3);
  height: 62rpx;
  background-color: #F5F7FA;
  border-radius: 12rpx;
  border: 2rpx solid transparent;
  box-sizing: border-box;

  text {
    font-size: 28rpx;
    color: #333;
  }

  &.active {
    background-color: #EBF2FF;
    border-color: #5280FF;

    text {
      color: #5280FF;
    }
  }

  &.selected {
    background-color: #EBF2FF;
    border-color: transparent;
    justify-content: space-between;
    padding: 0 16rpx;

    text {
      color: #5280FF;
    }
  }

  &.empty {
    background-color: transparent;
    border: none;
    width: auto;

    text {
      color: #C8C9CC;
    }
  }
}

.tag-close {
  width: 32rpx;
  height: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  image {
    width: 32rpx;
    height: 32rpx;
  }
}

.tag-picker-save-btn {
  height: 96rpx;
  background-color: #5280FF;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20rpx 8rpx 0;

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
