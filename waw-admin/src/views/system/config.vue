<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">系统配置</span></div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基础配置" name="basic">
        <el-form :model="basicForm" label-width="120px" style="max-width: 600px;">
          <el-form-item label="平台名称"><el-input v-model="basicForm.name" /></el-form-item>
          <el-form-item label="平台Logo"><el-upload action="#" :auto-upload="false"><el-button>上传Logo</el-button></el-upload></el-form-item>
          <el-form-item label="客服电话"><el-input v-model="basicForm.phone" /></el-form-item>
          <el-form-item label="客服邮箱"><el-input v-model="basicForm.email" /></el-form-item>
          <el-form-item><el-button type="primary" @click="handleSave">保存配置</el-button></el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="支付配置" name="payment">
        <el-form :model="paymentForm" label-width="120px" style="max-width: 600px;">
          <el-form-item label="微信支付"><el-switch v-model="paymentForm.wechat" /></el-form-item>
          <el-form-item label="支付宝支付"><el-switch v-model="paymentForm.alipay" /></el-form-item>
          <el-form-item><el-button type="primary" @click="handleSave">保存配置</el-button></el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="协议配置" name="agreement">
        <el-form :model="agreementForm" label-width="120px">
          <el-form-item label="用户协议"><el-input v-model="agreementForm.user" type="textarea" :rows="6" /></el-form-item>
          <el-form-item label="隐私政策"><el-input v-model="agreementForm.privacy" type="textarea" :rows="6" /></el-form-item>
          <el-form-item><el-button type="primary" @click="handleSave">保存配置</el-button></el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('basic')
const basicForm = reactive({ name: 'WAW美发平台', phone: '400-123-4567', email: 'service@waw.com' })
const paymentForm = reactive({ wechat: true, alipay: true })
const agreementForm = reactive({ user: '', privacy: '' })

const handleSave = () => { ElMessage.success('保存成功') }
</script>
