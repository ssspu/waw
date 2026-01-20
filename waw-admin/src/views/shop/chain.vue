<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">连锁门店</span></div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="门店名称" min-width="150" />
        <el-table-column prop="address" label="地址" min-width="200" show-overflow-tooltip />
        <el-table-column prop="manager" label="店长" width="100" />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">{{ row.status === 'active' ? '正常' : '停业' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tableData = ref([
  { id: 1, name: '美丽造型-浦东店', address: '上海市浦东新区陆家嘴环路1000号', manager: '张店长', phone: '021-12345678', status: 'active' },
  { id: 2, name: '美丽造型-静安店', address: '上海市静安区南京西路500号', manager: '李店长', phone: '021-87654321', status: 'active' }
])

const handleView = (row) => { ElMessage.info(`查看: ${row.name}`) }
</script>
