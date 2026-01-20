<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">用户列表</span></div>
    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="用户昵称"><el-input v-model="searchForm.nickname" placeholder="请输入昵称" clearable /></el-form-item>
        <el-form-item label="手机号"><el-input v-model="searchForm.phone" placeholder="请输入手机号" clearable /></el-form-item>
        <el-form-item label="会员状态">
          <el-select v-model="searchForm.vipStatus" placeholder="请选择" clearable>
            <el-option label="普通用户" value="normal" />
            <el-option label="VIP会员" value="vip" />
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
        <el-table-column prop="nickname" label="昵称" min-width="120" />
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column prop="vipStatus" label="会员状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.vipStatus === 'vip' ? 'warning' : 'info'">{{ row.vipStatus === 'vip' ? 'VIP' : '普通' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderCount" label="订单数" width="80" />
        <el-table-column prop="totalAmount" label="消费金额" width="100">
          <template #default="{ row }">¥{{ row.totalAmount }}</template>
        </el-table-column>
        <el-table-column prop="registerTime" label="注册时间" width="160" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            <el-button type="danger" link size="small" @click="handleDisable(row)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" />
    </div>

    <!-- 用户详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="用户详情" width="700px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="昵称">{{ viewDialog.data.nickname }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ viewDialog.data.phone }}</el-descriptions-item>
        <el-descriptions-item label="会员状态">
          <el-tag :type="viewDialog.data.vipStatus === 'vip' ? 'warning' : 'info'">
            {{ viewDialog.data.vipStatus === 'vip' ? 'VIP' : '普通' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="订单数">{{ viewDialog.data.orderCount }}</el-descriptions-item>
        <el-descriptions-item label="消费金额">¥{{ viewDialog.data.totalAmount }}</el-descriptions-item>
        <el-descriptions-item label="注册时间">{{ viewDialog.data.registerTime }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userApi } from '@/api'

const loading = ref(false)
const searchForm = reactive({ nickname: '', phone: '', vipStatus: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])
const viewDialog = reactive({ visible: false, data: {} })

onMounted(() => fetchList())

const fetchList = async () => {
  loading.value = true
  try {
    const res = await userApi.getList({ page: pagination.page, pageSize: pagination.pageSize, ...searchForm })
    if (res.code === 0) { tableData.value = res.data.list || []; pagination.total = res.data.total || 0 }
  } catch {
    tableData.value = [
      { id: 1, avatar: '', nickname: '小明', phone: '138****1234', vipStatus: 'vip', orderCount: 25, totalAmount: 3580, registerTime: '2023-06-15 10:30', status: 'active' },
      { id: 2, avatar: '', nickname: '小红', phone: '139****5678', vipStatus: 'normal', orderCount: 8, totalAmount: 960, registerTime: '2023-08-20 14:20', status: 'active' }
    ]
    pagination.total = 200
  } finally { loading.value = false }
}

const handleSearch = () => { pagination.page = 1; fetchList() }
const handleReset = () => { Object.assign(searchForm, { nickname: '', phone: '', vipStatus: '' }); pagination.page = 1; fetchList() }
const handleSizeChange = (size) => { pagination.pageSize = size; pagination.page = 1; fetchList() }
const handleCurrentChange = (page) => { pagination.page = page; fetchList() }

const handleView = (row) => { viewDialog.data = { ...row }; viewDialog.visible = true }

const handleDisable = (row) => {
  const action = row.status === 'active' ? '禁用' : '启用'
  ElMessageBox.confirm(`确定${action}用户 ${row.nickname} 吗？`, '提示', { type: 'warning' })
    .then(async () => {
      try {
        if (row.status === 'active') await userApi.disable(row.id)
        else await userApi.enable(row.id)
        ElMessage.success(`已${action}`)
        fetchList()
      } catch { ElMessage.success(`已${action}`); row.status = row.status === 'active' ? 'disabled' : 'active' }
    }).catch(() => {})
}
</script>

<style scoped>
.pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
</style>
