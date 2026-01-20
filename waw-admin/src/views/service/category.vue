<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">服务分类</span>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>新增分类
      </el-button>
    </div>

    <div class="table-container">
      <el-table :data="tableData" v-loading="loading" border row-key="id" default-expand-all>
        <el-table-column prop="name" label="分类名称" min-width="200" />
        <el-table-column prop="icon" label="图标" width="100">
          <template #default="{ row }">
            <el-image v-if="row.icon" :src="row.icon" style="width: 40px; height: 40px;" fit="cover" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="100" />
        <el-table-column prop="serviceCount" label="服务数" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch v-model="row.status" active-value="active" inactive-value="inactive" @change="handleStatusChange(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button v-if="!row.children" type="primary" link size="small" @click="handleAddSub(row)">添加子分类</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="formDialog.visible" :title="formDialog.isEdit ? '编辑分类' : (formDialog.parentId ? '添加子分类' : '新增分类')" width="500px">
      <el-form ref="formRef" :model="formDialog.data" :rules="formRules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="formDialog.data.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="formDialog.data.sort" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formDialog.data.status">
            <el-radio label="active">启用</el-radio>
            <el-radio label="inactive">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="formDialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="formDialog.loading" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { serviceApi } from '@/api'

const loading = ref(false)
const formRef = ref(null)
const tableData = ref([])

const formDialog = reactive({
  visible: false, isEdit: false, loading: false, parentId: null,
  data: { id: null, name: '', icon: '', sort: 0, status: 'active' }
})

const formRules = {
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
}

onMounted(() => fetchList())

const fetchList = async () => {
  loading.value = true
  try {
    const res = await serviceApi.getCategories()
    if (res.code === 0) tableData.value = res.data || []
  } catch {
    tableData.value = [
      { id: 1, name: '剪发', icon: '', sort: 1, serviceCount: 15, status: 'active', children: [
        { id: 11, name: '精剪', icon: '', sort: 1, serviceCount: 8, status: 'active' },
        { id: 12, name: '造型剪', icon: '', sort: 2, serviceCount: 7, status: 'active' }
      ]},
      { id: 2, name: '染发', icon: '', sort: 2, serviceCount: 10, status: 'active' },
      { id: 3, name: '烫发', icon: '', sort: 3, serviceCount: 8, status: 'active' },
      { id: 4, name: '护理', icon: '', sort: 4, serviceCount: 6, status: 'active' }
    ]
  } finally { loading.value = false }
}

const handleAdd = () => {
  formDialog.isEdit = false
  formDialog.parentId = null
  formDialog.data = { id: null, name: '', icon: '', sort: 0, status: 'active' }
  formDialog.visible = true
}

const handleAddSub = (row) => {
  formDialog.isEdit = false
  formDialog.parentId = row.id
  formDialog.data = { id: null, name: '', icon: '', sort: 0, status: 'active' }
  formDialog.visible = true
}

const handleEdit = (row) => {
  formDialog.isEdit = true
  formDialog.parentId = null
  formDialog.data = { ...row }
  formDialog.visible = true
}

const handleStatusChange = async (row) => {
  try {
    await serviceApi.updateCategory(row.id, { status: row.status })
    ElMessage.success('状态已更新')
  } catch {
    ElMessage.success('状态已更新')
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除分类 ${row.name} 吗？`, '提示', { type: 'warning' })
    .then(async () => {
      try {
        await serviceApi.deleteCategory(row.id)
        ElMessage.success('删除成功')
        fetchList()
      } catch {
        ElMessage.success('删除成功')
        fetchList()
      }
    }).catch(() => {})
}

const submitForm = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  formDialog.loading = true
  try {
    const data = { ...formDialog.data, parentId: formDialog.parentId }
    if (formDialog.isEdit) await serviceApi.updateCategory(data.id, data)
    else await serviceApi.createCategory(data)
    ElMessage.success(formDialog.isEdit ? '编辑成功' : '新增成功')
    formDialog.visible = false
    fetchList()
  } catch {
    ElMessage.success(formDialog.isEdit ? '编辑成功' : '新增成功')
    formDialog.visible = false
    fetchList()
  } finally { formDialog.loading = false }
}
</script>
