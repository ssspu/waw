<template>
  <div class="page-container">
    <div class="page-header">
      <h2>积分管理</h2>
    </div>

    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">{{ stats.totalPoints }}</div>
            <div class="stat-label">累计发放积分</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">{{ stats.usedPoints }}</div>
            <div class="stat-label">已使用积分</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">{{ stats.remainPoints }}</div>
            <div class="stat-label">剩余积分</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">{{ stats.expiredPoints }}</div>
            <div class="stat-label">已过期积分</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>积分规则设置</span>
          <el-button type="primary" size="small" @click="handleSaveRules">保存设置</el-button>
        </div>
      </template>
      <el-form :model="rules" label-width="150px">
        <el-form-item label="消费积分比例">
          <el-input-number v-model="rules.consumeRatio" :min="1" :max="100" />
          <span style="margin-left: 10px;">元 = 1 积分</span>
        </el-form-item>
        <el-form-item label="签到积分">
          <el-input-number v-model="rules.signInPoints" :min="0" />
          <span style="margin-left: 10px;">积分/次</span>
        </el-form-item>
        <el-form-item label="积分有效期">
          <el-input-number v-model="rules.validDays" :min="0" />
          <span style="margin-left: 10px;">天（0表示永久有效）</span>
        </el-form-item>
        <el-form-item label="积分抵扣比例">
          <el-input-number v-model="rules.deductRatio" :min="1" :max="1000" />
          <span style="margin-left: 10px;">积分 = 1 元</span>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 20px;">
      <template #header>积分明细</template>
      <div class="search-form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="用户">
            <el-input v-model="searchForm.keyword" placeholder="用户昵称/手机号" clearable />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="searchForm.type" placeholder="全部" clearable>
              <el-option label="获取" :value="1" />
              <el-option label="使用" :value="2" />
              <el-option label="过期" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="pointsList" stripe>
        <el-table-column prop="userId" label="用户ID" width="100" />
        <el-table-column prop="nickname" label="用户昵称" />
        <el-table-column prop="type" label="类型" width="80">
          <template #default="{ row }">
            <el-tag :type="row.type === 1 ? 'success' : row.type === 2 ? 'warning' : 'info'">
              {{ row.type === 1 ? '获取' : row.type === 2 ? '使用' : '过期' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="points" label="积分变动" width="100">
          <template #default="{ row }">
            <span :style="{ color: row.type === 1 ? '#67c23a' : '#f56c6c' }">
              {{ row.type === 1 ? '+' : '-' }}{{ row.points }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="积分余额" width="100" />
        <el-table-column prop="remark" label="备注" />
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
  totalPoints: 158600,
  usedPoints: 45200,
  remainPoints: 98400,
  expiredPoints: 15000
})

const rules = ref({
  consumeRatio: 10,
  signInPoints: 5,
  validDays: 365,
  deductRatio: 100
})

const searchForm = ref({
  keyword: '',
  type: ''
})

const pointsList = ref([
  { userId: 'U10001', nickname: '张三', type: 1, points: 128, balance: 1580, remark: '消费获取', createTime: '2024-01-20 14:30:00' },
  { userId: 'U10002', nickname: '李四', type: 2, points: 500, balance: 2300, remark: '积分抵扣', createTime: '2024-01-20 12:00:00' },
  { userId: 'U10003', nickname: '王五', type: 1, points: 50, balance: 850, remark: '签到获取', createTime: '2024-01-20 09:00:00' },
  { userId: 'U10001', nickname: '张三', type: 3, points: 200, balance: 1452, remark: '积分过期', createTime: '2024-01-19 00:00:00' }
])

const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 100
})

const handleSearch = () => {
  // 搜索积分明细
}

const handleSaveRules = () => {
  ElMessage.success('保存成功')
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
