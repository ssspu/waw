/**
 * 入驻模块 Mock 数据
 */

import { success, error } from '../utils.js'

// 设计师入驻进度
const designerProgress = {
  currentStep: 0, // 0-未开始, 1-身份认证, 2-职业认证, 3-合作协议, 4-结算信息
  steps: [
    { step: 1, name: '身份认证', completed: false },
    { step: 2, name: '职业认证', completed: false },
    { step: 3, name: '合作协议', completed: false },
    { step: 4, name: '结算信息', completed: false }
  ],
  data: {
    identity: null,
    profession: null,
    agreement: false,
    settlement: null
  }
}

// 门店入驻进度
const storeProgress = {
  currentStep: 0,
  steps: [
    { step: 1, name: '门店认证', completed: false },
    { step: 2, name: '执照认证', completed: false },
    { step: 3, name: '合作协议', completed: false },
    { step: 4, name: '结算信息', completed: false }
  ],
  data: {
    store: null,
    license: null,
    agreement: false,
    settlement: null
  }
}

// 职业类型列表
const professions = [
  { id: '1', name: '美发师', category: 'hair' },
  { id: '2', name: '美容师', category: 'beauty' },
  { id: '3', name: '化妆师', category: 'makeup' },
  { id: '4', name: '美甲师', category: 'nail' },
  { id: '5', name: '美体师', category: 'body' }
]

// 门店类型列表
const storeTypes = [
  { id: '1', name: '个人工作室' },
  { id: '2', name: '专业店' },
  { id: '3', name: '连锁品牌' },
  { id: '4', name: '综合美容院' }
]

// 银行列表
const banks = [
  { code: 'ICBC', name: '中国工商银行' },
  { code: 'CCB', name: '中国建设银行' },
  { code: 'ABC', name: '中国农业银行' },
  { code: 'BOC', name: '中国银行' },
  { code: 'CMB', name: '招商银行' },
  { code: 'COMM', name: '交通银行' },
  { code: 'CITIC', name: '中信银行' },
  { code: 'SPDB', name: '浦发银行' },
  { code: 'CEB', name: '光大银行' },
  { code: 'PAB', name: '平安银行' }
]

// 协议内容
const designerAgreement = {
  title: '设计师入驻合作协议',
  content: `
    众美平台设计师入驻合作协议

    甲方：众美科技有限公司
    乙方：入驻设计师

    第一条 合作内容
    1.1 甲方为乙方提供在线预约平台服务...
    1.2 乙方通过甲方平台接受用户预约服务...

    第二条 权利义务
    2.1 甲方的权利义务...
    2.2 乙方的权利义务...

    第三条 费用结算
    3.1 平台服务费比例...
    3.2 结算周期和方式...

    第四条 协议期限
    本协议有效期为一年，自审核通过之日起生效...

    第五条 其他条款
    ...
  `,
  updateTime: '2025-01-01'
}

const storeAgreement = {
  title: '门店入驻合作协议',
  content: `
    众美平台门店入驻合作协议

    甲方：众美科技有限公司
    乙方：入驻门店

    第一条 合作内容
    1.1 甲方为乙方提供在线预约平台服务...
    1.2 乙方通过甲方平台接受用户预约服务...

    第二条 权利义务
    2.1 甲方的权利义务...
    2.2 乙方的权利义务...

    第三条 费用结算
    3.1 平台服务费比例...
    3.2 结算周期和方式...

    第四条 协议期限
    本协议有效期为一年，自审核通过之日起生效...

    第五条 其他条款
    ...
  `,
  updateTime: '2025-01-01'
}

// Mock 数据
export const data = {
  designerProgress,
  storeProgress,
  professions,
  storeTypes,
  banks,
  designerAgreement,
  storeAgreement
}

