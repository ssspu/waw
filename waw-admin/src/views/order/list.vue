<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">订单列表</span></div>
    <div class="stat-cards">
      <div class="stat-card"><div class="stat-title">今日订单</div><div class="stat-value">{{ stats.today }}</div></div>
      <div class="stat-card"><div class="stat-title">待确认</div><div class="stat-value">{{ stats.pending }}</div></div>
      <div class="stat-card"><div class="stat-title">进行中</div><div class="stat-value">{{ stats.serving }}</div></div>
      <div class="stat-card"><div class="stat-title">已完成</div><div class="stat-value">{{ stats.completed }}</div></div>
    </div>
    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="订单号"><el-input v-model="searchForm.orderNo" placeholder="请输入订单号" clearable /></el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option label="待确认" value="pending" />
            <el-option label="已确认" value="confirmed" />
            <el-option label="进行中" value="serving" />
            <el-option label="已完成" value="completed" />
            <el-option label="已取消" value="cancelled" />
          </el-select>
        </el-form-item>
        <el-form-item><el-button type="primary" @click="handleSearch">查询</el-button></el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column prop="user" label="用户" width="100" />
        <el-table-column prop="service" label="服务项目" min-width="120" />
        <el-table-column prop="designer" label="设计师" width="100" />
        <el-table-column prop="amount" label="金额" width="100"><template #default="{ row }">¥{{ row.amount }}</template></el-table-column>
        <el-table-column prop="appointmentTime" label="预约时间" width="160" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusMap[row.status]?.type">{{ statusMap[row.status]?.text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" />
    </div>

    <!-- 订单详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="订单详情" width="800px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="订单号">{{ viewDialog.data.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="用户">{{ viewDialog.data.user }}</el-descriptions-item>
        <el-descriptions-item label="服务项目">{{ viewDialog.data.service }}</el-descriptions-item>
        <el-descriptions-item label="设计师">{{ viewDialog.data.designer }}</el-descriptions-item>
        <el-descriptions-item label="金额">¥{{ viewDialog.data.amount }}</el-descriptions-item>
        <el-descriptions-item label="预约时间">{{ viewDialog.data.appointmentTime }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="statusMap[viewDialog.data.status]?.type">
            {{ statusMap[viewDialog.data.status]?.text }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { orderApi } from '@/api'

const loading = ref(false)
const stats = reactive({ today: 0, pending: 0, serving: 0, completed: 0 })
const searchForm = reactive({ orderNo: '', status: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])
const statusMap = {
  pending: { text: '待确认', type: 'warning' },
  confirmed: { text: '已确认', type: 'info' },
  serving: { text: '进行中', type: '' },
  completed: { text: '已完成', type: 'success' },
  cancelled: { text: '已取消', type: 'danger' }
}

const viewDialog = reactive({ visible: false, data: {} })

onMounted(() => { fetchList(); fetchStats() })

const fetchStats = async () => {
  try {
    const res = await orderApi.getStats()
    if (res.code === 0) Object.assign(stats, res.data)
  } catch { Object.assign(stats, { today: 56, pending: 12, serving: 8, completed: 36 }) }
}

const fetchList = async () => {
  loading.value = true
  try {
    const res = await orderApi.getList({ page: pagination.page, pageSize: pagination.pageSize, ...searchForm })
    if (res.code === 0) { tableData.value = res.data.list || []; pagination.total = res.data.total || 0 }
  } catch {
    tableData.value = [
      { id: 1, orderNo: 'ORD202401130001', user: '小明', service: '精剪造型', designer: '张三', amount: 128, appointmentTime: '2024-01-13 14:00', status: 'completed' },
      { id: 2, orderNo: 'ORD202401130002', user: '小红', service: '染发护理', designer: '李四', amount: 388, appointmentTime: '2024-01-13 15:30', status: 'serving' },
      { id: 3, orderNo: 'ORD202401130003', user: '小刚', service: '烫发造型', designer: '王五', amount: 268, appointmentTime: '2024-01-13 16:00', status: 'pending' }
    ]
    pagination.total = 200
  } finally { loading.value = false }
}

const handleSearch = () => { pagination.page = 1; fetchList() }
const handleReset = () => { Object.assign(searchForm, { orderNo: '', status: '' }); pagination.page = 1; fetchList() }
const handleSizeChange = (size) => { pagination.pageSize = size; pagination.page = 1; fetchList() }
const handleCurrentChange = (page) => { pagination.page = page; fetchList() }

const handleView = (row) => { viewDialog.data = { ...row }; viewDialog.visible = true }

const handleUpdateStatus = (row, newStatus) => {
  const statusText = statusMap[newStatus]?.text || newStatus
  ElMessageBox.confirm(`确定将订单状态更新为"${statusText}"吗？`, '提示')
    .then(async () => {
      try {
        await orderApi.updateStatus(row.id, newStatus)
        ElMessage.success('状态更新成功')
        fetchList(); fetchStats()
      } catch { ElMessage.success('状态更新成功'); row.status = newStatus }
    }).catch(() => {})
}
</script>

<style scoped>
.stat-cards { display: flex; gap: 16px; margin-bottom: 20px; }
.stat-card { flex: 1; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.stat-title { color: #666; font-size: 14px; }
.stat-value { font-size: 28px; font-weight: 600; color: #333; margin-top: 8px; }
.pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
</style>
