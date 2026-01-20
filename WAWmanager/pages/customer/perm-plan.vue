<template>
  <view class="container">
    <!-- 头皮信息 -->
    <view class="section-title">头皮信息</view>
    <view class="section">
      <view class="form-list">
        <view class="form-item clickable" @tap="openScalpPicker('type')">
          <text class="label">皮性</text>
          <view class="picker-value">
            <text :class="{ placeholder: !scalpInfo.type }">{{ scalpInfo.type || '选择皮性' }}</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>
        <view class="form-item clickable" @tap="openScalpPicker('health')">
          <text class="label">皮况</text>
          <view class="picker-value">
            <text :class="{ placeholder: !scalpInfo.health }">{{ scalpInfo.health || '选择皮况' }}</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>
      </view>
    </view>

    <!-- 发质信息 -->
    <view class="section-title">发质信息</view>
    <view class="section hair-info-section">
      <view class="hair-grid">
        <!-- Row 1: 发量 | 发长 -->
        <view class="hair-grid-row">
          <view class="hair-grid-item">
            <text class="hair-label">发量</text>
            <view class="hair-picker-box" @tap="openHairPicker('amount')">
              <text :class="{ placeholder: !getHairDisplayText('amount') }">{{ getHairDisplayText('amount') || '请选择' }}</text>
              <image class="hair-arrow" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="hair-grid-item">
            <text class="hair-label">发长</text>
            <view class="hair-picker-box" @tap="openHairPicker('length')">
              <text :class="{ placeholder: !getHairDisplayText('length') }">{{ getHairDisplayText('length') || '请选择' }}</text>
              <image class="hair-arrow" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
            </view>
          </view>
        </view>
        <!-- Row 2: 发况 | 发质 -->
        <view class="hair-grid-row">
          <view class="hair-grid-item">
            <text class="hair-label">发况</text>
            <view class="hair-picker-box" @tap="openHairPicker('condition')">
              <text :class="{ placeholder: !getHairDisplayText('condition') }">{{ getHairDisplayText('condition') || '请选择' }}</text>
              <image class="hair-arrow" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="hair-grid-item">
            <text class="hair-label">发质</text>
            <view class="hair-picker-box" @tap="openHairPicker('texture')">
              <text :class="{ placeholder: !getHairDisplayText('texture') }">{{ getHairDisplayText('texture') || '请选择' }}</text>
              <image class="hair-arrow" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
            </view>
          </view>
        </view>
        <!-- Row 3: 发状 | 受损 -->
        <view class="hair-grid-row">
          <view class="hair-grid-item">
            <text class="hair-label">发状</text>
            <view class="hair-picker-box" @tap="openHairPicker('shape')">
              <text :class="{ placeholder: !getHairDisplayText('shape') }">{{ getHairDisplayText('shape') || '请选择' }}</text>
              <image class="hair-arrow" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="hair-grid-item">
            <text class="hair-label">受损</text>
            <view class="hair-picker-box" @tap="openHairPicker('damage')">
              <text :class="{ placeholder: !getHairDisplayText('damage') }">{{ getHairDisplayText('damage') || '请选择' }}</text>
              <image class="hair-arrow" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
            </view>
          </view>
        </view>
        <!-- Row 4: 发色 | 白发 -->
        <view class="hair-grid-row">
          <view class="hair-grid-item">
            <text class="hair-label">发色</text>
            <view class="hair-picker-box" @tap="openHairPicker('color')">
              <text :class="{ placeholder: !getHairDisplayText('color') }">{{ getHairDisplayText('color') || '请选择' }}</text>
              <image class="hair-arrow" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="hair-grid-item">
            <text class="hair-label">白发</text>
            <view class="hair-picker-box" @tap="openHairPicker('whiteHair')">
              <text :class="{ placeholder: !getHairDisplayText('whiteHair') }">{{ getHairDisplayText('whiteHair') || '请选择' }}</text>
              <image class="hair-arrow" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 烫发方案 -->
    <view class="section-title">烫发方案</view>
    <view class="section">
      <view class="form-list">
        <!-- 烫前照片 -->
        <view class="photo-section">
          <text class="photo-label">烫前照片</text>
          <view class="photo-grid">
            <view class="photo-grid-item">
              <view class="photo-box" v-if="permPlan.beforePhotos.left" @tap="previewSingleImage(permPlan.beforePhotos.left)">
                <image :src="permPlan.beforePhotos.left" mode="aspectFill"></image>
                <view class="delete-photo" @tap.stop="removePositionPhoto('before', 'left')">×</view>
              </view>
              <view class="add-photo-box" v-else @tap="addPositionPhoto('before', 'left')">
                <image class="add-icon" src="/static/icons/add-line@3x.png"></image>
                <text>添加</text>
              </view>
              <text class="photo-position-label">左侧</text>
            </view>
            <view class="photo-grid-item">
              <view class="photo-box" v-if="permPlan.beforePhotos.right" @tap="previewSingleImage(permPlan.beforePhotos.right)">
                <image :src="permPlan.beforePhotos.right" mode="aspectFill"></image>
                <view class="delete-photo" @tap.stop="removePositionPhoto('before', 'right')">×</view>
              </view>
              <view class="add-photo-box" v-else @tap="addPositionPhoto('before', 'right')">
                <image class="add-icon" src="/static/icons/add-line@3x.png"></image>
                <text>添加</text>
              </view>
              <text class="photo-position-label">右侧</text>
            </view>
            <view class="photo-grid-item">
              <view class="photo-box" v-if="permPlan.beforePhotos.back" @tap="previewSingleImage(permPlan.beforePhotos.back)">
                <image :src="permPlan.beforePhotos.back" mode="aspectFill"></image>
                <view class="delete-photo" @tap.stop="removePositionPhoto('before', 'back')">×</view>
              </view>
              <view class="add-photo-box" v-else @tap="addPositionPhoto('before', 'back')">
                <image class="add-icon" src="/static/icons/add-line@3x.png"></image>
                <text>添加</text>
              </view>
              <text class="photo-position-label">后侧</text>
            </view>
          </view>
        </view>

        <view class="form-item clickable" @tap="openBrandPicker">
          <text class="label">品牌</text>
          <view class="picker-value">
            <text :class="{ placeholder: !permPlan.brand }">{{ permPlan.brand || '请选择品牌' }}</text>
            <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
          </view>
        </view>
        <view class="form-item">
          <text class="label">备注</text>
          <input class="input-value" placeholder="请添加备注" v-model="permPlan.remark" />
        </view>

        <!-- 烫发项目标题行 -->
        <view class="form-item header-item">
          <text class="label">烫发项目</text>
          <view class="add-btn" @tap="addPermItem">
            <image class="add-icon" src="/static/icons/add-line@3x.png" mode="aspectFit"></image>
          </view>
        </view>
        <!-- 烫发项目组 -->
        <view class="perm-item-group" v-for="(item, index) in permPlan.items" :key="item.id">
          <view class="form-item group-header">
            <input class="group-name-input" v-model="item.name" placeholder="输入项目名称" />
            <view class="close-btn" @tap="removePermItem(index)">
              <image src="/static/icons/close-circle-line@3x.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="form-item clickable" @tap="openPermTypePicker(index)">
            <text class="label">类型</text>
            <view class="picker-value">
              <text :class="{ placeholder: !item.type }">{{ item.type || '请选择类型' }}</text>
              <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="form-item">
            <text class="label">杠具信息</text>
            <input class="input-value" placeholder="请输入" v-model="item.rodInfo" />
          </view>
          <view class="form-item">
            <text class="label">软化处理</text>
            <input class="input-value" placeholder="请输入软化时间" v-model="item.softenProcess" />
          </view>
          <view class="form-item">
            <text class="label">备注</text>
            <input class="input-value" placeholder="请添加备注" v-model="item.remark" />
          </view>
        </view>

        <!-- 烫发时间标题行 -->
        <view class="form-item header-item">
          <text class="label">烫发时间</text>
          <view class="add-btn" @tap="addTimeItem">
            <image class="add-icon" src="/static/icons/add-line@3x.png" mode="aspectFit"></image>
          </view>
        </view>
        <!-- 烫发时间组 -->
        <view class="perm-item-group" v-for="(item, index) in permPlan.timeItems" :key="item.id">
          <view class="form-item group-header">
            <input class="group-name-input" v-model="item.name" placeholder="输入时间名称" />
            <view class="close-btn" @tap="removeTimeItem(index)">
              <image src="/static/icons/close-circle-line@3x.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="form-item">
            <text class="label">加热时间</text>
            <input class="input-value" placeholder="请输入加热时间" v-model="item.heatTime" />
          </view>
          <view class="form-item">
            <text class="label">停留时间</text>
            <input class="input-value" placeholder="请输入停留时间" v-model="item.stayTime" />
          </view>
          <view class="form-item">
            <text class="label">加热温度</text>
            <input class="input-value" placeholder="请输入加热温度" v-model="item.heatTemp" />
          </view>
          <view class="form-item">
            <text class="label">定型时间</text>
            <input class="input-value" placeholder="请输入定型时间" v-model="item.setTime" />
          </view>
          <view class="form-item">
            <text class="label">备注</text>
            <input class="input-value" placeholder="请添加备注" v-model="item.remark" />
          </view>
        </view>

        <!-- 烫后照片 -->
        <view class="photo-section">
          <text class="photo-label">烫后照片</text>
          <view class="photo-grid">
            <view class="photo-grid-item">
              <view class="photo-box" v-if="permPlan.afterPhotos.left" @tap="previewSingleImage(permPlan.afterPhotos.left)">
                <image :src="permPlan.afterPhotos.left" mode="aspectFill"></image>
                <view class="delete-photo" @tap.stop="removePositionPhoto('after', 'left')">×</view>
              </view>
              <view class="add-photo-box" v-else @tap="addPositionPhoto('after', 'left')">
                <image class="add-icon" src="/static/icons/add-line@3x.png"></image>
                <text>添加</text>
              </view>
              <text class="photo-position-label">左侧</text>
            </view>
            <view class="photo-grid-item">
              <view class="photo-box" v-if="permPlan.afterPhotos.right" @tap="previewSingleImage(permPlan.afterPhotos.right)">
                <image :src="permPlan.afterPhotos.right" mode="aspectFill"></image>
                <view class="delete-photo" @tap.stop="removePositionPhoto('after', 'right')">×</view>
              </view>
              <view class="add-photo-box" v-else @tap="addPositionPhoto('after', 'right')">
                <image class="add-icon" src="/static/icons/add-line@3x.png"></image>
                <text>添加</text>
              </view>
              <text class="photo-position-label">右侧</text>
            </view>
            <view class="photo-grid-item">
              <view class="photo-box" v-if="permPlan.afterPhotos.back" @tap="previewSingleImage(permPlan.afterPhotos.back)">
                <image :src="permPlan.afterPhotos.back" mode="aspectFill"></image>
                <view class="delete-photo" @tap.stop="removePositionPhoto('after', 'back')">×</view>
              </view>
              <view class="add-photo-box" v-else @tap="addPositionPhoto('after', 'back')">
                <image class="add-icon" src="/static/icons/add-line@3x.png"></image>
                <text>添加</text>
              </view>
              <text class="photo-position-label">后侧</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="bottom-btn-wrapper">
      <view class="save-btn" @tap="onSave">
        <text>保存方案</text>
      </view>
    </view>

    <!-- 发质选择弹窗 -->
    <view class="hair-picker-mask" v-if="showHairPicker" @tap="closeHairPicker"></view>
    <view class="hair-picker-modal" :class="{ show: showHairPicker }">
      <view class="hair-picker-title">{{ hairPickerTitle }}</view>

      <!-- 已选 -->
      <view class="hair-picker-section">
        <text class="hair-picker-section-title">已选</text>
        <view class="hair-picker-tags">
          <view
            class="hair-tag selected"
            v-for="item in tempSelectedItems"
            :key="item"
          >
            <text>{{ item }}</text>
            <view class="tag-close" @tap="removeSelectedItem(item)">
              <image src="/pages/customer/static/add-circle@3x.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="hair-tag empty" v-if="tempSelectedItems.length === 0">
            <text>请选择</text>
          </view>
        </view>
      </view>

      <!-- 描述 -->
      <view class="hair-picker-section">
        <text class="hair-picker-section-title">描述</text>
        <view class="hair-picker-tags">
          <view
            class="hair-tag"
            :class="{ active: tempSelectedItems.includes(item) }"
            v-for="item in currentHairOptions"
            :key="item"
            @tap="toggleHairItem(item)"
          >
            <text>{{ item }}</text>
          </view>
          <view
            class="hair-tag custom"
            v-for="item in tempCustomItems"
            :key="item"
          >
            <text>{{ item }}</text>
            <view class="tag-close" @tap="removeCustomItem(item)">
              <image src="/pages/customer/static/add-circle@3x.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="hair-tag add-custom" @tap="showCustomInput">
            <text>+ 自定义</text>
          </view>
        </view>
      </view>

      <!-- 自定义输入 -->
      <view class="custom-input-section" v-if="showCustomInputField">
        <input
          class="custom-input"
          placeholder="请输入自定义内容"
          v-model="customInputValue"
          @confirm="addCustomItem"
        />
        <view class="custom-input-btns">
          <view class="custom-cancel-btn" @tap="cancelCustomInput">取消</view>
          <view class="custom-confirm-btn" @tap="addCustomItem">确定</view>
        </view>
      </view>

      <!-- 保存按钮 -->
      <view class="hair-picker-save-btn" @tap="saveHairSelection">
        <text>保存</text>
      </view>
    </view>

    <!-- 头皮选择弹窗 -->
    <view class="scalp-picker-mask" v-if="showScalpPicker" @tap="closeScalpPicker"></view>
    <view class="scalp-picker-modal" :class="{ show: showScalpPicker }">
      <view class="scalp-picker-title">{{ scalpPickerTitle }}</view>

      <!-- 已选 -->
      <view class="scalp-picker-section">
        <text class="scalp-picker-section-title">已选</text>
        <view class="scalp-picker-tags">
          <view
            class="scalp-tag selected"
            v-for="item in tempScalpSelectedTags"
            :key="item"
          >
            <text>{{ item }}</text>
            <view class="scalp-tag-close" @tap="removeScalpTag(item)">
              <image src="/pages/customer/static/add-circle@3x.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="scalp-tag empty" v-if="tempScalpSelectedTags.length === 0">
            <text>请选择</text>
          </view>
        </view>
      </view>

      <!-- 描述 -->
      <view class="scalp-picker-section">
        <text class="scalp-picker-section-title">描述</text>
        <view class="scalp-picker-tags">
          <view
            class="scalp-tag"
            :class="{ active: tempScalpSelectedTags.includes(item) }"
            v-for="item in currentScalpOptions"
            :key="item"
            @tap="toggleScalpTag(item)"
          >
            <text>{{ item }}</text>
          </view>
          <!-- 自定义按钮 -->
          <view class="scalp-tag add-custom" @tap="showScalpCustomInput = true">
            <text>+ 自定义</text>
          </view>
        </view>
      </view>

      <!-- 自定义输入 -->
      <view class="custom-input-section" v-if="showScalpCustomInput">
        <input
          class="custom-input"
          placeholder="请输入自定义内容"
          v-model="scalpCustomValue"
          @confirm="addScalpCustomTag"
        />
        <view class="custom-input-btns">
          <view class="custom-cancel-btn" @tap="cancelScalpCustomInput">取消</view>
          <view class="custom-confirm-btn" @tap="addScalpCustomTag">确定</view>
        </view>
      </view>

      <!-- 保存按钮 -->
      <view class="scalp-picker-save-btn" @tap="saveScalpSelection">
        <text>保存</text>
      </view>
    </view>

    <!-- 品牌选择弹窗 -->
    <view class="brand-picker-mask" v-if="showBrandPicker" @tap="closeBrandPicker"></view>
    <view class="brand-picker-modal" :class="{ show: showBrandPicker }">
      <view class="brand-picker-title">选择品牌</view>
      <view class="brand-picker-section">
        <view class="brand-picker-tags">
          <view
            class="brand-tag"
            :class="{ active: tempSelectedBrand === item }"
            v-for="item in brandOptions"
            :key="item"
            @tap="selectBrand(item)"
          >
            <text>{{ item }}</text>
          </view>
        </view>
      </view>
      <view class="brand-picker-save-btn" @tap="saveBrandSelection">
        <text>保存</text>
      </view>
    </view>

    <!-- 烫发类型选择弹窗 -->
    <view class="type-picker-mask" v-if="showTypePicker" @tap="closeTypePicker"></view>
    <view class="type-picker-modal" :class="{ show: showTypePicker }">
      <view class="type-picker-title">选择类型</view>
      <view class="type-picker-section">
        <view class="type-picker-tags">
          <view
            class="type-tag"
            :class="{ active: tempSelectedType === item }"
            v-for="item in permTypeOptions"
            :key="item"
            @tap="selectPermType(item)"
          >
            <text>{{ item }}</text>
          </view>
          <!-- 自定义类型标签 -->
          <view
            class="type-tag custom-type"
            :class="{ active: tempSelectedType === item }"
            v-for="item in customPermTypes"
            :key="item"
            @tap="selectPermType(item)"
          >
            <text>{{ item }}</text>
            <view class="type-tag-close" @tap.stop="removeCustomType(item)">
              <image src="/pages/customer/static/add-circle@3x.png" mode="aspectFit"></image>
            </view>
          </view>
          <!-- 自定义按钮 -->
          <view class="type-tag add-custom-type" @tap="showTypeCustomInput">
            <text>+ 自定义</text>
          </view>
        </view>
      </view>
      <!-- 自定义输入区域 -->
      <view class="type-custom-input-section" v-if="showTypeCustomInputField">
        <input
          class="type-custom-input"
          placeholder="请输入自定义类型"
          v-model="typeCustomInputValue"
          @confirm="addCustomType"
        />
        <view class="type-custom-input-btns">
          <view class="type-custom-cancel-btn" @tap="cancelTypeCustomInput">取消</view>
          <view class="type-custom-confirm-btn" @tap="addCustomType">确定</view>
        </view>
      </view>
      <view class="type-picker-save-btn" @tap="saveTypeSelection">
        <text>保存</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 页面参数
