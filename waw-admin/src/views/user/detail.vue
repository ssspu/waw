<template>
  <div class="page-container">
    <div class="page-header">
      <el-page-header @back="goBack" content="用户详情" />
    </div>

    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>基本信息</span>
          <el-button type="primary" size="small" @click="handleEdit">编辑</el-button>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="用户ID">{{ userInfo.id }}</el-descriptions-item>
        <el-descriptions-item label="用户昵称">{{ userInfo.nickname }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ userInfo.phone }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ userInfo.gender === 1 ? '男' : '女' }}</el-descriptions-item>
        <el-descriptions-item label="会员等级">
          <el-tag :type="userInfo.vipLevel > 0 ? 'warning' : 'info'">
            {{ userInfo.vipLevel > 0 ? 'VIP' + userInfo.vipLevel : '普通用户' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="积分">{{ userInfo.points }}</el-descriptions-item>
        <el-descriptions-item label="注册时间">{{ userInfo.createTime }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="userInfo.status === 1 ? 'success' : 'danger'">
            {{ userInfo.status === 1 ? '正常' : '禁用' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="detail-card">
      <template #header>消费记录</template>
      <el-table :data="consumeList" stripe>
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column prop="serviceName" label="服务名称" />
        <el-table-column prop="amount" label="消费金额">
          <template #default="{ row }">¥{{ row.amount }}</template>
        </el-table-column>
        <el-table-column prop="shopName" label="消费店铺" />
        <el-table-column prop="createTime" label="消费时间" width="180" />
      </el-table>
    </el-card>

    <el-card class="detail-card">
      <template #header>优惠券</template>
      <el-table :data="couponList" stripe>
        <el-table-column prop="name" label="优惠券名称" />
        <el-table-column prop="type" label="类型">
          <template #default="{ row }">
            {{ row.type === 1 ? '满减券' : '折扣券' }}
          </template>
        </el-table-column>
        <el-table-column prop="value" label="面值/折扣" />
        <el-table-column prop="expireTime" label="过期时间" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? '未使用' : '已使用' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="detail-card">
      <template #header>收藏记录</template>
      <el-table :data="favoriteList" stripe>
        <el-table-column prop="type" label="类型">
          <template #default="{ row }">
            {{ row.type === 1 ? '店铺' : row.type === 2 ? '服务' : '设计师' }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="createTime" label="收藏时间" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userInfo = ref({
  id: 'U10001',
  nickname: '张三',
  phone: '138****8888',
  gender: 1,
  vipLevel: 2,
  points: 1580,
  createTime: '2024-01-15 10:30:00',
  status: 1
})

const consumeList = ref([
  { orderNo: 'ORD202401001', serviceName: '精剪造型', amount: 128, shopName: '时尚造型店', createTime: '2024-01-20 14:30:00' },
  { orderNo: 'ORD202401002', serviceName: '染发护理', amount: 388, shopName: '时尚造型店', createTime: '2024-01-18 16:00:00' }
])

const couponList = ref([
  { name: '新人优惠券', type: 1, value: '满100减20', expireTime: '2024-03-01', status: 1 },
  { name: '会员折扣券', type: 2, value: '8.5折', expireTime: '2024-02-15', status: 2 }
])

const favoriteList = ref([
  { type: 1, name: '时尚造型店', createTime: '2024-01-10 09:00:00' },
  { type: 3, name: '设计师小王', createTime: '2024-01-12 11:30:00' }
])

const goBack = () => {
  router.back()
}

const handleEdit = () => {
  // 编辑用户信息
}

onMounted(() => {
  // 根据 route.query.id 获取用户详情
})
</script>

<style scoped lang="scss">
.detail-card {
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
