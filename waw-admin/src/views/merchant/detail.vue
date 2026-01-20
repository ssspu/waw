<template>
  <div class="page-container">
    <div class="page-header">
      <el-page-header @back="goBack" content="商家详情" />
    </div>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="basic">
        <el-card>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="商家ID">{{ merchantInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="商家名称">{{ merchantInfo.name }}</el-descriptions-item>
            <el-descriptions-item label="联系人">{{ merchantInfo.contact }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ merchantInfo.phone }}</el-descriptions-item>
            <el-descriptions-item label="入驻时间">{{ merchantInfo.createTime }}</el-descriptions-item>
            <el-descriptions-item label="状态">
              <el-tag :type="merchantInfo.status === 1 ? 'success' : 'danger'">
                {{ merchantInfo.status === 1 ? '正常' : '禁用' }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="营业执照" :span="2">
              <el-image :src="merchantInfo.license" style="width: 200px;" :preview-src-list="[merchantInfo.license]" />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="店铺信息" name="shop">
        <el-table :data="shopList" stripe>
          <el-table-column prop="name" label="店铺名称" />
          <el-table-column prop="address" label="地址" />
          <el-table-column prop="phone" label="联系电话" />
          <el-table-column prop="status" label="状态">
            <template #default="{ row }">
              <el-tag :type="row.status === 1 ? 'success' : 'info'">
                {{ row.status === 1 ? '营业中' : '休息中' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="{ row }">
              <el-button type="primary" link @click="viewShop(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="服务信息" name="service">
        <el-table :data="serviceList" stripe>
          <el-table-column prop="name" label="服务名称" />
          <el-table-column prop="category" label="分类" />
          <el-table-column prop="price" label="价格">
            <template #default="{ row }">¥{{ row.price }}</template>
          </el-table-column>
          <el-table-column prop="sales" label="销量" />
          <el-table-column prop="status" label="状态">
            <template #default="{ row }">
              <el-tag :type="row.status === 1 ? 'success' : 'info'">
                {{ row.status === 1 ? '上架' : '下架' }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="技师信息" name="technician">
        <el-table :data="technicianList" stripe>
          <el-table-column prop="name" label="技师姓名" />
          <el-table-column prop="level" label="等级" />
          <el-table-column prop="specialty" label="擅长" />
          <el-table-column prop="orderCount" label="服务订单" />
          <el-table-column prop="rating" label="评分">
            <template #default="{ row }">
              <el-rate v-model="row.rating" disabled />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="财务信息" name="finance">
        <el-row :gutter="20" class="stat-cards">
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="stat-item">
                <div class="stat-value">¥{{ financeInfo.totalIncome }}</div>
                <div class="stat-label">累计收入</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="stat-item">
                <div class="stat-value">¥{{ financeInfo.monthIncome }}</div>
                <div class="stat-label">本月收入</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="stat-item">
                <div class="stat-value">¥{{ financeInfo.balance }}</div>
                <div class="stat-label">账户余额</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="stat-item">
                <div class="stat-value">¥{{ financeInfo.withdrawn }}</div>
                <div class="stat-label">已提现</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const activeTab = ref('basic')

const merchantInfo = ref({
  id: 'M10001',
  name: '时尚造型连锁',
  contact: '王经理',
  phone: '138****8888',
  createTime: '2024-01-01',
  status: 1,
  license: 'https://via.placeholder.com/200x150'
})

const shopList = ref([
  { id: 1, name: '时尚造型(朝阳店)', address: '北京市朝阳区xxx路', phone: '010-12345678', status: 1 },
  { id: 2, name: '时尚造型(海淀店)', address: '北京市海淀区xxx路', phone: '010-87654321', status: 1 }
])

const serviceList = ref([
  { name: '精剪造型', category: '剪发', price: 168, sales: 520, status: 1 },
  { name: '染发护理', category: '染发', price: 388, sales: 280, status: 1 },
  { name: '烫发造型', category: '烫发', price: 458, sales: 150, status: 1 }
])

const technicianList = ref([
  { name: '设计师小王', level: '总监', specialty: '剪发、染发', orderCount: 1200, rating: 4.8 },
  { name: '设计师小李', level: '高级', specialty: '烫发、护理', orderCount: 860, rating: 4.6 }
])

const financeInfo = ref({
  totalIncome: 158600,
  monthIncome: 28500,
  balance: 12800,
  withdrawn: 145800
})

const goBack = () => {
  router.back()
}

const viewShop = (row) => {
  router.push({ path: '/merchant/shop/list', query: { id: row.id } })
}

onMounted(() => {
  // 根据 route.query.id 获取商家详情
})
</script>

<style scoped lang="scss">
.stat-cards {
  margin-top: 20px;
  .stat-item {
    text-align: center;
    .stat-value {
      font-size: 24px;
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
</style>