const planId = ref(null)
const customerId = ref(null)

// 头皮信息
const scalpInfo = reactive({
  type: '',
  health: ''
})

// 头皮选项配置
const scalpTypeOptions = ['油性', '中性', '干性', '敏感性', '病菌性', '头屑性']
const scalpHealthOptions = ['健康', '红敏', '脱发']

// 头皮选择弹窗状态
const showScalpPicker = ref(false)
const scalpPickerTitle = ref('')
const currentScalpField = ref('')
const currentScalpOptions = ref([])
const tempScalpSelectedTags = ref([])
const tempScalpCustomItems = ref([])
const showScalpCustomInput = ref(false)
const scalpCustomValue = ref('')

// 头皮自定义项
const scalpCustomItems = reactive({
  type: [],
  health: []
})

// 头皮标签配置
const scalpOptionsConfig = {
  type: { title: '选择皮性', options: scalpTypeOptions },
  health: { title: '选择皮况', options: scalpHealthOptions }
}

// 打开头皮选择弹窗
const openScalpPicker = (field) => {
  currentScalpField.value = field
  const config = scalpOptionsConfig[field]
  scalpPickerTitle.value = config.title
  currentScalpOptions.value = config.options
  const savedValue = scalpInfo[field] || ''
  tempScalpSelectedTags.value = savedValue ? savedValue.split('、') : []
  tempScalpCustomItems.value = [...(scalpCustomItems[field] || [])]
  showScalpCustomInput.value = false
  scalpCustomValue.value = ''
  showScalpPicker.value = true
}

