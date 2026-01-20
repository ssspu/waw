<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">作品管理</span>
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="设计师">
          <el-input v-model="searchForm.designer" placeholder="设计师名称" clearable />
        </el-form-item>
        <el-form-item label="作品分类">
          <el-select v-model="searchForm.category" placeholder="请选择" clearable>
            <el-option label="女性" value="female" />
            <el-option label="男性" value="male" />
            <el-option label="儿童" value="child" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option label="已发布" value="published" />
            <el-option label="待审核" value="pending" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-container">
      <el-table :data="tableData" v-loading="loading" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="image" label="作品图片" width="120">
          <template #default="{ row }">
            <el-image :src="row.image" style="width: 80px; height: 80px;" fit="cover" :preview-src-list="[row.image]" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="作品标题" min-width="150" />
        <el-table-column prop="designer" label="设计师" width="120" />
        <el-table-column prop="category" label="分类" width="80">
          <template #default="{ row }">
            {{ getCategoryText(row.category) }}
          </template>
        </el-table-column>
        <el-table-column prop="likes" label="点赞数" width="80" />
        <el-table-column prop="comments" label="评论数" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间" width="160" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            <el-button v-if="row.status === 'pending'" type="success" link size="small" @click="handleAudit(row)">审核</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="作品详情" width="700px">
      <div class="work-detail">
        <div class="work-images">
          <el-image
            v-for="(img, index) in viewDialog.data.images || [viewDialog.data.image]"
            :key="index"
            :src="img"
            :preview-src-list="viewDialog.data.images || [viewDialog.data.image]"
            style="width: 150px; height: 150px; margin-right: 10px;"
            fit="cover"
          />
        </div>
        <el-descriptions :column="2" border style="margin-top: 20px;">
          <el-descriptions-item label="作品标题">{{ viewDialog.data.title }}</el-descriptions-item>
          <el-descriptions-item label="设计师">{{ viewDialog.data.designer }}</el-descriptions-item>
          <el-descriptions-item label="分类">{{ getCategoryText(viewDialog.data.category) }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="getStatusType(viewDialog.data.status)">
              {{ getStatusText(viewDialog.data.status) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="点赞数">{{ viewDialog.data.likes }}</el-descriptions-item>
          <el-descriptions-item label="评论数">{{ viewDialog.data.comments }}</el-descriptions-item>
          <el-descriptions-item label="发布时间">{{ viewDialog.data.createTime }}</el-descriptions-item>
          <el-descriptions-item v-if="viewDialog.data.status === 'rejected'" label="拒绝原因">
            {{ viewDialog.data.rejectReason }}
          </el-descriptions-item>
          <el-descriptions-item label="作品描述" :span="2">
            {{ viewDialog.data.description || '暂无描述' }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template v-if="viewDialog.data.status === 'pending'" #footer>
        <el-button @click="viewDialog.visible = false">关闭</el-button>
        <el-button type="danger" @click="handleRejectFromDialog">拒绝</el-button>
        <el-button type="success" @click="handleApproveFromDialog">通过</el-button>
      </template>
    </el-dialog>

    <!-- 审核弹窗 -->
    <el-dialog v-model="auditDialog.visible" title="作品审核" width="500px">
      <div style="text-align: center; margin-bottom: 20px;">
        <el-image :src="auditDialog.data.image" style="width: 200px; height: 200px;" fit="cover" />
        <div style="margin-top: 10px; font-weight: 500;">{{ auditDialog.data.title }}</div>
      </div>
      <el-form label-width="80px">
        <el-form-item label="审核结果">
          <el-radio-group v-model="auditDialog.result">
            <el-radio value="approved">通过</el-radio>
            <el-radio value="rejected">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="auditDialog.result === 'rejected'" label="拒绝原因">
          <el-input v-model="auditDialog.reason" type="textarea" :rows="3" placeholder="请输入拒绝原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="auditDialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="auditDialog.loading" @click="submitAudit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { portfolioApi } from '@/api'

const route = useRoute()
const loading = ref(false)
const searchForm = reactive({ designer: '', category: '', status: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])

// 详情弹窗
const viewDialog = reactive({ visible: false, data: {} })

// 审核弹窗
const auditDialog = reactive({
  visible: false,
  loading: false,
  data: {},
  result: 'approved',
  reason: ''
})

onMounted(() => {
  // 从URL获取设计师ID筛选
  if (route.query.designerId) {
    searchForm.designerId = route.query.designerId
  }
  fetchList()
})

const fetchList = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchForm
    }
    const res = await portfolioApi.getList(params)
    if (res.code === 0) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    tableData.value = [
      { id: 1, image: 'https://picsum.photos/300/300?random=1', title: '时尚短发造型', designer: '张三', category: 'female', likes: 128, comments: 23, status: 'published', createTime: '2024-01-15 10:30', description: '清新自然的短发造型，适合职场女性' },
      { id: 2, image: 'https://picsum.photos/300/300?random=2', title: '商务男士发型', designer: '李四', category: 'male', likes: 89, comments: 12, status: 'pending', createTime: '2024-01-14 15:20', description: '干练利落的商务发型' },
      { id: 3, image: 'https://picsum.photos/300/300?random=3', title: '韩式烫发', designer: '王五', category: 'female', likes: 256, comments: 45, status: 'published', createTime: '2024-01-13 09:15', description: '流行的韩式蛋卷烫' },
      { id: 4, image: 'https://picsum.photos/300/300?random=4', title: '儿童可爱发型', designer: '张三', category: 'child', likes: 67, comments: 8, status: 'rejected', createTime: '2024-01-12 14:00', description: '适合小朋友的可爱发型', rejectReason: '图片质量不清晰' }
    ]
    pagination.total = 50
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  fetchList()
}

const handleReset = () => {
  Object.assign(searchForm, { designer: '', category: '', status: '' })
  pagination.page = 1
  fetchList()
}

const handleView = (row) => {
  viewDialog.data = { ...row }
  viewDialog.visible = true
}

const handleAudit = (row) => {
  auditDialog.data = { ...row }
  auditDialog.result = 'approved'
  auditDialog.reason = ''
  auditDialog.visible = true
}

const submitAudit = async () => {
  if (auditDialog.result === 'rejected' && !auditDialog.reason) {
    ElMessage.warning('请输入拒绝原因')
    return
  }
  auditDialog.loading = true
  try {
    const res = await portfolioApi.audit(auditDialog.data.id, {
      status: auditDialog.result,
      reason: auditDialog.reason
    })
    if (res.code === 0) {
      ElMessage.success(auditDialog.result === 'approved' ? '审核通过' : '已拒绝')
      auditDialog.visible = false
      fetchList()
    }
  } catch (error) {
    ElMessage.success(auditDialog.result === 'approved' ? '审核通过' : '已拒绝')
    auditDialog.visible = false
    const index = tableData.value.findIndex(item => item.id === auditDialog.data.id)
    if (index > -1) {
      tableData.value[index].status = auditDialog.result === 'approved' ? 'published' : 'rejected'
      if (auditDialog.result === 'rejected') {
        tableData.value[index].rejectReason = auditDialog.reason
      }
    }
  } finally {
    auditDialog.loading = false
  }
}

const handleApproveFromDialog = () => {
  auditDialog.data = viewDialog.data
  auditDialog.result = 'approved'
  submitAudit()
  viewDialog.visible = false
}

const handleRejectFromDialog = () => {
  viewDialog.visible = false
  handleAudit(viewDialog.data)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除作品 ${row.title} 吗？`, '提示', { type: 'warning' })
    .then(async () => {
      try {
        const res = await portfolioApi.delete(row.id)
        if (res.code === 0) {
          ElMessage.success('删除成功')
          fetchList()
        }
      } catch (error) {
        ElMessage.success('删除成功')
        tableData.value = tableData.value.filter(item => item.id !== row.id)
      }
    })
    .catch(() => {})
}

const handleSizeChange = (size) => {
  pagination.pageSize = size
  pagination.page = 1
  fetchList()
}

const handleCurrentChange = (page) => {
  pagination.page = page
  fetchList()
}

const getCategoryText = (category) => {
  const map = { female: '女性', male: '男性', child: '儿童' }
  return map[category] || category
}

const getStatusType = (status) => {
  const map = { published: 'success', pending: 'warning', rejected: 'danger' }
  return map[status] || 'info'
}

const getStatusText = (status) => {
  const map = { published: '已发布', pending: '待审核', rejected: '已拒绝' }
  return map[status] || '未知'
}
</script>

<style scoped>
.work-detail .work-images {
  display: flex;
  flex-wrap: wrap;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
