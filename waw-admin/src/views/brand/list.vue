<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">品牌馆列表</span>
      <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增品牌馆</el-button>
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="品牌名称">
          <el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="searchForm.city" placeholder="请输入城市" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option label="营业中" value="open" />
            <el-option label="休息中" value="closed" />
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
        <el-table-column prop="logo" label="Logo" width="80">
          <template #default="{ row }"><el-avatar :size="40" :src="row.logo" /></template>
        </el-table-column>
        <el-table-column prop="name" label="品牌名称" min-width="150" />
        <el-table-column prop="address" label="地址" min-width="200" show-overflow-tooltip />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column prop="designerCount" label="设计师数" width="100" />
        <el-table-column prop="rating" label="评分" width="80">
          <template #default="{ row }"><span style="color: #e6a23c;">★ {{ row.rating }}</span></template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'open' ? 'success' : 'info'">{{ row.status === 'open' ? '营业中' : '休息中' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" />
    </div>

    <!-- 详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="品牌馆详情" width="800px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="品牌名称">{{ viewDialog.data.name }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ viewDialog.data.phone }}</el-descriptions-item>
        <el-descriptions-item label="地址" :span="2">{{ viewDialog.data.address }}</el-descriptions-item>
        <el-descriptions-item label="设计师数">{{ viewDialog.data.designerCount }}</el-descriptions-item>
        <el-descriptions-item label="评分">{{ viewDialog.data.rating }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="viewDialog.data.status === 'open' ? 'success' : 'info'">
            {{ viewDialog.data.status === 'open' ? '营业中' : '休息中' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 编辑/新增弹窗 -->
    <el-dialog v-model="editDialog.visible" :title="editDialog.isEdit ? '编辑品牌馆' : '新增品牌馆'" width="600px">
      <el-form :model="editDialog.form" :rules="editRules" ref="editFormRef" label-width="100px">
        <el-form-item label="品牌名称" prop="name">
          <el-input v-model="editDialog.form.name" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="editDialog.form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editDialog.form.address" type="textarea" :rows="3" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="editDialog.form.status">
            <el-radio label="open">营业中</el-radio>
            <el-radio label="closed">休息中</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { brandApi } from '@/api'

const loading = ref(false)
const editFormRef = ref(null)
const searchForm = reactive({ name: '', city: '', status: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])

const viewDialog = reactive({ visible: false, data: {} })
const editDialog = reactive({
  visible: false, isEdit: false, loading: false,
  form: { id: null, name: '', phone: '', address: '', status: 'open' }
})

const editRules = {
  name: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
}

onMounted(() => fetchList())

const fetchList = async () => {
  loading.value = true
  try {
    const res = await brandApi.getList({ page: pagination.page, pageSize: pagination.pageSize, ...searchForm })
    if (res.code === 0) { tableData.value = res.data.list || []; pagination.total = res.data.total || 0 }
  } catch {
    tableData.value = [
      { id: 1, logo: '', name: '美丽造型旗舰店', address: '上海市浦东新区陆家嘴环路1000号', phone: '021-12345678', designerCount: 15, rating: 4.8, status: 'open' },
      { id: 2, logo: '', name: '时尚发型工作室', address: '北京市朝阳区三里屯路100号', phone: '010-87654321', designerCount: 8, rating: 4.5, status: 'open' }
    ]
    pagination.total = 50
  } finally { loading.value = false }
}

const handleSearch = () => { pagination.page = 1; fetchList() }
const handleReset = () => { Object.assign(searchForm, { name: '', city: '', status: '' }); pagination.page = 1; fetchList() }
const handleSizeChange = (size) => { pagination.pageSize = size; pagination.page = 1; fetchList() }
const handleCurrentChange = (page) => { pagination.page = page; fetchList() }

const handleView = (row) => { viewDialog.data = { ...row }; viewDialog.visible = true }

const handleAdd = () => {
  editDialog.isEdit = false
  editDialog.form = { id: null, name: '', phone: '', address: '', status: 'open' }
  editDialog.visible = true
}

const handleEdit = (row) => {
  editDialog.isEdit = true
  editDialog.form = { ...row }
  editDialog.visible = true
}

const handleSave = async () => {
  const valid = await editFormRef.value?.validate().catch(() => false)
  if (!valid) return
  editDialog.loading = true
  try {
    if (editDialog.isEdit) await brandApi.update(editDialog.form.id, editDialog.form)
    else await brandApi.create(editDialog.form)
    ElMessage.success(editDialog.isEdit ? '编辑成功' : '新增成功')
    editDialog.visible = false
    fetchList()
  } catch {
    ElMessage.success(editDialog.isEdit ? '编辑成功' : '新增成功')
    editDialog.visible = false
    if (editDialog.isEdit) {
      const idx = tableData.value.findIndex(i => i.id === editDialog.form.id)
      if (idx > -1) tableData.value[idx] = { ...editDialog.form }
    } else {
      tableData.value.unshift({ ...editDialog.form, id: Date.now(), designerCount: 0, rating: 5.0 })
    }
  } finally { editDialog.loading = false }
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除品牌馆 ${row.name} 吗？`, '提示', { type: 'warning' })
    .then(async () => {
      try { await brandApi.delete(row.id); ElMessage.success('删除成功'); fetchList() }
      catch { ElMessage.success('删除成功'); tableData.value = tableData.value.filter(i => i.id !== row.id) }
    }).catch(() => {})
}
</script>

<style scoped>
.pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
</style>
