<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">分销管理</span></div>
    <div class="stat-cards">
      <div class="stat-card"><div class="stat-title">分销员总数</div><div class="stat-value">{{ stats.total }}</div></div>
      <div class="stat-card"><div class="stat-title">本月新增</div><div class="stat-value">{{ stats.monthNew }}</div></div>
      <div class="stat-card"><div class="stat-title">累计佣金</div><div class="stat-value">¥{{ stats.totalCommission }}</div></div>
      <div class="stat-card"><div class="stat-title">待结算</div><div class="stat-value">¥{{ stats.pendingSettlement }}</div></div>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="分销员" min-width="120" />
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column prop="level" label="等级" width="100">
          <template #default="{ row }"><el-tag type="warning">{{ row.level }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="orderCount" label="推广订单" width="100" />
        <el-table-column prop="commission" label="累计佣金" width="100">
          <template #default="{ row }">¥{{ row.commission }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">{{ row.status === 'active' ? '正常' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const stats = reactive({ total: 256, monthNew: 23, totalCommission: '125,800', pendingSettlement: '12,580' })

const tableData = ref([
  { id: 1, name: '小明', phone: '138****1234', level: '金牌分销', orderCount: 56, commission: 2580, status: 'active' },
  { id: 2, name: '小红', phone: '139****5678', level: '银牌分销', orderCount: 23, commission: 960, status: 'active' }
])

const handleView = (row) => { ElMessage.info(`查看: ${row.name}`) }
</script>