// 关闭头皮选择弹窗
const closeScalpPicker = () => {
  showScalpPicker.value = false
}

// 切换头皮标签选中状态（单选模式）
const toggleScalpTag = (item) => {
  if (tempScalpSelectedTags.value.includes(item)) {
    tempScalpSelectedTags.value = []
  } else {
    tempScalpSelectedTags.value = [item]
  }
}

// 移除头皮已选标签
const removeScalpTag = (item) => {
  const index = tempScalpSelectedTags.value.indexOf(item)
  if (index > -1) {
    tempScalpSelectedTags.value.splice(index, 1)
  }
}

// 保存头皮标签选择
const saveScalpSelection = () => {
  const field = currentScalpField.value
  scalpInfo[field] = tempScalpSelectedTags.value.join('、')
  scalpCustomItems[field] = [...tempScalpCustomItems.value]
  showScalpPicker.value = false
}

// 取消头皮自定义输入
const cancelScalpCustomInput = () => {
  showScalpCustomInput.value = false
  scalpCustomValue.value = ''
}

// 添加头皮自定义项
const addScalpCustomTag = () => {
  const value = scalpCustomValue.value.trim()
  if (value && !tempScalpCustomItems.value.includes(value) && !currentScalpOptions.value.includes(value)) {
    tempScalpCustomItems.value.push(value)
    tempScalpSelectedTags.value = [value]
  }
  showScalpCustomInput.value = false
  scalpCustomValue.value = ''
}

