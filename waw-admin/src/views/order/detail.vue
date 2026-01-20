<template>
  <div class="page-container">
    <div class="page-header">
      <el-page-header @back="goBack" content="订单详情" />
    </div>

    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>订单信息</span>
          <el-tag :type="getStatusType(orderInfo.status)">{{ getStatusText(orderInfo.status) }}</el-tag>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="订单号">{{ orderInfo.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="下单时间">{{ orderInfo.createTime }}</el-descriptions-item>
        <el-descriptions-item label="用户昵称">{{ orderInfo.userName }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ orderInfo.phone }}</el-descriptions-item>
        <el-descriptions-item label="预约时间">{{ orderInfo.appointTime }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ orderInfo.remark || '无' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="detail-card">
      <template #header>服务信息</template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="服务名称">{{ orderInfo.serviceName }}</el-descriptions-item>
        <el-descriptions-item label="服务类型">{{ orderInfo.serviceType }}</el-descriptions-item>
        <el-descriptions-item label="服务店铺">{{ orderInfo.shopName }}</el-descriptions-item>
        <el-descriptions-item label="服务技师">{{ orderInfo.technicianName }}</el-descriptions-item>
        <el-descriptions-item label="服务时长">{{ orderInfo.duration }}分钟</el-descriptions-item>
        <el-descriptions-item label="服务地址">{{ orderInfo.address }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="detail-card">
      <template #header>支付信息</template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="服务金额">¥{{ orderInfo.serviceAmount }}</el-descriptions-item>
        <el-descriptions-item label="优惠金额">¥{{ orderInfo.discountAmount }}</el-descriptions-item>
        <el-descriptions-item label="实付金额">
          <span style="color: #f56c6c; font-weight: bold;">¥{{ orderInfo.payAmount }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="支付方式">{{ orderInfo.payType }}</el-descriptions-item>
        <el-descriptions-item label="支付时间">{{ orderInfo.payTime || '-' }}</el-descriptions-item>
        <el-descriptions-item label="交易流水号">{{ orderInfo.transactionNo || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="detail-card">
      <template #header>操作记录</template>
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in operationLogs"
          :key="index"
          :timestamp="item.time"
          placement="top"
        >
          <el-card>
            <h4>{{ item.action }}</h4>
            <p>操作人：{{ item.operator }}</p>
            <p v-if="item.remark">备注：{{ item.remark }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <div class="action-bar" v-if="orderInfo.status === 1">
      <el-button @click="handleCancel">取消订单</el-button>
      <el-button type="danger" @click="handleRefund">退款处理</el-button>
      <el-button type="primary" @click="handleAddRemark">添加备注</el-button>
    </div>

    <el-dialog v-model="remarkDialogVisible" title="添加备注" width="400px">
      <el-input v-model="remarkContent" type="textarea" :rows="4" placeholder="请输入备注内容" />
      <template #footer>
        <el-button @click="remarkDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRemark">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()

const orderInfo = ref({
  orderNo: 'ORD202401001',
  createTime: '2024-01-20 10:30:00',
  userName: '张三',
  phone: '138****8888',
  appointTime: '2024-01-20 14:00',
  remark: '',
  status: 2,
  serviceName: '精剪造型',
  serviceType: '剪发',
  shopName: '时尚造型店',
  technicianName: '设计师小王',
  duration: 60,
  address: '北京市朝阳区xxx路xxx号',
  serviceAmount: 168,
  discountAmount: 20,
  payAmount: 148,
  payType: '微信支付',
  payTime: '2024-01-20 10:35:00',
  transactionNo: 'WX202401200001'
})

const operationLogs = ref([
  { time: '2024-01-20 14:30:00', action: '服务完成', operator: '设计师小王', remark: '' },
  { time: '2024-01-20 14:00:00', action: '开始服务', operator: '设计师小王', remark: '' },
  { time: '2024-01-20 10:35:00', action: '支付成功', operator: '系统', remark: '' },
  { time: '2024-01-20 10:30:00', action: '创建订单', operator: '用户', remark: '' }
])

const remarkDialogVisible = ref(false)
const remarkContent = ref('')

const getStatusType = (status) => {
  const types = { 0: 'info', 1: 'warning', 2: '', 3: 'success', 4: 'danger', 5: 'danger' }
  return types[status] || 'info'
}

const getStatusText = (status) => {
  const texts = { 0: '待支付', 1: '待服务', 2: '服务中', 3: '已完成', 4: '已取消', 5: '退款中' }
  return texts[status] || '未知'
}

const goBack = () => {
  router.back()
}

const handleCancel = () => {
  ElMessageBox.confirm('确定取消该订单吗？', '提示', { type: 'warning' })
    .then(() => {
      ElMessage.success('订单已取消')
    })
}

const handleRefund = () => {
  ElMessageBox.confirm('确定对该订单进行退款处理吗？', '提示', { type: 'warning' })
    .then(() => {
      ElMessage.success('退款申请已提交')
    })
}

const handleAddRemark = () => {
  remarkContent.value = ''
  remarkDialogVisible.value = true
}

const submitRemark = () => {
  if (!remarkContent.value.trim()) {
    ElMessage.warning('请输入备注内容')
    return
  }
  ElMessage.success('备注添加成功')
  remarkDialogVisible.value = false
}

onMounted(() => {
  // 根据 route.query.id 获取订单详情
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
.action-bar {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}
</style>
