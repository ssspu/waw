<template>
  <view class="container">
    <!-- 基础服务卡片 - 仅套餐模式 -->
    <view class="form-card" v-if="pageType === 'package'">
      <view class="section-header">
        <view class="section-title">基础服务</view>
      </view>
      <view class="service-grid">
        <view
          class="service-item"
          :class="{ selected: item.selected }"
          v-for="item in baseServices"
          :key="item.id"
          @tap="toggleService(item.id)"
        >
          <view class="service-left">
            <view class="service-checkbox" :class="{ checked: item.selected }">
              <text v-if="item.selected">✓</text>
            </view>
            <text class="service-name">{{ item.name }}</text>
          </view>
          <text class="service-price">¥{{ item.price }}</text>
        </view>
      </view>
      <!-- 服务原价 -->
      <view class="form-item">
        <text class="item-label">服务原价</text>
        <view class="item-right">
          <text class="item-value price-orange">¥{{ totalServicePrice }}</text>
        </view>
      </view>
    </view>

    <!-- 基础信息卡片 -->
    <view class="form-card">
      <!-- 服务品类 - 仅服务新增模式 -->
      <view class="form-item" @tap="selectCategory" v-if="pageType !== 'package'">
        <text class="item-label">服务品类</text>
        <view class="item-right">
          <text class="item-value">{{ selectedCategory || '请选择' }}</text>
          <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 服务细分 - 仅服务新增模式 -->
      <view class="form-item" @tap="selectSubCategory" v-if="pageType !== 'package'">
        <text class="item-label">服务细分</text>
        <view class="item-right">
          <text class="item-value placeholder">{{ selectedSubCategory || '请选择服务细分' }}</text>
          <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 服务包含 - 仅服务新增模式 -->
      <view class="form-item" @tap="selectInclude" v-if="pageType !== 'package'">
        <text class="item-label">服务包含</text>
        <view class="item-right">
          <text class="item-value" :class="{ placeholder: !selectedInclude }">{{ selectedInclude || '请选择服务包含内容' }}</text>
          <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 服务名称 -->
      <view class="form-item">
        <text class="item-label">服务名称</text>
        <view class="item-right">
          <input
            class="item-input"
            :placeholder="defaultServiceName || '自定义服务名称（选填）'"
            placeholder-class="placeholder-text"
            :value="serviceName"
            @input="onServiceNameInput"
          />
        </view>
      </view>

      <!-- 添加主图 -->
      <view class="photo-section">
        <view class="photo-item" v-if="uploadedPhotos[0]" @tap="uploadPhoto(0)">
          <image class="photo-image" :src="uploadedPhotos[0]" mode="aspectFill"></image>
        </view>
        <view class="photo-item" v-else @tap="uploadPhoto(0)">
          <image class="photo-image" src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop" mode="aspectFill"></image>
        </view>
        <view class="photo-add" @tap="uploadPhoto(1)">
          <text class="add-icon">+</text>
          <text class="add-text">添加主图</text>
        </view>
      </view>

      <!-- 男士专属 -->
      <view class="form-item switch-item">
        <text class="item-label">男士专属</text>
        <switch :checked="maleOnly" color="#4CD964" @change="onMaleOnlyChange" />
      </view>
    </view>

    <!-- 定价卡片 -->
    <view class="form-card">
      <!-- 定价模式切换 -->
      <view class="pricing-tabs">
        <view
          class="tab-item"
          :class="{ active: pricingMode === 'fixed' }"
          @tap="onPricingModeChange('fixed')"
        >
          <text>一口价</text>
        </view>
        <view
          class="tab-item"
          :class="{ active: pricingMode === 'product' }"
          @tap="onPricingModeChange('product')"
          v-if="showProductPricing"
        >
          <text>产品定价</text>
        </view>
      </view>

      <!-- 一口价模式 -->
      <view class="fixed-price-section" v-if="pricingMode === 'fixed'">
        <!-- 门店原价 -->
        <view class="form-item">
          <text class="item-label">门店原价</text>
          <view class="item-right">
            <input
              class="item-input price-input"
              type="digit"
              placeholder=""
              placeholder-class="placeholder-text"
              :value="storePrice"
              @input="onStorePriceInput"
            />
            <text class="price-unit">元</text>
          </view>
        </view>

        <!-- 预约价格 -->
        <view class="form-item">
          <text class="item-label">预约价格</text>
          <view class="item-right">
            <input
              class="item-input price-input"
              type="digit"
              placeholder="预约价格＜门店原价"
              placeholder-class="placeholder-text"
              :value="bookingPrice"
              @input="onBookingPriceInput"
            />
            <text class="price-unit">元</text>
          </view>
        </view>
      </view>

      <!-- 产品定价表格 -->
      <view class="product-table" v-if="pricingMode === 'product'">
        <!-- 表头 -->
        <view class="table-header">
          <view class="col-product">产品</view>
          <view class="col-price">短发</view>
          <view class="col-price">中发</view>
          <view class="col-price">长发</view>
        </view>

        <!-- 产品行 -->
        <view class="table-row" v-for="item in products" :key="item.id">
          <view class="col-product">
            <text class="product-name">{{ item.name }}</text>
          </view>
          <view class="col-price">
            <input
              class="price-input"
              type="number"
              :value="item.shortHairPrice"
              @input="(e) => updateProductPrice(item.id, 'shortHairPrice', e.detail.value)"
            />
          </view>
          <view class="col-price">
            <input
              class="price-input"
              type="number"
              :value="item.mediumHairPrice"
              @input="(e) => updateProductPrice(item.id, 'mediumHairPrice', e.detail.value)"
            />
          </view>
          <view class="col-price">
            <input
              class="price-input"
              type="number"
              :value="item.longHairPrice"
              @input="(e) => updateProductPrice(item.id, 'longHairPrice', e.detail.value)"
            />
          </view>
        </view>

        <!-- 添加产品按钮 -->
        <view class="add-product-btn" @tap="addProduct">
          <text class="add-icon">+</text>
          <text class="add-text">添加产品</text>
        </view>
      </view>

      <!-- 预约折扣 - 仅产品定价模式 -->
      <view class="form-item" v-if="pricingMode === 'product'">
        <text class="item-label">预约折扣</text>
        <view class="item-right">
          <input
            class="item-input discount-input"
            type="digit"
            placeholder="请输入"
            :value="discountNumber"
            @input="onDiscountInput"
          />
          <text class="discount-unit">折</text>
        </view>
      </view>

      <!-- 折扣表格 - 仅产品定价模式 -->
      <view class="discount-table" v-if="pricingMode === 'product'">
        <view class="table-header">
          <view class="col-product">产品</view>
          <view class="col-price">短发</view>
          <view class="col-price">中发</view>
          <view class="col-price">长发</view>
        </view>
        <view class="table-row" v-for="item in computedDiscountProducts" :key="item.id">
          <view class="col-product">
            <text class="product-name light">{{ item.name }}</text>
          </view>
          <view class="col-price">
            <text class="price-value light">{{ item.shortHairPrice }}</text>
          </view>
          <view class="col-price">
            <text class="price-value light">{{ item.mediumHairPrice }}</text>
          </view>
          <view class="col-price">
            <text class="price-value light">{{ item.longHairPrice }}</text>
          </view>
        </view>
      </view>

      <!-- 增项价格 - 仅套餐模式且产品定价 -->
      <view class="form-item" v-if="pageType === 'package' && pricingMode === 'product'">
        <text class="item-label">增项价格</text>
        <view class="item-right justify-end">
          <input
            class="item-input discount-input"
            type="number"
            placeholder="***"
            :value="additionalPrice"
            @input="onAdditionalPriceInput"
          />
          <text class="discount-unit">元</text>
        </view>
      </view>
    </view>

    <!-- 分销卡片 -->
    <view class="form-card">
      <!-- 服务分销 -->
      <view class="form-item switch-item">
        <text class="item-label">服务分销</text>
        <switch :checked="distributionEnabled" color="#4CD964" @change="onDistributionChange" />
      </view>

      <!-- 分销佣金 -->
      <view class="form-item">
        <text class="item-label">分销佣金</text>
        <view class="item-right">
          <input
            class="item-input commission-input"
            placeholder="分销者的推广佣金比例"
            placeholder-class="placeholder-text"
            :value="distributionCommission"
            @input="onCommissionInput"
          />
          <text class="commission-unit">%</text>
        </view>
      </view>

    </view>

    <!-- 服务详情卡片 -->
    <view class="form-card">
      <!-- 服务方式 -->
      <view class="form-item">
        <text class="item-label">服务方式</text>
        <view class="item-right">
          <text class="item-value">{{ serviceMethod }}</text>
        </view>
      </view>

      <!-- 服务详情 -->
      <view class="form-item" @tap="navigateToServiceDetail">
        <text class="item-label">服务详情</text>
        <view class="item-right">
          <text class="item-value placeholder">{{ serviceDetail || '服务详情介绍' }}</text>
          <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 服务事项 -->
      <view class="form-item" @tap="navigateToServiceMatters">
        <text class="item-label">服务事项</text>
        <view class="item-right">
          <text class="item-value placeholder">{{ serviceMatters || '选择服务注意事项' }}</text>
          <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 服务时间 -->
      <view class="form-item" @tap="selectServiceDuration">
        <text class="item-label">服务时间</text>
        <view class="item-right">
          <text class="item-value placeholder">{{ serviceDuration || '选择预计服务用时' }}</text>
          <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 7天服务承诺 -->
      <view class="form-item switch-item">
        <text class="item-label">7天服务承诺</text>
        <text class="promise-desc">七天内不满意免费重做</text>
        <switch :checked="promiseEnabled" color="#4CD964" @change="onPromiseChange" />
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-buttons">
      <view class="btn-publish" @tap="publishService">
        <text>上架销售</text>
      </view>
    </view>

    <!-- 服务品类/细分选择弹窗 -->
    <view class="category-picker-mask" v-if="showCategoryPicker" @tap="closeCategoryPicker"></view>
    <view class="category-picker-modal" :class="{ show: showCategoryPicker }">
      <view class="category-picker-title">{{ categoryPickerTitle }}</view>

      <!-- 已选 -->
      <view class="category-picker-section">
        <text class="category-picker-section-title">已选</text>
        <view class="category-picker-tags">
          <view
            class="category-tag selected"
            v-for="item in tempCategorySelectedTags"
            :key="item"
          >
            <text>{{ item }}</text>
            <view class="category-tag-close" @tap="removeCategoryTag(item)">
              <image src="/pages/service/static/add-circle@3x.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="category-tag empty" v-if="tempCategorySelectedTags.length === 0">
            <text>请选择</text>
          </view>
        </view>
      </view>

      <!-- 描述 -->
      <view class="category-picker-section">
        <text class="category-picker-section-title">描述</text>
        <view class="category-picker-tags">
          <view
            class="category-tag"
            :class="{ active: tempCategorySelectedTags.includes(item) }"
            v-for="item in currentCategoryOptions"
            :key="item"
            @tap="toggleCategoryTag(item)"
          >
            <text>{{ item }}</text>
          </view>
        </view>
      </view>

      <!-- 保存按钮 -->
      <view class="category-picker-save-btn" @tap="saveCategorySelection">
        <text>保存</text>
      </view>
    </view>

    <!-- 添加产品弹窗 -->
    <view class="picker-modal" v-if="showAddProductModal" @tap="closeAddProductModal">
      <view class="add-product-modal" @tap.stop>
        <view class="modal-header">
          <text class="modal-title">添加产品</text>
          <view class="modal-close" @tap="closeAddProductModal">
            <text>×</text>
          </view>
        </view>
        <view class="modal-body">
          <view class="modal-form-item">
            <text class="modal-label">产品名称</text>
            <input
              class="modal-input"
              placeholder="请输入产品名称"
              :value="newProduct.name"
              @input="onProductNameInput"
            />
          </view>
          <view class="modal-form-item">
            <text class="modal-label">短发价格</text>
            <input
              class="modal-input"
              type="number"
              placeholder="请输入价格"
              :value="newProduct.shortHairPrice"
              @input="onShortHairPriceInput"
            />
          </view>
          <view class="modal-form-item">
            <text class="modal-label">中发价格</text>
            <input
              class="modal-input"
              type="number"
              placeholder="请输入价格"
              :value="newProduct.mediumHairPrice"
              @input="onMediumHairPriceInput"
            />
          </view>
          <view class="modal-form-item">
            <text class="modal-label">长发价格</text>
            <input
              class="modal-input"
              type="number"
              placeholder="请输入价格"
              :value="newProduct.longHairPrice"
              @input="onLongHairPriceInput"
            />
          </view>
        </view>
        <view class="modal-footer">
          <view class="modal-btn cancel" @tap="closeAddProductModal">
            <text>取消</text>
          </view>
          <view class="modal-btn confirm" @tap="confirmAddProduct">
            <text>确定</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 页面类型
