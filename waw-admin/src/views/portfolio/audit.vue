<template>
  <div class="page-container">
    <div class="page-header">
      <h2>作品审核</h2>
    </div>

    <el-tabs v-model="activeTab" @tab-change="handleTabChange">
      <el-tab-pane label="待审核" name="pending" />
      <el-tab-pane label="已通过" name="approved" />
      <el-tab-pane label="已拒绝" name="rejected" />
    </el-tabs>

    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="作品名称">
          <el-input v-model="searchForm.keyword" placeholder="请输入作品名称" clearable />
        </el-form-item>
        <el-form-item label="设计师">
          <el-input v-model="searchForm.designer" placeholder="设计师名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card>
      <el-table :data="portfolioList" stripe>
        <el-table-column prop="cover" label="封面" width="120">
          <template #default="{ row }">
            <el-image :src="row.cover" style="width: 80px; height: 80px;" fit="cover" :preview-src-list="[row.cover]" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="作品名称" />
        <el-table-column prop="designerName" label="设计师" width="120" />
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column prop="createTime" label="提交时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <template v-if="row.status === 0">
              <el-button type="success" link @click="handleApprove(row)">通过</el-button>
              <el-button type="danger" link @click="handleReject(row)">拒绝</el-button>
            </template>
          </template>
        </el-table-column>
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

    <el-dialog v-model="viewDialogVisible" title="作品详情" width="700px">
      <div class="portfolio-detail">
        <el-image :src="currentPortfolio.cover" style="width: 100%; max-height: 400px;" fit="contain" />
        <el-descriptions :column="2" border style="margin-top: 20px;">
          <el-descriptions-item label="作品名称">{{ currentPortfolio.title }}</el-descriptions-item>
          <el-descriptions-item label="设计师">{{ currentPortfolio.designerName }}</el-descriptions-item>
          <el-descriptions-item label="分类">{{ currentPortfolio.category }}</el-descriptions-item>
          <el-descriptions-item label="提交时间">{{ currentPortfolio.createTime }}</el-descriptions-item>
          <el-descriptions-item label="作品描述" :span="2">{{ currentPortfolio.description }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer v-if="currentPortfolio.status === 0">
        <el-button @click="viewDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="handleReject(currentPortfolio)">拒绝</el-button>
        <el-button type="success" @click="handleApprove(currentPortfolio)">通过</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="rejectDialogVisible" title="拒绝原因" width="400px">
      <el-input v-model="rejectReason" type="textarea" :rows="4" placeholder="请输入拒绝原因" />
      <template #footer>
        <el-button @click="rejectDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReject">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const activeTab = ref('pending')

const searchForm = ref({
  keyword: '',
  designer: ''
})

const portfolioList = ref([
  { id: 1, cover: 'https://via.placeholder.com/200', title: '时尚短发造型', designerName: '设计师小王', category: '剪发', createTime: '2024-01-20 10:00:00', status: 0, description: '这是一款时尚的短发造型，适合职场女性。' },
  { id: 2, cover: 'https://via.placeholder.com/200', title: '渐变染发', designerName: '设计师小李', category: '染发', createTime: '2024-01-19 14:00:00', status: 0, description: '渐变染发效果，从深棕到浅金的自然过渡。' },
  { id: 3, cover: 'https://via.placeholder.com/200', title: '复古卷发', designerName: '设计师小张', category: '烫发', createTime: '2024-01-18 16:00:00', status: 1, description: '复古风格的大波浪卷发，优雅大方。' }
])

const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 50
})

const viewDialogVisible = ref(false)
const rejectDialogVisible = ref(false)
const currentPortfolio = ref({})
const rejectReason = ref('')

const getStatusType = (status) => {
  const types = { 0: 'warning', 1: 'success', 2: 'danger' }
  return types[status]
}

const getStatusText = (status) => {
  const texts = { 0: '待审核', 1: '已通过', 2: '已拒绝' }
  return texts[status]
}

const handleTabChange = () => {
  // 切换Tab时重新加载数据
}

const handleSearch = () => {
  // 搜索作品
}

const handleView = (row) => {
  currentPortfolio.value = { ...row }
  viewDialogVisible.value = true
}

const handleApprove = (row) => {
  ElMessageBox.confirm('确定通过该作品审核吗？', '提示', { type: 'success' })
    .then(() => {
      ElMessage.success('审核通过')
      viewDialogVisible.value = false
    })
}

const handleReject = (row) => {
  currentPortfolio.value = { ...row }
  rejectReason.value = ''
  rejectDialogVisible.value = true
}

const submitReject = () => {
  if (!rejectReason.value.trim()) {
    ElMessage.warning('请输入拒绝原因')
    return
  }
  ElMessage.success('已拒绝')
  rejectDialogVisible.value = false
  viewDialogVisible.value = false
}
</script>

<style scoped lang="scss">
.page-header {
  margin-bottom: 20px;
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
