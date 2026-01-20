<template>
  <view class="container">
    <!-- 步骤导航 -->
    <view class="step-nav">
      <view class="step-item" :class="{ active: currentStep === 0 }">
        <view class="step-dot" :class="{ active: currentStep >= 0 }"></view>
        <text class="step-text">品牌介绍</text>
      </view>
      <view class="step-line" :class="{ active: currentStep >= 1 }"></view>
      <view class="step-item" :class="{ active: currentStep === 1 }">
        <view class="step-dot" :class="{ active: currentStep >= 1 }"></view>
        <text class="step-text">服务特色</text>
      </view>
      <view class="step-line" :class="{ active: currentStep >= 2 }"></view>
      <view class="step-item" :class="{ active: currentStep === 2 }">
        <view class="step-dot" :class="{ active: currentStep >= 2 }"></view>
        <text class="step-text">环境设施</text>
      </view>
    </view>

    <!-- 步骤1: 品牌介绍 -->
    <view class="form-card" v-if="currentStep === 0">
      <!-- 品牌图片 -->
      <view class="form-item" @tap="uploadBrandImage">
        <text class="item-label">品牌图片</text>
        <view class="item-content">
          <text class="item-placeholder" v-if="!formData.brandImage">请上传能体现品牌的图片</text>
          <text class="item-value" v-else>已上传</text>
        </view>
        <image
          class="brand-preview"
          :src="formData.brandImage || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop'"
          mode="aspectFill"
        ></image>
      </view>

      <!-- 营业时间 -->
      <view class="form-item" @tap="selectBusinessHours">
        <text class="item-label">营业时间</text>
        <view class="item-content">
          <text class="item-placeholder" v-if="!formData.businessHours">选择营业时间</text>
          <text class="item-value" v-else>{{ formData.businessHours }}</text>
        </view>
        <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
      </view>
      
      <!-- 休息时间 -->
      <view class="form-item" @tap="selectRestTime">
        <text class="item-label">休息时间</text>
        <view class="item-content">
          <text class="item-placeholder" v-if="!formData.restTime">选择休息时间（可多选）</text>
          <text class="item-value" v-else>{{ formData.restTime }}</text>
        </view>
        <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
      </view>

      <!-- 经营地址 -->
      <view class="form-item" @tap="inputAddress">
        <text class="item-label">经营地址</text>
        <view class="item-content">
          <text class="item-placeholder" v-if="!formData.address">输入门店经营地址</text>
          <text class="item-value" v-else>{{ formData.address }}</text>
        </view>
      </view>

      <!-- 门店成立 -->
      <view class="form-item" @tap="selectEstablishDate">
        <text class="item-label">门店成立</text>
        <view class="item-content">
          <text class="item-placeholder" v-if="!formData.establishDate">选择门店成立时间</text>
          <text class="item-value" v-else>{{ formData.establishDate }}</text>
        </view>
        <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
      </view>

      <!-- 经营面积 -->
      <view class="form-item" @tap="selectArea">
        <text class="item-label">经营面积</text>
        <view class="item-content">
          <text class="item-placeholder" v-if="!formData.area">选择店铺经营面积</text>
          <text class="item-value" v-else>{{ formData.area }}</text>
        </view>
        <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
      </view>

      <!-- 服务工位 -->
      <view class="form-item" @tap="selectWorkstations">
        <text class="item-label">服务工位</text>
        <view class="item-content">
          <text class="item-placeholder" v-if="!formData.workstations">选择门店工作位</text>
          <text class="item-value" v-else>{{ formData.workstations }}</text>
        </view>
        <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
      </view>

      <!-- 美发师数 -->
      <view class="form-item" @tap="selectStylistCount">
        <text class="item-label">美发师数</text>
        <view class="item-content">
          <text class="item-placeholder" v-if="!formData.stylistCount">选择在店设计师人数</text>
          <text class="item-value" v-else>{{ formData.stylistCount }}</text>
        </view>
        <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
      </view>

      <!-- 预约时间 -->
      <view class="form-item" @tap="selectBookingTime">
        <text class="item-label">预约时间</text>
        <view class="item-content">
          <text class="item-placeholder" v-if="!formData.bookingTime">选择服务预约提前时间</text>
          <text class="item-value" v-else>{{ formData.bookingTime }}</text>
        </view>
        <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
      </view>

      <!-- 擅长技能 -->
      <view class="form-item" @tap="selectSkills">
        <text class="item-label">擅长技能</text>
        <view class="item-content">
          <text class="item-placeholder" v-if="!formData.skills">选择输入你擅长的技能</text>
          <text class="item-value" v-else>{{ formData.skills }}</text>
        </view>
        <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
      </view>

      <!-- 店铺简介 -->
      <view class="form-item" @tap="inputIntro">
        <text class="item-label">店铺简介</text>
        <view class="item-content">
          <text class="item-placeholder" v-if="!formData.intro">输入店铺/个人介绍</text>
          <text class="item-value" v-else>{{ formData.intro }}</text>
        </view>
        <image class="arrow-icon" src="/static/icons/tubiao-.png" mode="aspectFit"></image>
      </view>
    </view>

    <!-- 步骤2: 服务特色 -->
    <view class="feature-content" v-if="currentStep === 1">
      <!-- 标题卡片 -->
      <view class="title-card">
        <view class="title-main">服务特色</view>
        <view class="title-desc">最多选择10个，前3个显示在个人/店铺的页面标签展示给顾客</view>
      </view>

      <!-- 已选标签 -->
      <view class="tag-section">
        <view class="section-title">已选</view>
        <view class="selected-tags">
          <view
            class="selected-tag"
            v-for="(tag, index) in selectedFeatures"
            :key="index"
          >
            <text class="tag-text">{{ tag }}</text>
            <image class="tag-close" src="/pages/shop/static/add-circle@3x.png" mode="aspectFit" @tap="removeFeature(tag)"></image>
          </view>
        </view>
      </view>

      <!-- 可选标签 -->
      <view class="tag-section">
        <view class="section-title">可选</view>
        <view class="option-tags">
          <view
            class="option-tag"
            :class="{ selected: selectedFeatures.includes(tag) }"
            v-for="(tag, index) in availableFeatures"
            :key="index"
            @tap="toggleFeature(tag)"
          >
            <text>{{ tag }}</text>
          </view>
          <view class="option-tag custom-tag" @tap="addCustomFeature">
            <text>+</text>
            <text>自定义</text>
          </view>
        </view>
      </view>

      <!-- 其他标签 -->
      <view class="tag-section">
        <view class="section-title">其他</view>
        <view class="option-tags">
          <view
            class="option-tag"
            :class="{ selected: selectedFeatures.includes(tag) }"
            v-for="(tag, index) in otherFeatures"
            :key="index"
            @tap="toggleFeature(tag)"
          >
            <text>{{ tag }}</text>
          </view>
          <view class="option-tag custom-tag" @tap="addCustomOtherFeature">
            <text>+</text>
            <text>自定义</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 步骤3: 环境设施 -->
    <view class="feature-content" v-if="currentStep === 2">
      <!-- 标题卡片 -->
      <view class="title-card">
        <view class="title-main">环境设施</view>
        <view class="title-desc">最多选择8个，被选中的环境设施将展示给顾客</view>
      </view>

      <!-- 已选标签 -->
      <view class="tag-section">
        <view class="section-title">已选</view>
        <view class="selected-tags">
          <view
            class="selected-tag"
            v-for="(tag, index) in selectedFacilities"
            :key="index"
          >
            <text class="tag-text">{{ tag }}</text>
            <image class="tag-close" src="/pages/shop/static/add-circle@3x.png" mode="aspectFit" @tap="removeFacility(tag)"></image>
          </view>
        </view>
      </view>

      <!-- 环境设施标签 -->
      <view class="tag-section">
        <view class="section-title">环境设施</view>
        <view class="option-tags">
          <view
            class="option-tag"
            :class="{ selected: selectedFacilities.includes(tag) }"
            v-for="(tag, index) in availableFacilities"
            :key="index"
            @tap="toggleFacility(tag)"
          >
            <text>{{ tag }}</text>
          </view>
          <view class="option-tag custom-tag" @tap="addCustomFacility">
            <text>+</text>
            <text>自定义</text>
          </view>
        </view>
      </view>

      <!-- 通用设施标签 -->
      <view class="tag-section">
        <view class="section-title">通用设施</view>
        <view class="option-tags">
          <view
            class="option-tag"
            :class="{ selected: selectedFacilities.includes(tag) }"
            v-for="(tag, index) in commonFacilities"
            :key="index"
            @tap="toggleFacility(tag)"
          >
            <text>{{ tag }}</text>
          </view>
          <view class="option-tag custom-tag" @tap="addCustomCommonFacility">
            <text>+</text>
            <text>自定义</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-button">
      <view class="btn-prev" v-if="currentStep > 0" @tap="goPrevStep">
        <text>上一步</text>
      </view>
      <view class="btn-next" :class="{ 'btn-full': currentStep === 0 }" @tap="goNextStep">
        <text>{{ currentStep === 2 ? '完成' : '下一步' }}</text>
      </view>
    </view>

    <!-- 营业时间选择弹窗 -->
    <view class="picker-modal" v-if="showBusinessHoursModal">
      <view class="picker-mask" @tap="closeBusinessHoursModal"></view>
      <view class="picker-content">
        <view class="picker-header">
          <text class="picker-cancel" @tap="closeBusinessHoursModal">取消</text>
          <text class="picker-title">营业时间设定</text>
          <text class="picker-confirm" @tap="confirmBusinessHours">确定</text>
        </view>
        <view class="time-picker-body">
          <!-- 开始时间 -->
          <view class="time-section">
            <text class="time-section-label">开始时间</text>
            <view class="time-picker-wrapper">
              <picker-view
                class="time-picker-view"
                :value="startTimeIndex"
                @change="onStartTimeChange"
                indicator-style="height: 80rpx;"
              >
                <picker-view-column>
                  <view class="picker-item" v-for="hour in hours" :key="hour">{{ hour }}</view>
                </picker-view-column>
                <picker-view-column>
                  <view class="picker-item">:</view>
                </picker-view-column>
                <picker-view-column>
                  <view class="picker-item" v-for="minute in minutes" :key="minute">{{ minute }}</view>
                </picker-view-column>
              </picker-view>
            </view>
          </view>
          <!-- 结束时间 -->
          <view class="time-section">
            <text class="time-section-label">结束时间</text>
            <view class="time-picker-wrapper">
              <picker-view
                class="time-picker-view"
                :value="endTimeIndex"
                @change="onEndTimeChange"
                indicator-style="height: 80rpx;"
              >
                <picker-view-column>
                  <view class="picker-item" v-for="hour in hours" :key="hour">{{ hour }}</view>
                </picker-view-column>
                <picker-view-column>
                  <view class="picker-item">:</view>
                </picker-view-column>
                <picker-view-column>
                  <view class="picker-item" v-for="minute in minutes" :key="minute">{{ minute }}</view>
                </picker-view-column>
              </picker-view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 休息时间选择弹窗 -->
    <view class="picker-modal" v-if="showRestTimeModal">
      <view class="picker-mask" @tap="closeRestTimeModal"></view>
      <view class="picker-content">
        <view class="picker-header">
          <text class="picker-cancel" @tap="closeRestTimeModal">取消</text>
          <text class="picker-title">休息时间设定</text>
          <text class="picker-confirm" @tap="confirmRestTime">确定</text>
        </view>
        <view class="select-picker-body">
          <view
            v-for="(day, index) in restTimeOptions"
            :key="index"
            class="select-option"
            :class="{ selected: tempRestDays.includes(day) }"
            @tap="toggleRestDay(day)"
          >
            <text>{{ day }}</text>
            <view class="check-icon" v-if="tempRestDays.includes(day)">✓</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 门店成立选择弹窗 -->
    <view class="picker-modal" v-if="showEstablishDateModal">
      <view class="picker-mask" @tap="closeEstablishDateModal"></view>
      <view class="picker-content">
        <view class="picker-header">
          <text class="picker-cancel" @tap="closeEstablishDateModal">取消</text>
          <text class="picker-title">门店成立时间</text>
          <text class="picker-confirm" @tap="confirmEstablishDate">确定</text>
        </view>
        <view class="single-picker-body">
          <picker-view
            class="single-picker-view"
            :value="establishDateIndex"
            @change="onEstablishDateChange"
            indicator-style="height: 80rpx;"
          >
            <picker-view-column>
              <view class="picker-item" v-for="year in establishYears" :key="year">{{ year }}</view>
            </picker-view-column>
            <picker-view-column>
              <view class="picker-item" v-for="month in establishMonths" :key="month">{{ month }}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </view>

    <!-- 经营面积选择弹窗 -->
    <view class="picker-modal" v-if="showAreaModal">
      <view class="picker-mask" @tap="closeAreaModal"></view>
      <view class="picker-content">
        <view class="picker-header">
          <text class="picker-cancel" @tap="closeAreaModal">取消</text>
          <text class="picker-title">经营面积</text>
          <text class="picker-confirm" @tap="confirmArea">确定</text>
        </view>
        <view class="single-picker-body">
          <picker-view
            class="single-picker-view"
            :value="areaIndex"
            @change="onAreaChange"
            indicator-style="height: 80rpx;"
          >
            <picker-view-column>
              <view class="picker-item" v-for="area in areaOptions" :key="area">{{ area }}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </view>

    <!-- 服务工位选择弹窗 -->
    <view class="picker-modal" v-if="showWorkstationsModal">
      <view class="picker-mask" @tap="closeWorkstationsModal"></view>
      <view class="picker-content">
        <view class="picker-header">
          <text class="picker-cancel" @tap="closeWorkstationsModal">取消</text>
          <text class="picker-title">服务工位</text>
          <text class="picker-confirm" @tap="confirmWorkstations">确定</text>
        </view>
        <view class="single-picker-body">
          <picker-view
            class="single-picker-view"
            :value="workstationsIndex"
            @change="onWorkstationsChange"
            indicator-style="height: 80rpx;"
          >
            <picker-view-column>
              <view class="picker-item" v-for="ws in workstationsOptions" :key="ws">{{ ws }}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </view>

    <!-- 美发师数选择弹窗 -->
    <view class="picker-modal" v-if="showStylistCountModal">
      <view class="picker-mask" @tap="closeStylistCountModal"></view>
      <view class="picker-content">
        <view class="picker-header">
          <text class="picker-cancel" @tap="closeStylistCountModal">取消</text>
          <text class="picker-title">美发师数</text>
          <text class="picker-confirm" @tap="confirmStylistCount">确定</text>
        </view>
        <view class="single-picker-body">
          <picker-view
            class="single-picker-view"
            :value="stylistCountIndex"
            @change="onStylistCountChange"
            indicator-style="height: 80rpx;"
          >
            <picker-view-column>
              <view class="picker-item" v-for="sc in stylistCountOptions" :key="sc">{{ sc }}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </view>

    <!-- 预约时间选择弹窗 -->
    <view class="picker-modal" v-if="showBookingTimeModal">
      <view class="picker-mask" @tap="closeBookingTimeModal"></view>
      <view class="picker-content">
        <view class="picker-header">
          <text class="picker-cancel" @tap="closeBookingTimeModal">取消</text>
          <text class="picker-title">预约时间</text>
          <text class="picker-confirm" @tap="confirmBookingTime">确定</text>
        </view>
        <view class="single-picker-body">
          <picker-view
            class="single-picker-view"
            :value="bookingTimeIndex"
            @change="onBookingTimeChange"
            indicator-style="height: 80rpx;"
          >
            <picker-view-column>
              <view class="picker-item" v-for="bt in bookingTimeOptions" :key="bt">{{ bt }}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </view>

    <!-- 擅长技能选择弹窗 -->
    <view class="skills-picker-mask" v-if="showSkillsModal" @tap="closeSkillsModal"></view>
    <view class="skills-picker-modal" :class="{ show: showSkillsModal }">
      <view class="skills-picker-title">擅长技能</view>

      <!-- 已选 -->
      <view class="skills-picker-section">
        <text class="skills-picker-section-title">已选</text>
        <view class="skills-picker-tags">
          <view
            class="skills-tag selected"
            v-for="item in tempSkills"
            :key="item"
          >
            <text>{{ item }}</text>
            <view class="skills-tag-close" @tap="removeSkillTag(item)">
              <image src="/pages/shop/static/add-circle@3x.png" mode="aspectFit"></image>
            </view>
          </view>
          <view class="skills-tag empty" v-if="tempSkills.length === 0">
            <text>请选择</text>
          </view>
        </view>
      </view>

      <!-- 可选技能 -->
      <view class="skills-picker-section">
        <text class="skills-picker-section-title">技能</text>
        <view class="skills-picker-tags">
          <view
            class="skills-tag"
            :class="{ active: tempSkills.includes(item) }"
            v-for="item in skillsOptions"
            :key="item"
            @tap="toggleSkill(item)"
          >
            <text>{{ item }}</text>
          </view>
          <!-- 自定义按钮 -->
          <view class="skills-tag custom-btn" @tap="showCustomSkillInput">
            <text>+自定义</text>
          </view>
        </view>
      </view>

      <!-- 保存按钮 -->
      <view class="skills-picker-save-btn" @tap="confirmSkills">
        <text>保存</text>
      </view>
    </view>

    <!-- 自定义技能输入弹窗 -->
    <view class="custom-skill-modal" v-if="showCustomSkillModal">
      <view class="custom-skill-mask" @tap="closeCustomSkillModal"></view>
      <view class="custom-skill-content">
        <view class="custom-skill-header">
          <text class="custom-skill-title">自定义技能</text>
        </view>
        <input
          class="custom-skill-input"
          v-model="customSkillValue"
          placeholder="请输入技能名称（不超过10个字）"
          maxlength="10"
        />
        <view class="custom-skill-btns">
          <view class="custom-skill-cancel" @tap="closeCustomSkillModal">取消</view>
          <view class="custom-skill-confirm" @tap="addCustomSkill">确定</view>
        </view>
      </view>
    </view>

    <!-- 自定义弹窗 -->
    <view class="custom-modal" v-if="showCustomModal" @tap="closeModal">
      <view class="modal-content" @tap.stop>
        <view class="modal-title">{{ modalTitle }}</view>
        <view class="modal-input-wrap">
          <input
            class="modal-input"
            type="text"
            v-model="customInputValue"
            :placeholder="modalPlaceholder"
            :maxlength="10"
            @input="onInputChange"
          />
          <view class="input-count">
            <text class="count-current">{{ customInputValue.length }}</text>
            <text class="count-total">/10</text>
          </view>
        </view>
        <view class="modal-buttons">
          <view class="modal-btn modal-btn-cancel" @tap="closeModal">
            <text>取消</text>
          </view>
          <view class="modal-btn modal-btn-confirm" @tap="confirmCustomInput">
            <text>确定</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 店铺简介弹窗 -->
    <view class="custom-modal" v-if="showIntroModal" @tap="closeIntroModal">
      <view class="modal-content intro-modal-content" @tap.stop>
        <view class="modal-title">店铺简介</view>
        <view class="intro-input-wrap">
          <textarea
            class="intro-textarea"
            v-model="tempIntro"
            placeholder="输入店铺/个人介绍"
            :maxlength="200"
          ></textarea>
          <view class="input-count">
            <text class="count-current">{{ tempIntro.length }}</text>
            <text class="count-total">/200</text>
          </view>
        </view>
        <view class="modal-buttons">
          <view class="modal-btn modal-btn-cancel" @tap="closeIntroModal">
            <text>取消</text>
          </view>
          <view class="modal-btn modal-btn-confirm" @tap="confirmIntro">
            <text>确定</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 当前步骤
