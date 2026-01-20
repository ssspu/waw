<template>
  <div class="page-container">
    <div class="page-header">
      <h2>消息列表</h2>
      <el-button type="primary" @click="handleAdd">发送消息</el-button>
    </div>

    <el-tabs v-model="activeTab" @tab-change="handleTabChange">
      <el-tab-pane label="系统消息" name="system" />
      <el-tab-pane label="营销消息" name="marketing" />
      <el-tab-pane label="订单消息" name="order" />
    </el-tabs>

    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="消息标题">
          <el-input v-model="searchForm.keyword" placeholder="请输入消息标题" clearable />
        </el-form-item>
        <el-form-item label="发送状态">
          <el-select v-model="searchForm.status" placeholder="全部" clearable>
            <el-option label="待发送" :value="0" />
            <el-option label="已发送" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card>
      <el-table :data="messageList" stripe>
        <el-table-column prop="title" label="消息标题" />
        <el-table-column prop="type" label="消息类型" width="100">
          <template #default="{ row }">
            <el-tag :type="getTypeTag(row.type)">{{ getTypeText(row.type) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="target" label="发送对象" width="120" />
        <el-table-column prop="sendCount" label="发送数量" width="100" />
        <el-table-column prop="readCount" label="已读数量" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? '已发送' : '待发送' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="消息类型">
          <el-select v-model="formData.type" placeholder="请选择消息类型">
            <el-option label="系统消息" value="system" />
            <el-option label="营销消息" value="marketing" />
            <el-option label="订单消息" value="order" />
          </el-select>
        </el-form-item>
        <el-form-item label="消息标题">
          <el-input v-model="formData.title" placeholder="请输入消息标题" />
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input v-model="formData.content" type="textarea" :rows="4" placeholder="请输入消息内容" />
        </el-form-item>
        <el-form-item label="发送对象">
          <el-select v-model="formData.target" placeholder="请选择发送对象">
            <el-option label="全部用户" value="all" />
            <el-option label="VIP用户" value="vip" />
            <el-option label="商家" value="merchant" />
            <el-option label="技师" value="technician" />
          </el-select>
        </el-form-item>
        <el-form-item label="定时发送">
          <el-switch v-model="formData.scheduled" />
        </el-form-item>
        <el-form-item label="发送时间" v-if="formData.scheduled">
          <el-date-picker v-model="formData.sendTime" type="datetime" placeholder="选择发送时间" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">{{ formData.scheduled ? '定时发送' : '立即发送' }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const activeTab = ref('system')

const searchForm = ref({
  keyword: '',
  status: ''
})

const messageList = ref([
  { id: 1, title: '系统升级通知', type: 'system', target: '全部用户', sendCount: 5280, readCount: 3200, status: 1, createTime: '2024-01-20 10:00:00' },
  { id: 2, title: '新年优惠活动', type: 'marketing', target: 'VIP用户', sendCount: 1200, readCount: 680, status: 1, createTime: '2024-01-19 14:00:00' },
  { id: 3, title: '订单发货通知', type: 'order', target: '全部用户', sendCount: 320, readCount: 280, status: 1, createTime: '2024-01-18 16:00:00' }
])

const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 50
})

const dialogVisible = ref(false)
const dialogTitle = ref('发送消息')
const formData = ref({
  type: '',
  title: '',
  content: '',
  target: '',
  scheduled: false,
  sendTime: ''
})

const getTypeTag = (type) => {
  const tags = { system: '', marketing: 'warning', order: 'success' }
  return tags[type]
}

const getTypeText = (type) => {
  const texts = { system: '系统消息', marketing: '营销消息', order: '订单消息' }
  return texts[type]
}

const handleTabChange = () => {
  // 切换Tab时重新加载数据
}

const handleSearch = () => {
  // 搜索消息
}

const handleAdd = () => {
  dialogTitle.value = '发送消息'
  formData.value = { type: '', title: '', content: '', target: '', scheduled: false, sendTime: '' }
  dialogVisible.value = true
}

const handleView = (row) => {
  dialogTitle.value = '查看消息'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该消息吗？', '提示', { type: 'warning' })
    .then(() => {
      ElMessage.success('删除成功')
    })
}

const handleSubmit = () => {
  ElMessage.success(formData.value.scheduled ? '定时发送设置成功' : '消息发送成功')
  dialogVisible.value = false
}
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.search-form {
  margin-bottom: 20px;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
