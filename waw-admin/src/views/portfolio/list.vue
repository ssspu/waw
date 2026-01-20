<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">作品列表</span></div>
    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="作品标题"><el-input v-model="searchForm.title" placeholder="请输入标题" clearable /></el-form-item>
        <el-form-item label="分类">
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
            <el-option label="已下架" value="offline" />
          </el-select>
        </el-form-item>
        <el-form-item><el-button type="primary" @click="handleSearch">查询</el-button></el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="image" label="封面" width="100">
          <template #default="{ row }"><el-image :src="row.image" style="width: 60px; height: 60px;" fit="cover" /></template>
        </el-table-column>
        <el-table-column prop="title" label="作品标题" min-width="150" />
        <el-table-column prop="designer" label="设计师" width="100" />
        <el-table-column prop="brand" label="品牌馆" width="120" />
        <el-table-column prop="category" label="分类" width="80" />
        <el-table-column prop="likes" label="点赞" width="80" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'published' ? 'success' : row.status === 'pending' ? 'warning' : 'info'">
              {{ row.status === 'published' ? '已发布' : row.status === 'pending' ? '待审核' : '已下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">查看</el-button>
            <el-button v-if="row.status === 'pending'" type="success" link size="small" @click="handleApprove(row)">通过</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize" :total="pagination.total" layout="total, sizes, prev, pager, next" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const searchForm = reactive({ title: '', category: '', status: '' })
const pagination = reactive({ page: 1, pageSize: 10, total: 100 })

const tableData = ref([
  { id: 1, image: '', title: '时尚短发造型', designer: '张三', brand: '美丽造型', category: '女性', likes: 256, status: 'published' },
  { id: 2, image: '', title: '商务男士发型', designer: '李四', brand: '时尚发型', category: '男性', likes: 128, status: 'pending' }
])

const handleSearch = () => {}
const handleView = (row) => { ElMessage.info(`查看: ${row.title}`) }
const handleApprove = (row) => { ElMessage.success(`已通过: ${row.title}`) }
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除作品 ${row.title} 吗？`, '提示', { type: 'warning' })
    .then(() => ElMessage.success('删除成功')).catch(() => {})
}
</script>
