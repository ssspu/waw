<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">商家认证审核</span></div>
    <el-tabs v-model="activeTab" @tab-change="handleTabChange">
      <el-tab-pane label="待审核" name="pending">
        <el-table :data="pendingList" v-loading="loading" border>
          <el-table-column prop="shopName" label="店铺名称" min-width="150" />
          <el-table-column prop="brandType" label="店铺类型" width="120">
            <template #default="{ row }">
              <el-tag :type="row.brandType === 'store' ? 'primary' : 'success'">
                {{ row.brandType === 'store' ? '门店商家' : '个人设计师' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="legalPersonName" label="法人" width="100" />
          <el-table-column prop="idCardNumber" label="身份证号" width="180">
            <template #default="{ row }">
              {{ maskIdCard(row.idCardNumber) }}
            </template>
          </el-table-column>
          <el-table-column prop="contactPhone" label="联系电话" width="120" />
          <el-table-column prop="shopAddress" label="店铺地址" min-width="200" show-overflow-tooltip />
          <el-table-column prop="submittedAt" label="申请时间" width="160" />
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" size="small" @click="handleView(row)">查看详情</el-button>
              <el-button type="success" size="small" @click="handleApprove(row)">通过</el-button>
              <el-button type="danger" size="small" @click="handleReject(row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="pagination.total > 0"
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="fetchList"
          @current-change="fetchList"
          style="margin-top: 20px; justify-content: flex-end;"
        />
      </el-tab-pane>
      <el-tab-pane label="已通过" name="approved">
        <el-table :data="approvedList" border>
          <el-table-column prop="shopName" label="店铺名称" min-width="150" />
          <el-table-column prop="brandType" label="店铺类型" width="120">
            <template #default="{ row }">
              <el-tag :type="row.brandType === 'store' ? 'primary' : 'success'">
                {{ row.brandType === 'store' ? '门店商家' : '个人设计师' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="legalPersonName" label="法人" width="100" />
          <el-table-column prop="contactPhone" label="联系电话" width="120" />
          <el-table-column prop="reviewedAt" label="审核时间" width="160" />
          <el-table-column label="操作" width="120">
            <template #default="{ row }">
              <el-button type="primary" size="small" link @click="handleView(row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="pagination.total > 0"
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="fetchList"
          @current-change="fetchList"
          style="margin-top: 20px; justify-content: flex-end;"
        />
      </el-tab-pane>
      <el-tab-pane label="已拒绝" name="rejected">
        <el-table :data="rejectedList" border>
          <el-table-column prop="shopName" label="店铺名称" min-width="150" />
          <el-table-column prop="brandType" label="店铺类型" width="120">
            <template #default="{ row }">
              <el-tag :type="row.brandType === 'store' ? 'primary' : 'success'">
                {{ row.brandType === 'store' ? '门店商家' : '个人设计师' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="legalPersonName" label="法人" width="100" />
          <el-table-column prop="rejectReason" label="拒绝原因" min-width="200" show-overflow-tooltip />
          <el-table-column prop="reviewedAt" label="审核时间" width="160" />
          <el-table-column label="操作" width="120">
            <template #default="{ row }">
              <el-button type="primary" size="small" link @click="handleView(row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="pagination.total > 0"
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="fetchList"
          @current-change="fetchList"
          style="margin-top: 20px; justify-content: flex-end;"
        />
      </el-tab-pane>
    </el-tabs>

    <!-- 详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="商家认证详情" width="800px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="店铺名称" :span="2">{{ viewDialog.data.shopName }}</el-descriptions-item>
        <el-descriptions-item label="店铺类型">
          <el-tag :type="viewDialog.data.brandType === 'store' ? 'primary' : 'success'">
            {{ viewDialog.data.brandType === 'store' ? '门店商家' : '个人设计师' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="认证状态">
          <el-tag :type="getStatusType(viewDialog.data.status)">
            {{ getStatusText(viewDialog.data.status) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="店铺地址" :span="2">{{ viewDialog.data.shopAddress }}</el-descriptions-item>
        <el-descriptions-item label="经纬度" :span="2">
          {{ viewDialog.data.longitude }}, {{ viewDialog.data.latitude }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ viewDialog.data.contactPhone }}</el-descriptions-item>
        <el-descriptions-item label="法人姓名">{{ viewDialog.data.legalPersonName }}</el-descriptions-item>
        <el-descriptions-item label="身份证号" :span="2">{{ viewDialog.data.idCardNumber }}</el-descriptions-item>
        <el-descriptions-item label="申请时间" :span="2">{{ viewDialog.data.submittedAt }}</el-descriptions-item>
        <el-descriptions-item v-if="viewDialog.data.reviewedAt" label="审核时间" :span="2">
          {{ viewDialog.data.reviewedAt }}
        </el-descriptions-item>
        <el-descriptions-item v-if="viewDialog.data.rejectReason" label="拒绝原因" :span="2">
          <el-text type="danger">{{ viewDialog.data.rejectReason }}</el-text>
        </el-descriptions-item>
        <el-descriptions-item label="营业执照" :span="2">
          <el-image
            v-if="viewDialog.data.businessLicense"
            :src="viewDialog.data.businessLicense"
            style="width: 300px; cursor: pointer;"
            fit="contain"
            :preview-src-list="[viewDialog.data.businessLicense]"
            preview-teleported
          />
          <span v-else>暂无</span>
        </el-descriptions-item>
        <el-descriptions-item label="身份证正面">
          <el-image
            v-if="viewDialog.data.idCardFront"
            :src="viewDialog.data.idCardFront"
            style="width: 200px; cursor: pointer;"
            fit="contain"
            :preview-src-list="[viewDialog.data.idCardFront]"
            preview-teleported
          />
          <span v-else>暂无</span>
        </el-descriptions-item>
        <el-descriptions-item label="身份证反面">
          <el-image
            v-if="viewDialog.data.idCardBack"
            :src="viewDialog.data.idCardBack"
            style="width: 200px; cursor: pointer;"
            fit="contain"
            :preview-src-list="[viewDialog.data.idCardBack]"
            preview-teleported
          />
          <span v-else>暂无</span>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer v-if="viewDialog.data.status === 'pending'">
        <el-button @click="viewDialog.visible = false">取消</el-button>
        <el-button type="danger" @click="handleReject(viewDialog.data)">拒绝</el-button>
        <el-button type="success" @click="handleApprove(viewDialog.data)">通过</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { merchantApi } from '@/api'

const loading = ref(false)
const activeTab = ref('pending')
const pendingList = ref([])
const approvedList = ref([])
const rejectedList = ref([])

const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0
})

const viewDialog = reactive({
  visible: false,
  data: {}
})

onMounted(() => fetchList())

const handleTabChange = () => {
  pagination.page = 1
  fetchList()
}

const fetchList = async () => {
  loading.value = true
  try {
    const res = await merchantApi.getAuthList({
      status: activeTab.value,
      page: pagination.page,
      pageSize: pagination.pageSize
    })

    if (res.code === 0) {
      const data = res.data || {}
      pagination.total = data.total || 0

      if (activeTab.value === 'pending') {
        pendingList.value = data.items || []
      } else if (activeTab.value === 'approved') {
        approvedList.value = data.items || []
      } else {
        rejectedList.value = data.items || []
      }
    }
  } catch (error) {
    console.error('获取列表失败:', error)
    ElMessage.error('获取列表失败')
  } finally {
    loading.value = false
  }
}

const handleView = (row) => {
  viewDialog.data = { ...row }
  viewDialog.visible = true
}

const handleApprove = (row) => {
  ElMessageBox.confirm(
    `确定通过 ${row.shopName} 的认证申请吗？审核通过后将自动创建店铺并升级用户角色为商家。`,
    '审核通过确认',
    {
      type: 'success',
      confirmButtonText: '确定通过',
      cancelButtonText: '取消'
    }
  ).then(async () => {
    try {
      const res = await merchantApi.approveAuth(row.id)
      if (res.code === 0) {
        ElMessage.success('审核通过，店铺已自动创建')
        viewDialog.visible = false
        fetchList()
      } else {
        ElMessage.error(res.message || '审核失败')
      }
    } catch (error) {
      console.error('审核失败:', error)
      ElMessage.error('审核失败')
    }
  }).catch(() => {})
}

const handleReject = (row) => {
  ElMessageBox.prompt(
    '请输入拒绝原因',
    '拒绝申请',
    {
      inputPattern: /.+/,
      inputErrorMessage: '请输入拒绝原因',
      confirmButtonText: '确定拒绝',
      cancelButtonText: '取消'
    }
  ).then(async ({ value }) => {
    try {
      const res = await merchantApi.rejectAuth(row.id, { reason: value })
      if (res.code === 0) {
        ElMessage.info(`已拒绝，原因: ${value}`)
        viewDialog.visible = false
        fetchList()
      } else {
        ElMessage.error(res.message || '拒绝失败')
      }
    } catch (error) {
      console.error('拒绝失败:', error)
      ElMessage.error('拒绝失败')
    }
  }).catch(() => {})
}

const maskIdCard = (idCard) => {
  if (!idCard) return '-'
  return idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '$1********$2')
}

const getStatusType = (status) => {
  const map = {
    'pending': 'warning',
    'approved': 'success',
    'rejected': 'danger'
  }
  return map[status] || 'info'
}

const getStatusText = (status) => {
  const map = {
    'pending': '待审核',
    'approved': '已通过',
    'rejected': '已拒绝'
  }
  return map[status] || '未知'
}
</script>

<style scoped lang="scss">
.page-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;

  .page-title {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
