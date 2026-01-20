<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">优惠券管理</span>
      <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增优惠券</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="优惠券名称" min-width="150" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }"><el-tag>{{ row.type === 'discount' ? '折扣券' : '满减券' }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="value" label="面值" width="100">
          <template #default="{ row }">{{ row.type === 'discount' ? row.value + '折' : '¥' + row.value }}</template>
        </el-table-column>
        <el-table-column prop="total" label="发放数量" width="100" />
        <el-table-column prop="used" label="已使用" width="80" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">{{ row.status === 'active' ? '进行中' : '已结束' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const tableData = ref([
  { id: 1, name: '新人专享券', type: 'reduce', value: 20, total: 1000, used: 356, status: 'active' },
  { id: 2, name: '会员折扣券', type: 'discount', value: 8.5, total: 500, used: 123, status: 'active' }
])

const handleAdd = () => { ElMessage.info('新增优惠券') }
const handleEdit = (row) => { ElMessage.info(`编辑: ${row.name}`) }
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除优惠券 ${row.name} 吗？`, '提示', { type: 'warning' })
    .then(() => ElMessage.success('删除成功')).catch(() => {})
}
</script>
