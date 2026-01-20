<template>
  <div class="page-container">
    <div class="page-header">
      <h2>消息推送</h2>
    </div>

    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
          <template #header>推送设置</template>
          <el-form :model="pushForm" label-width="120px">
            <el-form-item label="推送类型">
              <el-radio-group v-model="pushForm.type">
                <el-radio value="immediate">立即推送</el-radio>
                <el-radio value="scheduled">定时推送</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="推送时间" v-if="pushForm.type === 'scheduled'">
              <el-date-picker v-model="pushForm.sendTime" type="datetime" placeholder="选择推送时间" />
            </el-form-item>
            <el-form-item label="推送渠道">
              <el-checkbox-group v-model="pushForm.channels">
                <el-checkbox value="app">APP推送</el-checkbox>
                <el-checkbox value="sms">短信</el-checkbox>
                <el-checkbox value="wechat">微信模板消息</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="推送对象">
              <el-select v-model="pushForm.target" placeholder="请选择推送对象">
                <el-option label="全部用户" value="all" />
                <el-option label="VIP用户" value="vip" />
                <el-option label="商家" value="merchant" />
                <el-option label="技师" value="technician" />
                <el-option label="自定义用户" value="custom" />
              </el-select>
            </el-form-item>
            <el-form-item label="消息标题">
              <el-input v-model="pushForm.title" placeholder="请输入消息标题" maxlength="50" show-word-limit />
            </el-form-item>
            <el-form-item label="消息内容">
              <el-input v-model="pushForm.content" type="textarea" :rows="4" placeholder="请输入消息内容" maxlength="200" show-word-limit />
            </el-form-item>
            <el-form-item label="跳转链接">
              <el-input v-model="pushForm.link" placeholder="请输入跳转链接（可选）" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handlePush">{{ pushForm.type === 'immediate' ? '立即推送' : '设置定时推送' }}</el-button>
              <el-button @click="handlePreview">预览</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>推送统计</template>
          <div class="stat-list">
            <div class="stat-item">
              <span class="label">今日推送</span>
              <span class="value">{{ stats.todayCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">本周推送</span>
              <span class="value">{{ stats.weekCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">本月推送</span>
              <span class="value">{{ stats.monthCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">平均打开率</span>
              <span class="value">{{ stats.openRate }}%</span>
            </div>
          </div>
        </el-card>

        <el-card style="margin-top: 20px;">
          <template #header>推送记录</template>
          <el-timeline>
            <el-timeline-item v-for="item in pushHistory" :key="item.id" :timestamp="item.time" placement="top">
              <div class="history-item">
                <div class="title">{{ item.title }}</div>
                <div class="info">
                  <span>{{ item.target }}</span>
                  <span>{{ item.count }}人</span>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const pushForm = ref({
  type: 'immediate',
  sendTime: '',
  channels: ['app'],
  target: 'all',
  title: '',
  content: '',
  link: ''
})

const stats = ref({
  todayCount: 3,
  weekCount: 15,
  monthCount: 48,
  openRate: 68.5
})

const pushHistory = ref([
  { id: 1, title: '新年优惠活动', target: 'VIP用户', count: 1200, time: '2024-01-20 10:00' },
  { id: 2, title: '系统升级通知', target: '全部用户', count: 5280, time: '2024-01-19 14:00' },
  { id: 3, title: '会员日提醒', target: 'VIP用户', count: 1200, time: '2024-01-18 09:00' }
])

const handlePush = () => {
  if (!pushForm.value.title || !pushForm.value.content) {
    ElMessage.warning('请填写消息标题和内容')
    return
  }
  ElMessage.success(pushForm.value.type === 'immediate' ? '推送成功' : '定时推送设置成功')
}

const handlePreview = () => {
  ElMessage.info('预览功能开发中')
}
</script>

<style scoped lang="scss">
.page-header {
  margin-bottom: 20px;
}
.stat-list {
  .stat-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    &:last-child {
      border-bottom: none;
    }
    .label {
      color: #666;
    }
    .value {
      font-weight: bold;
      color: var(--el-color-primary);
    }
  }
}
.history-item {
  .title {
    font-weight: 500;
    margin-bottom: 4px;
  }
  .info {
    font-size: 12px;
    color: #999;
    span {
      margin-right: 12px;
    }
  }
}
</style>
