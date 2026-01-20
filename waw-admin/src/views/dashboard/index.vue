<template>
  <div class="dashboard-container">
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-title">今日订单</div>
        <div class="stat-value">{{ stats.todayOrders }}</div>
        <div class="stat-change up">较昨日 +12%</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">今日收入</div>
        <div class="stat-value">¥{{ stats.todayIncome }}</div>
        <div class="stat-change up">较昨日 +8%</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">活跃用户</div>
        <div class="stat-value">{{ stats.activeUsers }}</div>
        <div class="stat-change down">较昨日 -3%</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">新增商家</div>
        <div class="stat-value">{{ stats.newMerchants }}</div>
        <div class="stat-change up">较昨日 +5%</div>
      </div>
    </div>

    <el-row :gutter="20">
      <el-col :span="16">
        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">订单趋势</span>
            <el-radio-group v-model="chartPeriod" size="small">
              <el-radio-button label="week">近7天</el-radio-button>
              <el-radio-button label="month">近30天</el-radio-button>
            </el-radio-group>
          </div>
          <div class="chart-placeholder">
            <el-empty description="图表区域" />
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">服务分布</span>
          </div>
          <div class="chart-placeholder">
            <el-empty description="图表区域" />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <div class="list-card">
          <div class="card-header">
            <span class="card-title">待审核入驻</span>
            <el-button type="primary" link>查看全部</el-button>
          </div>
          <el-table :data="pendingAudits" style="width: 100%">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="type" label="类型" width="100" />
            <el-table-column prop="time" label="申请时间" width="160" />
            <el-table-column label="操作" width="100">
              <template #default>
                <el-button type="primary" link size="small">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="list-card">
          <div class="card-header">
            <span class="card-title">最新订单</span>
            <el-button type="primary" link>查看全部</el-button>
          </div>
          <el-table :data="recentOrders" style="width: 100%">
            <el-table-column prop="orderNo" label="订单号" />
            <el-table-column prop="service" label="服务" width="120" />
            <el-table-column prop="amount" label="金额" width="100" />
            <el-table-column prop="status" label="状态" width="80">
              <template #default="{ row }">
                <el-tag :type="row.statusType" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const chartPeriod = ref('week')

const stats = reactive({
  todayOrders: 156,
  todayIncome: '12,580',
  activeUsers: 2341,
  newMerchants: 8
})

const pendingAudits = ref([
  { name: '张三设计师', type: '设计师', time: '2024-01-13 10:30' },
  { name: '美丽造型', type: '品牌馆', time: '2024-01-13 09:15' },
  { name: '李四设计师', type: '设计师', time: '2024-01-12 18:20' }
])

const recentOrders = ref([
  { orderNo: 'ORD202401130001', service: '精剪造型', amount: '¥128', status: '已完成', statusType: 'success' },
  { orderNo: 'ORD202401130002', service: '染发护理', amount: '¥388', status: '进行中', statusType: 'warning' },
  { orderNo: 'ORD202401130003', service: '烫发造型', amount: '¥268', status: '待确认', statusType: 'info' }
])
</script>

<style lang="scss" scoped>
.dashboard-container {
  .stat-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;

    .stat-card {
      padding: 24px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

      .stat-title {
        font-size: 14px;
        color: #909399;
        margin-bottom: 12px;
      }

      .stat-value {
        font-size: 32px;
        font-weight: 600;
        color: #303133;
      }

      .stat-change {
        font-size: 12px;
        margin-top: 10px;

        &.up { color: #67c23a; }
        &.down { color: #f56c6c; }
      }
    }
  }

  .chart-card, .list-card {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .card-title {
        font-size: 16px;
        font-weight: 600;
        color: #303133;
      }
    }

    .chart-placeholder {
      height: 280px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
