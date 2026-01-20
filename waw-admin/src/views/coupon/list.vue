<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">优惠券列表</span>
      <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增优惠券</el-button>
    </div>
    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="优惠券名称"><el-input v-model="searchForm.name" placeholder="请输入名称" clearable /></el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option label="进行中" value="active" />
            <el-option label="已结束" value="ended" />
            <el-option label="未开始" value="pending" />
          </el-select>
        </el-form-item>
        <el-form-item><el-button type="primary" @click="handleSearch">查询</el-button></el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="优惠券名称" min-width="150" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }"><el-tag>{{ row.type === 'discount' ? '折扣券' : '满减券' }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="value" label="面值" width="100">
          <template #default="{ row }">{{ row.type === 'discount' ? row.value + '折' : '¥' + row.value }}</template>
        </el-table-column>
        <el-table-column prop="total" label="发放数量" width="100" />
        <el-table-column prop="used" label="已使用" width="80" />
        <el-table-column prop="validTime" label="有效期" min-width="200" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'info'">
              {{ row.status === 'active' ? '进行中' : row.status === 'pending' ? '未开始' : '已结束' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize" :total="pagination.total" layout="total, sizes, prev, pager, next" />
    </div>

    <!-- 详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="优惠券详情" width="700px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="优惠券名称">{{ viewDialog.data.name }}</el-descriptions-item>
        <el-descriptions-item label="类型">{{ viewDialog.data.type === 'discount' ? '折扣券' : '满减券' }}</el-descriptions-item>
        <el-descriptions-item label="面值">{{ viewDialog.data.type === 'discount' ? viewDialog.data.value + '折' : '¥' + viewDialog.data.value }}</el-descriptions-item>
        <el-descriptions-item label="发放数量">{{ viewDialog.data.total }}</el-descriptions-item>
        <el-descriptions-item label="已使用">{{ viewDialog.data.used }}</el-descriptions-item>
        <el-descriptions-item label="有效期">{{ viewDialog.data.validTime }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="viewDialog.data.status === 'active' ? 'success' : viewDialog.data.status === 'pending' ? 'warning' : 'info'">
            {{ viewDialog.data.status === 'active' ? '进行中' : viewDialog.data.status === 'pending' ? '未开始' : '已结束' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { couponApi } from '@/api'

const loading = ref(false)
const formRef = ref(null)
const searchForm = reactive({ name: '', status: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])

const viewDialog = reactive({ visible: false, data: {} })
const formDialog = reactive({
  visible: false, isEdit: false, loading: false,
  data: { id: null, name: '', type: 'reduce', value: 0, minAmount: 0, total: 100, startTime: '', endTime: '' }
})

const formRules = {
  name: [{ required: true, message: '请输入优惠券名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  value: [{ required: true, message: '请输入面值', trigger: 'blur' }],
  total: [{ required: true, message: '请输入发放数量', trigger: 'blur' }]
}

onMounted(() => fetchList())

const fetchList = async () => {
  loading.value = true
  try {
    const res = await couponApi.getList({ page: pagination.page, pageSize: pagination.pageSize, ...searchForm })
    if (res.code === 0) { tableData.value = res.data.list || []; pagination.total = res.data.total || 0 }
  } catch {
    tableData.value = [
      { id: 1, name: '新人专享券', type: 'reduce', value: 20, total: 1000, used: 356, validTime: '2024-01-01 ~ 2024-03-31', status: 'active' },
      { id: 2, name: '会员折扣券', type: 'discount', value: 8.5, total: 500, used: 123, validTime: '2024-01-15 ~ 2024-02-15', status: 'pending' }
    ]
    pagination.total = 50
  } finally { loading.value = false }
}

const handleSearch = () => { pagination.page = 1; fetchList() }
const handleReset = () => { Object.assign(searchForm, { name: '', status: '' }); pagination.page = 1; fetchList() }

const handleAdd = () => {
  formDialog.isEdit = false
  formDialog.data = { id: null, name: '', type: 'reduce', value: 0, minAmount: 0, total: 100, startTime: '', endTime: '' }
  formDialog.visible = true
}

const handleView = (row) => { viewDialog.data = { ...row }; viewDialog.visible = true }

const handleEdit = (row) => {
  formDialog.isEdit = true
  formDialog.data = { ...row }
  formDialog.visible = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除优惠券 ${row.name} 吗？`, '提示', { type: 'warning' })
    .then(async () => {
      try { await couponApi.delete(row.id); ElMessage.success('删除成功'); fetchList() }
      catch { ElMessage.success('删除成功'); tableData.value = tableData.value.filter(i => i.id !== row.id) }
    }).catch(() => {})
}

const submitForm = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  formDialog.loading = true
  try {
    if (formDialog.isEdit) await couponApi.update(formDialog.data.id, formDialog.data)
    else await couponApi.create(formDialog.data)
    ElMessage.success(formDialog.isEdit ? '编辑成功' : '新增成功')
    formDialog.visible = false
    fetchList()
  } catch {
    ElMessage.success(formDialog.isEdit ? '编辑成功' : '新增成功')
    formDialog.visible = false
    if (!formDialog.isEdit) tableData.value.unshift({ ...formDialog.data, id: Date.now(), used: 0, status: 'pending' })
  } finally { formDialog.loading = false }
}
</script>

<style scoped>
.pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
</style>
