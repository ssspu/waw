<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">品牌馆入驻审核</span></div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="待审核" name="pending">
        <el-table :data="pendingList" border>
          <el-table-column prop="name" label="品牌名称" />
          <el-table-column prop="contact" label="联系人" width="100" />
          <el-table-column prop="phone" label="联系电话" width="120" />
          <el-table-column prop="address" label="地址" min-width="200" show-overflow-tooltip />
          <el-table-column prop="applyTime" label="申请时间" width="160" />
          <el-table-column label="操作" width="150">
            <template #default="{ row }">
              <el-button type="success" size="small" @click="handleApprove(row)">通过</el-button>
              <el-button type="danger" size="small" @click="handleReject(row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已通过" name="approved">
        <el-table :data="approvedList" border>
          <el-table-column prop="name" label="品牌名称" />
          <el-table-column prop="auditTime" label="审核时间" width="160" />
          <el-table-column prop="auditor" label="审核人" width="100" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已拒绝" name="rejected">
        <el-table :data="rejectedList" border>
          <el-table-column prop="name" label="品牌名称" />
          <el-table-column prop="reason" label="拒绝原因" />
          <el-table-column prop="auditTime" label="审核时间" width="160" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const activeTab = ref('pending')
const pendingList = ref([{ id: 1, name: '潮流造型馆', contact: '王经理', phone: '138****5678', address: '广州市天河区体育西路100号', applyTime: '2024-01-13 09:30' }])
const approvedList = ref([{ id: 2, name: '美丽人生', auditTime: '2024-01-12 14:20', auditor: '管理员' }])
const rejectedList = ref([{ id: 3, name: '时尚前沿', reason: '营业执照不清晰', auditTime: '2024-01-11 10:15' }])

const handleApprove = (row) => {
  ElMessageBox.confirm(`确定通过 ${row.name} 的入驻申请吗？`, '提示', { type: 'success' })
    .then(() => ElMessage.success('审核通过')).catch(() => {})
}
const handleReject = (row) => {
  ElMessageBox.prompt('请输入拒绝原因', '拒绝申请', { inputPattern: /.+/, inputErrorMessage: '请输入拒绝原因' })
    .then(({ value }) => ElMessage.info(`已拒绝，原因: ${value}`)).catch(() => {})
}
</script>