const currentStep = ref(0)

// 表单数据
const formData = ref({
  brandImage: '',
  businessHours: '',
  restTime: '',
  address: '',
  establishDate: '',
  area: '',
  workstations: '',
  stylistCount: '',
  bookingTime: '',
  skills: '',
  intro: ''
})

// 服务特色数据
const selectedFeatures = ref(['头皮检测', '免费茶点', '免费修眉'])
const availableFeatures = ref([
  '全预约制', '头皮检测', '免费形象指导',
  '技术专业', '免费茶点', '免费停车',
  '免费修眉', '免费按摩', '免费检测',
  '一对一服务', '没有隐形消费', '无推销',
  '态度友好', '专车接送', '上门服务',
  '私密空间', '品牌洗护', '网红打卡',
  '外宾服务', '工具消毒', '摄影专区',
  '私密养生场'
])
const otherFeatures = ref(['不可携带宠物', '服务区不可以吸烟', '不接待外宾'])

// 环境设施数据
const selectedFacilities = ref([])
const availableFacilities = ref([
  '充电宝', '储物柜', 'VIP专区',
  '沙发座', '免费Wi-Fi', '可看电视',
  '摄影专区', '头皮专区'
])
const commonFacilities = ref([
  '吸烟区', '刷卡支付', '有停车位',
  '按摩座椅', '电梯', '空调',
  '水质净化', '空气净化'
])