// 发质信息 - 支持多选
const hairInfo = reactive({
  amount: [],
  length: [],
  condition: [],
  texture: [],
  shape: [],
  damage: [],
  color: [],
  whiteHair: []
})

// 发质自定义项
const hairCustomItems = reactive({
  amount: [],
  length: [],
  condition: [],
  texture: [],
  shape: [],
  damage: [],
  color: [],
  whiteHair: []
})

// 发质选项配置
const hairOptionsConfig = {
  amount: { title: '选择发量', options: ['少量', '适中', '多量'] },
  length: { title: '选择发长', options: ['短发', '中发', '长发'] },
  condition: { title: '选择发况', options: ['沙发', '正常', '自然卷'] },
  texture: { title: '选择发质', options: ['细发', '中发', '粗发'] },
  shape: { title: '选择发状', options: ['椭圆', '扁圆', '卷曲'] },
  damage: { title: '选择受损', options: ['健康', '轻度', '中度', '重度'] },
  color: { title: '选择发色', options: ['黑色', '褐色', '深棕', '浅棕'] },
  whiteHair: { title: '选择白发比例', options: ['≥10%', '30%', '50%', '70%', '90%以上'] }
}

// 发质选择弹窗状态
const showHairPicker = ref(false)
const hairPickerTitle = ref('')
const currentHairField = ref('')
const currentHairOptions = ref([])
const tempSelectedItems = ref([])
const tempCustomItems = ref([])
const showCustomInputField = ref(false)
const customInputValue = ref('')

