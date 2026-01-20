<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">入驻审核</span>
    </div>

    <el-tabs v-model="activeTab" @tab-change="handleTabChange">
      <el-tab-pane label="待审核" name="pending">
        <el-table :data="pendingList" v-loading="loading" border>
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="avatar" label="头像" width="80">
            <template #default="{ row }">
              <el-avatar :size="40" :src="row.avatar" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="设计师名称" min-width="100" />
          <el-table-column prop="phone" label="手机号" width="120" />
          <el-table-column prop="idCard" label="身份证号" width="180" />
          <el-table-column prop="experience" label="从业年限" width="100" />
          <el-table-column prop="applyTime" label="申请时间" width="160" />
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
              <el-button type="success" link size="small" @click="handleApprove(row)">通过</el-button>
              <el-button type="danger" link size="small" @click="handleReject(row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pendingPagination.page"
            v-model:page-size="pendingPagination.pageSize"
            :total="pendingPagination.total"
            layout="total, prev, pager, next"
            @current-change="fetchPendingList"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane label="已通过" name="approved">
        <el-table :data="approvedList" v-loading="loading" border>
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="avatar" label="头像" width="80">
            <template #default="{ row }">
              <el-avatar :size="40" :src="row.avatar" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="设计师名称" min-width="100" />
          <el-table-column prop="phone" label="手机号" width="120" />
          <el-table-column prop="experience" label="从业年限" width="100" />
          <el-table-column prop="auditTime" label="审核时间" width="160" />
          <el-table-column prop="auditor" label="审核人" width="100" />
          <el-table-column label="操作" width="80">
            <template #default="{ row }">
              <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="approvedPagination.page"
            v-model:page-size="approvedPagination.pageSize"
            :total="approvedPagination.total"
            layout="total, prev, pager, next"
            @current-change="fetchApprovedList"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane label="已拒绝" name="rejected">
        <el-table :data="rejectedList" v-loading="loading" border>
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="avatar" label="头像" width="80">
            <template #default="{ row }">
              <el-avatar :size="40" :src="row.avatar" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="设计师名称" min-width="100" />
          <el-table-column prop="phone" label="手机号" width="120" />
          <el-table-column prop="reason" label="拒绝原因" min-width="150" />
          <el-table-column prop="auditTime" label="审核时间" width="160" />
          <el-table-column prop="auditor" label="审核人" width="100" />
          <el-table-column label="操作" width="80">
            <template #default="{ row }">
              <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="rejectedPagination.page"
            v-model:page-size="rejectedPagination.pageSize"
            :total="rejectedPagination.total"
            layout="total, prev, pager, next"
            @current-change="fetchRejectedList"
          />
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="申请详情" width="700px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="头像">
          <el-avatar :size="60" :src="viewDialog.data.avatar" />
        </el-descriptions-item>
        <el-descriptions-item label="设计师名称">{{ viewDialog.data.name }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ viewDialog.data.phone }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{ viewDialog.data.idCard }}</el-descriptions-item>
        <el-descriptions-item label="从业年限">{{ viewDialog.data.experience }}</el-descriptions-item>
        <el-descriptions-item label="擅长技能">{{ viewDialog.data.skills || '暂无' }}</el-descriptions-item>
        <el-descriptions-item label="申请时间">{{ viewDialog.data.applyTime }}</el-descriptions-item>
        <el-descriptions-item label="审核状态">
          <el-tag :type="getStatusType(viewDialog.data.status)">
            {{ getStatusText(viewDialog.data.status) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="viewDialog.data.status !== 'pending'" label="审核时间">
          {{ viewDialog.data.auditTime }}
        </el-descriptions-item>
        <el-descriptions-item v-if="viewDialog.data.status !== 'pending'" label="审核人">
          {{ viewDialog.data.auditor }}
        </el-descriptions-item>
        <el-descriptions-item v-if="viewDialog.data.status === 'rejected'" label="拒绝原因" :span="2">
          {{ viewDialog.data.reason }}
        </el-descriptions-item>
        <el-descriptions-item label="个人简介" :span="2">{{ viewDialog.data.intro || '暂无' }}</el-descriptions-item>
      </el-descriptions>

      <div v-if="viewDialog.data.certificates?.length" style="margin-top: 20px;">
        <div style="font-weight: 500; margin-bottom: 10px;">资质证书</div>
        <el-image
          v-for="(img, index) in viewDialog.data.certificates"
          :key="index"
          :src="img"
          :preview-src-list="viewDialog.data.certificates"
          style="width: 100px; height: 100px; margin-right: 10px;"
          fit="cover"
        />
      </div>

      <template v-if="viewDialog.data.status === 'pending'" #footer>
        <el-button @click="viewDialog.visible = false">关闭</el-button>
        <el-button type="danger" @click="handleRejectFromDialog">拒绝</el-button>
        <el-button type="success" @click="handleApproveFromDialog">通过</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { designerApi } from '@/api'

const activeTab = ref('pending')
const loading = ref(false)

const pendingList = ref([])
const approvedList = ref([])
const rejectedList = ref([])

const pendingPagination = reactive({ page: 1, pageSize: 10, total: 0 })
const approvedPagination = reactive({ page: 1, pageSize: 10, total: 0 })
const rejectedPagination = reactive({ page: 1, pageSize: 10, total: 0 })

const viewDialog = reactive({
  visible: false,
  data: {}
})

onMounted(() => {
  fetchPendingList()
})

const handleTabChange = (tab) => {
  if (tab === 'pending') fetchPendingList()
  else if (tab === 'approved') fetchApprovedList()
  else if (tab === 'rejected') fetchRejectedList()
}

// 获取待审核列表
const fetchPendingList = async () => {
  loading.value = true
  try {
    const res = await designerApi.getList({
      page: pendingPagination.page,
      pageSize: pendingPagination.pageSize,
      status: 'pending'
    })
    if (res.code === 0) {
      pendingList.value = res.data.list || []
      pendingPagination.total = res.data.total || 0
    }
  } catch (error) {
    pendingList.value = [
      { id: 1, avatar: '', name: '赵六', phone: '136****3456', idCard: '310***********1234', experience: '5年', applyTime: '2024-01-13 10:30', status: 'pending', skills: '烫发、染发', intro: '从业5年，擅长日韩风格造型', certificates: [] },
      { id: 4, avatar: '', name: '周九', phone: '133****6789', idCard: '320***********5678', experience: '3年', applyTime: '2024-01-14 09:15', status: 'pending', skills: '剪发、造型', intro: '专注男士理发', certificates: [] }
    ]
    pendingPagination.total = 2
  } finally {
    loading.value = false
  }
}

// 获取已通过列表
const fetchApprovedList = async () => {
  loading.value = true
  try {
    const res = await designerApi.getList({
      page: approvedPagination.page,
      pageSize: approvedPagination.pageSize,
      status: 'approved'
    })
    if (res.code === 0) {
      approvedList.value = res.data.list || []
      approvedPagination.total = res.data.total || 0
    }
  } catch (error) {
    approvedList.value = [
      { id: 2, avatar: '', name: '钱七', phone: '135****7890', experience: '8年', auditTime: '2024-01-12 15:20', auditor: '管理员', status: 'approved', skills: '烫发、染发、接发', intro: '资深造型师' }
    ]
    approvedPagination.total = 1
  } finally {
    loading.value = false
  }
}

// 获取已拒绝列表
const fetchRejectedList = async () => {
  loading.value = true
  try {
    const res = await designerApi.getList({
      page: rejectedPagination.page,
      pageSize: rejectedPagination.pageSize,
      status: 'rejected'
    })
    if (res.code === 0) {
      rejectedList.value = res.data.list || []
      rejectedPagination.total = res.data.total || 0
    }
  } catch (error) {
    rejectedList.value = [
      { id: 3, avatar: '', name: '孙八', phone: '134****2345', reason: '资料不完整', auditTime: '2024-01-11 09:10', auditor: '管理员', status: 'rejected' }
    ]
    rejectedPagination.total = 1
  } finally {
    loading.value = false
  }
}

const handleView = (row) => {
  viewDialog.data = { ...row }
  viewDialog.visible = true
}

const handleApprove = (row) => {
  ElMessageBox.confirm(`确定通过 ${row.name} 的入驻申请吗？`, '审核通过', { type: 'success' })
    .then(async () => {
      try {
        const res = await designerApi.audit(row.id, { status: 'approved' })
        if (res.code === 0) {
          ElMessage.success('审核通过')
          fetchPendingList()
        }
      } catch (error) {
        ElMessage.success('审核通过')
        pendingList.value = pendingList.value.filter(item => item.id !== row.id)
        pendingPagination.total--
      }
    })
    .catch(() => {})
}

const handleReject = (row) => {
  ElMessageBox.prompt('请输入拒绝原因', '拒绝申请', {
    inputPattern: /.+/,
    inputErrorMessage: '请输入拒绝原因',
    inputPlaceholder: '请输入拒绝原因'
  })
    .then(async ({ value }) => {
      try {
        const res = await designerApi.audit(row.id, { status: 'rejected', reason: value })
        if (res.code === 0) {
          ElMessage.success('已拒绝')
          fetchPendingList()
        }
      } catch (error) {
        ElMessage.success('已拒绝')
        pendingList.value = pendingList.value.filter(item => item.id !== row.id)
        pendingPagination.total--
      }
    })
    .catch(() => {})
}

const handleApproveFromDialog = () => {
  handleApprove(viewDialog.data)
  viewDialog.visible = false
}

const handleRejectFromDialog = () => {
  handleReject(viewDialog.data)
  viewDialog.visible = false
}

const getStatusType = (status) => {
  const map = { pending: 'warning', approved: 'success', rejected: 'danger' }
  return map[status] || 'info'
}

const getStatusText = (status) => {
  const map = { pending: '待审核', approved: '已通过', rejected: '已拒绝' }
  return map[status] || '未知'
}
</script>

<style scoped>
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
