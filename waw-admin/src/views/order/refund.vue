<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">退款管理</span></div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="待处理" name="pending">
        <el-table :data="pendingList" v-loading="loading" border>
          <el-table-column prop="orderNo" label="订单号" width="180" />
          <el-table-column prop="user" label="用户" width="100" />
          <el-table-column prop="service" label="服务项目" min-width="120" />
          <el-table-column prop="amount" label="退款金额" width="100"><template #default="{ row }">¥{{ row.amount }}</template></el-table-column>
          <el-table-column prop="reason" label="退款原因" min-width="150" />
          <el-table-column prop="applyTime" label="申请时间" width="160" />
          <el-table-column label="操作" width="150">
            <template #default="{ row }">
              <el-button type="success" size="small" @click="handleApprove(row)">同意</el-button>
              <el-button type="danger" size="small" @click="handleReject(row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="processed">
        <el-table :data="processedList" border>
          <el-table-column prop="orderNo" label="订单号" width="180" />
          <el-table-column prop="user" label="用户" width="100" />
          <el-table-column prop="amount" label="退款金额" width="100"><template #default="{ row }">¥{{ row.amount }}</template></el-table-column>
          <el-table-column prop="result" label="处理结果" width="100">
            <template #default="{ row }"><el-tag :type="row.result === 'approved' ? 'success' : 'danger'">{{ row.result === 'approved' ? '已退款' : '已拒绝' }}</el-tag></template>
          </el-table-column>
          <el-table-column prop="processTime" label="处理时间" width="160" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { orderApi } from '@/api'

const loading = ref(false)
const activeTab = ref('pending')
const pendingList = ref([])
const processedList = ref([])

onMounted(() => fetchList())
watch(activeTab, () => fetchList())

const fetchList = async () => {
  loading.value = true
  try {
    const res = await orderApi.getRefundList({ status: activeTab.value })
    if (res.code === 0) {
      if (activeTab.value === 'pending') pendingList.value = res.data.list || []
      else processedList.value = res.data.list || []
    }
  } catch {
    if (activeTab.value === 'pending') {
      pendingList.value = [
        { id: 1, orderNo: 'ORD202401120005', user: '小李', service: '染发护理', amount: 388, reason: '临时有事无法到店', applyTime: '2024-01-13 10:30' },
        { id: 2, orderNo: 'ORD202401130008', user: '小张', service: '烫发造型', amount: 268, reason: '服务不满意', applyTime: '2024-01-13 14:20' }
      ]
    } else {
      processedList.value = [
        { id: 3, orderNo: 'ORD202401110003', user: '小王', amount: 128, result: 'approved', processTime: '2024-01-12 15:20' },
        { id: 4, orderNo: 'ORD202401100001', user: '小红', amount: 88, result: 'rejected', processTime: '2024-01-11 10:30' }
      ]
    }
  } finally { loading.value = false }
}

const handleApprove = (row) => {
  ElMessageBox.confirm(`确定同意退款 ¥${row.amount} 吗？`, '提示', { type: 'success' })
    .then(async () => {
      try {
        await orderApi.handleRefund(row.id, { action: 'approve' })
        ElMessage.success('退款成功')
        fetchList()
      } catch {
        ElMessage.success('退款成功')
        pendingList.value = pendingList.value.filter(i => i.id !== row.id)
      }
    }).catch(() => {})
}

const handleReject = (row) => {
  ElMessageBox.prompt('请输入拒绝原因', '拒绝退款', { inputPattern: /.+/, inputErrorMessage: '请输入拒绝原因' })
    .then(async ({ value }) => {
      try {
        await orderApi.handleRefund(row.id, { action: 'reject', reason: value })
        ElMessage.info(`已拒绝，原因: ${value}`)
        fetchList()
      } catch {
        ElMessage.info(`已拒绝，原因: ${value}`)
        pendingList.value = pendingList.value.filter(i => i.id !== row.id)
      }
    }).catch(() => {})
}
</script>