// 获取显示文本
const getHairDisplayText = (field) => {
  const items = hairInfo[field]
  if (items && items.length > 0) {
    return items.join('、')
  }
  return ''
}

// 打开发质选择弹窗
const openHairPicker = (field) => {
  currentHairField.value = field
  const config = hairOptionsConfig[field]
  hairPickerTitle.value = config.title
  currentHairOptions.value = config.options
  tempSelectedItems.value = [...(hairInfo[field] || [])]
  tempCustomItems.value = [...(hairCustomItems[field] || [])]
  showCustomInputField.value = false
  customInputValue.value = ''
  showHairPicker.value = true
}

// 关闭发质选择弹窗
const closeHairPicker = () => {
  showHairPicker.value = false
}

// 切换选中项（单选模式）
const toggleHairItem = (item) => {
  if (tempSelectedItems.value.includes(item)) {
    tempSelectedItems.value = []
  } else {
    tempSelectedItems.value = [item]
  }
}

// 移除已选项
const removeSelectedItem = (item) => {
  const index = tempSelectedItems.value.indexOf(item)
  if (index > -1) {
    tempSelectedItems.value.splice(index, 1)
  }
}

// 显示自定义输入
const showCustomInput = () => {
  showCustomInputField.value = true
  customInputValue.value = ''
}

// 取消自定义输入
const cancelCustomInput = () => {
  showCustomInputField.value = false
  customInputValue.value = ''
}

// 添加自定义项
const addCustomItem = () => {
  const value = customInputValue.value.trim()
  if (value && !tempCustomItems.value.includes(value) && !tempSelectedItems.value.includes(value)) {
    tempCustomItems.value.push(value)
    tempSelectedItems.value.push(value)
  }
  showCustomInputField.value = false
  customInputValue.value = ''
}