// 营业时间选择数据
const showBusinessHoursModal = ref(false)
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const minutes = ['00', '30']
const startTimeIndex = ref([9, 0, 0])
const endTimeIndex = ref([22, 0, 0])

// 休息时间选择数据
const showRestTimeModal = ref(false)
const restTimeOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '无休息']
const tempRestDays = ref([])

// 门店成立选择数据
const showEstablishDateModal = ref(false)
const currentYear = new Date().getFullYear()
const establishYears = Array.from({ length: 31 }, (_, i) => `${currentYear - i}年`)
const establishMonths = Array.from({ length: 12 }, (_, i) => `${i + 1}月`)
const establishDateIndex = ref([0, 0])

// 经营面积选择数据
const showAreaModal = ref(false)
const areaOptions = ['50㎡以下', '50-100㎡', '100-200㎡', '200-500㎡', '500㎡以上']
const areaIndex = ref([0])

// 服务工位选择数据
const showWorkstationsModal = ref(false)
const workstationsOptions = Array.from({ length: 50 }, (_, i) => `${i + 1}个`)
const workstationsIndex = ref([0])

// 美发师数选择数据
const showStylistCountModal = ref(false)
const stylistCountOptions = Array.from({ length: 50 }, (_, i) => `${i + 1}人`)
const stylistCountIndex = ref([0])

