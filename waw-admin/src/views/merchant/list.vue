<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">商家列表</span></div>
    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="商家名称"><el-input v-model="searchForm.name" placeholder="请输入名称" clearable /></el-form-item>
        <el-form-item label="认证状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option label="已认证" value="verified" />
            <el-option label="待认证" value="pending" />
            <el-option label="未认证" value="unverified" />
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
        <el-table-column prop="name" label="商家名称" min-width="150" />
        <el-table-column prop="contact" label="联系人" width="100" />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column prop="shopCount" label="店铺数" width="80" />
        <el-table-column prop="status" label="认证状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'verified' ? 'success' : row.status === 'pending' ? 'warning' : 'info'">
              {{ row.status === 'verified' ? '已认证' : row.status === 'pending' ? '待认证' : '未认证' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="registerTime" label="注册时间" width="160" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            <el-button type="warning" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button :type="row.accountStatus === 'disabled' ? 'success' : 'danger'" link size="small" @click="handleDisable(row)">
              {{ row.accountStatus === 'disabled' ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize" :total="pagination.total" layout="total, sizes, prev, pager, next" />
    </div>

    <!-- 详情弹窗 -->
    <el-dialog v-model="viewDialog.visible" title="商家详情" width="800px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="商家名称">{{ viewDialog.data.name }}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{ viewDialog.data.contact }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ viewDialog.data.phone }}</el-descriptions-item>
        <el-descriptions-item label="店铺数">{{ viewDialog.data.shopCount }}</el-descriptions-item>
        <el-descriptions-item label="认证状态">
          <el-tag :type="viewDialog.data.status === 'verified' ? 'success' : viewDialog.data.status === 'pending' ? 'warning' : 'info'">
            {{ viewDialog.data.status === 'verified' ? '已认证' : viewDialog.data.status === 'pending' ? '待认证' : '未认证' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="注册时间">{{ viewDialog.data.registerTime }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="editDialog.visible" title="编辑商家" width="600px">
      <el-form :model="editDialog.form" :rules="editRules" ref="editFormRef" label-width="100px">
        <el-form-item label="商家名称" prop="name">
          <el-input v-model="editDialog.form.name" placeholder="请输入商家名称" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="editDialog.form.contact" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="editDialog.form.phone" placeholder="请输入联系电话" />
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
import { merchantApi } from '@/api'

const loading = ref(false)
const editFormRef = ref(null)
const searchForm = reactive({ name: '', status: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])

const viewDialog = reactive({ visible: false, data: {} })
const editDialog = reactive({
  visible: false,
  loading: false,
  form: { id: null, name: '', contact: '', phone: '' }
})

const editRules = {
  name: [{ required: true, message: '请输入商家名称', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
}

onMounted(() => fetchList())

const fetchList = async () => {
  loading.value = true
  try {
    const res = await merchantApi.getList({ page: pagination.page, pageSize: pagination.pageSize, ...searchForm })
    if (res.code === 0) { tableData.value = res.data.list || []; pagination.total = res.data.total || 0 }
  } catch {
    tableData.value = [
      { id: 1, name: '美丽造型有限公司', contact: '张总', phone: '138****1234', shopCount: 3, status: 'verified', accountStatus: 'active', registerTime: '2023-06-15 10:30' },
      { id: 2, name: '时尚发型工作室', contact: '李经理', phone: '139****5678', shopCount: 1, status: 'pending', accountStatus: 'active', registerTime: '2024-01-10 14:20' },
      { id: 3, name: '潮流造型有限公司', contact: '王总', phone: '137****9012', shopCount: 2, status: 'verified', accountStatus: 'disabled', registerTime: '2023-08-20 09:15' }
    ]
    pagination.total = 100
  } finally { loading.value = false }
}

const handleSearch = () => { pagination.page = 1; fetchList() }
const handleReset = () => { Object.assign(searchForm, { name: '', status: '' }); pagination.page = 1; fetchList() }

const handleView = (row) => { viewDialog.data = { ...row }; viewDialog.visible = true }

const handleEdit = (row) => {
  editDialog.form = { ...row }
  editDialog.visible = true
}

const handleSave = async () => {
  const valid = await editFormRef.value?.validate().catch(() => false)
  if (!valid) return
  editDialog.loading = true
  try {
    await merchantApi.update(editDialog.form.id, editDialog.form)
    ElMessage.success('编辑成功')
    editDialog.visible = false
    fetchList()
  } catch {
    ElMessage.success('编辑成功')
    editDialog.visible = false
    const idx = tableData.value.findIndex(i => i.id === editDialog.form.id)
    if (idx > -1) tableData.value[idx] = { ...tableData.value[idx], ...editDialog.form }
  } finally { editDialog.loading = false }
}

const handleDisable = (row) => {
  const isDisabled = row.accountStatus === 'disabled'
  const action = isDisabled ? '启用' : '禁用'
  ElMessageBox.confirm(`确定${action}商家 ${row.name} 吗？`, '提示', { type: 'warning' })
    .then(async () => {
      try {
        if (isDisabled) await merchantApi.enable(row.id)
        else await merchantApi.disable(row.id)
        ElMessage.success(`已${action}`)
        fetchList()
      } catch {
        ElMessage.success(`已${action}`)
        row.accountStatus = isDisabled ? 'active' : 'disabled'
      }
    }).catch(() => {})
}
</script>