const pageType = ref('')

// 服务价格映射表
const servicePriceMap = {
  '检测': 28,
  '洗发': 38,
  '按摩': 48,
  '洗护按摩': 58,
  '修剪': 48,
  '烫发': 298,
  '染发': 198,
  '接发': 998,
  '头发护理': 88,
  '头皮护理': 128,
  '治疗': 168,
  '护理': 88,
  '造型': 48
}

// 套餐基础服务数据（从存储读取或使用默认值）
const baseServices = ref([])

// 计算已选服务总价
const totalServicePrice = computed(() => {
  return baseServices.value
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price, 0)
})

// 切换服务选中状态
const toggleService = (id) => {
  const service = baseServices.value.find(item => item.id === id)
  if (service) {
    service.selected = !service.selected
  }
}

// 基础数据
const serviceName = ref('')
const selectedCategory = ref('美发')
const selectedSubCategory = ref('')
const selectedInclude = ref('')
const uploadedPhotos = ref([])
const maleOnly = ref(false)

// 计算默认服务名称（若包含上门服务则加"上门"前缀）
const defaultServiceName = computed(() => {
  // 套餐模式：用+号连接已选基础服务名称
  if (pageType.value === 'package') {
    const selectedNames = baseServices.value
      .filter(item => item.selected)
      .map(item => item.name)
    if (selectedNames.length === 0) return ''
    const name = selectedNames.join('+')
    const isHomeService = serviceMethod.value.includes('上门服务')
    return isHomeService ? '上门' + name : name
  }
  // 普通模式：使用服务细分名称
  if (!selectedSubCategory.value) return ''
  const isHomeService = serviceMethod.value.includes('上门服务')
  return isHomeService ? '上门' + selectedSubCategory.value : selectedSubCategory.value
})