// 预约时间选择数据
const showBookingTimeModal = ref(false)
const bookingTimeOptions = ['提前30分钟', '提前1小时', '提前2小时', '提前1天', '提前2天']
const bookingTimeIndex = ref([0])

// 擅长技能选择数据
const showSkillsModal = ref(false)
const skillsOptions = ref(['剪发', '烫发', '染发', '护理', '造型', '接发', '编发', '新娘妆'])
const tempSkills = ref([])
const showCustomSkillModal = ref(false)
const customSkillValue = ref('')

// 店铺简介弹窗数据
const showIntroModal = ref(false)
const tempIntro = ref('')

// 自定义弹窗数据
const showCustomModal = ref(false)
const modalTitle = ref('')
const modalPlaceholder = ref('')
const customInputValue = ref('')
const modalType = ref('') // 'feature', 'otherFeature', 'facility'

// 页面加载
onLoad(() => {
  uni.setNavigationBarTitle({ title: '店铺装修' })
})

// 上传品牌图片
const uploadBrandImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      formData.value.brandImage = res.tempFilePaths[0]
    }
  })
}

// 选择营业时间
const selectBusinessHours = () => {
  showBusinessHoursModal.value = true
}

// 关闭营业时间弹窗
const closeBusinessHoursModal = () => {
  showBusinessHoursModal.value = false
}

