<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">Banner管理</span>
      <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增Banner</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="image" label="图片" width="200">
          <template #default="{ row }"><el-image :src="row.image" style="width: 160px; height: 80px;" fit="cover" /></template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="150" />
        <el-table-column prop="position" label="位置" width="100" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="status" label="状态" width="80">
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
  { id: 1, image: '', title: '新年特惠活动', position: '首页', sort: 1, status: 'active' },
  { id: 2, image: '', title: '会员专享优惠', position: '首页', sort: 2, status: 'active' }
])

const handleAdd = () => { ElMessage.info('新增Banner') }
const handleEdit = (row) => { ElMessage.info(`编辑: ${row.title}`) }
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除Banner ${row.title} 吗？`, '提示', { type: 'warning' })
    .then(() => ElMessage.success('删除成功')).catch(() => {})
}
</script>
