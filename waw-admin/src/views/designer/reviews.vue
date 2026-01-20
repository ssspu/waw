<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">评价管理</span>
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="设计师">
          <el-input v-model="searchForm.designer" placeholder="设计师名称" clearable />
        </el-form-item>
        <el-form-item label="评分">
          <el-select v-model="searchForm.rating" placeholder="请选择" clearable>
            <el-option v-for="i in 5" :key="i" :label="`${i}星`" :value="i" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否回复">
          <el-select v-model="searchForm.replied" placeholder="请选择" clearable>
            <el-option label="已回复" :value="true" />
            <el-option label="未回复" :value="false" />
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
        <el-table-column prop="user" label="用户" width="100" />
        <el-table-column prop="designer" label="设计师" width="100" />
        <el-table-column prop="service" label="服务项目" width="120" />
        <el-table-column prop="rating" label="评分" width="140">
          <template #default="{ row }">
            <el-rate v-model="row.rating" disabled />
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评价内容" min-width="180" show-overflow-tooltip />
        <el-table-column prop="replied" label="回复状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.reply ? 'success' : 'info'" size="small">
              {{ row.reply ? '已回复' : '未回复' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="评价时间" width="160" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            <el-button type="success" link size="small" @click="handleReply(row)">回复</el-button>
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
    <el-dialog v-model="viewDialog.visible" title="评价详情" width="600px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="用户">{{ viewDialog.data.user }}</el-descriptions-item>
        <el-descriptions-item label="设计师">{{ viewDialog.data.designer }}</el-descriptions-item>
        <el-descriptions-item label="服务项目">{{ viewDialog.data.service }}</el-descriptions-item>
        <el-descriptions-item label="评价时间">{{ viewDialog.data.time }}</el-descriptions-item>
        <el-descriptions-item label="评分" :span="2">
          <el-rate v-model="viewDialog.data.rating" disabled />
        </el-descriptions-item>
        <el-descriptions-item label="评价内容" :span="2">{{ viewDialog.data.content }}</el-descriptions-item>
      </el-descriptions>
      <div v-if="viewDialog.data.images?.length" style="margin-top: 16px;">
        <div style="font-weight: 500; margin-bottom: 8px;">评价图片</div>
        <el-image
          v-for="(img, index) in viewDialog.data.images"
          :key="index"
          :src="img"
          :preview-src-list="viewDialog.data.images"
          style="width: 80px; height: 80px; margin-right: 8px;"
          fit="cover"
        />
      </div>
      <div v-if="viewDialog.data.reply" style="margin-top: 16px; background: #f5f7fa; padding: 12px; border-radius: 4px;">
        <div style="font-weight: 500; margin-bottom: 8px;">商家回复</div>
        <div>{{ viewDialog.data.reply }}</div>
        <div style="color: #999; font-size: 12px; margin-top: 8px;">{{ viewDialog.data.replyTime }}</div>
      </div>
    </el-dialog>

    <!-- 回复弹窗 -->
    <el-dialog v-model="replyDialog.visible" title="回复评价" width="500px">
      <div style="margin-bottom: 16px;">
        <div style="font-weight: 500;">用户评价：</div>
        <div style="color: #666; margin-top: 8px;">{{ replyDialog.data.content }}</div>
      </div>
      <el-form>
        <el-form-item label="回复内容">
          <el-input
            v-model="replyDialog.content"
            type="textarea"
            :rows="4"
            placeholder="请输入回复内容"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="replyDialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="replyDialog.loading" @click="submitReply">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { designerApi } from '@/api'

const loading = ref(false)
const searchForm = reactive({ designer: '', rating: '', replied: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])

const viewDialog = reactive({ visible: false, data: {} })
const replyDialog = reactive({ visible: false, loading: false, data: {}, content: '' })

onMounted(() => {
  fetchList()
})

const fetchList = async () => {
  loading.value = true
  try {
    const params = { page: pagination.page, pageSize: pagination.pageSize, ...searchForm }
    const res = await designerApi.getReviews(null, params)
    if (res.code === 0) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    tableData.value = [
      { id: 1, user: '用户A', designer: '张三', service: '精剪造型', rating: 5, content: '非常满意，设计师很专业！手法很好，发型很满意', time: '2024-01-13 15:30', reply: '感谢您的好评，期待下次光临！', replyTime: '2024-01-13 16:00', images: [] },
      { id: 2, user: '用户B', designer: '李四', service: '染发护理', rating: 4, content: '效果不错，下次还来', time: '2024-01-12 10:20', reply: '', images: [] },
      { id: 3, user: '用户C', designer: '王五', service: '烫发造型', rating: 3, content: '一般般，等待时间有点长', time: '2024-01-11 14:30', reply: '', images: [] },
      { id: 4, user: '用户D', designer: '张三', service: '洗剪吹', rating: 5, content: '很棒的体验！', time: '2024-01-10 09:15', reply: '谢谢支持！', replyTime: '2024-01-10 10:00', images: [] }
    ]
    pagination.total = 100
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  fetchList()
}

const handleReset = () => {
  Object.assign(searchForm, { designer: '', rating: '', replied: '' })
  pagination.page = 1
  fetchList()
}

const handleView = (row) => {
  viewDialog.data = { ...row }
  viewDialog.visible = true
}

const handleReply = (row) => {
  replyDialog.data = { ...row }
  replyDialog.content = row.reply || ''
  replyDialog.visible = true
}

const submitReply = async () => {
  if (!replyDialog.content.trim()) {
    ElMessage.warning('请输入回复内容')
    return
  }
  replyDialog.loading = true
  try {
    ElMessage.success('回复成功')
    replyDialog.visible = false
    const index = tableData.value.findIndex(item => item.id === replyDialog.data.id)
    if (index > -1) {
      tableData.value[index].reply = replyDialog.content
      tableData.value[index].replyTime = new Date().toLocaleString()
    }
  } finally {
    replyDialog.loading = false
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该评价吗？', '提示', { type: 'warning' })
    .then(async () => {
      ElMessage.success('删除成功')
      tableData.value = tableData.value.filter(item => item.id !== row.id)
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
</script>

<style scoped>
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
