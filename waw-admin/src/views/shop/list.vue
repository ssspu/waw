<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">店铺列表</span></div>
    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="店铺名称"><el-input v-model="searchForm.name" placeholder="请输入名称" clearable /></el-form-item>
        <el-form-item label="营业状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option label="营业中" value="open" />
            <el-option label="休息中" value="closed" />
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
        <el-table-column prop="logo" label="Logo" width="80">
          <template #default="{ row }"><el-avatar :size="40" :src="row.logo" /></template>
        </el-table-column>
        <el-table-column prop="name" label="店铺名称" min-width="150" />
        <el-table-column prop="merchant" label="所属商家" width="150" />
        <el-table-column prop="address" label="地址" min-width="200" show-overflow-tooltip />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column prop="technicianCount" label="技师数" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'open' ? 'success' : 'info'">{{ row.status === 'open' ? '营业中' : '休息中' }}</el-tag>
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

    <!-- 店铺详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="店铺详情" width="700px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="店铺名称">{{ viewDialog.data.name }}</el-descriptions-item>
        <el-descriptions-item label="所属商家">{{ viewDialog.data.merchant }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ viewDialog.data.phone }}</el-descriptions-item>
        <el-descriptions-item label="营业状态">
          <el-tag :type="viewDialog.data.status === 'open' ? 'success' : 'info'">
            {{ viewDialog.data.status === 'open' ? '营业中' : '休息中' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="地址" :span="2">{{ viewDialog.data.address }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { shopApi } from '@/api'

const loading = ref(false)
const searchForm = reactive({ name: '', status: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])

const viewDialog = reactive({ visible: false, data: {} })

onMounted(() => fetchList())

const fetchList = async () => {
  loading.value = true
  try {
    const res = await shopApi.getList({ page: pagination.page, pageSize: pagination.pageSize, ...searchForm })
    if (res.code === 0) { tableData.value = res.data.list || []; pagination.total = res.data.total || 0 }
  } catch {
    tableData.value = [
      { id: 1, logo: '', name: '美丽造型旗舰店', merchant: '美丽造型有限公司', address: '上海市浦东新区陆家嘴环路1000号', phone: '021-12345678', technicianCount: 15, status: 'open' },
      { id: 2, logo: '', name: '时尚发型工作室', merchant: '时尚发型工作室', address: '北京市朝阳区三里屯路100号', phone: '010-87654321', technicianCount: 8, status: 'open' },
      { id: 3, logo: '', name: '潮流造型店', merchant: '潮流造型有限公司', address: '广州市天河区体育西路200号', phone: '020-11112222', technicianCount: 12, status: 'closed' }
    ]
    pagination.total = 50
  } finally { loading.value = false }
}

const handleSearch = () => { pagination.page = 1; fetchList() }
const handleReset = () => { Object.assign(searchForm, { name: '', status: '' }); pagination.page = 1; fetchList() }

const handleView = (row) => { viewDialog.data = { ...row }; viewDialog.visible = true }
</script>

<style scoped>
.pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
</style>