// 确认营业时间
const confirmBusinessHours = () => {
  const startHour = hours[startTimeIndex.value[0]]
  const startMinute = minutes[startTimeIndex.value[2]]
  const endHour = hours[endTimeIndex.value[0]]
  const endMinute = minutes[endTimeIndex.value[2]]
  formData.value.businessHours = `${startHour}:${startMinute}-${endHour}:${endMinute}`
  showBusinessHoursModal.value = false
}

// 开始时间变化
const onStartTimeChange = (e) => {
  startTimeIndex.value = e.detail.value
}

// 结束时间变化
const onEndTimeChange = (e) => {
  endTimeIndex.value = e.detail.value
}

// 选择休息时间
const selectRestTime = () => {
  // 解析已选择的休息日
  if (formData.value.restTime) {
    tempRestDays.value = formData.value.restTime.split('、')
  } else {
    tempRestDays.value = []
  }
  showRestTimeModal.value = true
}

// 关闭休息时间弹窗
const closeRestTimeModal = () => {
  showRestTimeModal.value = false
}

// 切换休息日选择
const toggleRestDay = (day) => {
  if (day === '无休息') {
    tempRestDays.value = ['无休息']
    return
  }
  // 移除"无休息"选项
  const noRestIndex = tempRestDays.value.indexOf('无休息')
  if (noRestIndex > -1) {
    tempRestDays.value.splice(noRestIndex, 1)
  }
  const idx = tempRestDays.value.indexOf(day)
  if (idx > -1) {
    tempRestDays.value.splice(idx, 1)
  } else {
    tempRestDays.value.push(day)
  }
}

// 确认休息时间
const confirmRestTime = () => {
  if (tempRestDays.value.length === 0) {
    formData.value.restTime = ''
  } else {
    formData.value.restTime = tempRestDays.value.join('、')
  }
  showRestTimeModal.value = false
}

// 输入经营地址
const inputAddress = () => {
  uni.chooseLocation({
    success: (res) => {
      formData.value.address = res.address
    },
    fail: () => {
      // 如果定位失败，使用输入框
      uni.showModal({
        title: '输入地址',
        editable: true,
        placeholderText: '请输入门店经营地址',
        success: (res) => {
          if (res.confirm && res.content) {
            formData.value.address = res.content
          }
        }
      })
    }
  })
}

// 选择门店成立时间
const selectEstablishDate = () => {
  // 解析已选择的年月
  if (formData.value.establishDate) {
    const match = formData.value.establishDate.match(/(\d+)年(\d+)月/)
    if (match) {
      const yearIdx = establishYears.indexOf(`${match[1]}年`)
      const monthIdx = parseInt(match[2]) - 1
      establishDateIndex.value = [yearIdx >= 0 ? yearIdx : 0, monthIdx >= 0 ? monthIdx : 0]
    } else {
      establishDateIndex.value = [0, 0]
    }
  } else {
    establishDateIndex.value = [0, 0]
  }
  showEstablishDateModal.value = true
}

// 关闭门店成立弹窗
const closeEstablishDateModal = () => {
  showEstablishDateModal.value = false
}

// 门店成立年份变化
const onEstablishDateChange = (e) => {
  establishDateIndex.value = e.detail.value
}

// 确认门店成立
const confirmEstablishDate = () => {
  const year = establishYears[establishDateIndex.value[0]]
  const month = establishMonths[establishDateIndex.value[1]]
  formData.value.establishDate = `${year}${month}`
  showEstablishDateModal.value = false
}

// 选择经营面积
const selectArea = () => {
  if (formData.value.area) {
    const idx = areaOptions.indexOf(formData.value.area)
    areaIndex.value = [idx >= 0 ? idx : 0]
  } else {
    areaIndex.value = [0]
  }
  showAreaModal.value = true
}