// 是否显示产品定价选项（洗吹、造型、洗剪吹不显示）
const showProductPricing = computed(() => {
  // 套餐模式：根据已选基础服务的定价方式决定
  if (pageType.value === 'package') {
    const selectedServices = baseServices.value.filter(item => item.selected)
    if (selectedServices.length === 0) return true
    // 如果有任一服务是产品定价，则只显示产品定价
    const hasProductPricing = selectedServices.some(item => item.pricingMode === 'product')
    return hasProductPricing
  }
  // 普通模式：洗吹、造型、洗剪吹不显示产品定价
  const hideProductPricingCategories = ['洗吹', '造型', '洗剪吹']
  return !hideProductPricingCategories.includes(selectedSubCategory.value)
})

// 定价数据
const pricingMode = ref('fixed')
const storePrice = ref('')
const bookingPrice = ref('')
const memberPrice = ref('')
const additionalPrice = ref('') // 增项价格
const bookingDiscount = ref('7')
const discountNumber = ref('7')
const products = ref([
  { id: 1, name: '欧莱雅', shortHairPrice: '380', mediumHairPrice: '480', longHairPrice: '580' },
  { id: 2, name: '施华蔻', shortHairPrice: '480', mediumHairPrice: '580', longHairPrice: '680' }
])