// 移除自定义项
const removeCustomItem = (item) => {
  const customIndex = tempCustomItems.value.indexOf(item)
  if (customIndex > -1) {
    tempCustomItems.value.splice(customIndex, 1)
  }
  const selectedIndex = tempSelectedItems.value.indexOf(item)
  if (selectedIndex > -1) {
    tempSelectedItems.value.splice(selectedIndex, 1)
  }
}

// 保存发质选择
const saveHairSelection = () => {
  const field = currentHairField.value
  hairInfo[field] = [...tempSelectedItems.value]
  hairCustomItems[field] = [...tempCustomItems.value]
  showHairPicker.value = false
}

// 烫发方案
const permPlan = reactive({
  beforePhotos: {
    left: '',
    right: '',
    back: ''
  },
  brand: '',
  remark: '',
  items: [
    {
      id: 1,
      name: '项目1',
      type: '',
      rodInfo: '',
      softenProcess: '',
      remark: ''
    }
  ],
  timeItems: [
    {
      id: 1,
      name: '时间1',
      heatTime: '',
      stayTime: '',
      heatTemp: '',
      setTime: '',
      remark: ''
    }
  ],
  afterPhotos: {
    left: '',
    right: '',
    back: ''
  }
})
const brandOptions = ['资生堂', '欧莱雅', '施华蔻', '威娜', '卡诗', '其他']
const permTypeOptions = ['冷烫', '热烫', '数码烫', '陶瓷烫', '离子烫', '纹理烫']

// 自定义烫发类型
const customPermTypes = ref([])

// 页面加载
onLoad((options) => {
  if (options.id) {
    planId.value = options.id
    loadPlanData(options.id)
  }
  if (options.customerId) {
    customerId.value = options.customerId
  }
})

// 加载方案数据
const loadPlanData = (id) => {
  // 模拟数据
  scalpInfo.type = '油性'
  scalpInfo.health = '健康'
  hairInfo.amount = ['适中']
  hairInfo.length = ['短发']
  hairInfo.condition = ['正常']
  hairInfo.texture = ['中发']
  hairInfo.shape = ['椭圆']
  hairInfo.damage = ['健康']
  hairInfo.color = ['黑色']
  hairInfo.whiteHair = ['≥10%']
  // 品牌不预填，显示"请选择品牌"
  permPlan.items[0].type = '数码烫'
}

// 品牌选择弹窗状态
const showBrandPicker = ref(false)
const tempSelectedBrand = ref('')

// 打开品牌选择弹窗
const openBrandPicker = () => {
  tempSelectedBrand.value = permPlan.brand || ''
  showBrandPicker.value = true
}

// 关闭品牌选择弹窗
const closeBrandPicker = () => {
  showBrandPicker.value = false
}

// 选择品牌
const selectBrand = (item) => {
  tempSelectedBrand.value = item
}

// 保存品牌选择
const saveBrandSelection = () => {
  permPlan.brand = tempSelectedBrand.value
  showBrandPicker.value = false
}

// 烫发类型选择弹窗状态
const showTypePicker = ref(false)
const tempSelectedType = ref('')
const currentTypeItemIndex = ref(-1)
const showTypeCustomInputField = ref(false)
const typeCustomInputValue = ref('')

// 打开烫发类型选择弹窗
const openPermTypePicker = (index) => {
  currentTypeItemIndex.value = index
  tempSelectedType.value = permPlan.items[index].type || ''
  showTypeCustomInputField.value = false
  typeCustomInputValue.value = ''
  showTypePicker.value = true
}

// 关闭烫发类型选择弹窗
const closeTypePicker = () => {
  showTypePicker.value = false
  showTypeCustomInputField.value = false
}

// 选择烫发类型
const selectPermType = (item) => {
  tempSelectedType.value = item
}

// 显示自定义类型输入
const showTypeCustomInput = () => {
  showTypeCustomInputField.value = true
  typeCustomInputValue.value = ''
}

// 取消自定义类型输入
const cancelTypeCustomInput = () => {
  showTypeCustomInputField.value = false
  typeCustomInputValue.value = ''
}

// 添加自定义类型
const addCustomType = () => {
  const value = typeCustomInputValue.value.trim()
  if (value && !customPermTypes.value.includes(value) && !permTypeOptions.includes(value)) {
    customPermTypes.value.push(value)
    tempSelectedType.value = value
  }
  showTypeCustomInputField.value = false
  typeCustomInputValue.value = ''
}

// 删除自定义类型
const removeCustomType = (item) => {
  const index = customPermTypes.value.indexOf(item)
  if (index > -1) {
    customPermTypes.value.splice(index, 1)
  }
  // 如果当前选中的是被删除的类型，清空选择
  if (tempSelectedType.value === item) {
    tempSelectedType.value = ''
  }
}

// 保存烫发类型选择
const saveTypeSelection = () => {
  if (currentTypeItemIndex.value >= 0) {
    permPlan.items[currentTypeItemIndex.value].type = tempSelectedType.value
  }
  showTypePicker.value = false
  showTypeCustomInputField.value = false
}

