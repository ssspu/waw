<template>
  <div class="page-container">
    <div class="page-header">
      <h2>活动管理</h2>
      <el-button type="primary" @click="handleAdd">新增活动</el-button>
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="活动名称">
          <el-input v-model="searchForm.keyword" placeholder="请输入活动名称" clearable />
        </el-form-item>
        <el-form-item label="活动状态">
          <el-select v-model="searchForm.status" placeholder="全部" clearable>
            <el-option label="未开始" :value="0" />
            <el-option label="进行中" :value="1" />
            <el-option label="已结束" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card>
      <el-table :data="activityList" stripe>
        <el-table-column prop="name" label="活动名称" />
        <el-table-column prop="type" label="活动类型" width="120">
          <template #default="{ row }">
            {{ getTypeText(row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="180" />
        <el-table-column prop="endTime" label="结束时间" width="180" />
        <el-table-column prop="participantCount" label="参与人数" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <el-button type="warning" link @click="handleEdit(row)" :disabled="row.status === 2">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)" :disabled="row.status === 1">删除</el-button>
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
        <el-form-item label="活动名称">
          <el-input v-model="formData.name" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="formData.type" placeholder="请选择活动类型">
            <el-option label="满减活动" :value="1" />
            <el-option label="折扣活动" :value="2" />
            <el-option label="秒杀活动" :value="3" />
            <el-option label="新人专享" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker v-model="formData.timeRange" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>
        <el-form-item label="活动规则">
          <el-input v-model="formData.rules" type="textarea" :rows="3" placeholder="请输入活动规则" />
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入活动描述" />
        </el-form-item>
        <el-form-item label="活动封面">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const searchForm = ref({
  keyword: '',
  status: ''
})

const activityList = ref([
  { id: 1, name: '新年特惠', type: 1, startTime: '2024-01-20 00:00:00', endTime: '2024-02-10 23:59:59', participantCount: 520, status: 1 },
  { id: 2, name: '会员日折扣', type: 2, startTime: '2024-01-25 00:00:00', endTime: '2024-01-25 23:59:59', participantCount: 0, status: 0 },
  { id: 3, name: '双十一秒杀', type: 3, startTime: '2023-11-11 00:00:00', endTime: '2023-11-11 23:59:59', participantCount: 1280, status: 2 },
  { id: 4, name: '新人首单立减', type: 4, startTime: '2024-01-01 00:00:00', endTime: '2024-12-31 23:59:59', participantCount: 860, status: 1 }
])

const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 50
})

const dialogVisible = ref(false)
const dialogTitle = ref('新增活动')
const formData = ref({
  name: '',
  type: '',
  timeRange: [],
  rules: '',
  description: ''
})

const getTypeText = (type) => {
  const texts = { 1: '满减活动', 2: '折扣活动', 3: '秒杀活动', 4: '新人专享' }
  return texts[type] || '未知'
}

const getStatusType = (status) => {
  const types = { 0: 'info', 1: 'success', 2: '' }
  return types[status]
}

const getStatusText = (status) => {
  const texts = { 0: '未开始', 1: '进行中', 2: '已结束' }
  return texts[status]
}

const handleSearch = () => {
  // 搜索活动
}

const handleAdd = () => {
  dialogTitle.value = '新增活动'
  formData.value = { name: '', type: '', timeRange: [], rules: '', description: '' }
  dialogVisible.value = true
}

const handleView = (row) => {
  dialogTitle.value = '查看活动'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑活动'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该活动吗？', '提示', { type: 'warning' })
    .then(() => {
      ElMessage.success('删除成功')
    })
}

const handleSubmit = () => {
  ElMessage.success('保存成功')
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