// 计算折扣后的产品价格
const computedDiscountProducts = computed(() => {
  // 解析折扣值，例如 "7" -> 0.7
  const discountNum = parseFloat(discountNumber.value) / 10
  const discountRate = isNaN(discountNum) ? 0.7 : discountNum

  return products.value.map(item => ({
    id: item.id,
    name: item.name,
    shortHairPrice: Math.round(parseFloat(item.shortHairPrice) * discountRate).toString(),
    mediumHairPrice: Math.round(parseFloat(item.mediumHairPrice) * discountRate).toString(),
    longHairPrice: Math.round(parseFloat(item.longHairPrice) * discountRate).toString()
  }))
})

// 添加产品弹窗数据
const showAddProductModal = ref(false)
const newProduct = ref({
  name: '',
  shortHairPrice: '',
  mediumHairPrice: '',
  longHairPrice: ''
})

// 分销数据
const distributionEnabled = ref(false)
const distributionCommission = ref('10')

// 服务详情数据
const serviceMethod = ref('门店服务')
const serviceDetail = ref('')
const serviceMatters = ref('')
const serviceDuration = ref('')
const promiseEnabled = ref(false)

// 服务品类/细分选择弹窗
const showCategoryPicker = ref(false)
const categoryPickerTitle = ref('')
const currentCategoryField = ref('')
const currentCategoryOptions = ref([])
const tempCategorySelectedTags = ref([])

// 品类选项配置
const categoryOptionsConfig = {
  category: { title: '选择服务品类', options: ['美发'] },
  subCategory: { title: '选择服务细分', options: ['洗吹', '造型', '洗剪吹', '烫发', '染发', '头皮护理', '头发护理', '接发', '其他'] }
}

