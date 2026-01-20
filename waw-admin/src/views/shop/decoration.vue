<template>
  <div class="page-container">
    <div class="page-header">
      <h2>店铺装修管理</h2>
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="店铺名称">
          <el-input v-model="searchForm.keyword" placeholder="请输入店铺名称" clearable />
        </el-form-item>
        <el-form-item label="装修状态">
          <el-select v-model="searchForm.status" placeholder="全部" clearable>
            <el-option label="未装修" :value="0" />
            <el-option label="装修中" :value="1" />
            <el-option label="已完成" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card>
      <el-table :data="shopList" stripe>
        <el-table-column prop="name" label="店铺名称" />
        <el-table-column prop="merchantName" label="所属商家" />
        <el-table-column prop="decorationStatus" label="装修状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.decorationStatus)">
              {{ getStatusText(row.decorationStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="completeness" label="完成度" width="150">
          <template #default="{ row }">
            <el-progress :percentage="row.completeness" :status="row.completeness === 100 ? 'success' : ''" />
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最后更新" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <el-button type="warning" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="success" link @click="handlePreview(row)">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="800px">
      <el-form :model="formData" label-width="120px">
        <el-divider content-position="left">基础信息</el-divider>
        <el-form-item label="品牌图片">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺简介">
          <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入店铺简介" />
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker v-model="formData.businessHours" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>

        <el-divider content-position="left">服务特色</el-divider>
        <el-form-item label="服务特色">
          <el-checkbox-group v-model="formData.features">
            <el-checkbox value="专业剪发">专业剪发</el-checkbox>
            <el-checkbox value="时尚染发">时尚染发</el-checkbox>
            <el-checkbox value="精致烫发">精致烫发</el-checkbox>
            <el-checkbox value="头皮护理">头皮护理</el-checkbox>
            <el-checkbox value="造型设计">造型设计</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-divider content-position="left">环境设施</el-divider>
        <el-form-item label="环境设施">
          <el-checkbox-group v-model="formData.facilities">
            <el-checkbox value="免费WiFi">免费WiFi</el-checkbox>
            <el-checkbox value="空调">空调</el-checkbox>
            <el-checkbox value="停车位">停车位</el-checkbox>
            <el-checkbox value="茶水服务">茶水服务</el-checkbox>
            <el-checkbox value="独立包间">独立包间</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const searchForm = ref({
  keyword: '',
  status: ''
})

const shopList = ref([
  { id: 1, name: '时尚造型(朝阳店)', merchantName: '时尚造型连锁', decorationStatus: 2, completeness: 100, updateTime: '2024-01-20 10:00:00' },
  { id: 2, name: '时尚造型(海淀店)', merchantName: '时尚造型连锁', decorationStatus: 1, completeness: 60, updateTime: '2024-01-19 15:30:00' },
  { id: 3, name: '美丽人生美发', merchantName: '美丽人生', decorationStatus: 0, completeness: 0, updateTime: '-' }
])

const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 50
})

const dialogVisible = ref(false)
const dialogTitle = ref('编辑装修')
const formData = ref({
  description: '',
  businessHours: [],
  features: [],
  facilities: []
})

const getStatusType = (status) => {
  const types = { 0: 'info', 1: 'warning', 2: 'success' }
  return types[status]
}

const getStatusText = (status) => {
  const texts = { 0: '未装修', 1: '装修中', 2: '已完成' }
  return texts[status]
}

const handleSearch = () => {
  // 搜索店铺
}

const handleView = (row) => {
  dialogTitle.value = '查看装修'
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑装修'
  formData.value = {
    description: '',
    businessHours: [],
    features: [],
    facilities: []
  }
  dialogVisible.value = true
}

const handlePreview = (row) => {
  ElMessage.info('预览功能开发中')
}

const handleSubmit = () => {
  ElMessage.success('保存成功')
  dialogVisible.value = false
}
</script>

<style scoped lang="scss">
.page-header {
  margin-bottom: 20px;
}
.search-form {
  margin-bottom: 20px;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
