<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">结算管理</span></div>
    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="商家名称"><el-input v-model="searchForm.merchant" placeholder="请输入商家名称" clearable /></el-form-item>
        <el-form-item label="结算状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option label="待结算" value="pending" />
            <el-option label="已结算" value="settled" />
          </el-select>
        </el-form-item>
        <el-form-item><el-button type="primary" @click="handleSearch">查询</el-button></el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="merchant" label="商家" min-width="150" />
        <el-table-column prop="period" label="结算周期" width="200" />
        <el-table-column prop="orderCount" label="订单数" width="100" />
        <el-table-column prop="amount" label="结算金额" width="120"><template #default="{ row }">¥{{ row.amount }}</template></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'settled' ? 'success' : 'warning'">{{ row.status === 'settled' ? '已结算' : '待结算' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button v-if="row.status === 'pending'" type="primary" size="small" @click="handleSettle(row)">结算</el-button>
            <el-button type="primary" link size="small" @click="handleView(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 结算详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="结算详情" width="700px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="商家名称">{{ viewDialog.data.merchant }}</el-descriptions-item>
        <el-descriptions-item label="结算周期">{{ viewDialog.data.period }}</el-descriptions-item>
        <el-descriptions-item label="订单数">{{ viewDialog.data.orderCount }}</el-descriptions-item>
        <el-descriptions-item label="结算金额">¥{{ viewDialog.data.amount }}</el-descriptions-item>
        <el-descriptions-item label="结算状态">
          <el-tag :type="viewDialog.data.status === 'settled' ? 'success' : 'warning'">
            {{ viewDialog.data.status === 'settled' ? '已结算' : '待结算' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const searchForm = reactive({ merchant: '', status: '' })

const tableData = ref([
  { id: 1, merchant: '美丽造型有限公司', period: '2024-01-01 ~ 2024-01-15', orderCount: 156, amount: 25800, status: 'pending' },
  { id: 2, merchant: '时尚发型工作室', period: '2024-01-01 ~ 2024-01-15', orderCount: 89, amount: 12600, status: 'settled' }
])

// 详情弹窗
const viewDialog = reactive({
  visible: false,
  data: {}
})

const handleSearch = () => {}

const handleSettle = (row) => {
  ElMessageBox.confirm(`确定结算 ¥${row.amount} 给 ${row.merchant} 吗？`, '提示', { type: 'success' })
    .then(() => ElMessage.success('结算成功')).catch(() => {})
}

const handleView = (row) => {
  viewDialog.data = { ...row }
  viewDialog.visible = true
}
</script>