// 页面加载
onLoad((options) => {
  pageType.value = options.type || ''

  if (options.type === 'new') {
    uni.setNavigationBarTitle({ title: '服务新增' })
  } else if (options.type === 'package') {
    uni.setNavigationBarTitle({ title: '套餐新增' })
    pricingMode.value = 'product' // 套餐模式默认使用产品定价
    // 从本地存储读取已发布的服务列表
    loadPublishedServices()
  } else if (options.id) {
    uni.setNavigationBarTitle({ title: '编辑服务' })
  }
})

// 加载已发布的服务列表
const loadPublishedServices = () => {
  try {
    const savedServices = uni.getStorageSync('publishedServices') || []
    // 默认基础服务数据
    const defaultServices = [
      { name: '洗吹', price: 38, pricingMode: 'fixed' },
      { name: '洗剪吹', price: 58, pricingMode: 'fixed' },
      { name: '烫发', price: 288, pricingMode: 'product' },
      { name: '染发', price: 188, pricingMode: 'product' },
      { name: '头发护理', price: 128, pricingMode: 'fixed' }
    ]
    // 合并默认服务和已发布服务，去重
    const allServices = [...defaultServices]
    savedServices.forEach(service => {
      if (!allServices.find(s => s.name === service.name)) {
        allServices.push(service)
      }
    })
    baseServices.value = allServices.map((item, index) => ({
      id: index + 1,
      name: item.name,
      price: item.price || 0,
      pricingMode: item.pricingMode || 'fixed',
      selected: false
    }))
  } catch (e) {
    console.log('加载服务列表失败:', e)
    baseServices.value = []
  }
}

// 服务名称输入
const onServiceNameInput = (e) => {
  serviceName.value = e.detail.value
}

// 选择服务品类（单选）
const selectCategory = () => {
  currentCategoryField.value = 'category'
  const config = categoryOptionsConfig.category
  categoryPickerTitle.value = config.title
  currentCategoryOptions.value = config.options
  // 单选模式
  tempCategorySelectedTags.value = selectedCategory.value ? [selectedCategory.value] : []
  showCategoryPicker.value = true
}

// 选择服务细分
const selectSubCategory = () => {
  currentCategoryField.value = 'subCategory'
  const config = categoryOptionsConfig.subCategory
  categoryPickerTitle.value = config.title
  currentCategoryOptions.value = config.options
  // 解析已保存的多选值
  const savedValue = selectedSubCategory.value || ''
  tempCategorySelectedTags.value = savedValue ? savedValue.split('、') : []
  showCategoryPicker.value = true
}

// 关闭品类选择弹窗
const closeCategoryPicker = () => {
  showCategoryPicker.value = false
}

// 切换品类标签选中状态
const toggleCategoryTag = (item) => {
  // 服务品类和服务细分都为单选模式
  tempCategorySelectedTags.value = [item]
}

// 移除品类已选标签
const removeCategoryTag = (item) => {
  const index = tempCategorySelectedTags.value.indexOf(item)
  if (index > -1) {
    tempCategorySelectedTags.value.splice(index, 1)
  }
}

// 保存品类选择
const saveCategorySelection = () => {
  const field = currentCategoryField.value
  if (field === 'category') {
    // 单选，取第一个值
    selectedCategory.value = tempCategorySelectedTags.value[0] || ''
  } else if (field === 'subCategory') {
    // 单选
    selectedSubCategory.value = tempCategorySelectedTags.value[0] || ''
    // 如果选择了洗吹、造型、洗剪吹，自动切换为一口价模式
    const hideProductPricingCategories = ['洗吹', '造型', '洗剪吹']
    if (hideProductPricingCategories.includes(selectedSubCategory.value)) {
      pricingMode.value = 'fixed'
    }
  }
  showCategoryPicker.value = false
}

// 选择服务包含
const selectInclude = () => {
  uni.navigateTo({
    url: '/pages/service/include',
    events: {
      selectInclude: (data) => {
        selectedInclude.value = data
      }
    }
  })
}

// 上传图片
const uploadPhoto = (index) => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const newPhotos = [...uploadedPhotos.value]
      newPhotos[index] = res.tempFilePaths[0]
      uploadedPhotos.value = newPhotos
    }
  })
}

// 男士专属开关
const onMaleOnlyChange = (e) => {
  maleOnly.value = e.detail.value
}

// 定价模式切换
const onPricingModeChange = (mode) => {
  pricingMode.value = mode
}

// 门店原价输入
const onStorePriceInput = (e) => {
  storePrice.value = e.detail.value
}

// 预约价格输入
const onBookingPriceInput = (e) => {
  bookingPrice.value = e.detail.value
}

// 会员价格输入
const onMemberPriceInput = (e) => {
  memberPrice.value = e.detail.value
}