// Mock 路由处理
export const routes = {
  // ============ 设计师入驻 ============

  // 获取设计师入驻进度
  'GET /api/settlement/designer/progress': () => {
    return success(designerProgress)
  },

  // 提交设计师身份认证
  'POST /api/settlement/designer/identity': (params) => {
    designerProgress.data.identity = params
    designerProgress.steps[0].completed = true
    designerProgress.currentStep = 1
    return success(null, '身份认证信息已保存')
  },

  // 提交设计师职业认证
  'POST /api/settlement/designer/profession': (params) => {
    designerProgress.data.profession = params
    designerProgress.steps[1].completed = true
    designerProgress.currentStep = 2
    return success(null, '职业认证信息已保存')
  },

  // 获取设计师合作协议
  'GET /api/settlement/designer/agreement': () => {
    return success(designerAgreement)
  },

  // 同意设计师合作协议
  'POST /api/settlement/designer/agreement/agree': () => {
    designerProgress.data.agreement = true
    designerProgress.steps[2].completed = true
    designerProgress.currentStep = 3
    return success(null, '已同意合作协议')
  },

  // 提交设计师结算信息
  'POST /api/settlement/designer/settlement': (params) => {
    designerProgress.data.settlement = params
    designerProgress.steps[3].completed = true
    designerProgress.currentStep = 4
    return success(null, '结算信息已保存')
  },

  // 提交设计师入驻申请
  'POST /api/settlement/designer/submit': () => {
    if (designerProgress.currentStep < 4) {
      return error('请先完成所有步骤')
    }
    return success({
      applyId: 'AD' + Date.now(),
      status: 'reviewing',
      submitTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
    }, '申请已提交，请等待审核')
  },

  // 获取设计师入驻申请状态
  'GET /api/settlement/designer/status': () => {
    return success({
      status: 'pending', // pending/reviewing/approved/rejected
      applyTime: null,
      reviewTime: null,
      rejectReason: null
    })
  },

  // ============ 门店入驻 ============

  // 获取门店入驻进度
  'GET /api/settlement/store/progress': () => {
    return success(storeProgress)
  },

  // 提交门店认证
  'POST /api/settlement/store/info': (params) => {
    storeProgress.data.store = params
    storeProgress.steps[0].completed = true
    storeProgress.currentStep = 1
    return success(null, '门店信息已保存')
  },

  // 提交门店执照认证
  'POST /api/settlement/store/license': (params) => {
    storeProgress.data.license = params
    storeProgress.steps[1].completed = true
    storeProgress.currentStep = 2
    return success(null, '执照信息已保存')
  },

  // 获取门店合作协议
  'GET /api/settlement/store/agreement': () => {
    return success(storeAgreement)
  },

  // 同意门店合作协议
  'POST /api/settlement/store/agreement/agree': () => {
    storeProgress.data.agreement = true
    storeProgress.steps[2].completed = true
    storeProgress.currentStep = 3
    return success(null, '已同意合作协议')
  },

  // 提交门店结算信息
  'POST /api/settlement/store/settlement': (params) => {
    storeProgress.data.settlement = params
    storeProgress.steps[3].completed = true
    storeProgress.currentStep = 4
    return success(null, '结算信息已保存')
  },

  // 提交门店入驻申请
  'POST /api/settlement/store/submit': () => {
    if (storeProgress.currentStep < 4) {
      return error('请先完成所有步骤')
    }
    return success({
      applyId: 'AS' + Date.now(),
      status: 'reviewing',
      submitTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
    }, '申请已提交，请等待审核')
  },

  // 获取门店入驻申请状态
  'GET /api/settlement/store/status': () => {
    return success({
      status: 'pending',
      applyTime: null,
      reviewTime: null,
      rejectReason: null
    })
  },

  // ============ 通用接口 ============

  // 上传入驻相关图片
  'POST /api/settlement/upload': (params) => {
    return success({
      url: '/static/upload/' + Date.now() + '.png',
      name: 'uploaded_file.png'
    })
  },

  // 获取银行列表
  'GET /api/settlement/banks': () => {
    return success(banks)
  },

  // 获取银行支行列表
  'GET /api/settlement/branches': (params) => {
    const branches = [
      { code: '001', name: `${params.bankCode}成都锦江支行` },
      { code: '002', name: `${params.bankCode}成都武侯支行` },
      { code: '003', name: `${params.bankCode}成都高新支行` },
      { code: '004', name: `${params.bankCode}成都青羊支行` }
    ]
    return success(branches)
  },

  // 获取职业类型列表
  'GET /api/settlement/professions': () => {
    return success(professions)
  },

  // 获取门店类型列表
  'GET /api/settlement/store-types': () => {
    return success(storeTypes)
  },

  // 撤销入驻申请
  'POST /api/settlement/:type/cancel': (params) => {
    if (params.type === 'designer') {
      // 重置设计师进度
      designerProgress.currentStep = 0
      designerProgress.steps.forEach(s => s.completed = false)
      designerProgress.data = { identity: null, profession: null, agreement: false, settlement: null }
    } else {
      // 重置门店进度
      storeProgress.currentStep = 0
      storeProgress.steps.forEach(s => s.completed = false)
      storeProgress.data = { store: null, license: null, agreement: false, settlement: null }
    }
    return success(null, '申请已撤销')
  },

  // 重新提交入驻申请
  'POST /api/settlement/:type/resubmit': (params) => {
    return success({
      applyId: (params.type === 'designer' ? 'AD' : 'AS') + Date.now(),
      status: 'reviewing'
    }, '申请已重新提交')
  }
}

export default {
  data,
  routes
}
