<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">角色权限</span>
      <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增角色</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" min-width="150" />
        <el-table-column prop="description" label="描述" min-width="200" />
        <el-table-column prop="userCount" label="用户数" width="100" />
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="primary" link size="small" @click="handlePermission(row)">权限</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)" :disabled="row.isSystem">删除</el-button>
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
  { id: 1, name: '超级管理员', description: '拥有所有权限', userCount: 2, createTime: '2023-01-01 00:00', isSystem: true },
  { id: 2, name: '运营管理员', description: '负责日常运营管理', userCount: 5, createTime: '2023-06-15 10:30', isSystem: false },
  { id: 3, name: '财务管理员', description: '负责财务相关操作', userCount: 3, createTime: '2023-08-20 14:20', isSystem: false }
])

const handleAdd = () => { ElMessage.info('新增角色') }
const handleEdit = (row) => { ElMessage.info(`编辑: ${row.name}`) }
const handlePermission = (row) => { ElMessage.info(`配置权限: ${row.name}`) }
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除角色 ${row.name} 吗？`, '提示', { type: 'warning' })
    .then(() => ElMessage.success('删除成功')).catch(() => {})
}
</script>