// 折扣输入
const onDiscountInput = (e) => {
  discountNumber.value = e.detail.value
  bookingDiscount.value = e.detail.value
}

// 增项价格输入
const onAdditionalPriceInput = (e) => {
  additionalPrice.value = e.detail.value
}

// 更新产品价格
const updateProductPrice = (id, field, value) => {
  const product = products.value.find(item => item.id === id)
  if (product) {
    product[field] = value
  }
}

// 添加产品
const addProduct = () => {
  // 重置表单
  newProduct.value = {
    name: '',
    shortHairPrice: '',
    mediumHairPrice: '',
    longHairPrice: ''
  }
  showAddProductModal.value = true
}

// 关闭添加产品弹窗
const closeAddProductModal = () => {
  showAddProductModal.value = false
}

// 产品名称输入
const onProductNameInput = (e) => {
  newProduct.value.name = e.detail.value
}

// 短发价格输入
const onShortHairPriceInput = (e) => {
  newProduct.value.shortHairPrice = e.detail.value
}

// 中发价格输入
const onMediumHairPriceInput = (e) => {
  newProduct.value.mediumHairPrice = e.detail.value
}

// 长发价格输入
const onLongHairPriceInput = (e) => {
  newProduct.value.longHairPrice = e.detail.value
}

// 确认添加产品
const confirmAddProduct = () => {
  // 验证输入
  if (!newProduct.value.name) {
    uni.showToast({ title: '请输入产品名称', icon: 'none' })
    return
  }
  if (!newProduct.value.shortHairPrice || !newProduct.value.mediumHairPrice || !newProduct.value.longHairPrice) {
    uni.showToast({ title: '请输入完整价格', icon: 'none' })
    return
  }

  // 生成新ID
  const maxId = products.value.length > 0 ? Math.max(...products.value.map(p => p.id)) : 0
  const newId = maxId + 1

  // 添加到产品列表（折扣价格由computed自动计算）
  products.value.push({
    id: newId,
    name: newProduct.value.name,
    shortHairPrice: newProduct.value.shortHairPrice,
    mediumHairPrice: newProduct.value.mediumHairPrice,
    longHairPrice: newProduct.value.longHairPrice
  })

  showAddProductModal.value = false
  uni.showToast({ title: '添加成功', icon: 'success' })
}

// 分销开关
const onDistributionChange = (e) => {
  distributionEnabled.value = e.detail.value
}

// 佣金输入
const onCommissionInput = (e) => {
  distributionCommission.value = e.detail.value
}


// 选择服务方式
const selectServiceMethod = () => {
  uni.showActionSheet({
    itemList: ['门店服务', '上门服务', '门店服务/上门服务'],
    success: (res) => {
      const methods = ['门店服务', '上门服务', '门店服务/上门服务']
      serviceMethod.value = methods[res.tapIndex]
    }
  })
}

// 跳转服务详情
const navigateToServiceDetail = () => {
  uni.navigateTo({
    url: '/pages/service/detail-edit',
    events: {
      selectDetail: (data) => {
        serviceDetail.value = data
      }
    }
  })
}

// 跳转服务事项
const navigateToServiceMatters = () => {
  uni.navigateTo({
    url: '/pages/service/matters',
    events: {
      selectMatters: (data) => {
        serviceMatters.value = data
      }
    }
  })
}

// 选择服务时间
const selectServiceDuration = () => {
  uni.showActionSheet({
    itemList: ['30分钟', '1小时', '1.5小时', '2小时', '3小时', '4小时'],
    success: (res) => {
      const durations = ['30分钟', '1小时', '1.5小时', '2小时', '3小时', '4小时']
      serviceDuration.value = durations[res.tapIndex]
    }
  })
}

// 服务承诺开关
const onPromiseChange = (e) => {
  promiseEnabled.value = e.detail.value
}

