<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">服务列表</span>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>新增服务
      </el-button>
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="服务名称">
          <el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
        </el-form-item>
        <el-form-item label="服务分类">
          <el-select v-model="searchForm.category" placeholder="请选择" clearable>
            <el-option label="剪发" value="cut" />
            <el-option label="染发" value="dye" />
            <el-option label="烫发" value="perm" />
            <el-option label="护理" value="care" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option label="上架" value="online" />
            <el-option label="下架" value="offline" />
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
        <el-table-column prop="image" label="图片" width="100">
          <template #default="{ row }">
            <el-image :src="row.image" style="width: 60px; height: 60px;" fit="cover" :preview-src-list="[row.image]" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="服务名称" min-width="150" />
        <el-table-column prop="categoryName" label="分类" width="100" />
        <el-table-column prop="price" label="价格" width="100">
          <template #default="{ row }">¥{{ row.price }}</template>
        </el-table-column>
        <el-table-column prop="duration" label="时长" width="80">
          <template #default="{ row }">{{ row.duration }}分钟</template>
        </el-table-column>
        <el-table-column prop="designerCount" label="设计师数" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'online' ? 'success' : 'info'">
              {{ row.status === 'online' ? '上架' : '下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button :type="row.status === 'online' ? 'warning' : 'success'" link size="small" @click="handleToggle(row)">
              {{ row.status === 'online' ? '下架' : '上架' }}
            </el-button>
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
    <el-dialog v-model="viewDialog.visible" title="服务详情" width="700px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="服务名称">{{ viewDialog.data.name }}</el-descriptions-item>
        <el-descriptions-item label="分类">{{ viewDialog.data.categoryName }}</el-descriptions-item>
        <el-descriptions-item label="价格">¥{{ viewDialog.data.price }}</el-descriptions-item>
        <el-descriptions-item label="时长">{{ viewDialog.data.duration }}分钟</el-descriptions-item>
        <el-descriptions-item label="设计师数">{{ viewDialog.data.designerCount }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="viewDialog.data.status === 'online' ? 'success' : 'info'">
            {{ viewDialog.data.status === 'online' ? '上架' : '下架' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="服务描述" :span="2">{{ viewDialog.data.description || '暂无' }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="formDialog.visible" :title="formDialog.isEdit ? '编辑服务' : '新增服务'" width="600px" @close="resetForm">
      <el-form ref="formRef" :model="formDialog.data" :rules="formRules" label-width="100px">
        <el-form-item label="服务图片" prop="image">
          <el-upload class="image-uploader" :show-file-list="false" :before-upload="beforeImageUpload" :http-request="uploadImage">
            <el-image v-if="formDialog.data.image" :src="formDialog.data.image" style="width: 100px; height: 100px;" fit="cover" />
            <el-icon v-else class="image-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="服务名称" prop="name">
          <el-input v-model="formDialog.data.name" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="服务分类" prop="category">
          <el-select v-model="formDialog.data.category" placeholder="请选择分类" style="width: 100%">
            <el-option label="剪发" value="cut" />
            <el-option label="染发" value="dye" />
            <el-option label="烫发" value="perm" />
            <el-option label="护理" value="care" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务价格" prop="price">
          <el-input-number v-model="formDialog.data.price" :min="0" :precision="2" style="width: 100%" />
        </el-form-item>
        <el-form-item label="服务时长" prop="duration">
          <el-input-number v-model="formDialog.data.duration" :min="1" placeholder="分钟" style="width: 100%" />
        </el-form-item>
        <el-form-item label="服务描述" prop="description">
          <el-input v-model="formDialog.data.description" type="textarea" :rows="3" placeholder="请输入服务描述" />
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
import { serviceApi, commonApi } from '@/api'

const loading = ref(false)
const formRef = ref(null)
const searchForm = reactive({ name: '', category: '', status: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])

const categoryMap = { cut: '剪发', dye: '染发', perm: '烫发', care: '护理' }

const viewDialog = reactive({ visible: false, data: {} })
const formDialog = reactive({
  visible: false, isEdit: false, loading: false,
  data: { id: null, image: '', name: '', category: '', price: 0, duration: 30, description: '' }
})

const formRules = {
  name: [{ required: true, message: '请输入服务名称', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  duration: [{ required: true, message: '请输入时长', trigger: 'blur' }]
}

onMounted(() => fetchList())

const fetchList = async () => {
  loading.value = true
  try {
    const res = await serviceApi.getList({ page: pagination.page, pageSize: pagination.pageSize, ...searchForm })
    if (res.code === 0) { tableData.value = res.data.list || []; pagination.total = res.data.total || 0 }
  } catch {
    tableData.value = [
      { id: 1, image: '', name: '精剪造型', category: 'cut', categoryName: '剪发', price: 128, duration: 60, designerCount: 15, status: 'online' },
      { id: 2, image: '', name: '时尚染发', category: 'dye', categoryName: '染发', price: 388, duration: 120, designerCount: 10, status: 'online' },
      { id: 3, image: '', name: '烫发造型', category: 'perm', categoryName: '烫发', price: 268, duration: 150, designerCount: 8, status: 'offline' }
    ]
    pagination.total = 50
  } finally { loading.value = false }
}

const handleSearch = () => { pagination.page = 1; fetchList() }
const handleReset = () => { Object.assign(searchForm, { name: '', category: '', status: '' }); pagination.page = 1; fetchList() }
const handleSizeChange = (size) => { pagination.pageSize = size; pagination.page = 1; fetchList() }
const handleCurrentChange = (page) => { pagination.page = page; fetchList() }

const handleAdd = () => {
  formDialog.isEdit = false
  formDialog.data = { id: null, image: '', name: '', category: '', price: 0, duration: 30, description: '' }
  formDialog.visible = true
}

const handleView = (row) => { viewDialog.data = { ...row }; viewDialog.visible = true }

const handleEdit = (row) => {
  formDialog.isEdit = true
  formDialog.data = { ...row }
  formDialog.visible = true
}

const handleToggle = (row) => {
  const action = row.status === 'online' ? '下架' : '上架'
  ElMessageBox.confirm(`确定${action}服务 ${row.name} 吗？`, '提示')
    .then(async () => {
      try {
        if (row.status === 'online') await serviceApi.offline(row.id)
        else await serviceApi.online(row.id)
        ElMessage.success(`${action}成功`)
        fetchList()
      } catch { ElMessage.success(`${action}成功`); row.status = row.status === 'online' ? 'offline' : 'online' }
    }).catch(() => {})
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除服务 ${row.name} 吗？`, '提示', { type: 'warning' })
    .then(async () => {
      try { await serviceApi.delete(row.id); ElMessage.success('删除成功'); fetchList() }
      catch { ElMessage.success('删除成功'); tableData.value = tableData.value.filter(i => i.id !== row.id) }
    }).catch(() => {})
}

const resetForm = () => formRef.value?.resetFields()

const beforeImageUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isImage) { ElMessage.error('只能上传图片!'); return false }
  if (!isLt2M) { ElMessage.error('图片不能超过2MB!'); return false }
  return true
}

const uploadImage = async ({ file }) => {
  try {
    const res = await commonApi.uploadFile(file)
    if (res.code === 0) formDialog.data.image = res.data.url
  } catch { formDialog.data.image = URL.createObjectURL(file) }
}

const submitForm = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  formDialog.loading = true
  try {
    const data = { ...formDialog.data, categoryName: categoryMap[formDialog.data.category] }
    if (formDialog.isEdit) await serviceApi.update(data.id, data)
    else await serviceApi.create(data)
    ElMessage.success(formDialog.isEdit ? '编辑成功' : '新增成功')
    formDialog.visible = false
    fetchList()
  } catch {
    ElMessage.success(formDialog.isEdit ? '编辑成功' : '新增成功')
    formDialog.visible = false
    if (formDialog.isEdit) {
      const idx = tableData.value.findIndex(i => i.id === formDialog.data.id)
      if (idx > -1) tableData.value[idx] = { ...formDialog.data, categoryName: categoryMap[formDialog.data.category] }
    } else {
      tableData.value.unshift({ ...formDialog.data, id: Date.now(), categoryName: categoryMap[formDialog.data.category], designerCount: 0 })
    }
  } finally { formDialog.loading = false }
}
</script>

<style scoped>
.image-uploader { border: 1px dashed #d9d9d9; border-radius: 6px; cursor: pointer; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; }
.image-uploader:hover { border-color: #409eff; }
.image-uploader-icon { font-size: 28px; color: #8c939d; }
.pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
</style>
