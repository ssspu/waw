<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">会员管理</span></div>
    <div class="stat-cards">
      <div class="stat-card"><div class="stat-title">VIP会员总数</div><div class="stat-value">{{ stats.totalVip }}</div></div>
      <div class="stat-card"><div class="stat-title">本月新增</div><div class="stat-value">{{ stats.monthNew }}</div></div>
      <div class="stat-card"><div class="stat-title">即将到期</div><div class="stat-value">{{ stats.expiring }}</div></div>
      <div class="stat-card"><div class="stat-title">会员收入</div><div class="stat-value">¥{{ stats.income }}</div></div>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="nickname" label="用户昵称" min-width="120" />
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column prop="vipLevel" label="会员等级" width="100">
          <template #default="{ row }"><el-tag type="warning">{{ row.vipLevel }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="startTime" label="开通时间" width="160" />
        <el-table-column prop="expireTime" label="到期时间" width="160" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">{{ row.status === 'active' ? '有效' : '已过期' }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize" :total="pagination.total" layout="total, sizes, prev, pager, next" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const stats = reactive({ totalVip: 1256, monthNew: 89, expiring: 45, income: '125,800' })
const pagination = reactive({ page: 1, pageSize: 10, total: 100 })

const tableData = ref([
  { id: 1, nickname: '小明', phone: '138****1234', vipLevel: '黄金会员', startTime: '2024-01-01', expireTime: '2025-01-01', status: 'active' },
  { id: 2, nickname: '小红', phone: '139****5678', vipLevel: '白银会员', startTime: '2023-06-15', expireTime: '2024-06-15', status: 'active' }
])
</script>