// 关闭经营面积弹窗
const closeAreaModal = () => {
  showAreaModal.value = false
}

// 经营面积变化
const onAreaChange = (e) => {
  areaIndex.value = e.detail.value
}

// 确认经营面积
const confirmArea = () => {
  formData.value.area = areaOptions[areaIndex.value[0]]
  showAreaModal.value = false
}

// 选择服务工位
const selectWorkstations = () => {
  if (formData.value.workstations) {
    const idx = workstationsOptions.indexOf(formData.value.workstations)
    workstationsIndex.value = [idx >= 0 ? idx : 0]
  } else {
    workstationsIndex.value = [0]
  }
  showWorkstationsModal.value = true
}

// 关闭服务工位弹窗
const closeWorkstationsModal = () => {
  showWorkstationsModal.value = false
}

// 服务工位变化
const onWorkstationsChange = (e) => {
  workstationsIndex.value = e.detail.value
}

// 确认服务工位
const confirmWorkstations = () => {
  formData.value.workstations = workstationsOptions[workstationsIndex.value[0]]
  showWorkstationsModal.value = false
}

// 选择美发师数
const selectStylistCount = () => {
  if (formData.value.stylistCount) {
    const idx = stylistCountOptions.indexOf(formData.value.stylistCount)
    stylistCountIndex.value = [idx >= 0 ? idx : 0]
  } else {
    stylistCountIndex.value = [0]
  }
  showStylistCountModal.value = true
}

// 关闭美发师数弹窗
const closeStylistCountModal = () => {
  showStylistCountModal.value = false
}

// 美发师数变化
const onStylistCountChange = (e) => {
  stylistCountIndex.value = e.detail.value
}

// 确认美发师数
const confirmStylistCount = () => {
  formData.value.stylistCount = stylistCountOptions[stylistCountIndex.value[0]]
  showStylistCountModal.value = false
}

// 选择预约时间
const selectBookingTime = () => {
  if (formData.value.bookingTime) {
    const idx = bookingTimeOptions.indexOf(formData.value.bookingTime)
    bookingTimeIndex.value = [idx >= 0 ? idx : 0]
  } else {
    bookingTimeIndex.value = [0]
  }
  showBookingTimeModal.value = true
}

// 关闭预约时间弹窗
const closeBookingTimeModal = () => {
  showBookingTimeModal.value = false
}

// 预约时间变化
const onBookingTimeChange = (e) => {
  bookingTimeIndex.value = e.detail.value
}

// 确认预约时间
const confirmBookingTime = () => {
  formData.value.bookingTime = bookingTimeOptions[bookingTimeIndex.value[0]]
  showBookingTimeModal.value = false
}

// 选择擅长技能
const selectSkills = () => {
  if (formData.value.skills) {
    tempSkills.value = formData.value.skills.split('、')
  } else {
    tempSkills.value = []
  }
  showSkillsModal.value = true
}

// 关闭擅长技能弹窗
const closeSkillsModal = () => {
  showSkillsModal.value = false
}

// 切换技能选择
const toggleSkill = (skill) => {
  const idx = tempSkills.value.indexOf(skill)
  if (idx > -1) {
    tempSkills.value.splice(idx, 1)
  } else {
    tempSkills.value.push(skill)
  }
}

// 移除已选技能标签
const removeSkillTag = (skill) => {
  const idx = tempSkills.value.indexOf(skill)
  if (idx > -1) {
    tempSkills.value.splice(idx, 1)
  }
}

// 显示自定义技能输入弹窗
const showCustomSkillInput = () => {
  customSkillValue.value = ''
  showCustomSkillModal.value = true
}

// 关闭自定义技能弹窗
const closeCustomSkillModal = () => {
  showCustomSkillModal.value = false
}

// 添加自定义技能
const addCustomSkill = () => {
  const value = customSkillValue.value.trim()
  if (!value) return
  if (!skillsOptions.value.includes(value)) {
    skillsOptions.value.push(value)
  }
  if (!tempSkills.value.includes(value)) {
    tempSkills.value.push(value)
  }
  showCustomSkillModal.value = false
}

// 确认擅长技能
const confirmSkills = () => {
  if (tempSkills.value.length === 0) {
    formData.value.skills = ''
  } else {
    formData.value.skills = tempSkills.value.join('、')
  }
  showSkillsModal.value = false
}

// 输入店铺简介
const inputIntro = () => {
  tempIntro.value = formData.value.intro || ''
  showIntroModal.value = true
}

// 关闭店铺简介弹窗
const closeIntroModal = () => {
  showIntroModal.value = false
}

// 确认店铺简介
const confirmIntro = () => {
  formData.value.intro = tempIntro.value
  showIntroModal.value = false
}

// 服务特色操作
const toggleFeature = (tag) => {
  const index = selectedFeatures.value.indexOf(tag)
  if (index > -1) {
    selectedFeatures.value.splice(index, 1)
  } else {
    if (selectedFeatures.value.length >= 10) {
      uni.showToast({ title: '最多选择10个', icon: 'none' })
      return
    }
    selectedFeatures.value.push(tag)
  }
}

const removeFeature = (tag) => {
  const index = selectedFeatures.value.indexOf(tag)
  if (index > -1) {
    selectedFeatures.value.splice(index, 1)
  }
}

const addCustomFeature = () => {
  modalTitle.value = '自定义服务特色'
  modalPlaceholder.value = '输入服务特色词，不超过10个字'
  customInputValue.value = ''
  modalType.value = 'feature'
  showCustomModal.value = true
}

