<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">财务概览</span></div>
    <div class="stat-cards">
      <div class="stat-card"><div class="stat-title">总收入</div><div class="stat-value">¥{{ stats.totalIncome }}</div></div>
      <div class="stat-card"><div class="stat-title">本月收入</div><div class="stat-value">¥{{ stats.monthIncome }}</div></div>
      <div class="stat-card"><div class="stat-title">待结算</div><div class="stat-value">¥{{ stats.pendingSettlement }}</div></div>
      <div class="stat-card"><div class="stat-title">已提现</div><div class="stat-value">¥{{ stats.withdrawn }}</div></div>
    </div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="chart-card">
          <div class="card-header"><span class="card-title">收入趋势</span></div>
          <div class="chart-placeholder"><el-empty description="图表区域" /></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-card">
          <div class="card-header"><span class="card-title">收入构成</span></div>
          <div class="chart-placeholder"><el-empty description="图表区域" /></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const stats = reactive({ totalIncome: '1,256,800', monthIncome: '125,800', pendingSettlement: '35,600', withdrawn: '1,100,000' })
</script>

<style lang="scss" scoped>
.stat-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 20px;
  .stat-card { padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    .stat-title { font-size: 14px; color: #909399; margin-bottom: 12px; }
    .stat-value { font-size: 28px; font-weight: 600; color: #303133; }
  }
}
.chart-card { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  .card-header { margin-bottom: 20px; .card-title { font-size: 16px; font-weight: 600; color: #303133; } }
  .chart-placeholder { height: 280px; display: flex; align-items: center; justify-content: center; }
}
</style>