// 添加位置照片
const addPositionPhoto = (section, position) => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      if (section === 'before') {
        permPlan.beforePhotos[position] = res.tempFilePaths[0]
      } else {
        permPlan.afterPhotos[position] = res.tempFilePaths[0]
      }
    }
  })
}

// 删除位置照片
const removePositionPhoto = (section, position) => {
  if (section === 'before') {
    permPlan.beforePhotos[position] = ''
  } else {
    permPlan.afterPhotos[position] = ''
  }
}

// 预览单张图片
const previewSingleImage = (url) => {
  uni.previewImage({
    urls: [url],
    current: 0
  })
}

// 添加烫发项目
const addPermItem = () => {
  const newId = permPlan.items.length + 1
  permPlan.items.push({
    id: Date.now(),
    name: `项目${newId}`,
    type: '',
    rodInfo: '',
    softenProcess: '',
    remark: ''
  })
}

// 删除烫发项目
const removePermItem = (index) => {
  if (permPlan.items.length > 1) {
    permPlan.items.splice(index, 1)
  } else {
    uni.showToast({ title: '至少保留一个项目', icon: 'none' })
  }
}

// 添加烫发时间
const addTimeItem = () => {
  const newId = permPlan.timeItems.length + 1
  permPlan.timeItems.push({
    id: Date.now(),
    name: `时间${newId}`,
    heatTime: '',
    stayTime: '',
    heatTemp: '',
    setTime: '',
    remark: ''
  })
}

// 删除烫发时间
const removeTimeItem = (index) => {
  if (permPlan.timeItems.length > 1) {
    permPlan.timeItems.splice(index, 1)
  } else {
    uni.showToast({ title: '至少保留一个时间', icon: 'none' })
  }
}

// 保存方案
const onSave = () => {
  if (!permPlan.brand) {
    uni.showToast({ title: '请选择品牌', icon: 'none' })
    return
  }

  uni.showLoading({ title: '保存中...' })

  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1000)
}
</script>

<style lang="scss" scoped>
.container {
  padding: 24rpx;
  min-height: 100vh;
  background-color: #EDF0F4;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
}

// 区块标题
.section-title {
  padding-right: 560rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  margin-top: 0rpx;

  &:first-child {
    margin-top: 0;
  }
}

// 区块样式
.section {
  margin: 24rpx;
  width: 100%;
  background-color: #fff;
  border-radius: 12rpx;
}

// 表单列表
.form-list {
  padding: 0 32rpx;
}

.form-item {
  display: flex;
  align-items: center;
  min-height: 112rpx;
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
  color: #98A2B3;
}

.picker-value {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  text {
    font-size: 28rpx;
    color: #101828;
    font-weight: 500;

    &.placeholder {
      color: #C8C9CC;
    }

    &.health-tag {
      font-weight: 300;
      color: #5280FF;
      background-color: #DBE8FF;
      padding: 4rpx 14rpx;
      border-radius: 8rpx;
    }
  }
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: auto;
  flex-shrink: 0;
}

// 发质信息两列布局
.hair-grid {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.hair-grid-row {
  display: flex;
  gap: 24rpx;
}

.hair-grid-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.hair-label {
  font-size: 28rpx;
  color: #333;
  font-weight: 400;
}

.hair-picker-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12rpx 18rpx;
  background-color: #FFFFFF;
  border: 2rpx solid #EAECF0;
  border-radius: 8rpx;

  text {
    font-size: 28rpx;
    color: #333;

    &.placeholder {
      color: #C8C9CC;
    }
  }

  &:active {
    background-color: #F5F7FA;
  }
}

.hair-arrow {
  width: 28rpx;
  height: 28rpx;
  flex-shrink: 0;
  transform: rotate(90deg);
}

// 照片区域
.photo-section {
  padding: 24rpx 0;
}

.photo-label {
  font-size: 28rpx;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.photo-grid {
  display: flex;
  gap: 24rpx;
}

.photo-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-box {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  overflow: hidden;
  position: relative;

  image {
    width: 100%;
    height: 100%;
  }
}

.add-photo-box {
  width: 152rpx;
  height: 152rpx;
  border: 2rpx dashed #DCDFE6;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #EAECF0;

  .add-icon {
    width: 48rpx;
    height: 48rpx;
    margin-bottom: 8rpx;
  }

  text {
    font-size: 24rpx;
    color: #999;
  }

  &:active {
    background-color: #f0f0f0;
  }
}

.photo-position-label {
  font-size: 24rpx;
  color: #999;
  margin-top: 12rpx;
}

.delete-photo {
  position: absolute;
  top: 4rpx;
  right: 4rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 28rpx;
}

// 标题行样式
.header-item {
  .label {
    font-weight: 500;
  }
}

.add-btn {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  .add-icon {
    width: 40rpx;
    height: 40rpx;
  }

  &:active {
    opacity: 0.7;
  }
}

// 烫发项目组
.perm-item-group {
  background-color: #F8FAFC;
  border-radius: 12rpx;
  padding: 0 32rpx;
  margin-bottom: 12rpx;

  .form-item {
    border-bottom: none;
    min-height: 96rpx;
  }
}

.group-header {
  border-bottom: 1rpx solid #EAECF0 !important;
}

.group-name-input {
  flex: 1;
  font-size: 28rpx;
  font-weight: 500;
  color: #5280FF;
}

.close-btn {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  image {
    width: 32rpx;
    height: 32rpx;
  }

  &:active {
    opacity: 0.7;
  }
}

// 保存按钮
.bottom-btn-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.save-btn {
  height: 96rpx;
  background-color: #4A90E2;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    color: #fff;
  }

  &:active {
    opacity: 0.8;
  }
}

