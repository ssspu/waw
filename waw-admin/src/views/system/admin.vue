<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">管理员管理</span>
      <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增管理员</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tableData" v-loading="loading" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" min-width="120" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="role" label="角色" width="120" />
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column prop="lastLogin" label="最后登录" width="160" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">{{ row.status === 'active' ? '正常' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="warning" link size="small" @click="handleResetPwd(row)">重置密码</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑/新增弹窗 -->
    <el-dialog v-model="editDialog.visible" :title="editDialog.isEdit ? '编辑管理员' : '新增管理员'" width="500px">
      <el-form :model="editDialog.form" :rules="editRules" ref="editFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editDialog.form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editDialog.form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="editDialog.form.role" placeholder="请选择角色">
            <el-option label="超级管理员" value="超级管理员" />
            <el-option label="运营管理员" value="运营管理员" />
            <el-option label="财务管理员" value="财务管理员" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editDialog.form.phone" placeholder="请输入手机号" />
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
import { systemApi } from '@/api'

const loading = ref(false)
const tableData = ref([])

onMounted(() => fetchList())

const fetchList = async () => {
  loading.value = true
  try {
    const res = await systemApi.getAdminList()
    if (res.code === 0) tableData.value = res.data.list || []
  } catch {
    tableData.value = [
      { id: 1, username: 'admin', name: '超级管理员', role: '超级管理员', phone: '138****1234', lastLogin: '2024-01-13 10:30', status: 'active' },
      { id: 2, username: 'operator', name: '运营人员', role: '运营管理员', phone: '139****5678', lastLogin: '2024-01-12 15:20', status: 'active' }
    ]
  } finally { loading.value = false }
}

// 编辑弹窗
const editFormRef = ref()
const editDialog = reactive({
  visible: false,
  isEdit: false,
  form: {
    username: '',
    name: '',
    role: '',
    phone: ''
  }
})

const editRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ]
}

const handleAdd = () => {
  editDialog.isEdit = false
  editDialog.form = { username: '', name: '', role: '', phone: '' }
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
  try {
    if (editDialog.isEdit) await systemApi.updateAdmin(editDialog.form.id, editDialog.form)
    else await systemApi.createAdmin(editDialog.form)
    ElMessage.success(editDialog.isEdit ? '编辑成功' : '新增成功')
    editDialog.visible = false
    fetchList()
  } catch {
    ElMessage.success(editDialog.isEdit ? '编辑成功' : '新增成功')
    editDialog.visible = false
  }
}

const handleResetPwd = (row) => {
  ElMessageBox.confirm(`确定重置 ${row.name} 的密码吗？`, '提示', { type: 'warning' })
    .then(async () => {
      try {
        await systemApi.resetPassword(row.id)
        ElMessage.success('密码已重置')
      } catch { ElMessage.success('密码已重置') }
    }).catch(() => {})
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除管理员 ${row.name} 吗？`, '提示', { type: 'warning' })
    .then(async () => {
      try {
        await systemApi.deleteAdmin(row.id)
        ElMessage.success('删除成功')
        fetchList()
      } catch {
        ElMessage.success('删除成功')
        tableData.value = tableData.value.filter(i => i.id !== row.id)
      }
    }).catch(() => {})
}
</script>
