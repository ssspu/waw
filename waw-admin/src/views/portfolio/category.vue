<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">作品分类</span>
      <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增分类</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="分类名称" min-width="150" />
        <el-table-column prop="worksCount" label="作品数" width="100" />
        <el-table-column prop="sort" label="排序" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch v-model="row.status" active-value="active" inactive-value="inactive" />
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
  { id: 1, name: '女性', worksCount: 256, sort: 1, status: 'active' },
  { id: 2, name: '男性', worksCount: 128, sort: 2, status: 'active' },
  { id: 3, name: '儿童', worksCount: 45, sort: 3, status: 'active' }
])

const handleAdd = () => { ElMessage.info('新增分类') }
const handleEdit = (row) => { ElMessage.info(`编辑: ${row.name}`) }
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除分类 ${row.name} 吗？`, '提示', { type: 'warning' })
    .then(() => ElMessage.success('删除成功')).catch(() => {})
}
</script>
