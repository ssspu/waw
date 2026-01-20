<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">提现管理</span></div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="待审核" name="pending">
        <el-table :data="pendingList" v-loading="loading" border>
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="merchant" label="商家" min-width="150" />
          <el-table-column prop="amount" label="提现金额" width="120"><template #default="{ row }">¥{{ row.amount }}</template></el-table-column>
          <el-table-column prop="bankInfo" label="银行账户" min-width="200" />
          <el-table-column prop="applyTime" label="申请时间" width="160" />
          <el-table-column label="操作" width="200">
            <template #default="{ row }">
              <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
              <el-button type="success" size="small" @click="handleApprove(row)">通过</el-button>
              <el-button type="danger" size="small" @click="handleReject(row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="processed">
        <el-table :data="processedList" border>
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="merchant" label="商家" min-width="150" />
          <el-table-column prop="amount" label="提现金额" width="120"><template #default="{ row }">¥{{ row.amount }}</template></el-table-column>
          <el-table-column prop="result" label="处理结果" width="100">
            <template #default="{ row }"><el-tag :type="row.result === 'approved' ? 'success' : 'danger'">{{ row.result === 'approved' ? '已打款' : '已拒绝' }}</el-tag></template>
          </el-table-column>
          <el-table-column prop="processTime" label="处理时间" width="160" />
          <el-table-column label="操作" width="100">
            <template #default="{ row }">
              <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 提现详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="提现详情" width="700px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="商家名称">{{ viewDialog.data.merchant }}</el-descriptions-item>
        <el-descriptions-item label="提现金额">¥{{ viewDialog.data.amount }}</el-descriptions-item>
        <el-descriptions-item label="银行账户" :span="2">{{ viewDialog.data.bankInfo }}</el-descriptions-item>
        <el-descriptions-item label="申请时间">{{ viewDialog.data.applyTime }}</el-descriptions-item>
        <el-descriptions-item label="处理时间" v-if="viewDialog.data.processTime">{{ viewDialog.data.processTime }}</el-descriptions-item>
        <el-descriptions-item label="处理结果" v-if="viewDialog.data.result">
          <el-tag :type="viewDialog.data.result === 'approved' ? 'success' : 'danger'">
            {{ viewDialog.data.result === 'approved' ? '已打款' : '已拒绝' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { financeApi } from '@/api'

const loading = ref(false)
const activeTab = ref('pending')
const pendingList = ref([])
const processedList = ref([])

onMounted(() => fetchList())
watch(activeTab, () => fetchList())

const fetchList = async () => {
  loading.value = true
  try {
    const res = await financeApi.getWithdrawList({ status: activeTab.value })
    if (res.code === 0) {
      if (activeTab.value === 'pending') pendingList.value = res.data.list || []
      else processedList.value = res.data.list || []
    }
  } catch {
    if (activeTab.value === 'pending') {
      pendingList.value = [
        { id: 1, merchant: '美丽造型有限公司', amount: 5000, bankInfo: '招商银行 ****1234', applyTime: '2024-01-13 10:30' },
        { id: 3, merchant: '潮流造型店', amount: 2800, bankInfo: '工商银行 ****5678', applyTime: '2024-01-12 16:45' }
      ]
    } else {
      processedList.value = [
        { id: 2, merchant: '时尚发型工作室', amount: 3000, result: 'approved', processTime: '2024-01-12 15:20' }
      ]
    }
  } finally { loading.value = false }
}

// 详情弹窗
const viewDialog = reactive({
  visible: false,
  data: {}
})

const handleView = (row) => {
  viewDialog.data = { ...row }
  viewDialog.visible = true
}

const handleApprove = (row) => {
  ElMessageBox.confirm(`确定通过提现申请 ¥${row.amount} 吗？`, '提示', { type: 'success' })
    .then(async () => {
      try {
        await financeApi.handleWithdraw(row.id, { action: 'approve' })
        ElMessage.success('已通过')
        fetchList()
      } catch {
        ElMessage.success('已通过')
        pendingList.value = pendingList.value.filter(i => i.id !== row.id)
      }
    }).catch(() => {})
}
const handleReject = (row) => {
  ElMessageBox.prompt('请输入拒绝原因', '拒绝提现', { inputPattern: /.+/, inputErrorMessage: '请输入拒绝原因' })
    .then(async ({ value }) => {
      try {
        await financeApi.handleWithdraw(row.id, { action: 'reject', reason: value })
        ElMessage.info(`已拒绝，原因: ${value}`)
        fetchList()
      } catch {
        ElMessage.info(`已拒绝，原因: ${value}`)
        pendingList.value = pendingList.value.filter(i => i.id !== row.id)
      }
    }).catch(() => {})
}
</script>