const addCustomOtherFeature = () => {
  modalTitle.value = '自定义服务特色'
  modalPlaceholder.value = '输入服务特色词，不超过10个字'
  customInputValue.value = ''
  modalType.value = 'otherFeature'
  showCustomModal.value = true
}

// 环境设施操作
const toggleFacility = (tag) => {
  const index = selectedFacilities.value.indexOf(tag)
  if (index > -1) {
    selectedFacilities.value.splice(index, 1)
  } else {
    if (selectedFacilities.value.length >= 8) {
      uni.showToast({ title: '最多选择8个', icon: 'none' })
      return
    }
    selectedFacilities.value.push(tag)
  }
}

const removeFacility = (tag) => {
  const index = selectedFacilities.value.indexOf(tag)
  if (index > -1) {
    selectedFacilities.value.splice(index, 1)
  }
}

const addCustomFacility = () => {
  modalTitle.value = '自定义环境设施'
  modalPlaceholder.value = '输入环境设施词，不超过10个字'
  customInputValue.value = ''
  modalType.value = 'facility'
  showCustomModal.value = true
}

const addCustomCommonFacility = () => {
  modalTitle.value = '自定义通用设施'
  modalPlaceholder.value = '输入通用设施词，不超过10个字'
  customInputValue.value = ''
  modalType.value = 'commonFacility'
  showCustomModal.value = true
}

// 弹窗控制函数
const closeModal = () => {
  showCustomModal.value = false
  customInputValue.value = ''
}

const onInputChange = () => {
  // 输入变化时的处理（可选）
}

const confirmCustomInput = () => {
  const value = customInputValue.value.trim()
  if (!value) {
    uni.showToast({ title: '请输入内容', icon: 'none' })
    return
  }

  if (modalType.value === 'feature') {
    if (selectedFeatures.value.length >= 10) {
      uni.showToast({ title: '最多选择10个', icon: 'none' })
      return
    }
    if (!availableFeatures.value.includes(value)) {
      availableFeatures.value.push(value)
    }
    if (!selectedFeatures.value.includes(value)) {
      selectedFeatures.value.push(value)
    }
  } else if (modalType.value === 'otherFeature') {
    if (selectedFeatures.value.length >= 10) {
      uni.showToast({ title: '最多选择10个', icon: 'none' })
      return
    }
    if (!otherFeatures.value.includes(value)) {
      otherFeatures.value.push(value)
    }
    if (!selectedFeatures.value.includes(value)) {
      selectedFeatures.value.push(value)
    }
  } else if (modalType.value === 'facility') {
    if (selectedFacilities.value.length >= 8) {
      uni.showToast({ title: '最多选择8个', icon: 'none' })
      return
    }
    if (!availableFacilities.value.includes(value)) {
      availableFacilities.value.push(value)
    }
    if (!selectedFacilities.value.includes(value)) {
      selectedFacilities.value.push(value)
    }
  } else if (modalType.value === 'commonFacility') {
    if (selectedFacilities.value.length >= 8) {
      uni.showToast({ title: '最多选择8个', icon: 'none' })
      return
    }
    if (!commonFacilities.value.includes(value)) {
      commonFacilities.value.push(value)
    }
    if (!selectedFacilities.value.includes(value)) {
      selectedFacilities.value.push(value)
    }
  }

  closeModal()
}

// 上一步
const goPrevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// 下一步
const goNextStep = () => {
  if (currentStep.value < 2) {
    currentStep.value++
    const titles = ['品牌介绍', '服务特色', '环境设施']
    uni.showToast({ title: `进入${titles[currentStep.value]}`, icon: 'none' })
  } else {
    // 提交表单
    uni.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  padding: 14rpx;
  background-color: #EDF0F4;
}

// 步骤导航
.step-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28rpx 30rpx;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}

.step-dot {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background-color: #E8E8E8;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background-color: #C4C4C4;
  }

  &.active {
    background-color: #B8D4F8;

    &::after {
      background-color: #4A90E2;
    }
  }
}

.step-text {
  font-size: 28rpx;
  color: #999;
}

.step-item.active .step-text {

  color: #333;
  font-weight: 500;
}

.step-line {
  width: 120rpx;
  height: 2rpx;
  background-color: #E0E0E0;
  margin: 0 16rpx;
  margin-bottom: 40rpx;

  &.active {
    background-color: #4A90E2;
  }
}

// 表单卡片
.form-card {
  width: 100%;
  border-radius: 12rpx;
  background-color: #fff;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 30rpx 24rpx;
  border-bottom: 1rpx solid #F5F5F5;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #F9F9F9;
  }
}

.item-label {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
  width: 160rpx;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  margin-left: 24rpx;
}

.item-placeholder {
  font-size: 28rpx;
  color: #98A2B3;
}

.item-value {
  font-size: 28rpx;
  color: #333;
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

.brand-preview {
  width: 80rpx;
  height: 80rpx;
  flex-shrink: 0;
}

// 底部按钮
.bottom-button {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20rpx 24rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  display: flex;
  align-items: center;
}

.btn-next {
  height: 80rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4A90E2;
  flex: 1;

  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }

  &.btn-full {
    flex: 1;
  }
}

.btn-prev {
  height: 80rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 2rpx solid #E0E0E0;
  flex: 1;
  margin-right: 24rpx;

  text {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
  }
}

// 服务特色和环境设施
.feature-content {
  padding-bottom: 140rpx;
}

.title-card {
  background-color: #fff;
  padding: 18rpx 18rpx;
  border-radius: 12rpx;
  margin-bottom: 24rpx;
}

.title-main {
  font-size: 34rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 12rpx;
}

.title-desc {
  font-size: 24rpx;
  color: #98A2B3;
  line-height: 1.5;
}