// 发质选择弹窗
.hair-picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.hair-picker-modal {
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

.hair-picker-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.hair-picker-section {
  margin-bottom: 40rpx;
  padding: 0 8rpx;
}

.hair-picker-section-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 24rpx;
  display: block;
}

.hair-picker-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.hair-tag {
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

  &.custom {
    background-color: #F5F7FA;
    border-color: transparent;

    text {
      color: #333;
    }
  }

  &.add-custom {
    background-color: #fff;
    border: 2rpx solid #EAECF0;

    text {
      color: #666;
    }

    &:active {
      background-color: #F5F7FA;
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

// 自定义输入区域
.custom-input-section {
  margin-bottom: 32rpx;
  padding: 24rpx;
  background-color: #F5F7FA;
  border-radius: 12rpx;
}

.custom-input {
  width: 100%;
  height: 72rpx;
  background-color: #fff;
  border: 2rpx solid #EAECF0;
  border-radius: 8rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  box-sizing: border-box;
}

.custom-input-btns {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
}

.custom-cancel-btn {
  padding: 12rpx 32rpx;
  font-size: 26rpx;
  color: #666;
  background-color: #fff;
  border: 2rpx solid #EAECF0;
  border-radius: 8rpx;
}

.custom-confirm-btn {
  padding: 12rpx 32rpx;
  font-size: 26rpx;
  color: #fff;
  background-color: #5280FF;
  border-radius: 8rpx;
}

// 保存按钮
.hair-picker-save-btn {
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

// 头皮选择弹窗
.scalp-picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.scalp-picker-modal {
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

.scalp-picker-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.scalp-picker-section {
  margin-bottom: 40rpx;
  padding: 0 8rpx;
}

.scalp-picker-section-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 24rpx;
  display: block;
}

.scalp-picker-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.scalp-tag {
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

  &.add-custom {
    background-color: #fff;
    border: 2rpx solid #EAECF0;

    text {
      color: #666;
    }

    &:active {
      background-color: #F5F7FA;
    }
  }
}

.scalp-tag-close {
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

.scalp-picker-save-btn {
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

// 品牌选择弹窗
.brand-picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.brand-picker-modal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  z-index: 999;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
  padding: 40rpx 32rpx;
  padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;

  &.show {
    transform: translateY(0);
  }
}

.brand-picker-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.brand-picker-section {
  margin-bottom: 40rpx;
  padding: 0 8rpx;
}

.brand-picker-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.brand-tag {
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
}

.brand-picker-save-btn {
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

// 烫发类型选择弹窗
.type-picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.type-picker-modal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  z-index: 999;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
  padding: 40rpx 32rpx;
  padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;

  &.show {
    transform: translateY(0);
  }
}

.type-picker-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.type-picker-section {
  margin-bottom: 40rpx;
  padding: 0 8rpx;
}

.type-picker-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.type-tag {
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

  &.custom-type {
    justify-content: space-between;
    padding: 0 16rpx;

    &.active {
      background-color: #EBF2FF;
      border-color: #5280FF;
    }
  }

  &.add-custom-type {
    background-color: #fff;
    border: 2rpx solid #EAECF0;

    text {
      color: #666;
    }

    &:active {
      background-color: #F5F7FA;
    }
  }
}

.type-tag-close {
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

// 类型自定义输入区域
.type-custom-input-section {
  margin-bottom: 32rpx;
  padding: 24rpx;
  background-color: #F5F7FA;
  border-radius: 12rpx;
}

.type-custom-input {
  width: 100%;
  height: 72rpx;
  background-color: #fff;
  border: 2rpx solid #EAECF0;
  border-radius: 8rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  box-sizing: border-box;
}

.type-custom-input-btns {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
}

.type-custom-cancel-btn {
  padding: 12rpx 32rpx;
  font-size: 26rpx;
  color: #666;
  background-color: #fff;
  border: 2rpx solid #EAECF0;
  border-radius: 8rpx;
}

.type-custom-confirm-btn {
  padding: 12rpx 32rpx;
  font-size: 26rpx;
  color: #fff;
  background-color: #5280FF;
  border-radius: 8rpx;
}

.type-picker-save-btn {
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