// 放入仓库
const saveToWarehouse = () => {
  uni.showToast({
    title: '已放入仓库',
    icon: 'success'
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}

// 上架销售
const publishService = () => {
  // 套餐模式验证：至少选择2个基础服务
  if (pageType.value === 'package') {
    const selectedCount = baseServices.value.filter(item => item.selected).length
    if (selectedCount < 2) {
      uni.showToast({ title: '请至少选择2个基础服务', icon: 'none' })
      return
    }
  }

  // 如果是新增服务模式，保存到本地存储
  if (pageType.value === 'new') {
    // 获取服务名称（优先使用自定义名称，否则使用默认名称）
    const newServiceName = serviceName.value || defaultServiceName.value || ''
    if (newServiceName) {
      try {
        const savedServices = uni.getStorageSync('publishedServices') || []
        // 获取价格（一口价模式用门店原价，产品定价模式用0）
        const price = pricingMode.value === 'fixed' ? (parseFloat(storePrice.value) || 0) : 0
        // 检查是否已存在
        if (!savedServices.find(s => s.name === newServiceName)) {
          savedServices.push({
            name: newServiceName,
            price: price,
            pricingMode: pricingMode.value // 保存定价方式
          })
          uni.setStorageSync('publishedServices', savedServices)
        }
      } catch (e) {
        console.log('保存服务失败:', e)
      }
    }
  }

  uni.showToast({
    title: '上架成功',
    icon: 'success'
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding: 20rpx 24rpx 180rpx;
  align-items: stretch;
}

// 表单卡片
.form-card {
  background-color: #fff;
  margin-bottom: 20rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

// 基础服务区块标题
.section-title {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}

// 区块头部
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 24rpx 16rpx;
}

.section-action {
  display: flex;
  align-items: center;

  text {
    font-size: 26rpx;
    color: #4A90E2;
  }
}

.arrow-icon-small {
  width: 28rpx;
  height: 28rpx;
  margin-left: 4rpx;
}

// 空状态提示
.empty-service-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160rpx;
  margin: 0 24rpx 24rpx;
  background-color: #F8FAFC;
  border-radius: 12rpx;
  border: 2rpx dashed #D0D5DD;

  .tip-text {
    font-size: 28rpx;
    color: #999;
  }
}

// 基础服务网格
.service-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 0 24rpx 24rpx;
  gap: 16rpx;
}

.service-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8rpx;
  height: 80rpx;
  width: calc(50% - 8rpx); 
  padding: 0 16rpx;
  background-color: #F8FAFC;
  border-radius: 8rpx;
  border: 2rpx solid #F8FAFC;
  box-sizing: border-box;

  &:active {
    opacity: 0.7;
  }
}

.service-left {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.service-checkbox {
  width: 32rpx;
  height: 32rpx;
  border: 2rpx solid #D0D5DD;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EAECF0;
  flex-shrink: 0;

  &.checked {
    background-color: #4A90E2;
    border-color: #4A90E2;

    text {
      font-size: 20rpx;
      color: #fff;
    }
  }
}

.service-name {
  font-size: 26rpx;
  color: #333;
}

.service-price {
  font-size: 26rpx;
  color: #667085;
}

.service-item.selected .service-price {
  color: #4A90E2;
}

// 表单项
.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 24rpx;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
  }

  &.switch-item {
    switch {
      transform: scale(0.8);
      transform-origin: right center;
    }
  }
}

.item-label {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
  flex-shrink: 0;
}

.label-with-tip {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.item-tip {
  font-size: 22rpx;
  color: #999;
}

.item-right {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  margin-left: 24rpx;
}

.item-value {
  font-size: 28rpx;
  color: #333;
  margin-right: 8rpx;
  flex: 1;
  text-align: left;

  &.placeholder {
    color: #999;
  }

  &.highlight {
    color: #4A90E2;
    margin-left: 8rpx;
  }

  &.no-flex {
    flex: none;
  }

  &.price-orange {
    color: #F79009;
  }
}

.item-right.justify-end {
  justify-content: flex-end;
}

.item-input {
  font-size: 28rpx;
  color: #333;
  text-align: left;
  flex: 1;

  &.price-input {
    text-align: right;
  }
}

.price-unit {
  font-size: 28rpx;
  color: #333;
  margin-left: 8rpx;
  flex-shrink: 0;
}

.item-input.commission {
  max-width: 300rpx;
}

.item-input.commission-input {
  text-align: right;
  color: #4A90E2;
}

.item-input.discount-input {
  text-align: right;
  color: #4A90E2;
  max-width: 120rpx;
  flex: none;
}

.commission-unit {
  font-size: 28rpx;
  color: #4A90E2;
  margin-left: 4rpx;
  flex-shrink: 0;
}

.placeholder-text {
  color: #999;
  text-align: right;
}

:deep(.uni-input-placeholder),
:deep(.placeholder-text) {
  color: #999;
  text-align: right;
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
}

// 图片上传区域
.photo-section {
  display: flex;
  padding: 24rpx;
  gap: 20rpx;
  border-bottom: 1rpx solid #F5F5F5;
}

.photo-item {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  overflow: hidden;
}

.photo-image {
  width: 100%;
  height: 100%;
}

.photo-add {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #EAECF0;

  .add-icon {
    font-size: 48rpx;
    color: #ccc;
    line-height: 1;
  }

  .add-text {
    font-size: 22rpx;
    color: #999;
    margin-top: 8rpx;
  }
}

// 定价标签
.pricing-tabs {
  display: inline-flex;
  margin: 24rpx;
  background-color: #EAECF0;
  border-radius: 12rpx;
  overflow: hidden;
}

.tab-item {
  flex: 1;
  padding: 10rpx 0;
  text-align: center;
  min-width: 160rpx;
  border-radius: 12rpx;

  text {
    font-size: 24rpx;
    color: #666;
  }

  &.active {
    background-color: #4A90E2;

    text {
      color: #fff;
    }
  }
}

// 产品表格
.product-table,
.discount-table {
  background-color: #F8FAFC;
  padding: 0 24rpx 24rpx;
  margin: 18rpx;
}

.table-header {
  background-color: #F8FAFC;
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #F5F5F5;
}

.table-row {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
  }
}