.tag-section {
  background-color: #fff;
  padding: 24rpx;
  border-radius: 12rpx;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 20rpx;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.selected-tag {
  font-size: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc((100% - 32rpx) / 3);
  background-color: #DBE8FF;
  border: 2rpx solid #D4E4FF;
  border-radius: 12rpx;
  padding: 12rpx 12rpx 12rpx 16rpx;
  box-sizing: border-box;
  min-height: 56rpx;

  .tag-text {
    font-size: 24rpx;
    color: #4A90E2;
    flex: 1;
    word-break: break-all;
    line-height: 1.3;
  }
}

.tag-close {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
  margin-left: 8rpx;
}

.option-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.option-tag {
  width: calc((100% - 32rpx) / 3);
  height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F8FAFC;
  border: 2rpx solid #E8E8E8;
  border-radius: 8rpx;
  box-sizing: border-box;

  text {
    font-size: 24rpx;
    color: #333;
  }

  &.selected {
    background-color: #DBE8FF;
    border-color: #5280FF;

    text {
      color: #5280FF;
    }
  }

  &:active {
    opacity: 0.7;
  }
}

.custom-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  background-color: #fff;
  border: 2rpx dashed #4A90E2;

  text {
    color: #4A90E2;
  }
}

// 营业时间选择弹窗
.picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

.picker-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.picker-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
}

.picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 32rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.picker-cancel {
  font-size: 28rpx;
  color: #999;
}

.picker-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.picker-confirm {
  font-size: 28rpx;
  color: #4A90E2;
}

.time-picker-body {
  display: flex;
  padding: 32rpx;
  gap: 24rpx;
}

.time-section {
  flex: 1;
}

.time-section-label {
  display: block;
  font-size: 26rpx;
  color: #666;
  margin-bottom: 16rpx;
  text-align: center;
}

.time-picker-wrapper {
  height: 300rpx;
}

.time-picker-view {
  height: 100%;
}

.picker-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  font-size: 32rpx;
  color: #333;
}

// 单列滚轮选择器
.single-picker-body {
  padding: 32rpx;
}

.single-picker-view {
  height: 300rpx;
}

// 多选列表选择器
.select-picker-body {
  padding: 16rpx 32rpx;
  max-height: 600rpx;
  overflow-y: auto;
}

.select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 16rpx;
  border-bottom: 1rpx solid #f5f5f5;

  text {
    font-size: 30rpx;
    color: #333;
  }

  &:last-child {
    border-bottom: none;
  }

  &.selected {
    text {
      color: #4A90E2;
      font-weight: 500;
    }
  }
}

.check-icon {
  font-size: 32rpx;
  color: #4A90E2;
  font-weight: 600;
}

// 自定义弹窗
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  width: 560rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 48rpx 32rpx 32rpx;
}

.modal-title {
  font-size: 34rpx;
  color: #333;
  font-weight: 600;
  text-align: center;
  margin-bottom: 48rpx;
}

.modal-input-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 48rpx;
  border-bottom: 1rpx solid #E8E8E8;
  padding-bottom: 16rpx;
}

.modal-input {
  flex: 1;
  height: 60rpx;
  font-size: 28rpx;
  color: #999;
  background: transparent;
  border: none;
}

.input-count {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  .count-current {
    font-size: 28rpx;
    color: #4A90E2;
  }

  .count-total {
    font-size: 28rpx;
    color: #999;
  }
}

.modal-buttons {
  display: flex;
  gap: 20rpx;
}

.modal-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 14rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    font-size: 32rpx;
    font-weight: 500;
  }
}

.modal-btn-cancel {
  background-color: #F5F7FA;

  text {
    color: #333;
  }
}

.modal-btn-confirm {
  background-color: #4A90E2;

  text {
    color: #fff;
  }
}

// 店铺简介弹窗样式
.intro-modal-content {
  width: 600rpx;
}

.intro-input-wrap {
  margin-bottom: 48rpx;
}

.intro-textarea {
  width: 100%;
  height: 240rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #F5F7FA;
  border-radius: 12rpx;
  box-sizing: border-box;
}

.intro-input-wrap .input-count {
  display: flex;
  justify-content: flex-end;
  margin-top: 12rpx;
}

// 擅长技能选择弹窗样式
.skills-picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.skills-picker-modal {
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

.skills-picker-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.skills-picker-section {
  margin-bottom: 40rpx;
  padding: 0 8rpx;
}

.skills-picker-section-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 24rpx;
  display: block;
}

.skills-picker-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.skills-tag {
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

  &.custom-btn {
    background-color: #fff;
    border: 2rpx dashed #5280FF;

    text {
      color: #5280FF;
    }
  }
}

.skills-tag-close {
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

.skills-picker-save-btn {
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
}

// 自定义技能输入弹窗
.custom-skill-modal {
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

.custom-skill-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.custom-skill-content {
  position: relative;
  width: 560rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 40rpx 32rpx;
}

.custom-skill-header {
  margin-bottom: 32rpx;
}

.custom-skill-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  display: block;
}

.custom-skill-input {
  width: 100%;
  height: 88rpx;
  background-color: #F5F7FA;
  border-radius: 12rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
  color: #333;
  box-sizing: border-box;
  margin-bottom: 32rpx;
}

.custom-skill-btns {
  display: flex;
  gap: 24rpx;
}

.custom-skill-cancel,
.custom-skill-confirm {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}

.custom-skill-cancel {
  background-color: #F5F7FA;
  color: #666;
}

.custom-skill-confirm {
  background-color: #5280FF;
  color: #fff;
}
</style>
