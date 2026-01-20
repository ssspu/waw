<template>
  <div class="page-container">
    <div class="page-header">
      <h2>订单收入</h2>
    </div>

    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">¥{{ stats.todayIncome }}</div>
            <div class="stat-label">今日收入</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">¥{{ stats.weekIncome }}</div>
            <div class="stat-label">本周收入</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">¥{{ stats.monthIncome }}</div>
            <div class="stat-label">本月收入</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">{{ stats.orderCount }}</div>
            <div class="stat-label">本月订单数</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>收入明细</span>
          <el-button type="primary" size="small" @click="handleExport">导出报表</el-button>
        </div>
      </template>
      <div class="search-form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="收入类型">
            <el-select v-model="searchForm.type" placeholder="全部" clearable>
              <el-option label="服务收入" :value="1" />
              <el-option label="分销收入" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="商家">
            <el-input v-model="searchForm.merchant" placeholder="商家名称" clearable />
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker v-model="searchForm.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="incomeList" stripe show-summary :summary-method="getSummary">
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column prop="merchantName" label="商家" />
        <el-table-column prop="serviceName" label="服务名称" />
        <el-table-column prop="type" label="收入类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === 1 ? '' : 'success'">
              {{ row.type === 1 ? '服务收入' : '分销收入' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="订单金额" width="120">
          <template #default="{ row }">¥{{ row.amount }}</template>
        </el-table-column>
        <el-table-column prop="platformFee" label="平台费用" width="100">
          <template #default="{ row }">¥{{ row.platformFee }}</template>
        </el-table-column>
        <el-table-column prop="income" label="实际收入" width="120">
          <template #default="{ row }">
            <span style="color: #67c23a; font-weight: bold;">¥{{ row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="时间" width="180" />
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const stats = ref({
  todayIncome: 3580,
  weekIncome: 18600,
  monthIncome: 68500,
  orderCount: 256
})

const searchForm = ref({
  type: '',
  merchant: '',
  dateRange: []
})

const incomeList = ref([
  { orderNo: 'ORD202401001', merchantName: '时尚造型店', serviceName: '精剪造型', type: 1, amount: 168, platformFee: 16.8, income: 151.2, createTime: '2024-01-20 14:30:00' },
  { orderNo: 'ORD202401002', merchantName: '美丽人生', serviceName: '染发护理', type: 1, amount: 388, platformFee: 38.8, income: 349.2, createTime: '2024-01-20 12:00:00' },
  { orderNo: 'ORD202401003', merchantName: '时尚造型店', serviceName: '烫发造型', type: 2, amount: 458, platformFee: 45.8, income: 412.2, createTime: '2024-01-20 10:00:00' },
  { orderNo: 'ORD202401004', merchantName: '潮流发型', serviceName: '头皮护理', type: 1, amount: 128, platformFee: 12.8, income: 115.2, createTime: '2024-01-19 16:00:00' }
])

const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 100
})

const handleSearch = () => {
  // 搜索收入明细
}

const handleExport = () => {
  ElMessage.success('报表导出中...')
}

const getSummary = ({ columns, data }) => {
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    if (['amount', 'platformFee', 'income'].includes(column.property)) {
      const values = data.map(item => Number(item[column.property]))
      sums[index] = '¥' + values.reduce((prev, curr) => prev + curr, 0).toFixed(2)
    } else {
      sums[index] = ''
    }
  })
  return sums
}
</script>

<style scoped lang="scss">
.page-header {
  margin-bottom: 20px;
}
.stat-cards {
  .stat-item {
    text-align: center;
    .stat-value {
      font-size: 28px;
      font-weight: bold;
      color: var(--el-color-primary);
    }
    .stat-label {
      font-size: 14px;
      color: #999;
      margin-top: 8px;
    }
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-form {
  margin-bottom: 20px;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
