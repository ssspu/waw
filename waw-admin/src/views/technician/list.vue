<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">技师列表</span></div>
    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="技师名称"><el-input v-model="searchForm.name" placeholder="请输入名称" clearable /></el-form-item>
        <el-form-item label="职位">
          <el-select v-model="searchForm.position" placeholder="请选择" clearable>
            <el-option label="总监" value="director" />
            <el-option label="设计师" value="designer" />
            <el-option label="助理" value="assistant" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option label="在职" value="active" />
            <el-option label="离职" value="resigned" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="tableData" v-loading="loading" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="avatar" label="头像" width="80">
          <template #default="{ row }"><el-avatar :size="40" :src="row.avatar" /></template>
        </el-table-column>
        <el-table-column prop="name" label="技师名称" min-width="120" />
        <el-table-column prop="shop" label="所属店铺" min-width="150" />
        <el-table-column prop="position" label="职位" width="100" />
        <el-table-column prop="level" label="等级" width="80">
          <template #default="{ row }"><el-tag type="warning">{{ row.level }}级</el-tag></template>
        </el-table-column>
        <el-table-column prop="orderCount" label="订单数" width="80" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">{{ row.status === 'active' ? '在职' : '离职' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize" :total="pagination.total" layout="total, sizes, prev, pager, next" />
    </div>

    <!-- 技师详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="技师详情" width="700px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="技师名称">{{ viewDialog.data.name }}</el-descriptions-item>
        <el-descriptions-item label="所属店铺">{{ viewDialog.data.shop }}</el-descriptions-item>
        <el-descriptions-item label="职位">{{ viewDialog.data.position }}</el-descriptions-item>
        <el-descriptions-item label="等级">
          <el-tag type="warning">{{ viewDialog.data.level }}级</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="订单数">{{ viewDialog.data.orderCount }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="viewDialog.data.status === 'active' ? 'success' : 'info'">
            {{ viewDialog.data.status === 'active' ? '在职' : '离职' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { technicianApi } from '@/api'

const loading = ref(false)
const searchForm = reactive({ name: '', position: '', status: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])

const viewDialog = reactive({ visible: false, data: {} })

onMounted(() => fetchList())

const fetchList = async () => {
  loading.value = true
  try {
    const res = await technicianApi.getList({ page: pagination.page, pageSize: pagination.pageSize, ...searchForm })
    if (res.code === 0) { tableData.value = res.data.list || []; pagination.total = res.data.total || 0 }
  } catch {
    tableData.value = [
      { id: 1, avatar: '', name: '张三', shop: '美丽造型旗舰店', position: '总监', level: 8, orderCount: 256, rating: 4.9, status: 'active' },
      { id: 2, avatar: '', name: '李四', shop: '时尚发型工作室', position: '设计师', level: 6, orderCount: 128, rating: 4.7, status: 'active' },
      { id: 3, avatar: '', name: '王五', shop: '潮流造型店', position: '助理', level: 3, orderCount: 45, rating: 4.5, status: 'resigned' }
    ]
    pagination.total = 100
  } finally { loading.value = false }
}

const handleSearch = () => { pagination.page = 1; fetchList() }
const handleReset = () => { Object.assign(searchForm, { name: '', position: '', status: '' }); pagination.page = 1; fetchList() }

const handleView = (row) => { viewDialog.data = { ...row }; viewDialog.visible = true }
</script>

<style scoped>
.pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
</style>
