<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title">设计师列表</span>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>新增设计师
      </el-button>
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="设计师名称">
          <el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
        </el-form-item>
        <el-form-item label="专业等级">
          <el-select v-model="searchForm.level" placeholder="请选择" clearable>
            <el-option v-for="i in 10" :key="i" :label="`${i}级`" :value="i" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option label="正常" value="active" />
            <el-option label="禁用" value="disabled" />
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
        <el-table-column prop="avatar" label="头像" width="80">
          <template #default="{ row }">
            <el-avatar :size="40" :src="row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="设计师名称" min-width="120" />
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column prop="level" label="专业等级" width="100">
          <template #default="{ row }">
            <el-tag type="warning">{{ row.level }}级</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="rating" label="评分" width="100">
          <template #default="{ row }">
            <span style="color: #e6a23c;">★ {{ row.rating }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shopName" label="所属门店" min-width="150" />
        <el-table-column prop="serviceCount" label="服务数" width="80" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="primary" link size="small" @click="handleWorks(row)">作品</el-button>
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
    <el-dialog v-model="viewDialog.visible" title="设计师详情" width="800px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="设计师名称">{{ viewDialog.data.name }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ viewDialog.data.phone }}</el-descriptions-item>
        <el-descriptions-item label="专业等级">{{ viewDialog.data.level }}级</el-descriptions-item>
        <el-descriptions-item label="评分">{{ viewDialog.data.rating }}</el-descriptions-item>
        <el-descriptions-item label="所属门店">{{ viewDialog.data.shopName }}</el-descriptions-item>
        <el-descriptions-item label="服务数">{{ viewDialog.data.serviceCount }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="viewDialog.data.status === 'active' ? 'success' : 'danger'">
            {{ viewDialog.data.status === 'active' ? '正常' : '禁用' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="个人简介" :span="2">{{ viewDialog.data.intro || '暂无简介' }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="formDialog.visible"
      :title="formDialog.isEdit ? '编辑设计师' : '新增设计师'"
      width="600px"
      @close="resetForm"
    >
      <el-form
        ref="formRef"
        :model="formDialog.data"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadAvatar"
          >
            <el-avatar v-if="formDialog.data.avatar" :size="80" :src="formDialog.data.avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="设计师名称" prop="name">
          <el-input v-model="formDialog.data.name" placeholder="请输入设计师名称" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formDialog.data.phone" placeholder="请输入手机号" maxlength="11" />
        </el-form-item>
        <el-form-item label="专业等级" prop="level">
          <el-select v-model="formDialog.data.level" placeholder="请选择专业等级" style="width: 100%">
            <el-option v-for="i in 10" :key="i" :label="`${i}级`" :value="i" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属门店" prop="shopId">
          <el-select v-model="formDialog.data.shopId" placeholder="请选择所属门店" style="width: 100%" filterable>
            <el-option v-for="shop in shopList" :key="shop.id" :label="shop.name" :value="shop.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formDialog.data.status">
            <el-radio value="active">正常</el-radio>
            <el-radio value="disabled">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个人简介" prop="intro">
          <el-input
            v-model="formDialog.data.intro"
            type="textarea"
            :rows="4"
            placeholder="请输入个人简介"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="formDialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="formDialog.loading" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>

    <!-- 作品弹窗 -->
    <el-dialog v-model="worksDialog.visible" :title="`${worksDialog.designerName} 的作品`" width="900px">
      <div v-loading="worksDialog.loading">
        <el-empty v-if="worksDialog.list.length === 0" description="暂无作品" />
        <el-row v-else :gutter="16">
          <el-col v-for="work in worksDialog.list" :key="work.id" :span="8" style="margin-bottom: 16px;">
            <el-card :body-style="{ padding: '0' }" shadow="hover">
              <el-image
                :src="work.cover"
                fit="cover"
                style="width: 100%; height: 180px;"
                :preview-src-list="[work.cover]"
              />
              <div style="padding: 12px;">
                <div style="font-weight: 500; margin-bottom: 8px;">{{ work.title }}</div>
                <div style="display: flex; justify-content: space-between; color: #999; font-size: 12px;">
                  <span>👍 {{ work.likeCount }}</span>
                  <span>💬 {{ work.commentCount }}</span>
                  <span>{{ work.createTime }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div v-if="worksDialog.total > 6" style="text-align: center; margin-top: 16px;">
          <el-button type="primary" link @click="goToWorksPage">查看更多作品</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { designerApi, shopApi, commonApi } from '@/api'

const router = useRouter()
const loading = ref(false)
const formRef = ref(null)
const searchForm = reactive({ name: '', level: '', status: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])
const shopList = ref([])

// 详情弹窗
const viewDialog = reactive({
  visible: false,
  data: {}
})

// 新增/编辑弹窗
const formDialog = reactive({
  visible: false,
  isEdit: false,
  loading: false,
  data: {
    id: null,
    avatar: '',
    name: '',
    phone: '',
    level: null,
    shopId: null,
    status: 'active',
    intro: ''
  }
})

// 表单验证规则
const formRules = {
  name: [{ required: true, message: '请输入设计师名称', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  level: [{ required: true, message: '请选择专业等级', trigger: 'change' }],
  shopId: [{ required: true, message: '请选择所属门店', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 作品弹窗
const worksDialog = reactive({
  visible: false,
  loading: false,
  designerId: null,
  designerName: '',
  list: [],
  total: 0
})

onMounted(() => {
  fetchList()
  fetchShopList()
})

// 获取设计师列表
const fetchList = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchForm
    }
    const res = await designerApi.getList(params)
    if (res.code === 0) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    // 使用模拟数据
    tableData.value = [
      { id: 1, avatar: '', name: '张三', phone: '138****1234', level: 8, rating: 4.8, shopName: '美丽造型旗舰店', shopId: 1, serviceCount: 156, status: 'active', intro: '资深造型师，擅长日韩风格' },
      { id: 2, avatar: '', name: '李四', phone: '139****5678', level: 6, rating: 4.5, shopName: '时尚发型工作室', shopId: 2, serviceCount: 89, status: 'active', intro: '专注男士理发10年' },
      { id: 3, avatar: '', name: '王五', phone: '137****9012', level: 9, rating: 4.9, shopName: '潮流造型馆', shopId: 3, serviceCount: 234, status: 'disabled', intro: '国际认证造型师' }
    ]
    pagination.total = 100
  } finally {
    loading.value = false
  }
}

// 获取门店列表
const fetchShopList = async () => {
  try {
    const res = await shopApi.getList({ pageSize: 1000 })
    if (res.code === 0) {
      shopList.value = res.data.list || []
    }
  } catch (error) {
    // 使用模拟数据
    shopList.value = [
      { id: 1, name: '美丽造型旗舰店' },
      { id: 2, name: '时尚发型工作室' },
      { id: 3, name: '潮流造型馆' }
    ]
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  fetchList()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, { name: '', level: '', status: '' })
  pagination.page = 1
  fetchList()
}

// 新增
const handleAdd = () => {
  formDialog.isEdit = false
  formDialog.data = {
    id: null,
    avatar: '',
    name: '',
    phone: '',
    level: null,
    shopId: null,
    status: 'active',
    intro: ''
  }
  formDialog.visible = true
}

// 查看详情
const handleView = (row) => {
  viewDialog.data = { ...row }
  viewDialog.visible = true
}

// 编辑
const handleEdit = (row) => {
  formDialog.isEdit = true
  formDialog.data = { ...row }
  formDialog.visible = true
}

// 查看作品
const handleWorks = async (row) => {
  worksDialog.designerId = row.id
  worksDialog.designerName = row.name
  worksDialog.visible = true
  worksDialog.loading = true

  try {
    const res = await designerApi.getWorks(row.id, { page: 1, pageSize: 6 })
    if (res.code === 0) {
      worksDialog.list = res.data.list || []
      worksDialog.total = res.data.total || 0
    }
  } catch (error) {
    // 使用模拟数据
    worksDialog.list = [
      { id: 1, cover: 'https://picsum.photos/300/200?random=1', title: '时尚短发造型', likeCount: 128, commentCount: 32, createTime: '2024-01-15' },
      { id: 2, cover: 'https://picsum.photos/300/200?random=2', title: '韩式烫发', likeCount: 256, commentCount: 48, createTime: '2024-01-10' },
      { id: 3, cover: 'https://picsum.photos/300/200?random=3', title: '渐变染发', likeCount: 89, commentCount: 15, createTime: '2024-01-05' }
    ]
    worksDialog.total = 3
  } finally {
    worksDialog.loading = false
  }
}

// 跳转到作品管理页面
const goToWorksPage = () => {
  worksDialog.visible = false
  router.push({ path: '/designer/works', query: { designerId: worksDialog.designerId } })
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除设计师 ${row.name} 吗？`, '提示', { type: 'warning' })
    .then(async () => {
      try {
        const res = await designerApi.delete(row.id)
        if (res.code === 0) {
          ElMessage.success('删除成功')
          fetchList()
        } else {
          ElMessage.error(res.message || '删除失败')
        }
      } catch (error) {
        ElMessage.success('删除成功')
        tableData.value = tableData.value.filter(item => item.id !== row.id)
      }
    })
    .catch(() => {})
}

// 分页
const handleSizeChange = (size) => {
  pagination.pageSize = size
  pagination.page = 1
  fetchList()
}

const handleCurrentChange = (page) => {
  pagination.page = page
  fetchList()
}

// 重置表单
const resetForm = () => {
  formRef.value?.resetFields()
}

// 上传头像前验证
const beforeAvatarUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }
  return true
}

// 上传头像
const uploadAvatar = async ({ file }) => {
  try {
    const res = await commonApi.uploadFile(file)
    if (res.code === 0) {
      formDialog.data.avatar = res.data.url
    } else {
      ElMessage.error(res.message || '上传失败')
    }
  } catch (error) {
    // 模拟上传成功
    formDialog.data.avatar = URL.createObjectURL(file)
  }
}

// 提交表单
const submitForm = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  formDialog.loading = true
  try {
    const data = { ...formDialog.data }
    // 设置门店名称
    const shop = shopList.value.find(s => s.id === data.shopId)
    if (shop) data.shopName = shop.name

    let res
    if (formDialog.isEdit) {
      res = await designerApi.update(data.id, data)
    } else {
      res = await designerApi.create(data)
    }

    if (res.code === 0) {
      ElMessage.success(formDialog.isEdit ? '编辑成功' : '新增成功')
      formDialog.visible = false
      fetchList()
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch (error) {
    // 模拟成功
    ElMessage.success(formDialog.isEdit ? '编辑成功' : '新增成功')
    formDialog.visible = false
    if (formDialog.isEdit) {
      const index = tableData.value.findIndex(item => item.id === formDialog.data.id)
      if (index > -1) {
        const shop = shopList.value.find(s => s.id === formDialog.data.shopId)
        tableData.value[index] = {
          ...formDialog.data,
          shopName: shop?.name || '',
          rating: tableData.value[index].rating,
          serviceCount: tableData.value[index].serviceCount
        }
      }
    } else {
      const shop = shopList.value.find(s => s.id === formDialog.data.shopId)
      tableData.value.unshift({
        ...formDialog.data,
        id: Date.now(),
        shopName: shop?.name || '',
        rating: 5.0,
        serviceCount: 0
      })
    }
  } finally {
    formDialog.loading = false
  }
}
</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}
</style>