.col-product {
  flex: 1.5;
}

.col-price {
  flex: 1;
  text-align: center;
}

.product-name {
  font-size: 28rpx;
  color: #4A90E2;

  &.light {
    color: #999;
  }
}

.price-value {
  font-size: 28rpx;
  color: #333;

  &.light {
    color: #999;
  }
}

.price-input {
  width: 100%;
  font-size: 28rpx;
  color: #333;
  text-align: center;
  background: transparent;
}

.discount-unit {
  font-size: 28rpx;
  color: #4A90E2;
  flex-shrink: 0;
}

// 添加产品按钮
.add-product-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64rpx;
  border: 2rpx solid #5280FF;
  border-radius: 12rpx;
  margin-top: 20rpx;

  .add-icon {
    font-size: 32rpx;
    color: #4A90E2;
    margin-right: 8rpx;
  }

  .add-text {
    font-size: 28rpx;
    color: #4A90E2;
  }
}

// 复制按钮
.copy-btn {
  background-color: #F8FAFC;
  padding: 8rpx 20rpx;
  border: 2rpx solid #E8E8E8;
  border-radius: 12rpx;
  margin-left: 16rpx;

  text {
    font-size: 24rpx;
    color: #666;
  }
}

// 服务承诺描述
.promise-desc {
  font-size: 24rpx;
  color: #999;
  flex: 1;
  margin-left: 16rpx;
}

// 底部按钮
.bottom-buttons {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 20rpx 24rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.05);
  gap: 24rpx;
}

.btn-warehouse {
  flex: 1;
  height: 88rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 2rpx solid #E8E8E8;

  text {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
  }
}

.btn-publish {
  flex: 1;
  height: 88rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5280FF;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }
}

// 选择器弹窗
.picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: flex-end;
}

.picker-content {
  width: 100%;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
}

.picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid #F5F5F5;
}

.picker-cancel {
  font-size: 28rpx;
  color: #999;
}

.picker-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
}

.picker-confirm {
  font-size: 28rpx;
  color: #4A90E2;
}

.picker-view {
  height: 400rpx;
}

.picker-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #333;
}

// 添加产品弹窗
.add-product-modal {
  width: 90%;
  max-width: 600rpx;
  background-color: #fff;
  border-radius: 24rpx;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  border-bottom: 1rpx solid #F5F5F5;
}

.modal-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
}

.modal-close {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 40rpx;
    color: #999;
    line-height: 1;
  }
}

.modal-body {
  padding: 24rpx 32rpx;
}

.modal-form-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
  }
}

.modal-label {
  font-size: 28rpx;
  color: #333;
  width: 160rpx;
  flex-shrink: 0;
}

.modal-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
  text-align: right;
}

.modal-footer {
  display: flex;
  padding: 24rpx 32rpx;
  gap: 24rpx;
  border-top: 1rpx solid #F5F5F5;
}

.modal-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 28rpx;
    font-weight: 500;
  }

  &.cancel {
    background-color: #F5F5F5;

    text {
      color: #666;
    }
  }

  &.confirm {
    background-color: #4A90E2;

    text {
      color: #fff;
    }
  }
}

// 服务品类/细分选择弹窗
.category-picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.category-picker-modal {
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

.category-picker-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.category-picker-section {
  margin-bottom: 40rpx;
  padding: 0 8rpx;
}

.category-picker-section-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 24rpx;
  display: block;
}

.category-picker-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.category-tag {
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

.category-tag-close {
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

.category-picker-save-btn {
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
